import React from 'react';
import { AiPmDay1Content } from '../../content/aiPm/day-1';

// Full written lessons for the PM → AI PM course, by day. Days without one show the
// short Learn summary from data/aiPmCourse/plan.ts instead.
export const AI_PM_LESSONS: Record<number, React.FC> = {
  1: AiPmDay1Content,
};
