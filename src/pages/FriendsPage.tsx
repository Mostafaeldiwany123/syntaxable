import { useFriends } from "@/hooks/friends";
import { Users, UserPlus, UserCheck, Search, Clock } from "lucide-react";
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
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Friends</h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Manage your connections and pending requests.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-grow sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search friends..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link to="/community">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Find Friends
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-8">
        {/* Pending Requests */}
        <PendingRequests />

        {/* Friends List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">
                All Friends
                {friends && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
                  </span>
                )}
              </h2>
            </div>
          </div>

          {filteredFriends && filteredFriends.length > 0 ? (
            <div className="grid gap-3">
              {filteredFriends.map((friend) => (
                <FriendListItem key={friend.id} friend={friend} />
              ))}
            </div>
          ) : friends && friends.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-lg">
              <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-1">No friends yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start connecting with people from the community.
              </p>
              <Button asChild>
                <Link to="/community">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Find Friends
                </Link>
              </Button>
            </div>
          ) : searchTerm && filteredFriends?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No friends match "{searchTerm}"</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;