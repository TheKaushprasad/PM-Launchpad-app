import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, BookOpen, Hammer, CheckCircle2, Calculator, Lightbulb, Bookmark, ChevronLeft, ChevronRight,
  FileEdit, Clock, MonitorPlay,
} from 'lucide-react';
import { AI_PM_DAYS, AI_PM_PHASES, phaseForDay, DESIGN_CASE_STEPS } from '../../data/aiPmCourse/plan';
import { AI_PM_BACKGROUND_EXAMPLE } from '../../data/aiPmCourse/content';
import { useAiPmProgress } from './progress';
import { AI_PM_LESSONS } from './lessons';
import { Card, TemplateChip, ResourceLink, Checklist } from './ui';

// Same layout as the 45-day course day page (components/LessonDetail.tsx): sticky top bar with
// bookmark / done / day stepper, a header card, the lesson on the left and notes on the right.

const NotesPad: React.FC<{ day: number; value: string; onSave: (text: string) => void }> = ({ day, value, onSave }) => {
  const [text, setText] = useState(value);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setText(value);
    setSavedAt(null);
  }, [day]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimeout(timer.current), []);

  const save = (next: string) => {
    onSave(next);
    setSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
            <FileEdit className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="font-black text-zinc-900 text-sm">Personal Notes</h3>
            <p className="text-[11px] text-zinc-400 font-medium">Day {day} takeaways</p>
          </div>
        </div>
        <span className="text-[11px] font-bold text-emerald-700">{savedAt ? `Saved ${savedAt}` : value ? 'Saved' : ''}</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => {
          const next = e.target.value.slice(0, 5000);
          setText(next);
          clearTimeout(timer.current);
          timer.current = setTimeout(() => save(next), 800);
        }}
        onBlur={() => {
          clearTimeout(timer.current);
          if (text !== value) save(text);
        }}
        placeholder="Write down your key learnings, frameworks, or questions for this day. Notes save as you type."
        rows={6}
        className="w-full text-sm font-medium text-zinc-800 bg-zinc-50/80 border border-zinc-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white resize-y placeholder:text-zinc-400 leading-relaxed"
      />
      <p className="text-[11px] font-semibold text-zinc-400">{text.length}/5000 · Saved in this browser</p>
    </div>
  );
};

export const AiPmDayPage: React.FC = () => {
  const { day: dayParam } = useParams();
  const navigate = useNavigate();
  const dayNum = Number(dayParam);
  const day = AI_PM_DAYS.find((d) => d.day === dayNum);
  const phase = phaseForDay(dayNum);
  const { progress, isDone, toggleDay, toggleCheck, isBookmarked, toggleBookmark, setNote } = useAiPmProgress();

  useEffect(() => {
    document.querySelector('main')?.scrollTo({ top: 0 });
  }, [dayNum]);

  if (!day || !phase) return <Navigate to="/ai-pm/plan" replace />;

  const done = isDone(day.day);
  const bookmarked = isBookmarked(day.day);
  const prev = AI_PM_DAYS.find((d) => d.day === day.day - 1);
  const next = AI_PM_DAYS.find((d) => d.day === day.day + 1);
  const isPhaseEnd = day.day === phase.end;
  const example = AI_PM_PHASES.find((p) => p.workedExample?.day === day.day)?.workedExample;
  const Lesson = AI_PM_LESSONS[day.day];
  const otherBookmarks = progress.bookmarks.filter((d) => d !== day.day);
  const timeLine = day.time ?? (day.kind === 'weekend' ? 'A 3-hour block for the phase deliverable.' : 'About 60 minutes to learn and 30–60 minutes for the exercise.');

  return (
    <article className="space-y-3.5">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-zinc-50/95 backdrop-blur-md py-2 -mx-3 md:-mx-5 px-3 md:px-5 flex items-center justify-between gap-2 border-b border-zinc-200/60">
        <Link to={`/ai-pm/plan#phase-${phase.id}`} className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-brand-600 min-w-0">
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">Phase {phase.id}: {phase.title}</span>
        </Link>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => toggleBookmark(day.day)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-xs border transition-colors ${
              bookmarked ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-white border-zinc-200 text-zinc-600 hover:border-amber-200 hover:text-amber-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span className="hidden sm:inline">{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
          <button
            type="button"
            onClick={() => toggleDay(day.day)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs border transition-colors ${
              done ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-brand-600 hover:bg-brand-700 border-brand-600 text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {done ? 'Completed' : 'Mark Done'}
          </button>
          <div className="flex items-center gap-0.5 bg-white rounded-lg border border-zinc-200 p-0.5">
            <button
              type="button"
              aria-label="Previous day"
              disabled={!prev}
              onClick={() => prev && navigate(`/ai-pm/day/${prev.day}`)}
              className="p-1 rounded-md text-zinc-600 hover:bg-zinc-100 disabled:text-zinc-300 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-black text-zinc-500 px-2 uppercase tracking-wider border-x border-zinc-100 whitespace-nowrap">Day {day.day}</span>
            <button
              type="button"
              aria-label="Next day"
              disabled={!next}
              onClick={() => next && navigate(`/ai-pm/day/${next.day}`)}
              className="p-1 rounded-md text-zinc-600 hover:bg-zinc-100 disabled:text-zinc-300 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-zinc-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[220px] md:w-[320px] h-[220px] md:h-[320px] bg-brand-50/50 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-widest bg-brand-50 text-brand-700 border border-brand-100">
              Day {day.day} of 90{day.kind === 'weekend' ? ' · Weekend block' : day.kind === 'review' ? ' · Review day' : ''}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 bg-zinc-50 px-2.5 py-0.5 rounded-full border border-zinc-100">
              <Clock className="w-3 h-3" /> {timeLine}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-900 leading-tight tracking-tight">{day.topic}</h1>
          <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-4xl border-l-[3px] border-brand-600 pl-3 font-medium">{day.learn}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 md:gap-4 items-start">
        {/* Main column */}
        <div className="lg:col-span-8 space-y-3.5 min-w-0">
          {day.video && (
            <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
              <div className="px-3 py-2 flex items-center gap-1.5 border-b border-zinc-700/50">
                <MonitorPlay className="w-3.5 h-3.5 text-brand-400" />
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Watch first</span>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${day.video}`}
                  className="w-full h-full"
                  title={`Day ${day.day} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {Lesson ? (
            <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-zinc-200/80">
              <Lesson />
            </div>
          ) : (
            <Card>
              <h2 className="font-black text-zinc-900 flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-brand-600" /> Learn
              </h2>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">{day.learn}</p>
            </Card>
          )}

          <Card className="border-brand-100 bg-brand-50/40">
            <h2 className="font-black text-zinc-900 flex items-center gap-2 mb-2">
              <Hammer className="w-4 h-4 text-brand-600" /> Do
            </h2>
            <p className="text-sm sm:text-base text-zinc-800 font-medium leading-relaxed">{day.do}</p>
            {day.templates && (
              <div className="flex flex-wrap gap-2 mt-3">
                {day.templates.map((t) => <TemplateChip key={t} id={t} />)}
              </div>
            )}
          </Card>

          {example && (
            <Card className="bg-amber-50/50 border-amber-200/70">
              <h2 className="font-black text-zinc-900 flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-amber-600" /> Worked example (illustrative)
              </h2>
              <p className="text-sm text-zinc-700 leading-relaxed">{example.text}</p>
            </Card>
          )}

          {day.day === 81 && (
            <Card className="bg-amber-50/50 border-amber-200/70">
              <h2 className="font-black text-zinc-900 flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600" /> Example background line
              </h2>
              <p className="text-sm text-zinc-700 leading-relaxed"><span className="font-bold">Before:</span> {AI_PM_BACKGROUND_EXAMPLE.before}</p>
              <p className="text-sm text-zinc-700 leading-relaxed mt-1"><span className="font-bold">After:</span> {AI_PM_BACKGROUND_EXAMPLE.after}</p>
            </Card>
          )}

          {day.templates?.includes('T10') && (
            <Card className="bg-zinc-50/70">
              <p className="text-sm text-zinc-700 leading-relaxed">{DESIGN_CASE_STEPS}</p>
            </Card>
          )}

          {isPhaseEnd && (
            <Card className="bg-zinc-50/70">
              <h2 className="font-black text-zinc-900 text-sm mb-1">Phase {phase.id} checklist: {phase.checklistTitle}</h2>
              <p className="text-xs text-zinc-500 mb-2">The deliverable passes only if every check is true.</p>
              <Checklist idPrefix={`phase${phase.id}`} items={phase.checklist} checks={progress.checks} onToggle={toggleCheck} />
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-1">
            <button
              type="button"
              onClick={() => toggleDay(day.day)}
              className={`h-11 px-5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-colors ${
                done ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-brand-600 text-white hover:bg-brand-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" /> {done ? 'Completed' : 'Mark day as done'}
            </button>
            {next && (
              <Link to={`/ai-pm/day/${next.day}`} className="h-11 px-4 rounded-xl border border-zinc-200 bg-white text-sm font-bold flex items-center justify-center gap-1.5 hover:bg-zinc-50">
                Next: Day {next.day} <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-3.5 lg:sticky lg:top-14">
          <NotesPad day={day.day} value={progress.notes[day.day] || ''} onSave={(text) => setNote(day.day, text)} />

          {day.resources && (
            <div className="bg-white rounded-2xl p-4 border border-zinc-200/80">
              <h3 className="font-black text-zinc-900 text-sm flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-brand-600" /> Also watch or read
              </h3>
              <ul className="space-y-1.5">
                {day.resources.map((r) => (
                  <li key={r}><ResourceLink id={r} /></li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white rounded-2xl p-4 border border-zinc-200/80">
            <h3 className="font-black text-zinc-900 text-sm flex items-center gap-2 mb-2">
              <Bookmark className="w-4 h-4 text-amber-500" /> Your bookmarks
            </h3>
            {otherBookmarks.length === 0 ? (
              <p className="text-xs font-medium text-zinc-500">Bookmark a day to come back to it. Bookmarked days show here and on the 90-day plan.</p>
            ) : (
              <ul className="space-y-1">
                {otherBookmarks.map((d) => (
                  <li key={d}>
                    <Link to={`/ai-pm/day/${d}`} className="text-sm font-bold text-zinc-700 hover:text-brand-600">
                      Day {d}: <span className="font-medium">{AI_PM_DAYS.find((x) => x.day === d)?.topic}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="text-xs text-zinc-500 px-1">End the day with 3 lines in your notes: one idea, one number, one question.</p>
        </aside>
      </div>
    </article>
  );
};
