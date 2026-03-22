import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Folder, Plus, Lock, Users } from "lucide-react";
import { toast } from "sonner";
import { useCreateProject, ProjectType } from "@/hooks/projects";
import { useFriends } from "@/hooks/friends";
import { useProfile } from "@/hooks/profiles";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { ProjectTypeSelector } from "@/components/projects/ProjectTypeSelector";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  const navigate = useNavigate();
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { data: friends } = useFriends();
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);

  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectType, setNewProjectType] = useState<ProjectType>('cpp');
  const [newProjectPermission, setNewProjectPermission] = useState<'editor' | 'viewer'>('viewer');
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ path: string; content: string }[]>([]);
  const [isReadingFiles, setIsReadingFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pro status check
  const isPro = profile?.tier === 'pro' || profile?.tier === 'admin';

  const MAX_FILES = 50;
  const MAX_TOTAL_SIZE = 1 * 1024 * 1024; // 1MB

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    createProject({
      projectName: newProjectName,
      projectType: newProjectType,
      defaultPermission: newProjectPermission,
      inviteeIds: invitedFriends,
      initialFiles: uploadedFiles.length > 0 ? uploadedFiles : undefined
    }, {
      onSuccess: (data) => {
        navigate(`/editor/${data.new_room_id}`);
        onOpenChange(false);
        setNewProjectName("");
        setNewProjectType('cpp');
        setInvitedFriends([]);
        setUploadedFiles([]);
      }
    });
  };

  const handleUploadButtonClick = () => {
    if (!isPro) {
      toast.error("Uploading local folders is a PRO feature.", {
        description: "Upgrade your account to unlock folder uploads and easily import large projects."
      });
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFolderUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsReadingFiles(true);
    const newUploadedFiles: { path: string; content: string }[] = [];
    let totalSize = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = file.webkitRelativePath || file.name;
        const pathParts = path.split('/');
        
        // Skip hidden files, hidden directories, node_modules, and common build artifacts
        const shouldSkip = pathParts.some(part => 
          part.startsWith('.') || 
          part === 'node_modules' || 
          part === 'dist' || 
          part === 'build' ||
          part === 'out' ||
          part === 'target' ||
          part === 'venv' ||
          part === 'env' ||
          part === '__pycache__' ||
          part === '.git'
        );

        if (shouldSkip) continue;

        // Only allow relevant source code and text files
        const isSourceFile = 
          file.name.endsWith('.js') || file.name.endsWith('.ts') || 
          file.name.endsWith('.tsx') || file.name.endsWith('.jsx') || 
          file.name.endsWith('.cpp') || file.name.endsWith('.h') || 
          file.name.endsWith('.hpp') || file.name.endsWith('.c') ||
          file.name.endsWith('.json') || file.name.endsWith('.py') ||
          file.name.endsWith('.html') || file.name.endsWith('.css') ||
          file.name.endsWith('.md') || file.name.endsWith('.txt') ||
          file.name.endsWith('.sql') || file.name.endsWith('.yml') ||
          file.name.endsWith('.yaml');

        if (!isSourceFile) continue;

        totalSize += file.size;

        if (totalSize > MAX_TOTAL_SIZE) {
          toast.error("Total project size exceeds 1MB limit.");
          setIsReadingFiles(false);
          return;
        }

        const content = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string || "");
          reader.readAsText(file);
        });

        // Use the relative path (webkitRelativePath)
        newUploadedFiles.push({ path, content });

        if (newUploadedFiles.length > MAX_FILES) {
          toast.error(`Too many files. Maximum allowed is ${MAX_FILES}.`);
          setIsReadingFiles(false);
          return;
        }
      }

      setUploadedFiles(newUploadedFiles);
      if (newUploadedFiles.length > 0 && !newProjectName) {
        // Auto-fill project name from folder name if empty
        const folderName = newUploadedFiles[0].path.split('/')[0];
        setNewProjectName(folderName);
      }
      toast.success(`Loaded ${newUploadedFiles.length} files successfully.`);
    } catch (err) {
      toast.error("Failed to read some files.");
    } finally {
      setIsReadingFiles(false);
    }
  };

  const friendOptions = friends?.map(f => ({ value: f.id, label: f.username })) || [];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Project</DialogTitle>
            <DialogDescription>Choose a project type, give it a name, and set permissions.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateProject}>
            <div className="py-4 space-y-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Project Type</Label>
                <ProjectTypeSelector value={newProjectType} onChange={setNewProjectType} />
              </div>
              <Input
                id="project-name"
                placeholder="e.g., My Awesome App"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                autoFocus
              />
              <div>
                <Label className="text-sm font-medium mb-2 block">Invite Friends (Optional)</Label>
                <MultiSelect
                  options={friendOptions}
                  selected={invitedFriends}
                  onChange={setInvitedFriends}
                  placeholder="Select friends to invite..."
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block tracking-tight">Project Permissions</Label>
                <RadioGroup
                  value={newProjectPermission}
                  onValueChange={(value: 'editor' | 'viewer') => setNewProjectPermission(value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem value="viewer" id="create-private" className="peer sr-only" />
                    <Label htmlFor="create-private" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 transition-all hover:bg-secondary/50 hover:border-muted-foreground/30 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/[0.03] cursor-pointer">
                      <Lock className="mb-2 h-5 w-5" /> 
                      <span className="text-xs font-semibold">Private</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="editor" id="create-collaborative" className="peer sr-only" />
                    <Label htmlFor="create-collaborative" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 transition-all hover:bg-secondary/50 hover:border-muted-foreground/30 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/[0.03] cursor-pointer">
                      <Users className="mb-2 h-5 w-5" /> 
                      <span className="text-xs font-semibold">Collaborative</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="pt-2 border-t border-border/50">
                <Label className="text-sm font-medium mb-3 block opacity-80">Advanced Options</Label>
                <div className="flex flex-col gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFolderUpload}
                    // @ts-ignore - webkitdirectory is non-standard
                    webkitdirectory=""
                    directory=""
                    multiple
                    className="hidden"
                  />
                  <div className="flex items-center justify-between gap-3 p-3 rounded-lg border border-dashed border-border bg-secondary/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-background border border-border">
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">Upload Local Folder</p>
                      </div>
                    </div>
                    {uploadedFiles.length > 0 ? (
                      <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                          {uploadedFiles.length} files
                        </span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-[10px] text-destructive hover:bg-destructive/10"
                          onClick={() => setUploadedFiles([])}
                        >
                          Clear
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-xs font-medium"
                        disabled={isReadingFiles}
                        onClick={handleUploadButtonClick}
                      >
                        {isReadingFiles ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Folder className="h-3 w-3 mr-1" />}
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isCreating || !newProjectName.trim()}>
                {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Project
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
