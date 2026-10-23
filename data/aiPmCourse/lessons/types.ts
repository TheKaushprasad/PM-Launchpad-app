// Shape of a written lesson for the PM → AI PM course. Days 5–90 are written as data in this folder and drawn by
// content/aiPm/AiPmLesson.tsx; Days 1–4 have hand-built components in content/aiPm/. The server reads the
// exercise fields and rubric from here to review a learner's answers (POST /api/ai-pm/review-exercise).

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

export interface LessonField {
  key: string;
  label: string;
  placeholder?: string;
  rows?: number; // 1 = single-line input
  choices?: string[]; // renders as pick-one chips instead of a text box
}

export interface LessonExercise {
  title: string;
  intro: string;
  capstone?: boolean; // shows the capstone banner
  example?: { label: string; text: string }[]; // a worked example shown above the form
  fields: LessonField[];
  rubric: string; // what the AI reviewer should look for
  button?: string; // review button label, default "Review my answers"
}

export interface AiPmLesson {
  objectives: string[];
  intro?: string; // one line linking to the previous day
  parts: LessonPart[];
  quiz: LessonQuiz;
  exercise: LessonExercise;
  completion: string[];
  takeaway: string;
}
