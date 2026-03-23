import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface RewardStatus {
    fiveAchievementRewardClaimed: boolean;
    allAchievementRewardClaimed: boolean;
    unlockedCount: number;
    totalAchievements: number;
    canClaimFiveReward: boolean;
    canClaimAllReward: boolean;
}

export interface ClaimResult {
    success: boolean;
    reward_amount?: number;
    new_credits?: number;
    reward_type?: string;
    error?: string;
    required?: number;
    current?: number;
}

const TOTAL_ACHIEVEMENTS = 10;

// Fetch user's reward status
export const useRewardStatus = (userId?: string) => {
    return useQuery<RewardStatus, Error>({
        queryKey: ['rewardStatus', userId],
        queryFn: async () => {
            if (!userId) {
                return {
                    fiveAchievementRewardClaimed: false,
                    allAchievementRewardClaimed: false,
                    unlockedCount: 0,
                    totalAchievements: TOTAL_ACHIEVEMENTS,
                    canClaimFiveReward: false,
                    canClaimAllReward: false,
                };
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('achievements, five_achievement_reward_claimed, all_achievement_reward_claimed')
                .eq('id', userId)
                .single();

            if (error) throw error;

            const achievements = (data?.achievements as string[]) || [];
            const unlockedCount = achievements.length;
            const fiveClaimed = data?.five_achievement_reward_claimed ?? false;
            const allClaimed = data?.all_achievement_reward_claimed ?? false;

            return {
                fiveAchievementRewardClaimed: fiveClaimed,
                allAchievementRewardClaimed: allClaimed,
                unlockedCount,
                totalAchievements: TOTAL_ACHIEVEMENTS,
                canClaimFiveReward: unlockedCount >= 5 && !fiveClaimed,
                canClaimAllReward: unlockedCount >= TOTAL_ACHIEVEMENTS && !allClaimed,
            };
        },
        enabled: !!userId,
        staleTime: 1000 * 60, // 1 minute
    });
};

// Claim achievement reward
export const useClaimReward = () => {
    const queryClient = useQueryClient();

    return useMutation<ClaimResult, Error, 'five' | 'all'>({
        mutationFn: async (rewardType: 'five' | 'all') => {
            const { data, error } = await supabase.rpc('claim_achievement_reward', {
                p_reward_type: rewardType
            });

            if (error) throw error;
            return data as ClaimResult;
        },
        onSuccess: () => {
            // Invalidate all relevant queries to refresh UI instantly
            queryClient.invalidateQueries({ queryKey: ['rewardStatus'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['userCredits'] });
            queryClient.invalidateQueries({ queryKey: ['achievementProgress'] });
        },
    });
};

// Check if user has newly unlocked achievements that qualify for rewards
export const useCheckRewardEligibility = (userId?: string) => {
    const { data: rewardStatus } = useRewardStatus(userId);

    return {
        isEligibleForFiveReward: rewardStatus?.canClaimFiveReward ?? false,
        isEligibleForAllReward: rewardStatus?.canClaimAllReward ?? false,
        fiveRewardClaimed: rewardStatus?.fiveAchievementRewardClaimed ?? false,
        allRewardClaimed: rewardStatus?.allAchievementRewardClaimed ?? false,
        unlockedCount: rewardStatus?.unlockedCount ?? 0,
    };
};