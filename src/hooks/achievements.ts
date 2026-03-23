import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Achievement {
    id: string;
    name: string;
    description: string;
    requirement: string;
    unlocked?: boolean;
    unlockedAt?: string;
    progress?: number;
    total?: number;
}

// Achievement definitions - must match the frontend definitions
export const ACHIEVEMENT_DEFINITIONS = [
    { id: 'streak-5', name: 'On Fire', description: 'Maintain a 5-day coding streak', requirement: '5 day streak' },
    { id: 'problems-50', name: 'Problem Solver', description: 'Solve 50 practice problems', requirement: '50 problems solved' },
    { id: 'first-project', name: 'Pioneer', description: 'Create your first project', requirement: 'Create 1 project' },
    { id: 'commits-100', name: 'Code Master', description: 'Make 100 commits across all projects', requirement: '100 commits' },
    { id: 'streak-30', name: 'Champion', description: 'Maintain a 30-day coding streak', requirement: '30 day streak' },
    { id: 'friends-5', name: 'Social Butterfly', description: 'Make 5 friends on Syntaxable', requirement: '5 friends' },
    { id: 'first-commit', name: 'First Commit', description: 'Make your very first commit', requirement: '1 commit' },
    { id: 'true-identity', name: 'True Identity', description: 'Customize your profile with a unique status and bio', requirement: 'Custom status & bio' },
    { id: 'first-problem', name: 'Eureka', description: 'Solve your first practice problem', requirement: '1 problem solved' },
    { id: 'custom-set', name: 'Custom Creator', description: 'Create your first custom practice set', requirement: 'Create 1 set' },
];

// Fetch user's unlocked achievements
export const useUserAchievements = (userId?: string) => {
    return useQuery<string[], Error>({
        queryKey: ['userAchievements', userId],
        queryFn: async () => {
            if (!userId) return [];

            const { data, error } = await supabase
                .from('profiles')
                .select('achievements')
                .eq('id', userId)
                .single();

            if (error) throw error;
            return (data?.achievements as string[]) || [];
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Fetch achievement progress for a user
export const useAchievementProgress = (userId?: string) => {
    return useQuery<Achievement[], Error>({
        queryKey: ['achievementProgress', userId],
        queryFn: async () => {
            if (!userId) return [];

            // Get user's unlocked achievements
            const { data: profile } = await supabase
                .from('profiles')
                .select('achievements, current_streak, longest_streak, problems_solved, avatar_url, description, status')
                .eq('id', userId)
                .single();

            const unlockedAchievements = (profile?.achievements as string[]) || [];

            // Get project count
            const { count: projectCount } = await supabase
                .from('projects')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);

            // Get commit count
            const { count: commitCount } = await supabase
                .from('file_versions')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);

            // Get friends count
            const { data: friendships } = await supabase
                .from('friendships')
                .select('requester_id, addressee_id')
                .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
                .eq('status', 'accepted');

            const friendsCount = friendships?.length || 0;

            // Get custom sets count
            const { count: customSetsCount } = await supabase
                .from('custom_sets')
                .select('*', { count: 'exact', head: true })
                .eq('owner_id', userId);

            // Get practice problems count (unique problems)
            const { data: practiceData } = await supabase
                .from('practice_progress')
                .select('problem_id')
                .eq('user_id', userId);

            const problemsSolved = practiceData?.length || 0;

            // Build achievement progress
            const achievements: Achievement[] = ACHIEVEMENT_DEFINITIONS.map(def => {
                const isUnlocked = unlockedAchievements.includes(def.id);

                // Calculate progress for each achievement
                let progress = 0;
                let total = 0;

                switch (def.id) {
                    case 'streak-5':
                        progress = profile?.current_streak || 0;
                        total = 5;
                        break;
                    case 'problems-50':
                        progress = profile?.problems_solved || problemsSolved || 0;
                        total = 50;
                        break;
                    case 'first-project':
                        progress = projectCount || 0;
                        total = 1;
                        break;
                    case 'commits-100':
                        progress = commitCount || 0;
                        total = 100;
                        break;
                    case 'streak-30':
                        progress = profile?.longest_streak || 0;
                        total = 30;
                        break;
                    case 'friends-5':
                        progress = friendsCount;
                        total = 5;
                        break;
                    case 'first-commit':
                        progress = commitCount || 0;
                        total = 1;
                        break;
                    case 'true-identity':
                        // Check if user has customized their status (not default) AND has a bio
                        const hasCustomStatus = profile?.status && profile.status !== 'New to Syntaxable' && profile.status !== 'Coding enthusiast';
                        const hasBio = profile?.description && profile.description.length > 20;
                        progress = (hasCustomStatus ? 1 : 0) + (hasBio ? 1 : 0);
                        total = 2;
                        break;
                    case 'first-problem':
                        progress = problemsSolved;
                        total = 1;
                        break;
                    case 'custom-set':
                        progress = customSetsCount || 0;
                        total = 1;
                        break;
                }

                return {
                    ...def,
                    unlocked: isUnlocked,
                    progress: Math.min(progress, total),
                    total,
                };
            });

            return achievements;
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Check and award achievements
export const useCheckAchievements = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userId: string) => {
            // Get current stats
            const { data: profile } = await supabase
                .from('profiles')
                .select('achievements, current_streak, longest_streak, problems_solved, avatar_url, description, status')
                .eq('id', userId)
                .single();

            const currentAchievements = (profile?.achievements as string[]) || [];
            const newAchievements: string[] = [];

            // Get counts
            const { count: projectCount } = await supabase
                .from('projects')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);

            const { count: commitCount } = await supabase
                .from('file_versions')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);

            const { data: friendships } = await supabase
                .from('friendships')
                .select('requester_id, addressee_id')
                .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
                .eq('status', 'accepted');

            const friendsCount = friendships?.length || 0;

            const { count: customSetsCount } = await supabase
                .from('custom_sets')
                .select('*', { count: 'exact', head: true })
                .eq('owner_id', userId);

            const { data: practiceData } = await supabase
                .from('practice_progress')
                .select('problem_id')
                .eq('user_id', userId);

            const problemsSolved = practiceData?.length || 0;

            // Check each achievement
            const checks: Record<string, boolean> = {
                'streak-5': (profile?.current_streak || 0) >= 5,
                'problems-50': (profile?.problems_solved || problemsSolved) >= 50,
                'first-project': (projectCount || 0) >= 1,
                'commits-100': (commitCount || 0) >= 100,
                'streak-30': (profile?.longest_streak || 0) >= 30,
                'friends-5': friendsCount >= 5,
                'first-commit': (commitCount || 0) >= 1,
                'true-identity': !!(
                    profile?.status &&
                    profile.status !== 'New to Syntaxable' &&
                    profile.status !== 'Coding enthusiast' &&
                    profile?.description &&
                    profile.description.length > 20
                ),
                'first-problem': problemsSolved >= 1,
                'custom-set': (customSetsCount || 0) >= 1,
            };

            // Find newly earned achievements
            for (const [achievementId, earned] of Object.entries(checks)) {
                if (earned && !currentAchievements.includes(achievementId)) {
                    newAchievements.push(achievementId);
                }
            }

            // Update profile if there are new achievements
            if (newAchievements.length > 0) {
                const allAchievements = [...currentAchievements, ...newAchievements];
                const { error } = await supabase
                    .from('profiles')
                    .update({ achievements: allAchievements })
                    .eq('id', userId);

                if (error) throw error;
            }

            return { newAchievements, total: newAchievements.length };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userAchievements'] });
            queryClient.invalidateQueries({ queryKey: ['achievementProgress'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });
};

// Get achievement IDs for display (for profile/community cards)
export const useAchievementIds = (userId?: string) => {
    return useQuery<string[], Error>({
        queryKey: ['userAchievements', userId],
        queryFn: async () => {
            if (!userId) return [];

            const { data, error } = await supabase
                .from('profiles')
                .select('achievements')
                .eq('id', userId)
                .single();

            if (error) throw error;
            return (data?.achievements as string[]) || [];
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};