import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useInbox, useDismissNotification } from "@/hooks/inbox";
import { useFriendshipActions } from "@/hooks/friends";
import { Loader2, UserPlus, UserX, Eye, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface InboxSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const InboxSheet = ({ isOpen, onOpenChange }: InboxSheetProps) => {
  const { data: items, isLoading } = useInbox();
  const { acceptRequest, removeFriendship, isPending: isFriendActionPending } = useFriendshipActions();
  const { mutate: dismissNotification, isPending: isDismissing } = useDismissNotification();

  const isActionPending = isFriendActionPending || isDismissing;

  const handleViewProject = (notificationId: string) => {
    dismissNotification(notificationId);
    onOpenChange(false); // Close the sheet
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Inbox</SheetTitle>
          <SheetDescription>Manage your friend requests and project invites.</SheetDescription>
        </SheetHeader>
        <div className="py-6">
          {isLoading ? (
            <div className="flex justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : items && items.length > 0 ? (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={item.actor_avatar_url} />
                      <AvatarFallback seed={item.actor_username}>{item.actor_username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm leading-tight">
                        <span className="font-semibold">{item.actor_username}</span>
                        {item.type === 'FRIEND_REQUEST' && ' sent you a friend request.'}
                        {item.type === 'PROJECT_INVITE' && ` invited you to join "${item.metadata.project_name}".`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  
                  {item.type === 'FRIEND_REQUEST' && item.metadata.friendship_id && (
                    <div className="flex gap-2">
                      <Button size="sm" className="w-full" onClick={() => acceptRequest(item.metadata.friendship_id!)} disabled={isActionPending}>
                        <UserPlus className="h-4 w-4 mr-2" /> Accept
                      </Button>
                      <Button size="sm" variant="outline" className="w-full" onClick={() => removeFriendship(item.metadata.friendship_id!)} disabled={isActionPending}>
                        <UserX className="h-4 w-4 mr-2" /> Decline
                      </Button>
                    </div>
                  )}

                  {item.type === 'PROJECT_INVITE' && (
                    <div className="flex gap-2">
                      <Button size="sm" asChild className="w-full" onClick={() => handleViewProject(item.id)}>
                        <Link to={`/editor/${item.metadata.room_id}`}>
                          <Eye className="h-4 w-4 mr-2" /> View Project
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="w-full" onClick={() => dismissNotification(item.id)} disabled={isActionPending}>
                        <X className="h-4 w-4 mr-2" /> Dismiss
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Your inbox is empty.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};