import { JobDetail, JobSourceStatus, JobSourceType } from '../../types/jobs';
import { COMPANY_BOARDS, CompanyBoard } from './companies';
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
const FETCH_TIMEOUT_MS = 12000;
const USER_AGENT = 'TheNoobPM-JobsBot/1.0 (+https://thenoobpm.com)';

/** One raw job before the India / PM filters run. */
interface RawJob {
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
    company: c.name,
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

// ---------- Remote job APIs (both ask for a credited link back, shown on the Jobs page) ----------

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

export function getJobSources(): JobSource[] {
  const fetchers = { greenhouse: fetchGreenhouse, lever: fetchLever, ashby: fetchAshby };
  return [
    ...COMPANY_BOARDS.map((c) => ({
      key: `${c.ats}:${c.token}`,
      label: c.name,
      run: () => fetchers[c.ats](c),
    })),
    { key: 'remotive', label: 'Remotive', run: fetchRemotive },
    { key: 'remoteok', label: 'Remote OK', run: fetchRemoteOk },
  ];
}

// ---------- Filtering + normalising ----------

/** Returns a normalised job, or null when it is not a PM role in India / open to India. */
export function normalizeRawJob(raw: RawJob, nowIso: string): JobDetail | null {
  const title = raw.title.replace(/\s+/g, ' ').trim();
  if (!title || !raw.url || !isPmTitle(title)) return null;

  const workMode = detectWorkMode(raw.workModeHint, raw.locationText, title);
  const inIndia = mentionsIndia(raw.locationText) || (raw.assumeIndia && !raw.locationText.trim());
  if (!inIndia && !(workMode === 'Remote' && remoteOpenToIndia(raw.locationText.replace(/^remote[,;\s]*/i, '')))) {
    return null;
  }

  const description = (raw.descriptionText || htmlToText(raw.descriptionHtml || '')).slice(0, MAX_DESCRIPTION_CHARS);
  const { expMin, expMax } = parseExperience(`${title}\n${description}`);
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
