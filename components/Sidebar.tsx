import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, BookOpen, Search, BarChart2, Smartphone, 
  Bot, Info, ChevronRight, ChevronDown, Sparkles, Zap, ArrowRight, Code, Briefcase,
  Library, LogIn, LogOut, Layers, User as UserIcon, Menu, X, FolderKanban
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModal';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  collapsed?: boolean;
  setCollapsed?: (val: boolean) => void;
}

const MODULE_ITEMS = [
  { label: 'Foundations', icon: BookOpen, path: '/dashboard/foundations' },
  { label: 'Research', icon: Search, path: '/dashboard/research' },
  { label: 'Strategy', icon: Zap, path: '/dashboard/strategy' },
  { label: 'Data', icon: BarChart2, path: '/dashboard/data' },
  { label: 'Tech', icon: Code, path: '/dashboard/tech' },
  { label: 'AI', icon: Bot, path: '/dashboard/ai' },
  { label: 'Design', icon: Smartphone, path: '/dashboard/design' },
  { label: 'Job Ready', icon: Briefcase, path: '/dashboard/jobready' },
];

const OTHER_NAV_ITEMS = [
  { label: 'AI Mock Interview', icon: Sparkles, path: '/interview-studio', badge: 'AI' },
  { label: 'Real-World Projects', icon: FolderKanban, path: '/projects' },
  { label: 'PM Jobs', icon: Briefcase, path: '/jobs', badge: 'New' },
  { label: 'Resources', icon: BookOpen, path: '/resources' },
  { label: 'Career Tools', icon: Zap, path: '/tools' },
  { label: 'User Profile', icon: UserIcon, path: '/profile' },
];

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen, collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, signInWithGoogle, logout, completedCount } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const isModuleActive = location.pathname === '/dashboard' || location.pathname === '/modules' || MODULE_ITEMS.some(m => location.pathname === m.path || location.pathname.startsWith(m.path));
  // Under /#/dashboard, the Modules dropdown should not be already expanded unless the user clicks on it
  const [modulesOpen, setModulesOpen] = useState<boolean>(() => {
    return location.pathname.startsWith('/dashboard/') && location.pathname !== '/dashboard';
  });

  // Keep modules expanded if an individual module sub-route is active; keep collapsed under /dashboard unless user clicks on it
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard/') && location.pathname !== '/dashboard') {
      setModulesOpen(true);
    } else if (location.pathname === '/dashboard') {
      setModulesOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        redirectTo={location.pathname === '/' ? '/dashboard' : location.pathname}
      />

      {mobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-zinc-900/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-40
          bg-white border-r border-zinc-100 
          ${collapsed ? 'w-20' : 'w-72'} h-full flex flex-col
          transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className={`p-5 sm:p-6 ${collapsed ? 'px-3 flex flex-col items-center gap-3' : 'flex items-center justify-between'}`}>
           <div className="flex items-center gap-2.5">
              {setCollapsed && (
                <button
                  type="button"
                  onClick={() => setCollapsed(!collapsed)}
                  className="hidden md:flex p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border border-slate-200/70 shadow-2xs items-center justify-center shrink-0"
                  title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                  aria-label="Toggle sidebar"
                >
                  <Menu className="w-5 h-5 text-slate-700" />
                </button>
              )}
              <Link to="/" className="flex items-center gap-2.5 group">
                 <Logo className="w-9 h-9 shrink-0" />
                 {!collapsed && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                     <span className="block font-black text-lg text-slate-900 tracking-tight leading-none">The NooB PM</span>
                     <span className="text-[8px] font-black text-emerald-600 uppercase tracking-wider block mt-0.5">ONE-STOP PM SOLUTION</span>
                   </motion.div>
                 )}
              </Link>
           </div>
           <button
             type="button"
             onClick={() => setMobileOpen(false)}
             className="md:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
             aria-label="Close sidebar"
           >
             <X className="w-5 h-5" />
           </button>
        </div>

        {/* User Auth Profile / Progress Bar */}
        {!collapsed && (
          <div className="px-6 pb-2">
            {user ? (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Link to="/profile" className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt="Avatar" 
                        className="w-8 h-8 rounded-full border border-brand-200 object-cover shrink-0" 
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <span className="text-xs font-black text-slate-900 block truncate leading-tight">
                        {user.displayName || 'PM Aspiring Talent'}
                      </span>
                    </div>
                  </Link>
                  <button 
                    onClick={logout}
                    title="Sign Out"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-end text-[10px] font-bold">
                  <span className="text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    {completedCount}/45 Days
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#064E3B] hover:bg-[#043C2C] active:scale-[0.98] text-white flex items-center justify-center gap-2 font-semibold text-sm transition-all cursor-pointer"
                >
                  <span>Sign in or sign up</span>
                </button>
                <button
                  onClick={() => signInWithGoogle()}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-zinc-50 active:scale-[0.98] border border-zinc-200 text-zinc-700 flex items-center justify-center gap-2 font-semibold text-xs transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            )}
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 no-scrollbar">
          {/* 1. Primary Dashboard Item */}
          {(() => {
            const isDashActive = location.pathname === '/dashboard' || location.pathname === '/';
            return (
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={`
                  relative flex items-center ${collapsed ? 'justify-center' : 'gap-4 px-5'} py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-300 group
                  ${isDashActive 
                    ? 'text-[#065F46] bg-[#34D399]/10' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}
                `}
              >
                {isDashActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-[#34D399]/5 rounded-2xl border border-[#34D399]/10"
                  />
                )}
                <LayoutDashboard className={`w-[20px] h-[20px] relative z-10 ${isDashActive ? 'text-[#065F46]' : 'text-zinc-400 group-hover:text-zinc-700'}`} />
                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between relative z-10">
                    <span className="tracking-tight">Dashboard</span>
                  </div>
                )}
                {!collapsed && isDashActive && <ChevronRight className="w-4 h-4 text-[#34D399] relative z-10" />}
              </Link>
            );
          })()}

          {/* 2. Collapsible Modules Section Directly Below Dashboard */}
          {!collapsed ? (
            <div className="pt-2 pb-1">
              <div
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-[15px] font-bold transition-all select-none cursor-pointer ${
                  isModuleActive 
                    ? 'text-brand-600 bg-brand-50 border border-brand-100 shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                onClick={() => {
                  if (location.pathname !== '/dashboard') {
                    navigate('/dashboard');
                  } else {
                    setModulesOpen(prev => !prev);
                  }
                }}
              >
                <div className="flex items-center gap-4">
                  <Layers className={`w-5 h-5 ${isModuleActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span>Modules</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isModuleActive 
                      ? 'bg-brand-100 text-brand-700' 
                      : 'bg-slate-200/80 text-slate-700'
                  }`}>
                    8
                  </span>
                  <button
                    type="button"
                    aria-label="Toggle modules list"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModulesOpen(prev => !prev);
                    }}
                    className="p-0.5 rounded hover:bg-black/5 transition-colors"
                  >
                    <motion.div
                      animate={{ rotate: modulesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className={`w-4 h-4 ${isModuleActive ? 'text-brand-600' : 'text-slate-400'}`} />
                    </motion.div>
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {modulesOpen && (
                  <motion.div
                    id="sidebar-modules-dropdown-menu"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden space-y-0.5 pt-1 pl-2"
                  >
                    {MODULE_ITEMS.map((item) => {
                      const isActive = location.pathname === item.path || location.pathname.startsWith(item.path);
                      const Icon = item.icon as React.ElementType;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          className={`
                            relative flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[14px] font-bold transition-all duration-200 group
                            ${isActive 
                              ? 'text-[#065F46] bg-[#34D399]/15 font-black' 
                              : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}
                          `}
                        >
                          <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-[#065F46]' : 'text-zinc-400 group-hover:text-zinc-700'}`} />
                          <span className="tracking-tight relative z-10 flex-1">{item.label}</span>
                          {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#065F46] relative z-10" />}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="h-px bg-zinc-100 my-3 mx-2" />
          )}

          {/* Divider for Other App Sections */}
          {!collapsed ? (
            <div className="px-4 pt-4 pb-2">
              <p className="text-xs font-semibold text-zinc-400">Apps and tools</p>
            </div>
          ) : (
            <div className="h-px bg-zinc-100 my-4 mx-2" />
          )}

          {/* 3. Other Navigation Items */}
          {OTHER_NAV_ITEMS.map((item, index) => {
            const itemPath = item.path || '';
            const isActive = itemPath ? (location.pathname === itemPath || (itemPath !== '/dashboard' && itemPath !== '/' && location.pathname.startsWith(itemPath))) : false;
            const Icon = item.icon as React.ElementType;
            
            return (
              <Link
                key={itemPath || String(index)}
                to={itemPath || '#'}
                onClick={() => setMobileOpen(false)}
                className={`
                  relative flex items-center ${collapsed ? 'justify-center' : 'gap-4 px-5'} py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-300 group
                  ${isActive 
                    ? 'text-[#065F46] bg-[#34D399]/10' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-[#34D399]/5 rounded-2xl border border-[#34D399]/10"
                  />
                )}
                <Icon className={`w-[20px] h-[20px] relative z-10 ${isActive ? 'text-[#065F46]' : 'text-zinc-400 group-hover:text-zinc-700'}`} />
                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between relative z-10">
                    <span className="tracking-tight">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-500 text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
                {!collapsed && isActive && !item.badge && <ChevronRight className="w-4 h-4 text-[#34D399] relative z-10" />}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="p-6">
            <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-4">
              <p className="text-[#064E3B] text-sm font-bold mb-1">Want expert help?</p>
              <p className="text-zinc-600 text-xs leading-relaxed mb-3">1-on-1 resume reviews and expert mock interviews.</p>
              <a 
                href="https://docs.google.com/forms/u/0/d/1gntWQiHg_RBueOSOqZzVQiJ4UGfMIvyuAYUsiuxbOUc/preview" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#047857] hover:text-[#043C2C] text-xs font-semibold underline-offset-4 hover:underline"
              >
                Request a session <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};