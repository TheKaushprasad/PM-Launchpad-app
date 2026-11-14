import React, { useState } from 'react';
import { CheckCircle2, ListChecks, RotateCcw, XCircle } from 'lucide-react';
import type { QuizQuestion } from '../../data/aiPmCourse/levelTypes';

// Optional lesson quiz. Passing means every answer is correct; wrong answers can be changed and checked again.

const sameSet = (a: number[], b: number[]) => a.length === b.length && a.every((x) => b.includes(x));

// `bare` drops the panel's own frame and header, for use inside another card (the lesson's collapsible quiz).
export const QuizPanel: React.FC<{ quiz: QuizQuestion[]; passed: boolean; onPass: () => void; bare?: boolean }> = ({ quiz, passed, onPass, bare }) => {
  const [picked, setPicked] = useState<number[][]>(() => quiz.map((q) => (passed ? q.answer : [])));
  const [checked, setChecked] = useState(passed);

  const correct = quiz.map((q, i) => sameSet(picked[i], q.answer));
  const score = correct.filter(Boolean).length;
  const allAnswered = picked.every((p) => p.length > 0);
  const allRight = score === quiz.length;

  const choose = (qi: number, oi: number) => {
    if (passed || (checked && correct[qi])) return;
    setChecked(false);
    setPicked((prev) =>
      prev.map((p, i) => {
        if (i !== qi) return p;
        if (!quiz[qi].multi) return [oi];
        return p.includes(oi) ? p.filter((x) => x !== oi) : [...p, oi];
      }),
    );
  };

  const check = () => {
    setChecked(true);
    if (allRight) onPass();
  };

  return (
    <section aria-label="Lesson quiz" className={bare ? '' : 'rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden'}>
      {!bare && <header className={`px-4 py-3 border-b flex items-center justify-between gap-2 ${passed ? 'bg-emerald-50 border-emerald-100' : 'bg-violet-50 border-violet-100'}`}>
        <p className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 ${passed ? 'text-emerald-700' : 'text-violet-700'}`}>
          <ListChecks className="size-4" /> {passed ? 'Quiz passed' : 'Quiz · optional'}
        </p>
        <span className="text-xs font-black text-slate-500 tabular-nums">{checked ? `${score} / ${quiz.length}` : `${quiz.length} questions`}</span>
      </header>}
      {!passed && (
        <p className="px-4 pt-3 text-xs text-slate-500 leading-relaxed">Optional. Check what you learned; you can change wrong answers and check again.</p>
      )}
      <ol className="p-4 space-y-5">
        {quiz.map((q, qi) => {
          const showResult = checked && picked[qi].length > 0;
          return (
            <li key={qi} className="space-y-2">
              <p className="text-sm font-bold text-slate-900 leading-snug">
                <span className="text-violet-600 tabular-nums">{qi + 1}.</span> {q.q}
              </p>
              {q.multi && <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Select all that apply</p>}
              <div className="space-y-1.5" role={q.multi ? 'group' : 'radiogroup'}>
                {q.options.map((o, oi) => {
                  const isPicked = picked[qi].includes(oi);
                  const isRight = q.answer.includes(oi);
                  // After checking: a right question shows every option's explanation; a wrong one shows only what was picked.
                  const reveal = showResult && (correct[qi] ? isPicked || isRight : isPicked);
                  const tone = !reveal
                    ? isPicked ? 'border-violet-400 bg-violet-50' : 'border-slate-200 hover:border-slate-300 bg-white'
                    : isRight && isPicked ? 'border-emerald-400 bg-emerald-50' : isPicked ? 'border-rose-300 bg-rose-50' : 'border-slate-200 bg-white';
                  return (
                    <button
                      key={oi}
                      type="button"
                      role={q.multi ? 'checkbox' : 'radio'}
                      aria-checked={isPicked}
                      onClick={() => choose(qi, oi)}
                      className={`w-full text-left rounded-xl border px-3 py-2 transition-colors ${tone}`}
                    >
                      <span className="flex gap-2 text-[13px] leading-snug text-slate-800">
                        <span className={`mt-0.5 size-4 shrink-0 border flex items-center justify-center ${q.multi ? 'rounded' : 'rounded-full'} ${isPicked ? 'border-violet-600 bg-violet-600' : 'border-slate-300'}`}>
                          {isPicked && <span className={`bg-white ${q.multi ? 'size-2 rounded-sm' : 'size-1.5 rounded-full'}`} />}
                        </span>
                        <span><span className="font-black text-slate-500 mr-1">{String.fromCharCode(65 + oi)}.</span>{o.text}</span>
                      </span>
                      {reveal && (
                        <span className={`mt-1.5 flex gap-1.5 text-xs leading-relaxed ${isRight && isPicked ? 'text-emerald-800' : 'text-rose-800'}`}>
                          {isRight && isPicked ? <CheckCircle2 className="size-3.5 shrink-0 mt-0.5" /> : <XCircle className="size-3.5 shrink-0 mt-0.5" />}
                          {o.why}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {showResult && !correct[qi] && (
                <p className="text-xs font-bold text-rose-700 flex items-center gap-1.5"><RotateCcw className="size-3.5" /> Not quite. Change your answer and check again.</p>
              )}
            </li>
          );
        })}
      </ol>
      {!passed && (
        <div className="px-4 pb-4">
          <button
            type="button"
            disabled={!allAnswered}
            onClick={check}
            className="tap-target w-full h-11 rounded-xl bg-[#064E3B] text-white text-sm font-black hover:bg-[#065F46] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            {allAnswered ? 'Check answers' : 'Answer every question to check'}
          </button>
        </div>
      )}
      {passed && (
        <p className="px-4 pb-4 text-sm font-bold text-emerald-700 flex items-center gap-1.5"><CheckCircle2 className="size-4" /> All correct. Well done.</p>
      )}
    </section>
  );
};
