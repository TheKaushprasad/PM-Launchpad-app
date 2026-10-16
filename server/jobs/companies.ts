// Companies whose public job boards we read every day.
//
// Greenhouse, Lever and Ashby publish these feeds for exactly this purpose (no scraping, no Firecrawl
// credits). To add a company, find its careers page link:
//   boards.greenhouse.io/<token>   or  job-boards.greenhouse.io/<token>  -> { ats: 'greenhouse', token }
//   jobs.lever.co/<token>                                                  -> { ats: 'lever', token }
//   jobs.ashbyhq.com/<token>                                               -> { ats: 'ashby', token }
//   apply.workable.com/<token>                                             -> { ats: 'workable', token }
// A wrong token does no harm: that company shows as failed in the refresh result and is skipped.
// Boards that returned 404 on the live refresh (2026-10-16) were removed; the weekly search re-adds any that move.
// More boards are found every week by the Firecrawl searches in discovery.ts.

export interface CompanyBoard {
  name: string;
  ats: 'greenhouse' | 'lever' | 'ashby' | 'workable';
  token: string;
  /** Global companies list every office; only keep their India or India-open remote roles. */
  global?: boolean;
  /** Found by Firecrawl search rather than listed here; the feed's own company name is used when it has one. */
  discovered?: boolean;
}

export const COMPANY_BOARDS: CompanyBoard[] = [
  // Indian companies
  { name: 'Razorpay', ats: 'greenhouse', token: 'razorpaysoftwareprivatelimited' },
  { name: 'Groww', ats: 'greenhouse', token: 'groww' },
  { name: 'CRED', ats: 'lever', token: 'cred' },
  { name: 'Paytm', ats: 'lever', token: 'paytm' },
  { name: 'Meesho', ats: 'lever', token: 'meesho' },
  { name: 'Zeta', ats: 'lever', token: 'zeta' },

  // Global companies with India teams or India-open remote roles
  { name: 'Rubrik', ats: 'greenhouse', token: 'rubrik', global: true },
  { name: 'Databricks', ats: 'greenhouse', token: 'databricks', global: true },
  { name: 'GitLab', ats: 'greenhouse', token: 'gitlab', global: true },
  { name: 'Stripe', ats: 'greenhouse', token: 'stripe', global: true },
  { name: 'MongoDB', ats: 'greenhouse', token: 'mongodb', global: true },
  { name: 'Cloudflare', ats: 'greenhouse', token: 'cloudflare', global: true },
  { name: 'Coinbase', ats: 'greenhouse', token: 'coinbase', global: true },
  { name: 'Okta', ats: 'greenhouse', token: 'okta', global: true },
  { name: 'Twilio', ats: 'greenhouse', token: 'twilio', global: true },
  { name: 'Airbnb', ats: 'greenhouse', token: 'airbnb', global: true },
  { name: 'Notion', ats: 'ashby', token: 'notion', global: true },
  { name: 'Deel', ats: 'ashby', token: 'deel', global: true },
];
