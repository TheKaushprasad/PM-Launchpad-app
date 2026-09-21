import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Check, Search, Sparkles, BookOpen, Users, 
  Folder, Layers, Zap, Star, ChevronDown, ChevronRight,
  TrendingUp, Compass, MessageSquare, Briefcase, FileText,
  BarChart2, Code, Bot, Smartphone, Mail, X, CheckCircle2,
  Lock, Flame, Award, Target, HelpCircle,
  Play, RotateCcw, Mic, Volume2, Sliders, User as UserIcon
} from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModal';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isEmailVerified } = useAuth();
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('signup');
  const [authRedirectPath, setAuthRedirectPath] = useState<string>('/dashboard');
  
  // Navigation Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Search Modal state
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Testimonial marquee pause state
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  // Interactive Hero Preview Card states
  type MockupTab = 'dashboard' | 'modules' | 'apps' | 'interview' | 'resources' | 'career' | 'profile';
  const [mockupTab, setMockupTab] = useState<MockupTab>('dashboard');
  const [mockupCompletedModules, setMockupCompletedModules] = useState(12);
  const [mockupTotalModules] = useState(24);
  const [mockupStreak, setMockupStreak] = useState(12);
  const [mockupStreakClaimed, setMockupStreakClaimed] = useState(false);
  const [mockupCelebration, setMockupCelebration] = useState<string | null>(null);
  const [mockupInterviewState, setMockupInterviewState] = useState<'prompt' | 'evaluating' | 'result'>('prompt');
  const [mockupSelectedRole, setMockupSelectedRole] = useState<'APM' | 'PM Intern' | 'Senior PM'>('APM');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [completedDemoDays, setCompletedDemoDays] = useState<number[]>([1, 2]);

  // Auto-open Auth modal if redirected from a protected route
  useEffect(() => {
    if ((location.state as any)?.requireAuth && !user) {
      const fromPath = (location.state as any)?.from?.pathname;
      if (fromPath) setAuthRedirectPath(fromPath);
      setAuthModalMode('login');
      setAuthModalOpen(true);
    }
  }, [location.state, user]);

  const openAuth = (mode: 'login' | 'signup', redirect = '/dashboard') => {
    setAuthRedirectPath(redirect);
    setAuthModalMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleProtectedAction = (targetPath: string) => {
    if (!user) {
      setAuthRedirectPath(targetPath);
      setAuthModalMode('signup');
      setAuthModalOpen(true);
    } else {
      navigate(targetPath);
    }
  };

  const testimonials = [
    {
      name: "Sanskruti Palekar",
      role: "Business Analyst at Micron Industries Private Limited",
      quote: "Very helpful website",
      rating: 5,
    },
    {
      name: "Srijita Chatterjee",
      role: "AI Product Manager at Travelved",
      quote: "Best website to prepare for PM roles.",
      rating: 5,
    },
    {
      name: "Neeraj Gupta",
      role: "Business Delivery Executive @ IDfy",
      quote: "Extremely valuable and goldmines for aspiring Product Managers",
      rating: 5,
    },
    {
      name: "Rachana Tripathi",
      role: "Product Manager at Repro India Limited",
      quote: "This stuff is actually cool !",
      rating: 5,
    },
    {
      name: "Dimpal Dewasi",
      role: "Product Management Trainee @airpay",
      quote: "Amazing Resource",
      rating: 5,
    },
    {
      name: "Crystal King",
      role: "Founder at Drama Land",
      quote: "The Strategy and data part of the course is amazing",
      rating: 5,
    },
    {
      name: "Kunal Chaudhary",
      role: "Co-Founder at Krishi Culture",
      quote: "From starting to ending couse cover all the things a PM should know and help them to improve their skills",
      rating: 5,
    }
  ];

  // Quadruple the cards array to guarantee a 100% seamless, gapless infinite loop across any viewport up to 4K
  const marqueeCards = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  const pillars = [
    {
      id: 'foundations',
      title: 'Foundations',
      desc: 'Mindset, PDLC, user problems, PRDs and core PM concepts.',
      icon: BookOpen,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50'
    },
    {
      id: 'research',
      title: 'User Research',
      desc: 'Customer interviews, JTBD, empathy maps and analysis.',
      icon: Users,
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-50'
    },
    {
      id: 'strategy',
      title: 'Product Strategy',
      desc: 'North star metrics, prioritization, RICE/MoSCoW and roadmaps.',
      icon: Target,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50'
    },
    {
      id: 'data',
      title: 'Data & Analytics',
      desc: 'SQL, retention, funnels, experimentation and A/B tests.',
      icon: BarChart2,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50'
    },
    {
      id: 'tech',
      title: 'Tech & Architecture',
      desc: 'APIs, client-server models, databases and system design basics.',
      icon: Code,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50'
    },
    {
      id: 'ai',
      title: 'AI & GenAI Workflows',
      desc: 'LLMs, prompt engineering, RAG and building AI-powered PM workflows.',
      icon: Bot,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-50'
    },
    {
      id: 'design',
      title: 'UI/UX & Design',
      desc: 'Heuristics, wireframing, user flows and usability testing.',
      icon: Smartphone,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50'
    },
    {
      id: 'jobready',
      title: 'Portfolio & Job Hunt',
      desc: 'Case studies, portfolio building, networking and interview prep.',
      icon: Briefcase,
      iconColor: 'text-pink-600',
      iconBg: 'bg-pink-50'
    }
  ];

  const searchableItems = [
    { title: "Day 0: Foundation & Mindset", category: "Curriculum", path: "/dashboard" },
    { title: "Day 1: What is Product Management?", category: "Curriculum", path: "/dashboard" },
    { title: "AI Mock Interview Studio", category: "Tools", path: "/interview-studio" },
    { title: "LinkedIn Profile Optimiser", category: "Tools", path: "/tools/linkedin-optimiser" },
    { title: "Resume Auditor & ATS Check", category: "Tools", path: "/resume-auditor" },
    { title: "PM PRD Template & Swipe Files", category: "Resources", path: "/resources" },
    { title: "Product Strategy & Prioritization", category: "Pillars", path: "/dashboard/strategy" },
    { title: "Data & Metrics Playbook", category: "Pillars", path: "/dashboard/data" },
  ];

  const filteredSearchItems = searchQuery.trim() 
    ? searchableItems.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : searchableItems;

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans text-slate-900 overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
      
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

      {/* Search Modal */}
      <AnimatePresence>
        {searchModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-slate-950/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden"
            >
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search curriculum, tools, interview prep, templates..."
                  className="w-full text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
                  autoFocus
                />
                <button 
                  onClick={() => setSearchModalOpen(false)} 
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {filteredSearchItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchModalOpen(false);
                      navigate(item.path);
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">{item.title}</p>
                      <span className="text-[11px] font-medium text-slate-400">{item.category}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <Logo className="w-9 h-9 shrink-0" />
            <div>
              <span className="block font-black text-lg text-slate-900 tracking-tight leading-none">The NooB PM</span>
              <span className="text-[8px] font-black text-emerald-600 uppercase tracking-wider block mt-0.5">ONE-STOP PM SOLUTION</span>
            </div>
          </div>

          {/* Desktop Center Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            {/* Learn Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('learn')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-1 hover:text-emerald-700 transition-colors cursor-pointer py-2"
              >
                <span>Learn</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'learn' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50"
                  >
                    <button 
                      onClick={() => navigate('/dashboard')} 
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-emerald-50 text-xs font-bold text-slate-800 hover:text-emerald-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>🚀</span>
                      <span>45 Days PM Launchpad</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tools Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('tools')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => navigate('/tools')}
                className="flex items-center gap-1 hover:text-emerald-700 transition-colors cursor-pointer py-2"
              >
                <span>Tools</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'tools' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50"
                  >
                    <button 
                      onClick={() => navigate('/tools/linkedin-optimiser')} 
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 text-xs font-bold text-slate-800 hover:text-emerald-800 transition-colors block cursor-pointer"
                    >
                      🔗 LinkedIn Profile Optimiser
                    </button>
                    <button 
                      onClick={() => navigate('/resume-auditor')} 
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors block cursor-pointer"
                    >
                      📄 AI Resume Auditor & ATS
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* AI Mock Interview Link */}
            <button 
              onClick={() => navigate('/interview-studio')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              AI Mock Interview
            </button>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => navigate('/resources')}
                className="flex items-center gap-1 hover:text-emerald-700 transition-colors cursor-pointer py-2"
              >
                <span>Resources</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50"
                  >
                    <button 
                      onClick={() => navigate('/resources?view=certs')} 
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>🎓</span>
                      <span>Certifications</span>
                    </button>
                    <button 
                      onClick={() => navigate('/resources?view=assignments')} 
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>💼</span>
                      <span>PM Assignments</span>
                    </button>
                    <button 
                      onClick={() => navigate('/resources?view=casebooks')} 
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>📚</span>
                      <span>Casebooks</span>
                    </button>
                    <button 
                      onClick={() => navigate('/resources?view=questions')} 
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>🏢</span>
                      <span>Company Qs</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Community Link */}
            <a 
              href="https://chat.whatsapp.com/GhkzK8bDAUwLAKfLw7hfbW"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Community
            </a>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Quick Search"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {user ? (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-[#064E3B] hover:bg-[#043C2C] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  My Dashboard →
                </button>
                <button
                  onClick={logout}
                  className="text-xs font-semibold text-slate-500 hover:text-rose-600 px-2 py-1 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => openAuth('login')}
                  className="text-slate-700 font-semibold text-sm hover:text-slate-900 px-4 py-2 rounded-full border border-slate-300/80 bg-white hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                >
                  Sign In
                </button>

                <button
                  onClick={() => openAuth('signup')}
                  className="bg-[#064E3B] hover:bg-[#043C2C] text-white font-bold text-sm px-5 py-2 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  Get Started Free
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-3"
            >
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }} 
                className="w-full text-left py-2 font-semibold text-slate-800"
              >
                45 Days PM Launchpad
              </button>
              <div className="py-1">
                <button 
                  onClick={() => { setMobileMenuOpen(false); navigate('/tools'); }} 
                  className="w-full text-left py-1.5 font-semibold text-slate-800"
                >
                  Tools
                </button>
                <div className="pl-3 py-1 space-y-1.5 text-xs text-slate-600 border-l-2 border-emerald-100 ml-1">
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/tools/linkedin-optimiser'); }} className="block py-1 hover:text-emerald-700 font-medium">🔗 LinkedIn Profile Optimiser</button>
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/resume-auditor'); }} className="block py-1 hover:text-emerald-700 font-medium">📄 AI Resume Auditor & ATS</button>
                </div>
              </div>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('/interview-studio'); }} 
                className="w-full text-left py-2 font-semibold text-slate-800"
              >
                AI Mock Interview
              </button>
              <div className="py-1">
                <button 
                  onClick={() => { setMobileMenuOpen(false); navigate('/resources'); }} 
                  className="w-full text-left py-1.5 font-semibold text-slate-800"
                >
                  Resources
                </button>
                <div className="pl-3 py-1 space-y-1.5 text-xs text-slate-600 border-l-2 border-emerald-100 ml-1">
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/resources?view=certs'); }} className="block py-1 hover:text-emerald-700 font-medium">🎓 Certifications</button>
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/resources?view=assignments'); }} className="block py-1 hover:text-emerald-700 font-medium">💼 PM Assignments</button>
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/resources?view=casebooks'); }} className="block py-1 hover:text-emerald-700 font-medium">📚 Casebooks</button>
                  <button onClick={() => { setMobileMenuOpen(false); navigate('/resources?view=questions'); }} className="block py-1 hover:text-emerald-700 font-medium">🏢 Company Qs</button>
                </div>
              </div>
              <a 
                href="https://chat.whatsapp.com/GhkzK8bDAUwLAKfLw7hfbW" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block py-2 font-semibold text-emerald-700"
              >
                Join Community
              </a>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                {user ? (
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}
                    className="w-full bg-[#064E3B] text-white py-2.5 rounded-xl font-bold text-center"
                  >
                    Open Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => openAuth('login')}
                      className="w-full border border-slate-300 py-2.5 rounded-xl font-bold text-center text-slate-800"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => openAuth('signup')}
                      className="w-full bg-[#064E3B] text-white py-2.5 rounded-xl font-bold text-center"
                    >
                      Get Started Free
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        {/* Soft Ambient Pastel Background Glows */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-bold tracking-tight">
                <span>🔑</span>
                <span>From Learning to Landing</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-slate-900">
                <span>NooB In.</span>
                <span className="block text-[#059669] mt-1">PM Out.</span>
              </h1>

              {/* Subheading */}
              <div className="space-y-2">
                <p className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                  Learn. Practice. Build. Land.
                </p>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  Your complete Product Management career platform with structured learning, AI-powered mock interviews, resume & Linkedin optimisation, and real-world projects.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-[#064E3B] hover:bg-[#043C2C] text-white px-7 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/15 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/interview-studio')}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300/90 px-6 py-3.5 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-2xs cursor-pointer flex items-center justify-center"
                >
                  Try AI Mock Interview
                </button>
              </div>

              {/* Social Proof & Playful Handwritten Sketch */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5 items-center">
                    {/* Person 1: Pink Hair Girl with red jacket & surprised/happy smile */}
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-40 w-9 h-9 rounded-full ring-2 ring-white shadow-sm overflow-hidden bg-[#E8EEF5] shrink-0"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="50" fill="#E8EEF5" />
                        {/* Pink Long Hair Behind */}
                        <path d="M22 45 C18 68 22 88 28 98 L72 98 C78 88 82 68 78 45 C75 22 25 22 22 45 Z" fill="#F472B6" />
                        {/* Shoulders / Red Jacket */}
                        <path d="M24 95 C28 78 40 76 50 76 C60 76 72 78 76 95 Z" fill="#EF4444" />
                        {/* Inner white top */}
                        <path d="M42 76 L58 76 L55 95 L45 95 Z" fill="#FFFFFF" />
                        {/* Neck */}
                        <rect x="44" y="62" width="12" height="15" rx="3" fill="#FCD34D" />
                        {/* Face */}
                        <ellipse cx="50" cy="52" rx="17" ry="18" fill="#FDE68A" />
                        {/* Pink bangs */}
                        <path d="M33 46 C34 33 46 25 50 25 C58 25 68 33 67 46 C62 40 56 42 50 38 C44 42 38 40 33 46 Z" fill="#F472B6" />
                        {/* Eyes */}
                        <ellipse cx="44" cy="50" rx="2.5" ry="3" fill="#1F2937" />
                        <ellipse cx="56" cy="50" rx="2.5" ry="3" fill="#1F2937" />
                        <circle cx="43.5" cy="49" r="0.8" fill="#FFFFFF" />
                        <circle cx="55.5" cy="49" r="0.8" fill="#FFFFFF" />
                        {/* Eyebrows */}
                        <path d="M41 45 Q44 43 47 45" stroke="#9D174D" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <path d="M53 45 Q56 43 59 45" stroke="#9D174D" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        {/* Open Happy Mouth */}
                        <path d="M47 59 Q50 63 53 59 Z" fill="#B91C1C" />
                      </svg>
                    </motion.div>

                    {/* Person 2: Pink Hijab with Heart Eyes & green accent */}
                    <motion.div
                      animate={{ y: [0, 3.5, 0] }}
                      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                      className="relative z-30 w-9 h-9 rounded-full ring-2 ring-white shadow-sm overflow-hidden bg-[#E8EEF5] shrink-0"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="50" fill="#E8EEF5" />
                        {/* Pink Hijab hood base */}
                        <path d="M22 96 C20 72 24 45 32 32 C38 22 62 22 68 32 C76 45 80 72 78 96 Z" fill="#F9A8D4" />
                        {/* Shoulders yellow top */}
                        <path d="M26 95 C30 82 42 80 50 80 C58 80 70 82 74 95 Z" fill="#FDE047" />
                        {/* Dark skin face */}
                        <ellipse cx="50" cy="54" rx="14" ry="16" fill="#78350F" />
                        {/* Hijab wrap over forehead & chin */}
                        <path d="M36 44 C38 34 62 34 64 44 C65 52 64 68 50 69 C36 68 35 52 36 44 Z" fill="none" stroke="#F9A8D4" strokeWidth="3.5" />
                        {/* Heart Eyes (Red) */}
                        <path d="M43 51 C41 48 39 49 39 51 C39 53 43 56 43 56 C43 56 47 53 47 51 C47 49 45 48 43 51 Z" fill="#EF4444" />
                        <path d="M57 51 C55 48 53 49 53 51 C53 53 57 56 57 56 C57 56 61 53 61 51 C61 49 59 48 57 51 Z" fill="#EF4444" />
                        {/* Green bubble/smile accent */}
                        <ellipse cx="50" cy="62" rx="3.5" ry="2" fill="#22C55E" />
                      </svg>
                    </motion.div>

                    {/* Person 3: Short Pink Buzzcut Guy in Blue Hoodie with Gritted/Nervous Smile */}
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                      className="relative z-20 w-9 h-9 rounded-full ring-2 ring-white shadow-sm overflow-hidden bg-[#E8EEF5] shrink-0"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="50" fill="#E8EEF5" />
                        {/* Blue Hoodie shoulders */}
                        <path d="M22 96 C26 78 38 75 50 75 C62 75 74 78 78 96 Z" fill="#3B82F6" />
                        {/* Hoodie strings / collar */}
                        <path d="M46 76 L44 88 M54 76 L56 88" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                        {/* Neck */}
                        <rect x="45" y="63" width="10" height="14" rx="2" fill="#FBBF24" />
                        {/* Short pink hair base */}
                        <ellipse cx="50" cy="46" rx="17" ry="17" fill="#F472B6" />
                        {/* Face */}
                        <ellipse cx="50" cy="52" rx="15" ry="16" fill="#FCD34D" />
                        {/* Buzzcut pink top */}
                        <path d="M33 46 C35 34 65 34 67 46 Z" fill="#F472B6" />
                        {/* Concerned raised eyebrows */}
                        <path d="M40 45 L47 43" stroke="#9D174D" strokeWidth="1.3" strokeLinecap="round" />
                        <path d="M60 45 L53 43" stroke="#9D174D" strokeWidth="1.3" strokeLinecap="round" />
                        {/* Eyes */}
                        <circle cx="44" cy="49" r="2.2" fill="#1F2937" />
                        <circle cx="56" cy="49" r="2.2" fill="#1F2937" />
                        {/* Gritted teeth smile (nervous/excited) */}
                        <rect x="44" y="58" width="12" height="4.5" rx="2" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1" />
                        <line x1="48" y1="58" x2="48" y2="62.5" stroke="#CBD5E1" strokeWidth="0.8" />
                        <line x1="52" y1="58" x2="52" y2="62.5" stroke="#CBD5E1" strokeWidth="0.8" />
                      </svg>
                    </motion.div>

                    {/* Person 4: Tan Guy with Pink/White Beanie/Headband & Tank Top */}
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                      className="relative z-10 w-9 h-9 rounded-full ring-2 ring-white shadow-sm overflow-hidden bg-[#E8EEF5] shrink-0"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="50" fill="#E8EEF5" />
                        {/* White Tank Top & Tan Shoulders */}
                        <path d="M22 96 C26 78 38 75 50 75 C62 75 74 78 78 96 Z" fill="#F97316" />
                        <path d="M36 82 L42 96 L58 96 L64 82 Z" fill="#FFFFFF" />
                        {/* Neck */}
                        <rect x="45" y="63" width="10" height="14" rx="2" fill="#EA580C" />
                        {/* Tan / Orange skin face */}
                        <ellipse cx="50" cy="52" rx="15" ry="16" fill="#F97316" />
                        {/* Pink Beanie hat dome */}
                        <path d="M33 42 C33 26 67 26 67 42 Z" fill="#F472B6" />
                        {/* White Beanie brim / headband */}
                        <rect x="31" y="40" width="38" height="8" rx="4" fill="#FFFFFF" />
                        {/* Eyes */}
                        <circle cx="44" cy="53" r="2.2" fill="#1F2937" />
                        <circle cx="56" cy="53" r="2.2" fill="#1F2937" />
                        {/* Mustache/smile */}
                        <path d="M46 59 Q50 60 54 59" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M47 62 Q50 64 53 62" stroke="#1F2937" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    Trusted by 1,000+ Aspiring Product Managers
                  </span>
                </div>

                {/* Hand-drawn Loop Arrow Doodle with "Real practice. Real progress." */}
                <div className="hidden sm:flex items-center gap-2 text-slate-500 font-serif italic text-xs">
                  <svg className="w-7 h-7 text-slate-400 rotate-12" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M5 25 C 10 5, 25 5, 30 20 C 32 25, 28 32, 22 30 C 18 28, 20 22, 28 20 L 35 22" />
                  </svg>
                  <div className="leading-tight">
                    <span>Real practice.</span>
                    <br />
                    <span>Real progress.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Product Dashboard Preview Card */}
            <div className="lg:col-span-6 relative flex justify-center">
              
              {/* Decorative warm polygon blob behind top-left of the card */}
              <div className="absolute -top-6 -left-6 w-36 h-36 bg-amber-200/50 rounded-3xl -rotate-12 blur-lg pointer-events-none -z-10" />

              {/* Main Floating Mockup Card */}
              <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/80 shadow-[0_25px_60px_rgba(15,23,42,0.12)] p-5 sm:p-6 relative transition-all duration-300 hover:shadow-[0_30px_70px_rgba(15,23,42,0.16)]">
                
                {/* User Dropdown Overlay inside card */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-16 right-5 z-40 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 text-xs"
                    >
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                        <img 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                          className="w-8 h-8 rounded-full object-cover" 
                          alt="Avatar" 
                        />
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">Aspiring PM</p>
                          <span className="text-[10px] text-emerald-600 font-semibold">Active Learner</span>
                        </div>
                      </div>
                      <div className="py-2 space-y-1 text-slate-600 font-medium text-[11px]">
                        <div className="px-2 py-1 bg-slate-50 rounded-lg text-slate-700 flex items-center justify-between">
                          <span>Status:</span>
                          <span className="font-bold text-emerald-600">Active</span>
                        </div>
                        <div className="px-2 py-1 bg-slate-50 rounded-lg text-slate-700 flex items-center justify-between">
                          <span>Level:</span>
                          <span className="font-bold text-slate-900">APM Track</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mockup Top Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div 
                    onClick={() => setMockupTab('dashboard')} 
                    className="flex items-center gap-2 cursor-pointer group"
                    title="Click to reset preview to Dashboard"
                  >
                    <Logo className="w-7 h-7 shrink-0 transition-transform group-hover:scale-105" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block leading-none">The NooB PM</span>
                      <span className="text-[7px] font-bold text-emerald-600 uppercase block">ONE-STOP PM SOLUTION</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Live interactive badge */}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[9px] font-bold text-emerald-700 border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Preview
                    </span>

                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="cursor-pointer focus:outline-none ring-2 ring-transparent hover:ring-emerald-400 rounded-full transition-all"
                      title="User Profile"
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200" 
                        alt="User avatar" 
                      />
                    </button>
                  </div>
                </div>

                {/* Mockup Body: Split into Mini-Sidebar & Main Content */}
                <div className="pt-4 grid grid-cols-12 gap-4 items-start">
                  
                  {/* Mini-Sidebar: 7 Interactive Tabs */}
                  <div className="col-span-4 border-r border-slate-100 pr-2 space-y-1 text-[10px] font-semibold text-slate-500">
                    {[
                      { id: 'dashboard', label: 'Dashboard' },
                      { id: 'modules', label: 'Modules' },
                      { id: 'apps', label: 'Apps & Tools' },
                      { id: 'interview', label: 'AI Mock Interview' },
                      { id: 'resources', label: 'Resources' },
                      { id: 'career', label: 'Career Tools' },
                      { id: 'profile', label: 'User Profile' },
                    ].map((tab) => {
                      const isActive = mockupTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setMockupTab(tab.id as MockupTab)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                            isActive 
                              ? 'bg-emerald-50 text-emerald-800 font-bold shadow-2xs' 
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
                            <span className="truncate">{tab.label}</span>
                          </div>
                          {isActive && <ChevronRight className="w-3 h-3 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Mini-Content Area */}
                  <div className="col-span-8 min-h-[220px] flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                      
                      {/* 1. DASHBOARD VIEW */}
                      {mockupTab === 'dashboard' && (
                        <motion.div
                          key="dashboard"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="space-y-3"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                                Good morning, Future PM! 👋
                              </h4>
                              {mockupCelebration && (
                                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md animate-bounce">
                                  {mockupCelebration}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              Keep going. You're closer than you think.
                            </p>
                          </div>

                          {/* Interactive Progress Card */}
                          <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-100 relative group">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-700">Your Learning Progress</span>
                              <span className="text-[11px] font-black text-emerald-700">
                                {Math.round((mockupCompletedModules / mockupTotalModules) * 100)}%
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between text-[9px] text-slate-400 mt-0.5">
                              <span>
                                <strong className="text-emerald-600 font-bold">{mockupCompletedModules}</strong>/{mockupTotalModules} modules completed
                              </span>
                              <button
                                onClick={() => {
                                  setMockupCompletedModules(prev => (prev < mockupTotalModules ? prev + 1 : 12));
                                  setMockupCelebration("+50 XP! 🚀");
                                  setTimeout(() => setMockupCelebration(null), 1800);
                                }}
                                className="text-[9px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-100/70 hover:bg-emerald-100 px-1.5 py-0.5 rounded transition-colors cursor-pointer"
                                title="Click to test completing a lesson"
                              >
                                +1 Lesson
                              </button>
                            </div>

                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                              <motion.div 
                                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                                initial={false}
                                animate={{ width: `${(mockupCompletedModules / mockupTotalModules) * 100}%` }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              />
                            </div>
                          </div>

                          {/* Interactive Streak Card */}
                          <div 
                            onClick={() => {
                              if (!mockupStreakClaimed) {
                                setMockupStreak(prev => prev + 1);
                                setMockupStreakClaimed(true);
                                setMockupCelebration("Streak Saved! 🔥");
                                setTimeout(() => setMockupCelebration(null), 1800);
                              }
                            }}
                            className="p-3 bg-slate-50/90 rounded-xl border border-slate-100 flex items-center justify-between cursor-pointer hover:border-orange-200 transition-colors"
                            title="Click to claim today's streak"
                          >
                            <div>
                              <span className="text-[10px] font-bold text-slate-700 block">Learning Streak</span>
                              <div className="flex items-center gap-1 mt-0.5">
                                <Flame className={`w-3.5 h-3.5 ${mockupStreakClaimed ? 'text-orange-500 fill-orange-500 animate-pulse' : 'text-orange-400'}`} />
                                <span className="text-xs font-black text-slate-900">{mockupStreak} days</span>
                              </div>
                              <span className="text-[9px] text-slate-400 block">
                                {mockupStreakClaimed ? "Streak claimed today! 🎯" : "Click flame to maintain!"}
                              </span>
                            </div>

                            <button 
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform active:scale-90 ${
                                mockupStreakClaimed ? 'bg-orange-500 text-white shadow-sm' : 'bg-orange-100 text-orange-600 hover:scale-110'
                              }`}
                            >
                              🔥
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* 2. MODULES VIEW */}
                      {mockupTab === 'modules' && (
                        <motion.div
                          key="modules"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">Curriculum Roadmap</h4>
                              <p className="text-[9px] text-slate-400">Click a lesson to toggle status</p>
                            </div>
                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                              45-Day Track
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {[
                              { day: 1, title: 'What is a Product Manager?', status: 'completed' },
                              { day: 2, title: 'Customer Discovery & Pain', status: 'completed' },
                              { day: 3, title: 'Prioritization with RICE', status: 'in-progress' },
                              { day: 4, title: 'Writing Engineering PRDs', status: 'upcoming' },
                            ].map((item) => {
                              const isDone = completedDemoDays.includes(item.day);
                              return (
                                <div
                                  key={item.day}
                                  onClick={() => {
                                    setCompletedDemoDays(prev => 
                                      prev.includes(item.day) ? prev.filter(d => d !== item.day) : [...prev, item.day]
                                    );
                                  }}
                                  className={`p-2 rounded-lg border text-[10px] flex items-center justify-between cursor-pointer transition-colors ${
                                    isDone 
                                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' 
                                      : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100/60'
                                  }`}
                                >
                                  <div className="flex items-center gap-1.5 truncate">
                                    <span className="font-bold text-[9px] text-slate-400">Day {item.day}</span>
                                    <span className="truncate font-medium">{item.title}</span>
                                  </div>
                                  <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${
                                    isDone ? 'bg-emerald-200/60 text-emerald-800' : 'bg-slate-200/70 text-slate-600'
                                  }`}>
                                    {isDone ? '✓ Done' : 'Pending'}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {/* 3. APPS & TOOLS VIEW */}
                      {mockupTab === 'apps' && (
                        <motion.div
                          key="apps"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="space-y-2.5"
                        >
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">Career Tools Suite</h4>
                            <p className="text-[9px] text-slate-400">Instant AI feedback for PM candidates</p>
                          </div>

                          <div className="space-y-2">
                            {/* LinkedIn Tool */}
                            <div className="p-2 bg-sky-50/70 border border-sky-100 rounded-xl flex items-center justify-between">
                              <div>
                                <p className="text-[10px] font-bold text-sky-950">LinkedIn Profile Audit</p>
                                <p className="text-[9px] text-sky-700">Score: 88/100 • Recruiter Ready</p>
                              </div>
                              <span className="px-2 py-1 bg-sky-600 text-white rounded-lg text-[9px] font-bold">
                                Live Audit
                              </span>
                            </div>

                            {/* Resume Tool */}
                            <div className="p-2 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center justify-between">
                              <div>
                                <p className="text-[10px] font-bold text-indigo-950">AI Resume ATS Checker</p>
                                <p className="text-[9px] text-indigo-700">94% PM Keyword Match</p>
                              </div>
                              <span className="px-2 py-1 bg-indigo-600 text-white rounded-lg text-[9px] font-bold">
                                94% Match
                              </span>
                            </div>

                            {/* PRD Generator */}
                            <div className="p-2 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-center justify-between">
                              <div>
                                <p className="text-[10px] font-bold text-emerald-950">PRD & Case Generator</p>
                                <p className="text-[9px] text-emerald-700">Structured 1-page PRDs</p>
                              </div>
                              <span className="px-2 py-1 bg-emerald-700 text-white rounded-lg text-[9px] font-bold">
                                Instant AI
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* 4. AI MOCK INTERVIEW VIEW */}
                      {mockupTab === 'interview' && (
                        <motion.div
                          key="interview"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold uppercase text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded border border-purple-200">
                              Google APM • Product Sense
                            </span>
                            <span className="text-[9px] text-slate-400 font-medium">Real-Time AI</span>
                          </div>

                          <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                            <p className="text-[10px] font-bold text-slate-800 leading-snug">
                              "How would you improve Google Maps for international travelers with poor mobile connectivity?"
                            </p>
                          </div>

                          {mockupInterviewState === 'prompt' && (
                            <div className="space-y-2">
                              <p className="text-[9px] text-slate-500">
                                Test our AI interview evaluator on this case:
                              </p>
                              <div className="flex items-center gap-2">
                                <div
                                  className="flex-1 bg-purple-600/90 text-white py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-default select-none pointer-events-none"
                                >
                                  <Sparkles className="w-3 h-3" />
                                  <span>Simulate AI Answer Evaluation</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {mockupInterviewState === 'evaluating' && (
                            <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-xl text-center space-y-1.5">
                              <div className="flex items-center justify-center gap-1 h-4">
                                <span className="w-1 bg-purple-500 h-3 rounded-full animate-bounce" />
                                <span className="w-1 bg-purple-600 h-5 rounded-full animate-bounce delay-75" />
                                <span className="w-1 bg-purple-400 h-4 rounded-full animate-bounce delay-150" />
                                <span className="w-1 bg-purple-700 h-2 rounded-full animate-bounce" />
                              </div>
                              <p className="text-[9px] font-bold text-purple-800">
                                AI evaluating user persona, edge cases, and North Star metrics...
                              </p>
                            </div>
                          )}

                          {mockupInterviewState === 'result' && (
                            <div className="space-y-2">
                              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-[9px]">
                                <div className="flex items-center justify-between font-bold text-emerald-900 mb-0.5">
                                  <span>Score: 9.4 / 10 • Outstanding</span>
                                  <span>Framework: CIRCLES</span>
                                </div>
                                <p className="text-emerald-800 leading-tight">
                                  "Identified offline latency pain-points; prioritized smart local caching and peer-to-peer itinerary sync."
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setMockupInterviewState('prompt')}
                                  className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[9px] font-bold transition-colors cursor-pointer"
                                >
                                  Try Another Simulation ↻
                                </button>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* 5. RESOURCES VIEW */}
                      {mockupTab === 'resources' && (
                        <motion.div
                          key="resources"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="space-y-2"
                        >
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">PM Resource Vault</h4>
                            <p className="text-[9px] text-slate-400">Curated casebooks and real PM templates</p>
                          </div>

                          <div className="space-y-1.5 text-[10px]">
                            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                              <div className="truncate">
                                <span className="font-bold text-slate-800 block truncate">📁 Google & Meta PM Casebook 2025</span>
                                <span className="text-[9px] text-slate-400">48 Solved Product Cases</span>
                              </div>
                              <span className="text-emerald-700 font-bold text-[9px] shrink-0">Included</span>
                            </div>

                            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                              <div className="truncate">
                                <span className="font-bold text-slate-800 block truncate">📊 RCA & Metrics Diagnosis Cheat Sheet</span>
                                <span className="text-[9px] text-slate-400">AARRR & North Star Models</span>
                              </div>
                              <span className="text-emerald-700 font-bold text-[9px] shrink-0">Included</span>
                            </div>
                          </div>

                          <div className="w-full text-center py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold mt-1">
                            50+ Curated PRDs & Case Studies
                          </div>
                        </motion.div>
                      )}

                      {/* 6. CAREER TOOLS VIEW */}
                      {mockupTab === 'career' && (
                        <motion.div
                          key="career"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="space-y-2.5"
                        >
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">Job Hunt Readiness</h4>
                            <p className="text-[9px] text-slate-400">Benchmark your readiness for PM recruiting</p>
                          </div>

                          <div className="space-y-2 text-[10px]">
                            <div>
                              <div className="flex justify-between font-bold text-slate-700 text-[9px] mb-1">
                                <span>ATS Keyword Match</span>
                                <span className="text-emerald-600">94%</span>
                              </div>
                              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full w-[94%] rounded-full" />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between font-bold text-slate-700 text-[9px] mb-1">
                                <span>Recruiter Discoverability</span>
                                <span className="text-sky-600">Top 5%</span>
                              </div>
                              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-sky-500 h-full w-[88%] rounded-full" />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between font-bold text-slate-700 text-[9px] mb-1">
                                <span>Mock Interview Confidence</span>
                                <span className="text-purple-600">Level 4/5</span>
                              </div>
                              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full w-[80%] rounded-full" />
                              </div>
                            </div>
                          </div>

                          <div className="w-full text-center py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-bold">
                            Readiness Score: 92/100 (Strong Candidate)
                          </div>
                        </motion.div>
                      )}

                      {/* 7. USER PROFILE VIEW */}
                      {mockupTab === 'profile' && (
                        <motion.div
                          key="profile"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="space-y-2.5"
                        >
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">Target Role & Track</h4>
                            <p className="text-[9px] text-slate-400">Customized roadmap based on your ambition</p>
                          </div>

                          {/* Role selector */}
                          <div className="flex gap-1.5">
                            {(['APM', 'PM Intern', 'Senior PM'] as const).map((role) => (
                              <button
                                key={role}
                                onClick={() => setMockupSelectedRole(role)}
                                className={`flex-1 py-1 rounded-lg text-[9px] font-bold border transition-colors cursor-pointer ${
                                  mockupSelectedRole === role
                                    ? 'bg-emerald-700 text-white border-emerald-700'
                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {role}
                              </button>
                            ))}
                          </div>

                          <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1 text-[9px]">
                            <span className="font-bold text-slate-700 block">Dream Companies:</span>
                            <div className="flex flex-wrap gap-1">
                              {['Google', 'Uber', 'Microsoft', 'Razorpay', 'Swiggy'].map((co) => (
                                <span key={co} className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-medium">
                                  {co}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="w-full text-center py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-[10px] font-bold border border-emerald-200/60">
                            Custom Roadmap Configured for {mockupSelectedRole}
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VALUE PROPS BAR ("TRUSTED LEARNING JOURNEY") */}
      <section className="py-12 bg-white/60 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Eyebrow pill */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-bold tracking-tight">
              <span>↳</span>
              <span>TRUSTED LEARNING JOURNEY</span>
              <span>🎓</span>
            </div>
          </div>

          {/* 4 Feature Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1: Structured Curriculum */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Structured Curriculum</h4>
                <p className="text-xs text-slate-500 mt-0.5">From basics to advanced</p>
              </div>
            </div>

            {/* 2: AI-Powered Tools */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">AI-Powered Tools</h4>
                <p className="text-xs text-slate-500 mt-0.5">Practice & improve faster</p>
              </div>
            </div>

            {/* 3: Real-World Projects */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Folder className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Real-World Projects</h4>
                <p className="text-xs text-slate-500 mt-0.5">Build job-ready portfolio</p>
              </div>
            </div>

            {/* 4: Supportive Community */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Supportive Community</h4>
                <p className="text-xs text-slate-500 mt-0.5">Learn together, grow together</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION ("WHAT OUR LEARNERS SAY") - CONTINUOUS AUTO-SCROLLING MARQUEE */}
      <section className="py-20 w-full overflow-hidden bg-[#FCFDFE]">
        
        {/* Section Header Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-bold tracking-tight mb-4">
            <span>💬</span>
            <span>WHAT OUR LEARNERS SAY</span>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Built by PMs. <span className="text-[#059669]">Loved by learners.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Real stories from aspiring and working product professionals.
            </p>
          </div>
        </div>

        {/* Full-width Marquee Track with Smooth Edge Gradients */}
        <div 
          className="relative w-full overflow-hidden marquee-container py-3"
          onMouseEnter={() => setIsMarqueePaused(true)}
          onMouseLeave={() => setIsMarqueePaused(false)}
          onTouchStart={() => setIsMarqueePaused(true)}
          onTouchEnd={() => setIsMarqueePaused(false)}
        >
          {/* Edge Fade Masks for Seamless In/Out Transition */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#FCFDFE] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#FCFDFE] to-transparent z-10" />

          {/* Continuously Scrolling Track */}
          <div 
            className="animate-marquee flex gap-5 sm:gap-6 w-max pl-4"
            style={{ animationPlayState: isMarqueePaused ? 'paused' : undefined }}
          >
            {marqueeCards.map((item, idx) => (
              <div 
                key={`${item.name}-${idx}`}
                className="w-[280px] sm:w-[350px] md:w-[360px] h-[220px] sm:h-[230px] shrink-0 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between select-none"
              >
                <div className="flex-1 flex flex-col justify-start overflow-hidden mb-4">
                  <p className="text-sm font-medium text-slate-700 leading-relaxed italic line-clamp-3 sm:line-clamp-4">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100/80">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 shrink-0 shadow-2xs">
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 truncate" title={item.role}>{item.role}</p>
                    </div>
                  </div>

                  {/* 5 Yellow Stars */}
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    {'★'.repeat(item.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALL-IN-ONE PLATFORM SECTION */}
      <section className="py-20 bg-white/60 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-4 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-bold tracking-tight">
                <span>⚡</span>
                <span>ALL-IN-ONE PLATFORM</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Your Entire PM Transition. <span className="text-[#059669] block">All Under One Roof.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                No need to juggle multiple courses, tools, and resources. The NooB PM gives you everything you need to upskill, practice, optimize, and land your offer.
              </p>

              <button
                onClick={() => navigate('/dashboard')}
                className="bg-[#064E3B] hover:bg-[#043C2C] text-white px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: 4 Feature Cards */}
            <div className="lg:col-span-8">
              
              {/* Playful Handwritten Annotation */}
              <div className="flex justify-end mb-3 pr-2">
                <span className="font-serif italic text-xs text-slate-600">
                  Learn. Build. Practice. Land. ⤹
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                
                {/* Card 01: 45-Day PM Launchpad */}
                <div 
                  onClick={() => navigate('/dashboard')}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-colors cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                        🎓
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">01</span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">45-Day PM Launchpad</h3>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      A step-by-step curriculum covering PM fundamentals, frameworks, and real-world case studies.
                    </p>

                    {/* Graphic Preview */}
                    <div className="my-4 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[10px]">
                      <span className="font-bold text-slate-800 block">Day 3</span>
                      <span className="text-slate-500 block text-[9px]">What is Product Management?</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/dashboard');
                    }}
                    className="w-full text-center py-2 text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50/70 hover:bg-rose-100/80 rounded-xl transition-colors cursor-pointer"
                  >
                    Start Learning →
                  </button>
                </div>

                {/* Card 02: LinkedIn Optimiser */}
                <div 
                  onClick={() => navigate('/tools/linkedin-optimiser')}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-colors cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
                        🔗
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">02</span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">LinkedIn Optimiser</h3>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      AI-powered profile audit with personalised suggestions to make you stand out to recruiters.
                    </p>

                    {/* Graphic Preview */}
                    <div className="my-4 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[10px]">
                      <div className="flex items-center justify-between text-[9px] font-bold text-slate-700">
                        <span>Profile Score</span>
                        <span className="text-sky-600">80/100 → 92/100</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                        <div className="bg-sky-500 h-full w-4/5 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/tools/linkedin-optimiser');
                    }}
                    className="w-full text-center py-2 text-[11px] font-bold text-sky-600 hover:text-sky-700 bg-sky-50/70 hover:bg-sky-100/80 rounded-xl transition-colors cursor-pointer"
                  >
                    Audit My Profile →
                  </button>
                </div>

                {/* Card 03: AI Mock Interview Studio */}
                <div 
                  onClick={() => navigate('/interview-studio')}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-colors cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                        ⚡
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">03</span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">AI Mock Interview Studio</h3>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      Practice PM, product sense, behavioural, and technical interviews with AI. Get instant feedback.
                    </p>

                    {/* Graphic Preview: Waveform Simulation */}
                    <div className="my-4 p-2.5 bg-purple-50/50 rounded-xl border border-purple-100 text-[10px] text-center">
                      <span className="text-[9px] font-semibold text-purple-700 block">Interview Simulation</span>
                      <div className="flex items-center justify-center gap-1 my-1.5 h-4">
                        <span className="w-1 bg-purple-400 h-2 rounded-full" />
                        <span className="w-1 bg-purple-600 h-4 rounded-full" />
                        <span className="w-1 bg-purple-500 h-3 rounded-full" />
                        <span className="w-1 bg-purple-300 h-1.5 rounded-full" />
                      </div>
                      <span className="text-[8px] text-purple-600">Product Sense</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/interview-studio');
                    }}
                    className="w-full text-center py-2 text-[11px] font-bold text-purple-600 hover:text-purple-700 bg-purple-50/70 hover:bg-purple-100/80 rounded-xl transition-colors cursor-pointer"
                  >
                    Start Practicing →
                  </button>
                </div>

                {/* Card 04: PM Toolkit & Frameworks */}
                <div 
                  onClick={() => navigate('/resources')}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-colors cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                        📁
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">04</span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">PM Toolkit & Frameworks</h3>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      PRD templates, case studies, frameworks, swipe files and more — everything in one place.
                    </p>

                    {/* Graphic Preview */}
                    <div className="my-4 p-2 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-[9px] text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <span className="text-rose-500">📄</span>
                        <span className="truncate">PRD Template</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-emerald-500">👤</span>
                        <span className="truncate">User Research Guide</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-blue-500">📊</span>
                        <span className="truncate">Metrics Cheat Sheet</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/resources');
                    }}
                    className="w-full text-center py-2 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100/80 rounded-xl transition-colors cursor-pointer"
                  >
                    Explore Resources →
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8 PROFESSIONAL PILLARS (COMPLETE SKILL BLUEPRINT) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow Pill */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-bold tracking-tight">
            <span>👁</span>
            <span>COMPLETE SKILL BLUEPRINT</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            8 Professional Pillars
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            A comprehensive curriculum calibrated against top hiring standards.
          </p>
        </div>

        {/* 8 Cards Grid (2 rows of 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${pillar.iconBg} ${pillar.iconColor} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ACTION-ORIENTED LEARNING (DARK FOREST GREEN SECTION) */}
      <section className="py-20 bg-[#07281E] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-bold tracking-tight">
                <span>🎯</span>
                <span>ACTION-ORIENTED LEARNING</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                Built for Action, Not Just Passive Reading.
              </h2>

              <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed">
                Learn by doing with hands-on projects, AI feedback, and real interview practice. Turn knowledge into confidence.
              </p>

              {/* Checklist */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm font-medium text-emerald-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Hands-on projects and deliverables</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-emerald-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>AI-powered feedback and scoring</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-emerald-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Real interview practice and improvements</span>
                </div>
              </div>

              {/* White Button */}
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white hover:bg-slate-100 text-[#07281E] px-7 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer mt-4"
              >
                <span>Start Your PM Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: 4 Connected Steps Pipeline + Job Ready PM Goal Card */}
            <div className="lg:col-span-7">
              
              {/* Playful Handwritten Script */}
              <div className="flex justify-end mb-4 pr-6">
                <span className="font-serif italic text-xs text-emerald-300">
                  From learning to landing 🚀
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* 4 Connected Vertical Steps */}
                <div className="md:col-span-7 space-y-3">
                  
                  {/* Step 1 */}
                  <div className="flex items-center gap-3.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Learn</h4>
                      <p className="text-[11px] text-emerald-200/70">Core frameworks & concepts</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-center gap-3.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Build</h4>
                      <p className="text-[11px] text-emerald-200/70">Real projects & case studies</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-center gap-3.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Practice</h4>
                      <p className="text-[11px] text-emerald-200/70">AI mock interviews & get feedback</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-center gap-3.5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Grow</h4>
                      <p className="text-[11px] text-emerald-200/70">Track progress & land your dream role</p>
                    </div>
                  </div>

                </div>

                {/* Arrow to Goal Card */}
                <div className="hidden md:flex justify-center text-emerald-500 md:col-span-1">
                  <ArrowRight className="w-6 h-6" />
                </div>

                {/* Goal Card: "Job Ready PM" */}
                <div className="md:col-span-4 bg-[#0A3326] border border-emerald-600/40 p-5 rounded-2xl text-center shadow-xl">
                  <div className="w-12 h-12 rounded-full bg-emerald-900/80 text-emerald-300 flex items-center justify-center mx-auto mb-3 text-xl">
                    🎯
                  </div>

                  <h3 className="text-sm font-black text-white">Job Ready PM</h3>

                  <div className="space-y-1.5 my-4 text-[11px] text-emerald-100/90 text-left">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Strong Portfolio</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Interview Ready</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Confident & Skilled</span>
                    </div>
                  </div>

                  <div className="w-full bg-[#34D399] text-[#07281E] font-black text-xs py-2 rounded-full select-none text-center shadow-xs">
                    You Got This!
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* READY TO BECOME A PRODUCT MANAGER? (BOTTOM CTA BANNER) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-emerald-100/80 border border-emerald-200/80 rounded-3xl p-8 sm:p-14 relative overflow-hidden text-center shadow-sm">
          
          {/* Decorative Loop Doodle on Left */}
          <div className="absolute left-6 top-8 hidden sm:block opacity-60 text-amber-500">
            <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M10 60 Q 30 20, 50 60 T 90 60" strokeLinecap="round" />
            </svg>
          </div>

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 border border-emerald-300/60 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-4">
            <span>READY TO START?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ready to become a Product Manager?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-md mx-auto">
            Learn, practice, and build your way into Product Management.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto bg-[#064E3B] hover:bg-[#043C2C] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Playful Handwritten Bubble on Right */}
          <div className="absolute right-6 bottom-6 hidden lg:flex items-center gap-2 text-slate-600 font-serif italic text-xs">
            <svg className="w-5 h-5 text-slate-400 rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M15 6l6 6-6 6" />
            </svg>
            <span>Better PMs build a better world.</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100">
            
            {/* Col 1: Brand & Bio */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <Logo className="w-8 h-8 shrink-0" />
                <div>
                  <span className="block font-black text-base text-slate-900 tracking-tight leading-none">The NooB PM</span>
                  <span className="text-[7px] font-black text-emerald-600 uppercase tracking-wider block mt-0.5">ONE-STOP PM SOLUTION</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Helping the next generation of Product Managers.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2 text-slate-500">
                <a 
                  href="https://www.linkedin.com/company/the-noob-pm/?viewAsMember=true" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors"
                  aria-label="LinkedIn"
                >
                  <span className="font-bold text-xs">in</span>
                </a>
                <a 
                  href="https://www.youtube.com/@THE_NOOB_PM" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:text-red-600 hover:border-red-600 transition-colors"
                  aria-label="YouTube"
                >
                  <span className="font-bold text-xs">▶</span>
                </a>
              </div>
            </div>

            {/* Col 2: Product */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-emerald-700 transition-colors cursor-pointer">Learn</button></li>
                <li><button onClick={() => navigate('/interview-studio')} className="hover:text-emerald-700 transition-colors cursor-pointer">AI Mock Interview</button></li>
                <li><button onClick={() => navigate('/tools')} className="hover:text-emerald-700 transition-colors cursor-pointer">Resume Tools</button></li>
                <li><button onClick={() => navigate('/resources')} className="hover:text-emerald-700 transition-colors cursor-pointer">Resources</button></li>
                <li><a href="https://chat.whatsapp.com/GhkzK8bDAUwLAKfLw7hfbW" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition-colors">Community</a></li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><button onClick={() => navigate('/dashboard/about')} className="hover:text-emerald-700 transition-colors cursor-pointer">About</button></li>
                <li><span className="text-slate-400">Blog</span></li>
                <li><span className="text-slate-400">Careers</span></li>
                <li><a href="mailto:contact@thenoobpm.com" className="hover:text-emerald-700 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Col 4: Legal */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><span className="text-slate-400">Privacy Policy</span></li>
                <li><span className="text-slate-400">Terms of Service</span></li>
              </ul>
            </div>

            {/* Col 5: Join our newsletter */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Join our newsletter</h4>
              <p className="text-xs text-slate-500">
                Get the latest PM resources, case studies and updates.
              </p>

              {newsletterSubmitted ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Subscribed! Check your inbox.</span>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail.trim()) {
                      setNewsletterSubmitted(true);
                    }
                  }}
                  className="flex items-center gap-1.5"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-[#064E3B] hover:bg-[#043C2C] text-white rounded-xl transition-colors cursor-pointer shrink-0"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Bottom Copyright & Made With Love */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p>© 2026 The NooB PM. All rights reserved.</p>
            <p>Made with ❤️ for aspiring PMs</p>
          </div>
        </div>
      </footer>

    </div>
  );
};
