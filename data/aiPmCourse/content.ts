// PM → AI PM: overview, research, weekly summary and toolkit content.
// Shown only in local dev (see lib/featureFlags.ts).

export interface AiPmTable {
  headers: string[];
  rows: string[][];
}

export const AI_PM_OVERVIEW = {
  title: 'PM → AI PM: Full Curriculum',
  intro:
    'A build-first curriculum, with a 90-day day-by-day plan and a 12-week summary, for a working PM who wants an AI PM role. You already know PM craft. This curriculum adds only the AI layer on top. Every module ends in a shipped artifact, because every JD that we read asks for proof of execution, not certificates.',
  howBuilt:
    'Around 30 live or recent AI PM, GenAI PM and AI Product Builder postings (Oct 2026 snapshot) were read across four employer types: frontier labs (Anthropic), Indian AI and SaaS companies (Sarvam AI, HCLTech, Bengaluru startups), global enterprises (JPMorgan, ServiceNow, Microsoft, SoFi) and builder-first teams (Foundever, Paralect, Beewise). That was combined with 8 widely shared LinkedIn and newsletter roadmaps. Five YouTube talks and courses refine it (see Reading and videos).',
  whoFor: [
    'PMs with 1–5 years of experience who ship software but have not owned an LLM feature end to end',
    'PMs who use AI tools every day but have not built an AI product',
    'Senior PMs who must lead an AI roadmap in their current company',
  ],
  thesis:
    'The job is normal product management plus a second job: running features whose output is probabilistic, whose quality is a distribution, and whose cost scales with usage. The curriculum spends most of its time on that second job. A demo is not a product. Each gate measures users and impact, not demos.',
  goal:
    'In 90 days, a working PM becomes an AI PM who is ready to interview and has proof. At the end, you can own an AI feature from problem to production. You can show one connected case to a hiring manager, and you can defend each decision in that case with a number.',
  whyGoal:
    'AI PM JDs do not ask for certificates. They ask for 3 things: hands-on LLM fluency, ownership of AI quality through evals, and one shipped AI feature. Recruiters say that candidates who start with the model, not with the eval set and the rollback plan, have not done the job yet. This course closes that gap for a PM who already knows discovery, specs, metrics and stakeholders.',
  outcomes: [
    {
      title: 'Decide where AI belongs',
      items: [
        'Say when a problem needs AI and when rules or classic software are better.',
        'Choose prompting, RAG, fine-tuning, an agent or a fixed workflow, and give one reason tied to a number.',
        'Decide when the AI acts and when a human decides.',
      ],
    },
    {
      title: 'Understand how AI systems behave',
      items: [
        'Explain tokens, context windows, temperature, embeddings and the causes of hallucination in plain words.',
        'Calculate the cost per call, per month and per successful task from a price page.',
        'Write a latency budget in milliseconds, and choose streaming or background for a feature.',
      ],
    },
    {
      title: 'Specify AI products',
      items: [
        'Write an AI PRD with metrics at 3 levels: model, product and business.',
        'Write a ship rule and kill criteria before any build.',
        'Write a graded failure spec: severity levels, detection, the exact fallback text and the maximum rate.',
        'Design human escalation, with capacity math.',
      ],
    },
    {
      title: 'Own AI quality',
      items: [
        'Build a 50-case eval set with typical, edge and adversarial cases.',
        'Run an error analysis, fix the largest failure category, and find regressions.',
        'Know when you can trust an LLM-as-judge.',
      ],
    },
    {
      title: 'Ship and monitor',
      items: [
        'Build a no-code prototype with fallbacks and an escalation path.',
        'Log every run, read the logs, and find the top problem.',
        'Find drift, and run a weekly health check.',
        'Manage privacy, prompt injection and governance risk.',
      ],
    },
    {
      title: 'Make the business case',
      items: [
        'Calculate unit economics and compare cost with the value that the feature replaces.',
        'Propose a price for an AI feature and defend it.',
        'Tear down a real AI product and separate what you observed from what you assume.',
      ],
    },
    {
      title: 'Get the job',
      items: [
        'Tell your PM background as an AI PM asset in 90 seconds, with no apology.',
        'Answer the 4 technical questions (cost, speed, RAG or fine-tuning, good enough) with one number each.',
        'Complete a 35-minute AI design case and explain a trade-off to a non-technical stakeholder in 4 sentences.',
      ],
    },
  ],
  artifactsNote: 'All 8 artifacts use one capstone, so together they tell one story.',
  goalMet: [
    'All 6 phase checklists pass, with every check true.',
    'Your eval pass rate improves from v0 to v1, and you can explain each regression.',
    'You score 2 or higher on every row of the skills checklist, and 3 on evals.',
    'You complete 3 mock design cases in 35 minutes or less each.',
    'A PM who has not seen your work understands your portfolio page in 90 seconds.',
  ],
  outOfScope: [
    'Training models or writing production code.',
    'Basic PM skills: PRDs, user stories and core metrics. The course assumes that you have them.',
    'A job guarantee. The course gives you the skills and the proof; the job search still takes time.',
  ],
  rules: [
    { title: 'Daily rhythm', text: 'On weekdays, learn for 60 minutes and do the exercise for 30–60 minutes. On a weekend day, do a 3-hour block for the phase deliverable. Use the 15th day of each phase to review and finish the deliverable. Do not put two phases into one; the limit is part of the design.' },
    { title: 'One capstone, all 90 days', text: 'On day 5, pick one problem. Use it in every phase: the cost sheet, the AI PRD, the eval set, the prototype and the interview story. At the end you have one connected case, not five separate exercises.' },
    { title: 'The notebook', text: 'Keep one doc with a page per phase. End each day with 3 lines: one idea, one number, one question.' },
    { title: 'The data rule', text: 'Do not put real customer, candidate, employer or personal data into an AI tool. Every case that you make is synthetic or anonymised.' },
    { title: 'The evidence rule', text: 'In a teardown, write “I observed” for what you tested and “I assume” for the rest. Do not state how a real company built a product.' },
    { title: 'Pass/fail checklists', text: 'Each phase ends with a checklist. A deliverable passes only if every check is true.' },
  ],
  planIntro:
    'This plan is for a working PM. It takes 90 days at about 2 hours a day, about 180 hours in total. It skips PRD, user-story and basic-metric lessons, because you already do this work.',
};

export const AI_PM_WHY = {
  jdIntro:
    'Across the postings we read, three asks show up almost everywhere: core PM craft, hands-on LLM fluency (“built or used LLM solutions”), and ownership of AI quality through evals and monitoring. Cost, latency and prototyping-in-code are the fastest-rising asks, especially at AI-native companies like Sarvam.',
  skills: {
    headers: ['Skill or requirement', 'How often', 'What the JD wording looks like', 'Example postings'],
    rows: [
      ['Core PM craft: roadmap, prioritisation, specs, stakeholder alignment', 'Almost all', 'Define vision and roadmap; translate requirements into user stories and acceptance criteria', 'HCLTech AI PM I, Spencer Ogden'],
      ['Hands-on LLM / GenAI fluency', 'Almost all', 'Hands-on experience building or using LLM solutions; understands deployment challenges', 'JPMorgan LLMs, Clanx Bengaluru'],
      ['Evals and quality ownership', 'Most', 'Own the eval set; define “good enough” in numbers; LLM-as-judge, rubrics, eval datasets', 'ServiceNow Evals TPM, KORE1 template'],
      ['Metrics, telemetry, SQL, product analytics', 'Most', 'Write SQL; build funnels in PostHog or Mixpanel; telemetry frameworks', 'Sarvam, HCLTech'],
      ['Responsible AI, governance, compliance', 'Most (enterprise)', 'Responsible AI and security guidelines; NIST-style risk frameworks; Legal and Controls partners', 'HCLTech, JPMorgan'],
      ['Agents, tool calling, agentic workflows', 'Many, rising', 'Built a working agent end to end; agentic workflows; tool usage and multi-step evaluation', 'Sarvam, ServiceNow'],
      ['Cost, latency, accuracy trade-offs', 'Many, rising', 'Latency budgets; cost vs latency vs accuracy; model selection', 'Sarvam, KORE1'],
      ['Prototyping in code with AI tools', 'Many, rising', 'Write code and prompts to validate ideas; vibe code with Cursor, Claude Code, Lovable, Replit', 'Paralect, Beewise'],
      ['AI system architecture: RAG, fine-tuning, MLOps', 'Many', 'SFT, RLHF, RAG, Search, Agents; LangChain, LlamaIndex; AI lifecycle from data to monitoring', 'JPMorgan'],
      ['Technical integration literacy', 'Many', 'Understands APIs, JSON schemas and system workflows', 'Virtual Vocations listing'],
      ['Data lifecycle: collection, labelling, model improvement', 'Some', 'Manage data collection, labelling and model improvement loops', 'HiringBlaze Bangalore'],
      ['AI UX and failure handling, human-in-the-loop', 'Some', 'Intuition for AI UX patterns and failure handling; HITL requirements in PRDs', 'Agents & Reliability TPM, Morgan Philips'],
      ['GTM, adoption, pricing of AI features', 'Some', 'Partner with GTM on rollout, packaging and value realisation', 'HCLTech, Morgan Philips'],
      ['Product taste and translating new model capabilities', 'Frontier labs', 'Exceptional product taste; turn nascent model capabilities into experiences', 'Anthropic, Claude App Foundations'],
      ['Side projects and proof of building', 'Frequent bonus', 'Side projects or products shipped outside work; founded a side business', 'Sarvam, SoFi Product Builder'],
    ],
  } as AiPmTable,
  rolesIntro: 'The title covers several different jobs. Pick one before you prepare, because the depth you need differs.',
  roles: {
    headers: ['Role type', 'What you own', 'Emphasis in JDs', 'Typical experience ask'],
    rows: [
      ['Copilot / assistant PM', 'A customer-facing LLM surface (chatbot, in-app copilot)', 'Evals, failure handling, AI UX, trust', '4+ years PM, one shipped AI feature'],
      ['AI platform PM', 'Internal model gateway, eval infra, retrieval plumbing', 'Architecture, evals at scale, developer experience', 'Often 6–10+ years, very technical'],
      ['ML feature PM', 'Ranking, recommendations, summarisation inside a non-AI product', 'Metrics, experimentation, data quality', '3–7 years'],
      ['AI ops / internal tools PM', 'AI deployed to support, sales or ops teams', 'Workflow redesign, adoption, ROI', 'Lower bar, faster to fill'],
    ],
  } as AiPmTable,
  rolesNote:
    'These four archetypes come from the KORE1 hiring template. For a first AI PM move, the copilot and ML feature roles are the most open to PMs from non-AI products.',
  pay: [
    'India, mid-level: 2–5 years, budget up to ₹30 LPA at a Bengaluru GenAI role via HiringBlaze, with about 1,700 applicants on one posting',
    'India, AI-native: 3–7 years at Sarvam, current PMs only, explicitly not people moving from consulting or programme management',
    'Frontier labs: 5–10+ years; Anthropic’s Claude App Foundations PM lists USD 385k–460k',
    'US market read: AI PMs carry roughly a 20–22% premium over a standard senior PM at the same level, per KORE1',
  ],
  betweenLines:
    'Hiring managers screen for one shipped model-powered feature plus a real eval story, not years of “AI experience”. KORE1’s recruiters say candidates who lead with the model and the prompt, instead of the eval set and rollback plan, read as people who haven’t done the job yet.',
  roadmapsIntro:
    'Eight widely shared roadmaps (five LinkedIn posts, a popular roadmap infographic, and posts by HelloPM, Batu Akin, Product Faculty and Aakash Gupta) converge on the same seven ideas. Where they disagree is mostly emphasis, not direction.',
  roadmaps: {
    headers: ['Theme', 'Consensus', 'Where JDs back it up'],
    rows: [
      ['You don’t need to code, but you need technical fluency', 'All 8', 'JDs ask for model-tradeoff fluency and PR literacy, not production Python'],
      ['“Does it even need AI?” problem framing comes first', '7 of 8', 'KORE1: discovery that decides whether a problem needs a model at all'],
      ['Evals and guardrails are a product responsibility', '7 of 8', 'Evals appear in most JDs; ServiceNow built a whole PM role on it'],
      ['Build, build, build: projects beat certificates', '8 of 8', 'Sarvam and SoFi reward side projects; Aakash calls certificates mostly marketing'],
      ['Agentic workflows: tools, function calling, orchestration', '6 of 8', 'Rising ask: “built a working agent that does a real job”'],
      ['Cost, latency, scale before shipping', '5 of 8', 'Latency budgets and cost trade-offs in Sarvam and KORE1'],
      ['Business judgement: pricing, trust, adoption, moat', '6 of 8', 'GTM and adoption partnership in HCLTech and Morgan Philips JDs'],
    ],
  } as AiPmTable,
  differ: [
    { title: 'Prompts vs product', text: 'One LinkedIn post argues PMs over-invest in prompt skills and under-invest in AI product design, adoption and user behaviour. A popular roadmap infographic puts prompt engineering at step 3. Both are right: learn prompting fast, then move on.' },
    { title: 'ML depth', text: 'One 5-week-program post wants ML workflow and application domains (vision, speech, text). Most others skip classical ML. JDs for ML-feature and platform roles still ask for it.' },
    { title: 'Brand building', text: 'One post promises recruiter outreach within six months of posting about your projects. HelloPM adds a targeting split: go deep with a teardown or proposal for a small set of dream companies.' },
    { title: 'Picking a lane', text: 'HelloPM tells you to choose between AI-enabled, Applied AI and Core AI PM roles first, and to read 5–10 JDs before starting. That step is built into week 1.' },
  ],
  underplay:
    'What the roadmaps underplay compared with JDs: SQL and product analytics, responsible-AI and compliance work in enterprise roles, and the expectation that you’re already a PM. Sarvam explicitly excludes people moving in from consulting or programme management.',
};

export interface AiPmWeek {
  week: number;
  module: string;
  learn: string;
  build: string;
}

export const AI_PM_WEEK_PHASES: { title: string; weeks: AiPmWeek[]; gate: string }[] = [
  {
    title: 'Phase 1 — Foundations and framing (weeks 1–3)',
    weeks: [
      { week: 1, module: 'Pick your lane', learn: 'AI PM vs PM: probabilistic vs deterministic systems; the four role types; reading JDs for signal', build: 'Tear down 10 JDs for your target lane into a skills gap sheet; rate yourself 0–3 on each row of the skills checklist' },
      { week: 2, module: 'LLM and ML fundamentals', learn: 'Tokens, context windows, temperature, embeddings, model families and sizes; LLM training stages (pre-training, post-training, RLHF) and transformers at concept level; training vs inference; where hallucinations come from (training-time vs inference-time); precision, recall, F1', build: 'A one-page “LLMs for PMs” explainer in your own words, plus a side-by-side test of 3 models on the same 20 prompts with notes on quality, speed and cost' },
      { week: 3, module: 'Framing problems for AI', learn: '“Does it need AI?”; automate vs augment; when AI decides vs a human; AI UX patterns (citations, confidence, undo, fallbacks); human-in-the-loop design; do not automate every customer touchpoint; try to break AI products to find failure modes', build: 'Teardown of 2 shipped AI products (one great, one weak): the design decision that made or broke each. Use the value-chain format: market, business value, UX, feasibility, growth' },
    ],
    gate: 'Explain, without notes, why a feature that demos well can fail in production, and when you would not use an LLM.',
  },
  {
    title: 'Phase 2 — Build skills (weeks 4–7)',
    weeks: [
      { week: 4, module: 'Prompt and context engineering', learn: 'System prompts, role prompting, few-shot, structured JSON outputs, prompt versioning; context engineering (what goes into the window and why)', build: 'A versioned prompt library for one real task with before/after quality notes' },
      { week: 5, module: 'RAG and architecture choices', learn: 'Prompting vs RAG vs fine-tuning vs SFT/RLHF; transfer learning; chunking, embeddings, vector databases (Pinecone, Weaviate, pgvector); retrieval failure modes', build: 'A small RAG app over a document set you know (support docs, policy PDFs) with citations' },
      { week: 6, module: 'Agents and tool use', learn: 'Function calling, MCP, orchestration (n8n, LangGraph, LangChain); agents vs fixed workflows; error compounding across steps', build: 'One agent that does a real job end to end, not a demo — the exact bar Sarvam sets' },
      { week: 7, module: 'AI prototyping for PMs', learn: 'Vibe coding with Cursor, Claude Code, Lovable, v0, Replit; frontend, backend, database and API basics; auth and deploys (Supabase, Vercel); writing tasks an AI coder can execute', build: 'Ship one deployed MVP with real users (even 10) and a feedback loop' },
    ],
    gate: 'A live URL a stranger can use, and a 2-minute explanation of why you chose prompting, RAG or an agent for it.',
  },
  {
    title: 'Phase 3 — Ship and measure (weeks 8–10)',
    weeks: [
      { week: 8, module: 'Evals', learn: 'Defining “good” per task; golden datasets; rubrics; LLM-as-judge; human review; offline vs online evals; regression tests on prompt or model changes; LangSmith, Braintrust or a spreadsheet harness', build: 'An eval suite (50–100 cases) for your week 5–7 build, with a baseline score and one documented improvement' },
      { week: 9, module: 'Guardrails and responsible AI', learn: 'Hallucination mitigation, bias, misuse, prompt injection, PII and data retention; refusal vs over-refusal; governance frameworks (NIST AI RMF, EU AI Act basics, India’s DPDP Act); incident and rollback plans', build: 'A risk register and launch checklist for your build, including the rollback plan written before launch' },
      { week: 10, module: 'Cost, latency, scale and analytics', learn: 'Token economics, caching, model routing, streaming, latency budgets; observability; SQL; funnels and events in PostHog or Mixpanel', build: 'A unit-economics sheet (cost per request, per user, per month at 10x usage) and an instrumented funnel for your MVP' },
    ],
    gate: 'Answer “how do you know it’s working?” with a number from your own eval suite and one from your own analytics.',
  },
  {
    title: 'Phase 4 — Strategy and landing the job (weeks 11–12)',
    weeks: [
      { week: 11, module: 'AI strategy, pricing and GTM', learn: 'Where AI creates value; PMF for AI products; pricing (seat vs usage vs outcome); trust and adoption; defensibility when anyone can ship in a weekend; AI PRDs with data, latency and eval requirements', build: 'An AI PRD for a real company you want to join, plus a pricing model' },
      { week: 12, module: 'Portfolio and interviews', learn: 'Case-study writing; AI product sense, technical, evals, strategy and behavioural rounds; live vibe-coding rounds', build: '3 polished case studies, a mock-interview log, and a target-company list' },
    ],
    gate: 'Three case studies that each show a decision, a trade-off and a measured result.',
  },
];

export const AI_PM_WEEKS_INTRO =
  'Plan on 10–12 hours a week. Each week has one concept block and one build; the build is what goes in the portfolio. Phases end with a gate: don’t move on until you can pass it. This is the summary view; the 90-day plan is the day-by-day version you work through.';

export const AI_PM_CAPSTONES = {
  intro: 'Pick the one closest to your domain and target roles. All are synthetic problems; the numbers are illustrative.',
  table: {
    headers: ['Option', 'Problem', 'Hard part', 'Worst error', 'Fits roles in'],
    rows: [
      ['A', 'Insurance claim-packet checker: is the packet complete, which fields conflict', 'Phone photos, handwriting, name variants', 'Approving an incomplete claim', 'Fintech, insurtech'],
      ['B', 'Hinglish support-ticket triage and reply drafter', 'Roman-script Hindi, sarcasm, prompt injection', 'Promising a refund the policy does not allow', 'Consumer apps'],
      ['C', 'GST invoice extractor for a CA practice', 'Many layouts, faded bills', 'A confident wrong number in a filing', 'Fintech, B2B SaaS'],
      ['D', 'Resume shortlister against must-haves, with evidence lines', 'Mixed formats, career gaps, hidden injection', 'Rejecting qualified people', 'HR-tech'],
      ['E', 'Property-listing normaliser and duplicate detector', 'Local shorthand, lakh and crore', 'An invented feature or wrong price', 'Marketplaces'],
      ['F', 'Voice receptionist for clinic appointments', 'Fast replies, noise, interruptions', 'Missing an emergency phrase', 'Voice AI, health-tech'],
      ['G', 'An AI feature for your own product', 'You know the users and data', 'You define it', 'Your current company'],
    ],
  } as AiPmTable,
  howToChoose:
    'Score each option 1–5 on 4 questions. (1) Do you know this workflow? (2) Can you write 50 realistic cases without real data? (3) Can you say which error hurts most? (4) Does it match your target roles? Pick the highest total. These options are adapted from the Six-Week AI PM Roadmap.',
};

export const AI_PM_TEMPLATES: { id: string; name: string; fields: string[] }[] = [
  { id: 'T1', name: 'PRD on a page', fields: ['Problem, user, job', 'Why AI', 'Success metric and ship rule', 'Worst error', 'Cost per task', 'Latency budget', 'Launch and kill criteria'] },
  { id: 'T2', name: 'AI PRD (4 pages max)', fields: ['Problem and evidence', 'Metrics at 3 levels + guardrail', 'Ship rule', 'Precision and recall targets', 'Failure spec (T4)', 'Human-in-the-loop triggers and capacity math', 'Architecture choice', 'Cost and latency (T3)', 'Data and privacy', 'Launch plan'] },
  { id: 'T3', name: 'Cost and latency napkin sheet', fields: ['Feature in one line', 'Price, source, date', 'Tokens: instructions, documents, history, output', 'Cost per call, day, month, successful task', 'Low, expected, high volume', 'Latency per step (ms)', 'Streaming or background', 'Architecture choices with reasons', 'Key assumption'] },
  { id: 'T4', name: 'Graded failure spec', fields: ['Severity (S0–S3)', 'Example', 'Detection method', 'Exact fallback text', 'Escalate to human?', 'Maximum tolerated rate'] },
  { id: 'T5', name: 'Gold eval set sheet', fields: ['Case ID', 'Type (typical, edge, adversarial)', 'Sub-type', 'Input', 'Gold answer or pass criteria', 'Source', 'v0 result per criterion', 'v1 result', 'Failure category', 'Severity'] },
  { id: 'T6', name: 'Error-analysis memo (1 page)', fields: ['Pass rate v0', 'Failure categories with counts', 'Top category and cause', 'Fix made', 'Pass rate v1', 'Regressions', 'Ship decision vs ship rule'] },
  { id: 'T7', name: 'Run log', fields: ['Run ID', 'Date', 'Input case', 'Prompt version', 'Model', 'Latency (ms)', 'Tokens or cost', 'Output OK?', 'Failure category', 'User feedback'] },
  { id: 'T8', name: 'AI product teardown or critique', fields: ['User and job', 'The AI moment', 'Architecture from behaviour (I observed / I assume)', 'Unit economics', 'Failure handling observed', 'One trade-off and why', 'One change and the metric to prove it'] },
  { id: 'T9', name: '90-second background story', fields: ['Your PM work in one line, with a number', 'The AI PM skill it trained', 'The capstone exhibit that proves it', 'One number from the capstone', 'What you want to do next'] },
  { id: 'T10', name: '35-minute design case', fields: ['Goal and constraint', 'Segment', 'Problem', 'Options (one without AI)', 'AI design', 'Metrics and evals', 'Risks and rollout', '4-sentence trade-off', 'Score 1–5 per step'] },
];

export const AI_PM_BACKGROUND_EXAMPLE = {
  before: '“I managed the checkout roadmap.”',
  after:
    '“I ran discovery with 40 merchants and shipped one-tap checkout, which moved conversion by 6%. For AI I add measurable quality targets, failure specs and escalation rules. My capstone eval set went from 72% to 88%.” Use your own numbers.',
};

export const AI_PM_SKILLS: { group: string; items: string[] }[] = [
  {
    group: 'AI foundations',
    items: [
      'Explain tokens, context windows, temperature and embeddings in plain words',
      'Diagnose a hallucination as training-time or inference-time and name mitigations',
      'Choose between prompting, RAG and fine-tuning for a given problem, with a reason',
      'Read precision, recall and F1 and say which matters for a given product',
    ],
  },
  {
    group: 'Building',
    items: [
      'Ship a versioned system prompt with structured output',
      'Ship a RAG app with citations',
      'Ship an agent with tool calls and a human approval step',
      'Deploy an MVP with auth, a database and real users',
    ],
  },
  {
    group: 'Quality and safety',
    items: [
      'Build a golden dataset and rubric for one task',
      'Run LLM-as-judge and compare it with human ratings',
      'Write a risk register, guardrails and a rollback plan before launch',
      'Explain prompt injection and PII handling for your build',
    ],
  },
  {
    group: 'Economics and analytics',
    items: [
      'Calculate cost per request and per user at 10x usage',
      'Set a latency budget and explain how streaming or model routing meets it',
      'Write SQL for a funnel and instrument events in an analytics tool',
    ],
  },
  {
    group: 'Strategy and career',
    items: [
      'Write an AI PRD with data needs, eval threshold and latency budget',
      'Propose pricing for an AI feature and defend it',
      'Publish three one-page case studies',
      'Complete 10 mock interviews across all six round types',
    ],
  },
];

export const AI_PM_SKILL_SCALE = [
  { score: 0, label: 'Never heard of it' },
  { score: 1, label: 'Can explain' },
  { score: 2, label: 'Have done it once' },
  { score: 3, label: 'Can teach it and defend trade-offs' },
];

export const AI_PM_PORTFOLIO = {
  intro:
    'Aim for three deep projects rather than five shallow ones. Each one should map to a JD requirement and come with an eval story, because that is what interviewers probe.',
  projects: {
    headers: ['Project', 'JD skill it proves', 'Minimum bar', 'Stretch'],
    rows: [
      ['RAG assistant over a real knowledge base', 'LLM fluency, RAG, citations, hallucination handling', 'Live app, 50-case eval set, hallucination rate before and after a fix', 'Compare two chunking or retrieval strategies with numbers'],
      ['An agent that does a real job', 'Agents, tool calling, failure handling', 'Completes a multi-step task with tools; human approval for irreversible actions', 'Agent-level evals: task success, tool-call accuracy, steps per task'],
      ['A shipped MVP with users', 'Product Builder, vibe coding, analytics, GTM', '10+ real users, instrumented funnel, one iteration based on data', 'Pricing test or waitlist conversion; cost per user at 10x scale'],
      ['Eval framework teardown (written)', 'Evals and quality ownership', 'Design evals for a public AI product (e.g. a support bot or resume screener)', 'Run it on the real product and publish results'],
      ['AI PRD + pricing for a target company', 'Strategy, specs, business judgement', 'PRD with latency budget, eval threshold, data needs and rollback plan', 'Send it to a PM at that company as outreach'],
    ],
  } as AiPmTable,
  rationaleIntro: 'How to package each project: give a PRD, the prototype and a one-page design rationale. The rationale has 7 parts:',
  rationale: [
    'The user and the painful job, in one sentence',
    'Why AI, and what you chose not to use AI for',
    'Architecture choice (prompt, RAG or agent) and the trade-off you accepted',
    'Eval design, the baseline, and what moved the number',
    'Cost and latency per request',
    'What broke in production and how you handled it',
    'What you’d do next',
  ],
  cadence:
    'Post one build log or teardown a week while you learn. Batu Akin’s roadmap and HelloPM both recommend reverse-engineering existing AI products publicly; HelloPM suggests reserving deeper, tailored work (a teardown or proposal) for a small set of dream companies.',
};

export const AI_PM_TOOLS = {
  intro: 'Tools change fast; the categories don’t. Learn one tool per category well and know the others by name.',
  table: {
    headers: ['Category', 'Use daily (hands-on)', 'Know well enough to discuss', 'Recognise by name'],
    rows: [
      ['Chat models', 'Claude, ChatGPT, Gemini', 'Open-weight models (Llama, Mistral); India-focused models (Sarvam)', 'Model leaderboards and benchmarks'],
      ['Model APIs', 'One of Anthropic API or OpenAI API', 'Azure OpenAI, Vertex AI, AWS Bedrock', 'Model gateways and routers'],
      ['AI coding / prototyping', 'Cursor or Claude Code; Lovable or v0', 'Replit, Bolt, GitHub Copilot', 'Copilot Studio, Azure AI Foundry'],
      ['Orchestration and agents', 'n8n', 'LangChain, LangGraph, LlamaIndex, MCP', 'Agent SDKs from model labs'],
      ['Retrieval', 'pgvector or Pinecone', 'Weaviate, chunking and reranking strategies', 'Hybrid search'],
      ['Evals and observability', 'A spreadsheet harness, then LangSmith or Braintrust', 'LLM-as-judge setups, tracing', 'AI observability platforms'],
      ['Analytics', 'SQL, PostHog or Mixpanel', 'Amplitude, experiment platforms', 'Data warehouses'],
      ['Backend and deploy', 'Supabase, Vercel', 'Firebase, basic REST and JSON schemas', 'Docker basics'],
      ['PM workflow', 'Jira or Linear, Notion, Figma', 'Miro, Confluence', '—'],
    ],
  } as AiPmTable,
  sources:
    'JD sources for this list: JPMorgan (LangChain, LlamaIndex), Sarvam (PostHog, Mixpanel, Claude Code), KORE1 (LangSmith, Braintrust), Beewise (n8n, LangChain, OpenAI), Paralect (Claude Code, Lovable, Replit).',
};

export const AI_PM_INTERVIEWS = {
  intro:
    'AI PM loops in 2026 keep the classic PM rounds but add an AI product sense round, technical drill-downs on tokens, retrieval and evals, and sometimes live prototyping. Meta now runs a round that switches halfway from a product prompt to vibe-coding a prototype, per Aced (formerly Exponent).',
  rounds: {
    headers: ['Round', 'Example prompts reported by candidates', 'What scores well'],
    rows: [
      ['AI product sense', '“You have a technology that lets humans understand animals. What do you build?” (OpenAI); design an AI feature where the output may be wrong', 'Interrogate the capability first; sharp user segment; recoverable failure path; scoped MVP'],
      ['Live prototyping', 'Build a working prototype mid-interview (Meta)', 'Get something functional fast, narrate trade-offs, raise token cost and production-readiness unprompted'],
      ['AI technical', '“Users say Gemini is confident but wrong — fix it”; RAG vs fine-tuning vs prompting; make output more creative (temperature)', 'Separate training-time vs inference-time hallucination; commit to an opinion, then name what would change it'],
      ['Evals and metrics', '“Design an AI evaluation system for resumes” (Microsoft); measure LLM or RAG efficiency (NVIDIA); define a north star', 'Define “good” before metrics; labelled dataset; offline-to-online link; unsafe outputs and over-refusals both counted'],
      ['Strategy and GTM', 'Price an AI feature; build a moat; take text-to-music to market', 'Distribution as the scarce resource; distinguish incumbent threats from AI-native ones'],
      ['Behavioural', 'Velocity vs safety under exec pressure (OpenAI); “a time you built something against your values” (Anthropic)', 'Real narrative over rehearsed STAR; show you’d delay a launch if risk is unclear'],
    ],
  } as AiPmTable,
  brand: [
    'Reposition your LinkedIn as an AI PM: headline names the surface you build (“RAG assistants and agents”), featured section links the three case studies',
    'Post weekly build logs, teardowns and eval results; one popular roadmap expects recruiter interest within about six months of consistent posting',
    'Apply where the JD names a surface you’ve already built. Recruiters screen for one shipped model feature plus an eval story',
    'Go deep on a few targets: for 3–5 dream companies, send a tailored teardown or AI PRD to a PM there instead of a cold application',
    'Use ATS-hosted boards (Greenhouse, Lever, Ashby) and AI-native job boards; popular India postings draw over 1,000 applicants, so referrals and outreach matter',
    'Prep “why this company” specifically — Anthropic candidates fail the recruiter screen when they can’t say more than “I’m interested in AI”',
  ],
};
