import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, Zap, Briefcase, Users, 
  Layers, Menu, X, BarChart2, FileText, Code, Bot, Smartphone, Rocket,
  Sparkles, Library, LogIn, UserPlus, LogOut, GraduationCap, ShieldCheck,
  Target, Award, Compass, MessageSquare, CheckCircle, ChevronRight,
  TrendingUp, Globe, Sparkle, PlayCircle, Star
} from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModal';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userProfile, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('signup');
  const [authRedirectPath, setAuthRedirectPath] = useState<string>('/dashboard');
  const { scrollYProgress } = useScroll();

  // Auto-open Auth modal if redirected from a protected route
  useEffect(() => {
    if ((location.state as any)?.requireAuth && !user) {
      const fromPath = (location.state as any)?.from?.pathname;
      if (fromPath) setAuthRedirectPath(fromPath);
      setAuthModalMode('login');
      setAuthModalOpen(true);
    }
  }, [location.state, user]);

  const handleProtectedAction = (targetPath: string) => {
    if (!user) {
      setAuthRedirectPath(targetPath);
      setAuthModalMode('signup');
      setAuthModalOpen(true);
    } else {
      navigate(targetPath);
    }
  };

  // Interactive Mockup State
  const [roadmapIndex, setRoadmapIndex] = useState(0);
  const [growthIndex, setGrowthIndex] = useState(0);
  const [usersIndex, setUsersIndex] = useState(0);
  const [prdIndex, setPrdIndex] = useState(0);
  const [sprintClicked, setSprintClicked] = useState(false);
  const [sprintCount, setSprintCount] = useState(1);

  const roadmaps = [
    { title: "Q3 Roadmap Launch", status: "IN PROGRESS", progress: 45, color: "from-indigo-500 to-violet-500", statusClass: "text-indigo-400 bg-indigo-950/60 border-indigo-800/40" },
    { title: "AI Search & Discovery", status: "IN REVIEW", progress: 85, color: "from-violet-500 to-pink-500", statusClass: "text-purple-400 bg-purple-950/60 border-purple-800/40" },
    { title: "Self-Serve Checkout 2.0", status: "SHIPPED 🚀", progress: 100, color: "from-emerald-500 to-teal-500", statusClass: "text-emerald-400 bg-emerald-950/60 border-emerald-800/40" },
  ];

  const growths = [
    { label: "Growth", value: "+124%", sub: "MoM" },
    { label: "ARR Run-Rate", value: "$420k", sub: "+45% YoY" },
    { label: "Retention", value: "88.4%", sub: "+6.2% D30" },
  ];

  const userMetrics = ["12.5k", "24.8k", "50.2k", "100k+"];

  const prdItems = [
    { title: "Writing PRD", subtitle: "Problem statement & user stories drafted", tag: "AI Draft", color: "text-pink-400", icons: ["👩‍💻", "👨‍💻"] },
    { title: "User Interview #14", subtitle: "Synthesized friction points from 12 PMs", tag: "Research", color: "text-amber-400", icons: ["🎯", "🔍"] },
    { title: "A/B Experiment V2", subtitle: "Hypothesis: 1-click onboard increases signups", tag: "Live Test", color: "text-cyan-400", icons: ["⚡", "📊"] },
  ];

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        redirectTo={authRedirectPath || '/dashboard'}
        onSuccess={() => {
          setAuthModalOpen(false);
          navigate(authRedirectPath || '/dashboard');
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-lg border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={scrollToTop}
          >
             <Logo className="w-10 h-10" />
             <div className="flex flex-col">
               <span className="font-bold text-xl tracking-tighter text-zinc-900">The NooB PM</span>
               <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600 -mt-1 hidden sm:block">One-Stop PM Solution</span>
             </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <motion.button 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              onClick={() => scrollToSection('curriculum')}
              className="text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition-colors tracking-tight"
            >
              Curriculum
            </motion.button>

            <motion.button 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => navigate('/tools')}
                className="text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition-colors tracking-tight flex items-center gap-1.5"
            >
                <Sparkles className="w-4 h-4 text-indigo-600" /> Tools
            </motion.button>

            <motion.button 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                onClick={() => navigate('/interview-studio')}
                className="text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition-colors tracking-tight flex items-center gap-1.5"
            >
                <Zap className="w-4 h-4 text-emerald-600" /> AI Mock Interview
            </motion.button>

            <motion.button 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => navigate('/resources')}
                className="text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition-colors tracking-tight flex items-center gap-1.5"
            >
                <Library className="w-4 h-4 text-zinc-500" /> Resources
            </motion.button>

            <motion.a 
                href="https://chat.whatsapp.com/F93j47M4UL43DUJS1QrEgU"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors tracking-tight"
            >
                Community
            </motion.a>

            {/* Auth or Dashboard CTA */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 pl-4 border-l border-zinc-200"
            >
              {user ? (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => navigate('/dashboard')} 
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5 tracking-tight"
                  >
                    My Command Center
                  </button>
                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    id="nav-login-btn"
                    onClick={() => openAuth('login')} 
                    className="px-3.5 py-2 text-zinc-700 hover:text-indigo-600 hover:bg-zinc-100 text-xs font-bold rounded-xl transition-all tracking-tight flex items-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" /> Sign In
                  </button>
                  <button 
                    id="nav-signup-btn"
                    onClick={() => openAuth('signup')} 
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5 tracking-tight flex items-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" /> Get Started Free
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-zinc-600">
             {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 bg-white border-b border-zinc-200 z-40 md:hidden overflow-hidden shadow-2xl"
          >
             <div className="p-6 space-y-4">
                {user ? (
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Avatar" className="w-9 h-9 rounded-full" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                          {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-sm text-zinc-900">{user.displayName || 'PM Aspiring Talent'}</p>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="p-2 text-zinc-400 hover:text-rose-600"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pb-2">
                    <button
                      onClick={() => { setMobileMenuOpen(false); openAuth('login'); }}
                      className="w-full py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-800 font-bold text-sm flex items-center justify-center gap-1.5"
                    >
                      <LogIn className="w-4 h-4" /> Sign In
                    </button>
                    <button
                      onClick={() => { setMobileMenuOpen(false); openAuth('signup'); }}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md shadow-indigo-200"
                    >
                      <UserPlus className="w-4 h-4" /> Sign Up
                    </button>
                  </div>
                )}

                <button 
                    onClick={() => { setMobileMenuOpen(false); scrollToSection('curriculum'); }}
                    className="block w-full text-left text-lg font-semibold text-zinc-700 py-1.5 tracking-tight"
                >
                    Curriculum
                </button>
                <button 
                    onClick={() => { setMobileMenuOpen(false); navigate('/tools'); }}
                    className="block w-full text-left text-lg font-semibold text-zinc-700 py-1.5 tracking-tight flex items-center gap-2"
                >
                    <Sparkles className="w-5 h-5 text-indigo-600" /> Tools
                </button>
                <button 
                    onClick={() => { setMobileMenuOpen(false); navigate('/interview-studio'); }}
                    className="block w-full text-left text-lg font-semibold text-zinc-700 py-1.5 tracking-tight flex items-center gap-2"
                >
                    <Zap className="w-5 h-5 text-emerald-600" /> AI Mock Interview
                </button>
                <button 
                    onClick={() => { setMobileMenuOpen(false); navigate('/resources'); }}
                    className="block w-full text-left text-lg font-semibold text-zinc-700 py-1.5 tracking-tight flex items-center gap-2"
                >
                    <Library className="w-5 h-5 text-zinc-600" /> Resources
                </button>
                <button 
                    onClick={() => { setMobileMenuOpen(false); handleProtectedAction('/dashboard'); }}
                    className="block w-full text-left text-lg font-semibold text-indigo-600 py-1.5 tracking-tight font-bold"
                >
                    Career Command Center
                </button>
                <a 
                    href="https://chat.whatsapp.com/F93j47M4UL43DUJS1QrEgU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left text-lg font-semibold text-emerald-600 py-1.5 tracking-tight"
                >
                    Join Community
                </a>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 px-6 relative overflow-hidden">
         {/* Ambient Glows */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
            {/* Left Column: Hero Headline & Tagline */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 flex flex-col items-start text-left"
            >
                {/* Main Heading */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-zinc-900 tracking-tighter leading-[0.95] mb-6">
                    NooB In. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">PM Out.</span>
                </h1>

                <p className="text-lg sm:text-xl text-zinc-600 mb-8 leading-relaxed font-medium tracking-tight max-w-xl">
                    Everything you need to break into Product Management in one unified platform
                </p>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                    <button 
                      id="hero-start-learning-cta"
                      onClick={() => handleProtectedAction('/dashboard')} 
                      className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-indigo-200 transition-all hover:-translate-y-0.5 flex items-center gap-2 tracking-tight"
                    >
                      <Rocket className="w-5 h-5" /> start learning <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Social Proof & Badges */}
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-zinc-500 tracking-tight pt-2">
                    <div className="flex -space-x-2.5">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-zinc-200 flex items-center justify-center overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+25}`} alt="user" referrerPolicy="no-referrer" />
                            </div>
                        ))}
                    </div>
                    <span>Trusted by 2,000+ Aspiring PMs & Students</span>
                </div>
            </motion.div>

            {/* Right Column: PM Workspace UI Window */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="lg:col-span-5 relative"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 rounded-[2.5rem] rotate-2 blur-xl -z-10"></div>
                
                {/* Dark PM Workspace App Window Mockup */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden select-none">
                    {/* Window Controls */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800/80">
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => {
                                    setRoadmapIndex(0);
                                    setGrowthIndex(0);
                                    setUsersIndex(0);
                                    setPrdIndex(0);
                                }}
                                title="Reset Mockup"
                                className="w-3 h-3 rounded-full bg-rose-500/90 hover:opacity-80 transition-opacity inline-block shadow-xs"
                            />
                            <button 
                                onClick={() => {
                                    setRoadmapIndex((prev) => (prev + 1) % roadmaps.length);
                                }}
                                title="Next Roadmap"
                                className="w-3 h-3 rounded-full bg-amber-500/90 hover:opacity-80 transition-opacity inline-block shadow-xs"
                            />
                            <button 
                                onClick={() => {
                                    setGrowthIndex((prev) => (prev + 1) % growths.length);
                                }}
                                title="Boost Metrics"
                                className="w-3 h-3 rounded-full bg-emerald-500/90 hover:opacity-80 transition-opacity inline-block shadow-xs"
                            />
                        </div>
                    </div>

                    {/* Content Section 1: Roadmap Launch (Clickable with Loop-Animated Progress) */}
                    <motion.div 
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => setRoadmapIndex((prev) => (prev + 1) % roadmaps.length)}
                        className="bg-zinc-800/60 hover:bg-zinc-800/90 border border-zinc-700/50 hover:border-indigo-500/60 rounded-2xl p-4 mb-4 cursor-pointer transition-all group"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2.5">
                                <Layers className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
                                <span className="text-xs font-bold text-zinc-200">{roadmaps[roadmapIndex].title}</span>
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${roadmaps[roadmapIndex].statusClass} transition-colors`}>
                                {roadmaps[roadmapIndex].status}
                            </span>
                        </div>
                        <div className="w-full bg-zinc-700/50 rounded-full h-2 overflow-hidden relative">
                            <motion.div 
                                animate={{ 
                                    width: ["30%", "85%", "45%", "95%", "60%", "30%"] 
                                }}
                                transition={{ 
                                    duration: 7, 
                                    repeat: Infinity, 
                                    ease: "easeInOut" 
                                }}
                                className={`bg-gradient-to-r ${roadmaps[roadmapIndex].color} h-2 rounded-full shadow-sm`}
                            />
                        </div>
                    </motion.div>

                    {/* Content Section 2: Metrics Grid (Clickable) */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setGrowthIndex((prev) => (prev + 1) % growths.length)}
                            className="bg-zinc-800/60 hover:bg-zinc-800/90 border border-zinc-700/50 hover:border-emerald-500/60 rounded-2xl p-4 cursor-pointer transition-all group"
                        >
                            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium mb-1">
                                <div className="flex items-center gap-1.5">
                                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400 group-hover:-translate-y-0.5 transition-transform" />
                                    <span>{growths[growthIndex].label}</span>
                                </div>
                                <span className="text-[9px] text-zinc-500 font-mono">{growths[growthIndex].sub}</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <motion.span 
                                    key={growthIndex}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-xl font-black text-white"
                                >
                                    {growths[growthIndex].value}
                                </motion.span>
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            </div>
                        </motion.div>

                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setUsersIndex((prev) => (prev + 1) % userMetrics.length)}
                            className="bg-zinc-800/60 hover:bg-zinc-800/90 border border-zinc-700/50 hover:border-indigo-500/60 rounded-2xl p-4 cursor-pointer transition-all group"
                        >
                            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium mb-1">
                                <div className="flex items-center gap-1.5">
                                    <Users className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                                    <span>Active Users</span>
                                </div>
                                <span className="text-[9px] text-zinc-500 font-mono">Live</span>
                            </div>
                            <motion.span 
                                key={usersIndex}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-xl font-black text-white block"
                            >
                                {userMetrics[usersIndex]}
                            </motion.span>
                        </motion.div>
                    </div>

                    {/* Content Section 3: Writing PRD & Sprint Goal (Clickable) */}
                    <motion.div 
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => setPrdIndex((prev) => (prev + 1) % prdItems.length)}
                        className="bg-zinc-800/60 hover:bg-zinc-800/90 border border-zinc-700/50 hover:border-pink-500/60 rounded-2xl p-4 relative cursor-pointer transition-all group"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <FileText className={`w-4 h-4 ${prdItems[prdIndex].color}`} />
                                <span className="text-xs font-bold text-zinc-200">{prdItems[prdIndex].title}</span>
                                <span className="text-[9px] px-1.5 py-0.2 bg-zinc-700 text-zinc-300 rounded font-semibold">
                                    {prdItems[prdIndex].tag}
                                </span>
                            </div>
                            <div className="flex -space-x-1.5">
                                {prdItems[prdIndex].icons.map((emoji, idx) => (
                                    <div key={idx} className="w-5 h-5 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-[9px] font-bold">
                                        {emoji}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-[11px] text-zinc-400 mb-2 line-clamp-1 font-medium">
                            {prdItems[prdIndex].subtitle}
                        </p>
                        <div className="space-y-2">
                            <div className="w-full bg-zinc-700/50 h-2 rounded-full overflow-hidden relative">
                                <motion.div 
                                    animate={{ 
                                        width: ["20%", "75%", "40%", "90%", "30%"] 
                                    }}
                                    transition={{ 
                                        duration: 5.5, 
                                        repeat: Infinity, 
                                        ease: "easeInOut",
                                        delay: 0.3
                                    }}
                                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full shadow-xs"
                                />
                            </div>
                            <div className="w-2/3 bg-zinc-700/40 h-1.5 rounded-full overflow-hidden relative">
                                <motion.div 
                                    animate={{ 
                                        width: ["35%", "90%", "50%", "80%", "40%"] 
                                    }}
                                    transition={{ 
                                        duration: 4.8, 
                                        repeat: Infinity, 
                                        ease: "easeInOut",
                                        delay: 0.8
                                    }}
                                    className="h-full bg-zinc-500/60 rounded-full"
                                />
                            </div>
                        </div>

                        {/* Floating Badge: Sprint Goal Met (Interactive click milestone) */}
                        <motion.button 
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSprintClicked(true);
                                setSprintCount((prev) => prev + 1);
                                setTimeout(() => setSprintClicked(false), 1200);
                            }}
                            className={`absolute -bottom-3 -right-2 ${sprintClicked ? 'bg-emerald-400 ring-4 ring-emerald-400/30' : 'bg-emerald-500'} text-zinc-950 font-black text-xs px-3.5 py-1.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all cursor-pointer`}
                        >
                            <CheckCircle2 className={`w-4 h-4 text-zinc-950 ${sprintClicked ? 'rotate-12 scale-125' : ''} transition-transform`} />
                            <span>{sprintClicked ? `Sprint #${sprintCount} Shipped! 🎉` : 'Sprint Goal Met!'}</span>
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
         </div>
      </section>

      {/* ONE-STOP SOLUTION ECOSYSTEM SECTION */}
      <section id="ecosystem" className="py-20 bg-white border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" /> All-In-One Product Management Platform
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
              Your Entire PM Transition. <br className="hidden sm:inline" />
              <span className="text-indigo-600">All Under One Roof.</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-500 leading-relaxed font-medium">
              No need to juggle 5 different tools, scattered YouTube playlists, and expensive bootcamps. The NooB PM provides everything you need to upskill, practice, optimize, and land your offer.
            </p>
          </div>

          {/* 4 Pillars of the One-Stop Platform */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tool 1: 45-Day Curriculum */}
            <motion.div 
              whileHover={{ y: -6 }}
              onClick={() => handleProtectedAction('/dashboard')}
              className="p-7 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-indigo-300 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">Step 1 • Master Fundamentals</span>
                  <h3 className="text-lg font-black text-zinc-900 group-hover:text-indigo-600 transition-colors">
                    45-Day PM Launchpad
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    Structured day-by-day interactive curriculum covering 8 core PM pillars: PRDs, System Design, SQL, Strategy, and AI Workflows.
                  </p>
                </div>
              </div>
              <div className="pt-5 mt-4 border-t border-zinc-200/60 flex items-center justify-between text-xs font-bold text-indigo-600">
                <span>Start Learning</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Tool 2: LinkedIn Optimiser */}
            <motion.div 
              whileHover={{ y: -6 }}
              onClick={() => handleProtectedAction('/tools/linkedin-optimiser')}
              className="p-7 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-indigo-300 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">Step 2 • Stand Out to Recruiters</span>
                  <h3 className="text-lg font-black text-zinc-900 group-hover:text-indigo-600 transition-colors">
                    LinkedIn Optimiser
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    AI-powered 100-point profile audit with ATS keyword gap analysis, headline generation, and impact-driven bullet rewrites.
                  </p>
                </div>
              </div>
              <div className="pt-5 mt-4 border-t border-zinc-200/60 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Audit My Profile</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Tool 3: AI Mock Interview Studio */}
            <motion.div 
              whileHover={{ y: -6 }}
              onClick={() => navigate('/interview-studio')}
              className="p-7 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-indigo-300 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Step 3 • Ace the Rounds</span>
                  <h3 className="text-lg font-black text-zinc-900 group-hover:text-emerald-600 transition-colors">
                    AI Mock Interview Studio
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    Simulate real-world Product Sense, Execution/Metrics, Technical, and Behavioral rounds with instant AI rubric scores.
                  </p>
                </div>
              </div>
              <div className="pt-5 mt-4 border-t border-zinc-200/60 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>Practice Interview</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Tool 4: Career Toolkit & Resources */}
            <motion.div 
              whileHover={{ y: -6 }}
              onClick={() => navigate('/resources')}
              className="p-7 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-indigo-300 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Library className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-600">Step 4 • Build Portfolio</span>
                  <h3 className="text-lg font-black text-zinc-900 group-hover:text-purple-600 transition-colors">
                    PM Toolkit & Frameworks
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    Complete certifications, build industry-standard PM artifacts, and turn real PM assignments and casebooks into an outstanding product portfolio.
                  </p>
                </div>
              </div>
              <div className="pt-5 mt-4 border-t border-zinc-200/60 flex items-center justify-between text-xs font-bold text-purple-600">
                <span>Explore Resources</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Preview Section */}
      <section id="curriculum" className="py-24 bg-zinc-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-full text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-3">
                  <Layers className="w-3.5 h-3.5" /> Complete Skill Blueprint
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">8 Professional Pillars</h2>
                <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed font-medium">
                    A comprehensive curriculum calibrated against top hiring standards to ensure you are thoroughly prepared for APM and PM roles.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: Briefcase, title: 'Foundations', desc: 'Mindset, PDLC, PLC, user problems, and essential PRD/BRD documentation.' },
                    { icon: Users, title: 'User Research', desc: 'Customer interviews, JTBD frameworks, empathy maps, and competitive tear-downs.' },
                    { icon: Zap, title: 'Product Strategy', desc: 'North star metrics, prioritization frameworks (RICE/MoSCoW), and roadmap planning.' },
                    { icon: BarChart2, title: 'Data & Analytics', desc: 'Master SQL for PMs, retention curves, funnel analysis, and A/B test statistics.' },
                    { icon: Code, title: 'Tech & Architecture', desc: 'APIs, client-server models, microservices, databases, and system design basics.' },
                    { icon: Bot, title: 'AI & GenAI Workflows', desc: 'LLMs, prompt engineering, RAG, agentic systems, and building AI-first features.' },
                    { icon: Smartphone, title: 'UI/UX & Design', desc: 'Heuristic evaluations, wireframing in Figma, interaction loops, and usability tests.' },
                    { icon: Rocket, title: 'Portfolio & Job Hunt', desc: 'Turn daily assignments into high-impact case studies to impress recruiters.' }
                ].map((feature, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        onClick={() => handleProtectedAction('/dashboard')}
                        className="p-8 rounded-3xl bg-white border border-zinc-200/80 hover:border-indigo-300 hover:shadow-xl transition-all shadow-xs cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-xs mb-6">
                            <feature.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-black text-zinc-900 mb-2 tracking-tight">{feature.title}</h3>
                        <p className="text-xs text-zinc-500 leading-relaxed font-medium">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* Features & Action-Driven Section */}
      <section id="features" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
         <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div>
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-4">
                       <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Action-Oriented Learning
                     </div>
                     <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                        Built for Action, <br/>
                        <span className="text-[#79BAEC]">Not Just Passive Reading.</span>
                     </h2>
                     <p className="text-zinc-300 text-base md:text-lg mb-8 leading-relaxed font-medium">
                         Generic courses give you hours of passive video lectures. The NooB PM gives you an active command center with daily hands-on assignments, instant AI feedback, and portfolio deliverables.
                     </p>
                     <ul className="space-y-4 mb-8">
                         {[
                           '45 Daily Hands-On Lessons',
                           'Instant LinkedIn Profile and CV Audit and ATS Scoring',
                           'AI Mock Interview with Live Scoring'
                         ].map(item => (
                             <li key={item} className="flex items-center gap-3 text-base sm:text-lg font-semibold tracking-tight text-zinc-200">
                                 <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                                 <span>{item}</span>
                             </li>
                         ))}
                     </ul>

                     <div className="flex flex-wrap gap-4">
                       {!user ? (
                         <button
                           onClick={() => openAuth('signup')}
                           className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-base tracking-tight shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:-translate-y-0.5"
                         >
                           <UserPlus className="w-5 h-5" /> Start Your PM Journey <ArrowRight className="w-5 h-5" />
                         </button>
                       ) : (
                         <button
                           onClick={() => navigate('/dashboard')}
                           className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-base tracking-tight shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:-translate-y-0.5"
                         >
                           <Rocket className="w-5 h-5" /> Go to Dashboard <ArrowRight className="w-5 h-5" />
                         </button>
                       )}
                     </div>
                 </div>

                 <div className="relative">
                     <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
                     <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 relative space-y-4 shadow-2xl">
                         <div className="text-xs font-black text-zinc-400 uppercase tracking-widest pb-2 border-b border-zinc-800">
                           The 3-Step PM Launchpad Loop
                         </div>
                         <div className="space-y-4">
                             <div className="flex items-start gap-4 p-4 bg-zinc-800/80 rounded-2xl border border-zinc-700/80">
                                 <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0">1</div>
                                 <div>
                                     <h4 className="font-bold tracking-tight text-white text-base">Learn Core Frameworks</h4>
                                     <p className="text-xs text-zinc-400 font-medium mt-0.5">Understand real PM trade-offs, metrics, SQL, and product design with concise daily lessons.</p>
                                 </div>
                             </div>
                             <div className="flex items-start gap-4 p-4 bg-zinc-800/80 rounded-2xl border border-zinc-700/80">
                                 <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shrink-0">2</div>
                                 <div>
                                     <h4 className="font-bold tracking-tight text-white text-base">Complete Live Deliverables</h4>
                                     <p className="text-xs text-zinc-400 font-medium mt-0.5">Draft PRDs, run data analyses, and build case studies that you can showcase directly in interviews.</p>
                                 </div>
                             </div>
                             <div className="flex items-start gap-4 p-4 bg-zinc-800/80 rounded-2xl border border-zinc-700/80">
                                 <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shrink-0">3</div>
                                 <div>
                                     <h4 className="font-bold tracking-tight text-white text-base">Optimize Profile & Practice Rounds</h4>
                                     <p className="text-xs text-zinc-400 font-medium mt-0.5">Audit your LinkedIn profile for recruiters and rehearse Product Sense interviews with AI feedback.</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-zinc-200">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                  <Logo className="w-8 h-8" />
                  <div>
                    <span className="font-bold text-zinc-900 tracking-tight block">The NooB PM</span>
                    <span className="text-[10px] text-zinc-400 font-medium">One-stop solution for aspiring product managers</span>
                  </div>
              </div>
              <p className="text-zinc-500 text-xs font-medium">© {new Date().getFullYear()} The NooB PM. Open Source Education & PM Career Platform.</p>
              <div className="flex gap-6">
                  <a 
                    href="https://www.linkedin.com/company/the-noob-pm/?viewAsMember=true" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-400 hover:text-indigo-600 transition-colors font-medium text-sm"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://www.instagram.com/the_noob_pm/reels/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-400 hover:text-indigo-600 transition-colors font-medium text-sm"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://www.youtube.com/@THE_NOOB_PM/posts" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-400 hover:text-indigo-600 transition-colors font-medium text-sm"
                  >
                    YouTube
                  </a>
              </div>
          </div>
      </footer>
    </div>
  );
};
