import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./useAuth";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface PresenceContextType {
  onlineUsers: string[]; // Array of user IDs
}

const PresenceContext = createContext<PresenceContextType | undefined>(undefined);

export const PresenceProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (user && !channelRef.current) {
      const newChannel = supabase.channel('global-presence', {
        config: {
          presence: {
            key: user.id,
          },
        },
      });
      channelRef.current = newChannel;

      newChannel.on('presence', { event: 'sync' }, () => {
        const presenceState = newChannel.presenceState();
        const userIds = Object.keys(presenceState);
        setOnlineUsers(userIds);
      });

      newChannel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await newChannel.track({ online_at: new Date().toISOString() });
        }
      });
    } else if (!user && channelRef.current) {
      channelRef.current.unsubscribe();
      channelRef.current = null;
      setOnlineUsers([]);
    }

    // Cleanup function for when the provider unmounts
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, [user]); // The effect now only depends on the user's auth state

  return (
    <PresenceContext.Provider value={{ onlineUsers }}>
      {children}
    </PresenceContext.Provider>
  );
};

export const usePresence = () => {
  const context = useContext(PresenceContext);
  if (context === undefined) {
    throw new Error("usePresence must be used within a PresenceProvider");
  }
  return context;
};