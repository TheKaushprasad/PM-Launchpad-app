import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, Clock, Hammer, HelpCircle, Lightbulb, ListChecks, Lock, PlayCircle, ShoppingBag, Timer,
} from 'lucide-react';
import { LEVEL1_WEEKS, LEVEL2_WEEKS } from '../../data/aiPmCourse/levels';
import type { L1Lesson, L1Week } from '../../data/aiPmCourse/levelTypes';
import {
  PATH_INTRO, PATH_AT_A_GLANCE, LEVEL1_HOW, PRODUCT_MUST_HAVE, PRODUCT_REAL_RULES, PRODUCTS_TO_AVOID, ONE_STACK, SHOPASSIST,
  LEVEL2_HOW, DEMO_DAY,
} from '../../data/aiPmCourse/levelsOverview';
import { PageTitle, Section, Card, Prose, Bullets, DataTable, Checklist } from './ui';
import { useLevel1Progress, type Level1Progress } from './levelProgress';
import { Article } from './Article';
import { QuizPanel } from './QuizPanel';

const ALL_LESSONS: { week: L1Week; lesson: L1Lesson }[] = LEVEL1_WEEKS.flatMap((week) => week.lessons.map((lesson) => ({ week, lesson })));
const lessonPath = (id: string) => `/ai-pm/level-1/lesson/${id.replace('.', '-')}`;
const milestonePath = (n: number) => `/ai-pm/level-1/milestone/${n}`;
const weekPath = (n: number) => `/ai-pm/level-1/week/${n}`;

// Quizzes are mandatory: a lesson with a quiz is done only when the quiz is passed, and every lesson (and milestone)
// after an unpassed quiz stays locked.
const lessonDone = (p: Level1Progress, l: L1Lesson) => (l.quiz ? !!p.quizPassed?.[l.id] : p.lessonsDone.includes(l.id));
const blockingIndex = (p: Level1Progress) => {
  const i = ALL_LESSONS.findIndex(({ lesson }) => lesson.quiz && !p.quizPassed?.[lesson.id]);
  return i < 0 ? Infinity : i;
};
const lessonLocked = (p: Level1Progress, id: string) => ALL_LESSONS.findIndex((x) => x.lesson.id === id) > blockingIndex(p);
const milestoneLocked = (p: Level1Progress, week: number) => {
  const b = blockingIndex(p);
  return b !== Infinity && ALL_LESSONS[b].week.n <= week;
};
const lessonLabel = (l: L1Lesson) => (l.day !== undefined ? `Day ${l.day}` : `Lesson ${l.id}`);

const LevelBadge: React.FC<{ level: 1 | 2 }> = ({ level }) => (
  <span
    className={`inline-flex items-center h-6 px-2 rounded-md text-[11px] font-black ${
      level === 1 ? 'bg-brand-50 text-brand-700 border border-brand-100' : 'bg-slate-900 text-white'
    }`}
  >
    Level {level}
  </span>
);

const ProgressBar: React.FC<{ done: number; total: number }> = ({ done, total }) => (
  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden" aria-label={`${done} of ${total} done`}>
    <div className="h-full bg-brand-600 rounded-full transition-all" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
  </div>
);

// ---------------------------------------------------------------- Overview

const COURSE_MAP = [
  ...LEVEL1_WEEKS.map((w) => ({ level: 1 as const, n: w.n, days: `${w.start} to ${w.end}`, title: w.title, milestone: w.milestone.title })),
  ...LEVEL2_WEEKS.map((w) => ({ level: 2 as const, n: w.n, days: `${w.start} to ${w.end}`, title: w.title, milestone: w.milestone })),
];

export const LevelsOverview: React.FC = () => {
  const { progress } = useLevel1Progress();
  const total = ALL_LESSONS.length;
  const doneCount = ALL_LESSONS.filter(({ lesson }) => lessonDone(progress, lesson)).length;
  const next = ALL_LESSONS.find(({ lesson }) => !lessonDone(progress, lesson));
  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-[#064E3B] text-white p-5 sm:p-8 space-y-4">
        <p className="text-[11px] font-black uppercase tracking-widest text-[#6EE7B7]">One path · two levels</p>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">AI PM in 90 Days</h1>
        <p className="text-sm sm:text-base text-emerald-50/90 leading-relaxed max-w-3xl">{PATH_INTRO}</p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            to={next ? lessonPath(next.lesson.id) : '/ai-pm/level-1'}
            className="tap-target inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-[#064E3B] text-sm font-black hover:bg-emerald-50"
          >
            {doneCount ? 'Continue Level 1' : 'Start Level 1 for free'} <ArrowRight className="size-4" />
          </Link>
          <Link to="/ai-pm/level-2" className="tap-target inline-flex items-center h-11 px-4 rounded-xl text-sm font-bold text-white/90 hover:bg-white/10">
            See Level 2
          </Link>
        </div>
        {doneCount > 0 && (
          <div className="max-w-sm space-y-1.5 pt-2">
            <p className="text-xs text-emerald-100 font-bold">{doneCount} of {total} Level 1 lessons done</p>
            <div className="h-1.5 rounded-full bg-white/15 overflow-hidden">
              <div className="h-full bg-[#6EE7B7]" style={{ width: `${(doneCount / total) * 100}%` }} />
            </div>
          </div>
        )}
      </div>

      <Section title="The path at a glance">
        <DataTable table={PATH_AT_A_GLANCE} />
      </Section>

      <Section title="Course map">
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80">
                  {['Level', 'Week', 'Days', 'Topic', 'Build milestone'].map((h) => (
                    <th key={h} className="py-3 px-4 font-black text-slate-900 text-xs uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {COURSE_MAP.map((r) => (
                  <tr key={r.n} className="border-b border-slate-100 last:border-0 align-top">
                    <td className="py-3 px-4"><LevelBadge level={r.level} /></td>
                    <td className="py-3 px-4 font-bold text-slate-900">{r.n}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{r.days}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {r.level === 1 ? <Link to={weekPath(r.n)} className="hover:text-brand-700 hover:underline">{r.title}</Link> : r.title}
                    </td>
                    <td className="py-3 px-4">{r.milestone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </div>
  );
};

// ---------------------------------------------------------------- Your product

export const ProductRules: React.FC = () => (
  <div className="space-y-8">
    <PageTitle eyebrow="Your product" title="Rules for the product you build">
      You build one product across both levels. Each week you add what that week teaches.
    </PageTitle>
    <Section title="By the end of Level 1, your product must have">
      <Card><Bullets items={PRODUCT_MUST_HAVE} /></Card>
    </Section>
    <Section title="Rules for “real”">
      <div className="grid sm:grid-cols-3 gap-3">
        {PRODUCT_REAL_RULES.map((r) => (
          <Card key={r.term}>
            <p className="font-black text-slate-900 text-sm">{r.term}</p>
            <p className="text-sm text-slate-600 leading-relaxed mt-1">{r.text}</p>
          </Card>
        ))}
      </div>
    </Section>
    <Section title="Products to avoid">
      <Card className="bg-rose-50/60 border-rose-200/70"><Prose>{PRODUCTS_TO_AVOID}</Prose></Card>
    </Section>
    <Section title="One stack for both levels">
      <Card><Prose>{ONE_STACK}</Prose></Card>
    </Section>
    <Section title="The shared example: ShopAssist">
      <Card className="flex gap-3 items-start">
        <ShoppingBag className="size-5 text-brand-600 shrink-0 mt-0.5" />
        <Prose>{SHOPASSIST}</Prose>
      </Card>
    </Section>
  </div>
);

// ---------------------------------------------------------------- Level 1 home

export const Level1Home: React.FC = () => {
  const { progress, milestoneDone } = useLevel1Progress();
  return (
    <div className="space-y-8">
      <PageTitle eyebrow="Level 1 · Free · Days 1 to 35" title="AI-enabled PM">
        Learn to use AI well in your job, and build a small working AI product with no code: a prompt, RAG, one real action and a 20 to 30 case eval.
      </PageTitle>
      <Section title="How Level 1 works">
        <Card><Bullets items={LEVEL1_HOW} /></Card>
      </Section>
      <Section title="Five weeks">
        <div className="grid gap-3">
          {LEVEL1_WEEKS.map((w) => {
            const done = w.lessons.filter((l) => lessonDone(progress, l)).length;
            const mDone = milestoneDone(w.n, w.milestone.doneWhen.length);
            return (
              <Link key={w.n} to={weekPath(w.n)} className="group block">
                <Card className="group-hover:border-brand-300 transition-colors space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Week {w.n} · Days {w.start} to {w.end}</p>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-700">{w.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{w.goal}</p>
                    </div>
                    <ArrowRight className="size-5 text-slate-300 group-hover:text-brand-600 shrink-0 mt-1" />
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold text-slate-500">
                    <span>{done} of {w.lessons.length} lessons done</span>
                    <span className={mDone ? 'text-emerald-700' : ''}>Milestone: {w.milestone.title}{mDone ? ' ✓' : ''}</span>
                  </div>
                  <ProgressBar done={done} total={w.lessons.length} />
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>
    </div>
  );
};

// ---------------------------------------------------------------- Week page

export const Level1WeekPage: React.FC = () => {
  const { week } = useParams();
  const w = LEVEL1_WEEKS.find((x) => x.n === Number(week));
  const { progress, milestoneDone } = useLevel1Progress();
  if (!w) return <Navigate to="/ai-pm/level-1" replace />;
  const mDone = milestoneDone(w.n, w.milestone.doneWhen.length);
  const mLocked = milestoneLocked(progress, w.n);
  return (
    <div className="space-y-8">
      <Link to="/ai-pm/level-1" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="size-3.5" /> Level 1
      </Link>
      <PageTitle eyebrow={`Week ${w.n} · Days ${w.start} to ${w.end}`} title={w.title}>
        <strong className="text-slate-900">Week goal:</strong> {w.goal}
      </PageTitle>
      <Section title="Lessons">
        <div className="grid sm:grid-cols-3 gap-3">
          {w.lessons.map((l) => {
            const locked = lessonLocked(progress, l.id);
            const done = lessonDone(progress, l);
            return (
              <Link key={l.id} to={lessonPath(l.id)} className={`group block ${locked ? 'opacity-60' : ''}`}>
                <Card className="h-full group-hover:border-brand-300 transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-widest text-brand-600">{lessonLabel(l)}</span>
                    {done ? <CheckCircle2 className="size-4 text-emerald-600" /> : locked ? <Lock className="size-4 text-slate-400" /> : <Circle className="size-4 text-slate-300" />}
                  </div>
                  <h3 className="font-black text-slate-900 leading-snug group-hover:text-brand-700">{l.title}</h3>
                  <p className="text-xs text-slate-500 font-bold flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> About {l.minutes} min</span>
                    {l.quiz && (
                      <span className={`inline-flex items-center gap-1 ${done ? 'text-emerald-700' : 'text-violet-700'}`}>
                        <ListChecks className="size-3.5" /> {done ? 'Quiz passed' : 'Quiz required'}
                      </span>
                    )}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>
      <Section title="Build milestone">
        <Link to={milestonePath(w.n)} className="group block">
          <Card className="bg-amber-50/50 border-amber-200/70 group-hover:border-amber-300 flex items-start gap-3">
            <Hammer className="size-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="text-[11px] font-black uppercase tracking-widest text-amber-700">Milestone {w.n}{mDone ? ' · done' : mLocked ? ' · pass this week’s quizzes first' : ''}</p>
              <h3 className="font-black text-slate-900 group-hover:text-amber-800">{w.milestone.title}</h3>
              <p className="text-sm text-slate-600">{w.milestone.doneWhen.length} “Done when” checks</p>
            </div>
            <ArrowRight className="size-5 text-amber-400 shrink-0 mt-1" />
          </Card>
        </Link>
      </Section>
    </div>
  );
};

// ---------------------------------------------------------------- Lesson page

const InfoCard: React.FC<{ icon: React.ReactNode; label: string; tone: string; children: React.ReactNode }> = ({ icon, label, tone, children }) => (
  <div className={`rounded-2xl border p-4 sm:p-5 space-y-1.5 ${tone}`}>
    <p className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">{icon} {label}</p>
    <div className="text-sm text-slate-800 leading-relaxed">{children}</div>
  </div>
);

// Shown in place of a lesson (or milestone) that comes after a quiz the learner has not passed yet.
const LockedNotice: React.FC<{ what: string }> = ({ what }) => {
  const { progress } = useLevel1Progress();
  const b = ALL_LESSONS[blockingIndex(progress)];
  return (
    <div className="max-w-xl mx-auto text-center space-y-4 py-12">
      <div className="mx-auto size-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center"><Lock className="size-5 text-violet-600" /></div>
      <h1 className="text-xl sm:text-2xl font-black text-slate-900">{what} is locked</h1>
      <p className="text-sm text-slate-600 leading-relaxed">
        Quizzes are required. Pass the quiz for {lessonLabel(b.lesson)}: {b.lesson.title} to unlock what comes next.
      </p>
      <Link to={lessonPath(b.lesson.id)} className="tap-target inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#064E3B] text-white text-sm font-black hover:bg-[#065F46]">
        Go to {lessonLabel(b.lesson)} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
};

export const Level1LessonPage: React.FC = () => {
  const { lesson } = useParams();
  const id = (lesson ?? '').replace('-', '.');
  const idx = ALL_LESSONS.findIndex((x) => x.lesson.id === id);
  const { progress, isLessonDone, toggleLesson } = useLevel1Progress();
  const [showAnswer, setShowAnswer] = useState(false);
  if (idx < 0) return <Navigate to="/ai-pm/level-1" replace />;
  if (lessonLocked(progress, id)) return <LockedNotice what={lessonLabel(ALL_LESSONS[idx].lesson)} />;
  const { week, lesson: l } = ALL_LESSONS[idx];
  if (l.body) return <ArticleLessonPage key={l.id} idx={idx} />;
  const prev = ALL_LESSONS[idx - 1];
  const next = ALL_LESSONS[idx + 1];
  const isLastInWeek = week.lessons[week.lessons.length - 1].id === l.id;
  const done = isLessonDone(l.id);
  return (
    <div className="max-w-3xl space-y-6" key={l.id}>
      <Link to={weekPath(week.n)} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="size-3.5" /> Week {week.n}: {week.title}
      </Link>
      <header className="space-y-2">
        <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">Level 1 · Week {week.n} · Lesson {l.id}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{l.title}</h1>
        <p className="text-xs text-slate-500 font-bold flex items-center gap-1"><Clock className="size-3.5" /> About {l.minutes} min</p>
      </header>

      <div className="rounded-2xl bg-brand-50/60 border border-brand-100 p-4 sm:p-5 space-y-2">
        <p className="text-[11px] font-black uppercase tracking-widest text-brand-700">By the end of this lesson, you can</p>
        <ul className="space-y-1.5">
          {(l.outcomes ?? []).map((o) => (
            <li key={o} className="flex gap-2 text-sm font-bold text-slate-800"><CheckCircle2 className="size-4 text-brand-600 shrink-0 mt-0.5" />{o}</li>
          ))}
        </ul>
      </div>

      {l.videos?.map((v) => (
        <div key={v.id} className="space-y-2">
          <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-slate-200">
            <iframe
              src={`https://www.youtube.com/embed/${v.id}`}
              title={v.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5"><PlayCircle className="size-3.5" /> {v.title}</p>
        </div>
      ))}

      <Section title="Topics">
        <Card><Bullets items={l.topics ?? []} /></Card>
      </Section>

      <InfoCard icon={<ShoppingBag className="size-3.5" />} label="ShopAssist example" tone="bg-white border-slate-200/80 text-brand-700">
        {l.example}
      </InfoCard>
      <InfoCard icon={<Timer className="size-3.5" />} label="Try it · 10 min" tone="bg-amber-50/60 border-amber-200/70 text-amber-700">
        {l.tryIt}
      </InfoCard>

      <div className="rounded-2xl border border-violet-200/70 bg-violet-50/50 p-4 sm:p-5 space-y-3">
        <p className="text-[11px] font-black uppercase tracking-widest text-violet-700 flex items-center gap-1.5"><HelpCircle className="size-3.5" /> Check question</p>
        <p className="text-sm font-bold text-slate-900 leading-relaxed">{l.check}</p>
        {showAnswer ? (
          <p className="text-sm text-slate-700 leading-relaxed flex gap-2"><Lightbulb className="size-4 text-violet-600 shrink-0 mt-0.5" />{l.answer}</p>
        ) : (
          <button type="button" onClick={() => setShowAnswer(true)} className="tap-target h-9 px-3.5 rounded-xl bg-white border border-violet-200 text-xs font-black text-violet-700 hover:bg-violet-100">
            Think first, then show the answer
          </button>
        )}
      </div>

      <InfoCard icon={<BookOpen className="size-3.5" />} label="Material" tone="bg-white border-slate-200/80 text-slate-500">
        {l.material}
      </InfoCard>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => toggleLesson(l.id)}
          className={`tap-target inline-flex items-center gap-2 h-11 px-5 rounded-xl text-sm font-black transition-colors ${
            done ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-[#064E3B] text-white hover:bg-[#065F46]'
          }`}
        >
          <CheckCircle2 className="size-4" /> {done ? 'Lesson done' : 'Mark lesson done'}
        </button>
      </div>

      <nav className="flex items-center justify-between gap-3 border-t border-slate-200/80 pt-5">
        {prev ? (
          <Link to={lessonPath(prev.lesson.id)} className="text-xs font-bold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1.5">
            <ArrowLeft className="size-3.5" /> {lessonLabel(prev.lesson)}
          </Link>
        ) : <span />}
        {isLastInWeek ? (
          <Link to={milestonePath(week.n)} className="text-xs font-black text-amber-700 hover:text-amber-900 inline-flex items-center gap-1.5">
            Build milestone {week.n} <ArrowRight className="size-3.5" />
          </Link>
        ) : next ? (
          <Link to={lessonPath(next.lesson.id)} className="text-xs font-black text-brand-700 hover:text-brand-900 inline-flex items-center gap-1.5">
            {lessonLabel(next.lesson)} <ArrowRight className="size-3.5" />
          </Link>
        ) : <span />}
      </nav>
    </div>
  );
};

// ---------------------------------------------------------------- Article lesson (Week 1: the owner's own text + required quiz)

const ArticleLessonPage: React.FC<{ idx: number }> = ({ idx }) => {
  const { progress, passQuiz } = useLevel1Progress();
  const { week, lesson: l } = ALL_LESSONS[idx];
  const prev = ALL_LESSONS[idx - 1];
  const next = ALL_LESSONS[idx + 1];
  const isLastInWeek = week.lessons[week.lessons.length - 1].id === l.id;
  const passed = lessonDone(progress, l);
  const pos = week.lessons.findIndex((x) => x.id === l.id);
  const nextLink = isLastInWeek
    ? { to: milestonePath(week.n), label: `Build milestone ${week.n}` }
    : next ? { to: lessonPath(next.lesson.id), label: `${lessonLabel(next.lesson)}: ${next.lesson.title}` } : null;
  return (
    <div className="space-y-6">
      <Link to={weekPath(week.n)} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="size-3.5" /> Week {week.n}: {week.title}
      </Link>
      <header className="space-y-3 max-w-3xl">
        <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">Level 1 · Week {week.n} · {lessonLabel(l)}</p>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">{l.title}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-500">
          <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> About {l.minutes} min read</span>
          <span className={`inline-flex items-center gap-1 ${passed ? 'text-emerald-700' : 'text-violet-700'}`}>
            <ListChecks className="size-3.5" /> {passed ? 'Quiz passed' : 'Quiz required to finish'}
          </span>
          <span>Lesson {pos + 1} of {week.lessons.length}</span>
          {l.quiz && (
            <button
              type="button"
              onClick={() => document.getElementById('lesson-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="lg:hidden text-violet-700 underline underline-offset-2"
            >
              Jump to quiz
            </button>
          )}
        </div>
        <ProgressBar done={week.lessons.filter((x) => lessonDone(progress, x)).length} total={week.lessons.length} />
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <article className="min-w-0 max-w-3xl rounded-3xl bg-white border border-slate-200/80 p-5 sm:p-8">
          <Article source={l.body ?? ''} skipHeading={l.title} />
        </article>
        <aside id="lesson-quiz" className="scroll-mt-16 lg:sticky lg:top-16 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto no-scrollbar space-y-3">
          {l.quiz && <QuizPanel quiz={l.quiz} passed={passed} onPass={() => passQuiz(l.id)} />}
          {nextLink && (
            passed ? (
              <Link to={nextLink.to} className="tap-target flex items-center justify-between gap-2 rounded-2xl bg-[#064E3B] text-white px-4 py-3 text-sm font-black hover:bg-[#065F46]">
                <span>Next: {nextLink.label}</span> <ArrowRight className="size-4 shrink-0" />
              </Link>
            ) : (
              <div className="flex items-center gap-2 rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-xs font-bold text-slate-500">
                <Lock className="size-3.5 shrink-0" /> Next: {nextLink.label}. Unlocks when you pass the quiz.
              </div>
            )
          )}
        </aside>
      </div>

      <nav className="flex items-center justify-between gap-3 border-t border-slate-200/80 pt-5 max-w-3xl">
        {prev ? (
          <Link to={lessonPath(prev.lesson.id)} className="text-xs font-bold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1.5">
            <ArrowLeft className="size-3.5" /> {lessonLabel(prev.lesson)}
          </Link>
        ) : <span />}
        {nextLink && passed ? (
          <Link to={nextLink.to} className="text-xs font-black text-brand-700 hover:text-brand-900 inline-flex items-center gap-1.5">
            {isLastInWeek ? nextLink.label : lessonLabel(next.lesson)} <ArrowRight className="size-3.5" />
          </Link>
        ) : nextLink ? (
          <span className="text-xs font-bold text-slate-400 inline-flex items-center gap-1.5"><Lock className="size-3.5" /> Pass the quiz to continue</span>
        ) : <span />}
      </nav>
    </div>
  );
};

// ---------------------------------------------------------------- Milestone page

export const Level1MilestonePage: React.FC = () => {
  const { week } = useParams();
  const w = LEVEL1_WEEKS.find((x) => x.n === Number(week));
  const { progress, toggleCheck, milestoneDone } = useLevel1Progress();
  if (!w) return <Navigate to="/ai-pm/level-1" replace />;
  if (milestoneLocked(progress, w.n)) return <LockedNotice what={`Build milestone ${w.n}`} />;
  const nextWeek = LEVEL1_WEEKS.find((x) => x.n === w.n + 1);
  const done = milestoneDone(w.n, w.milestone.doneWhen.length);
  return (
    <div className="max-w-3xl space-y-6">
      <Link to={weekPath(w.n)} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="size-3.5" /> Week {w.n}: {w.title}
      </Link>
      <PageTitle eyebrow={`Level 1 · Week ${w.n} · Build milestone ${w.n}`} title={w.milestone.title}>
        Apply this week’s lessons to your own product.
      </PageTitle>
      <Section title="Build in your product">
        <Card><Bullets items={w.milestone.build} ordered /></Card>
      </Section>
      <Section title="Done when">
        <Card className={done ? 'border-emerald-200 bg-emerald-50/40' : ''}>
          <p className="text-xs text-slate-500 font-bold px-2.5 pb-1">Check your own work. Tick each item once it is true.</p>
          <Checklist idPrefix={`m${w.n}`} items={w.milestone.doneWhen} checks={progress.checks} onToggle={toggleCheck} />
          {done && <p className="text-sm font-black text-emerald-700 px-2.5 pt-2">Milestone {w.n} done.</p>}
        </Card>
      </Section>
      <Section title="What to keep">
        <Card><Prose>{w.milestone.submit}</Prose></Card>
      </Section>
      {nextWeek && (
        <nav className="flex justify-end border-t border-slate-200/80 pt-5">
          <Link to={weekPath(nextWeek.n)} className="text-xs font-black text-brand-700 hover:text-brand-900 inline-flex items-center gap-1.5">
            Week {nextWeek.n}: {nextWeek.title} <ArrowRight className="size-3.5" />
          </Link>
        </nav>
      )}
    </div>
  );
};

// ---------------------------------------------------------------- Level 2

export const Level2Page: React.FC = () => (
  <div className="space-y-8">
    <PageTitle eyebrow="Level 2 · Paid live cohort · Days 36 to 90" title="AI Product Manager">
      The same product becomes production-ready, and you prepare for AI PM roles, with a focus on B2B and enterprise products. Lessons are live lectures, so they are not on this site.
    </PageTitle>
    <Section title="How Level 2 works">
      <Card><Bullets items={LEVEL2_HOW} /></Card>
    </Section>
    <Section title="Eight weeks">
      <div className="grid sm:grid-cols-2 gap-3">
        {LEVEL2_WEEKS.map((w) => (
          <Card key={w.n} className="space-y-3">
            <div className="space-y-1">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Week {w.n} · Days {w.start} to {w.end}</p>
              <h3 className="text-lg font-black text-slate-900">{w.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{w.goal}</p>
            </div>
            <ul className="space-y-1">
              {w.lectures.map((l) => (
                <li key={l.id} className="text-sm text-slate-700 flex gap-2">
                  <span className="font-black text-slate-400 w-9 shrink-0">{l.id}</span>
                  <span>{l.title} <span className="text-slate-400">· {l.minutes} min</span></span>
                </li>
              ))}
            </ul>
            <p className="text-xs font-bold text-amber-700 flex items-center gap-1.5"><Hammer className="size-3.5" /> {w.milestone}</p>
          </Card>
        ))}
      </div>
    </Section>
    <Section title="Demo day">
      <Card className="space-y-3">
        <Prose>{DEMO_DAY.task} You must show:</Prose>
        <Bullets items={DEMO_DAY.mustShow} />
        <p className="text-sm text-slate-600"><strong className="text-slate-900">Rubric:</strong> {DEMO_DAY.rubric}</p>
      </Card>
    </Section>
  </div>
);
