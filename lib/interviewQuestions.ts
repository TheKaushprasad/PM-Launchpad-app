// Public, indexable PM interview question pages built from the mock-interview scenarios.
// The interviewer-only parts of a scenario (dataPack, curveball) are never shown here,
// so a live mock interview on the same case still has surprises.
import { INTERVIEW_SCENARIOS } from '../data/interviewScenarios';
import { InterviewScenario, InterviewTrack } from '../types/interview';

export interface QuestionTrack {
  track: InterviewTrack;
  slug: string;
  // Short label for chips and breadcrumbs.
  label: string;
  // What people type into Google.
  heading: string;
  intro: string;
}

export const QUESTION_TRACKS: QuestionTrack[] = [
  {
    track: 'guesstimate',
    slug: 'guesstimate',
    label: 'Guesstimate',
    heading: 'Guesstimate Interview Questions with Answers',
    intro: 'Market sizing and estimation questions asked in PM, consulting and analyst interviews, each with a structure, step-by-step maths and a final estimate.',
  },
  {
    track: 'rca',
    slug: 'root-cause-analysis',
    label: 'Root Cause Analysis',
    heading: 'Root Cause Analysis (RCA) Interview Questions for Product Managers',
    intro: 'A metric dropped. Why? Practise RCA cases the way interviewers expect: clarify, segment, form hypotheses and land on the most likely cause.',
  },
  {
    track: 'design',
    slug: 'product-design',
    label: 'Product Design',
    heading: 'Product Design Interview Questions with Sample Answers',
    intro: 'Product sense questions: pick a user, find the pain points, prioritise solutions and define how you would measure success.',
  },
  {
    track: 'metrics',
    slug: 'metrics',
    label: 'Metrics',
    heading: 'Product Metrics Interview Questions with Answers',
    intro: 'Define success, choose a North Star and guardrail metrics, and make trade-off calls like a product manager.',
  },
  {
    track: 'strategy',
    slug: 'product-strategy',
    label: 'Product Strategy',
    heading: 'Product Strategy Interview Questions with Answers',
    intro: 'Market, competition, options and a clear bet with its risks. Strategy cases asked at product companies in India and abroad.',
  },
  {
    track: 'behavioral',
    slug: 'behavioral',
    label: 'Behavioral',
    heading: 'Behavioral Interview Questions for Product Managers',
    intro: 'STAR stories on leadership, conflict, failure and ownership, including Amazon Leadership Principles, with what a strong answer covers.',
  },
  {
    track: 'ai',
    slug: 'ai-product',
    label: 'AI Product',
    heading: 'AI Product Manager Interview Questions',
    intro: 'Design and evaluate AI features: user value, model behaviour, evaluation, risks and cost.',
  },
];

export const questionSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const trackBySlug = (slug: string) => QUESTION_TRACKS.find((t) => t.slug === slug);
export const trackFor = (track: InterviewTrack) => QUESTION_TRACKS.find((t) => t.track === track)!;

const DIFFICULTY_ORDER = { Easy: 0, Medium: 1, Hard: 2 } as const;

export const questionsForTrack = (track: InterviewTrack): InterviewScenario[] =>
  INTERVIEW_SCENARIOS.filter((s) => s.track === track).sort(
    (a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty],
  );

export const findQuestion = (trackSlug: string, slug: string) => {
  const t = trackBySlug(trackSlug);
  if (!t) return undefined;
  return INTERVIEW_SCENARIOS.find((s) => s.track === t.track && questionSlug(s.title) === slug);
};

export const questionPath = (s: InterviewScenario) => `/interview-questions/${trackFor(s.track).slug}/${questionSlug(s.title)}`;

export const allQuestionPaths = () => [
  '/interview-questions',
  ...QUESTION_TRACKS.flatMap((t) => [`/interview-questions/${t.slug}`, ...questionsForTrack(t.track).map(questionPath)]),
];
