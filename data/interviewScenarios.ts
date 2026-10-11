import { InterviewScenario } from '../types/interview';
import { RCA_SCENARIOS } from './scenarios/rca';
import { GUESSTIMATE_SCENARIOS } from './scenarios/guesstimates';
import { STRATEGY_SCENARIOS } from './scenarios/strategy';
import { DESIGN_SCENARIOS } from './scenarios/design';
import { METRICS_SCENARIOS } from './scenarios/metrics';
import { BEHAVIORAL_SCENARIOS } from './scenarios/behavioral';
import { AI_PRODUCT_SCENARIOS } from './scenarios/aiProduct';

export {
  RCA_SCENARIOS,
  GUESSTIMATE_SCENARIOS,
  STRATEGY_SCENARIOS,
  DESIGN_SCENARIOS,
  METRICS_SCENARIOS,
  BEHAVIORAL_SCENARIOS,
  AI_PRODUCT_SCENARIOS
};

export const INTERVIEW_SCENARIOS: InterviewScenario[] = [
  ...DESIGN_SCENARIOS,
  ...RCA_SCENARIOS,
  ...METRICS_SCENARIOS,
  ...GUESSTIMATE_SCENARIOS,
  ...STRATEGY_SCENARIOS,
  ...BEHAVIORAL_SCENARIOS,
  ...AI_PRODUCT_SCENARIOS
];
