import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/hooks/profiles";
import { useAuth } from "@/hooks/useAuth";
import { EditProfileForm } from "./EditProfileForm";
import { Edit } from "lucide-react";

interface ProfileSheetProps {
  userId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const ProfileSheet = ({ userId, isOpen, onOpenChange }: ProfileSheetProps) => {
  const { user: authUser } = useAuth();
  const { data: profile, isLoading } = useProfile(userId);
  const [isEditing, setIsEditing] = useState(false);

  const isOwnProfile = authUser?.id === userId;

  const getInitials = () => {
    if (profile?.username) return profile.username.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) setIsEditing(false);
    }}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit Profile" : "User Profile"}</SheetTitle>
          <SheetDescription>
            {isEditing ? "Update your personal details." : "View user information."}
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          {isLoading ? (
            <ProfileSkeleton />
          ) : profile ? (
            <>
              <div className="flex flex-col items-center space-y-4 mb-8">
                <Avatar className="h-24 w-24 border-4 border-primary/50">
                  <AvatarImage src={profile.avatar_url} alt={profile.username} />
                  <AvatarFallback seed={profile.username} className="text-4xl">{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{profile.username}</h2>
                  <p className="text-sm text-primary">{profile.status}</p>
                </div>
              </div>

              {isEditing ? (
                <EditProfileForm profile={profile} onFinished={() => setIsEditing(false)} />
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-muted-foreground">About</h3>
                    <p className="text-foreground/90 whitespace-pre-wrap">
                      {profile.description || "No description provided."}
                    </p>
                  </div>
                  {isOwnProfile && (
                    <Button onClick={() => setIsEditing(true)} className="w-full">
                      <Edit className="mr-2 h-4 w-4" /> Edit Profile
                    </Button>
                  )}
                </div>
              )}
            </>
          ) : (
            <p>Could not load profile.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const ProfileSkeleton = () => (
  <div className="space-y-4">
    <div className="flex flex-col items-center space-y-4">
      <Skeleton className="h-24 w-24 rounded-full" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-24" />
    </div>
    <Skeleton className="h-4 w-1/4" />
    <Skeleton className="h-16 w-full" />
  </div>
);