import { createHash } from 'crypto';
import { JobLevel, WorkMode } from '../../types/jobs';

// ---------- Titles ----------

const PM_TITLE_PATTERNS = [
  /\bproduct\s+(manager|owner|lead|head|director|associate|management)\b/i,
  /\bhead\s+of\s+product\b/i,
  /\b(vp|vice\s+president|director|svp|evp)\b[^a-z]*(of\s+)?product\b(?!\s+(design|marketing|engineering|security|support|operations|analytics))/i,
  /\bchief\s+product\s+officer\b/i,
  /\b(apm|cpo|gpm)\b/i,
];

// Roles that mention "product" but are not product management.
const NON_PM_PATTERNS = [
  /\bproduct\s+(marketing|design|designer|engineer|engineering|security|support|operations|ops|analyst|specialist|sales|counsel|compliance|quality|content|research|photographer|trainer|expert|consultant|developer|data|led|writer)\b/i,
  /\bproduction\b/i,
  /\bmarketing\s+manager\b/i,
  /\bproject\s+manager\b/i,
];

export function isPmTitle(title: string): boolean {
  const t = title || '';
  if (!PM_TITLE_PATTERNS.some((p) => p.test(t))) return false;
  // "Product Marketing Manager" etc. Keep titles that also contain a clean PM phrase, e.g.
  // "Product Manager, Product Analytics".
  if (NON_PM_PATTERNS.some((p) => p.test(t))) {
    return /\bproduct\s+(manager|owner)\b(?!,?\s*(marketing|design))/i.test(t.replace(/product\s+marketing\s+manager/gi, ''));
  }
  return true;
}

export function classifyLevel(title: string): JobLevel {
  const t = title.toLowerCase();
  if (/chief product officer|\bcpo\b/.test(t)) return 'CPO';
  if (/\b(vp|svp|evp|vice president)\b|head of product|\bhead\b.*\bproduct\b/.test(t)) return 'VP / Head of Product';
  if (/\bdirector\b/.test(t)) return 'Director';
  if (/group product manager|\bgpm\b/.test(t)) return 'Group PM';
  if (/product owner/.test(t)) return 'Product Owner';
  if (/associate product manager|\bapm\b/.test(t)) return 'APM';
  if (/product (management )?associate|associate,? product/.test(t)) return 'Product Associate';
  if (/\b(principal|staff)\b|lead product manager|product lead|product manager.*\blead\b/.test(t)) return 'Lead / Principal PM';
  if (/\b(senior|sr\.?)\b|product manager\s*(iii|3)\b/.test(t)) return 'Senior PM';
  return 'Product Manager';
}

// ---------- Locations ----------

const CITY_ALIASES: Array<[string, RegExp]> = [
  ['Bengaluru', /\b(bengaluru|bangalore)\b/i],
  ['Delhi NCR', /\b(new delhi|delhi|gurgaon|gurugram|noida|ncr|faridabad|ghaziabad)\b/i],
  ['Mumbai', /\b(mumbai|bombay|navi mumbai|thane)\b/i],
  ['Hyderabad', /\bhyderabad\b/i],
  ['Pune', /\bpune\b/i],
  ['Chennai', /\bchennai\b/i],
  ['Kolkata', /\b(kolkata|calcutta)\b/i],
  ['Ahmedabad', /\bahmedabad\b/i],
  ['Jaipur', /\bjaipur\b/i],
  ['Kochi', /\b(kochi|cochin)\b/i],
  ['Chandigarh', /\b(chandigarh|mohali)\b/i],
  ['Indore', /\bindore\b/i],
  ['Coimbatore', /\bcoimbatore\b/i],
  ['Thiruvananthapuram', /\b(thiruvananthapuram|trivandrum)\b/i],
  ['Goa', /\bgoa\b/i],
  ['Lucknow', /\blucknow\b/i],
  ['Bhubaneswar', /\bbhubaneswar\b/i],
  ['Vadodara', /\b(vadodara|baroda)\b/i],
  ['Mysuru', /\b(mysuru|mysore)\b/i],
  ['Nagpur', /\bnagpur\b/i],
  ['Surat', /\bsurat\b/i],
];

export const INDIAN_CITIES = CITY_ALIASES.map(([name]) => name);

export function detectCities(text: string): string[] {
  const found: string[] = [];
  for (const [name, re] of CITY_ALIASES) {
    if (re.test(text) && !found.includes(name)) found.push(name);
  }
  return found;
}

export function mentionsIndia(text: string): boolean {
  return /\bindia\b/i.test(text) || detectCities(text).length > 0;
}

/**
 * A remote role is useful to someone in India only if it is open to India.
 * "Remote" on its own, "Worldwide", "Anywhere", "APAC" or "Asia" count; "Remote, United States" does not.
 */
export function remoteOpenToIndia(locationText: string): boolean {
  const t = (locationText || '').toLowerCase().trim();
  if (!t || /^remote\.?$/.test(t)) return true;
  if (mentionsIndia(t)) return true;
  return /\b(worldwide|anywhere|global|apac|asia|emea\s*&\s*apac|any location)\b/.test(t);
}

export function detectWorkMode(...hints: Array<string | undefined | null>): WorkMode {
  const t = hints.filter(Boolean).join(' ').toLowerCase();
  if (/\bhybrid\b/.test(t)) return 'Hybrid';
  if (/\bremote\b/.test(t)) return 'Remote';
  return 'On-site';
}

// ---------- Experience ----------

export function parseExperience(text: string): { expMin?: number; expMax?: number } {
  if (!text) return {};
  const t = text.replace(/–|—/g, '-');
  const range = t.match(/\b(\d{1,2})\s*\+?\s*(?:-|to)\s*(\d{1,2})\s*\+?\s*(?:years?|yrs?)\b/i);
  if (range) {
    const a = Number(range[1]);
    const b = Number(range[2]);
    if (a <= b && b <= 30) return { expMin: a, expMax: b };
  }
  const min =
    t.match(/\b(\d{1,2})\s*\+\s*(?:years?|yrs?)\b/i) ||
    t.match(/\b(?:at least|minimum(?: of)?|min\.?)\s*(\d{1,2})\s*(?:years?|yrs?)\b/i) ||
    t.match(/\b(\d{1,2})\s*(?:or more|plus)\s*(?:years?|yrs?)\b/i) ||
    t.match(/\b(\d{1,2})\s*(?:years?|yrs?)(?:'|’)?\s*(?:of\s+)?(?:\w+\s+){0,3}experience\b/i);
  if (min) {
    const a = Number(min[1]);
    if (a <= 25) return { expMin: a };
  }
  return {};
}

// ---------- Text helpers ----------

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
  '&rsquo;': '’',
  '&lsquo;': '‘',
  '&rdquo;': '”',
  '&ldquo;': '“',
  '&ndash;': '–',
  '&mdash;': '—',
  '&bull;': '•',
  '&hellip;': '…',
};

export function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&[a-z]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m);
}

/** Turns job-board HTML into readable plain text with line breaks and bullets kept. */
export function htmlToText(html: string): string {
  if (!html) return '';
  let s = html;
  // Greenhouse double-encodes its HTML.
  if (/&lt;\/?[a-z]/i.test(s)) s = decodeEntities(s);
  s = s
    .replace(/<\s*(script|style)[^>]*>[\s\S]*?<\/\s*\1\s*>/gi, '')
    .replace(/<\s*li[^>]*>/gi, '\n• ')
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/\s*(p|div|h[1-6]|ul|ol|li|tr)\s*>/gi, '\n')
    .replace(/<[^>]+>/g, '');
  s = decodeEntities(s);
  return s
    .split('\n')
    .map((line) => line.replace(/[ \t ]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n{2,}• /g, '\n• ')
    .trim();
}

export function shortHash(...parts: string[]): string {
  return createHash('sha1').update(parts.join('\u0000')).digest('hex').slice(0, 12);
}

export function safeDocId(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120);
}

export function dedupeKey(company: string, title: string, cities: string[]): string {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  return `${norm(company)}|${norm(title)}|${cities[0] || 'remote'}`;
}

export function toIsoDate(value: unknown): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const d = typeof value === 'number' ? new Date(value < 1e12 ? value * 1000 : value) : new Date(String(value));
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}
