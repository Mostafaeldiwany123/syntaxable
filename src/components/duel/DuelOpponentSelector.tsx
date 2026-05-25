import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Swords, Search, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFriends } from '@/hooks/friends';
import { usePresence } from '@/hooks/usePresence';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
};

interface DuelOpponentSelectorProps {
  onSelect: (opponentId: string, username: string, avatarUrl?: string) => void;
}

export const DuelOpponentSelector: React.FC<DuelOpponentSelectorProps> = ({ onSelect }) => {
  const { data: friends, isLoading } = useFriends();
  const { onlineUsers } = usePresence();
  
  const onlineFriends = friends?.filter(f => onlineUsers.includes(f.id)) || [];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-2xl">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <UserCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Choose Opponent</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Select an online friend to challenge
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {isLoading ? (
            <div className="text-center text-muted-foreground p-8">Loading friends...</div>
          ) : onlineFriends.length === 0 ? (
            <div className="text-center text-muted-foreground p-8 bg-card border border-border rounded-xl">
              No friends are currently online to duel.
            </div>
          ) : (
            onlineFriends.map(opponent => (
              <motion.button
                key={opponent.id}
                variants={itemVariants}
                onClick={() => onSelect(opponent.id, opponent.username, opponent.avatar_url)}
                className="w-full text-left p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors flex items-center gap-4 group"
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-transparent group-hover:border-primary/20 transition-colors">
                    <AvatarImage src={opponent.avatar_url} />
                    <AvatarFallback seed={opponent.username} className="text-lg">
                      {opponent.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-card rounded-full" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {opponent.username}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {opponent.status || 'Online'}
                  </p>
                </div>
                
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                  <Swords className="w-5 h-5" />
                </div>
              </motion.button>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DuelOpponentSelector;
