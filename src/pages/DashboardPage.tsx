import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, LogIn, Loader2, ArrowRight, Folder, Users, Lock, Code2, GitCommit, Clock, FolderPlus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRecentProjects, useCreateProject, useProjects, ProjectType } from "@/hooks/projects";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/profiles";
import { useFriends } from "@/hooks/friends";
import { useTotalCommits } from "@/hooks/stats";
import { useProjectLimit } from "@/hooks/useProjectLimit";
import { MultiSelect } from "@/components/ui/multi-select";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { OnlineFriends } from "@/components/dashboard/OnlineFriends";
import { ProjectTypeSelector } from "@/components/projects/ProjectTypeSelector";
import { UpgradeDialog } from "@/components/projects/UpgradeDialog";
import { getFileIconUrl } from "@/lib/project-utils";
import { toast } from "sonner";
import { useCustomSetByShortCode } from "@/hooks/customSets";

const DashboardPage = () => {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>('cpp');
  const [permission, setPermission] = useState<'editor' | 'viewer'>('viewer');
  const [roomId, setRoomId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);
  const [isSearchingSet, setIsSearchingSet] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);

  const { data: projects } = useProjects();
  const { data: recentProjects, isLoading: isLoadingRecent } = useRecentProjects(3);
  const { mutate: createProjectMutate, isPending: isCreating } = useCreateProject();
  const { data: friends } = useFriends();
  const { data: totalCommits } = useTotalCommits();
  const { canCreate, projectCount, limit } = useProjectLimit();

  const isPro = profile?.tier === 'pro' || profile?.tier === 'admin';

  const { refetch: findCustomSet } = useCustomSetByShortCode(
    roomId.length === 8 ? roomId : undefined
  );

  const handleOpenCreateDialog = () => {
    if (!canCreate) {
      setShowUpgradeDialog(true);
      return;
    }
    setIsDialogOpen(true);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    createProjectMutate({ projectName, projectType, defaultPermission: permission, inviteeIds: invitedFriends }, {
      onSuccess: (data) => {
        const { new_room_id } = data;
        navigate(`/editor/${new_room_id}`);
        setIsDialogOpen(false);
        setProjectName("");
        setProjectType('cpp');
        setInvitedFriends([]);
      },
    });
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedId = roomId.trim();
    
    if (!trimmedId) {
      toast.error("Please enter a code");
      return;
    }
    
    const isShortCode = /^[a-zA-Z0-9]{8}$/i.test(trimmedId);
    
    if (isShortCode) {
      // Try to find custom set first, then fall back to room
      setIsSearchingSet(true);
      try {
        const { data: setData } = await findCustomSet();
        if (setData && setData.id) {
          navigate(`/practice/custom/${setData.id}`);
          return;
        }
        
        // If custom set not found, try to join as room
        // First verify the room exists by checking permission
        const { data: roomData, error: roomError } = await supabase.rpc('ensure_user_permission', { p_room_id: trimmedId });
        
        if (!roomError && roomData && roomData[0]?.level) {
          navigate(`/editor/${trimmedId}`);
        } else {
          toast.error("Code not found. Please check and try again.");
        }
      } catch (error) {
        toast.error("Failed to find code. Please try again.");
      } finally {
        setIsSearchingSet(false);
      }
    } else if (trimmedId.length > 8) {
      navigate(`/editor/${trimmedId}`);
    } else {
      toast.error("Invalid code format. Must be 8 characters or a full ID.");
    }
  };

  const welcomeMessage = profile?.username ? `Welcome back, ${profile.username}` : "Welcome to Syntaxable";
  const friendOptions = friends?.map(f => ({ value: f.id, label: f.username })) || [];

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
    <div className="min-h-full">
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{welcomeMessage}</h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                {user ? "Continue coding or start something new." : "Sign in to start collaborating on code."}
              </p>
            </div>
            {user && (
              <>
                <Button className="w-full sm:w-auto" onClick={handleOpenCreateDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a New Project</DialogTitle>
                      <DialogDescription>Give your project a name and set its initial permissions.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateProject}>
                      <div className="py-4 space-y-6">
                        <div>
                          <Label className="text-sm font-medium mb-3 block">Project Type</Label>
                          <ProjectTypeSelector value={projectType} onChange={setProjectType} />
                        </div>
                        <Input
                          id="project-name"
                          placeholder="e.g., My Awesome App"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
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
                          <Label className="text-sm font-medium mb-2 block">Default Permissions</Label>
                          <RadioGroup
                            value={permission}
                            onValueChange={(value: 'editor' | 'viewer') => setPermission(value)}
                            className="grid grid-cols-2 gap-4"
                          >
                            <div>
                              <RadioGroupItem value="viewer" id="private" className="peer sr-only" />
                              <Label htmlFor="private" className="flex flex-col items-center justify-between border border-border bg-card p-4 transition-colors hover:bg-secondary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 rounded-lg">
                                <Lock className="mb-3 h-5 w-5" />
                                <span className="text-sm font-medium">Private</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="editor" id="collaborative" className="peer sr-only" />
                              <Label htmlFor="collaborative" className="flex flex-col items-center justify-between border border-border bg-card p-4 transition-colors hover:bg-secondary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 rounded-lg">
                                <Users className="mb-3 h-5 w-5" />
                                <span className="text-sm font-medium">Collaborative</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={isCreating || !projectName.trim()}>
                          {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Create Project
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <UpgradeDialog
                  open={showUpgradeDialog}
                  onOpenChange={setShowUpgradeDialog}
                  currentCount={projectCount}
                  limit={limit}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {user ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-8 space-y-6 lg:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group border border-border bg-card p-5 sm:p-6 hover:border-primary/50 transition-colors rounded-lg flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FolderPlus className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Create Project</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Start a new coding environment with a shareable link.
                  </p>
                  <Button variant="outline" size="sm" onClick={handleOpenCreateDialog}>
                    New Project
                  </Button>
                </div>

                <div className="group border border-border bg-card p-5 sm:p-6 hover:border-primary/50 transition-colors rounded-lg flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <LogIn className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Join with Code</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Enter an 8-character code to join a room or practice set.
                  </p>
                  <form onSubmit={handleJoinRoom} className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        placeholder="Enter 8-char code..."
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="pr-8"
                        maxLength={8}
                      />
                    </div>
                    <Button type="submit" size="sm" disabled={!roomId.trim() || isSearchingSet}>
                      {isSearchingSet ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                    </Button>
                  </form>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="border border-border bg-card p-4 sm:p-5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Projects</span>
                    <Folder className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">{projects?.length || 0}</div>
                </div>
                <div className="border border-border bg-card p-4 sm:p-5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Friends</span>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">{friends?.length || 0}</div>
                </div>
                <div className="border border-border bg-card p-4 sm:p-5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Commits</span>
                    <GitCommit className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">{totalCommits || 0}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Recent Projects</h2>
                  <Link to="/projects" className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                </div>
                {isLoadingRecent ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : recentProjects && recentProjects.length > 0 ? (
                  <div className="space-y-2">
                    {recentProjects.map((project) => (
                      <Link
                        to={`/editor/${project.room_id}`}
                        key={project.id}
                        className="flex items-center justify-between p-4 border border-border bg-card hover:border-primary/50 hover:bg-secondary/30 transition-colors group rounded-lg"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          <div className="p-2 bg-secondary shrink-0">
                            <img src={getProjectTypeIcon(project.project_type)} alt={project.project_type} className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{project.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 shrink-0" />
                              <span className="truncate">{formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <Avatar className="h-7 w-7 border border-border hidden sm:block">
                            <AvatarImage src={project.owner_avatar_url || undefined} />
                            <AvatarFallback className="text-xs">
                              {project.owner_username?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-border py-12 text-center rounded-lg">
                    <Folder className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">No projects yet.</p>
                    <Button className="mt-4" onClick={handleOpenCreateDialog}>
                      Create Your First Project
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <ActivityChart />
              <OnlineFriends />
            </div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto text-center py-12 sm:py-16">
            <div className="border border-border bg-card p-6 sm:p-8 rounded-lg">
              <Code2 className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Start Collaborating</h2>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Sign in to create projects, collaborate with friends, and track your coding progress.
              </p>
              <div className="space-y-3">
                <Button className="w-full" onClick={() => navigate('/')}>
                  Sign In
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;