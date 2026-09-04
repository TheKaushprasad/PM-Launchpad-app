import React from 'react';
import { Lesson } from '../types';
import { getCategoryColor, getCategoryIcon } from '../constants';
import { ArrowRight, Clock, ShieldCheck, CheckCircle2, Bookmark, FileEdit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface DayCardProps {
  lesson: Lesson;
  index: number;
  isCurrentLesson?: boolean;
}

export const DayCard: React.FC<DayCardProps> = ({ lesson, index, isCurrentLesson = false }) => {
  const navigate = useNavigate();
  const { progressMap, toggleLessonComplete, toggleLessonBookmark } = useAuth();
  const dayProgress = progressMap[lesson.day];
  const isCompleted = dayProgress?.completed || false;
  const isBookmarked = dayProgress?.bookmarked || false;
  const hasNotes = !!dayProgress?.notes && dayProgress.notes.trim().length > 0;
  const scrollPercentage = dayProgress?.scrollPercentage || 0;

  // State determination: Completed, In Progress (reading progress or current active lesson), or Not Started
  const isInProgress = !isCompleted && (scrollPercentage > 0 || isCurrentLesson);
  const isNotStarted = !isCompleted && !isInProgress;

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLessonComplete(lesson.day);
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLessonBookmark(lesson.day);
  };

  // Card container styling based on state (completed: green border, in-progress/current: subtle blue accent, not-started: neutral border)
  const cardStateClasses = isCompleted
    ? 'bg-white border-emerald-200/90 hover:border-emerald-300 hover:shadow-md'
    : isInProgress
      ? 'bg-blue-50/[0.12] border-blue-200/90 ring-1 ring-blue-100/70 hover:border-blue-300 hover:shadow-md'
      : 'bg-white border-zinc-200/80 hover:border-zinc-300 hover:shadow-md';

  return (
    <div 
      onClick={() => navigate(`/dashboard/day/${lesson.day}`)}
      className={`group relative rounded-2xl border p-6 h-full flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-xs ${cardStateClasses}`}
    >
      <div>
        {/* Top Row: Category Badge (left) & Aligned Metadata Cluster (right) */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 border ${getCategoryColor(lesson.category)} shadow-xs`}>
            {getCategoryIcon(lesson.category)}
            <span>{lesson.category}</span>
          </span>

          {/* Consistent Metadata Cluster: [notes] [bookmark] [15m] */}
          <div className="flex items-center gap-1.5">
            {hasNotes && (
              <span 
                className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0" 
                title="Has saved personal notes"
              >
                <FileEdit className="w-3.5 h-3.5" />
              </span>
            )}
            <button 
              type="button"
              onClick={handleToggleBookmark}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Lesson'}
              className={`h-7 w-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                isBookmarked 
                  ? 'text-amber-500 bg-amber-50 border border-amber-200 shadow-xs' 
                  : 'text-zinc-400 hover:text-amber-500 hover:bg-zinc-100 border border-transparent'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
            <div className="flex items-center gap-1 text-zinc-400 h-7 px-1.5 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="text-[11px] font-medium tracking-tight">15m</span>
            </div>
          </div>
        </div>

        {/* Lesson Metadata: Structured 45-Day Curriculum Journey + Progress State */}
        <div className="flex items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider text-white bg-zinc-900 shadow-xs">
            <ShieldCheck className="w-3 h-3 text-indigo-400 shrink-0" />
            <span>Day {lesson.day}</span>
          </div>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>COMPLETED</span>
            </span>
          ) : isInProgress ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse shrink-0" />
              <span>{scrollPercentage > 0 ? `${scrollPercentage}% COMPLETE` : 'IN PROGRESS'}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-zinc-100 text-zinc-500 border border-zinc-200/70">
              <span>NOT STARTED</span>
            </span>
          )}
        </div>

        {/* Lesson Title: 18-20px Bold, Comfortable Line Height */}
        <h3 className="font-bold text-[18px] sm:text-[19px] leading-[1.3] text-zinc-900 group-hover:text-indigo-600 transition-colors line-clamp-2 tracking-tight mb-2">
          {lesson.title}
        </h3>

        {/* Description: Quieter 2-3 Lines */}
        <p className="text-xs sm:text-[13px] text-zinc-500 font-normal leading-relaxed line-clamp-2 mb-5">
          {lesson.preview}
        </p>
      </div>

      {/* Bottom Action Area: Unified, Anchored */}
      <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
        {isCompleted ? (
          <button
            type="button"
            onClick={handleToggleComplete}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer group/btn"
            title="Click to mark incomplete"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0" />
            <span>Completed</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleToggleComplete}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer group/btn"
            title="Click to mark complete"
          >
            <span className="w-4 h-4 rounded-full border border-zinc-300 flex items-center justify-center shrink-0 group-hover/btn:border-zinc-500" />
            <span>Mark complete</span>
          </button>
        )}

        {/* Action Link with Arrow Sliding 3-4px on Card Hover */}
        <div className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${
          isCompleted 
            ? 'text-emerald-700 group-hover:text-emerald-800' 
            : isInProgress 
              ? 'text-blue-600 group-hover:text-blue-700' 
              : 'text-zinc-700 group-hover:text-zinc-900'
        }`}>
          <span>{isCompleted ? 'Review' : isInProgress ? 'Continue' : 'Start'}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};