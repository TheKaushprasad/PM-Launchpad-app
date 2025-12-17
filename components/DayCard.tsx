import React from 'react';
import { Lesson } from '../types';
import { getCategoryColor, getCategoryIcon } from '../constants';
import { ArrowRight, Lock, CheckCircle2, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface DayCardProps {
  lesson: Lesson;
  index: number;
}

export const DayCard: React.FC<DayCardProps> = ({ lesson, index }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const completedLessons = user?.completedLessons || [];
  
  const isCompleted = completedLessons.includes(lesson.day);
  
  // Logic for unlocking:
  // 1. Day 0 is always unlocked.
  // 2. Day N is unlocked if Day N-1 is completed.
  const isLocked = lesson.day > 0 && !completedLessons.includes(lesson.day - 1) && !isCompleted;
  
  // Active means it's the next lesson to do (unlocked but not completed)
  const isActive = !isLocked && !isCompleted;

  return (
    <div 
        onClick={() => !isLocked && navigate(`/day/${lesson.day}`)}
        className={`
            group relative bg-white rounded-2xl border p-1 h-full flex flex-col transition-all duration-300
            ${isLocked ? 'border-slate-100 opacity-80 cursor-not-allowed' : 'border-slate-100 hover:border-indigo-200 hover:shadow-xl cursor-pointer'}
            ${isActive ? 'ring-2 ring-indigo-500 shadow-md transform scale-[1.02]' : ''}
        `}
    >
        {/* Inner Content Container */}
        <div className={`
            flex flex-col h-full rounded-xl p-5 overflow-hidden
            ${isLocked ? 'bg-slate-50/50' : 'bg-white group-hover:bg-slate-50/30'}
        `}>
            
            {/* Header: Tag & Status */}
            <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 ${getCategoryColor(lesson.category)}`}>
                   {getCategoryIcon(lesson.category)}
                   {lesson.category}
                </span>
                
                {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {isLocked && <Lock className="w-4 h-4 text-slate-300" />}
            </div>

            {/* Title & Day */}
            <div className="mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Day {lesson.day}</span>
                <h3 className={`font-bold text-lg leading-snug transition-colors line-clamp-2 ${isActive ? 'text-indigo-700' : 'text-slate-800 group-hover:text-indigo-600'}`}>
                    {lesson.title}
                </h3>
            </div>

            {/* Preview Text */}
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-6 flex-grow">
                {lesson.preview}
            </p>

            {/* Footer Action */}
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                {isLocked ? (
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Locked
                    </span>
                ) : (
                    <>
                        <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                            {isCompleted ? 'Review Lesson' : 'Start Lesson'}
                        </span>
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                            ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white'}
                        `}>
                            {isActive ? <PlayCircle className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
  );
};