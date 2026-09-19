import React, { useState } from 'react';
import { Lesson } from '../types';
import { 
  ArrowRight, Clock, CheckCircle2, Bookmark, Lock,
  Package, Layers, Compass, Users, BarChart2, Code, Bot, Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModal';

interface DayCardProps {
  lesson: Lesson;
  index: number;
  isCurrentLesson?: boolean;
  onRequireLogin?: (day: number) => void;
}

export const DayCard: React.FC<DayCardProps> = ({ lesson, isCurrentLesson = false, onRequireLogin }) => {
  const navigate = useNavigate();
  const { progressMap, toggleLessonComplete, toggleLessonBookmark, user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Free preview days are Day 0 to Day 7. Days 8+ require login.
  const isLocked = !user && lesson.day > 7;

  const dayProgress = progressMap[lesson.day];
  const isCompleted = dayProgress?.completed || false;
  const isBookmarked = dayProgress?.bookmarked || false;
  const scrollPercentage = dayProgress?.scrollPercentage || 0;

  // Determine progress state
  const isInProgress = !isCompleted && (scrollPercentage > 0 || (isCurrentLesson && lesson.day === 0));

  const handleCardClick = () => {
    if (isLocked) {
      if (onRequireLogin) {
        onRequireLogin(lesson.day);
      } else {
        setAuthModalOpen(true);
      }
      return;
    }
    navigate(`/dashboard/day/${lesson.day}`);
  };

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked) {
      if (onRequireLogin) {
        onRequireLogin(lesson.day);
      } else {
        setAuthModalOpen(true);
      }
      return;
    }
    toggleLessonComplete(lesson.day);
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked) {
      if (onRequireLogin) {
        onRequireLogin(lesson.day);
      } else {
        setAuthModalOpen(true);
      }
      return;
    }
    toggleLessonBookmark(lesson.day);
  };

  // Thematic Category Badge Helper matching modules.png
  const getBadgeConfig = () => {
    if (lesson.day === 0 || lesson.day === 1) {
      return {
        label: 'FOUNDATIONS',
        color: 'bg-blue-50 text-blue-600 border-blue-100',
        icon: <Package className="w-3.5 h-3.5" />
      };
    }
    if (lesson.day === 2 || lesson.day === 3) {
      return {
        label: 'FRAMEWORKS',
        color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        icon: <Layers className="w-3.5 h-3.5" />
      };
    }
    if (lesson.day === 4) {
      return {
        label: 'STRATEGY',
        color: 'bg-purple-50 text-purple-600 border-purple-100',
        icon: <Compass className="w-3.5 h-3.5" />
      };
    }
    if (lesson.day === 5) {
      return {
        label: 'PEOPLE',
        color: 'bg-orange-50 text-orange-600 border-orange-100',
        icon: <Users className="w-3.5 h-3.5" />
      };
    }

    const cat = (lesson.category || 'Foundations').toLowerCase();
    if (cat.includes('foundation')) {
      return { label: 'FOUNDATIONS', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: <Package className="w-3.5 h-3.5" /> };
    }
    if (cat.includes('framework')) {
      return { label: 'FRAMEWORKS', color: 'bg-indigo-50 text-indigo-600 border-indigo-100', icon: <Layers className="w-3.5 h-3.5" /> };
    }
    if (cat.includes('research')) {
      return { label: 'RESEARCH', color: 'bg-purple-50 text-purple-600 border-purple-100', icon: <Compass className="w-3.5 h-3.5" /> };
    }
    if (cat.includes('strategy')) {
      return { label: 'STRATEGY', color: 'bg-purple-50 text-purple-600 border-purple-100', icon: <Compass className="w-3.5 h-3.5" /> };
    }
    if (cat.includes('people')) {
      return { label: 'PEOPLE', color: 'bg-orange-50 text-orange-600 border-orange-100', icon: <Users className="w-3.5 h-3.5" /> };
    }
    if (cat.includes('data')) {
      return { label: 'DATA', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: <BarChart2 className="w-3.5 h-3.5" /> };
    }
    if (cat.includes('tech')) {
      return { label: 'TECH', color: 'bg-cyan-50 text-cyan-600 border-cyan-100', icon: <Code className="w-3.5 h-3.5" /> };
    }
    if (cat.includes('ai')) {
      return { label: 'AI', color: 'bg-violet-50 text-violet-600 border-violet-100', icon: <Bot className="w-3.5 h-3.5" /> };
    }
    if (cat.includes('job') || cat.includes('career')) {
      return { label: 'CAREER', color: 'bg-amber-50 text-amber-600 border-amber-100', icon: <Briefcase className="w-3.5 h-3.5" /> };
    }

    return {
      label: (lesson.category || 'FOUNDATIONS').toUpperCase(),
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      icon: <Package className="w-3.5 h-3.5" />
    };
  };

  const badge = getBadgeConfig();

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="group relative rounded-[22px] border border-slate-200/90 bg-white p-5 sm:p-6 h-full flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
      >
        <div>
          {/* Top Row: Category Tag (Left) & Metadata (Right) */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 border ${badge.color} shadow-2xs`}>
              {badge.icon}
              <span>{badge.label}</span>
            </span>

            {/* Right cluster: Bookmark + 15m */}
            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={handleToggleBookmark}
                title={isLocked ? 'Login to bookmark' : isBookmarked ? 'Remove Bookmark' : 'Bookmark Lesson'}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  isBookmarked 
                    ? 'text-amber-500' 
                    : 'text-slate-400 hover:text-amber-500'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              </button>
              <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>15m</span>
              </div>
            </div>
          </div>

          {/* Second Row: Day Badge + Status Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider text-white bg-[#111827] shadow-2xs">
              <Lock className="w-3 h-3 text-slate-300 shrink-0" />
              <span>DAY {lesson.day}</span>
            </div>

            {isCompleted ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span>COMPLETED</span>
              </span>
            ) : isInProgress ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                <span>{scrollPercentage > 0 ? `${scrollPercentage}% COMPLETE` : '0% COMPLETE'}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200/80">
                <span>NOT STARTED</span>
              </span>
            )}
          </div>

          {/* Module Title */}
          <h3 className="font-bold text-[17px] sm:text-[18px] leading-snug text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 tracking-tight mb-2">
            {lesson.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed line-clamp-2 mb-5">
            {lesson.preview}
          </p>
        </div>

        {/* Bottom Row / Action Bar */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          {/* Mark Complete Checkbox */}
          {isCompleted ? (
            <button
              type="button"
              onClick={handleToggleComplete}
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer group/btn"
              title="Mark incomplete"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0" />
              <span>Completed</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleToggleComplete}
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer group/btn"
              title="Mark complete"
            >
              <span className="w-4 h-4 rounded-full border border-slate-300 group-hover/btn:border-slate-500 shrink-0" />
              <span>Mark complete</span>
            </button>
          )}

          {/* Action Link */}
          {isLocked ? (
            <div 
              className="flex items-center justify-center text-slate-400 group-hover:text-slate-700 transition-colors"
              title="Sign in to unlock"
            >
              <Lock className="w-4 h-4" />
            </div>
          ) : (
            <div className={`inline-flex items-center gap-1 text-xs font-bold transition-colors ${
              isCompleted 
                ? 'text-emerald-700 group-hover:text-emerald-800' 
                : isInProgress 
                  ? 'text-blue-600 group-hover:text-blue-700' 
                  : 'text-slate-900 group-hover:text-blue-600'
            }`}>
              <span>{isCompleted ? 'Review' : isInProgress ? 'Continue' : 'Start'}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal Triggered on Locked Card Click */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
        redirectTo={`/dashboard/day/${lesson.day}`}
      />
    </>
  );
};