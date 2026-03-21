import { useState, useMemo } from "react";
import { useCommunityUsers } from "@/hooks/friends";
import { Loader2, Search } from "lucide-react";
import { UserCard } from "@/components/community/UserCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const CommunityPage = () => {
  const { data: users, isLoading } = useCommunityUsers();
  const [sortBy, setSortBy] = useState('friend_count');
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return [];
    
    const filtered = users.filter(user => 
        user.friendship_status !== 'is_self' &&
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filtered];
    if (sortBy === 'username') {
      sorted.sort((a, b) => a.username.localeCompare(b.username));
    } else if (sortBy === 'friend_count') {
      sorted.sort((a, b) => b.friend_count - a.friend_count);
    }
    return sorted;
  }, [users, sortBy, searchTerm]);

  return (
    <div className="min-h-full">
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Community</h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">Connect with other users on the platform.</p>
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
                  <SelectItem value="friend_count">Most Friends</SelectItem>
                  <SelectItem value="username">Alphabetical (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedUsers?.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;