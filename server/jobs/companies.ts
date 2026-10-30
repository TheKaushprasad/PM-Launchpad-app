// Companies whose public job boards we read every day.
//
// Greenhouse, Lever and Ashby publish these feeds for exactly this purpose (no scraping, no Firecrawl
// credits). To add a company, find its careers page link:
//   boards.greenhouse.io/<token>   or  job-boards.greenhouse.io/<token>  -> { ats: 'greenhouse', token }
//   jobs.lever.co/<token>                                                  -> { ats: 'lever', token }
//   jobs.ashbyhq.com/<token>                                               -> { ats: 'ashby', token }
//   apply.workable.com/<token>                                             -> { ats: 'workable', token }
//   jobs.smartrecruiters.com/<token>                                       -> { ats: 'smartrecruiters', token }
//   <token>.recruitee.com                                                  -> { ats: 'recruitee', token }
//   <token>.breezy.hr                                                      -> { ats: 'breezy', token }
// A wrong token does no harm: that company shows as failed in the refresh result and is skipped.
// Boards that returned 404 on the live refresh (2026-10-16) were removed; the weekly search re-adds any that move.
// More boards are found every week by the Firecrawl searches in discovery.ts.

export interface CompanyBoard {
  name: string;
  ats: 'greenhouse' | 'lever' | 'ashby' | 'workable' | 'smartrecruiters' | 'recruitee' | 'breezy';
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
  // Added 2026-10-30: each had a live India PM posting in a web search that day.
  { name: 'InMobi', ats: 'greenhouse', token: 'inmobi' },
  { name: 'Atomicwork', ats: 'greenhouse', token: 'atomicwork' },
  { name: 'Fam', ats: 'lever', token: 'fampay' },
  { name: 'Hevo Data', ats: 'lever', token: 'hevodata' },
  { name: 'Gushwork', ats: 'lever', token: 'gushwork' },
  { name: '100ms', ats: 'lever', token: '100ms' },
  { name: 'Sarvam AI', ats: 'ashby', token: 'sarvam' },
  { name: 'SpotDraft', ats: 'ashby', token: 'spotdraft' },
  { name: 'Trail', ats: 'ashby', token: 'trailhq' },
  { name: 'Shipsy', ats: 'smartrecruiters', token: 'Shipsy' },

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
  // Added 2026-10-30, same check as above.
  { name: 'Couchbase', ats: 'greenhouse', token: 'couchbaseinc', global: true },
  { name: 'Arcesium', ats: 'greenhouse', token: 'arcesiumllc', global: true },
  { name: 'Karat', ats: 'greenhouse', token: 'karat', global: true },
  { name: 'Smartsheet', ats: 'greenhouse', token: 'smartsheet', global: true },
  { name: 'Coupang', ats: 'greenhouse', token: 'coupang', global: true },
  { name: 'Simpplr', ats: 'greenhouse', token: 'simpplr', global: true },
  { name: 'Headout', ats: 'greenhouse', token: 'headoutlinkedin', global: true },
  { name: 'Xometry', ats: 'greenhouse', token: 'xometry', global: true },
  { name: 'Glean', ats: 'greenhouse', token: 'gleanwork', global: true },
  { name: 'Enterpret', ats: 'greenhouse', token: 'enterpret', global: true },
  { name: 'Skillz', ats: 'greenhouse', token: 'skillzinc', global: true },
  { name: 'HighLevel', ats: 'lever', token: 'gohighlevel', global: true },
  { name: 'Nium', ats: 'lever', token: 'nium', global: true },
  { name: 'Neuron7', ats: 'lever', token: 'neuron7', global: true },
  { name: 'Netomi', ats: 'lever', token: 'netomi', global: true },
  { name: 'Merkle Science', ats: 'lever', token: 'merklescience', global: true },
  { name: 'Warner Music Group', ats: 'lever', token: 'wmg', global: true },
  { name: 'CodeRabbit', ats: 'ashby', token: 'coderabbit', global: true },
  { name: 'Bureau', ats: 'ashby', token: 'bureau', global: true },
  { name: 'SigNoz', ats: 'ashby', token: 'signoz', global: true },
  { name: 'Libra AI', ats: 'ashby', token: 'libra', global: true },
  { name: 'Tekion', ats: 'ashby', token: 'tekion', global: true },
  { name: 'Lyric', ats: 'ashby', token: 'lyric', global: true },
  { name: 'Metaforms', ats: 'ashby', token: 'metaforms', global: true },
  { name: 'Firstwork', ats: 'ashby', token: 'firstwork', global: true },
  { name: 'HackerOne', ats: 'ashby', token: 'hackerone', global: true },
  { name: 'Freshworks', ats: 'smartrecruiters', token: 'Freshworks', global: true },
  { name: 'Nielsen', ats: 'smartrecruiters', token: 'TheNielsenCompany', global: true },
  { name: 'QAD', ats: 'smartrecruiters', token: 'QADInc', global: true },
];
