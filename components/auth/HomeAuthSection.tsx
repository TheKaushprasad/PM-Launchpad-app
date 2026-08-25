import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, User as UserIcon, GraduationCap, Briefcase, 
  Building2, Calendar, Award, Sparkles, AlertCircle, 
  Eye, EyeOff, Loader2, ArrowRight, CheckCircle2, ShieldCheck, RefreshCw
} from 'lucide-react';
import { useAuth, UserType, SignUpParams, isValidEmail } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const HomeAuthSection: React.FC = () => {
  const navigate = useNavigate();
  const { 
    user, 
    userProfile, 
    signInWithEmail, 
    signUpWithEmail, 
    signInWithGoogle, 
    resetPassword,
    sendVerificationEmail,
    logout 
  } = useAuth();

  const [mode, setMode] = useState<'signup' | 'login' | 'forgot'>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [accountCreatedSuccess, setAccountCreatedSuccess] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Signup fields
  const [userType, setUserType] = useState<UserType>('student');

  // Student specific
  const [collegeName, setCollegeName] = useState('');
  const [degree, setDegree] = useState('');
  const [graduationYear, setGraduationYear] = useState('2025');

  // Professional specific
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [experienceYears, setExperienceYears] = useState('1-3 years');

  const showEmailInvalid = emailTouched && (!email.trim() || !isValidEmail(email));

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (errorMessage && errorMessage.toLowerCase().includes('email')) {
      setErrorMessage(null);
    }
  };

  const parseFirebaseError = (err: any): string => {
    const code = err?.code || '';
    if (code === 'auth/operation-not-allowed') {
      return 'Email/Password accounts are not enabled yet in this Firebase project. Click "Continue with Google" below for instant 1-click access!';
    }
    if (code === 'auth/email-already-in-use') {
      return 'An account with this email already exists. Please sign in instead.';
    }
    if (code === 'auth/invalid-email') {
      return 'Please enter a valid email address.';
    }
    if (code === 'auth/weak-password') {
      return 'Password must be at least 6 characters long.';
    }
    if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
      return 'Incorrect email or password. Please verify your credentials.';
    }
    if (code === 'auth/popup-closed-by-user') {
      return 'Google sign-in popup was closed before completing.';
    }
    if (code === 'auth/too-many-requests') {
      return 'Too many attempts. Please try again later or reset your password.';
    }
    return err?.message || 'Authentication error. Please try again.';
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
      setSuccessMessage('Signed in successfully! Redirecting to Dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 600);
    } catch (err: any) {
      setErrorMessage(parseFirebaseError(err));
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
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (userType === 'student') {
      if (!collegeName.trim()) {
        setErrorMessage('Please enter your college / university name.');
        return;
      }
      if (!degree.trim()) {
        setErrorMessage('Please enter your degree / major.');
        return;
      }
    } else {
      if (!companyName.trim()) {
        setErrorMessage('Please enter your current or target company.');
        return;
      }
      if (!designation.trim()) {
        setErrorMessage('Please enter your designation / role.');
        return;
      }
    }

    const payload: SignUpParams = {
      name: name.trim(),
      email: email.trim(),
      password,
      userType,
      ...(userType === 'student' ? {
        collegeName: collegeName.trim(),
        degree: degree.trim(),
        graduationYear: graduationYear.trim()
      } : {
        companyName: companyName.trim(),
        designation: designation.trim(),
        experienceYears
      })
    };

    setLoading(true);
    try {
      await signUpWithEmail(payload);
      setSuccessMessage('Account created and verification email dispatched!');
      setAccountCreatedSuccess(true);
    } catch (err: any) {
      setErrorMessage(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendingEmail(true);
    setResendStatus(null);
    try {
      await sendVerificationEmail();
      setResendStatus('Verification email resent! Please check your inbox.');
    } catch (err: any) {
      setResendStatus(parseFirebaseError(err));
    } finally {
      setResendingEmail(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setGoogleLoading(true);

    try {
      const additionalProfile: Partial<SignUpParams> = {
        name: name.trim(),
        userType,
        ...(userType === 'student' ? {
          collegeName: collegeName.trim(),
          degree: degree.trim(),
          graduationYear: graduationYear.trim()
        } : {
          companyName: companyName.trim(),
          designation: designation.trim(),
          experienceYears
        })
      };

      await signInWithGoogle(additionalProfile);
      setSuccessMessage('Authenticated with Google!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 600);
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        setErrorMessage(parseFirebaseError(err));
      }
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
      setSuccessMessage('Password reset instructions sent to your email.');
    } catch (err: any) {
      setErrorMessage(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  // If user is already authenticated, show personalized status card
  if (user) {
    return (
      <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="w-12 h-12 rounded-full border-2 border-indigo-200 object-cover" 
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-black text-base flex items-center justify-center">
                {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-zinc-900 leading-tight">
                  {user.displayName || 'PM Aspiring Talent'}
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Active
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Background Details */}
        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-wider">Profile Category</span>
            <span className="font-bold text-zinc-800 flex items-center gap-1">
              {userProfile?.userType === 'professional' ? (
                <>
                  <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                  Working Professional
                </>
              ) : (
                <>
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  College Student
                </>
              )}
            </span>
          </div>

          {userProfile?.userType === 'student' && userProfile.collegeName && (
            <div className="flex items-center justify-between pt-1 border-t border-zinc-200/50">
              <span className="text-zinc-500">Institution & Batch:</span>
              <span className="font-semibold text-zinc-900 truncate max-w-[200px]">
                {userProfile.collegeName} ({userProfile.graduationYear || '2025'})
              </span>
            </div>
          )}

          {userProfile?.userType === 'professional' && userProfile.companyName && (
            <div className="flex items-center justify-between pt-1 border-t border-zinc-200/50">
              <span className="text-zinc-500">Company & Role:</span>
              <span className="font-semibold text-zinc-900 truncate max-w-[200px]">
                {userProfile.designation || 'PM'} @ {userProfile.companyName}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={logout}
            className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs sm:text-sm font-bold rounded-xl transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="home-auth-section" className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-xl space-y-5 relative overflow-hidden">
      {/* Top Banner & Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              PM Fast Pass
            </span>
            <h3 className="text-lg sm:text-xl font-black text-zinc-900 tracking-tight mt-1">
              {mode === 'signup' ? 'Start Your 45-Day Track' : mode === 'login' ? 'Welcome Back, PM' : 'Reset Password'}
            </h3>
          </div>
        </div>

        {mode !== 'forgot' && (
          <div className="flex p-1 bg-zinc-100 rounded-2xl border border-zinc-200/80">
            <button
              type="button"
              id="home-tab-signup"
              onClick={() => { setMode('signup'); setErrorMessage(null); setSuccessMessage(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'signup' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              id="home-tab-login"
              onClick={() => { setMode('login'); setErrorMessage(null); setSuccessMessage(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'login' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Verification State or Notifications */}
      {accountCreatedSuccess ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-4 text-center space-y-4 flex flex-col items-center justify-center"
        >
          <div className="relative">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100/50">
              <Mail className="w-7 h-7 text-indigo-600 animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center ring-2 ring-white">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-1.5 max-w-xs mx-auto">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-[10px] font-bold">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Verification Email Sent</span>
            </div>
            <h4 className="text-base font-black text-zinc-900 tracking-tight">
              Verify Your Email Address
            </h4>
            <p className="text-xs text-zinc-600 font-normal leading-relaxed">
              We sent a verification link to{' '}
              <span className="font-bold text-zinc-900 bg-zinc-100 px-1.5 py-0.5 rounded break-all">
                {email || 'your email'}
              </span>.
              Click the link to verify your account and unlock access.
            </p>
          </div>

          <AnimatePresence>
            {resendStatus && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="w-full max-w-xs p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{resendStatus}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full space-y-2 pt-1">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>Continue to Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              disabled={resendingEmail}
              onClick={handleResendVerification}
              className="w-full py-2 px-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              {resendingEmail ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5 text-zinc-500" />
              )}
              <span>{resendingEmail ? 'Sending Link...' : 'Resend Verification Email'}</span>
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Notifications */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium space-y-2.5"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{errorMessage}</span>
                </div>
                {mode !== 'forgot' && (
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    disabled={googleLoading}
                    className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Continue with Google 1-Tap</span>
                  </button>
                )}
              </motion.div>
            )}

            {successMessage && !accountCreatedSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Google 1-Tap Auth */}
          {mode !== 'forgot' && (
            <div className="space-y-3">
              <button
                type="button"
                id="home-google-btn"
                onClick={handleGoogleAuth}
                disabled={googleLoading || loading}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center gap-2.5 shadow-xs hover:border-zinc-300 transition-all cursor-pointer disabled:opacity-50"
              >
                {googleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>{mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-zinc-200 w-full" />
                <span className="bg-white px-2.5 text-[9px] uppercase font-bold tracking-widest text-zinc-400 absolute">
                  or with credentials
                </span>
              </div>
            </div>
          )}

          {/* SIGN UP FORM */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              {/* 1. Name */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-zinc-700 flex items-center gap-1">
                  <UserIcon className="w-3 h-3 text-zinc-400" />
                  <span>Full Name <span className="text-rose-500">*</span></span>
                </label>
                <input
                  type="text"
                  id="home-signup-name"
                  required
                  placeholder="e.g. Kaushal Prasad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* 2. Email with placeholder and border highlight */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold text-zinc-700 flex items-center gap-1">
                    <Mail className={`w-3 h-3 ${showEmailInvalid ? 'text-rose-500' : 'text-zinc-400'}`} />
                    <span>Email Address <span className="text-rose-500">*</span></span>
                  </label>
                  {showEmailInvalid && (
                    <span className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5" />
                      Invalid email
                    </span>
                  )}
                </div>
                <input
                  type="email"
                  id="home-signup-email"
                  required
                  value={email}
                  onBlur={() => setEmailTouched(true)}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder={showEmailInvalid ? "Please enter a valid email (e.g. name@example.com)" : "name@example.com"}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium focus:outline-none transition-all ${
                    showEmailInvalid
                      ? 'bg-rose-50/30 border border-rose-400 text-rose-900 placeholder:text-rose-400 placeholder:font-medium ring-2 ring-rose-100'
                      : 'bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500'
                  }`}
                />
              </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-zinc-700 flex items-center gap-1">
              <Lock className="w-3 h-3 text-zinc-400" />
              <span>Password <span className="text-rose-500">*</span></span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="home-signup-password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 focus:outline-none focus:border-indigo-500 pr-9"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* 3. College student / Working professional */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-[11px] font-bold text-zinc-700">
              Current Background <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="home-type-student"
                onClick={() => setUserType('student')}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                  userType === 'student'
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-600 text-xs font-medium'
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${userType === 'student' ? 'text-indigo-600' : 'text-zinc-400'}`} />
                <span className="text-xs">College Student</span>
              </button>

              <button
                type="button"
                id="home-type-professional"
                onClick={() => setUserType('professional')}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                  userType === 'professional'
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-600 text-xs font-medium'
                }`}
              >
                <Briefcase className={`w-4 h-4 ${userType === 'professional' ? 'text-indigo-600' : 'text-zinc-400'}`} />
                <span className="text-xs">Working Pro</span>
              </button>
            </div>
          </div>

          {/* 4. College student details */}
          {userType === 'student' && (
            <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-xl space-y-2.5">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-zinc-700 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-indigo-500" />
                  <span>College Name <span className="text-rose-500">*</span></span>
                </label>
                <input
                  type="text"
                  id="home-signup-college"
                  required
                  placeholder="e.g. IIT Delhi, Stanford, BITS"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-zinc-700 flex items-center gap-1">
                    <Award className="w-3 h-3 text-indigo-500" />
                    <span>Degree <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    id="home-signup-degree"
                    required
                    placeholder="e.g. B.Tech CS, MBA"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-zinc-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-indigo-500" />
                    <span>Grad Year <span className="text-rose-500">*</span></span>
                  </label>
                  <select
                    id="home-signup-grad-year"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 focus:outline-none focus:border-indigo-500"
                  >
                    {['2024', '2025', '2026', '2027', '2028', '2029'].map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 5. Working Professional details */}
          {userType === 'professional' && (
            <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-xl space-y-2.5">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-zinc-700 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-indigo-500" />
                  <span>Company Name <span className="text-rose-500">*</span></span>
                </label>
                <input
                  type="text"
                  id="home-signup-company"
                  required
                  placeholder="e.g. Amazon, Infosys, Tech Startup"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-zinc-700 flex items-center gap-1">
                    <Award className="w-3 h-3 text-indigo-500" />
                    <span>Designation <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    id="home-signup-designation"
                    required
                    placeholder="e.g. Developer, APM"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-zinc-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-indigo-500" />
                    <span>Experience <span className="text-rose-500">*</span></span>
                  </label>
                  <select
                    id="home-signup-exp"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 focus:outline-none focus:border-indigo-500"
                  >
                    {['0-1 years', '1-3 years', '3-5 years', '5-8 years', '8+ years'].map((exp) => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            id="home-submit-signup"
            disabled={loading || googleLoading}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Registering Account...</span>
              </>
            ) : (
              <>
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {/* LOGIN FORM */}
      {mode === 'login' && (
        <form onSubmit={handleLogin} className="space-y-3.5">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold text-zinc-700 flex items-center gap-1">
                <Mail className={`w-3 h-3 ${showEmailInvalid ? 'text-rose-500' : 'text-zinc-400'}`} />
                <span>Email Address</span>
              </label>
              {showEmailInvalid && (
                <span className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5" />
                  Invalid format
                </span>
              )}
            </div>
            <input
              type="email"
              id="home-login-email"
              required
              value={email}
              onBlur={() => setEmailTouched(true)}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder={showEmailInvalid ? "Please enter a valid email (e.g. name@example.com)" : "name@example.com"}
              className={`w-full px-3 py-2 rounded-xl text-xs font-medium focus:outline-none transition-all ${
                showEmailInvalid
                  ? 'bg-rose-50/30 border border-rose-400 text-rose-900 placeholder:text-rose-400 placeholder:font-medium ring-2 ring-rose-100'
                  : 'bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500'
              }`}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold text-zinc-700 flex items-center gap-1">
                <Lock className="w-3 h-3 text-zinc-400" />
                <span>Password</span>
              </label>
              <button
                type="button"
                onClick={() => { setMode('forgot'); setErrorMessage(null); setSuccessMessage(null); }}
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="home-login-password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 focus:outline-none focus:border-indigo-500 pr-9"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            id="home-submit-login"
            disabled={loading || googleLoading}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {/* FORGOT FORM */}
      {mode === 'forgot' && (
        <form onSubmit={handleForgotPassword} className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold text-zinc-700 flex items-center gap-1">
                <Mail className={`w-3 h-3 ${showEmailInvalid ? 'text-rose-500' : 'text-zinc-400'}`} />
                <span>Registered Email</span>
              </label>
              {showEmailInvalid && (
                <span className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5" />
                  Invalid format
                </span>
              )}
            </div>
            <input
              type="email"
              id="home-forgot-email"
              required
              value={email}
              onBlur={() => setEmailTouched(true)}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder={showEmailInvalid ? "Please enter a valid email (e.g. name@example.com)" : "name@example.com"}
              className={`w-full px-3 py-2 rounded-xl text-xs font-medium focus:outline-none transition-all ${
                showEmailInvalid
                  ? 'bg-rose-50/30 border border-rose-400 text-rose-900 placeholder:text-rose-400 placeholder:font-medium ring-2 ring-rose-100'
                  : 'bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Send Reset Instructions</span>}
          </button>

          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(null); setSuccessMessage(null); }}
            className="w-full text-center text-xs font-bold text-zinc-500 hover:text-zinc-800"
          >
            Back to Sign In
          </button>
        </form>
      )}
        </>
      )}
    </div>
  );
};
