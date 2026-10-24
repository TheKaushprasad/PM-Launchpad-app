import React from 'react';
import { Mic, MessageSquare } from 'lucide-react';
import { InterviewMode } from '../../types/interview';

const MODES: { id: InterviewMode; label: string; note: string; Icon: typeof Mic }[] = [
  {
    id: 'voice',
    label: 'Voice',
    note: "Speak your answers out loud and Priya talks back, like a real phone screen. Best in Chrome or Edge on a laptop.",
    Icon: Mic,
  },
  {
    id: 'text',
    label: 'Text',
    note: 'Type your answers, or tap the mic to record one. Priya replies in text only, so it works anywhere, including on your phone.',
    Icon: MessageSquare,
  },
];

/** Voice or text interview. Both use the same interviewer, hints and scoring. */
export const InterviewModePicker: React.FC<{ value: InterviewMode; onChange: (mode: InterviewMode) => void }> = ({ value, onChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-label="Interview mode">
    {MODES.map(({ id, label, note, Icon }) => {
      const selected = value === id;
      return (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={selected}
          onClick={() => onChange(id)}
          className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-colors ${selected ? 'border-brand-600 bg-brand-50/50' : 'border-zinc-200 hover:bg-zinc-50'}`}
        >
          <div className={`p-2 rounded-xl shrink-0 ${selected ? 'bg-brand-600 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-zinc-900">{label}</div>
            <p className="text-[11px] text-zinc-600 font-medium leading-snug mt-0.5">{note}</p>
          </div>
        </button>
      );
    })}
  </div>
);
