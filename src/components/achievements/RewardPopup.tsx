import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRewardStatus, useClaimReward } from "@/hooks/useAchievementRewards";
import { useAuth } from "@/hooks/useAuth";
import { Gift, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const RewardPopup: React.FC = () => {
    const { user } = useAuth();
    const { data: rewardStatus, isLoading, refetch } = useRewardStatus(user?.id);
    const claimReward = useClaimReward();

    const [activeReward, setActiveReward] = useState<'five' | 'all' | null>(null);
    const [isClaiming, setIsClaiming] = useState(false);
    const [claimedAmount, setClaimedAmount] = useState<number | null>(null);

    // Check for newly eligible rewards
    useEffect(() => {
        if (rewardStatus && !isLoading) {
            if (rewardStatus.canClaimAllReward && !rewardStatus.allAchievementRewardClaimed) {
                setActiveReward('all');
            } else if (rewardStatus.canClaimFiveReward && !rewardStatus.fiveAchievementRewardClaimed) {
                setActiveReward('five');
            }
        }
    }, [rewardStatus, isLoading]);

    // Refresh status on mount
    useEffect(() => {
        if (user?.id) refetch();
    }, [user?.id, refetch]);

    const handleClaimReward = async () => {
        if (!activeReward) return;
        setIsClaiming(true);
        try {
            const result = await claimReward.mutateAsync(activeReward);
            if (result.success && result.reward_amount) {
                setClaimedAmount(result.reward_amount);
                setActiveReward(null);
            }
        } finally {
            setIsClaiming(false);
        }
    };

    const rewardConfig = {
        five: {
            title: "5 Achievements Unlocked!",
            description: "You've reached a major milestone. Claim your reward!",
            amount: 20,
            icon: <Gift className="w-8 h-8 text-primary" />,
        },
        all: {
            title: "All Achievements Unlocked!",
            description: "You're a true Code Master! Here's your final reward.",
            amount: 100,
            icon: <Sparkles className="w-8 h-8 text-primary" />,
        }
    };

    return (
        <>
            {/* Success Animation */}
            <AnimatePresence>
                {claimedAmount && (
                    <Dialog open={true} onOpenChange={() => setClaimedAmount(null)}>
                        <DialogContent className="sm:max-w-[400px]">
                            <div className="flex flex-col items-center py-6 text-center">
                                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Rewards Added!</h2>
                                <p className="text-muted-foreground mb-6">
                                    <span className="text-primary font-bold">{claimedAmount} Credits</span> have been added to your balance.
                                </p>
                                <Button onClick={() => setClaimedAmount(null)} className="w-full">
                                    Awesome!
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </AnimatePresence>

            {/* Achievement Reward Modal */}
            <AnimatePresence>
                {activeReward && (
                    <Dialog open={true} onOpenChange={() => setActiveReward(null)}>
                        <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-border">
                            <div className="p-8 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-2xl border border-border bg-card flex items-center justify-center mb-6">
                                    {rewardConfig[activeReward].icon}
                                </div>

                                <DialogHeader className="space-y-2">
                                    <DialogTitle className="text-2xl font-bold text-center">
                                        {rewardConfig[activeReward].title}
                                    </DialogTitle>
                                    <p className="text-sm text-center text-muted-foreground px-4">
                                        {rewardConfig[activeReward].description}
                                    </p>
                                </DialogHeader>

                                <div className="mt-8 w-full space-y-4">
                                    <div className="bg-secondary rounded-xl p-4 border border-border">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Your Reward</p>
                                        <p className="text-3xl font-black text-primary">+{rewardConfig[activeReward].amount} Credits</p>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <Button variant="outline" onClick={() => setActiveReward(null)} disabled={isClaiming} className="flex-1">
                                            Later
                                        </Button>
                                        <Button
                                            onClick={handleClaimReward}
                                            disabled={isClaiming}
                                            className="flex-1"
                                        >
                                            {isClaiming ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Claim Now"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </AnimatePresence>
        </>
    );
};

export default RewardPopup;