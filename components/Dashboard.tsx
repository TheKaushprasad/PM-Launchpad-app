import React, { useState } from 'react';
import { MODULES, LESSONS } from '../constants';
import { DayCard } from './DayCard';
import { About } from './About';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Target, RefreshCw, 
  CheckCircle2, Bookmark, Flame, Sparkles, User as UserIcon, BookOpen
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  const { 
    completedCount, 
    progressMap, 
    user, 
    userProfile 
  } = useAuth();
  
  const [filterMode, setFilterMode] = useState<'all' | 'completed' | 'syllabus' | 'bookmarked'>('all');

  const pathParts = (location.pathname || '').split('/').filter(Boolean);
  const rawPath = pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'dashboard';
  
  const isLessonRoute = pathParts.includes('day');
  const path = isLessonRoute ? 'dashboard' : rawPath;
  
  const filteredLessons = LESSONS.filter(lesson => {
    // 1. Path filter
    if (path && path.toLowerCase() !== 'dashboard') {
      if (!lesson.category) return false;
      const normalizedPath = path.toLowerCase();
      const normalizedCategory = lesson.category.toLowerCase().replace(/\s+/g, '');
      if (normalizedCategory !== normalizedPath) return false;
    }

    // 2. Tab filter
    if (filterMode === 'bookmarked') {
      return !!progressMap[lesson.day]?.bookmarked;
    }
    if (filterMode === 'completed') {
      return !!progressMap[lesson.day]?.completed;
    }

    return true;
  });

  const handleRestore = () => {
    setFilterMode('all');
    navigate('/dashboard');
  };

  const getModuleTitle = () => {
    if (filterMode === 'syllabus') return 'Full Curriculum & Syllabus';
    if (filterMode === 'bookmarked') return 'Bookmarked Lessons';
    if (filterMode === 'completed') return 'Completed Lessons';

    const safePath = (path || '').toLowerCase();
    if (safePath === 'dashboard') return 'Curriculum Modules';
    
    const activeModule = MODULES.find(m => m.id && m.id.toLowerCase() === safePath);
    return activeModule ? `${activeModule.title} Module` : 'Curriculum Modules';
  };

  // Profile Completeness Calculation
  const calculateProfileCompleteness = () => {
    let score = 20; // Base for having an account
    if (userProfile?.name) score += 15;
    if (userProfile?.userType) score += 15;
    if (userProfile?.collegeName || userProfile?.companyName) score += 15;
    if (userProfile?.degree || userProfile?.designation) score += 15;
    if (userProfile?.career?.targetRole || userProfile?.targetRole) score += 10;
    if (userProfile?.linkedinUrl) score += 10;
    return Math.min(100, score);
  };

  const completenessPercentage = calculateProfileCompleteness();
  const curriculumPercentage = Math.round((completedCount / 45) * 100);

  const userName = userProfile?.name || userProfile?.displayName || user?.displayName || 'PM Aspiring Talent';
  const targetRole = userProfile?.career?.targetRole || userProfile?.targetRole || 'Product Manager';

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10 pb-20 relative px-4 md:px-8 max-w-7xl mx-auto"
    >
      {/* Restore Button */}
      {(path && path.toLowerCase() !== 'dashboard' || filterMode !== 'all') && (
        <button 
          onClick={handleRestore}
          className="fixed bottom-8 right-8 z-[100] bg-zinc-900 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl hover:bg-black transition-all group"
        >
          <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          View All Lessons
        </button>
      )}

      {/* Hero Welcome & Quick Stats */}
      <header className="relative bg-zinc-950 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-14 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-indigo-300 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 fill-current text-indigo-400" /> 
            <span>Personalised Career Command Center</span>
          </motion.div>

          <motion.div variants={item} className="space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-white">
              Welcome back, <br/>
              <span className="text-[#79BAEC]">{userName}</span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed font-medium">
              Master product management craft, sharpen key PM competencies, and track your launchpad curriculum progress.
            </p>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-black uppercase tracking-wider">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                <span>Target Role</span>
              </div>
              <div className="text-base sm:text-lg font-black text-white truncate" title={targetRole}>
                {targetRole}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-black uppercase tracking-wider">
                <UserIcon className="w-3.5 h-3.5 text-[#79BAEC]" />
                <span>Profile Strength</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">
                {completenessPercentage}%
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-black uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Curriculum</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">
                {completedCount}/45 <span className="text-xs text-zinc-400 font-normal">({curriculumPercentage}%)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-black uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Daily Streak</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">
                {userProfile?.streakDays || 1} Days
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Curriculum Grid Section */}
      <div className="space-y-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-6">
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 text-[#79BAEC] mb-2">
               <GraduationCap className="w-5 h-5" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Learning Path</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
              {getModuleTitle()}
            </h2>
          </motion.div>
          
          <motion.div variants={item} className="flex flex-wrap items-center gap-2">
             <button
                onClick={() => setFilterMode('all')}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${filterMode === 'all' ? 'bg-zinc-900 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
             >
                All Lessons
             </button>
             <button
                onClick={() => setFilterMode('completed')}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${filterMode === 'completed' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
             >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed ({completedCount})
             </button>
             <button
                onClick={() => setFilterMode('syllabus')}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${filterMode === 'syllabus' ? 'bg-[#2D5A81] text-white shadow-sm ring-2 ring-[#79BAEC]/30' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
             >
                <BookOpen className="w-3.5 h-3.5" />
                Full Syllabus
             </button>
             <button
                onClick={() => setFilterMode('bookmarked')}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${filterMode === 'bookmarked' ? 'bg-amber-500 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
             >
                <Bookmark className="w-3.5 h-3.5" />
                Bookmarked
             </button>
          </motion.div>
        </div>

        {filterMode === 'syllabus' ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-2"
          >
            <About />
          </motion.div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            key={`${path}-${filterMode}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson, idx) => (
                <motion.div key={lesson.day} variants={item}>
                  <DayCard lesson={lesson} index={idx} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border border-dashed border-zinc-200 space-y-3">
                <p className="text-zinc-500 font-bold text-base">
                  {filterMode === 'bookmarked' ? 'No bookmarked lessons yet. Click the bookmark icon on any lesson to save it here!' : 'No lessons found in this section.'}
                </p>
                {filterMode !== 'all' && (
                  <button
                    onClick={() => setFilterMode('all')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl"
                  >
                    View All Lessons
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

