import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Trophy, Frown, Swords, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DuelPlayer } from '@/hooks/useDuel';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

interface DuelResultProps {
  players: [DuelPlayer, DuelPlayer];
  winnerId: string | null;
  currentUserId: string;
  onPlayAgain: () => void;
  onExit: () => void;
}

export const DuelResult: React.FC<DuelResultProps> = ({
  players,
  winnerId,
  currentUserId,
  onPlayAgain,
  onExit,
}) => {
  const didWin = winnerId === currentUserId;
  const winner = players.find(p => p.id === winnerId);
  const loser = players.find(p => p.id !== winnerId);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md text-center">
        {/* Trophy / Icon */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
            className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${
              didWin
                ? 'bg-primary/10 border border-primary/30'
                : 'bg-muted/50 border border-border'
            }`}
          >
            {didWin ? (
              <Trophy className="w-10 h-10 text-primary" />
            ) : (
              <Frown className="w-10 h-10 text-muted-foreground" />
            )}
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants}>
          <h1 className={`text-3xl font-bold tracking-tight ${didWin ? 'text-primary' : 'text-foreground'}`}>
            {didWin ? 'Victory!' : 'Defeat'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {didWin ? 'You solved problems faster than your opponent!' : 'Your opponent was faster this time. Try again!'}
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          variants={itemVariants}
          className="mt-8 bg-card border border-border rounded-2xl p-6"
        >
          <div className="flex items-center justify-center gap-6">
            {/* Winner */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <Avatar className="h-14 w-14 border-2 border-primary">
                  <AvatarImage src={winner?.avatar_url} />
                  <AvatarFallback seed={winner?.username} className="text-lg font-bold">
                    {winner?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Trophy className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm">{winner?.username}</p>
                <p className="text-2xl font-bold text-primary">{winner?.score}</p>
              </div>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center">
              <Swords className="w-5 h-5 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground font-medium">VS</span>
            </div>

            {/* Loser */}
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-14 w-14 border-2 border-border">
                <AvatarImage src={loser?.avatar_url} />
                <AvatarFallback seed={loser?.username} className="text-lg font-bold">
                  {loser?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm text-muted-foreground">{loser?.username}</p>
                <p className="text-2xl font-bold text-muted-foreground">{loser?.score}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div variants={itemVariants} className="mt-6 flex gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onExit}
            className="flex-1 gap-2"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </Button>
          <Button
            size="lg"
            onClick={onPlayAgain}
            className="flex-1 gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DuelResult;
