// Shared between the server (job refresh + /api/jobs) and the Jobs page.

export const JOB_LEVELS = [
  'Intern',
  'APM',
  'Product Associate',
  'Product Manager',
  'Senior PM',
  'Lead / Principal PM',
  'Group PM',
  'Director',
  'VP / Head of Product',
  'CPO',
  'Product Owner',
] as const;

export type JobLevel = (typeof JOB_LEVELS)[number];

export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';

export type JobSourceType =
  | 'greenhouse'
  | 'lever'
  | 'ashby'
  | 'workable'
  | 'smartrecruiters'
  | 'recruitee'
  | 'breezy'
  | 'remotive'
  | 'remoteok'
  | 'weworkremotely'
  | 'himalayas'
  | 'workingnomads'
  | 'sheet'
  | 'internshala'
  | 'hirist'
  | 'iimjobs'
  | 'foundit'
  | 'cutshort';

/** Jobs from these come via a job board or aggregator, so Apply names the board, not the employer. */
export const JOB_BOARD_SOURCES: ReadonlySet<JobSourceType> = new Set<JobSourceType>([
  'remotive',
  'remoteok',
  'weworkremotely',
  'himalayas',
  'workingnomads',
  'internshala',
  'hirist',
  'iimjobs',
  'foundit',
  'cutshort',
]);

/** Light record used for the list and filters. */
export interface JobSummary {
  id: string;
  title: string;
  company: string;
  level: JobLevel;
  /** Normalised Indian cities, e.g. ["Bengaluru"]. Empty for remote-only roles. */
  cities: string[];
  locationText: string;
  workMode: WorkMode;
  expMin?: number;
  expMax?: number;
  /** ISO date the employer published the role (falls back to first time we saw it). */
  postedAt: string;
  firstSeenAt: string;
  url: string;
  source: JobSourceType;
  sourceLabel: string;
  /** Which feed it came from (e.g. "lever:cred"), so a failed feed keeps yesterday's jobs. */
  sk: string;
  /** Short hash of title + description, used to skip rewriting unchanged jobs. */
  h: string;
}

export interface JobDetail extends JobSummary {
  description: string;
}

export interface JobSourceStatus {
  key: string;
  label: string;
  ok: boolean;
  count: number;
  error?: string;
}

export interface JobsListResponse {
  refreshedAt: string | null;
  jobs: JobSummary[];
  sources: JobSourceStatus[];
}

/** Saved on users/{uid}.jobPreferences */
export interface JobPreferences {
  levels: JobLevel[];
  location: string; // 'all' | 'remote' | city name
  workModes: WorkMode[];
  experience: string; // 'any' | '0-2' | '2-5' | '5-8' | '8+'
}

/**
 * Company names made from a board's web address read like "Kraken Com" or "Acme Careers".
 * Drops those trailing words; real names such as "Weekday AI" are left alone.
 */
export function tidyCompanyName(name: string): string {
  const tidy = name.replace(/\s+/g, ' ').trim().replace(/(\s+(com|io|hq|careers|jobs))+$/i, '').trim();
  return tidy || name.trim();
}

/** Feeds often repeat a place ("India; India; India"). Keeps each place once, comma separated. */
export function tidyLocation(text: string): string {
  const seen = new Set<string>();
  const parts: string[] = [];
  for (const raw of text.split(/[;,|]/)) {
    const part = raw.replace(/\s+/g, ' ').trim();
    if (part && !seen.has(part.toLowerCase())) {
      seen.add(part.toLowerCase());
      parts.push(part);
    }
  }
  return parts.join(', ');
}
