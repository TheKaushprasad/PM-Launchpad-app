import React from 'react';
import { Lesson } from '../types';
import { getCategoryColor, getCategoryIcon } from '../constants';
import { ArrowRight, Clock, ShieldCheck, CheckCircle2, Bookmark, FileEdit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface DayCardProps {
  lesson: Lesson;
  index: number;
}

export const DayCard: React.FC<DayCardProps> = ({ lesson, index }) => {
  const navigate = useNavigate();
  const { progressMap, toggleLessonComplete, toggleLessonBookmark } = useAuth();
  const dayProgress = progressMap[lesson.day];
  const isCompleted = dayProgress?.completed || false;
  const isBookmarked = dayProgress?.bookmarked || false;
  const hasNotes = !!dayProgress?.notes && dayProgress.notes.trim().length > 0;

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLessonComplete(lesson.day);
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLessonBookmark(lesson.day);
  };

  return (
    <div 
        onClick={() => navigate(`/dashboard/day/${lesson.day}`)}
        className={`group relative bg-white rounded-3xl border ${isCompleted ? 'border-emerald-200 bg-emerald-50/20' : 'border-zinc-100'} hover:border-indigo-200 p-1.5 h-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] cursor-pointer overflow-hidden`}
    >
        <div className="flex flex-col h-full rounded-[1.4rem] p-6 bg-white group-hover:bg-zinc-50/30 transition-colors duration-500">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[9px] px-2.5 py-1.5 rounded-full font-black uppercase tracking-widest flex items-center gap-1.5 border ${getCategoryColor(lesson.category)} shadow-sm`}>
                       {getCategoryIcon(lesson.category)}
                       {lesson.category}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasNotes && (
                    <span className="p-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100" title="Has saved personal notes">
                      <FileEdit className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <button 
                    onClick={handleToggleBookmark}
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Lesson'}
                    className={`p-1.5 rounded-lg transition-colors ${isBookmarked ? 'text-amber-500 bg-amber-50' : 'text-zinc-300 hover:text-amber-500 hover:bg-zinc-100'}`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                  </button>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] font-bold tracking-tight">15m</span>
                  </div>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest text-white bg-zinc-900">
                     <ShieldCheck className="w-2.5 h-2.5 text-indigo-400" />
                     Day {lesson.day}
                  </div>
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      Completed
                    </span>
                  ) : (dayProgress?.scrollPercentage && dayProgress.scrollPercentage > 5) ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-700 border border-indigo-100/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      {dayProgress.scrollPercentage}% Read
                    </span>
                  ) : null}
                </div>
                <h3 className="font-black text-xl leading-tight transition-colors line-clamp-2 tracking-tight text-zinc-900 group-hover:text-indigo-600">
                    {lesson.title}
                </h3>
            </div>

            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">
                {lesson.preview}
            </p>

            <div className="mt-auto pt-5 border-t border-zinc-50 flex items-center justify-between">
                <button
                  onClick={handleToggleComplete}
                  className={`text-[11px] font-black tracking-widest uppercase transition-colors flex items-center gap-1.5 ${isCompleted ? 'text-emerald-600 hover:text-emerald-700' : 'text-zinc-400 hover:text-indigo-600'}`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-600 fill-emerald-100' : 'text-zinc-300'}`} />
                  {isCompleted ? 'Mark Incomplete' : 'Mark Done'}
                </button>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 bg-zinc-50 shadow-sm text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>
        </div>
    </div>
  );
};