import { useFriendRequests, useFriendshipActions, FriendRequest } from "@/hooks/friends";
import { UserPlus, UserX, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

export const PendingRequests = () => {
  const { data: requests, isLoading } = useFriendRequests();
  const { acceptRequest, removeFriendship, isPending } = useFriendshipActions();

  if (!requests || requests.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-semibold">
          Pending Requests
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {requests.length} waiting
          </span>
        </h2>
      </div>

      <div className="space-y-2">
        {requests.map((request: FriendRequest) => (
          <div 
            key={request.friendship_id} 
            className="flex items-center justify-between p-4 rounded-xl border border-primary/20 bg-primary/5"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-11 w-11">
                <AvatarImage src={request.avatar_url} />
                <AvatarFallback seed={request.username} className="text-sm font-medium">
                  {request.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-semibold truncate">{request.username}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                size="sm"
                onClick={() => acceptRequest(request.friendship_id)} 
                disabled={isPending}
                className="gap-1.5"
              >
                <UserPlus className="h-4 w-4" />
                Accept
              </Button>
              <Button 
                size="sm"
                variant="ghost"
                onClick={() => removeFriendship(request.friendship_id)} 
                disabled={isPending}
                className="text-muted-foreground hover:text-destructive"
              >
                <UserX className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};