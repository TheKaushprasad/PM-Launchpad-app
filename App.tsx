import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LessonDetail } from './components/LessonDetail';
import { About } from './components/About';
import { LandingPage } from './components/LandingPage';
import { Menu, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Logo } from './components/Logo';

// Layout Component containing Sidebar and Outlet for nested routes
const Layout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    
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

const App: React.FC = () => {
  return (
      <Router>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="about" element={<About />} />
                <Route path="day/:id" element={<LessonDetail />} />
                <Route path="foundations" element={<Dashboard />} />
                <Route path="research" element={<Dashboard />} />
                <Route path="data" element={<Dashboard />} />
                <Route path="design" element={<Dashboard />} />
                <Route path="ai" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
      </Router>
  );
};

export default App;