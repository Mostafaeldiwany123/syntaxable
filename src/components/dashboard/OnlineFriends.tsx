import { useFriends } from "@/hooks/friends";
import { usePresence } from "@/hooks/usePresence";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

export const OnlineFriends = () => {
  const { data: friends, isLoading } = useFriends();
  const { onlineUsers } = usePresence();

  const onlineFriends = friends?.filter(f => onlineUsers.includes(f.id)) || [];

  return (
    <Card className="bg-secondary/50 border-border/50">
      <CardHeader>
        <CardTitle>Online Friends ({onlineFriends.length})</CardTitle>
        <CardDescription>See who's available to collaborate.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : onlineFriends.length > 0 ? (
          <ScrollArea className="h-48">
            <div className="space-y-4">
              {onlineFriends.map(friend => (
                <div key={friend.id} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={friend.avatar_url} />
                      <AvatarFallback>{friend.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 z-10 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-card" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{friend.username}</p>
                    <p className="text-xs text-muted-foreground truncate">{friend.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex items-center justify-center h-48 text-center">
            <p className="text-sm text-muted-foreground">No friends are currently online.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};