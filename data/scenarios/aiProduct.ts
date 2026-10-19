import { DifficultyLevel, InterviewScenario } from '../../types/interview';

/**
 * AI Product Sense round: design an AI feature, decide how to evaluate it,
 * and handle model failure modes, cost and trust. Increasingly common in
 * PM loops from 2025 onwards.
 */
interface AiSeed {
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
  keyIdeas: string[];
  analyticalPath: string[];
  synthesisModel: string;
  curveball?: string;
}

const ai = (s: AiSeed): InterviewScenario => ({
  id: s.id,
  track: 'ai',
  title: s.title,
  company: s.company,
  companyColor: s.companyColor,
  companyBadge: s.companyBadge,
  difficulty: s.difficulty,
  targetDurationMinutes: s.difficulty === 'Easy' ? 20 : s.difficulty === 'Medium' ? 25 : 30,
  problemStatement: s.problemStatement,
  contextBackground: s.contextBackground,
  candidateBrief: [
    'Start from the user problem, not the model: is AI the right tool here?',
    'Describe the experience and where the model fits in it',
    'Define what "good output" means and how you would evaluate it before and after launch',
    'Name the failure modes (wrong answers, bias, privacy, cost) and how you contain them',
    'Close with a launch plan and success metrics'
  ],
  keyEvaluationMetrics: s.keyEvaluationMetrics,
  suggestedFramework: 'User and problem -> Is AI the right tool? -> Experience design and human-in-the-loop -> Quality bar and evaluation -> Risks, cost and latency -> Staged launch and metrics',
  benchmarkOutline: {
    clarificationQuestions: s.clarificationQuestions,
    coreHypothesesOrSegments: s.keyIdeas,
    analyticalPath: s.analyticalPath,
    synthesisModel: s.synthesisModel
  },
  curveball: s.curveball
});

export const AI_PRODUCT_SCENARIOS: InterviewScenario[] = [
  ai({
    id: 'ai-email-reply-drafts',
    title: 'Design AI reply drafts for a customer support inbox',
    company: 'Freshworks',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'B2B SaaS',
    difficulty: 'Easy',
    problemStatement: 'Freshdesk agents answer hundreds of tickets a day. Design an AI feature that drafts replies for them. How would you build it and know it works?',
    contextBackground: 'Customers are mid-size businesses. Wrong answers to their customers could cause refunds or churn. Agents are measured on handle time and satisfaction.',
    keyEvaluationMetrics: ['Draft acceptance rate', 'Handle time', 'CSAT'],
    clarificationQuestions: ['Which ticket types first?', 'Does the AI have the company\'s help articles?', 'Can drafts ever be sent without an agent?'],
    keyIdeas: ['Agent always reviews before sending', 'Ground drafts in the knowledge base with citations', 'Start with high-volume, low-risk ticket types'],
    analyticalPath: ['Offline eval on past tickets rated by senior agents', 'Measure edit distance between draft and sent reply', 'Guardrail: CSAT and reopen rate'],
    synthesisModel: 'Agent-in-the-loop drafts grounded in help articles, launched on two high-volume ticket types. Success: handle time down with CSAT and reopen rate flat or better; acceptance rate and edit distance track quality.'
  }),
  ai({
    id: 'ai-recipe-assistant',
    title: 'AI cooking assistant for a recipe app',
    company: 'Swiggy',
    companyColor: 'bg-orange-500 text-white',
    companyBadge: 'Food & Grocery',
    difficulty: 'Easy',
    problemStatement: 'Swiggy wants an AI assistant that suggests what to cook from what you have at home and adds missing items to an Instamart cart. Design it.',
    contextBackground: 'Users vary from students to families. Some have dietary restrictions or allergies.',
    keyEvaluationMetrics: ['Recipes cooked', 'Instamart conversion', 'Allergy-safe suggestions'],
    clarificationQuestions: ['Who is the main user?', 'How does the assistant know what is at home?', 'How are allergies captured?'],
    keyIdeas: ['Simple input (photo or quick list)', 'Hard constraint filters for allergies, not left to the model', 'One-tap add missing items'],
    analyticalPath: ['Eval set of pantries and restrictions with expected safe outputs', 'Measure suggestion-to-cart and cart-to-order', 'Track allergy violations as a zero-tolerance metric'],
    synthesisModel: 'Start with a photo-or-list input for students and young families, enforce allergies with rules outside the model, and measure missing-item cart conversion with allergy violations at zero.'
  }),
  ai({
    id: 'ai-resume-feedback',
    title: 'AI resume feedback for job seekers',
    company: 'LinkedIn',
    companyColor: 'bg-brand-700 text-white',
    companyBadge: 'Professional Network',
    difficulty: 'Easy',
    problemStatement: 'Design an AI feature on LinkedIn that gives job seekers feedback on their resume for a specific job posting.',
    contextBackground: 'Users worry about privacy and about AI making every resume sound the same. Recruiters dislike exaggerated claims.',
    keyEvaluationMetrics: ['Feedback applied', 'Interview rate', 'Honesty complaints'],
    clarificationQuestions: ['Free or premium?', 'Does feedback rewrite text or suggest changes?'],
    keyIdeas: ['Suggestions the user accepts, not auto-rewrites', 'Never invent experience', 'Tie to the job\'s requirements'],
    analyticalPath: ['Human-rated eval of suggestions for accuracy and helpfulness', 'Compare recruiter response rate for users who applied suggestions', 'Monitor fabricated-claim reports'],
    synthesisModel: 'Suggest, don\'t rewrite; ground suggestions in the user\'s real experience and the job\'s requirements. Measure recruiter response rate lift and keep fabricated claims near zero.'
  }),
  ai({
    id: 'ai-upi-fraud-alerts',
    title: 'AI warnings for UPI payment scams',
    company: 'PhonePe',
    companyColor: 'bg-brand-700 text-white',
    companyBadge: 'Payments',
    difficulty: 'Medium',
    problemStatement: 'Design an AI feature that warns PhonePe users before they pay a likely scammer. How would you build and evaluate it?',
    contextBackground: 'Scams often use urgency ("your account will be blocked"). False alarms annoy users and slow payments; missed scams cost users money and trust.',
    keyEvaluationMetrics: ['Scam losses prevented', 'False positive rate', 'Payment completion'],
    clarificationQuestions: ['What signals do we have (payee history, reports, message context)?', 'Should we block or warn?', 'What is an acceptable false-positive rate?'],
    keyIdeas: ['Warn with a reason, block only on high confidence', 'Precision vs recall trade-off set by loss size', 'Feedback loop from user reports'],
    analyticalPath: ['Backtest on labelled past scam reports', 'Measure precision and recall by amount bucket', 'Holdout to measure prevented losses'],
    synthesisModel: 'Risk-scored warnings with clear reasons, stricter thresholds for large amounts and new payees, blocking only at very high confidence. Measure prevented losses against a holdout, with false positives and payment completion as guardrails.',
    curveball: 'Scammers start telling victims to ignore PhonePe warnings. Ask what changes.'
  }),
  ai({
    id: 'ai-meeting-notes',
    title: 'AI meeting notes and action items',
    company: 'Microsoft',
    companyColor: 'bg-brand-600 text-white',
    companyBadge: 'Productivity',
    difficulty: 'Medium',
    problemStatement: 'Design AI-generated meeting notes and action items for Microsoft Teams. How do you define quality and launch it responsibly?',
    contextBackground: 'Meetings can include confidential topics. Some participants may not want to be recorded.',
    keyEvaluationMetrics: ['Notes viewed and shared', 'Action items completed', 'Accuracy ratings'],
    clarificationQuestions: ['Who triggers it and who sees the notes?', 'What about consent from all participants?', 'Which languages?'],
    keyIdeas: ['Consent and visibility controls', 'Action items with owners, editable', 'Quality = faithful, complete, no invented decisions'],
    analyticalPath: ['Eval set of meetings with reference notes', 'Score faithfulness (no hallucinated decisions) and coverage', 'Track edit rate and share rate after launch'],
    synthesisModel: 'Opt-in with clear notice to all participants, editable notes and action items with owners. Quality bar: no invented decisions, measured on a reference set. Launch internally first; success is notes shared and action items completed.'
  }),
  ai({
    id: 'ai-shopping-assistant',
    title: 'Conversational shopping assistant',
    company: 'Flipkart',
    companyColor: 'bg-brand-600 text-white',
    companyBadge: 'E-commerce',
    difficulty: 'Medium',
    problemStatement: 'Flipkart wants a chat assistant that helps shoppers decide what to buy, for example "a phone under ₹20,000 with a good camera". Design it and decide how to measure it.',
    contextBackground: 'Many users are first-time online shoppers and use regional languages. Sellers pay for ads and want visibility.',
    keyEvaluationMetrics: ['Assisted conversion', 'Return rate', 'Answer accuracy'],
    clarificationQuestions: ['Which categories first?', 'Can sponsored products appear in answers?', 'Which languages?'],
    keyIdeas: ['Ground in catalogue and reviews, show specs side by side', 'Label sponsored items clearly', 'Measure regret (returns), not just conversion'],
    analyticalPath: ['Eval of spec accuracy against catalogue', 'Assisted vs unassisted conversion in an A/B test', 'Returns for "not as expected" as the regret metric'],
    synthesisModel: 'Start with phones and appliances in Hindi and English, ground every claim in catalogue data, and label sponsored results. Success is assisted conversion with returns for "not as expected" flat or lower.',
    curveball: 'The ads team wants sponsored products ranked first in every answer. Ask how they respond.'
  }),
  ai({
    id: 'ai-tutor-maths',
    title: 'AI maths tutor for school students',
    company: 'Byju\'s',
    companyColor: 'bg-brand-700 text-white',
    companyBadge: 'EdTech',
    difficulty: 'Medium',
    problemStatement: 'Design an AI tutor that helps class 8 to 10 students with maths homework without just giving them the answers.',
    contextBackground: 'Parents pay. Teachers worry about cheating. Models sometimes make arithmetic mistakes.',
    keyEvaluationMetrics: ['Learning gains', 'Session completion', 'Maths accuracy'],
    clarificationQuestions: ['Who is the buyer and who is the user?', 'How do we measure learning?', 'What happens when the model is wrong?'],
    keyIdeas: ['Socratic hints, step checking rather than final answers', 'Verify maths with a calculator or solver, not the model alone', 'Parent view of progress'],
    analyticalPath: ['Accuracy eval on a bank of solved problems', 'Pre/post quiz scores versus a control group', 'Monitor answer-only requests and cheating patterns'],
    synthesisModel: 'Hint-first tutoring with a maths engine checking every step. Success is improvement on independent quizzes compared with a control group; maths accuracy is a launch gate.'
  }),
  ai({
    id: 'ai-medical-symptom',
    title: 'Should a health app add an AI symptom checker?',
    company: 'Practo',
    companyColor: 'bg-brand-500 text-white',
    companyBadge: 'HealthTech',
    difficulty: 'Hard',
    problemStatement: 'Practo is considering an AI symptom checker that tells users what might be wrong and whether to see a doctor. Should they build it, and if so, how?',
    contextBackground: 'Wrong advice could harm people. The business earns from doctor consultations. Regulation of medical advice is tightening.',
    keyEvaluationMetrics: ['Correct triage rate', 'Under-triage of emergencies', 'Consultations booked'],
    clarificationQuestions: ['Is the goal triage or diagnosis?', 'Who is liable?', 'Which conditions are in scope?'],
    keyIdeas: ['Triage (urgency and specialty), not diagnosis', 'Emergency symptoms routed by rules, not the model', 'Clinician-reviewed evaluation set'],
    analyticalPath: ['Clinician-labelled cases to measure triage accuracy', 'Under-triage of emergencies as a zero-tolerance gate', 'Staged launch with clinician review of samples'],
    synthesisModel: 'Build a triage tool, not a diagnosis tool: hard rules for red-flag symptoms, clinician-validated evaluation with under-triage as a launch gate, and clear routing to doctors. Measure correct triage and safe consultations booked, not engagement.',
    curveball: 'A news story reports another app\'s AI told a user with chest pain to rest at home. Ask what changes in their plan.'
  }),
  ai({
    id: 'ai-content-moderation',
    title: 'AI moderation for comments in regional languages',
    company: 'ShareChat',
    companyColor: 'bg-yellow-400 text-black',
    companyBadge: 'Social Media',
    difficulty: 'Hard',
    problemStatement: 'ShareChat gets millions of comments a day in 15 Indian languages. Design an AI moderation system and explain how you would evaluate it.',
    contextBackground: 'Human moderators cannot keep up. Over-removal angers creators; under-removal lets abuse spread. Some languages have little labelled data.',
    keyEvaluationMetrics: ['Precision and recall by language', 'Time to action', 'Appeal overturn rate'],
    clarificationQuestions: ['What policies (hate, harassment, spam)?', 'Remove, hide or down-rank?', 'How much human review capacity is there?'],
    keyIdeas: ['Confidence tiers: auto-action, human review, allow', 'Per-language thresholds and evaluation', 'Appeals as a feedback signal'],
    analyticalPath: ['Labelled eval set per language, including slang and code-mixing', 'Precision/recall by language and policy', 'Appeal overturn rate as a live precision check'],
    synthesisModel: 'Tiered system: auto-hide only at high confidence, human review in the middle band, per-language thresholds tuned on labelled sets. Measure prevalence of violating content seen, with appeal overturn rate and creator complaints as guardrails.',
    curveball: 'An election is coming and political abuse is spiking in two languages with little training data. Ask what they do this month.'
  }),
  ai({
    id: 'ai-coding-assistant-pricing',
    title: 'Launch and price an AI coding assistant',
    company: 'GitHub',
    companyColor: 'bg-zinc-900 text-white',
    companyBadge: 'Developer Tools',
    difficulty: 'Hard',
    problemStatement: 'You are launching an AI coding assistant for enterprise teams. Each request costs real money to serve. How would you measure value and set pricing?',
    contextBackground: 'Heavy users can cost 20x more to serve than light users. Buyers are engineering leaders who want proof of productivity.',
    keyEvaluationMetrics: ['Accepted suggestions', 'Developer productivity', 'Gross margin per seat'],
    clarificationQuestions: ['Who buys and who uses?', 'How do we show productivity gains to the buyer?', 'What is the cost distribution?'],
    keyIdeas: ['Measure retained code, not just accepted suggestions', 'Per-seat price with fair-use limits or usage tiers', 'Admin dashboard proving value'],
    analyticalPath: ['Acceptance rate and share of accepted code still present after 30 days', 'Controlled study of task completion time', 'Cost per seat by usage decile'],
    synthesisModel: 'Prove value with retained-code and task-time studies shown in an admin dashboard. Price per seat with a fair-use cap and a premium tier for heavy users so margin stays positive across deciles.'
  }),
  ai({
    id: 'ai-travel-agent',
    title: 'An AI agent that books trips end to end',
    company: 'MakeMyTrip',
    companyColor: 'bg-red-600 text-white',
    companyBadge: 'Travel',
    difficulty: 'Hard',
    problemStatement: 'MakeMyTrip wants an AI agent that plans and books a whole trip (flights, hotel, cabs) from one request. Design it, and explain how you would stop it making costly mistakes.',
    contextBackground: 'Bookings involve real money and cancellation fees. Prices change minute to minute.',
    keyEvaluationMetrics: ['Trips booked via agent', 'Booking error rate', 'Cancellations and support contacts'],
    clarificationQuestions: ['Which trip types first?', 'Does the agent pay automatically or ask for confirmation?', 'How does it handle price changes?'],
    keyIdeas: ['Agent plans, human confirms one itinerary with total price', 'Hard checks on dates, names and refund rules before payment', 'Narrow scope first (domestic weekend trips)'],
    analyticalPath: ['Simulated booking tasks with expected itineraries', 'Booking error rate (wrong date, name, city) as a launch gate', 'Support contacts and cancellations per agent booking'],
    synthesisModel: 'Start with domestic weekend trips: the agent drafts a complete itinerary, the user confirms once with the full price, and rule-based checks run before payment. Launch only when booking error rate is below the human-booking baseline.',
    curveball: 'A bug causes the agent to book a wrong date for 200 users. Ask how they handle the next 24 hours.'
  }),
  ai({
    id: 'ai-should-we-use-ai',
    title: 'Does this problem even need AI?',
    company: 'Zerodha',
    companyColor: 'bg-brand-600 text-white',
    companyBadge: 'Fintech',
    difficulty: 'Medium',
    problemStatement: 'A leader at Zerodha wants "an AI chatbot that tells users which stocks to buy". Walk me through how you would respond and what you would build instead, if anything.',
    contextBackground: 'Investment advice is regulated by SEBI. Zerodha\'s brand is built on not pushing users to trade more.',
    keyEvaluationMetrics: ['User outcomes', 'Regulatory compliance', 'Support deflection'],
    clarificationQuestions: ['What user problem is behind the request?', 'What are the regulatory limits?', 'What does the leader want to achieve?'],
    keyIdeas: ['Separate the user need (understanding, confidence) from the proposed solution', 'Regulatory and brand risk of advice', 'Safer AI uses: explaining terms, summarising filings, answering account questions'],
    analyticalPath: ['Identify user problems from support tickets', 'Choose a low-risk, high-volume use case', 'Measure support deflection and answer accuracy'],
    synthesisModel: 'Push back on stock tips as a regulatory and brand risk. Build an assistant that explains concepts, documents and account questions grounded in Zerodha content, measured by support deflection and accuracy.'
  }),
  ai({
    id: 'ai-ride-demand-prediction',
    title: 'Predict ride demand and pre-position drivers',
    company: 'Uber',
    companyColor: 'bg-zinc-800 text-white',
    companyBadge: 'Marketplace ML',
    difficulty: 'Hard',
    problemStatement: 'Design an AI system for a ride-hailing marketplace that predicts real-time demand and moves driver supply into place before peak congestion hits.',
    contextBackground: 'Riders face surge pricing and long waits at peaks; drivers lose money driving empty. Drivers are independent and can ignore suggestions. Supply is limited at peak times.',
    keyEvaluationMetrics: ['Marketplace balance (riders and drivers)', 'Precision vs recall trade-off', 'Driver trust and adoption', 'Guardrails and fallbacks'],
    clarificationQuestions: ['Which cities and which peaks (commute, events, weather)?', 'Do we nudge drivers or pay them to move?', 'What data do we have in real time?'],
    keyIdeas: ['Drivers are the scarce side; a wrong suggestion wastes their time and trust', 'Optimise for precision over recall when supply is constrained', 'Start with predictable peaks (airports, events) before general demand'],
    analyticalPath: ['Offline backtest against past peaks', 'A/B test by city zone: wait time, driver earnings per hour, empty miles', 'Guardrail: suggestion acceptance rate and driver complaints'],
    synthesisModel: 'Precision-first demand forecasts for predictable peaks, shown to drivers as optional suggestions with expected earnings. Measure rider wait time and driver earnings per hour, guarded by empty miles and suggestion acceptance.',
    curveball: 'Ask whether they would tune the model for precision or recall, and what it costs drivers if they pick wrong.'
  }),
  ai({
    id: 'ai-agent-social-network',
    title: 'Mission and metrics for an AI-only social network',
    company: 'AI research lab',
    companyColor: 'bg-purple-600 text-white',
    companyBadge: 'Agents & Platforms',
    difficulty: 'Hard',
    problemStatement: 'Set the mission, goals and metric framework for a social network where only autonomous AI agents post, exchanging what they have learned so that knowledge generalises.',
    contextBackground: 'Agents from different teams solve tasks and could share learnings. Humans are responsible for the agents but do not post. Bad or unsafe learnings could spread quickly between agents.',
    keyEvaluationMetrics: ['Clear mission and users (agents and their human owners)', 'Measuring useful knowledge transfer', 'Human oversight and governance', 'Safety guardrails'],
    clarificationQuestions: ['Who owns the agents and why would they join?', 'What counts as a useful learning?', 'Who is accountable when a learning is wrong?'],
    keyIdeas: ['The real customers are the humans who own the agents', 'Value = tasks solved faster or better after reading others\' learnings', 'Agent-to-agent traffic can be machine-format, with human-readable summaries for audit'],
    analyticalPath: ['North Star: task success uplift for agents that consume shared learnings', 'Supporting: learnings reused across teams, time to solution', 'Guardrails: share of flagged or reverted learnings, human audit coverage'],
    synthesisModel: 'Mission: help agents learn from each other safely. Measure task success uplift from shared learnings, with human-auditable summaries and guardrails on flagged or reverted learnings.',
    curveball: 'Ask whether agent-to-agent messages should be human-readable, and what they trade off either way.'
  }),
  ai({
    id: 'ai-elderly-companion',
    title: 'An AI companion for lonely elderly users',
    company: 'Anthropic',
    companyColor: 'bg-amber-600 text-white',
    companyBadge: 'Responsible AI',
    difficulty: 'Hard',
    problemStatement: 'As a PM at Anthropic, design an AI well-being companion for elderly users that reduces loneliness without creating unhealthy dependence.',
    contextBackground: 'Many older people live alone. An always-available AI could help, but could also replace human contact, mislead users about what it is, or miss signs of a medical or mental health emergency.',
    keyEvaluationMetrics: ['Outcome over engagement', 'Dependency and honesty guardrails', 'Escalation to humans', 'Family and caregiver ecosystem'],
    clarificationQuestions: ['Who pays: users, families, care providers?', 'Voice, text or a device?', 'What happens in an emergency?'],
    keyIdeas: ['The biggest risk is over-engagement replacing real relationships', 'Success is more human contact, not more time with the AI', 'The AI is open about being an AI and nudges towards real-world actions'],
    analyticalPath: ['North Star: share of users reporting less loneliness and more human contact', 'Cap engagement metrics instead of maximising time spent', 'Guardrails: escalation accuracy, dependency signals, user wellbeing surveys'],
    synthesisModel: 'A voice companion that is honest about being an AI, nudges users toward family and activities, and escalates to humans when needed. Measure loneliness and human contact, cap time spent.',
    curveball: 'Ask what the single biggest product risk is and how their metrics stop the team from optimising for addiction.'
  }),
  ai({
    id: 'ai-assistant-eval-framework',
    title: 'Build an evaluation framework for an AI assistant',
    company: 'Conversational AI company',
    companyColor: 'bg-brand-600 text-white',
    companyBadge: 'AI Quality',
    difficulty: 'Hard',
    problemStatement: 'Design an end-to-end evaluation framework to catch hallucinations, monitor drift and keep a conversational AI assistant reliable.',
    contextBackground: 'The assistant answers customer questions from company documents. Model and prompt changes ship weekly. Wrong answers have caused refunds and complaints.',
    keyEvaluationMetrics: ['Defining good output', 'Offline vs online evaluation', 'Deterministic checks vs LLM-as-judge vs human review', 'Release gates and monitoring'],
    clarificationQuestions: ['What does a wrong answer cost?', 'How often do models and prompts change?', 'Do we have labelled examples?'],
    keyIdeas: ['Start from failure modes: hallucination, outdated info, refusing valid questions', 'Layer deterministic checks, LLM-as-judge and human sampling', 'Every release passes a golden dataset before shipping'],
    analyticalPath: ['Golden dataset from real conversations, labelled by experts', 'Online: grounded-answer rate, escalation rate, thumbs down, drift alerts', 'Release gate: no regression on golden set; weekly human review sample'],
    synthesisModel: 'A golden dataset as a release gate, layered checks (rules, LLM judge, human sampling), and live monitoring for drift. Track grounded-answer rate with complaint and escalation guardrails.',
    curveball: 'Ask how they would know the LLM judge itself is wrong, and what they do about it.'
  })
];
