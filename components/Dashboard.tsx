
import React, { useEffect } from 'react';
import { MODULES, LESSONS } from '../constants';
import { DayCard } from './DayCard';
import { motion } from 'framer-motion';
import { PlayCircle, Star, Zap, GraduationCap, Target, RefreshCw } from 'lucide-react';
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

  // Defensive scroll to top on mount/navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Extract the specific module from the URL (e.g., /dashboard/strategy -> strategy)
  const pathParts = (location.pathname || '').split('/').filter(Boolean);
  const path = pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'dashboard';
  
  const filteredLessons = LESSONS.filter(lesson => {
    // If we are at the main dashboard index or the segment is 'dashboard', show everything
    if (!path || path.toLowerCase() === 'dashboard') return true;
    
    // Safety check for lesson category
    if (!lesson.category) return false;

    // Exact case-insensitive matching between the URL segment and the constant Category string
    const normalizedCategory = lesson.category.toLowerCase().replace(/\s+/g, '');
    const normalizedPath = (path || '').toLowerCase();
    
    return normalizedCategory === normalizedPath;
  });

  const handleRestore = () => {
    navigate('/dashboard');
  };

  const getModuleTitle = () => {
    const safePath = (path || '').toLowerCase();
    if (safePath === 'dashboard' || !safePath) return 'Full Curriculum';
    
    const activeModule = MODULES.find(m => m.id && m.id.toLowerCase() === safePath);
    return activeModule ? `${activeModule.title} Module` : 'Module Curriculum';
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 md:space-y-12 pb-12 relative"
    >
      {/* Restore Button - Only show when filtering */}
      {path && path.toLowerCase() !== 'dashboard' && (
        <button 
          onClick={handleRestore}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] bg-zinc-900 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl border border-zinc-800 hover:bg-black transition-all group"
        >
          <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          View All Days
        </button>
      )}

      {/* Hero Welcome */}
      <header className="relative bg-zinc-950 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-600/20 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-purple-600/10 rounded-full blur-[60px] md:blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 max-w-4xl">
            <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-current" /> 
                45-Day PM Launchpad
            </motion.div>
            <motion.h1 variants={item} className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.95]">
                Forge Your Path <br/>
                as a <span className="text-[#79BAEC]">Product Pro.</span>
            </motion.h1>
            <motion.p variants={item} className="text-zinc-400 text-sm md:text-xl max-w-2xl leading-relaxed font-medium mb-10">
                A structured, outcome-oriented curriculum designed by industry experts to turn curiosity into career competence.
            </motion.p>
            
            <motion.div variants={item} className="flex flex-wrap gap-8 md:gap-12 pt-6 border-t border-white/5">
                {[
                  { label: 'Total Days', value: '45 Days', icon: Target },
                  { label: 'Daily Goal', value: '1 Lesson', icon: Zap }
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

      {/* Curriculum Section */}
      <div className="space-y-8 md:space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
          <motion.div variants={item}>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tighter mb-2 flex items-center gap-4">
              <GraduationCap className="w-8 h-8 md:w-12 md:h-12 text-[#79BAEC]" />
              {getModuleTitle()}
            </h2>
            <p className="text-zinc-500 text-sm md:text-base font-bold italic">Master every dimension of the Product Manager role, day by day.</p>
          </motion.div>
          
          <motion.div variants={item} className="flex gap-2 p-1.5 bg-zinc-100 rounded-2xl border border-zinc-200 shadow-inner">
             <button className="px-5 py-2 rounded-xl bg-white text-zinc-900 shadow-sm text-xs font-black uppercase tracking-widest">Grid View</button>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          key={path || 'root'}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10"
        >
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson, idx) => (
              <motion.div key={lesson.day} variants={item}>
                <DayCard lesson={lesson} index={idx} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-zinc-200">
              <p className="text-zinc-400 font-bold">No lessons found for this category yet.</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
