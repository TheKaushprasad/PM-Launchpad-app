// Shared between the server (job refresh + /api/jobs) and the Jobs page.

export const JOB_LEVELS = [
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

export type JobSourceType = 'greenhouse' | 'lever' | 'ashby' | 'remotive' | 'remoteok';

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
