import React from 'react';
import { Lesson } from '../types';
import { getCategoryColor, getCategoryIcon } from '../constants';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DayCardProps {
  lesson: Lesson;
  index: number;
}

export const DayCard: React.FC<DayCardProps> = ({ lesson, index }) => {
  const navigate = useNavigate();

  return (
    <div 
        onClick={() => navigate(`/dashboard/day/${lesson.day}`)}
        className={`
            group relative bg-white rounded-2xl border p-1 h-full flex flex-col transition-all duration-300
            border-zinc-100 hover:border-indigo-200 hover:shadow-xl cursor-pointer
        `}
    >
        {/* Inner Content Container */}
        <div className="flex flex-col h-full rounded-xl p-5 overflow-hidden bg-white group-hover:bg-zinc-50/30">
            
            {/* Header: Tag & Status */}
            <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1.5 ${getCategoryColor(lesson.category)}`}>
                   {getCategoryIcon(lesson.category)}
                   {lesson.category}
                </span>
            </div>

            {/* Title & Day */}
            <div className="mb-3">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 block">Day {lesson.day}</span>
                <h3 className="font-bold text-lg leading-snug transition-colors line-clamp-2 text-zinc-800 group-hover:text-indigo-600 tracking-tight">
                    {lesson.title}
                </h3>
            </div>

            {/* Preview Text */}
            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">
                {lesson.preview}
            </p>

            {/* Footer Action */}
            <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400 group-hover:text-indigo-600 transition-colors tracking-wide">
                    Start Lesson
                </span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-zinc-100 text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white">
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </div>
    </div>
  );
};