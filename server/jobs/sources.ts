import { JobDetail, JobSourceStatus, JobSourceType } from '../../types/jobs';
import { COMPANY_BOARDS, CompanyBoard } from './companies';
import { fetchSearchSite, SEARCH_SITES } from './searchSites';
import {
  classifyLevel,
  detectCities,
  detectWorkMode,
  htmlToText,
  isPmTitle,
  mentionsIndia,
  parseExperience,
  remoteOpenToIndia,
  safeDocId,
  shortHash,
  toIsoDate,
} from './normalize';

const MAX_DESCRIPTION_CHARS = 15000;
/** SmartRecruiters needs one request per job for its description. */
const MAX_DETAIL_FETCHES = 10;
const FETCH_TIMEOUT_MS = 12000;
const USER_AGENT = 'TheNoobPM-JobsBot/1.0 (+https://thenoobpm.com)';

/** One raw job before the India / PM filters run. */
export interface RawJob {
  source: JobSourceType;
  sourceLabel: string;
  sourceId: string;
  company: string;
  title: string;
  locationText: string;
  workModeHint?: string;
  postedAt?: string;
  url: string;
  descriptionHtml?: string;
  descriptionText?: string;
  /** For an Indian company an empty location means India. */
  assumeIndia?: boolean;
  /** Added by hand (Google Sheet), so the PM and India filters are skipped. */
  manual?: boolean;
  expText?: string;
}

export interface SourceResult {
  status: JobSourceStatus;
  jobs: JobDetail[];
}

export interface JobSource {
  key: string;
  label: string;
  run: () => Promise<RawJob[]>;
}

async function fetchText(url: string, accept: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { Accept: accept, 'User-Agent': USER_AGENT }, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err: any) {
    if (err?.name === 'AbortError') throw new Error('timed out');
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJson(url: string): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json', 'User-Agent': USER_AGENT },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err: any) {
    if (err?.name === 'AbortError') throw new Error('timed out');
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// ---------- Company job boards ----------

async function fetchGreenhouse(c: CompanyBoard): Promise<RawJob[]> {
  const data = await fetchJson(`https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(c.token)}/jobs?content=true`);
  const jobs: any[] = Array.isArray(data?.jobs) ? data.jobs : [];
  return jobs.map((j) => ({
    source: 'greenhouse',
    sourceLabel: c.name,
    sourceId: `${c.token}-${j.id}`,
    company: c.discovered && j.company_name ? String(j.company_name) : c.name,
    title: String(j.title || ''),
    locationText: String(j.location?.name || ''),
    postedAt: toIsoDate(j.first_published || j.updated_at),
    url: String(j.absolute_url || ''),
    descriptionHtml: String(j.content || ''),
    assumeIndia: !c.global,
  }));
}

async function fetchLever(c: CompanyBoard): Promise<RawJob[]> {
  const data = await fetchJson(`https://api.lever.co/v0/postings/${encodeURIComponent(c.token)}?mode=json`);
  const jobs: any[] = Array.isArray(data) ? data : [];
  return jobs.map((j) => {
    const lists = Array.isArray(j.lists)
      ? j.lists.map((l: any) => `<h3>${l.text || ''}</h3><ul>${l.content || ''}</ul>`).join('')
      : '';
    const locations: string[] = Array.isArray(j.categories?.allLocations) && j.categories.allLocations.length
      ? j.categories.allLocations
      : [j.categories?.location].filter(Boolean);
    return {
      source: 'lever',
      sourceLabel: c.name,
      sourceId: `${c.token}-${j.id}`,
      company: c.name,
      title: String(j.text || ''),
      locationText: locations.join('; ') + (j.country ? `, ${j.country === 'IN' ? 'India' : j.country}` : ''),
      workModeHint: j.workplaceType,
      postedAt: toIsoDate(j.createdAt),
      url: String(j.hostedUrl || ''),
      descriptionHtml: `${j.description || ''}${lists}${j.additional || ''}`,
      assumeIndia: !c.global,
    } as RawJob;
  });
}

async function fetchAshby(c: CompanyBoard): Promise<RawJob[]> {
  const data = await fetchJson(`https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(c.token)}`);
  const jobs: any[] = Array.isArray(data?.jobs) ? data.jobs : [];
  return jobs
    .filter((j) => j.isListed !== false)
    .map((j) => {
      const addr = j.address?.postalAddress || {};
      const secondary = Array.isArray(j.secondaryLocations) ? j.secondaryLocations.map((s: any) => s.location).filter(Boolean) : [];
      const locationText = [j.location, ...secondary, addr.addressLocality, addr.addressCountry].filter(Boolean).join('; ');
      return {
        source: 'ashby',
        sourceLabel: c.name,
        sourceId: `${c.token}-${j.id}`,
        company: c.name,
        title: String(j.title || ''),
        locationText,
        workModeHint: `${j.workplaceType || ''} ${j.isRemote ? 'remote' : ''}`,
        postedAt: toIsoDate(j.publishedAt),
        url: String(j.jobUrl || ''),
        descriptionText: String(j.descriptionPlain || ''),
        descriptionHtml: j.descriptionPlain ? undefined : String(j.descriptionHtml || ''),
        assumeIndia: !c.global,
      } as RawJob;
    });
}

async function fetchWorkable(c: CompanyBoard): Promise<RawJob[]> {
  const data = await fetchJson(`https://apply.workable.com/api/v1/widget/accounts/${encodeURIComponent(c.token)}?details=true`);
  const jobs: any[] = Array.isArray(data?.jobs) ? data.jobs : [];
  const company = c.discovered && data?.name ? String(data.name) : c.name;
  return jobs.map((j) => {
    const places = Array.isArray(j.locations) && j.locations.length
      ? j.locations.filter((l: any) => !l.hidden).map((l: any) => [l.city, l.region, l.country].filter(Boolean).join(', '))
      : [[j.city, j.state, j.country].filter(Boolean).join(', ')];
    return {
      source: 'workable',
      sourceLabel: company,
      sourceId: `${c.token}-${j.shortcode}`,
      company,
      title: String(j.title || ''),
      locationText: places.filter(Boolean).join('; '),
      workModeHint: j.telecommuting ? 'remote' : '',
      postedAt: toIsoDate(j.published_on || j.created_at),
      url: String(j.url || j.shortlink || ''),
      descriptionHtml: String(j.description || ''),
      assumeIndia: !c.global,
    } as RawJob;
  });
}

async function fetchSmartRecruiters(c: CompanyBoard): Promise<RawJob[]> {
  const base = `https://api.smartrecruiters.com/v1/companies/${encodeURIComponent(c.token)}/postings`;
  // The list has no descriptions; the "product" search keeps it short, and isPmTitle does the real filtering.
  const data = await fetchJson(`${base}?q=product&limit=100`);
  const postings: any[] = (Array.isArray(data?.content) ? data.content : []).filter((j: any) => isPmTitle(String(j?.name || '')));
  const company = c.discovered && postings[0]?.company?.name ? String(postings[0].company.name) : c.name;
  // One extra request per PM posting for its description, capped so a big employer can't stall the refresh.
  return mapWithConcurrency(postings.slice(0, MAX_DETAIL_FETCHES), 4, async (j) => {
    let descriptionHtml = '';
    let url = `https://jobs.smartrecruiters.com/${encodeURIComponent(j.company?.identifier || c.token)}/${j.id}`;
    try {
      const detail = await fetchJson(`${base}/${encodeURIComponent(j.id)}`);
      const sections = detail?.jobAd?.sections || {};
      descriptionHtml = ['companyDescription', 'jobDescription', 'qualifications', 'additionalInformation']
        .map((k) => sections[k]?.text || '')
        .join('');
      if (detail?.postingUrl) url = String(detail.postingUrl);
    } catch {
      // Keep the posting without a description.
    }
    const loc = j.location || {};
    return {
      source: 'smartrecruiters',
      sourceLabel: company,
      sourceId: `${c.token.toLowerCase()}-${j.id}`,
      company,
      title: String(j.name || ''),
      locationText: String(loc.fullLocation || [loc.city, loc.country === 'in' ? 'India' : loc.country].filter(Boolean).join(', ')),
      workModeHint: loc.remote ? 'remote' : loc.hybrid ? 'hybrid' : '',
      postedAt: toIsoDate(j.releasedDate),
      url,
      descriptionHtml,
      assumeIndia: !c.global,
    } as RawJob;
  });
}

async function fetchRecruitee(c: CompanyBoard): Promise<RawJob[]> {
  const data = await fetchJson(`https://${encodeURIComponent(c.token)}.recruitee.com/api/offers/`);
  const jobs: any[] = Array.isArray(data?.offers) ? data.offers.filter((j: any) => !j.status || j.status === 'published') : [];
  return jobs.map((j) => {
    const company = c.discovered && j.company_name ? String(j.company_name) : c.name;
    const places = Array.isArray(j.locations) && j.locations.length
      ? j.locations.map((l: any) => [l.city, l.country].filter(Boolean).join(', ') || l.name)
      : [[j.city, j.country].filter(Boolean).join(', ')];
    return {
      source: 'recruitee',
      sourceLabel: company,
      sourceId: `${c.token}-${j.id}`,
      company,
      title: String(j.title || ''),
      locationText: places.filter(Boolean).join('; '),
      workModeHint: j.remote ? 'remote' : j.hybrid ? 'hybrid' : '',
      postedAt: toIsoDate(String(j.published_at || j.created_at || '').replace(' UTC', 'Z').replace(' ', 'T')),
      url: String(j.careers_url || `https://${c.token}.recruitee.com/o/${j.slug}`),
      descriptionHtml: `${j.description || ''}${j.requirements || ''}`,
      assumeIndia: !c.global,
    } as RawJob;
  });
}

async function fetchBreezy(c: CompanyBoard): Promise<RawJob[]> {
  // Breezy's public feed has no descriptions, so these jobs show title, place and link only.
  const data = await fetchJson(`https://${encodeURIComponent(c.token)}.breezy.hr/json`);
  const jobs: any[] = Array.isArray(data) ? data : [];
  return jobs.map((j) => {
    const company = c.discovered && j.company?.name ? String(j.company.name) : c.name;
    const places: any[] = Array.isArray(j.locations) && j.locations.length ? j.locations : [j.location].filter(Boolean);
    return {
      source: 'breezy',
      sourceLabel: company,
      sourceId: `${c.token}-${j.id}`,
      company,
      title: String(j.name || ''),
      locationText: places.map((l) => [l.name, l.country?.name].filter(Boolean).join(', ')).join('; '),
      workModeHint: places.some((l) => l.is_remote) ? 'remote' : '',
      postedAt: toIsoDate(j.published_date),
      url: String(j.url || ''),
      descriptionText: '',
      assumeIndia: !c.global,
    } as RawJob;
  });
}

// ---------- Remote job APIs and feeds (each asks for a credited link back, shown on the Jobs page) ----------

async function fetchRemotive(): Promise<RawJob[]> {
  // Remotive asks callers to fetch at most a few times a day; we fetch once.
  const data = await fetchJson('https://remotive.com/api/remote-jobs?category=product');
  const jobs: any[] = Array.isArray(data?.jobs) ? data.jobs : [];
  return jobs.map((j) => ({
    source: 'remotive',
    sourceLabel: 'Remotive',
    sourceId: String(j.id),
    company: String(j.company_name || ''),
    title: String(j.title || ''),
    locationText: `Remote${j.candidate_required_location ? `, ${j.candidate_required_location}` : ''}`,
    workModeHint: 'remote',
    postedAt: toIsoDate(j.publication_date),
    url: String(j.url || ''),
    descriptionHtml: String(j.description || ''),
  }));
}

async function fetchRemoteOk(): Promise<RawJob[]> {
  const data = await fetchJson('https://remoteok.com/api?tag=product');
  // The first element is RemoteOK's legal notice, not a job.
  const jobs: any[] = Array.isArray(data) ? data.filter((j) => j && j.id && j.position) : [];
  return jobs.map((j) => ({
    source: 'remoteok',
    sourceLabel: 'Remote OK',
    sourceId: String(j.id),
    company: String(j.company || ''),
    title: String(j.position || ''),
    locationText: `Remote${j.location ? `, ${j.location}` : ''}`,
    workModeHint: 'remote',
    postedAt: toIsoDate(j.date || j.epoch),
    url: String(j.url || j.apply_url || ''),
    descriptionHtml: String(j.description || ''),
  }));
}

/** Pulls <tag>text</tag> out of one RSS item, unwrapping CDATA. */
function rssTag(item: string, tag: string): string {
  const m = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return (m?.[1] || '').replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1').trim();
}

/** We Work Remotely's product category RSS. Item titles read "Company: Role". */
export function parseWeWorkRemotelyRss(xml: string): RawJob[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];
  return items.map((item) => {
    const full = htmlToText(rssTag(item, 'title'));
    const cut = full.indexOf(': ');
    const link = htmlToText(rssTag(item, 'link'));
    // <region> is often "Anywhere in the World" even when <country> narrows it, so country wins.
    const country = htmlToText(rssTag(item, 'country')).replace(/[\u{1F1E6}-\u{1F1FF}]/gu, '').replace(/\s+/g, ' ').trim();
    const region = htmlToText(rssTag(item, 'region'));
    return {
      source: 'weworkremotely',
      sourceLabel: 'We Work Remotely',
      sourceId: shortHash(link),
      company: cut > 0 ? full.slice(0, cut) : '',
      title: cut > 0 ? full.slice(cut + 2) : full,
      locationText: `Remote${country || region ? `, ${country || region}` : ''}`,
      workModeHint: 'remote',
      postedAt: toIsoDate(rssTag(item, 'pubDate')),
      url: link,
      descriptionHtml: rssTag(item, 'description'),
    } as RawJob;
  }).filter((j) => j.url);
}

async function fetchWeWorkRemotely(): Promise<RawJob[]> {
  return parseWeWorkRemotelyRss(await fetchText('https://weworkremotely.com/categories/remote-product-jobs.rss', 'application/rss+xml'));
}

// Himalayas API terms: link Apply to applicationLink unchanged, credit Himalayas, drop expired jobs,
// and never pass the jobs on (no JobPosting structured data for them).
const HIMALAYAS_PAGES = 3;

export function parseHimalayasJobs(data: any, nowMs = Date.now()): RawJob[] {
  const jobs: any[] = Array.isArray(data?.jobs) ? data.jobs : [];
  return jobs
    .filter((j) => !j.expiryDate || Number(j.expiryDate) * 1000 > nowMs)
    .map((j) => {
      const places: string[] = Array.isArray(j.locationRestrictions) ? j.locationRestrictions.map(String) : [];
      return {
        source: 'himalayas',
        sourceLabel: 'Himalayas',
        sourceId: shortHash(String(j.guid || j.applicationLink || '')),
        company: String(j.companyName || ''),
        title: String(j.title || ''),
        // No restriction means open worldwide.
        locationText: `Remote${places.length ? `, ${places.join('; ')}` : ''}`,
        workModeHint: 'remote',
        postedAt: toIsoDate(Number(j.pubDate) || j.pubDate),
        url: String(j.applicationLink || j.guid || ''),
        descriptionText: String(j.description || j.excerpt || ''),
      } as RawJob;
    });
}

async function fetchHimalayas(): Promise<RawJob[]> {
  // country=India also returns worldwide roles, which is what someone in India can apply to.
  const pages = await Promise.all(
    Array.from({ length: HIMALAYAS_PAGES }, (_, i) =>
      fetchJson(`https://himalayas.app/jobs/api/search?q=${encodeURIComponent('product manager')}&country=India&sort=recent&page=${i + 1}`)
    )
  );
  return pages.flatMap((p) => parseHimalayasJobs(p));
}

async function fetchWorkingNomads(): Promise<RawJob[]> {
  const data = await fetchJson('https://www.workingnomads.com/api/exposed_jobs/');
  const jobs: any[] = Array.isArray(data) ? data : [];
  return jobs.map((j) => ({
    source: 'workingnomads',
    sourceLabel: 'Working Nomads',
    sourceId: shortHash(String(j.url || '')),
    company: String(j.company_name || ''),
    title: String(j.title || ''),
    locationText: `Remote${j.location ? `, ${j.location}` : ''}`,
    workModeHint: 'remote',
    postedAt: toIsoDate(j.pub_date),
    url: String(j.url || ''),
    descriptionHtml: String(j.description || ''),
  }));
}

// ---------- Google Sheet (jobs the owner adds by hand) ----------

/** Accepts a normal share link or a "Publish to web" CSV link and returns a CSV download link. */
export function sheetCsvUrl(link: string): string {
  const url = new URL(link.trim());
  if (url.pathname.includes('/d/e/')) {
    // Published to the web: .../pub?output=csv (or ?output=html, which we switch to csv).
    url.pathname = url.pathname.replace(/\/pub(html)?$/, '/pub');
    url.searchParams.set('output', 'csv');
    return url.toString();
  }
  const id = url.pathname.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)?.[1];
  if (!id) throw new Error('JOBS_SHEET_URL is not a Google Sheets link');
  const gid = url.searchParams.get('gid') || url.hash.match(/gid=(\d+)/)?.[1];
  return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv${gid ? `&gid=${gid}` : ''}`;
}

/** Minimal CSV parser: quoted fields, escaped quotes and line breaks inside quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field); rows.push(row); row = []; field = '';
    } else field += ch;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim()));
}

/** "13/10/2026" (day first) or "10/13/2026" (US sheets, month first), or anything Date understands. */
export function sheetDate(value: string): string | undefined {
  const m = value.trim().match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (!m) return toIsoDate(value);
  const iso = (month: string, day: string) => {
    const mm = Number(month);
    const dd = Number(day);
    if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return undefined;
    const date = toIsoDate(`${m[3]}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00Z`);
    // A posted date can't be in the future, so that reading is the wrong way round.
    return date && Date.parse(date) <= Date.now() + 86400000 ? date : undefined;
  };
  return iso(m[2], m[1]) || iso(m[1], m[2]);
}

// Header names in the sheet (case and spacing don't matter).
const SHEET_COLUMNS = {
  title: ['title', 'job title', 'role'],
  company: ['company'],
  location: ['location', 'city'],
  workMode: ['work mode', 'mode'],
  experience: ['experience', 'experience (years)', 'exp'],
  url: ['apply link', 'link', 'url', 'apply url'],
  postedAt: ['posted date', 'posted', 'date'],
  description: ['description', 'notes', 'jd'],
};

async function fetchSheet(): Promise<RawJob[]> {
  const rows = parseCsv(await fetchText(sheetCsvUrl(process.env.JOBS_SHEET_URL || ''), 'text/csv'));
  if (!rows.length) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, ' '));
  const col = (names: string[]) => header.findIndex((h) => names.includes(h));
  const idx = Object.fromEntries(Object.entries(SHEET_COLUMNS).map(([k, names]) => [k, col(names)])) as Record<keyof typeof SHEET_COLUMNS, number>;
  if (idx.title < 0 || idx.url < 0) throw new Error('sheet needs "Title" and "Apply link" columns');
  const cell = (r: string[], i: number) => (i >= 0 ? (r[i] || '').trim() : '');
  return rows.slice(1).map((r) => {
    const url = cell(r, idx.url);
    const location = cell(r, idx.location);
    return {
      source: 'sheet',
      sourceLabel: cell(r, idx.company) || 'TheNoobPM',
      sourceId: shortHash(url, cell(r, idx.title)),
      company: cell(r, idx.company),
      title: cell(r, idx.title),
      locationText: location,
      workModeHint: cell(r, idx.workMode),
      postedAt: sheetDate(cell(r, idx.postedAt)),
      url,
      descriptionText: cell(r, idx.description),
      expText: cell(r, idx.experience),
      manual: true,
    } as RawJob;
  }).filter((j) => /^https?:\/\//i.test(j.url));
}

// ---------- Internshala (owner's Firecrawl search, run daily) ----------

const INTERNSHALA_QUERY = 'site:internshala.com/internship/detail "Product Management"';

const titleCase = (t: string) => t.replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Reads one search result. Internship pages look like
 *   internshala.com/internship/detail/product-management-internship-in-hyderabad-at-vela1791462433
 *   internshala.com/internship/detail/work-from-home-product-management-internship-at-whatbytes1791393727
 * The trailing number is when the internship was posted (Unix seconds).
 */
export function parseInternshalaResult(url: string, title = ''): RawJob | null {
  const slug = url.match(/internshala\.com\/internship\/detail\/([a-z0-9-]+?)(\d{9,11})\/?(?:[?#]|$)/i);
  if (!slug) return null;
  const [, body, stamp] = slug;
  const remote = /^(part-time-)?work-from-home-/.test(body);
  const rest = body.replace(/^(part-time-)?(work-from-home-)?(part-time-)?/, '');
  const m = rest.match(/^(.+?)-internship-(?:in-(.+?)-)?at-(.+?)-?$/);
  if (!m) return null;
  const role = titleCase(m[1].replace(/-/g, ' '));
  const city = m[2] && m[2] !== 'multiple-locations' ? titleCase(m[2].replace(/-/g, ' ')) : '';
  // The page title has the company's real spelling, unless the search engine cut it short.
  const fromTitle = title.match(/ at (.+?)(?: - Internshala)?$/)?.[1]?.trim();
  const company = fromTitle && !fromTitle.includes('...') ? fromTitle : titleCase(m[3].replace(/-/g, ' '));
  return {
    source: 'internshala',
    sourceLabel: 'Internshala',
    sourceId: stamp + '-' + shortHash(body),
    company,
    title: `${role} Internship`,
    locationText: remote ? 'Remote, India' : `${city || 'India'}, India`,
    workModeHint: remote ? 'remote' : '',
    postedAt: toIsoDate(Number(stamp)),
    url: url.split(/[?#]/)[0],
    descriptionText: '',
  };
}

async function fetchInternshala(): Promise<RawJob[]> {
  const Firecrawl = (await import('@mendable/firecrawl-js')).default;
  const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY!.trim() });
  // tbs=qdr:w: pages from the past week only, which matches the 7-day limit on the Jobs page.
  const data: any = await firecrawl.search(INTERNSHALA_QUERY, { limit: 30, tbs: 'qdr:w' } as any);
  const hits: any[] = data?.web || [];
  return hits
    .map((r) => parseInternshalaResult(String(r?.url || ''), String(r?.title || '')))
    .filter((j): j is RawJob => j !== null);
}

export function boardKey(c: Pick<CompanyBoard, 'ats' | 'token'>): string {
  return `${c.ats}:${c.token.toLowerCase()}`;
}

/** The fixed company list, plus boards found by the weekly Firecrawl discovery (see discovery.ts). */
export function getJobSources(discovered: CompanyBoard[] = []): JobSource[] {
  const fetchers = {
    greenhouse: fetchGreenhouse,
    lever: fetchLever,
    ashby: fetchAshby,
    workable: fetchWorkable,
    smartrecruiters: fetchSmartRecruiters,
    recruitee: fetchRecruitee,
    breezy: fetchBreezy,
  };
  const known = new Set(COMPANY_BOARDS.map(boardKey));
  const boards = [...COMPANY_BOARDS, ...discovered.filter((d) => !known.has(boardKey(d)))];
  return [
    ...boards.map((c) => ({
      key: boardKey(c),
      label: c.name,
      run: () => fetchers[c.ats](c),
    })),
    { key: 'remotive', label: 'Remotive', run: fetchRemotive },
    { key: 'remoteok', label: 'Remote OK', run: fetchRemoteOk },
    { key: 'weworkremotely', label: 'We Work Remotely', run: fetchWeWorkRemotely },
    { key: 'himalayas', label: 'Himalayas', run: fetchHimalayas },
    { key: 'workingnomads', label: 'Working Nomads', run: fetchWorkingNomads },
    ...(process.env.JOBS_SHEET_URL?.trim() ? [{ key: 'sheet', label: 'Google Sheet', run: fetchSheet }] : []),
    ...(process.env.FIRECRAWL_API_KEY?.trim()
      ? [
          { key: 'internshala', label: 'Internshala', run: fetchInternshala },
          ...SEARCH_SITES.map((site) => ({ key: site.key, label: site.label, run: () => fetchSearchSite(site) })),
        ]
      : []),
  ];
}

// ---------- Filtering + normalising ----------

/** Returns a normalised job, or null when it is not a PM role in India / open to India. */
export function normalizeRawJob(raw: RawJob, nowIso: string): JobDetail | null {
  const title = raw.title.replace(/\s+/g, ' ').trim();
  if (!title || !raw.url || (!raw.manual && !isPmTitle(title))) return null;

  const workMode = detectWorkMode(raw.workModeHint, raw.locationText, title);
  const inIndia = mentionsIndia(raw.locationText) || (raw.assumeIndia && !raw.locationText.trim());
  if (!raw.manual && !inIndia && !(workMode === 'Remote' && remoteOpenToIndia(raw.locationText.replace(/^remote[,;\s]*/i, '')))) {
    return null;
  }

  const description = (raw.descriptionText || htmlToText(raw.descriptionHtml || '')).slice(0, MAX_DESCRIPTION_CHARS);
  // A bare "2-5" in the sheet's Experience column means years.
  const expText = raw.expText && /^\d/.test(raw.expText) && !/y(ea)?rs?/i.test(raw.expText) ? `${raw.expText} years` : raw.expText;
  const { expMin, expMax } = parseExperience(expText || `${title}\n${description}`);
  const cities = detectCities(raw.locationText);

  const job: JobDetail = {
    id: safeDocId(`${raw.source}-${raw.sourceId}`),
    title,
    company: raw.company.trim() || 'Unknown company',
    level: classifyLevel(title),
    cities,
    locationText: raw.locationText.trim() || (raw.assumeIndia ? 'India' : 'Remote'),
    workMode,
    postedAt: raw.postedAt || nowIso,
    firstSeenAt: nowIso,
    url: raw.url,
    source: raw.source,
    sourceLabel: raw.sourceLabel,
    sk: '',
    h: shortHash(title, raw.locationText, description),
    description,
  };
  if (expMin !== undefined) job.expMin = expMin;
  if (expMax !== undefined) job.expMax = expMax;
  return job;
}

export async function runSource(source: JobSource, nowIso: string): Promise<SourceResult> {
  try {
    const raw = await source.run();
    const jobs = raw.map((r) => normalizeRawJob(r, nowIso)).filter((j): j is JobDetail => j !== null);
    jobs.forEach((j) => (j.sk = source.key));
    return { status: { key: source.key, label: source.label, ok: true, count: jobs.length }, jobs };
  } catch (err: any) {
    return {
      status: { key: source.key, label: source.label, ok: false, count: 0, error: String(err?.message || err).slice(0, 200) },
      jobs: [],
    };
  }
}

/** Runs async work with at most `limit` tasks in flight. */
export async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  });
  await Promise.all(workers);
  return results;
}
