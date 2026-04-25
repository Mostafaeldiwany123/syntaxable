import React, { useState } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Share2, Plus, Home, Users, Save, History, Play, Upload, GitCommit, RotateCcw, Download } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useIsProjectOwner } from '@/hooks/permissions';
import { ManagePermissionsDialog } from '@/components/editor/ManagePermissionsDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProjectType } from '@/hooks/projects';

interface UserPresence {
  id: string;
  username: string;
  avatar_url: string;
}

interface StatusBarProps {
  currentUser: { username: string; avatar_url: string; status: string; } | null;
  connectedUsers: UserPresence[];
  projectName?: string;
  typingUsers?: { id: string; username: string; avatar_url: string; }[];
  onRunCode?: () => void;
  isReadOnly?: boolean;
  hasDirtyFiles: boolean;
  hasUncommittedFiles: boolean;
  onSaveClick: () => void;
  onCommitClick: () => void;
  onHistoryClick: () => void;
  onRestoreClick?: () => void;
  projectType?: ProjectType | null;
  isSaving?: boolean;
  onExportClick?: () => void;
}

const getInitials = (username: string | undefined): string => {
  if (username) {
    return username.charAt(0).toUpperCase();
  }
  return 'U';
};

const StatusBar = ({
  currentUser,
  connectedUsers,
  projectName,
  typingUsers,
  onRunCode,
  isReadOnly = false,
  hasDirtyFiles,
  hasUncommittedFiles,
  onSaveClick,
  onCommitClick,
  onHistoryClick,
  onRestoreClick,
  projectType,
  isSaving = false,
  onExportClick
}: StatusBarProps) => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { data: isOwner } = useIsProjectOwner(roomId);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const isMobile = useIsMobile();

  const userInitials = getInitials(currentUser?.username);

  const handleRunCode = () => {
    if (isReadOnly) {
      return;
    }
    onRunCode?.();
  };

  return (
    <>
      <div className="h-12 bg-card border-t border-border flex items-center px-2 md:px-4 select-none overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full">
        {/* Left: Navigation & Actions */}
        <div className="flex items-center gap-0.5 md:gap-1 flex-1 min-w-max">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <Link to="/">
                  <Home className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <Link to={`/room/${roomId}`}>
                  <Share2 className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share Project</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={onHistoryClick}>
                <History className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View History</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={onExportClick}>
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export to ZIP</p>
            </TooltipContent>
          </Tooltip>
          <AlertDialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" disabled={!hasUncommittedFiles || isReadOnly}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Restore to Previous Commit</p>
              </TooltipContent>
            </Tooltip>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Restore to Previous Commit</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to restore to the previous commit? This will discard all uncommitted changes and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onRestoreClick}>Restore</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {!isReadOnly && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 relative shrink-0"
                    onClick={onSaveClick}
                    disabled={!hasDirtyFiles || isSaving}
                  >
                    <Save className="h-4 w-4" />
                    {hasDirtyFiles && <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-blue-500" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isSaving ? 'Saving...' : 'Save (Ctrl+S)'}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={hasUncommittedFiles ? "secondary" : "ghost"}
                    size="sm"
                    className="h-8 gap-1.5 relative shrink-0"
                    onClick={onCommitClick}
                    disabled={!hasUncommittedFiles}
                  >
                    <Upload className="h-4 w-4" />
                    <span className="hidden sm:inline">Commit</span>
                    {hasUncommittedFiles && <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-green-500" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{hasUncommittedFiles ? 'Commit changes' : 'No changes to commit'}</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </div>

        {/* Center: Typing Presence or Project Name */}
        {!isMobile && (
          <div className="flex-1 flex justify-center px-2 min-w-max">
            {typingUsers && typingUsers.length > 0 ? (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/60 border border-border/60 w-64 md:w-72 justify-center">
                <div className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                  <span className="font-medium text-foreground/90 truncate">{typingUsers[0].username}</span>
                  <span className="opacity-80">is typing</span>
                  <span className="flex items-center gap-1 ml-0.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/80 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/80 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/80 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                  {typingUsers.length > 1 && (
                    <span className="opacity-70 truncate">+{typingUsers.length - 1}</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="px-3 py-1 rounded-full bg-secondary/60 border border-border/60 w-64 md:w-72 flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground truncate text-center">
                  {projectName || 'Untitled Project'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Right: Connected Users & Run Button */}
        <div className="flex items-center gap-2 md:gap-3 justify-end flex-1 min-w-max ml-auto pl-2">
          <div className="flex items-center -space-x-2 shrink-0">
            {connectedUsers.map((user) => (
              <Tooltip key={user.id}>
                <TooltipTrigger>
                  <Avatar className="h-7 w-7 border-2 border-card">
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback className="text-xs">
                      {getInitials(user.username)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.username}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            {isOwner ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-xs border-2 border-card text-muted-foreground hover:bg-secondary/80 transition-colors"
                    onClick={() => setIsPermissionsOpen(true)}
                    aria-label="Manage Access"
                  >
                    <Users size={12} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Manage Access</p>
                </TooltipContent>
              </Tooltip>
            ) : roomId ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-xs border-2 border-card text-muted-foreground hover:bg-secondary/80 transition-colors"
                    onClick={() => navigate(`/room/${roomId}`)}
                    aria-label="Invite"
                  >
                    <Plus size={12} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Invite</p>
                </TooltipContent>
              </Tooltip>
            ) : null}
          </div>

          <button
            onClick={handleRunCode}
            disabled={!onRunCode || isReadOnly}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="h-3.5 w-3.5" />
            <span>{projectType === 'react' || projectType === 'html' ? 'Preview' : 'Run'}</span>
          </button>
        </div>
      </div>
      {roomId && <ManagePermissionsDialog roomId={roomId} isOpen={isPermissionsOpen} onOpenChange={setIsPermissionsOpen} />}
    </>
  );
};

export default StatusBar;