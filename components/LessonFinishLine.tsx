import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Undo2 } from 'lucide-react';

// The end of a lesson: one clear way to mark the day done, then a coach's note, the day's
// segment filling on the whole route, and the next drill. Celebration scales with the moment:
// an ordinary day gets a tick, the end of the free week and the final day get their own note.

type LessonRef = { day: number; title: string };

interface LessonFinishLineProps {
  day: number;
  lessons: LessonRef[];                 // every lesson, in day order
  completedDays: Set<number>;
  isCompleted: boolean;
  isSignedIn: boolean;
  nextLesson: LessonRef | null;
  onToggleComplete: () => void;
  onNext: () => void;
  onPractise: () => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const LessonFinishLine: React.FC<LessonFinishLineProps> = ({
  day, lessons, completedDays, isCompleted, isSignedIn, nextLesson, onToggleComplete, onNext, onPractise,
}) => {
  const reduceMotion = useReducedMotion();

  // Only animate a completion that happens here and now, not one loaded from saved progress.
  const wasCompleted = useRef(isCompleted);
  const [justCompleted, setJustCompleted] = useState(false);
  useEffect(() => {
    if (isCompleted && !wasCompleted.current) setJustCompleted(true);
    if (!isCompleted) setJustCompleted(false);
    wasCompleted.current = isCompleted;
  }, [isCompleted]);
  // A new day starts fresh.
  useEffect(() => {
    wasCompleted.current = isCompleted;
    setJustCompleted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  const total = lessons.length;
  const doneCount = lessons.filter((l) => completedDays.has(l.day)).length;
  const isLastDay = !nextLesson;
  const isEndOfFreeWeek = day === 7;
  const animate = justCompleted && !reduceMotion;

  // The coach's note: short, specific, and true.
  let note: string;
  if (isLastDay) note = `That's the whole route. Time to practise for real.`;
  else if (isEndOfFreeWeek) note = isSignedIn ? 'Free week, done. Day 8 is open for you.' : 'Free week, done. Day 8 onward needs a free account.';
  // The heading and button already carry the day numbers, so the note names the next drill itself.
  else {
    const next = nextLesson!.title.replace(/^Day[-\s]?\d+:\s*/, '');
    note = `Nicely done. Next drill: ${next}${/[.?!]$/.test(next) ? '' : '.'}`;
  }

  return (
    <section
      aria-labelledby="finish-line-heading"
      className="mt-6 md:mt-8 rounded-2xl border border-zinc-200 bg-white p-5 md:p-6 shadow-2xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* The tick: outlined while the day is open, drawn in Pitch Green once it's done */}
          <span
            aria-hidden="true"
            className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
              isCompleted ? 'bg-brand-800 border-brand-800 text-white' : 'bg-white border-zinc-300 text-zinc-300'
            }`}
          >
            {isCompleted ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  initial={animate ? { pathLength: 0 } : false}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 }}
                />
              </svg>
            ) : (
              <Check className="h-5 w-5" strokeWidth={3} />
            )}
          </span>

          <div className="min-w-0">
            <h2 id="finish-line-heading" className="text-lg font-extrabold tracking-tight text-zinc-900">
              {isCompleted ? `Day ${day} done` : `Finished Day ${day}?`}
            </h2>
            {isCompleted ? (
              <motion.p
                key={note}
                initial={animate ? { opacity: 0, y: 4 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.35 }}
                className="font-['Caveat',cursive] text-xl font-semibold leading-snug text-brand-700"
              >
                {note}
              </motion.p>
            ) : (
              <p className="text-sm text-zinc-600">Mark it done to keep your place on the route.</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
          {!isCompleted ? (
            <button
              type="button"
              onClick={onToggleComplete}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-800 px-5 py-3 text-sm font-bold text-white shadow-2xs transition-colors hover:bg-brand-900"
            >
              <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
              Mark Day {day} done
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={isLastDay ? onPractise : onNext}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-800 px-5 py-3 text-sm font-bold text-white shadow-2xs transition-colors hover:bg-brand-900"
              >
                {isLastDay ? 'Practise a mock interview' : `Start Day ${nextLesson!.day}`}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onToggleComplete}
                className="tap-target inline-flex items-center gap-1.5 rounded-xl px-3 py-3 text-sm font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800"
              >
                <Undo2 className="h-4 w-4" aria-hidden="true" />
                Undo
              </button>
            </>
          )}
        </div>
      </div>

      {/* The whole route, one segment per day; this day is marked so you can see where you stand */}
      <div className="mt-5">
        <div className="flex gap-[3px]" role="img" aria-label={`${doneCount} of ${total} days done`}>
          {lessons.map((l) => {
            const done = completedDays.has(l.day);
            const isThis = l.day === day;
            return (
              <span
                key={l.day}
                className={`relative h-2 flex-1 overflow-hidden rounded-full ${isThis ? 'bg-brand-100 ring-1 ring-brand-300' : 'bg-zinc-100'}`}
              >
                {done && (
                  <motion.span
                    className="absolute inset-0 origin-left rounded-full bg-brand-600"
                    initial={isThis && animate ? { scaleX: 0 } : false}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  />
                )}
              </span>
            );
          })}
        </div>
        <p className="mt-2 text-xs font-semibold text-zinc-500 tabular-nums" aria-live="polite">
          {doneCount} of {total} days done
        </p>
      </div>
    </section>
  );
};
