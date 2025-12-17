import React from 'react';
import { MODULES, LESSONS } from '../constants';
import { DayCard } from './DayCard';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Calendar, ChevronRight, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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
  const { user } = useAuth();

  const completedCount = user?.completedLessons?.length || 0;
  const totalLessons = LESSONS.length;
  const progressPercentage = Math.round((completedCount / totalLessons) * 100);
  
  // Find next lesson to do (first one not in completed list)
  const nextLessonDay = LESSONS.find(l => !user?.completedLessons.includes(l.day))?.day ?? 0;
  
  // Calculate "Days Left" assuming 1 lesson per day pace or just remaining count
  const remainingCount = totalLessons - completedCount;

  const isNewUser = completedCount === 0;
  const userName = user?.profile?.fullName?.split(' ')[0] || 'PM';

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      
      {/* Hero Header */}
      <motion.div variants={item} className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-90"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-indigo-100 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className={`w-2 h-2 rounded-full ${isNewUser ? 'bg-blue-400' : 'bg-green-400'} animate-pulse`}></span>
              {isNewUser ? 'Ready to Launch' : `Day ${nextLessonDay} Active`}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
              {isNewUser 
                ? `Welcome to the Launchpad, ${userName}! 🚀` 
                : `Keep pushing, ${userName}! 🚀`
              }
            </h1>
            
            <p className="text-indigo-100 text-lg md:text-xl leading-relaxed max-w-lg">
              {isNewUser
                ? "Your 45-day journey to mastering Product Management begins now. Start your foundation today."
                : `You're on track to master Product Management. Continue your journey with Day ${nextLessonDay}.`
              }
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
               <button 
                  onClick={() => navigate(`/day/${nextLessonDay}`)} 
                  className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-indigo-50 transition-all transform hover:-translate-y-1 flex items-center gap-2"
               >
                  {isNewUser ? (
                    <>Start Day 0 <PlayCircle className="w-5 h-5" /></>
                  ) : (
                    <>Resume Course <ChevronRight className="w-4 h-4" /></>
                  )}
               </button>
               <button onClick={() => navigate('/about')} className="px-6 py-3 bg-indigo-800/50 text-white border border-indigo-400/30 rounded-xl font-medium backdrop-blur-sm hover:bg-indigo-800/70 transition-all">
                  View Syllabus
               </button>
            </div>
          </div>
          
          {/* Quick Stats Card */}
          <div className="hidden md:block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-72">
             <div className="flex items-center justify-between mb-4">
                <span className="text-indigo-100 font-medium text-sm">Course Progress</span>
                <span className="text-white font-bold">{progressPercentage}%</span>
             </div>
             <div className="w-full bg-black/20 rounded-full h-2 mb-6">
                <div 
                    className="bg-green-400 h-2 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)] transition-all duration-1000"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <div className="text-2xl font-bold text-white">{completedCount}</div>
                   <div className="text-xs text-indigo-200">Days Done</div>
                </div>
                 <div>
                   <div className="text-2xl font-bold text-white">{remainingCount}</div>
                   <div className="text-xs text-indigo-200">Days Left</div>
                </div>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Modules Overview */}
      <motion.section variants={item}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Learning Modules</h2>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MODULES.map(module => (
            <div key={module.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer group h-full flex flex-col">
              <div className="mb-4 p-3 bg-slate-50 rounded-xl w-fit group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors text-slate-500">
                  <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-indigo-700 transition-colors">{module.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 flex-grow">{module.description}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-medium text-slate-400">
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
           <h2 className="text-2xl font-bold text-slate-800">Your Curriculum</h2>
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