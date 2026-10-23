import type { AiPmLesson } from './types';

// Phase 6 (Production, scale and strategy), Days 69–78.

export const PHASE6_LESSONS: Record<number, AiPmLesson> = {
  69: {
    intro: 'Phase 6 is about running an AI product as a business. It starts with what happens when something goes wrong at 2 a.m.',
    objectives: [
      'Define ownership and service expectations for an AI product.',
      'Plan incident response for AI-specific incidents.',
      'Draft an operations runbook.',
    ],
    parts: [
      {
        id: 'incidents',
        title: 'AI incidents are different',
        table: {
          head: ['Incident', 'Example', 'First response'],
          rows: [
            ['Quality drop', 'Wrong answers jump after a provider updates the model', 'Pin the previous model version; run the golden set'],
            ['Harmful output', 'The assistant gives dangerous advice', 'Block the topic; review logs; notify stakeholders'],
            ['Data leak', 'A user sees another team’s document', 'Turn off the feature; investigate access; follow the privacy process'],
            ['Provider outage', 'The model API is down', 'Switch to a backup model or show a clear fallback'],
            ['Cost spike', 'Spend triples overnight', 'Check for abuse or loops; apply rate limits'],
          ],
        },
      },
      {
        id: 'roles',
        title: 'Who does what',
        bullets: [
          { term: 'Product owner', text: 'Owns quality targets and decides on trade-offs.' },
          { term: 'On-call engineer', text: 'Responds to alerts and runs the runbook.' },
          { term: 'Domain reviewer', text: 'For example HR, checks escalations and content accuracy.' },
          { term: 'Security and privacy', text: 'Leads on leaks and abuse.' },
        ],
        callout: { label: 'Service expectations', text: 'Write them down: for example, 99.5% availability, p95 response under 4 seconds, S0 incidents acknowledged within 15 minutes.' },
      },
      {
        id: 'runbook',
        title: 'What a runbook contains',
        bullets: [
          { text: 'How to recognise each incident type (which alert or signal).' },
          { text: 'Immediate steps: switch off, roll back, or fall back.' },
          { text: 'Who to inform, and the message template for users.' },
          { text: 'How to investigate, and add the case to the regression suite.' },
          { text: 'A short write-up after every serious incident: cause, fix, prevention.' },
        ],
      },
    ],
    quiz: {
      title: 'What should happen first?',
      questions: [
        { q: 'A user reports seeing another team’s confidential document.', options: ['Wait for more reports', 'Turn off the feature and investigate access', 'Change the prompt'], answer: 1, why: 'A possible leak needs containment first.' },
        { q: 'Answers got worse the day the provider released a new model version.', options: ['Pin the previous version and run evals', 'Do nothing', 'Delete the logs'], answer: 0, why: 'Roll back the variable that changed.' },
        { q: 'The model API is down.', options: ['Show an error with no explanation', 'Switch to a backup or a clear fallback message'], answer: 1, why: 'Degrade gracefully.' },
        { q: 'Spend tripled overnight.', options: ['Check for abuse or loops and rate-limit', 'Ignore it until the monthly bill'], answer: 0, why: 'Cost incidents grow fast.' },
      ],
    },
    exercise: {
      title: 'Draft your operations runbook',
      intro: 'Write a short runbook for your capstone.',
      capstone: true,
      fields: [
        { key: 'roles', label: 'Owners and roles', rows: 3 },
        { key: 'sla', label: 'Service expectations', rows: 2 },
        { key: 'incidents', label: 'Three incident types: how you detect them and first steps', rows: 6 },
        { key: 'after', label: 'What happens after an incident', rows: 2 },
      ],
      rubric: 'Check that roles are named with clear accountability, service expectations are numeric, incidents include AI-specific ones (quality drop after a model change, harmful output, data leak) with concrete detection and containment steps, and post-incident steps include a write-up and new regression cases.',
      button: 'Review my runbook',
    },
    completion: [
      'I know five AI incident types.',
      'I named owners and service expectations.',
      'I completed the four questions.',
      'I drafted a runbook.',
    ],
    takeaway: 'decide who owns what before anything breaks, and write down the first steps for each AI incident type.',
  },

  70: {
    intro: 'What works for 100 users can be slow and expensive for 100,000. Today you plan for scale.',
    objectives: [
      'Estimate load and concurrency.',
      'Use caching, model routing and batching to cut cost and latency.',
      'Weigh each saving against its quality risk.',
    ],
    parts: [
      {
        id: 'levers',
        title: 'Levers at scale',
        table: {
          head: ['Lever', 'What it does', 'Quality risk'],
          rows: [
            ['Model routing', 'Send simple requests to a cheaper, faster model', 'Hard requests misrouted to the small model'],
            ['Caching', 'Reuse answers or context for repeated questions', 'Stale answers after a policy change'],
            ['Prompt caching', 'Provider reuses a long, unchanging prompt prefix at lower cost', 'Little, if set up correctly'],
            ['Batching', 'Process non-urgent jobs together, cheaper', 'Slower results'],
            ['Shorter context', 'Retrieve fewer, better passages', 'Missing information'],
          ],
        },
      },
      {
        id: 'example',
        title: 'Worked example: routing',
        paragraphs: ['A support bot handles 10,000 tickets a day. On the large model each ticket costs $0.012, so the bill is $120 a day. 70% of tickets are simple.'],
        callout: { label: 'Calculation', text: 'Route the simple 70% to a cheaper model: the bill drops to $8.40 + $36 = $44.40 a day, a 63% cut. The risk is a misrouted hard ticket, so add misrouted cases to the eval set.' },
      },
      {
        id: 'load',
        title: 'Load and concurrency',
        bullets: [
          { text: 'Peak load matters more than daily average: Monday 10 a.m. might be 5× a normal hour.' },
          { text: 'Check your provider’s rate limits against peak requests per minute.' },
          { text: 'Plan what happens when limits are hit: queue, fall back, or show a clear message.' },
        ],
      },
    ],
    quiz: {
      title: 'Which lever fits?',
      options: ['Model routing', 'Caching', 'Batching'],
      questions: [
        { q: 'Monthly reports summarising 50,000 tickets, needed by Friday.', answer: 2, why: 'Not urgent, so batch it cheaply.' },
        { q: '60% of questions are simple FAQs; the rest need careful reasoning.', answer: 0, why: 'Send each to the right-sized model.' },
        { q: 'The same 20 questions make up 30% of traffic and rarely change.', answer: 1, why: 'Reuse answers, and clear them when policies change.' },
        { q: 'A nightly job tags last week’s documents.', answer: 2, why: 'Background work suits batching.' },
      ],
    },
    exercise: {
      title: 'Create a scale scenario',
      intro: 'Imagine your capstone at 50× today’s usage. Plan cost and latency.',
      capstone: true,
      fields: [
        { key: 'load', label: 'Daily volume, peak requests per minute, and rate limits', rows: 3 },
        { key: 'levers', label: 'Which levers you would use, with estimated savings', rows: 4 },
        { key: 'risk', label: 'The quality risk of each lever and how you would test it', rows: 3 },
        { key: 'budget', label: 'Cost and latency budget at scale', rows: 2 },
      ],
      rubric: 'Check that peak load is estimated (not just average), levers fit their traffic pattern with rough savings calculated, each lever’s quality risk is named with an eval to catch it, and budgets are numeric.',
      button: 'Review my scale plan',
    },
    completion: [
      'I can name five scale levers.',
      'I calculated a routing or caching saving.',
      'I completed the four questions.',
      'I planned for peak load.',
    ],
    takeaway: 'route, cache and batch to cut cost, but every saving has a quality risk you must test.',
  },

  71: {
    intro: 'AI products drift: users ask new things, documents change, and providers update models. Today you set up monitoring that notices.',
    objectives: [
      'Monitor quality, traffic mix, data changes, tool failures and model versions.',
      'Set alert thresholds that are useful, not noisy.',
      'Design a monitoring dashboard.',
    ],
    parts: [
      {
        id: 'what',
        title: 'What to monitor',
        table: {
          head: ['Area', 'Example metric', 'Example alert'],
          rows: [
            ['Quality', 'Live code-check pass rate; sampled judge scores', 'Pass rate below 95% for 1 hour'],
            ['User signals', 'Thumbs-down and escalation rates', 'Thumbs-down above 10% for a day'],
            ['Traffic mix', 'Share of questions by topic or language', 'A new topic grows past 10% of traffic'],
            ['Data', 'Documents added, changed, failed to index', 'Indexing failures above zero'],
            ['Tools', 'Tool error rate', 'Errors above 2%'],
            ['Model', 'Model version in use', 'Any unexpected version change'],
            ['Cost and latency', 'Cost per day; p95 latency', 'Cost 50% above budget; p95 above 6 seconds'],
          ],
        },
      },
      {
        id: 'drift',
        title: 'Three kinds of drift',
        cards: [
          { title: 'Input drift', text: 'Users ask different things.', example: 'After a reorganisation, many new questions about team transfers.' },
          { title: 'Data drift', text: 'Sources change.', example: 'A new travel policy replaces the old one.' },
          { title: 'Model drift', text: 'The provider changes the model.', example: 'A new version writes longer answers and cites less.' },
        ],
        cardCols: 3,
      },
      {
        id: 'alerts',
        title: 'Good alerts',
        bullets: [
          { text: 'Each alert has an owner and a runbook step (Day 69).' },
          { text: 'Too many alerts get ignored. Start with a few that matter.' },
          { text: 'Review weekly: sample 20 conversations even when no alert fires.' },
        ],
      },
    ],
    quiz: {
      title: 'Which kind of drift?',
      options: ['Input drift', 'Data drift', 'Model drift'],
      questions: [
        { q: 'A new benefits scheme launches and questions about it surge.', answer: 0, why: 'What users ask has changed.' },
        { q: 'The provider’s model update makes answers shorter.', answer: 2, why: 'The model changed.' },
        { q: 'HR replaces the leave policy PDF with a new version.', answer: 1, why: 'The source data changed.' },
        { q: 'Users start writing in Hindi more often after a rollout to a new office.', answer: 0, why: 'The input mix changed.' },
      ],
    },
    exercise: {
      title: 'Define your monitoring dashboard and alerts',
      intro: 'Design monitoring for your capstone in production.',
      capstone: true,
      fields: [
        { key: 'metrics', label: 'Dashboard metrics across quality, users, traffic, data, tools, model, cost', rows: 6 },
        { key: 'alerts', label: 'Five alerts with thresholds and owners', rows: 5 },
        { key: 'review', label: 'Your weekly manual review', rows: 2 },
      ],
      rubric: 'Check that metrics cover all three kinds of drift plus cost and latency, alerts have numeric thresholds, owners and are not too many, and there is a regular human review of sampled conversations.',
      button: 'Review my monitoring',
    },
    completion: [
      'I know input, data and model drift.',
      'I chose dashboard metrics.',
      'I completed the four questions.',
      'I set alerts with owners.',
    ],
    takeaway: 'watch inputs, data and model versions, alert on a few things that matter, and read real conversations every week.',
  },

  72: {
    intro: 'Did your AI feature actually cause the improvement? Today you design an experiment that can tell.',
    objectives: [
      'Tell correlation from causal impact.',
      'Design an A/B test with a hypothesis, primary metric and guardrails.',
      'Reason about duration and sample size.',
    ],
    parts: [
      {
        id: 'causal',
        title: 'Correlation is not impact',
        paragraphs: [
          'HR tickets fell 20% the month you launched. But it was also the month after appraisals, when tickets always fall. Without a comparison group, you can’t tell how much was your feature.',
        ],
        callout: { label: 'A/B test', text: 'Randomly give the feature to some users (treatment) and not others (control). Because the groups are otherwise alike, the difference between them is the feature’s effect.' },
      },
      {
        id: 'plan',
        title: 'An experiment plan',
        table: {
          head: ['Item', 'Example'],
          rows: [
            ['Hypothesis', 'Employees with the assistant raise 25% fewer HR tickets'],
            ['Unit', 'Employee (not session), so the same person always sees the same version'],
            ['Primary metric', 'HR tickets per employee per month'],
            ['Guardrails', 'Wrong-answer reports; escalations; satisfaction'],
            ['Duration', 'At least 4 weeks, covering a full monthly cycle and past the novelty effect'],
            ['Decision rule', 'Ship if tickets drop at least 15% with no guardrail getting worse'],
          ],
        },
      },
      {
        id: 'pitfalls',
        title: 'Common pitfalls',
        bullets: [
          { term: 'Peeking', text: 'Stopping as soon as results look good inflates false wins.' },
          { term: 'Novelty effect', text: 'Usage spikes in week 1 because it is new.' },
          { term: 'Spillover', text: 'Treated employees share answers with colleagues in control.' },
          { term: 'Too small', text: 'With few users, real effects look like noise.' },
        ],
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Tickets fell after launch, but also fall every year in that month. What do you need?', options: ['A control group', 'More launches', 'A bigger model'], answer: 0, why: 'To separate the feature’s effect from the season.' },
        { q: 'Results look great on day 3. Stop the test?', options: ['Yes', 'No, run the planned duration'], answer: 1, why: 'Peeking inflates false positives.' },
        { q: 'Tickets dropped, but wrong-answer reports doubled. Ship?', options: ['Yes', 'Not without fixing the guardrail'], answer: 1, why: 'Guardrails protect against harmful wins.' },
        { q: 'Why randomise by employee rather than by session?', options: ['So people get a consistent experience', 'It is cheaper'], answer: 0, why: 'Switching versions would confuse users and blur results.' },
      ],
    },
    exercise: {
      title: 'Write your experiment plan',
      intro: 'Design an experiment to prove your capstone’s impact.',
      capstone: true,
      fields: [
        { key: 'hypothesis', label: 'Hypothesis', rows: 2 },
        { key: 'design', label: 'Unit, groups and how users are assigned', rows: 3 },
        { key: 'metrics', label: 'Primary metric and guardrails', rows: 3 },
        { key: 'duration', label: 'Duration and why', rows: 2 },
        { key: 'decision', label: 'Decision rule', rows: 2 },
      ],
      rubric: 'Check that the hypothesis is specific and measurable, randomisation is at a sensible unit with a control group, the primary metric links to business value with guardrails on quality and trust, duration covers cycles and novelty, and the decision rule is set in advance.',
      button: 'Review my experiment',
    },
    completion: [
      'I can tell correlation from causal impact.',
      'I designed an A/B test with guardrails.',
      'I completed the four questions.',
      'I set duration and a decision rule.',
    ],
    takeaway: 'only a comparison group shows what your feature caused. Set metrics, guardrails, duration and the decision rule before you start.',
  },

  73: {
    intro: 'AI features have real running costs per use. Today you check the business still works when usage grows.',
    objectives: [
      'Calculate cost per successful task and gross margin.',
      'Compare pricing options for AI features.',
      'Use usage limits sensibly.',
    ],
    parts: [
      {
        id: 'unit',
        title: 'Unit economics',
        table: {
          head: ['Item', 'Example'],
          rows: [
            ['Price per seat', '₹400 per employee per month'],
            ['Questions per employee', '60 per month'],
            ['AI cost per question', '₹2 (model, search, hosting)'],
            ['AI cost per seat', '₹120 per month'],
            ['Gross margin on the feature', '(400 − 120) ÷ 400 = 70%'],
          ],
        },
        callout: { tone: 'amber', label: 'Watch the heavy users', text: 'If 10% of users ask 500 questions a month, their cost is ₹1,000 each: more than they pay. Averages hide this.' },
      },
      {
        id: 'pricing',
        title: 'Pricing options',
        cards: [
          { title: 'Per seat', text: 'Simple to buy; risky if usage varies a lot.' },
          { title: 'Usage-based', text: 'Cost matches value; harder for buyers to budget.' },
          { title: 'Per outcome', text: 'Pay per resolved ticket; aligns with value but needs trusted measurement.' },
          { title: 'Tiers with limits', text: 'Seats include a monthly allowance; extra usage costs more.' },
        ],
        cardCols: 2,
      },
      {
        id: 'improve',
        title: 'Improving margin',
        bullets: [
          { text: 'Lower cost per task: routing, caching, shorter context (Day 70).' },
          { text: 'Raise success rate: failed tasks cost money and earn nothing.' },
          { text: 'Fair-use limits for extreme usage.' },
          { text: 'Price on value: hours saved or tickets avoided.' },
        ],
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Price ₹500 a seat, AI cost ₹150 a seat. Gross margin on the feature?', options: ['30%', '70%', '150%'], answer: 1, why: '(500 − 150) ÷ 500 = 70%.' },
        { q: 'Which pricing best matches cost when usage varies widely?', options: ['Flat per seat', 'Usage-based or tiers with limits'], answer: 1, why: 'Revenue moves with cost.' },
        { q: 'Why measure cost per successful task, not per request?', options: ['Failed tasks cost money but create no value', 'It is smaller'], answer: 0, why: 'It shows the real cost of value delivered.' },
        { q: 'A few power users cost more than they pay. Best response?', options: ['Ignore it', 'Fair-use limits or a higher tier'], answer: 1, why: 'Protect margin without hurting most users.' },
      ],
    },
    exercise: {
      title: 'Build your unit-economics model',
      intro: 'Model the economics of your capstone if it were sold to companies.',
      capstone: true,
      fields: [
        { key: 'price', label: 'Pricing model and price', rows: 2 },
        { key: 'usage', label: 'Usage assumptions: average and heavy users', rows: 3 },
        { key: 'cost', label: 'Cost per task, cost per successful task, cost per user', rows: 3 },
        { key: 'margin', label: 'Gross margin for average and heavy users', rows: 2 },
        { key: 'levers', label: 'How you would improve margin', rows: 2 },
      ],
      rubric: 'Check that assumptions are explicit, cost per successful task accounts for the success rate, margin is calculated correctly for both average and heavy users, the pricing model fits the usage pattern, and improvement levers are concrete.',
      button: 'Review my model',
    },
    completion: [
      'I can calculate gross margin on an AI feature.',
      'I checked heavy users, not just the average.',
      'I completed the four questions.',
      'I built a unit-economics model.',
    ],
    takeaway: 'an AI feature must earn more than it costs per user, including the heaviest users. Price and limit accordingly.',
  },

  74: {
    intro: 'Responsible AI becomes real when principles turn into requirements, owners and reviews. Today you make that translation.',
    objectives: [
      'Turn responsible-AI principles into product requirements.',
      'Know the main regulations and frameworks at a high level.',
      'Build a risk, control and owner matrix.',
    ],
    parts: [
      {
        id: 'translate',
        title: 'From principle to requirement',
        table: {
          head: ['Principle', 'Product requirement'],
          rows: [
            ['Transparency', 'Label AI-generated answers; show sources'],
            ['Privacy', 'No personal data in logs; 30-day retention'],
            ['Fairness', 'Segment evals by language every release'],
            ['Safety', 'Sensitive topics escalate to a person'],
            ['Accountability', 'A named owner signs off each release'],
            ['Human oversight', 'Consequential actions need user confirmation'],
          ],
        },
      },
      {
        id: 'frameworks',
        title: 'Frameworks and rules to know',
        bullets: [
          { term: 'EU AI Act', text: 'Sorts AI uses by risk level; high-risk uses (such as hiring decisions) have strict requirements.' },
          { term: 'NIST AI Risk Management Framework', text: 'A voluntary US framework: govern, map, measure, manage.' },
          { term: 'India’s DPDP Act', text: 'Rules on consent and handling of personal data.' },
          { term: 'Company policies', text: 'Your employer’s AI use, data and security policies.' },
        ],
        callout: { label: 'PM’s role', text: 'You don’t need to be a lawyer. You need to know when to involve legal, privacy and security, and to turn their advice into requirements and tests.' },
      },
      {
        id: 'matrix',
        title: 'Risk, control, owner',
        paragraphs: ['For each risk, name the control that reduces it, the owner, and how you know the control works (usually an eval or a test).'],
        quote: 'A risk without an owner is a risk nobody is managing.',
      },
    ],
    quiz: {
      title: 'Which principle does the requirement serve?',
      options: ['Transparency', 'Privacy', 'Fairness', 'Accountability'],
      questions: [
        { q: 'Every answer shows “AI-generated” and its sources.', answer: 0, why: 'Users know what they are seeing.' },
        { q: 'Evals are broken down by language each release.', answer: 2, why: 'Checks for gaps between groups.' },
        { q: 'A named product owner signs off every release.', answer: 3, why: 'Clear responsibility.' },
        { q: 'Employee IDs are masked in logs.', answer: 1, why: 'Protects personal data.' },
      ],
    },
    exercise: {
      title: 'Create your risk, control and owner matrix',
      intro: 'List the top risks for your capstone and how they are governed.',
      capstone: true,
      fields: [
        { key: 'matrix', label: 'Five risks, each with control, owner, and how you test the control', rows: 8 },
        { key: 'rules', label: 'Which regulations or policies apply, and who you would consult', rows: 3 },
        { key: 'review', label: 'Your review process before each release', rows: 2 },
      ],
      rubric: 'Check that risks are specific to their product (privacy, harmful output, unfairness, over-reliance, security), each control is concrete with a named owner and a test, relevant regulations are identified at a sensible level, and there is a release review process.',
      button: 'Review my matrix',
    },
    completion: [
      'I turned principles into requirements.',
      'I know which rules may apply.',
      'I completed the four questions.',
      'Every risk has a control, owner and test.',
    ],
    takeaway: 'responsible AI is a set of requirements with owners and tests, not a statement of values.',
  },

  75: {
    intro: 'Large customers often ask where their data will live and who runs the model. Today you compare deployment options.',
    objectives: [
      'Compare SaaS, private cloud, self-hosted and regional deployments.',
      'Understand customer-managed keys at a high level.',
      'Choose a deployment for your capstone’s customer.',
    ],
    parts: [
      {
        id: 'options',
        title: 'Deployment options',
        table: {
          head: ['Option', 'What it means', 'Good for', 'Trade-off'],
          rows: [
            ['Multi-tenant SaaS', 'Everyone shares your cloud service', 'Most customers; fastest updates', 'Some customers won’t accept shared infrastructure'],
            ['Single-tenant or private cloud', 'A dedicated instance per customer', 'Regulated or large enterprises', 'Higher cost; slower updates'],
            ['Regional deployment', 'Data and processing stay in a chosen country', 'Data residency rules', 'Model availability varies by region'],
            ['Self-hosted / open-weight models', 'The customer or you run the model', 'Strict control or offline needs', 'Heavy operations; often weaker models'],
          ],
        },
      },
      {
        id: 'keys',
        title: 'Customer-managed keys',
        paragraphs: ['With customer-managed keys, the customer controls the encryption keys for their data. If they revoke the key, even the vendor can’t read the data. It is often requested by banks and governments.'],
      },
      {
        id: 'questions',
        title: 'Questions that decide it',
        bullets: [
          { text: 'Where must data be stored and processed?' },
          { text: 'May data be sent to a third-party model provider?' },
          { text: 'Does the provider keep or train on the data?' },
          { text: 'How quickly does the customer need updates and new models?' },
          { text: 'What can the customer afford, and what can your team operate?' },
        ],
      },
    ],
    quiz: {
      title: 'Which deployment fits?',
      options: ['Multi-tenant SaaS', 'Single-tenant / private cloud', 'Regional deployment', 'Self-hosted'],
      questions: [
        { q: 'A startup customer wants the fastest setup and lowest price.', answer: 0, why: 'Shared SaaS is cheapest and quickest.' },
        { q: 'A customer requires that data never leaves India.', answer: 2, why: 'Data residency.' },
        { q: 'A defence agency needs it to run with no internet connection.', answer: 3, why: 'Only self-hosting works offline.' },
        { q: 'A large bank wants a dedicated instance but your team to run it.', answer: 1, why: 'Dedicated, but vendor-operated.' },
      ],
    },
    exercise: {
      title: 'Create a deployment decision matrix',
      intro: 'Choose a deployment for your capstone’s target customer.',
      capstone: true,
      fields: [
        { key: 'customer', label: 'Your target customer and their requirements', rows: 3 },
        { key: 'matrix', label: 'Compare at least three options on data, cost, operations and model quality', rows: 5 },
        { key: 'choice', label: 'Your choice and why', rows: 3 },
      ],
      rubric: 'Check that customer requirements are specific (residency, third-party processing, updates, budget), at least three options are compared on relevant criteria including model quality and operational load, and the choice follows from the requirements.',
      button: 'Review my decision',
    },
    completion: [
      'I can compare four deployment options.',
      'I understand customer-managed keys.',
      'I completed the four questions.',
      'I chose a deployment for my customer.',
    ],
    takeaway: 'deployment is chosen by the customer’s data rules, budget and operations, and it limits which models you can use.',
  },

  76: {
    intro: 'Models and prompts will change many times after launch. Today you plan how to change them safely.',
    objectives: [
      'Version models, prompts and data together.',
      'Roll out changes with canaries and fast rollback.',
      'Communicate changes to customers.',
    ],
    parts: [
      {
        id: 'version',
        title: 'Version everything that changes behaviour',
        bullets: [
          { text: 'Model name and exact version (avoid “latest” aliases in production).' },
          { text: 'Prompt version.' },
          { text: 'Retrieval settings and index version.' },
          { text: 'Tool descriptions and schemas.' },
        ],
        callout: { tone: 'amber', label: 'Why pin versions?', text: 'If you use an alias that points to the newest model, the provider can change your product’s behaviour without you shipping anything.' },
      },
      {
        id: 'process',
        title: 'A safe change process',
        table: {
          head: ['Step', 'What happens'],
          rows: [
            ['1. Offline evals', 'Full regression suite and release gates (Day 49)'],
            ['2. Shadow test', 'New version runs on real traffic in the background; users see the old one'],
            ['3. Canary', 'Real users get the new version, for example 5% first'],
            ['4. Watch', 'Compare quality, cost and latency between the two'],
            ['5. Expand or roll back', 'Increase gradually, or switch back in minutes'],
          ],
        },
      },
      {
        id: 'communicate',
        title: 'Telling customers',
        bullets: [
          { text: 'Release notes for changes users will notice.' },
          { text: 'Advance notice for enterprise customers, especially when the model provider changes.' },
          { text: 'Plan ahead for provider deprecations: old models are retired on fixed dates.' },
        ],
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Why avoid a “latest model” alias in production?', options: ['It is slower', 'Behaviour can change without your release', 'It costs more'], answer: 1, why: 'Pin versions to control changes.' },
        { q: 'Running a new version on real traffic without showing users is a…', options: ['Canary', 'Shadow test', 'Rollback'], answer: 1, why: 'Users still see the old version.' },
        { q: 'The provider will retire your model in 3 months. What first?', options: ['Wait', 'Evaluate replacement models on your golden set'], answer: 1, why: 'Start early to avoid a rushed switch.' },
        { q: 'The canary shows higher wrong-answer reports. What next?', options: ['Expand anyway', 'Roll back and investigate'], answer: 1, why: 'That is what a canary is for.' },
      ],
    },
    exercise: {
      title: 'Write your model-change plan',
      intro: 'Plan how your capstone will change models and prompts safely.',
      capstone: true,
      fields: [
        { key: 'versions', label: 'What you version and how', rows: 3 },
        { key: 'process', label: 'Your change process from evals to full rollout', rows: 4 },
        { key: 'rollback', label: 'Rollback method and triggers', rows: 2 },
        { key: 'comms', label: 'How you tell users and customers', rows: 2 },
      ],
      rubric: 'Check that model, prompt, retrieval and tool versions are pinned and recorded, the process includes offline evals, shadow or canary testing and gradual expansion, rollback is fast with triggers, and communication covers releases and provider deprecations.',
      button: 'Review my change plan',
    },
    completion: [
      'I pin model and prompt versions.',
      'I know shadow tests and canaries.',
      'I completed the four questions.',
      'I wrote a change plan with rollback.',
    ],
    takeaway: 'pin versions, test changes offline and on a small slice of traffic, and be able to roll back in minutes.',
  },

  77: {
    intro: 'You can’t do everything. Today you build a roadmap that balances reliability, adoption, cost and strategy.',
    objectives: [
      'Prioritise across reliability, adoption, cost and strategic value.',
      'Show dependencies and trade-offs honestly.',
      'Create a Now, Next, Later roadmap.',
    ],
    parts: [
      {
        id: 'buckets',
        title: 'Four kinds of work',
        cards: [
          { title: 'Reliability', text: 'Fix top failure categories, monitoring, safety.', example: 'Reduce unsupported claims from 8% to 3%.' },
          { title: 'Adoption', text: 'Get more people to use it and trust it.', example: 'Slack integration; onboarding prompts.' },
          { title: 'Cost', text: 'Make it sustainable at scale.', example: 'Model routing for simple questions.' },
          { title: 'Strategic bets', text: 'New capabilities that open new value.', example: 'Let the assistant submit leave requests.' },
        ],
        cardCols: 2,
      },
      {
        id: 'roadmap',
        title: 'Now, Next, Later',
        table: {
          head: ['Horizon', 'Example items', 'Why now / why later'],
          rows: [
            ['Now', 'Fix retrieval misses; add Slack access', 'Biggest failure category; most requested'],
            ['Next', 'Model routing; manager guidelines content', 'Needed before company-wide rollout'],
            ['Later', 'Leave request actions', 'Needs action-safety work and HR system integration first'],
          ],
        },
        callout: { label: 'Rule of thumb', text: 'Reliability before reach. Expanding a product people don’t trust spreads distrust faster.' },
      },
      {
        id: 'tradeoffs',
        title: 'State trade-offs and dependencies',
        bullets: [
          { text: 'Name what you are not doing and why.' },
          { text: 'Show dependencies: “Leave actions need the HR system API from the platform team.”' },
          { text: 'Tie each item to a metric from your tree (Day 33).' },
        ],
      },
    ],
    quiz: {
      title: 'Now, next or later?',
      options: ['Now', 'Next', 'Later'],
      questions: [
        { q: 'Unsupported claims are the top failure and causing complaints.', answer: 0, why: 'Reliability problems come first.' },
        { q: 'A new agentic feature that depends on an API another team hasn’t built.', answer: 2, why: 'Blocked by a dependency.' },
        { q: 'Cost routing needed before the planned company-wide rollout next quarter.', answer: 1, why: 'Important, but tied to a later milestone.' },
        { q: 'Users can’t find the assistant; usage is low despite good quality.', answer: 0, why: 'Adoption is the bottleneck.' },
      ],
    },
    exercise: {
      title: 'Create your Now, Next, Later roadmap',
      intro: 'Build a roadmap for your capstone’s next six months.',
      capstone: true,
      fields: [
        { key: 'now', label: 'Now: items, metric each moves, why now', rows: 3 },
        { key: 'next', label: 'Next', rows: 3 },
        { key: 'later', label: 'Later', rows: 3 },
        { key: 'tradeoffs', label: 'What you are not doing, and key dependencies', rows: 3 },
      ],
      rubric: 'Check that the roadmap balances reliability, adoption, cost and strategy, prioritises reliability problems early, ties items to metrics, states what is deliberately excluded, and names dependencies honestly.',
      button: 'Review my roadmap',
    },
    completion: [
      'I balanced four kinds of work.',
      'I put reliability before reach.',
      'I completed the four questions.',
      'I stated trade-offs and dependencies.',
    ],
    takeaway: 'fix trust before expanding reach, tie every roadmap item to a metric, and say clearly what you are not doing.',
  },

  78: {
    intro: 'This is Gate 6. Today you write a one-page memo asking leadership to scale, iterate or stop.',
    objectives: [
      'Communicate value, evidence, risks and investment in one page.',
      'Make a clear scale, iterate or stop recommendation.',
      'Pass the Phase 6 self-check.',
    ],
    parts: [
      {
        id: 'memo',
        title: 'The executive memo',
        table: {
          head: ['Section', 'Content'],
          rows: [
            ['Recommendation', 'One sentence, first: scale, iterate or stop'],
            ['Value', 'Impact in business terms, with evidence (experiment results)'],
            ['Quality and risk', 'Eval results, incidents, open risks and controls'],
            ['Economics', 'Cost per task, margin, cost at scale'],
            ['Investment ask', 'People, budget and time needed'],
            ['Decision needed', 'What you need leadership to decide, and by when'],
          ],
        },
        callout: { label: 'Style', text: 'Lead with the answer. Use numbers. Be honest about what you don’t know. One page.' },
      },
      {
        id: 'recap',
        title: 'Phase 6 in one page',
        bullets: [
          { term: 'Operations (Days 69, 71)', text: 'Runbooks, owners, monitoring and drift.' },
          { term: 'Scale and economics (Days 70, 73)', text: 'Routing, caching, margins and pricing.' },
          { term: 'Evidence (Day 72)', text: 'Experiments that show causal impact.' },
          { term: 'Governance and deployment (Days 74–76)', text: 'Risk owners, deployment choices, safe model changes.' },
          { term: 'Strategy (Day 77)', text: 'Roadmap that puts reliability before reach.' },
        ],
      },
    ],
    quiz: {
      title: 'Phase 6 self-check',
      questions: [
        { q: 'Answers worsen right after a provider’s model update. First step?', options: ['Pin the previous version and run evals', 'Rewrite the prompt'], answer: 0, why: 'Day 69.' },
        { q: '10,000 requests a day at $0.01; 60% routed to a model at $0.001. New daily cost?', options: ['$46', '$100'], answer: 0, why: '4,000 × 0.01 + 6,000 × 0.001 = $40 + $6 (Day 70).' },
        { q: 'Users start asking about a new benefits scheme. Which drift?', options: ['Input drift', 'Model drift'], answer: 0, why: 'Day 71.' },
        { q: 'What shows your feature caused the change?', options: ['Before/after comparison', 'A randomised control group'], answer: 1, why: 'Day 72.' },
        { q: 'Price ₹400 a seat, AI cost ₹100. Gross margin?', options: ['75%', '25%'], answer: 0, why: 'Day 73.' },
        { q: 'Why pin model versions?', options: ['So behaviour only changes when you release', 'To make answers longer'], answer: 0, why: 'Day 76.' },
      ],
    },
    exercise: {
      title: 'Submit your executive memo',
      intro: 'Write a one-page memo for your capstone recommending scale, iterate or stop.',
      capstone: true,
      fields: [
        { key: 'decision', label: 'Recommendation', choices: ['Scale', 'Iterate', 'Stop'] },
        { key: 'value', label: 'Value and evidence', rows: 3 },
        { key: 'quality', label: 'Quality, risks and controls', rows: 3 },
        { key: 'economics', label: 'Economics at scale', rows: 2 },
        { key: 'ask', label: 'Investment ask and the decision needed', rows: 3 },
      ],
      rubric: 'This is a gate review against the Phase 6 checklist: operations, unit economics, monitoring, experimentation, governance, deployment choices and a scale, iterate or stop decision. Check the memo leads with the decision, backs it with numbers, states risks honestly, and makes a clear ask. Say whether they look ready for Phase 7, and which day to revisit if not.',
      button: 'Review my memo',
    },
    completion: [
      'I scored at least 5 of 6 on the self-check, or revisited the days I missed.',
      'My memo leads with the recommendation.',
      'I backed it with evidence and economics.',
      'I stated the investment and decision needed.',
    ],
    takeaway: 'leaders decide on one page: the recommendation, the evidence, the risks, the cost, and what you need from them.',
  },
};
