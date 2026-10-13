import { CompanyBoard } from './companies';

// Weekly discovery: Firecrawl web search finds PM job pages on Ashby, Lever, Greenhouse and Workable.
// We keep only the company board each result belongs to; the daily refresh then reads that board's
// free public feed. So Firecrawl credits are spent on finding companies, not on every job page.

/** The owner's searches, run as written and again with "India" added. */
export const DISCOVERY_QUERIES = [
  'site:jobs.ashbyhq.com ("AI Product Manager" OR "Product Manager" OR "Associate Product Manager")',
  'site:jobs.lever.co ("AI Product Manager" OR "Product Manager" OR "Associate Product Manager")',
  'site:jobs.ashbyhq.com ("AI Product Manager" OR "Product Manager" OR "Associate Product Manager") AND ("remote")',
  'site:boards.greenhouse.io ("AI Product Manager" OR "Product Manager" OR "Associate Product Manager")',
  'site:apply.workable.com ("AI Product Manager" OR "Product Manager" OR "Associate Product Manager")',
];

const RESULTS_PER_QUERY = 30;
/** Boards we stop reading after this many failed refreshes in a row. */
export const MAX_BOARD_FAILURES = 3;
/** Keeps the daily refresh inside the function time limit. */
export const MAX_DISCOVERED_BOARDS = 150;

export interface DiscoveredBoard {
  ats: CompanyBoard['ats'];
  token: string;
  /** Company name read from a search result title, when the feed itself has none (Lever, Ashby). */
  name?: string;
  firstSeenAt: string;
  lastSeenAt: string;
  failures: number;
}

// Paths on these hosts that are not company boards.
const RESERVED_TOKENS = new Set(['embed', 'j', 'api', 'jobs', 'careers', 'search', 'signin', 'login']);

/** Turns a job page URL into the company board it belongs to, or null. */
export function parseBoardUrl(rawUrl: string): Pick<DiscoveredBoard, 'ats' | 'token'> | null {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }
  const host = url.hostname.toLowerCase();
  const parts = url.pathname.split('/').filter(Boolean);
  let ats: CompanyBoard['ats'] | null = null;
  let token: string | undefined = parts[0];

  if (host === 'boards.greenhouse.io' || host === 'job-boards.greenhouse.io' || host === 'job-boards.eu.greenhouse.io') {
    ats = 'greenhouse';
    if (token === 'embed') token = url.searchParams.get('for') || undefined;
  } else if (host === 'jobs.lever.co') {
    ats = 'lever';
  } else if (host === 'jobs.ashbyhq.com') {
    ats = 'ashby';
  } else if (host === 'apply.workable.com') {
    ats = 'workable';
  }
  if (!ats || !token) return null;
  token = decodeURIComponent(token).toLowerCase();
  if (RESERVED_TOKENS.has(token) || !/^[a-z0-9][a-z0-9._-]{0,80}$/.test(token)) return null;
  return { ats, token };
}

/** "HighLevel - Principal PM - Lever" -> "HighLevel"; "Product Manager @ Acme" -> "Acme". */
export function companyFromTitle(ats: CompanyBoard['ats'], title?: string): string | undefined {
  if (!title) return undefined;
  const t = title.replace(/\s+/g, ' ').trim();
  const m = ats === 'lever' ? t.match(/^(.{2,60}?) - (?:.* - )?Lever$/) : ats === 'ashby' ? t.match(/ @ (.{2,60})$/) : null;
  const name = m?.[1].trim();
  // "Principal Product Manager - Lever" is a job title, not a company.
  return name && !/\b(product|manager|engineer|director|lead|head|senior|associate|intern)\b/i.test(name) ? name : undefined;
}

export function humanizeToken(token: string): string {
  return token
    .replace(/[-_.]+/g, ' ')
    .replace(/\b(inc|llc|ltd|pvt|private|limited|\d+)\b/gi, '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()) || token;
}

export function toCompanyBoards(found: DiscoveredBoard[]): CompanyBoard[] {
  return found
    .filter((b) => b.failures < MAX_BOARD_FAILURES)
    .sort((a, b) => b.lastSeenAt.localeCompare(a.lastSeenAt))
    .slice(0, MAX_DISCOVERED_BOARDS)
    .map((b) => ({ name: b.name || humanizeToken(b.token), ats: b.ats, token: b.token, global: true, discovered: true }));
}

export interface DiscoveryRun {
  queries: Array<{ query: string; results: number; error?: string }>;
  boards: Array<Pick<DiscoveredBoard, 'ats' | 'token' | 'name'>>;
}

/** Runs every search through Firecrawl and returns the distinct boards found. */
export async function searchForBoards(apiKey: string): Promise<DiscoveryRun> {
  const Firecrawl = (await import('@mendable/firecrawl-js')).default;
  const firecrawl = new Firecrawl({ apiKey });
  const queries = DISCOVERY_QUERIES.flatMap((q) => [q, `${q} India`]);

  const results = await Promise.all(
    queries.map(async (query) => {
      try {
        const data: any = await firecrawl.search(query, { limit: RESULTS_PER_QUERY, highlights: false } as any);
        const hits: Array<{ url: string; title?: string }> = (data?.web || [])
          .map((r: any) => ({ url: r?.url || r?.metadata?.sourceURL, title: r?.title || r?.metadata?.title }))
          .filter((r: any) => r.url);
        return { query, hits };
      } catch (err: any) {
        return { query, hits: [] as Array<{ url: string; title?: string }>, error: String(err?.message || err).slice(0, 200) };
      }
    })
  );

  const seen = new Map<string, Pick<DiscoveredBoard, 'ats' | 'token' | 'name'>>();
  for (const r of results) {
    for (const hit of r.hits) {
      const board = parseBoardUrl(hit.url);
      if (!board) continue;
      const key = `${board.ats}:${board.token}`;
      const name = seen.get(key)?.name || companyFromTitle(board.ats, hit.title);
      seen.set(key, name ? { ...board, name } : board);
    }
  }
  return {
    queries: results.map((r) => ({ query: r.query, results: r.hits.length, ...(r.error ? { error: r.error } : {}) })),
    boards: Array.from(seen.values()),
  };
}
