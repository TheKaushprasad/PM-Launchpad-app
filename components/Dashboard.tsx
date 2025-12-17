import React from 'react';
import { MODULES, LESSONS } from '../constants';
import { DayCard } from './DayCard';
import { motion } from 'framer-motion';
import { Award, Calendar, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      
      {/* Hero Header */}
      <motion.div variants={item} className="relative rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-90"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-indigo-100 text-[10px] font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Ready to Launch
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter leading-tight">
              Welcome to The NooB PM! 🚀
            </h1>
            
            <p className="text-indigo-100 text-lg md:text-xl leading-relaxed max-w-lg font-medium">
              Your 45-day journey to mastering Product Management. Access all lessons, frameworks, and assignments below.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
               <button 
                  onClick={() => navigate('/dashboard/day/0')} 
                  className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-indigo-50 transition-all transform hover:-translate-y-1 flex items-center gap-2 tracking-tight"
               >
                  Start Day 0 <PlayCircle className="w-5 h-5" />
               </button>
               <button onClick={() => navigate('/dashboard/about')} className="px-6 py-3 bg-indigo-800/50 text-white border border-indigo-400/30 rounded-xl font-medium backdrop-blur-sm hover:bg-indigo-800/70 transition-all tracking-tight">
                  View Syllabus
               </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modules Overview */}
      <motion.section variants={item}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-800 tracking-tight">Learning Modules</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MODULES.map(module => (
            <div key={module.id} className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer group h-full flex flex-col">
              <div className="mb-4 p-3 bg-zinc-50 rounded-xl w-fit group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors text-zinc-500">
                  <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-zinc-800 text-sm mb-2 group-hover:text-indigo-700 transition-colors tracking-tight">{module.title}</h3>
              <p className="text-xs text-zinc-500 line-clamp-2 flex-grow leading-relaxed">{module.description}</p>
              
              <div className="mt-4 pt-4 border-t border-zinc-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                 <span>8 Lessons</span>
                 <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Curriculum Grid */}
      <motion.section variants={item}>
        <div className="flex items-center gap-3 mb-6">
           <Calendar className="w-6 h-6 text-indigo-600" />
           <h2 className="text-2xl font-bold text-zinc-800 tracking-tight">Your Curriculum</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {LESSONS.map((lesson, idx) => (
            <motion.div key={lesson.day} variants={item}>
              <DayCard lesson={lesson} index={idx} />
            </motion.div>
          ))}
        </div>
      </motion.section>

    </motion.div>
  );
};