import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  X, Mail, Lock, User as UserIcon, GraduationCap, Briefcase, 
  Building2, Calendar, Sparkles, AlertCircle, 
  Eye, EyeOff, Loader2, ArrowRight, CheckCircle2, Globe, Target, Send, RefreshCw
} from 'lucide-react';
import { useAuth, UserType, SignUpParams, getFriendlyAuthErrorMessage, isValidEmail } from '../../context/AuthContext';
import { Logo } from '../Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot';
  redirectTo?: string;
  onSuccess?: () => void;
}

const TARGET_ROLES = [
  'Product Manager',
  'Associate Product Manager',
  'Software Engineer',
  'Data Analyst',
  'Product Designer',
  'Marketing',
  'Customer Success',
  'Business Analyst',
  'Other'
];

const INDUSTRIES = [
  'SaaS',
  'FinTech',
  'AI/ML',
  'E-commerce',
  'EdTech',
  'Healthcare',
  'Gaming',
  'Other'
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
  redirectTo = '/dashboard',
  onSuccess
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword, sendVerificationEmail } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [accountCreatedSuccess, setAccountCreatedSuccess] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  // Sync mode when initialMode changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage(null);
      setSuccessMessage(null);
      setAccountCreatedSuccess(false);
      setEmailTouched(false);
      setResendStatus(null);
      setLoading(false);
      setGoogleLoading(false);
    }
  }, [isOpen, initialMode]);

  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  // Signup fields
  const [userType, setUserType] = useState<UserType>('college_student');

  // Student specific
  const [collegeName, setCollegeName] = useState('');
  const [degree, setDegree] = useState('');
  const [passingOutYear, setPassingOutYear] = useState('2026');

  // Professional specific
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('1-3 years');

  // Career & Target fields
  const [targetRole, setTargetRole] = useState('Product Manager');
  const [customRole, setCustomRole] = useState('');
  const [industry, setIndustry] = useState('SaaS');
  const [customIndustry, setCustomIndustry] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');

  // Email format evaluation
  const isEmailInputValid = email.trim() === '' || isValidEmail(email);
  const showEmailInvalid = emailTouched && (!email.trim() || !isValidEmail(email));

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (errorMessage && errorMessage.toLowerCase().includes('email')) {
      setErrorMessage(null);
    }
  };

  // Switch mode helper
  const handleSwitchMode = (newMode: 'login' | 'signup' | 'forgot') => {
    setMode(newMode);
    setErrorMessage(null);
    setSuccessMessage(null);
    setEmailTouched(false);
    setResendStatus(null);
    setAccountCreatedSuccess(false);
  };

  const getDestinationPath = () => {
    if (redirectTo && redirectTo !== '/') return redirectTo;
    const fromState = (location.state as any)?.from?.pathname;
    if (fromState && fromState !== '/') return fromState;
    return '/dashboard';
  };

  const validatePassword = (pass: string): boolean => {
    if (pass.length < 8) return false;
    const hasLetter = /[a-zA-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    return hasLetter && hasNumber;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setEmailTouched(true);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    if (!isValidEmail(email.trim())) {
      setErrorMessage('Please enter a valid email address format (e.g. name@example.com).');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmail(email.trim(), password);
      setSuccessMessage('Signed in successfully!');
      setTimeout(() => {
        onClose();
        if (onSuccess) {
          onSuccess();
        } else {
          navigate(getDestinationPath(), { replace: true });
        }
      }, 500);
    } catch (err: any) {
      setErrorMessage(getFriendlyAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setEmailTouched(true);

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!isValidEmail(email.trim())) {
      setErrorMessage('Please enter a valid email address format (e.g. name@example.com).');
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 8 characters with at least one letter and one number.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify and re-type.');
      return;
    }

    const isStudent = userType === 'student' || userType === 'college_student';

    if (isStudent) {
      if (!collegeName.trim()) {
        setErrorMessage('Please enter your college / university name.');
        return;
      }
      if (!degree.trim()) {
        setErrorMessage('Please enter your degree / major.');
        return;
      }
      if (!passingOutYear.trim()) {
        setErrorMessage('Please specify your graduation / passing out year.');
        return;
      }
    } else {
      if (!companyName.trim()) {
        setErrorMessage('Please enter your company / organization name.');
        return;
      }
      if (!designation.trim()) {
        setErrorMessage('Please enter your current designation / job title.');
        return;
      }
    }

    const finalTargetRole = targetRole === 'Other' ? (customRole.trim() || 'Product Manager') : targetRole;
    const finalIndustry = industry === 'Other' ? (customIndustry.trim() || 'Technology') : industry;

    setLoading(true);
    try {
      const params: SignUpParams = {
        name: name.trim(),
        email: email.trim(),
        password,
        userType,
        ...(isStudent ? {
          collegeName: collegeName.trim(),
          degree: degree.trim(),
          passingOutYear: passingOutYear.trim(),
          graduationYear: passingOutYear.trim()
        } : {
          companyName: companyName.trim(),
          designation: designation.trim(),
          yearsOfExperience,
          experienceYears: yearsOfExperience
        }),
        targetRole: finalTargetRole,
        industry: finalIndustry,
        linkedinUrl: linkedinUrl.trim()
      };

      await signUpWithEmail(params);
      setSuccessMessage('Account created and verification email dispatched!');
      setAccountCreatedSuccess(true);
    } catch (err: any) {
      setErrorMessage(getFriendlyAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendingEmail(true);
    setResendStatus(null);
    try {
      await sendVerificationEmail();
      setResendStatus('Verification email resent successfully! Please check your inbox.');
    } catch (err: any) {
      setResendStatus(getFriendlyAuthErrorMessage(err));
    } finally {
      setResendingEmail(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setGoogleLoading(true);

    const isStudent = userType === 'student' || userType === 'college_student';
    const finalTargetRole = targetRole === 'Other' ? (customRole.trim() || 'Product Manager') : targetRole;
    const finalIndustry = industry === 'Other' ? (customIndustry.trim() || 'Technology') : industry;

    try {
      const additionalProfile: Partial<SignUpParams> = {
        name: name.trim(),
        userType,
        ...(isStudent ? {
          collegeName: collegeName.trim(),
          degree: degree.trim(),
          passingOutYear: passingOutYear.trim() || '2026',
          graduationYear: passingOutYear.trim() || '2026'
        } : {
          companyName: companyName.trim(),
          designation: designation.trim(),
          yearsOfExperience: yearsOfExperience || '1-3 years',
          experienceYears: yearsOfExperience || '1-3 years'
        }),
        targetRole: finalTargetRole,
        industry: finalIndustry,
        linkedinUrl: linkedinUrl.trim()
      };

      await signInWithGoogle(additionalProfile);
      setSuccessMessage('Signed in with Google successfully!');
      setTimeout(() => {
        onClose();
        if (onSuccess) {
          onSuccess();
        } else {
          navigate(getDestinationPath(), { replace: true });
        }
      }, 500);
    } catch (err: any) {
      setErrorMessage(getFriendlyAuthErrorMessage(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setEmailTouched(true);

    if (!email.trim() || !isValidEmail(email.trim())) {
      setErrorMessage('Please enter a valid registered email address.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email.trim());
      setSuccessMessage("If an account exists for this email, we've sent password reset instructions.");
    } catch (err: any) {
      setSuccessMessage("If an account exists for this email, we've sent password reset instructions.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-8 z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 border-b border-zinc-100 flex items-center justify-between shrink-0 bg-zinc-50/50">
            <div className="flex items-center gap-3">
              <Logo className="w-8 h-8" />
              <div>
                <h3 className="text-base font-black text-zinc-900 tracking-tight">
                  {accountCreatedSuccess 
                    ? 'Verify Your Email' 
                    : mode === 'signup' 
                      ? 'Create an Account' 
                      : mode === 'login' 
                        ? 'Welcome Back' 
                        : 'Reset Password'}
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  {accountCreatedSuccess
                    ? 'Verification link has been sent to your inbox.'
                    : mode === 'signup' 
                      ? 'Sign up to track your learning journey and save your progress.' 
                      : mode === 'login' 
                        ? 'Sign in to continue your product journey.' 
                        : 'Enter your email to receive recovery instructions.'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-5">
            {accountCreatedSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 px-1 text-center space-y-5 flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100/50">
                    <Mail className="w-8 h-8 text-indigo-600 animate-pulse" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center ring-2 ring-white">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2 max-w-sm mx-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-[11px] font-bold tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verification Email Sent</span>
                  </div>
                  <h4 className="text-xl font-black text-zinc-900 tracking-tight">
                    Verify Your Email Address
                  </h4>
                  <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                    We've sent a verification link to{' '}
                    <span className="font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-md break-all">
                      {email || 'your email'}
                    </span>.
                    Please click the link in your inbox to verify your account and unlock all PM prep features.
                  </p>
                </div>

                <AnimatePresence>
                  {resendStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="w-full max-w-sm p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{resendStatus}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="w-full max-w-sm space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onSuccess) {
                        onSuccess();
                      } else {
                        navigate(getDestinationPath(), { replace: true });
                      }
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <span>Continue to Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    disabled={resendingEmail}
                    onClick={handleResendVerification}
                    className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {resendingEmail ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                    ) : (
                      <RefreshCw className="w-3.5 h-3.5 text-zinc-500" />
                    )}
                    <span>{resendingEmail ? 'Sending Link...' : 'Resend Verification Email'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-zinc-400 max-w-xs mx-auto">
                  Didn't receive the email? Check your Spam or Promotions folder.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Google 1-Click Button */}
                {mode !== 'forgot' && (
                  <div className="space-y-3">
                    <button
                      type="button"
                      id="google-auth-btn"
                      onClick={handleGoogleAuth}
                      disabled={googleLoading || loading}
                      className="w-full py-3 px-4 rounded-xl border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-sm flex items-center justify-center gap-3 shadow-xs transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
                    >
                      {googleLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                      )}
                      <span>Continue with Google</span>
                    </button>

                    <div className="relative flex items-center justify-center">
                      <div className="border-t border-zinc-200 w-full" />
                      <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-zinc-400 shrink-0">
                        OR
                      </span>
                      <div className="border-t border-zinc-200 w-full" />
                    </div>
                  </div>
                )}

                {/* Error & Success Banners */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium space-y-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{errorMessage}</span>
                      </div>
                    </motion.div>
                  )}

                  {successMessage && !accountCreatedSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{successMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SIGN UP FORM */}
                {mode === 'signup' && (
                  <form onSubmit={handleSignUp} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Kaushal Prasad"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email with invalid highlight in placeholder */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-zinc-700">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        {showEmailInvalid && (
                          <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1 animate-pulse">
                            <AlertCircle className="w-3 h-3 text-rose-500" />
                            Invalid email format
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${showEmailInvalid ? 'text-rose-500' : 'text-zinc-400'}`} />
                        <input
                          type="email"
                          required
                          value={email}
                          onBlur={() => setEmailTouched(true)}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          placeholder={showEmailInvalid ? "Please enter a valid email (e.g. name@example.com)" : "name@example.com"}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                            showEmailInvalid
                              ? 'border-rose-400 focus:border-rose-500 ring-2 ring-rose-100 bg-rose-50/20 text-rose-900 placeholder:text-rose-400 placeholder:font-medium'
                              : 'border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-zinc-900 placeholder:text-zinc-400'
                          }`}
                        />
                      </div>
                      {showEmailInvalid && (
                        <p className="text-[11px] text-rose-600 font-medium mt-1">
                          Please enter a complete email address with domain (e.g. yourname@gmail.com).
                        </p>
                      )}
                    </div>

                    {/* Password & Confirm Password */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Password <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 8 chars, 1 num"
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm outline-none transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-1 text-zinc-400 hover:text-zinc-600 absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Confirm Password <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm outline-none transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="p-1 text-zinc-400 hover:text-zinc-600 absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* User Type Switcher */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                        User Type <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setUserType('college_student')}
                          className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            userType === 'student' || userType === 'college_student'
                              ? 'bg-white text-indigo-600 shadow-xs'
                              : 'text-zinc-600 hover:text-zinc-900'
                          }`}
                        >
                          <GraduationCap className="w-4 h-4" />
                          <span>College Student</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setUserType('working_professional')}
                          className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            userType === 'professional' || userType === 'working_professional'
                              ? 'bg-white text-indigo-600 shadow-xs'
                              : 'text-zinc-600 hover:text-zinc-900'
                          }`}
                        >
                          <Briefcase className="w-4 h-4" />
                          <span>Working Professional</span>
                        </button>
                      </div>
                    </div>

                    {/* Conditional Fields: Student */}
                    {(userType === 'student' || userType === 'college_student') && (
                      <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                            College / University Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Building2 className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={collegeName}
                              onChange={(e) => setCollegeName(e.target.value)}
                              placeholder="e.g. IIT Delhi, BITS Pilani, Stanford"
                              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                              Degree / Major <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={degree}
                              onChange={(e) => setDegree(e.target.value)}
                              placeholder="e.g. B.Tech / MBA / BCA"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                              Passing Out Year <span className="text-rose-500">*</span>
                            </label>
                            <select
                              value={passingOutYear}
                              onChange={(e) => setPassingOutYear(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600 font-medium"
                            >
                              <option value="2024">2024 (Recent)</option>
                              <option value="2025">2025</option>
                              <option value="2026">2026</option>
                              <option value="2027">2027</option>
                              <option value="2028">2028+</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Conditional Fields: Professional */}
                    {(userType === 'professional' || userType === 'working_professional') && (
                      <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                            Company Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Building2 className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              placeholder="e.g. Microsoft, Flipkart, Startup"
                              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                              Designation <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={designation}
                              onChange={(e) => setDesignation(e.target.value)}
                              placeholder="e.g. Software Engineer / Analyst"
                              className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                              Experience <span className="text-rose-500">*</span>
                            </label>
                            <select
                              value={yearsOfExperience}
                              onChange={(e) => setYearsOfExperience(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600 font-medium"
                            >
                              <option value="0-1 years">0-1 years</option>
                              <option value="1-3 years">1-3 years</option>
                              <option value="3-5 years">3-5 years</option>
                              <option value="5+ years">5+ years</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Target Role & Industry */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Target Career Role <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={targetRole}
                          onChange={(e) => setTargetRole(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600 font-medium"
                        >
                          {TARGET_ROLES.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                        {targetRole === 'Other' && (
                          <input
                            type="text"
                            placeholder="Enter target role"
                            value={customRole}
                            onChange={(e) => setCustomRole(e.target.value)}
                            className="mt-1.5 w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                          />
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Target Industry (Optional)
                        </label>
                        <select
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600 font-medium"
                        >
                          {INDUSTRIES.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                        {industry === 'Other' && (
                          <input
                            type="text"
                            placeholder="Enter target industry"
                            value={customIndustry}
                            onChange={(e) => setCustomIndustry(e.target.value)}
                            className="mt-1.5 w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                          />
                        )}
                      </div>
                    </div>

                    {/* Optional LinkedIn URL */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        LinkedIn Profile URL <span className="text-zinc-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="url"
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          placeholder="https://www.linkedin.com/in/username"
                          className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 focus:border-indigo-600 text-xs outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading || googleLoading}
                      className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                    </button>
                  </form>
                )}

                {/* LOGIN FORM */}
                {mode === 'login' && (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-zinc-700">
                          Email Address
                        </label>
                        {showEmailInvalid && (
                          <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-rose-500" />
                            Invalid email format
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${showEmailInvalid ? 'text-rose-500' : 'text-zinc-400'}`} />
                        <input
                          type="email"
                          required
                          value={email}
                          onBlur={() => setEmailTouched(true)}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          placeholder={showEmailInvalid ? "Please enter a valid email (e.g. name@example.com)" : "name@example.com"}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                            showEmailInvalid
                              ? 'border-rose-400 focus:border-rose-500 ring-2 ring-rose-100 bg-rose-50/20 text-rose-900 placeholder:text-rose-400 placeholder:font-medium'
                              : 'border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-zinc-900 placeholder:text-zinc-400'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-zinc-700">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => handleSwitchMode('forgot')}
                          className="text-xs text-indigo-600 hover:underline font-semibold"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="p-1 text-zinc-400 hover:text-zinc-600 absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || googleLoading}
                      className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                      <span>{loading ? 'Logging In...' : 'Log In'}</span>
                    </button>
                  </form>
                )}

                {/* FORGOT PASSWORD FORM */}
                {mode === 'forgot' && (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-zinc-700">
                          Registered Email Address
                        </label>
                        {showEmailInvalid && (
                          <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-rose-500" />
                            Invalid email format
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${showEmailInvalid ? 'text-rose-500' : 'text-zinc-400'}`} />
                        <input
                          type="email"
                          required
                          value={email}
                          onBlur={() => setEmailTouched(true)}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          placeholder={showEmailInvalid ? "Please enter a valid email (e.g. name@example.com)" : "name@example.com"}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                            showEmailInvalid
                              ? 'border-rose-400 focus:border-rose-500 ring-2 ring-rose-100 bg-rose-50/20 text-rose-900 placeholder:text-rose-400 placeholder:font-medium'
                              : 'border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-zinc-900 placeholder:text-zinc-400'
                          }`}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                      <span>{loading ? 'Sending Link...' : 'Send Reset Link'}</span>
                    </button>

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => handleSwitchMode('login')}
                        className="text-xs text-zinc-500 hover:text-zinc-800 font-semibold"
                      >
                        ← Back to Log In
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>

          {/* Footer Switcher */}
          {!accountCreatedSuccess && (
            <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 text-center shrink-0">
              {mode === 'signup' ? (
                <p className="text-xs text-zinc-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('login')}
                    className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
                  >
                    Log in
                  </button>
                </p>
              ) : mode === 'login' ? (
                <p className="text-xs text-zinc-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('signup')}
                    className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              ) : null}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

