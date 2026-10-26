import { usePresence } from "@/hooks/usePresence";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserX, Eye, MoreVertical } from "lucide-react";
import { Friend, useFriendshipActions } from "@/hooks/friends";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface FriendListItemProps {
  friend: Friend;
}

export const FriendListItem = ({ friend }: FriendListItemProps) => {
  const { onlineUsers } = usePresence();
  const { removeFriendship, isPending } = useFriendshipActions();

  const isOnline = onlineUsers.includes(friend.id);

  return (
    <div className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-secondary/30">
      <div className="relative shrink-0">
        <Avatar className="h-9 w-9 border border-border/70">
          <AvatarImage src={friend.avatar_url} alt={friend.username} />
          <AvatarFallback seed={friend.username} className="text-xs font-semibold">
            {friend.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span
          className={`absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full ring-2 ring-card ${
            isOnline ? "bg-emerald-500" : "bg-muted-foreground/40"
          }`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-medium text-foreground">{friend.username}</p>
          {isOnline && (
            <span className="shrink-0 rounded bg-emerald-500/10 px-1.5 py-px text-[9px] font-semibold text-emerald-500">
              Online
            </span>
          )}
        </div>
        {friend.status && (
          <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
            {friend.status}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link to={`/profile/${friend.id}`} title="View profile">
            <Eye className="h-4 w-4" />
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem asChild>
              <Link to={`/profile/${friend.id}`} className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive cursor-pointer"
              onClick={() => removeFriendship(friend.friendship_id)}
              disabled={isPending}
            >
              <UserX className="mr-2 h-4 w-4" />
              Unfriend
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
