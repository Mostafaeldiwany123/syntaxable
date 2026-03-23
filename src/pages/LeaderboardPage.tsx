import { useState, useMemo } from "react";
import { useLeaderboard, LeaderboardUser } from "@/hooks/leaderboard";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Search, Trophy, Flame, Target } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LeaderboardPage = () => {
    const { user } = useAuth();
    const { data: leaderboardUsers, isLoading } = useLeaderboard();
    const [sortBy, setSortBy] = useState('current_streak');
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

    const getPositionStyle = (position: number) => {
        switch (position) {
            case 1:
                return 'bg-yellow-500/10 border-yellow-500/30';
            case 2:
                return 'bg-slate-400/10 border-slate-400/30';
            case 3:
                return 'bg-amber-600/10 border-amber-600/30';
            default:
                return 'bg-card border-border';
        }
    };

    const getPositionIcon = (position: number) => {
        switch (position) {
            case 1:
                return <span className="text-lg">🥇</span>;
            case 2:
                return <span className="text-lg">🥈</span>;
            case 3:
                return <span className="text-lg">🥉</span>;
            default:
                return <span className="text-sm font-medium text-muted-foreground w-6 text-center">{position}</span>;
        }
    };

    return (
        <div className="min-h-full">
            {/* Header */}
            <div className="border-b border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Leaderboard</h1>
                            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                                See who's on fire with the longest coding streaks.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <div className="relative flex-grow sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search users..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="w-full sm:w-[180px]">
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sort by..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="current_streak">Current Streak</SelectItem>
                                        <SelectItem value="longest_streak">Longest Streak</SelectItem>
                                        <SelectItem value="problems_solved">Problems Solved</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
                {isLoading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredAndSortedUsers.map((leaderboardUser, index) => {
                            const position = index + 1;
                            const isCurrentUser = user?.id === leaderboardUser.id;

                            return (
                                <div
                                    key={leaderboardUser.id}
                                    className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${isCurrentUser
                                            ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20'
                                            : getPositionStyle(position)
                                        }`}
                                >
                                    {/* Position */}
                                    <div className="flex items-center justify-center w-8 shrink-0">
                                        {getPositionIcon(position)}
                                    </div>

                                    {/* Avatar */}
                                    <Avatar className="h-10 w-10 border border-border/50 shrink-0">
                                        <AvatarImage src={leaderboardUser.avatar_url || undefined} />
                                        <AvatarFallback className="text-sm font-medium">
                                            {leaderboardUser.username?.charAt(0).toUpperCase() || 'U'}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* User Info */}
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium truncate">
                                                {leaderboardUser.username}
                                            </span>
                                            {isCurrentUser && (
                                                <span className="text-[10px] font-medium px-1.5 py-0.5 bg-primary/20 text-primary rounded">
                                                    You
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            Best: {leaderboardUser.longest_streak || 0} days
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-6 shrink-0">
                                        {/* Current Streak */}
                                        <div className="text-center">
                                            <div className="flex items-center gap-1">
                                                <Flame className={`h-4 w-4 ${(leaderboardUser.current_streak || 0) > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
                                                <span className="font-semibold">{leaderboardUser.current_streak || 0}</span>
                                            </div>
                                            <div className="text-[10px] text-muted-foreground">Streak</div>
                                        </div>

                                        {/* Problems Solved */}
                                        <div className="text-center">
                                            <div className="flex items-center gap-1">
                                                <Target className="h-4 w-4 text-green-500" />
                                                <span className="font-semibold">{leaderboardUser.problems_solved || 0}</span>
                                            </div>
                                            <div className="text-[10px] text-muted-foreground">Solved</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredAndSortedUsers.length === 0 && (
                            <div className="text-center py-16 border border-dashed border-border rounded-lg">
                                <Trophy className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-1">No users found</h3>
                                <p className="text-sm text-muted-foreground">
                                    {searchTerm ? `No users match "${searchTerm}"` : "No users on the leaderboard yet."}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeaderboardPage;