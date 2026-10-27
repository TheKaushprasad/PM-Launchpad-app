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
  objective?: string; // shown above the video
  moreVideos?: { id: string; title: string }[]; // extra videos; picked from Course material to play in the top player
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
    deliverable: 'A model and architecture choice for an AI product, with reasons',
    templates: [],
    artifacts: [{ name: 'AI-vs-rules decision and architecture diagram', proves: 'You can choose and defend an AI architecture' }],
    checklistTitle: 'Gate 2: architecture',
    checklist: [
      'I can explain why the selected model fits the problem',
      'I can explain why the selected architecture fits the problem',
      'I can compare prompting, RAG, fine-tuning, workflows and agents for a given product',
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
    title: 'Build a prototype',
    shortTitle: 'Build',
    start: 53,
    end: 68,
    deliverable: 'A working end-to-end slice of an AI product with a launch plan',
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
      text: 'A support assistant gets 400 cases a day. 15% go to a human, and each review takes 4 minutes. 400 × 0.15 × 4 = 240 minutes, so you need 4 reviewer-hours a day.',
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
  { day: 1, topic: 'What is AI? The AI umbrella', learn: 'AI, machine learning, deep learning and generative AI, with a product example for each', do: 'Watch two short videos, then answer a 3-question quiz', time: '45–60 minutes', level: 'Beginner', video: 'dx_Ruw8vufI', videoTitle: 'What is AI?', objective: 'Understand AI, it’s history and its related concept', moreVideos: [{ id: 'mUw27wG7uFA', title: '6 Concepts You Need to Know About Modern AI' }] },
  { day: 2, topic: 'AI vs. Traditional Software', learn: 'Learn when to use traditional software, predictive machine learning, or generative AI, and defend your choice like a Product Manager.', do: 'Choose the right approach for 3 scenarios, then analyse one real product feature with the five questions', time: '45–60 minutes', skill: 'Product judgment', level: 'Beginner', video: 'u8sQOpgkR5A', videoTitle: 'AI vs Traditional Software: What’s the Difference? (Explained Simply)' },
  { day: 3, topic: 'Types of Machine Learning', learn: 'Learn the three major types of machine learning, understand when each is useful, and practise choosing the right approach for a product problem.', do: 'Answer four scenario questions, then write a mini product brief for one real feature', time: '45–60 minutes', skill: 'Product judgment', level: 'Beginner', video: '1FZ0A1QCMWc', videoTitle: 'Supervised vs Unsupervised vs Reinforcement Learning' },
  { day: 4, topic: 'Training Data and Labels', learn: 'Learn what examples, features and labels are, how to judge whether data is good enough, where labels come from, and how leakage fools a model.', do: 'Spot the problem in four datasets, then write a data inventory and a starter question set for an AI product', time: '45–60 minutes', skill: 'Data judgment', level: 'Beginner', video: 'GQXn_1HONBY', videoTitle: 'Machine Learning: Features and Labels (ByteMonk)' },
  { day: 5, topic: "Classification vs. Regression", learn: "Tell categories from numbers, see why models output scores, and learn to set a threshold based on which mistake costs more.", do: "Answer four questions, then frame two features with a target and a threshold", time: "45–60 minutes", skill: "Product judgment", level: "Beginner", video: "g0F3vWjdW7w", videoTitle: "Classification vs Regression: Key Differences and Use Cases" },
  { day: 6, topic: "Clustering, Ranking, and Recommendations", learn: "Understand retrieval, ranking and recommendation, the signals they learn from, and the trade-offs a PM sets.", do: "Identify four patterns, then map one ranked feature with its signals, value, metric and risk", time: "45–60 minutes", skill: "Product judgment", level: "Beginner", video: "Ams4sEn50cw", videoTitle: "Recommender Systems: Basics, Types, and Design Considerations" },
  { day: 7, topic: "Model Quality: Precision and Recall", learn: "Read a confusion matrix, explain precision and recall, and choose the metric that matches the cost of each mistake.", do: "Answer four precision-or-recall questions, then write a metric choice memo", time: "45–60 minutes", skill: "Metrics", level: "Beginner", video: "Kdsp6soqA7o", videoTitle: "Machine Learning Fundamentals: The Confusion Matrix (StatQuest)" },
  { day: 8, topic: "Overfitting, Underfitting, and Generalization", learn: "Explain overfitting and underfitting, why test data must stay separate, and how drift breaks models after launch.", do: "Diagnose four model problems, then build a model failure checklist for an AI product", time: "45–60 minutes", skill: "Risk judgment", level: "Beginner", video: "0RT2Q0qwXSA", videoTitle: "Overfitting, Underfitting, and Bad Data Are Ruining Your Predictive Models (IBM Technology)" },
  { day: 9, topic: "Neural Networks: The Useful Mental Model", learn: "Build a useful mental model of neural networks: layers, weights, learned representations, and what they mean for products.", do: "Answer four questions, then explain a neural network to a stakeholder in five sentences", time: "45–60 minutes", skill: "Technical fluency", level: "Beginner", video: "aircAruvnKk", videoTitle: "But what is a neural network? (3Blue1Brown)" },
  { day: 10, topic: "Training, Loss, and Optimization", learn: "Understand loss, gradient descent and the train, evaluate, adjust loop, and why models learn exactly what you measure.", do: "Answer four questions, then sketch the training loop and its risks for an AI product", time: "45–60 minutes", skill: "Technical fluency", level: "Beginner", video: "IHZwWFHWa-w", videoTitle: "Gradient descent, how neural networks learn (3Blue1Brown)" },
  { day: 11, topic: "Backpropagation vs. Inference", learn: "Separate training from inference and learn where latency and cost come from in an AI feature.", do: "Sort four cases into training or inference, then estimate latency and cost for an AI product", time: "45–60 minutes", skill: "Technical fluency", level: "Beginner", video: "XtT5i0ZeHHE", videoTitle: "AI Inference: The Secret to AI's Superpowers (IBM Technology)" },
  { day: 12, topic: "Deep Learning Strengths and Limits", learn: "Learn where deep learning shines and struggles, and why a simple baseline always comes first.", do: "Choose rules or deep learning for four cases, then compare a baseline with an ML option for an AI product", time: "45–60 minutes", skill: "Product judgment", level: "Beginner", video: "q6kJ71tEYqM", videoTitle: "Machine Learning vs Deep Learning (IBM Technology)" },
  { day: 13, topic: "AI Failure Modes", learn: "Recognise bias, drift, poor calibration, leakage, brittleness and silent failure, and plan how to detect each.", do: "Name four failure modes, then build a three-risk register for an AI product", time: "45–60 minutes", skill: "Risk judgment", level: "Beginner", video: "og67qeTZPYs", videoTitle: "Algorithmic Bias in AI: What It Is and How to Fix It (IBM Technology)" },
  { day: 14, topic: "Phase 1 Review and Gate 1", learn: "Pull Phase 1 together: recap every concept, take the self-check, and defend your approach choices.", do: "Score 5 of 6 on the self-check and submit your AI landscape map with an approach rationale", kind: 'review', time: "60–75 minutes", skill: "Gate review", level: "Beginner" },
  { day: 15, topic: "What an LLM Is", learn: "Understand tokens, next-token prediction and context windows, and why fluent output is not proof of truth.", do: "Answer four questions, then write an LLM capability and limitation cheat sheet for an AI product", resources: ['karpathy_intro_llms', 'karpathy_tokenizer'], time: "45–60 minutes", skill: "Technical fluency", level: "Intermediate", video: "5sLYAQS9sWQ", videoTitle: "How Large Language Models Work (IBM Technology)" },
  { day: 16, topic: "Pretraining and Instruction Tuning", learn: "Distinguish pretraining, instruction tuning and preference tuning, and what each means for your product.", do: "Sort four training steps, then explain model training to a CEO", time: "45–60 minutes", skill: "Technical fluency", level: "Intermediate", video: "T_X4XFwKX8k", videoTitle: "Reinforcement Learning from Human Feedback (RLHF) Explained (IBM Technology)" },
  { day: 17, topic: "Prompting as Product Design", learn: "Structure prompts with role, task, context, examples, constraints and output format, and treat them as versioned, tested product assets.", do: "Spot four missing prompt parts, then write a prompt template with three test cases for an AI product", time: "45–60 minutes", skill: "Prompt design", level: "Intermediate", video: "vD0E3EUb8-8", videoTitle: "Context Engineering vs. Prompt Engineering (IBM Technology)" },
  { day: 18, topic: "Temperature and Sampling", learn: "Understand temperature and sampling, when to use low or high randomness, and why repeatability is never guaranteed.", do: "Choose settings for four tasks, then specify generation settings for two AI features", time: "45–60 minutes", skill: "Prompt design", level: "Intermediate", video: "vI35anoe_fY", videoTitle: "Temperature and Top P Explained in Plain English" },
  { day: 19, topic: "Model APIs and Structured Outputs", learn: "Understand API requests and responses, structured JSON outputs, and how to handle rate limits, timeouts and invalid output.", do: "Answer four questions, then draft a JSON output schema and failure rules for an AI product", time: "45–60 minutes", skill: "Technical fluency", level: "Intermediate", video: "CllLqPwCjD4", videoTitle: "Getting Structured Output in JSON format" },
  { day: 20, topic: "Tool Calling and Function Calling", learn: "Understand how a model requests a tool and why application code must check permissions, validate inputs and confirm risky actions.", do: "Answer four questions, then draw a tool-call sequence with checks for an AI product", time: "45–60 minutes", skill: "System design", level: "Intermediate", video: "h8gMhXYAv1k", videoTitle: "What is Tool Calling? Connecting LLMs to Your Data (IBM Technology)" },
  { day: 21, topic: "Embeddings and Semantic Search", learn: "Understand embeddings, semantic search and chunking, and predict where retrieval will fail.", do: "Diagnose four retrieval problems, then sketch an AI product's retrieval flow", time: "45–60 minutes", skill: "System design", level: "Intermediate", video: "gl1r1XV0SLw", videoTitle: "What is a Vector Database? Powering Semantic Search & AI Applications (IBM Technology)" },
  { day: 22, topic: "RAG: Retrieval-Augmented Generation", learn: "Understand ingestion, chunking, retrieval, context assembly, generation and citations, and where RAG quality comes from.", do: "Trace four failures to their stage, then design the RAG architecture for an AI product", time: "45–60 minutes", skill: "System design", level: "Intermediate", video: "T-D1OfcDW1M", videoTitle: "What is Retrieval-Augmented Generation (RAG)? (IBM Technology)" },
  { day: 23, topic: "RAG vs. Fine-Tuning vs. Prompting", learn: "Choose between prompting, RAG and fine-tuning based on freshness, behaviour, data, cost and evaluation.", do: "Pick the first approach for four cases, then complete a decision matrix for three scenarios", resources: ['openai_accuracy'], time: "45–60 minutes", skill: "Product judgment", level: "Intermediate", video: "zYGDpG-pTho", videoTitle: "RAG vs Fine-Tuning vs Prompt Engineering: Optimizing AI Models (IBM Technology)" },
  { day: 24, topic: "Agents, Workflows, and Multimodal AI", learn: "Distinguish fixed workflows from agentic loops, set tool boundaries for agents, and see what multimodal models add.", do: "Choose workflow or agent for four cases, then decide for one AI use case with its boundaries", resources: ['anthropic_agents', 'openai_agents_guide'], time: "45–60 minutes", skill: "System design", level: "Intermediate", video: "ZVPlLaehjLk", videoTitle: "Agentic AI Frameworks Explained: Workflows, Multi-Agent, & Production (IBM Technology)" },
  { day: 25, topic: "Model Selection and Architecture Review", learn: "Compare models on quality, latency, cost, privacy, context length, deployment and vendor risk, and recap Phase 2.", do: "Score 5 of 6 on the self-check and submit your model and architecture decision record", kind: 'review', time: "60–75 minutes", skill: "Gate review", level: "Intermediate" },
  { day: 26, topic: "Pick the User and Problem", learn: "Select a narrow, valuable problem for a specific user, and write it without assuming the solution.", do: "Pick one AI product idea: problem statement, target user, why AI might help, and three non-goals", time: "45–60 minutes", skill: "Problem framing", level: "Intermediate", video: "IKB2KnFmy6I", videoTitle: "How to craft better product problem statements" },
  { day: 27, topic: "Customer Discovery Plan", learn: "Plan interviews about past behaviour, without leading questions or pitching the solution.", do: "Create an interview guide, five core questions and a recruit list", time: "45–60 minutes", skill: "Customer discovery", level: "Intermediate", video: "JQ20oLcoQww", videoTitle: "The Mom Test by Rob Fitzpatrick: 6-minute summary" },
  { day: 28, topic: "Conduct and Synthesize Discovery", learn: "Separate observed behaviour from opinions; identify jobs, workarounds, frequency and pain.", do: "Summarise evidence from interviews or credible existing research, including evidence against your idea", time: "45–75 minutes", skill: "Research synthesis", level: "Intermediate", video: "P86AHRyfdjk", videoTitle: "Affinity mapping: organise your research" },
  { day: 29, topic: "AI or Rules? Validate the Need for AI", learn: "Test whether AI is necessary versus better content, search, workflow changes or rules.", do: "Write an AI-vs-non-AI decision with evidence and your riskiest assumption", resources: ['rules_of_ml'], time: "45–60 minutes", skill: "AI product judgement", level: "Intermediate", video: "rf83vRxLWFQ", videoTitle: "Designing human-centered AI products (Google PAIR)" },
  { day: 30, topic: "Human-AI Interaction Principles", learn: "Design for user control, transparency, correction, recovery and calibrated trust.", do: "Map the user journey and design for its trust moments", resources: ['hax_guidelines'], time: "45–60 minutes", skill: "Human-AI interaction", level: "Intermediate", video: "Kj33wtIMG-Y", videoTitle: "Guidelines for Human-AI Interaction with Dr. Saleema Amershi" },
  { day: 31, topic: "Write the AI Product PRD", learn: "Structure an AI PRD: the normal sections plus why AI, quality targets, failure handling, data, cost and kill criteria.", do: "Write PRD v1 on a page (T1) for an AI product", templates: ['T1', 'T2'], resources: ['lenny_ai_lifecycle'], time: "60–75 minutes", skill: "AI PRD writing", level: "Intermediate", video: "V6dyp5U1gXs", videoTitle: "Applied AI product management: the PRD" },
  { day: 32, topic: "Data Strategy and Readiness", learn: "Check coverage, quality, freshness, permissions, ownership and privacy of your source data.", do: "Score a data-readiness scorecard and plan every launch blocker", time: "45–60 minutes", skill: "Data strategy", level: "Intermediate", video: "TYiDIBejWLg", videoTitle: "The data readiness problem holding enterprises back (IBM)" },
  { day: 33, topic: "Baseline and Success Metrics", learn: "Set a non-AI baseline, a metric tree from business outcome to quality, guardrails and a measurement window.", do: "Write a metric tree and baseline measurement plan", time: "45–60 minutes", skill: "AI metrics", level: "Intermediate", video: "0QLHmxBFtx4", videoTitle: "KPI tree and metric tree explained" },
  { day: 34, topic: "Define Acceptable Failure", learn: "Grade errors from S0 critical to S3 low, and specify abstention, escalation and exact fallback text.", do: "Write a graded failure spec (T4) for an AI product", templates: ['T4'], resources: ['pair_errors'], time: "45–60 minutes", skill: "Failure design", level: "Intermediate", video: "cfqtFvWOfg0", videoTitle: "Why large language models hallucinate (IBM)" },
  { day: 35, topic: "Trust, Transparency, and UX Copy", learn: "Write UI copy for empty, loading, answer, low-confidence and error states, without overclaiming.", do: "Draft trust copy for the five key UI states", time: "45–60 minutes", skill: "AI UX writing", level: "Intermediate", video: "U66ALyYo9ds", videoTitle: "Designing for AI: UX principles every PM needs to know" },
  { day: 36, topic: "Voice and Conversational UX", learn: "Design clarification, repair, context and endings in a conversation, and know what voice adds.", do: "Write a conversation flow and decide whether voice is in scope", resources: ['voice_ai_primer'], time: "45–60 minutes", skill: "Conversational UX", level: "Intermediate", video: "RdCmMMwaFRs", videoTitle: "Designing voice user interfaces with Cathy Pearl (Google)" },
  { day: 37, topic: "Cost, Latency, and Business Viability", learn: "Estimate tokens, cost per successful task, monthly cost and a latency budget per step.", do: "Fill in the T3 cost and latency sheet with assumptions and a verdict", templates: ['T3'], time: "45–60 minutes", skill: "AI unit economics", level: "Intermediate", video: "CKamabikBNs", videoTitle: "How to reduce LLM latency" },
  { day: 38, topic: "Enterprise Requirements and PRD Review", learn: "Cover security, permissions, tenant isolation, auditability, integrations, human review and rollout, and recap Phase 3.", do: "Score 5 of 6 on the self-check and submit PRD v2 with a review memo", kind: 'review', time: "60–75 minutes", skill: "Gate review", level: "Intermediate" },
  { day: 39, topic: "Why Evals Matter", learn: "Treat evals as product quality measurement on your users’ tasks, not model benchmarks; know offline, human and online evaluation.", do: "Write a one-page eval strategy tied to an AI product’s user outcomes", resources: ['lenny_evals_podcast'], time: "45–60 minutes", skill: "Eval strategy", level: "Intermediate", video: "BsWxPI9UM4c", videoTitle: "Why AI evals are the hottest new skill for product builders (Hamel Husain and Shreya Shankar)" },
  { day: 40, topic: "Build an Error Taxonomy", learn: "Read real outputs, then group failures into actionable categories such as retrieval, unsupported claims, policy, format and tool errors.", do: "Create a labelled error taxonomy for an AI product", time: "45–60 minutes", skill: "Error analysis", level: "Intermediate", video: "PgzOBNse2EA", videoTitle: "A systematic approach to improving your AI products (Hamel Husain)" },
  { day: 41, topic: "Create a Golden Dataset", learn: "Write test cases with inputs, checkable pass criteria, source evidence and severity.", do: "Create the first 20 golden cases in T5 and submit five for review", templates: ['T5'], time: "45–60 minutes", skill: "Golden datasets", level: "Intermediate", video: "uiza7wp1KrE", videoTitle: "AI evaluations clearly explained (real example)" },
  { day: 42, topic: "Expand to a 50-Case Evaluation Set", learn: "Balance typical, hard, ambiguous, abstain and adversarial cases, and cover underrepresented users.", do: "Complete a 50-case evaluation set or a staged plan", templates: ['T5'], time: "60–75 minutes", skill: "Golden datasets", level: "Intermediate", video: "dC8e2hHXmgM", videoTitle: "How to: AI evals (AI product manager essential skill)" },
  { day: 43, topic: "End-to-End Task Success", learn: "Measure whether users complete the whole task, not whether one response sounds good.", do: "Define success, partial and failure labels, scenario tests and proxy signals", time: "45–60 minutes", skill: "Task success", level: "Intermediate", video: "C19JUX3GbcA", videoTitle: "Agent and LLM evaluation for AI product managers" },
  { day: 44, topic: "LLM-as-Judge and Human Alignment", learn: "Write single-criterion pass/fail judge rubrics, know judge biases, and check agreement with humans.", do: "Draft a judge rubric and plan a human agreement check", resources: ['hamel_evals_faq'], time: "45–60 minutes", skill: "LLM-as-judge", level: "Intermediate", video: "trfUBIDeI1Y", videoTitle: "LLM as a judge: scaling AI evaluation strategies (IBM)" },
  { day: 45, topic: "Deterministic Checks and Schema Validation", learn: "Use code-based checks for format, required fields, forbidden content, tool permissions and invariants.", do: "Write a deterministic checklist and the invariants every output must meet", time: "45–60 minutes", skill: "Deterministic checks", level: "Intermediate", video: "tqUDjc1HzO4", videoTitle: "How to automate AI evals (correctly)" },
  { day: 46, topic: "Groundedness and Citation Quality", learn: "Split answers into claims and check each against the sources; tell grounded, correct and well cited apart.", do: "Score groundedness claim by claim on three cases and write citation rules", time: "45–60 minutes", skill: "Groundedness", level: "Intermediate", video: "7_LTU0LA374", videoTitle: "RAG evaluation: precision, recall and faithfulness explained" },
  { day: 47, topic: "Red Teaming and Abuse Cases", learn: "Test direct and indirect prompt injection, data exfiltration, unsafe requests and instruction conflicts.", do: "Write eight adversarial test cases with safe behaviours and your defence layers", time: "45–60 minutes", skill: "Red teaming", level: "Intermediate", video: "jrHRe9lSqqA", videoTitle: "What is a prompt injection attack? (IBM)" },
  { day: 48, topic: "Fairness and Segment Analysis", learn: "Look for quality gaps across languages, user types, content types and access needs, with privacy safeguards.", do: "Plan a segment-level evaluation for an AI product", time: "45–60 minutes", skill: "Fairness", level: "Intermediate", video: "ZsjDvyuxxgg", videoTitle: "Unraveling AI bias: principles and practices (IBM)" },
  { day: 49, topic: "Regression Testing and Release Gates", learn: "Stop fixes from silently breaking passing cases; compare releases case by case against gates set in advance.", do: "Define a regression suite and numeric ship/no-ship gates", time: "45–60 minutes", skill: "Release gates", level: "Intermediate", video: "rFuUfGJTXDE", videoTitle: "LLM regression testing explained" },
  { day: 50, topic: "Online Signals and Production Feedback", learn: "Use corrections, abandonment, escalation, latency and tickets as clues, and know how each misleads.", do: "Map online signals to an investigation playbook with logging limits", time: "45–60 minutes", skill: "Production feedback", level: "Intermediate", video: "Q9zd548hqiQ", videoTitle: "LLM observability: the breakdown" },
  { day: 51, topic: "Analyze Evaluation Results", learn: "Rank errors by severity, frequency, user impact and fix cost; find root causes by reading cases.", do: "Write a T6 error-analysis memo with your top five fixes", templates: ['T6'], time: "45–60 minutes", skill: "Error analysis", level: "Intermediate", video: "qH1dZ8JLLdU", videoTitle: "Intro to error analysis (Hamel Husain and Shreya Shankar)" },
  { day: 52, topic: "Evaluation Gate and Quality Review", learn: "Communicate readiness, residual risk, known limitations and release criteria, and recap Phase 4.", do: "Score 5 of 6 on the self-check and submit your evaluation report and release recommendation", templates: ['T6'], kind: 'review', time: "60–75 minutes", skill: "Gate review", level: "Intermediate" },
  { day: 53, topic: "Prototype Scope and Build Plan", learn: "Choose the smallest end-to-end slice that is still useful, and a lightweight build approach you can actually use.", do: "Write a prototype plan with slice, build approach, dated milestones and non-goals", time: "45–60 minutes", skill: "Prototype scoping", level: "Intermediate", video: "Lnkv0-GLU3w", videoTitle: "Google AI Studio: build, test and deploy a real AI app" },
  { day: 54, topic: "System Prompt and Instruction Design", learn: "Separate system rules, retrieved context, user input and output requirements; version prompts and test changes.", do: "Write v1 of your system prompt and eight prompt test cases", time: "45–60 minutes", skill: "Prompt design", level: "Intermediate", video: "RDnRiGupF4U", videoTitle: "All about system prompts" },
  { day: 55, topic: "Structured Output in the Prototype", learn: "Make outputs machine-readable, validate content as well as format, and fail safely.", do: "Specify a validated output schema and what happens on failure", time: "45–75 minutes", skill: "Structured output", level: "Intermediate", video: "ROKU_Jqb1po", videoTitle: "Structured output tutorial (JSON schema)" },
  { day: 56, topic: "Build the Core User Flow", learn: "Connect input, AI response, presentation, feedback and task completion.", do: "Ship a working happy path, run five golden cases and log them in T7", time: "60–75 minutes", skill: "Prototyping", level: "Intermediate", video: "Dem3ZSQ6RVM", videoTitle: "Google AI Studio full tutorial: how to build an app" },
  { day: 57, topic: "Add Retrieval and Source Context", learn: "Ingest approved documents with useful metadata, retrieve with filters, test retrieval on its own, and show citations.", do: "Implement or document ingestion, retrieval and source display", time: "45–75 minutes", skill: "RAG build", level: "Intermediate", video: "e3qbIVDq1L8", videoTitle: "How to build a RAG chatbot (no code)" },
  { day: 58, topic: "Access Control and Permissions", learn: "Enforce least privilege in code before retrieval; never rely on the prompt for access control.", do: "Create a permission matrix and five cross-user access tests", time: "45–60 minutes", skill: "Access control", level: "Intermediate", video: "u69h8rdALl0", videoTitle: "How to add access controls to your AI RAG app" },
  { day: 59, topic: "Tool Calling and Action Safety", learn: "Write tool contracts, validate and authorise actions on the server, and confirm before consequential actions.", do: "Write a tool contract and five action-safety tests", time: "45–60 minutes", skill: "Action safety", level: "Intermediate", video: "YCFGjLjNOyw", videoTitle: "Human-in-the-loop for AI agents: patterns and best practices" },
  { day: 60, topic: "Fallbacks, Abstention, and Escalation", learn: "Handle missing sources, low confidence, sensitive topics and API errors, and size escalation capacity.", do: "Build or prototype fallback and escalation states and test the unhappy paths", time: "45–60 minutes", skill: "Fallback design", level: "Intermediate", video: "fvXD8tjy7iE", videoTitle: "What are AI guardrails? (IBM)" },
  { day: 61, topic: "Observability and Logging", learn: "Trace versions, sources, latency, cost, errors and feedback, with privacy-safe logging.", do: "Write a logging policy and dashboard specification (T7)", templates: ['T7'], time: "45–60 minutes", skill: "Observability", level: "Intermediate", video: "ImY5-Q97sRw", videoTitle: "Monitoring LLM applications: traces, feedback and production quality" },
  { day: 62, topic: "Connect the Eval Suite", learn: "Run the golden set against the prototype with fixed settings and save everything.", do: "Record a baseline evaluation report for the prototype", time: "45–60 minutes", skill: "Running evals", level: "Intermediate", video: "a3SMraZWNNs", videoTitle: "How to systematically set up LLM evals" },
  { day: 63, topic: "Iteration Based on Evidence", learn: "Choose the next fix from failure patterns, change one thing, and measure on the full set.", do: "Ship one measured quality improvement and report before vs after", time: "45–60 minutes", skill: "Iteration", level: "Intermediate", video: "982V2ituTdc", videoTitle: "How to improve LLM apps with error analysis" },
  { day: 64, topic: "Usability Test With Realistic Tasks", learn: "Watch users complete realistic tasks; capture success, confusion, workarounds and trust problems.", do: "Run or plan 3–5 usability sessions and summarise findings and fixes", time: "45–75 minutes", skill: "Usability testing", level: "Intermediate", video: "n8MnoJyl3W4", videoTitle: "Usability testing 101 (NN/g)" },
  { day: 65, topic: "Security and Privacy Review", learn: "Review data minimisation, retention, secrets, injection, sensitive outputs, access and vendors.", do: "Complete a security and privacy checklist and remediation list", time: "45–60 minutes", skill: "Security review", level: "Intermediate", video: "gUNXZMcd2jU", videoTitle: "OWASP’s top 10 ways to attack LLMs (IBM)" },
  { day: 66, topic: "Tenant Isolation and Enterprise Controls", learn: "Keep each customer’s data separate across documents, indexes, caches and logs, and offer admin and audit controls.", do: "Document tenant-isolation tests and enterprise controls", time: "45–60 minutes", skill: "Enterprise readiness", level: "Intermediate", video: "ZYuu8sWUQww", videoTitle: "The ultimate guide to multi-tenancy in 5 minutes" },
  { day: 67, topic: "Launch Plan and Operational Readiness", learn: "Plan a staged rollout with criteria, a named owner, support, monitoring and a tested rollback.", do: "Write a launch checklist and staged rollout plan with rollback triggers", time: "45–60 minutes", skill: "Launch planning", level: "Intermediate", video: "c8KgKTgyFUE", videoTitle: "Feature flags explained in 6 minutes" },
  { day: 68, topic: "Prototype Readiness Gate", learn: "Review quality, usability, safety, reliability, observability, cost and launch readiness, and recap Phase 5.", do: "Score 5 of 6 on the self-check and submit your demo and readiness decision", kind: 'review', time: "60–75 minutes", skill: "Gate review", level: "Intermediate" },
  { day: 69, topic: "Production Operations for AI Products", learn: "Define owners, service expectations and incident response for AI-specific incidents.", do: "Draft an AI product operations runbook", time: "45–60 minutes", skill: "AI operations", level: "Advanced", video: "NUmOZ3nnS7I", videoTitle: "Incident management in SRE explained (Google SRE book)" },
  { day: 70, topic: "Cost and Latency at Scale", learn: "Plan for peak load and use routing, caching and batching, weighing each saving against its quality risk.", do: "Create a scale scenario at 50× usage with cost and latency budgets", time: "45–60 minutes", skill: "Scaling AI", level: "Advanced", video: "0-5l8CAjz6I", videoTitle: "How to reduce AI app costs: caching, model routing and more" },
  { day: 71, topic: "Monitoring Quality and Drift", learn: "Monitor quality, user signals, traffic mix, data, tools, model versions, cost and latency; tell input, data and model drift apart.", do: "Define a monitoring dashboard and five alerts with owners", time: "45–60 minutes", skill: "Monitoring", level: "Advanced", video: "4gC3oueK9Gc", videoTitle: "Building trustworthy AI: avoid model drift and unsafe outputs (IBM)" },
  { day: 72, topic: "Experimentation and Causal Measurement", learn: "Tell correlation from causal impact; design A/B tests with guardrails, duration and a decision rule.", do: "Write an experiment plan with hypothesis, primary metric, guardrails, duration and decision rule", time: "45–60 minutes", skill: "Experimentation", level: "Advanced", video: "8mdpWElyhEU", videoTitle: "A/B testing 101: a crash course for product managers" },
  { day: 73, topic: "Pricing and Unit Economics", learn: "Calculate cost per successful task and gross margin, including heavy users, and compare pricing options.", do: "Build a unit-economics model with explicit assumptions", time: "45–60 minutes", skill: "Unit economics", level: "Advanced", video: "z6F2F1CSbYI", videoTitle: "Stop treating AI like a SaaS business" },
  { day: 74, topic: "Responsible AI, Policy, and Governance", learn: "Turn responsible-AI principles into requirements, owners and tests; know the main frameworks at a high level.", do: "Create a risk, control and owner matrix", time: "45–60 minutes", skill: "AI governance", level: "Advanced", video: "yh-3WU1FKrk", videoTitle: "What is responsible AI? A guide to AI governance (IBM)" },
  { day: 75, topic: "Enterprise Deployment Options", learn: "Compare multi-tenant SaaS, private cloud, regional and self-hosted deployments, and customer-managed keys.", do: "Create a deployment decision matrix for an enterprise customer", time: "45–60 minutes", skill: "Deployment strategy", level: "Advanced", video: "3Hd-QL0fwaI", videoTitle: "Self-hosting LLMs: an architect’s guide to when and how" },
  { day: 76, topic: "Model and Prompt Updates", learn: "Pin versions, test changes offline, shadow and canary them, roll back fast, and tell customers.", do: "Write a model-change management plan", time: "45–60 minutes", skill: "Change management", level: "Advanced", video: "uIeUiAborZs", videoTitle: "Blue-green, canary, rolling and shadow deployments" },
  { day: 77, topic: "Roadmap Under Constraints", learn: "Balance reliability, adoption, cost and strategic bets; state trade-offs and dependencies.", do: "Create a Now, Next, Later roadmap with trade-offs", time: "45–60 minutes", skill: "AI roadmapping", level: "Advanced", video: "pTv8zAt04GU", videoTitle: "Product roadmaps explained: Now-Next-Later vs timeline" },
  { day: 78, topic: "Executive Decision Memo", learn: "Communicate value, evidence, risks, economics and the decision needed on one page, and recap Phase 6.", do: "Score 5 of 6 on the self-check and submit a one-page executive memo", kind: 'review', time: "60–75 minutes", skill: "Gate review", level: "Advanced" },
  { day: 79, topic: "Case Study Structure", learn: "Tell an AI project story from discovery to outcome with evidence for each AI PM skill, and honest limits.", do: "Outline your case study with a headline number, evidence per section and limitations", templates: ['T8'], time: "45–60 minutes", skill: "Portfolio storytelling", level: "Advanced", video: "rmhWq35CN3g", videoTitle: "Complete guide to product case studies" },
  { day: 80, topic: "Build the Portfolio Demo", learn: "Plan a 3–5 minute walkthrough that shows the real task, the safeguards and the evidence.", do: "Script (and record) a 3–5 minute product demo", time: "45–75 minutes", skill: "Demo", level: "Advanced", video: "fV_OfyBCXag", videoTitle: "Product demo examples reviewed by a pro" },
  { day: 81, topic: "Write the Portfolio Case Study", learn: "Write for a two-minute reader: summary first, decisions with reasons, visuals, and honest limits.", do: "Draft and publish your portfolio case study", time: "60–75 minutes", skill: "Portfolio writing", level: "Advanced", video: "_7c9YXgMAPI", videoTitle: "How to build a product portfolio with 0 experience" },
  { day: 82, topic: "Rewrite Resume for AI PM Roles", learn: "Turn work into evidence-based bullets without overclaiming, mapped to target roles.", do: "Rewrite five resume bullets and your 90-second story (T9)", templates: ['T9'], time: "45–60 minutes", skill: "Resume", level: "Advanced", video: "A4yRe--v1rs", videoTitle: "7 steps to create your AI product manager resume" },
  { day: 83, topic: "LinkedIn Positioning and Public Narrative", learn: "Position yourself with a clear headline, featured proof and a post that shares a real lesson.", do: "Draft your LinkedIn headline, about section and a post about your AI project", time: "45–60 minutes", skill: "Personal brand", level: "Advanced", video: "3Kk28xHoHTg", videoTitle: "Top 5 LinkedIn profile tips to land your first PM role" },
  { day: 84, topic: "AI Product Sense Interview Practice", learn: "Structure AI product sense cases: clarify, segment, options including non-AI, AI design, metrics, risks.", do: "Answer one timed AI product sense case", time: "45–60 minutes", skill: "Product sense", level: "Advanced", video: "XmIUg2nrZgw", videoTitle: "How to ace AI product sense interviews" },
  { day: 85, topic: "AI System Design Interview Practice", learn: "Explain the request flow, retrieval, model choice, permissions, checks, fallbacks and trade-offs.", do: "Draw and narrate an AI product’s system design", time: "45–60 minutes", skill: "AI system design", level: "Advanced", video: "LZyGhS7Lrow", videoTitle: "LLM system design and AI evals: PM mock interview" },
  { day: 86, topic: "Evals, Metrics, and Quality Interview Practice", learn: "Answer metrics questions from the user goal down: outcome, quality, guardrails, evaluation method and release gate.", do: "Prepare a metrics and evals answer with a worked example from an AI product", time: "45–60 minutes", skill: "Metrics interviews", level: "Advanced", video: "S-201fyck48", videoTitle: "Evals: the most important AI PM interview question" },
  { day: 87, topic: "AI Product Design Case", learn: "Design an AI experience with user controls, honest uncertainty and a recovery path for every failure.", do: "Complete one 35-minute design case (T10) with a failure-state map", templates: ['T10'], time: "45–60 minutes", skill: "AI product design", level: "Advanced", video: "Ji8CGIaH9es", videoTitle: "How to ace AI product design interviews" },
  { day: 88, topic: "Leadership and Cross-Functional Stories", learn: "Prepare short STAR stories about trade-offs, conflict, prioritisation, ambiguity and failure.", do: "Write five STAR stories grounded in real experience", time: "45–60 minutes", skill: "Behavioural interviews", level: "Advanced", video: "MG2H4eUpr6w", videoTitle: "How to use the STAR framework to crack PM interviews" },
  { day: 89, topic: "Mock Interview and Feedback Loop", learn: "Run a realistic 60-minute mock across background, product, technical, metrics and behavioural questions.", do: "Complete a mock interview, score it, and list the three highest-impact gaps", time: "60–75 minutes", skill: "Interview practice", level: "Advanced", video: "udB8AUO4dvM", videoTitle: "Principal AI product manager mock interview" },
  { day: 90, topic: "Final Review and 30-Day Gap Plan", learn: "Check your portfolio, compare yourself with five real AI PM job descriptions, and plan the next 30 days.", do: "Score 5 of 6 on the final self-check and submit your portfolio checklist, five-JD skills matrix and 30-day gap plan", kind: 'review', time: "60–75 minutes", skill: "Final gate", level: "Advanced" },
];

export const phaseForDay = (day: number) => AI_PM_PHASES.find((p) => day >= p.start && day <= p.end);

export const DESIGN_CASE_STEPS =
  'The 35-minute design case. (1) Clarify the goal and one constraint. (2) Pick one user segment. (3) Pick one problem. (4) Give options, including one without AI. (5) AI design: inputs, approach, cost and latency, failure spec, escalation. (6) Metrics and eval plan. (7) Risks and rollout. Then explain the key trade-off to a non-technical stakeholder in 4 sentences.';
