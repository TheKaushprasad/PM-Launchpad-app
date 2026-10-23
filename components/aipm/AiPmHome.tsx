import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Flag, Target, Package, Ban, Users, Bookmark } from 'lucide-react';
import { AI_PM_OVERVIEW } from '../../data/aiPmCourse/content';
import { AI_PM_PHASES, AI_PM_DAYS } from '../../data/aiPmCourse/plan';
import { useAiPmProgress } from './progress';
import { PageTitle, Section, Card, Prose, Bullets, TemplateChip, Checklist } from './ui';

const ProgressBar: React.FC<{ done: number; total: number }> = ({ done, total }) => (
  <div className="h-2 rounded-full bg-slate-200/70 overflow-hidden">
    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${Math.round((done / total) * 100)}%` }} />
  </div>
);

const nextDay = (done: number[]) => AI_PM_DAYS.find((d) => !done.includes(d.day))?.day ?? 90;

export const AiPmOverview: React.FC = () => {
  const { progress } = useAiPmProgress();
  const o = AI_PM_OVERVIEW;
  const started = progress.done.length > 0;
  const resumeDay = nextDay(progress.done);

  return (
    <div className="space-y-10">
      <header className="relative bg-[#043C2C] rounded-3xl p-6 sm:p-8 lg:p-10 text-white overflow-hidden border border-[#065F46]/60">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative space-y-4 max-w-3xl">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#6EE7B7]">90-day course · for working PMs</p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">{o.title}</h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{o.intro}</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to={`/ai-pm/day/${started ? resumeDay : 1}`}
              className="h-11 px-5 rounded-xl bg-[#34D399] text-[#043C2C] font-black text-sm flex items-center gap-2 hover:bg-[#6EE7B7]"
            >
              {started ? `Continue with Day ${resumeDay}` : 'Start Day 1'} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/ai-pm/plan" className="h-11 px-5 rounded-xl bg-white/10 border border-white/15 font-bold text-sm flex items-center hover:bg-white/15">
              See the 90-day plan
            </Link>
          </div>
          {started && (
            <div className="pt-2 space-y-1.5 max-w-sm">
              <p className="text-xs text-slate-300 font-bold">{progress.done.length} of 90 days done</p>
              <ProgressBar done={progress.done.length} total={90} />
            </div>
          )}
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-black text-slate-900 flex items-center gap-2 mb-2"><Users className="w-4 h-4 text-brand-600" />Who it is for</h3>
          <Bullets items={o.whoFor} />
        </Card>
        <Card>
          <h3 className="font-black text-slate-900 mb-2">The one-line thesis</h3>
          <Prose>{o.thesis}</Prose>
        </Card>
      </div>

      <Section title="How it was built">
        <Prose>{o.howBuilt}</Prose>
      </Section>

      <Section title="Course goal">
        <Card className="bg-emerald-50/60 border-emerald-100">
          <div className="flex gap-3">
            <Target className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base font-bold text-emerald-950 leading-relaxed">{o.goal}</p>
          </div>
        </Card>
        <h3 className="font-black text-slate-900 pt-2">Why this goal</h3>
        <Prose>{o.whyGoal}</Prose>
      </Section>

      <Section title="Outcomes">
        <p className="text-sm text-slate-500 font-bold">At day 90 you can do these tasks without help.</p>
        <div data-reveal-stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {o.outcomes.map((g, i) => (
            <Card key={g.title}>
              <p className="text-[11px] font-black uppercase tracking-widest text-brand-600 mb-1">{i + 1}</p>
              <h3 className="font-black text-slate-900 mb-2">{g.title}</h3>
              <Bullets items={g.items} />
            </Card>
          ))}
        </div>
      </Section>

      <Section title="What you have at day 90">
        <div className="grid sm:grid-cols-2 gap-3">
          {AI_PM_PHASES.flatMap((p) =>
            p.artifacts.map((a) => (
              <div key={a.name} className="flex gap-3 items-start bg-white border border-slate-200/80 rounded-2xl p-4">
                <Package className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-slate-900 text-sm">{a.name}</p>
                  <p className="text-sm text-slate-600">{a.proves}</p>
                  <p className="text-[11px] font-bold text-slate-400 mt-1">Phase {p.id}</p>
                </div>
              </div>
            )),
          )}
        </div>
        <Prose>{o.artifactsNote}</Prose>
      </Section>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-black text-slate-900 flex items-center gap-2 mb-2"><Flag className="w-4 h-4 text-emerald-600" />How you know the goal is met</h3>
          <Bullets items={o.goalMet} />
        </Card>
        <Card>
          <h3 className="font-black text-slate-900 flex items-center gap-2 mb-2"><Ban className="w-4 h-4 text-rose-500" />Out of scope</h3>
          <Bullets items={o.outOfScope} />
        </Card>
      </div>
    </div>
  );
};

export const AiPmPlan: React.FC = () => {
  const navigate = useNavigate();
  const { progress, isDone, toggleDay, toggleCheck, isBookmarked } = useAiPmProgress();
  const o = AI_PM_OVERVIEW;

  return (
    <div className="space-y-10">
      <PageTitle eyebrow="90-day plan" title="Seven phases, one capstone">
        {o.planIntro}
      </PageTitle>

      <div data-reveal-stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {o.rules.map((r) => (
          <Card key={r.title}>
            <h3 className="font-black text-slate-900 text-sm mb-1">{r.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{r.text}</p>
          </Card>
        ))}
      </div>

      {AI_PM_PHASES.map((phase) => {
        const days = AI_PM_DAYS.filter((d) => d.day >= phase.start && d.day <= phase.end);
        const doneCount = days.filter((d) => isDone(d.day)).length;
        return (
          <section key={phase.id} id={`phase-${phase.id}`} className="space-y-4 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-200/80 pb-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">
                  Phase {phase.id} · Days {phase.start}–{phase.end}
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{phase.title}</h2>
                <p className="text-sm text-slate-600 mt-1">
                  <span className="font-bold text-slate-800">Deliverable:</span> {phase.deliverable}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {phase.templates.map((t) => <TemplateChip key={t} id={t} />)}
                <span className="text-xs font-bold text-slate-500 ml-1">{doneCount}/{days.length} done</span>
              </div>
            </div>

            <div data-reveal-stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {days.map((d) => {
                const done = isDone(d.day);
                return (
                  <div
                    key={d.day}
                    role="link"
                    tabIndex={0}
                    onClick={() => navigate(`/ai-pm/day/${d.day}`)}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/ai-pm/day/${d.day}`)}
                    className={`group cursor-pointer rounded-2xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                      done ? 'bg-emerald-50/50 border-emerald-200' : d.kind ? 'bg-amber-50/40 border-amber-200/70' : 'bg-white border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                        Day {d.day}{d.kind === 'weekend' ? ' · Weekend' : d.kind === 'review' ? ' · Gate' : ''}
                        {isBookmarked(d.day) && <Bookmark aria-label="Bookmarked" className="inline w-3.5 h-3.5 ml-1.5 -mt-0.5 fill-amber-500 text-amber-500" />}
                      </p>
                      <button
                        type="button"
                        aria-label={done ? `Mark day ${d.day} not done` : `Mark day ${d.day} done`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDay(d.day);
                        }}
                        className="p-0.5 -m-0.5 rounded-full"
                      >
                        <CheckCircle2 className={`w-5 h-5 ${done ? 'text-emerald-600' : 'text-slate-200 group-hover:text-slate-300'}`} />
                      </button>
                    </div>
                    <h3 className="font-black text-slate-900 mt-1">{d.topic}</h3>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{d.do}</p>
                  </div>
                );
              })}
            </div>

            <Card className="bg-slate-50/70">
              <h3 className="font-black text-slate-900 text-sm mb-1">Phase {phase.id} checklist: {phase.checklistTitle}</h3>
              <p className="text-xs text-slate-500 mb-2">The deliverable passes only if every check is true.</p>
              <Checklist idPrefix={`phase${phase.id}`} items={phase.checklist} checks={progress.checks} onToggle={toggleCheck} />
            </Card>
          </section>
        );
      })}
    </div>
  );
};
