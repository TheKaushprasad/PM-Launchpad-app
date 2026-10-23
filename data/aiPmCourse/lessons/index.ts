import type { AiPmLesson } from './types';
import { PHASE1_LESSONS } from './phase1';

// Written lessons for Days 5–90, by day. Each phase lives in its own file.
export const AI_PM_LESSON_DATA: Record<number, AiPmLesson> = {
  ...PHASE1_LESSONS,
};
