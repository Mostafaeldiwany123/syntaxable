import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommunityUser, useFriendshipActions } from "@/hooks/friends";
import { UserPlus, Check, Clock, Users, Crown, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: CommunityUser;
}

export const UserCard = ({ user }: UserCardProps) => {
  const { sendRequest, isPending } = useFriendshipActions();
  const isPro = user.tier === 'pro';

  const getInitials = () => user.username.charAt(0).toUpperCase();

  const renderFriendshipButton = () => {
    switch (user.friendship_status) {
      case 'is_self':
        return null;
      case 'friends':
        return (
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            <Check className="h-3 w-3 mr-1" /> Friends
          </Badge>
        );
      case 'pending_sent':
        return (
          <Badge variant="outline" className="text-xs px-2 py-0.5">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case 'pending_received':
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => alert("Please respond from your inbox.")}
            className="h-7 text-xs"
          >
            Respond
          </Button>
        );
      case 'not_friends':
        return (
          <Button
            size="sm"
            onClick={() => sendRequest(user.id)}
            disabled={isPending}
            className="h-7 text-xs"
          >
            <UserPlus className="h-3 w-3 mr-1" /> Add
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`flex items-center gap-3 p-3 hover:shadow-md transition-all duration-200 ${
      isPro
        ? 'bg-pro-bg border-yellow-600/40'
        : 'bg-card border-border/50'
    }`}>
      <Avatar className={`h-12 w-12 shrink-0 border-2 ${isPro ? 'border-pro' : 'border-border'}`}>
        <AvatarImage src={user.avatar_url} alt={user.username} />
        <AvatarFallback seed={user.username} className="text-base">
          {getInitials()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Link
            to={`/profile/${user.id}`}
            className={`font-semibold text-sm truncate hover:underline ${isPro ? 'text-pro-light' : 'text-foreground'}`}
          >
            {user.username}
          </Link>
          {isPro && (
            <Badge className="bg-pro hover:bg-pro-dark text-pro-bg border-none font-bold px-1.5 py-0 text-[10px]">
              <Crown className="h-2.5 w-2.5 fill-current" />
            </Badge>
          )}
        </div>

        {user.status && (
          <p className={`text-xs truncate mb-1 ${isPro ? 'text-pro/70' : 'text-muted-foreground'}`}>
            {user.status}
          </p>
        )}

        <div className={`flex items-center gap-1 text-xs ${isPro ? 'text-yellow-600/60' : 'text-muted-foreground'}`}>
          <Users className="h-3 w-3" />
          <span>{user.friend_count} friends</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 shrink-0">
        {renderFriendshipButton()}
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          asChild
        >
          <Link to={`/profile/${user.id}`}>
            <Eye className="h-3 w-3 mr-1" /> View
          </Link>
        </Button>
      </div>
    </Card>
  );
};