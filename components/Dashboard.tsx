import React from 'react';
import { MODULES, LESSONS } from '../constants';
import { DayCard } from './DayCard';
import { motion } from 'framer-motion';
import { Award, Calendar, PlayCircle, Star, Zap, GraduationCap, Target, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  const handleRestore = () => {
    window.location.reload();
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 md:space-y-12 pb-12 relative"
    >
      {/* Restore Button - Hidden on mobile or moved for better mobile UX */}
      <button 
        onClick={handleRestore}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] bg-zinc-900 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 md:gap-3 border border-white/10 hover:bg-zinc-800 transition-all hover:scale-105"
      >
        <RefreshCw className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
        <span className="hidden sm:inline">Restore System</span>
        <span className="sm:hidden">Restore</span>
      </button>

      {/* Hero Banner */}
      <motion.div variants={item} className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-zinc-900 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-transparent"></div>
        <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">Cohort 4 Active</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
              Ship Products <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-200">Like a Pro.</span>
            </h1>
            
            <p className="text-zinc-400 text-base md:text-xl font-medium leading-[1.6] max-w-xl mx-auto md:mx-0">
              Master the art of shipping high-impact products in 45 days. No fluff, just industry-standard frameworks and portfolio building.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-5 pt-2">
               <button 
                  onClick={() => navigate('/dashboard/day/0')} 
                  className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-base shadow-lg hover:bg-indigo-500 transition-all flex items-center justify-center gap-3"
               >
                  Start <PlayCircle className="w-6 h-6" />
               </button>
               <button onClick={() => navigate('/dashboard/about')} className="w-full sm:w-auto px-10 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-base hover:bg-white/10 transition-all">
                  Syllabus
               </button>
            </div>
          </div>
          
          <div className="hidden lg:grid grid-cols-2 gap-4 w-1/3 shrink-0">
             <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                <GraduationCap className="text-indigo-400 mx-auto mb-3 w-8 h-8" />
                <div className="text-3xl font-black text-white">45</div>
                <div className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">Days</div>
             </div>
             <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center mt-8">
                <Target className="text-emerald-400 mx-auto mb-3 w-8 h-8" />
                <div className="text-3xl font-black text-white">5</div>
                <div className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">Projects</div>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Modules Row */}
      <motion.section variants={item}>
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 px-2">
           <Award className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />
           <h2 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tighter">Curriculum Modules</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {MODULES.map((module) => (
            <div key={module.id} className="bg-white p-6 md:p-8 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-md transition-all group flex flex-col h-full hover:border-indigo-100">
              <div className="mb-4 md:mb-6 p-4 bg-zinc-50 rounded-2xl w-fit group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Star className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="font-black text-zinc-900 text-base md:text-lg mb-2 md:mb-3 tracking-tight leading-tight">{module.title}</h3>
              <p className="text-xs md:text-sm text-zinc-500 line-clamp-3 leading-relaxed font-medium mb-4 md:mb-6">{module.description}</p>
              
              <div className="mt-auto pt-4 md:pt-6 border-t border-zinc-50 flex items-center justify-between">
                 <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">8 Units</span>
                 <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all text-xs md:text-sm">→</div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Daily Schedule */}
      <motion.section variants={item}>
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 px-2">
           <Calendar className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />
           <h2 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tighter">Daily Lessons</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {LESSONS.map((lesson, idx) => (
            <DayCard key={lesson.day} lesson={lesson} index={idx} />
          ))}
          {/* Placeholder for locked days */}
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-zinc-100/30 rounded-[2.8rem] border border-dashed border-zinc-200 h-48 md:h-64 flex items-center justify-center p-6 md:p-8 opacity-50">
              <div className="text-center">
                <div className="text-[10px] md:text-sm font-bold text-zinc-400 uppercase tracking-widest">Locked Day {LESSONS.length + i}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};