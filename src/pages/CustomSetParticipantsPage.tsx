import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Users, Trophy, CheckCircle2 } from "lucide-react";
import { useCustomSetParticipantsWithProgress } from "@/hooks/customSets";
import { useCustomSet } from "@/hooks/customSets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const CustomSetParticipantsPage = () => {
  const { setId } = useParams<{ setId: string }>();
  const { data: customSet, isLoading: setLoading } = useCustomSet(setId);
  const { data: participants, isLoading: participantsLoading } = useCustomSetParticipantsWithProgress(setId);

  const isLoading = setLoading || participantsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!customSet) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h2 className="text-xl font-medium mb-3">Problem set not found</h2>
        <p className="text-muted-foreground mb-6 max-w-sm">
          This custom set may have been deleted or you don't have the necessary permissions.
        </p>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/practice/custom">Back to My Sets</Link>
        </Button>
      </div>
    );
  }

  if (!customSet.is_owner) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h2 className="text-xl font-medium mb-3">Access Denied</h2>
        <p className="text-muted-foreground mb-6 max-w-sm">
          Only the owner of this custom set can view participant progress.
        </p>
        <Button asChild variant="outline" className="rounded-full">
          <Link to={`/practice/custom/${setId}`}>Back to Set</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Button variant="ghost" size="sm" asChild className="mb-6 hover:bg-secondary/50">
        <Link to={`/practice/custom/${setId}`}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Set
        </Link>
      </Button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Participants</h1>
          <p className="text-muted-foreground mt-1">
            See who has joined "{customSet.title}" and their progress
          </p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          <Users className="h-4 w-4 mr-2" />
          {participants?.length || 0} {participants?.length === 1 ? 'participant' : 'participants'}
        </Badge>
      </div>

      {participants && participants.length > 0 ? (
        <div className="space-y-4">
          {participants.map((participant, index) => {
            const progressPercent = participant.total_count > 0 
              ? Math.round((participant.completed_count / participant.total_count) * 100) 
              : 0;
            
            return (
              <Card key={participant.user_id} className="border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-sm font-bold text-muted-foreground">
                      {index + 1}
                    </div>

                    {/* Avatar */}
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={participant.avatar_url} />
                      <AvatarFallback>
                        {participant.username?.charAt(0).toUpperCase() || '?'}
                      </AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{participant.username}</span>
                        {participant.completed_count === participant.total_count && participant.total_count > 0 && (
                          <Badge variant="outline" className="text-green-500 border-green-500/30 bg-green-500/10 text-[10px] px-2">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Complete
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-muted-foreground">
                          {participant.completed_count} / {participant.total_count} problems
                        </span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-3 w-40">
                      <Progress value={progressPercent} className="h-2 flex-1" />
                      <span className="text-sm font-medium text-muted-foreground w-12 text-right">
                        {progressPercent}%
                      </span>
                    </div>

                    {/* Trophy for top performers */}
                    {index === 0 && participant.completed_count > 0 && (
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No participants yet</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
              Share your custom set with others to see their progress here.
            </p>
            <Button asChild variant="outline" className="rounded-full">
              <Link to={`/practice/custom/${setId}/share`}>
                Share Set
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomSetParticipantsPage;