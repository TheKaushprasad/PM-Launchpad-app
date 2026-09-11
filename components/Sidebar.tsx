import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, BookOpen, Search, BarChart2, Smartphone, 
  Bot, Info, ChevronRight, ChevronDown, Sparkles, Zap, Code, Briefcase,
  Library, LogIn, LogOut, Layers, User as UserIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
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
  { label: 'Resources', icon: Library, path: '/resources' },
  { label: 'Career Tools', icon: Zap, path: '/tools' },
  { label: 'User Profile', icon: UserIcon, path: '/profile' },
];

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen, collapsed }) => {
  const location = useLocation();
  const { user, userProfile, signInWithGoogle, logout, completedCount } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const isModuleActive = MODULE_ITEMS.some(m => location.pathname === m.path || location.pathname.startsWith(m.path));
  const [modulesOpen, setModulesOpen] = useState<boolean>(true);

  // Keep modules expanded if a module route is active
  useEffect(() => {
    if (isModuleActive) {
      setModulesOpen(true);
    }
  }, [isModuleActive]);

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
        <div className={`p-8 ${collapsed ? 'px-4 flex justify-center' : ''}`}>
           <Link to="/" className="flex items-center gap-3 group">
              <Logo className="w-12 h-12" />
              {!collapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <span className="block font-black text-xl text-zinc-900 tracking-tighter leading-none">The NooB PM</span>
                </motion.div>
              )}
           </Link>
        </div>

        {/* User Auth Profile / Progress Bar */}
        {!collapsed && (
          <div className="px-6 pb-2">
            {user ? (
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-sm space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Link to="/profile" className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt="Avatar" 
                        className="w-8 h-8 rounded-full border border-indigo-200 object-cover shrink-0" 
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <span className="text-xs font-black text-zinc-900 block truncate leading-tight">
                        {user.displayName || 'PM Aspiring Talent'}
                      </span>
                    </div>
                  </Link>
                  <button 
                    onClick={logout}
                    title="Sign Out"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress */}
                <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-end text-[10px] font-bold">
                  <span className="text-zinc-600 bg-white px-2 py-0.5 rounded-full border border-zinc-200">
                    {completedCount}/45 Days
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <button
                  onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
                  className="w-full p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 font-bold text-xs transition-all shadow-sm group"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Sign Up</span>
                </button>
                <button
                  onClick={() => signInWithGoogle()}
                  className="w-full p-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center justify-center gap-2 font-bold text-[11px] transition-all"
                >
                  <span>Google 1-Tap</span>
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
                    ? 'text-[#2D5A81] bg-[#79BAEC]/10' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}
                `}
              >
                {isDashActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-[#79BAEC]/5 rounded-2xl border border-[#79BAEC]/10"
                  />
                )}
                <LayoutDashboard className={`w-[20px] h-[20px] relative z-10 ${isDashActive ? 'text-[#2D5A81]' : 'text-zinc-400 group-hover:text-zinc-700'}`} />
                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between relative z-10">
                    <span className="tracking-tight">Dashboard</span>
                  </div>
                )}
                {!collapsed && isDashActive && <ChevronRight className="w-4 h-4 text-[#79BAEC] relative z-10" />}
              </Link>
            );
          })()}

          {/* 2. Collapsible Modules Section Directly Below Dashboard */}
          {!collapsed ? (
            <div className="pt-2 pb-1">
              <button
                type="button"
                onClick={() => setModulesOpen(prev => !prev)}
                className={`w-full flex items-center justify-between px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.15em] transition-all select-none ${
                  isModuleActive 
                    ? 'text-[#2D5A81] bg-sky-50/70 hover:bg-sky-100/70' 
                    : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className={`w-4 h-4 ${isModuleActive ? 'text-[#2D5A81]' : 'text-zinc-400'}`} />
                  <span>Modules</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-200/70 text-zinc-700">
                    8
                  </span>
                  <motion.div
                    animate={{ rotate: modulesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {modulesOpen && (
                  <motion.div
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
                              ? 'text-[#2D5A81] bg-[#79BAEC]/15 font-black' 
                              : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}
                          `}
                        >
                          <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-[#2D5A81]' : 'text-zinc-400 group-hover:text-zinc-700'}`} />
                          <span className="tracking-tight relative z-10 flex-1">{item.label}</span>
                          {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#2D5A81] relative z-10" />}
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
              <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em]">Apps & Tools</p>
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
                    ? 'text-[#2D5A81] bg-[#79BAEC]/10' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-[#79BAEC]/5 rounded-2xl border border-[#79BAEC]/10"
                  />
                )}
                <Icon className={`w-[20px] h-[20px] relative z-10 ${isActive ? 'text-[#2D5A81]' : 'text-zinc-400 group-hover:text-zinc-700'}`} />
                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between relative z-10">
                    <span className="tracking-tight">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
                {!collapsed && isActive && !item.badge && <ChevronRight className="w-4 h-4 text-[#79BAEC] relative z-10" />}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="p-6">
            <div className="bg-zinc-950 rounded-[2rem] p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-20"><Sparkles className="w-12 h-12 text-[#79BAEC]" /></div>
              <p className="text-white text-sm font-black uppercase tracking-widest mb-2 relative z-10">Pro Upgrade</p>
              <p className="text-zinc-400 text-[10px] leading-relaxed mb-5 relative z-10 font-bold">1-on-1 resume reviews and expert mock interviews.</p>
              <a 
                href="https://docs.google.com/forms/u/0/d/1gntWQiHg_RBueOSOqZzVQiJ4UGfMIvyuAYUsiuxbOUc/preview" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-3 bg-[#79BAEC] text-zinc-950 text-[12px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors relative z-10 shadow-lg text-center"
              >
                Unlock Now
              </a>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};