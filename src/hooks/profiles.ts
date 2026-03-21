import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface UserProfile {
    username: string;
    avatar_url: string;
    status: string;
    description: string;
    created_at: string;
    tier: 'free' | 'pro' | 'admin';
    credits: number;
}

const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url, status, description, created_at, tier, credits")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Error fetching profile:", error);
        return null;
    }

    return data as UserProfile;
};

export const useProfile = (userId: string | undefined) => {
    return useQuery({
        queryKey: ["profile", userId],
        queryFn: () => fetchProfile(userId!),
        enabled: !!userId,
        staleTime: 0, // Always refetch when invalidated
        refetchOnWindowFocus: true,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: { id: string, username?: string, status?: string, description?: string }) => {
            const { id, ...updateData } = updates;
            const { error } = await supabase
                .from('profiles')
                .update(updateData)
                .eq('id', id);
            
            if (error) throw error;
        },
        onSuccess: (_, variables) => {
            toast.success("Profile updated successfully!");
            queryClient.invalidateQueries({ queryKey: ['profile', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['communityUsers'] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update profile.");
        },
    });
};