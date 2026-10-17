import React, { Component, useState, useEffect, useRef, ReactNode, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet, useOutletContext, Link } from 'react-router-dom';
import { SeoMeta } from './components/SeoMeta';
import { InterviewQuestionsHub, InterviewQuestionsTrack, InterviewQuestionDetail } from './components/questions/InterviewQuestions';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LessonDetail } from './components/LessonDetail';
import { About } from './components/About';
import { LandingPage } from './components/LandingPage';
import { Resources } from './components/Resources';
import { ToolsHub } from './components/ToolsHub';
import { LinkedInOptimiser } from './components/LinkedInOptimiser';
import { ResumeAuditor } from './components/ResumeAuditor';
import { InterviewHub } from './components/interview/InterviewHub';
import { InterviewComingSoon } from './components/interview/InterviewComingSoon';
import { isAiInterviewEnabled, isAiPmCourseEnabled } from './lib/featureFlags';

import { ProjectsHub } from './components/projects/ProjectsHub';
import { ProjectDetail } from './components/projects/ProjectDetail';
import { AssignmentDetail } from './components/assignments/AssignmentDetail';
import { JobsBoard } from './components/jobs/JobsBoard';
import { Profile } from './components/Profile';
import { Onboarding } from './components/auth/Onboarding';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthActionPage } from './components/auth/AuthActionPage';
import { Menu, X, AlertTriangle, Loader2 } from 'lucide-react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Logo } from './components/Logo';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SaveDetailsModal } from './components/auth/SaveDetailsModal';
import { useScrollReveal } from './components/motion/useScrollReveal';
import { VerifyEmailGate } from './components/auth/VerifyEmailGate';

// The live site shows a Coming soon page until the AI interview is switched on (see lib/featureFlags.ts).
const interviewStudio = isAiInterviewEnabled ? <InterviewHub /> : <InterviewComingSoon />;

// The PM → AI PM course is local-only: its code is only loaded when switched on, and the live
// site sends /ai-pm to the dashboard (see lib/featureFlags.ts).
const AiPmCourse = isAiPmCourseEnabled ? lazy(() => import('./components/aipm/AiPmCourse')) : null;
const aiPmCourse = AiPmCourse ? (
    <Suspense fallback={<div className="flex justify-center py-24"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>}>
        <AiPmCourse />
    </Suspense>
) : <Navigate to="/dashboard" replace />;

// Action Link Redirector to catch Firebase direct action queries (e.g. ?mode=verifyEmail&oobCode=...)
const AuthActionRedirector = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (window.location.search) {
      const searchParams = new URLSearchParams(window.location.search);
      const mode = searchParams.get('mode');
      const oobCode = searchParams.get('oobCode');

      if (mode && oobCode && !location.pathname.includes('/auth/action')) {
        navigate(`/auth/action${window.location.search}`, { replace: true });
      }
    }
  }, [location, navigate]);

  return null;
};

// GA4 Tracker Component to handle SPA page views
const GAPageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'G-217YK7FW0Y', {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
};

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * ErrorBoundary class component to catch rendering errors in the app.
 * Using Component generic to ensure 'props' and 'state' are correctly typed.
 */
// Fix: Extending React.Component directly ensures 'state' and 'props' are correctly inherited and recognized by the TypeScript compiler
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: any): ErrorBoundaryState { 
    return { hasError: true }; 
  }

  public render() {
    // Fix: Accessing state via correctly typed React.Component instance
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-white rounded-3xl border border-zinc-200">
          <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
          <h2 className="text-xl font-black text-zinc-900">Something went wrong</h2>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold">Refresh App</button>
        </div>
      );
    }
    
    // Fix: Accessing props via correctly typed React.Component instance
    return this.props.children || null;
  }
}

const MainShell = () => {
    const { user, loading, isEmailVerified } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const location = useLocation();
    const scrollContainerRef = useRef<HTMLElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);
    // Scroll reveals for every page in the shell (pages mark elements with data-reveal; see useScrollReveal).
    // Dashboard category tabs are separate routes but one page, so they share a key.
    // While the session loads or the email gate shows, the page wrapper is not on screen yet.
    const pageKey = loading || (user && !isEmailVerified)
        ? 'waiting'
        : location.pathname.startsWith('/dashboard') && !location.pathname.includes('/day/')
            ? '/dashboard'
            : location.pathname;
    useScrollReveal(pageRef, { scrollerRef: scrollContainerRef, resetKey: pageKey });
    
    useEffect(() => {
        // When navigating to general pages (dashboard, profile, tools, etc.), scroll to top.
        // For day lessons, let LessonDetail restore the user's exact persisted reading position.
        if (scrollContainerRef.current && !location.pathname.includes('/day/')) {
            scrollContainerRef.current.scrollTo(0, 0);
        }
        setMobileOpen(false);
    }, [location.pathname]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                        Loading session...
                    </span>
                </div>
            </div>
        );
    }

    // Strict Gate: If a user is signed in but has not verified their email, enforce VerifyEmailGate across the app
    if (user && !isEmailVerified) {
        return <VerifyEmailGate from={location.pathname} />;
    }
    
    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
            {!isFocusMode && (
                <Sidebar 
                    mobileOpen={mobileOpen} 
                    setMobileOpen={setMobileOpen} 
                    collapsed={isCollapsed}
                    setCollapsed={setIsCollapsed}
                />
            )}
            <div className="flex-1 flex flex-col min-w-0 h-full relative">
                {!isFocusMode && (
                    <header className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-2.5 flex items-center justify-between shrink-0 z-30 sticky top-0">
                        {/* Left Side: Logo with mobile-only hamburger */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/80 shadow-2xs cursor-pointer flex items-center justify-center shrink-0"
                                aria-label="Open menu"
                                title="Open menu"
                            >
                                <Menu className="w-5 h-5 text-slate-700" />
                            </button>

                            <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
                                <Logo className="w-8 h-8 shrink-0" />
                                <div>
                                    <span className="font-black text-sm text-slate-900 tracking-tight block leading-none">The NooB PM</span>
                                    <span className="text-[8px] font-black text-emerald-600 uppercase tracking-wider block mt-0.5">ONE-STOP PM SOLUTION</span>
                                </div>
                            </Link>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-2">
                            {/* Clean header right side */}
                        </div>
                    </header>
                )}
                <main ref={scrollContainerRef} className="flex-1 overflow-y-auto scroll-smooth">
                    <div ref={pageRef} className="w-full min-h-full">
                        <ErrorBoundary>
                            <Outlet context={{ isCollapsed, isFocusMode, setIsFocusMode }} />
                        </ErrorBoundary>
                    </div>
                </main>
            </div>
        </div>
    );
};

const LessonLayout = () => {
    const location = useLocation();
    const context = useOutletContext();
    return (
        <AnimatePresence mode="wait">
            <div key={location.pathname} className="h-full">
                <Outlet context={context} />
            </div>
        </AnimatePresence>
    );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      {/* Respect the visitor's reduced-motion setting for every framer-motion animation. */}
      <MotionConfig reducedMotion="user">
      <Router>
         <GAPageTracker />
         <SeoMeta />
         <AuthActionRedirector />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            {/* Custom Firebase Auth Action Handler (Verification, Password Reset) */}
            <Route path="/auth/action" element={<AuthActionPage />} />

            {/* Dedicated Onboarding Route */}
            <Route 
              path="/onboarding" 
              element={
                <ProtectedRoute requireOnboarding={false}>
                  <Onboarding />
                </ProtectedRoute>
              } 
            />

            {/* App Shell Wrapper for Dashboard, Tools, Profile, and Resources */}
            <Route element={<MainShell />}>
                {/* User Profile & Account Settings */}
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />

                {/* Dashboard & All Modules Routes */}
                <Route path="/modules" element={<Navigate to="/dashboard" replace />} />
                <Route 
                  path="/dashboard"
                  element={<Outlet />}
                >
                    <Route index element={<Dashboard />} />
                    <Route path="about" element={<About />} />
                    <Route path="foundations" element={<Dashboard />} />
                    <Route path="research" element={<Dashboard />} />
                    <Route path="strategy" element={<Dashboard />} />
                    <Route path="data" element={<Dashboard />} />
                    <Route path="tech" element={<Dashboard />} />
                    <Route path="ai" element={<Dashboard />} />
                    <Route path="design" element={<Dashboard />} />
                    <Route path="jobready" element={<Dashboard />} />
                    <Route element={<LessonLayout />}>
                        <Route path="day/:id" element={<LessonDetail />} />
                    </Route>
                </Route>

                {/* Top-level Resources Routes */}
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/assignments/:slug" element={<AssignmentDetail />} />

                {/* AI Mock Interview Studio Routes */}
                <Route path="/interview-studio" element={interviewStudio} />
                <Route path="/practice" element={interviewStudio} />
                <Route path="/resume-auditor" element={<ResumeAuditor />} />

                {/* PM → AI PM course (local only) */}
                <Route path="/ai-pm/*" element={aiPmCourse} />

                {/* Real-World PM Projects Routes */}
                <Route path="/projects" element={<ProjectsHub />} />
                <Route path="/projects/:projectId" element={<ProjectDetail />} />

                {/* Public PM interview questions with sample answers */}
                <Route path="/interview-questions" element={<InterviewQuestionsHub />} />
                <Route path="/interview-questions/:trackSlug" element={<InterviewQuestionsTrack />} />
                <Route path="/interview-questions/:trackSlug/:questionSlug" element={<InterviewQuestionDetail />} />

                {/* PM Jobs board */}
                <Route path="/jobs" element={<JobsBoard />} />
                <Route path="/linkedin" element={<Navigate to="/tools/linkedin-optimiser" replace />} />

                {/* Career Tools Suite Routes */}
                <Route path="/tools">
                    {/* Publicly accessible Tools Hub */}
                    <Route index element={<ToolsHub />} />
                    {/* Publicly accessible Career Tools */}
                    <Route path="linkedin-optimiser" element={<LinkedInOptimiser />} />
                    <Route path="resume-auditor" element={<ResumeAuditor />} />
                    <Route path="interview-studio" element={interviewStudio} />
                    <Route path="practice" element={interviewStudio} />
                    <Route 
                      path="profile" 
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } 
                    />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
         <Analytics />
         <SaveDetailsModal />
      </Router>
      </MotionConfig>
    </AuthProvider>
  );
};

export default App;