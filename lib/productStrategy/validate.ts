import { FIELD_RULES, type StrategyInputs } from './types';

// Form rules for each step (FR-01, FR-02). The server checks the same rules again.

export const STEP_FIELDS: (keyof StrategyInputs)[][] = [
  ['productName', 'oneLiner', 'stage', 'industry', 'industryOther', 'businessModel', 'geographies'],
  ['targetUsers', 'problem', 'alternatives', 'competitors'],
  ['goal', 'horizon', 'constraints', 'metrics'],
  ['styleId', 'detail', 'tone', 'extras'],
];

export const STEP_TITLES = ['Product basics', 'Users and problem', 'Business context', 'Style and output'];

const PICKS: Partial<Record<keyof StrategyInputs, string>> = {
  stage: 'Pick a product stage.',
  industry: 'Pick an industry.',
  businessModel: 'Pick a business model.',
  horizon: 'Pick a time horizon.',
  styleId: 'Pick a strategy style.',
};

export function fieldError(inputs: StrategyInputs, field: keyof StrategyInputs): string {
  const rule = FIELD_RULES[field as string];
  if (rule) {
    const len = String(inputs[field] || '').trim().length;
    if (rule.min > 0 && len < rule.min) return len === 0 ? 'This field is required.' : `Enter at least ${rule.min} characters.`;
    if (len > rule.max) return `Keep it under ${rule.max} characters.`;
    return '';
  }
  if (PICKS[field] && !inputs[field]) return PICKS[field]!;
  if (field === 'industryOther' && inputs.industry === 'Other' && inputs.industryOther.trim().length < 2) return 'Type your industry.';
  if (field === 'geographies' && !inputs.geographies.length) return 'Pick at least one region.';
  return '';
}

export function stepErrors(inputs: StrategyInputs, step: number): Partial<Record<keyof StrategyInputs, string>> {
  const out: Partial<Record<keyof StrategyInputs, string>> = {};
  for (const f of STEP_FIELDS[step] || []) {
    const e = fieldError(inputs, f);
    if (e) out[f] = e;
  }
  return out;
}

export const stepValid = (inputs: StrategyInputs, step: number) => Object.keys(stepErrors(inputs, step)).length === 0;
