import React from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Clock, HelpCircle, Lightbulb, ListChecks, MessagesSquare, Target } from 'lucide-react';
import { InterviewScenario } from '../../types/interview';
import {
  QUESTION_TRACKS,
  findQuestion,
  questionPath,
  questionsForTrack,
  trackBySlug,
  trackFor,
} from '../../lib/interviewQuestions';
import { isAiInterviewEnabled } from '../../lib/featureFlags';

const DIFFICULTY_STYLES: Record<InterviewScenario['difficulty'], string> = {
  Easy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Hard: 'bg-rose-50 text-rose-700 border-rose-200',
};

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 pb-20"
  >
    {children}
  </motion.div>
);

const Hero: React.FC<{ title: string; intro: string; crumbs?: React.ReactNode }> = ({ title, intro, crumbs }) => (
  <header className="relative w-full bg-gradient-to-r from-[#032A1F] via-[#043C2C] to-[#064E3B] rounded-3xl p-7 sm:p-9 text-white overflow-hidden shadow-2xl border border-[#065F46]/60 mb-7">
    <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-gradient-to-bl from-brand-600/25 via-brand-600/15 to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/4 translate-x-1/4" aria-hidden="true" />
    <div className="relative z-10 max-w-3xl">
      {crumbs}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight leading-[1.1]">{title}</h1>
      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{intro}</p>
    </div>
  </header>
);

const Crumbs: React.FC<{ items: { to?: string; label: string }[] }> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs font-semibold text-slate-300 mb-3">
    {items.map((item, i) => (
      <React.Fragment key={item.label}>
        {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
        {item.to ? (
          <Link to={item.to} className="hover:text-white transition-colors">
            {item.label}
          </Link>
        ) : (
          <span className="text-slate-400">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

const QuestionRow: React.FC<{ q: InterviewScenario }> = ({ q }) => (
  <li>
    <Link
      to={questionPath(q)}
      className="group flex items-start justify-between gap-3 p-4 bg-white rounded-2xl border border-zinc-200/80 hover:border-brand-300 hover:shadow-md transition-all"
    >
      <div className="min-w-0">
        <p className="font-bold text-zinc-900 leading-snug group-hover:text-brand-700">{q.title}</p>
        <p className="text-xs text-zinc-500 mt-1">{q.company}</p>
      </div>
      <span className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-full border ${DIFFICULTY_STYLES[q.difficulty]}`}>{q.difficulty}</span>
    </Link>
  </li>
);

export const InterviewQuestionsHub: React.FC = () => (
  <Page>
    <Hero
      title="Product Manager Interview Questions with Answers"
      intro="Real PM interview questions grouped by type, each with a framework, the clarifying questions to ask, a step-by-step approach and a sample answer. Free, no sign-up needed."
    />
    <div data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {QUESTION_TRACKS.map((t) => {
        const count = questionsForTrack(t.track).length;
        return (
          <Link
            key={t.slug}
            to={`/interview-questions/${t.slug}`}
            className="group p-5 bg-white rounded-2xl border border-zinc-200/80 hover:border-brand-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <h2 className="text-lg font-extrabold text-zinc-900 group-hover:text-brand-700">{t.label}</h2>
              <span className="text-xs font-bold text-zinc-500">{count} questions</span>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed">{t.intro}</p>
            <span className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-brand-700">
              See questions <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        );
      })}
    </div>
  </Page>
);

export const InterviewQuestionsTrack: React.FC = () => {
  const { trackSlug = '' } = useParams();
  const track = trackBySlug(trackSlug);
  if (!track) return <Navigate to="/interview-questions" replace />;
  const questions = questionsForTrack(track.track);

  return (
    <Page>
      <Hero
        title={track.heading}
        intro={track.intro}
        crumbs={<Crumbs items={[{ to: '/interview-questions', label: 'Interview Questions' }, { label: track.label }]} />}
      />
      <ul data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {questions.map((q) => (
          <QuestionRow key={q.id} q={q} />
        ))}
      </ul>
    </Page>
  );
};

const Section: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
  <section data-reveal className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 space-y-3">
    <h2 className="flex items-center gap-2 text-lg font-extrabold text-zinc-900">
      <Icon className="w-5 h-5 text-brand-600" />
      {title}
    </h2>
    {children}
  </section>
);

const Bullets: React.FC<{ items: string[]; ordered?: boolean }> = ({ items, ordered }) => {
  const List = ordered ? 'ol' : 'ul';
  return (
    <List className={`space-y-2 text-sm sm:text-[15px] text-zinc-700 leading-relaxed ${ordered ? 'list-decimal pl-5' : ''}`}>
      {items.map((item) =>
        ordered ? (
          <li key={item}>{item}</li>
        ) : (
          <li key={item} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ),
      )}
    </List>
  );
};

export const InterviewQuestionDetail: React.FC = () => {
  const { trackSlug = '', questionSlug = '' } = useParams();
  const q = findQuestion(trackSlug, questionSlug);
  if (!q) return <Navigate to={trackBySlug(trackSlug) ? `/interview-questions/${trackSlug}` : '/interview-questions'} replace />;

  const track = trackFor(q.track);
  const siblings = questionsForTrack(q.track);
  const index = siblings.findIndex((s) => s.id === q.id);
  const more = [...siblings.slice(index + 1), ...siblings.slice(0, index)].slice(0, 6);
  const outline = q.benchmarkOutline;

  return (
    <Page>
      <Hero
        title={q.title}
        intro={q.problemStatement}
        crumbs={
          <Crumbs
            items={[
              { to: '/interview-questions', label: 'Interview Questions' },
              { to: `/interview-questions/${track.slug}`, label: track.label },
            ]}
          />
        }
      />

      <div className="flex flex-wrap items-center gap-2 -mt-3 mb-6">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">{q.company}</span>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${DIFFICULTY_STYLES[q.difficulty]}`}>{q.difficulty}</span>
        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
          <Clock className="w-3.5 h-3.5" /> {q.targetDurationMinutes} min
        </span>
      </div>

      <div className="space-y-4">
        {q.contextBackground && (
          <Section icon={Lightbulb} title="Context">
            <p className="text-sm sm:text-[15px] text-zinc-700 leading-relaxed">{q.contextBackground}</p>
          </Section>
        )}

        <Section icon={HelpCircle} title="Clarifying questions to ask first">
          <Bullets items={outline.clarificationQuestions} />
        </Section>

        <Section icon={ListChecks} title="How to approach it">
          <Bullets items={q.candidateBrief} ordered />
          <div className="mt-2 p-4 rounded-xl bg-brand-50/70 border border-brand-100">
            <p className="text-[11px] font-black uppercase tracking-widest text-brand-700 mb-1">Framework</p>
            <p className="text-sm sm:text-[15px] font-medium text-brand-900 leading-relaxed">{q.suggestedFramework}</p>
          </div>
        </Section>

        <Section icon={MessagesSquare} title="Sample answer">
          {outline.coreHypothesesOrSegments.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-zinc-900 mb-2">Key segments and hypotheses</h3>
              <Bullets items={outline.coreHypothesesOrSegments} />
            </div>
          )}
          {outline.analyticalPath.length > 0 && (
            <div className="pt-2">
              <h3 className="text-sm font-bold text-zinc-900 mb-2">Step by step</h3>
              <Bullets items={outline.analyticalPath} ordered />
            </div>
          )}
          <div className="mt-2 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
            <p className="text-[11px] font-black uppercase tracking-widest text-zinc-500 mb-1">How to close</p>
            <p className="text-sm sm:text-[15px] font-medium text-zinc-800 leading-relaxed">{outline.synthesisModel}</p>
          </div>
        </Section>

        <Section icon={Target} title="What interviewers look for">
          <Bullets items={q.keyEvaluationMetrics} />
        </Section>

        <div className="rounded-2xl bg-[#043C2C] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-extrabold text-lg">
              {isAiInterviewEnabled ? 'Practise this question out loud' : 'Learn the frameworks behind these answers'}
            </p>
            <p className="text-sm text-slate-300">
              {isAiInterviewEnabled
                ? 'Answer it to an AI interviewer and get a scored report.'
                : 'Free 45-day product management course for beginners. Days 0 to 7 need no sign-up.'}
            </p>
          </div>
          <Link
            to={isAiInterviewEnabled ? '/interview-studio' : '/dashboard'}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#043C2C] font-bold text-sm hover:bg-brand-50 transition-colors"
          >
            {isAiInterviewEnabled ? 'Start a mock interview' : 'Start the free course'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {more.length > 0 && (
          <section className="pt-4">
            <h2 className="text-lg font-extrabold text-zinc-900 mb-3">More {track.label.toLowerCase()} questions</h2>
            <ul data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {more.map((s) => (
                <QuestionRow key={s.id} q={s} />
              ))}
            </ul>
          </section>
        )}
      </div>
    </Page>
  );
};
