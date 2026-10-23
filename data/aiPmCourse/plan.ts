// PM → AI PM: the 90-day plan. Seven phases; each ends in a gate day with a checklist. Days 3–90 come from the
// owner's "90-Day Build-First Curriculum" (2026-10-23). Shown only in local dev (see lib/featureFlags.ts).

// Every day ends with this reflection (from the curriculum document).
export const AI_PM_REFLECTION = 'What decision does this help a PM make, and what evidence would change your mind?';

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
    title: 'AI/ML foundations',
    shortTitle: 'Foundations',
    start: 1,
    end: 14,
    deliverable: 'A one-page AI landscape map with approach rationale, and a passed self-check',
    templates: [],
    artifacts: [{ name: 'AI landscape map', proves: 'You can explain core AI/ML concepts and defend an approach choice' }],
    checklistTitle: 'Gate 1: foundations',
    checklist: [
      'I can explain core AI/ML concepts in my own words',
      'I can distinguish model training from inference',
      'I can defend an initial approach choice: rules, predictive ML or GenAI',
    ],
  },
  {
    id: 2,
    title: 'GenAI and LLM systems',
    shortTitle: 'LLM systems',
    start: 15,
    end: 25,
    deliverable: 'A model and architecture choice for the capstone, with reasons',
    templates: [],
    artifacts: [{ name: 'AI-vs-rules decision and architecture diagram', proves: 'You can choose and defend an AI architecture' }],
    checklistTitle: 'Gate 2: architecture',
    checklist: [
      'I can explain why the selected model fits the problem',
      'I can explain why the selected architecture fits the problem',
      'I can compare prompting, RAG, fine-tuning, workflows and agents for this capstone',
    ],
  },
  {
    id: 3,
    title: 'Discovery and AI product definition',
    shortTitle: 'Product definition',
    start: 26,
    end: 38,
    deliverable: 'A measurable, enterprise-aware AI PRD backed by discovery evidence',
    templates: ['T1', 'T2', 'T3', 'T4'],
    artifacts: [
      { name: 'Problem statement and discovery evidence', proves: 'You validated a real need and considered alternatives' },
      { name: 'AI PRD with metrics and guardrails', proves: 'You can define a measurable AI product' },
      { name: 'Failure taxonomy and UX trust copy', proves: 'You plan for errors before launch' },
    ],
    checklistTitle: 'Gate 3: product definition',
    checklist: [
      'Shows discovery evidence',
      'Includes a PRD',
      'Includes a data strategy',
      'Defines baseline and guardrail metrics',
      'Defines failure handling',
      'Lists enterprise requirements',
    ],
  },
  {
    id: 4,
    title: 'Evals, reliability and safety',
    shortTitle: 'Evals',
    start: 39,
    end: 52,
    deliverable: 'An evaluation report with a reasoned release recommendation',
    templates: ['T5', 'T6'],
    artifacts: [{ name: 'Golden eval dataset, rubric, red-team cases and eval report', proves: 'You can measure AI quality and make a ship call' }],
    checklistTitle: 'Gate 4: evaluation',
    checklist: [
      'Shows a representative test set',
      'Shows an error taxonomy',
      'Shows eval results',
      'Shows safety tests',
      'Has a regression plan',
      'Ends with a reasoned release recommendation',
    ],
  },
  {
    id: 5,
    title: 'Build the capstone',
    shortTitle: 'Build',
    start: 53,
    end: 68,
    deliverable: 'A working end-to-end slice of the capstone with a launch plan',
    templates: ['T7'],
    artifacts: [
      { name: 'Working prototype or documented clickable demo', proves: 'You can ship a useful AI product slice' },
      { name: 'Access-control, privacy and launch/rollback review', proves: 'You can make an AI product safe to launch' },
    ],
    checklistTitle: 'Gate 5: prototype',
    checklist: [
      'Demonstrates an end-to-end slice',
      'Has safe access boundaries',
      'Has fallbacks',
      'Has observability',
      'Is evaluated',
      'Includes user feedback',
      'Has a launch plan',
    ],
    workedExample: {
      day: 60,
      text: 'The capstone gets 400 cases a day. 15% go to a human, and each review takes 4 minutes. 400 × 0.15 × 4 = 240 minutes, so you need 4 reviewer-hours a day.',
    },
  },
  {
    id: 6,
    title: 'Production, scale and strategy',
    shortTitle: 'Scale',
    start: 69,
    end: 78,
    deliverable: 'An executive memo with a scale, iterate or stop decision',
    templates: [],
    artifacts: [{ name: 'Cost/latency estimate, unit economics, roadmap and executive memo', proves: 'You can run an AI product as a business' }],
    checklistTitle: 'Gate 6: scale and strategy',
    checklist: [
      'Explains operations',
      'Explains unit economics',
      'Explains monitoring',
      'Explains experimentation',
      'Explains governance',
      'Explains deployment choices',
      'Makes a scale, iterate or stop decision',
    ],
    workedExample: {
      day: 70,
      text: 'A support bot handles 10,000 tickets a day. On the large model each ticket costs $0.012, so the bill is $120 a day. 70% of tickets are simple. Route them to a cheaper model: the bill drops to $8.40 + $36 = $44.40 a day, a 63% cut. The risk is a misrouted hard ticket, so add misrouted cases to the eval set.',
    },
  },
  {
    id: 7,
    title: 'Portfolio and interview readiness',
    shortTitle: 'Portfolio',
    start: 79,
    end: 90,
    deliverable: 'Portfolio demo and case study, updated resume and profile, and a 30-day gap plan',
    templates: ['T8', 'T9', 'T10'],
    artifacts: [{ name: 'Portfolio case study, 3–5 minute demo, resume bullets, interview stories and JD gap analysis', proves: 'You are ready for AI PM interviews' }],
    checklistTitle: 'Gate 7: career readiness',
    checklist: [
      'Presents a portfolio demo and case study',
      'Has an updated resume and LinkedIn profile',
      'Has done interview practice',
      'Has a five-JD skills matrix',
      'Has a 30-day gap plan',
    ],
  },
];

export const AI_PM_DAYS: AiPmDay[] = [
  { day: 1, topic: 'What is AI? Build your AI landscape map', learn: 'AI, machine learning, deep learning and generative AI: how they differ, and when rules beat AI', do: 'Map 3 real products to the problem they solve and their likely AI approach, get an AI review, and record your 0–15 baseline score', time: '45–60 minutes', level: 'Beginner', video: 'mUw27wG7uFA', videoTitle: 'AI Simplified: 6 Concepts You Need to Know About Modern AI (IBM Technology)' },
  { day: 2, topic: 'AI vs. Traditional Software', learn: 'Learn when to use traditional software, predictive machine learning, or generative AI, and defend your choice like a Product Manager.', do: 'Choose the right approach for 3 scenarios, then analyse one real product feature with the five questions and get an AI review', time: '45–60 minutes', skill: 'Product judgment', level: 'Beginner', video: 'u8sQOpgkR5A', videoTitle: 'AI vs Traditional Software: What’s the Difference? (Explained Simply)' },
  { day: 3, topic: 'Types of Machine Learning', learn: 'Learn the three major types of machine learning, understand when each is useful, and practise choosing the right approach for a product problem.', do: 'Answer four scenario questions, then write a mini product brief for one real feature and get an AI review', time: '45–60 minutes', skill: 'Product judgment', level: 'Beginner', video: '1FZ0A1QCMWc', videoTitle: 'Supervised vs Unsupervised vs Reinforcement Learning' },
  { day: 4, topic: 'Training Data and Labels', learn: 'Learn what examples, features and labels are, how to judge whether data is good enough, where labels come from, and how leakage fools a model.', do: 'Spot the problem in four datasets, then write a data inventory and a starter question set for your capstone and get an AI review', time: '45–60 minutes', skill: 'Data judgment', level: 'Beginner', video: 'GQXn_1HONBY', videoTitle: 'Machine Learning: Features and Labels (ByteMonk)' },
  { day: 5, topic: "Classification vs. Regression", learn: "Tell categories from numbers, see why models output scores, and learn to set a threshold based on which mistake costs more.", do: "Answer four questions, then frame two features (one from your capstone) with a target and a threshold, and get an AI review", time: "45–60 minutes", skill: "Product judgment", level: "Beginner", video: "g0F3vWjdW7w", videoTitle: "Classification vs Regression: Key Differences and Use Cases" },
  { day: 6, topic: "Clustering, Ranking, and Recommendations", learn: "Understand retrieval, ranking and recommendation, the signals they learn from, and the trade-offs a PM sets.", do: "Identify four patterns, then map one ranked feature with its signals, value, metric and risk, and get an AI review", time: "45–60 minutes", skill: "Product judgment", level: "Beginner", video: "Ams4sEn50cw", videoTitle: "Recommender Systems: Basics, Types, and Design Considerations" },
  { day: 7, topic: "Model Quality: Precision and Recall", learn: "Read a confusion matrix, explain precision and recall, and choose the metric that matches the cost of each mistake.", do: "Answer four precision-or-recall questions, then write a metric choice memo and get an AI review", time: "45–60 minutes", skill: "Metrics", level: "Beginner", video: "Kdsp6soqA7o", videoTitle: "Machine Learning Fundamentals: The Confusion Matrix (StatQuest)" },
  { day: 8, topic: "Overfitting, Underfitting, and Generalization", learn: "Explain overfitting and underfitting, why test data must stay separate, and how drift breaks models after launch.", do: "Diagnose four model problems, then build a model failure checklist for your capstone and get an AI review", time: "45–60 minutes", skill: "Risk judgment", level: "Beginner", video: "0RT2Q0qwXSA", videoTitle: "Overfitting, Underfitting, and Bad Data Are Ruining Your Predictive Models (IBM Technology)" },
  { day: 9, topic: "Neural Networks: The Useful Mental Model", learn: "Build a useful mental model of neural networks: layers, weights, learned representations, and what they mean for products.", do: "Answer four questions, then explain a neural network to a stakeholder in five sentences and get an AI review", time: "45–60 minutes", skill: "Technical fluency", level: "Beginner", video: "aircAruvnKk", videoTitle: "But what is a neural network? (3Blue1Brown)" },
  { day: 10, topic: "Training, Loss, and Optimization", learn: "Understand loss, gradient descent and the train, evaluate, adjust loop, and why models learn exactly what you measure.", do: "Answer four questions, then sketch the training loop and its risks for your capstone and get an AI review", time: "45–60 minutes", skill: "Technical fluency", level: "Beginner", video: "IHZwWFHWa-w", videoTitle: "Gradient descent, how neural networks learn (3Blue1Brown)" },
  { day: 11, topic: "Backpropagation vs. Inference", learn: "Separate training from inference and learn where latency and cost come from in an AI feature.", do: "Sort four cases into training or inference, then estimate latency and cost for your capstone and get an AI review", time: "45–60 minutes", skill: "Technical fluency", level: "Beginner", video: "XtT5i0ZeHHE", videoTitle: "AI Inference: The Secret to AI's Superpowers (IBM Technology)" },
  { day: 12, topic: "Deep Learning Strengths and Limits", learn: "Learn where deep learning shines and struggles, and why a simple baseline always comes first.", do: "Choose rules or deep learning for four cases, then compare a baseline with an ML option for your capstone and get an AI review", time: "45–60 minutes", skill: "Product judgment", level: "Beginner", video: "q6kJ71tEYqM", videoTitle: "Machine Learning vs Deep Learning (IBM Technology)" },
  { day: 13, topic: "AI Failure Modes", learn: "Recognise bias, drift, poor calibration, leakage, brittleness and silent failure, and plan how to detect each.", do: "Name four failure modes, then build a three-risk register for your capstone and get an AI review", time: "45–60 minutes", skill: "Risk judgment", level: "Beginner", video: "og67qeTZPYs", videoTitle: "Algorithmic Bias in AI: What It Is and How to Fix It (IBM Technology)" },
  { day: 14, topic: "Phase 1 Review and Gate 1", learn: "Pull Phase 1 together: recap every concept, take the self-check, and defend your approach choices.", do: "Score 5 of 6 on the self-check and submit your AI landscape map with an approach rationale for an AI review", kind: 'review', time: "60–75 minutes", skill: "Gate review", level: "Beginner" },
  { day: 15, topic: "What an LLM Is", learn: "Understand tokens, next-token prediction and context windows, and why fluent output is not proof of truth.", do: "Answer four questions, then write an LLM capability and limitation cheat sheet for your capstone and get an AI review", resources: ['karpathy_intro_llms', 'karpathy_tokenizer'], time: "45–60 minutes", skill: "Technical fluency", level: "Intermediate", video: "5sLYAQS9sWQ", videoTitle: "How Large Language Models Work (IBM Technology)" },
  { day: 16, topic: "Pretraining and Instruction Tuning", learn: "Distinguish pretraining, instruction tuning and preference tuning, and what each means for your product.", do: "Sort four training steps, then explain model training to a CEO and get an AI review", time: "45–60 minutes", skill: "Technical fluency", level: "Intermediate", video: "T_X4XFwKX8k", videoTitle: "Reinforcement Learning from Human Feedback (RLHF) Explained (IBM Technology)" },
  { day: 17, topic: "Prompting as Product Design", learn: "Structure prompts with role, task, context, examples, constraints and output format, and treat them as versioned, tested product assets.", do: "Spot four missing prompt parts, then write a prompt template with three test cases for your capstone and get an AI review", time: "45–60 minutes", skill: "Prompt design", level: "Intermediate", video: "vD0E3EUb8-8", videoTitle: "Context Engineering vs. Prompt Engineering (IBM Technology)" },
  { day: 18, topic: "Temperature and Sampling", learn: "Understand temperature and sampling, when to use low or high randomness, and why repeatability is never guaranteed.", do: "Choose settings for four tasks, then specify generation settings for two capstone features and get an AI review", time: "45–60 minutes", skill: "Prompt design", level: "Intermediate", video: "vI35anoe_fY", videoTitle: "Temperature and Top P Explained in Plain English" },
  { day: 19, topic: "Model APIs and Structured Outputs", learn: "Understand API requests and responses, structured JSON outputs, and how to handle rate limits, timeouts and invalid output.", do: "Answer four questions, then draft a JSON output schema and failure rules for your capstone and get an AI review", time: "45–60 minutes", skill: "Technical fluency", level: "Intermediate", video: "CllLqPwCjD4", videoTitle: "Getting Structured Output in JSON format" },
  { day: 20, topic: "Tool Calling and Function Calling", learn: "Understand how a model requests a tool and why application code must check permissions, validate inputs and confirm risky actions.", do: "Answer four questions, then draw a tool-call sequence with checks for your capstone and get an AI review", time: "45–60 minutes", skill: "System design", level: "Intermediate", video: "h8gMhXYAv1k", videoTitle: "What is Tool Calling? Connecting LLMs to Your Data (IBM Technology)" },
  { day: 21, topic: "Embeddings and Semantic Search", learn: "Understand embeddings, semantic search and chunking, and predict where retrieval will fail.", do: "Diagnose four retrieval problems, then sketch your capstone's retrieval flow and get an AI review", time: "45–60 minutes", skill: "System design", level: "Intermediate", video: "gl1r1XV0SLw", videoTitle: "What is a Vector Database? Powering Semantic Search & AI Applications (IBM Technology)" },
  { day: 22, topic: "RAG: Retrieval-Augmented Generation", learn: "Understand ingestion, chunking, retrieval, context assembly, generation and citations, and where RAG quality comes from.", do: "Trace four failures to their stage, then design the RAG architecture for your capstone and get an AI review", time: "45–60 minutes", skill: "System design", level: "Intermediate", video: "T-D1OfcDW1M", videoTitle: "What is Retrieval-Augmented Generation (RAG)? (IBM Technology)" },
  { day: 23, topic: "RAG vs. Fine-Tuning vs. Prompting", learn: "Choose between prompting, RAG and fine-tuning based on freshness, behaviour, data, cost and evaluation.", do: "Pick the first approach for four cases, then complete a decision matrix for three scenarios and get an AI review", resources: ['openai_accuracy'], time: "45–60 minutes", skill: "Product judgment", level: "Intermediate", video: "zYGDpG-pTho", videoTitle: "RAG vs Fine-Tuning vs Prompt Engineering: Optimizing AI Models (IBM Technology)" },
  { day: 24, topic: "Agents, Workflows, and Multimodal AI", learn: "Distinguish fixed workflows from agentic loops, set tool boundaries for agents, and see what multimodal models add.", do: "Choose workflow or agent for four cases, then decide for one capstone use case with its boundaries and get an AI review", resources: ['anthropic_agents', 'openai_agents_guide'], time: "45–60 minutes", skill: "System design", level: "Intermediate", video: "ZVPlLaehjLk", videoTitle: "Agentic AI Frameworks Explained: Workflows, Multi-Agent, & Production (IBM Technology)" },
  { day: 25, topic: "Model Selection and Architecture Review", learn: "Compare models on quality, latency, cost, privacy, context length, deployment and vendor risk, and recap Phase 2.", do: "Score 5 of 6 on the self-check and submit your model and architecture decision record for an AI review", kind: 'review', time: "60–75 minutes", skill: "Gate review", level: "Intermediate" },
  { day: 26, topic: "Capstone: Pick the User and Problem", learn: "Select a narrow, valuable problem for a connected AI product capstone.", do: "Write a problem statement, target user, and non-goals.", time: "45–60 minutes" },
  { day: 27, topic: "Customer Discovery Plan", learn: "Plan interviews and evidence collection without leading questions or pitching the solution.", do: "Create an interview guide and recruit list.", time: "45–60 minutes" },
  { day: 28, topic: "Conduct and Synthesize Discovery", learn: "Separate observed behavior from opinions; identify jobs, workarounds, frequency, and pain.", do: "Summarize evidence from interviews or credible existing research.", time: "45–75 minutes" },
  { day: 29, topic: "AI or Rules? Validate the Need for AI", learn: "Test whether AI is necessary versus rules, search, workflow changes, or conventional software.", do: "Write an AI-vs-non-AI decision with evidence and assumptions.", time: "45–60 minutes", resources: ['rules_of_ml'] },
  { day: 30, topic: "Human-AI Interaction Principles", learn: "Design for user control, transparency, correction, recovery, and calibrated trust.", do: "Map the user journey and identify trust moments.", time: "45–60 minutes", resources: ['hax_guidelines'] },
  { day: 31, topic: "Write the AI Product PRD", learn: "Define users, problem, scope, requirements, nonfunctional constraints, and open questions.", do: "Create PRD v1 for the capstone.", time: "60–75 minutes", templates: ['T1', 'T2'], resources: ['lenny_ai_lifecycle'] },
  { day: 32, topic: "Data Strategy and Readiness", learn: "Identify source data, permissions, quality, retention, ownership, and gaps.", do: "Create a data inventory and data-readiness scorecard.", time: "45–60 minutes" },
  { day: 33, topic: "Baseline and Success Metrics", learn: "Set a non-AI baseline, primary outcome, guardrails, and measurement window.", do: "Write a metric tree and baseline measurement plan.", time: "45–60 minutes" },
  { day: 34, topic: "Define Acceptable Failure", learn: "Classify low-, medium-, and high-impact errors and specify abstention or escalation.", do: "Create an error-severity matrix and fallback policy.", time: "45–60 minutes", templates: ['T4'], resources: ['pair_errors'] },
  { day: 35, topic: "Trust, Transparency, and UX Copy", learn: "Explain uncertainty, sources, limitations, and user choices without overclaiming.", do: "Draft key UI states and user-facing trust copy.", time: "45–60 minutes" },
  { day: 36, topic: "Voice and Conversational UX", learn: "Design turn-taking, clarification, interruption, repair, and conversation endings where relevant.", do: "Create a conversation flow or explain why voice is out of scope.", time: "45–60 minutes", resources: ['voice_ai_primer'] },
  { day: 37, topic: "Cost, Latency, and Business Viability", learn: "Estimate usage, tokens, retrieval, tool calls, latency budgets, and cost per task.", do: "Build a simple cost/latency estimate with assumptions.", time: "45–60 minutes", templates: ['T3'] },
  { day: 38, topic: "Enterprise Requirements and PRD Review", learn: "Cover security, permissions, tenant isolation, auditability, integrations, human review, and rollout.", do: "Submit PRD v2 and a review memo with unresolved risks.", time: "60–75 minutes", kind: 'review' },
  { day: 39, topic: "Why Evals Matter", learn: "Treat evals as product quality measurement, not just model benchmarks.", do: "Define an evaluation strategy tied to user outcomes.", time: "45–60 minutes", resources: ['lenny_evals_podcast'] },
  { day: 40, topic: "Build an Error Taxonomy", learn: "Group failures into actionable categories such as retrieval, reasoning, policy, format, and tool errors.", do: "Create a labeled error taxonomy for the capstone.", time: "45–60 minutes" },
  { day: 41, topic: "Create a Golden Dataset", learn: "Build representative test cases with expected outcomes, source evidence, and edge cases.", do: "Create the first 20 golden cases with labels and rationale.", time: "45–60 minutes", templates: ['T5'] },
  { day: 42, topic: "Expand to a 50-Case Evaluation Set", learn: "Cover common, difficult, ambiguous, adversarial, and underrepresented cases.", do: "Complete a 50-case evaluation dataset or documented staged plan.", time: "60–75 minutes", templates: ['T5'] },
  { day: 43, topic: "End-to-End Task Success", learn: "Measure whether users can complete the whole task, not merely whether a response sounds good.", do: "Define task success, partial success, and failure labels.", time: "45–60 minutes" },
  { day: 44, topic: "LLM-as-Judge and Human Alignment", learn: "Understand rubric design, judge bias, calibration, and human agreement checks.", do: "Draft a judge rubric and compare a small sample with human ratings.", time: "45–60 minutes", resources: ['hamel_evals_faq'] },
  { day: 45, topic: "Deterministic Checks and Schema Validation", learn: "Use code-based checks for formatting, required fields, tool permissions, and invariants.", do: "Add a deterministic test checklist alongside subjective quality checks.", time: "45–60 minutes" },
  { day: 46, topic: "Groundedness and Citation Quality", learn: "Evaluate whether claims are supported by retrieved sources and citations are useful.", do: "Score groundedness and citation correctness on representative cases.", time: "45–60 minutes" },
  { day: 47, topic: "Red Teaming and Abuse Cases", learn: "Test prompt injection, data exfiltration attempts, unsafe requests, and instruction conflicts.", do: "Create a threat-oriented adversarial test set.", time: "45–60 minutes" },
  { day: 48, topic: "Fairness and Segment Analysis", learn: "Look for performance gaps across relevant users, languages, content types, and access needs.", do: "Define a segment-level evaluation plan with privacy safeguards.", time: "45–60 minutes" },
  { day: 49, topic: "Regression Testing and Release Gates", learn: "Prevent fixes from silently breaking previously passing cases.", do: "Define a regression suite and explicit ship/no-ship thresholds.", time: "45–60 minutes" },
  { day: 50, topic: "Online Signals and Production Feedback", learn: "Use user corrections, abandonment, escalation, latency, and support tickets carefully.", do: "Map online signals to hypotheses and investigation steps.", time: "45–60 minutes" },
  { day: 51, topic: "Analyze Evaluation Results", learn: "Prioritize errors by severity, frequency, user impact, and fix cost.", do: "Create an error analysis report with the top five fixes.", time: "45–60 minutes", templates: ['T6'] },
  { day: 52, topic: "Evaluation Gate and Quality Review", learn: "Communicate readiness, residual risk, known limitations, and release criteria.", do: "Submit an evaluation report and release recommendation.", time: "60–75 minutes", templates: ['T6'], kind: 'review' },
  { day: 53, topic: "Prototype Scope and Build Plan", learn: "Choose the smallest useful end-to-end slice and select a lightweight build approach.", do: "Write a prototype plan with milestones and explicit non-goals.", time: "45–60 minutes" },
  { day: 54, topic: "System Prompt and Instruction Design", learn: "Separate system constraints, user inputs, retrieved context, and output requirements.", do: "Create a versioned instruction set and prompt test cases.", time: "45–60 minutes" },
  { day: 55, topic: "Structured Output in the Prototype", learn: "Make model outputs machine-readable and validate them before display or action.", do: "Implement or specify a validated output schema.", time: "45–75 minutes" },
  { day: 56, topic: "Build the Core User Flow", learn: "Connect the input, AI response, user feedback, and task completion path.", do: "Ship a working happy path or clickable end-to-end prototype.", time: "60–75 minutes" },
  { day: 57, topic: "Add Retrieval and Source Context", learn: "Ground responses in approved source material and surface useful citations.", do: "Implement or document ingestion, retrieval, and source display.", time: "45–75 minutes" },
  { day: 58, topic: "Access Control and Permissions", learn: "Enforce least privilege and ensure users only retrieve content they are allowed to see.", do: "Create a permission matrix and test cross-user access boundaries.", time: "45–60 minutes" },
  { day: 59, topic: "Tool Calling and Action Safety", learn: "Validate tool arguments, authorize actions server-side, and confirm before consequential actions.", do: "Create a tool contract and action-safety test cases.", time: "45–60 minutes" },
  { day: 60, topic: "Fallbacks, Abstention, and Escalation", learn: "Handle missing context, uncertainty, API errors, and unsupported requests gracefully.", do: "Implement or prototype fallback and escalation states.", time: "45–60 minutes" },
  { day: 61, topic: "Observability and Logging", learn: "Track traces, model/version, latency, errors, cost, and privacy-safe diagnostic context.", do: "Define an observability dashboard specification and logging policy.", time: "45–60 minutes", templates: ['T7'] },
  { day: 62, topic: "Connect the Eval Suite", learn: "Run the golden set against the current prototype and make results repeatable.", do: "Record a baseline evaluation report for the prototype.", time: "45–60 minutes" },
  { day: 63, topic: "Iteration Based on Evidence", learn: "Use failure patterns to choose the next fix rather than endlessly tweaking prompts.", do: "Prioritize and ship one measurable quality improvement.", time: "45–60 minutes" },
  { day: 64, topic: "Usability Test With Realistic Tasks", learn: "Observe users completing tasks; capture success, confusion, workarounds, and trust concerns.", do: "Run or plan 3–5 usability sessions and summarize findings.", time: "45–75 minutes" },
  { day: 65, topic: "Security and Privacy Review", learn: "Review data minimization, retention, secrets, injection, sensitive outputs, and access boundaries.", do: "Complete a security/privacy checklist and remediation list.", time: "45–60 minutes" },
  { day: 66, topic: "Tenant Isolation and Enterprise Controls", learn: "Validate organization-level boundaries, admin controls, audit needs, and deployment constraints.", do: "Document tenant-isolation tests and enterprise requirements.", time: "45–60 minutes" },
  { day: 67, topic: "Launch Plan and Operational Readiness", learn: "Plan staged rollout, support, ownership, rollback, communications, and success monitoring.", do: "Create a launch checklist and rollout plan.", time: "45–60 minutes" },
  { day: 68, topic: "Prototype Readiness Gate", learn: "Review quality, usability, safety, reliability, cost, and open risks before sharing.", do: "Deliver a working capstone demo and readiness decision.", time: "60–75 minutes", kind: 'review' },
  { day: 69, topic: "Production Operations for AI Products", learn: "Define ownership, incident response, escalation, runbooks, and service expectations.", do: "Draft an AI product operations runbook.", time: "45–60 minutes" },
  { day: 70, topic: "Cost and Latency at Scale", learn: "Estimate load, concurrency, caching, model routing, batching, and quality-cost trade-offs.", do: "Create a scale scenario with cost and latency budgets.", time: "45–60 minutes" },
  { day: 71, topic: "Monitoring Quality and Drift", learn: "Monitor quality, traffic mix, data changes, tool failures, and model/version changes.", do: "Define a monitoring dashboard and alert thresholds.", time: "45–60 minutes" },
  { day: 72, topic: "Experimentation and Causal Measurement", learn: "Design experiments carefully; distinguish correlation from causal impact and handle guardrails.", do: "Write an experiment plan with hypothesis, primary metric, guardrails, and duration logic.", time: "45–60 minutes" },
  { day: 73, topic: "Pricing and Unit Economics", learn: "Estimate cost per successful task, gross margin implications, usage limits, and pricing options.", do: "Build a simple unit-economics model with explicit assumptions.", time: "45–60 minutes" },
  { day: 74, topic: "Responsible AI, Policy, and Governance", learn: "Translate policy and risk principles into product requirements, ownership, and review processes.", do: "Create a risk/control/owner matrix.", time: "45–60 minutes" },
  { day: 75, topic: "Enterprise Deployment Options", learn: "Compare SaaS, private cloud, self-hosting, regional deployment, and customer-managed keys at a high level.", do: "Create a deployment decision matrix for the capstone customer.", time: "45–60 minutes" },
  { day: 76, topic: "Model and Prompt Updates", learn: "Plan versioning, regression checks, canary rollout, rollback, and customer communication.", do: "Write a model-change management plan.", time: "45–60 minutes" },
  { day: 77, topic: "Roadmap Under Constraints", learn: "Prioritize reliability, adoption, cost, and strategic value while acknowledging dependencies.", do: "Create a Now/Next/Later roadmap with trade-offs.", time: "45–60 minutes" },
  { day: 78, topic: "Executive Decision Memo", learn: "Communicate business value, evidence, risks, investment, and the next decision succinctly.", do: "Submit a one-page executive memo recommending scale, iterate, or stop.", time: "60–75 minutes", kind: 'review' },
  { day: 79, topic: "Capstone Case Study Structure", learn: "Tell the story from problem discovery through architecture, evaluation, launch, and outcomes.", do: "Create a case study outline with evidence and limitations.", time: "45–60 minutes", templates: ['T8'] },
  { day: 80, topic: "Build the Portfolio Demo", learn: "Prepare a clear walkthrough that demonstrates the real workflow and its safeguards.", do: "Record or script a 3–5 minute product demo.", time: "45–75 minutes" },
  { day: 81, topic: "Write the Portfolio Case Study", learn: "Document problem, users, alternatives, decisions, metrics, failures, and lessons honestly.", do: "Publish a portfolio-ready case study draft.", time: "60–75 minutes" },
  { day: 82, topic: "Rewrite Resume for AI PM Roles", learn: "Turn work into evidence-based impact bullets without unsupported claims or inflated ownership.", do: "Create an AI PM resume version mapped to target role requirements.", time: "45–60 minutes", templates: ['T9'] },
  { day: 83, topic: "LinkedIn Positioning and Public Narrative", learn: "Explain your product point of view and show concrete artifacts without overclaiming expertise.", do: "Draft a LinkedIn post about the capstone and a concise profile summary.", time: "45–60 minutes" },
  { day: 84, topic: "AI Product Sense Interview Practice", learn: "Structure ambiguous AI product cases around users, problem, approach, metrics, and risk.", do: "Answer one timed AI product sense case and self-review it.", time: "45–60 minutes" },
  { day: 85, topic: "AI System Design Interview Practice", learn: "Explain architecture, data flow, retrieval, model choice, permissions, fallbacks, and trade-offs.", do: "Draw and narrate one AI system design diagram.", time: "45–60 minutes" },
  { day: 86, topic: "Evals, Metrics, and Quality Interview Practice", learn: "Discuss golden sets, task success, groundedness, regression, online signals, and release gates.", do: "Prepare a metrics/evaluation case answer with a worked example.", time: "45–60 minutes" },
  { day: 87, topic: "AI Product Design Case", learn: "Design a user-centered AI experience with controls, uncertainty handling, and failure recovery.", do: "Complete one product design case and failure-state map.", time: "45–60 minutes", templates: ['T10'] },
  { day: 88, topic: "Leadership and Cross-Functional Stories", learn: "Prepare concise stories about trade-offs, conflict, prioritization, ambiguity, and learning from failure.", do: "Write five STAR stories grounded in real experience.", time: "45–60 minutes" },
  { day: 89, topic: "Mock Interview and Feedback Loop", learn: "Run a realistic mock covering product judgment, technical fluency, metrics, and leadership.", do: "Complete a mock interview, score it, and list the three highest-impact gaps.", time: "60–75 minutes" },
  { day: 90, topic: "Final Review and 30-Day Gap Plan", learn: "Review evidence, inspect five real AI PM job descriptions, and plan targeted follow-up learning.", do: "Deliver final portfolio checklist, JD skills matrix, and 30-day gap plan.", time: "60–75 minutes", kind: 'review' },
];

export const phaseForDay = (day: number) => AI_PM_PHASES.find((p) => day >= p.start && day <= p.end);

export const DESIGN_CASE_STEPS =
  'The 35-minute design case. (1) Clarify the goal and one constraint. (2) Pick one user segment. (3) Pick one problem. (4) Give options, including one without AI. (5) AI design: inputs, approach, cost and latency, failure spec, escalation. (6) Metrics and eval plan. (7) Risks and rollout. Then explain the key trade-off to a non-technical stakeholder in 4 sentences.';
