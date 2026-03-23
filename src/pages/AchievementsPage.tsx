import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ACHIEVEMENTS } from "@/components/achievements/AchievementIcons";
import { useAchievementProgress } from "@/hooks/achievements";
import { useAuth } from "@/hooks/useAuth";

const AchievementsPage = () => {
    const { user } = useAuth();
    const { data: achievements, isLoading } = useAchievementProgress(user?.id);

    const unlockedCount = achievements?.filter(a => a.unlocked).length || 0;

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

                {/* Info Section */}
                <div className="mt-8 p-6 bg-secondary/30 rounded-lg border border-border/50">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-primary" />
                        About Achievements
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Achievements are earned by completing various activities on Syntaxable.
                        Complete practice problems, maintain coding streaks, and build projects to unlock badges.
                        Your achievements are displayed on your profile and community card for others to see.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AchievementsPage;