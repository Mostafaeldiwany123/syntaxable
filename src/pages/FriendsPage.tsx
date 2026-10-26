import { useFriends } from "@/hooks/friends";
import { Users, UserPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FriendListItem } from "@/components/friends/FriendCard";
import { PendingRequests } from "@/components/friends/PendingRequests";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const FriendsPage = () => {
  const { data: friends, isLoading } = useFriends();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFriends = friends?.filter(friend =>
    friend.username.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Friends</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Manage your connections and pending requests.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 w-full flex-grow">
        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 bg-secondary/30 pl-9 text-sm"
            />
          </div>
          <Button asChild className="h-9 w-full sm:w-auto">
            <Link to="/community">
              <UserPlus className="mr-2 h-4 w-4" />
              Find Friends
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          <PendingRequests />

          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border bg-secondary/25 px-4 py-2">
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  All Friends
                </span>
              </div>
              {friends && (
                <span className="text-[11px] tabular-nums text-muted-foreground">
                  {friends.length} {friends.length === 1 ? "friend" : "friends"}
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="animate-pulse">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-[52px] border-b border-border/40 last:border-0" />
                ))}
              </div>
            ) : filteredFriends && filteredFriends.length > 0 ? (
              <div className="divide-y divide-border/50">
                {filteredFriends.map((friend) => (
                  <FriendListItem key={friend.id} friend={friend} />
                ))}
              </div>
            ) : searchTerm.trim() ? (
              <div className="px-4 py-12 text-center text-sm text-muted-foreground">
                No friends match "{searchTerm.trim()}"
              </div>
            ) : (
              <div className="py-14 text-center">
                <Users className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
                <h3 className="text-base font-medium text-foreground">No friends yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Start connecting with people from the community.
                </p>
                <Button asChild className="mt-4">
                  <Link to="/community">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Find Friends
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
