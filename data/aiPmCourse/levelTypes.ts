// Shapes for the two-level AI PM course ("AI PM in 90 Days: Level 1 + Level 2").

export interface AiPmTable {
  headers: string[];
  rows: string[][];
}

export interface QuizQuestion {
  q: string;
  options: { text: string; why: string }[];
  answer: number[]; // indexes of the correct options
  multi?: boolean; // "Select all that apply"
}

// A lesson is either a full article (Week 1, the owner's own text, with a quiz that must be passed)
// or a short plan card (outcomes, topics, example, try it, check question).
export interface L1Lesson {
  id: string; // e.g. "1.2" = week 1, lesson 2
  title: string;
  minutes: number;
  day?: number; // shown as "Day N" for article lessons
  body?: string; // article text, see components/aipm/Article.tsx
  quiz?: QuizQuestion[]; // must be passed to finish the lesson and move on
  outcomes?: string[];
  topics?: string[];
  example?: string; // ShopAssist example
  tryIt?: string; // 10-minute task
  material?: string; // shown as text; "Current PDF module X" refers to the owner's own PDF
  videos?: { id: string; title: string }[];
  check?: string;
  answer?: string;
}

export interface L1Week {
  n: number;
  title: string;
  start: number;
  end: number;
  goal: string;
  lessons: L1Lesson[];
  milestone: { title: string; build: string[]; doneWhen: string[]; submit: string };
}

export interface L2Week {
  n: number;
  title: string;
  start: number;
  end: number;
  goal: string;
  lectures: { id: string; title: string; minutes: number }[];
  milestone: string;
}
