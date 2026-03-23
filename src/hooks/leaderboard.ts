import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface LeaderboardUser {
    id: string;
    username: string;
    avatar_url: string | null;
    current_streak: number;
    longest_streak: number;
    problems_solved: number;
}

export const useLeaderboard = () => {
    return useQuery<LeaderboardUser[], Error>({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, username, avatar_url, current_streak, longest_streak, problems_solved')
                .not('username', 'is', null)
                .order('current_streak', { ascending: false })
                .order('problems_solved', { ascending: false });

            if (error) throw error;
            return (data as LeaderboardUser[]) || [];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};