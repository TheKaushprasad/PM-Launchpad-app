import type { RawJob } from './sources';
import { detectCities, shortHash, toIsoDate } from './normalize';

// Indian job sites read through Firecrawl web search, the same way as Internshala.
// kaushal chose this on 2026-10-30: we only read search-engine results (title, link, snippet) and never
// fetch pages from these sites, because their terms ban bots. Naukri and Wellfound stay out entirely.
// Each search costs Firecrawl credits, so each site runs once a day with a small result limit.

const RESULTS_PER_SITE = 20;

export interface SearchSite {
  key: string;
  label: string;
  query: string;
  parse: (url: string, title: string, snippet: string, nowMs?: number) => RawJob | null;
}

/** Search snippets start with "3 days ago · ..." or "20 hours ago · ...". */
export function postedFromSnippet(snippet: string, nowMs = Date.now()): string | undefined {
  const t = snippet.trim().toLowerCase();
  if (/^(just now|today)\b/.test(t)) return toIsoDate(nowMs);
  if (/^yesterday\b/.test(t)) return toIsoDate(nowMs - 86400000);
  const m = t.match(/^(\d{1,3}|an?)\s+(minute|hour|day|week)s?\s+ago\b/);
  if (!m) return undefined;
  const n = /^\d/.test(m[1]) ? Number(m[1]) : 1;
  const unit = { minute: 60000, hour: 3600000, day: 86400000, week: 604800000 }[m[2] as 'minute' | 'hour' | 'day' | 'week'];
  return toIsoDate(nowMs - n * unit);
}

const cleanUrl = (url: string) => url.split(/[?#]/)[0];

function indiaLocation(text: string): { locationText: string; workModeHint: string } {
  const remote = /\bremote\b/i.test(text);
  const cities = detectCities(text);
  return {
    locationText: remote ? 'Remote, India' : cities.length ? `${cities.join(', ')}, India` : 'India',
    workModeHint: remote ? 'remote' : '',
  };
}

function job(site: Pick<SearchSite, 'key' | 'label'>, fields: Omit<RawJob, 'source' | 'sourceLabel' | 'descriptionText'>): RawJob {
  return { source: site.key as RawJob['source'], sourceLabel: site.label, descriptionText: '', ...fields };
}

/**
 * hirist.tech and iimjobs.com share one layout:
 *   url   hirist.tech/j/flipspaces-product-manager-1681031
 *   title "Flipspaces - Product Manager | hirist.tech"  or  "Product Manager - AI/ML Marketplace | hirist.tech"
 *   text  "2 days ago · Job Description for Flipspaces - Product Manager in Flipspaces in Mumbai for (3-8) years ..."
 */
function hiristLike(key: 'hirist' | 'iimjobs', label: string): SearchSite['parse'] {
  return (url, title, snippet, nowMs) => {
    const id = url.match(/\/j\/[a-z0-9-]+-(\d{5,})(?:[/?#]|$)/i)?.[1];
    if (!id) return null;
    let role = title.replace(/\s*[|-]\s*(hirist\.tech|iimjobs\.com|iim jobs)\s*$/i, '').trim();
    let company = '';
    let city = '';
    let expText: string | undefined;
    const jd = snippet.match(/Job Description for (.+?) in (.+?) in (.+?) for \((\d+\s*-\s*\d+)\) years/i);
    if (jd) {
      company = jd[2].trim();
      role = jd[1].trim();
      city = jd[3];
      expText = `${jd[4]} years`;
    }
    // "Company - Role": the part before the dash is the company unless it is already a job title.
    const dash = role.indexOf(' - ');
    if (dash > 0) {
      const head = role.slice(0, dash).trim();
      if (!company && !/\b(product|manager|owner|lead|head|director|associate|intern)\b/i.test(head)) company = head;
      if (company && head.toLowerCase() === company.toLowerCase()) role = role.slice(dash + 3).trim();
    }
    return job({ key, label }, {
      sourceId: id,
      company,
      title: role,
      ...indiaLocation(city || ''),
      postedAt: postedFromSnippet(snippet, nowMs),
      url: cleanUrl(url),
      expText,
      assumeIndia: true,
    });
  };
}

/**
 *   url   foundit.in/job/product-manager-ii-paylocity-bengaluru-bangalore-69466153
 *   title "Product Manager II with 5 - 7 Years of Experience at Paylocity in ..."
 *   text  "Posted ... Microsoft Corp is hiring an Product Manager II with 3 - 5 Years of Experience in Hyderabad ..."
 */
const parseFoundit: SearchSite['parse'] = (url, title, snippet, nowMs) => {
  const m = url.match(/foundit\.in\/job\/([a-z0-9-]+?)-(\d{5,})(?:[/?#]|$)/i);
  if (!m || /position closed/i.test(title)) return null;
  const [, slug, id] = m;
  const t = title.replace(/\s*-\s*foundit\s*$/i, '').trim();
  let role = t.split(/\s+with\s+\d/)[0].replace(/\s*\|.*$/, '').trim();
  const exp = t.match(/with (\d+)\s*-\s*(\d+) Years/i);
  // The snippet has the full company name; titles are often cut short ("at Blob ...").
  const fromTitle = t.match(/ Years of Experience at (.+?)(?: in .*)?$/i)?.[1] || (!/\swith\s\d/.test(t) ? t.match(/ - ([^-]+)$/)?.[1] : '');
  const company =
    snippet.match(/(?:^|·|\.)\s*(?:Posted [\d:]+ [AP]M )?([A-Z][^·.]{1,60}?) is hiring an? /)?.[1] ||
    (fromTitle && !fromTitle.includes('...') ? fromTitle : '') ||
    '';
  if (company && role.endsWith(` - ${company}`)) role = role.slice(0, -company.length - 3).trim();
  return job({ key: 'foundit', label: 'Foundit' }, {
    sourceId: id,
    company: company.trim(),
    title: role,
    ...indiaLocation(slug.replace(/-/g, ' ')),
    postedAt: postedFromSnippet(snippet, nowMs),
    url: cleanUrl(url),
    expText: exp ? `${exp[1]}-${exp[2]} years` : undefined,
    assumeIndia: true,
  });
};

/**
 *   url   cutshort.io/job/Product-Intern-Generative-AI-Multimodal-Products-Alpha-ebfOrSE7
 *   title "Qoruz is hiring Junior UX Designer job in Bengaluru (Bangalore) - Cutshort"
 *      or "Product Intern — Generative AI & Multimodal Products - Cutshort"
 */
const parseCutshort: SearchSite['parse'] = (url, title, snippet, nowMs) => {
  const m = url.match(/cutshort\.io\/job\/([A-Za-z0-9-]+)-([A-Za-z0-9]{6,})(?:[/?#]|$)/);
  if (!m) return null;
  const t = title.replace(/\s*-\s*Cutshort\s*$/i, '').trim();
  const hiring = t.match(/^(.+?) is hiring (.+?) job in (.+)$/i);
  const at = t.match(/^(.+?) - at (.+)$/i);
  const company = hiring?.[1] || at?.[2] || '';
  const role = hiring?.[2] || at?.[1] || t;
  return job({ key: 'cutshort', label: 'Cutshort' }, {
    sourceId: m[2],
    company: company.trim(),
    title: role.trim(),
    ...indiaLocation(hiring?.[3] || m[1].replace(/-/g, ' ')),
    postedAt: postedFromSnippet(snippet, nowMs),
    url: cleanUrl(url),
    assumeIndia: true,
  });
};

const PM_TERMS = '("Product Manager" OR "Associate Product Manager" OR "Product Owner")';

export const SEARCH_SITES: SearchSite[] = [
  { key: 'hirist', label: 'Hirist', query: `site:hirist.tech ${PM_TERMS}`, parse: hiristLike('hirist', 'Hirist') },
  { key: 'iimjobs', label: 'iimjobs', query: `site:iimjobs.com ${PM_TERMS}`, parse: hiristLike('iimjobs', 'iimjobs') },
  { key: 'foundit', label: 'Foundit', query: `site:foundit.in ${PM_TERMS}`, parse: parseFoundit },
  { key: 'cutshort', label: 'Cutshort', query: `site:cutshort.io ${PM_TERMS}`, parse: parseCutshort },
];

export async function fetchSearchSite(site: SearchSite): Promise<RawJob[]> {
  const Firecrawl = (await import('@mendable/firecrawl-js')).default;
  const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY!.trim() });
  // tbs=qdr:w: pages from the past week only, which matches the 7-day limit on the Jobs page.
  // highlights off keeps the original snippet, which starts with "3 days ago".
  const data: any = await firecrawl.search(site.query, { limit: RESULTS_PER_SITE, tbs: 'qdr:w', highlights: false } as any);
  const hits: any[] = data?.web || [];
  const seen = new Set<string>();
  return hits
    .map((r) => site.parse(String(r?.url || ''), String(r?.title || ''), String(r?.description || '')))
    .filter((j): j is RawJob => j !== null && !seen.has(j.sourceId) && !!seen.add(j.sourceId));
}
