import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  applyActionCode, 
  verifyPasswordResetCode, 
  confirmPasswordReset, 
  checkActionCode 
} from 'firebase/auth';
import { 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Mail, 
  ShieldCheck, 
  Sparkles,
  KeyRound,
  RefreshCw,
  Home
} from 'lucide-react';
import { auth } from '../../firebase';
import { useAuth, getFriendlyAuthErrorMessage } from '../../context/AuthContext';
import { Logo } from '../Logo';

type ActionStatus = 'loading' | 'success' | 'input' | 'error';

export const AuthActionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { reloadUser, user } = useAuth();

  // Parse mode, oobCode, apiKey from search and hash parameters
  const [params, setParams] = useState<{
    mode: string;
    oobCode: string;
    apiKey: string;
    continueUrl: string;
  }>({ mode: '', oobCode: '', apiKey: '', continueUrl: '' });

  const [status, setStatus] = useState<ActionStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Password reset specific state
  const [resetEmail, setResetEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);

  // Extract parameters from URL search or hash
  useEffect(() => {
    let mode = '';
    let oobCode = '';
    let apiKey = '';
    let continueUrl = '';

    // 1. Check window.location.search
    if (window.location.search) {
      const searchParams = new URLSearchParams(window.location.search);
      mode = searchParams.get('mode') || '';
      oobCode = searchParams.get('oobCode') || '';
      apiKey = searchParams.get('apiKey') || '';
      continueUrl = searchParams.get('continueUrl') || '';
    }

    // 2. Check React Router location.search
    if (!mode || !oobCode) {
      const locationParams = new URLSearchParams(location.search);
      if (!mode) mode = locationParams.get('mode') || '';
      if (!oobCode) oobCode = locationParams.get('oobCode') || '';
      if (!apiKey) apiKey = locationParams.get('apiKey') || '';
      if (!continueUrl) continueUrl = locationParams.get('continueUrl') || '';
    }

    // 3. Check window.location.hash for queries after hash (e.g. #/auth/action?mode=...)
    if (!mode || !oobCode) {
      const hash = window.location.hash;
      const qIdx = hash.indexOf('?');
      if (qIdx !== -1) {
        const hashParams = new URLSearchParams(hash.slice(qIdx));
        if (!mode) mode = hashParams.get('mode') || '';
        if (!oobCode) oobCode = hashParams.get('oobCode') || '';
        if (!apiKey) apiKey = hashParams.get('apiKey') || '';
        if (!continueUrl) continueUrl = hashParams.get('continueUrl') || '';
      }
    }

    setParams({ mode, oobCode, apiKey, continueUrl });
  }, [location]);

  // Process the action code once parameters are loaded
  useEffect(() => {
    if (!params.mode && !params.oobCode) {
      return;
    }

    const handleAction = async () => {
      const { mode, oobCode } = params;

      if (!oobCode) {
        setStatus('error');
        setErrorMessage('Invalid action link: Missing action code. Please check that the complete link was clicked.');
        return;
      }

      switch (mode) {
        case 'verifyEmail': {
          try {
            setStatus('loading');
            await applyActionCode(auth, oobCode);
            setStatus('success');
            setSuccessMessage('Email verified successfully! Your account is now fully active.');
            
            // Reload user state if signed in
            try {
              await reloadUser();
            } catch (e) {
              console.warn('Could not reload user auth after verification:', e);
            }
          } catch (err: any) {
            console.error('Email verification error:', err);
            setStatus('error');
            if (err.code === 'auth/expired-action-code') {
              setErrorMessage('This email verification link has expired. Verification links are valid for 24 hours. Please log in and request a new verification link.');
            } else if (err.code === 'auth/invalid-action-code') {
              setErrorMessage('This verification link is invalid or has already been used. If your account is already verified, you can proceed to sign in.');
            } else {
              setErrorMessage(getFriendlyAuthErrorMessage(err) || 'Failed to verify email address. Please try again.');
            }
          }
          break;
        }

        case 'resetPassword': {
          try {
            setStatus('loading');
            // Verify code first to check if expired and retrieve user email
            const email = await verifyPasswordResetCode(auth, oobCode);
            setResetEmail(email);
            setStatus('input');
          } catch (err: any) {
            console.error('Password reset code verification error:', err);
            setStatus('error');
            if (err.code === 'auth/expired-action-code') {
              setErrorMessage('This password reset link has expired. For your security, password reset links expire after a short period. Please request a new one.');
            } else if (err.code === 'auth/invalid-action-code') {
              setErrorMessage('This password reset link is invalid or has already been used. Please request a fresh reset link.');
            } else {
              setErrorMessage(getFriendlyAuthErrorMessage(err) || 'Failed to verify password reset code.');
            }
          }
          break;
        }

        case 'recoverEmail': {
          try {
            setStatus('loading');
            const info = await checkActionCode(auth, oobCode);
            await applyActionCode(auth, oobCode);
            setStatus('success');
            setSuccessMessage(`Your email address has been restored to ${info.data.email || 'your original address'}.`);
          } catch (err: any) {
            console.error('Recover email error:', err);
            setStatus('error');
            setErrorMessage(getFriendlyAuthErrorMessage(err) || 'Could not restore previous email.');
          }
          break;
        }

        default: {
          setStatus('error');
          setErrorMessage(`Unsupported authentication action: "${mode}". Please return to the home page.`);
          break;
        }
      }
    };

    handleAction();
  }, [params.mode, params.oobCode]);

  // Handle auto-redirect countdown after successful email verification
  useEffect(() => {
    if (status === 'success' && params.mode === 'verifyEmail') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/dashboard', { replace: true });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, params.mode, navigate]);

  // Handle password reset form submission
  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!newPassword || newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (!/[0-9]/.test(newPassword)) {
      setErrorMessage('Password must contain at least one number.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    try {
      await confirmPasswordReset(auth, params.oobCode, newPassword);
      setStatus('success');
      setSuccessMessage('Your password has been reset successfully! You can now log in with your new password.');
    } catch (err: any) {
      console.error('Confirm password reset error:', err);
      if (err.code === 'auth/expired-action-code') {
        setErrorMessage('This reset code has expired. Please request a new password reset link.');
      } else {
        setErrorMessage(getFriendlyAuthErrorMessage(err) || 'Failed to reset password. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasMinLength = newPassword.length >= 8;
  const hasNumber = /[0-9]/.test(newPassword);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 sm:p-6 text-slate-900 font-sans">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <Logo className="w-10 h-10 transition-transform group-hover:scale-105" />
            <div className="text-left">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 block leading-none">
                TheNoob<span className="text-blue-600">PM</span>
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wide">
                Product Management Launchpad
              </span>
            </div>
          </Link>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8">
          {/* 1. LOADING STATE */}
          {status === 'loading' && (
            <div className="py-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 text-blue-600 mb-4 animate-spin">
                <Loader2 className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                {params.mode === 'resetPassword' ? 'Verifying reset request...' : 'Verifying your email...'}
              </h2>
              <p className="text-sm text-slate-600">
                Please wait while we validate your credentials with Firebase.
              </p>
            </div>
          )}

          {/* 2. EMAIL VERIFICATION SUCCESS */}
          {status === 'success' && params.mode === 'verifyEmail' && (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
                Email Verified!
              </h2>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {successMessage || 'Your email address has been successfully verified. Your account is now fully unlocked.'}
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                <p className="text-xs text-slate-500 font-medium">
                  Redirecting to your dashboard in <span className="font-bold text-blue-600">{countdown}s</span>...
                </p>
              </div>

              <button
                onClick={() => navigate('/dashboard', { replace: true })}
                className="w-full py-3.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 active:scale-[0.98]"
              >
                <span>Continue to PM Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 3. PASSWORD RESET SUCCESS */}
          {status === 'success' && params.mode === 'resetPassword' && (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
                Password Reset Complete!
              </h2>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {successMessage || 'Your password has been changed. You can now use your new password to sign in to TheNoobPM.'}
              </p>

              <button
                onClick={() => navigate('/', { replace: true })}
                className="w-full py-3.5 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
              >
                <span>Proceed to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 4. PASSWORD RESET INPUT FORM */}
          {status === 'input' && params.mode === 'resetPassword' && (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-3 border border-blue-100">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Set New Password
                </h2>
                {resetEmail && (
                  <p className="text-xs text-slate-500 mt-1">
                    For account: <span className="font-semibold text-slate-700">{resetEmail}</span>
                  </p>
                )}
              </div>

              {errorMessage && (
                <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 characters with numbers"
                      required
                      autoComplete="new-password"
                      className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type your new password"
                      required
                      autoComplete="new-password"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Validation checklist */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${hasMinLength ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-white'}`}>
                      ✓
                    </div>
                    <span className={hasMinLength ? 'text-emerald-700 font-medium' : 'text-slate-500'}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${hasNumber ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-white'}`}>
                      ✓
                    </div>
                    <span className={hasNumber ? 'text-emerald-700 font-medium' : 'text-slate-500'}>
                      At least one number (0-9)
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !hasMinLength || !hasNumber}
                  className="w-full py-3.5 px-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 active:scale-[0.98] mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving New Password...</span>
                    </>
                  ) : (
                    <>
                      <span>Update Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* 5. ERROR STATE (Expired / Invalid / Missing Action Code) */}
          {status === 'error' && (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-50 text-rose-600 mb-4 border border-rose-100">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Authentication Link Problem
              </h2>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {errorMessage || 'This authentication link is invalid, expired, or has already been used.'}
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/', { replace: true })}
                  className="w-full py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
                >
                  <Home className="w-4 h-4" />
                  <span>Return to TheNoobPM Home</span>
                </button>

                <p className="text-xs text-slate-500 mt-3">
                  Need help? Contact our team at{' '}
                  <a href="mailto:support@thenoobpm.com" className="text-blue-600 font-medium hover:underline">
                    support@thenoobpm.com
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 text-xs text-slate-400">
          Secure Authentication powered by Firebase &amp; Resend
        </div>
      </div>
    </div>
  );
};
