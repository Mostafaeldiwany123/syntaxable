import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// --- Types ---
export interface FileVersion {
    id: string;
    commit_message: string;
    created_at: string;
    user_id: string;
    username: string;
    avatar_url: string;
    content: string;
}

// --- Hooks ---

export const useFileHistory = (fileId: string | null | undefined) => {
    return useQuery<FileVersion[], Error>({
        queryKey: ['fileHistory', fileId],
        queryFn: async () => {
            if (!fileId) return [];
            
            // Use optimized function that fetches versions with profiles in one query
            const { data, error } = await supabase.rpc('get_file_version_history', {
                p_file_id: fileId,
                p_limit: 50
            });

            if (error) throw error;
            return (data as FileVersion[]) || [];
        },
        enabled: !!fileId,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};

export const useCommitChange = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ fileId, content, commitMessage }: { fileId: string, content: string, commitMessage: string }) => {
            const { error } = await supabase.rpc('commit_change', {
                p_file_id: fileId,
                p_content: content,
                p_commit_message: commitMessage,
            });
            if (error) throw error;
            return { fileId };
        },
        onSuccess: ({ fileId }) => {
            queryClient.invalidateQueries({ queryKey: ['fileHistory', fileId] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to commit changes.");
        },
    });
};