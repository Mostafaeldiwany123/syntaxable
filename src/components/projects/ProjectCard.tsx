import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Pencil, Trash2, ArrowRight, GitCommit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Project } from "@/hooks/projects";
import { Badge } from "@/components/ui/badge";
import { getFileIconUrl } from "@/lib/project-utils";

interface ProjectCardProps {
  project: Project;
  isOwner: boolean;
  onRename: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export const ProjectCard = ({ project, isOwner, onRename, onDelete }: ProjectCardProps) => {
  const navigate = useNavigate();

  const lastEdited = project.last_edited_at
    ? `Edited ${formatDistanceToNow(new Date(project.last_edited_at), { addSuffix: true })}`
    : `Created ${formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}`;

  const getProjectTypeIcon = (projectType: string) => {
    const type = projectType?.toLowerCase() || '';
    const extMap: Record<string, string> = {
      'react': 'tsx',
      'cpp': 'cpp',
      'c': 'c',
      'csharp': 'cs',
      'python': 'py',
      'html': 'html',
      'java': 'java',
      'javascript': 'js',
      'typescript': 'ts'
    };
    const ext = extMap[type] || 'cpp';
    return getFileIconUrl(`file.${ext}`);
  };

  return (
    <Card
      className="group flex flex-col hover:border-primary/50 hover:bg-card/65 transition-all duration-300 bg-card/45 backdrop-blur-sm border-border/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-xl overflow-hidden"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div 
            className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer" 
            onClick={() => navigate(`/editor/${project.room_id}`)}
          >
            <div className="p-2 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 rounded-lg shrink-0">
              <img src={getProjectTypeIcon(project.project_type)} alt={project.project_type} className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors truncate tracking-tight">
                {project.name}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground/80 mt-0.5">
                {lastEdited}
              </CardDescription>
            </div>
          </div>
          {isOwner && (
            <div onClick={(e) => e.stopPropagation()} className="shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted/50 text-muted-foreground hover:text-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onRename(project)}>
                    <Pencil className="mr-2 h-4 w-4" /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500"
                    onClick={() => onDelete(project)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-grow py-2 pb-4">
        {isOwner ? (
          <div className="flex items-center gap-1.5 text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-medium">Owner</span>
          </div>
        ) : (
          <div 
            className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 px-2.5 py-1 rounded-full border border-border/40 w-fit max-w-full"
            title={`Shared by ${project.owner_username || 'another user'}`}
          >
            <span className="shrink-0 text-[10px] uppercase tracking-wider font-semibold opacity-70">Shared by</span>
            <Avatar className="h-4 w-4 shrink-0 border border-background">
              <AvatarImage src={project.owner_avatar_url || undefined} alt={project.owner_username || 'Owner'} />
              <AvatarFallback className="text-[9px] bg-primary/20 text-primary-foreground font-semibold">
                {project.owner_username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-foreground truncate max-w-[120px]">
              {project.owner_username}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center py-3 border-t border-border/30 px-6">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5" title={`${project.commit_count} commits`}>
            <GitCommit className="h-3.5 w-3.5 text-muted-foreground/75" />
            <span>{project.commit_count} {project.commit_count === 1 ? 'commit' : 'commits'}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group/btn h-8 py-1"
          onClick={() => navigate(`/editor/${project.room_id}`)}
        >
          Open <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};