import React, { useEffect, useState } from 'react';
import {
  Compass, Target, Scale, Lightbulb, Layers, Sparkles, CheckCircle, XCircle, Loader2, Flag, Info, AlertTriangle, BookOpen,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../../components/auth/AuthModal';
import type { AiPmLesson, LessonPart } from '../../data/aiPmCourse/lessons/types';

// Draws a written PM → AI PM lesson from data (data/aiPmCourse/lessons): objectives, concept parts, a quiz, an
// exercise reviewed by AI, a completion checklist and a takeaway. Answers stay in this browser.

const PART_ICONS = [Compass, Target, Scale, Layers, Lightbulb, BookOpen];
const CAPSTONE_LOCK_DAY = 26;

interface Review { summary: string; strengths: string[]; gaps: string[]; nextStep: string }
interface LessonState {
  picks: (number | null)[];
  checked: boolean;
  answers: Record<string, string>;
  done: boolean[];
  review?: Review;
}

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">{children}</h4>
);

const fieldClass = 'w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-200';
const h2Class = 'text-lg md:text-xl font-bold text-zinc-900 flex items-center gap-2.5 tracking-tight';
const chipClass = (selected: boolean) =>
  `px-3 py-2 rounded-lg border text-xs font-semibold transition-colors ${
    selected ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:border-brand-300'
  }`;

const CALLOUT_TONES = {
  brand: { box: 'bg-brand-50/60 border-brand-100', icon: 'text-brand-600', Icon: Info },
  amber: { box: 'bg-amber-50/60 border-amber-100', icon: 'text-amber-500', Icon: AlertTriangle },
  violet: { box: 'bg-violet-50/60 border-violet-100', icon: 'text-violet-600', Icon: Sparkles },
};

export const lessonTopics = (lesson: AiPmLesson) => [
  { id: 'objective', label: 'Today’s learning objectives' },
  ...lesson.parts.map((p) => ({ id: p.id, label: p.title })),
  { id: 'quiz', label: lesson.quiz.title },
  { id: 'exercise', label: lesson.exercise.title },
  { id: 'completion', label: 'Completion checklist' },
];

const Part: React.FC<{ part: LessonPart; index: number }> = ({ part, index }) => {
  const Icon = PART_ICONS[index % PART_ICONS.length];
  const cols = part.cardCols ?? (part.cards && part.cards.length === 4 ? 2 : 1);
  return (
    <section id={part.id} className="scroll-mt-32 space-y-3">
      <h2 className={h2Class}><Icon className="w-5 h-5 text-brand-600" />Part {index + 1} — {part.title}</h2>
      {part.paragraphs?.map((p) => <p key={p} className="text-zinc-600 font-medium leading-relaxed">{p}</p>)}
      {part.bullets && (
        <ul className="space-y-1.5 text-sm text-zinc-700 leading-relaxed">
          {part.bullets.map((b) => (
            <li key={b.text} className="flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-2" />
              <span>{b.term && <span className="font-bold text-zinc-900">{b.term}: </span>}{b.text}</span>
            </li>
          ))}
        </ul>
      )}
      {part.cards && (
        <div className={`grid grid-cols-1 gap-3 ${cols === 2 ? 'md:grid-cols-2' : cols === 3 ? 'md:grid-cols-3' : ''}`}>
          {part.cards.map((c, i) => (
            <div key={c.title} className="bg-white border border-zinc-200/80 p-4 rounded-xl space-y-2.5">
              <h3 className="font-bold text-zinc-900 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-brand-50 text-brand-800 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                {c.title}
              </h3>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">{c.text}</p>
              {(c.example || c.note) && (
                <div className={`grid grid-cols-1 gap-3 ${c.example && c.note && cols === 1 ? 'md:grid-cols-2' : ''}`}>
                  {c.example && (
                    <div>
                      <Label>Example</Label>
                      <p className="text-sm text-zinc-600 leading-relaxed italic">{c.example}</p>
                    </div>
                  )}
                  {c.note && (
                    <div>
                      <Label>{c.noteLabel ?? 'PM question'}</Label>
                      <p className="text-sm text-zinc-700 font-semibold leading-relaxed">{c.note}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {part.table && (
        <div className="overflow-x-auto border border-zinc-200/80 rounded-xl">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="bg-zinc-50 text-left">
                {part.table.head.map((h) => <th key={h} className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {part.table.rows.map((r) => (
                <tr key={r.join('|')} className="border-t border-zinc-200/80 align-top">
                  {r.map((cell, j) => <td key={j} className={`px-3 py-2 ${j === 0 ? 'font-bold text-zinc-900' : 'text-zinc-600'}`}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {part.callout && (() => {
        const t = CALLOUT_TONES[part.callout.tone ?? 'brand'];
        return (
          <div className={`flex gap-3 p-4 border rounded-xl ${t.box}`}>
            <t.Icon className={`w-5 h-5 shrink-0 mt-0.5 ${t.icon}`} />
            <p className="text-sm text-zinc-700 leading-relaxed">
              {part.callout.label && <span className="font-bold text-zinc-900">{part.callout.label}: </span>}{part.callout.text}
            </p>
          </div>
        );
      })()}
      {part.quote && (
        <p className="text-sm font-bold text-zinc-700 leading-relaxed italic border-l-4 border-brand-500 pl-4">{part.quote}</p>
      )}
    </section>
  );
};

export const AiPmLessonView: React.FC<{ day: number; lesson: AiPmLesson }> = ({ day, lesson }) => {
  const storageKey = `aipm_day${day}_v1`;
  const { quiz, exercise } = lesson;
  const emptyState = (): LessonState => ({
    picks: quiz.questions.map(() => null),
    checked: false,
    answers: Object.fromEntries(exercise.fields.map((f) => [f.key, ''])),
    done: lesson.completion.map(() => false),
  });
  const { user } = useAuth();
  const [state, setState] = useState<LessonState>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (saved && Array.isArray(saved.picks) && saved.answers) {
        const base = emptyState();
        return { ...base, ...saved, answers: { ...base.answers, ...saved.answers } };
      }
    } catch {}
    return emptyState();
  });
  const [reviewing, setReviewing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
  }, [state, storageKey]);

  const answered = state.picks.filter((p) => p !== null).length;
  const allPicked = answered === quiz.questions.length;
  const correct = state.picks.filter((p, i) => p === quiz.questions[i].answer).length;
  const ready = exercise.fields.every((f) => (state.answers[f.key] || '').trim());
  const doneCount = state.done.filter(Boolean).length;

  const pick = (i: number, n: number) =>
    setState((s) => ({ ...s, checked: false, picks: s.picks.map((p, j) => (j === i ? n : p)) }));
  const setAnswer = (key: string, value: string) =>
    setState((s) => ({ ...s, answers: { ...s.answers, [key]: value.slice(0, 800) } }));

  const review = async () => {
    if (!user) { setAuthOpen(true); return; }
    if (!ready) { setError('Fill in every part of the exercise first.'); return; }
    setError(null);
    setReviewing(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/ai-pm/review-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ day, answers: state.answers }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'The review failed. Please try again.');
      setState((s) => ({ ...s, review: data.review }));
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setReviewing(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-7 text-left">
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" redirectTo={`/ai-pm/day/${day}`} onSuccess={() => setAuthOpen(false)} />

      <section id="objective" className="scroll-mt-32 bg-brand-50/60 p-4 sm:p-5 rounded-2xl border border-brand-100 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">Today’s learning objectives</span>
        <p className="text-sm font-medium text-brand-800">
          {lesson.intro ? `${lesson.intro} ` : ''}By the end of this lesson, you should be able to:
        </p>
        <ul className="space-y-1.5">
          {lesson.objectives.map((o) => (
            <li key={o} className="flex gap-2 text-sm font-bold text-zinc-900 leading-relaxed">
              <CheckCircle className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />{o}
            </li>
          ))}
        </ul>
      </section>

      {lesson.parts.map((p, i) => <Part key={p.id} part={p} index={i} />)}

      {/* Quiz */}
      <section id="quiz" className="scroll-mt-32 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className={h2Class}><CheckCircle className="w-5 h-5 text-brand-600" />Part {lesson.parts.length + 1} — {quiz.title}</h2>
          <span className="text-xs font-bold text-zinc-500">{answered}/{quiz.questions.length} answered</span>
        </div>
        <div className="space-y-3">
          {quiz.questions.map((s, i) => {
            const options = s.options ?? quiz.options ?? [];
            const picked = state.picks[i];
            const right = picked === s.answer;
            return (
              <div key={s.q} className="border border-zinc-200/80 rounded-xl p-4 space-y-2.5">
                <p className="text-sm font-bold text-zinc-900">{i + 1}. {s.q}</p>
                <div className="flex flex-wrap gap-1.5">
                  {options.map((o, n) => {
                    const selected = picked === n;
                    const reveal = state.checked && selected;
                    return (
                      <button
                        key={o}
                        type="button"
                        onClick={() => pick(i, n)}
                        className={reveal
                          ? `px-3 py-2 rounded-lg border text-xs font-semibold text-left ${right ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800'}`
                          : `${chipClass(selected)} text-left`}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
                {state.checked && picked !== null && (
                  <p className={`text-xs leading-relaxed flex gap-1.5 ${right ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {right ? <CheckCircle className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                    <span><span className="font-bold">{right ? 'Correct.' : `Answer: ${options[s.answer]}.`}</span> {s.why}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={!allPicked}
            onClick={() => setState((s) => ({ ...s, checked: true }))}
            className="h-10 px-4 rounded-xl bg-zinc-900 hover:bg-black disabled:opacity-40 text-white text-sm font-semibold"
          >
            Check answers
          </button>
          {state.checked && <p className="text-sm font-bold text-zinc-700">{correct} / {quiz.questions.length} correct</p>}
          {!allPicked && <p className="text-xs text-zinc-500">Answer every question to check.</p>}
        </div>
      </section>

      {/* Exercise */}
      <section id="exercise" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Flag className="w-5 h-5 text-brand-600" />Part {lesson.parts.length + 2} — {exercise.title}</h2>
        {exercise.capstone && (
          <div className="flex gap-3 p-4 bg-brand-50/60 border border-brand-100 rounded-xl">
            <Info className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-700 leading-relaxed">
              {day < CAPSTONE_LOCK_DAY ? (
                <>Use the <span className="font-bold text-zinc-900">internal knowledge assistant</span> as your capstone for now: an assistant that answers employees’ questions from company documents. You can switch to a different project on Day {CAPSTONE_LOCK_DAY}.</>
              ) : (
                <>Apply this to <span className="font-bold text-zinc-900">your capstone</span>, the AI product you locked on Day {CAPSTONE_LOCK_DAY}.</>
              )}
            </p>
          </div>
        )}
        <p className="text-zinc-600 font-medium leading-relaxed">{exercise.intro}</p>
        {exercise.example && (
          <div className="bg-zinc-50/70 border border-zinc-200/70 rounded-xl p-4 space-y-2">
            <Label>Worked example</Label>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
              {exercise.example.map((w) => (
                <React.Fragment key={w.label}>
                  <dt className="font-bold text-zinc-900">{w.label}</dt>
                  <dd className="text-zinc-600">{w.text}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        )}
        <div className="border border-zinc-200/80 rounded-xl p-4 space-y-3">
          {exercise.fields.map((f) => (
            <div key={f.key}>
              {f.choices ? (
                <>
                  <p className="text-sm font-bold text-zinc-800">{f.label}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5" role="radiogroup" aria-label={f.label}>
                    {f.choices.map((c) => (
                      <button key={c} type="button" role="radio" aria-checked={state.answers[f.key] === c} onClick={() => setAnswer(f.key, c)} className={chipClass(state.answers[f.key] === c)}>
                        {c}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <label className="text-sm font-bold text-zinc-800" htmlFor={`d${day}-${f.key}`}>{f.label}</label>
                  {f.rows === 1 ? (
                    <input id={`d${day}-${f.key}`} className={`${fieldClass} mt-1`} placeholder={f.placeholder} value={state.answers[f.key] || ''} onChange={(e) => setAnswer(f.key, e.target.value)} />
                  ) : (
                    <textarea id={`d${day}-${f.key}`} rows={f.rows ?? 2} className={`${fieldClass} mt-1 resize-y`} placeholder={f.placeholder} value={state.answers[f.key] || ''} onChange={(e) => setAnswer(f.key, e.target.value)} />
                  )}
                </>
              )}
            </div>
          ))}
          <p className="text-xs text-zinc-500 flex gap-1.5"><Info className="w-3.5 h-3.5 shrink-0 mt-px" />Your answers save automatically in this browser.</p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={review}
            disabled={reviewing}
            className="h-11 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold text-sm flex items-center gap-2"
          >
            {reviewing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {reviewing ? 'Reviewing…' : state.review ? 'Review again' : exercise.button ?? 'Review my answers'}
          </button>
          {!user && <p className="text-xs font-medium text-zinc-500">You’ll be asked to sign in first.</p>}
          {error && <p className="text-sm font-bold text-rose-600">{error}</p>}
          {state.review && (
            <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3">
              <p className="text-sm font-medium text-zinc-700 leading-relaxed">{state.review.summary}</p>
              {state.review.strengths.length > 0 && (
                <div>
                  <Label>What you did well</Label>
                  <ul className="space-y-1 text-sm text-zinc-600 list-disc pl-5">{state.review.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              )}
              {state.review.gaps.length > 0 && (
                <div>
                  <Label>Sharpen this</Label>
                  <ul className="space-y-1 text-sm text-zinc-600 list-disc pl-5">{state.review.gaps.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              )}
              {state.review.nextStep && <p className="text-xs font-bold text-brand-700">{state.review.nextStep}</p>}
            </div>
          )}
        </div>
      </section>

      {/* Completion */}
      <section id="completion" className="scroll-mt-32 bg-zinc-50/70 p-4 sm:p-5 rounded-xl border border-zinc-200/70 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className={h2Class}><CheckCircle className="w-5 h-5 text-brand-600" />Day {day} completion checklist</h2>
          <span className="text-xs font-bold text-zinc-500">{doneCount} of {lesson.completion.length} completed</span>
        </div>
        <div className="space-y-2">
          {lesson.completion.map((c, i) => (
            <label key={c} className="flex gap-2.5 items-start text-sm font-medium text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-brand-600"
                checked={!!state.done[i]}
                onChange={() => setState((s) => ({ ...s, done: s.done.map((v, j) => (j === i ? !v : v)) }))}
              />
              {c}
            </label>
          ))}
        </div>
      </section>

      <p className="text-sm font-bold text-zinc-700 leading-relaxed italic border-l-4 border-brand-500 pl-4">Key takeaway: {lesson.takeaway}</p>
    </div>
  );
};
