import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface LeaderboardUser {
    id: string;
    username: string;
    avatar_url: string | null;
    current_streak: number;
    longest_streak: number;
    problems_solved: number;
    tier?: 'free' | 'pro' | 'admin';
    description?: string | null;
}

export const useLeaderboard = () => {
    return useQuery<LeaderboardUser[], Error>({
        queryKey: ['leaderboard_v2'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, username, avatar_url, current_streak, longest_streak, problems_solved, tier, description')
                .not('username', 'is', null)
                .order('current_streak', { ascending: false })
                .order('problems_solved', { ascending: false });

            if (error) throw error;
            return (data as LeaderboardUser[]) || [];
        },
        staleTime: 0, // Always fetch fresh in dev/production to get up-to-date bio and rankings
    });
};