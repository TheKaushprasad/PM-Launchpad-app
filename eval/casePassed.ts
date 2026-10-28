import { ThresholdCaseResult } from './thresholds';

/** A case passes when it ran and every expectation and judge criterion held. */
export function casePassed(r: ThresholdCaseResult): boolean {
  if (r.status === 'error' || r.judgeError) return false;
  if (r.judgeRequired && !r.judge) return false;
  if (r.expectation?.failures.length) return false;
  return !(r.judge?.criteriaResults.some((cr) => !cr.pass) ?? false);
}
