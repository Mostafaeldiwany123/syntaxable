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
      <div className="w-full max-w-xl">
        <motion.div variants={itemVariants} className="mb-6 flex items-center justify-between border-b border-border/40 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground tracking-tight flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary shrink-0" />
              Choose Opponent
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Select an online friend to challenge for a coding duel.
            </p>
          </div>
          <span className="text-[10px] font-semibold bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20">
            {onlineFriends.length} Online
          </span>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="space-y-2 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-border"
        >
          {isLoading ? (
            <div className="text-center text-muted-foreground py-12 text-sm">Loading friends...</div>
          ) : onlineFriends.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 px-4 bg-card/20 border border-dashed border-border/40 rounded-xl">
              <p className="text-sm">No friends are currently online.</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Challenge them when they log in.</p>
            </div>
          ) : (
            onlineFriends.map(opponent => (
              <button
                key={opponent.id}
                onClick={() => onSelect(opponent.id, opponent.username, opponent.avatar_url)}
                className="w-full text-left p-3.5 rounded-xl border border-border bg-card/45 hover:bg-card/85 hover:border-primary/50 transition-all duration-205 flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 border border-border/60 transition-colors group-hover:border-primary/30">
                    <AvatarImage src={opponent.avatar_url} />
                    <AvatarFallback seed={opponent.username} className="text-sm font-medium">
                      {opponent.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full ring-1 ring-green-500/20 animate-pulse" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                    {opponent.username}
                  </h3>
                  <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                    {opponent.status || 'Active now'}
                  </p>
                </div>
                
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 duration-200">
                  <Swords className="w-4 h-4" />
                </div>
              </button>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DuelOpponentSelector;

