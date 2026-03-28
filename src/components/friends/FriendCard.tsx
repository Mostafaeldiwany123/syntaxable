import { useState } from "react";
import { usePresence } from "@/hooks/usePresence";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserX, Eye, MoreVertical, MessageCircle } from "lucide-react";
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
    <div className="group flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:border-border hover:bg-card/80 transition-all">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-12 w-12 border-2 border-background">
            <AvatarImage src={friend.avatar_url} alt={friend.username} />
            <AvatarFallback seed={friend.username} className="text-sm font-medium">
              {friend.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span 
            className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-background ${
              isOnline ? 'bg-emerald-500' : 'bg-gray-400'
            }`} 
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold truncate">{friend.username}</p>
            {isOnline && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                Online
              </span>
            )}
          </div>
          {friend.status && (
            <p className="text-sm text-muted-foreground truncate mt-0.5">
              {friend.status}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link to={`/profile/${friend.id}`}>
            <Eye className="h-4 w-4 mr-1.5" />
            View
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