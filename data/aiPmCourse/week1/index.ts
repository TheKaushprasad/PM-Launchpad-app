import type { L1Lesson } from '../levelTypes';
import { DAY0_TEXT, DAY1_TEXT, DAY2_TEXT, DAY3_TEXT, DAY4_TEXT, DAY5_TEXT } from './text';
import { DAY0_QUIZ, DAY1_QUIZ, DAY2_QUIZ, DAY3_QUIZ, DAY4_QUIZ, DAY5_QUIZ } from './quizzes';

// Level 1, Week 1: the owner's Day 0 to Day 5 lessons. Minutes = reading time (about 200 words a minute), videos extra.
const readMinutes = (text: string) => Math.max(5, Math.ceil(text.split(/\s+/).length / 200 / 5) * 5);

const lesson = (day: number, title: string, body: string, quiz: L1Lesson['quiz']): L1Lesson => ({
  id: `1.${day}`, day, title, body, quiz, minutes: readMinutes(body),
});

export const WEEK1_LESSONS: L1Lesson[] = [
  lesson(0, 'What Is AI Product Management?', DAY0_TEXT, DAY0_QUIZ),
  lesson(1, 'What is AI?', DAY1_TEXT, DAY1_QUIZ),
  lesson(2, 'What is Machine Learning and Deep Learning?', DAY2_TEXT, DAY2_QUIZ),
  lesson(3, 'What Is a Large Language Model (LLM)?', DAY3_TEXT, DAY3_QUIZ),
  lesson(4, 'How Large Language Models and Transformers Work', DAY4_TEXT, DAY4_QUIZ),
  lesson(5, 'What Is a Prompt and Prompt Engineering?', DAY5_TEXT, DAY5_QUIZ),
];
