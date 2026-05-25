import { useState, useCallback, useEffect, useRef } from 'react';
import { Problem, Lesson, Course, getAllCourses } from '@/data/practiceProblems';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useLocation, useNavigate } from 'react-router-dom';

// --- Types ---

export type DuelPhase = 'loading' | 'landing' | 'select_opponent' | 'setup' | 'waiting_for_accept' | 'playing' | 'round_end' | 'finished';

export interface DuelPlayer {
  id: string;
  username: string;
  avatar_url?: string;
  score: number;
  solvedCurrent: boolean;
}

export interface DuelConfig {
  language: string;
  lessonIds: string[];
  scoreTarget: number;
}

export interface DuelState {
  phase: DuelPhase;
  duelId: string | null;
  config: DuelConfig | null;
  players: [DuelPlayer, DuelPlayer];
  currentProblem: Problem | null;
  roundNum: number;
  roundWinner: string | null;  // player id who won current round
  gameWinner: string | null;   // player id who won the game
  usedProblemIds: string[];
  availableProblems: Problem[];
}

const EMPTY_OPPONENT: DuelPlayer = {
  id: '',
  username: 'Waiting...',
  avatar_url: undefined,
  score: 0,
  solvedCurrent: false,
};

// --- Hook ---

export function useDuel(currentUser: { id: string; username: string; avatar_url?: string } | null) {
  const [state, setState] = useState<DuelState>({
    phase: 'loading',
    duelId: null,
    config: null,
    players: [
      {
        id: currentUser?.id || 'local-user',
        username: currentUser?.username || 'You',
        avatar_url: currentUser?.avatar_url,
        score: 0,
        solvedCurrent: false,
      },
      { ...EMPTY_OPPONENT },
    ],
    currentProblem: null,
    roundNum: 0,
    roundWinner: null,
    gameWinner: null,
    usedProblemIds: [],
    availableProblems: [],
  });

  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Get all courses for language/lesson selection
  const allCourses = getAllCourses();

  // Pick a random problem from available pool
  const pickRandomProblem = useCallback((problems: Problem[], usedIds: string[]): Problem | null => {
    const available = problems.filter(p => !usedIds.includes(p.id));
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  }, []);

  const lastInitializedIdRef = useRef<string | null | undefined>(undefined);

  // --- Initialize from URL or Setup ---
  useEffect(() => {
    if (!currentUser) return;

    const queryParams = new URLSearchParams(location.search);
    const joinDuelId = queryParams.get('id');

    if (joinDuelId !== lastInitializedIdRef.current) {
      lastInitializedIdRef.current = joinDuelId;
      if (joinDuelId) {
        joinDuel(joinDuelId);
      } else {
        setState(prev => ({
          ...prev,
          phase: 'landing',
          players: [
            {
              id: currentUser.id,
              username: currentUser.username,
              avatar_url: currentUser.avatar_url,
              score: 0,
              solvedCurrent: false,
            },
            { ...EMPTY_OPPONENT },
          ],
        }));
      }
    }
  }, [currentUser?.id, location.search]);

  // --- Realtime Synchronization ---
  useEffect(() => {
    if (!state.duelId || !currentUser) return;

    const newChannel = supabase.channel(`duel:${state.duelId}`);

    newChannel
      .on('presence', { event: 'sync' }, () => {
        const newState = newChannel.presenceState();
        // Check if opponent is present
        let opponentPresent = false;
        for (const [key, value] of Object.entries(newState)) {
          if ((value[0] as any).user_id !== currentUser.id) {
            opponentPresent = true;
          }
        }

        setState(prev => {
          if (prev.phase === 'waiting_for_accept' && opponentPresent) {
            toast.success('Opponent joined!');
            // If we are host and opponent joins, we broadcast START
            if (prev.players[0].id === currentUser.id && prev.currentProblem) {
              newChannel.send({
                type: 'broadcast',
                event: 'start_game',
                payload: {
                  config: prev.config,
                  currentProblemId: prev.currentProblem.id,
                  availableProblemIds: prev.availableProblems.map(p => p.id),
                  players: prev.players
                }
              });
            }
            return { ...prev, phase: 'playing' };
          }
          return prev;
        });
      })
      .on('broadcast', { event: 'start_game' }, ({ payload }) => {
        // As a guest, we receive the start_game event
        const course = allCourses.find(c => c.language === payload.config.language);
        if (!course) return;

        let allProbs: Problem[] = [];
        course.lessons.forEach(l => { allProbs.push(...l.problems); });

        const currentProb = allProbs.find(p => p.id === payload.currentProblemId) || null;
        const available = allProbs.filter(p => payload.availableProblemIds.includes(p.id));

        setState(prev => {
          // we need to set our players correctly based on host's state
          const p1 = payload.players.find((p: any) => p.id === currentUser.id) || prev.players[0];
          const p2 = payload.players.find((p: any) => p.id !== currentUser.id) || prev.players[1];

          return {
            ...prev,
            phase: 'playing',
            config: payload.config,
            currentProblem: currentProb,
            availableProblems: available,
            usedProblemIds: [payload.currentProblemId],
            players: [p1, p2],
          };
        });
      })
      .on('broadcast', { event: 'player_solved' }, ({ payload }) => {
        // Opponent solved
        handleOpponentSolved(payload.userId);
      })
      .on('broadcast', { event: 'next_round' }, ({ payload }) => {
        // Host selected next round
        const course = allCourses.find(c => c.language === payload.language);
        if (!course) return;
        let allProbs: Problem[] = [];
        course.lessons.forEach(l => { allProbs.push(...l.problems); });
        const nextProb = allProbs.find(p => p.id === payload.problemId) || null;

        setState(prev => ({
          ...prev,
          phase: 'playing',
          roundNum: payload.roundNum,
          currentProblem: nextProb,
          usedProblemIds: [...prev.usedProblemIds, payload.problemId],
          roundWinner: null,
          players: [
            { ...prev.players[0], solvedCurrent: false },
            { ...prev.players[1], solvedCurrent: false },
          ]
        }));
      })
      .on('broadcast', { event: 'game_over' }, ({ payload }) => {
        setState(prev => ({
          ...prev,
          phase: 'finished',
          gameWinner: payload.winnerId
        }));
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await newChannel.track({
            user_id: currentUser.id,
            joined_at: new Date().toISOString(),
          });
        }
      });

    setChannel(newChannel);

    return () => {
      supabase.removeChannel(newChannel);
    };
  }, [state.duelId, currentUser]);


  const joinDuel = async (id: string) => {
    setState(prev => ({ ...prev, phase: 'loading', duelId: id }));
    try {
      const { data: duel, error } = await supabase.from('duels').select('*').eq('id', id).single();
      if (error) throw error;

      if (duel.status === 'completed' || duel.status === 'cancelled') {
        toast.error('This duel has ended');
        navigate('/duel');
        return;
      }

      // Insert ourselves as participant if we aren't already
      if (currentUser) {
        await supabase.from('duel_participants').upsert({
          duel_id: id,
          user_id: currentUser.id,
          score: 0
        }, { onConflict: 'duel_id, user_id' });
      }

      setState(prev => ({
        ...prev,
        phase: 'waiting_for_accept', // Wait for host to broadcast start
        duelId: id,
        config: duel.config,
      }));

    } catch (err: any) {
      toast.error(err.message || 'Failed to join duel');
      navigate('/duel');
    }
  };

  const getLessonsForLanguage = useCallback((language: string): Lesson[] => {
    const course = allCourses.find(c => c.language === language);
    return course?.lessons || [];
  }, [allCourses]);

  const selectOpponent = useCallback((opponentId: string, opponentUsername: string, opponentAvatar?: string) => {
    setState(prev => ({
      ...prev,
      phase: 'setup',
      players: [
        prev.players[0],
        {
          id: opponentId,
          username: opponentUsername,
          avatar_url: opponentAvatar,
          score: 0,
          solvedCurrent: false,
        }
      ]
    }));
  }, []);

  // Host starts duel
  const startDuel = async (config: DuelConfig) => {
    if (!currentUser) return;
    const opponent = state.players[1];
    if (!opponent.id) return;

    try {
      const { data: duel, error: duelError } = await supabase.from('duels').insert({
        status: 'active',
        config
      }).select().single();

      if (duelError) throw duelError;

      // Insert both participants
      await supabase.from('duel_participants').insert([
        { duel_id: duel.id, user_id: currentUser.id, score: 0 },
        { duel_id: duel.id, user_id: opponent.id, score: 0 }
      ]);

      // Send invite notification
      await supabase.from('notifications').insert({
        user_id: opponent.id,
        actor_id: currentUser.id,
        type: 'DUEL_CHALLENGE',
        metadata: {
          duel_id: duel.id,
          language: config.language,
          scoreTarget: config.scoreTarget
        }
      });

      toast.success(`Challenge sent to ${opponent.username}'s inbox!`);

      // Get problems ready
      const course = allCourses.find(c => c.language === config.language);
      if (!course) return;

      const problems: Problem[] = [];
      for (const lesson of course.lessons) {
        if (config.lessonIds.includes(lesson.id)) {
          problems.push(...lesson.problems);
        }
      }

      const firstProblem = problems[Math.floor(Math.random() * problems.length)];

      setState(prev => ({
        ...prev,
        phase: 'waiting_for_accept',
        duelId: duel.id,
        config,
        roundNum: 1,
        currentProblem: firstProblem,
        usedProblemIds: [firstProblem.id],
        availableProblems: problems,
      }));

      // Wait for Realtime sync to trigger START_GAME when opponent joins
    } catch (err: any) {
      toast.error(err.message || 'Failed to start duel');
    }
  };

  const handleOpponentSolved = useCallback((opponentId: string) => {
    setState(prev => {
      if (prev.phase !== 'playing') return prev;

      const p1Index = prev.players.findIndex(p => p.id === opponentId);
      if (p1Index === -1) return prev; // Not found

      // Map local indices properly (players[0] is current user, players[1] is opponent usually, but better to check ID)
      const updatedPlayers: [DuelPlayer, DuelPlayer] = [
        { ...prev.players[0] },
        { ...prev.players[1] }
      ];
      const opIndex = updatedPlayers[0].id === opponentId ? 0 : 1;
      const myIndex = opIndex === 0 ? 1 : 0;

      if (updatedPlayers[opIndex].solvedCurrent) return prev;
      updatedPlayers[opIndex].solvedCurrent = true;

      // If I haven't solved yet, opponent wins this round
      if (!updatedPlayers[myIndex].solvedCurrent) {
        updatedPlayers[opIndex].score += 1;
        const isGameOver = updatedPlayers[opIndex].score >= (prev.config?.scoreTarget || 3);

        if (isGameOver) {
          finishDuel(opponentId);
        }

        return {
          ...prev,
          phase: isGameOver ? 'finished' : 'round_end',
          players: updatedPlayers,
          roundWinner: opponentId,
          gameWinner: isGameOver ? opponentId : null,
        };
      }

      return { ...prev, players: updatedPlayers };
    });
  }, []);

  const handlePlayerSolved = useCallback(async () => {
    if (!currentUser || !channel || !state.duelId) return;

    // Broadcast our solve
    channel.send({
      type: 'broadcast',
      event: 'player_solved',
      payload: { userId: currentUser.id }
    });

    setState(prev => {
      if (prev.phase !== 'playing') return prev;

      const updatedPlayers: [DuelPlayer, DuelPlayer] = [
        { ...prev.players[0] },
        { ...prev.players[1] }
      ];
      
      // Prevent multiple triggers from mutating further
      if (updatedPlayers[0].solvedCurrent) return prev;
      
      updatedPlayers[0].solvedCurrent = true;
      updatedPlayers[0].score += 1;

      const isGameOver = updatedPlayers[0].score >= (prev.config?.scoreTarget || 3);

      if (isGameOver) {
        finishDuel(currentUser.id);
      }

      return {
        ...prev,
        phase: isGameOver ? 'finished' : 'round_end',
        players: updatedPlayers,
        roundWinner: currentUser.id,
        gameWinner: isGameOver ? currentUser.id : null,
      };
    });

    // Update score in DB
    await supabase.from('duel_participants')
      .update({ score: state.players[0].score + 1 })
      .eq('duel_id', state.duelId)
      .eq('user_id', currentUser.id);

  }, [currentUser, channel, state]);

  const finishDuel = async (winnerId: string) => {
    if (!state.duelId || !channel) return;

    await supabase.from('duels')
      .update({ status: 'completed', winner_id: winnerId })
      .eq('id', state.duelId);

    channel.send({
      type: 'broadcast',
      event: 'game_over',
      payload: { winnerId }
    });
  };

  const nextRound = useCallback(() => {
    if (!channel || !state.config) return;

    setState(prev => {
      const nextProblem = pickRandomProblem(prev.availableProblems, prev.usedProblemIds);

      if (!nextProblem) {
        finishDuel(prev.players[0].score >= prev.players[1].score ? prev.players[0].id : prev.players[1].id);
        return prev;
      }

      channel.send({
        type: 'broadcast',
        event: 'next_round',
        payload: {
          problemId: nextProblem.id,
          language: prev.config!.language,
          roundNum: prev.roundNum + 1
        }
      });

      return {
        ...prev,
        phase: 'playing',
        roundNum: prev.roundNum + 1,
        currentProblem: nextProblem,
        usedProblemIds: [...prev.usedProblemIds, nextProblem.id],
        roundWinner: null,
        players: [
          { ...prev.players[0], solvedCurrent: false },
          { ...prev.players[1], solvedCurrent: false },
        ],
      };
    });
  }, [channel, pickRandomProblem]);

  const resetDuel = useCallback(() => {
    navigate('/duel'); // Clears the ID from URL and remounts
  }, [navigate]);

  const startNewMatch = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'select_opponent',
      players: [
        {
          id: currentUser?.id || 'local-user',
          username: currentUser?.username || 'You',
          avatar_url: currentUser?.avatar_url,
          score: 0,
          solvedCurrent: false,
        },
        { ...EMPTY_OPPONENT },
      ],
    }));
  }, [currentUser]);

  const goToLanding = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'landing'
    }));
  }, []);

  return {
    state,
    allCourses,
    getLessonsForLanguage,
    selectOpponent,
    startDuel,
    handlePlayerSolved,
    nextRound,
    resetDuel,
    startNewMatch,
    goToLanding,
  };
}
