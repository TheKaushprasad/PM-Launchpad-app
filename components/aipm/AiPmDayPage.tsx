import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Hammer, CheckCircle2, Calculator, Lightbulb } from 'lucide-react';
import { AI_PM_DAYS, AI_PM_PHASES, phaseForDay, DESIGN_CASE_STEPS } from '../../data/aiPmCourse/plan';
import { AI_PM_BACKGROUND_EXAMPLE } from '../../data/aiPmCourse/content';
import { useAiPmProgress } from './progress';
import { AI_PM_LESSONS } from './lessons';
import { Card, TemplateChip, ResourceLink, Checklist } from './ui';

export const AiPmDayPage: React.FC = () => {
  const { day: dayParam } = useParams();
  const dayNum = Number(dayParam);
  const day = AI_PM_DAYS.find((d) => d.day === dayNum);
  const phase = phaseForDay(dayNum);
  const { progress, isDone, toggleDay, toggleCheck } = useAiPmProgress();

  useEffect(() => {
    document.querySelector('main')?.scrollTo({ top: 0 });
  }, [dayNum]);

  if (!day || !phase) return <Navigate to="/ai-pm/plan" replace />;

  const done = isDone(day.day);
  const prev = AI_PM_DAYS.find((d) => d.day === day.day - 1);
  const next = AI_PM_DAYS.find((d) => d.day === day.day + 1);
  const isPhaseEnd = day.day === phase.end;
  const example = AI_PM_PHASES.find((p) => p.workedExample?.day === day.day)?.workedExample;
  const Lesson = AI_PM_LESSONS[day.day];

  return (
    <article className="max-w-3xl space-y-6">
      <Link to={`/ai-pm/plan#phase-${phase.id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-3.5 h-3.5" /> Phase {phase.id}: {phase.title}
      </Link>

      <header className="space-y-2">
        <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">
          Day {day.day} of 90{day.kind === 'weekend' ? ' · Weekend block' : day.kind === 'review' ? ' · Review day' : ''}
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{day.topic}</h1>
        <p className="text-sm text-slate-500">
          {day.time ?? (day.kind === 'weekend'
            ? 'A 3-hour block for the phase deliverable.'
            : 'About 60 minutes to learn and 30–60 minutes for the exercise.')}
        </p>
      </header>

      {Lesson ? (
        <>
          <Lesson />
          {day.resources && (
            <Card>
              <h2 className="font-black text-slate-900 flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-brand-600" /> Also watch or read
              </h2>
              <ul className="space-y-1.5">
                {day.resources.map((r) => (
                  <li key={r}><ResourceLink id={r} /></li>
                ))}
              </ul>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <h2 className="font-black text-slate-900 flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-brand-600" /> Learn
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{day.learn}</p>
          {day.resources && (
            <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
              {day.resources.map((r) => (
                <li key={r}><ResourceLink id={r} /></li>
              ))}
            </ul>
          )}
        </Card>
      )}

      <Card className="border-brand-100 bg-brand-50/40">
        <h2 className="font-black text-slate-900 flex items-center gap-2 mb-2">
          <Hammer className="w-4 h-4 text-brand-600" /> Do
        </h2>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">{day.do}</p>
        {day.templates && (
          <div className="flex flex-wrap gap-2 mt-3">
            {day.templates.map((t) => <TemplateChip key={t} id={t} />)}
          </div>
        )}
      </Card>

      {example && (
        <Card className="bg-amber-50/50 border-amber-200/70">
          <h2 className="font-black text-slate-900 flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-amber-600" /> Worked example (illustrative)
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">{example.text}</p>
        </Card>
      )}

      {day.day === 81 && (
        <Card className="bg-amber-50/50 border-amber-200/70">
          <h2 className="font-black text-slate-900 flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-600" /> Example background line
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed"><span className="font-bold">Before:</span> {AI_PM_BACKGROUND_EXAMPLE.before}</p>
          <p className="text-sm text-slate-700 leading-relaxed mt-1"><span className="font-bold">After:</span> {AI_PM_BACKGROUND_EXAMPLE.after}</p>
        </Card>
      )}

      {day.templates?.includes('T10') && (
        <Card className="bg-slate-50/70">
          <p className="text-sm text-slate-700 leading-relaxed">{DESIGN_CASE_STEPS}</p>
        </Card>
      )}

      {isPhaseEnd && (
        <Card className="bg-slate-50/70">
          <h2 className="font-black text-slate-900 text-sm mb-1">Phase {phase.id} checklist: {phase.checklistTitle}</h2>
          <p className="text-xs text-slate-500 mb-2">The deliverable passes only if every check is true.</p>
          <Checklist idPrefix={`phase${phase.id}`} items={phase.checklist} checks={progress.checks} onToggle={toggleCheck} />
        </Card>
      )}

      <p className="text-xs text-slate-500">End the day with 3 lines in your notebook: one idea, one number, one question.</p>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-t border-slate-200/80 pt-5">
        <button
          type="button"
          onClick={() => toggleDay(day.day)}
          className={`h-11 px-5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-colors ${
            done ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-[#111827] text-white hover:bg-black'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" /> {done ? 'Done' : 'Mark day as done'}
        </button>
        <div className="flex gap-2">
          {prev && (
            <Link to={`/ai-pm/day/${prev.day}`} className="h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-bold flex items-center gap-1.5 hover:bg-slate-50">
              <ArrowLeft className="w-4 h-4" /> Day {prev.day}
            </Link>
          )}
          {next && (
            <Link to={`/ai-pm/day/${next.day}`} className="h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-bold flex items-center gap-1.5 hover:bg-slate-50">
              Day {next.day} <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};
