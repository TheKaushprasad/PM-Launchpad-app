import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, CheckCircle2, Loader2, Star } from 'lucide-react';
import {
  FEEDBACK_DISLIKED_OPTIONS,
  FEEDBACK_LIKED_OPTIONS,
  FEEDBACK_OTHER_MAX_CHARS,
  FeedbackOption,
  InterviewFeedbackInput
} from '../../data/interviewFeedback';

interface InterviewFeedbackCardProps {
  /** True once the scorecard has arrived */
  scorecardReady: boolean;
  /** Called on the first tap, so the scorecard waits instead of replacing a half-filled card */
  onStarted: () => void;
  onSubmit: (feedback: InterviewFeedbackInput) => Promise<void>;
  /** Skip, or continue once sent */
  onDone: () => void;
}

const RATING_WORDS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

function ChipGroup({
  title,
  options,
  selected,
  other,
  onToggle,
  onOther,
  tone
}: {
  title: string;
  options: FeedbackOption[];
  selected: string[];
  other: string | null;
  onToggle: (id: string) => void;
  onOther: (text: string | null) => void;
  tone: 'good' | 'bad';
}) {
  const on = tone === 'good'
    ? 'bg-brand-50 border-brand-500 text-brand-800'
    : 'bg-rose-50 border-rose-400 text-rose-800';
  const chip = (active: boolean) =>
    `tap-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
      active ? on : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
    }`;

  return (
    <fieldset className="space-y-2.5">
      <legend className="text-sm font-bold text-zinc-900 mb-2.5">{title}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = selected.includes(o.id);
          return (
            <button key={o.id} type="button" aria-pressed={active} onClick={() => onToggle(o.id)} className={chip(active)}>
              {active && <Check className="size-3.5" />} {o.label}
            </button>
          );
        })}
        <button
          type="button"
          aria-pressed={other !== null}
          onClick={() => onOther(other === null ? '' : null)}
          className={chip(other !== null)}
        >
          {other !== null && <Check className="size-3.5" />} Other
        </button>
      </div>
      {other !== null && (
        <textarea
          value={other}
          onChange={(e) => onOther(e.target.value.slice(0, FEEDBACK_OTHER_MAX_CHARS))}
          rows={2}
          autoFocus
          placeholder="Tell us in a few words"
          aria-label={`${title}: other`}
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500/40"
        />
      )}
    </fieldset>
  );
}

/**
 * Shown while the scorecard is being prepared: a 1-5 star rating and quick chips for what went
 * well and what didn't. Everything is optional; the scorecard opens as soon as it is ready unless
 * the candidate has started filling this in.
 */
export const InterviewFeedbackCard: React.FC<InterviewFeedbackCardProps> = ({ scorecardReady, onStarted, onSubmit, onDone }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [liked, setLiked] = useState<string[]>([]);
  const [likedOther, setLikedOther] = useState<string | null>(null);
  const [disliked, setDisliked] = useState<string[]>([]);
  const [dislikedOther, setDislikedOther] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const touch = <T,>(fn: (v: T) => void) => (v: T) => {
    onStarted();
    fn(v);
  };
  const toggle = (list: string[], set: (v: string[]) => void) => touch((id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  const hasAnswer = rating > 0 || liked.length > 0 || disliked.length > 0 || !!likedOther?.trim() || !!dislikedOther?.trim();

  const submit = async () => {
    if (!hasAnswer || sending) return;
    setSending(true);
    setError('');
    try {
      await onSubmit({
        rating: rating || null,
        liked,
        likedOther: likedOther?.trim() || '',
        disliked,
        dislikedOther: dislikedOther?.trim() || ''
      });
      setSent(true);
    } catch (e: any) {
      setError(e?.message || "Couldn't send your feedback. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const shownRating = hoverRating || rating;

  return (
    <div className="flex flex-col items-center min-h-[calc(100dvh-5rem)] max-w-xl mx-auto px-4 py-6 sm:py-10">
      {/* Scoring status */}
      <div
        role="status"
        className={`w-full mb-4 rounded-2xl border px-4 py-3 flex items-center justify-between gap-3 ${
          scorecardReady ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-zinc-200'
        }`}
      >
        <div className="flex items-center gap-2.5 text-sm">
          {scorecardReady
            ? <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
            : <Loader2 className="size-5 text-brand-600 animate-spin shrink-0" />}
          <span className="font-bold text-zinc-900">
            {scorecardReady ? 'Your scorecard is ready' : 'Scoring your interview…'}
          </span>
          {!scorecardReady && <span className="hidden sm:inline text-zinc-500">this takes a few seconds</span>}
        </div>
        {scorecardReady && (
          <button
            type="button"
            onClick={onDone}
            className="shrink-0 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-1.5"
          >
            View scorecard <ArrowRight className="size-3.5" />
          </button>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white rounded-3xl border border-zinc-200 shadow-xl p-5 sm:p-7"
      >
        {sent ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="size-6" />
            </div>
            <h2 className="text-lg font-black text-zinc-900">Thanks for the feedback</h2>
            <p className="text-sm text-zinc-600">
              {scorecardReady ? 'Your scorecard is ready.' : 'Your scorecard will open as soon as it is ready.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-black text-zinc-900">While we score it, how did it go?</h2>
              <p className="text-xs text-zinc-500 mt-1">Every question is optional. It helps us make Priya better.</p>
            </div>

            <fieldset>
              <legend className="text-sm font-bold text-zinc-900 mb-2">How was the interview overall?</legend>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-label={`${n} star${n === 1 ? '' : 's'}`}
                      aria-pressed={rating === n}
                      onMouseEnter={() => setHoverRating(n)}
                      onClick={() => { onStarted(); setRating(n); }}
                      className="tap-target p-1 rounded-lg hover:bg-amber-50"
                    >
                      <Star className={`size-7 sm:size-8 transition-colors ${n <= shownRating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'}`} />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-semibold text-zinc-600 min-w-16">{RATING_WORDS[shownRating]}</span>
              </div>
            </fieldset>

            <ChipGroup
              title="What did you like?"
              options={FEEDBACK_LIKED_OPTIONS}
              selected={liked}
              other={likedOther}
              onToggle={toggle(liked, setLiked)}
              onOther={touch(setLikedOther)}
              tone="good"
            />

            <ChipGroup
              title="What didn't go well?"
              options={FEEDBACK_DISLIKED_OPTIONS}
              selected={disliked}
              other={dislikedOther}
              onToggle={toggle(disliked, setDisliked)}
              onOther={touch(setDislikedOther)}
              tone="bad"
            />

            {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={onDone}
                className="px-4 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 text-xs font-bold"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={!hasAnswer || sending}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-black flex items-center gap-1.5 disabled:opacity-50"
              >
                {sending && <Loader2 className="size-4 animate-spin" />} Send feedback
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
