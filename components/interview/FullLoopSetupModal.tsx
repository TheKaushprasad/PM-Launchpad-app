import React, { useState } from 'react';
import { X, Layers } from 'lucide-react';
import { CandidateLevel, InterviewMode } from '../../types/interview';
import { LEVELS } from '../../data/interviewTracks';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InterviewModePicker } from './InterviewModePicker';

interface FullLoopSetupModalProps {
  isOpen: boolean;
  level: CandidateLevel;
  onLevelChange: (level: CandidateLevel) => void;
  onClose: () => void;
  onStart: (mode: InterviewMode) => void;
}

/** Setup for a full interview loop: three rounds back to back with one combined verdict. */
export const FullLoopSetupModal: React.FC<FullLoopSetupModalProps> = ({ isOpen, level, onLevelChange, onClose, onStart }) => {
  const [mode, setMode] = useState<InterviewMode>('voice');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-zinc-950/80 backdrop-blur-md"
        aria-describedby={undefined}
        className="block gap-0 p-0 bg-white rounded-3xl border-zinc-200 shadow-2xl w-[calc(100%-2rem)] max-w-lg sm:max-w-lg max-h-[90dvh] overflow-y-auto text-zinc-900"
      >
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-600" />
            <DialogTitle className="text-lg leading-7 font-black tracking-tight">Full interview loop</DialogTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100" aria-label="Close">
            <X className="size-5" />
          </Button>
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
                  className={`p-3 rounded-2xl border text-left transition-colors ${level === l.id ? 'border-brand-600 bg-brand-50' : 'border-zinc-200 hover:bg-zinc-50'}`}
                >
                  <div className="text-sm font-extrabold">{l.short}</div>
                  <div className="text-[11px] text-zinc-500 leading-snug mt-0.5">{l.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-500">Interview mode</span>
            <InterviewModePicker value={mode} onChange={setMode} />
          </div>

          <Button
            variant="brand"
            onClick={() => onStart(mode)}
            className="w-full h-auto py-3 rounded-2xl shadow-none active:scale-100 font-extrabold text-sm"
          >
            Start round 1
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
