import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/profiles";
import { useUserPublicRepos, Project } from "@/hooks/projects";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Star,
  Users,
  FileCode,
  GitCommit,
  Clock,
  Edit,
  Trophy,
  ChevronRight,
  MessageSquare,
  Crown
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getFileIconUrl } from "@/lib/project-utils";
import { ProfileSheet } from "@/components/profile/ProfileSheet";
import { useRealtimeProfile } from "@/hooks/useRealtimeProfile";
import { Progress } from "@/components/ui/progress";

interface CommitHistory {
  id: string;
  commit_message: string;
  created_at: string;
  file_path: string;
  project_name: string;
  project_type: string;
}

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: authUser } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile(userId);
  const { data: publicRepos, isLoading: reposLoading } = useUserPublicRepos(userId);
  
  useRealtimeProfile(userId);
  
  const isOwnProfile = authUser?.id === userId;
  const isPro = profile?.tier === 'pro' || profile?.tier === 'admin';

  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);

  const { data: practiceProgress } = useQuery({
    queryKey: ['userPracticeProgress', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('practice_progress')
        .select('problem_id, completed_at')
        .eq('user_id', userId!);
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
  });

  const { data: commitHistory, isLoading: commitsLoading } = useQuery<CommitHistory[], Error>({
    queryKey: ['userCommitHistory', userId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_user_commit_history', { 
        p_user_id: userId!, 
        p_limit: 100 
      });
      if (error) throw error;
      return (data as CommitHistory[]) || [];
    },
    enabled: !!userId,
  });

  const getInitials = () => {
    if (profile?.username) return profile.username.charAt(0).toUpperCase();
    return "U";
  };

  const getFileTypeIcon = (type: string) => {
    const ext = type === 'react' ? 'tsx' : type === 'cpp' ? 'cpp' : type === 'python' ? 'py' : type === 'html' ? 'html' : 'c';
    return getFileIconUrl(`file.${ext}`);
  };

  if (profileLoading || (commitsLoading && !profile)) {
    return (
      <div className="min-h-full p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background">
      {/* Header Banner */}
      <div className={`border-b ${isPro ? 'bg-gradient-to-r from-pro-grad1 via-pro-grad2 to-pro-grad1 border-yellow-600/30' : 'bg-secondary/50 border-border'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Avatar Section */}
            <div className="shrink-0">
              <Avatar className={`h-24 w-24 border-4 shadow-lg ${isPro ? 'border-pro' : 'border-primary/30'}`}>
                <AvatarImage src={profile?.avatar_url} alt={profile?.username} />
                <AvatarFallback className={`text-4xl ${isPro ? 'bg-pro/20' : 'bg-primary/10'}`}>{getInitials()}</AvatarFallback>
              </Avatar>
            </div>
            
            {/* Info Section */}
            <div className="flex-1 flex flex-col sm:flex-row justify-between items-center sm:items-end w-full gap-6">
              <div className="space-y-3 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <h1 className={`text-3xl font-bold tracking-tight ${isPro ? 'text-pro-light' : 'text-foreground'}`}>
                    {profile?.username}
                  </h1>
                  {isPro && (
                    <Badge className="bg-pro hover:bg-pro-dark text-pro-bg border-none font-extrabold px-2 py-0.5 shadow-sm">
                      <Crown className="h-3 w-3 mr-1 fill-current" />
                      PRO
                    </Badge>
                  )}
                </div>
                
                <div className={`flex items-center justify-center sm:justify-start gap-2 text-sm ${isPro ? 'text-yellow-600/60' : 'text-muted-foreground'}`}>
                  <Calendar className="h-4 w-4" />
                  <span>
                    {profile?.created_at 
                      ? `Joined ${formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })}`
                      : 'Joined recently'
                    }
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              {isOwnProfile && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild className={`h-9 ${isPro ? 'border-yellow-600/30 hover:bg-yellow-600/10 text-yellow-600/80' : ''}`}>
                    <Link to="/friends">
                      <Users className="h-4 w-4 mr-2" />
                      Friends
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsProfileSheetOpen(true)}
                    className={`h-9 ${isPro ? 'border-yellow-600/30 hover:bg-yellow-600/10 text-yellow-600/80' : ''}`}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {profile?.description && (
              <Card className={`bg-card border-border ${isPro ? 'bg-pro-bg border-yellow-600/30' : ''}`}>
                <CardContent className="p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">About Me</h3>
                  <p className={`text-sm leading-relaxed ${isPro ? 'text-pro/80' : 'text-foreground/90'}`}>{profile.description}</p>
                </CardContent>
              </Card>
            )}

            <Card className={`bg-card border-border ${isPro ? 'bg-pro-bg border-yellow-600/30' : ''}`}>
              <CardContent className="p-5 space-y-4">
                {isOwnProfile && (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-2 ${isPro ? 'text-yellow-600/70' : ''}`}>
                          <FileCode className="h-4 w-4" />
                          <span className="text-sm font-medium">Projects</span>
                        </div>
                        <span className={`text-sm font-bold ${isPro ? 'text-pro-light' : ''}`}>{publicRepos?.length || 0} / {profile?.tier === 'admin' ? '∞' : profile?.tier === 'pro' ? 20 : 3}</span>
                      </div>
                      <Progress value={Math.min(100, ((publicRepos?.length || 0) / (profile?.tier === 'pro' ? 20 : 3)) * 100)} className={`h-1.5 ${isPro ? 'bg-yellow-900/30' : ''}`} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-2 ${isPro ? 'text-yellow-600/70' : ''}`}>
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-sm font-medium">AI Credits</span>
                        </div>
                        <span className={`text-sm font-bold ${isPro ? 'text-pro-light' : ''}`}>{profile?.credits || 0} / {profile?.tier === 'admin' ? '∞' : profile?.tier === 'pro' ? 300 : 20}</span>
                      </div>
                      <Progress value={Math.min(100, ((profile?.credits || 0) / (profile?.tier === 'pro' ? 300 : 20)) * 100)} className={`h-1.5 ${isPro ? 'bg-yellow-900/30' : ''}`} />
                    </div>
                  </>
                )}
                <div className={`flex items-center justify-between ${isPro ? 'border-t border-yellow-600/10 pt-4' : ''}`}>
                  <div className={`flex items-center gap-2 ${isPro ? 'text-yellow-600/70' : 'text-muted-foreground'}`}>
                    <GitCommit className="h-4 w-4" />
                    <span className="text-sm">Commits</span>
                  </div>
                  <span className={`font-bold ${isPro ? 'text-pro-light' : ''}`}>{commitHistory?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 ${isPro ? 'text-yellow-600/70' : 'text-muted-foreground'}`}>
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm">Practice Problems</span>
                  </div>
                  <span className={`font-bold ${isPro ? 'text-pro-light' : ''}`}>{practiceProgress?.length || 0}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Repositories */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold flex items-center gap-2 ${isPro ? 'text-pro-light' : ''}`}>
                  <FileCode className="h-5 w-5" />
                  {isOwnProfile ? 'My Projects' : 'Public Projects'}
                </h2>
              </div>
              
              {reposLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : publicRepos && publicRepos.length > 0 ? (
                <div className="space-y-2">
                  {publicRepos.map((repo) => (
                    <Link
                      key={repo.id}
                      to={`/editor/${repo.room_id}`}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all group ${
                        isPro 
                          ? 'border-yellow-600/20 bg-pro-bg hover:bg-pro-grad1 hover:border-yellow-600/40' 
                          : 'border-border bg-card hover:bg-secondary/50 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={getFileTypeIcon(repo.project_type)} alt="" className="w-5 h-5 shrink-0" />
                        <div className="min-w-0">
                          <span className={`font-semibold group-hover:text-primary transition-colors truncate ${isPro ? 'text-pro-light' : 'text-foreground'}`}>
                            {repo.name}
                          </span>
                          <div className={`flex items-center gap-3 text-[11px] mt-1 ${isPro ? 'text-yellow-600/50' : 'text-muted-foreground'}`}>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              {repo.commit_count} commits
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDistanceToNow(new Date(repo.last_edited_at || repo.created_at), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {isOwnProfile && (
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${isPro ? 'text-yellow-600/40' : 'text-muted-foreground/60'}`}>
                            {repo.default_permission === 'viewer' ? 'Private' : 'Public'}
                          </span>
                        )}
                        <ChevronRight className={`h-4 w-4 group-hover:text-primary transition-colors ${isPro ? 'text-yellow-600/50' : 'text-muted-foreground'}`} />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className={`border border-dashed rounded-xl p-12 text-center ${isPro ? 'border-yellow-600/20 bg-yellow-600/5 text-yellow-600/60' : 'border-border text-muted-foreground'}`}>
                  <p className="text-sm italic">{isOwnProfile ? "You haven't created any projects yet." : "No public projects to show."}</p>
                </div>
              )}
            </div>

            {/* Activity */}
            <div>
              <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isPro ? 'text-pro-light' : ''}`}>
                <GitCommit className="h-5 w-5" />
                Recent Activity
              </h2>
              
              {commitHistory && commitHistory.length > 0 ? (
                <div className="space-y-2">
                  {commitHistory.slice(0, 8).map((commit) => (
                    <div 
                      key={commit.id} 
                      className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${
                        isPro 
                          ? 'border-yellow-600/10 bg-pro-bg' 
                          : 'border-border bg-card/50'
                      }`}
                    >
                      <div className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${isPro ? 'bg-pro' : 'bg-primary'}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${isPro ? 'text-pro-light' : 'text-foreground'}`}>{commit.commit_message}</p>
                        <div className={`flex items-center gap-3 text-[11px] mt-1 ${isPro ? 'text-yellow-600/40' : 'text-muted-foreground'}`}>
                          <span className="truncate font-mono">{commit.file_path}</span>
                          <span>•</span>
                          <span>{formatDistanceToNow(new Date(commit.created_at), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`border border-dashed rounded-xl p-12 text-center ${isPro ? 'border-yellow-600/20 bg-yellow-600/5 text-yellow-600/60' : 'border-border text-muted-foreground'}`}>
                  <p className="text-sm italic">No recent activity found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {userId && (
        <ProfileSheet
          userId={userId}
          isOpen={isProfileSheetOpen}
          onOpenChange={setIsProfileSheetOpen}
        />
      )}
    </div>
  );
};

export default ProfilePage;