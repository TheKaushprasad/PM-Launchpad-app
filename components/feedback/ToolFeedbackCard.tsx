import React, { useState } from 'react';
import { CheckCircle2, Loader2, Star, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useAuth } from '../../context/AuthContext';
import { authJsonHeaders } from '../../lib/apiClient';
import { TOOL_FEEDBACK, TOOL_FEEDBACK_COMMENT_MAX, type FeedbackTool } from '../../data/toolFeedback';

// Optional feedback under a tool's result: stars, what helped, what didn't, a note. "Skip" hides it.
// Sent or skipped is remembered on this device per result, so the same result never asks twice.

const RATING_LABELS = ['', 'Not useful', 'Needs a lot of work', 'Okay', 'Useful', 'Very useful'];
const storeKey = (tool: FeedbackTool, resultId?: string) => (resultId ? `toolFeedback:${tool}:${resultId}` : '');

function readDone(key: string): 'sent' | 'skipped' | null {
  if (!key) return null;
  try {
    const v = localStorage.getItem(key);
    return v === 'sent' || v === 'skipped' ? v : null;
  } catch {
    return null;
  }
}
function writeDone(key: string, v: 'sent' | 'skipped') {
  if (!key) return;
  try { localStorage.setItem(key, v); } catch { /* storage blocked: state below still hides it */ }
}

const Chips: React.FC<{ options: string[]; selected: string[]; onToggle: (o: string) => void; tone: 'good' | 'bad' }> = ({ options, selected, onToggle, tone }) => (
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

export const ToolFeedbackCard: React.FC<{ tool: FeedbackTool; resultId?: string; className?: string }> = ({ tool, resultId, className = '' }) => {
  const { user } = useAuth();
  const key = storeKey(tool, resultId);
  const [done, setDone] = useState<'sent' | 'skipped' | null>(() => readDone(key));
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [good, setGood] = useState<string[]>([]);
  const [bad, setBad] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const options = TOOL_FEEDBACK[tool];
  const toggle = (set: React.Dispatch<React.SetStateAction<string[]>>) => (o: string) =>
    set((list) => (list.includes(o) ? list.filter((x) => x !== o) : [...list, o]));

  if (!user || done === 'skipped') return null;
  if (done === 'sent') {
    return (
      <div className={`flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-sm text-emerald-900 ${className}`}>
        <CheckCircle2 className="size-4 shrink-0" /> Thanks for your feedback. It helps us make this tool better.
      </div>
    );
  }

  const finish = (v: 'sent' | 'skipped') => { writeDone(key, v); setDone(v); };

  const submit = async () => {
    setSending(true);
    try {
      const res = await fetch('/api/tool-feedback', {
        method: 'POST',
        headers: await authJsonHeaders(),
        body: JSON.stringify({ tool, resultId, rating, good, bad, comment: comment.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send your feedback.');
      finish('sent');
      toast.success('Thanks for your feedback!');
    } catch (err: any) {
      toast.error(err?.message || 'Could not send your feedback.');
    } finally {
      setSending(false);
    }
  };

  const shown = hover || rating;
  return (
    <section className={`relative bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-5 text-left ${className}`} aria-label="Feedback">
      <button type="button" onClick={() => finish('skipped')} aria-label="Skip feedback"
        className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
        <X className="size-4" />
      </button>
      <div className="pr-8">
        <h2 className="text-lg font-black text-slate-900">{options.title}</h2>
        <p className="text-sm text-slate-600">Optional, takes 10 seconds. We save only your answers, not what you pasted.</p>
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

      {rating > 0 && (
        <>
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-900">What helped?</p>
            <Chips options={options.good} selected={good} onToggle={toggle(setGood)} tone="good" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-900">What didn't?</p>
            <Chips options={options.bad} selected={bad} onToggle={toggle(setBad)} tone="bad" />
          </div>
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={2} maxLength={TOOL_FEEDBACK_COMMENT_MAX}
            className="text-sm max-h-40" placeholder="Anything else? (optional)" />
        </>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="brand" disabled={!rating || sending} onClick={submit}>
          {sending && <Loader2 className="size-4 animate-spin" />} Send feedback
        </Button>
        <Button variant="ghost" onClick={() => finish('skipped')}>Skip</Button>
      </div>
    </section>
  );
};
