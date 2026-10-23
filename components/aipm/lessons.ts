import React from 'react';
import { AiPmDay1Content } from '../../content/aiPm/day-1';
import { Day29Content } from '../../content/days/day-29';
import { Day30Content } from '../../content/days/day-30';

// Full written lessons for the PM → AI PM course, by day. Days without one show the
// short Learn summary from data/aiPmCourse/plan.ts instead. Days 2 and 3 reuse Days 29 and 30
// of the 45-day course.
export const AI_PM_LESSONS: Record<number, React.FC> = {
  1: AiPmDay1Content,
  2: Day29Content,
  3: Day30Content,
};
