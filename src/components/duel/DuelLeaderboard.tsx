import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { useDuelLeaderboard } from '@/hooks/useDuelLeaderboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const DuelLeaderboard: React.FC = () => {
  const { data: leaderboard, isLoading, error } = useDuelLeaderboard();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 rounded-xl border border-border/40 bg-card/25 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center rounded-xl border border-red-500/20 bg-red-500/10">
        <p className="text-sm text-red-500">Failed to load leaderboard</p>
      </div>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="py-8 flex flex-col items-center justify-center text-center border border-dashed border-border/40 rounded-xl bg-card/10 backdrop-blur-sm">
        <Trophy className="w-8 h-8 text-muted-foreground/30 mb-2" />
        <p className="text-muted-foreground text-sm">No duel wins yet. Be the first!</p>
      </div>
    );
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-700" />;
      default:
        return <span className="font-bold text-muted-foreground/50 w-5 text-center">{index + 1}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {leaderboard.map((entry, index) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          key={entry.id}
          className="flex items-center justify-between p-3 px-4 rounded-xl border border-border/40 bg-card/30 hover:bg-card/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-6">
              {getRankIcon(index)}
            </div>
            
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-border/60">
                <AvatarImage src={entry.avatar_url} />
                <AvatarFallback seed={entry.username}>
                  {(entry.username || 'U').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground text-sm">{entry.username}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="font-bold text-primary text-lg leading-none">{entry.wins}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Wins</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
