import { useAuth } from "./useAuth";
import { useProfile } from "./profiles";
import { useProjects } from "./projects";

export const PROJECT_LIMITS = {
  free: 3,
  pro: 20,
  admin: Infinity,
} as const;

export function useProjectLimit() {
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const { data: projects } = useProjects();

  const tier = profile?.tier || 'free';
  const projectCount = projects?.length || 0;
  const limit = tier === 'admin' ? Infinity : PROJECT_LIMITS[tier as keyof typeof PROJECT_LIMITS] || PROJECT_LIMITS.free;
  const canCreate = projectCount < limit;
  const remaining = Math.max(0, limit - projectCount);

  return {
    tier,
    projectCount,
    limit,
    canCreate,
    remaining,
    isPro: tier === 'pro' || tier === 'admin',
  };
}