import { useState, useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile, useUpdateProfile } from "@/hooks/profiles";
import { useAuth } from "@/hooks/useAuth";
import { EditProfileForm } from "./EditProfileForm";
import { Edit, Camera, Loader2 } from "lucide-react";
import { compressAvatar } from "@/lib/image";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface ProfileSheetProps {
  userId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const ProfileSheet = ({ userId, isOpen, onOpenChange }: ProfileSheetProps) => {
  const { user: authUser } = useAuth();
  const { data: profile, isLoading } = useProfile(userId);
  const { mutate: updateProfile } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isOwnProfile = authUser?.id === userId;

  const getInitials = () => {
    if (profile?.username) return profile.username.charAt(0).toUpperCase();
    return "U";
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !authUser) return;

    setIsUploading(true);
    try {
      // 1. Crop and compress avatar on client side
      const compressedBlob = await compressAvatar(file);

      // 2. Upload to Supabase Storage inside the avatars bucket
      const fileExt = "jpg";
      const fileName = `${authUser.id}/avatar_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, compressedBlob, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // 3. Get Public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      // 4. Update the profile row in database using existing useUpdateProfile hook
      updateProfile({ id: authUser.id, avatar_url: publicUrl });

    } catch (err: any) {
      console.error("Error uploading avatar:", err);
      toast.error(err.message || "Failed to upload profile picture.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
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
                <div className="relative">
                  <Avatar
                    className={`h-24 w-24 border-4 border-primary/50 transition-all ${isEditing && isOwnProfile ? "cursor-pointer hover:border-primary/80 hover:brightness-95" : ""
                      }`}
                    onClick={() => isEditing && isOwnProfile && fileInputRef.current?.click()}
                  >
                    <AvatarImage src={profile.avatar_url} alt={profile.username} />
                    <AvatarFallback seed={profile.username} className="text-4xl">{getInitials()}</AvatarFallback>
                  </Avatar>

                  {isEditing && isOwnProfile && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary hover:bg-primary/95 text-primary-foreground border-2 border-background shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer disabled:cursor-not-allowed z-10"
                      title="Change Profile Picture"
                    >
                      {isUploading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </button>
                  )}

                  {isUploading && !isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full z-10">
                      <Loader2 className="w-6 h-6 animate-spin text-white" />
                    </div>
                  )}
                </div>

                {isEditing && isOwnProfile && (
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                )}

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