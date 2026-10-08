import { RealWorldProject } from '../types/projects';

export const REAL_WORLD_PROJECTS: RealWorldProject[] = [
  {
    id: 'food-delivery-retention',
    title: 'Win Back Lapsed Food Delivery Users',
    company: 'QuickBite (Food Delivery)',
    category: 'Growth',
    difficulty: 'Beginner',
    estimatedHours: 3,
    summary: 'Monthly active users are flat while new installs grow. Diagnose churn and design a win-back plan.',
    context:
      'QuickBite is a food delivery app operating in 40 cities. Installs grew 30% last quarter, but monthly active users stayed flat. Internal data shows 45% of new users never place a second order within 30 days. Leadership wants a plan to improve 30-day repeat order rate.',
    problemStatement:
      'Identify the most likely reasons new users do not return, prioritise them, and propose 2-3 product interventions with a clear success metric for each.',
    deliverables: [
      'A short diagnosis of likely churn drivers, with the data you would look at to confirm each',
      'A prioritised list of 2-3 interventions (with reasoning for the order)',
      'One primary metric and two guardrail metrics',
      'A simple experiment design for your top intervention',
    ],
    constraints: [
      'Engineering capacity is one squad for one quarter',
      'Discounts cannot exceed the current marketing budget',
    ],
    evaluationCriteria: [
      'Problem diagnosis and user empathy',
      'Prioritisation logic',
      'Metric definition',
      'Experiment rigour',
      'Clarity of communication',
    ],
    hints: [
      'Segment users by first-order experience (late delivery, missing items, discount-only).',
      'Think about what would make the second order easier, not just cheaper.',
    ],
  },
  {
    id: 'saas-onboarding-activation',
    title: 'Fix Activation for a B2B SaaS Tool',
    company: 'TaskFlow (Project Management SaaS)',
    category: 'Product Sense',
    difficulty: 'Intermediate',
    estimatedHours: 4,
    summary: 'Only 18% of trial workspaces invite a teammate. Redesign onboarding to drive activation.',
    context:
      'TaskFlow sells a project management tool to small teams with a 14-day free trial. Workspaces that invite at least two teammates in week one convert to paid at 5x the rate of solo workspaces, yet only 18% of trials do so. The current onboarding is a 6-step product tour.',
    problemStatement:
      'Define what "activated" should mean for TaskFlow, then redesign the first-week experience to increase the share of activated trial workspaces.',
    deliverables: [
      'A definition of the activation event and why you chose it',
      'User journey of the current onboarding with the main drop-off points you suspect',
      'A redesigned onboarding flow (written steps or a simple wireframe description)',
      'Success metrics and how you would roll the change out',
    ],
    constraints: [
      'Cannot remove the free trial',
      'Sales team must still be able to run demos for larger accounts',
    ],
    evaluationCriteria: [
      'Activation metric definition',
      'User understanding (admin vs invited member)',
      'Solution quality and creativity',
      'Trade-off awareness',
      'Clarity of communication',
    ],
    hints: [
      'Correlation is not causation: would forcing invites actually help?',
      'Consider the invited teammate experience, not just the admin.',
    ],
  },
  {
    id: 'ride-hailing-north-star',
    title: 'Define a North Star Metric',
    company: 'ZipRide (Ride Hailing)',
    category: 'Metrics & Analytics',
    difficulty: 'Intermediate',
    estimatedHours: 3,
    summary: 'The company optimises for rides booked, but driver churn is rising. Propose a better North Star.',
    context:
      'ZipRide is a two-sided ride-hailing marketplace. The company-wide goal has been "rides booked per week". Over the last two quarters rides grew 12%, but driver churn rose from 8% to 14% per month and average pickup time increased by 2 minutes.',
    problemStatement:
      'Critique the current North Star, propose a better one, and build a metric tree that connects it to team-level input metrics for both riders and drivers.',
    deliverables: [
      'Critique of "rides booked per week" as a North Star',
      'Your proposed North Star metric with a precise definition',
      'A metric tree with 4-6 input metrics across rider and driver sides',
      'Guardrail metrics and how you would detect metric gaming',
    ],
    constraints: ['Metric must be measurable weekly', 'Must be understandable by every team'],
    evaluationCriteria: [
      'Understanding of marketplace dynamics',
      'Metric definition precision',
      'Metric tree structure',
      'Guardrails and counter-metrics',
      'Clarity of communication',
    ],
    hints: [
      'A good North Star captures value delivered to both sides.',
      'Think about what a "successful" ride means beyond being booked.',
    ],
  },
  {
    id: 'edtech-ai-tutor',
    title: 'Launch an AI Tutor Feature',
    company: 'LearnLoop (EdTech)',
    category: 'AI Product',
    difficulty: 'Advanced',
    estimatedHours: 5,
    summary: 'Write a PRD for an AI tutor inside a test-prep app, including evaluation and safety.',
    context:
      'LearnLoop is a test-prep app for high school students with 2M monthly learners. Students frequently drop off after getting a practice question wrong. The team wants to launch an AI tutor that explains mistakes and guides students step by step.',
    problemStatement:
      'Write a concise PRD for the AI tutor MVP covering user problem, scope, model behaviour, quality evaluation, safety, and launch plan.',
    deliverables: [
      'Problem statement and target user segment',
      'MVP scope (in / out) and key user flows',
      'How you will evaluate answer quality before and after launch',
      'Risks (hallucination, academic integrity, cost) and mitigations',
      'Launch plan and success metrics',
    ],
    constraints: [
      'Users include minors, so safety requirements are strict',
      'Inference cost must stay below $0.02 per active learner per day',
    ],
    evaluationCriteria: [
      'User problem clarity',
      'Scoping discipline',
      'AI quality evaluation plan',
      'Risk and safety thinking',
      'Clarity of communication',
    ],
    hints: [
      'Should the tutor give the answer or guide the student to it?',
      'Think about offline evals, human review, and online metrics separately.',
    ],
  },
  {
    id: 'fintech-market-entry',
    title: 'Market Entry for a Payments App',
    company: 'PayNest (Fintech)',
    category: 'Product Strategy',
    difficulty: 'Advanced',
    estimatedHours: 5,
    summary: 'Decide whether and how a consumer payments app should enter the small-merchant segment.',
    context:
      'PayNest is a peer-to-peer payments app with 15M users. Many users already pay small merchants (tea stalls, tutors, local shops) via P2P transfers. Competitors offer merchant QR codes with instant settlement. Leadership is debating a dedicated merchant product.',
    problemStatement:
      'Recommend whether PayNest should build a merchant product. If yes, define the target segment, the MVP, the go-to-market approach, and how it makes money.',
    deliverables: [
      'Market and competitor assessment',
      'Clear go / no-go recommendation with reasoning',
      'Target merchant segment and MVP feature set',
      'Go-to-market plan and business model',
      'Top risks and what would change your mind',
    ],
    constraints: ['Regulation caps merchant fees on small transactions', 'Launch within two quarters'],
    evaluationCriteria: [
      'Strategic reasoning',
      'Market and competitor understanding',
      'Business model viability',
      'Go-to-market practicality',
      'Clarity of communication',
    ],
    hints: [
      'If fees are capped, where else can value be captured?',
      'Existing P2P behaviour is both a signal and a risk.',
    ],
  },
  {
    id: 'ecommerce-launch-postmortem',
    title: 'Run a Launch Post-Mortem',
    company: 'CartKart (E-commerce)',
    category: 'Execution',
    difficulty: 'Beginner',
    estimatedHours: 2,
    summary: 'A new one-click checkout increased conversion but also refunds. Write the post-mortem.',
    context:
      'CartKart launched one-click checkout to all users at once. Checkout conversion rose 9%, but refund requests rose 22% and customer support tickets about accidental orders doubled in two weeks. The launch had no staged rollout or kill switch.',
    problemStatement:
      'Write a blameless post-mortem that explains what happened, the root causes, and the process and product changes you would make.',
    deliverables: [
      'Timeline and impact summary',
      'Root cause analysis (product and process)',
      'Immediate fixes and longer-term changes',
      'A launch checklist the team should use next time',
    ],
    constraints: ['Keep it blameless', 'One page equivalent'],
    evaluationCriteria: [
      'Root cause depth',
      'Net impact reasoning',
      'Quality of remediation',
      'Process improvements',
      'Clarity of communication',
    ],
    hints: [
      'Was the 9% conversion gain real once refunds are netted out?',
      'Separate what went wrong in the product from what went wrong in the process.',
    ],
  },
];

export const getProjectById = (id: string): RealWorldProject | undefined =>
  REAL_WORLD_PROJECTS.find((p) => p.id === id);
