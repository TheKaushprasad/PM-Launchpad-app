import type { AiPmLesson } from './types';

// Phase 5 (Build a prototype), Days 53–68. Template T7 (run log) is in data/aiPmCourse/content.ts.

export const PHASE5_LESSONS: Record<number, AiPmLesson> = {
  53: {
    intro: 'Phase 5 is where you build. You don’t need to be an engineer: AI app builders and no-code tools are enough for a working slice.',
    objectives: [
      'Choose the smallest end-to-end slice that is still useful.',
      'Pick a lightweight build approach that fits your skills.',
      'Write a prototype plan with milestones and non-goals.',
    ],
    parts: [
      {
        id: 'slice',
        title: 'The smallest useful slice',
        paragraphs: [
          'A slice goes from the user’s input to a finished task, for one narrow case. “Answer leave questions for full-time employees in one office, from three policy documents, with citations” is a slice. “A full HR assistant” is not.',
        ],
        quote: 'Thin and complete beats wide and half-built. A slice that really works is worth more than ten features that almost do.',
      },
      {
        id: 'approach',
        title: 'Build approaches',
        table: {
          head: ['Approach', 'Good for', 'Trade-off'],
          rows: [
            ['AI app builders (for example Google AI Studio, Lovable, Bolt, Replit)', 'A working app from a description', 'Less control; check where data goes'],
            ['No-code tools with AI steps (for example Zapier, Make, n8n)', 'Workflows and integrations', 'Harder to build custom UI'],
            ['Custom GPTs, Gems or Claude Projects', 'A quick RAG-style assistant on your documents', 'Limited evals, logging and access control'],
            ['A small coded app with an API', 'Full control and real evals', 'Needs coding help, possibly from an AI coding assistant'],
            ['Clickable prototype (Figma)', 'Testing UX when building is out of reach', 'No real AI behaviour to evaluate'],
          ],
        },
        callout: { label: 'Tip', text: 'Pick the simplest approach that lets you run your golden set and show sources. You can rebuild later.' },
      },
      {
        id: 'milestones',
        title: 'Milestones for the next two weeks',
        bullets: [
          { term: 'Days 54–56', text: 'Instructions, structured output, and the happy path working.' },
          { term: 'Days 57–60', text: 'Retrieval, permissions, safe actions and fallbacks.' },
          { term: 'Days 61–64', text: 'Logging, evals, one measured improvement, usability tests.' },
          { term: 'Days 65–68', text: 'Security, enterprise controls, launch plan and the demo.' },
        ],
      },
    ],
    quiz: {
      title: 'Is this a good first slice?',
      options: ['Good slice', 'Too wide', 'Not end to end'],
      questions: [
        { q: 'Answer leave questions for one office from three policies, with citations.', answer: 0, why: 'Narrow and complete.' },
        { q: 'Support every HR, IT, finance and legal question in 12 languages.', answer: 1, why: 'Far too much for two weeks.' },
        { q: 'A beautiful chat screen that doesn’t call any model yet.', answer: 2, why: 'No AI response, so nothing to evaluate.' },
        { q: 'Draft refund replies for one product line, with a human approving each send.', answer: 0, why: 'Narrow, complete and safe.' },
      ],
    },
    completion: [
      'I chose a thin, complete slice.',
      'I picked a build approach I can actually use.',
      'I completed the four questions.',
    ],
    takeaway: 'build the thinnest slice that goes all the way from input to task done, with the simplest tool that lets you test it.',
  },

  54: {
    intro: 'The system prompt is your product’s rulebook. Today you write it like a spec, and version it like code.',
    objectives: [
      'Separate system rules, user input, retrieved context and output requirements.',
      'Write a versioned instruction set.',
      'Create prompt test cases before changing the prompt.',
    ],
    parts: [
      {
        id: 'sections',
        title: 'Four clearly separated parts',
        table: {
          head: ['Part', 'What it holds', 'Example'],
          rows: [
            ['System rules', 'Role, scope, tone, what never to do', '“You answer HR policy questions for Acme employees. Never reveal personal data.”'],
            ['Retrieved context', 'Source passages, clearly marked as data', '<sources> … </sources>'],
            ['User input', 'The question, clearly marked', '<question> … </question>'],
            ['Output requirements', 'Format, length, citations, fallback text', '“Under 120 words. Cite the document and section. If unsure, say so.”'],
          ],
        },
        callout: { label: 'Why separate?', text: 'Clear boundaries make the model less likely to treat a document or user message as instructions, and make the prompt easier to change safely.' },
      },
      {
        id: 'version',
        title: 'Version your prompts',
        bullets: [
          { text: 'Give every prompt a version number (v1, v2…) and keep a short change note.' },
          { text: 'Log which version produced each answer (Day 61).' },
          { text: 'Change one thing at a time, so you know what caused a difference.' },
        ],
      },
      {
        id: 'tests',
        title: 'Prompt test cases',
        paragraphs: ['Before editing a prompt, pick 8–10 cases from your golden set that the change should affect, and a few it shouldn’t. Run both before and after.'],
        quote: 'A prompt change without a test is a guess you ship to every user at once.',
      },
    ],
    quiz: {
      title: 'Which part of the prompt does it belong in?',
      options: ['System rules', 'Retrieved context', 'User input', 'Output requirements'],
      questions: [
        { q: '“Answer in under 120 words with one citation.”', answer: 3, why: 'It describes the shape of the answer.' },
        { q: 'The text of Leave Policy section 3.', answer: 1, why: 'Source material for grounding.' },
        { q: '“Never discuss other employees’ salaries.”', answer: 0, why: 'A scope and safety rule.' },
        { q: '“How many sick days do interns get?”', answer: 2, why: 'What the user asked.' },
      ],
    },
    completion: [
      'I separated rules, context, input and output requirements.',
      'My prompt has a version and change notes.',
      'I completed the four questions.',
    ],
    takeaway: 'write the prompt like a spec, separate data from instructions, and never change it without tests.',
  },

  55: {
    intro: 'Free text is fine for people. Software needs structure. Today you make outputs machine-readable and check them.',
    objectives: [
      'Define an output schema for your product.',
      'Validate outputs before showing them or acting on them.',
      'Decide what happens when validation fails.',
    ],
    parts: [
      {
        id: 'schema',
        title: 'An example schema',
        table: {
          head: ['Field', 'Type', 'Rule'],
          rows: [
            ['answer', 'text', 'Required; under 120 words'],
            ['citations', 'list of {doc, section, date}', 'At least one, unless status is “not_found”'],
            ['status', 'one of: answered, not_found, escalate', 'Required'],
            ['confidence', 'one of: high, low', 'Required'],
          ],
        },
        paragraphs: ['The UI uses status to choose which screen state to show (Day 35), and citations to show sources.'],
      },
      {
        id: 'validate',
        title: 'Validate before you trust',
        bullets: [
          { term: 'Parse', text: 'Is it valid JSON?' },
          { term: 'Check the schema', text: 'Are all required fields present, with allowed values?' },
          { term: 'Check rules', text: 'Do citations point to documents that were actually retrieved?' },
        ],
        callout: { label: 'Tip', text: 'Most model APIs now offer a structured output mode that forces valid JSON. Use it, but still validate the content.' },
      },
      {
        id: 'failure',
        title: 'When validation fails',
        cards: [
          { title: 'Retry once', text: 'Ask the model again, sometimes with the error message.' },
          { title: 'Fall back', text: 'Show a safe message: “I couldn’t answer that reliably. Contact HR.”' },
          { title: 'Log it', text: 'Record the failure so it shows up in your error analysis.' },
        ],
        cardCols: 3,
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Why add a “status” field?', options: ['It looks professional', 'The UI can choose the right state', 'It reduces tokens'], answer: 1, why: 'Structure drives product behaviour.' },
        { q: 'A citation points to a document that wasn’t retrieved. What is it?', options: ['Fine', 'A validation failure: likely invented', 'A latency issue'], answer: 1, why: 'Citations must match retrieved sources.' },
        { q: 'Structured output mode is on. Do you still validate?', options: ['No', 'Yes, the content can still break rules'], answer: 1, why: 'Valid JSON can still contain wrong values.' },
        { q: 'Validation fails twice. Best response?', options: ['Show the raw output', 'Show a safe fallback and log it', 'Crash'], answer: 1, why: 'Fail safely and learn from it.' },
      ],
    },
    completion: [
      'I defined an output schema.',
      'I validate content, not just format.',
      'I completed the four questions.',
    ],
    takeaway: 'make outputs structured, validate them before use, and fall back safely when they fail.',
  },

  56: {
    intro: 'Today you make it work end to end: input, AI response, feedback, task done.',
    objectives: [
      'Connect input, AI response, user feedback and task completion.',
      'Ship a working happy path or clickable prototype.',
      'Log your first runs in T7.',
    ],
    parts: [
      {
        id: 'flow',
        title: 'The core flow',
        bullets: [
          { term: '1. Input', text: 'The user asks a question or starts the task.' },
          { term: '2. AI response', text: 'Your prompt, model and schema produce an answer.' },
          { term: '3. Show it well', text: 'Answer, sources and the right state from Day 35.' },
          { term: '4. Feedback', text: 'Thumbs up or down, and “report a wrong answer”.' },
          { term: '5. Task done', text: 'A clear next step: open the policy, apply in the portal, contact HR.' },
        ],
      },
      {
        id: 'happy',
        title: 'Happy path first',
        paragraphs: ['Get the most common case working before anything else. Then try five golden cases by hand, note what happens, and fix the worst problem.'],
        callout: { label: 'Run log (T7)', text: 'Record every test run: date, input, prompt version, model, latency, output OK, failure category. This becomes your evidence.' },
      },
      {
        id: 'demo',
        title: 'Make it showable',
        bullets: [
          { text: 'Deploy it somewhere you can share a link, even if it is private.' },
          { text: 'Add sample questions so testers know what to try.' },
          { text: 'Take screenshots now; you will use them in your case study.' },
        ],
      },
    ],
    quiz: {
      title: 'Which step of the core flow is missing?',
      options: ['Feedback', 'Show it well', 'Task done'],
      questions: [
        { q: 'The answer is correct, but the user has no way to say it was wrong.', answer: 0, why: 'Users need to flag problems.' },
        { q: 'The answer appears as raw JSON on screen.', answer: 1, why: 'The structured output isn’t rendered for people.' },
        { q: 'The user learns they can claim ₹5,000 but isn’t told where to file the claim.', answer: 2, why: 'Guide them to complete the task.' },
        { q: 'Sources are retrieved but never shown.', answer: 1, why: 'Showing sources is part of presenting the answer.' },
      ],
    },
    completion: [
      'My core flow works end to end.',
      'I logged five runs in T7.',
      'I completed the four questions.',
    ],
    takeaway: 'get the happy path working end to end, log every run, and fix the worst problem first.',
  },

  57: {
    intro: 'Now ground the answers in your documents, and show users where each answer came from.',
    objectives: [
      'Plan ingestion: which documents, how they are split and updated.',
      'Retrieve the right passages and pass them to the model.',
      'Show useful citations in the UI.',
    ],
    parts: [
      {
        id: 'ingest',
        title: 'Ingestion decisions',
        table: {
          head: ['Decision', 'Example choice'],
          rows: [
            ['Which documents', 'Only the approved, owned sources from Day 32'],
            ['How to split them', 'By policy section, so each chunk is one topic'],
            ['What metadata to keep', 'Title, section, date, office, who can access it'],
            ['How to update', 'Re-index when an owner publishes a new version'],
          ],
        },
      },
      {
        id: 'retrieve',
        title: 'Retrieval that works',
        bullets: [
          { text: 'Retrieve a few passages (for example 3–5), not whole documents.' },
          { text: 'Combine keyword and meaning-based search for policy names and numbers.' },
          { text: 'Filter by metadata first: the user’s office, documents they can access, current versions only.' },
          { text: 'Check retrieval separately: for 20 questions, was the right section in the top 5?' },
        ],
        callout: { tone: 'amber', label: 'Common mistake', text: 'Blaming the model when retrieval failed. If the right passage never reached the model, no prompt change will fix it.' },
      },
      {
        id: 'citations',
        title: 'Showing sources',
        paragraphs: ['Show document name, section and date next to each answer, with a link to open it. Apply your citation rules from Day 46.'],
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Answers are wrong, and the right section isn’t in the retrieved passages. What to fix?', options: ['The prompt', 'Retrieval', 'Temperature'], answer: 1, why: 'The model never saw the right source.' },
        { q: 'Best way to split a policy document?', options: ['Random 50-word pieces', 'By section, one topic per chunk', 'One chunk for the whole file'], answer: 1, why: 'Meaningful chunks retrieve better.' },
        { q: 'Why store “office” as metadata?', options: ['To filter to the user’s local policy', 'To make files bigger', 'It isn’t useful'], answer: 0, why: 'Filtering before search avoids wrong-office answers.' },
        { q: 'Users search “PL policy” for Privilege Leave. What helps?', options: ['Keyword search alongside meaning search', 'Higher temperature', 'Longer answers'], answer: 0, why: 'Keywords catch abbreviations and exact terms.' },
      ],
    },
    completion: [
      'I planned ingestion with metadata.',
      'I tested retrieval separately.',
      'I completed the four questions.',
    ],
    takeaway: 'test retrieval on its own. If the right passage never reaches the model, the answer can’t be right.',
  },

  58: {
    intro: 'A knowledge assistant must never show users documents they couldn’t open themselves. Today you enforce that.',
    objectives: [
      'Apply least privilege to data and tools.',
      'Write a permission matrix.',
      'Test access boundaries across users.',
    ],
    parts: [
      {
        id: 'least',
        title: 'Least privilege',
        paragraphs: [
          'Each user, and the AI acting for them, should reach only what that user is allowed to see. The safest pattern is to filter documents by the user’s permissions before retrieval, so restricted text never reaches the model at all.',
        ],
        callout: { tone: 'amber', label: 'Never rely on the prompt', text: '“Don’t reveal confidential documents” in a prompt is not access control. A prompt injection can undo it. Enforce permissions in code.' },
      },
      {
        id: 'matrix',
        title: 'A permission matrix',
        table: {
          head: ['Content', 'Employee', 'Manager', 'HR'],
          rows: [
            ['Public policies', 'Yes', 'Yes', 'Yes'],
            ['Manager guidelines', 'No', 'Yes', 'Yes'],
            ['Individual salary records', 'Own only', 'Own only', 'Yes'],
            ['Disciplinary cases', 'No', 'No', 'Yes'],
          ],
        },
      },
      {
        id: 'test',
        title: 'Testing the boundaries',
        bullets: [
          { text: 'Log in as each role and ask for content above that role’s access.' },
          { text: 'Try indirect requests: “Summarise the manager guidelines on performance reviews.”' },
          { text: 'Check citations, search results and error messages don’t leak titles of restricted documents.' },
          { text: 'Add every test to your regression suite as an S0 case.' },
        ],
      },
    ],
    quiz: {
      title: 'Safe or unsafe?',
      options: ['Safe', 'Unsafe'],
      questions: [
        { q: 'Restricted documents are filtered out before retrieval based on the user’s role.', answer: 0, why: 'The model never sees what the user can’t.' },
        { q: 'All documents are retrieved; the prompt tells the model not to reveal restricted ones.', answer: 1, why: 'Prompts can be bypassed.' },
        { q: 'An error message says “You can’t access Q3 Layoff Plan.pdf”.', answer: 1, why: 'The title itself leaks information.' },
        { q: 'Access tests for each role run in the regression suite on every release.', answer: 0, why: 'Boundaries stay tested.' },
      ],
    },
    completion: [
      'I enforce permissions before retrieval, in code.',
      'I wrote a permission matrix.',
      'I completed the four questions.',
    ],
    takeaway: 'access control lives in code, before retrieval. A prompt is never a permission system.',
  },

  59: {
    intro: 'When your AI can take actions, mistakes stop being just wrong words. Today you make actions safe.',
    objectives: [
      'Write a tool contract: inputs, permissions and side effects.',
      'Validate arguments and authorise actions on the server.',
      'Require confirmation before consequential actions.',
    ],
    parts: [
      {
        id: 'contract',
        title: 'A tool contract',
        table: {
          head: ['Field', 'Example: create_leave_request'],
          rows: [
            ['Purpose', 'Submit a leave request for the signed-in user'],
            ['Inputs', 'leave_type (casual, sick, earned), start_date, end_date'],
            ['Validation', 'Dates in the future; end after start; balance sufficient'],
            ['Permission', 'Only for the signed-in user, never someone else'],
            ['Side effect', 'Creates a request and notifies the manager'],
            ['Confirmation', 'Required: show a summary, user clicks Submit'],
            ['Undo', 'User can cancel within 24 hours'],
          ],
        },
      },
      {
        id: 'risk',
        title: 'Match safeguards to risk',
        cards: [
          { title: 'Read-only', text: 'Look up a balance or a policy.', note: 'Validate inputs; no confirmation needed.', noteLabel: 'Safeguard' },
          { title: 'Reversible write', text: 'Draft an email; create a leave request that can be cancelled.', note: 'Confirm before acting.', noteLabel: 'Safeguard' },
          { title: 'Irreversible or external', text: 'Send money, email a customer, delete records.', note: 'Confirm, limit amounts, consider human approval.', noteLabel: 'Safeguard' },
        ],
        cardCols: 3,
      },
      {
        id: 'server',
        title: 'The model proposes; the server decides',
        paragraphs: ['The model only suggests a tool call. Your server checks the user is allowed, validates every argument, and enforces limits before anything happens. Never let the model choose whose account to act on.'],
      },
    ],
    quiz: {
      title: 'What safeguard is needed?',
      options: ['Validate inputs only', 'Confirm with the user first', 'Confirm and add human approval or limits'],
      questions: [
        { q: 'Look up the user’s remaining leave balance.', answer: 0, why: 'Read-only, low risk.' },
        { q: 'Submit a leave request that can be cancelled.', answer: 1, why: 'A reversible change on the user’s behalf.' },
        { q: 'Issue a ₹50,000 refund to a customer.', answer: 2, why: 'Irreversible and costly.' },
        { q: 'Send an email to an external client.', answer: 2, why: 'External and can’t be unsent.' },
      ],
    },
    completion: [
      'I wrote a complete tool contract.',
      'The server validates and authorises every call.',
      'I completed the four questions.',
    ],
    takeaway: 'the model proposes, the server decides. Match confirmation and approval to how hard the action is to undo.',
  },

  60: {
    intro: 'Today you build what happens when things go wrong: missing information, uncertainty, errors and requests you don’t support.',
    objectives: [
      'Implement abstention, fallback and escalation states.',
      'Handle API errors and timeouts gracefully.',
      'Size the human capacity escalation needs.',
    ],
    parts: [
      {
        id: 'cases',
        title: 'Four situations to handle',
        table: {
          head: ['Situation', 'Product response'],
          rows: [
            ['No relevant source found', 'Abstain: “I couldn’t find this in the policies.” Offer HR contact.'],
            ['Low confidence', 'Answer with a caveat and a way to confirm.'],
            ['Sensitive or unsupported topic', 'Escalate to a person, or decline politely.'],
            ['API error or timeout', 'Retry once; then “Something went wrong. Try again, or email HR.”'],
          ],
        },
      },
      {
        id: 'capacity',
        title: 'Worked example: escalation capacity',
        paragraphs: ['An assistant gets 400 cases a day. 15% go to a human, and each review takes 4 minutes.'],
        callout: { label: 'Calculation', text: '400 × 0.15 × 4 = 240 minutes, so you need 4 reviewer-hours a day. If HR has only 2 hours, either lower the escalation rate or narrow scope.' },
      },
      {
        id: 'test',
        title: 'Test the unhappy paths',
        bullets: [
          { text: 'Ask questions with no answer in the documents.' },
          { text: 'Switch off the API key or network to see the error state.' },
          { text: 'Ask sensitive questions and check they escalate.' },
          { text: 'Check the fallback text matches what you wrote on Days 34–35.' },
        ],
      },
    ],
    quiz: {
      title: 'Which response fits?',
      options: ['Abstain', 'Answer with a caveat', 'Escalate', 'Retry, then show an error'],
      questions: [
        { q: 'The model provider returns a timeout.', answer: 3, why: 'A technical failure.' },
        { q: 'A question about reporting harassment.', answer: 2, why: 'Sensitive: a person should handle it.' },
        { q: 'A question about a benefit no document mentions.', answer: 0, why: 'No source: don’t guess.' },
        { q: 'A related policy exists but may not cover contractors.', answer: 1, why: 'Partial evidence: be honest about the gap.' },
      ],
    },
    completion: [
      'I built abstain, caveat, escalate and error states.',
      'I calculated escalation capacity.',
      'I completed the four questions.',
    ],
    takeaway: 'the unhappy paths decide whether users trust you. Build them, word them carefully, and check humans can handle the escalations.',
  },

  61: {
    intro: 'If you can’t see what happened, you can’t fix it. Today you plan logging and a simple dashboard.',
    objectives: [
      'Decide what to log for each request.',
      'Write a privacy-safe logging policy.',
      'Specify an observability dashboard.',
    ],
    parts: [
      {
        id: 'trace',
        title: 'What a trace records',
        table: {
          head: ['Field', 'Why'],
          rows: [
            ['Request ID and time', 'Find and connect events'],
            ['Prompt and model version', 'Know what produced the answer'],
            ['Retrieved sources', 'Debug retrieval problems'],
            ['Output and validation result', 'See what the user saw'],
            ['Latency per step', 'Find what is slow'],
            ['Tokens and cost', 'Track spend'],
            ['Errors and fallbacks', 'Count failures'],
            ['User feedback', 'Connect quality to experience'],
          ],
        },
        callout: { label: 'Tools', text: 'Tools such as Langfuse, LangSmith or Helicone record traces like this. For a prototype, the T7 run log in a spreadsheet works too.' },
      },
      {
        id: 'privacy',
        title: 'Privacy-safe logging',
        bullets: [
          { text: 'Mask names, IDs and contact details before storing.' },
          { text: 'Restrict who can read full conversations.' },
          { text: 'Set a retention period, for example 30 days.' },
          { text: 'Tell users what you log and why.' },
        ],
      },
      {
        id: 'dashboard',
        title: 'A first dashboard',
        bullets: [
          { text: 'Requests per day and by topic.' },
          { text: 'Pass rate of live code checks.' },
          { text: 'Abstain, escalation and error rates.' },
          { text: 'p50 and p95 latency; cost per day.' },
          { text: 'Thumbs-down rate and top reported problems.' },
        ],
      },
    ],
    quiz: {
      title: 'Which logged field helps?',
      questions: [
        { q: 'Answers got worse yesterday. What tells you if the prompt changed?', options: ['Prompt version', 'Latency', 'User’s browser'], answer: 0, why: 'Versions link outputs to changes.' },
        { q: 'A wrong answer cited an outdated policy. What helps debug it?', options: ['Retrieved sources', 'Token count', 'Time of day'], answer: 0, why: 'Shows what the model was given.' },
        { q: 'The app feels slow. What helps?', options: ['Latency per step', 'Model name only', 'Feedback rate'], answer: 0, why: 'Shows which step is slow.' },
        { q: 'Best approach to personal data in logs?', options: ['Store everything forever', 'Mask it, restrict access, set retention', 'Never log anything'], answer: 1, why: 'Useful and responsible.' },
      ],
    },
    completion: [
      'I know what a trace records.',
      'I wrote a privacy-safe logging policy.',
      'I completed the four questions.',
    ],
    takeaway: 'log versions, sources, latency, cost and feedback for every request, and protect the personal data inside them.',
  },

  62: {
    intro: 'Today you run your golden set against the real prototype for the first time.',
    objectives: [
      'Run the golden set against the current prototype.',
      'Make results repeatable.',
      'Record a baseline evaluation report.',
    ],
    parts: [
      {
        id: 'run',
        title: 'Running the golden set',
        bullets: [
          { text: 'Run every case with the same prompt version and model.' },
          { text: 'Score with code checks first, then your judge or by hand.' },
          { text: 'Record results per case in T5 (v0 result column).' },
        ],
      },
      {
        id: 'repeat',
        title: 'Repeatable results',
        cards: [
          { title: 'Fix settings', text: 'Same model, version and temperature (low or 0) for eval runs.' },
          { title: 'Run twice', text: 'If the same case passes once and fails once, the result is unstable. Note it.' },
          { title: 'Save everything', text: 'Inputs, outputs, scores and versions, so you can compare later.' },
        ],
        cardCols: 3,
      },
      {
        id: 'baseline',
        title: 'The baseline report',
        table: {
          head: ['Item', 'Example'],
          rows: [
            ['Version', 'Prompt v3, model X, 2026-10-20'],
            ['Overall pass rate', '34 of 50 (68%)'],
            ['S0 and S1 cases', 'S0 5/5; S1 14/18'],
            ['Top failure categories', 'Retrieval miss 7, unsupported claim 4'],
            ['Unstable cases', '3 flip between runs'],
          ],
        },
        quote: 'A low baseline is fine. It is the number every later fix is measured against.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Why use a fixed, low temperature for eval runs?', options: ['More creative answers', 'More repeatable results', 'Cheaper tokens'], answer: 1, why: 'Less randomness, more comparable runs.' },
        { q: 'A case passes on one run and fails on the next. What does it show?', options: ['The case is unstable', 'The judge is perfect', 'Nothing'], answer: 0, why: 'Note and investigate it.' },
        { q: 'Baseline pass rate is 60%. What now?', options: ['Give up', 'Use it as the starting point for fixes', 'Hide it'], answer: 1, why: 'Baselines are for improving against.' },
        { q: 'What must be saved with results?', options: ['Only the pass rate', 'Inputs, outputs, scores and versions'], answer: 1, why: 'You need them to compare and debug.' },
      ],
    },
    completion: [
      'I ran the golden set on my prototype.',
      'I fixed settings for repeatable runs.',
      'I completed the four questions.',
    ],
    takeaway: 'run the full golden set with fixed settings and record a baseline. Every improvement is measured against it.',
  },

  63: {
    intro: 'It is tempting to tweak prompts forever. Today you make one fix, chosen by evidence, and measure it.',
    objectives: [
      'Choose the next fix from failure patterns, not hunches.',
      'Make one change and re-run the evals.',
      'Report the improvement and any regressions.',
    ],
    parts: [
      {
        id: 'loop',
        title: 'The improvement loop',
        bullets: [
          { term: '1. Look', text: 'Read the failing cases in the top category.' },
          { term: '2. Hypothesise', text: '“Retrieval misses happen because tables aren’t parsed.”' },
          { term: '3. Change one thing', text: 'Fix table parsing. Nothing else.' },
          { term: '4. Re-run', text: 'Run the full golden set, not just the failing cases.' },
          { term: '5. Compare', text: 'Case by case: what got fixed, what broke.' },
        ],
      },
      {
        id: 'ladder',
        title: 'Try cheap fixes first',
        table: {
          head: ['Fix', 'Cost', 'Fixes'],
          rows: [
            ['Clean or add source content', 'Low', 'Missing or outdated answers'],
            ['Clearer instructions or examples', 'Low', 'Format, tone, abstention'],
            ['Better chunking or filters', 'Medium', 'Retrieval misses'],
            ['Code checks and validation', 'Medium', 'Format and safety errors'],
            ['A stronger model', 'Higher running cost', 'Reasoning errors'],
            ['Fine-tuning', 'Highest', 'Consistent style or format at scale'],
          ],
        },
      },
      {
        id: 'avoid',
        title: 'Prompt whack-a-mole',
        paragraphs: ['Adding a new rule to the prompt for each failing case makes the prompt long and contradictory, and often breaks other cases. If you’ve added three rules for one category, look for the root cause instead.'],
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'After a fix, which cases should you re-run?', options: ['Only the ones that failed', 'The full golden set'], answer: 1, why: 'To catch regressions.' },
        { q: 'Seven failures share one cause. Best approach?', options: ['Seven prompt rules', 'One fix for the root cause'], answer: 1, why: 'Fix causes, not symptoms.' },
        { q: 'You changed the prompt and the model together; pass rate rose. What do you know?', options: ['Which change helped', 'Not which change helped'], answer: 1, why: 'Change one thing at a time.' },
        { q: 'What should you try before switching to a bigger model?', options: ['Cleaning sources and clearer instructions', 'Fine-tuning'], answer: 0, why: 'Cheaper fixes first.' },
      ],
    },
    completion: [
      'I chose a fix from evidence.',
      'I changed one thing at a time.',
      'I completed the four questions.',
    ],
    takeaway: 'one evidence-based change, measured on the full set, beats a dozen prompt tweaks.',
  },

  64: {
    intro: 'Evals tell you if answers are right. Usability tests tell you if people can actually use them.',
    objectives: [
      'Run usability sessions with realistic tasks.',
      'Capture success, confusion, workarounds and trust concerns.',
      'Summarise findings and fixes.',
    ],
    parts: [
      {
        id: 'session',
        title: 'Running a session',
        bullets: [
          { term: 'Task, not tour', text: 'Give a goal: “You start a new job next week. Find out how many leave days you get.”' },
          { term: 'Think aloud', text: 'Ask them to say what they are thinking as they go.' },
          { term: 'Don’t help', text: 'If they’re stuck, note it. Only step in if they are completely blocked.' },
          { term: 'Ask after', text: '“How confident are you in that answer? Would you act on it?”' },
        ],
        callout: { label: 'How many?', text: 'Three to five sessions find most of the big problems. Mix experience levels.' },
      },
      {
        id: 'watch',
        title: 'What to watch for',
        table: {
          head: ['Signal', 'Example'],
          rows: [
            ['Success', 'Finished the task without help'],
            ['Confusion', 'Didn’t know what to ask, or misread the answer'],
            ['Workaround', 'Opened the PDF themselves instead of trusting the answer'],
            ['Over-trust', 'Acted on a wrong answer without checking'],
            ['Under-trust', 'Ignored a correct answer and said they’d ask HR'],
          ],
        },
      },
      {
        id: 'summarise',
        title: 'Summarising findings',
        paragraphs: ['List each issue with how many participants hit it, its severity and a proposed fix. Compare with your trust moments from Day 30: did the design work where you expected?'],
      },
    ],
    quiz: {
      title: 'What does it show?',
      options: ['Success', 'Confusion', 'Over-trust', 'Under-trust'],
      questions: [
        { q: 'The participant read the correct answer, then said, “I’d still email HR to be sure.”', answer: 3, why: 'They didn’t trust a correct answer.' },
        { q: 'The participant typed “help” three times, unsure what to ask.', answer: 1, why: 'Unclear expectations.' },
        { q: 'They accepted a wrong number without opening the source.', answer: 2, why: 'They trusted it too much.' },
        { q: 'They found the answer, checked the source and moved on.', answer: 0, why: 'Task done with appropriate trust.' },
      ],
    },
    completion: [
      'I gave realistic tasks, not tours.',
      'I watched for trust problems.',
      'I completed the four questions.',
    ],
    takeaway: 'watch real people do real tasks. Correct answers that nobody trusts or understands still fail.',
  },

  65: {
    intro: 'Before you share an AI prototype, check it doesn’t leak data, secrets or harmful outputs.',
    objectives: [
      'Review data minimisation, retention and secrets.',
      'Check injection defences and sensitive outputs.',
      'Write a remediation list.',
    ],
    parts: [
      {
        id: 'checklist',
        title: 'Security and privacy checklist',
        table: {
          head: ['Area', 'Question'],
          rows: [
            ['Data minimisation', 'Does the model see only the data it needs?'],
            ['Retention', 'How long are prompts, outputs and logs kept? Does the AI provider keep or train on them?'],
            ['Secrets', 'Are API keys on the server only, never in the browser or prompt?'],
            ['Injection', 'Are documents and user input treated as data? Are actions confirmed?'],
            ['Sensitive outputs', 'Can it output personal data, credentials or harmful advice?'],
            ['Access', 'Do the Day 58 permission tests pass?'],
            ['Third parties', 'Which vendors process the data, and where?'],
          ],
        },
      },
      {
        id: 'common',
        title: 'Common prototype mistakes',
        bullets: [
          { text: 'An API key pasted into front-end code, where anyone can copy it.' },
          { text: 'Real employee data used for testing without permission.' },
          { text: 'Logs storing full conversations with no masking.' },
          { text: 'A free AI tier whose terms allow training on your inputs.' },
        ],
        callout: { tone: 'amber', label: 'Rule', text: 'Use synthetic or public data in your portfolio prototype unless you have explicit permission.' },
      },
      {
        id: 'remediate',
        title: 'Remediation list',
        paragraphs: ['For each issue: severity, owner, fix and due date. Anything S0 must be fixed before you share the demo.'],
      },
    ],
    quiz: {
      title: 'Which checklist area?',
      options: ['Secrets', 'Retention', 'Data minimisation', 'Sensitive outputs'],
      questions: [
        { q: 'The API key is visible in the browser’s developer tools.', answer: 0, why: 'Keys must stay on the server.' },
        { q: 'The full employee database is sent with every question.', answer: 2, why: 'Send only what’s needed.' },
        { q: 'Logs are kept forever by default.', answer: 1, why: 'Set a retention period.' },
        { q: 'The assistant can print another user’s phone number.', answer: 3, why: 'Block personal data in outputs.' },
      ],
    },
    completion: [
      'I reviewed all seven areas.',
      'My API keys are server-side only.',
      'I completed the four questions.',
    ],
    takeaway: 'keep keys on the server, send the model only what it needs, and fix every S0 issue before anyone else sees the demo.',
  },

  66: {
    intro: 'If your product served many companies, one customer’s data must never reach another. Today you plan that, plus enterprise controls.',
    objectives: [
      'Explain tenant isolation and how to test it.',
      'List admin controls enterprise buyers expect.',
      'Document audit and deployment requirements.',
    ],
    parts: [
      {
        id: 'tenant',
        title: 'Tenant isolation',
        paragraphs: [
          'A tenant is one customer organisation. Isolation means Company A’s documents, logs, settings and outputs are never visible to Company B, including through search indexes, caches and AI responses.',
        ],
        bullets: [
          { text: 'Tag every document and log with a tenant ID.' },
          { text: 'Filter by tenant before every retrieval.' },
          { text: 'Never share caches of answers across tenants.' },
          { text: 'Test with two fake tenants with similar documents.' },
        ],
      },
      {
        id: 'controls',
        title: 'Admin controls buyers expect',
        table: {
          head: ['Control', 'Example'],
          rows: [
            ['Single sign-on', 'Log in with the company’s identity provider'],
            ['Roles', 'Admin, editor, user'],
            ['Source management', 'Admins choose which documents are included'],
            ['Feature switches', 'Turn off actions or certain topics'],
            ['Audit log', 'Who asked what, which sources, when'],
            ['Data settings', 'Retention period, region, no training on data'],
          ],
        },
      },
      {
        id: 'questions',
        title: 'Security questionnaires',
        paragraphs: ['Enterprise customers send long security questionnaires before buying. Having clear answers on isolation, data use, retention, sub-processors and audit logs can be the difference between a sale and a stalled deal.'],
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'A cached answer from Company A is served to Company B. What failed?', options: ['Latency', 'Tenant isolation', 'Prompt design'], answer: 1, why: 'Caches must be per tenant.' },
        { q: 'An admin wants to turn off the “submit leave” action. Which control?', options: ['Feature switches', 'Single sign-on', 'Retention'], answer: 0, why: 'Admins control features.' },
        { q: 'Compliance needs to know who asked about a policy and when. Which control?', options: ['Audit log', 'Roles', 'Caching'], answer: 0, why: 'Audit logs record activity.' },
        { q: 'Best way to test isolation?', options: ['Trust the code', 'Two fake tenants with similar documents', 'Ask the model'], answer: 1, why: 'Try to retrieve across them.' },
      ],
    },
    completion: [
      'I can explain tenant isolation.',
      'I wrote isolation tests.',
      'I completed the four questions.',
    ],
    takeaway: 'tag and filter everything by tenant, test with two fake customers, and give admins control over sources, features and data.',
  },

  67: {
    intro: 'A launch is a process, not a moment. Today you plan a staged rollout you can reverse.',
    objectives: [
      'Plan a staged rollout with success criteria for each stage.',
      'Define support, ownership and rollback.',
      'Write a launch checklist.',
    ],
    parts: [
      {
        id: 'stages',
        title: 'Staged rollout',
        table: {
          head: ['Stage', 'Who', 'Move on when'],
          rows: [
            ['Internal dogfood', 'Your team', 'No S0 issues; golden set passes gates'],
            ['Pilot', 'One team of 30–50 people', 'Task success and trust targets met for 2 weeks'],
            ['Limited release', '25% of employees', 'Escalation load manageable; cost on budget'],
            ['General availability', 'Everyone', 'All metrics stable'],
          ],
        },
      },
      {
        id: 'ops',
        title: 'Operational readiness',
        bullets: [
          { term: 'Owner', text: 'One named person accountable for quality after launch.' },
          { term: 'Support', text: 'Where users report problems, and who responds.' },
          { term: 'Rollback', text: 'A switch to turn the feature off or return to the previous version in minutes.' },
          { term: 'Monitoring', text: 'The Day 61 dashboard with alert thresholds.' },
          { term: 'Communication', text: 'What users are told: scope, limits, how to give feedback.' },
        ],
        callout: { label: 'Rollback triggers', text: 'Decide in advance: for example, any S0 incident, or thumbs-down above 15% for a day, triggers rollback.' },
      },
      {
        id: 'checklist',
        title: 'Launch checklist',
        paragraphs: ['Gates passed, security fixes done, owner named, support ready, rollback tested, dashboard live, users informed, success review scheduled.'],
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Why pilot with one team first?', options: ['To limit harm while learning', 'It is cheaper to build', 'Legal requirement'], answer: 0, why: 'Small groups expose problems safely.' },
        { q: 'An S0 incident happens in the pilot. What should happen?', options: ['Wait and see', 'Trigger the pre-agreed rollback', 'Expand faster'], answer: 1, why: 'Decided in advance, acted on quickly.' },
        { q: 'Who should own quality after launch?', options: ['Nobody in particular', 'One named person', 'The AI provider'], answer: 1, why: 'Clear accountability.' },
        { q: 'When should rollback be tested?', options: ['After the first incident', 'Before launch'], answer: 1, why: 'Untested rollbacks fail when needed.' },
      ],
    },
    completion: [
      'I planned a staged rollout with criteria.',
      'I named an owner and support route.',
      'I completed the four questions.',
    ],
    takeaway: 'launch in stages, with criteria to move on, a named owner, and a tested rollback with triggers agreed in advance.',
  },

  68: {
    intro: 'This is Gate 5. Today you demo your working prototype and decide whether it is ready to share.',
    objectives: [
      'Review quality, usability, safety, reliability and cost together.',
      'Deliver a working demo.',
      'Make a readiness decision with open risks.',
    ],
    parts: [
      {
        id: 'review',
        title: 'Readiness review',
        table: {
          head: ['Area', 'Evidence'],
          rows: [
            ['Quality', 'Golden set results vs gates (Days 62–63)'],
            ['Usability', 'Usability findings and fixes (Day 64)'],
            ['Safety', 'Access, action and security tests (Days 58–59, 65)'],
            ['Reliability', 'Fallbacks and error handling (Day 60)'],
            ['Observability', 'Logging and dashboard (Day 61)'],
            ['Cost', 'Real cost per task from your run log'],
            ['Launch', 'Rollout and rollback plan (Day 67)'],
          ],
        },
      },
      {
        id: 'demo',
        title: 'A good demo',
        bullets: [
          { text: 'Show the real user task, start to finish.' },
          { text: 'Show one source citation and one abstain or fallback.' },
          { text: 'Show one safety boundary (a refused restricted request).' },
          { text: 'End with the numbers: pass rate, task success, cost per task.' },
        ],
      },
      {
        id: 'recap',
        title: 'Phase 5 in one page',
        bullets: [
          { term: 'Build (Days 53–57)', text: 'Thin slice, versioned prompt, schema, happy path, retrieval.' },
          { term: 'Safety (Days 58–60)', text: 'Permissions in code, safe actions, fallbacks.' },
          { term: 'Evidence (Days 61–64)', text: 'Logging, baseline evals, one measured fix, usability tests.' },
          { term: 'Readiness (Days 65–67)', text: 'Security, enterprise controls, staged launch.' },
        ],
      },
    ],
    quiz: {
      title: 'Phase 5 self-check',
      questions: [
        { q: 'Best first slice?', options: ['Every HR topic', 'One narrow task, end to end'], answer: 1, why: 'Day 53.' },
        { q: 'Where should access control be enforced?', options: ['In the prompt', 'In code, before retrieval'], answer: 1, why: 'Day 58.' },
        { q: 'Who decides whether a tool call runs?', options: ['The model', 'The server'], answer: 1, why: 'Day 59.' },
        { q: '400 cases a day, 10% escalate, 3 minutes each. Reviewer time?', options: ['120 minutes', '1,200 minutes'], answer: 0, why: '400 × 0.1 × 3 = 120 (Day 60).' },
        { q: 'After a fix, what do you re-run?', options: ['Only the failed cases', 'The full golden set'], answer: 1, why: 'Day 63.' },
        { q: 'Where must API keys live?', options: ['In the browser', 'On the server'], answer: 1, why: 'Day 65.' },
      ],
    },
    completion: [
      'I scored at least 5 of 6 on the self-check, or revisited the days I missed.',
      'I have a working demo.',
    ],
    takeaway: 'a working demo plus evidence on quality, safety, usability and cost is what turns a project into a portfolio piece.',
  },
};
