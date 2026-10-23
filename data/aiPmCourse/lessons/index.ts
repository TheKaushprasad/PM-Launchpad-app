import type { AiPmLesson } from './types';
import { PHASE1_LESSONS } from './phase1';
import { PHASE2_LESSONS } from './phase2';
import { PHASE3_LESSONS } from './phase3';
import { PHASE4_LESSONS } from './phase4';
import { PHASE5_LESSONS } from './phase5';
import { PHASE6_LESSONS } from './phase6';
import { PHASE7_LESSONS } from './phase7';

// Written lessons for Days 5–90, by day. Each phase lives in its own file.
export const AI_PM_LESSON_DATA: Record<number, AiPmLesson> = {
  ...PHASE1_LESSONS,
  ...PHASE2_LESSONS,
  ...PHASE3_LESSONS,
  ...PHASE4_LESSONS,
  ...PHASE5_LESSONS,
  ...PHASE6_LESSONS,
  ...PHASE7_LESSONS,
};
