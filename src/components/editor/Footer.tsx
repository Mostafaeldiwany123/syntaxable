import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, Plus, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserPresence = {
  id: string;
  full_name: string;
  avatar_url: string;
};

interface FooterProps {
  users: UserPresence[];
}

export const Footer = ({ users }: FooterProps) => {
  const { toast } = useToast();

  const shareRoom = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Copied to clipboard!",
      description: "You can now share the link with your team.",
    });
  };

  return (
    <div className="h-14 bg-background border-t border-border flex items-center justify-between px-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={shareRoom}>
          <Share2 size={18} />
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center -space-x-2">
          {users.map((user) => (
            <Avatar key={user.id} className="w-8 h-8 border-2 border-background">
              <AvatarImage src={user.avatar_url} alt={user.full_name} />
              <AvatarFallback>
                {user.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <Button variant="ghost" size="icon">
          <Plus size={18} />
        </Button>
        <Button className="bg-primary/90 hover:bg-primary text-primary-foreground">
          <Code size={16} className="mr-2" />
          Run Code
        </Button>
      </div>
    </div>
  );
};