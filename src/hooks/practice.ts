import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface PracticeProgress {
  id: string;
  user_id: string;
  problem_id: string;
  completed_at: string;
  solution_code?: string | null;
  language?: string | null;
}

export const usePracticeProgress = () => {
  return useQuery<PracticeProgress[], Error>({
    queryKey: ['practiceProgress'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // We explicitly filter by current user so you don't see others' solved problems
      // in your own personal Practice dashboard.
      const { data, error } = await supabase
        .from('practice_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useMarkProblemComplete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ problemId, solutionCode, language }: { problemId: string; solutionCode?: string; language?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('practice_progress')
        .upsert({
          user_id: user.id,
          problem_id: problemId,
          completed_at: new Date().toISOString(),
          solution_code: solutionCode || null,
          language: language || null,
        }, {
          onConflict: 'user_id,problem_id',
        });

      if (error) throw error;
      return problemId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['practiceProgress'] });
      // Also invalidate profile queries to update the solved count on the profile page
      queryClient.invalidateQueries({ queryKey: ['userPracticeProgress'] });
      // Invalidate leaderboard to refresh streaks
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to save progress');
    },
  });
};

export const useLessonProgress = (lessonId: string, problemIds: string[]) => {
  const { data: progress } = usePracticeProgress();

  if (!progress) return { completed: 0, total: problemIds.length };

  const completed = problemIds.filter(id =>
    progress.some(p => p.problem_id === id)
  ).length;

  return { completed, total: problemIds.length };
};
