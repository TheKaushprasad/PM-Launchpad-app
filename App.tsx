import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LessonDetail } from './components/LessonDetail';
import { About } from './components/About';
import { LandingPage } from './components/LandingPage';
import { Menu, X, AlertTriangle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Logo } from './components/Logo';
import { Analytics } from '@vercel/analytics/react';

// GA4 Tracker Component to handle SPA page views
const GAPageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Ensure gtag is defined (loaded from index.html) before calling
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'G-217YK7FW0Y', {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
};

// Added explicit interfaces to resolve type inference issues in ErrorBoundary
interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Simplified Error Boundary for React 19
// Use React.Component explicitly to ensure props are correctly typed and available for 'this.props'
// Fix: Property 'props' does not exist on type 'ErrorBoundary' by extending React.Component directly
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  // Removed redundant constructor to prevent potential shadowing issues with props

  static getDerivedStateFromError(): ErrorBoundaryState { 
    return { hasError: true }; 
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-white rounded-3xl border border-zinc-200">
          <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
          <h2 className="text-xl font-black text-zinc-900">Something went wrong</h2>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold">Refresh App</button>
        </div>
      );
    }
    // Access children through this.props to render nested routes
    // Fixed: return this.props.children or null to satisfy ReactNode return type requirements
    return this.props.children || null;
  }
}

const MainShell = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const scrollContainerRef = useRef<HTMLElement>(null);
    
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo(0, 0);
        }
        setMobileOpen(false);
    }, [location.pathname]);
    
    return (
        <div className="flex h-screen bg-zinc-50 text-zinc-900 font-sans overflow-hidden">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <div className="flex-1 flex flex-col min-w-0 h-full relative">
                <header className="md:hidden bg-white/80 backdrop-blur-md border-b border-zinc-200 p-4 flex items-center justify-between flex-shrink-0 z-30 sticky top-0">
                    <div className="flex items-center gap-2">
                        <Logo className="w-8 h-8" />
                        <span className="font-bold text-lg text-zinc-800 tracking-tight">The NooB PM</span>
                    </div>
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-full">
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </header>
                <main ref={scrollContainerRef} className="flex-1 overflow-y-auto scroll-smooth">
                    <div className="max-w-7xl mx-auto w-full p-4 md:p-8 pb-20">
                        <ErrorBoundary>
                            <Outlet />
                        </ErrorBoundary>
                    </div>
                </main>
            </div>
        </div>
    );
};

const LessonLayout = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <div key={location.pathname} className="h-full">
                <Outlet />
            </div>
        </AnimatePresence>
    );
};

const App: React.FC = () => {
  return (
      <>
        <Router>
           <GAPageTracker />
           <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<MainShell />}>
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
              <Route path="*" element={<Navigate to="/" replace />} />
           </Routes>
        </Router>
        <Analytics />
      </>
  );
};

export default App;