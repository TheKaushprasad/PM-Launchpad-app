// PM → AI PM: the 90-day plan. Six phases of 15 days; each phase ends in one deliverable
// and a pass/fail checklist. Shown only in local dev (see lib/featureFlags.ts).

export interface AiPmDay {
  day: number;
  topic: string;
  learn: string;
  do: string;
  templates?: string[]; // template ids, e.g. "T3"
  resources?: string[]; // keys into AI_PM_RESOURCES
  kind?: 'weekend' | 'review';
  time?: string; // overrides the default time line on the day page
  video?: string; // YouTube video id, embedded at the top of the day page
  videoTitle?: string;
  level?: string; // e.g. Beginner
  skill?: string; // shown in the day header in place of the phase name
}

export interface AiPmPhase {
  id: number;
  title: string;
  shortTitle: string;
  start: number;
  end: number;
  deliverable: string;
  templates: string[];
  artifacts: { name: string; proves: string }[];
  checklistTitle: string;
  checklist: string[];
  workedExample?: { day: number; text: string };
}

export const AI_PM_PHASES: AiPmPhase[] = [
  {
    id: 1,
    title: 'Foundations and capstone',
    shortTitle: 'Foundations',
    start: 1,
    end: 15,
    deliverable: 'Critique: why a classic PRD breaks for one real AI feature, plus your capstone choice',
    templates: ['T8'],
    artifacts: [{ name: 'PRD critique', proves: 'You know where classic product practice breaks for AI' }],
    checklistTitle: 'Critique: why a classic PRD breaks for [real AI feature]',
    checklist: [
      'Names one AI feature that people use today, and its user, in one sentence each',
      'Attaches a log of 10+ tries, with 3+ hard inputs, each marked good or bad with a reason',
      'Names 4+ breaks, each tied to a PRD section (acceptance criteria, success metrics, edge cases, launch plan)',
      'Each break cites the log with a number, for example “3 of 10 answers quoted a refund window that the policy does not have”',
      'States what each broken section needs instead, for example “pass rate ≥ 90% on a 50-case set”',
      'Labels every guess about the company as an assumption',
      'Is 500 words or fewer and ends with one question for the team that built it',
      'Capstone is locked, with user, job and the worst error named',
    ],
  },
  {
    id: 2,
    title: 'System physics: build concepts, cost and latency',
    shortTitle: 'System physics',
    start: 16,
    end: 30,
    deliverable: 'Cost and latency napkin sheet for the capstone',
    templates: ['T3'],
    artifacts: [{ name: 'Cost and latency napkin sheet', proves: 'You can make AI decisions with numbers' }],
    checklistTitle: 'Cost and latency napkin sheet',
    checklist: [
      'States the feature in one line, with the capstone user and job',
      'Every price has a source and a date, or the label “illustrative”',
      'Token estimates are split into instructions, documents, history and output, with the method used',
      'Shows cost per call, per day, per month and per successful task, and the arithmetic is correct',
      'The latency budget lists each step in milliseconds and says streaming or background, with a reason',
      'Each architecture choice (prompting, RAG or fine-tuning; agent or workflow; routing or not) has one reason tied to the numbers',
      'Shows low, expected and high volume and names the one assumption that changes the answer most',
      'The 5-sentence note to finance has no undefined jargon',
    ],
    workedExample: {
      day: 25,
      text: 'A support bot handles 10,000 tickets a day. On the large model each ticket costs $0.012, so the bill is $120 a day. 70% of tickets are simple. Route them to a cheaper model: the bill drops to $8.40 + $36 = $44.40 a day, a 63% cut. The risk is a misrouted hard ticket, so add misrouted cases to the eval set.',
    },
  },
  {
    id: 3,
    title: 'The AI PRD',
    shortTitle: 'The AI PRD',
    start: 31,
    end: 45,
    deliverable: 'AI PRD v1 (4 pages maximum) with failure spec and ship rule',
    templates: ['T1', 'T2'],
    artifacts: [{ name: 'AI PRD v1 with failure spec and ship rule', proves: 'You can specify an AI product' }],
    checklistTitle: 'AI PRD v1',
    checklist: [
      'Problem, user and job in 5 lines or fewer, with the evidence you would collect',
      'Metrics at 3 levels (model, product, business) plus 1+ guardrail, each with a number and a method (sample size, who labels, how often)',
      'A ship rule, written before any build',
      'Says which error is worse for the user and for the business, with a precision target and a recall target',
      'A failure table with 4+ severity levels; each has examples, a detection method, the exact fallback text and a maximum rate',
      'A human-in-the-loop section with 4+ triggers and capacity math',
      'Cost and latency figures from phase 2, consistent with the chosen architecture',
      'A data and privacy section that names every personal-data field',
      'A launch plan with numeric kill criteria',
    ],
    workedExample: {
      day: 40,
      text: 'The capstone gets 400 cases a day. 15% go to a human, and each review takes 4 minutes. 400 × 0.15 × 4 = 240 minutes, so you need 4 reviewer-hours a day.',
    },
  },
  {
    id: 4,
    title: 'Evals',
    shortTitle: 'Evals',
    start: 46,
    end: 60,
    deliverable: '50-case eval set and a 1-page error-analysis memo',
    templates: ['T4', 'T5'],
    artifacts: [{ name: '50-case eval set and error-analysis memo', proves: 'You own AI quality' }],
    checklistTitle: '50-case eval set and error-analysis memo',
    checklist: [
      '50 cases with the mix stated (about 30 typical, 10 edge, 10 adversarial), each tagged with type and sub-type',
      'Every case has a gold answer or pass criteria, written before the model ran',
      'No real personal data; each case notes its source',
      'A rubric of 4–6 observable pass/fail criteria, with the critical ones marked',
      'v0 results per case and per criterion, with an overall pass rate',
      'Failures grouped into named categories with counts and severity; severity-3 failures listed separately',
      'One prompt change with a v0 vs v1 comparison that lists every regression',
      'A ship or do-not-ship decision tied to the phase 3 ship rule',
    ],
  },
  {
    id: 5,
    title: 'Production and proof',
    shortTitle: 'Production and proof',
    start: 61,
    end: 75,
    deliverable: 'No-code prototype with run log, plus one product teardown',
    templates: ['T6', 'T7'],
    artifacts: [
      { name: 'Prototype, run log and demo', proves: 'You can ship and monitor an AI feature' },
      { name: 'Product teardown with unit economics', proves: 'You can judge AI products from the outside' },
    ],
    checklistTitle: 'Prototype and teardown',
    checklist: [
      'The prototype runs end to end on a messy synthetic input, shown in a demo of 2 minutes or less',
      '2+ fallbacks and 1 human escalation path work and appear in the demo',
      'The run log has 8+ fields per run and 25+ runs',
      'A 5-line README states the eval score, known failure categories and cost per task',
      'The teardown separates what you observed from what you inferred, and labels every assumption',
      'The unit-economics table shows tokens per task, price source and date, cost per task, and a comparison with value replaced',
      'It names 2+ architecture trade-offs, with reasons tied to the user’s job',
      'It ends with one change and the metric that would prove it, and invents no facts about the company',
    ],
    workedExample: {
      day: 72,
      text: 'An AI bill explainer uses 2,000 input and 250 output tokens. At $0.50 and $1.50 per million tokens, one explanation costs about $0.0014, or ₹0.12. If 1 in 5 explanations prevents a ₹30 support call, the saving is ₹6 per explanation, about 50 times its cost.',
    },
  },
  {
    id: 6,
    title: 'Strategy and interviews',
    shortTitle: 'Strategy and interviews',
    start: 76,
    end: 90,
    deliverable: 'Portfolio page, pricing model and 3 mock cases',
    templates: ['T9', 'T10'],
    artifacts: [
      { name: 'Pricing model', proves: 'You can make the business case' },
      { name: 'Portfolio page and 3 mock cases', proves: 'You are ready to interview' },
    ],
    checklistTitle: 'Portfolio page and 3 mock cases',
    checklist: [
      'The page is public, loads on a phone, and the headline states the problem and your role',
      'The 4 exhibits (PRD, eval sheet and memo, prototype demo, teardown) open without a sign-in',
      'Each exhibit card shows one number (pass rate v0 → v1, cost per task, slowest-5% latency)',
      'A reframing paragraph links your PM background to AI PM work, with no apology',
      'A pricing model for the capstone, based on your cost per task',
      '3 mock cases, each in 35 minutes or less, scored with Template T10, with notes on the weakest step',
      'Each case explains a model trade-off to a named non-technical stakeholder in 4 sentences or fewer',
      'A recorded 2-minute capstone story with a number, a trade-off and a failure that you found',
      'No confidential employer data, no real customer data, no invented claims about real companies',
    ],
  },
];

export const AI_PM_DAYS: AiPmDay[] = [
  // Phase 1 — Foundations and capstone
  { day: 1, topic: 'What is AI? Build your AI landscape map', learn: 'AI, machine learning, deep learning and generative AI: how they differ, and when rules beat AI', do: 'Map 3 real products to the problem they solve and their likely AI approach, get an AI review, and record your 0–15 baseline score', time: '45–60 minutes', level: 'Beginner', video: 'mUw27wG7uFA', videoTitle: 'AI Simplified: 6 Concepts You Need to Know About Modern AI (IBM Technology)' },
  { day: 2, topic: 'AI vs. Traditional Software', learn: 'Learn when to use traditional software, predictive machine learning, or generative AI, and defend your choice like a Product Manager.', do: 'Choose the right approach for 3 scenarios, then analyse one real product feature with the five questions and get an AI review', time: '45–60 minutes', skill: 'Product judgment', level: 'Beginner', video: 'u8sQOpgkR5A', videoTitle: 'AI vs Traditional Software: What’s the Difference? (Explained Simply)' },
  { day: 3, topic: 'Prompt engineering for PMs', learn: 'How to write prompts so that LLMs return useful, reliable and actionable outputs', do: 'Write a prompt for one task you do every week. Improve it twice and note what changed in the output each time' },
  { day: 4, topic: 'Classic PRD vs AI PRD', learn: 'Which sections break: acceptance criteria, success metrics, edge cases, launch', do: 'Try one real AI feature 10 times, with 3 hard inputs. Log each try as good or bad, with a reason' },
  { day: 5, topic: 'Pick your capstone', learn: 'The capstone options table', do: 'Score all options. Lock one. Write its user and job in 2 lines' },
  { day: 6, topic: 'How LLMs work', learn: 'Next-token prediction, tokens, tokenisation', do: 'Count the tokens in one of your PRDs' },
  { day: 7, topic: 'Context windows', learn: 'Context limits. Context is not memory', do: 'Continue one chat until the model forgets an early fact' },
  { day: 8, topic: 'Temperature', learn: 'Low vs high temperature. Consistent vs varied output', do: 'Run one prompt at low and high temperature. Compare' },
  { day: 9, topic: 'Training stages', learn: 'Pre-training, post-training, RLHF. Transformers at concept level', do: 'Watch Karpathy’s Intro to Large Language Models', resources: ['karpathy_intro_llms'] },
  { day: 10, topic: 'Embeddings', learn: 'Vectors, similarity, semantic vs keyword search', do: 'Find 3 queries in your product where keyword search fails' },
  { day: 11, topic: 'Model families', learn: 'Closed vs open, small vs large, India-focused models', do: 'Test 3 models on 10 prompts. Note quality, speed, price' },
  { day: 12, topic: 'Hallucinations', learn: 'Training-time vs inference-time causes', do: 'Make a model hallucinate 5 times. Log each trigger' },
  { day: 13, topic: 'Precision and recall', learn: 'Confusion matrix. Which error costs more', do: 'For your capstone, say if a false yes or a false no is worse' },
  { day: 14, topic: 'Weekend block (3 h)', learn: 'Write the critique', do: 'Write the critique with Template T8', templates: ['T8'], kind: 'weekend' },
  { day: 15, topic: 'Review', learn: 'Days 1–14', do: 'Finish the critique. Check it against the phase 1 checklist', templates: ['T8'], kind: 'review' },

  // Phase 2 — System physics
  { day: 16, topic: 'Prompt anatomy', learn: 'System prompt, role, task, constraints, output format', do: 'Write the first prompt for your capstone with these 5 parts' },
  { day: 17, topic: 'Few-shot and structured output', learn: 'Examples, JSON schemas', do: 'Add 3 examples and a JSON output to your capstone prompt' },
  { day: 18, topic: 'Context engineering', learn: 'What goes into the window, in which order. Prompt versioning', do: 'Split your capstone tokens into instructions, documents, history and output' },
  { day: 19, topic: 'Why RAG', learn: 'Private data, fresh data, citations. The RAG pipeline', do: 'Draw the RAG pipeline for your capstone, or say why it needs none' },
  { day: 20, topic: 'RAG failures and vector databases', learn: 'Wrong chunk, stale data, no citation. Pinecone, pgvector, hybrid search', do: 'List 5 RAG failures for your capstone and one fix each' },
  { day: 21, topic: 'Choose the approach', learn: 'Prompting first, then RAG, then fine-tuning. Read OpenAI’s Optimizing LLM Accuracy', do: 'Choose for your capstone. Give one reason tied to a number', resources: ['openai_accuracy'] },
  { day: 22, topic: 'Agents vs workflows', learn: 'Read Anthropic’s Building effective agents. Start simple', do: 'Decide: agent or fixed workflow for your capstone, with a reason', resources: ['anthropic_agents'] },
  { day: 23, topic: 'Tools and MCP', learn: 'Function calling, tool design, MCP. Errors compound across steps', do: 'Calculate the success rate of a 5-step agent at 95% per step', resources: ['openai_agents_guide'] },
  { day: 24, topic: 'Cost per call and per task', learn: 'Input vs output token prices. Cost per call, per day, per month, per successful task', do: 'Compute these 4 numbers for your capstone at one illustrative price' },
  { day: 25, topic: 'Cost levers', learn: 'Routing, caching, batching, shorter context, a smaller model', do: 'Route 70% simple cases to a cheaper model. Calculate the saving' },
  { day: 26, topic: 'Latency budgets', learn: 'Time to first token vs total time. Budget every step in milliseconds', do: 'Write a latency budget for your capstone' },
  { day: 27, topic: 'Streaming vs background', learn: 'When the user waits live and when a job runs in the background. Why voice is the hardest case', do: 'Decide streaming or background for your capstone, with a reason', resources: ['voice_ai_primer'] },
  { day: 28, topic: 'Weekend block (3 h)', learn: 'Volume scenarios', do: 'Fill Template T3 at low, expected and high volume', templates: ['T3'], kind: 'weekend' },
  { day: 29, topic: 'Explain to finance', learn: 'Plain words, no undefined jargon', do: 'Write a 5-sentence note on the cost to a finance head' },
  { day: 30, topic: 'Review', learn: 'Days 16–29', do: 'Check the napkin sheet against the phase 2 checklist', templates: ['T3'], kind: 'review' },

  // Phase 3 — The AI PRD
  { day: 31, topic: 'Does it need AI?', learn: 'Rules vs ML vs LLM. Read Rules of ML 1–3: launch without ML first and measure', do: 'Write the non-AI version of your capstone. Say why AI is better, or not', resources: ['rules_of_ml'] },
  { day: 32, topic: 'AI UX patterns', learn: 'Citations, confidence, undo, streaming. Microsoft HAX guidelines', do: 'Pick 3 patterns for your capstone UX', resources: ['hax_guidelines'] },
  { day: 33, topic: 'What an AI PRD adds', learn: 'Data needs, eval threshold, latency budget, failure spec, escalation', do: 'Make the outline of your AI PRD with Template T2', templates: ['T2'], resources: ['lenny_ai_lifecycle'] },
  { day: 34, topic: 'Success before build', learn: 'Metrics at 3 levels: model quality, product, business. Guardrail metrics', do: 'Write 3-level metrics with a number and a measurement method each' },
  { day: 35, topic: 'Ship rule', learn: 'A launch rule written before any build. Kill criteria', do: 'Write: “go to 5% of traffic only if ≥ X% on evals and zero severity-3 failures”' },
  { day: 36, topic: 'Thresholds', learn: 'Precision vs recall targets. Choose a threshold by the cost of each error', do: 'Set precision and recall targets for your capstone' },
  { day: 37, topic: 'Graded failure spec', learn: 'Severity levels, detection method, exact fallback text, maximum rate. Read Google PAIR’s Errors + Graceful Failure', do: 'Write 4+ severity levels with Template T4', templates: ['T4'], resources: ['pair_errors'] },
  { day: 38, topic: 'User fallbacks', learn: 'What the user sees when AI fails. Do not automate every touchpoint', do: 'Write the exact fallback message for each severity level' },
  { day: 39, topic: 'Speed vs accuracy', learn: 'Fast and less right vs slow and more right', do: 'Choose for your capstone and explain it in 4 plain sentences' },
  { day: 40, topic: 'Human-in-the-loop', learn: 'Escalation triggers. Capacity math: cases × minutes = hours', do: 'Write 4+ triggers. Calculate the review hours a day' },
  { day: 41, topic: 'Data and privacy', learn: 'PII fields, retention, India’s DPDP Act', do: 'List every personal-data field and how you handle it' },
  { day: 42, topic: 'Launch plan', learn: 'Staged rollout, numeric kill criteria, monitoring', do: 'Write the launch plan section' },
  { day: 43, topic: 'Weekend block (3 h)', learn: 'Full draft', do: 'Write AI PRD v1 (4 pages maximum) and a 1-page PRD on a page', templates: ['T1', 'T2'], kind: 'weekend' },
  { day: 44, topic: 'Pressure test', learn: 'Read it as an engineer, a lawyer and a finance head', do: 'Write the top 3 questions from each. Fix the PRD' },
  { day: 45, topic: 'Review', learn: 'Days 31–44', do: 'Check the PRD against the phase 3 checklist', templates: ['T2'], kind: 'review' },

  // Phase 4 — Evals
  { day: 46, topic: 'What evals are', learn: 'Evals as the product spec. Watch Hamel Husain and Shreya Shankar on Lenny’s Podcast', do: 'Write what “good” means for your capstone, in numbers', resources: ['lenny_evals_podcast'] },
  { day: 47, topic: 'Gold set design', learn: 'Mix: about 30 typical, 10 edge, 10 adversarial cases. Sources: synthetic, public sample, anonymised', do: 'Set up the eval sheet with Template T5', templates: ['T5'] },
  { day: 48, topic: 'Typical cases', learn: 'Copy real messiness with fake names and numbers', do: 'Write 15 typical cases with gold answers' },
  { day: 49, topic: 'Typical cases, part 2', learn: 'Coverage across sub-types', do: 'Write 15 more typical cases' },
  { day: 50, topic: 'Edge and adversarial cases', learn: 'Edge inputs, prompt injection, policy traps', do: 'Write 10 edge and 10 adversarial cases' },
  { day: 51, topic: 'Rubrics', learn: '4–6 observable pass/fail criteria. Mark the critical ones', do: 'Write the rubric' },
  { day: 52, topic: 'Run v0', learn: 'Run without code: paste, record per case and per criterion', do: 'Run all 50 cases. Record the overall pass rate' },
  { day: 53, topic: 'Error analysis', learn: 'Read failures, name categories, count them, fix the biggest. Read Hamel’s AI Evals FAQ', do: 'Group failures into categories with counts and severity', resources: ['hamel_evals_faq', 'lenny_evals_podcast'] },
  { day: 54, topic: 'Weekend block (3 h)', learn: 'One targeted fix', do: 'Change the prompt to fix the top category. Run v1', kind: 'weekend' },
  { day: 55, topic: 'Regressions', learn: 'A fix can break cases that passed before', do: 'List every case that passed in v0 and failed in v1' },
  { day: 56, topic: 'LLM-as-judge', learn: 'Judge prompts, judge bias, check against human scores', do: 'Write a judge prompt. Compare it with your scores on 10 cases' },
  { day: 57, topic: 'Online evals', learn: 'A/B tests for AI. Signals: thumbs, edits, retries, copies', do: 'List 5 online signals for your capstone' },
  { day: 58, topic: 'RAG and agent evals', learn: 'Faithfulness, retrieval recall, task success, tool-call accuracy', do: 'Add 5 cases for the RAG or agent step, if your capstone has one' },
  { day: 59, topic: 'Ship decision', learn: 'Compare v1 results with the phase 3 ship rule', do: 'Write ship or do not ship, with the reason' },
  { day: 60, topic: 'Review', learn: 'Days 46–59', do: 'Write the error-analysis memo with Template T6', templates: ['T6'], kind: 'review' },

  // Phase 5 — Production and proof
  { day: 61, topic: 'Pick the tool', learn: '4 tool types: automation (n8n, Make), app builders (Lovable, Google AI Studio), voice agents (Vapi, Bolna), assistants (Claude Projects). How to write a spec for an AI coder', do: 'Pick a tool. Build the happy path of your capstone' },
  { day: 62, topic: 'Fallbacks in the build', learn: 'Failure specs become branches in the flow', do: 'Build 2 fallbacks from your failure table' },
  { day: 63, topic: 'Human escalation', learn: 'Hand-off triggers and the reviewer’s view', do: 'Build 1 human escalation path' },
  { day: 64, topic: 'Instrumentation', learn: 'What to log: latency, tokens or cost, prompt version, feedback, failure category', do: 'Make a run log with 8+ fields, using Template T7', templates: ['T7'] },
  { day: 65, topic: 'Logged runs', learn: 'Read a page of logs to find the top problem', do: 'Do 25+ logged runs on messy synthetic inputs' },
  { day: 66, topic: 'Observability', learn: 'Tracing, alerts, a weekly health check', do: 'Write a weekly health check for your capstone' },
  { day: 67, topic: 'Drift', learn: 'Input drift, mix shift, model change. Worked mix-shift example', do: 'Show how your pass rate changes if hard cases go from 20% to 40%' },
  { day: 68, topic: 'Security', learn: 'Prompt injection, jailbreaks, data leakage', do: 'Try 3 injection attacks on your prototype. Log the results' },
  { day: 69, topic: 'Responsible AI and governance', learn: 'Bias, NIST AI RMF, EU AI Act risk tiers, DPDP Act', do: 'Write a risk register and a rollback plan' },
  { day: 70, topic: 'Weekend block (3 h)', learn: 'Finish the prototype', do: 'Record a demo of 2 minutes or less. Write a 5-line README', kind: 'weekend' },
  { day: 71, topic: 'Teardown method', learn: '7 steps: user and job, the AI moment, architecture from behaviour, unit economics, failure handling, one trade-off, one change', do: 'Pick a real AI product. Do timed tries' },
  { day: 72, topic: 'Unit economics', learn: 'Tokens per task × public price vs what the user pays or what the feature replaces', do: 'Make the unit-economics table for the teardown' },
  { day: 73, topic: 'Architecture from behaviour', learn: 'Streaming? Citations (a hint of RAG)? Actions (a hint of tools)?', do: 'Name 2 architecture trade-offs with reasons' },
  { day: 74, topic: 'Write the teardown', learn: '“I observed” vs “I assume”', do: 'Write the teardown with Template T8', templates: ['T8'] },
  { day: 75, topic: 'Review', learn: 'Days 61–74', do: 'Check both deliverables against the phase 5 checklist', kind: 'review' },

  // Phase 6 — Strategy and interviews
  { day: 76, topic: 'AI strategy', learn: 'Where AI creates value. AI-native vs AI-added products', do: 'Make an AI opportunity map for one target company' },
  { day: 77, topic: 'PMF for AI', learn: 'Trial vs retention. PMF signals for AI', do: 'List 5 PMF signals for your capstone' },
  { day: 78, topic: 'Pricing', learn: 'Seat vs usage vs outcome. Gross margin with model cost', do: 'Make a pricing model for your capstone, using your cost per task' },
  { day: 79, topic: 'Trust, adoption, moats', learn: 'Distribution, data, workflow lock-in', do: 'Write a moat analysis for one AI competitor' },
  { day: 80, topic: 'How AI PM interviews work', learn: 'The 6 round types (see Interview prep)', do: 'Map each capstone artifact to a round' },
  { day: 81, topic: 'Reframe your PM background', learn: 'Your PM job already trained one AI PM skill: discovery and stakeholders. Add quality targets, failure specs and escalation rules', do: 'Write your 90-second background story with Template T9', templates: ['T9'] },
  { day: 82, topic: 'The apology trap', learn: 'Do not start with “I’m not technical”. Lead with the constraint, the number and the decision', do: 'Rewrite 3 weak answers. Record the 2-minute capstone story' },
  { day: 83, topic: '4 technical questions', learn: 'Halve the cost. Why is it slow. RAG or fine-tuning. Is it good enough. One number per answer', do: 'Answer all 4 out loud with numbers from your capstone' },
  { day: 84, topic: 'Weekend block (3 h)', learn: 'The 35-minute design case', do: 'Do mock case 1 with Template T10. Score it', templates: ['T10'], kind: 'weekend' },
  { day: 85, topic: 'Stakeholder trade-offs', learn: 'Explain a model trade-off in 4 plain sentences', do: 'Explain your speed vs accuracy choice to a named non-technical stakeholder' },
  { day: 86, topic: 'Behavioural rounds', learn: 'Velocity vs safety. Real stories, not a STAR script', do: 'Write 2 real stories' },
  { day: 87, topic: 'Portfolio page', learn: 'The 90-second scan. One number per exhibit card', do: 'Build the page. Link the 4 exhibits' },
  { day: 88, topic: 'Mock case 2 + live prototyping', learn: 'Build fast, say the trade-offs, raise cost and risk', do: 'Do mock case 2 as a timed prototype round', templates: ['T10'] },
  { day: 89, topic: 'Mock case 3', learn: 'A full case at a target company', do: 'Do mock case 3. Note the weakest step', templates: ['T10'] },
  { day: 90, topic: 'Final review', learn: 'Days 76–89', do: 'Publish the page. Score yourself again on the skills checklist', kind: 'review' },
];

export const phaseForDay = (day: number) => AI_PM_PHASES.find((p) => day >= p.start && day <= p.end);

export const DESIGN_CASE_STEPS =
  'The 35-minute design case. (1) Clarify the goal and one constraint. (2) Pick one user segment. (3) Pick one problem. (4) Give options, including one without AI. (5) AI design: inputs, approach, cost and latency, failure spec, escalation. (6) Metrics and eval plan. (7) Risks and rollout. Then explain the key trade-off to a non-technical stakeholder in 4 sentences.';
