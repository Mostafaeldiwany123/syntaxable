import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// --- Types ---
export interface InboxItem {
    id: string;
    type: 'FRIEND_REQUEST' | 'PROJECT_INVITE';
    actor_id: string;
    actor_username: string;
    actor_avatar_url: string;
    metadata: {
        friendship_id?: string;
        project_id?: string;
        project_name?: string;
        room_id?: string;
    };
    created_at: string;
}

// --- Hooks ---
export const useInbox = () => {
    return useQuery<InboxItem[], Error>({
        queryKey: ['inbox'],
        queryFn: async () => {
            const { data, error } = await supabase.rpc('get_inbox_items');
            if (error) throw error;
            return data || [];
        },
    });
};

// --- Mutations ---
export const useDismissNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (notificationId: string) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            // Direct client-side update instead of RPC
            const { error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('id', notificationId)
                .eq('user_id', user.id);
                
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inbox'] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to dismiss notification.");
        },
    });
};