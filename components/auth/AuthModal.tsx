import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  X, Mail, Lock, User as UserIcon, GraduationCap, Briefcase, 
  Building2, Sparkles, AlertCircle, 
  Eye, EyeOff, Loader2, ArrowRight, ArrowLeft, CheckCircle2, RefreshCw, Check
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
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
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
      setSignupStep(1);
      setErrorMessage(null);
      setSuccessMessage(null);
      setAccountCreatedSuccess(false);
      setEmailTouched(false);
      setResendStatus(null);
      setLoading(false);
      setGoogleLoading(false);
    }
  }, [isOpen, initialMode]);

  // Common fields (Step 1)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Personalization fields (Step 2)
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

  // Password requirement checks
  const hasMinLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasNumber;

  // Email format evaluation
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
    setSignupStep(1);
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

  // Validate Step 1 before advancing to Step 2
  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
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
      setErrorMessage('Please enter a valid email address (e.g. name@example.com).');
      return;
    }
    if (!hasMinLength) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    if (!hasNumber) {
      setErrorMessage('Password must contain at least one number.');
      return;
    }

    setSignupStep(2);
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
    } else {
      if (!designation.trim()) {
        setErrorMessage('Please enter your current role / designation.');
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
          companyName: companyName.trim() || undefined,
          designation: designation.trim(),
          yearsOfExperience,
          experienceYears: yearsOfExperience
        }),
        targetRole: finalTargetRole,
        industry: finalIndustry
      };

      await signUpWithEmail(params);
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
        name: name.trim() || undefined,
        userType,
        ...(isStudent ? {
          collegeName: collegeName.trim() || undefined,
          degree: degree.trim() || undefined,
          passingOutYear: passingOutYear.trim() || '2026',
          graduationYear: passingOutYear.trim() || '2026'
        } : {
          companyName: companyName.trim() || undefined,
          designation: designation.trim() || undefined,
          yearsOfExperience: yearsOfExperience || '1-3 years',
          experienceYears: yearsOfExperience || '1-3 years'
        }),
        targetRole: finalTargetRole,
        industry: finalIndustry
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

  const firstName = name.trim().split(' ')[0] || 'there';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop: Slightly lighter & blurred for comfortable SaaS focus */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window: Optimized dimensions (width ~480-510px, max-height 90vh) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-[490px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-zinc-200/90 overflow-hidden my-4 sm:my-6 z-10 max-h-[90vh] flex flex-col"
        >
          {/* Fixed Header */}
          <div className="relative px-5 sm:px-6 pt-5 pb-4 border-b border-zinc-100 flex items-center justify-between shrink-0 bg-zinc-50/70">
            <div className="flex items-center gap-3 pr-2">
              <Logo className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="text-base font-extrabold text-zinc-900 tracking-tight leading-tight">
                  {accountCreatedSuccess
                    ? `You're all set, ${firstName}!`
                    : mode === 'signup'
                      ? (signupStep === 1 ? 'Start your PM journey' : 'Personalize your journey')
                      : mode === 'login'
                        ? 'Welcome Back'
                        : 'Reset Password'}
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 font-normal leading-tight mt-0.5">
                  {accountCreatedSuccess
                    ? 'Your 45-day PM journey starts now.'
                    : mode === 'signup'
                      ? (signupStep === 1 
                          ? 'Create your account to save your progress and personalize your learning path.'
                          : 'Tailor your interview prep, case studies, and recommendations.')
                      : mode === 'login'
                        ? 'Sign in to continue your product management prep.'
                        : 'Enter your email to receive recovery instructions.'}
                </p>
              </div>
            </div>
            
            {/* Close Button: 32x32px with subtle hover */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/70 rounded-full transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step Progress Indicator (Only in signup mode before success) */}
          {mode === 'signup' && !accountCreatedSuccess && (
            <div className="px-6 py-2.5 bg-zinc-50/40 border-b border-zinc-100/80 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className={`font-bold ${signupStep === 1 ? 'text-indigo-600' : 'text-zinc-400'}`}>
                  1 Create account
                </span>
                <span className="text-zinc-300">→</span>
                <span className={`font-bold ${signupStep === 2 ? 'text-indigo-600' : 'text-zinc-400'}`}>
                  2 Personalize
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Step {signupStep} of 2
                </span>
                <div className="flex gap-1">
                  <span className={`w-3.5 h-1.5 rounded-full transition-colors ${signupStep >= 1 ? 'bg-indigo-600' : 'bg-zinc-200'}`} />
                  <span className={`w-3.5 h-1.5 rounded-full transition-colors ${signupStep >= 2 ? 'bg-indigo-600' : 'bg-zinc-200'}`} />
                </div>
              </div>
            </div>
          )}

          {/* Modal Body: Smooth Scrollable Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
            {accountCreatedSuccess ? (
              /* Success & Welcoming State (Point 21) */
              <motion.div 
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-3 px-1 text-center space-y-5 flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-md shadow-emerald-100 border border-emerald-100">
                    <Sparkles className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center ring-2 ring-white">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2 max-w-sm mx-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-[11px] font-bold tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Account Active</span>
                  </div>
                  <h4 className="text-xl font-black text-zinc-900 tracking-tight">
                    You're all set, {firstName}!
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                    Your personalized PM curriculum and prep workspace are ready. We also dispatched a quick verification link to{' '}
                    <span className="font-semibold text-zinc-900 bg-zinc-100 px-1.5 py-0.5 rounded break-all">
                      {email || 'your email'}
                    </span>.
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

                <div className="w-full max-w-sm space-y-2.5 pt-1">
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
                    className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <span>START DAY 1 →</span>
                  </button>

                  <button
                    type="button"
                    disabled={resendingEmail}
                    onClick={handleResendVerification}
                    className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-600 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {resendingEmail ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                    ) : (
                      <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                    )}
                    <span>{resendingEmail ? 'Sending Link...' : 'Resend Verification Email'}</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Error Banner */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{errorMessage}</span>
                    </motion.div>
                  )}

                  {successMessage && !accountCreatedSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{successMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SIGNUP STEP 1: Quick Account Creation */}
                {mode === 'signup' && signupStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Google 1-Click Button (Point 5: Strongest option at the top) */}
                    <div>
                      <button
                        type="button"
                        id="google-auth-btn"
                        onClick={handleGoogleAuth}
                        disabled={googleLoading || loading}
                        className="w-full h-11 px-4 rounded-xl border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50/80 text-zinc-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xs transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
                      >
                        {googleLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                        ) : (
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                          </svg>
                        )}
                        <span>Continue with Google</span>
                      </button>

                      <div className="relative flex items-center justify-center my-3.5">
                        <div className="border-t border-zinc-200 w-full" />
                        <span className="bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400 shrink-0">
                          OR
                        </span>
                        <div className="border-t border-zinc-200 w-full" />
                      </div>
                    </div>

                    {/* Step 1 Email Signup Form */}
                    <form onSubmit={handleStep1Continue} className="space-y-3.5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                          Full name
                        </label>
                        <div className="relative">
                          <UserIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Kaushal Prasad"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs sm:text-sm outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-semibold text-zinc-700">
                            Email
                          </label>
                          {showEmailInvalid && (
                            <span className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
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
                            placeholder="name@example.com"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                              showEmailInvalid
                                ? 'border-rose-400 focus:border-rose-500 ring-2 ring-rose-100 bg-rose-50/20 text-rose-900'
                                : 'border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-zinc-900'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Password (Single field with show/hide toggle, Point 8 & 9) */}
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a strong password"
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs sm:text-sm outline-none transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            className="p-1 text-zinc-400 hover:text-zinc-600 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Dynamic Password Feedback (Point 8) */}
                        <div className="flex items-center gap-3 mt-1.5 text-[11px]">
                          <span className={`inline-flex items-center gap-1 transition-colors ${hasMinLength ? 'text-emerald-600 font-bold' : 'text-zinc-400'}`}>
                            <Check className={`w-3 h-3 ${hasMinLength ? 'text-emerald-600' : 'text-zinc-300'}`} />
                            8+ characters
                          </span>
                          <span className={`inline-flex items-center gap-1 transition-colors ${hasNumber ? 'text-emerald-600 font-bold' : 'text-zinc-400'}`}>
                            <Check className={`w-3 h-3 ${hasNumber ? 'text-emerald-600' : 'text-zinc-300'}`} />
                            Contains a number
                          </span>
                        </div>
                      </div>

                      {/* Step 1 Primary CTA Button (Point 7) */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                        >
                          <span>CONTINUE →</span>
                        </button>

                        {/* Reassurance line (Point 20) */}
                        <p className="text-center text-[11px] text-zinc-400 font-medium mt-2">
                          Free to get started · No credit card required
                        </p>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* SIGNUP STEP 2: Contextual Personalization (Points 3, 10, 11, 12, 13, 14, 15) */}
                {mode === 'signup' && signupStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* User Type Choice Cards (Point 10) */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-2">
                        I am a...
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setUserType('college_student')}
                          className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                            userType === 'student' || userType === 'college_student'
                              ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 ring-1 ring-indigo-500/20 font-bold shadow-xs'
                              : 'border-zinc-200 bg-white hover:border-zinc-300 text-zinc-700 font-medium'
                          }`}
                        >
                          <span className="text-lg">🎓</span>
                          <div className="leading-tight">
                            <span className="text-xs block">College Student</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setUserType('working_professional')}
                          className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                            userType === 'professional' || userType === 'working_professional'
                              ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 ring-1 ring-indigo-500/20 font-bold shadow-xs'
                              : 'border-zinc-200 bg-white hover:border-zinc-300 text-zinc-700 font-medium'
                          }`}
                        >
                          <span className="text-lg">💼</span>
                          <div className="leading-tight">
                            <span className="text-xs block">Working Pro</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Conditional Form Logic (Points 11 & 12: Reduced nesting, simple subtle divider) */}
                    <div className="border-t border-zinc-100 pt-3 space-y-3">
                      {(userType === 'student' || userType === 'college_student') ? (
                        <>
                          {/* College / University */}
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                              College / university
                            </label>
                            <div className="relative">
                              <Building2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                required
                                value={collegeName}
                                onChange={(e) => setCollegeName(e.target.value)}
                                placeholder="e.g. IIT Delhi, BITS Pilani, Stanford"
                                className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
                              />
                            </div>
                          </div>

                          {/* Degree & Passing Year */}
                          <div className="grid grid-cols-2 gap-2.5">
                            <div>
                              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                                Degree / major
                              </label>
                              <input
                                type="text"
                                required
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                                placeholder="e.g. B.Tech / MBA"
                                className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                                Passing year
                              </label>
                              <select
                                value={passingOutYear}
                                onChange={(e) => setPassingOutYear(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm outline-none focus:border-indigo-600 font-medium"
                              >
                                <option value="2024">2024 (Recent)</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028+</option>
                              </select>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Working Professional: Years of Experience & Current Role */}
                          <div className="grid grid-cols-2 gap-2.5">
                            <div>
                              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                                Years of experience
                              </label>
                              <select
                                value={yearsOfExperience}
                                onChange={(e) => setYearsOfExperience(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm outline-none focus:border-indigo-600 font-medium"
                              >
                                <option value="0-1 years">0-1 years</option>
                                <option value="1-3 years">1-3 years</option>
                                <option value="3-5 years">3-5 years</option>
                                <option value="5+ years">5+ years</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                                Current role
                              </label>
                              <input
                                type="text"
                                required
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                placeholder="e.g. Software Engineer"
                                className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
                              />
                            </div>
                          </div>

                          {/* Company Name (Optional) */}
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="block text-xs font-semibold text-zinc-700">
                                Current company
                              </label>
                              <span className="text-[10px] text-zinc-400 font-normal">Optional</span>
                            </div>
                            <div className="relative">
                              <Building2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="e.g. Microsoft, Flipkart, Startup"
                                className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Target Role & Industry (Points 14 & 15: Clean labels) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                            Target role
                          </label>
                          <select
                            value={targetRole}
                            onChange={(e) => setTargetRole(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm outline-none focus:border-indigo-600 font-medium"
                          >
                            {TARGET_ROLES.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                          {targetRole === 'Other' && (
                            <input
                              type="text"
                              placeholder="Specify target role"
                              value={customRole}
                              onChange={(e) => setCustomRole(e.target.value)}
                              className="mt-1.5 w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                            />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-semibold text-zinc-700">
                              Target industry
                            </label>
                            <span className="text-[10px] text-zinc-400 font-normal">Optional</span>
                          </div>
                          <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm outline-none focus:border-indigo-600 font-medium"
                          >
                            {INDUSTRIES.map((ind) => (
                              <option key={ind} value={ind}>{ind}</option>
                            ))}
                          </select>
                          {industry === 'Other' && (
                            <input
                              type="text"
                              placeholder="Specify industry"
                              value={customIndustry}
                              onChange={(e) => setCustomIndustry(e.target.value)}
                              className="mt-1.5 w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step 2 Actions */}
                    <div className="pt-2 space-y-2">
                      <button
                        type="button"
                        onClick={handleSignUp}
                        disabled={loading || googleLoading}
                        className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        <span>{loading ? 'Creating Account...' : 'CREATE MY ACCOUNT →'}</span>
                      </button>

                      <div className="flex items-center justify-between text-xs pt-1 px-1">
                        <button
                          type="button"
                          onClick={() => setSignupStep(1)}
                          className="text-zinc-500 hover:text-zinc-900 font-medium inline-flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back to account details</span>
                        </button>
                        <span className="text-[11px] text-zinc-400">Takes &lt; 30 seconds</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* LOGIN FORM */}
                {mode === 'login' && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="space-y-4"
                  >
                    {/* Google Login 1-Click */}
                    <div>
                      <button
                        type="button"
                        id="google-login-btn"
                        onClick={handleGoogleAuth}
                        disabled={googleLoading || loading}
                        className="w-full h-11 px-4 rounded-xl border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50/80 text-zinc-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xs transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
                      >
                        {googleLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                        ) : (
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                          </svg>
                        )}
                        <span>Continue with Google</span>
                      </button>

                      <div className="relative flex items-center justify-center my-3.5">
                        <div className="border-t border-zinc-200 w-full" />
                        <span className="bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400 shrink-0">
                          OR
                        </span>
                        <div className="border-t border-zinc-200 w-full" />
                      </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-3.5">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-semibold text-zinc-700">
                            Email
                          </label>
                          {showEmailInvalid && (
                            <span className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
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
                            placeholder="name@example.com"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                              showEmailInvalid
                                ? 'border-rose-400 focus:border-rose-500 ring-2 ring-rose-100 bg-rose-50/20 text-rose-900'
                                : 'border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-zinc-900'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-semibold text-zinc-700">
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={() => handleSwitchMode('forgot')}
                            className="text-[11px] text-indigo-600 hover:underline font-semibold cursor-pointer"
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
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs sm:text-sm outline-none transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            className="p-1 text-zinc-400 hover:text-zinc-600 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loading || googleLoading}
                          className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
                        >
                          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                          <span>{loading ? 'Logging In...' : 'LOG IN →'}</span>
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* FORGOT PASSWORD FORM */}
                {mode === 'forgot' && (
                  <motion.div
                    key="forgot"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="space-y-4"
                  >
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                          Registered Email Address
                        </label>
                        <div className="relative">
                          <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${showEmailInvalid ? 'text-rose-500' : 'text-zinc-400'}`} />
                          <input
                            type="email"
                            required
                            value={email}
                            onBlur={() => setEmailTouched(true)}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            placeholder="name@example.com"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-xs sm:text-sm outline-none transition-all"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                        <span>{loading ? 'Sending Link...' : 'SEND RESET LINK →'}</span>
                      </button>

                      <div className="text-center pt-1">
                        <button
                          type="button"
                          onClick={() => handleSwitchMode('login')}
                          className="text-xs text-zinc-500 hover:text-zinc-800 font-semibold cursor-pointer"
                        >
                          ← Back to Log In
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Fixed Footer Switcher */}
          {!accountCreatedSuccess && (
            <div className="px-5 sm:px-6 py-3.5 bg-zinc-50/70 border-t border-zinc-100 text-center shrink-0">
              {mode === 'signup' ? (
                <p className="text-xs text-zinc-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('login')}
                    className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
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
                    className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
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
