import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// --- Types ---
export interface RoomParticipant {
    user_id: string;
    username: string;
    avatar_url: string;
    permission_level: 'editor' | 'viewer';
}

export interface SearchedUser {
    id: string;
    username: string;
    avatar_url: string;
}

// --- Hooks ---

export const useIsProjectOwner = (roomId: string | undefined) => {
    return useQuery({
        queryKey: ['isProjectOwner', roomId],
        queryFn: async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user || !roomId) return false;

            const { data, error } = await supabase.rpc('is_project_owner', {
                p_room_id: roomId,
                p_user_id: user.id
            });

            if (error) {
                console.error('Error checking project owner:', error);
                return false;
            }

            return data || false;
        },
        enabled: !!roomId,
    });
};

export const useRoomParticipants = (roomId: string | undefined) => {
    return useQuery<RoomParticipant[], Error>({
        queryKey: ['roomParticipants', roomId],
        queryFn: async () => {
            if (!roomId) return [];
            
            // Use optimized function that fetches participants with profiles in one query
            const { data, error } = await supabase.rpc('get_room_participants', {
                p_room_id: roomId
            });

            if (error) throw error;
            return (data as RoomParticipant[]) || [];
        },
        enabled: !!roomId,
    });
};

export const useSearchUsers = (searchTerm: string, roomId: string | undefined) => {
    return useQuery<SearchedUser[], Error>({
        queryKey: ['searchUsers', searchTerm, roomId],
        queryFn: async () => {
            if (!searchTerm || !roomId) return [];
            const { data, error } = await supabase.rpc('search_users', { 
                p_search_term: searchTerm, 
                p_room_id: roomId 
            });
            if (error) throw error;
            return data || [];
        },
        enabled: !!searchTerm && !!roomId,
    });
};

export const useSetUserPermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ roomId, userId, level }: { roomId: string, userId: string, level: 'editor' | 'viewer' }) => {
            const { error } = await supabase.rpc('set_user_permission', {
                p_room_id: roomId,
                p_user_id: userId,
                p_permission_level: level,
            });
            if (error) throw error;
            return { roomId };
        },
        onSuccess: ({ roomId }) => {
            toast.success("Permissions updated.");
            queryClient.invalidateQueries({ queryKey: ['roomParticipants', roomId] });

            const channel = supabase.channel(`room:${roomId}`);
            channel.send({
                type: 'broadcast',
                event: 'permission_change',
                payload: {},
            });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update permissions.");
        },
    });
};