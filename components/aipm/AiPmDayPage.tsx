import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  BookOpen, Hammer, CheckCircle2, Calculator, Lightbulb, Bookmark, ChevronLeft, ChevronRight,
  FileEdit, Clock, Save, X, GraduationCap, BarChart3, List, FileText, ExternalLink, MonitorPlay, Play,
} from 'lucide-react';
import { AI_PM_DAYS, AI_PM_PHASES, phaseForDay, DESIGN_CASE_STEPS, AI_PM_REFLECTION } from '../../data/aiPmCourse/plan';
import { AI_PM_BACKGROUND_EXAMPLE } from '../../data/aiPmCourse/content';
import { useAiPmProgress } from './progress';
import { AI_PM_LESSONS, AI_PM_LESSON_TOPICS } from './lessons';
import { AI_PM_RESOURCES } from '../../data/aiPmCourse/resources';
import { Card, TemplateChip, Checklist } from './ui';

// Layout follows the owner's day-page mockup (2026-10-23): day stepper and course progress on top, header with
// time / phase / level, the video with "Mark video complete", the lesson on the left; on the right, actions
// (bookmark, save notes, done), course material, topics to cover and personal notes.

const NotesPad: React.FC<{ day: number; value: string; onSave: (text: string) => void; onClose: () => void }> = ({ day, value, onSave, onClose }) => {
  const [text, setText] = useState(value);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setText(value);
    setSavedAt(null);
  }, [day]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimeout(timer.current), []);

  const close = () => {
    clearTimeout(timer.current);
    if (text !== value) save(text);
    onClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const save = (next: string) => {
    onSave(next);
    setSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  return (
    <div role="dialog" aria-label={`Personal notes for day ${day}`} className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-xl shadow-zinc-900/10 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
            <FileEdit className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 text-sm">Personal Notes</h3>
            <p className="text-[11px] text-zinc-400 font-medium">Day {day} takeaways</p>
          </div>
        </div>
        {(savedAt || value) && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" /> {savedAt ? `Saved ${savedAt}` : 'Saved'}
          </span>
        )}
        <button type="button" aria-label="Close notes" onClick={close} className="ml-2 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100">
          <X className="w-4 h-4" />
        </button>
      </div>
      <textarea
        id="aipm-notes"
        autoFocus
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
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium text-zinc-400">{text.length}/5000 characters · this browser only</p>
        <button
          type="button"
          onClick={() => { clearTimeout(timer.current); save(text); }}
          className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5"
        >
          <Save className="w-3.5 h-3.5" /> Save notes
        </button>
      </div>
    </div>
  );
};

export const AiPmDayPage: React.FC = () => {
  const { day: dayParam } = useParams();
  const navigate = useNavigate();
  const dayNum = Number(dayParam);
  const day = AI_PM_DAYS.find((d) => d.day === dayNum);
  const phase = phaseForDay(dayNum);
  const {
    progress, isDone, toggleDay, toggleCheck, isBookmarked, toggleBookmark, setNote, isVideoDone, toggleVideoDone,
  } = useAiPmProgress();
  const [notesOpen, setNotesOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    document.querySelector('main')?.scrollTo({ top: 0 });
    setNotesOpen(false);
    setActiveVideoId(null);
  }, [dayNum]);

  if (!day || !phase) return <Navigate to="/ai-pm/plan" replace />;

  const done = isDone(day.day);
  const bookmarked = isBookmarked(day.day);
  const videoDone = isVideoDone(day.day);
  const prev = AI_PM_DAYS.find((d) => d.day === day.day - 1);
  const next = AI_PM_DAYS.find((d) => d.day === day.day + 1);
  const isPhaseEnd = day.day === phase.end;
  const example = AI_PM_PHASES.find((p) => p.workedExample?.day === day.day)?.workedExample;
  const Lesson = AI_PM_LESSONS[day.day] as React.FC | undefined;
  const hasLesson = day.day in AI_PM_LESSONS;
  const topics = AI_PM_LESSON_TOPICS[day.day] ?? [];
  const resources = (day.resources ?? []).map((id) => ({ id, ...AI_PM_RESOURCES[id] })).filter((r) => r.title);
  const videos = [
    ...(day.video ? [{ id: day.video, title: day.videoTitle ?? `Day ${day.day} video` }] : []),
    ...(day.moreVideos ?? []),
  ];
  const activeVideo = videos.find((v) => v.id === activeVideoId) ?? videos[0];
  const materialCount = resources.length + videos.length;
  const coursePercent = Math.round((progress.done.length / AI_PM_DAYS.length) * 100);
  const timeLine = day.time ?? (day.kind === 'weekend' ? '3-hour block' : '45–60 minutes');
  const otherBookmarks = progress.bookmarks.filter((d) => d !== day.day);

  const goToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const hasNotes = Boolean(progress.notes[day.day]?.trim());

  return (
    <article className="space-y-5">
      {/* Day stepper + course progress */}
      <div className="sticky top-[53px] z-20 -mx-3 px-3 md:-mx-5 md:px-5 -mt-3 py-2.5 bg-zinc-50/95 backdrop-blur-md flex items-center justify-between gap-4 border-b border-zinc-200/70">
        <div className="flex items-center gap-1">
          <button type="button" aria-label="Previous day" disabled={!prev} onClick={() => prev && navigate(`/ai-pm/day/${prev.day}`)} className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 disabled:text-zinc-300 disabled:hover:bg-transparent">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-zinc-900 px-1">Day {day.day}</span>
          <button type="button" aria-label="Next day" disabled={!next} onClick={() => next && navigate(`/ai-pm/day/${next.day}`)} className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 disabled:text-zinc-300 disabled:hover:bg-transparent">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="w-40 sm:w-64">
          <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-500 mb-1">
            <span>Day {day.day} of 90</span>
            <span>{coursePercent}% done</span>
          </div>
          <div className="h-2 w-full rounded-full bg-zinc-200 overflow-hidden">
            <div className="h-full bg-brand-600 rounded-full" style={{ width: `${Math.max(coursePercent, 2)}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Main column */}
        <div className="lg:col-span-8 space-y-4 min-w-0">
          <header className="space-y-2.5">
            <Link to={`/ai-pm/plan#phase-${phase.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-brand-700">
              <ChevronLeft className="w-4 h-4" /> Back to curriculum
            </Link>
            <div>
              <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-lg bg-brand-50 text-brand-800 border border-brand-100">
                Day {day.day} of 90{day.kind === 'weekend' ? ' · Weekend block' : day.kind === 'review' ? ' · Gate day' : ''}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-[2rem] font-bold text-zinc-900 leading-tight tracking-tight">{day.topic}</h1>
            {hasLesson && <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">{day.learn}</p>}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-1 text-sm text-zinc-600">
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-zinc-500" />{timeLine}</span>
              <span className="inline-flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-zinc-500" />{day.skill ?? phase.title}</span>
              {day.level && <span className="inline-flex items-center gap-1.5"><BarChart3 className="w-4 h-4 text-zinc-500" />{day.level}</span>}
            </div>
          </header>

          {day.objective && (
            <section id="objective" className="scroll-mt-32 bg-brand-50/60 p-4 sm:p-5 rounded-2xl border border-brand-100 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-600">Today’s objective</span>
              <p className="text-base font-bold text-zinc-900 leading-relaxed">{day.objective}</p>
            </section>
          )}

          {activeVideo && (
            <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-zinc-800">
              <div className="bg-zinc-800/50 px-3 py-2 flex items-center justify-between gap-2 border-b border-zinc-700/50">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest truncate">{activeVideo.title}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleVideoDone(day.day)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      videoDone ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{videoDone ? 'Video completed' : 'Mark video complete'}</span>
                  </button>
                  <MonitorPlay className="w-3.5 h-3.5 text-brand-400" />
                </div>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  key={activeVideo.id}
                  src={`https://www.youtube.com/embed/${activeVideo.id}`}
                  className="w-full h-full"
                  title={activeVideo.title}
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
              <h2 className="font-bold text-zinc-900 flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-brand-600" /> Learn
              </h2>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">{day.learn}</p>
            </Card>
          )}

          <Card className="border-brand-100 bg-brand-50/40">
            <h2 className="font-bold text-zinc-900 flex items-center gap-2 mb-2">
              <Hammer className="w-4 h-4 text-brand-600" /> Deliverable
            </h2>
            <p className="text-sm sm:text-base text-zinc-800 leading-relaxed">{day.do}</p>
            {day.templates && (
              <div className="flex flex-wrap gap-2 mt-3">
                {day.templates.map((t) => <TemplateChip key={t} id={t} />)}
              </div>
            )}
          </Card>

          <Card className="bg-zinc-50/70">
            <h2 className="font-bold text-zinc-900 flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" /> Reflect
            </h2>
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">{AI_PM_REFLECTION}</p>
          </Card>

          {example && (
            <Card className="bg-amber-50/50 border-amber-200/70">
              <h2 className="font-bold text-zinc-900 flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-amber-600" /> Worked example (illustrative)
              </h2>
              <p className="text-sm text-zinc-700 leading-relaxed">{example.text}</p>
            </Card>
          )}

          {day.day === 82 && (
            <Card className="bg-amber-50/50 border-amber-200/70">
              <h2 className="font-bold text-zinc-900 flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600" /> Example background line
              </h2>
              <p className="text-sm text-zinc-700 leading-relaxed"><span className="font-semibold">Before:</span> {AI_PM_BACKGROUND_EXAMPLE.before}</p>
              <p className="text-sm text-zinc-700 leading-relaxed mt-1"><span className="font-semibold">After:</span> {AI_PM_BACKGROUND_EXAMPLE.after}</p>
            </Card>
          )}

          {day.templates?.includes('T10') && (
            <Card className="bg-zinc-50/70">
              <p className="text-sm text-zinc-700 leading-relaxed">{DESIGN_CASE_STEPS}</p>
            </Card>
          )}

          {isPhaseEnd && (
            <Card className="bg-zinc-50/70">
              <h2 className="font-bold text-zinc-900 text-sm mb-1">Phase {phase.id} checklist: {phase.checklistTitle}</h2>
              <p className="text-xs text-zinc-500 mb-2">The deliverable passes only if every check is true.</p>
              <Checklist idPrefix={`phase${phase.id}`} items={phase.checklist} checks={progress.checks} onToggle={toggleCheck} />
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-1">
            <button
              type="button"
              onClick={() => toggleDay(day.day)}
              className={`h-11 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
                done ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-brand-600 text-white hover:bg-brand-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" /> {done ? 'Completed' : 'Mark as done'}
            </button>
            {next && (
              <Link to={`/ai-pm/day/${next.day}`} className="h-11 px-4 rounded-xl border border-zinc-200 bg-white text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-zinc-50">
                Next: Day {next.day} <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="relative lg:col-span-4 space-y-4 lg:sticky lg:top-[124px]">
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => toggleBookmark(day.day)}
              className={`h-11 rounded-xl border text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                bookmarked ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              {bookmarked ? 'Saved' : 'Bookmark'}
            </button>
            <button
              type="button"
              aria-expanded={notesOpen}
              onClick={() => setNotesOpen((o) => !o)}
              className={`relative h-11 rounded-xl border text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                notesOpen ? 'bg-brand-50 border-brand-200 text-brand-800' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <FileEdit className="w-4 h-4" /> Notes
              {hasNotes && <span aria-label="Has notes" className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-500" />}
            </button>
            <button
              type="button"
              onClick={() => toggleDay(day.day)}
              className={`h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                done ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-brand-600 hover:bg-brand-700 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" /> {done ? 'Done' : 'Mark done'}
            </button>
          </div>

          {notesOpen && (
            <div className="absolute left-0 right-0 top-[3.25rem] z-30">
              <NotesPad day={day.day} value={progress.notes[day.day] || ''} onSave={(text) => setNote(day.day, text)} onClose={() => setNotesOpen(false)} />
            </div>
          )}

          {materialCount > 0 && (
            <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-zinc-900 flex items-center gap-2"><BookOpen className="w-4 h-4 text-brand-600" /> Course material</h3>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">{materialCount} {materialCount === 1 ? 'item' : 'items'}</span>
              </div>
              {videos.map((v) => {
                const isActive = v.id === activeVideo?.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setActiveVideoId(v.id)}
                    className={`group w-full flex flex-col gap-2 p-2 rounded-xl border text-left transition-all ${isActive ? 'bg-brand-50 border-brand-200 ring-2 ring-brand-100' : 'bg-zinc-50 border-zinc-100 hover:bg-white hover:border-brand-100'}`}
                  >
                    <span className="relative block aspect-video rounded-lg overflow-hidden bg-zinc-800">
                      <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt="" className={`w-full h-full object-cover ${isActive ? 'opacity-80' : 'opacity-60'}`} />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md transition-all ${isActive ? 'bg-brand-600 scale-105' : 'bg-black/40 group-hover:bg-brand-600 group-hover:scale-105'}`}>
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </span>
                      </span>
                    </span>
                    <span className="px-0.5">
                      <span className={`block text-xs font-bold leading-tight line-clamp-2 ${isActive ? 'text-brand-900' : 'text-zinc-700'}`}>{v.title}</span>
                      <span className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{isActive ? 'Now playing' : 'Video lesson'}</span>
                    </span>
                  </button>
                );
              })}
              {resources.map((r) => (
                <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-xl border border-zinc-200/80 p-3 hover:border-brand-200 hover:bg-brand-50/30">
                  <span className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0"><FileText className="w-4 h-4" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-zinc-900 leading-snug group-hover:text-brand-800">{r.title}</span>
                    <span className="block text-xs text-zinc-500 mt-0.5">{r.by}</span>
                  </span>
                  {r.url && <ExternalLink className="w-3.5 h-3.5 text-zinc-400 mt-1 shrink-0" />}
                </a>
              ))}
            </div>
          )}

          {topics.length > 0 && (
            <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 space-y-2">
              <h3 className="font-bold text-zinc-900 flex items-center gap-2"><List className="w-4 h-4 text-brand-600" /> Topics to cover</h3>
              <ul className="divide-y divide-zinc-100">
                {topics.map((t, i) => (
                  <li key={t.id}>
                    <button type="button" onClick={() => goToSection(t.id)} className="w-full flex items-center gap-3 py-2 text-left group">
                      <span className="text-xs font-semibold text-brand-800 bg-brand-50 rounded-md w-8 py-1 text-center shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex-1 text-sm text-zinc-700 group-hover:text-zinc-900">{t.label}</span>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}


          {otherBookmarks.length > 0 && (
            <div className="bg-white rounded-2xl p-4 border border-zinc-200/80">
              <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2 mb-2">
                <Bookmark className="w-4 h-4 text-amber-500" /> Your bookmarks
              </h3>
              <ul className="space-y-1">
                {otherBookmarks.map((d) => (
                  <li key={d}>
                    <Link to={`/ai-pm/day/${d}`} className="text-sm font-semibold text-zinc-700 hover:text-brand-700">
                      Day {d}: <span className="font-normal">{AI_PM_DAYS.find((x) => x.day === d)?.topic}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
};
