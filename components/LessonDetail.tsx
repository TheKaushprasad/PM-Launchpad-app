
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LESSONS, getCategoryColor, getCategoryIcon } from '../constants';
import { 
  ArrowLeft, ArrowRight, ExternalLink, BookOpen, Clock, Play, Zap, 
  MonitorPlay, ChevronLeft, ChevronRight, PenTool, List, CheckCircle, 
  Sparkles, CheckCircle2, Bookmark, FileEdit, Cloud, Save, RotateCcw,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const { 
    progressMap, 
    toggleLessonComplete, 
    toggleLessonBookmark, 
    updateLessonNotes,
    updateLessonScrollPosition,
    user 
  } = useAuth();

  const currentDay = parseInt(id || '0', 10);
  const lesson = LESSONS.find(l => l.day === currentDay);
  
  const sortedLessons = [...LESSONS].sort((a, b) => a.day - b.day);
  const currentIndex = sortedLessons.findIndex(l => l.day === currentDay);
  
  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < sortedLessons.length - 1 ? sortedLessons[currentIndex + 1] : null;

  const currentProgress = progressMap[currentDay] || { completed: false, notes: '', bookmarked: false };
  const isCompleted = currentProgress.completed;
  const isBookmarked = currentProgress.bookmarked;

  const [notes, setNotes] = useState<string>(currentProgress.notes || '');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [savedNotesTimestamp, setSavedNotesTimestamp] = useState<string | null>(null);

  // Reading Position & Scroll Tracking State
  const [readingPercentage, setReadingPercentage] = useState<number>(0);
  const [showResumedNotice, setShowResumedNotice] = useState<boolean>(false);
  const [resumedPercent, setResumedPercent] = useState<number>(0);

  const notesRef = useRef<string>(currentProgress.notes || '');
  const lastSavedNotesRef = useRef<string>(currentProgress.notes || '');
  const currentDayRef = useRef<number>(currentDay);
  const debounceTimerRef = useRef<any>(null);
  const savedIndicatorTimerRef = useRef<any>(null);

  const scrollDebounceTimerRef = useRef<any>(null);
  const lastScrollTopRef = useRef<number>(0);
  const lastScrollPercentRef = useRef<number>(0);
  const isRestoringScrollRef = useRef<boolean>(false);

  // Helper to extract saved scroll position from localStorage or AuthContext
  const getSavedPosition = useCallback((day: number): { scrollTop: number; scrollPercentage: number } => {
    try {
      const localData = localStorage.getItem(`pm_scroll_day_${day}`);
      if (localData) {
        const parsed = JSON.parse(localData);
        if (typeof parsed.scrollTop === 'number') {
          return {
            scrollTop: Math.max(0, parsed.scrollTop),
            scrollPercentage: typeof parsed.scrollPercentage === 'number' ? parsed.scrollPercentage : 0
          };
        }
      }
      const remoteState = progressMap[day];
      if (remoteState && typeof remoteState.scrollPosition === 'number') {
        return {
          scrollTop: Math.max(0, remoteState.scrollPosition),
          scrollPercentage: typeof remoteState.scrollPercentage === 'number' ? remoteState.scrollPercentage : 0
        };
      }
    } catch (e) {}
    return { scrollTop: 0, scrollPercentage: 0 };
  }, [progressMap]);

  // Synchronously flush scroll position
  const flushCurrentScroll = useCallback((day: number) => {
    const scrollTop = lastScrollTopRef.current;
    const percentage = lastScrollPercentRef.current;
    if (scrollTop >= 0) {
      try {
        localStorage.setItem(`pm_scroll_day_${day}`, JSON.stringify({
          scrollTop,
          scrollPercentage: percentage,
          updatedAt: new Date().toISOString()
        }));
      } catch (e) {}
      updateLessonScrollPosition(day, scrollTop, percentage);
    }
  }, [updateLessonScrollPosition]);

  // Sync notes state when day changes
  useEffect(() => {
    // Flush previous day's notes if there were unsaved edits
    if (currentDayRef.current !== currentDay && notesRef.current !== lastSavedNotesRef.current) {
      updateLessonNotes(currentDayRef.current, notesRef.current);
    }
    
    // Flush previous day's scroll position
    if (currentDayRef.current !== currentDay) {
      flushCurrentScroll(currentDayRef.current);
    }

    currentDayRef.current = currentDay;
    const initialNotes = progressMap[currentDay]?.notes || '';
    setNotes(initialNotes);
    notesRef.current = initialNotes;
    lastSavedNotesRef.current = initialNotes;
    setSaveStatus('idle');
  }, [currentDay, flushCurrentScroll, progressMap, updateLessonNotes]);

  // Keep notes in sync if loaded asynchronously from Firestore
  useEffect(() => {
    const remoteNotes = progressMap[currentDay]?.notes || '';
    if (remoteNotes && !notesRef.current) {
      setNotes(remoteNotes);
      notesRef.current = remoteNotes;
      lastSavedNotesRef.current = remoteNotes;
    }
  }, [progressMap, currentDay]);

  // Scroll Position Restoration on Day Mount
  useEffect(() => {
    const saved = getSavedPosition(currentDay);
    lastScrollTopRef.current = saved.scrollTop;
    lastScrollPercentRef.current = saved.scrollPercentage;
    setReadingPercentage(saved.scrollPercentage);

    isRestoringScrollRef.current = true;

    const restoreScroll = () => {
      const mainEl = document.querySelector('main');
      if (saved.scrollTop > 35) {
        if (mainEl) {
          mainEl.scrollTop = saved.scrollTop;
        }
        window.scrollTo({ top: saved.scrollTop, behavior: 'instant' as ScrollBehavior });
      } else {
        if (mainEl) {
          mainEl.scrollTop = 0;
        }
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    };

    // Immediate restore
    restoreScroll();

    // Multi-phase micro-adjustments for late layout rendering (syntax highlighting, images, etc.)
    const t1 = setTimeout(restoreScroll, 40);
    const t2 = setTimeout(restoreScroll, 120);
    const t3 = setTimeout(() => {
      restoreScroll();
      isRestoringScrollRef.current = false;
      if (saved.scrollTop > 35 && saved.scrollPercentage > 0) {
        setResumedPercent(saved.scrollPercentage);
        setShowResumedNotice(true);
        setTimeout(() => setShowResumedNotice(false), 3800);
      }
    }, 280);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      flushCurrentScroll(currentDay);
    };
  }, [currentDay, getSavedPosition, flushCurrentScroll]);

  // Continuous Scroll Tracking Listener
  useEffect(() => {
    const mainEl = document.querySelector('main');

    const handleScroll = () => {
      const currentScrollTop = mainEl ? mainEl.scrollTop : window.scrollY;
      const totalScrollHeight = mainEl ? mainEl.scrollHeight : document.documentElement.scrollHeight;
      const viewportHeight = mainEl ? mainEl.clientHeight : window.innerHeight;
      const maxScroll = Math.max(1, totalScrollHeight - viewportHeight);
      const percentage = Math.min(100, Math.max(0, Math.round((currentScrollTop / maxScroll) * 100)));

      lastScrollTopRef.current = currentScrollTop;
      lastScrollPercentRef.current = percentage;
      setReadingPercentage(percentage);

      // Instant synchronous write to localStorage (0ms persistence for tab switches & refreshes)
      try {
        localStorage.setItem(`pm_scroll_day_${currentDayRef.current}`, JSON.stringify({
          scrollTop: currentScrollTop,
          scrollPercentage: percentage,
          updatedAt: new Date().toISOString()
        }));
      } catch (e) {}

      // Debounce cloud persistence to Firestore (700ms)
      if (scrollDebounceTimerRef.current) {
        clearTimeout(scrollDebounceTimerRef.current);
      }
      scrollDebounceTimerRef.current = setTimeout(() => {
        updateLessonScrollPosition(currentDayRef.current, currentScrollTop, percentage);
      }, 700);
    };

    if (mainEl) {
      mainEl.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleVisibilityOrUnload = () => {
      flushCurrentScroll(currentDayRef.current);
    };

    window.addEventListener('beforeunload', handleVisibilityOrUnload);
    document.addEventListener('visibilitychange', handleVisibilityOrUnload);

    return () => {
      if (mainEl) {
        mainEl.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleVisibilityOrUnload);
      document.removeEventListener('visibilitychange', handleVisibilityOrUnload);
      if (scrollDebounceTimerRef.current) {
        clearTimeout(scrollDebounceTimerRef.current);
      }
    };
  }, [currentDay, flushCurrentScroll, updateLessonScrollPosition]);

  // Clean up and flush on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (savedIndicatorTimerRef.current) clearTimeout(savedIndicatorTimerRef.current);
      if (scrollDebounceTimerRef.current) clearTimeout(scrollDebounceTimerRef.current);
      if (notesRef.current !== lastSavedNotesRef.current) {
        updateLessonNotes(currentDayRef.current, notesRef.current);
      }
      flushCurrentScroll(currentDayRef.current);
    };
  }, [flushCurrentScroll, updateLessonNotes]);

  const handleRestartToTop = () => {
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lastScrollTopRef.current = 0;
    lastScrollPercentRef.current = 0;
    setReadingPercentage(0);
    flushCurrentScroll(currentDay);
    setShowResumedNotice(false);
  };

  const triggerBackgroundSave = (textToSave: string, showIndicator: boolean = true) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    lastSavedNotesRef.current = textToSave;
    
    // Instant optimistic update to local storage + context (0ms)
    updateLessonNotes(currentDay, textToSave);

    if (showIndicator) {
      setSaveStatus('saved');
      setSavedNotesTimestamp(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

      if (savedIndicatorTimerRef.current) clearTimeout(savedIndicatorTimerRef.current);
      savedIndicatorTimerRef.current = setTimeout(() => {
        setSaveStatus('idle');
      }, 2500);
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNotes(val);
    notesRef.current = val;

    // Instant local memory update so dashboard and switches always have the freshest text
    updateLessonNotes(currentDay, val);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce the "Saved" timestamp badge
    debounceTimerRef.current = setTimeout(() => {
      triggerBackgroundSave(val, true);
    }, 400);
  };

  const handleNotesBlur = () => {
    if (notesRef.current !== lastSavedNotesRef.current) {
      triggerBackgroundSave(notesRef.current, true);
    }
  };

  const handleSaveNotes = () => {
    triggerBackgroundSave(notes, true);
  };

  useEffect(() => {
    if (lesson?.resources) {
        const firstVideo = lesson.resources.find(r => r.type === 'video');
        if (firstVideo) {
            const ytId = getYoutubeId(firstVideo.url);
            if (ytId) {
                setActiveVideo(`https://www.youtube.com/embed/${ytId}`);
            } else {
                setActiveVideo(null);
            }
        } else {
            setActiveVideo(null);
        }
    } else {
        setActiveVideo(null);
    }
  }, [id, lesson]);

  if (!lesson) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
            <h2 className="text-2xl font-black text-zinc-800 mb-2 tracking-tighter">Lesson Not Found</h2>
            <p className="text-zinc-500 mb-6 font-medium">The lesson you are looking for doesn't exist.</p>
            <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold tracking-tight hover:bg-indigo-700 transition-colors">Return to Dashboard</button>
        </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="max-w-[1280px] mx-auto pb-6 px-0 md:px-3 relative"
    >
      <div ref={topRef} />

      {/* Top Navigation Bar with Progress Indicator */}
      <div className="sticky top-0 md:top-0 z-20 bg-zinc-50/95 backdrop-blur-md py-2 mb-3.5 flex items-center justify-between border-b border-zinc-200/60 -mx-4 md:mx-0 px-4 md:px-0">
        {/* Continuous Reading Progress Bar */}
        <div 
          className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 transition-all duration-150 ease-out" 
          style={{ width: `${Math.min(100, Math.max(0, readingPercentage))}%` }}
        />

        <div className="flex items-center gap-2">
          <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-xs font-bold text-zinc-600 hover:text-indigo-600 transition-colors px-2 md:px-2.5 py-1 rounded-lg hover:bg-white/70 tracking-tight"
          >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> <span className="hidden sm:inline">Dashboard</span>
          </button>

          {/* Reading Progress Indicator Badge */}
          {readingPercentage > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-zinc-200/80 shadow-2xs text-[10px] font-semibold text-zinc-600">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>{readingPercentage}% read</span>
              <button 
                onClick={handleRestartToTop}
                title="Restart reading from top of day"
                className="ml-1 text-zinc-400 hover:text-indigo-600 transition-colors p-0.5 rounded hover:bg-zinc-100"
              >
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Bookmark Button with Tooltip */}
          <div className="relative group/bookmark">
            <button 
              onClick={() => toggleLessonBookmark(currentDay)}
              title="Find all bookmarks under dashboard"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-xs border transition-all ${
                isBookmarked 
                  ? 'bg-amber-50 border-amber-200 text-amber-800' 
                  : 'bg-white border-zinc-200 text-zinc-600 hover:border-amber-200 hover:text-amber-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-1 bg-zinc-900 text-white text-[11px] font-medium rounded-md shadow-lg opacity-0 invisible group-hover/bookmark:opacity-100 group-hover/bookmark:visible transition-all duration-150 whitespace-nowrap z-30 pointer-events-none">
              Find all bookmarks under dashboard
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-900" />
            </div>
          </div>

          {/* Mark Complete Button */}
          <button 
            onClick={() => toggleLessonComplete(currentDay)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs border transition-all shadow-sm ${
              isCompleted 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                : 'bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-600 fill-emerald-100' : 'text-white'}`} />
            <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
          </button>

          {/* Day Stepper */}
          <div className="flex items-center gap-0.5 bg-white rounded-lg border border-zinc-200 p-0.5 shadow-sm">
             <button 
                onClick={() => prevLesson && navigate(`/dashboard/day/${prevLesson.day}`)}
                disabled={!prevLesson}
                className={`p-1 rounded-md transition-all ${
                    prevLesson 
                    ? 'text-zinc-600 hover:bg-zinc-100 hover:text-indigo-600' 
                    : 'text-zinc-300 cursor-not-allowed'
                }`}
             >
                 <ChevronLeft className="w-3.5 h-3.5" />
             </button>
             <span className="text-[10px] font-black text-zinc-500 px-2 uppercase tracking-wider border-x border-zinc-100 whitespace-nowrap">
                Day {currentDay}
             </span>
             <button 
                onClick={() => nextLesson && navigate(`/dashboard/day/${nextLesson.day}`)}
                disabled={!nextLesson}
                className={`p-1 rounded-md transition-all ${
                    nextLesson 
                    ? 'text-zinc-600 hover:bg-zinc-100 hover:text-indigo-600' 
                    : 'text-zinc-300 cursor-not-allowed'
                }`}
             >
                 <ChevronRight className="w-3.5 h-3.5" />
             </button>
          </div>
        </div>
      </div>

      {/* Floating Notice when Position is Restored */}
      <AnimatePresence>
        {showResumedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mb-3 p-2.5 px-3.5 bg-indigo-900 text-white rounded-xl shadow-md flex items-center justify-between text-xs font-medium z-30"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Restored Day {currentDay} to where you stopped ({resumedPercent}% read).</span>
            </div>
            <button
              onClick={handleRestartToTop}
              className="ml-3 text-[11px] font-bold text-indigo-200 hover:text-white bg-indigo-800/80 hover:bg-indigo-800 px-2 py-0.5 rounded transition-all flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              Restart at top
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-zinc-200/80 shadow-sm relative overflow-hidden mb-3.5">
        <div className="absolute top-0 right-0 w-[200px] md:w-[320px] h-[200px] md:h-[320px] bg-indigo-50/40 rounded-full blur-[50px] md:blur-[70px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-[8px] md:text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest flex items-center gap-1.5 ${getCategoryColor(lesson.category)} shadow-xs`}>
                    {getCategoryIcon(lesson.category)}
                    {lesson.category}
                </span>
                <span className="flex items-center gap-1 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-50 px-2 py-0.5 rounded-full border border-zinc-100">
                    <Clock className="w-2.5 h-2.5" /> 15m
                </span>
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-900 mb-1.5 leading-tight tracking-tight">{lesson.title}</h1>
            <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-4xl border-l-3 border-indigo-600 pl-3 font-medium">
                {lesson.preview}
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 md:gap-4 items-start">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-3.5">
             {/* Inline Video Player at the Top of Content */}
             {activeVideo && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-zinc-800"
                >
                    <div className="bg-zinc-800/50 px-3 py-2 flex items-center justify-between border-b border-zinc-700/50">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Interactive Tutorial</span>
                        </div>
                        <MonitorPlay className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <div className="aspect-video w-full">
                        <iframe 
                            src={activeVideo} 
                            className="w-full h-full" 
                            title="Video Player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen 
                        />
                    </div>
                </motion.div>
             )}

             <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-zinc-200/80 shadow-xs overflow-hidden overflow-x-auto">
                <article className="prose prose-zinc prose-sm md:prose-base max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-zinc-900 prose-p:text-zinc-600 prose-p:leading-relaxed prose-p:mb-2.5 prose-a:text-indigo-600 prose-img:rounded-xl">
                    {lesson.content}
                </article>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                        <h4 className="font-extrabold text-zinc-900 tracking-tight text-sm mb-0.5 flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                            Knowledge Check
                        </h4>
                        <p className="text-zinc-500 text-xs font-medium">Finished studying today's PM concepts? Make sure to tackle the Day's Assignment below!</p>
                    </div>
                </div>
             </div>

             {/* Assignment Section */}
             {lesson.assignment && (
                 <div className="bg-indigo-50/70 rounded-2xl p-4 sm:p-5 border border-indigo-100 shadow-xs relative overflow-hidden">
                    <div className="flex items-center gap-2.5 mb-2.5 relative z-10">
                        <div className="p-2 bg-indigo-600 rounded-lg shadow-sm">
                            <PenTool className="w-3.5 h-3.5 text-white" />
                        </div>
                        <h3 className="font-black text-base md:text-lg text-indigo-900 tracking-tight">Day's Assignment</h3>
                    </div>
                    <div className="text-zinc-700 leading-relaxed relative z-10 text-xs sm:text-sm !leading-[1.55]">
                        {lesson.assignment}
                    </div>
                 </div>
             )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
             <div className="sticky top-14 space-y-3">
                 {lesson.resources && lesson.resources.length > 0 && (
                     <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-zinc-200/80 shadow-xs">
                        <div className="flex items-center justify-between mb-2.5">
                            <h3 className="font-black text-zinc-900 tracking-tight text-sm flex items-center gap-1.5">
                                <BookOpen className="w-4 h-4 text-indigo-600" />
                                Course Material
                            </h3>
                            <span className="text-[9px] font-black text-zinc-400 uppercase bg-zinc-100 px-1.5 py-0.5 rounded">
                                {lesson.resources.length} items
                            </span>
                        </div>
                        
                        <div className="space-y-2">
                            {lesson.resources.map((res, idx) => {
                                const youtubeId = res.type === 'video' ? getYoutubeId(res.url) : null;
                                const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;
                                const isActive = embedUrl === activeVideo;

                                return (
                                <div key={idx} className="group">
                                    {youtubeId ? (
                                        <button 
                                            onClick={() => setActiveVideo(embedUrl)}
                                            className={`w-full flex flex-col gap-2 p-2 rounded-xl transition-all border ${isActive ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100' : 'bg-zinc-50 border-zinc-100 hover:bg-white hover:border-indigo-100 hover:shadow-xs'}`}
                                        >
                                            <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800">
                                                <img 
                                                    src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`} 
                                                    className={`w-full h-full object-cover transition-opacity ${isActive ? 'opacity-80' : 'opacity-60'}`} 
                                                    alt={res.title}
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md transition-all ${isActive ? 'bg-indigo-600 scale-105' : 'bg-black/40 group-hover:bg-indigo-600 group-hover:scale-105'}`}>
                                                        <Play className="w-3.5 h-3.5 fill-current" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-left px-0.5">
                                                <span className={`block text-xs font-bold leading-tight line-clamp-2 ${isActive ? 'text-indigo-900' : 'text-zinc-700'}`}>
                                                    {res.title}
                                                </span>
                                                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-0.5 block">Video Lesson</span>
                                            </div>
                                        </button>
                                    ) : (
                                        <a 
                                            href={res.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-emerald-100 hover:shadow-xs transition-all group/link"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-white text-zinc-400 flex items-center justify-center shrink-0 group-hover/link:text-emerald-600 shadow-2xs">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="text-left">
                                                <span className="block text-xs font-bold text-zinc-700 leading-tight line-clamp-2">{res.title}</span>
                                                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-0.5 block">External Resource</span>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            )})}
                        </div>
                     </div>
                 )}

                 {/* Topics to cover Section */}
                 {lesson.topics && lesson.topics.length > 0 && (
                    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-zinc-200/80 shadow-xs">
                        <div className="flex items-center justify-between mb-2.5">
                            <h3 className="font-black text-zinc-900 tracking-tight text-sm flex items-center gap-1.5">
                                <List className="w-4 h-4 text-indigo-600" />
                                Topics to cover
                            </h3>
                        </div>
                        <div className="space-y-2">
                            {lesson.topics.map((topic, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 group">
                                    {topic.time && (
                                        <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 shadow-2xs shrink-0 min-w-[42px] text-center">
                                            {topic.time}
                                        </span>
                                    )}
                                    <p className="text-xs font-bold text-zinc-700 group-hover:text-indigo-600 transition-colors">
                                        {topic.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                 )}

                 {/* Personal Study Notes Pad */}
                 <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-zinc-200/80 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <FileEdit className="w-3 h-3" />
                            </div>
                            <div>
                                <h3 className="font-black text-zinc-900 tracking-tight text-xs">
                                    Personal Notes
                                </h3>
                                <p className="text-[9px] text-zinc-400 font-medium">Day {currentDay} takeaways</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold">
                            {saveStatus === 'saving' ? (
                                <span className="inline-flex items-center gap-1 text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 animate-pulse">
                                    <Cloud className="w-2.5 h-2.5 text-amber-500" />
                                    Saving...
                                </span>
                            ) : saveStatus === 'saved' ? (
                                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                                    {savedNotesTimestamp ? `Saved ${savedNotesTimestamp}` : 'Saved'}
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 text-zinc-400 bg-zinc-50 px-1.5 py-0.5 rounded border border-zinc-100">
                                    <Cloud className="w-2.5 h-2.5 text-emerald-500" />
                                    {user ? 'Synced' : 'Saved'}
                                </span>
                            )}
                        </div>
                    </div>

                    <textarea
                        value={notes}
                        onChange={handleNotesChange}
                        onBlur={handleNotesBlur}
                        placeholder="Write down your key learnings, frameworks, or interview takeaways for this day. Notes auto-save as you type..."
                        rows={3}
                        className="w-full text-xs font-medium text-zinc-800 bg-zinc-50/80 border border-zinc-200 rounded-lg p-2.5 focus:outline-none focus:ring-1.5 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white resize-none placeholder:text-zinc-400 transition-all leading-relaxed"
                    />

                    <div className="flex items-center justify-between pt-0.5">
                        <span className="text-[9px] font-semibold text-zinc-400">
                            {notes.length}/5000 chars
                        </span>
                        <div className="relative group/savenotes">
                            <button
                                onClick={handleSaveNotes}
                                title="Find all saved notes under dashboard"
                                className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white font-bold text-[10px] flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                            >
                                {saveStatus === 'saved' ? (
                                    <>
                                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                                        <span>Saved</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-2.5 h-2.5" />
                                        <span>Save Notes</span>
                                    </>
                                )}
                            </button>
                            <div className="absolute bottom-full right-0 mb-1.5 px-2.5 py-1 bg-zinc-900 text-white text-[11px] font-medium rounded-md shadow-lg opacity-0 invisible group-hover/savenotes:opacity-100 group-hover/savenotes:visible transition-all duration-150 whitespace-nowrap z-30 pointer-events-none">
                                Find all saved notes under dashboard
                                <div className="absolute top-full right-3 border-4 border-transparent border-t-zinc-900" />
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* AI Mock Interview Callout Banner */}
                 <div className="bg-gradient-to-br from-zinc-900 to-indigo-950 rounded-2xl p-3.5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-2.5 border border-zinc-800">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="font-black text-xs text-white tracking-tight">Practice in AI Mock Studio</h4>
                            <p className="text-[10px] text-zinc-400 font-medium">Test delivery with animated FAANG personas.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/interview-studio')}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm transition-all shrink-0 flex items-center gap-1"
                    >
                        Start Mock <ArrowRight className="w-3 h-3" />
                    </button>
                 </div>
             </div>
          </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-zinc-200 pt-5 md:pt-6 mt-5 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prevLesson ? (
             <button 
                onClick={() => navigate(`/dashboard/day/${prevLesson.day}`)}
                className="group flex items-center gap-3 text-left p-3.5 md:p-4 rounded-xl border border-zinc-200 hover:border-indigo-200 bg-white transition-all shadow-2xs"
             >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </div>
                <div>
                    <span className="block text-[8px] font-black text-zinc-400 uppercase tracking-widest">Previous</span>
                    <span className="block text-xs md:text-sm font-black text-zinc-900 group-hover:text-indigo-600 tracking-tight line-clamp-1">{prevLesson.title}</span>
                </div>
             </button>
        ) : <div className="hidden sm:block" />}

        {nextLesson ? (
             <button 
                onClick={() => navigate(`/dashboard/day/${nextLesson.day}`)}
                className="group flex items-center justify-end gap-3 text-right p-3.5 md:p-4 rounded-xl border border-zinc-200 hover:border-indigo-200 bg-white transition-all shadow-2xs"
             >
                <div>
                    <span className="block text-[8px] font-black text-zinc-400 uppercase tracking-widest">Up Next</span>
                    <span className="block text-xs md:text-sm font-black text-zinc-900 group-hover:text-indigo-600 tracking-tight line-clamp-1">{nextLesson.title}</span>
                </div>
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:rotate-3 group-hover:scale-105 transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
             </button>
        ) : (
            <div className="p-3.5 md:p-4 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-400 gap-2">
                <span className="font-black text-xs uppercase tracking-widest">End of Module</span>
            </div>
        )}
      </div>
    </motion.div>
  );
};