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

    const getPositionStyle = (position: number) => {
        switch (position) {
            case 1:
                return 'bg-primary/10 border-primary/40 hover:border-primary/60 shadow-[0_0_15px_hsl(var(--primary)/0.1)]';
            case 2:
                return 'bg-primary/5 border-primary/25 hover:border-primary/40';
            case 3:
                return 'bg-primary/5 border-primary/10 hover:border-primary/25';
            default:
                return 'bg-card/40 border-border/80 hover:border-border';
        }
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
                            <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end pt-10 pb-6 max-w-3xl mx-auto relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

                                {/* 2nd Place */}
                                <motion.div
                                    custom={0.2}
                                    variants={podiumVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="flex flex-col items-center group"
                                >
                                    <div className="relative mb-3 flex flex-col items-center">
                                        <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-primary/60 ring-4 ring-primary/10 group-hover:scale-105 transition-transform duration-300">
                                            <AvatarImage src={topThree[1].avatar_url || undefined} />
                                            <AvatarFallback seed={topThree[1].username} className="text-sm font-semibold">
                                                {topThree[1].username?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 bg-primary/80 text-primary-foreground text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-md">
                                            #2
                                        </div>
                                    </div>

                                    <div className="text-center w-full px-1 mb-2">
                                        <div className="font-semibold text-sm truncate max-w-[90px] sm:max-w-[130px] text-foreground/90 flex items-center justify-center gap-1 mx-auto">
                                            {topThree[1].username}
                                        </div>
                                    </div>

                                    {/* Pedestal */}
                                    <div className="w-full h-32 sm:h-36 bg-gradient-to-b from-primary/10 to-card/25 border border-primary/20 rounded-t-2xl flex flex-col items-center justify-between p-3 sm:p-4 shadow-[0_4px_20px_hsl(var(--primary)/0.15)] gap-2">
                                        <span className="text-3xl sm:text-4xl font-extrabold text-primary/20 select-none leading-none">2</span>
                                        <div className="text-center">
                                            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                                <Target className="h-3.5 w-3.5 text-primary/80" />
                                                <span className="font-bold text-foreground">{topThree[1].problems_solved} Solved</span>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground/70 text-center line-clamp-2 px-0.5 italic w-full">
                                            {topThree[1].description ? `"${topThree[1].description}"` : "No bio yet"}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* 1st Place */}
                                <motion.div
                                    custom={0}
                                    variants={podiumVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="flex flex-col items-center group relative z-10"
                                >
                                    <div className="relative mb-3 flex flex-col items-center">
                                        <div className="absolute -top-6 animate-bounce">
                                            <Crown className="h-6 w-6 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
                                        </div>
                                        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-primary ring-4 ring-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.15)] group-hover:scale-105 transition-transform duration-300">
                                            <AvatarImage src={topThree[0].avatar_url || undefined} />
                                            <AvatarFallback seed={topThree[0].username} className="text-base font-semibold">
                                                {topThree[0].username?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 bg-primary text-primary-foreground text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                                            #1
                                        </div>
                                    </div>

                                    <div className="text-center w-full px-1 mb-2">
                                        <div className="font-bold text-sm sm:text-base truncate max-w-[100px] sm:max-w-[150px] text-foreground flex items-center justify-center gap-1 mx-auto">
                                            {topThree[0].username}
                                        </div>
                                    </div>

                                    {/* Pedestal */}
                                    <div className="w-full h-40 sm:h-44 bg-gradient-to-b from-primary/20 to-card/25 border-2 border-primary/40 rounded-t-2xl flex flex-col items-center justify-between p-3 sm:p-4 shadow-[0_4px_30px_hsl(var(--primary)/0.05)] gap-2">
                                        <span className="text-4xl sm:text-5xl font-extrabold text-primary/30 select-none leading-none">1</span>
                                        <div className="text-center">
                                            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                                <Target className="h-3.5 w-3.5 text-primary" />
                                                <span className="font-bold text-foreground">{topThree[0].problems_solved} Solved</span>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground/75 text-center line-clamp-2 px-0.5 italic w-full">
                                            {topThree[0].description ? `"${topThree[0].description}"` : "No bio yet"}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* 3rd Place */}
                                <motion.div
                                    custom={0.4}
                                    variants={podiumVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="flex flex-col items-center group"
                                >
                                    <div className="relative mb-3 flex flex-col items-center">
                                        <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-primary/30 ring-4 ring-primary/5 group-hover:scale-105 transition-transform duration-300">
                                            <AvatarImage src={topThree[2].avatar_url || undefined} />
                                            <AvatarFallback seed={topThree[2].username} className="text-xs font-semibold">
                                                {topThree[2].username?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 bg-primary/60 text-primary-foreground text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-md">
                                            #3
                                        </div>
                                    </div>

                                    <div className="text-center w-full px-1 mb-2">
                                        <div className="font-semibold text-sm truncate max-w-[90px] sm:max-w-[130px] text-foreground/90 flex items-center justify-center gap-1 mx-auto">
                                            {topThree[2].username}
                                        </div>
                                    </div>

                                    {/* Pedestal */}
                                    <div className="w-full h-26 sm:h-30 bg-gradient-to-b from-primary/5 to-card/25 border border-primary/10 rounded-t-2xl flex flex-col items-center justify-between p-3 sm:p-4 shadow-[0_4px_15px_hsl(var(--primary)/0.1)] gap-2">
                                        <span className="text-2xl sm:text-3xl font-extrabold text-primary/10 select-none leading-none">3</span>
                                        <div className="text-center">
                                            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                                <Target className="h-3.5 w-3.5 text-primary/60" />
                                                <span className="font-bold text-foreground">{topThree[2].problems_solved} Solved</span>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground/70 text-center line-clamp-2 px-0.5 italic w-full">
                                            {topThree[2].description ? `"${topThree[2].description}"` : "No bio yet"}
                                        </p>
                                    </div>
                                </motion.div>
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
                                            ? 'bg-primary/5 border-primary/40 ring-1 ring-primary/10 shadow-[0_0_15px_rgba(59,130,246,0.04)]'
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