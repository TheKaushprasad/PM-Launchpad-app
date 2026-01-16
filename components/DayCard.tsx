
import React from 'react';
import { Lesson } from '../types';
import { getCategoryColor, getCategoryIcon } from '../constants';
import { ArrowUpRight, Clock, ShieldCheck } from 'lucide-react';
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
        className="group relative bg-white rounded-[2.8rem] border border-zinc-100 p-2 h-full flex flex-col transition-all duration-700 hover:border-indigo-100 hover:shadow-[0_32px_64px_rgba(79,70,229,0.12)] cursor-pointer overflow-hidden"
    >
        <div className="flex flex-col h-full rounded-[2.4rem] p-8 bg-white group-hover:bg-indigo-50/20 transition-colors duration-500">
            <div className="flex justify-between items-center mb-8">
                <span className={`text-[10px] px-3.5 py-2 rounded-full font-black uppercase tracking-widest flex items-center gap-2 border ${getCategoryColor(lesson.category)} shadow-sm`}>
                   {getCategoryIcon(lesson.category)}
                   {lesson.category}
                </span>
                <div className="flex items-center gap-1.5 text-zinc-400 group-hover:text-indigo-400 transition-colors">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-black tracking-tight">15m</span>
                </div>
            </div>

            <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-zinc-900 text-white text-[9px] font-black uppercase tracking-widest mb-4">
                   <ShieldCheck className="w-3 h-3 text-indigo-400" />
                   Day {lesson.day}
                </div>
                <h3 className="font-black text-2xl leading-[1.1] transition-colors line-clamp-2 text-zinc-900 group-hover:text-indigo-600 tracking-tighter">
                    {lesson.title}
                </h3>
            </div>

            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-10 flex-grow font-medium">
                {lesson.preview}
            </p>

            <div className="mt-auto pt-8 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[12px] font-black text-zinc-400 group-hover:text-indigo-600 transition-colors tracking-[0.15em] uppercase">
                    Launch Lesson
                </span>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 bg-zinc-50 text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                    <ArrowUpRight className="w-6 h-6" />
                </div>
            </div>
        </div>
    </div>
  );
};
