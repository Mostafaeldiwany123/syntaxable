import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface DuelHistoryItem {
  id: string;
  created_at: string;
  status: string;
  config: {
    language: string;
    scoreTarget: number;
    lessonIds: string[];
  };
  winner_id: string | null;
  opponent: {
    id: string;
    username: string;
    avatar_url?: string;
  } | null;
  playerScore: number;
  opponentScore: number;
  outcome: 'won' | 'lost' | 'draw' | 'active';
}

export const useDuelHistory = (userId: string | undefined) => {
  return useQuery<DuelHistoryItem[], Error>({
    queryKey: ['duel_history', userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return [];

      // 1. Fetch participant records for the current user
      const { data: participants, error: partError } = await supabase
        .from('duel_participants')
        .select('duel_id')
        .eq('user_id', userId);

      if (partError) throw partError;
      if (!participants || participants.length === 0) return [];

      const duelIds = participants.map(p => p.duel_id);

      // 2. Fetch the corresponding duels with all participants and their profile info
      const { data: duels, error: duelsError } = await supabase
        .from('duels')
        .select(`
          id,
          created_at,
          status,
          config,
          winner_id,
          duel_participants!duel_participants_duel_id_fkey (
            user_id,
            score,
            profiles!duel_participants_user_id_fkey (
              username,
              avatar_url
            )
          )
        `)
        .in('id', duelIds)
        .eq('status', 'completed')
        .order('created_at', { ascending: false });

      if (duelsError) throw duelsError;

      // 3. Format the data for the UI
      return (duels || []).map((duel: any) => {
        const myPart = duel.duel_participants?.find((p: any) => p.user_id === userId);
        const oppPart = duel.duel_participants?.find((p: any) => p.user_id !== userId);

        const playerScore = myPart?.score || 0;
        const opponentScore = oppPart?.score || 0;

        let outcome: 'won' | 'lost' | 'draw' | 'active' = 'active';
        if (duel.status === 'completed') {
          if (duel.winner_id === userId) {
            outcome = 'won';
          } else if (duel.winner_id === oppPart?.user_id) {
            outcome = 'lost';
          } else {
            outcome = 'draw';
          }
        }

        const rawProfile = oppPart?.profiles;
        const opponentProfile = Array.isArray(rawProfile) ? rawProfile[0] : rawProfile;

        return {
          id: duel.id,
          created_at: duel.created_at,
          status: duel.status,
          config: duel.config,
          winner_id: duel.winner_id,
          opponent: oppPart ? {
            id: oppPart.user_id,
            username: opponentProfile?.username || 'Opponent',
            avatar_url: opponentProfile?.avatar_url
          } : null,
          playerScore,
          opponentScore,
          outcome
        };
      });
    }
  });
};
