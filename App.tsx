import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LessonDetail } from './components/LessonDetail';
import { About } from './components/About';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { ProfileSetup } from './components/auth/ProfileSetup';
import { EmailSent } from './components/auth/EmailSent';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

// Layout Component containing Sidebar and Outlet for nested routes
const Layout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    
    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <div className="flex-1 flex flex-col min-w-0 h-full relative">
                <header className="md:hidden bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between flex-shrink-0 z-30 sticky top-0">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">PM</div>
                        <span className="font-bold text-lg text-slate-800 tracking-tight">Launchpad</span>
                    </div>
                    <button 
                        onClick={() => setMobileOpen(!mobileOpen)} 
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto scroll-smooth">
                    <div className="max-w-7xl mx-auto w-full p-4 md:p-8 pb-20">
                        <AnimatePresence mode="wait">
                           <div key={location.pathname} className="h-full">
                              <Outlet />
                           </div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
};

const Loading = () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
    </div>
);

// Guard to determine Root content (Landing Page vs App Layout)
const RootGuard = () => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) return <Loading />;

    // If Authenticated, render the App Layout
    if (user?.isAuthenticated) {
        if (!user.profile) return <Navigate to="/profile-setup" replace />;
        return <Layout />;
    }

    // If Not Authenticated
    // Allow access to Landing Page only at root "/"
    if (location.pathname === '/') {
        return <LandingPage />;
    }

    // Redirect any other attempt to Login
    return <Navigate to="/login" state={{ from: location }} replace />;
};

const ProfileSetupRouteWrapper = () => {
    const { user, isLoading } = useAuth();
    if (isLoading) return <Loading />;
    if (!user || !user.isAuthenticated) return <Navigate to="/login" replace />;
    if (user.profile) return <Navigate to="/" replace />;
    return <ProfileSetup />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/email-sent" element={<EmailSent />} />
            <Route path="/profile-setup" element={<ProfileSetupRouteWrapper />} />

            {/* Root Route acts as a guard/layout switcher */}
            <Route path="/" element={<RootGuard />}>
                <Route index element={<Dashboard />} />
                <Route path="about" element={<About />} />
                <Route path="day/:id" element={<LessonDetail />} />
                
                {/* Category Routes mapped to Dashboard for now */}
                <Route path="foundations" element={<Dashboard />} />
                <Route path="research" element={<Dashboard />} />
                <Route path="data" element={<Dashboard />} />
                <Route path="design" element={<Dashboard />} />
                <Route path="ai" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;