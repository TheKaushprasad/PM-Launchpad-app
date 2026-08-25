import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { VerifyEmailGate } from './VerifyEmailGate';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requireOnboarding?: boolean;
  requireEmailVerification?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requireOnboarding = false,
  requireEmailVerification = true
}) => {
  const { user, loading, isEmailVerified, needsOnboarding } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Loading session...
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to home/login with explicit authentication required state
    return <Navigate to="/" state={{ from: location, requireAuth: true }} replace />;
  }

  // Strict Email Verification Gatekeeping
  // Users MUST verify their email before accessing modules, dashboard, interview, career tools, or profile
  if (requireEmailVerification && !isEmailVerified) {
    return <VerifyEmailGate from={location.pathname} />;
  }

  if (requireOnboarding && needsOnboarding && location.pathname !== '/onboarding' && location.pathname !== '/profile') {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};
