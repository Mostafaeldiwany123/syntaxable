import React from 'react';
import { motion } from 'framer-motion';
import { DuelPlayer } from '@/hooks/useDuel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Swords } from 'lucide-react';

interface DuelScoreboardProps {
  players: [DuelPlayer, DuelPlayer];
  scoreTarget: number;
  roundNum: number;
}

export const DuelScoreboard: React.FC<DuelScoreboardProps> = ({ players, scoreTarget, roundNum }) => {
  return (
    <div className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
      {/* Player 1 (You) */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative">
          <Avatar className="h-8 w-8 border border-primary/30">
            <AvatarImage src={players[0].avatar_url} />
            <AvatarFallback seed={players[0].username} className="text-xs font-semibold">
              {players[0].username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-card rounded-full" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{players[0].username}</p>
          <p className="text-[10px] text-primary font-medium uppercase tracking-wider">You</p>
        </div>
      </div>

      {/* Score Center */}
      <div className="flex items-center gap-3">
        {/* Player 1 score pips */}
        <div className="flex items-center gap-1">
          {Array.from({ length: scoreTarget }).map((_, i) => (
            <motion.div
              key={`p1-${i}`}
              initial={false}
              animate={{
                scale: i < players[0].score ? 1.1 : 1,
                backgroundColor: i < players[0].score ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="w-3 h-3 rounded-full border border-border/50"
            />
          ))}
        </div>

        {/* Score display */}
        <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-lg border border-border/30">
          <span className="text-lg font-bold text-foreground tabular-nums">{players[0].score}</span>
          <div className="flex flex-col items-center">
            <Swords className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[8px] text-muted-foreground font-medium uppercase tracking-wider">R{roundNum}</span>
          </div>
          <span className="text-lg font-bold text-foreground tabular-nums">{players[1].score}</span>
        </div>

        {/* Player 2 score pips */}
        <div className="flex items-center gap-1">
          {Array.from({ length: scoreTarget }).map((_, i) => (
            <motion.div
              key={`p2-${i}`}
              initial={false}
              animate={{
                scale: i < players[1].score ? 1.1 : 1,
                backgroundColor: i < players[1].score ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="w-3 h-3 rounded-full border border-border/50"
            />
          ))}
        </div>
      </div>

      {/* Player 2 (Opponent) */}
      <div className="flex items-center gap-3 min-w-0 flex-row-reverse">
        <div className="relative">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src={players[1].avatar_url} />
            <AvatarFallback seed={players[1].username} className="text-xs font-semibold">
              {players[1].username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-card rounded-full" />
        </div>
        <div className="min-w-0 text-right">
          <p className="text-sm font-semibold truncate">{players[1].username}</p>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Opponent</p>
        </div>
      </div>
    </div>
  );
};

export default DuelScoreboard;
