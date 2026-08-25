import { InterviewScenario } from '../types/interview';
import { RCA_SCENARIOS } from './scenarios/rca';
import { GUESSTIMATE_SCENARIOS } from './scenarios/guesstimates';
import { STRATEGY_SCENARIOS } from './scenarios/strategy';
import { DESIGN_SCENARIOS } from './scenarios/design';

export {
  RCA_SCENARIOS,
  GUESSTIMATE_SCENARIOS,
  STRATEGY_SCENARIOS,
  DESIGN_SCENARIOS
};

export const INTERVIEW_SCENARIOS: InterviewScenario[] = [
  ...RCA_SCENARIOS,
  ...GUESSTIMATE_SCENARIOS,
  ...STRATEGY_SCENARIOS,
  ...DESIGN_SCENARIOS
];

