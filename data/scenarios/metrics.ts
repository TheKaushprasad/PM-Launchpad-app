import { DifficultyLevel, InterviewScenario } from '../../types/interview';

/**
 * Metrics & Execution round: define success, pick a North Star and guardrails,
 * and make ship / no-ship calls on experiment results. Common at Meta, Google,
 * Uber, Flipkart and Swiggy.
 */
interface MetricsSeed {
  id: string;
  title: string;
  company: string;
  companyColor: string;
  companyBadge: string;
  difficulty: DifficultyLevel;
  minutes?: number;
  problemStatement: string;
  contextBackground: string;
  candidateBrief: string[];
  keyEvaluationMetrics: string[];
  clarificationQuestions: string[];
  goodMetrics: string[];
  analyticalPath: string[];
  synthesisModel: string;
  dataPack?: string[];
  curveball?: string;
}

const metrics = (s: MetricsSeed): InterviewScenario => ({
  id: s.id,
  track: 'metrics',
  title: s.title,
  company: s.company,
  companyColor: s.companyColor,
  companyBadge: s.companyBadge,
  difficulty: s.difficulty,
  targetDurationMinutes: s.minutes ?? (s.difficulty === 'Easy' ? 15 : s.difficulty === 'Medium' ? 25 : 30),
  problemStatement: s.problemStatement,
  contextBackground: s.contextBackground,
  candidateBrief: s.candidateBrief,
  keyEvaluationMetrics: s.keyEvaluationMetrics,
  suggestedFramework: 'Goal of the product -> Users and value exchange -> North Star -> Supporting metrics by funnel stage -> Guardrails and counter-metrics -> Decision or target',
  benchmarkOutline: {
    clarificationQuestions: s.clarificationQuestions,
    coreHypothesesOrSegments: s.goodMetrics,
    analyticalPath: s.analyticalPath,
    synthesisModel: s.synthesisModel
  },
  dataPack: s.dataPack,
  curveball: s.curveball
});

export const METRICS_SCENARIOS: InterviewScenario[] = [
  // ==========================================
  // 🟢 EASY
  // ==========================================
  metrics({
    id: 'metrics-instagram-close-friends',
    title: 'Define success for Instagram Close Friends stories',
    company: 'Meta',
    companyColor: 'bg-brand-600 text-white',
    companyBadge: 'Social Network',
    difficulty: 'Easy',
    problemStatement: 'You are the PM for Close Friends on Instagram Stories, which lets people share stories with a smaller hand-picked list. How would you measure whether it is successful?',
    contextBackground: 'The feature has been live for a year. Leadership wants a single health metric for quarterly reviews plus a short list of supporting metrics.',
    candidateBrief: ['Tie the metric to why the feature exists (more authentic sharing)', 'Separate creator and viewer sides', 'Pick a North Star and supporting metrics', 'Add guardrails such as total story posting and viewer engagement'],
    keyEvaluationMetrics: ['Creators posting to Close Friends weekly', 'Replies per Close Friends story', 'Incremental stories posted'],
    clarificationQuestions: ['Is the goal more sharing overall or more intimate sharing?', 'Are we judging creators, viewers or both?', 'Is there any monetisation angle?'],
    goodMetrics: ['Weekly creators posting at least one Close Friends story', 'Replies and DMs per Close Friends story view', 'Share of posters who would not have posted publicly (incrementality)'],
    analyticalPath: ['Close Friends stories get about 3x the reply rate of public stories', 'About 18% of weekly story posters use Close Friends', 'Public story posting is flat among Close Friends users, so most Close Friends posting is additive'],
    synthesisModel: 'North Star: weekly creators posting at least one Close Friends story. Supporting: replies per view, list size health, incremental stories per creator. Guardrails: public story posting and overall time spent must not fall.'
  }),
  metrics({
    id: 'metrics-swiggy-instamart-reorder',
    title: 'Measure success of a "Buy Again" shelf in Instamart',
    company: 'Swiggy',
    companyColor: 'bg-orange-500 text-white',
    companyBadge: 'Quick Commerce',
    difficulty: 'Easy',
    problemStatement: 'Swiggy Instamart added a "Buy Again" shelf on the home screen showing items you bought before. What metrics would you use to judge it?',
    contextBackground: 'Most Instamart baskets contain staple items bought every week. The shelf launched in Bengaluru two weeks ago.',
    candidateBrief: ['Clarify the goal: faster checkout, bigger baskets or more frequent orders', 'Funnel: shelf view to tap to add-to-cart to order', 'Business outcome: order frequency and basket value', 'Guardrail: discovery of new items'],
    keyEvaluationMetrics: ['Shelf add-to-cart rate', 'Time to checkout', 'Orders per user per week'],
    clarificationQuestions: ['Is the main goal speed or basket size?', 'Is this for all users or repeat buyers only?'],
    goodMetrics: ['Share of orders with at least one Buy Again item', 'Median time from app open to order', 'Weekly orders per active user'],
    analyticalPath: ['About 41% of orders now include a Buy Again item', 'Median time to checkout fell from 3m10s to 2m20s', 'New-item discovery (first-time SKUs per order) fell 9%'],
    synthesisModel: 'Primary: weekly orders per user, because the shelf exists to make reordering effortless. Supporting: shelf add-to-cart rate and time to checkout. Guardrail: first-time SKUs per order and average basket value, since the shelf can crowd out discovery.'
  }),
  metrics({
    id: 'metrics-google-maps-eta',
    title: 'How would you measure the quality of Google Maps ETAs?',
    company: 'Google',
    companyColor: 'bg-brand-500 text-white',
    companyBadge: 'Navigation',
    difficulty: 'Easy',
    problemStatement: 'You own arrival-time estimates (ETAs) in Google Maps driving navigation. How would you measure whether ETAs are good?',
    contextBackground: 'ETAs are shown before a trip and updated during it. Users complain most when they arrive much later than promised.',
    candidateBrief: ['Define accuracy (predicted vs actual arrival)', 'Asymmetric cost: being late hurts more than early', 'Segment by trip length, city and traffic', 'User-facing outcome: trust and navigation usage'],
    keyEvaluationMetrics: ['Share of trips within ±10% of ETA', 'Late arrival rate', 'Navigation starts per user'],
    clarificationQuestions: ['Initial ETA or updated ETA?', 'Which trip types and regions?'],
    goodMetrics: ['Share of trips arriving within 10% of the initial ETA', 'Share of trips arriving more than 10% late', 'Absolute error by trip-length bucket'],
    analyticalPath: ['About 82% of trips land within ±10% of the initial ETA', 'Late trips outnumber early trips 2 to 1', 'Error is worst on trips over 45 minutes in monsoon months in Indian cities'],
    synthesisModel: 'Primary: share of trips within ±10% of the initial ETA, weighted toward late misses because they cost more trust. Track by trip length and city. Outcome guardrail: navigation sessions per user.'
  }),
  metrics({
    id: 'metrics-linkedin-open-to-work',
    title: 'Success metrics for LinkedIn "Open to Work"',
    company: 'LinkedIn',
    companyColor: 'bg-brand-700 text-white',
    companyBadge: 'Professional Network',
    difficulty: 'Easy',
    problemStatement: 'LinkedIn lets job seekers add an "Open to Work" signal to their profile. How would you measure whether this feature is working?',
    contextBackground: 'Two sides use it: job seekers who turn it on and recruiters who search for them. Some users hide it from their current employer.',
    candidateBrief: ['Two-sided: seeker outcomes and recruiter outcomes', 'Funnel: turn on, recruiter views, InMails, interviews, hires', 'Guardrails: spam InMails, privacy concerns'],
    keyEvaluationMetrics: ['Recruiter InMails per Open to Work member', 'Reply rate', 'Hires attributed'],
    clarificationQuestions: ['Is success defined by seekers getting jobs or by recruiter engagement?', 'Do we see confirmed hires?'],
    goodMetrics: ['Confirmed hires within 90 days among members with the signal on', 'Recruiter InMail reply rate', 'Share of signals that are recruiter-only (privacy use)'],
    analyticalPath: ['Members with the signal on get 2.1x more recruiter InMails', 'InMail reply rate to these members is 31%', 'About 7% report InMails as spam'],
    synthesisModel: 'North Star: hires within 90 days for members with the signal on, compared with similar members without it. Supporting: recruiter views, InMails and replies. Guardrails: spam reports and turn-off rate.'
  }),
  metrics({
    id: 'metrics-phonepe-autopay',
    title: 'Measure UPI AutoPay for subscriptions',
    company: 'PhonePe',
    companyColor: 'bg-brand-700 text-white',
    companyBadge: 'Payments',
    difficulty: 'Easy',
    problemStatement: 'PhonePe lets users set up UPI AutoPay mandates for subscriptions like OTT and SIPs. How would you measure whether AutoPay is successful?',
    contextBackground: 'Merchants want fewer failed renewals; users want control and no surprise debits.',
    candidateBrief: ['Two sides: users and merchants', 'Funnel: mandate created, active, successful debits', 'Trust guardrails: cancellations, disputes, complaints'],
    keyEvaluationMetrics: ['Active mandates', 'Debit success rate', 'Dispute rate'],
    clarificationQuestions: ['Is the goal mandate growth or payment reliability?', 'Which merchant categories matter most?'],
    goodMetrics: ['Monthly successful AutoPay debits', 'Debit success rate on due date', 'Disputes per 1,000 debits'],
    analyticalPath: ['Debit success rate is 88%; most failures are insufficient balance', 'Mandate cancellations spike in the first 7 days after creation', 'Disputes are 1.4 per 1,000 debits'],
    synthesisModel: 'North Star: monthly successful AutoPay debits. Supporting: mandate creation and activation, debit success rate. Guardrails: early cancellations and disputes, because surprise debits destroy trust in UPI.'
  }),
  metrics({
    id: 'metrics-zoom-whiteboard',
    title: 'Define success for a whiteboard inside video calls',
    company: 'Zoom',
    companyColor: 'bg-brand-600 text-white',
    companyBadge: 'Collaboration',
    difficulty: 'Easy',
    problemStatement: 'Zoom added a collaborative whiteboard that participants can open during a meeting. How would you measure its success?',
    contextBackground: 'The whiteboard is free for all paid plans. The company hopes it helps retain business customers.',
    candidateBrief: ['Clarify business goal: retention of paid accounts', 'Adoption, depth and repeat use', 'Link to account retention, not just usage'],
    keyEvaluationMetrics: ['Meetings using whiteboard', 'Repeat usage', 'Paid account retention'],
    clarificationQuestions: ['Is this about engagement or reducing churn to competitors?', 'Do we care about board reuse after the meeting?'],
    goodMetrics: ['Share of team meetings (3+ people) that open a whiteboard', 'Accounts with whiteboard use in 3 of the last 4 weeks', 'Renewal rate of using vs similar non-using accounts'],
    analyticalPath: ['6% of team meetings open the whiteboard', 'Half of boards are never opened again after the meeting', 'Accounts using it weekly renew at 94% vs 89% for similar accounts'],
    synthesisModel: 'North Star: accounts with repeat weekly whiteboard use, because the goal is retention. Supporting: share of team meetings using it and boards reopened later. Watch renewal rate versus matched accounts, with the caveat that correlation is not causation.'
  }),

  // ==========================================
  // 🟡 MEDIUM
  // ==========================================
  metrics({
    id: 'metrics-zomato-north-star',
    title: 'Pick a North Star metric for Zomato food delivery',
    company: 'Zomato',
    companyColor: 'bg-red-600 text-white',
    companyBadge: 'Food Delivery',
    difficulty: 'Medium',
    problemStatement: 'You are the head of product for Zomato food delivery. Pick one North Star metric for the business and defend it.',
    contextBackground: 'Three sides: customers, restaurants and delivery partners. The company is profitable on delivery and wants durable growth.',
    candidateBrief: ['Explain what a North Star must capture (value to customers that leads to revenue)', 'Compare options: GOV, orders, monthly transacting users, on-time delivered orders', 'Explain how it moves with supply-side health', 'Add counter-metrics'],
    keyEvaluationMetrics: ['Weekly orders delivered on time', 'Monthly transacting users', 'Contribution margin per order'],
    clarificationQuestions: ['Growth stage or efficiency stage?', 'Is this for the whole marketplace or one side?'],
    goodMetrics: ['Weekly orders delivered on time and as ordered', 'Monthly transacting users (frequency proxy)', 'Gross order value (revenue proxy, vulnerable to discounts)'],
    analyticalPath: ['GOV grew 25% last year but 40% of that came from discount-heavy cities', 'Late or wrong orders cut 30-day repeat rate from 62% to 41%', 'Restaurant churn is highest where partner wait time exceeds 12 minutes'],
    synthesisModel: 'North Star: weekly orders delivered on time and correct, because it captures customer value, supply health and repeat behaviour together. Counter-metrics: contribution margin per order, restaurant partner churn and delivery partner earnings per hour.',
    curveball: 'The CFO argues GOV is simpler and matches how investors judge the company. Ask them to respond.'
  }),
  metrics({
    id: 'metrics-youtube-shorts-ship',
    title: 'Ship or not: Shorts in the subscriptions feed',
    company: 'YouTube',
    companyColor: 'bg-red-600 text-white',
    companyBadge: 'Video',
    difficulty: 'Medium',
    problemStatement: 'An experiment adds Shorts from channels you subscribe to into the Subscriptions feed. Total watch time is up 1.5% but long-form watch time from Subscriptions is down 4%. Do you ship?',
    contextBackground: 'Long-form videos earn several times more ad revenue per minute than Shorts. Creators care about subscribers watching their long videos.',
    candidateBrief: ['Clarify the goal of the Subscriptions feed', 'Look past the top-line: revenue per minute, creator impact', 'Segment: which users and creators drive the change', 'Make a decision with conditions'],
    keyEvaluationMetrics: ['Watch time', 'Revenue per user', 'Creator long-form views'],
    clarificationQuestions: ['How long did the test run and is there novelty effect?', 'What is the revenue impact, not just watch time?', 'Which creators lose views?'],
    goodMetrics: ['Ad revenue per user per day', 'Long-form views per subscribed creator', 'Return visits to Subscriptions tab'],
    analyticalPath: ['Ad revenue per user is down 0.8% in treatment', 'The long-form drop is concentrated in creators with fewer than 100K subscribers', 'Daily active users of Subscriptions are flat; return visits are flat'],
    synthesisModel: 'Do not ship as is: revenue per user falls and small creators lose the long-form views that sustain them. Test a capped version (for example, one Shorts row) and judge on revenue per user and small-creator long-form views as guardrails.',
    dataPack: ['Ad revenue per user per day is down 0.8% in treatment', 'The long-form watch time drop is concentrated among creators with fewer than 100K subscribers', 'Daily users of the Subscriptions tab and return visits are flat', 'The experiment ran for 3 weeks; the effect is stable after week 1']
  }),
  metrics({
    id: 'metrics-flipkart-bnpl',
    title: 'Measure Flipkart Pay Later at checkout',
    company: 'Flipkart',
    companyColor: 'bg-brand-600 text-white',
    companyBadge: 'E-commerce',
    difficulty: 'Medium',
    problemStatement: 'Flipkart Pay Later (buy now, pay later) is offered at checkout. How would you measure whether it is good for Flipkart and its customers?',
    contextBackground: 'Pay Later is run with a lending partner. It raises conversion but carries credit risk and regulatory scrutiny.',
    candidateBrief: ['Value to customers: access and convenience', 'Value to Flipkart: conversion and incremental GMV', 'Risk: defaults, over-borrowing, complaints', 'Incrementality versus cannibalising other payment methods'],
    keyEvaluationMetrics: ['Incremental conversion', 'Repayment rate', 'Complaint rate'],
    clarificationQuestions: ['Who bears default losses?', 'Is the goal conversion or new-customer acquisition?'],
    goodMetrics: ['Incremental orders from Pay Later users (vs holdout)', '30-day on-time repayment rate', 'Complaints per 1,000 Pay Later orders'],
    analyticalPath: ['Holdout test shows +3.2% checkout conversion for eligible users', '70% of Pay Later orders would have used another method anyway', 'On-time repayment is 94%; it is 86% for first-time credit users'],
    synthesisModel: 'Primary: incremental orders versus a holdout, not total Pay Later volume, since most orders just switch payment method. Guardrails: on-time repayment (especially first-time credit users) and complaints, because harm to customers is a regulatory and brand risk.',
    curveball: 'The regulator announces stricter rules on BNPL for first-time credit users next quarter. Ask what they would change.'
  }),
  metrics({
    id: 'metrics-uber-airport-queue',
    title: 'Airport pickup wait times feel worse: what do you measure?',
    company: 'Uber',
    companyColor: 'bg-black text-white',
    companyBadge: 'Mobility',
    difficulty: 'Medium',
    problemStatement: 'Uber redesigned airport pickups with a digital queue for drivers. Riders say waits feel longer. Which metrics would you use to decide whether the redesign worked?',
    contextBackground: 'Drivers wait in a holding lot and are dispatched in order. The redesign aimed to make driver earnings fairer.',
    candidateBrief: ['Both sides: rider wait and driver fairness', 'Perceived vs actual wait', 'Supply in the lot by hour', 'Trade-off and decision'],
    keyEvaluationMetrics: ['Rider request-to-pickup time', 'Driver earnings per hour at airports', 'Cancellation rate'],
    clarificationQuestions: ['Actual or perceived wait?', 'Which airports and times?'],
    goodMetrics: ['P50 and P90 request-to-pickup time', 'Driver earnings per hour in the airport queue', 'Rider cancellations after match'],
    analyticalPath: ['P50 wait is unchanged at 7 minutes; P90 rose from 14 to 21 minutes', 'The P90 rise happens 11pm to 2am when few drivers are in the lot', 'Driver earnings per hour at airports rose 9% and queue-jumping complaints fell 70%'],
    synthesisModel: 'Keep the queue: it fixed driver fairness and median waits held. Fix the late-night P90 problem with targeted supply incentives. Measure P90 wait by hour as the primary rider metric, with driver earnings per hour as the guardrail.',
    dataPack: ['P50 rider wait is unchanged at 7 minutes', 'P90 rider wait rose from 14 to 21 minutes', 'The P90 increase is concentrated between 11pm and 2am when few drivers are in the lot', 'Driver earnings per hour at airports rose 9%', 'Driver complaints about queue-jumping fell 70%']
  }),
  metrics({
    id: 'metrics-duolingo-hearts',
    title: 'Should Duolingo remove "hearts" for paying users only?',
    company: 'Duolingo',
    companyColor: 'bg-green-500 text-white',
    companyBadge: 'EdTech',
    difficulty: 'Medium',
    problemStatement: 'In Duolingo, free users lose a heart for each mistake and must wait or practise to refill. How would you measure the impact of hearts on learning and the business?',
    contextBackground: 'Unlimited hearts is a key benefit of the paid plan. Some argue hearts frustrate learners and cause churn.',
    candidateBrief: ['Learning outcomes vs monetisation vs engagement', 'Metrics for each', 'How to test without harming either', 'Decision framework'],
    keyEvaluationMetrics: ['Day-30 retention', 'Lessons completed', 'Paid conversion'],
    clarificationQuestions: ['Is the goal learning, retention or revenue?', 'Can we run a holdout without hearts?'],
    goodMetrics: ['Day-30 retention of new free users', 'Lessons completed per active day', 'Free-to-paid conversion within 60 days'],
    analyticalPath: ['A 5% holdout without hearts shows +4% day-30 retention', 'Paid conversion fell 11% in the holdout', 'Lessons per day rose 6% but accuracy per lesson fell 3 points'],
    synthesisModel: 'Hearts trade retention for revenue and slightly better accuracy. Use long-term value (retention × conversion) as the decision metric. Explore a softer mechanic for new users in their first week, where churn risk is highest.',
    dataPack: ['A 5% holdout without hearts shows +4% day-30 retention', 'Free-to-paid conversion fell 11% in the holdout', 'Lessons per day rose 6% but accuracy per lesson fell 3 points', 'Most churn caused by running out of hearts happens in the first 7 days']
  }),
  metrics({
    id: 'metrics-razorpay-checkout',
    title: 'Measure the success of Razorpay Magic Checkout',
    company: 'Razorpay',
    companyColor: 'bg-brand-700 text-white',
    companyBadge: 'Fintech B2B',
    difficulty: 'Medium',
    problemStatement: 'Razorpay Magic Checkout pre-fills addresses and payment methods for shoppers across many D2C websites. How would you measure success, for merchants and for Razorpay?',
    contextBackground: 'Merchants pay a fee per transaction. Shoppers save time because their details carry across stores.',
    candidateBrief: ['Two customers: merchants and shoppers', 'Merchant value: conversion and RTO (return to origin) reduction', 'Razorpay value: adoption, payment volume', 'Guardrails: fraud, data trust'],
    keyEvaluationMetrics: ['Checkout conversion lift', 'RTO rate', 'Merchant retention'],
    clarificationQuestions: ['What do merchants care about most?', 'Do we have a way to measure lift per merchant?'],
    goodMetrics: ['Checkout conversion lift vs merchant baseline', 'Cash-on-delivery RTO rate', 'Merchants still live after 90 days'],
    analyticalPath: ['Median merchant sees +18% checkout conversion', 'RTO falls 25% due to address validation', '12% of merchants switch off within 90 days, mostly over fees'],
    synthesisModel: 'North Star: payment volume processed through Magic Checkout at merchants live for 90+ days, because it captures merchant value and Razorpay revenue. Supporting: conversion lift and RTO reduction per merchant. Guardrails: fraud rate and shopper data complaints.'
  }),
  metrics({
    id: 'metrics-netflix-download-for-you',
    title: 'Define success for Netflix "Downloads For You"',
    company: 'Netflix',
    companyColor: 'bg-black text-red-500',
    companyBadge: 'Streaming',
    difficulty: 'Medium',
    problemStatement: 'Netflix automatically downloads recommended shows to your phone when on Wi-Fi so you can watch offline. How would you measure whether it works?',
    contextBackground: 'Popular in markets with patchy mobile data. It uses device storage, which some users dislike.',
    candidateBrief: ['Goal: more viewing in low-connectivity moments', 'Usage of auto-downloaded titles', 'Costs: storage, bandwidth, user annoyance', 'Business link: retention'],
    keyEvaluationMetrics: ['Hours watched offline', 'Share of auto-downloads watched', 'Retention'],
    clarificationQuestions: ['Which markets?', 'Is retention the business goal?'],
    goodMetrics: ['Share of auto-downloaded titles started within 7 days', 'Offline hours per member per week', 'Turn-off rate of the feature'],
    analyticalPath: ['Only 22% of auto-downloaded titles get started', 'Members using it watch 35 more offline minutes a week', 'Turn-off rate is 15%, mostly on phones with under 32 GB'],
    synthesisModel: 'Primary: share of auto-downloads watched, because it shows recommendation quality and justifies storage use. Outcome: offline hours and retention in target markets. Guardrails: turn-off rate and storage complaints.'
  }),
  metrics({
    id: 'metrics-airbnb-reviews-drop',
    title: 'Guest reviews submitted fell after a redesign',
    company: 'Airbnb',
    companyColor: 'bg-rose-500 text-white',
    companyBadge: 'Marketplace',
    difficulty: 'Medium',
    problemStatement: 'After Airbnb shortened the review form, the share of stays that get a guest review went from 72% to 75%, but average review length fell by half. Is this a good change? How would you decide?',
    contextBackground: 'Reviews build trust for future guests and give hosts feedback.',
    candidateBrief: ['Why reviews matter: booking conversion for future guests', 'Quantity vs quality', 'Measure downstream impact', 'Decision'],
    keyEvaluationMetrics: ['Review submission rate', 'Review helpfulness', 'Listing conversion'],
    clarificationQuestions: ['What do future guests use reviews for?', 'Do we know how review content affects booking?'],
    goodMetrics: ['Booking conversion on listings by review count and detail', 'Share of reviews mentioning specifics (cleanliness, location)', 'Host response to feedback'],
    analyticalPath: ['Short reviews mention a specific detail 40% less often', 'Booking conversion is unchanged so far on affected listings', 'New listings gain their first 3 reviews 5 days faster'],
    synthesisModel: 'Keep the shorter form because faster first reviews help new listings convert, and conversion is unchanged. Add an optional prompt for one specific detail to restore useful content. Judge by listing conversion and review helpfulness, not review length.'
  }),

  // ==========================================
  // 🔴 HARD
  // ==========================================
  metrics({
    id: 'metrics-meta-reels-ads-load',
    title: 'Raise ad load in Reels? Make the call',
    company: 'Meta',
    companyColor: 'bg-brand-600 text-white',
    companyBadge: 'Social Network',
    difficulty: 'Hard',
    problemStatement: 'An experiment increases ads in Reels from 1 in 8 to 1 in 6 items. Revenue per user is up 9%, time spent in Reels is down 2%, and daily sessions are flat. Do you ship, and how do you decide?',
    contextBackground: 'Reels competes with TikTok and YouTube Shorts for time. Short-term revenue matters this year.',
    candidateBrief: ['Short-term vs long-term effects', 'Which user segments lose time', 'Long-term holdout to detect slow decay', 'Decision rule and guardrails'],
    keyEvaluationMetrics: ['Revenue per user', 'Time spent', 'Long-term retention'],
    clarificationQuestions: ['How long has it run?', 'Are heavy or light users losing time?', 'Do we have a long-term holdout?'],
    goodMetrics: ['Revenue per user over 8+ weeks', 'Time spent by light users', 'Week-over-week retention of new Reels users'],
    analyticalPath: ['The time-spent drop doubles to 4% among users with under 10 minutes a day', 'A 6-month holdout from a similar past change showed time spent decaying 0.5% a month', 'Ad click-through falls 6% per ad as load rises'],
    synthesisModel: 'Do not ship to everyone. Ship to heavy users where the time cost is small, keep light and new users at current load, and run a long-term holdout. Decide on 6-month revenue per user net of the projected time decay, with new-user retention as a hard guardrail.',
    dataPack: ['The time-spent drop is 4% among users with under 10 minutes a day, and under 1% for heavy users', 'A 6-month holdout from a similar past ad-load change showed time spent decaying about 0.5% a month', 'Click-through rate per ad fell 6%', 'The test has run for 2 weeks'],
    curveball: 'Leadership says the revenue target this year requires shipping to everyone. Ask how they push back or adapt.'
  }),
  metrics({
    id: 'metrics-spotify-podcast-north-star',
    title: 'North Star for Spotify podcasts',
    company: 'Spotify',
    companyColor: 'bg-green-500 text-black',
    companyBadge: 'Audio',
    difficulty: 'Hard',
    problemStatement: 'You lead podcasts at Spotify. Choose a North Star metric for podcasts and explain how it connects to Spotify\'s overall business.',
    contextBackground: 'Spotify earns from subscriptions and ads. Podcasts were meant to increase engagement and reduce dependence on music royalties.',
    candidateBrief: ['Goal of podcasts for the company', 'Options: listeners, hours, retention of subscribers, ad revenue', 'Avoid vanity metrics', 'Supporting and counter metrics'],
    keyEvaluationMetrics: ['Weekly podcast listeners', 'Podcast hours per listener', 'Premium retention among podcast listeners'],
    clarificationQuestions: ['Is the goal engagement, margin or retention?', 'Free vs premium users?'],
    goodMetrics: ['Weekly listeners who complete 2+ episodes', 'Share of total listening hours from podcasts (margin effect)', 'Premium churn among podcast listeners vs music-only'],
    analyticalPath: ['Premium users who listen to podcasts weekly churn 20% less', 'Podcast hours are 15% of listening but cost far less than music per hour', 'One-third of podcast listeners only ever play one show'],
    synthesisModel: 'North Star: weekly listeners who complete two or more episodes, because habitual listening drives both retention and margin. Supporting: share of listening hours from podcasts and shows per listener. Guardrail: music listening hours, to avoid cannibalising the core.',
    curveball: 'Tell them a big exclusive show is leaving the platform next month. Ask how their metric would flag the impact.'
  }),
  metrics({
    id: 'metrics-cred-rewards',
    title: 'Are CRED coins rewards worth the cost?',
    company: 'CRED',
    companyColor: 'bg-zinc-900 text-white',
    companyBadge: 'Fintech',
    difficulty: 'Hard',
    problemStatement: 'CRED rewards users with coins when they pay credit card bills. Rewards cost a lot. How would you measure whether rewards are worth it, and what would you change?',
    contextBackground: 'CRED earns from commerce, lending and merchant partnerships. Bill payment is the habit that brings users back each month.',
    candidateBrief: ['What rewards are meant to cause: monthly bill payment habit', 'Incrementality: would users pay via CRED anyway?', 'Downstream revenue per rewarded user', 'Cost per incremental retained user'],
    keyEvaluationMetrics: ['Monthly bill payers', 'Reward cost per incremental payer', 'Revenue per user'],
    clarificationQuestions: ['What share of revenue comes from users who engage with rewards?', 'Can we run a reduced-rewards holdout?'],
    goodMetrics: ['Incremental monthly bill payers vs reduced-reward holdout', 'Reward cost per incremental payer', 'Commerce and lending revenue per rewarded user'],
    analyticalPath: ['A holdout with half the rewards kept 93% of bill payers', 'Users who redeem coins in the store generate 4x revenue of those who do not', 'Reward cost per user is 3x higher for users who never redeem'],
    synthesisModel: 'Most bill payment is not caused by rewards, so cut blanket rewards and redirect spend to users likely to redeem in commerce. Measure cost per incremental monthly payer and revenue per rewarded user, with bill payer retention as the guardrail.',
    dataPack: ['A holdout with half the rewards retained 93% of monthly bill payers', 'Users who redeem coins in the store generate 4x the revenue of users who do not', 'Reward cost per user is 3x higher for users who never redeem']
  }),
  metrics({
    id: 'metrics-google-search-ai-overviews',
    title: 'Measure AI answers at the top of Google Search',
    company: 'Google',
    companyColor: 'bg-brand-500 text-white',
    companyBadge: 'Search',
    difficulty: 'Hard',
    problemStatement: 'Google shows an AI-generated answer above search results for some queries. How would you measure whether this is good for users, publishers and Google?',
    contextBackground: 'The AI answer can reduce clicks to websites. Ads still show below the answer. Answer quality varies by topic.',
    candidateBrief: ['Three stakeholders with conflicting interests', 'User success beyond clicks (task completion, reformulations)', 'Publisher traffic and ecosystem health', 'Quality and safety metrics', 'Business: ad revenue per query'],
    keyEvaluationMetrics: ['Query success rate', 'Clicks to publishers', 'Answer accuracy'],
    clarificationQuestions: ['Which query types show an answer?', 'How do we define a successful search without a click?'],
    goodMetrics: ['Searches without a quick reformulation or bounce-back', 'Outbound clicks per query on answer pages', 'Rated accuracy on sampled answers, by topic risk'],
    analyticalPath: ['Reformulations fall 8% on queries with an answer', 'Outbound clicks fall 12% on those queries', 'Rated accuracy is 96% overall but 89% on health queries'],
    synthesisModel: 'Primary: query success (no quick reformulation or return), since users come to get answers. Hard guardrails: accuracy by risk tier (stricter on health) and publisher traffic, because the ecosystem feeds the answers. Track ad revenue per query as a business check, not the goal.',
    curveball: 'A large news publisher threatens to block Google\'s crawler over lost traffic. Ask what changes in their metrics or plan.'
  }),
  metrics({
    id: 'metrics-meesho-seller-cod',
    title: 'Trade-off: removing cash on delivery for low-rated sellers',
    company: 'Meesho',
    companyColor: 'bg-pink-600 text-white',
    companyBadge: 'Social Commerce',
    difficulty: 'Hard',
    problemStatement: 'Meesho tested removing cash on delivery (COD) for sellers with low ratings. Returns fell, but orders from those sellers fell more. How do you evaluate the test and decide?',
    contextBackground: 'Most Meesho buyers are in smaller cities and prefer COD. Returns and RTO are a major cost.',
    candidateBrief: ['Clarify what the test was meant to improve', 'Unit economics: cost per return vs margin per order', 'Did demand shift to better sellers or leave?', 'Fairness to sellers and buyers'],
    keyEvaluationMetrics: ['Contribution margin', 'RTO rate', 'Buyer retention'],
    clarificationQuestions: ['Did buyers switch to other sellers?', 'What is the cost of one RTO?'],
    goodMetrics: ['Platform contribution margin per buyer', 'Share of lost orders that moved to higher-rated sellers', 'Buyer 30-day repeat rate'],
    analyticalPath: ['Orders from affected sellers fell 30%, RTO fell 45%', '60% of lost orders moved to higher-rated sellers in the same category', 'Buyer repeat rate unchanged; platform contribution margin up 4%'],
    synthesisModel: 'Ship with a seller improvement path: margin rose and most demand moved to better sellers without hurting buyers. Judge by platform contribution margin and buyer repeat rate, and give low-rated sellers a clear way to earn COD back.',
    dataPack: ['Orders from affected sellers fell 30% and their RTO rate fell 45%', '60% of the lost orders moved to higher-rated sellers in the same category', 'Buyer 30-day repeat rate is unchanged', 'Platform contribution margin per buyer is up 4%']
  }),
  metrics({
    id: 'metrics-slack-ai-recap',
    title: 'Ship decision: AI channel recaps in Slack',
    company: 'Slack',
    companyColor: 'bg-brand-800 text-white',
    companyBadge: 'Collaboration',
    difficulty: 'Hard',
    problemStatement: 'Slack tested daily AI recaps of busy channels. Users who saw recaps read 25% fewer messages but replied the same amount. How do you judge whether recaps are a success and whether to charge for them?',
    contextBackground: 'Recaps cost money to generate per channel per day. Slack sells AI as a paid add-on.',
    candidateBrief: ['What does success mean: time saved, staying informed, fewer missed items', 'Fewer messages read can be good', 'Cost per recap and willingness to pay', 'Quality guardrails: missed important items'],
    keyEvaluationMetrics: ['Weekly recap readers', 'Missed-mention rate', 'Add-on conversion'],
    clarificationQuestions: ['Is this a retention or revenue feature?', 'How do we know if someone missed something important?'],
    goodMetrics: ['Weekly active recap readers', 'Replies to important threads within 24h (stayed informed)', 'Add-on trial-to-paid conversion'],
    analyticalPath: ['Replies to threads where users were mentioned are unchanged', 'Recap open rate drops from 60% in week 1 to 35% by week 4', 'Generation cost is about $0.40 per user per month'],
    synthesisModel: 'Success is staying informed with less reading, and replies held steady, so recaps work for those who keep using them. Charge as part of the AI add-on, focus recaps on the busiest channels to raise week-4 usage, and track missed-mention response time as the quality guardrail.'
  })
];
