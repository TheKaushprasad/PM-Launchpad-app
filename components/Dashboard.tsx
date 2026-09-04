import React, { useState } from 'react';
import { MODULES, LESSONS, getCategoryColor, getCategoryIcon } from '../constants';
import { DayCard } from './DayCard';
import { About } from './About';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Target, RefreshCw, 
  CheckCircle2, Bookmark, Flame, Sparkles, User as UserIcon, BookOpen,
  FileEdit, ArrowRight, Clock
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
  
  const [filterMode, setFilterMode] = useState<'all' | 'completed' | 'syllabus' | 'bookmarked' | 'notes'>('all');

  const pathParts = (location.pathname || '').split('/').filter(Boolean);
  const rawPath = pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'dashboard';
  
  const isLessonRoute = pathParts.includes('day');
  const path = isLessonRoute ? 'dashboard' : rawPath;

  // Saved Notes list extraction
  const savedNotesList = LESSONS
    .map(lesson => ({
      lesson,
      progress: progressMap[lesson.day],
      notes: (progressMap[lesson.day]?.notes || '').trim()
    }))
    .filter(item => item.notes.length > 0)
    .sort((a, b) => {
      const dateA = a.progress?.updatedAt ? new Date(a.progress.updatedAt).getTime() : 0;
      const dateB = b.progress?.updatedAt ? new Date(b.progress.updatedAt).getTime() : 0;
      if (dateB !== dateA) return dateB - dateA;
      return a.lesson.day - b.lesson.day;
    });

  const savedNotesCount = savedNotesList.length;
  const bookmarkedCount = LESSONS.filter(lesson => !!progressMap[lesson.day]?.bookmarked).length;
  
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
    if (filterMode === 'notes') return 'Saved Personal Notes';
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

  // Determine current active lesson in sequence (first uncompleted or actively in-progress lesson)
  const currentActiveLesson = LESSONS.find(l => {
    const p = progressMap[l.day];
    return !p?.completed;
  }) || LESSONS[0];
  const currentLessonDay = currentActiveLesson?.day;

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

      {/* Hero Welcome & Quick Stats (Compact command center ~18% height reduction, ~40px padding) */}
      <header className="relative bg-zinc-950 rounded-2xl sm:rounded-3xl md:rounded-[2rem] px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8 text-white overflow-hidden shadow-xl shadow-zinc-950/25 border border-zinc-800/60">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[90px] translate-y-1/2 -translate-x-1/4 pointer-events-none" aria-hidden="true" />
        
        <div className="relative z-10 max-w-4xl space-y-5">
          <motion.div variants={item} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-indigo-300 text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3 h-3 fill-current text-indigo-400" /> 
            <span>PERSONALISED CAREER COMMAND CENTER</span>
          </motion.div>

          <motion.div variants={item} className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-white">
              Welcome back, <br/>
              <span className="text-[#79BAEC]">{userName}</span>
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
              Master product management craft, sharpen key PM competencies, and track your launchpad curriculum progress.
            </p>
          </motion.div>

          {/* Quick Metrics Bar - Visual Hierarchy: Primary Values Dominant */}
          <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-white/10">
            {/* Target Role */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                <Target className="w-3 h-3 text-indigo-400 shrink-0" />
                <span className="truncate">Target Role</span>
              </div>
              <div className="text-sm sm:text-base font-black text-white truncate" title={targetRole}>
                {targetRole}
              </div>
            </div>

            {/* Profile Strength */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                <UserIcon className="w-3 h-3 text-[#79BAEC] shrink-0" />
                <span className="truncate">Profile Strength</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {completenessPercentage}%
              </div>
            </div>

            {/* Curriculum */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">Curriculum</span>
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {completedCount} / 45
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">
                  {curriculumPercentage}% complete
                </span>
              </div>
            </div>

            {/* Daily Streak */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                <Flame className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="truncate">Daily Streak</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {userProfile?.streakDays || 1} {(userProfile?.streakDays || 1) === 1 ? 'Day' : 'Days'}
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Curriculum Grid Section (~40px intentional transition from hero) */}
      <div className="space-y-6 mt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-zinc-150 pb-5">
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-1.5 text-[#79BAEC] mb-1.5">
               <GraduationCap className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Learning Path</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
              {getModuleTitle()}
            </h2>
          </motion.div>
          
          {/* Filter Pills Row - Consistent height, padding, border radius, and high contrast active state */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-2">
             <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`h-9 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-150 cursor-pointer ${
                  filterMode === 'all' 
                    ? 'bg-zinc-900 text-white shadow-xs' 
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
                }`}
             >
                All Lessons
             </button>
             <button
                type="button"
                onClick={() => setFilterMode('completed')}
                className={`h-9 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-150 cursor-pointer ${
                  filterMode === 'completed' 
                    ? 'bg-zinc-900 text-white shadow-xs' 
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
                }`}
             >
                <CheckCircle2 className={`w-3.5 h-3.5 ${filterMode === 'completed' ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span>Completed ({completedCount})</span>
             </button>
             <button
                type="button"
                onClick={() => setFilterMode('syllabus')}
                className={`h-9 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-150 cursor-pointer ${
                  filterMode === 'syllabus' 
                    ? 'bg-zinc-900 text-white shadow-xs' 
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
                }`}
             >
                <BookOpen className={`w-3.5 h-3.5 ${filterMode === 'syllabus' ? 'text-indigo-300' : 'text-zinc-500'}`} />
                <span>Full Syllabus</span>
             </button>
             <button
                type="button"
                onClick={() => setFilterMode('bookmarked')}
                className={`h-9 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-150 cursor-pointer ${
                  filterMode === 'bookmarked' 
                    ? 'bg-zinc-900 text-white shadow-xs' 
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
                }`}
             >
                <Bookmark className={`w-3.5 h-3.5 ${filterMode === 'bookmarked' ? 'fill-amber-400 text-amber-400' : 'text-zinc-500'}`} />
                <span>Bookmarked {bookmarkedCount > 0 ? `(${bookmarkedCount})` : ''}</span>
             </button>
             <button
                type="button"
                onClick={() => setFilterMode('notes')}
                className={`h-9 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-150 cursor-pointer ${
                  filterMode === 'notes' 
                    ? 'bg-zinc-900 text-white shadow-xs' 
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
                }`}
             >
                <FileEdit className={`w-3.5 h-3.5 ${filterMode === 'notes' ? 'text-indigo-300' : 'text-zinc-500'}`} />
                <span>Saved Notes {savedNotesCount > 0 ? `(${savedNotesCount})` : ''}</span>
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
        ) : filterMode === 'notes' ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            key="saved-notes-view"
            className="space-y-6"
          >
            {savedNotesList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedNotesList.map(({ lesson, progress, notes }) => (
                  <motion.div 
                    key={lesson.day} 
                    variants={item}
                    onClick={() => navigate(`/dashboard/day/${lesson.day}`)}
                    className="group bg-white rounded-3xl border border-zinc-150 hover:border-indigo-300 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl cursor-pointer relative overflow-hidden"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-zinc-900 text-white shadow-xs">
                            Day {lesson.day}
                          </span>
                          <span className={`text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-wider flex items-center gap-1 border ${getCategoryColor(lesson.category)} shadow-xs`}>
                            {getCategoryIcon(lesson.category)}
                            {lesson.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {progress?.completed && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                              Done
                            </span>
                          )}
                          {progress?.bookmarked && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-100">
                              <Bookmark className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Lesson Title */}
                      <h3 className="font-black text-lg text-zinc-900 group-hover:text-indigo-600 transition-colors tracking-tight mb-3">
                        {lesson.title}
                      </h3>

                      {/* Note Content Callout */}
                      <div className="bg-zinc-50 group-hover:bg-indigo-50/30 border border-zinc-200/80 group-hover:border-indigo-200 rounded-2xl p-4 mb-4 transition-colors">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-600 mb-2">
                          <FileEdit className="w-3 h-3" />
                          Personal Notes
                        </div>
                        <p className="text-xs text-zinc-700 font-medium whitespace-pre-wrap leading-relaxed break-words line-clamp-6">
                          {notes}
                        </p>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold">
                        <Clock className="w-3 h-3" />
                        {progress?.updatedAt ? `Saved ${new Date(progress.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}` : 'Saved Note'}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-black text-indigo-600 group-hover:text-indigo-700">
                        <span>Open Day {lesson.day}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-zinc-200 p-8 space-y-4 max-w-xl mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
                  <FileEdit className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-zinc-900 tracking-tight">No Saved Notes Yet</h3>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                    Add key takeaways, frameworks, or interview reminders in the "Personal Notes" pad of any lesson. They will automatically sync and appear here for fast revision.
                  </p>
                </div>
                <button
                  onClick={() => setFilterMode('all')}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                  Explore All Lessons
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            key={`${path}-${filterMode}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson, idx) => (
                <motion.div key={lesson.day} variants={item} className="h-full">
                  <DayCard 
                    lesson={lesson} 
                    index={idx} 
                    isCurrentLesson={lesson.day === currentLessonDay}
                  />
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

