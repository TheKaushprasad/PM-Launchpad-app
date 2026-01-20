import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LESSONS, getCategoryColor, getCategoryIcon } from '../constants';
import { ArrowLeft, ArrowRight, ExternalLink, BookOpen, Clock, Play, Zap, MonitorPlay, ChevronLeft, ChevronRight, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

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
    // Default to the first video resource if available
    if (lesson?.resources) {
        const firstVideo = lesson.resources.find(r => r.type === 'video');
        if (firstVideo) {
            const ytId = getYoutubeId(firstVideo.url);
            if (ytId) setActiveVideo(`https://www.youtube.com/embed/${ytId}`);
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-[1200px] mx-auto pb-12 px-0 md:px-6"
    >
      <div ref={topRef} />

      {/* Top Navigation Bar */}
      <div className="sticky top-0 md:top-0 z-20 bg-zinc-50/90 backdrop-blur-md py-3 mb-6 flex items-center justify-between border-b border-zinc-200/50 -mx-4 md:mx-0 px-4 md:px-0">
        <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-sm font-bold text-zinc-600 hover:text-indigo-600 transition-colors px-2 md:px-3 py-1.5 rounded-lg hover:bg-white/50 tracking-tight"
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> <span className="hidden sm:inline">Dashboard</span>
        </button>

        <div className="flex items-center gap-1 bg-white rounded-lg border border-zinc-200 p-1 shadow-sm">
             <button 
                onClick={() => prevLesson && navigate(`/dashboard/day/${prevLesson.day}`)}
                disabled={!prevLesson}
                className={`p-1.5 rounded-md transition-all ${
                    prevLesson 
                    ? 'text-zinc-600 hover:bg-zinc-100 hover:text-indigo-600' 
                    : 'text-zinc-300 cursor-not-allowed'
                }`}
             >
                 <ChevronLeft className="w-4 h-4" />
             </button>
             <span className="text-[10px] font-black text-zinc-400 px-2 md:px-3 uppercase tracking-widest border-x border-zinc-100 whitespace-nowrap">
                Day {currentDay}
             </span>
             <button 
                onClick={() => nextLesson && navigate(`/dashboard/day/${nextLesson.day}`)}
                disabled={!nextLesson}
                className={`p-1.5 rounded-md transition-all ${
                    nextLesson 
                    ? 'text-zinc-600 hover:bg-zinc-100 hover:text-indigo-600' 
                    : 'text-zinc-300 cursor-not-allowed'
                }`}
             >
                 <ChevronRight className="w-4 h-4" />
             </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-white rounded-2xl p-6 md:p-10 border border-zinc-100 shadow-lg relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-indigo-50/50 rounded-full blur-[60px] md:blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
                <span className={`text-[8px] md:text-[9px] px-2.5 md:px-3 py-1 rounded-full font-black uppercase tracking-widest flex items-center gap-2 ${getCategoryColor(lesson.category)} shadow-sm`}>
                    {getCategoryIcon(lesson.category)}
                    {lesson.category}
                </span>
                <span className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-50 px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> 15m
                </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-zinc-900 mb-4 leading-tight tracking-tighter">{lesson.title}</h1>
            <p className="text-base md:text-xl text-zinc-500 leading-relaxed max-w-4xl border-l-4 border-indigo-600 pl-4 font-medium italic">
                {lesson.preview}
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
             {/* Inline Video Player at the Top of Content */}
             {activeVideo && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800"
                >
                    <div className="bg-zinc-800/50 px-4 py-3 flex items-center justify-between border-b border-zinc-700/50">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Interactive Tutorial</span>
                        </div>
                        <MonitorPlay className="w-4 h-4 text-indigo-400" />
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

             <div className="bg-white rounded-2xl p-6 md:p-10 border border-zinc-100 shadow-sm overflow-hidden overflow-x-auto">
                <article className="prose prose-zinc prose-sm md:prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-zinc-900 prose-p:text-zinc-600 prose-p:leading-[1.6] prose-p:mb-4 prose-a:text-indigo-600 prose-img:rounded-xl">
                    {lesson.content}
                </article>
             </div>

             {/* Assignment Section */}
             {lesson.assignment && (
                 <div className="bg-indigo-50 rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4 md:mb-6 relative z-10">
                        <div className="p-2.5 md:p-3 bg-indigo-600 rounded-xl shadow-md">
                            <PenTool className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <h3 className="font-black text-lg md:text-xl text-indigo-900 tracking-tighter">Day's Assignment</h3>
                    </div>
                    <div className="text-zinc-700 leading-relaxed relative z-10 text-sm md:text-base !leading-[1.6]">
                        {lesson.assignment}
                    </div>
                 </div>
             )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
             <div className="sticky top-24 space-y-6">
                 {lesson.resources && lesson.resources.length > 0 && (
                     <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-zinc-900 tracking-tight text-lg flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-indigo-600" />
                                Course Material
                            </h3>
                            <span className="text-[10px] font-black text-zinc-400 uppercase bg-zinc-100 px-2 py-1 rounded-md">
                                {lesson.resources.length} items
                            </span>
                        </div>
                        
                        <div className="space-y-3">
                            {lesson.resources.map((res, idx) => {
                                const youtubeId = res.type === 'video' ? getYoutubeId(res.url) : null;
                                const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;
                                const isActive = embedUrl === activeVideo;

                                return (
                                <div key={idx} className="group">
                                    {youtubeId ? (
                                        <button 
                                            onClick={() => setActiveVideo(embedUrl)}
                                            className={`w-full flex flex-col gap-3 p-3 rounded-2xl transition-all border ${isActive ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100' : 'bg-zinc-50 border-zinc-100 hover:bg-white hover:border-indigo-100 hover:shadow-md'}`}
                                        >
                                            <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800">
                                                <img 
                                                    src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`} 
                                                    className={`w-full h-full object-cover transition-opacity ${isActive ? 'opacity-80' : 'opacity-60'}`} 
                                                    alt={res.title}
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${isActive ? 'bg-indigo-600 scale-110' : 'bg-black/40 group-hover:bg-indigo-600 group-hover:scale-110'}`}>
                                                        <Play className="w-5 h-5 fill-current" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-left px-1">
                                                <span className={`block text-[13px] font-bold leading-tight line-clamp-2 ${isActive ? 'text-indigo-900' : 'text-zinc-700'}`}>
                                                    {res.title}
                                                </span>
                                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1 block">Video Lesson</span>
                                            </div>
                                        </button>
                                    ) : (
                                        <a 
                                            href={res.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="flex items-center gap-4 p-3 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-emerald-100 hover:shadow-md transition-all group/link"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-white text-zinc-400 flex items-center justify-center shrink-0 group-hover/link:text-emerald-600 shadow-sm">
                                                <ExternalLink className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <span className="block text-[13px] font-bold text-zinc-700 leading-tight line-clamp-2">{res.title}</span>
                                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1 block">External Resource</span>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            )})}
                        </div>
                     </div>
                 )}
             </div>
          </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-zinc-200 pt-8 md:pt-12 mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevLesson ? (
             <button 
                onClick={() => navigate(`/dashboard/day/${prevLesson.day}`)}
                className="group flex items-center gap-3 md:gap-4 text-left p-5 md:p-6 rounded-2xl border border-zinc-200 hover:border-indigo-200 bg-white transition-all shadow-sm"
             >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
                </div>
                <div>
                    <span className="block text-[8px] md:text-[9px] font-black text-zinc-400 uppercase tracking-widest">Previous</span>
                    <span className="block text-sm md:text-lg font-black text-zinc-900 group-hover:text-indigo-600 tracking-tighter line-clamp-1">{prevLesson.title}</span>
                </div>
             </button>
        ) : <div className="hidden sm:block" />}

        {nextLesson ? (
             <button 
                onClick={() => navigate(`/dashboard/day/${nextLesson.day}`)}
                className="group flex items-center justify-end gap-3 md:gap-4 text-right p-5 md:p-6 rounded-2xl border border-zinc-200 hover:border-indigo-200 bg-white transition-all shadow-sm"
             >
                <div>
                    <span className="block text-[8px] md:text-[9px] font-black text-zinc-400 uppercase tracking-widest">Up Next</span>
                    <span className="block text-sm md:text-lg font-black text-zinc-900 group-hover:text-indigo-600 tracking-tighter line-clamp-1">{nextLesson.title}</span>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all">
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </div>
             </button>
        ) : (
            <div className="p-5 md:p-6 rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-400 gap-2">
                <span className="font-black text-xs md:text-sm uppercase tracking-widest">End of Module</span>
            </div>
        )}
      </div>
    </motion.div>
  );
};
