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
      'html': 'html'
    };
    const ext = extMap[type] || 'cpp';
    return getFileIconUrl(`file.${ext}`);
  };

  return (
    <Card 
      className="group flex flex-col hover:border-primary/80 hover:shadow-lg transition-all duration-300 bg-secondary/30 border-border/50"
    >
      <CardHeader className="cursor-pointer" onClick={() => navigate(`/editor/${project.room_id}`)}>
        <div className="flex items-center gap-3">
          <img src={getProjectTypeIcon(project.project_type)} alt={project.project_type} className="h-6 w-6" />
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors truncate">{project.name}</CardTitle>
            <CardDescription>{lastEdited}</CardDescription>
          </div>
          {isOwner ? (
            <Badge variant="outline" className="border-primary/50 text-primary ml-2">Owner</Badge>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={project.owner_avatar_url || undefined} alt={project.owner_username || 'Owner'} />
                <AvatarFallback className="text-xs">{project.owner_username?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{project.owner_username}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter className="flex justify-between items-center pt-4 border-t border-border/50">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5" title={`${project.commit_count} commits`}>
            <GitCommit className="h-4 w-4" />
            <span>{project.commit_count}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-primary hover:bg-primary/10"
            onClick={() => navigate(`/editor/${project.room_id}`)}
          >
            Open <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
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
          )}
        </div>
      </CardFooter>
    </Card>
  );
};