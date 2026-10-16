// Page titles, descriptions and canonical URLs for search engines.
// Used at runtime (components/SeoMeta.tsx) and at build time (scripts/prerender.tsx),
// so the HTML Google downloads and the page a visitor sees always agree.
import { LESSONS, MODULES } from '../constants';
import { REAL_WORLD_PROJECTS } from '../data/realWorldProjects';
import { allQuestionPaths, findQuestion, questionsForTrack, trackBySlug, trackFor } from './interviewQuestions';

export const SITE_URL = 'https://www.thenoobpm.com';
export const SITE_NAME = 'The NooB PM';

export interface RouteMeta {
  title: string;
  description: string;
  // Path search engines should treat as the original (duplicates point at it).
  canonicalPath: string;
  noindex?: boolean;
}

const HOME_TITLE = 'Free Product Management Course for Beginners in India | The NooB PM';
const HOME_DESCRIPTION =
  'Free 45-day product management course for freshers and career switchers in India. Learn PM step by step, build real-world PM projects, and prepare for product manager interviews.';

const withBrand = (title: string) => `${title} | ${SITE_NAME}`;

const clip = (text: string, max = 160) => {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
};

// Lesson titles are written "Day 3: Topic" (and "Day-0: Topic").
export const lessonTopic = (title: string) => title.replace(/^Day[-\s]?\d+:\s*/, '');

const PRIVATE_PATHS = ['/profile', '/onboarding', '/auth/action', '/tools/profile'];

const STATIC: Record<string, Omit<RouteMeta, 'canonicalPath'>> = {
  '/': { title: HOME_TITLE, description: HOME_DESCRIPTION },
  '/dashboard': {
    title: withBrand('Product Management Course: 45-Day Roadmap for Beginners'),
    description:
      'A free, structured 45-day product management course: foundations, user research, strategy, data, tech, design, AI and interview prep. Days 0 to 7 need no sign-up.',
  },
  '/dashboard/about': {
    title: withBrand('About the Free Product Management Course'),
    description: 'Who The NooB PM is for, how the 45-day product management course works, and how to get the most out of it.',
  },
  '/projects': {
    title: withBrand('Real-World Product Management Projects for Your Portfolio'),
    description:
      'Practise product management on realistic case studies: retention, activation, North Star metrics, PRDs, market entry and post-mortems. Get AI feedback on your answer.',
  },
  '/jobs': {
    title: withBrand('Product Manager Jobs and PM Internships in India'),
    description: 'Fresh product manager, APM and PM internship openings in India, updated daily. Only roles posted in the last 7 days.',
  },
  '/resources': {
    title: withBrand('Free Product Management Resources, Casebooks and Interview Questions'),
    description:
      'Curated PM certifications, B-school casebooks, company-wise PM interview questions and take-home assignments for aspiring product managers.',
  },
  '/interview-questions': {
    title: withBrand('Product Manager Interview Questions with Answers'),
    description:
      'Free PM interview questions with sample answers: guesstimates, root cause analysis, product design, metrics, strategy, behavioral and AI product questions.',
  },
  '/tools': {
    title: withBrand('Free AI Career Tools for Aspiring Product Managers'),
    description: 'Free AI tools for PM job seekers: resume checker for product manager roles and LinkedIn profile optimiser.',
  },
  '/tools/resume-auditor': {
    title: withBrand('Free AI Resume Checker for Product Manager Roles'),
    description: 'Upload your resume and get instant AI feedback on how well it fits product manager and APM roles, with specific fixes.',
  },
  '/tools/linkedin-optimiser': {
    title: withBrand('Free AI LinkedIn Profile Optimiser for Product Managers'),
    description: 'Rewrite your LinkedIn headline, about section and experience for product manager roles with AI suggestions.',
  },
  '/tools/interview-studio': {
    title: withBrand('AI Mock Interview for Product Managers'),
    description: 'Practise product manager interviews out loud with an AI interviewer and get scored feedback.',
  },
};

const ALIASES: Record<string, string> = {
  '/resume-auditor': '/tools/resume-auditor',
  '/interview-studio': '/tools/interview-studio',
  '/practice': '/tools/interview-studio',
  '/tools/practice': '/tools/interview-studio',
  '/modules': '/dashboard',
  '/linkedin': '/tools/linkedin-optimiser',
};

export function getRouteMeta(rawPath: string): RouteMeta {
  const path = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;

  if (PRIVATE_PATHS.some((p) => path === p || path.startsWith(`${p}/`))) {
    return { title: SITE_NAME, description: HOME_DESCRIPTION, canonicalPath: path, noindex: true };
  }

  const alias = ALIASES[path];
  if (alias) return { ...getRouteMeta(alias), canonicalPath: alias };

  const fixed = STATIC[path];
  if (fixed) return { canonicalPath: path, ...fixed };

  const day = path.match(/^\/dashboard\/day\/(\d+)$/);
  if (day) {
    const lesson = LESSONS.find((l) => l.day === Number(day[1]));
    if (lesson) {
      return {
        title: withBrand(`Day ${lesson.day}: ${lessonTopic(lesson.title)}`),
        description: clip(`${lesson.preview} Day ${lesson.day} of a free 45-day product management course.`),
        canonicalPath: path,
      };
    }
  }

  const module = path.match(/^\/dashboard\/([a-z]+)$/);
  if (module) {
    const info = MODULES.find((m) => m.id === module[1]);
    if (info) {
      return {
        title: withBrand(`${info.title} for Product Managers: Free Lessons`),
        description: clip(`${info.description} Part of a free 45-day product management course for beginners.`),
        canonicalPath: path,
      };
    }
  }

  const qTrack = path.match(/^\/interview-questions\/([\w-]+)$/);
  const track = qTrack && trackBySlug(qTrack[1]);
  if (track) {
    return {
      title: withBrand(track.heading),
      description: clip(`${questionsForTrack(track.track).length} ${track.label.toLowerCase()} questions with sample answers. ${track.intro}`),
      canonicalPath: path,
    };
  }

  const qDetail = path.match(/^\/interview-questions\/([\w-]+)\/([\w-]+)$/);
  const question = qDetail && findQuestion(qDetail[1], qDetail[2]);
  if (question) {
    const t = trackFor(question.track);
    return {
      title: withBrand(`${question.title}: ${t.label} Interview Question and Answer`),
      description: clip(`${question.problemStatement} Framework, clarifying questions and a sample answer.`),
      canonicalPath: path,
    };
  }

  const project = path.match(/^\/projects\/([\w-]+)$/);
  if (project) {
    const p = REAL_WORLD_PROJECTS.find((x) => x.id === project[1]);
    if (p) {
      return {
        title: withBrand(`${p.title}: PM Case Study Project`),
        description: clip(`${p.summary} A real-world product management project for your portfolio.`),
        canonicalPath: path,
      };
    }
  }

  return { title: HOME_TITLE, description: HOME_DESCRIPTION, canonicalPath: '/' };
}

// Every page we want search engines to find, in sitemap order.
export function indexablePaths(): string[] {
  return [
    '/',
    '/dashboard',
    ...LESSONS.map((l) => l.day).sort((a, b) => a - b).map((d) => `/dashboard/day/${d}`),
    ...MODULES.map((m) => `/dashboard/${m.id}`),
    '/dashboard/about',
    '/projects',
    ...REAL_WORLD_PROJECTS.map((p) => `/projects/${p.id}`),
    ...allQuestionPaths(),
    '/jobs',
    '/resources',
    '/tools',
    '/tools/resume-auditor',
    '/tools/linkedin-optimiser',
  ];
}
