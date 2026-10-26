import { useState, useMemo } from "react";
import { useLeaderboard, LeaderboardUser } from "@/hooks/leaderboard";
import { useAuth } from "@/hooks/useAuth";
import { Search, Trophy, Flame, Target, Crown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

const listContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.03 },
    },
};

const listItemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 120, damping: 18 },
    },
};

const rankBadgeStyles: Record<number, string> = {
    1: "bg-primary text-primary-foreground",
    2: "bg-slate-300/50 text-slate-700 dark:bg-slate-500/25 dark:text-slate-200",
    3: "bg-amber-500/20 text-amber-700 dark:text-amber-400",
};

const formatName = (name?: string | null) => name?.trim() || "Anonymous";

const LeaderboardPage = () => {
    const { user } = useAuth();
    const { data: leaderboardUsers, isLoading } = useLeaderboard();
    const [sortBy, setSortBy] = useState("problems_solved");
    const [searchTerm, setSearchTerm] = useState("");

    const sortedUsers = useMemo(() => {
        if (!leaderboardUsers) return [];

        const sorted = [...leaderboardUsers];
        sorted.sort((a, b) => {
            if (sortBy === "current_streak") return (b.current_streak || 0) - (a.current_streak || 0);
            if (sortBy === "longest_streak") return (b.longest_streak || 0) - (a.longest_streak || 0);
            return (b.problems_solved || 0) - (a.problems_solved || 0);
        });
        return sorted;
    }, [leaderboardUsers, sortBy]);

    const filteredUsers = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return sortedUsers;
        return sortedUsers.filter(u => u.username?.toLowerCase().includes(term));
    }, [sortedUsers, searchTerm]);

    const currentUserRank = useMemo(() => {
        if (!user) return 0;
        return sortedUsers.findIndex(u => u.id === user.id) + 1;
    }, [sortedUsers, user]);

    const streakIsSort = sortBy !== "problems_solved";

    return (
        <div className="min-h-full flex flex-col">
            {/* Header */}
            <div className="border-b border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Leaderboard</h1>
                    <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                        See where you stand across problems solved and coding streaks.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 w-full flex-grow">
                {/* Toolbar */}
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-full items-center gap-2">
                        <div className="relative min-w-0 flex-1 sm:max-w-xs">
                            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search developers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-9 bg-secondary/30 pl-9 text-sm"
                            />
                        </div>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="h-9 w-[165px] shrink-0 bg-secondary/30 text-sm">
                                <SelectValue placeholder="Sort by..." />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border">
                                <SelectItem value="problems_solved">Problems Solved</SelectItem>
                                <SelectItem value="current_streak">Current Streak</SelectItem>
                                <SelectItem value="longest_streak">Longest Streak</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {!isLoading && currentUserRank > 0 && (
                        <div className="inline-flex shrink-0 items-center gap-1.5 self-start whitespace-nowrap rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs">
                            <span className="text-muted-foreground">Your rank</span>
                            <span className="font-semibold tabular-nums text-primary">#{currentUserRank}</span>
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <div className="animate-pulse">
                        <div className="overflow-hidden rounded-xl border border-border bg-card/40">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="h-[52px] border-b border-border/40 last:border-0" />
                            ))}
                        </div>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border/80 bg-card/10 py-14 text-center">
                        <Trophy className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
                        <h3 className="text-base font-medium text-foreground">No users found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {searchTerm.trim() ? `No users match "${searchTerm.trim()}"` : "No users on the leaderboard yet."}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-xl border border-border bg-card">
                        {/* Column labels */}
                        <div className="hidden items-center gap-3 border-b border-border bg-secondary/25 px-4 py-2 sm:flex">
                            <span className="w-8 shrink-0 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                #
                            </span>
                            <span className="flex-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Player
                            </span>
                            <div className="flex shrink-0 items-center gap-5">
                                <span className={`w-14 text-center text-[10px] font-semibold uppercase tracking-wider ${streakIsSort ? "text-foreground" : "text-muted-foreground"}`}>
                                    Streak
                                </span>
                                <span className={`w-14 text-center text-[10px] font-semibold uppercase tracking-wider ${streakIsSort ? "text-muted-foreground" : "text-foreground"}`}>
                                    Solved
                                </span>
                            </div>
                        </div>

                        <motion.div
                            variants={listContainerVariants}
                            initial="hidden"
                            animate="show"
                            className="divide-y divide-border/50"
                        >
                            {filteredUsers.map((leaderboardUser, index) => {
                                const position = index + 1;
                                const isCurrentUser = user?.id === leaderboardUser.id;
                                const streak = leaderboardUser.current_streak || 0;

                                return (
                                    <motion.div
                                        key={leaderboardUser.id}
                                        variants={listItemVariants}
                                        className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${isCurrentUser
                                            ? "bg-primary/5 shadow-[inset_2px_0_0_hsl(var(--primary))]"
                                            : "hover:bg-secondary/30"
                                            }`}
                                    >
                                        {/* Rank */}
                                        <div className="flex w-8 shrink-0 items-center justify-center">
                                            {position <= 3 ? (
                                                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${rankBadgeStyles[position]}`}>
                                                    {position}
                                                </span>
                                            ) : (
                                                <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                                                    {position}
                                                </span>
                                            )}
                                        </div>

                                        <Avatar className="h-8 w-8 shrink-0 border border-border/70">
                                            <AvatarImage src={leaderboardUser.avatar_url || undefined} />
                                            <AvatarFallback seed={leaderboardUser.username} className="text-xs font-semibold">
                                                {leaderboardUser.username?.charAt(0).toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1.5">
                                                <span className="truncate text-sm font-medium text-foreground" title={leaderboardUser.username || undefined}>
                                                    {formatName(leaderboardUser.username)}
                                                </span>
                                                {position === 1 && <Crown className="h-3.5 w-3.5 shrink-0 text-primary" />}
                                                {isCurrentUser && (
                                                    <span className="shrink-0 rounded border border-primary/30 bg-primary/15 px-1.5 py-px text-[9px] font-bold text-primary">
                                                        YOU
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-0.5 text-[11px] text-muted-foreground">
                                                Best: {leaderboardUser.longest_streak || 0}d
                                            </p>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex shrink-0 items-center gap-5 text-sm tabular-nums">
                                            <span className="flex w-14 items-center justify-center gap-1">
                                                <Flame className={`h-3.5 w-3.5 ${streak > 0 ? "text-orange-500" : "text-muted-foreground/50"}`} />
                                                <span className="font-semibold text-foreground/90">{streak}</span>
                                            </span>
                                            <span className="flex w-14 items-center justify-center gap-1">
                                                <Target className="h-3.5 w-3.5 text-emerald-500/80" />
                                                <span className="font-semibold text-foreground/90">{leaderboardUser.problems_solved || 0}</span>
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeaderboardPage;
