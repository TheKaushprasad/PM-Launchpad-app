import React from 'react';
import { AiPmDay1Content, AI_PM_DAY1_TOPICS } from '../../content/aiPm/day-1';
import { AiPmDay2Content, AI_PM_DAY2_TOPICS } from '../../content/aiPm/day-2';
import { AiPmDay3Content, AI_PM_DAY3_TOPICS } from '../../content/aiPm/day-3';
import { Day29Content } from '../../content/days/day-29';
import { Day30Content } from '../../content/days/day-30';

// Full written lessons for the PM → AI PM course, by day. Days without one show the short Learn summary
// from data/aiPmCourse/plan.ts. Days 15 and 17 reuse Days 29 and 30 of the 45-day course.
export const AI_PM_LESSONS: Record<number, React.FC> = {
  1: AiPmDay1Content,
  2: AiPmDay2Content,
  3: AiPmDay3Content,
  15: Day29Content,
  17: Day30Content,
};

// Sections of a lesson, listed under "Topics to cover" on the day page. Each id is a <section id> in the lesson.
export const AI_PM_LESSON_TOPICS: Record<number, { id: string; label: string }[]> = {
  1: AI_PM_DAY1_TOPICS,
  2: AI_PM_DAY2_TOPICS,
  3: AI_PM_DAY3_TOPICS,
};
