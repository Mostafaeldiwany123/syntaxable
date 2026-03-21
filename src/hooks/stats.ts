import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// --- Types ---
export interface WeeklyActivity {
    day_name: string;
    commit_count: number;
}

// --- Hooks ---

export const useWeeklyCommitActivity = () => {
    return useQuery<WeeklyActivity[], Error>({
        queryKey: ['weeklyCommitActivity'],
        queryFn: async () => {
            // Keep this as RPC - generating a series for the last 7 days 
            // and aggregating counts is much faster in SQL.
            const { data, error } = await supabase.rpc('get_weekly_commit_activity');
            if (error) throw error;
            return data || [];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useTotalCommits = () => {
    return useQuery<number, Error>({
        queryKey: ['totalCommits'],
        queryFn: async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return 0;

            // Direct query for exact count
            const { count, error } = await supabase
                .from('file_versions')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id);

            if (error) throw error;
            return count || 0;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};