import { useState, useMemo } from "react";
import { useLeaderboard, LeaderboardUser } from "@/hooks/leaderboard";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Search, Trophy, Flame, Target, Crown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";




const LeaderboardPage = () => {
    const { user } = useAuth();
    const { data: leaderboardUsers, isLoading } = useLeaderboard();
    const [sortBy, setSortBy] = useState('problems_solved');
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAndSortedUsers = useMemo(() => {
        if (!leaderboardUsers) return [];

        const filtered = leaderboardUsers.filter(user =>
            user.username?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sorted = [...filtered];
        if (sortBy === 'current_streak') {
            sorted.sort((a, b) => (b.current_streak || 0) - (a.current_streak || 0));
        } else if (sortBy === 'longest_streak') {
            sorted.sort((a, b) => (b.longest_streak || 0) - (a.longest_streak || 0));
        } else if (sortBy === 'problems_solved') {
            sorted.sort((a, b) => (b.problems_solved || 0) - (a.problems_solved || 0));
        }
        return sorted;
    }, [leaderboardUsers, sortBy, searchTerm]);

    const topThree = useMemo(() => {
        if (searchTerm !== "" || filteredAndSortedUsers.length < 3) return [];
        return filteredAndSortedUsers.slice(0, 3);
    }, [filteredAndSortedUsers, searchTerm]);

    const remainingUsers = useMemo(() => {
        if (searchTerm !== "" || filteredAndSortedUsers.length < 3) return filteredAndSortedUsers;
        return filteredAndSortedUsers.slice(3);
    }, [filteredAndSortedUsers, searchTerm]);

    const currentUserIndex = useMemo(() => {
        if (!leaderboardUsers || !user) return -1;
        // Search in the sorted list to find the actual current rank for the selected sort criteria
        const allSorted = [...leaderboardUsers];
        if (sortBy === 'current_streak') {
            allSorted.sort((a, b) => (b.current_streak || 0) - (a.current_streak || 0));
        } else if (sortBy === 'longest_streak') {
            allSorted.sort((a, b) => (b.longest_streak || 0) - (a.longest_streak || 0));
        } else if (sortBy === 'problems_solved') {
            allSorted.sort((a, b) => (b.problems_solved || 0) - (a.problems_solved || 0));
        }
        return allSorted.findIndex(u => u.id === user.id);
    }, [leaderboardUsers, user, sortBy]);

    const currentUserRank = currentUserIndex + 1;
    const currentUserData = currentUserIndex !== -1 && leaderboardUsers ? [...leaderboardUsers].sort((a, b) => {
        if (sortBy === 'current_streak') return (b.current_streak || 0) - (a.current_streak || 0);
        if (sortBy === 'longest_streak') return (b.longest_streak || 0) - (a.longest_streak || 0);
        return (b.problems_solved || 0) - (a.problems_solved || 0);
    })[currentUserIndex] : null;

    const userAbove = useMemo(() => {
        if (currentUserIndex <= 0 || !leaderboardUsers) return null;
        const sortedList = [...leaderboardUsers].sort((a, b) => {
            if (sortBy === 'current_streak') return (b.current_streak || 0) - (a.current_streak || 0);
            if (sortBy === 'longest_streak') return (b.longest_streak || 0) - (a.longest_streak || 0);
            return (b.problems_solved || 0) - (a.problems_solved || 0);
        });
        return sortedList[currentUserIndex - 1];
    }, [leaderboardUsers, currentUserIndex, sortBy]);

    const metricDiff = useMemo(() => {
        if (!currentUserData || !userAbove) return 0;
        if (sortBy === 'problems_solved') {
            return (userAbove.problems_solved || 0) - (currentUserData.problems_solved || 0) + 1;
        } else if (sortBy === 'current_streak') {
            return (userAbove.current_streak || 0) - (currentUserData.current_streak || 0) + 1;
        } else {
            return (userAbove.longest_streak || 0) - (currentUserData.longest_streak || 0) + 1;
        }
    }, [currentUserData, userAbove, sortBy]);

    const getMetricLabel = () => {
        if (sortBy === 'problems_solved') return "problems";
        if (sortBy === 'current_streak') return "streak days";
        return "longest streak days";
    };

    const getPositionIcon = (position: number) => {
        switch (position) {
            case 1:
                return <span className="text-xl">🥇</span>;
            case 2:
                return <span className="text-xl">🥈</span>;
            case 3:
                return <span className="text-xl">🥉</span>;
            default:
                return <span className="text-sm font-semibold text-muted-foreground w-6 text-center">#{position}</span>;
        }
    };

    const getMetricIcon = (iconColor?: string) => {
        if (sortBy === 'current_streak' || sortBy === 'longest_streak') {
            return <Flame className={`h-3 w-3 ${iconColor || 'text-orange-500'}`} />;
        }
        return <Target className={`h-3 w-3 ${iconColor || 'text-emerald-500'}`} />;
    };

    const getMetricValue = (u: LeaderboardUser) => {
        if (sortBy === 'current_streak') return `${u.current_streak || 0}d streak`;
        if (sortBy === 'longest_streak') return `${u.longest_streak || 0}d best`;
        return `${u.problems_solved || 0} solved`;
    };

    const getPositionStyle = (position: number) => {
        switch (position) {
            case 1:
                return 'bg-primary/5 border-primary/30 hover:border-primary/50';
            case 2:
                return 'bg-secondary/40 border-border hover:border-border/80';
            case 3:
                return 'bg-secondary/20 border-border/80 hover:border-border';
            default:
                return 'bg-card/40 border-border/80 hover:border-border';
        }
    };

    // Format username on podium to show only the first 2 words
    const formatPodiumName = (name?: string | null): string => {
        if (!name) return 'Anonymous';
        const words = name.trim().split(/\s+/);
        if (words.length <= 2) return name;
        return `${words[0]} ${words[1]}`;
    };

    // Stagger animation settings
    const podiumVariants = {
        hidden: { opacity: 0, y: 30 },
        show: (customDelay: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15,
                delay: customDelay
            }
        })
    };

    const listContainerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const listItemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <div className="min-h-full flex flex-col relative">
            {/* Header */}
            <div className="border-b border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Leaderboard</h1>
                            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                                Climb the ranks, master syntax, and conquer the coding challenges.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                            <div className="relative flex-grow sm:w-64">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search developers..."
                                    className="pl-10 bg-card/30 border-border/80 hover:border-border/100 focus:border-primary/50 transition-colors"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="w-full sm:w-[200px]">
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="bg-card/30 border-border/80 hover:border-border/100 transition-colors">
                                        <SelectValue placeholder="Sort by..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border-border">
                                        <SelectItem value="problems_solved">Problems Solved</SelectItem>
                                        <SelectItem value="current_streak">Current Streak</SelectItem>
                                        <SelectItem value="longest_streak">Longest Streak</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 w-full flex-grow">
                {isLoading ? (
                    /* Elegant Skeleton Loader */
                    <div className="space-y-8 animate-pulse">
                        {searchTerm === "" && (
                            <div className="grid grid-cols-3 gap-4 sm:gap-6 items-end pt-12 pb-6 max-w-3xl mx-auto">
                                <div className="h-32 bg-card/40 border border-border rounded-xl flex flex-col justify-end p-4 space-y-2">
                                    <div className="h-10 w-10 bg-muted/40 rounded-full mx-auto" />
                                    <div className="h-4 w-12 bg-muted/40 rounded mx-auto" />
                                    <div className="h-6 bg-muted/40 rounded w-16 mx-auto" />
                                </div>
                                <div className="h-40 bg-card/60 border border-border rounded-xl flex flex-col justify-end p-4 space-y-2">
                                    <div className="h-12 w-12 bg-muted/45 rounded-full mx-auto" />
                                    <div className="h-4 w-14 bg-muted/45 rounded mx-auto" />
                                    <div className="h-6 bg-muted/45 rounded w-18 mx-auto" />
                                </div>
                                <div className="h-24 bg-card/40 border border-border rounded-xl flex flex-col justify-end p-4 space-y-2">
                                    <div className="h-8 w-8 bg-muted/40 rounded-full mx-auto" />
                                    <div className="h-4 w-10 bg-muted/40 rounded mx-auto" />
                                    <div className="h-6 bg-muted/40 rounded w-14 mx-auto" />
                                </div>
                            </div>
                        )}
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-16 bg-card/20 border border-border/60 rounded-xl" />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Podium Section for Top 3 (Only shown when not searching and top 3 exist) */}
                        {topThree.length === 3 && (
                            <div className="pt-4 pb-2 max-w-xl mx-auto">
                                <div className="grid grid-cols-3 gap-2.5 sm:gap-4 items-end">
                                    {/* 2nd Place - Runner up */}
                                    <motion.div
                                        custom={0.2}
                                        variants={podiumVariants}
                                        initial="hidden"
                                        animate="show"
                                        className="flex flex-col items-center"
                                    >
                                        <div className="relative mb-2 flex flex-col items-center">
                                            <div className="h-4 sm:h-5 mb-1" />
                                            <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-border/80 bg-card shadow-sm">
                                                <AvatarImage src={topThree[1].avatar_url || undefined} />
                                                <AvatarFallback seed={topThree[1].username} className="text-xs font-semibold">
                                                    {topThree[1].username?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>

                                        <div className="text-center w-full px-1 mb-1 mt-0.5">
                                            <div
                                                title={topThree[1].username || undefined}
                                                className="font-semibold text-xs sm:text-sm truncate max-w-[90px] sm:max-w-[120px] text-foreground/90 mx-auto"
                                            >
                                                {formatPodiumName(topThree[1].username)}
                                            </div>
                                        </div>

                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary border border-border/70 text-[10px] font-medium text-muted-foreground mb-2">
                                            {getMetricIcon("text-muted-foreground")}
                                            <span className="font-semibold text-foreground/90">{getMetricValue(topThree[1])}</span>
                                        </div>

                                        {/* Pedestal */}
                                        <div className="w-full h-24 sm:h-28 bg-card/60 border border-border/70 border-t-2 border-t-muted-foreground/40 rounded-t-xl flex flex-col items-center justify-center p-2 text-center">
                                            <div className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground font-bold text-xs mb-0.5">
                                                2
                                            </div>
                                            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                                                2nd
                                            </span>
                                            <p className="text-[10px] text-muted-foreground/70 text-center line-clamp-1 sm:line-clamp-2 px-1 italic mt-1 w-full max-w-[120px] select-none">
                                                {topThree[1].description ? `"${topThree[1].description}"` : "No bio yet"}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* 1st Place - Champion */}
                                    <motion.div
                                        custom={0}
                                        variants={podiumVariants}
                                        initial="hidden"
                                        animate="show"
                                        className="flex flex-col items-center relative z-10"
                                    >
                                        <div className="relative mb-2 flex flex-col items-center">
                                            <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-primary fill-primary mb-1" />
                                            <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-primary ring-2 ring-primary/20 bg-card shadow-sm">
                                                <AvatarImage src={topThree[0].avatar_url || undefined} />
                                                <AvatarFallback seed={topThree[0].username} className="text-sm font-semibold">
                                                    {topThree[0].username?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>

                                        <div className="text-center w-full px-1 mb-1 mt-0.5">
                                            <div
                                                title={topThree[0].username || undefined}
                                                className="font-bold text-xs sm:text-sm truncate max-w-[100px] sm:max-w-[140px] text-foreground mx-auto"
                                            >
                                                {formatPodiumName(topThree[0].username)}
                                            </div>
                                        </div>

                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/25 text-[10px] font-medium text-primary mb-2">
                                            {getMetricIcon("text-primary")}
                                            <span className="font-semibold text-foreground">{getMetricValue(topThree[0])}</span>
                                        </div>

                                        {/* Pedestal */}
                                        <div className="w-full h-32 sm:h-36 bg-card border border-primary/30 border-t-2 border-t-primary rounded-t-xl flex flex-col items-center justify-center p-2 text-center">
                                            <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-extrabold text-sm mb-0.5">
                                                1
                                            </div>
                                            <span className="text-[10px] sm:text-[11px] font-semibold text-primary uppercase tracking-wider">
                                                Winner
                                            </span>
                                            <p className="text-[10px] text-muted-foreground/70 text-center line-clamp-1 sm:line-clamp-2 px-1 italic mt-1 w-full max-w-[130px] select-none">
                                                {topThree[0].description ? `"${topThree[0].description}"` : "No bio yet"}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* 3rd Place - Third */}
                                    <motion.div
                                        custom={0.4}
                                        variants={podiumVariants}
                                        initial="hidden"
                                        animate="show"
                                        className="flex flex-col items-center"
                                    >
                                        <div className="relative mb-2 flex flex-col items-center">
                                            <div className="h-4 sm:h-5 mb-1" />
                                            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-border/60 bg-card shadow-sm">
                                                <AvatarImage src={topThree[2].avatar_url || undefined} />
                                                <AvatarFallback seed={topThree[2].username} className="text-xs font-semibold">
                                                    {topThree[2].username?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>

                                        <div className="text-center w-full px-1 mb-1 mt-0.5">
                                            <div
                                                title={topThree[2].username || undefined}
                                                className="font-semibold text-xs sm:text-sm truncate max-w-[90px] sm:max-w-[120px] text-foreground/90 mx-auto"
                                            >
                                                {formatPodiumName(topThree[2].username)}
                                            </div>
                                        </div>

                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/60 border border-border/50 text-[10px] font-medium text-muted-foreground mb-2">
                                            {getMetricIcon("text-muted-foreground")}
                                            <span className="font-semibold text-foreground/80">{getMetricValue(topThree[2])}</span>
                                        </div>

                                        {/* Pedestal */}
                                        <div className="w-full h-20 sm:h-24 bg-card/40 border border-border/60 border-t-2 border-t-border rounded-t-xl flex flex-col items-center justify-center p-2 text-center">
                                            <div className="w-6 h-6 rounded-full bg-secondary/50 border border-border/70 flex items-center justify-center text-muted-foreground/80 font-bold text-xs mb-0.5">
                                                3
                                            </div>
                                            <span className="text-[9px] sm:text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                                                3rd
                                            </span>
                                            <p className="text-[10px] text-muted-foreground/70 text-center line-clamp-1 sm:line-clamp-2 px-1 italic mt-1 w-full max-w-[120px] select-none">
                                                {topThree[2].description ? `"${topThree[2].description}"` : "No bio yet"}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                                {/* Shared Grounded Base */}
                                <div className="w-full h-1 bg-border/60 rounded-full" />
                            </div>
                        )}

                        {/* List Section */}
                        <motion.div
                            variants={listContainerVariants}
                            initial="hidden"
                            animate="show"
                            className="space-y-2.5"
                        >
                            {remainingUsers.map((leaderboardUser, index) => {
                                // If podium is active, ranks are shifted by 3. Otherwise standard index + 1
                                const position = topThree.length === 3 ? index + 4 : index + 1;
                                const isCurrentUser = user?.id === leaderboardUser.id;

                                return (
                                    <motion.div
                                        key={leaderboardUser.id}
                                        variants={listItemVariants}
                                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group ${isCurrentUser
                                            ? 'bg-primary/5 border-primary/40 ring-1 ring-primary/10 shadow-[0_0_15px_hsl(var(--primary)/0.06)]'
                                            : getPositionStyle(position)
                                            }`}
                                    >
                                        {/* Rank Position */}
                                        <div className="flex items-center justify-center w-8 shrink-0">
                                            {getPositionIcon(position)}
                                        </div>

                                        {/* Avatar with fallback */}
                                        <Avatar className="h-10 w-10 border border-border/80 shrink-0 group-hover:scale-105 transition-transform duration-300">
                                            <AvatarImage src={leaderboardUser.avatar_url || undefined} />
                                            <AvatarFallback seed={leaderboardUser.username} className="text-sm font-semibold">
                                                {leaderboardUser.username?.charAt(0).toUpperCase() || 'U'}
                                            </AvatarFallback>
                                        </Avatar>

                                        {/* User profile & dynamic badges */}
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-semibold text-foreground/90 truncate text-sm sm:text-base">
                                                    {leaderboardUser.username}
                                                </span>
                                                {isCurrentUser && (
                                                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded shrink-0">
                                                        YOU
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] text-muted-foreground">
                                                    Best: {leaderboardUser.longest_streak || 0}d
                                                </span>
                                            </div>
                                        </div>

                                        {/* User statistics columns */}
                                        <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                                            {/* Streak */}
                                            <div className="text-right sm:text-center w-14 sm:w-16">
                                                <div className="flex items-center justify-end sm:justify-center gap-1">
                                                    <Flame className={`h-4 w-4 ${(leaderboardUser.current_streak || 0) > 0 ? 'text-orange-500 animate-pulse' : 'text-muted-foreground'}`} />
                                                    <span className="font-bold text-sm sm:text-base text-foreground/90">{leaderboardUser.current_streak || 0}</span>
                                                </div>
                                                <div className="text-[10px] text-muted-foreground">Streak</div>
                                            </div>

                                            {/* Solved */}
                                            <div className="text-right sm:text-center w-14 sm:w-16">
                                                <div className="flex items-center justify-end sm:justify-center gap-1">
                                                    <Target className="h-4 w-4 text-emerald-500" />
                                                    <span className="font-bold text-sm sm:text-base text-foreground/90">{leaderboardUser.problems_solved || 0}</span>
                                                </div>
                                                <div className="text-[10px] text-muted-foreground">Solved</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {filteredAndSortedUsers.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-16 border border-dashed border-border/80 rounded-2xl bg-card/10 backdrop-blur-sm"
                                >
                                    <Trophy className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-foreground mb-1">No users found</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {searchTerm ? `No users match "${searchTerm}"` : "No users on the leaderboard yet."}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default LeaderboardPage;