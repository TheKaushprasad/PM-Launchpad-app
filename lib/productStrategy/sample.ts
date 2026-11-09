import type { StrategyInputs } from './types';

// "Use example" on the form (FR-05): a made-up product so a new user can try the tool in one click.
export const SAMPLE_INPUTS: StrategyInputs = {
  productName: 'SkillSetu',
  oneLiner: 'A mobile app that teaches spoken English to first-job seekers in tier-2 Indian cities through 10-minute daily practice.',
  stage: 'MVP',
  industry: 'EdTech',
  industryOther: '',
  businessModel: 'B2C',
  geographies: ['India'],
  targetUsers: 'Graduates aged 20 to 25 in tier-2 and tier-3 cities who are preparing for their first job interview, mostly studying in Hindi or a regional language and using low-cost Android phones.',
  problem: 'They lose jobs and confidence in interviews because they cannot speak English fluently, and coaching centres are expensive, far away and fixed to timings that clash with their day.',
  alternatives: 'YouTube videos, local spoken-English coaching centres, Duolingo, practising with friends.',
  competitors: ['Duolingo', 'Josh Talks', 'Cambly'],
  goal: 'Reach a paying base that proves people will pay for daily speaking practice, so the company can raise a seed round.',
  horizon: '1 year',
  constraints: 'Team of 4, ₹15 lakh runway, no in-house speech AI team, users have patchy 4G.',
  metrics: '6k sign-ups from a pilot, 18% D7 retention, 2% pay for the ₹199 monthly plan.',
  styleId: 'ST-01',
  detail: 'concise',
  tone: 'Interview-ready',
  extras: ['assumptions', 'okrs'],
};
