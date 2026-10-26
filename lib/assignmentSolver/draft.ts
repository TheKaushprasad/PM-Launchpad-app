import type { Research, Run } from './types';

// Draft helpers for the PM Assignment Solver: inline source links, the Markdown export, the edit
// ratio (how much of the AI text the user changed), and the run history kept in this browser.

export const formatUsd = (usd: number) => `$${usd.toFixed(usd < 0.1 ? 3 : 2)}`;
export const formatSeconds = (ms: number) =>
  ms < 60000 ? `${Math.round(ms / 1000)}s` : `${Math.floor(ms / 60000)}m ${Math.round((ms % 60000) / 1000)}s`;

/** Turns [S3] citations into links to the fact's first source. Unknown ids are left as they are. */
export function linkCitations(markdown: string, research?: Research): string {
  if (!research) return markdown;
  return markdown.replace(/\[(S\d{1,3})\](?!\()/g, (whole, id) => {
    const fact = research.facts.find((f) => f.id === id);
    const source = fact && research.sources.find((s) => s.id === fact.sourceIds[0]);
    return source ? `[${id}](${source.url})` : whole;
  });
}

/** Makes the [ADD YOUR INSIGHT: ...] placeholders stand out in the rendered draft. */
export const highlightInsightTags = (markdown: string) => markdown.replace(/\[(ADD YOUR INSIGHT[^\]]*)\]/g, '**⟨$1⟩**');

export const countInsightTags = (run: Run) =>
  (run.sections || []).reduce((n, s) => n + (s.markdown.match(/\[ADD YOUR INSIGHT[^\]]*\]/g)?.length || 0), 0);

export function draftMarkdown(run: Run): string {
  const title = `# ${run.brief?.company || run.input.company || 'Company'}: ${run.brief?.role || 'Product Manager'} assignment`;
  const sections = (run.sections || []).map((s) => {
    const item = run.brief?.items.find((i) => i.id === s.itemId);
    return `## ${item ? `${item.id}. ` : ''}${s.title}\n\n${linkCitations(s.markdown, run.research)}`;
  });
  const sources = run.research?.sources.length
    ? `## Sources\n\n${run.research.sources.map((s) => `${s.id}. [${s.title}](${s.url})`).join('\n')}`
    : '';
  return [title, ...sections, sources].filter(Boolean).join('\n\n') + '\n';
}

const words = (text: string) => text.toLowerCase().split(/\s+/).filter(Boolean);

/** Share of words changed between the AI text and the final text (0 to 1), from a word-level LCS. */
export function editRatio(aiText: string, finalText: string): number {
  const a = words(aiText);
  const b = words(finalText);
  if (!a.length && !b.length) return 0;
  // Two rows of the LCS table are enough; sections are a few hundred words.
  let prev = new Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    const cur = new Array(b.length + 1).fill(0);
    for (let j = 1; j <= b.length; j++) cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]);
    prev = cur;
  }
  const kept = prev[b.length];
  return 1 - (2 * kept) / (a.length + b.length);
}

export function runEditRatio(run: Run): number {
  const sections = run.sections || [];
  const total = sections.reduce((n, s) => n + words(s.aiMarkdown).length, 0);
  if (!total) return 0;
  return sections.reduce((sum, s) => sum + editRatio(s.aiMarkdown, s.markdown) * words(s.aiMarkdown).length, 0) / total;
}

// ---------- history (this browser only) ----------

const KEY = 'thenoobpm.assignmentSolver.runs';
const MAX_RUNS = 20;
// Runs older than this are dropped when the history is read (NFR-05).
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export function loadRuns(): Run[] {
  try {
    const runs: Run[] = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(runs) ? runs.filter((r) => r?.id && Date.now() - Date.parse(r.createdAt) < MAX_AGE_MS) : [];
  } catch {
    return [];
  }
}

export function saveRun(run: Run) {
  try {
    const runs = [run, ...loadRuns().filter((r) => r.id !== run.id)].slice(0, MAX_RUNS);
    localStorage.setItem(KEY, JSON.stringify(runs));
  } catch {
    /* storage full or blocked: history is a convenience only */
  }
}

export function deleteRun(id: string) {
  try {
    localStorage.setItem(KEY, JSON.stringify(loadRuns().filter((r) => r.id !== id)));
  } catch {
    /* ignore */
  }
}
