import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { RealtimeChannel, User } from "@supabase/supabase-js";
import MainLayout from "@/components/Layout/MainLayout";
import { toast } from "sonner";
import { FileNode } from "@/components/editor/FileExplorer";
import { Loader2 } from "lucide-react";
import { useRoomPermission } from "@/hooks/rooms";
import { useProjectByRoomId } from "@/hooks/projects";
import { useQueryClient } from "@tanstack/react-query";
import { useCommitChange } from "@/hooks/files";
import { CommitDialog } from "@/components/editor/CommitDialog";
import { HistoryDialog } from "@/components/editor/HistoryDialog";
import { ProjectType } from "@/hooks/projects";
import { FileOperationDialog, FileOpType } from "@/components/editor/FileOperationDialog";
import { getFileTemplate } from "@/lib/project-templates";

// Types
interface CursorPosition {
  lineNumber: number;
  column: number;
}

type UserPresence = {
  id: string;
  username: string;
  avatar_url: string;
  cursor?: CursorPosition;
};

type UserProfile = {
  username: string;
  avatar_url: string;
  status: string;
};

type FileData = {
  id: string;
  content: string;
};

// Helper to build file tree
const buildFileTree = (files: { path: string }[]): FileNode[] => {
  const root: FileNode = { name: "root", path: "", type: "folder", children: [] };

  files.forEach(({ path }) => {
    const isExplicitFolder = path.endsWith("/");
    const parts = path.split("/").filter(Boolean);
    
    let currentLevel = root;
    parts.forEach((part, index) => {
      const isLastPart = index === parts.length - 1;
      const nodeType = (isLastPart && !isExplicitFolder) ? "file" : "folder";
      
      let node = currentLevel.children?.find(child => child.name === part);

      if (!node) {
        node = {
          name: part,
          path: parts.slice(0, index + 1).join("/"),
          type: nodeType,
          children: nodeType === "folder" ? [] : undefined,
        };
        currentLevel.children?.push(node);
      }
      
      if (node.type === "folder") {
        currentLevel = node;
      }
    });
  });

  return root.children || [];
};

const getFoldersFromTree = (tree: FileNode[]): string[] => {
  const folders: string[] = [];
  const traverse = (nodes: FileNode[]) => {
    nodes.forEach(node => {
      if (node.type === "folder") {
        folders.push(node.path);
        if (node.children) traverse(node.children);
      }
    });
  };
  traverse(tree);
  return folders.sort();
};

// localStorage key helpers
const getLocalStorageKey = (roomId: string, filePath: string) => `syntaxable:${roomId}:${filePath}`;

const EditorPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: permission, isLoading: isPermissionLoading } = useRoomPermission(roomId);
  const { data: project } = useProjectByRoomId(roomId);
  const { mutate: commitChange } = useCommitChange();

  // State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserPresence[]>([]);
  const [typingStates, setTypingStates] = useState<Record<string, { user: UserPresence; path: string }>>({});
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [fileData, setFileData] = useState<Record<string, FileData>>({});
  const [dbFileData, setDbFileData] = useState<Record<string, FileData>>({}); // Original DB state
  const [openFiles, setOpenFiles] = useState<string[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [dirtyFiles, setDirtyFiles] = useState<Set<string>>(new Set());
  const [uncommittedFiles, setUncommittedFiles] = useState<Set<string>>(new Set()); // Saved locally but not committed
  const dirtyFilesRef = useRef<Set<string>>(new Set());
  const uncommittedFilesRef = useRef<Set<string>>(new Set());
  const [isCommitDialogOpen, setIsCommitDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [isBatchCommitting, setIsBatchCommitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [isInitialFilesLoaded, setIsInitialFilesLoaded] = useState(false);
  const [fileOpDialog, setFileOpDialog] = useState<{
    open: boolean;
    type: FileOpType;
    path?: string;
    initialValue?: string;
  }>({ open: false, type: "create_file" });

  // Store the last saved content for preview (only updates when files are saved)
  const [savedContentForPreview, setSavedContentForPreview] = useState<Record<string, string>>({});

  const channelRef = useRef<RealtimeChannel | null>(null);
  const typingTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Throttling refs
  const lastBroadcastTimeRef = useRef<number>(0);
  const broadcastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestCodePayloadRef = useRef<{ path: string, content: string } | null>(null);

  const lastTypingBroadcastTimeRef = useRef<number>(0);
  const typingBroadcastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestTypingPayloadRef = useRef<{ path: string, user: UserProfile & { id: string } } | null>(null);

  const isReadOnly = permission === 'viewer';

  // Function to fetch files from DB
  const fetchFiles = useCallback(async () => {
    if (!roomId) return;

    try {
      const { data: files, error } = await supabase
        .from("files")
        .select("id, path, content")
        .eq("room_id", roomId);

      if (error) {
        toast.error("Error fetching room files.");
        return;
      }

      if (files && files.length > 0) {
        const tree = buildFileTree(files);
        setFileTree(tree);
        
        // Build DB state
        const dbContents = files.reduce((acc, file) => ({ 
          ...acc, 
          [file.path]: { id: file.id, content: file.content || "" } 
        }), {});
        setDbFileData(dbContents);

        // Check localStorage for uncommitted changes
        const localUncommitted = new Set<string>();
        const mergedFileData: Record<string, FileData> = {};
        const initialSavedContent: Record<string, string> = {};
        
        files.forEach(file => {
          const localKey = getLocalStorageKey(roomId, file.path);
          const localContent = localStorage.getItem(localKey);
          
          if (localContent !== null && localContent !== file.content) {
            // There's uncommitted local changes
            mergedFileData[file.path] = { id: file.id, content: localContent };
            localUncommitted.add(file.path);
            // For preview, use the saved DB content initially
            initialSavedContent[file.path] = file.content || "";
          } else {
            mergedFileData[file.path] = { id: file.id, content: file.content || "" };
            initialSavedContent[file.path] = file.content || "";
          }
        });

        setFileData(mergedFileData);
        setUncommittedFiles(localUncommitted);
        uncommittedFilesRef.current = localUncommitted;
        setSavedContentForPreview(initialSavedContent);

        setActiveFile(prev => {
          if (prev) return prev;
          const firstFile = files[0].path;
          setOpenFiles([firstFile]);
          return firstFile;
        });
      } else {
        setFileTree([]);
        setFileData({});
        setDbFileData({});
        setActiveFile(null);
        setOpenFiles([]);
      }
    } finally {
      setIsInitialFilesLoaded(true);
    }
  }, [roomId]);

  // Fetch project type from database
  const fetchProjectType = useCallback(async () => {
    if (!roomId) return;

    const { data: rooms, error } = await supabase
      .from("rooms")
      .select("project_id")
      .eq("id", roomId)
      .single();

    if (error || !rooms) return;

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("project_type")
      .eq("id", rooms.project_id)
      .single();

    if (projectError || !project) return;

    setProjectType(project.project_type as ProjectType);
  }, [roomId]);

  // Broadcast code changes (Throttled)
  const broadcastCode = useCallback((path: string, content: string) => {
    if (isReadOnly) return;

    latestCodePayloadRef.current = { path, content };

    const now = Date.now();
    const THROTTLE_MS = 50;
    const timeSinceLast = now - lastBroadcastTimeRef.current;

    if (!broadcastTimeoutRef.current) {
      if (timeSinceLast >= THROTTLE_MS) {
        channelRef.current?.send({
          type: "broadcast",
          event: "code_update",
          payload: { path, content },
        });
        lastBroadcastTimeRef.current = now;
      } else {
        broadcastTimeoutRef.current = setTimeout(() => {
          if (latestCodePayloadRef.current) {
            channelRef.current?.send({
              type: "broadcast",
              event: "code_update",
              payload: latestCodePayloadRef.current,
            });
            lastBroadcastTimeRef.current = Date.now();
          }
          broadcastTimeoutRef.current = null;
        }, THROTTLE_MS - timeSinceLast);
      }
    }
  }, [isReadOnly]);

  // Broadcast typing signal (Throttled)
  const broadcastTyping = useCallback((path: string, user: UserProfile & { id: string }) => {
    if (isReadOnly) return;

    latestTypingPayloadRef.current = { path, user };

    const now = Date.now();
    const THROTTLE_MS = 1000;
    const timeSinceLast = now - lastTypingBroadcastTimeRef.current;

    if (!typingBroadcastTimeoutRef.current) {
      if (timeSinceLast >= THROTTLE_MS) {
        channelRef.current?.send({
          type: "broadcast",
          event: "typing",
          payload: {
            path,
            user: { id: user.id, username: user.username, avatar_url: user.avatar_url },
          },
        });
        lastTypingBroadcastTimeRef.current = now;
      } else {
        typingBroadcastTimeoutRef.current = setTimeout(() => {
          if (latestTypingPayloadRef.current) {
            const { path, user } = latestTypingPayloadRef.current;
            channelRef.current?.send({
              type: "broadcast",
              event: "typing",
              payload: {
                path,
                user: { id: user.id, username: user.username, avatar_url: user.avatar_url },
              },
            });
            lastTypingBroadcastTimeRef.current = Date.now();
          }
          typingBroadcastTimeoutRef.current = null;
        }, THROTTLE_MS - timeSinceLast);
      }
    }
  }, [isReadOnly]);

  // Broadcast file operations
  const broadcastFileOperation = useCallback((operation: string, data: any) => {
    if (isReadOnly) return;
    channelRef.current?.send({
      type: "broadcast",
      event: "file_operation",
      payload: { operation, data },
    });
  }, [isReadOnly]);

  // Effects

  // 1. Authentication and Profile Loading
  useEffect(() => {
    const getUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }
      setCurrentUser(user);
      const { data: profile } = await supabase.from("profiles").select("username, avatar_url, status").eq("id", user.id).single();
      if (profile) {
        setCurrentUserProfile(profile);
      } else {
        setCurrentUserProfile({
          username: user.email?.split('@')[0] || 'Anonymous',
          avatar_url: '',
          status: 'Developer'
        });
      }
    };
    getUserAndProfile();
  }, [navigate]);

  // 2. File Fetching Effect
  useEffect(() => {
    if (!roomId || !currentUser || !currentUserProfile || isPermissionLoading || permission === undefined) return;
    setIsInitialFilesLoaded(false);
    fetchFiles();
    fetchProjectType();
  }, [roomId, currentUser, currentUserProfile, isPermissionLoading, permission, fetchFiles, fetchProjectType]);

  // 3. Realtime Channel Setup Effect
  useEffect(() => {
    if (!roomId || !currentUser || !currentUserProfile || isPermissionLoading || permission === undefined) return;

    const setupChannel = () => {
      const userPresencePayload: UserPresence = {
        id: currentUser.id,
        username: currentUserProfile.username,
        avatar_url: currentUserProfile.avatar_url,
      };

      const roomChannel = supabase.channel(`room:${roomId}`, {
        config: {
          presence: { key: currentUser.id },
          broadcast: { self: false }
        }
      });
      channelRef.current = roomChannel;

      roomChannel
        .on("presence", { event: "sync" }, () => {
          const newState = roomChannel.presenceState<UserPresence>();
          setUsers(Object.values(newState).map(([user]) => user));
        })
        .on("broadcast", { event: "code_update" }, ({ payload }) => {
          setFileData(prev => ({ ...prev, [payload.path]: { ...prev[payload.path], content: payload.content } }));
        })
        .on("broadcast", { event: "typing" }, ({ payload }) => {
          const typingUser: UserPresence = payload.user;
          const path: string = payload.path;
          setTypingStates(prev => ({ ...prev, [typingUser.id]: { user: typingUser, path } }));
          const existing = typingTimersRef.current[typingUser.id];
          if (existing) clearTimeout(existing);
          typingTimersRef.current[typingUser.id] = setTimeout(() => {
            setTypingStates(prev => {
              const copy = { ...prev };
              delete copy[typingUser.id];
              return copy;
            });
          }, 2000);
        })
        .on("broadcast", { event: "file_operation" }, ({ payload }) => {
          handleRemoteFileOperation(payload.operation, payload.data);
        })
        .on("broadcast", { event: "permission_change" }, () => {
          toast.info("Permissions have been updated.");
          queryClient.invalidateQueries({ queryKey: ['roomPermission', roomId] });
          queryClient.invalidateQueries({ queryKey: ['isProjectOwner', roomId] });
          queryClient.invalidateQueries({ queryKey: ['roomParticipants', roomId] });
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") await roomChannel.track(userPresencePayload);
        });
    };

    setupChannel();

    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [roomId, currentUser, currentUserProfile, isPermissionLoading, permission, queryClient]);

  // 4. Handle Permission Errors
  useEffect(() => {
    if (!isPermissionLoading && permission === undefined) {
      toast.error("Could not access room. The room ID might be invalid or you lack permission.");
      navigate("/");
    }
  }, [isPermissionLoading, permission, navigate]);

  const refreshFileTree = async () => {
    if (!roomId) return;
    await fetchFiles();
  };

  const handleRemoteFileOperation = (operation: string, data: any) => {
    refreshFileTree();
    if (operation === 'rename') {
      setOpenFiles(prev => prev.map(p => p === data.oldPath ? data.newPath : p));
      if (activeFile === data.oldPath) {
        setActiveFile(data.newPath);
      }
    } else if (operation === 'delete') {
      setOpenFiles(prev => prev.filter(p => p !== data.path));
      if (activeFile === data.path) {
        setActiveFile(openFiles.filter(p => p !== data.path)[0] || null);
      }
    }
  };

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode === undefined || !activeFile) return;
    if (isReadOnly) return;

    setFileData(prev => ({ ...prev, [activeFile]: { ...prev[activeFile], content: newCode } }));

    // Compare with DB content to determine if dirty
    const dbContent = dbFileData[activeFile]?.content ?? '';
    const isDirty = newCode !== dbContent;

    setDirtyFiles(prev => {
      const isCurrentlyDirty = prev.has(activeFile);
      if (isDirty === isCurrentlyDirty) return prev;

      const newDirtyFiles = new Set(prev);
      if (isDirty) {
        newDirtyFiles.add(activeFile);
      } else {
        newDirtyFiles.delete(activeFile);
      }

      dirtyFilesRef.current = newDirtyFiles;

      return newDirtyFiles;
    });

    // If content matches DB, also remove from uncommitted
    if (!isDirty) {
      setUncommittedFiles(prev => {
        if (!prev.has(activeFile)) return prev;
        const next = new Set(prev);
        next.delete(activeFile);
        uncommittedFilesRef.current = next;
        // Also clear localStorage since it matches DB
        if (roomId) {
          const localKey = getLocalStorageKey(roomId, activeFile);
          localStorage.removeItem(localKey);
        }
        return next;
      });
    }

    broadcastCode(activeFile, newCode);
    if (currentUser && currentUserProfile) {
      broadcastTyping(activeFile, { id: currentUser.id, ...currentUserProfile });
    }
  };

  // Save locally to localStorage (clears dirty, only adds to uncommitted if different from DB)
  const handleSave = useCallback(() => {
    if (dirtyFiles.size === 0 || isSaving) return;
    if (!roomId) return;

    setIsSaving(true);
    const filesToSave = Array.from(dirtyFiles);

    // Save to localStorage and determine which files need to be committed
    const filesNeedingCommit: string[] = [];
    const filesMatchingDB: string[] = [];
    
    filesToSave.forEach(path => {
      const file = fileData[path];
      if (file) {
        const localKey = getLocalStorageKey(roomId, path);
        const dbContent = dbFileData[path]?.content ?? '';
        
        // Only save to localStorage if content differs from DB
        if (file.content !== dbContent) {
          localStorage.setItem(localKey, file.content);
          filesNeedingCommit.push(path);
        } else {
          // Content matches DB, remove from localStorage and mark as clean
          localStorage.removeItem(localKey);
          filesMatchingDB.push(path);
        }
      }
    });

    // Update saved content for preview - only when files are actually saved
    setSavedContentForPreview(prev => {
      const updated = { ...prev };
      filesToSave.forEach(path => {
        const file = fileData[path];
        if (file) {
          updated[path] = file.content;
        }
      });
      return updated;
    });

    // Clear dirty files
    setDirtyFiles(new Set());
    dirtyFilesRef.current = new Set();
    
    // Update uncommitted files - add files that differ from DB, remove those that match
    setUncommittedFiles(prev => {
      const next = new Set([...Array.from(prev), ...filesNeedingCommit]);
      filesMatchingDB.forEach(path => next.delete(path));
      uncommittedFilesRef.current = next;
      return next;
    });

    toast.success("Saved locally");
    setIsSaving(false);
  }, [dirtyFiles, fileData, roomId, isSaving, dbFileData]);

  // Keyboard Shortcuts - Ctrl+S saves locally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (dirtyFiles.size > 0 && !isSaving) {
          handleSave();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dirtyFiles.size, isSaving, handleSave]);

  // Commit to DB (saves content and creates version)
  const handleCommit = (commitMessage: string) => {
    const filesToCommit = Array.from(uncommittedFiles);
    if (filesToCommit.length === 0) return;
    if (!roomId) return;

    setIsBatchCommitting(true);

    // First save all uncommitted files to DB, then commit
    const savePromises = filesToCommit.map(async (path) => {
      const file = fileData[path];
      if (!file || !file.id) {
        throw new Error(`File data not found for ${path}`);
      }

      // Update file content in DB
      const { error: saveError } = await supabase
        .from("files")
        .update({ content: file.content })
        .eq("id", file.id);

      if (saveError) throw saveError;

      // Create version/commit
      return new Promise<void>((resolve, reject) => {
        commitChange({
          fileId: file.id,
          content: file.content,
          commitMessage,
        }, {
          onSuccess: () => {
            // Clear localStorage for this file
            const localKey = getLocalStorageKey(roomId, path);
            localStorage.removeItem(localKey);
            resolve();
          },
          onError: (err) => reject(err),
        });
      });
    });

    Promise.all(savePromises)
      .then(() => {
        toast.success("Changes committed to database");

        // Update DB file data to match committed state
        setDbFileData(prev => {
          const updated = { ...prev };
          filesToCommit.forEach(path => {
            updated[path] = { ...updated[path], content: fileData[path].content };
          });
          return updated;
        });

        // Update saved content for preview to match committed state
        setSavedContentForPreview(prev => {
          const updated = { ...prev };
          filesToCommit.forEach(path => {
            updated[path] = fileData[path].content;
          });
          return updated;
        });

        // Clear uncommitted files
        setUncommittedFiles(new Set());
        uncommittedFilesRef.current = new Set();
        setIsCommitDialogOpen(false);
      })
      .catch((error) => {
        console.error("Commit failed:", error);
        toast.error("Failed to commit changes");
      })
      .finally(() => {
        setIsBatchCommitting(false);
      });
  };

  // Restore all files to the latest committed state (discard uncommitted changes)
  const handleRestore = useCallback(() => {
    if (uncommittedFiles.size === 0) return;
    if (!roomId) return;

    const filesToRestore = Array.from(uncommittedFiles);

    // Clear localStorage for all uncommitted files
    filesToRestore.forEach(path => {
      const localKey = getLocalStorageKey(roomId, path);
      localStorage.removeItem(localKey);
    });

    // Restore file data to DB state
    setFileData(prev => {
      const updated = { ...prev };
      filesToRestore.forEach(path => {
        if (dbFileData[path]) {
          updated[path] = { ...dbFileData[path] };
        }
      });
      return updated;
    });

    // Clear uncommitted files
    setUncommittedFiles(new Set());
    uncommittedFilesRef.current = new Set();

    // Clear dirty files
    setDirtyFiles(new Set());
    dirtyFilesRef.current = new Set();

    // Update saved content for preview
    setSavedContentForPreview(prev => {
      const updated = { ...prev };
      filesToRestore.forEach(path => {
        if (dbFileData[path]) {
          updated[path] = dbFileData[path].content;
        }
      });
      return updated;
    });

    toast.success("Restored to latest commit");
  }, [uncommittedFiles, roomId, dbFileData]);

  const handleFileSelect = (path: string) => {
    setActiveFile(path);
    if (!openFiles.includes(path)) {
      setOpenFiles(prev => [...prev, path]);
    }
  };

  const handleTabClose = (path: string) => {
    setOpenFiles(prev => prev.filter(p => p !== path));
    if (activeFile === path) {
      const remainingFiles = openFiles.filter(p => p !== path);
      setActiveFile(remainingFiles[0] || null);
    }
  };

  const checkPermissions = () => {
    if (isReadOnly) {
      toast.error("You don't have permission to make changes in this project.");
      return false;
    }
    return true;
  };

  const handleNewFile = async () => {
    if (!checkPermissions()) return;
    setFileOpDialog({ open: true, type: "create_file" });
  };

  const handleNewFolder = async () => {
    if (!checkPermissions()) return;
    setFileOpDialog({ open: true, type: "create_folder" });
  };

  const executeNewFile = async (fileName: string, folderPath: string = "") => {
    if (!roomId) return;
    const finalPath = folderPath 
      ? `${folderPath.endsWith('/') ? folderPath : folderPath + '/'}${fileName}`
      : fileName;

    if (Object.keys(fileData).some(path => path === finalPath)) {
      toast.error("File already exists");
      return;
    }

    const initialContent = getFileTemplate(fileName);
    const { data: newFile, error } = await supabase
      .from("files")
      .insert({ room_id: roomId, path: finalPath, content: initialContent })
      .select("id, path, content")
      .single();

    if (error) {
      toast.error(error.message);
    } else if (newFile) {
      toast.success("File created!");
      const newPath = newFile.path;

      setFileData(prev => ({ ...prev, [newPath]: { id: newFile.id, content: newFile.content || "" } }));
      setDbFileData(prev => ({ ...prev, [newPath]: { id: newFile.id, content: newFile.content || "" } }));
      setFileTree(buildFileTree([...Object.keys(fileData).map(p => ({ path: p })), { path: newPath }]));
      setDirtyFiles(prev => {
        const next = new Set(prev).add(newPath);
        dirtyFilesRef.current = next;
        return next;
      });
      // Also update localStorage so it's not marked as empty state
      setSavedContentForPreview(prev => ({ ...prev, [newPath]: initialContent }));

      setActiveFile(newPath);
      setOpenFiles(prev => [...prev, newPath]);

      broadcastFileOperation("create", { path: newPath });
    }
  };

  const executeNewFolder = async (folderName: string, folderPath: string = "") => {
    if (!roomId) return;
    const baseDir = folderPath 
      ? (folderPath.endsWith('/') ? folderPath : folderPath + '/')
      : "";
    const finalPath = `${baseDir}${folderName}/`;

    if (Object.keys(fileData).some(p => p.startsWith(finalPath))) {
      toast.error("Folder already exists");
      return;
    }

    const { data: newFile, error } = await supabase
      .from("files")
      .insert({ room_id: roomId, path: finalPath, content: "" })
      .select("id, path, content")
      .single();

    if (error) {
      toast.error(error.message);
    } else if (newFile) {
      toast.success("Folder created!");
      const newPath = newFile.path;

      setFileData(prev => ({ ...prev, [newPath]: { id: newFile.id, content: newFile.content || "" } }));
      setDbFileData(prev => ({ ...prev, [newPath]: { id: newFile.id, content: newFile.content || "" } }));
      setFileTree(buildFileTree([...Object.keys(fileData).map(p => ({ path: p })), { path: newPath }]));
      setDirtyFiles(prev => {
        const next = new Set(prev).add(newPath);
        dirtyFilesRef.current = next;
        return next;
      });

      broadcastFileOperation("create", { path: newPath });
    }
  };

  const handleRenameFile = async (path: string, currentName: string) => {
    if (!checkPermissions()) return;
    setFileOpDialog({ open: true, type: "rename", path: path, initialValue: currentName });
  };

  const executeRenameFile = async (oldPath: string, newName: string) => {
    const pathParts = oldPath.split('/');
    pathParts[pathParts.length - 1] = newName;
    const newPath = pathParts.join('/');

    if (newPath === oldPath) return;

    const { error } = await supabase.from("files").update({ path: newPath }).eq("room_id", roomId).eq("path", oldPath);

    if (error) {
      toast.error(error.message);
    } else {
      if (roomId) {
        const oldKey = getLocalStorageKey(roomId, oldPath);
        const newKey = getLocalStorageKey(roomId, newPath);
        const localContent = localStorage.getItem(oldKey);
        if (localContent !== null) {
          localStorage.setItem(newKey, localContent);
          localStorage.removeItem(oldKey);
        }
      }

      toast.success("Renamed successfully!");
      await refreshFileTree();
      setOpenFiles(prev => prev.map(p => p === oldPath ? newPath : p));
      if (activeFile === oldPath) setActiveFile(newPath);
      broadcastFileOperation("rename", { oldPath, newPath });
    }
  };

  const handleDeleteFile = async (path: string) => {
    if (!checkPermissions()) return;
    setFileOpDialog({ open: true, type: "delete", path: path });
  };

  const executeDeleteFile = async (path: string) => {
    // We need to recursively search the tree to determine if it's a folder,
    // or simply check if any known database path starts with path + '/'
    const isFolder = path.endsWith("/") || Object.keys(fileData).some(p => p.startsWith(`${path}/`)) || fileTree.some(function checkFolder(node: any): boolean {
      if (node.path === path && node.type === 'folder') return true;
      if (node.children) return node.children.some(checkFolder);
      return false;
    });

    let deleteError = null;
    
    if (isFolder) {
      // Correctly delete the folder itself AND all items inside
      // We check for path, path/ and path/% to be absolutely safe
      const { error } = await supabase.from("files")
        .delete()
        .eq("room_id", roomId)
        .or(`path.eq."${path}",path.eq."${path}/",path.like."${path}/%"`);

      deleteError = error;
    } else {
      const { error } = await supabase.from("files")
        .delete()
        .eq("room_id", roomId)
        .eq("path", path);
      deleteError = error;
    }

    if (deleteError) {
      toast.error(deleteError.message);
    } else {
      if (roomId) {
        const localKey = getLocalStorageKey(roomId, path);
        localStorage.removeItem(localKey);
      }

      toast.success(isFolder ? "Folder deleted!" : "File deleted!");
      await refreshFileTree();
      
      if (isFolder) {
        setOpenFiles(prev => prev.filter(p => !p.startsWith(path + '/')));
        if (activeFile && activeFile.startsWith(path + '/')) {
          setActiveFile(openFiles.filter(p => !p.startsWith(path + '/'))[0] || null);
        }
      } else {
        setOpenFiles(prev => prev.filter(p => p !== path));
        if (activeFile === path) setActiveFile(openFiles.filter(p => p !== path)[0] || null);
      }
      
      broadcastFileOperation("delete", { path });
    }
  };

  if (!currentUser || !currentUserProfile || isPermissionLoading || permission === undefined || !isInitialFilesLoaded) return (
    <div className="h-screen w-full bg-background flex items-center justify-center text-foreground">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-3" style={{ strokeWidth: 1.5 }} />
        <p>Loading Editor...</p>
      </div>
    </div>
  );

  const fileContentsForEditor = Object.fromEntries(
    Object.entries(fileData).map(([path, data]) => [path, data.content])
  );

  return (
    <>
      <MainLayout
        files={fileTree}
        openFiles={openFiles}
        activeFile={activeFile}
        fileContents={fileContentsForEditor}
        savedFileContents={savedContentForPreview}
        dirtyFiles={dirtyFiles}
        uncommittedFiles={uncommittedFiles}
        onFileSelect={handleFileSelect}
        onTabClick={setActiveFile}
        onTabClose={handleTabClose}
        onNewFile={handleNewFile}
        onNewFolder={handleNewFolder}
        onRenameFile={handleRenameFile}
        onDeleteFile={handleDeleteFile}
        onCodeChange={handleCodeChange}
        currentUser={currentUserProfile}
        connectedUsers={users.filter(u => u.id !== currentUser.id)}
        globalTypingUsers={Object.values(typingStates)
          .map(s => s.user)
          .filter(u => u.id !== currentUser.id)}
        isReadOnly={isReadOnly}
        onSaveClick={handleSave}
        onCommitClick={() => setIsCommitDialogOpen(true)}
        onHistoryClick={() => setIsHistoryDialogOpen(true)}
        onRestoreClick={handleRestore}
        projectType={projectType}
        isSaving={isSaving}
        projectName={project?.name}
      />
      <CommitDialog
        isOpen={isCommitDialogOpen}
        onOpenChange={setIsCommitDialogOpen}
        onCommit={handleCommit}
        isCommitting={isBatchCommitting}
        uncommittedFiles={Array.from(uncommittedFiles)}
      />
      <HistoryDialog
        isOpen={isHistoryDialogOpen}
        onOpenChange={setIsHistoryDialogOpen}
        fileId={activeFile ? fileData[activeFile]?.id : null}
        fileName={activeFile ? activeFile.split('/').pop() || activeFile : null}
      />
      <FileOperationDialog
        open={fileOpDialog.open}
        type={fileOpDialog.type}
        path={fileOpDialog.path}
        initialValue={fileOpDialog.initialValue}
        folders={getFoldersFromTree(fileTree)}
        onClose={() => setFileOpDialog({ open: false, type: "create_file" })}
        onSubmit={(value, folder) => {
          if (fileOpDialog.type === "create_file") executeNewFile(value, folder);
          if (fileOpDialog.type === "create_folder") executeNewFolder(value, folder);
          if (fileOpDialog.type === "rename" && fileOpDialog.path) executeRenameFile(fileOpDialog.path, value);
          if (fileOpDialog.type === "delete" && fileOpDialog.path) executeDeleteFile(fileOpDialog.path);
        }}
      />
    </>
  );
};

export default EditorPage;