import React from 'react';
import { LayoutDashboard, BookOpen, Search, BarChart2, PenTool, Bot, Info, ChevronRight, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'About Program', icon: Info, path: '/about' },
  { type: 'divider', label: 'Modules' },
  { label: 'Foundations', icon: BookOpen, path: '/foundations' },
  { label: 'Research', icon: Search, path: '/research' },
  { label: 'Data & Analytics', icon: BarChart2, path: '/data' },
  { label: 'Tech & Design', icon: PenTool, path: '/design' },
  { label: 'AI & Future', icon: Bot, path: '/ai' },
];

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-40
          bg-white border-r border-slate-200 
          w-72 h-full flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
          ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0 md:shadow-none'}
        `}
      >
        {/* Logo Area */}
        <div className="p-8 pb-6">
           <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">PM</div>
              <div>
                <span className="block font-bold text-xl text-slate-800 tracking-tight leading-none">Launchpad</span>
                <span className="text-xs text-slate-500 font-medium tracking-wider uppercase">Academy</span>
              </div>
           </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
          {NAV_ITEMS.map((item, index) => {
            if (item.type === 'divider') {
               return (
                 <div key={index} className="px-4 py-4 mt-2">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                 </div>
               )
            }

            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            const Icon = item.icon as React.ElementType;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'text-indigo-600 bg-indigo-50/80' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-indigo-400" />}
              </Link>
            );
          })}
        </nav>
        
        {/* User Profile Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white">
                    {user?.profile?.fullName ? user.profile.fullName.substring(0,2).toUpperCase() : 'PM'}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-700 truncate group-hover:text-indigo-700">
                        {user?.profile?.fullName || 'Aspiring PM'}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium truncate">
                        {user?.profile?.designation || user?.profile?.degreeName || 'Learner'}
                      </span>
                    </div>
                </div>
                <button 
                  onClick={logout}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
            </div>
        </div>
      </aside>
    </>
  );
};