import { useFriendRequests, useFriendshipActions, FriendRequest } from "@/hooks/friends";
import { UserPlus, UserX, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

export const PendingRequests = () => {
  const { data: requests, isLoading } = useFriendRequests();
  const { acceptRequest, removeFriendship, isPending } = useFriendshipActions();

  if (isLoading || !requests || requests.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-primary/[0.04] px-4 py-2">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Pending Requests
          </span>
        </div>
        <span className="text-[11px] font-medium tabular-nums text-primary">
          {requests.length} waiting
        </span>
      </div>

      <div className="divide-y divide-border/50">
        {requests.map((request: FriendRequest) => (
          <div
            key={request.friendship_id}
            className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-secondary/30"
          >
            <Avatar className="h-9 w-9 shrink-0 border border-border/70">
              <AvatarImage src={request.avatar_url} />
              <AvatarFallback seed={request.username} className="text-xs font-semibold">
                {request.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{request.username}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Requested {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <Button
                size="sm"
                onClick={() => acceptRequest(request.friendship_id)}
                disabled={isPending}
                className="h-8 gap-1.5 px-3 text-xs"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Accept
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeFriendship(request.friendship_id)}
                disabled={isPending}
                title="Decline request"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
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
