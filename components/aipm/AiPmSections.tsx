import React from 'react';
import {
  AI_PM_WHY, AI_PM_WEEK_PHASES, AI_PM_WEEKS_INTRO, AI_PM_TEMPLATES, AI_PM_BACKGROUND_EXAMPLE,
  AI_PM_SKILLS, AI_PM_SKILL_SCALE, AI_PM_PORTFOLIO, AI_PM_TOOLS, AI_PM_INTERVIEWS,
} from '../../data/aiPmCourse/content';
import { DESIGN_CASE_STEPS } from '../../data/aiPmCourse/plan';
import {
  AI_PM_CORE_READING, AI_PM_FREE_READING, AI_PM_VIDEOS, AI_PM_VIDEO_EXTRAS, AI_PM_VIDEO_EXTRAS_NOTE, AI_PM_SOURCE_GROUPS,
} from '../../data/aiPmCourse/resources';
import { useAiPmProgress } from './progress';
import { PageTitle, Section, Card, Prose, Bullets, DataTable, ResourceLink } from './ui';

export const AiPmWhy: React.FC = () => {
  const w = AI_PM_WHY;
  return (
    <div className="space-y-10">
      <PageTitle eyebrow="Why this course" title="What the JDs actually ask for">{w.jdIntro}</PageTitle>
      <Section title="Skills ranked by how often they appear">
        <DataTable table={w.skills} />
      </Section>
      <Section title="Which AI PM role are you aiming at?">
        <Prose>{w.rolesIntro}</Prose>
        <DataTable table={w.roles} />
        <Prose>{w.rolesNote}</Prose>
      </Section>
      <Section title="Experience and pay signals">
        <Card><Bullets items={w.pay} /></Card>
        <Card className="bg-emerald-50/60 border-emerald-100">
          <p className="text-sm text-emerald-950 leading-relaxed"><span className="font-black">What the JDs reveal between the lines.</span> {w.betweenLines}</p>
        </Card>
      </Section>
      <Section title="What LinkedIn roadmaps agree on">
        <Prose>{w.roadmapsIntro}</Prose>
        <DataTable table={w.roadmaps} />
        <h3 className="font-black text-slate-900 pt-2">Where they differ</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {w.differ.map((d) => (
            <Card key={d.title}>
              <h4 className="font-black text-slate-900 text-sm mb-1">{d.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{d.text}</p>
            </Card>
          ))}
        </div>
        <Prose>{w.underplay}</Prose>
      </Section>
    </div>
  );
};

export const AiPmWeeks: React.FC = () => (
  <div className="space-y-10">
    <PageTitle eyebrow="12-week summary" title="The curriculum: 12 weeks, 4 phases">{AI_PM_WEEKS_INTRO}</PageTitle>
    {AI_PM_WEEK_PHASES.map((p) => (
      <Section key={p.title} title={p.title}>
        <DataTable
          table={{
            headers: ['Week', 'Module', 'What you learn', 'Build / deliverable'],
            rows: p.weeks.map((w) => [String(w.week), w.module, w.learn, w.build]),
          }}
        />
        <Card className="bg-emerald-50/60 border-emerald-100">
          <p className="text-sm text-emerald-950 leading-relaxed"><span className="font-black">Gate:</span> {p.gate}</p>
        </Card>
      </Section>
    ))}
  </div>
);

export const AiPmTemplates: React.FC = () => (
  <div className="space-y-8">
    <PageTitle eyebrow="Templates" title="T1 to T10">
      Copy each template into your notebook. The 90-day plan says when to use each one.
    </PageTitle>
    <div data-reveal-stagger className="grid md:grid-cols-2 gap-4">
      {AI_PM_TEMPLATES.map((t) => (
        <Card key={t.id} className="scroll-mt-24">
          <div id={t.id.toLowerCase()} className="scroll-mt-24" />
          <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">{t.id}</p>
          <h3 className="font-black text-slate-900 mb-2">{t.name}</h3>
          <Bullets items={t.fields} />
          {t.id === 'T9' && (
            <div className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-600 leading-relaxed space-y-1">
              <p><span className="font-bold text-slate-800">Before:</span> {AI_PM_BACKGROUND_EXAMPLE.before}</p>
              <p><span className="font-bold text-slate-800">After:</span> {AI_PM_BACKGROUND_EXAMPLE.after}</p>
            </div>
          )}
          {t.id === 'T10' && <p className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-600 leading-relaxed">{DESIGN_CASE_STEPS}</p>}
        </Card>
      ))}
    </div>
  </div>
);

export const AiPmSkills: React.FC = () => {
  const { progress, setSkill } = useAiPmProgress();
  const ids = AI_PM_SKILLS.flatMap((g, gi) => g.items.map((_, i) => `skill-${gi}-${i}`));
  const scored = ids.filter((id) => progress.skills[id] !== undefined);
  const avg = scored.length ? (scored.reduce((s, id) => s + progress.skills[id], 0) / scored.length).toFixed(1) : '–';

  return (
    <div className="space-y-8">
      <PageTitle eyebrow="Skills checklist" title="Score yourself 0 to 3">
        Tick an item only when you can show an artifact for it. Score yourself on day 3 and again on day 90. Your scores are saved in this browser.
      </PageTitle>
      <div className="flex flex-wrap gap-2 text-xs">
        {AI_PM_SKILL_SCALE.map((s) => (
          <span key={s.score} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600">
            <span className="font-black text-slate-900">{s.score}</span> {s.label}
          </span>
        ))}
        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
          Scored {scored.length}/{ids.length} · average {avg}
        </span>
      </div>
      {AI_PM_SKILLS.map((g, gi) => (
        <Section key={g.group} title={g.group}>
          <Card className="p-2 sm:p-2">
            <ul className="divide-y divide-slate-100">
              {g.items.map((item, i) => {
                const id = `skill-${gi}-${i}`;
                const current = progress.skills[id];
                return (
                  <li key={id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3">
                    <span className="text-sm text-slate-700">{item}</span>
                    <div className="flex gap-1 shrink-0" role="group" aria-label={`Score for: ${item}`}>
                      {[0, 1, 2, 3].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setSkill(id, n)}
                          aria-pressed={current === n}
                          className={`w-9 h-9 rounded-lg text-sm font-black border transition-colors ${
                            current === n ? 'bg-[#111827] text-white border-[#111827]' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </Section>
      ))}
    </div>
  );
};

export const AiPmPortfolio: React.FC = () => (
  <div className="space-y-10">
    <PageTitle eyebrow="Portfolio and tools" title="Portfolio and proof of work">{AI_PM_PORTFOLIO.intro}</PageTitle>
    <DataTable table={AI_PM_PORTFOLIO.projects} />
    <Section title="How to package each project">
      <Prose>{AI_PM_PORTFOLIO.rationaleIntro}</Prose>
      <Card><Bullets items={AI_PM_PORTFOLIO.rationale} ordered /></Card>
      <Prose>{AI_PM_PORTFOLIO.cadence}</Prose>
    </Section>
    <Section title="Tools and tech stack, by depth">
      <Prose>{AI_PM_TOOLS.intro}</Prose>
      <DataTable table={AI_PM_TOOLS.table} />
      <p className="text-xs text-slate-500">{AI_PM_TOOLS.sources}</p>
    </Section>
  </div>
);

export const AiPmInterviews: React.FC = () => (
  <div className="space-y-10">
    <PageTitle eyebrow="Interview prep" title="Job search, brand and interview prep">{AI_PM_INTERVIEWS.intro}</PageTitle>
    <Section title="Interview rounds and how to prepare">
      <DataTable table={AI_PM_INTERVIEWS.rounds} />
      <p className="text-sm text-slate-600">
        More prompt banks: <ResourceLink id="gil_chaouat_questions" />, <ResourceLink id="kore1_interview_questions" />,{' '}
        <ResourceLink id="prachub_llm_metrics" />.
      </p>
    </Section>
    <Section title="The 35-minute design case">
      <Card><Prose>{DESIGN_CASE_STEPS}</Prose></Card>
    </Section>
    <Section title="Brand and search plan">
      <Card><Bullets items={AI_PM_INTERVIEWS.brand} /></Card>
    </Section>
  </div>
);

export const AiPmReading: React.FC = () => (
  <div className="space-y-10">
    <PageTitle eyebrow="Reading and videos" title="What to read and watch">
      If you have time for only 5 resources, use the core reading.
    </PageTitle>
    <Section title="Core reading">
      <Card>
        <ul className="space-y-2">
          {AI_PM_CORE_READING.map((r) => <li key={r.key}><ResourceLink id={r.key} detail={r.days} /></li>)}
        </ul>
      </Card>
      <h3 className="font-black text-slate-900 pt-2">Also free</h3>
      <Card>
        <ul className="space-y-2">
          {AI_PM_FREE_READING.map((r) => <li key={r.key}><ResourceLink id={r.key} detail={r.days} /></li>)}
        </ul>
      </Card>
    </Section>
    <Section title="Video resources">
      <p className="text-sm text-slate-600">Use each video in the weeks shown.</p>
      <div data-reveal-stagger className="grid md:grid-cols-2 gap-3">
        {AI_PM_VIDEOS.map((v) => (
          <Card key={v.key}>
            <ResourceLink id={v.key} />
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">{v.adds}</p>
            <p className="text-xs font-bold text-slate-400 mt-2">Weeks {v.weeks}</p>
          </Card>
        ))}
      </div>
      <h3 className="font-black text-slate-900 pt-2">Free extras these videos recommend</h3>
      <Card>
        <ul className="space-y-2">
          {AI_PM_VIDEO_EXTRAS.map((r) => <li key={r.key}><ResourceLink id={r.key} detail={r.weeks} /></li>)}
        </ul>
        <p className="text-sm text-slate-600 mt-3">{AI_PM_VIDEO_EXTRAS_NOTE}</p>
      </Card>
    </Section>
    <Section title="Sources">
      {AI_PM_SOURCE_GROUPS.map((g) => (
        <Card key={g.title}>
          <h3 className="font-black text-slate-900 text-sm mb-2">{g.title}</h3>
          <ul className="space-y-1.5">
            {g.keys?.map((k) => <li key={k}><ResourceLink id={k} /></li>)}
            {g.items?.map((t) => <li key={t} className="text-sm text-slate-600">{t}</li>)}
          </ul>
        </Card>
      ))}
    </Section>
  </div>
);
