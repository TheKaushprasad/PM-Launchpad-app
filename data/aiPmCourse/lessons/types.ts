// Shape of a written lesson for the PM → AI PM course. Days 5–90 are written as data in this folder and drawn by
// content/aiPm/AiPmLesson.tsx; Days 1–4 have hand-built components in content/aiPm/.

export interface LessonCard {
  title: string;
  text: string;
  example?: string; // shown under an "Example" label
  note?: string; // shown under noteLabel, default "PM question"
  noteLabel?: string;
}

export interface LessonPart {
  id: string; // section id, used by "Topics to cover"
  title: string;
  paragraphs?: string[];
  bullets?: { term?: string; text: string }[];
  cards?: LessonCard[];
  cardCols?: 1 | 2 | 3;
  table?: { head: string[]; rows: string[][] };
  callout?: { tone?: 'brand' | 'amber' | 'violet'; label?: string; text: string };
  quote?: string; // a bold pull-quote with a green left border
}

export interface LessonQuestion {
  q: string;
  options?: string[]; // falls back to the quiz-wide options
  answer: number;
  why: string;
}

export interface LessonQuiz {
  title: string;
  options?: string[];
  questions: LessonQuestion[];
}

export interface AiPmLesson {
  objectives: string[];
  intro?: string; // one line linking to the previous day
  parts: LessonPart[];
  quiz: LessonQuiz;
  completion: string[];
  takeaway: string;
}
