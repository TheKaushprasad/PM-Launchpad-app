import React from 'react';
import { Mic, MessageSquare } from 'lucide-react';
import { InterviewMode } from '../../types/interview';
import { useInterviewAllowance, useVoiceAllowance, useVoiceInterviewAvailable } from '../../lib/interviewAccess';

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

/**
 * Voice or text interview. Both use the same interviewer, hints and scoring. Where voice is not on yet
 * (the live site, for now) its card shows Coming soon and cannot be picked. Voice is also limited to a
 * few interviews a year (server/interviewAllowance.ts); `needed` is how many this choice uses (a full
 * loop uses one per round).
 */
export const InterviewModePicker: React.FC<{ value: InterviewMode; onChange: (mode: InterviewMode) => void; needed?: number }> = ({ value, onChange, needed = 1 }) => {
  const voiceOffered = useVoiceInterviewAvailable();
  const voiceLimit = useVoiceAllowance();
  const voiceUsedUp = voiceOffered && !!voiceLimit && voiceLimit.left < needed;
  const voiceAvailable = voiceOffered && !voiceUsedUp;
  const plural = (n: number) => `${n} voice interview${n === 1 ? '' : 's'}`;
  const lockedNote = !voiceUsedUp
    ? 'Speaking with Priya out loud is coming soon. Text interviews use the same questions, hints and scoring.'
    : voiceLimit!.left <= 0
      ? `You've used your ${plural(voiceLimit!.limit)}. Text interviews use the same questions and scoring.`
      : `A voice loop needs ${plural(needed)}. Pick text, or try a single voice case.`;
  // Shown under the note whenever voice is offered with a limit: "Voice interviews left 2/2".
  const showVoiceCount = voiceOffered && !!voiceLimit;
  // Free plan: interviews left this month (testers and paid accounts have no limit, so no count).
  const { allowance } = useInterviewAllowance();
  const textCount = allowance && !allowance.unlimited ? { left: allowance.left, limit: allowance.limit } : null;
  const counts: Partial<Record<InterviewMode, { label: string; left: number; limit: number } | null>> = {
    voice: showVoiceCount ? { label: 'Voice interviews left', left: voiceLimit!.left, limit: voiceLimit!.limit } : null,
    text: textCount ? { label: 'Text interviews left', ...textCount } : null,
  };
  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-label="Interview mode">
    {MODES.map(({ id, label, note, Icon }) => {
      const locked = id === 'voice' && !voiceAvailable;
      const selected = value === id && !locked;
      return (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={selected}
          aria-disabled={locked || undefined}
          disabled={locked}
          onClick={() => onChange(id)}
          className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-colors ${selected ? 'border-brand-600 bg-brand-50/50' : locked ? 'border-zinc-200 bg-zinc-50 opacity-70 cursor-not-allowed' : 'border-zinc-200 hover:bg-zinc-50'}`}
        >
          <div className={`p-2 rounded-xl shrink-0 ${selected ? 'bg-brand-600 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-zinc-900 flex items-center gap-2">
              {label}
              {locked && <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-200 rounded-full px-2 py-0.5">{!voiceUsedUp ? 'Coming soon' : voiceLimit!.left <= 0 ? 'Used up' : 'Not enough left'}</span>}
            </div>
            <p className="text-[11px] text-zinc-600 font-medium leading-snug mt-0.5">
              {locked ? lockedNote : note}
            </p>
            {counts[id] && (
              <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-zinc-700">
                <span>{counts[id]!.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold tabular-nums ${counts[id]!.left > 0 ? 'bg-brand-600 text-white' : 'bg-zinc-200 text-zinc-500'}`}
                >
                  {counts[id]!.left}/{counts[id]!.limit}
                </span>
              </div>
            )}
          </div>
        </button>
      );
    })}
  </div>
  );
};
