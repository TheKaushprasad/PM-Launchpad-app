import type { AiPmLesson } from './types';

// Phase 3 (Discovery and AI product definition), Days 26–38. Templates T1–T4 are in data/aiPmCourse/plan.ts.

export const PHASE3_LESSONS: Record<number, AiPmLesson> = {
  26: {
    intro: 'Phase 3 starts here: turning an AI idea into a real product plan.',
    objectives: [
      'Choose a narrow, valuable problem for a specific user.',
      'Write a problem statement that doesn’t assume the solution.',
      'Set non-goals so an AI product stays small enough to ship.',
    ],
    parts: [
      {
        id: 'narrow',
        title: 'Narrow beats ambitious',
        paragraphs: [
          'Strong AI PM portfolios show one narrow product done well, not a broad idea done vaguely. “An AI assistant for HR” is too wide. “Answer new joiners’ questions about leave and payroll in their first 30 days” is a problem you can build, test and explain.',
        ],
        cards: [
          { title: 'A specific user', text: 'Name who they are and the situation they are in.', example: 'New employees in their first month at a 500-person company.' },
          { title: 'A frequent, painful job', text: 'Something they do often that costs time, money or stress today.', example: 'Finding answers about leave, payroll and IT setup, scattered across 40 documents.' },
          { title: 'A reason AI helps', text: 'The inputs are messy or the answers need language, so rules alone fall short.', example: 'Questions are asked in many different ways; answers live in long policy PDFs.' },
        ],
        cardCols: 3,
      },
      {
        id: 'statement',
        title: 'Writing the problem statement',
        paragraphs: ['A good problem statement describes the user, the job, the pain and the evidence, without naming the solution.'],
        callout: { label: 'Template', text: '[User] needs to [job] when [situation], but today [pain], which costs [impact]. We know this because [evidence].' },
        quote: '“New joiners need to find answers about leave, payroll and IT setup in their first month, but today they search 40 documents or wait a day for HR, which costs about 3 hours each and 200 HR tickets a month. We know this from HR ticket data and 5 interviews.”',
      },
      {
        id: 'non-goals',
        title: 'Non-goals keep you honest',
        bullets: [
          { text: 'Non-goals list what you deliberately won’t do, so scope doesn’t creep.' },
          { text: 'Example: “Will not take actions such as applying for leave. Will not answer questions about other employees. Will not cover policies outside HR and IT.”' },
          { text: 'Each non-goal can be revisited later, once the core works.' },
        ],
      },
    ],
    quiz: {
      title: 'Is this a good AI product problem?',
      options: ['Good: narrow and specific', 'Too broad', 'Solution, not a problem'],
      questions: [
        { q: '“Build an AI copilot for the whole company.”', answer: 1, why: 'No specific user, job or situation; impossible to evaluate.' },
        { q: '“Help field sales reps find the right product spec sheet during customer calls, without leaving the call.”', answer: 0, why: 'Specific user, situation and job.' },
        { q: '“Add a GPT chatbot to our website.”', answer: 2, why: 'It names a solution without saying who has which problem.' },
        { q: '“Help support agents answer refund questions using the latest policy, cutting average handle time.”', answer: 0, why: 'Clear user, job and measurable impact.' },
      ],
    },
    completion: [
      'I chose a specific user and situation.',
      'I wrote a problem statement without naming a solution.',
      'I completed the four questions.',
    ],
    takeaway: 'a narrow problem for a specific user beats a broad AI vision. If you can’t measure it, it is too broad.',
  },

  27: {
    intro: 'Before building, learn from real users. Today you plan discovery that doesn’t lead them to the answer you want.',
    objectives: [
      'Write interview questions about past behaviour, not opinions about your idea.',
      'Avoid leading questions and pitching.',
      'Plan who to talk to and what other evidence to collect.',
    ],
    parts: [
      {
        id: 'behaviour',
        title: 'Ask about the past, not the future',
        table: {
          head: ['Weak question', 'Why it fails', 'Better question'],
          rows: [
            ['“Would you use an AI assistant for HR questions?”', 'People say yes to be polite.', '“Tell me about the last time you had a question about leave. What did you do?”'],
            ['“Is finding policies frustrating?”', 'Leading: it suggests the answer.', '“Walk me through how you found the answer.”'],
            ['“How much would you pay?”', 'Hypothetical; unreliable.', '“What have you already tried or paid for to solve this?”'],
          ],
        },
      },
      {
        id: 'guide',
        title: 'A simple interview guide',
        bullets: [
          { term: 'Warm-up (2 min)', text: 'Their role and a typical week.' },
          { term: 'Last time (10 min)', text: 'The most recent time they faced the problem, step by step.' },
          { term: 'Workarounds (5 min)', text: 'What they do today, and what it costs them.' },
          { term: 'Frequency and pain (5 min)', text: 'How often it happens and what happens when it goes wrong.' },
          { term: 'Wrap-up (3 min)', text: 'Who else to talk to. Only now, if useful, show a rough idea.' },
        ],
        callout: { tone: 'amber', label: 'Don’t pitch', text: 'Describing your AI idea early turns an interview into a sales call. You will learn what people think you want to hear.' },
      },
      {
        id: 'recruit',
        title: 'Who to talk to, and other evidence',
        bullets: [
          { text: 'Aim for 5–8 people who had the problem recently, plus 1–2 who handle it on the other side (for example, the HR team answering questions).' },
          { text: 'Mix experience levels, teams and locations, so you don’t hear one view only.' },
          { text: 'Add existing evidence: support tickets, search logs, survey comments, or published research.' },
        ],
      },
    ],
    quiz: {
      title: 'Good question or leading question?',
      options: ['Good discovery question', 'Leading or hypothetical'],
      questions: [
        { q: '“Wouldn’t it be great if an AI could answer this instantly?”', answer: 1, why: 'It suggests the answer and pitches the idea.' },
        { q: '“What happened the last time you needed to check the reimbursement policy?”', answer: 0, why: 'It asks about a real, recent event.' },
        { q: '“How likely are you to use this tool every day?”', answer: 1, why: 'Hypothetical future behaviour is unreliable.' },
        { q: '“Who did you ask, and how long did it take to get an answer?”', answer: 0, why: 'It uncovers workarounds and cost.' },
      ],
    },
    completion: [
      'I can spot a leading question.',
      'I wrote five questions about past behaviour.',
      'I completed the four questions.',
    ],
    takeaway: 'ask what people did last time, not what they would do. Their behaviour is evidence; their politeness is not.',
  },

  28: {
    intro: 'You have notes from conversations. Today you turn them into evidence a team can act on.',
    objectives: [
      'Separate observed behaviour from opinions.',
      'Identify jobs, workarounds, frequency and pain across interviews.',
      'Write a short, honest discovery summary.',
    ],
    parts: [
      {
        id: 'separate',
        title: 'Facts, opinions and ideas',
        cards: [
          { title: 'Observed behaviour', text: 'What they actually did.', example: '“I searched the intranet, gave up, and messaged HR on Slack.”', note: 'Strongest evidence.', noteLabel: 'Weight' },
          { title: 'Opinions', text: 'What they think or feel.', example: '“The intranet is useless.”', note: 'Useful context, weaker evidence.', noteLabel: 'Weight' },
          { title: 'Feature requests', text: 'Their suggested solution.', example: '“You should add a chatbot.”', note: 'Treat as a clue to the underlying need.', noteLabel: 'Weight' },
        ],
        cardCols: 3,
      },
      {
        id: 'synthesis',
        title: 'Finding patterns',
        bullets: [
          { term: 'Jobs', text: 'What were people trying to get done?' },
          { term: 'Workarounds', text: 'What do they do today instead? Workarounds prove the need is real.' },
          { term: 'Frequency', text: 'How often does it happen? Weekly beats yearly.' },
          { term: 'Pain', text: 'What does it cost when it goes wrong: time, money, mistakes, stress?' },
        ],
        callout: { label: 'Rule of thumb', text: 'A pattern seen in 3 or more of 6 interviews is worth acting on. A single loud story is an anecdote.' },
      },
      {
        id: 'honest',
        title: 'Report what you didn’t find too',
        paragraphs: [
          'Good synthesis includes surprises and evidence against your idea. If most people already get answers quickly from a colleague, say so. It may change the problem, the user, or the decision to build at all.',
        ],
      },
    ],
    quiz: {
      title: 'Behaviour, opinion, or feature request?',
      options: ['Observed behaviour', 'Opinion', 'Feature request'],
      questions: [
        { q: '“Last week I spent 40 minutes finding the travel policy, then asked my manager anyway.”', answer: 0, why: 'It describes what they actually did.' },
        { q: '“HR is always slow.”', answer: 1, why: 'A feeling, not a specific event.' },
        { q: '“Just make it like ChatGPT.”', answer: 2, why: 'A suggested solution; look for the need behind it.' },
        { q: '“I keep a personal note of policy links because search never finds them.”', answer: 0, why: 'A workaround they built: strong evidence of need.' },
      ],
    },
    completion: [
      'I can separate behaviour from opinion.',
      'I found patterns across sources, not single stories.',
      'I completed the four questions.',
    ],
    takeaway: 'workarounds and repeated behaviour are your strongest evidence. Report what surprised you and what argued against your idea.',
  },

  29: {
    intro: 'You have a validated problem. Before writing an AI PRD, prove that AI is the right tool for it.',
    objectives: [
      'Compare an AI solution against simpler alternatives.',
      'Write an AI-vs-non-AI decision with evidence and assumptions.',
      'Name the assumption that, if wrong, would kill the AI approach.',
    ],
    parts: [
      {
        id: 'alternatives',
        title: 'Alternatives to AI',
        cards: [
          { title: 'Fix the content', text: 'Rewrite or reorganise the source material.', example: 'Merge 40 HR documents into one clear FAQ.' },
          { title: 'Better search', text: 'Improve titles, tags and keyword search.', example: 'Rename files and add a search bar to the intranet.' },
          { title: 'Change the workflow', text: 'Change who does what, or when.', example: 'Send new joiners a day-1 checklist with the top 15 answers.' },
          { title: 'Rules or forms', text: 'Handle the predictable cases with logic.', example: 'A leave calculator that applies the policy exactly.' },
        ],
        cardCols: 2,
        quote: 'If a simpler fix solves 80% of the problem, start there. AI should earn its place by solving what the simple fix can’t.',
      },
      {
        id: 'when-ai',
        title: 'When AI earns its place',
        bullets: [
          { text: 'Questions are phrased in many unpredictable ways.' },
          { text: 'Answers require reading and combining long documents.' },
          { text: 'The long tail of questions is too large to write answers for by hand.' },
          { text: 'Users need explanations in natural language, not just a link.' },
        ],
      },
      {
        id: 'assumptions',
        title: 'Riskiest assumptions',
        paragraphs: ['Every AI decision rests on assumptions. Write them down and mark the one that, if wrong, would make the whole approach fail.'],
        table: {
          head: ['Assumption', 'How to test it cheaply'],
          rows: [
            ['The documents contain the answers to most real questions', 'Check 30 real HR tickets against the documents'],
            ['The model can answer accurately from those documents', 'Try 20 questions with a simple prototype'],
            ['Employees will trust and use it over asking HR', 'Show a mock to 5 users and watch their reaction'],
          ],
        },
      },
    ],
    quiz: {
      title: 'AI or a simpler fix?',
      options: ['Simpler fix first', 'AI is justified'],
      questions: [
        { q: 'Employees can’t find the holiday calendar because it is buried in a folder.', answer: 0, why: 'Put the calendar somewhere visible; no AI needed.' },
        { q: 'Support agents must answer thousands of different product questions from a 2,000-page manual.', answer: 1, why: 'Messy questions and long documents are where AI with retrieval helps.' },
        { q: 'Managers need to calculate prorated leave for mid-year joiners using a fixed formula.', answer: 0, why: 'A calculator applies the rule exactly.' },
        { q: 'Sales reps need a quick summary of a customer’s last 20 support tickets before a call.', answer: 1, why: 'Summarising unstructured text is a strength of LLMs.' },
      ],
    },
    completion: [
      'I compared AI against at least two simpler options.',
      'I backed the AI case with evidence.',
      'I completed the four questions.',
    ],
    takeaway: 'AI must beat the simpler fix. Write down the assumption that would sink it, and test that first.',
  },

  30: {
    intro: 'Users don’t just need correct answers. They need to know when to trust them, and what to do when they are wrong.',
    objectives: [
      'Apply five principles of human-AI interaction.',
      'Map a user journey and find the moments where trust is won or lost.',
      'Design for correction and recovery, not just success.',
    ],
    parts: [
      {
        id: 'principles',
        title: 'Five principles',
        table: {
          head: ['Principle', 'What it means', 'Example'],
          rows: [
            ['Set expectations', 'Say what the AI can and can’t do', '“I answer from HR and IT policies only.”'],
            ['Show your sources', 'Let users check where an answer came from', 'Citations with document name and date.'],
            ['Keep users in control', 'Users decide on important actions', 'Draft the email; the user sends it.'],
            ['Make correction easy', 'Let users fix or flag wrong outputs', '“Was this helpful?” and “Report a wrong answer.”'],
            ['Calibrate trust', 'Show uncertainty honestly', '“I couldn’t find this in the policies. Contact HR.”'],
          ],
        },
        callout: { label: 'Source', text: 'These build on Microsoft’s Guidelines for Human-AI Interaction, linked in today’s resources.' },
      },
      {
        id: 'trust-moments',
        title: 'Trust moments in a journey',
        bullets: [
          { term: 'First use', text: 'Users decide whether to try it at all. Clear expectations matter most here.' },
          { term: 'First wrong answer', text: 'The biggest trust risk. Honest uncertainty and easy correction limit the damage.' },
          { term: 'High-stakes moment', text: 'Money, health, legal or career decisions need sources, review and a human path.' },
          { term: 'Returning use', text: 'Consistency and remembered preferences build habit.' },
        ],
      },
      {
        id: 'over-under',
        title: 'Over-trust and under-trust',
        cards: [
          { title: 'Over-trust', text: 'Users accept wrong answers without checking.', note: 'Show sources and uncertainty; require confirmation for important actions.', noteLabel: 'Design response' },
          { title: 'Under-trust', text: 'Users ignore correct answers and ask a human anyway.', note: 'Show sources, start with easy wins, and be consistent.', noteLabel: 'Design response' },
        ],
        cardCols: 2,
      },
    ],
    quiz: {
      title: 'Which principle is missing?',
      options: ['Set expectations', 'Show sources', 'Keep users in control', 'Make correction easy'],
      questions: [
        { q: 'An assistant sends an email to a customer without the user reviewing it.', answer: 2, why: 'Outward actions should be confirmed by the user.' },
        { q: 'Users can’t tell whether an answer came from the 2023 or 2025 policy.', answer: 1, why: 'Citations with dates let users check.' },
        { q: 'New users ask the HR assistant about stock prices and get confused replies.', answer: 0, why: 'Tell users upfront what the assistant covers.' },
        { q: 'A user spots a wrong answer but there is no way to report it.', answer: 3, why: 'Feedback lets users fix problems and helps the team improve.' },
      ],
    },
    completion: [
      'I can name five human-AI interaction principles.',
      'I can explain over-trust and under-trust.',
      'I completed the four questions.',
    ],
    takeaway: 'design for the first wrong answer, not just the happy path. Sources, honest uncertainty and easy correction keep trust.',
  },

  31: {
    intro: 'Time to write it down. An AI PRD looks like a normal PRD plus the parts that make AI different.',
    objectives: [
      'Structure an AI PRD using the T1 and T2 templates.',
      'Include the AI-specific sections normal PRDs miss.',
      'Write PRD v1 for an AI product.',
    ],
    parts: [
      {
        id: 'same',
        title: 'What stays the same',
        bullets: [
          { text: 'Problem, users and evidence (from Days 26–28).' },
          { text: 'Scope, non-goals and requirements.' },
          { text: 'Open questions and dependencies.' },
        ],
      },
      {
        id: 'different',
        title: 'What is different in an AI PRD',
        table: {
          head: ['Section', 'Why AI needs it'],
          rows: [
            ['Why AI', 'Proves AI beats simpler options (Day 29).'],
            ['Quality targets', 'AI is never 100% right; say how right it must be, for example 90% of answers grounded.'],
            ['Worst error and failure handling', 'Defines what must never happen and what happens when it does (Day 34).'],
            ['Human in the loop', 'When a person reviews or takes over, and whether they have capacity.'],
            ['Data and privacy', 'Which data the model sees and who can access what (Day 32).'],
            ['Cost and latency', 'Cost per task and speed targets (Day 37).'],
            ['Ship and kill criteria', 'The evidence needed to launch, and to stop.'],
          ],
        },
        callout: { label: 'Templates', text: 'Start with T1 (PRD on a page) to get alignment, then expand to T2 (AI PRD, 4 pages max). Both are in the Templates tab.' },
      },
      {
        id: 'v1',
        title: 'PRD v1 is a draft',
        paragraphs: [
          'Version 1 will have gaps, and that is expected. Days 32–37 fill in data, metrics, failure handling, trust copy and cost. Day 38 is PRD v2.',
        ],
      },
    ],
    quiz: {
      title: 'Which PRD section covers it?',
      options: ['Why AI', 'Quality targets', 'Worst error', 'Ship and kill criteria'],
      questions: [
        { q: '“The assistant must never reveal salary details of another employee.”', answer: 2, why: 'This defines what must never happen.' },
        { q: '“At least 85% of answers on the test set must be fully supported by cited sources.”', answer: 1, why: 'A measurable quality bar.' },
        { q: '“Keyword search failed on 60% of real questions because employees use different words.”', answer: 0, why: 'Evidence that AI beats the simpler option.' },
        { q: '“If fewer than 30% of pilot users return in week 2, we stop and rethink.”', answer: 3, why: 'An explicit stop condition.' },
      ],
    },
    completion: [
      'I know which sections make an AI PRD different.',
      'I used the T1 template.',
      'I completed the four questions.',
    ],
    takeaway: 'an AI PRD adds why AI, quality targets, failure handling, human review, data, cost, and kill criteria to a normal PRD.',
  },

  32: {
    intro: 'On Day 4 you listed your data sources. Today you judge whether that data is ready for a real product.',
    objectives: [
      'Assess data on permissions, quality, freshness, retention and ownership.',
      'Score data readiness and find the gaps.',
      'Plan how to close the most important gaps.',
    ],
    parts: [
      {
        id: 'dimensions',
        title: 'Six readiness checks',
        table: {
          head: ['Check', 'Question', 'Red flag'],
          rows: [
            ['Coverage', 'Does the data answer most real questions?', 'Many top questions have no source'],
            ['Quality', 'Is it accurate, clear and consistent?', 'Contradicting documents'],
            ['Freshness', 'Is it current, and how is it updated?', 'Policies last reviewed in 2021'],
            ['Permissions', 'Who may see each document?', 'Confidential files mixed with public ones'],
            ['Ownership', 'Who keeps each source correct?', 'No named owner'],
            ['Retention and privacy', 'What personal data is included, and how long is it kept?', 'Employee records in the index'],
          ],
        },
      },
      {
        id: 'scorecard',
        title: 'A readiness scorecard',
        paragraphs: ['Score each check 1–3 (1 = not ready, 3 = ready). Anything at 1 is a launch blocker or a scope cut.'],
        callout: { tone: 'amber', label: 'Common surprise', text: 'Data readiness is usually the slowest part of an AI project. Contradicting or outdated documents must be fixed by their owners; no model can fix them.' },
      },
      {
        id: 'gaps',
        title: 'Closing gaps',
        bullets: [
          { term: 'Cut scope', text: 'Leave out sources that aren’t ready.' },
          { term: 'Ask owners to fix', text: 'Agree an owner and a review date for each source.' },
          { term: 'Filter', text: 'Exclude personal or confidential content from the index.' },
          { term: 'Label', text: 'Show document dates so users can judge freshness.' },
        ],
      },
    ],
    quiz: {
      title: 'Which readiness check fails?',
      options: ['Coverage', 'Freshness', 'Permissions', 'Ownership'],
      questions: [
        { q: 'The travel policy PDF was last updated four years ago, though the rules changed.', answer: 1, why: 'The data is out of date.' },
        { q: 'Board meeting notes sit in the same folder as the employee handbook.', answer: 2, why: 'Restricted content must not be retrievable by everyone.' },
        { q: 'Nobody knows who should update the IT setup guide.', answer: 3, why: 'Without an owner, it will go stale.' },
        { q: '40% of real HR tickets ask about topics no document covers.', answer: 0, why: 'The data can’t answer many real questions.' },
      ],
    },
    completion: [
      'I can name the six readiness checks.',
      'I scored my data honestly.',
      'I completed the four questions.',
    ],
    takeaway: 'AI quality is capped by data quality. Fix, cut or filter data problems before you tune the model.',
  },

  33: {
    intro: 'You can’t show AI made things better without knowing how things were before.',
    objectives: [
      'Set a non-AI baseline for an AI product.',
      'Build a metric tree from business outcome to product metrics.',
      'Choose guardrail metrics and a measurement window.',
    ],
    parts: [
      {
        id: 'baseline',
        title: 'Start with a baseline',
        paragraphs: [
          'A baseline is how the job performs today, without your AI product. It might be the current process (asking HR), a simple alternative (keyword search), or both.',
        ],
        callout: { label: 'Example', text: 'Today: employees wait 18 hours on average for an HR answer, and HR handles 200 tickets a month. That is the number the AI product must beat.' },
      },
      {
        id: 'tree',
        title: 'The metric tree',
        table: {
          head: ['Level', 'Example', 'Who cares'],
          rows: [
            ['Business outcome', 'HR ticket volume down 30%', 'Leadership'],
            ['User outcome', 'Time to a correct answer under 2 minutes', 'Employees'],
            ['Product quality', '85% of answers grounded and correct on the test set', 'Product team'],
            ['Guardrail', 'Zero access-control violations; wrong-answer reports under 2%', 'Everyone'],
          ],
        },
        quote: 'A primary metric says whether you are winning. Guardrails say whether you are winning in a way you can live with.',
      },
      {
        id: 'window',
        title: 'Measurement window',
        bullets: [
          { text: 'Measure the baseline over a normal period, not a holiday month.' },
          { text: 'Give the AI product long enough for novelty to wear off, often 4 weeks or more.' },
          { text: 'Decide in advance what result counts as success, so you can’t move the goalposts.' },
        ],
      },
    ],
    quiz: {
      title: 'Which level of the metric tree?',
      options: ['Business outcome', 'User outcome', 'Product quality', 'Guardrail'],
      questions: [
        { q: 'Percentage of answers fully supported by cited sources.', answer: 2, why: 'It measures how good the AI output is.' },
        { q: 'Support cost per employee per year.', answer: 0, why: 'A business result leadership tracks.' },
        { q: 'Number of answers that exposed restricted documents.', answer: 3, why: 'Something that must stay at or near zero.' },
        { q: 'Minutes from asking a question to having a correct answer.', answer: 1, why: 'It measures the user’s experience of the job.' },
      ],
    },
    completion: [
      'I set a non-AI baseline.',
      'I built a metric tree with three levels.',
      'I completed the four questions.',
    ],
    takeaway: 'measure the “before”, link quality to user and business outcomes, and set guardrails and success thresholds before you launch.',
  },

  34: {
    intro: 'Your AI will be wrong sometimes. Today you decide which mistakes are acceptable and what happens when they occur.',
    objectives: [
      'Classify errors by severity, from harmless to critical.',
      'Specify abstention (“I don’t know”) and escalation rules.',
      'Write a graded failure spec using template T4.',
    ],
    parts: [
      {
        id: 'severity',
        title: 'Not all errors are equal',
        table: {
          head: ['Severity', 'Description', 'Example', 'Maximum tolerated rate'],
          rows: [
            ['S0 Critical', 'Harm, legal or privacy breach', 'Reveals another employee’s salary', '0 (block at all costs)'],
            ['S1 High', 'Wrong answer users will act on', 'Wrong number of leave days', 'Under 1%'],
            ['S2 Medium', 'Unhelpful or incomplete', 'Answers only half the question', 'Under 5%'],
            ['S3 Low', 'Style or minor issue', 'Too long, awkward tone', 'Under 15%'],
          ],
        },
      },
      {
        id: 'abstain',
        title: 'Abstain and escalate',
        cards: [
          { title: 'Abstain', text: 'When evidence is weak, say so instead of guessing.', example: '“I couldn’t find this in the HR policies. You can ask HR at hr@company.com.”' },
          { title: 'Escalate', text: 'Hand over to a human for sensitive or high-stakes topics.', example: 'Questions about harassment, health or termination go straight to an HR partner.' },
        ],
        cardCols: 2,
        callout: { tone: 'amber', label: 'Capacity check', text: 'If 20% of questions escalate and 1,000 are asked a day, someone must handle 200 a day. Check the humans have capacity before you promise escalation.' },
      },
      {
        id: 'fallback',
        title: 'Write the exact fallback text',
        paragraphs: ['Don’t leave fallback wording to the model. Write the exact message for each case so it is clear, kind and consistent, and review it like product copy.'],
      },
    ],
    quiz: {
      title: 'Assign the severity',
      options: ['S0 Critical', 'S1 High', 'S2 Medium', 'S3 Low'],
      questions: [
        { q: 'The assistant tells an employee they have 20 leave days when they have 12.', answer: 1, why: 'A wrong answer they may act on.' },
        { q: 'The answer is correct but uses an overly formal tone.', answer: 3, why: 'A minor style issue.' },
        { q: 'The assistant quotes a confidential disciplinary report to the wrong person.', answer: 0, why: 'A privacy breach: must never happen.' },
        { q: 'Asked about leave and payroll, it answers only the leave part.', answer: 2, why: 'Incomplete but not misleading.' },
      ],
    },
    completion: [
      'I can grade errors from S0 to S3.',
      'I wrote exact fallback text.',
      'I completed the four questions.',
    ],
    takeaway: 'decide in advance which mistakes are tolerable, how often, and exactly what the product says when it can’t answer.',
  },

  35: {
    intro: 'The words on the screen decide whether users trust your AI appropriately. Today you write them.',
    objectives: [
      'Write UI copy that explains sources, limits and uncertainty.',
      'Design the key states: empty, loading, answer, low confidence, error.',
      'Avoid overclaiming in product copy.',
    ],
    parts: [
      {
        id: 'states',
        title: 'Key UI states',
        table: {
          head: ['State', 'Goal', 'Example copy'],
          rows: [
            ['Empty (first use)', 'Set expectations', '“Ask me about leave, payroll or IT setup. I answer from company policies.”'],
            ['Loading', 'Show progress', '“Searching 42 HR documents…”'],
            ['Answer', 'Show sources', '“Per the Leave Policy (updated March 2025), you get 12 casual leaves.”'],
            ['Low confidence', 'Be honest', '“I found a related policy but I’m not sure it covers your case. Please confirm with HR.”'],
            ['Error', 'Offer a way forward', '“Something went wrong. Try again, or email hr@company.com.”'],
          ],
        },
      },
      {
        id: 'overclaim',
        title: 'Don’t overclaim',
        cards: [
          { title: 'Avoid', text: '“Always accurate.” “Knows everything about HR.” “Your personal HR expert.”', noteLabel: 'Why', note: 'Sets expectations the product can’t meet; the first mistake breaks trust.' },
          { title: 'Prefer', text: '“Answers from company policies, with sources.” “Check important decisions with HR.”', noteLabel: 'Why', note: 'Honest copy makes mistakes forgivable.' },
        ],
        cardCols: 2,
      },
      {
        id: 'choices',
        title: 'Give users choices',
        bullets: [
          { text: 'Let users open the source document.' },
          { text: 'Offer “Talk to a person” on every answer about sensitive topics.' },
          { text: 'Let users rate answers and report wrong ones.' },
          { text: 'Label AI-generated content clearly.' },
        ],
      },
    ],
    quiz: {
      title: 'Which copy is better?',
      questions: [
        { q: 'Empty state for a policy assistant.', options: ['“Ask me anything!”', '“Ask about leave, payroll or IT setup. I answer from company policies.”'], answer: 1, why: 'It sets clear expectations about scope and source.' },
        { q: 'The assistant isn’t sure.', options: ['“The answer is 12 days.”', '“I think it’s 12 days, but this policy may not cover contractors. Please confirm with HR.”'], answer: 1, why: 'It shows honest uncertainty and a way to check.' },
        { q: 'Marketing tagline.', options: ['“100% accurate HR answers.”', '“Fast answers from your HR policies, with sources.”'], answer: 1, why: 'It doesn’t overclaim.' },
        { q: 'Error state.', options: ['“Error 500.”', '“Something went wrong. Try again, or email hr@company.com.”'], answer: 1, why: 'It explains and offers a next step.' },
      ],
    },
    completion: [
      'I can name five key UI states.',
      'I can spot overclaiming copy.',
      'I completed the four questions.',
    ],
    takeaway: 'honest, specific copy makes AI mistakes forgivable. Promise less, show sources, and always offer a next step.',
  },

  36: {
    intro: 'Voice and chat feel natural, but conversations have their own failure modes. Today you design for them, or decide they are out of scope.',
    objectives: [
      'Design turn-taking, clarification and repair in a conversation.',
      'Know the extra challenges of voice interfaces.',
      'Decide whether voice belongs in an AI product.',
    ],
    parts: [
      {
        id: 'conversation',
        title: 'Conversation design basics',
        cards: [
          { title: 'Clarify', text: 'Ask a short question when the request is ambiguous, instead of guessing.', example: '“Do you mean casual leave or sick leave?”' },
          { title: 'Repair', text: 'Recover gracefully when the user corrects you or you misunderstood.', example: '“Sorry, I meant sick leave. You get 10 days a year.”' },
          { title: 'Keep context', text: 'Remember what was said earlier in the conversation.', example: 'User: “And for interns?” — the assistant knows the topic is still sick leave.' },
          { title: 'End well', text: 'Close the loop and offer next steps.', example: '“Anything else? You can also apply for leave in the HR portal.”' },
        ],
        cardCols: 2,
      },
      {
        id: 'voice',
        title: 'What voice adds',
        table: {
          head: ['Challenge', 'Why it is hard', 'Design response'],
          rows: [
            ['No screen', 'Users can’t scan a long answer or see sources', 'Short answers; offer to send details by message'],
            ['Interruptions', 'Users talk over the assistant', 'Stop speaking when the user speaks'],
            ['Speech errors', 'Accents and noise cause mishearing', 'Confirm key details: “Did you say June 12?”'],
            ['Latency', 'Silence feels broken after about a second', 'Quick acknowledgement, then the answer'],
          ],
        },
      },
      {
        id: 'scope',
        title: 'Is voice right for your product?',
        bullets: [
          { term: 'Yes, if', text: 'users’ hands or eyes are busy (driving, field work), or typing is a barrier.' },
          { term: 'No, if', text: 'answers need sources, tables or careful reading, or users are at a desk.' },
        ],
        quote: 'Saying “voice is out of scope because our users sit at desks and need to see sources” is a strong PM decision, not a gap.',
      },
    ],
    quiz: {
      title: 'Which conversation skill is needed?',
      options: ['Clarify', 'Repair', 'Keep context', 'End well'],
      questions: [
        { q: 'A user asks “How many leaves do I get?” and the company has four leave types.', answer: 0, why: 'Ask which type instead of guessing.' },
        { q: 'The user says “No, I meant the Pune office,” after an answer about Mumbai.', answer: 1, why: 'Acknowledge and correct gracefully.' },
        { q: 'After an answer about sick leave, the user asks “What about for contractors?”', answer: 2, why: 'The assistant must remember the topic is sick leave.' },
        { q: 'The user’s question is fully answered.', answer: 3, why: 'Close the loop and offer the next step.' },
      ],
    },
    completion: [
      'I can design clarification and repair.',
      'I know the extra challenges of voice.',
      'I completed the four questions.',
    ],
    takeaway: 'good conversations clarify, repair and remember. Add voice only when your users’ context truly calls for it.',
  },

  37: {
    intro: 'A great AI feature that costs more than it earns will be switched off. Today you check it is viable.',
    objectives: [
      'Estimate tokens, cost per task and monthly cost.',
      'Set a latency budget per step.',
      'Fill in the T3 cost and latency napkin sheet.',
    ],
    parts: [
      {
        id: 'cost',
        title: 'Napkin cost maths',
        paragraphs: ['You don’t need exact numbers. You need a reasonable estimate with your assumptions written down.'],
        table: {
          head: ['Step', 'Example (knowledge assistant)'],
          rows: [
            ['Tokens per question', 'Instructions 500 + retrieved passages 2,000 + question 50 + answer 300 ≈ 2,850 tokens'],
            ['Cost per question', 'Look up your model’s price per million tokens; multiply'],
            ['Questions per month', '500 employees × 3 questions a day × 22 days = 33,000'],
            ['Monthly cost', 'Cost per question × 33,000, plus search and hosting'],
            ['Cost per successful task', 'Monthly cost ÷ questions answered correctly'],
          ],
        },
        callout: { label: 'Note', text: 'Prices change often. Always write the price, its source and the date in your sheet.' },
      },
      {
        id: 'latency',
        title: 'Latency budget',
        table: {
          head: ['Step', 'Budget'],
          rows: [
            ['Retrieve passages', '300 ms'],
            ['Model starts answering (first token)', '1,000 ms'],
            ['Full answer streamed', '4,000 ms'],
          ],
        },
        bullets: [
          { text: 'Stream answers so users see words within about a second.' },
          { text: 'Use a smaller model for simple questions to save time and money.' },
        ],
      },
      {
        id: 'viability',
        title: 'Is it worth it?',
        paragraphs: ['Compare monthly cost with the value created: hours saved × hourly cost, or tickets avoided × cost per ticket. If cost is close to value, look at cheaper models, caching, or narrower scope.'],
        quote: 'Estimate low, expected and high usage. Viability at high usage is the version finance will ask about.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'What usually makes up most of the tokens in a RAG request?', options: ['The user’s question', 'The retrieved passages', 'The model name'], answer: 1, why: 'Retrieved context is often thousands of tokens.' },
        { q: 'Users complain the assistant “feels slow”, though full answers take 4 seconds. What helps most?', options: ['Streaming the answer', 'Longer prompts', 'Higher temperature'], answer: 0, why: 'Seeing words quickly makes waiting feel shorter.' },
        { q: 'Why write the date next to a model price?', options: ['Prices change often', 'It is legally required', 'Tokens expire'], answer: 0, why: 'Your estimate is only valid for that price.' },
        { q: 'Monthly cost is ₹40,000; the feature saves 100 HR hours at ₹600 an hour. Is it viable?', options: ['Yes, value is ₹60,000', 'No, it costs more than it saves'], answer: 0, why: 'Value (₹60,000) exceeds cost (₹40,000), before other benefits.' },
      ],
    },
    completion: [
      'I can estimate tokens and cost per task.',
      'I set a latency budget per step.',
      'I completed the four questions.',
    ],
    takeaway: 'estimate cost per successful task and latency per step early, with assumptions written down. Viability is a product requirement.',
  },

  38: {
    intro: 'This is Gate 3. Today you add enterprise requirements and submit PRD v2.',
    objectives: [
      'Cover security, permissions, auditability, integrations and rollout.',
      'Submit PRD v2 with everything from Phase 3.',
      'Write a review memo with the risks you haven’t solved yet.',
    ],
    parts: [
      {
        id: 'enterprise',
        title: 'Enterprise requirements',
        table: {
          head: ['Area', 'Question', 'Example requirement'],
          rows: [
            ['Security', 'How is data protected?', 'Encrypted in transit and at rest; no training on our data'],
            ['Permissions', 'Who can see what?', 'Answers only use documents the user can already open'],
            ['Tenant isolation', 'Is each customer’s data separate?', 'Company A can never retrieve Company B’s documents'],
            ['Auditability', 'Can we explain what happened?', 'Log question, sources used, answer and model version'],
            ['Integrations', 'What must it connect to?', 'Single sign-on, SharePoint, Slack'],
            ['Human review', 'Who checks sensitive cases?', 'HR partner reviews escalations within 1 day'],
            ['Rollout', 'How do we launch safely?', 'Pilot with one team, then expand'],
          ],
        },
      },
      {
        id: 'recap',
        title: 'Phase 3 in one page',
        bullets: [
          { term: 'Problem and discovery (Days 26–28)', text: 'A narrow problem backed by behaviour, not opinions.' },
          { term: 'Why AI (Day 29)', text: 'AI beats the simpler fix, with a tested assumption.' },
          { term: 'Trust and UX (Days 30, 35, 36)', text: 'Sources, honest uncertainty, easy correction.' },
          { term: 'PRD, data and metrics (Days 31–33)', text: 'A measurable PRD with a baseline, guardrails and ready data.' },
          { term: 'Failure and cost (Days 34, 37)', text: 'Graded failures with fallbacks; viable cost and latency.' },
        ],
      },
    ],
    quiz: {
      title: 'Phase 3 self-check',
      questions: [
        { q: 'Which is the best discovery question?', options: ['“Would you use an AI for this?”', '“Tell me about the last time this happened.”', '“Is this frustrating?”'], answer: 1, why: 'Past behaviour is evidence (Day 27).' },
        { q: 'A simple FAQ would answer 80% of questions. What should you do?', options: ['Build the AI anyway', 'Start with the simpler fix and use AI for the rest', 'Cancel the project'], answer: 1, why: 'AI should solve what the simple fix can’t (Day 29).' },
        { q: 'Which is a guardrail metric?', options: ['Daily active users', 'Access-control violations', 'Revenue'], answer: 1, why: 'It must stay near zero while you optimise the primary metric (Day 33).' },
        { q: 'The assistant reveals another employee’s salary. Which severity?', options: ['S0', 'S2', 'S3'], answer: 0, why: 'Privacy breach: critical (Day 34).' },
        { q: 'Best empty-state copy?', options: ['“Ask me anything!”', '“Ask about leave, payroll or IT. I answer from company policies.”'], answer: 1, why: 'Sets scope and source (Day 35).' },
        { q: 'Company A’s documents must never appear for Company B. Which requirement?', options: ['Latency', 'Tenant isolation', 'Streaming'], answer: 1, why: 'Data separation between customers (Day 38).' },
      ],
    },
    completion: [
      'I scored at least 5 of 6 on the self-check, or revisited the days I missed.',
      'I ticked the Phase 3 checklist honestly.',
    ],
    takeaway: 'a strong AI PRD is backed by evidence, measurable, honest about failure, viable on cost, and ready for enterprise scrutiny.',
  },
};
