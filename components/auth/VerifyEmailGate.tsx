import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, CheckCircle2, RefreshCw, AlertCircle, 
  ArrowRight, LogOut, ShieldCheck, Sparkles, Inbox, Clock
} from 'lucide-react';
import { useAuth, getFriendlyAuthErrorMessage } from '../../context/AuthContext';
import { Logo } from '../Logo';

interface VerifyEmailGateProps {
  from?: string;
}

export const VerifyEmailGate: React.FC<VerifyEmailGateProps> = ({ from = '/dashboard' }) => {
  const { user, isEmailVerified, reloadUser, sendVerificationEmail, logout } = useAuth();
  const navigate = useNavigate();

  const [isChecking, setIsChecking] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [checkStatus, setCheckStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const pollIntervalRef = useRef<any>(null);

  // If user is already verified or gets verified, route forward
  useEffect(() => {
    if (isEmailVerified) {
      navigate(from, { replace: true });
    }
  }, [isEmailVerified, from, navigate]);

  // Handle Resend Cooldown Timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Handle Manual and Automated Verification Check
  const handleCheckStatus = async (isBackground = false) => {
    if (!isBackground) {
      setIsChecking(true);
      setCheckStatus(null);
    }

    try {
      const verified = await reloadUser();
      if (verified) {
        if (!isBackground) {
          setCheckStatus({
            type: 'success',
            message: 'Email successfully verified! Unlocking your PM workspace...'
          });
        }
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 600);
      } else if (!isBackground) {
        setCheckStatus({
          type: 'error',
          message: 'Verification pending. Please make sure you clicked the link in your email, or click Resend below.'
        });
      }
    } catch (err: any) {
      if (!isBackground) {
        setCheckStatus({
          type: 'error',
          message: getFriendlyAuthErrorMessage(err)
        });
      }
    } finally {
      if (!isBackground) {
        setIsChecking(false);
      }
    }
  };

  // Background Auto-Detection: When tab is focused or periodically polled
  useEffect(() => {
    // Check when user switches back to this tab from their inbox
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        handleCheckStatus(true);
      }
    };

    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);

    // Periodic gentle background poll every 5 seconds
    pollIntervalRef.current = setInterval(() => {
      if (document.visibilityState === 'visible') {
        handleCheckStatus(true);
      }
    }, 5000);

    return () => {
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;
    setIsResending(true);
    setResendStatus(null);
    setCheckStatus(null);

    try {
      await sendVerificationEmail();
      setResendStatus('Verification link resent successfully! Please check your inbox & spam folder.');
      setCooldown(60); // 60 seconds cooldown
    } catch (err: any) {
      setResendStatus(getFriendlyAuthErrorMessage(err));
    } finally {
      setIsResending(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 sm:p-6 text-zinc-900 relative">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-emerald-100/30 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg bg-white rounded-3xl border border-zinc-200/80 shadow-xl overflow-hidden relative z-10"
      >
        {/* Header Ribbon */}
        <div className="bg-zinc-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <Logo className="w-6 h-6" />
            <span className="font-black text-sm tracking-tight">The NooB PM</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full text-amber-300 text-[11px] font-bold">
            <Clock className="w-3 h-3 text-amber-300" />
            <span>Verification Required</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 sm:p-8 space-y-6 text-center">
          {/* Animated Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-100/50">
                <Mail className="w-10 h-10 text-indigo-600 animate-pulse" />
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center ring-4 ring-white shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Heading & Text */}
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
              Please Verify Your Email
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
              To unlock access to your PM dashboard, learning modules, AI mock interview studio, career tools, and profile, please confirm your email address.
            </p>
          </div>

          {/* User Email Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-100 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 break-all max-w-full">
            <Inbox className="w-4 h-4 text-zinc-500 shrink-0" />
            <span>{user?.email || 'Your registered email'}</span>
          </div>

          {/* Quick Steps Card */}
          <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 text-left space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              3 Quick Steps to Unlock
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-700">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>Open your email client and look for the verification email.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>Click the confirmation link inside the email.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>Click <strong>"I've Verified My Email"</strong> below to unlock your workspace.</span>
              </div>
            </div>
          </div>

          {/* Feedback Messages */}
          <AnimatePresence>
            {checkStatus && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={`p-3.5 rounded-xl text-xs font-medium flex items-start gap-2.5 text-left ${
                  checkStatus.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border border-rose-200 text-rose-800'
                }`}
              >
                {checkStatus.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{checkStatus.message}</span>
              </motion.div>
            )}

            {resendStatus && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-medium flex items-start gap-2.5 text-left"
              >
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{resendStatus}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="space-y-3 pt-1">
            {/* Check Status Primary Button */}
            <button
              type="button"
              id="check-verification-status-btn"
              onClick={() => handleCheckStatus(false)}
              disabled={isChecking}
              className="w-full py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
            >
              {isChecking ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-indigo-200" />
              )}
              <span>{isChecking ? 'Checking Status...' : "I've Verified My Email"}</span>
              <ArrowRight className="w-4 h-4 ml-1 opacity-80" />
            </button>

            {/* Resend Verification Link */}
            <button
              type="button"
              id="resend-verification-btn"
              onClick={handleResend}
              disabled={isResending || cooldown > 0}
              className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 hover:bg-zinc-50 active:scale-[0.99] text-zinc-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isResending ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-zinc-500" />
              ) : (
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
              )}
              <span>
                {isResending 
                  ? 'Sending Link...' 
                  : cooldown > 0 
                    ? `Resend link in ${cooldown}s` 
                    : 'Resend Verification Link'}
              </span>
            </button>
          </div>

          {/* Bottom Footer Actions */}
          <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <span className="text-[11px] text-zinc-400">
              Check Spam folder if email is delayed.
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 font-bold text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out / Change Account</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
