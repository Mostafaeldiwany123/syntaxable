import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@supabase/supabase-js";

interface UserFooterProps {
  user: User | null;
}

export const UserFooter = ({ user }: UserFooterProps) => {
  if (!user) return null;

  const fullName = user.user_metadata.full_name || user.email;
  const role = "Developer"; // Placeholder

  return (
    <div className="p-4 border-t border-border mt-auto">
      <div className="flex items-center space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={user.user_metadata.avatar_url} alt={fullName} />
          <AvatarFallback>{fullName?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm text-foreground">{fullName}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};