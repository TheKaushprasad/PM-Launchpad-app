import React, { useState } from 'react';
import { CheckCircle2, Loader2, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { FEEDBACK_BAD, FEEDBACK_GOOD, type Run } from '../../lib/assignmentSolver/types';
import { sendFeedback } from '../../lib/assignmentSolver/orchestrator';

// Asks for a 1-5 star rating and quick "went well / went badly" picks once a draft is ready.
// The answers go to Firestore and onto the run's Langfuse session; the run keeps a copy so the
// card shows "thanks" instead of asking again.

const RATING_LABELS = ['', 'Not useful', 'Needs a lot of work', 'Okay starting point', 'Good draft', 'Excellent draft'];

const Chips: React.FC<{ options: readonly string[]; selected: string[]; onToggle: (o: string) => void; tone: 'good' | 'bad' }> = ({ options, selected, onToggle, tone }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((o) => {
      const on = selected.includes(o);
      const onTone = tone === 'good' ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-rose-600 border-rose-600 text-white';
      return (
        <button key={o} type="button" aria-pressed={on} onClick={() => onToggle(o)}
          className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-colors ${on ? onTone : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'}`}>
          {o}
        </button>
      );
    })}
  </div>
);

export const FeedbackCard: React.FC<{ run: Run; criticAverage: number; editRatio: number; onChange: (run: Run) => void }> = ({ run, criticAverage, editRatio, onChange }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [good, setGood] = useState<string[]>([]);
  const [bad, setBad] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const toggle = (set: React.Dispatch<React.SetStateAction<string[]>>) => (o: string) =>
    set((list) => (list.includes(o) ? list.filter((x) => x !== o) : [...list, o]));

  if (run.feedback) {
    return (
      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-sm text-emerald-900">
        <CheckCircle2 className="size-4 shrink-0" />
        Thanks for rating this draft {run.feedback.rating}/5. It helps us make the next one better.
      </div>
    );
  }

  const submit = async () => {
    setSending(true);
    try {
      const feedback = { rating, good, bad, comment: comment.trim() };
      await sendFeedback(run, feedback, { criticAverage, editRatio });
      onChange({ ...run, feedback: { ...feedback, sentAt: new Date().toISOString() } });
      toast.success('Thanks for your feedback!');
    } catch (err: any) {
      toast.error(err?.message || 'Could not send your feedback.');
    } finally {
      setSending(false);
    }
  };

  const shown = hover || rating;
  return (
    <section className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-5">
      <div>
        <h2 className="text-lg font-black text-slate-900">How was this draft?</h2>
        <p className="text-sm text-slate-600">Your rating helps us improve the agents. We save only your answers, not your assignment or draft.</p>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)} role="radiogroup" aria-label="Rating out of 5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? 's' : ''}`}
              onMouseEnter={() => setHover(n)} onClick={() => setRating(n)} className="p-0.5">
              <Star className={`size-8 ${n <= shown ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
            </button>
          ))}
        </div>
        <p className="text-xs font-bold text-slate-500 h-4">{RATING_LABELS[shown]}</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-bold text-slate-900">What went well?</p>
        <Chips options={FEEDBACK_GOOD} selected={good} onToggle={toggle(setGood)} tone="good" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold text-slate-900">What went badly?</p>
        <Chips options={FEEDBACK_BAD} selected={bad} onToggle={toggle(setBad)} tone="bad" />
      </div>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={2} maxLength={1000} className="text-sm max-h-40"
        placeholder="Anything else? (optional)" />

      <Button variant="brand" disabled={!rating || sending} onClick={submit}>
        {sending && <Loader2 className="size-4 animate-spin" />} Send feedback
      </Button>
    </section>
  );
};
