import React, { useState } from 'react';
import { X, Video, Mic, MessageSquare, Layers } from 'lucide-react';
import { CandidateLevel, InterviewMode } from '../../types/interview';
import { LEVELS } from '../../data/interviewTracks';

interface FullLoopSetupModalProps {
  isOpen: boolean;
  level: CandidateLevel;
  onLevelChange: (level: CandidateLevel) => void;
  onClose: () => void;
  onStart: (mode: InterviewMode) => void;
}

const MODES: { id: InterviewMode; label: string; icon: any }[] = [
  { id: 'avatar', label: 'Avatar + voice', icon: Video },
  { id: 'voice', label: 'Voice only', icon: Mic },
  { id: 'chat', label: 'Text chat', icon: MessageSquare }
];

/** Setup for a full interview loop: three rounds back to back with one combined verdict. */
export const FullLoopSetupModal: React.FC<FullLoopSetupModalProps> = ({ isOpen, level, onLevelChange, onClose, onStart }) => {
  const [mode, setMode] = useState<InterviewMode>('voice');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto text-zinc-900">
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-black tracking-tight">Full interview loop</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-sm text-zinc-600 leading-relaxed">
            Three rounds back to back, like an onsite: <strong>Product Design</strong>, then an <strong>analytical round</strong> (metrics or root cause), then <strong>Behavioral</strong>. Each round is scored on its own, then you get one hiring-committee verdict. Plan for 60 to 90 minutes.
          </p>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-500">Level you're interviewing for</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => onLevelChange(l.id)}
                  className={`p-3 rounded-2xl border text-left transition-colors ${level === l.id ? 'border-indigo-600 bg-indigo-50' : 'border-zinc-200 hover:bg-zinc-50'}`}
                >
                  <div className="text-sm font-extrabold">{l.short}</div>
                  <div className="text-[11px] text-zinc-500 leading-snug mt-0.5">{l.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-500">Format</span>
            <div className="grid grid-cols-3 gap-2">
              {MODES.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1 text-xs font-bold transition-colors ${mode === m.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onStart(mode)}
            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm"
          >
            Start round 1
          </button>
        </div>
      </div>
    </div>
  );
};
