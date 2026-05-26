import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface DuelLeaderboardEntry {
  id: string;
  username: string;
  avatar_url: string;
  wins: number;
}

export const useDuelLeaderboard = () => {
  return useQuery<DuelLeaderboardEntry[], Error>({
    queryKey: ['duel_leaderboard'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_duel_leaderboard');
      
      if (error) {
        throw error;
      }
      
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
