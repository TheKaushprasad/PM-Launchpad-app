import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LessonDetail } from './components/LessonDetail';
import { About } from './components/About';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/auth/Login';
import { VerifyOtp } from './components/auth/VerifyOtp';
import { EmailSent } from './components/auth/EmailSent';
import { ConfirmEmail } from './components/auth/ConfirmEmail';
import { ProfileSetup } from './components/auth/ProfileSetup';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

// Component to decide whether to show Landing Page or Dashboard
const HomeRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If user is logged in, show the Dashboard layout
  if (user && user.isAuthenticated) {
     if (!user.profile) {
        return <Navigate to="/profile-setup" replace />;
     }
     return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
            <LayoutWithSidebar />
        </div>
     );
  }

  // If not logged in, show Landing Page
  return <LandingPage />;
};

// Component to protect internal routes
const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div></div>;
  }
  
  if (!user || !user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!user.profile) {
     return <Navigate to="/profile-setup" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
        <LayoutWithSidebar />
    </div>
  );
};

// Layout with sidebar for protected routes
const LayoutWithSidebar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            {/* Sidebar Navigation */}
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full relative">
                
                {/* Mobile Header */}
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

                {/* Scrollable Main Content */}
                <main className="flex-1 overflow-y-auto scroll-smooth">
                    <div className="max-w-7xl mx-auto w-full p-4 md:p-8 pb-20">
                        <AnimatePresence mode="wait">
                             <Routes location={location} key={location.pathname}>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/day/:id" element={<LessonDetail />} />
                                <Route path="/foundations" element={<Dashboard />} />
                                <Route path="/research" element={<Dashboard />} />
                                <Route path="/data" element={<Dashboard />} />
                                <Route path="/design" element={<Dashboard />} />
                                <Route path="/ai" element={<Dashboard />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </>
    )
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
         <Routes>
            {/* Root: Landing Page (Guest) or Dashboard (Auth) */}
            <Route path="/" element={<HomeRoute />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<VerifyOtp />} />
            <Route path="/email-sent" element={<EmailSent />} />
            <Route path="/confirm" element={<ConfirmEmail />} />
            <Route path="/profile-setup" element={<ProfileSetupRouteWrapper />} />

            {/* Protected Routes (Fallbacks if accessed directly) */}
            <Route path="/dashboard/*" element={<ProtectedRoute />} />
            <Route path="/day/*" element={<ProtectedRoute />} />
            <Route path="/about" element={<ProtectedRoute />} />
         </Routes>
      </Router>
    </AuthProvider>
  );
};

// Wrapper for Profile Setup
const ProfileSetupRouteWrapper = () => {
    const { user, isLoading } = useAuth();
    
    if (isLoading) return null;
    if (!user || !user.isAuthenticated) return <Navigate to="/login" replace />;
    if (user.profile) return <Navigate to="/" replace />; // Already has profile
    
    return <ProfileSetup />;
}

export default App;