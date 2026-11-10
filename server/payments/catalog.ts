// Everything the site sells. Each offer is one product in the Dodo dashboard (its id comes from an
// env var) and says what a successful payment adds to the buyer's account. Names and prices shown
// on the site come from Dodo, so the page never shows a price Dodo won't charge; `fallbackName` is
// only used while the Dodo product can't be loaded.

export type ToolKey = 'resume' | 'linkedin' | 'solver' | 'strategy' | 'prd';
export const TOOLS: ToolKey[] = ['resume', 'linkedin', 'solver', 'strategy', 'prd'];

// Free plan: every tool gives one free run per calendar month (India time), on the live site too.
// After that a run needs a paid credit (only buyable while payments are on).
// FREE_RUNS (once per account) is kept for older documents and is 0 for every tool now.
export const FREE_RUNS: Record<ToolKey, number> = { resume: 0, linkedin: 0, solver: 0, strategy: 0, prd: 0 };

// Free runs that come back every calendar month instead of once per account.
export const FREE_RUNS_PER_MONTH: Partial<Record<ToolKey, number>> = { resume: 1, linkedin: 1, solver: 1, strategy: 1, prd: 1 };

export interface OfferDef {
  key: string;
  envVar: string;
  fallbackName: string;
  /** Suggested price in paise, used only in docs and as a hint while Dodo is unreachable. */
  suggestedPrice: number;
  sprints?: number;
  credits?: Partial<Record<ToolKey, number>>;
}

export const OFFERS: OfferDef[] = [
  { key: 'interview_sprint', envVar: 'DODO_SPRINT_PRODUCT_ID', fallbackName: 'AI interview sprint', suggestedPrice: 30000, sprints: 1 },
  { key: 'resume_1', envVar: 'DODO_RESUME_PRODUCT_ID', fallbackName: 'Resume audit', suggestedPrice: 4900, credits: { resume: 1 } },
  { key: 'resume_3', envVar: 'DODO_RESUME_PACK_PRODUCT_ID', fallbackName: '3 resume audits', suggestedPrice: 9900, credits: { resume: 3 } },
  { key: 'linkedin_1', envVar: 'DODO_LINKEDIN_PRODUCT_ID', fallbackName: 'LinkedIn profile audit', suggestedPrice: 7900, credits: { linkedin: 1 } },
  { key: 'linkedin_3', envVar: 'DODO_LINKEDIN_PACK_PRODUCT_ID', fallbackName: '3 LinkedIn profile audits', suggestedPrice: 14900, credits: { linkedin: 3 } },
  { key: 'solver_1', envVar: 'DODO_SOLVER_PRODUCT_ID', fallbackName: 'Assignment Solver run', suggestedPrice: 14900, credits: { solver: 1 } },
  // AI Product Strategy (local only for now). Suggested price is a placeholder until the owner sets one.
  { key: 'strategy_5', envVar: 'DODO_STRATEGY_PRODUCT_ID', fallbackName: '5 AI product strategies', suggestedPrice: 9900, credits: { strategy: 5 } },
  { key: 'job_pack', envVar: 'DODO_JOB_PACK_PRODUCT_ID', fallbackName: 'Job-ready pack', suggestedPrice: 29900, credits: { resume: 3, linkedin: 3, solver: 2 } },
];

export const offerProductId = (offer: OfferDef) => process.env[offer.envVar]?.trim() || '';
export const findOffer = (key: unknown) => OFFERS.find((o) => o.key === key);
export const offerByProductId = (productId: string | undefined) => (productId ? OFFERS.find((o) => offerProductId(o) === productId) : undefined);
export const configuredOffers = () => OFFERS.filter((o) => offerProductId(o));

/** Offers that give runs of this tool, in the order a buyer should see them. */
export const offersForTool = (tool: ToolKey) => OFFERS.filter((o) => (o.credits?.[tool] || 0) > 0);
