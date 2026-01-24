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

// Last-resort Error Boundary to prevent white screen
// Fix: Added optional children to Props and explicitly declared state and props to fix property existence errors
class ErrorBoundary extends React.Component<{ children?: React.ReactNode }, { hasError: boolean }> {
  // Fix: Explicitly declare state and props to resolve property existence errors on lines 16, 20, and 30
  public state: { hasError: boolean };
  public props: { children?: React.ReactNode };

  constructor(props: { children?: React.ReactNode }) {
    super(props);
    // Fix: state initialization
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    // Fix: state access
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-white rounded-3xl border border-zinc-200">
          <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
          <h2 className="text-xl font-black text-zinc-900">Something went wrong</h2>
          <p className="text-zinc-500 mb-6 font-medium">The dashboard failed to load. Please refresh the page.</p>
          <button onClick={() => window.location.reload()} className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold">Refresh App</button>
        </div>
      );
    }
    // Fix: props access
    return this.props.children;
  }
}

// Layout Component containing Sidebar and Outlet
const Layout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const scrollContainerRef = useRef<HTMLElement>(null);
    
    // CRITICAL: Reset scroll of the custom container on every route change
    // This prevents the "blank screen" illusion caused by being scrolled to the bottom
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo(0, 0);
        }
        setMobileOpen(false); // Auto-close sidebar on navigation
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
                    <button 
                        onClick={() => setMobileOpen(!mobileOpen)} 
                        className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </header>
                <main ref={scrollContainerRef} className="flex-1 overflow-y-auto scroll-smooth">
                    <div className="max-w-7xl mx-auto w-full p-4 md:p-8 pb-20">
                        <ErrorBoundary>
                            <AnimatePresence mode="wait">
                               <div key={location.pathname} className="h-full">
                                  <Outlet />
                               </div>
                            </AnimatePresence>
                        </ErrorBoundary>
                    </div>
                </main>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  return (
      <Router>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="about" element={<About />} />
                <Route path="day/:id" element={<LessonDetail />} />
                {/* Specific Category Routes - Mapping to Dashboard with defensive filtering */}
                <Route path="foundations" element={<Dashboard />} />
                <Route path="research" element={<Dashboard />} />
                <Route path="strategy" element={<Dashboard />} />
                <Route path="data" element={<Dashboard />} />
                <Route path="tech" element={<Dashboard />} />
                <Route path="ai" element={<Dashboard />} />
                <Route path="design" element={<Dashboard />} />
                <Route path="jobready" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
      </Router>
  );
};

export default App;