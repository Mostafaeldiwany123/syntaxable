import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Search, Folder, GitCommit, ArrowRight, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useProjects, useRenameProject, useDeleteProject, Project } from "@/hooks/projects";
import { useAuth } from "@/hooks/useAuth";
import { useProjectLimit } from "@/hooks/useProjectLimit";
import { UpgradeDialog } from "@/components/projects/UpgradeDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateProjectDialog } from "@/components/projects/CreateProjectDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getFileIconUrl } from "@/lib/project-utils";
import { formatDistanceToNow } from "date-fns";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: projects, isLoading } = useProjects();
  const { mutate: renameProject, isPending: isRenaming } = useRenameProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const { canCreate, projectCount, limit } = useProjectLimit();

  // State for modals and forms
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [renameValue, setRenameValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState('last_edited_at');

  const handleRenameProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!renameValue.trim() || !selectedProject) return;
    renameProject({ projectId: selectedProject.id, name: renameValue }, {
      onSuccess: () => {
        setIsRenameOpen(false);
        setRenameValue("");
        setSelectedProject(null);
      }
    });
  };

  const handleDeleteProject = () => {
    if (!selectedProject) return;
    deleteProject(selectedProject.id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedProject(null);
      }
    });
  };

  const openRenameDialog = (project: Project) => {
    setSelectedProject(project);
    setRenameValue(project.name);
    setIsRenameOpen(true);
  };

  const openDeleteDialog = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
  };

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

  const sortedAndFilteredProjects = useMemo(() => {
    const filtered = (projects || []).filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'created_at':
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            case 'last_edited_at':
            default:
                const dateA = a.last_edited_at ? new Date(a.last_edited_at).getTime() : 0;
                const dateB = b.last_edited_at ? new Date(b.last_edited_at).getTime() : 0;
                if (dateB !== dateA) return dateB - dateA;
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
    });
  }, [projects, searchTerm, sortBy]);

  const ownedProjects = useMemo(() =>
    sortedAndFilteredProjects.filter(p => p.owner_id === user?.id),
    [sortedAndFilteredProjects, user?.id]
  );

  const sharedProjects = useMemo(() =>
    sortedAndFilteredProjects.filter(p => p.owner_id !== user?.id),
    [sortedAndFilteredProjects, user?.id]
  );

  const handleOpenCreateDialog = () => {
    if (!canCreate) {
      setShowUpgradeDialog(true);
      return;
    }
    setIsCreateOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center md:min-h-dvh">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Your Projects
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Manage all your collaborative projects here.
              </p>
            </div>
            <Button
              onClick={handleOpenCreateDialog}
              className="w-full sm:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        <CreateProjectDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70 pointer-events-none z-10" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-[180px]">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last_edited_at">Last Edited</SelectItem>
                <SelectItem value="name">Alphabetical (A-Z)</SelectItem>
                <SelectItem value="created_at">Date Created</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {sortedAndFilteredProjects.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-xl bg-card">
            <Folder className="h-12 w-12 text-muted-foreground/45 mx-auto mb-4" />
            <p className="text-muted-foreground">{searchTerm ? "No projects match your search." : "You don't have any projects yet."}</p>
            {!searchTerm && (
              <Button
                className="mt-4"
                onClick={handleOpenCreateDialog}
              >
                Create a New Project
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Owned Projects */}
            {ownedProjects.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold">My Projects</h2>
                    <Badge variant="secondary" className="font-normal">
                      {projectCount}/{limit}
                    </Badge>
                  </div>
                </div>
                <div className="border border-border rounded-xl bg-card overflow-hidden">
                  <div className="divide-y divide-border/50">
                    {ownedProjects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center gap-4 p-4 hover:bg-secondary/20 transition-colors cursor-pointer group"
                        onClick={() => navigate(`/editor/${project.room_id}`)}
                      >
                        <div className="p-2 bg-secondary/50 border border-border rounded-lg shrink-0">
                          <img src={getProjectTypeIcon(project.project_type)} alt={project.project_type} className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-base truncate group-hover:text-primary transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {project.last_edited_at
                              ? `Edited ${formatDistanceToNow(new Date(project.last_edited_at), { addSuffix: true })}`
                              : `Created ${formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}`
                            }
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                          <div className="flex items-center gap-1.5">
                            <GitCommit className="h-3.5 w-3.5" />
                            <span>{project.commit_count}</span>
                          </div>
                          <div onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openRenameDialog(project)}>
                                  <Pencil className="mr-2 h-4 w-4" /> Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-500 focus:text-red-500"
                                  onClick={() => openDeleteDialog(project)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Shared Projects */}
            {sharedProjects.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Shared with Me</h2>
                </div>
                <div className="border border-border rounded-xl bg-card overflow-hidden">
                  <div className="divide-y divide-border/50">
                    {sharedProjects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center gap-4 p-4 hover:bg-secondary/20 transition-colors cursor-pointer group"
                        onClick={() => navigate(`/editor/${project.room_id}`)}
                      >
                        <div className="p-2 bg-secondary/50 border border-border rounded-lg shrink-0">
                          <img src={getProjectTypeIcon(project.project_type)} alt={project.project_type} className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-base truncate group-hover:text-primary transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Shared by {project.owner_username}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                          <div className="flex items-center gap-1.5">
                            <GitCommit className="h-3.5 w-3.5" />
                            <span>{project.commit_count}</span>
                          </div>
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={project.owner_avatar_url || undefined} />
                            <AvatarFallback className="text-[10px]">
                              {project.owner_username?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Rename Dialog */}
        <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename Project</DialogTitle>
              <DialogDescription>Enter a new name for your project.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRenameProject}>
              <div className="py-4">
                <Input
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  autoFocus
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setIsRenameOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isRenaming || !renameValue.trim()}>
                  {isRenaming && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the project "{selectedProject?.name}" and all its data.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDeleteProject} disabled={isDeleting}>
                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Upgrade Dialog */}
        <UpgradeDialog
          open={showUpgradeDialog}
          onOpenChange={setShowUpgradeDialog}
          currentCount={projectCount}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default ProjectsPage;