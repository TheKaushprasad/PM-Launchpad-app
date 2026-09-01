const fs = require('fs');
const path = require('path');

const cornsilkData = {
  0: {
    title: "Strategic Mindset Transformations for Day 0",
    titleColor: "blue",
    items: [
      {
        subtitle: "Clarity of Purpose",
        headerColor: "blue",
        description: "Clarify your foundational 'Why' to navigate ambiguous roadmaps, shifting team priorities, and high-stakes trade-offs with unshakeable resilience."
      },
      {
        subtitle: "Customer-First Alignment",
        headerColor: "red",
        description: "Pivot your focus away from vanity feature delivery toward deep customer empathy, quantifiable user pain points, and measurable business outcomes."
      },
      {
        subtitle: "Influence Without Authority",
        headerColor: "blue",
        description: "Master cross-functional persuasion by asking high-leverage questions, aligning diverse perspectives, and driving organizational clarity."
      }
    ]
  },
  1: {
    title: "Pillars of Modern Product Management",
    titleColor: "blue",
    items: [
      {
        subtitle: "The Value Intersection",
        headerColor: "red",
        description: "Balance user desirability, technical feasibility, and commercial viability to ensure engineering teams invest in products that solve real problems profitably."
      },
      {
        subtitle: "Decoupling What from How",
        headerColor: "blue",
        description: "Focus on problem framing and success criteria ('What' and 'Why') while empowering design and engineering partners to own the solution architecture ('How')."
      },
      {
        subtitle: "Outcome vs Output Mindset",
        headerColor: "red",
        description: "Measure success through sustained user retention, engagement velocity, and business impact rather than the sheer volume of shipped Jira tickets."
      }
    ]
  },
  2: {
    title: "Critical Execution Phases in the PDLC",
    titleColor: "blue",
    items: [
      {
        subtitle: "Continuous Discovery",
        headerColor: "blue",
        description: "Validate customer problem statements through generative interviews, telemetry analytics, and competitive audits before committing engineering bandwidth."
      },
      {
        subtitle: "Disciplined Scoping & PRD",
        headerColor: "red",
        description: "Author concise, unambiguous PRDs with clear MVP boundaries, non-goals, and measurable success metrics to prevent mid-sprint scope creep."
      },
      {
        subtitle: "Post-Launch Feedback Loops",
        headerColor: "blue",
        description: "Close the development cycle through cohort retention tracking, CSAT monitoring, and qualitative reviews to drive data-informed roadmap iterations."
      }
    ]
  },
  3: {
    title: "Strategic Advantages of Product Lifecycle Management (PLM)",
    titleColor: "blue",
    items: [
      {
        subtitle: "Improved Collaboration",
        headerColor: "blue",
        description: "PLM encourages cross-functional collaboration, ensuring that all stakeholders, from design and engineering to sales, work together seamlessly."
      },
      {
        subtitle: "Enhanced Product Quality",
        headerColor: "red",
        description: "By integrating quality control into each phase, PLM helps identify and rectify potential issues early, resulting in higher-quality, resilient products."
      },
      {
        subtitle: "Efficient Resource Utilization",
        headerColor: "blue",
        description: "Streamlines development processes, reducing waste and optimizing resource allocation, leading to significant cost savings and faster time-to-market."
      }
    ]
  },
  4: {
    title: "Core Dimensions of Product Sense",
    titleColor: "blue",
    items: [
      {
        subtitle: "Empathetic Observation",
        headerColor: "red",
        description: "Observe subtle user workarounds, friction points, and unstated frustrations to diagnose what customers truly need rather than what they articulate."
      },
      {
        subtitle: "Domain Pattern Recognition",
        headerColor: "blue",
        description: "Deconstruct industry benchmarks and best-in-class UX paradigms to anticipate user mental models and craft intuitive, frictionless product flows."
      },
      {
        subtitle: "Principled Trade-Off Mastery",
        headerColor: "red",
        description: "Make decisive product bets under uncertainty by balancing edge-case complexity against core user simplicity and long-term platform velocity."
      }
    ]
  },
  5: {
    title: "Practicing Deep Customer Empathy",
    titleColor: "blue",
    items: [
      {
        subtitle: "Active Listening & Inquiry",
        headerColor: "blue",
        description: "Conduct unbiased customer interviews without leading questions, allowing authentic user frustrations and emotional drivers to surface naturally."
      },
      {
        subtitle: "Immersive Journey Mapping",
        headerColor: "red",
        description: "Walk through end-to-end customer touchpoints to identify unstated friction, emotional highs and lows, and moments of drop-off across the user lifecycle."
      },
      {
        subtitle: "Translating Empathy to Action",
        headerColor: "blue",
        description: "Convert raw qualitative insights into actionable problem statements and prioritized backlog items that directly eliminate user anxiety and effort."
      }
    ]
  },
  6: {
    title: "High-Impact Product Documentation Principles",
    titleColor: "blue",
    items: [
      {
        subtitle: "Context-Rich PRDs",
        headerColor: "red",
        description: "Structure PRDs around clear problem statements, target personas, user stories, edge cases, and non-goals to provide unambiguous clarity to engineering."
      },
      {
        subtitle: "Living Roadmap Communication",
        headerColor: "blue",
        description: "Frame roadmaps as strategic outcome commitments and problem themes rather than rigid Gantt charts, managing stakeholder expectations effectively."
      },
      {
        subtitle: "Decision Logs & Architecture Records",
        headerColor: "red",
        description: "Maintain lightweight decision logs (ADRs) and release notes to document historical trade-offs, technical rationale, and pivot justifications."
      }
    ]
  },
  7: {
    title: "Frameworks for Stakeholder Alignment",
    titleColor: "blue",
    items: [
      {
        subtitle: "Power-Interest Mapping",
        headerColor: "blue",
        description: "Categorize stakeholders systematically to tailor communication frequency, detail depth, and consultative buy-in for every strategic initiative."
      },
      {
        subtitle: "Proactive Expectation Setting",
        headerColor: "red",
        description: "Establish transparent constraints, engineering trade-offs, and timeline risks early to prevent scope creep and misaligned executive expectations."
      },
      {
        subtitle: "Constructive Conflict Resolution",
        headerColor: "blue",
        description: "Anchor difficult stakeholder disagreements in shared North Star metrics and verified customer data rather than subjective opinions or hierarchy."
      }
    ]
  },
  8: {
    title: "Key Business Levers for Product Leaders",
    titleColor: "blue",
    items: [
      {
        subtitle: "Unit Economics & LTV/CAC",
        headerColor: "red",
        description: "Model customer acquisition costs against lifetime value and payback periods to ensure sustainable feature monetization and positive contribution margins."
      },
      {
        subtitle: "Monetization & Pricing Models",
        headerColor: "blue",
        description: "Evaluate freemium, tiered SaaS, usage-based, and marketplace take-rate models to align monetization structures with customer value perception."
      },
      {
        subtitle: "Strategic Moats & Network Effects",
        headerColor: "red",
        description: "Build defensible competitive advantages through proprietary data loops, high switching costs, brand trust, and bilateral network density."
      }
    ]
  },
  9: {
    title: "Strategic Foundations of User & Market Research",
    titleColor: "blue",
    items: [
      {
        subtitle: "Mixed-Method Triangulation",
        headerColor: "blue",
        description: "Combine qualitative user feedback (the 'Why') with quantitative clickstream telemetry (the 'What') to validate customer problems with rigorous certainty."
      },
      {
        subtitle: "Total Market Landscaping",
        headerColor: "red",
        description: "Analyze macroeconomic shifts, industry tailwinds, and disruptive emerging technologies to identify untapped blue-ocean opportunities."
      },
      {
        subtitle: "Bias Reduction & Hypothesis Testing",
        headerColor: "blue",
        description: "Structure research protocols to eliminate confirmation bias, anchoring, and social desirability bias from influencing strategic roadmaps."
      }
    ]
  },
  10: {
    title: "Actionable User Interview & Survey Techniques",
    titleColor: "blue",
    items: [
      {
        subtitle: "The Mom Test Protocol",
        headerColor: "red",
        description: "Ask strictly about past behaviors and concrete actions rather than hypothetical opinions or future promises to extract unfiltered customer truth."
      },
      {
        subtitle: "Survey Design & Sampling",
        headerColor: "blue",
        description: "Craft concise, unbiased survey questions with clear Likert and open-ended splits, targeting representative user cohorts to avoid sample skew."
      },
      {
        subtitle: "Synthesis & Pattern Clustering",
        headerColor: "red",
        description: "Group qualitative interview quotes into affinity maps and recurring themes to uncover root pain points and validate core product assumptions."
      }
    ]
  },
  11: {
    title: "JTBD & Persona Formulation Insights",
    titleColor: "blue",
    items: [
      {
        subtitle: "Functional vs Emotional Jobs",
        headerColor: "blue",
        description: "Map the functional tasks users seek to accomplish alongside social status and emotional states driving their purchasing decisions."
      },
      {
        subtitle: "Forces of Progress Framework",
        headerColor: "red",
        description: "Analyze the Push of current problems and Pull of new solutions against the Anxiety of the unknown and Habit of the present."
      },
      {
        subtitle: "Behavioral Persona Modeling",
        headerColor: "blue",
        description: "Build dynamic personas rooted in distinct user motivations, triggers, and friction points rather than superficial demographic stereotypes."
      }
    ]
  },
  12: {
    title: "Strategic Competitive Intelligence Principles",
    titleColor: "blue",
    items: [
      {
        subtitle: "Direct vs Indirect Threats",
        headerColor: "red",
        description: "Track direct competitors alongside substitute workflows, legacy habits, and indirect tools competing for the same user time and budget."
      },
      {
        subtitle: "Value Curve Benchmarking",
        headerColor: "blue",
        description: "Map feature parity and pricing matrices to uncover underexplored market whitespace and craft differentiated value propositions."
      },
      {
        subtitle: "Sustainable Differentiation",
        headerColor: "red",
        description: "Focus competitive strategy on reinforcing core moats and workflow superiority rather than mindlessly copying competitor feature releases."
      }
    ]
  },
  13: {
    title: "Market Sizing & Commercial Viability",
    titleColor: "blue",
    items: [
      {
        subtitle: "Top-Down vs Bottom-Up Sizing",
        headerColor: "blue",
        description: "Validate macroeconomic top-down analyst reports with rigorous bottom-up calculations based on target account counts and willingness-to-pay."
      },
      {
        subtitle: "Realistic SOM Filtering",
        headerColor: "red",
        description: "Constrain serviceable obtainable market calculations with realistic GTM sales capacity, distribution channels, and regional adoption barriers."
      },
      {
        subtitle: "Investment Decision Gating",
        headerColor: "blue",
        description: "Use opportunity sizing models to gate engineering investments, prioritizing high-yield bets that support scalable long-term growth."
      }
    ]
  },
  14: {
    title: "Foundational SQL Data Retrieval for PMs",
    titleColor: "blue",
    items: [
      {
        subtitle: "Structured Data Exploration",
        headerColor: "red",
        description: "Query raw production databases directly using SELECT, WHERE, and LIMIT to validate customer bug reports and feature usage without data engineering delays."
      },
      {
        subtitle: "Conditional Filtering Precision",
        headerColor: "blue",
        description: "Master AND, OR, IN, and LIKE pattern matching to isolate target user cohorts, geographic segments, and specific product release variants."
      },
      {
        subtitle: "Independent Fact Verification",
        headerColor: "red",
        description: "Empower yourself to verify critical adoption and drop-off numbers independently during leadership reviews and stakeholder roadmapping debates."
      }
    ]
  },
  15: {
    title: "Relational Data Modeling & SQL Joins",
    titleColor: "blue",
    items: [
      {
        subtitle: "Cross-Table Relationship Mapping",
        headerColor: "blue",
        description: "Master INNER, LEFT, and FULL OUTER joins to combine transactional logs, user profiles, and event clickstreams into unified analytical views."
      },
      {
        subtitle: "Aggregations & Grouping",
        headerColor: "red",
        description: "Leverage COUNT, SUM, AVG, and GROUP BY clauses with HAVING filters to calculate active user metrics and cohort retention trends accurately."
      },
      {
        subtitle: "Data Hygiene & Null Handling",
        headerColor: "blue",
        description: "Guard queries against missing foreign keys, null values, and duplicate records to ensure metrics accurately reflect customer behavior."
      }
    ]
  },
  16: {
    title: "Advanced SQL Analysis for Product Optimization",
    titleColor: "blue",
    items: [
      {
        subtitle: "Set Operators (UNION / INTERSECT)",
        headerColor: "red",
        description: "Combine and compare distinct user cohorts across platforms and campaigns to analyze segment overlap and cross-channel adoption."
      },
      {
        subtitle: "Window Functions & Ranking",
        headerColor: "blue",
        description: "Utilize ROW_NUMBER, RANK, and DENSE_RANK over partitioned windows to track user action sequences and top-performing feature paths."
      },
      {
        subtitle: "Subqueries & Common Table Expressions",
        headerColor: "red",
        description: "Structure complex multi-step analytical queries with Common Table Expressions (WITH clauses) for maintainable, readable product analytics."
      }
    ]
  },
  17: {
    title: "Time-Series SQL & Cohort Analytics",
    titleColor: "blue",
    items: [
      {
        subtitle: "Date Truncation & Lagging",
        headerColor: "blue",
        description: "Use DATE_TRUNC, EXTRACT, and LAG/LEAD functions to build day-over-day and month-over-month cohort retention curves effortlessly."
      },
      {
        subtitle: "Conditional CASE Statements",
        headerColor: "red",
        description: "Bucket user activity into power, casual, and dormant tiers dynamically to monitor shifts in user engagement distribution over time."
      },
      {
        subtitle: "COALESCE & Edge-Case Guardrails",
        headerColor: "blue",
        description: "Handle missing values gracefully to prevent calculation errors in downstream dashboards and ensure reliable executive metric reporting."
      }
    ]
  },
  18: {
    title: "Financial & Operational Modeling in Excel",
    titleColor: "blue",
    items: [
      {
        subtitle: "Fast Data Cleaning & Lookups",
        headerColor: "red",
        description: "Master XLOOKUP, INDEX/MATCH, and TEXT functions to merge disparate CSV exports and clean raw telemetry logs in minutes."
      },
      {
        subtitle: "Scenario & Sensitivity Modeling",
        headerColor: "blue",
        description: "Build dynamic financial models with Data Tables and Goal Seek to evaluate pricing changes, churn sensitivity, and revenue forecasts."
      },
      {
        subtitle: "Data Validation & Error Auditing",
        headerColor: "red",
        description: "Implement input controls and auditing formulas (ISBLANK, IFERROR) to deliver robust, error-free models for leadership approval."
      }
    ]
  },
  19: {
    title: "Executive Visualization & Pivot Reporting",
    titleColor: "blue",
    items: [
      {
        subtitle: "Multi-Dimensional Pivot Analysis",
        headerColor: "blue",
        description: "Slice complex product performance data across segments, devices, and cohorts instantly to pinpoint emerging trends."
      },
      {
        subtitle: "Visual Hierarchy & Chart Selection",
        headerColor: "red",
        description: "Choose the right chart types (waterfall, cohort heatmaps, stacked bars) to convey critical insights clearly without visual noise."
      },
      {
        subtitle: "Interactive Executive Dashboards",
        headerColor: "blue",
        description: "Combine slicers, timelines, and dynamic ranges into self-service executive summaries that drive fast, data-informed product decisions."
      }
    ]
  },
  20: {
    title: "Enterprise BI & Data Storytelling with Power BI",
    titleColor: "blue",
    items: [
      {
        subtitle: "Data Modeling & Star Schemas",
        headerColor: "red",
        description: "Construct clean Star Schema relationships in Power BI to ensure fast query performance and reliable cross-table filtering."
      },
      {
        subtitle: "DAX Metric Formulations",
        headerColor: "blue",
        description: "Author custom DAX measures for rolling averages, retention rates, and churn probabilities to power sophisticated automated dashboards."
      },
      {
        subtitle: "Automated Executive Reporting",
        headerColor: "red",
        description: "Set up scheduled refreshes and role-based access to keep cross-functional stakeholders aligned on live North Star KPIs automatically."
      }
    ]
  },
  21: {
    title: "Core Foundations of Product Analytics",
    titleColor: "blue",
    items: [
      {
        subtitle: "North Star Metric Alignment",
        headerColor: "blue",
        description: "Define a singular North Star Metric backed by input metrics that directly capture the core value delivered to your target users."
      },
      {
        subtitle: "Funnel & Drop-Off Diagnostics",
        headerColor: "red",
        description: "Map multi-step user onboarding and checkout funnels to pinpoint specific conversion bottlenecks and high-friction UX screens."
      },
      {
        subtitle: "Cohort Retention Curves",
        headerColor: "blue",
        description: "Track cohort curves across D1, D7, and D30 intervals to distinguish true product-market fit from temporary acquisition spikes."
      }
    ]
  },
  22: {
    title: "Event-Based Telemetry & Controlled Experimentation",
    titleColor: "blue",
    items: [
      {
        subtitle: "GA4 Event-Driven Schema",
        headerColor: "red",
        description: "Configure custom parameters and user properties in GA4 to capture meaningful micro-conversions and high-intent user interactions."
      },
      {
        subtitle: "Hypothesis Formulation & MDE",
        headerColor: "blue",
        description: "Calculate sample size, statistical power, and Minimum Detectable Effect (MDE) to design statistically rigorous, bias-free A/B tests."
      },
      {
        subtitle: "Significance & Guardrail Metrics",
        headerColor: "red",
        description: "Evaluate test outcomes using p-values and confidence intervals while monitoring guardrail metrics to prevent unintended cannibalization."
      }
    ]
  },
  23: {
    title: "API Architecture & Integration Strategy",
    titleColor: "blue",
    items: [
      {
        subtitle: "RESTful Resource Design",
        headerColor: "blue",
        description: "Understand HTTP verbs (GET, POST, PUT, DELETE), status codes, and JSON schemas to specify clear API contracts with backend engineers."
      },
      {
        subtitle: "Authentication & Rate Limiting",
        headerColor: "red",
        description: "Scope OAuth2, API key auth, rate-limiting, and error-handling requirements to build robust, secure third-party partner integrations."
      },
      {
        subtitle: "Build vs Buy Strategy",
        headerColor: "blue",
        description: "Evaluate third-party API providers (Stripe, Twilio, SendGrid) against in-house development costs, maintenance overhead, and latency constraints."
      }
    ]
  },
  24: {
    title: "Scalable System Architecture for PMs",
    titleColor: "blue",
    items: [
      {
        subtitle: "Latency, Throughput & Bottlenecks",
        headerColor: "red",
        description: "Master the trade-offs between latency, throughput, and compute resources to make informed decisions on architectural scalability."
      },
      {
        subtitle: "Caching & Database Strategy",
        headerColor: "blue",
        description: "Understand when to deploy Redis caching, relational databases, or NoSQL stores based on data consistency and read/write access patterns."
      },
      {
        subtitle: "Microservices & Event-Driven Flows",
        headerColor: "red",
        description: "Grasp how message queues (Kafka, RabbitMQ) decouple services to maintain product uptime and fault tolerance under surge loads."
      }
    ]
  },
  25: {
    title: "User Experience & Interaction Design Principles",
    titleColor: "blue",
    items: [
      {
        subtitle: "Information Architecture & Flow",
        headerColor: "blue",
        description: "Structure intuitive site maps, navigation hierarchies, and user flows that minimize cognitive load and eliminate friction."
      },
      {
        subtitle: "Wireframing & Design Systems",
        headerColor: "red",
        description: "Partner effectively with designers in Figma by understanding component libraries, auto-layout constraints, and atomic design tokens."
      },
      {
        subtitle: "Usability Testing & Accessibility",
        headerColor: "blue",
        description: "Conduct 5-second tests, hallway usability reviews, and WCAG AA accessibility audits to ensure universal usability for all user cohorts."
      }
    ]
  },
  26: {
    title: "Agile Delivery & Sprint Execution Best Practices",
    titleColor: "blue",
    items: [
      {
        subtitle: "Backlog Grooming & INVEST Criteria",
        headerColor: "red",
        description: "Write user stories following INVEST criteria with explicit acceptance criteria to empower engineers and avoid mid-sprint ambiguity."
      },
      {
        subtitle: "Sprint Ceremonies & Velocity",
        headerColor: "blue",
        description: "Lead sprint planning, standups, and retrospectives to foster continuous team improvement and predict delivery timelines reliably."
      },
      {
        subtitle: "Balancing Tech Debt vs Features",
        headerColor: "red",
        description: "Allocate dedicated sprint capacity (15–20%) for refactoring and tech debt to sustain long-term platform velocity and stability."
      }
    ]
  },
  27: {
    title: "Cloud Infrastructure & Cost Optimization",
    titleColor: "blue",
    items: [
      {
        subtitle: "IaaS vs PaaS vs Serverless",
        headerColor: "blue",
        description: "Choose the appropriate cloud compute model to balance development speed, operational overhead, and scalable infrastructure costs."
      },
      {
        subtitle: "Cloud Cost Governance (FinOps)",
        headerColor: "red",
        description: "Monitor cloud unit costs per active user and egress fees to maintain healthy gross margins as platform usage scales exponentially."
      },
      {
        subtitle: "Global Availability & Disaster Recovery",
        headerColor: "blue",
        description: "Define Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) to safeguard product uptime and customer data integrity."
      }
    ]
  },
  28: {
    title: "AI/ML Technical Fundamentals for PMs",
    titleColor: "blue",
    items: [
      {
        subtitle: "Supervised vs Unsupervised ML",
        headerColor: "red",
        description: "Differentiate classification, regression, and clustering approaches to match business problems with the optimal algorithmic paradigm."
      },
      {
        subtitle: "Model Evaluation & Trade-Offs",
        headerColor: "blue",
        description: "Evaluate precision, recall, F1-scores, and ROC-AUC curves to calibrate model decision thresholds against business risk tolerance."
      },
      {
        subtitle: "Data Flywheels & Continuous Training",
        headerColor: "red",
        description: "Design product feedback loops that capture ground-truth user corrections to continuously improve model accuracy and competitive moats."
      }
    ]
  },
  29: {
    title: "Large Language Model Architecture & Economics",
    titleColor: "blue",
    items: [
      {
        subtitle: "Tokenization & Context Windows",
        headerColor: "blue",
        description: "Understand token economics, context window limits, and inference latency to design responsive, cost-effective LLM-powered features."
      },
      {
        subtitle: "Model Sizing & Distillation",
        headerColor: "red",
        description: "Select the optimal balance between flagship frontier models and lightweight distilled models (e.g., Flash, Gemini Nano) for specific tasks."
      },
      {
        subtitle: "Hallucination & Safety Guardrails",
        headerColor: "blue",
        description: "Implement temperature tuning, output schema validation, and guardrails to mitigate hallucinations and ensure enterprise-grade reliability."
      }
    ]
  },
  30: {
    title: "Production Prompt Engineering Frameworks",
    titleColor: "blue",
    items: [
      {
        subtitle: "Few-Shot & Chain-of-Thought",
        headerColor: "red",
        description: "Structure prompts with diverse positive/negative examples and step-by-step reasoning scaffolds to boost output accuracy drastically."
      },
      {
        subtitle: "Structured Output Enforcement",
        headerColor: "blue",
        description: "Constrain LLM responses to strict JSON schemas or Pydantic models for seamless downstream software integration and error prevention."
      },
      {
        subtitle: "Automated Prompt Evaluation",
        headerColor: "red",
        description: "Build benchmark evaluation suites (LLM-as-a-Judge) to regression test prompt revisions systematically before production deployment."
      }
    ]
  },
  31: {
    title: "Context Engineering & Dynamic Memory",
    titleColor: "blue",
    items: [
      {
        subtitle: "Dynamic Context Assembly",
        headerColor: "blue",
        description: "Filter, rank, and inject real-time user session state, profile attributes, and tool metadata into prompts within tight token budgets."
      },
      {
        subtitle: "Long-Term Memory Management",
        headerColor: "red",
        description: "Architect episodic and semantic memory layers to provide personalized, persistent AI experiences across multi-turn user journeys."
      },
      {
        subtitle: "Token Optimization & Compression",
        headerColor: "blue",
        description: "Employ semantic summarization and context pruning techniques to minimize latency and inference expenditure at enterprise scale."
      }
    ]
  },
  32: {
    title: "Enterprise RAG Architecture & Vector Search",
    titleColor: "blue",
    items: [
      {
        subtitle: "Chunking & Embedding Strategies",
        headerColor: "red",
        description: "Optimize document chunk sizes, overlap strategies, and embedding models to maximize semantic precision and retrieval quality."
      },
      {
        subtitle: "Hybrid Search & Re-Ranking",
        headerColor: "blue",
        description: "Combine sparse keyword search (BM25) with dense vector retrieval and cross-encoder re-ranking for superior context relevance."
      },
      {
        subtitle: "RAG Triad Evaluation",
        headerColor: "red",
        description: "Continuously measure Context Relevance, Groundedness, and Answer Relevance (using Ragas/TruLens) to eliminate hallucinations."
      }
    ]
  },
  33: {
    title: "Model Context Protocol & Extensible Ecosystems",
    titleColor: "blue",
    items: [
      {
        subtitle: "Standardized Tool Integration",
        headerColor: "blue",
        description: "Leverage open MCP standards to connect LLMs with databases, internal CRMs, and developer tools via unified protocol contracts."
      },
      {
        subtitle: "Security & Permissions Boundaries",
        headerColor: "red",
        description: "Enforce granular role-based access control and sandboxed execution environments for all MCP server connections."
      },
      {
        subtitle: "Composable Multi-Tool Orchestration",
        headerColor: "blue",
        description: "Build flexible, plug-and-play AI workflows that allow models to query external systems dynamically without hardcoded API bridges."
      }
    ]
  },
  34: {
    title: "Deterministic vs Autonomous Agent Workflows",
    titleColor: "blue",
    items: [
      {
        subtitle: "Router & Orchestrator Patterns",
        headerColor: "red",
        description: "Design intelligent routing nodes that classify user intents and delegate tasks to specialized sub-workflows for peak accuracy."
      },
      {
        subtitle: "Human-in-the-Loop (HITL) Controls",
        headerColor: "blue",
        description: "Insert confirmation gates for high-stakes actions (financial transactions, data deletion) to maintain human oversight and trust."
      },
      {
        subtitle: "Parallel & Evaluator Workflows",
        headerColor: "red",
        description: "Run parallel drafting streams with automated critique and refinement loops to produce high-quality, verified deliverables."
      }
    ]
  },
  35: {
    title: "Autonomous Agent Design & Tool Calling",
    titleColor: "blue",
    items: [
      {
        subtitle: "ReAct Loops & Tool Calling",
        headerColor: "blue",
        description: "Architect autonomous agents capable of iterative thought, external tool execution, and observation feedback loops to solve multi-step goals."
      },
      {
        subtitle: "State Machines & Error Recovery",
        headerColor: "red",
        description: "Implement stateful graphs (LangGraph/CrewAI) with self-healing retry logic to prevent agents from falling into infinite execution loops."
      },
      {
        subtitle: "Production Agent Metrics",
        headerColor: "blue",
        description: "Track task completion rates, cost per solved ticket, and step-level latency to measure true operational efficiency and ROI."
      }
    ]
  },
  36: {
    title: "Rapid Prototyping & Shipping No-Code MVPs",
    titleColor: "blue",
    items: [
      {
        subtitle: "Full-Stack No-Code Stacks",
        headerColor: "red",
        description: "Combine frontend builders (Webflow, Bubble) with databases (Supabase, Airtable) and automations (Make, Zapier) to ship live products."
      },
      {
        subtitle: "Speed of Validation",
        headerColor: "blue",
        description: "Validate real demand by acquiring paying customers and collecting behavioral metrics before dedicating months of engineering time."
      },
      {
        subtitle: "Proof of Execution for Aspiring PMs",
        headerColor: "red",
        description: "Stand out in hiring pipelines by demonstrating end-to-end product ownership, live user adoption, and revenue generation."
      }
    ]
  },
  37: {
    title: "Comprehensive Product Teardown Frameworks",
    titleColor: "blue",
    items: [
      {
        subtitle: "Deconstructing User Journeys",
        headerColor: "blue",
        description: "Dissect onboarding, core loops, and retention mechanics of leading products, capturing friction points and cognitive load at each step."
      },
      {
        subtitle: "Hypothesis-Driven Redesigns",
        headerColor: "red",
        description: "Propose prioritized feature improvements grounded in explicit problem statements, user metrics, and measurable business impact."
      },
      {
        subtitle: "Executive Presentation Polish",
        headerColor: "blue",
        description: "Package teardowns with clear visual wireframes, metric trees, and trade-off rationales to showcase mature product judgment to hiring managers."
      }
    ]
  },
  38: {
    title: "Designing Winning Startup Case Studies",
    titleColor: "blue",
    items: [
      {
        subtitle: "Targeted Problem Selection",
        headerColor: "red",
        description: "Identify genuine, high-priority growth or retention challenges facing the target startup using public telemetry, reviews, and community feedback."
      },
      {
        subtitle: "Data-Backed Solution Formulation",
        headerColor: "blue",
        description: "Formulate tailored MVP solutions with clear trade-offs, engineering estimates, and risk mitigation strategies that resonate with founders."
      },
      {
        subtitle: "Strategic Outreach & Delivery",
        headerColor: "red",
        description: "Share concise executive summaries directly with product leaders and founders to demonstrate immediate value and secure interview callbacks."
      }
    ]
  },
  39: {
    title: "Essential Pillars of an Outstanding PM Portfolio",
    titleColor: "blue",
    items: [
      {
        subtitle: "Demonstrated Proof of Work",
        headerColor: "blue",
        description: "Feature 2–3 deep, end-to-end case studies highlighting real problem discovery, PRD scoping, user metrics, and post-launch learnings."
      },
      {
        subtitle: "Visual Storytelling & Scannability",
        headerColor: "red",
        description: "Use crisp visual frameworks, interactive prototypes, and metric callouts to enable recruiters to grasp your impact in under 30 seconds."
      },
      {
        subtitle: "Domain Specialization Showcase",
        headerColor: "blue",
        description: "Tailor portfolio highlights to your target PM track (Growth, AI, B2B SaaS, Platform) to prove immediate day-one domain readiness."
      }
    ]
  },
  40: {
    title: "High-Conversion Resume & LinkedIn Strategy",
    titleColor: "blue",
    items: [
      {
        subtitle: "Google X-Y-Z Impact Bullets",
        headerColor: "red",
        description: "Frame every resume bullet with 'Accomplished [X], as measured by [Y], by doing [Z]' to showcase measurable business and product impact."
      },
      {
        subtitle: "Keyword Alignment & ATS Optimization",
        headerColor: "blue",
        description: "Seamlessly weave core PM competencies (discovery, roadmapping, SQL, A/B testing, PRDs) into headline, summary, and experience sections."
      },
      {
        subtitle: "Social Proof & Thought Leadership",
        headerColor: "red",
        description: "Publish concise product teardowns, framework summaries, and course reflections on LinkedIn to build inbound recruiter visibility."
      }
    ]
  },
  41: {
    title: "High-Leverage Job Search & Referral Tactics",
    titleColor: "blue",
    items: [
      {
        subtitle: "Strategic Networking & Cold Outreach",
        headerColor: "blue",
        description: "Reach out to PMs and engineering managers with personalized, value-first messages referencing specific challenges their product faces."
      },
      {
        subtitle: "Target Company Tiers & Focus",
        headerColor: "red",
        description: "Segment target companies into Tier 1 (dream), Tier 2 (strong growth), and Tier 3 (practice) to sequence interview readiness effectively."
      },
      {
        subtitle: "Referral Conversion Optimization",
        headerColor: "blue",
        description: "Provide referrers with tailored 2-sentence blurbs, resume links, and job IDs to make submitting internal referrals effortless and fast."
      }
    ]
  },
  42: {
    title: "Product Sense & Design Interview Mastery",
    titleColor: "blue",
    items: [
      {
        subtitle: "CIRCLES Framework Execution",
        headerColor: "red",
        description: "Structure open-ended questions systematically: Clarify goals, Identify personas, Report needs, Cut priorities, List solutions, Evaluate, and Summarize."
      },
      {
        subtitle: "Bold Yet Feasible Ideation",
        headerColor: "blue",
        description: "Pitch 3 distinct solution ideas ranging from safe iterative enhancements to 10x moonshots, demonstrating creative range and technical feasibility."
      },
      {
        subtitle: "Metrics & Trade-Off Defensibility",
        headerColor: "red",
        description: "Define comprehensive North Star, counter, and ecosystem health metrics while defending why chosen trade-offs optimize customer value."
      }
    ]
  },
  43: {
    title: "Root Cause Analysis & Guesstimate Principles",
    titleColor: "blue",
    items: [
      {
        subtitle: "Systematic RCA Diagnostics",
        headerColor: "blue",
        description: "Isolate metric drops across internal factors (bugs, releases, tracking bugs) and external factors (seasonality, competition, regulation) systematically."
      },
      {
        subtitle: "Structured Fermi Estimation",
        headerColor: "red",
        description: "Break complex market sizing and volume estimation problems into transparent, logical top-down or bottom-up arithmetic branches."
      },
      {
        subtitle: "Sanity Checking & Boundary Testing",
        headerColor: "blue",
        description: "Test estimations against real-world population and market benchmarks, proactively identifying and correcting assumption sensitivities."
      }
    ]
  },
  44: {
    title: "Product Improvement & Feature Optimization",
    titleColor: "blue",
    items: [
      {
        subtitle: "Strategic Goal Alignment",
        headerColor: "red",
        description: "Clarify whether the improvement objective targets user acquisition, activation, engagement, retention, monetization, or referral."
      },
      {
        subtitle: "Persona & Friction Diagnostics",
        headerColor: "blue",
        description: "Isolate high-impact user personas and diagnose specific emotional and functional friction points hindering core value realization."
      },
      {
        subtitle: "Prioritized Solution Roadmap",
        headerColor: "red",
        description: "Propose 3 prioritized enhancements with clear effort-vs-impact scores, defining launch metrics and rollback safety criteria."
      }
    ]
  },
  45: {
    title: "Behavioral Excellence & Executive Presence",
    titleColor: "blue",
    items: [
      {
        subtitle: "The STAR Storytelling Method",
        headerColor: "blue",
        description: "Structure behavioral answers with Situation, Task, Action, and quantifiable Result, focusing heavily on your personal actions and learnings."
      },
      {
        subtitle: "Vulnerability & Growth Mindset",
        headerColor: "red",
        description: "Discuss past mistakes and failed product launches with self-awareness, highlighting specific framework upgrades and team lessons learned."
      },
      {
        subtitle: "Strategic Reverse Interviewing",
        headerColor: "blue",
        description: "Ask thoughtful, non-generic questions about team culture, product velocity, and roadmap challenges to evaluate company fit and leave a lasting impression."
      }
    ]
  }
};

// Function to update each day file
function updateDayFiles() {
  for (let day = 0; day <= 45; day++) {
    const filePath = path.join(__dirname, '..', 'content', 'days', `day-${day}.tsx`);
    if (!fs.existsSync(filePath)) {
      console.warn(`File does not exist: ${filePath}`);
      continue;
    }

    let fileContent = fs.readFileSync(filePath, 'utf8');
    const dayData = cornsilkData[day];
    if (!dayData) continue;

    // Ensure import of CornsilkSection
    if (!fileContent.includes('CornsilkSection')) {
      fileContent = `import { CornsilkSection } from '../../components/CornsilkSection';\n` + fileContent;
    }

    // Prepare JSX for CornsilkSection
    const cornsilkJsx = `      <CornsilkSection
        title="${dayData.title}"
        titleColor="${dayData.titleColor}"
        items={${JSON.stringify(dayData.items, null, 10).replace(/\n/g, '\n      ')}}
      />`;

    // Check if the file has an existing dark block like <section className="bg-zinc-950 text-white ... or <section className="bg-zinc-900 text-white ... or <div className="bg-zinc-900 text-white ...
    // or if day 3 has Benefits of PLM
    let replaced = false;

    // Specific match for day 3 "Benefits of PLM"
    if (day === 3 && fileContent.includes('Benefits of PLM')) {
      const plmRegex = /<section className="bg-zinc-950 text-white[\s\S]*?<\/section>/;
      if (plmRegex.test(fileContent)) {
        fileContent = fileContent.replace(plmRegex, cornsilkJsx);
        replaced = true;
      }
    }

    // General match for dark summary/takeaway/outcome section in the file
    if (!replaced) {
      // Look for `<section className="bg-zinc-900 text-white` or `<section className="bg-zinc-950 text-white`
      const darkSectionRegex = /<section className="bg-zinc-9(?:00|50) text-white[\s\S]*?<\/section>/;
      if (darkSectionRegex.test(fileContent)) {
        fileContent = fileContent.replace(darkSectionRegex, cornsilkJsx);
        replaced = true;
      }
    }

    // If still not replaced, check for `<div className="bg-zinc-900 text-white ... </div>` towards the end or insert right before the last closing container / footer
    if (!replaced) {
      const darkDivRegex = /<div className="bg-zinc-9(?:00|50) text-white[\s\S]*?<\/div>\s*<\/div>/;
      if (darkDivRegex.test(fileContent)) {
        fileContent = fileContent.replace(darkDivRegex, cornsilkJsx);
        replaced = true;
      }
    }

    // If still not replaced, insert right before `<div className="pt-8 border-t border-zinc-200` or before `export default`
    if (!replaced) {
      if (fileContent.includes('<div className="pt-8 border-t border-zinc-200')) {
        fileContent = fileContent.replace(
          '<div className="pt-8 border-t border-zinc-200',
          `${cornsilkJsx}\n\n      <div className="pt-8 border-t border-zinc-200`
        );
        replaced = true;
      } else if (fileContent.includes('export default') || fileContent.includes('export const Day')) {
        // Replace before the last </div> before return ends
        const lastDivIndex = fileContent.lastIndexOf('</div>');
        if (lastDivIndex !== -1) {
          const beforeLastDiv = fileContent.substring(0, lastDivIndex);
          const secondLastDivIndex = beforeLastDiv.lastIndexOf('</div>');
          if (secondLastDivIndex !== -1) {
            fileContent = fileContent.substring(0, secondLastDivIndex) + `\n\n${cornsilkJsx}\n    </div>\n  );\n};`;
            replaced = true;
          }
        }
      }
    }

    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`Updated Day ${day}`);
  }
}

updateDayFiles();
console.log('Finished updating all Day 0-45 content.');
