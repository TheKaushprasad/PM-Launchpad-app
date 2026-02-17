import React from 'react';
import { MODULES, LESSONS } from '../constants';
import { DayCard } from './DayCard';
import { motion } from 'framer-motion';
import { Star, Zap, GraduationCap, Target, RefreshCw, LayoutGrid } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathParts = (location.pathname || '').split('/').filter(Boolean);
  const rawPath = pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'dashboard';
  
  const isLessonRoute = pathParts.includes('day');
  const path = isLessonRoute ? 'dashboard' : rawPath;
  
  const filteredLessons = LESSONS.filter(lesson => {
    if (!path || path.toLowerCase() === 'dashboard') return true;
    if (!lesson.category) return false;

    const normalizedPath = path.toLowerCase();
    const normalizedCategory = lesson.category.toLowerCase().replace(/\s+/g, '');
    
    return normalizedCategory === normalizedPath;
  });

  const handleRestore = () => {
    navigate('/dashboard');
  };

  const getModuleTitle = () => {
    const safePath = (path || '').toLowerCase();
    if (safePath === 'dashboard') return 'Full Curriculum';
    
    const activeModule = MODULES.find(m => m.id && m.id.toLowerCase() === safePath);
    return activeModule ? `${activeModule.title} Module` : 'Full Curriculum';
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12 pb-20 relative px-4 md:px-8 max-w-7xl mx-auto"
    >
      {/* Restore Button */}
      {path && path.toLowerCase() !== 'dashboard' && (
        <button 
          onClick={handleRestore}
          className="fixed bottom-8 right-8 z-[100] bg-zinc-900 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl hover:bg-black transition-all group"
        >
          <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          View All Lessons
        </button>
      )}

      {/* Hero Welcome */}
      <header className="relative bg-zinc-950 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 max-w-4xl">
            <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-current" /> 
                45-Day PM Launchpad
            </motion.div>
            <motion.h1 variants={item} className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9] text-white">
                Build Your <br/>
                <span className="text-[#79BAEC]">PM Career.</span>
            </motion.h1>
            <motion.p variants={item} className="text-zinc-400 text-base md:text-xl max-w-2xl leading-relaxed font-medium mb-12">
                A high-intensity, structured curriculum designed to transform aspiring talent into industry-ready product professionals.
            </motion.p>
            
            <motion.div variants={item} className="flex flex-wrap gap-8 md:gap-16 pt-8 border-t border-white/5">
                {[
                  { label: 'Intensity', value: '45 Days', icon: Target },
                  { label: 'Milestones', value: '8 Pillars', icon: Zap },
                  { label: 'Outcome', value: 'Portfolio', icon: GraduationCap }
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <stat.icon className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <div className="text-lg md:text-xl font-black text-white">{stat.value}</div>
                  </div>
                ))}
            </motion.div>
        </div>
      </header>

      {/* Curriculum Grid Section */}
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-8">
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 text-[#79BAEC] mb-2">
               <GraduationCap className="w-5 h-5" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Learning Path</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight">
              {getModuleTitle()}
            </h2>
          </motion.div>
          
          <motion.div variants={item} className="flex items-center gap-3">
             <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hidden sm:block">View Mode</p>
             <div className="flex gap-1 p-1 bg-zinc-100 rounded-xl">
                <button className="p-2 rounded-lg bg-white shadow-sm text-zinc-900"><LayoutGrid className="w-4 h-4" /></button>
             </div>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          key={path}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson, idx) => (
              <motion.div key={lesson.day} variants={item}>
                <DayCard lesson={lesson} index={idx} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-dashed border-zinc-200">
              <p className="text-zinc-400 font-bold">No modules unlocked in this section yet.</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};