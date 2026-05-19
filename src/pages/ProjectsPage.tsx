import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Search, Users, Lock, Folder } from "lucide-react";
import { toast } from "sonner";
import { useProjects, useRenameProject, useDeleteProject, Project } from "@/hooks/projects";
import { useAuth } from "@/hooks/useAuth";
import { useProjectLimit } from "@/hooks/useProjectLimit";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { UpgradeDialog } from "@/components/projects/UpgradeDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateProjectDialog } from "@/components/projects/CreateProjectDialog";

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

  const handleOpenCreateDialog = () => {
    if (!canCreate) {
      setShowUpgradeDialog(true);
      return;
    }
    setIsCreateOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="border-b border-border/30 bg-background/25 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
                Your Projects
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Manage all your collaborative projects here.
              </p>
            </div>
            <Button 
              onClick={handleOpenCreateDialog} 
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 font-medium"
            >
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10 relative z-10">
        <div>
          <CreateProjectDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
        </div>

        <div className="mb-6 mt-2 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
            <Input 
              placeholder="Search projects..." 
              className="pl-10 bg-card/40 border-border/40 backdrop-blur-sm focus-visible:border-primary/50 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-[180px]">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-card/40 border-border/40 backdrop-blur-sm focus-visible:border-primary/50 transition-colors">
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
          <div className="text-center py-16 border border-dashed border-border/40 rounded-xl bg-card/20 backdrop-blur-sm">
            <Folder className="h-12 w-12 text-muted-foreground/45 mx-auto mb-4" />
            <p className="text-muted-foreground">{searchTerm ? "No projects match your search." : "You don't have any projects yet."}</p>
            {!searchTerm && (
              <Button 
                className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300" 
                onClick={handleOpenCreateDialog}
              >
                Create a New Project
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedAndFilteredProjects.map((project) => {
              const isOwner = user?.id === project.owner_id;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isOwner={isOwner}
                  onRename={openRenameDialog}
                  onDelete={openDeleteDialog}
                />
              );
            })}
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