import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Swords, ArrowRight, Clock, ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/profiles';
import { useDuel } from '@/hooks/useDuel';
import { DuelSetup } from '@/components/duel/DuelSetup';
import { DuelOpponentSelector } from '@/components/duel/DuelOpponentSelector';
import { DuelArena } from '@/components/duel/DuelArena';
import { DuelResult } from '@/components/duel/DuelResult';
import { DuelLeaderboard } from '@/components/duel/DuelLeaderboard';
import { useDuelHistory } from '@/hooks/useDuelHistory';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

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

const languageMap: Record<string, { label: string; icon: string }> = {
  cpp: { label: 'C++', icon: 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons/cpp.svg' },
  csharp: { label: 'C#', icon: 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons/csharp.svg' },
  python: { label: 'Python', icon: 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons/python.svg' },
  java: { label: 'Java', icon: 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons/java.svg' },
  javascript: { label: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons/javascript.svg' },
  typescript: { label: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons/typescript.svg' },
};

const DuelPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);

  const currentUser = React.useMemo(() => {
    if (!user) return null;
    return {
      id: user.id,
      username: profile?.username || user.email?.split('@')[0] || 'Player',
      avatar_url: profile?.avatar_url,
    };
  }, [user, profile?.username, profile?.avatar_url]);

  const {
    state,
    allCourses,
    getLessonsForLanguage,
    selectOpponent,
    startDuel,
    handlePlayerSolved,
    nextRound,
    resetDuel,
    playAgain,
    startNewMatch,
    goToLanding,
  } = useDuel(currentUser);

  const { data: duelHistory, isLoading: isHistoryLoading } = useDuelHistory(currentUser?.id);
  const [sortBy, setSortBy] = useState<'recent' | 'outcome' | 'score' | 'language'>('recent');

  const sortedHistory = React.useMemo(() => {
    if (!duelHistory) return [];
    return [...duelHistory].sort((a, b) => {
      switch (sortBy) {
        case 'outcome':
          const scoreMap = { won: 4, active: 3, draw: 2, lost: 1 };
          return (scoreMap[b.outcome] || 0) - (scoreMap[a.outcome] || 0);
        case 'score':
          return b.playerScore - a.playerScore;
        case 'language':
          return (a.config?.language || '').localeCompare(b.config?.language || '');
        case 'recent':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
  }, [duelHistory, sortBy]);

  const handleExit = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  // Round end overlay
  if (state.phase === 'round_end') {
    const roundWinnerPlayer = state.players.find(p => p.id === state.roundWinner);
    const didWinRound = state.roundWinner === currentUser?.id;

    return (
      <div className="h-dvh w-full flex flex-col overflow-hidden bg-transparent">
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="text-center max-w-sm"
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
              didWinRound
                ? 'bg-green-500/10 border border-green-500/30'
                : 'bg-red-500/10 border border-red-500/30'
            }`}>
              <Swords className={`w-8 h-8 ${didWinRound ? 'text-green-500' : 'text-red-500'}`} />
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {didWinRound ? 'Round Won!' : 'Round Lost'}
            </h2>
            <p className="text-muted-foreground text-sm mb-2">
              {didWinRound
                ? 'You solved it first!'
                : `${roundWinnerPlayer?.username} solved it first`
              }
            </p>

            <div className="flex items-center justify-center gap-4 my-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{state.players[0].score}</p>
                <p className="text-xs text-muted-foreground">{state.players[0].username}</p>
              </div>
              <span className="text-muted-foreground text-sm">-</span>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{state.players[1].score}</p>
                <p className="text-xs text-muted-foreground">{state.players[1].username}</p>
              </div>
            </div>

            <Button onClick={nextRound} className="gap-2" size="lg">
              Next Round
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // The finished logic is now handled in the playing block so the user can see their code behind the result.

  // Waiting for accept
  if (state.phase === 'waiting_for_accept') {
    const isGuest = state.players[1].id === '';
    return (
      <div className="h-dvh w-full flex flex-col overflow-hidden bg-transparent">
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="relative inline-flex mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border-2 border-primary/50 z-10">
                <Clock className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Waiting for Opponent</h2>
            <p className="text-muted-foreground text-sm">
              {isGuest
                ? 'Waiting for the host to synchronize the match...'
                : `Waiting for ${state.players[1].username} to accept the challenge...`}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Playing or Finished (arena visible)
  if ((state.phase === 'playing' || state.phase === 'finished') && state.currentProblem && state.config) {
    return (
      <div className="h-dvh w-full flex flex-col overflow-hidden">
        <DuelArena
          problem={state.currentProblem}
          language={state.config.language}
          players={state.players}
          scoreTarget={state.config.scoreTarget}
          roundNum={state.roundNum}
          onSolved={handlePlayerSolved}
        />
        {state.phase === 'finished' && (
          <DuelResult
            players={state.players}
            winnerId={state.gameWinner}
            currentUserId={currentUser?.id || ''}
            onPlayAgain={playAgain}
            onExit={handleExit}
          />
        )}
      </div>
    );
  }

  // Setup / Select Opponent (default)
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-dvh w-full flex flex-col overflow-hidden bg-transparent"
    >
      {/* Header */}
      <div className="border-b border-border shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <motion.div variants={itemVariants}>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
                <Swords className="w-7 h-7 text-primary" />
                Coding Duels
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Race to solve problems faster than your opponent.
              </p>
            </motion.div>
            {(state.phase === 'select_opponent' || state.phase === 'setup') && (
              <Button variant="ghost" onClick={goToLanding} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Matches
              </Button>
            )}
            {state.phase === 'landing' && (
              <div className="w-[180px]">
                <Select value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
                  <SelectTrigger className="bg-card/40 border-border/40 backdrop-blur-sm focus-visible:border-primary/50 transition-colors">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recent Matches</SelectItem>
                    <SelectItem value="outcome">Wins First</SelectItem>
                    <SelectItem value="score">High Score First</SelectItem>
                    <SelectItem value="language">By Language</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col">
        {state.phase === 'landing' ? (
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-10 relative z-10 flex-grow">
            <div className="flex flex-col gap-10">
              {/* Main Content (Matches) */}
              <div className="w-full">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* New Duel Box */}
                  <motion.button
                    variants={itemVariants}
                    onClick={startNewMatch}
                    className="group relative flex flex-col items-center justify-center p-6 h-48 rounded-2xl border-2 border-dashed border-border/40 bg-card/20 hover:bg-card/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 backdrop-blur-sm text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <Plus className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">New Match</h3>
                    <p className="text-xs text-muted-foreground mt-1 text-center max-w-[200px]">
                      Challenge an online friend to a coding duel.
                    </p>
                  </motion.button>

                  {/* History Items */}
                  {isHistoryLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-48 rounded-2xl border border-border/40 bg-card/25 animate-pulse" />
                    ))
                  ) : sortedHistory.length > 0 ? (
                    sortedHistory.map((item) => {
                      const langInfo = languageMap[item.config?.language || ''];
                      return (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          className="group relative flex flex-col justify-between p-5 h-48 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/40 hover:border-border/80 hover:shadow-lg hover:shadow-primary/[0.02] transition-all duration-300 backdrop-blur-sm"
                        >
                          {/* Card Header */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <Avatar className="h-8 w-8 border border-border/60">
                                <AvatarImage src={item.opponent?.avatar_url} />
                                <AvatarFallback seed={item.opponent?.username || 'Opponent'}>
                                  {(item.opponent?.username || 'O').charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-sm text-foreground truncate max-w-[120px]">
                                {item.opponent?.username || 'Opponent'}
                              </span>
                            </div>
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                              {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                            </span>
                          </div>

                          {/* Card Center: Outcome & Score */}
                          <div className="flex items-center justify-center gap-6 my-2">
                            <div className="text-right">
                              <p className="text-2xl font-bold tracking-tight text-foreground">{item.playerScore}</p>
                              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">You</p>
                            </div>
                            <div className="flex flex-col items-center gap-1 shrink-0">
                              <span className="text-muted-foreground/45 text-sm font-semibold">-</span>
                              {item.outcome === 'won' && (
                                <Badge className="bg-green-500/10 hover:bg-green-500/15 text-green-500 border border-green-500/20 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5">
                                  Won
                                </Badge>
                              )}
                              {item.outcome === 'lost' && (
                                <Badge className="bg-red-500/10 hover:bg-red-500/15 text-red-500 border border-red-500/20 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5">
                                  Lost
                                </Badge>
                              )}
                              {item.outcome === 'draw' && (
                                <Badge className="bg-muted text-muted-foreground border border-border text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5">
                                  Draw
                                </Badge>
                              )}
                              {item.outcome === 'active' && (
                                <Badge className="bg-amber-500/10 hover:bg-amber-500/15 text-amber-500 border border-amber-500/20 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5">
                                  Active
                                </Badge>
                              )}
                            </div>
                            <div className="text-left">
                              <p className="text-2xl font-bold tracking-tight text-foreground">{item.opponentScore}</p>
                              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Them</p>
                            </div>
                          </div>

                          {/* Card Footer: Language & Score Target */}
                          <div className="flex items-center justify-between border-t border-border/30 pt-3">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                              {langInfo ? (
                                <>
                                  <img src={langInfo.icon} alt={langInfo.label} className="w-3.5 h-3.5 object-contain" />
                                  <span>{langInfo.label}</span>
                                </>
                              ) : (
                                <span>Duel</span>
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground font-semibold bg-secondary/40 px-2 py-0.5 rounded-full border border-border/30">
                              First to {item.config?.scoreTarget || 3}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center border border-dashed border-border/40 rounded-2xl bg-card/10 backdrop-blur-sm">
                      <p className="text-muted-foreground text-sm">No previous matches found.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="w-full mt-4">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                  <Swords className="w-5 h-5 text-primary" />
                  Top Duelists
                </h3>
                <DuelLeaderboard />
              </div>
            </div>
          </div>
        ) : state.phase === 'select_opponent' ? (
          <DuelOpponentSelector onSelect={selectOpponent} />
        ) : (
          <DuelSetup
            courses={allCourses}
            getLessonsForLanguage={getLessonsForLanguage}
            onStart={startDuel}
            opponentName={state.players[1]?.username}
          />
        )}
      </div>
    </motion.div>
  );
};

export default DuelPage;
