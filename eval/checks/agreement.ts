import { HumanLabel } from '../types';

export const MIN_LABELED_CASES = 10;

export interface LabeledResult {
  caseId: string;
  modelScore: number;
  modelVerdict: string;
  humanLabels: HumanLabel[];
}

export interface HumanAgreementReport {
  skipped: boolean;
  labeledCases: number;
  pctWithinTenOverall: number;
  verdictAgreementPct: number;
  spearmanCorrelation: number;
}

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

/** Average ranks (1-based), with ties sharing their mean rank. */
function ranks(xs: number[]): number[] {
  const order = xs.map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v);
  const out = new Array<number>(xs.length);
  for (let i = 0; i < order.length; ) {
    let j = i;
    while (j + 1 < order.length && order[j + 1].v === order[i].v) j++;
    const r = (i + j) / 2 + 1;
    for (let k = i; k <= j; k++) out[order[k].i] = r;
    i = j + 1;
  }
  return out;
}

export function spearman(a: number[], b: number[]): number {
  if (a.length < 2) return 0;
  const ra = ranks(a);
  const rb = ranks(b);
  const ma = mean(ra);
  const mb = mean(rb);
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < ra.length; i++) {
    num += (ra[i] - ma) * (rb[i] - mb);
    da += (ra[i] - ma) ** 2;
    db += (rb[i] - mb) ** 2;
  }
  return da === 0 || db === 0 ? 0 : num / Math.sqrt(da * db);
}

/**
 * Compares the evaluator with human raters. Each case's human score is the
 * mean of its raters, and its human verdict the most common one. Skipped
 * until at least MIN_LABELED_CASES completed cases carry labels.
 */
export function computeHumanAgreement(results: LabeledResult[]): HumanAgreementReport {
  const labeled = results.filter((r) => r.humanLabels.length > 0);
  if (labeled.length < MIN_LABELED_CASES) {
    return { skipped: true, labeledCases: labeled.length, pctWithinTenOverall: 0, verdictAgreementPct: 0, spearmanCorrelation: 0 };
  }

  const humanScores = labeled.map((r) => mean(r.humanLabels.map((l) => l.overallScore)));
  const modelScores = labeled.map((r) => r.modelScore);

  const within = labeled.filter((_, i) => Math.abs(modelScores[i] - humanScores[i]) <= 10).length;

  const verdictMatches = labeled.filter((r) => {
    const counts: Record<string, number> = {};
    r.humanLabels.forEach((l) => (counts[l.verdict] = (counts[l.verdict] ?? 0) + 1));
    const top = Math.max(...Object.values(counts));
    const majority = Object.keys(counts).filter((v) => counts[v] === top);
    return majority.includes(r.modelVerdict);
  }).length;

  return {
    skipped: false,
    labeledCases: labeled.length,
    pctWithinTenOverall: (within / labeled.length) * 100,
    verdictAgreementPct: (verdictMatches / labeled.length) * 100,
    spearmanCorrelation: spearman(modelScores, humanScores),
  };
}
