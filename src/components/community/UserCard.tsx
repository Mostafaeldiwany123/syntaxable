import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommunityUser, useFriendshipActions } from "@/hooks/friends";
import { UserPlus, Check, Clock, Users, Crown } from "lucide-react";
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
        return <Button variant="secondary" className="w-full" disabled><Check className="mr-2 h-4 w-4" /> Friends</Button>;
      case 'pending_sent':
        return <Button variant="secondary" className="w-full" disabled><Clock className="mr-2 h-4 w-4" /> Pending</Button>;
      case 'pending_received':
        return <Button variant="secondary" className="w-full" onClick={() => alert("Please respond from your inbox.")}>Respond</Button>;
      case 'not_friends':
        return <Button className="w-full" onClick={() => sendRequest(user.id)} disabled={isPending}><UserPlus className="mr-2 h-4 w-4" /> Add</Button>;
      default:
        return null;
    }
  };

  return (
    <Card className={`flex flex-col text-left p-0 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
      isPro 
        ? 'bg-pro-bg border-yellow-600/40 shadow-yellow-900/10' 
        : 'bg-secondary/30 border-border/50 shadow-sm'
    }`}>
      <div className={`h-20 ${isPro ? 'bg-gradient-to-r from-pro-dark via-pro to-pro-dark' : 'bg-secondary'}`} />
      <CardContent className="p-4 flex flex-col items-start relative flex-grow">
        <Avatar className={`h-20 w-20 -mt-14 mb-2 border-4 ${isPro ? 'border-pro' : 'border-card'}`}>
          <AvatarImage src={user.avatar_url} alt={user.username} />
          <AvatarFallback className="text-3xl">{getInitials()}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <h3 className={`font-bold text-lg ${isPro ? 'text-pro-light' : ''}`}>{user.username}</h3>
          {isPro && (
            <Badge className="bg-pro hover:bg-pro-dark text-pro-bg border-none font-extrabold px-2 py-0.5 shadow-sm">
              <Crown className="h-3 w-3 mr-1 fill-current" />
              PRO
            </Badge>
          )}
        </div>
        {user.status && (
          <Badge variant="outline" className={`mt-1 ${isPro ? 'border-yellow-600/30 text-yellow-600/80' : ''}`}>
            {user.status}
          </Badge>
        )}
        <p className={`text-sm mt-3 h-10 overflow-hidden flex-grow ${isPro ? 'text-pro/70' : 'text-muted-foreground'}`}>
          {user.description || "No description provided."}
        </p>
        <div className={`flex items-center justify-start gap-1.5 text-sm mt-3 ${isPro ? 'text-yellow-600/60' : 'text-muted-foreground'}`}>
          <Users className="h-4 w-4" />
          <span className="font-medium">{user.friend_count} Friends</span>
        </div>
      </CardContent>
      <CardFooter className={`p-4 mt-2 flex flex-col sm:flex-row gap-2 w-full border-t ${
        isPro 
          ? 'bg-pro-grad1 border-yellow-600/20' 
          : 'bg-secondary/50 border-border/50'
      }`}>
        <Button variant="outline" className={`w-full ${isPro ? 'border-yellow-600/30 hover:bg-yellow-600/10 text-yellow-600/80' : ''}`} asChild>
          <Link to={`/profile/${user.id}`}>View Profile</Link>
        </Button>
        <div className="w-full">
          {renderFriendshipButton()}
        </div>
      </CardFooter>
    </Card>
  );
};
