import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const fetchRoomPermission = async (roomId: string) => {
  const { data, error } = await supabase.rpc('ensure_user_permission', { p_room_id: roomId });
  if (error) {
    console.error("Error fetching room permission:", error);
    throw error;
  }
  return data?.[0]?.level as 'editor' | 'viewer' | undefined;
};

export const useRoomPermission = (roomId: string | undefined) => {
  return useQuery({
    queryKey: ['roomPermission', roomId],
    queryFn: () => fetchRoomPermission(roomId!),
    enabled: !!roomId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};