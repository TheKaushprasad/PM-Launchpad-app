import React from 'react';
import { AiPmDay1Content, AI_PM_DAY1_TOPICS } from '../../content/aiPm/day-1';
import { AiPmDay2Content, AI_PM_DAY2_TOPICS } from '../../content/aiPm/day-2';
import { Day30Content } from '../../content/days/day-30';

// Full written lessons for the PM → AI PM course, by day. Days without one show the
// short Learn summary from data/aiPmCourse/plan.ts instead. Day 3 reuses Day 30 of the 45-day
// course (Day 29, the LLM lesson, moves to Day 15 with the v2 plan).
export const AI_PM_LESSONS: Record<number, React.FC> = {
  1: AiPmDay1Content,
  2: AiPmDay2Content,
  3: Day30Content,
};

// Sections of a lesson, listed under "Topics to cover" on the day page. Each id is a <section id> in the lesson.
export const AI_PM_LESSON_TOPICS: Record<number, { id: string; label: string }[]> = {
  1: AI_PM_DAY1_TOPICS,
  2: AI_PM_DAY2_TOPICS,
};
