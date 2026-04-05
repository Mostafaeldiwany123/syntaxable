import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface CustomSet {
  id: string;
  title: string;
  description: string | null;
  language: 'cpp' | 'csharp' | 'python' | 'java' | 'javascript' | 'typescript';
  owner_id: string;
  owner_username: string | null;
  owner_avatar_url: string | null;
  created_at: string;
  problem_count: number;
  completed_count: number;
  is_owner: boolean;
  is_public: boolean;
}

export interface PublicCustomSet {
  id: string;
  title: string;
  description: string | null;
  language: 'cpp' | 'csharp' | 'python' | 'java' | 'javascript' | 'typescript';
  owner_id: string;
  owner_username: string | null;
  owner_avatar_url: string | null;
  created_at: string;
  problem_count: number;
}

export interface CustomSetProblem {
  id: string;
  problem_data: {
    id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    description: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    sampleInput: string;
    sampleOutput: string;
    explanation?: string;
    testCases: Array<{
      input: string;
      expectedOutput: string;
      isHidden?: boolean;
    }>;
    starterCode: string;
    hints?: string[];
    topics?: string[];
  };
  order_index: number;
  completed: boolean;
  solution_code?: string | null;
}

export interface CustomSetDetail {
  id: string;
  title: string;
  description: string | null;
  language: 'cpp' | 'csharp' | 'python' | 'java' | 'javascript' | 'typescript';
  owner_id: string;
  owner_username: string | null;
  owner_avatar_url: string | null;
  created_at: string;
  is_owner: boolean;
  is_public: boolean;
  ai_enabled: boolean;
}

// Fetch all custom sets for the current user
export const useCustomSets = () => {
  return useQuery<CustomSet[], Error>({
    queryKey: ['customSets'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_user_custom_sets');
      if (error) throw error;
      return data || [];
    },
  });
};

// Fetch public custom sets
export const usePublicCustomSets = () => {
  return useQuery<PublicCustomSet[], Error>({
    queryKey: ['publicCustomSets'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_public_custom_sets');
      if (error) throw error;
      return data || [];
    },
  });
};

// Fetch a single custom set
export const useCustomSet = (setId: string | undefined) => {
  return useQuery<CustomSetDetail | null, Error>({
    queryKey: ['customSet', setId],
    queryFn: async () => {
      if (!setId) return null;
      const { data, error } = await supabase.rpc('get_custom_set', { p_set_id: setId });
      if (error) throw error;
      return data?.[0] || null;
    },
    enabled: !!setId,
  });
};

// Find custom set by short code (last 8 characters)
export const useCustomSetByShortCode = (shortCode: string | undefined) => {
  return useQuery<{ id: string } | null, Error>({
    queryKey: ['customSetByShortCode', shortCode],
    queryFn: async () => {
      if (!shortCode || shortCode.length !== 8) return null;
      const { data, error } = await supabase.rpc('get_custom_set_by_short_code', { p_short_code: shortCode.toLowerCase() });
      if (error) throw error;
      return data?.[0] || null;
    },
    enabled: !!shortCode && shortCode.length === 8,
  });
};

// Fetch problems for a custom set
export const useCustomSetProblems = (setId: string | undefined) => {
  return useQuery<CustomSetProblem[], Error>({
    queryKey: ['customSetProblems', setId],
    queryFn: async () => {
      if (!setId) return [];
      const { data, error } = await supabase.rpc('get_custom_set_problems', { p_set_id: setId });
      if (error) throw error;
      return data || [];
    },
    enabled: !!setId,
  });
};

// Create a new custom set
export const useCreateCustomSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      description,
      language,
      problems,
      isPublic = false,
      aiEnabled = true,
    }: {
      title: string;
      description: string;
      language: 'cpp' | 'csharp' | 'python' | 'java' | 'javascript' | 'typescript';
      problems: Array<{
        title: string;
        difficulty: 'easy' | 'medium' | 'hard';
        description: string;
        inputFormat: string;
        outputFormat: string;
        constraints: string;
        sampleInput: string;
        sampleOutput: string;
        explanation?: string;
        testCases: Array<{ input: string; expectedOutput: string; isHidden?: boolean }>;
        starterCode: string;
        hints?: string[];
        topics?: string[];
      }>;
      isPublic?: boolean;
      aiEnabled?: boolean;
    }) => {
      // Generate IDs for problems
      const problemsWithIds = problems.map((p, index) => ({
        ...p,
        id: `custom-${Date.now()}-${index}`,
      }));

      const { data, error } = await supabase.rpc('create_custom_set', {
        p_title: title,
        p_description: description,
        p_language: language,
        p_problems: problemsWithIds,
      });

      if (error) throw error;

      // Update is_public and ai_enabled if needed
      if (data) {
        const updates: { is_public?: boolean; ai_enabled?: boolean } = {};
        if (isPublic) updates.is_public = true;
        if (!aiEnabled) updates.ai_enabled = false;

        if (Object.keys(updates).length > 0) {
          await supabase
            .from('custom_sets')
            .update(updates)
            .eq('id', data);
        }
      }

      return data;
    },
    onSuccess: () => {
      toast.success('Custom set created successfully!');
      queryClient.invalidateQueries({ queryKey: ['customSets'] });
      queryClient.invalidateQueries({ queryKey: ['publicCustomSets'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create custom set');
    },
  });
};

// Mark a problem as completed
export const useMarkProblemComplete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ setId, problemId, solutionCode, language }: { setId: string; problemId: string; solutionCode?: string; language?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Direct client-side upsert instead of RPC
      const { error } = await supabase
        .from('custom_set_progress')
        .upsert({
          user_id: user.id,
          set_id: setId,
          problem_id: problemId,
          solution_code: solutionCode || null,
          language: language || null,
        }, {
          onConflict: 'user_id,set_id,problem_id'
        });

      if (error) throw error;
    },
    onSuccess: (_, { setId }) => {
      queryClient.invalidateQueries({ queryKey: ['customSetProblems', setId] });
      queryClient.invalidateQueries({ queryKey: ['customSets'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to mark as complete');
    },
  });
};

// Delete a custom set
export const useDeleteCustomSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (setId: string) => {
      const { error } = await supabase.from('custom_sets').delete().eq('id', setId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Custom set deleted');
      queryClient.invalidateQueries({ queryKey: ['customSets'] });
      queryClient.invalidateQueries({ queryKey: ['publicCustomSets'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete custom set');
    },
  });
};

// Share custom set with users
export const useShareCustomSet = () => {
  return useMutation({
    mutationFn: async ({ setId, userIds }: { setId: string; userIds: string[] }) => {
      const participants = userIds.map(userId => ({
        set_id: setId,
        user_id: userId,
        permission_level: 'viewer' as const,
      }));

      const { error } = await supabase
        .from('custom_set_participants')
        .insert(participants);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Custom set shared successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to share custom set');
    },
  });
};

// Update custom set visibility
export const useUpdateCustomSetVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ setId, isPublic }: { setId: string; isPublic: boolean }) => {
      const { error } = await supabase
        .from('custom_sets')
        .update({ is_public: isPublic })
        .eq('id', setId);

      if (error) throw error;
      return { isPublic };
    },
    onSuccess: ({ isPublic }) => {
      toast.success(isPublic ? 'Set is now public!' : 'Set is now unlisted');
      queryClient.invalidateQueries({ queryKey: ['customSets'] });
      queryClient.invalidateQueries({ queryKey: ['publicCustomSets'] });
      queryClient.invalidateQueries({ queryKey: ['customSet'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update visibility');
    },
  });
};

// Update custom set AI enabled status
export const useUpdateCustomSetAIEnabled = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ setId, aiEnabled }: { setId: string; aiEnabled: boolean }) => {
      const { error } = await supabase
        .from('custom_sets')
        .update({ ai_enabled: aiEnabled })
        .eq('id', setId);

      if (error) throw error;
      return { aiEnabled };
    },
    onSuccess: ({ aiEnabled }) => {
      toast.success(aiEnabled ? 'AI Assistant enabled!' : 'AI Assistant disabled');
      queryClient.invalidateQueries({ queryKey: ['customSets'] });
      queryClient.invalidateQueries({ queryKey: ['customSet'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update AI settings');
    },
  });
};

// Get participants of a custom set
export const useCustomSetParticipants = (setId: string | undefined) => {
  return useQuery<Array<{ user_id: string; username: string; avatar_url: string | null }>, Error>({
    queryKey: ['customSetParticipants', setId],
    queryFn: async () => {
      if (!setId) return [];

      const { data, error } = await supabase
        .from('custom_set_participants')
        .select(`
          user_id,
          profiles!custom_set_participants_user_id_fkey (
            username,
            avatar_url
          )
        `)
        .eq('set_id', setId);

      if (error) throw error;

      return data?.map(p => {
        const profile = Array.isArray(p.profiles) ? p.profiles[0] : p.profiles;
        return {
          user_id: p.user_id,
          username: profile?.username || 'Unknown',
          avatar_url: profile?.avatar_url || null,
        };
      }) || [];
    },
    enabled: !!setId,
  });
};

// Get participants with their progress (owner only)
export const useCustomSetParticipantsWithProgress = (setId: string | undefined) => {
  return useQuery<Array<{
    user_id: string;
    username: string;
    avatar_url: string | null;
    completed_count: number;
    total_count: number;
  }>, Error>({
    queryKey: ['customSetParticipantsWithProgress', setId],
    queryFn: async () => {
      if (!setId) return [];

      const { data, error } = await supabase.rpc('get_custom_set_participants_with_progress', {
        p_set_id: setId
      });

      if (error) throw error;

      return data?.map(p => ({
        user_id: p.user_id,
        username: p.username || 'Unknown',
        avatar_url: p.avatar_url,
        completed_count: p.completed_count || 0,
        total_count: p.total_count || 0,
      })) || [];
    },
    enabled: !!setId,
  });
};

// Join a custom set (add current user as participant)
export const useJoinCustomSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ setId }: { setId: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Check if already a participant
      const { data: existing } = await supabase
        .from('custom_set_participants')
        .select('id')
        .eq('set_id', setId)
        .eq('user_id', user.id)
        .single();

      if (existing) {
        return; // Already a participant
      }

      // Add as participant
      const { error } = await supabase
        .from('custom_set_participants')
        .insert({
          set_id: setId,
          user_id: user.id,
          permission_level: 'viewer',
        });

      if (error) throw error;
    },
    onSuccess: (_, { setId }) => {
      queryClient.invalidateQueries({ queryKey: ['customSetParticipants', setId] });
      queryClient.invalidateQueries({ queryKey: ['customSetParticipantsWithProgress', setId] });
      queryClient.invalidateQueries({ queryKey: ['recentPracticeRooms'] });
    },
    onError: (error: any) => {
      console.error('Failed to join custom set:', error);
    },
  });
};

// Fetch recent practice rooms the user has joined
export interface RecentPracticeRoom {
  id: string;
  title: string;
  description: string | null;
  language: 'cpp' | 'csharp' | 'python' | 'java' | 'javascript' | 'typescript';
  owner_id: string;
  owner_username: string | null;
  owner_avatar_url: string | null;
  created_at: string;
  joined_at: string;
  problem_count: number;
  completed_count: number;
  is_owner: boolean;
  is_public: boolean;
}

export const useRecentPracticeRooms = (limit: number = 5) => {
  return useQuery<RecentPracticeRoom[], Error>({
    queryKey: ['recentPracticeRooms', limit],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_recent_practice_rooms', { p_limit: limit });
      if (error) throw error;
      return data || [];
    },
  });
};