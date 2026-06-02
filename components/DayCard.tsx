import React from 'react';
import { Lesson } from '../types';
import { getCategoryColor, getCategoryIcon } from '../constants';
import { ArrowRight, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface DayCardProps {
  lesson: Lesson;
  index: number;
}

export const DayCard: React.FC<DayCardProps> = ({ lesson, index }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isCompleted = user?.completedDays?.includes(lesson.day) || false;

  return (
    <div 
        onClick={() => navigate(`/dashboard/day/${lesson.day}`)}
        className={`group relative bg-white rounded-3xl border p-1.5 h-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] cursor-pointer overflow-hidden ${
          isCompleted 
          ? 'border-emerald-100/80 hover:border-emerald-200 bg-emerald-50/10' 
          : 'border-zinc-100 hover:border-indigo-200'
        }`}
    >
        <div className="flex flex-col h-full rounded-[1.4rem] p-6 bg-white group-hover:bg-zinc-50/30 transition-colors duration-500">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[9px] px-2.5 py-1.5 rounded-full font-black uppercase tracking-widest flex items-center gap-1.5 border ${getCategoryColor(lesson.category)} shadow-sm`}>
                       {getCategoryIcon(lesson.category)}
                       {lesson.category}
                    </span>
                    {isCompleted && (
                        <span className="text-[9px] px-2.5 py-1.5 bg-emerald-500 text-white rounded-full font-black uppercase tracking-widest flex items-center gap-1 shadow-sm border border-emerald-500">
                           ✓ Covered
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px] font-bold tracking-tight">15m</span>
                </div>
            </div>

            <div className="mb-4">
                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest mb-3 text-white ${isCompleted ? 'bg-emerald-600' : 'bg-zinc-900'}`}>
                   {isCompleted ? (
                      <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                   ) : (
                      <ShieldCheck className="w-2.5 h-2.5 text-indigo-400" />
                   )}
                   Day {lesson.day}
                </div>
                <h3 className={`font-black text-xl leading-tight transition-colors line-clamp-2 tracking-tight ${isCompleted ? 'text-zinc-800' : 'text-zinc-900'} group-hover:text-indigo-600`}>
                    {lesson.title}
                </h3>
            </div>

            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">
                {lesson.preview}
            </p>

            <div className="mt-auto pt-5 border-t border-zinc-50 flex items-center justify-between">
                <span className={`text-[11px] font-black tracking-widest uppercase transition-colors ${
                    isCompleted ? 'text-emerald-600 group-hover:text-emerald-700' : 'text-zinc-400 group-hover:text-indigo-600'
                }`}>
                    {isCompleted ? 'Review Lesson' : 'Start Lesson'}
                </span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 bg-zinc-50 shadow-sm ${
                    isCompleted 
                    ? 'text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' 
                    : 'text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white'
                }`}>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>
        </div>
    </div>
  );
};