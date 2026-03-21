import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// --- Types ---
export interface CommunityUser {
    id: string;
    username: string;
    avatar_url: string;
    status: string;
    description: string;
    created_at: string;
    friendship_status: 'is_self' | 'friends' | 'pending_sent' | 'pending_received' | 'not_friends';
    friend_count: number;
    tier?: string;
}

export interface Friend {
    id: string;
    username: string;
    avatar_url: string;
    status: string;
    friendship_id: string;
}

export interface FriendRequest {
    friendship_id: string;
    requester_id: string;
    username: string;
    avatar_url: string;
    status: string; 
    created_at: string;
}

// --- Hooks ---

export const useCommunityUsers = () => {
    return useQuery<CommunityUser[], Error>({
        queryKey: ['communityUsers'],
        queryFn: async () => {
            const { data, error } = await supabase.rpc('get_community_users');
            if (error) throw error;
            return data || [];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useFriends = () => {
    return useQuery<Friend[], Error>({
        queryKey: ['friends'],
        queryFn: async () => {
            // Use optimized function that fetches friends with profiles in one query
            const { data, error } = await supabase.rpc('get_user_friends');
            if (error) throw error;
            return (data as Friend[]) || [];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useFriendRequests = () => {
    return useQuery<FriendRequest[], Error>({
        queryKey: ['friendRequests'],
        queryFn: async () => {
            // Use optimized function that fetches requests with profiles in one query
            const { data, error } = await supabase.rpc('get_pending_friend_requests');
            if (error) throw error;
            return (data as FriendRequest[]) || [];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// --- Mutations ---

export const useFriendshipActions = () => {
    const queryClient = useQueryClient();

    const invalidateQueries = () => {
        queryClient.invalidateQueries({ queryKey: ['communityUsers'] });
        queryClient.invalidateQueries({ queryKey: ['friends'] });
        queryClient.invalidateQueries({ queryKey: ['inbox'] });
        queryClient.invalidateQueries({ queryKey: ['friendRequests'] });
    };

    const { mutate: sendRequest, isPending: isSending } = useMutation({
        mutationFn: async (addresseeId: string) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("User not authenticated");

            const { error } = await supabase.from('friendships').insert({
                requester_id: user.id,
                addressee_id: addresseeId,
                status: 'pending',
            });
            if (error) throw error;
        },
        onSuccess: () => {
            toast.success("Friend request sent!");
            invalidateQueries();
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to send friend request.");
        },
    });

    const { mutate: acceptRequest, isPending: isAccepting } = useMutation({
        mutationFn: async (friendshipId: string) => {
            const { error } = await supabase.from('friendships').update({ status: 'accepted' }).eq('id', friendshipId);
            if (error) throw error;
        },
        onSuccess: () => {
            toast.success("Friend request accepted!");
            invalidateQueries();
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to accept request.");
        },
    });

    const { mutate: removeFriendship, isPending: isRemoving } = useMutation({
        mutationFn: async (friendshipId: string) => {
            const { error } = await supabase.from('friendships').delete().eq('id', friendshipId);
            if (error) throw error;
        },
        onSuccess: () => {
            invalidateQueries();
        },
        onError: (error: any) => {
            toast.error(error.message || "Action failed.");
        },
    });

    return {
        sendRequest,
        acceptRequest,
        removeFriendship,
        isPending: isSending || isAccepting || isRemoving,
    };
};
