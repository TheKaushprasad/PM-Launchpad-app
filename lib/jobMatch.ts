// "Best match" on the Jobs page: a quick fit score between a user's profile and each job.
// Runs in the browser with no AI and nothing sent anywhere. It only uses what the job list carries
// (level, experience range, place, work mode), because the list has no job descriptions.

import type { JobLevel, JobPreferences, JobSummary } from '../types/jobs';

/** The experience choices on the Profile page, reused by the Jobs page's "add your details" box. */
export const PROFILE_EXPERIENCE_OPTIONS = ['0-1 years', '1-3 years', '3-5 years', '5+ years'] as const;

/** Target roles offered on the Jobs page. The first two match the Profile page's list. */
export const MATCH_TARGET_ROLES = ['Associate Product Manager', 'Product Manager', 'Senior Product Manager'] as const;

export interface MatchProfile {
  /** Years of experience as a range, e.g. [1, 3]. */
  years: [number, number];
  /** Where on the level ladder their years put them (see LEVEL_STEP). */
  yearsStep: number;
  /** Where their target role sits on the ladder, if it's a PM role we can place. */
  roleStep: number | null;
  student: boolean;
}

export interface JobMatch {
  score: number;
  /** Short reasons shown on the card, e.g. "Level fits", "Asks 5-8 yrs". */
  reasons: { text: string; good: boolean }[];
}

/** Score below which a job counts as a weak match (it sorts lower, it isn't hidden). */
export const WEAK_MATCH = 40;

// Steps on the PM career ladder. Roles on the same step are the same seniority.
const LEVEL_STEP: Record<JobLevel, number> = {
  Intern: 0,
  APM: 1,
  'Product Associate': 1,
  'Product Manager': 2,
  'Product Owner': 2,
  'Senior PM': 3,
  'Lead / Principal PM': 4,
  'Group PM': 4.5,
  Director: 5,
  'VP / Head of Product': 6,
  CPO: 7,
};

function parseYears(raw: unknown): [number, number] | null {
  if (raw === undefined || raw === null || raw === '') return null;
  if (typeof raw === 'number' && Number.isFinite(raw)) return [raw, raw];
  const text = String(raw);
  const range = text.match(/(\d+)\s*-\s*(\d+)/);
  if (range) return [Number(range[1]), Number(range[2])];
  const plus = text.match(/(\d+)\s*\+/);
  if (plus) return [Number(plus[1]), Number(plus[1]) + 5];
  const single = text.match(/(\d+)/);
  return single ? [Number(single[1]), Number(single[1])] : null;
}

function stepForYears([lo, hi]: [number, number]): number {
  const mid = (lo + Math.min(hi, lo + 3)) / 2;
  if (mid < 1) return 1; // APM; interns fit too (handled below)
  if (mid < 2.5) return 1.5; // APM or PM
  if (mid < 4.5) return 2.5; // PM or Senior PM
  if (mid < 8) return 3.5; // Senior or Lead
  return 4.5;
}

function stepForRole(role: string): number | null {
  const r = role.toLowerCase();
  if (/intern/.test(r)) return 0;
  if (/associate|\bapm\b/.test(r)) return 1;
  if (/senior/.test(r)) return 3;
  if (/lead|principal/.test(r)) return 4;
  if (/director|head|vp|chief|cpo/.test(r)) return 5.5;
  if (/product manager|product owner/.test(r)) return 2;
  return null;
}

/** Profile fields as stored on users/{uid} (both the nested and the older flat names). */
export interface StoredProfile {
  userType?: string;
  experienceYears?: string | number;
  professional?: { yearsOfExperience?: string | number };
  targetRole?: string;
  career?: { targetRole?: string };
}

export function isStudentProfile(p: StoredProfile | null | undefined): boolean {
  return p?.userType === 'student' || p?.userType === 'college_student';
}

/** What the "add your details" box still needs before a match can be worked out. */
export function missingMatchDetails(p: StoredProfile | null | undefined): { experience: boolean; targetRole: boolean } {
  const years = parseYears(p?.professional?.yearsOfExperience ?? p?.experienceYears);
  return {
    experience: !years && !isStudentProfile(p),
    targetRole: !(p?.career?.targetRole || p?.targetRole),
  };
}

/** Returns null while the profile is missing a detail the match needs. */
export function toMatchProfile(p: StoredProfile | null | undefined): MatchProfile | null {
  const missing = missingMatchDetails(p);
  if (missing.experience || missing.targetRole) return null;
  const student = isStudentProfile(p);
  const years = parseYears(p?.professional?.yearsOfExperience ?? p?.experienceYears) || [0, 1];
  // A student who still has a "1-3 years" default from an old form is treated as a fresher.
  const effectiveYears: [number, number] = student ? [0, Math.min(years[1], 1)] : years;
  return {
    years: effectiveYears,
    yearsStep: student ? 0.5 : stepForYears(effectiveYears),
    roleStep: stepForRole(String(p?.career?.targetRole || p?.targetRole || '')),
    student,
  };
}

function levelFit(job: JobSummary, me: MatchProfile): number {
  const step = LEVEL_STEP[job.level] ?? 2;
  if (job.level === 'Intern') return me.student || me.years[1] <= 1 ? 1 : 0;
  const fromYears = Math.abs(step - me.yearsStep);
  if (fromYears <= 0.5) return 1;
  // Aiming one step up or down (their target role) still counts, as long as their years aren't far off.
  if (me.roleStep !== null && step === me.roleStep && fromYears <= 1) return 1;
  if (fromYears <= 1.5) return 0.5;
  return 0;
}

function experienceFit(job: JobSummary, me: MatchProfile): { fit: number; label: string } | null {
  if (job.expMin === undefined) return null;
  const jobMin = job.expMin;
  const jobMax = job.expMax ?? job.expMin + 10;
  const [myMin, myMax] = me.years;
  const label = job.expMax !== undefined ? `${job.expMin}-${job.expMax} yrs` : `${job.expMin}+ yrs`;
  if (myMin <= jobMax && myMax >= jobMin) return { fit: 1, label };
  const gap = myMax < jobMin ? jobMin - myMax : myMin - jobMax;
  return { fit: gap <= 1 ? 0.5 : 0, label };
}

function placeFit(job: JobSummary, prefs: JobPreferences | null): { fit: number; text: string } | null {
  if (!prefs) return null;
  const hasPlace = prefs.location && prefs.location !== 'all';
  const hasModes = prefs.workModes?.length > 0;
  if (!hasPlace && !hasModes) return null;
  let fit = 1;
  let text = 'Location fits';
  if (prefs.location === 'remote' && job.workMode !== 'Remote') {
    fit = 0;
    text = 'Not remote';
  } else if (hasPlace && prefs.location !== 'remote' && job.workMode !== 'Remote' && !job.cities.includes(prefs.location)) {
    fit = 0;
    text = `Not in ${prefs.location}`;
  }
  if (fit && hasModes && !prefs.workModes.includes(job.workMode)) {
    fit = 0;
    text = `${job.workMode} role`;
  }
  return { fit, text };
}

/**
 * Level and experience carry most of the weight; location and work mode count only when the user
 * has saved preferences for them. A job with no experience range is judged on its level alone.
 */
export function scoreJob(job: JobSummary, me: MatchProfile, savedPrefs: JobPreferences | null): JobMatch {
  const reasons: JobMatch['reasons'] = [];
  let points = 0;
  let possible = 0;

  const level = levelFit(job, me);
  points += 40 * level;
  possible += 40;
  reasons.push({ text: level === 1 ? 'Level fits' : level === 0.5 ? 'Level a step off' : 'Different level', good: level === 1 });

  const exp = experienceFit(job, me);
  points += 40 * (exp ? exp.fit : level);
  possible += 40;
  if (exp) reasons.push({ text: exp.fit === 1 ? 'Experience fits' : `Asks ${exp.label}`, good: exp.fit === 1 });

  const place = placeFit(job, savedPrefs);
  if (place) {
    points += 20 * place.fit;
    possible += 20;
    reasons.push({ text: place.text, good: place.fit === 1 });
  }

  return { score: Math.round((points / possible) * 100), reasons };
}

export function matchTone(score: number): string {
  if (score >= 70) return 'bg-emerald-50 text-emerald-800 border-emerald-200';
  if (score >= WEAK_MATCH) return 'bg-amber-50 text-amber-800 border-amber-200';
  return 'bg-slate-100 text-slate-600 border-slate-200';
}
