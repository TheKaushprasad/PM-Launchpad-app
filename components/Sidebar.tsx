import React from 'react';
import { LayoutDashboard, BookOpen, Search, BarChart2, PenTool, Bot, Info, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'About Program', icon: Info, path: '/dashboard/about' },
  { type: 'divider', label: 'Modules' },
  { label: 'Foundations', icon: BookOpen, path: '/dashboard/foundations' },
  { label: 'Research', icon: Search, path: '/dashboard/research' },
  { label: 'Data & Analytics', icon: BarChart2, path: '/dashboard/data' },
  { label: 'Tech & Design', icon: PenTool, path: '/dashboard/design' },
  { label: 'AI & Future', icon: Bot, path: '/dashboard/ai' },
];

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-zinc-900/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-40
          bg-white border-r border-zinc-200 
          w-72 h-full flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
          ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0 md:shadow-none'}
        `}
      >
        {/* Logo Area */}
        <div className="p-8 pb-6">
           <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
              <Logo className="w-10 h-10 group-hover:scale-105 transition-transform" />
              <div>
                <span className="block font-bold text-xl text-zinc-800 tracking-tighter leading-none">The NooB PM</span>
                <span className="text-xs text-zinc-500 font-semibold tracking-widest uppercase">Academy</span>
              </div>
           </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
          {NAV_ITEMS.map((item, index) => {
            if (item.type === 'divider') {
               return (
                 <div key={index} className="px-4 py-4 mt-2">
                   <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.label}</p>
                 </div>
               )
            }

            // Simple check if path partially matches to keep section highlighted
            const isActive = location.pathname === item.path;
            const Icon = item.icon as React.ElementType;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
                  ${isActive 
                    ? 'text-indigo-600 bg-indigo-50/80' 
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}
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
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-600' : 'text-zinc-400 group-hover:text-zinc-600'}`} />
                <span className="flex-1 tracking-tight">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-indigo-400" />}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};