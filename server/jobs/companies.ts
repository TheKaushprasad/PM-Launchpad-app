// Companies whose public job boards we read every day.
//
// Greenhouse, Lever and Ashby publish these feeds for exactly this purpose (no scraping, no Firecrawl
// credits). To add a company, find its careers page link:
//   boards.greenhouse.io/<token>   or  job-boards.greenhouse.io/<token>  -> { ats: 'greenhouse', token }
//   jobs.lever.co/<token>                                                  -> { ats: 'lever', token }
//   jobs.ashbyhq.com/<token>                                               -> { ats: 'ashby', token }
// A wrong token does no harm: that company shows as failed in /api/jobs/status and is skipped.

export interface CompanyBoard {
  name: string;
  ats: 'greenhouse' | 'lever' | 'ashby';
  token: string;
  /** Global companies list every office; only keep their India or India-open remote roles. */
  global?: boolean;
}

export const COMPANY_BOARDS: CompanyBoard[] = [
  // Indian companies
  { name: 'Razorpay', ats: 'greenhouse', token: 'razorpaysoftwareprivatelimited' },
  { name: 'Groww', ats: 'greenhouse', token: 'groww' },
  { name: 'PhonePe', ats: 'greenhouse', token: 'phonepe' },
  { name: 'Innovaccer', ats: 'greenhouse', token: 'innovaccer' },
  { name: 'ShareChat', ats: 'greenhouse', token: 'sharechat' },
  { name: 'Dream Sports', ats: 'greenhouse', token: 'dreamsports' },
  { name: 'BrowserStack', ats: 'greenhouse', token: 'browserstack' },
  { name: 'Postman', ats: 'greenhouse', token: 'postman' },
  { name: 'CRED', ats: 'lever', token: 'cred' },
  { name: 'Paytm', ats: 'lever', token: 'paytm' },
  { name: 'Meesho', ats: 'lever', token: 'meesho' },
  { name: 'Zeta', ats: 'lever', token: 'zeta' },
  { name: 'CleverTap', ats: 'lever', token: 'clevertap' },
  { name: 'Whatfix', ats: 'lever', token: 'whatfix' },
  { name: 'Upstox', ats: 'lever', token: 'upstox' },
  { name: 'Rapido', ats: 'lever', token: 'rapido' },
  { name: 'smallcase', ats: 'lever', token: 'smallcase' },
  { name: 'Jupiter', ats: 'lever', token: 'jupiter' },
  { name: 'Zepto', ats: 'ashby', token: 'zepto' },

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
  { name: 'ThoughtSpot', ats: 'greenhouse', token: 'thoughtspot', global: true },
  { name: 'Glean', ats: 'greenhouse', token: 'glean', global: true },
  { name: 'Sprinklr', ats: 'greenhouse', token: 'sprinklr', global: true },
  { name: 'Notion', ats: 'ashby', token: 'notion', global: true },
  { name: 'Deel', ats: 'ashby', token: 'deel', global: true },
  { name: 'Rippling', ats: 'ashby', token: 'rippling', global: true },
];
