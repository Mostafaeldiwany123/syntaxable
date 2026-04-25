import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    ChevronDown,
    FilePlus,
    FolderPlus,
    MoreVertical,
    Folder,
    FolderOpen,
} from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { getFileIconUrl } from '@/lib/project-utils';

export type FileNode = {
    path: string;
    name: string;
    type: "file" | "folder";
    children?: FileNode[];
};

interface FileExplorerProps {
    files: FileNode[];
    onFileSelect: (path: string) => void;
    onNewFile: () => void;
    onNewFolder: () => void;
    onRenameFile: (path: string, currentName: string) => void;
    onDeleteFile: (path: string) => void;
    activeFile: string | null;
    isReadOnly?: boolean;
    projectName?: string;
    dirtyFiles: Set<string>;
    uncommittedFiles?: Set<string>;
}

/** Returns true if this folder node (or any descendant) contains the given file path */
const folderContainsFile = (node: FileNode, filePath: string): boolean => {
    if (!node.children) return false;
    return node.children.some(child =>
        child.type === 'file'
            ? child.path === filePath
            : folderContainsFile(child, filePath)
    );
};

const FileItem = ({
    item,
    level = 0,
    onSelect,
    activeFile,
    onRename,
    onDelete,
    isReadOnly,
    dirtyFiles,
    uncommittedFiles = new Set(),
}: {
    item: FileNode,
    level?: number,
    onSelect: (path: string) => void,
    activeFile: string | null,
    onRename: (path: string, currentName: string) => void,
    onDelete: (path: string) => void,
    isReadOnly?: boolean,
    dirtyFiles: Set<string>,
    uncommittedFiles?: Set<string>,
}) => {
    // Folders start expanded by default
    const [isOpen, setIsOpen] = useState(true);

    // Auto-expand this folder whenever the active file lives inside it
    useEffect(() => {
        if (item.type === 'folder' && activeFile && folderContainsFile(item, activeFile)) {
            setIsOpen(true);
        }
    }, [activeFile, item]);

    const isFolder = item.type === 'folder';
    const isActive = item.type === 'file' && activeFile === item.path;
    const isDirty = item.type === 'file' && dirtyFiles.has(item.path);
    const isUncommitted = item.type === 'file' && uncommittedFiles.has(item.path);

    const toggleOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleClick = () => {
        if (isFolder) {
            setIsOpen(!isOpen);
        } else {
            onSelect(item.path);
        }
    };

    const handleRename = () => {
        if (isReadOnly) return;
        onRename(item.path, item.name);
    };

    const handleDelete = () => {
        if (isReadOnly) return;
        onDelete(item.path);
    };

    return (
        <div className="select-none">
            <ContextMenu>
                <ContextMenuTrigger disabled={isReadOnly}>
                    <div
                        className={`
                            flex items-center py-1.5 px-2 cursor-pointer transition-colors border-l-2 group
                            ${isActive
                                ? 'bg-secondary/50 text-foreground border-primary'
                                : 'border-transparent text-muted-foreground hover:bg-secondary/30 hover:text-foreground'
                            }
                        `}
                        style={{ paddingLeft: `${level * 12 + 12}px` }}
                        onClick={handleClick}
                    >
                        <span className="mr-1.5 opacity-80 shrink-0 flex items-center justify-center w-4">
                            {isFolder && (
                                <div onClick={toggleOpen} className="hover:text-foreground">
                                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </div>
                            )}
                        </span>

                        <span className="mr-2 shrink-0 flex items-center justify-center w-4">
                            {isFolder ? (
                                isOpen ? (
                                    <FolderOpen size={16} className="text-blue-400 fill-blue-400/20" />
                                ) : (
                                    <Folder size={16} className="text-blue-400 fill-blue-400/20" />
                                )
                            ) : (
                                <img src={getFileIconUrl(item.name)} alt="" className="w-4 h-4" />
                            )}
                        </span>

                        <span className="text-[13px] truncate flex-1 font-normal">
                            {item.name}
                        </span>

                        {isDirty ? (
                            <div className="ml-2 h-2 w-2 rounded-full bg-blue-500" />
                        ) : isUncommitted ? (
                            <div className="ml-2 h-2 w-2 rounded-full bg-green-400" />
                        ) : null}

                        {!isReadOnly && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-secondary/50 rounded transition-opacity"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <MoreVertical size={14} className="text-muted-foreground" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-32 bg-popover border-border text-popover-foreground p-1">
                                    <DropdownMenuItem onClick={handleRename} className="cursor-pointer text-xs px-2 py-1">
                                        Rename
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-xs text-destructive px-2 py-1">
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-32 bg-popover border-border text-popover-foreground p-1">
                    <ContextMenuItem onClick={handleRename} className="cursor-pointer text-xs px-2 py-1">
                        Rename
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={handleDelete} className="cursor-pointer text-xs text-destructive px-2 py-1">
                        Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            {isFolder && isOpen && item.children && (
                <div>
                    {item.children.map((child) => (
                        <FileItem
                            key={child.path}
                            item={child}
                            level={level + 1}
                            onSelect={onSelect}
                            activeFile={activeFile}
                            onRename={onRename}
                            onDelete={onDelete}
                            isReadOnly={isReadOnly}
                            dirtyFiles={dirtyFiles}
                            uncommittedFiles={uncommittedFiles}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const FileExplorer = ({
    files,
    onFileSelect,
    onNewFile,
    onNewFolder,
    onRenameFile,
    onDeleteFile,
    activeFile,
    isReadOnly = false,
    projectName = "PROJECT",
    dirtyFiles,
    uncommittedFiles = new Set(),
}: FileExplorerProps) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="h-full flex flex-col bg-card text-muted-foreground select-none">
            {/* Top Bar "EXPLORER" */}
            <div className="flex items-center justify-between px-4 py-2.5 text-[11px] font-medium text-muted-foreground tracking-wider">
                <span>EXPLORER</span>
            </div>

            {/* Project Header */}
            <div className="flex flex-col">
                <div
                    className="flex items-center justify-between px-1 py-1 cursor-pointer transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-0.5 font-bold text-[11px] text-foreground">
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        <span className="uppercase truncate ml-1">{projectName}</span>
                    </div>

                    <div className="flex items-center gap-1 mr-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onNewFile(); }}
                            className="p-0.5 hover:bg-secondary/50 rounded text-muted-foreground hover:text-foreground"
                            title="New File"
                            disabled={isReadOnly}
                        >
                            <FilePlus size={14} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onNewFolder(); }}
                            className="p-0.5 hover:bg-secondary/50 rounded text-muted-foreground hover:text-foreground"
                            title="New Folder"
                            disabled={isReadOnly}
                        >
                            <FolderPlus size={14} />
                        </button>
                    </div>
                </div>

                {/* File List */}
                {isExpanded && (
                    <ScrollArea className="flex-1 h-[calc(100vh-120px)]">
                        <div className="py-0">
                            {files.length === 0 ? (
                                <div className="text-center text-muted-foreground/60 text-xs py-8 italic">
                                    Empty project
                                </div>
                            ) : (
                                files.map(item => (
                                    <FileItem
                                        key={item.path}
                                        item={item}
                                        onSelect={onFileSelect}
                                        activeFile={activeFile}
                                        onRename={onRenameFile}
                                        onDelete={onDeleteFile}
                                        isReadOnly={isReadOnly}
                                        dirtyFiles={dirtyFiles}
                                        uncommittedFiles={uncommittedFiles}
                                    />
                                ))
                            )}
                        </div>
                    </ScrollArea>
                )}
            </div>
        </div>
    );
};

export default FileExplorer;