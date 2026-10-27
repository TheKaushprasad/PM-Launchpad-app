import React from 'react';
import { AiPmDay1Content, AI_PM_DAY1_TOPICS } from '../../content/aiPm/day-1';
import { AiPmDay2Content, AI_PM_DAY2_TOPICS, AI_PM_DAY2_OBJECTIVE } from '../../content/aiPm/day-2';
import { AiPmDay3Content, AI_PM_DAY3_TOPICS, AI_PM_DAY3_OBJECTIVE } from '../../content/aiPm/day-3';
import { AiPmDay4Content, AI_PM_DAY4_TOPICS, AI_PM_DAY4_OBJECTIVE } from '../../content/aiPm/day-4';
import { AiPmLessonView, lessonTopics } from '../../content/aiPm/AiPmLesson';
import { AI_PM_LESSON_DATA } from '../../data/aiPmCourse/lessons';

// Full written lessons for the PM → AI PM course, by day. Days without one show the short Learn summary
// from data/aiPmCourse/plan.ts. Days 1–4 are hand-built; later days are drawn from data/aiPmCourse/lessons.
const fromData = Object.fromEntries(
  Object.entries(AI_PM_LESSON_DATA).map(([day, lesson]) => {
    const Lesson: React.FC = () => React.createElement(AiPmLessonView, { day: Number(day), lesson });
    return [day, Lesson];
  }),
) as Record<number, React.FC>;

export const AI_PM_LESSONS: Record<number, React.FC> = {
  1: AiPmDay1Content,
  2: AiPmDay2Content,
  3: AiPmDay3Content,
  4: AiPmDay4Content,
  ...fromData,
};

// Sections of a lesson, listed under "Topics to cover" on the day page. Each id is a <section id> in the lesson.
export const AI_PM_LESSON_TOPICS: Record<number, { id: string; label: string }[]> = {
  1: AI_PM_DAY1_TOPICS,
  2: AI_PM_DAY2_TOPICS,
  3: AI_PM_DAY3_TOPICS,
  4: AI_PM_DAY4_TOPICS,
  ...Object.fromEntries(Object.entries(AI_PM_LESSON_DATA).map(([day, lesson]) => [day, lessonTopics(lesson)])),
};

// "Today's objective" box at the top of the day page. Day 1 uses objective in data/aiPmCourse/plan.ts.
export interface AiPmObjective { text?: string; lead?: string; items?: string[] }
export const AI_PM_LESSON_OBJECTIVES: Record<number, AiPmObjective> = {
  2: AI_PM_DAY2_OBJECTIVE,
  3: AI_PM_DAY3_OBJECTIVE,
  4: AI_PM_DAY4_OBJECTIVE,
  ...Object.fromEntries(
    Object.entries(AI_PM_LESSON_DATA).map(([day, lesson]) => [
      day,
      { lead: `${lesson.intro ? `${lesson.intro} ` : ''}By the end of this lesson, you should be able to:`, items: lesson.objectives },
    ]),
  ),
};
