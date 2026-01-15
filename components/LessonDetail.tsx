import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LESSONS, getCategoryColor, getCategoryIcon } from '../constants';
import { ArrowLeft, ArrowRight, ExternalLink, Video, PenTool, ChevronLeft, ChevronRight, BookOpen, Clock, Play, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const getYoutubeEmbedUrl = (url: string) => {
    try {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
    } catch (e) {
        return null;
    }
};

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

  const currentDay = parseInt(id || '0', 10);
  const lesson = LESSONS.find(l => l.day === currentDay);
  
  const sortedLessons = [...LESSONS].sort((a, b) => a.day - b.day);
  const currentIndex = sortedLessons.findIndex(l => l.day === currentDay);
  
  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < sortedLessons.length - 1 ? sortedLessons[currentIndex + 1] : null;

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveVideo(null);
  }, [id]);

  if (!lesson) {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-bold text-zinc-800 mb-2 tracking-tight">Lesson Not Found</h2>
            <p className="text-zinc-500 mb-6 font-medium">The lesson you are looking for doesn't exist.</p>
            <button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-bold tracking-tight hover:bg-indigo-700 transition-colors">Return to Dashboard</button>
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
      <div className="sticky top-0 z-20 bg-zinc-50/90 backdrop-blur-md py-4 mb-6 flex items-center justify-between border-b border-zinc-200/50">
        <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-white/50 tracking-tight"
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>

        <div className="flex items-center gap-2 bg-white rounded-lg border border-zinc-200 p-1 shadow-sm">
             <button 
                onClick={() => prevLesson && navigate(`/dashboard/day/${prevLesson.day}`)}
                disabled={!prevLesson}
                className={`p-2 rounded-md transition-all ${
                    prevLesson 
                    ? 'text-zinc-600 hover:bg-zinc-100 hover:text-indigo-600' 
                    : 'text-zinc-300 cursor-not-allowed'
                }`}
                title="Previous Day"
             >
                 <ChevronLeft className="w-4 h-4" />
             </button>
             <span className="text-[10px] font-bold text-zinc-400 px-2 uppercase tracking-widest">
                Day {currentDay}
             </span>
             <button 
                onClick={() => nextLesson && navigate(`/dashboard/day/${nextLesson.day}`)}
                disabled={!nextLesson}
                className={`p-2 rounded-md transition-all ${
                    nextLesson 
                    ? 'text-zinc-600 hover:bg-zinc-100 hover:text-indigo-600' 
                    : 'text-zinc-300 cursor-not-allowed'
                }`}
                title="Next Day"
             >
                 <ChevronRight className="w-4 h-4" />
             </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-zinc-100 shadow-xl shadow-zinc-200/50 relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-50 to-transparent rounded-full opacity-70 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1.5 ${getCategoryColor(lesson.category)}`}>
                    {getCategoryIcon(lesson.category)}
                    {lesson.category}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    <Clock className="w-3.5 h-3.5" /> 45 min read
                </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 leading-tight tracking-tighter">{lesson.title}</h1>
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-3xl border-l-4 border-indigo-500 pl-6 font-medium">
                {lesson.preview}
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content - Wider Column */}
          <div className="lg:col-span-8 space-y-8">
             <div className="bg-white rounded-3xl p-8 md:p-10 border border-zinc-100 shadow-sm">
                <article className="prose prose-zinc prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-900 prose-p:text-zinc-600 prose-p:leading-relaxed prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-img:rounded-xl">
                    {lesson.content}
                </article>
             </div>
          </div>

          {/* Sidebar: Assignment & Resources - Sticky */}
          <div className="lg:col-span-4 space-y-6">
             <div className="sticky top-24 space-y-6">
                 
                 {/* Assignment Card */}
                 {lesson.assignment && (
                     <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <PenTool className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h3 className="font-bold text-lg text-indigo-900 tracking-tight">Assignment</h3>
                        </div>
                        <div className="text-sm text-zinc-700 leading-relaxed assignment-content font-medium">
                            {lesson.assignment}
                        </div>
                     </div>
                 )}

                 {/* Resources Card - Must Watch */}
                 {lesson.resources && lesson.resources.length > 0 && (
                     <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 shadow-xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Zap className="w-16 h-16 text-yellow-400" />
                        </div>
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2 tracking-tight relative z-10 text-lg">
                            <Play className="w-5 h-5 text-yellow-400 fill-current" />
                            Must Watch
                        </h3>
                        <ul className="space-y-4 relative z-10">
                            {lesson.resources.map((res, idx) => {
                                const youtubeId = res.type === 'video' ? getYoutubeId(res.url) : null;
                                const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1` : null;
                                const thumbnailUrl = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg` : null;

                                return (
                                <li key={idx}>
                                    {youtubeId ? (
                                        <button 
                                            onClick={() => setActiveVideo(embedUrl)}
                                            className="w-full flex flex-col gap-3 group p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-left"
                                        >
                                            <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800 border border-white/10 group-hover:border-white/20 transition-all shadow-sm">
                                                {thumbnailUrl && <img src={thumbnailUrl} alt={res.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-transform">
                                                        <Play className="w-5 h-5 fill-current" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="block text-sm font-bold text-zinc-200 group-hover:text-white transition-colors tracking-tight line-clamp-2">{res.title}</span>
                                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black flex items-center gap-1 mt-1 group-hover:text-yellow-400 transition-colors">
                                                    YOUTUBE <ExternalLink className="w-3 h-3 ml-1" />
                                                </span>
                                            </div>
                                        </button>
                                    ) : (
                                        <a href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                            <div className="mt-0.5 p-1.5 bg-white/10 rounded-md text-zinc-400 group-hover:text-indigo-400 transition-colors">
                                                {res.type === 'video' ? <Video className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <span className="block text-sm font-bold text-zinc-200 group-hover:text-white transition-colors tracking-tight">{res.title}</span>
                                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mt-1 block">{res.type}</span>
                                            </div>
                                        </a>
                                    )}
                                </li>
                            )})}
                        </ul>
                     </div>
                 )}
             </div>
          </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-zinc-200 pt-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {prevLesson ? (
             <button 
                onClick={() => navigate(`/dashboard/day/${prevLesson.day}`)}
                className="group flex items-center gap-4 text-left p-6 rounded-2xl border border-zinc-200 hover:border-indigo-200 hover:bg-white hover:shadow-lg transition-all bg-zinc-50/50"
             >
                <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shadow-sm">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </div>
                <div>
                    <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Previous</span>
                    <span className="block text-lg font-bold text-zinc-700 group-hover:text-indigo-700 tracking-tight">{prevLesson.title}</span>
                </div>
             </button>
        ) : <div />}

        {nextLesson ? (
             <button 
                onClick={() => navigate(`/dashboard/day/${nextLesson.day}`)}
                className="group flex items-center justify-end gap-4 text-right p-6 rounded-2xl border border-zinc-200 hover:border-indigo-200 hover:bg-white hover:shadow-lg transition-all bg-zinc-50/50"
             >
                <div>
                    <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Up Next</span>
                    <span className="block text-lg font-bold text-zinc-700 group-hover:text-indigo-700 tracking-tight">{nextLesson.title}</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shadow-sm">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
             </button>
        ) : (
            <div className="p-6 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 flex items-center justify-center text-zinc-400 font-medium">
                You've reached the end! 🎉
            </div>
        )}
      </div>

        {/* Video Player Modal */}
        <AnimatePresence>
            {activeVideo && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm p-4 md:p-8"
                    onClick={() => setActiveVideo(null)}
                >
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setActiveVideo(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-md"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <iframe 
                            src={activeVideo} 
                            className="w-full h-full" 
                            title="Video Player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
  );
};