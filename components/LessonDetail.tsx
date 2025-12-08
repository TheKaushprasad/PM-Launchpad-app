import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LESSONS, getCategoryColor, getCategoryIcon } from '../constants';
import { ArrowLeft, ArrowRight, ExternalLink, FileText, Video, PenTool, ChevronLeft, ChevronRight, BookOpen, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);

  const currentDay = parseInt(id || '0', 10);
  const lesson = LESSONS.find(l => l.day === currentDay);
  
  const sortedLessons = [...LESSONS].sort((a, b) => a.day - b.day);
  const currentIndex = sortedLessons.findIndex(l => l.day === currentDay);
  
  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < sortedLessons.length - 1 ? sortedLessons[currentIndex + 1] : null;

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [id]);

  if (!lesson) {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Lesson Not Found</h2>
            <p className="text-slate-500 mb-6">The lesson you are looking for doesn't exist.</p>
            <button onClick={() => navigate('/')} className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">Return Home</button>
        </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto pb-16"
    >
      <div ref={topRef} />

      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 bg-slate-50/90 backdrop-blur-md py-4 mb-6 flex items-center justify-between border-b border-slate-200/50">
        <button 
            onClick={() => navigate('/')}
            className="flex items-center text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-white/50"
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>

        <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
             <button 
                onClick={() => prevLesson && navigate(`/day/${prevLesson.day}`)}
                disabled={!prevLesson}
                className={`p-2 rounded-md transition-all ${
                    prevLesson 
                    ? 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600' 
                    : 'text-slate-300 cursor-not-allowed'
                }`}
                title="Previous Day"
             >
                 <ChevronLeft className="w-4 h-4" />
             </button>
             <span className="text-xs font-bold text-slate-400 px-2 uppercase tracking-wider">
                Day {currentDay}
             </span>
             <button 
                onClick={() => nextLesson && navigate(`/day/${nextLesson.day}`)}
                disabled={!nextLesson}
                className={`p-2 rounded-md transition-all ${
                    nextLesson 
                    ? 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600' 
                    : 'text-slate-300 cursor-not-allowed'
                }`}
                title="Next Day"
             >
                 <ChevronRight className="w-4 h-4" />
             </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-50 to-transparent rounded-full opacity-70 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 ${getCategoryColor(lesson.category)}`}>
                    {getCategoryIcon(lesson.category)}
                    {lesson.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <Clock className="w-3.5 h-3.5" /> 45 min read
                </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">{lesson.title}</h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl border-l-4 border-indigo-500 pl-6">
                {lesson.preview}
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content - Wider Column */}
          <div className="lg:col-span-8 space-y-8">
             <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm">
                <article className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-img:rounded-xl">
                    {lesson.content}
                </article>
             </div>
          </div>

          {/* Sidebar: Assignment & Resources - Sticky */}
          <div className="lg:col-span-4 space-y-6">
             <div className="sticky top-24 space-y-6">
                 
                 {/* Assignment Card */}
                 {lesson.assignment && (
                     <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <PenTool className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-lg">Assignment</h3>
                        </div>
                        <div className="text-sm text-indigo-100 leading-relaxed assignment-content">
                            {lesson.assignment}
                        </div>
                     </div>
                 )}

                 {/* Resources Card */}
                 {lesson.resources && lesson.resources.length > 0 && (
                     <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-indigo-500" />
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            {lesson.resources.map((res, idx) => (
                                <li key={idx}>
                                    <a href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <div className="mt-0.5 p-1.5 bg-slate-100 rounded-md text-slate-500 group-hover:text-indigo-600 group-hover:bg-white transition-colors">
                                            {res.type === 'video' ? <Video className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <span className="block text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">{res.title}</span>
                                            <span className="text-xs text-slate-400 capitalize">{res.type}</span>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                     </div>
                 )}
             </div>
          </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-slate-200 pt-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {prevLesson ? (
             <button 
                onClick={() => navigate(`/day/${prevLesson.day}`)}
                className="group flex items-center gap-4 text-left p-6 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:bg-white hover:shadow-lg transition-all bg-slate-50/50"
             >
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shadow-sm">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </div>
                <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Previous</span>
                    <span className="block text-lg font-bold text-slate-700 group-hover:text-indigo-700">{prevLesson.title}</span>
                </div>
             </button>
        ) : <div />}

        {nextLesson ? (
             <button 
                onClick={() => navigate(`/day/${nextLesson.day}`)}
                className="group flex items-center justify-end gap-4 text-right p-6 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:bg-white hover:shadow-lg transition-all bg-slate-50/50"
             >
                <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Up Next</span>
                    <span className="block text-lg font-bold text-slate-700 group-hover:text-indigo-700">{nextLesson.title}</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shadow-sm">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
             </button>
        ) : (
            <div className="p-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 font-medium">
                You've reached the end! 🎉
            </div>
        )}
      </div>

    </motion.div>
  );
};