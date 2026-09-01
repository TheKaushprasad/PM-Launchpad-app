import React, { Component, useState, useEffect, useRef, ReactNode } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Outlet, useOutletContext } from 'react-router-dom';
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
import { Profile } from './components/Profile';
import { Onboarding } from './components/auth/Onboarding';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Menu, X, AlertTriangle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Logo } from './components/Logo';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './context/AuthContext';

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
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const location = useLocation();
    const scrollContainerRef = useRef<HTMLElement>(null);
    
    useEffect(() => {
        // When navigating to general pages (dashboard, profile, tools, etc.), scroll to top.
        // For day lessons, let LessonDetail restore the user's exact persisted reading position.
        if (scrollContainerRef.current && !location.pathname.includes('/day/')) {
            scrollContainerRef.current.scrollTo(0, 0);
        }
        setMobileOpen(false);
    }, [location.pathname]);
    
    return (
        <div className="flex h-screen bg-zinc-50 text-zinc-900 font-sans overflow-hidden">
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
                    <header className="md:hidden bg-white/80 backdrop-blur-md border-b border-zinc-200 p-4 flex items-center justify-between flex-shrink-0 z-30 sticky top-0">
                        <div className="flex items-center gap-2">
                            <Logo className="w-8 h-8" />
                            <span className="font-bold text-lg text-zinc-800 tracking-tight">The NooB PM</span>
                        </div>
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-full">
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </header>
                )}
                <main ref={scrollContainerRef} className="flex-1 overflow-y-auto scroll-smooth">
                    <div className="w-full min-h-full">
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
      <Router>
         <GAPageTracker />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            {/* Dedicated Onboarding Route */}
            <Route 
              path="/onboarding" 
              element={
                <ProtectedRoute requireOnboarding={false}>
                  <Onboarding />
                </ProtectedRoute>
              } 
            />

            {/* App Shell Wrapper for Dashboard, Tools, Profile, and Resources - Strictly Protected */}
            <Route 
              element={
                <ProtectedRoute>
                  <MainShell />
                </ProtectedRoute>
              }
            >
                {/* User Profile & Account Settings */}
                <Route path="/profile" element={<Profile />} />

                {/* Dashboard & All Modules Routes */}
                <Route path="/dashboard">
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

                {/* AI Mock Interview Studio Routes */}
                <Route path="/interview-studio" element={<InterviewHub />} />
                <Route path="/practice" element={<InterviewHub />} />
                <Route path="/resume-auditor" element={<ResumeAuditor />} />
                <Route path="/linkedin" element={<Navigate to="/tools/linkedin-optimiser" replace />} />

                {/* Career Tools Suite Routes */}
                <Route path="/tools">
                    <Route index element={<ToolsHub />} />
                    <Route path="linkedin-optimiser" element={<LinkedInOptimiser />} />
                    <Route path="resume-auditor" element={<ResumeAuditor />} />
                    <Route path="interview-studio" element={<InterviewHub />} />
                    <Route path="practice" element={<InterviewHub />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
         <Analytics />
      </Router>
    </AuthProvider>
  );
};

export default App;