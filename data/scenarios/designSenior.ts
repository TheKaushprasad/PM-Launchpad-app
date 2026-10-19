import { DifficultyLevel, InterviewScenario } from '../../types/interview';

/**
 * Product sense prompts modelled on real senior PM design rounds at large
 * consumer and platform companies. Each one carries a curveball taken from
 * how senior interviewers push back: segment choice, cutting scope, proving
 * it worked, unhappy paths, and trust, privacy or safety.
 */
interface SeniorDesignSeed {
  id: string;
  title: string;
  company: string;
  companyColor: string;
  companyBadge: string;
  difficulty: DifficultyLevel;
  problemStatement: string;
  contextBackground: string;
  keyEvaluationMetrics: string[];
  clarificationQuestions: string[];
  segmentsAndInsights: string[];
  analyticalPath: string[];
  synthesisModel: string;
  curveball: string;
}

const seniorDesign = (s: SeniorDesignSeed): InterviewScenario => ({
  id: s.id,
  track: 'design',
  title: s.title,
  company: s.company,
  companyColor: s.companyColor,
  companyBadge: s.companyBadge,
  difficulty: s.difficulty,
  targetDurationMinutes: s.difficulty === 'Hard' ? 35 : 30,
  problemStatement: s.problemStatement,
  contextBackground: s.contextBackground,
  candidateBrief: [
    'Clarify the business goal and tie the product to the company\'s mission before touching solutions',
    'Segment users by behaviour or need (not just age), cover the whole ecosystem, and pick one segment with explicit criteria',
    'Walk the end-to-end journey and separate real pain points from feature requests',
    'Brainstorm a range of solutions (quick fix, data/ML, moonshot) and prioritise with impact vs effort',
    'Define a North Star, funnel metrics and guardrails, then call out risks, edge cases and mitigations'
  ],
  keyEvaluationMetrics: s.keyEvaluationMetrics,
  suggestedFramework: 'Goal & mission -> Ecosystem & segment choice -> Journey & pain points -> Solutions & prioritisation -> Metrics & guardrails -> Risks & edge cases',
  benchmarkOutline: {
    clarificationQuestions: s.clarificationQuestions,
    coreHypothesesOrSegments: s.segmentsAndInsights,
    analyticalPath: s.analyticalPath,
    synthesisModel: s.synthesisModel
  },
  curveball: s.curveball
});

export const SENIOR_DESIGN_SCENARIOS: InterviewScenario[] = [
  // Consumer ecosystems & platforms
  seniorDesign({
    id: 'design-fb-marketplace-antiques',
    title: 'Design a verified antiques marketplace inside Facebook Marketplace',
    company: 'Meta',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Niche Marketplace',
    difficulty: 'Medium',
    problemStatement: 'You are a PM on Facebook Marketplace. Design a verified antiques marketplace that lives inside Marketplace.',
    contextBackground: 'Antiques are high-value, one-of-a-kind items. Buyers worry about fakes and condition; sellers range from people clearing a relative\'s house to professional dealers. Marketplace today is built for quick, local, low-value deals.',
    keyEvaluationMetrics: ['Ecosystem segmentation (buyers, sellers, verifiers)', 'Trust and authenticity design', 'Liquidity vs quality trade-off', 'Guardrails for high-value transactions'],
    clarificationQuestions: ['Is the goal new users, more transactions or revenue from fees?', 'Local pickup only, or shipping too?', 'Do we verify ourselves or partner with appraisers?'],
    segmentsAndInsights: ['Buyers split by intent: serious collectors vs casual decor buyers', 'Sellers split by expertise: one-off estate sellers vs dealers', 'Collectors are the underserved, high-value segment; trust (authenticity, condition) is the core pain'],
    analyticalPath: ['Journey: discover > assess authenticity > negotiate > pay > collect/ship > dispute', 'Solutions: verified-seller badge, appraiser partner network, condition-report template, escrow for items over a threshold, collector alerts by category', 'Metrics: North Star = completed verified sales; guardrails = dispute rate, counterfeit reports, time to first sale'],
    synthesisModel: 'Start with collectors buying from verified dealers: condition reports, partner appraisals and escrow above a price threshold. Measure completed verified sales, guarded by dispute and counterfeit rates.',
    curveball: 'Ask why they chose that segment over the other main group of buyers or sellers, and what they give up by not serving them first.'
  }),
  seniorDesign({
    id: 'design-facebook-groups-engagement',
    title: 'Improve Facebook Groups for members and admins',
    company: 'Meta',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Community Platform',
    difficulty: 'Medium',
    problemStatement: 'How would you improve Facebook Groups to drive deeper member engagement and empower group admins?',
    contextBackground: 'Groups are central to Meta\'s mission of building community. Most members lurk; a small number of admins and moderators do the work of keeping groups healthy and burn out.',
    keyEvaluationMetrics: ['Mission alignment', 'Admin vs member trade-offs', 'Lurker-to-contributor journey', 'Health guardrails (spam, toxicity)'],
    clarificationQuestions: ['What kind of groups: hobby, local, support, buy-sell?', 'Is the goal engagement per member or more healthy groups?', 'Any constraints on admin tooling or moderation policy?'],
    segmentsAndInsights: ['Admins (founders, volunteer moderators) vs members (lurkers, occasional posters, power contributors)', 'Admin burnout limits group health, which limits member value', 'Lurkers do not post because they fear judgement or do not know the norms'],
    analyticalPath: ['Admin pains: spam triage, onboarding new members, rule enforcement', 'Member pains: noise, no reason to contribute, hard to find past answers', 'Solutions: AI-assisted moderation queue, welcome flows with low-risk first actions, group knowledge pages, contributor recognition', 'Metrics: North Star = weekly meaningful interactions per member; guardrails = reports per post, admin hours spent, member leave rate'],
    synthesisModel: 'Lead with admin tooling (assisted moderation and onboarding) because healthy groups drive member engagement. Measure meaningful interactions per member with admin time and report-rate guardrails.',
    curveball: 'Tell them they only have 3 engineers for one quarter. Ask what they ship first and what they cut.'
  }),
  seniorDesign({
    id: 'design-meta-communal-audio',
    title: 'Design an audio product for Meta that brings people together',
    company: 'Meta',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Audio & Creators',
    difficulty: 'Hard',
    problemStatement: 'Design a new audio product or feature for Meta that fosters communal listening and connects listeners with creators.',
    contextBackground: 'Meta has huge social graphs across Facebook, Instagram and WhatsApp but no strong audio product. Spotify and YouTube dominate listening. Live audio rooms had a short boom and then faded.',
    keyEvaluationMetrics: ['Why Meta wins (social graph advantage)', 'Listener vs creator ecosystem', 'Learning from failed live audio', 'Engagement without addiction'],
    clarificationQuestions: ['Music, podcasts, or live talk?', 'Which app is the home for this?', 'Is the goal time spent, connection, or creator monetisation?'],
    segmentsAndInsights: ['Listeners (friends who listen together, fans of a creator) and creators (musicians, podcasters, hosts)', 'Meta\'s edge is who you listen with, not the catalogue', 'Live audio faded because discovery was poor and good rooms were rare'],
    analyticalPath: ['Journey: discover > join > listen together > react > follow creator > return', 'Solutions: shared listening sessions in group chats, creator listening parties with Q&A, audio replies in Stories', 'Metrics: North Star = weekly co-listening sessions with 2+ friends; guardrails = session quality, creator retention, reports'],
    synthesisModel: 'Shared listening inside group chats and creator listening parties, built on the social graph rather than a catalogue. Measure co-listening sessions, guarded by creator retention and quality signals.',
    curveball: 'Ask how they would know this is not just repeating why live audio rooms faded, and what early signal would tell them to stop.'
  }),
  seniorDesign({
    id: 'design-meta-offline-fitness',
    title: 'Design a fitness app for Meta that connects people offline',
    company: 'Meta',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Health & Social',
    difficulty: 'Medium',
    problemStatement: 'Design a fitness application for Meta that connects users in real life while staying true to Meta\'s social mission.',
    contextBackground: 'People stick with exercise when they do it with others. Strava and running clubs show demand, but most people lack a nearby buddy at the right level and time.',
    keyEvaluationMetrics: ['Mission tie-in', 'Motivation-based segmentation', 'Safety of meeting strangers', 'Retention vs engagement metrics'],
    clarificationQuestions: ['Standalone app or inside Facebook/Instagram?', 'Which activities: running, gym, sports?', 'Is safety of meeting strangers in scope?'],
    segmentsAndInsights: ['Segment by motivation: beginners needing accountability, regulars wanting a group, competitive athletes', 'Beginners drop off fastest and benefit most from a partner', 'Meeting strangers raises safety concerns, especially for women'],
    analyticalPath: ['Pains: no partner at my level, schedules clash, fear of meeting strangers', 'Solutions: friend-of-friend workout matching, local group sessions run by verified hosts, shared streaks', 'Metrics: North Star = weekly in-person sessions attended; guardrails = safety reports, no-show rate'],
    synthesisModel: 'Friend-of-friend matching for beginners plus verified local group sessions. Measure in-person sessions attended, guarded by safety reports and no-shows.',
    curveball: 'Ask what happens when someone does not show up, or a user feels unsafe during a meetup. What does the product do in that moment?'
  }),
  seniorDesign({
    id: 'design-instagram-close-friends-genz',
    title: 'Improve Instagram Stories for close-friends sharing among Gen Z',
    company: 'Instagram',
    companyColor: 'bg-pink-600 text-white',
    companyBadge: 'Ephemeral Sharing',
    difficulty: 'Medium',
    problemStatement: 'How would you improve Instagram Stories to boost close-friends engagement and retention among Gen Z users?',
    contextBackground: 'Gen Z increasingly shares with small circles (finstas, group chats, BeReal) rather than all followers. Posting to everyone feels performative.',
    keyEvaluationMetrics: ['Behavioural segmentation within Gen Z', 'Creator vs viewer pains', 'Privacy and pressure trade-offs', 'Retention metrics over vanity metrics'],
    clarificationQuestions: ['Goal: more posting, more replies, or retention?', 'Close Friends list only, or other small circles?', 'Any constraints on ranking changes?'],
    segmentsAndInsights: ['Segment by sharing behaviour: frequent sharers, lurkers who reply, anxious non-posters', 'The pain is pressure and audience anxiety, not missing features', 'Managing one Close Friends list for every context is clumsy'],
    analyticalPath: ['Pains: one list fits nobody, fear of judgement, replies get lost in DMs', 'Solutions: multiple named circles, low-effort prompts to share with circles, reply threads on circle stories', 'Metrics: North Star = weekly users sharing to a circle; guardrails = report rate, unfollows, overall Story views'],
    synthesisModel: 'Multiple named circles with low-pressure prompts for anxious non-posters. Measure weekly circle sharers, guarded by overall Story views and reports.',
    curveball: 'Ask how they make sure this does not just increase screen time or social pressure on teenagers.'
  }),
  seniorDesign({
    id: 'design-x-screen-reader-accessibility',
    title: 'Improve X (Twitter) for people who use screen readers',
    company: 'X (Twitter)',
    companyColor: 'bg-zinc-800 text-white',
    companyBadge: 'Accessibility',
    difficulty: 'Medium',
    problemStatement: 'How would you improve X (formerly Twitter) for visually impaired users who rely on screen readers?',
    contextBackground: 'Screen readers read the feed linearly. Images often lack alt text, threads and quote posts are confusing to navigate, and emoji-heavy or stylised text is read out character by character.',
    keyEvaluationMetrics: ['Segmentation by capability, not demographics', 'Journey across read, post and navigate', 'Creator-side incentives (alt text)', 'Measuring accessibility outcomes'],
    clarificationQuestions: ['Fully blind or low-vision users too?', 'iOS, Android or web first?', 'Is the goal retention of these users or compliance?'],
    segmentsAndInsights: ['Segment by capability: fully blind screen reader users, low-vision users with magnification, situational users', 'Other users create most of the problem (missing alt text, stylised text)', 'Navigation cost per post is the hidden pain'],
    analyticalPath: ['Pains: images without descriptions, long threads, fancy Unicode text, noisy UI labels', 'Solutions: AI-generated alt text with creator review, thread summary and jump controls, plain reading of stylised text, alt-text nudges for creators', 'Metrics: North Star = weekly active screen-reader users; supporting = share of images with alt text; guardrail = AI description accuracy'],
    synthesisModel: 'AI alt text with creator review and better thread navigation for screen reader users. Measure their weekly activity and alt-text coverage, guarded by description accuracy.',
    curveball: 'Ask what happens when the AI description of an image is wrong or offensive, and how they would detect it.'
  }),
  seniorDesign({
    id: 'design-whatsapp-elderly-users',
    title: 'Adapt WhatsApp for elderly users',
    company: 'WhatsApp',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Intergenerational Messaging',
    difficulty: 'Easy',
    problemStatement: 'How would you adapt WhatsApp to improve engagement and overcome communication barriers for elderly users?',
    contextBackground: 'Many older users depend on WhatsApp to stay in touch with family, but struggle with small text, forwarded misinformation, scams and features hidden in menus.',
    keyEvaluationMetrics: ['Segmentation by tech comfort', 'Family ecosystem (helpers)', 'Scam and misinformation guardrails', 'Simplicity vs capability'],
    clarificationQuestions: ['Which markets?', 'Engagement with family, or reducing harm?', 'Separate mode or changes for everyone?'],
    segmentsAndInsights: ['Segment by tech comfort: confident, dependent on family help, first-time smartphone users', 'Family members are enablers and should be part of the design', 'Scams and forwards are a safety problem, not just UX'],
    analyticalPath: ['Pains: small text, accidental calls, scam messages, cannot find photos family sent', 'Solutions: simple mode set up by a family member, voice-first replies, scam warnings on unknown senders, forwarded-many-times labels', 'Metrics: North Star = weekly family conversations by elderly users; guardrails = scam reports, accidental call rate'],
    synthesisModel: 'A family-assisted simple mode with voice replies and scam warnings. Measure weekly family conversations, guarded by scam reports.',
    curveball: 'Ask how they would stop scammers from abusing the family-helper setup to take over an elderly user\'s account.'
  }),

  // Hardware & physical products
  seniorDesign({
    id: 'design-kids-smart-fridge',
    title: 'Design a connected fridge for school kids and busy parents',
    company: 'Samsung / LG',
    companyColor: 'bg-brand-600 text-white',
    companyBadge: 'Smart Home Hardware',
    difficulty: 'Medium',
    problemStatement: 'Design a connected home refrigerator specifically for elementary school children and their busy parents.',
    contextBackground: 'Kids snack unsupervised after school; parents worry about junk food and wasted groceries. Smart fridges exist but are built for adults and are expensive.',
    keyEvaluationMetrics: ['Two-sided users (child and parent)', 'Hardware constraints', 'Child safety and privacy', 'Simple vs smart trade-offs'],
    clarificationQuestions: ['New fridge or add-on device?', 'Price point?', 'Age range of children and reading ability?'],
    segmentsAndInsights: ['Children (pre-readers vs readers) and parents (working, at-home)', 'Kids need picture-based, playful cues; parents want control from their phone', 'Cameras and data about children raise privacy concerns'],
    analyticalPath: ['Journey: kid comes home > opens fridge > picks snack > parent knows', 'Solutions: kid zone with lit, picture-labelled healthy picks, parent app to set snack rules, low-stock alerts', 'Metrics: North Star = share of after-school snacks from the healthy zone; guardrails = parent app opt-outs, energy use'],
    synthesisModel: 'A kid-friendly snack zone with picture cues and parent-set rules, plus restock alerts. Measure healthy-snack share, guarded by opt-outs.',
    curveball: 'Ask what happens when the child\'s hands are wet or sticky, or they cannot read yet. How does the design still work?'
  }),
  seniorDesign({
    id: 'design-airport-atm-elderly',
    title: 'Design an airport ATM for elderly travellers',
    company: 'Global Bank',
    companyColor: 'bg-brand-600 text-white',
    companyBadge: 'Accessible Hardware',
    difficulty: 'Medium',
    problemStatement: 'Design a specialised ATM inside an international airport tailored for elderly travellers.',
    contextBackground: 'Older travellers arriving in a new country need local cash fast, while tired, rushed and sometimes confused by currency, fees and unfamiliar machines. Card skimming and shoulder-surfing are common at airports.',
    keyEvaluationMetrics: ['Physical and cognitive accessibility', 'Fee transparency', 'Fraud and safety', 'Failure states (card swallowed, language)'],
    clarificationQuestions: ['Arrivals or departures?', 'Are we the bank or the airport?', 'Foreign cards supported?'],
    segmentsAndInsights: ['Segment by need: low vision, hearing loss, low tech confidence, first-time international traveller', 'The core pains are confusion about fees/exchange rates and fear of fraud', 'Time pressure makes mistakes likely'],
    analyticalPath: ['Journey: find ATM > choose language > insert card > pick amount > fees > collect cash and card', 'Solutions: large high-contrast screen with voice guidance, plain fee display in home currency, suggested amounts, privacy hood, help button to a live agent', 'Metrics: North Star = successful withdrawals per elderly user; guardrails = card retentions, fraud reports, abandonment'],
    synthesisModel: 'A high-contrast, voice-guided ATM with home-currency fee display and a live help button. Measure successful withdrawals, guarded by abandonment and fraud.',
    curveball: 'Ask what happens when the machine keeps the user\'s card and their flight connection is in 40 minutes.'
  }),
  seniorDesign({
    id: 'design-smart-garage-door',
    title: 'Design a smart garage door opener focused on safety and accessibility',
    company: 'Chamberlain',
    companyColor: 'bg-brand-600 text-white',
    companyBadge: 'Smart Home Hardware',
    difficulty: 'Easy',
    problemStatement: 'Design a next-generation smart garage door opener focused on home safety and accessibility.',
    contextBackground: 'Garage doors are a common break-in route and a crushing hazard for children and pets. Many users forget to close them; older users and wheelchair users struggle with remotes and wall buttons.',
    keyEvaluationMetrics: ['Safety-first framing', 'Segmentation by need', 'Failure modes (power, connectivity)', 'Simplicity'],
    clarificationQuestions: ['Retrofit or new install?', 'Must it work without internet?', 'Price constraints?'],
    segmentsAndInsights: ['Families with small kids/pets, people with mobility limits, frequent travellers', 'Forgetting the door open and unsafe closing are the top risks', 'Connectivity cannot be a single point of failure'],
    analyticalPath: ['Solutions: auto-close with obstruction sensing, open-door alerts, geofenced open/close, voice and large-button controls, manual override', 'Metrics: North Star = nights with door secured; guardrails = false-close incidents, app disconnects'],
    synthesisModel: 'Auto-close with obstruction sensing, open-door alerts and accessible controls, all working offline. Measure secured nights, guarded by false closes.',
    curveball: 'Ask what happens during a power cut or when the Wi-Fi is down and someone needs to get the car out.'
  }),

  // Travel, location & local services
  seniorDesign({
    id: 'design-google-maps-parking',
    title: 'Google Maps: a parking marketplace for spot owners and drivers',
    company: 'Google Maps',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Two-sided Marketplace',
    difficulty: 'Hard',
    problemStatement: 'You are a PM on Google Maps. Design a parking solution that connects urban spot owners with drivers who need short-term parking.',
    contextBackground: 'In dense cities drivers circle for parking while private spots (homes, offices, shops) sit empty for hours. Maps already knows where drivers are heading and when they will arrive.',
    keyEvaluationMetrics: ['Two-sided ecosystem and liquidity', 'Segment choice with explicit criteria', 'Trust and access logistics', 'Maps-native advantage'],
    clarificationQuestions: ['Which cities first?', 'Do we take payments?', 'Private spots only, or public lots too?'],
    segmentsAndInsights: ['Supply: homeowners, offices, small businesses, public lots. Demand: commuters, errand runners, event-goers', 'Individual spot owners are underserved and add supply where it is scarcest', 'Liquidity in a small area matters more than coverage'],
    analyticalPath: ['Journey: plan trip > see parking at destination > reserve > navigate to spot > access > pay > leave', 'Solutions: parking layer at destination, reserve-and-navigate, owner listing with time windows, access codes', 'Metrics: North Star = completed reservations; guardrails = no-access incidents, owner churn, time-to-park'],
    synthesisModel: 'A reserve-and-navigate parking layer launched in one dense area, seeded with small business and home spots. Measure completed reservations, guarded by access failures and owner churn.',
    curveball: 'Ask why they prioritised individual spot owners over government and public parking lots, and how their answer changes if liquidity is slow.'
  }),
  seniorDesign({
    id: 'design-google-maps-trip-planning',
    title: 'Google Maps: plan multi-day trips and itineraries',
    company: 'Google Maps',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Travel Planning',
    difficulty: 'Medium',
    problemStatement: 'Design a trip planning and itinerary feature inside Google Maps to capture long-distance travel engagement.',
    contextBackground: 'Travellers plan across blogs, spreadsheets, booking sites and saved lists. Maps is used heavily during the trip but rarely for planning it.',
    keyEvaluationMetrics: ['Clear goal (planning engagement vs bookings)', 'Planner vs on-trip journey', 'Decision fatigue', 'Ecosystem (partners, creators)'],
    clarificationQuestions: ['Goal: planning engagement, bookings or retention?', 'Solo, couples or groups?', 'Do we include bookings?'],
    segmentsAndInsights: ['Detailed planners, spontaneous travellers, group organisers', 'Decision fatigue and scattered information are the core pains', 'Maps already has places, reviews and travel times'],
    analyticalPath: ['Solutions: day-by-day plan built from saved places with realistic travel times, AI draft itinerary to edit, shareable group plans, offline trip pack', 'Metrics: North Star = trips with an itinerary used during travel; guardrails = itinerary abandonment, satisfaction'],
    synthesisModel: 'A day-by-day planner from saved places with real travel times and group sharing. Measure itineraries used on the trip.',
    curveball: 'Ask what V1 looks like if they had only 3 weeks, and what moves to V2.'
  }),
  seniorDesign({
    id: 'design-local-experiences-travel-startup',
    title: 'Design a travel startup built on local experiences',
    company: 'Travel startup',
    companyColor: 'bg-amber-600 text-white',
    companyBadge: 'Zero to One',
    difficulty: 'Medium',
    problemStatement: 'You are building a new travel startup. Design a platform centred on discovering local itineraries and unique experiences.',
    contextBackground: 'Big platforms surface the same top-10 attractions. Locals and small guides offer great experiences but are hard to find and trust. A startup has little money and no brand.',
    keyEvaluationMetrics: ['Startup constraints and wedge', 'Supply vs demand cold start', 'Trust and quality control', 'Differentiation from incumbents'],
    clarificationQuestions: ['One city or many?', 'Who are the experience providers?', 'Funding and team size?'],
    segmentsAndInsights: ['Travellers wanting authentic experiences; local hosts and guides', 'Cold start: supply quality must come first', 'Trust is the main reason travellers stick to big platforms'],
    analyticalPath: ['Solutions: curated hosts in one city, local-made itineraries, verified reviews, instant booking', 'Metrics: North Star = experiences completed with 5-star ratings; guardrails = cancellation rate, host churn'],
    synthesisModel: 'Start with one city and hand-curated local hosts and itineraries. Measure highly rated completed experiences.',
    curveball: 'Ask what stops a big travel platform from copying them within six months.'
  }),
  seniorDesign({
    id: 'design-airbnb-post-booking-failures',
    title: 'Fix the worst post-booking failures for Airbnb guests',
    company: 'Airbnb',
    companyColor: 'bg-rose-600 text-white',
    companyBadge: 'Trust & Reliability',
    difficulty: 'Hard',
    problemStatement: 'How would you fix the worst post-booking failure points for Airbnb guests, such as last-minute host cancellations or missing keys?',
    contextBackground: 'Most stays go well, but failures after booking (cancellations, check-in problems, listing not as described) hurt trust far more than any search improvement helps.',
    keyEvaluationMetrics: ['Journey mapping after booking', 'Prioritising by severity and frequency', 'Operational fallback design', 'Host vs guest incentives'],
    clarificationQuestions: ['Which failures are most frequent vs most severe?', 'Who pays for fixes?', 'Any markets in focus?'],
    segmentsAndInsights: ['Guests by trip type: families, business, late-night arrivals', 'Hosts by type: professional vs casual', 'Severity is highest when the guest is already travelling'],
    analyticalPath: ['Journey: booked > pre-arrival > travel > check-in > stay > checkout', 'Solutions: cancellation risk prediction, automatic rebooking with credit, check-in readiness checklist, 24/7 rapid response', 'Metrics: North Star = stays without a serious incident; guardrails = rebooking cost, host cancellation rate'],
    synthesisModel: 'Predict risky bookings early and automatically rebook guests at Airbnb\'s cost when it fails. Measure incident-free stays, guarded by rebooking cost.',
    curveball: 'Tell them a host cancels 10 minutes before a family arrives late at night. Ask exactly what the product does in the next 10 minutes.'
  })
];
