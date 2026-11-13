// Overview copy for "AI PM in 90 Days: Level 1 + Level 2", from the owner's plan (2026-11-13).
// Not shown yet, because the owner has not decided them: peer review, certificate, public gallery, ₹499 paid review.

export const PATH_INTRO =
  'This is one path in two levels. In Level 1, a PM learns to use AI well and builds a small working AI product with no code. In Level 2, the same product becomes production-ready, and the PM prepares for AI PM roles. Each learner builds their own product. What they learn in a week, they implement in the same week.';

export const PATH_AT_A_GLANCE = {
  headers: ['Item', 'Level 1: AI-enabled PM', 'Level 2: AI Product Manager'],
  rows: [
    ['For', 'Any PM who wants to use AI well in their job and talk to AI teams.', 'PMs who want AI PM roles, with a focus on B2B and enterprise products.'],
    ['Price and format', 'Free. Self-serve on the site.', 'Paid cohort with live lectures and instructor review.'],
    ['Length', '5 weeks (days 1 to 35).', '8 weeks (days 36 to 90).'],
    ['Weekly time', 'About 4 to 5 hours: 3 short lessons and 1 build milestone.', 'About 8 to 10 hours: 3 lectures of 60 to 75 minutes and 1 build milestone.'],
    ['Depth', 'Concept depth, no code.', 'Full depth, with production, security and commercial work.'],
    ['Product at the end', 'A no-code product with a prompt, RAG, one real action and a 20 to 30 case eval.', 'The same product with an eval suite, tracing, login and roles, security tests and a real-user pilot.'],
    ['Ends with', 'Live demo link and a one-page case study.', 'Demo day, pilot report and interview practice.'],
  ],
};

export const LEVEL1_HOW = [
  'Level 1 is free and has no paywall.',
  'Each week has 3 short lessons and 1 build milestone. You can start on any day.',
  'Each milestone has a "Done when" checklist. You check your own work against it.',
  'Completing Level 1 gives direct entry to Level 2.',
];

export const PRODUCT_MUST_HAVE = [
  'A real user group that you can reach, and a problem those users have now.',
  'A language task for the LLM, such as answering, drafting, classifying or extracting.',
  'A knowledge source of at least 20 real documents.',
  'One real action through a tool, such as creating a ticket, sending a draft or updating a sheet.',
  'A result that you can measure.',
];

export const PRODUCT_REAL_RULES = [
  { term: 'Real data', text: 'Your own documents or public data from a real domain. Remove personal data first.' },
  { term: 'Real users', text: '5 to 10 people outside the course in the Level 2 pilot.' },
  { term: 'Real failures', text: 'At the Level 2 demo day you show 3 failures that you found and fixed, with evidence.' },
];

export const PRODUCTS_TO_AVOID =
  'Medical, legal or financial advice to the public, hiring decisions, and anything that needs personal data you have no right to use.';

export const ONE_STACK =
  'Level 1 uses a fixed starter kit: an AI app builder, a workflow tool, a model API and a sheet for evals. The kit is chosen so that Level 2 can add login, roles, tracing and rollback without a rebuild. If you use a different stack in Level 1, you may need to rebuild in week 6.';

export const SHOPASSIST =
  'Every lesson uses one shared example, ShopAssist: an AI customer support agent for an Indian e-commerce company.';

export const LEVEL2_HOW = [
  'Entry: Level 1 completion, or the entry task. The entry task is to build the Level 1 product in a weekend from the starter kit. You can also start from the ShopAssist reference build.',
  'Each week has 3 live lectures and 1 build milestone on your own product.',
  'Each lecture has outcomes, topics, a case study, an activity, pre-work and one check question.',
  'Each milestone is checked by one peer and then graded by the instructor.',
  'Assessment: 8 build milestones (60%), weekly scenario quizzes (10%), demo day (30%).',
  'SQL pre-work before week 11: SELECT, WHERE, GROUP BY, ORDER BY, COUNT, AVG and a simple JOIN.',
  'In Level 2 you change scope, not the product.',
];

export const DEMO_DAY = {
  task: 'Present your live product in 10 minutes, with 5 minutes of questions.',
  mustShow: [
    'The product, live, on a real task.',
    'The eval suite and the current pass rates.',
    'One trace, with cost per task.',
    'The login, roles and the result of your injection tests.',
    'The fine-tuning experiment and your decision.',
    'Three failures that you found and fixed, with before and after evidence.',
    'Pilot results from real users, with the ROI estimate.',
    'A system design diagram using the 5 layers.',
    'A one-page case study for your portfolio.',
  ],
  rubric: 'Working product (20%), evals and evidence of fixes (25%), production and security setup (20%), pilot results and commercial plan (20%), system design and presentation (15%).',
};
