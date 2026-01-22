
import React from 'react';
import { 
  LayoutDashboard, BookOpen, Search, BarChart2, Smartphone, 
  Bot, Info, ChevronRight, Sparkles, Zap, Code, Briefcase
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Full Syllabus', icon: Info, path: '/dashboard/about' },
  { type: 'divider', label: 'Modules' },
  { label: 'Foundations', icon: BookOpen, path: '/dashboard/foundations' },
  { label: 'Research', icon: Search, path: '/dashboard/research' },
  { label: 'Strategy', icon: Zap, path: '/dashboard/strategy' },
  { label: 'Data', icon: BarChart2, path: '/dashboard/data' },
  { label: 'Tech', icon: Code, path: '/dashboard/tech' },
  { label: 'AI', icon: Bot, path: '/dashboard/ai' },
  { label: 'Design', icon: Smartphone, path: '/dashboard/design' },
  { label: 'Job Ready', icon: Briefcase, path: '/dashboard/jobready' },
];

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();

  return (
    <>
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
          w-72 h-full flex flex-col
          transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-8">
           <Link to="/" className="flex flex-col group">
              <div>
                <span className="block font-black text-2xl text-zinc-900 tracking-tighter leading-none">The NooB PM</span>
                <span className="text-[10px] text-[#79BAEC] font-black tracking-widest uppercase mt-1 block">45-Day Path</span>
              </div>
           </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 no-scrollbar">
          {NAV_ITEMS.map((item, index) => {
            if (item.type === 'divider') {
               return (
                 <div key={index} className="px-4 pt-8 pb-3">
                   <p className="text-[12px] font-black text-zinc-400 uppercase tracking-[0.2em]">{item.label}</p>
                 </div>
               )
            }

            const isActive = location.pathname === item.path;
            const Icon = item.icon as React.ElementType;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  relative flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-300 group
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
                <Icon className={`w-[18px] h-[18px] relative z-10 ${isActive ? 'text-[#2D5A81]' : 'text-zinc-400 group-hover:text-zinc-700'}`} />
                <span className="flex-1 relative z-10 tracking-tight">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-[#79BAEC] relative z-10" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
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
      </aside>
    </>
  );
};
