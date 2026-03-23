import { useAuth } from "./useAuth";
import { useProfile } from "./profiles";

export const AI_CREDIT_LIMITS = {
  free: 20,
  pro: 300,
  admin: Infinity,
} as const;

export interface CreditUsage {
  currentCredits: number;
  limit: number;
  canUse: boolean;
  remaining: number;
  tier: string;
}

export function useAICredits(): CreditUsage {
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);

  const tier = profile?.tier || 'free';
  const currentCredits = profile?.credits || 0;
  const bonus = profile?.credit_limit_bonus || 0;
  const baseLimit = tier === 'admin' ? Infinity : AI_CREDIT_LIMITS[tier as keyof typeof AI_CREDIT_LIMITS] || AI_CREDIT_LIMITS.free;
  const limit = tier === 'admin' ? Infinity : baseLimit + bonus;
  const canUse = currentCredits < limit;
  const remaining = Math.max(0, limit - currentCredits);

  return {
    currentCredits,
    limit,
    canUse,
    remaining,
    tier,
  };
}