import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/profiles';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PremiumGuardProps {
  children: ReactNode;
}

export const PremiumGuard = ({ children }: PremiumGuardProps) => {
  const { user, loading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile(user?.id);
  const navigate = useNavigate();

  const isLoading = authLoading || profileLoading;
  const isPremium = profile?.tier === 'pro' || profile?.tier === 'admin';

  useEffect(() => {
    if (!isLoading && user && !isPremium) {
      toast.error("Pro Feature", {
        description: "This page is only available for Pro members.",
      });
      navigate('/practice');
    }
  }, [isLoading, isPremium, user, navigate]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not premium, the useEffect will handle the redirect, 
  // so we return null to prevent content flash.
  if (!isPremium) return null;

  return <>{children}</>;
};