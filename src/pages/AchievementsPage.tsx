import { Trophy, Gift, CheckCircle2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ACHIEVEMENTS } from "@/components/achievements/AchievementIcons";
import { useAchievementProgress } from "@/hooks/achievements";
import { useRewardStatus, useClaimReward } from "@/hooks/useAchievementRewards";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const AchievementsPage = () => {
    const { user } = useAuth();
    const { data: achievements, isLoading } = useAchievementProgress(user?.id);
    const { data: rewardStatus, isLoading: rewardLoading, refetch: refetchRewards } = useRewardStatus(user?.id);
    const claimReward = useClaimReward();

    const [isClaimingFive, setIsClaimingFive] = useState(false);
    const [isClaimingAll, setIsClaimingAll] = useState(false);
    const [claimSuccess, setClaimSuccess] = useState<{ amount: number; type: string } | null>(null);

    const unlockedCount = achievements?.filter(a => a.unlocked).length || 0;

    const handleClaimFiveReward = async () => {
        setIsClaimingFive(true);
        try {
            const result = await claimReward.mutateAsync('five');
            if (result.success) {
                setClaimSuccess({ amount: result.reward_amount!, type: 'five' });
                refetchRewards();
            }
        } finally {
            setIsClaimingFive(false);
        }
    };

    const handleClaimAllReward = async () => {
        setIsClaimingAll(true);
        try {
            const result = await claimReward.mutateAsync('all');
            if (result.success) {
                setClaimSuccess({ amount: result.reward_amount!, type: 'all' });
                refetchRewards();
            }
        } finally {
            setIsClaimingAll(false);
        }
    };

    const closeSuccessModal = () => {
        setClaimSuccess(null);
    };

    return (
        <div className="min-h-full">
            {/* Header */}
            <div className="border-b border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                                Achievements
                            </h1>
                            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                                Track your progress and earn badges
                            </p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-lg border border-border">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                            <span className="font-semibold">
                                {isLoading ? "..." : `${unlockedCount} / ${ACHIEVEMENTS.length}`}
                            </span>
                            <span className="text-muted-foreground text-sm">unlocked</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
                {/* Achievements Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                        {ACHIEVEMENTS.map((_, i) => (
                            <Card key={i} className="p-4 sm:p-6 h-full">
                                <div className="flex flex-col items-center h-full">
                                    <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-3 sm:mb-4" />
                                    <Skeleton className="h-4 w-20 mb-2 underline" />
                                    <Skeleton className="h-3 w-24 mb-3" />
                                    <div className="mt-auto w-full">
                                        <Skeleton className="h-1.5 w-full" />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                        {ACHIEVEMENTS.map((achievement) => {
                            const status = achievements?.find(a => a.id === achievement.id);
                            const isUnlocked = status?.unlocked || false;
                            const IconComponent = achievement.icon;

                            return (
                                <Card
                                    key={achievement.id}
                                    className={`relative flex flex-col items-center p-4 sm:p-6 transition-all duration-300 h-full ${isUnlocked
                                        ? 'bg-card border-primary/30 hover:border-primary/50 hover:shadow-lg'
                                        : 'bg-card/50 border-border/50 opacity-75'
                                        }`}
                                >
                                    {/* Circular Badge Container */}
                                    <div className={`relative mb-3 sm:mb-4`}>
                                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${isUnlocked
                                            ? 'bg-primary/10 ring-2 ring-primary/30'
                                            : 'bg-secondary/50 ring-1 ring-border/50'
                                            }`}>
                                            <IconComponent
                                                className="h-8 w-8 sm:h-10 sm:w-10"
                                                isUnlocked={isUnlocked}
                                            />
                                        </div>
                                        {isUnlocked && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Name */}
                                    <h3 className={`text-sm sm:text-base font-semibold text-center mb-1 ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'
                                        }`}>
                                        {achievement.name}
                                    </h3>

                                    {/* Description */}
                                    <p className={`text-xs text-center mb-3 h-10 line-clamp-2 overflow-hidden flex items-center justify-center px-1 ${isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/60'
                                        }`}>
                                        {achievement.description}
                                    </p>

                                    {/* Progress or Unlocked */}
                                    <div className="w-full mt-auto">
                                        {!isUnlocked && status && 'progress' in status && status.total > 0 ? (
                                            <div className="space-y-1">
                                                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary/60 rounded-full transition-all duration-500"
                                                        style={{ width: `${Math.min(100, (status.progress / status.total) * 100)}%` }}
                                                    />
                                                </div>
                                                <p className="text-[10px] text-muted-foreground text-center">
                                                    {status.progress} / {status.total}
                                                </p>
                                            </div>
                                        ) : isUnlocked ? (
                                            <p className="text-[10px] text-primary font-medium text-center">
                                                Unlocked
                                            </p>
                                        ) : (
                                            <div className="h-4" /> /* Spacer if no status to keep height */
                                        )}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* Success Modal */}
                {claimSuccess && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <Card className="p-6 max-w-sm mx-4 text-center">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">Credits Added!</h2>
                            <p className="text-muted-foreground mb-4">
                                <span className="text-2xl font-bold text-primary">{claimSuccess.amount}</span> AI credits have been added to your account.
                            </p>
                            <Button onClick={closeSuccessModal}>
                                Continue
                            </Button>
                        </Card>
                    </div>
                )}

                {/* Reward System Section - Compact Cards Below Achievements */}
                <div className="mt-8 pt-6 border-t border-border">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Gift className="h-5 w-5 text-primary" />
                        Rewards
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* 5 Achievement Reward */}
                        <div className={`flex items-center gap-3 p-3 rounded-lg border ${rewardStatus?.fiveAchievementRewardClaimed ? 'bg-green-500/5 border-green-500/30' : rewardStatus?.canClaimFiveReward ? 'bg-blue-500/5 border-blue-500/30' : 'bg-secondary/30 border-border'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${rewardStatus?.fiveAchievementRewardClaimed ? 'bg-green-500/20' : rewardStatus?.canClaimFiveReward ? 'bg-blue-500/20' : 'bg-muted'}`}>
                                {rewardStatus?.fiveAchievementRewardClaimed ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                    <Gift className={`h-5 w-5 ${rewardStatus?.canClaimFiveReward ? 'text-blue-500' : 'text-muted-foreground'}`} />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-medium text-sm truncate">5 Achievements</span>
                                    <span className="font-bold text-primary text-sm">+20 Credits</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all ${rewardStatus?.fiveAchievementRewardClaimed ? 'bg-green-500' : 'bg-blue-500'}`}
                                            style={{ width: `${Math.min(100, (unlockedCount / 5) * 100)}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground">{Math.min(unlockedCount, 5)}/5</span>
                                </div>
                            </div>
                            {rewardStatus?.canClaimFiveReward && !rewardStatus.fiveAchievementRewardClaimed && (
                                <Button
                                    size="sm"
                                    className="flex-shrink-0 bg-primary hover:bg-primary/90"
                                    onClick={handleClaimFiveReward}
                                    disabled={isClaimingFive}
                                >
                                    {isClaimingFive ? <Loader2 className="w-4 h-4 animate-spin" /> : "Claim"}
                                </Button>
                            )}
                        </div>

                        {/* All Achievement Reward */}
                        <div className={`flex items-center gap-3 p-3 rounded-lg border ${rewardStatus?.allAchievementRewardClaimed ? 'bg-green-500/5 border-green-500/30' : rewardStatus?.canClaimAllReward ? 'bg-yellow-500/5 border-yellow-500/30' : 'bg-secondary/30 border-border'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${rewardStatus?.allAchievementRewardClaimed ? 'bg-green-500/20' : rewardStatus?.canClaimAllReward ? 'bg-yellow-500/20' : 'bg-muted'}`}>
                                {rewardStatus?.allAchievementRewardClaimed ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                    <Trophy className={`h-5 w-5 ${rewardStatus?.canClaimAllReward ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-medium text-sm truncate">All Achievements</span>
                                    <span className="font-bold text-primary text-sm">+100 Credits</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all ${rewardStatus?.allAchievementRewardClaimed ? 'bg-green-500' : 'bg-yellow-500'}`}
                                            style={{ width: `${Math.min(100, (unlockedCount / ACHIEVEMENTS.length) * 100)}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground">{unlockedCount}/{ACHIEVEMENTS.length}</span>
                                </div>
                            </div>
                            {rewardStatus?.canClaimAllReward && !rewardStatus.allAchievementRewardClaimed && (
                                <Button
                                    size="sm"
                                    className="flex-shrink-0 bg-amber-600 hover:bg-amber-700 text-white border-none"
                                    onClick={handleClaimAllReward}
                                    disabled={isClaimingAll}
                                >
                                    {isClaimingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : "Claim"}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AchievementsPage;