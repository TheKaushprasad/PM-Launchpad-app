import type { AiPmLesson } from './types';

// Phase 7 (Portfolio and interview readiness), Days 79–90. Templates T8–T10 are in data/aiPmCourse/content.ts.

export const PHASE7_LESSONS: Record<number, AiPmLesson> = {
  79: {
    intro: 'Phase 7 turns 78 days of work into proof hiring managers can see. It starts with the story of your project.',
    objectives: [
      'Structure a case study from discovery to outcome.',
      'Choose the evidence that proves each AI PM skill.',
      'Outline your case study, including limitations.',
    ],
    parts: [
      {
        id: 'structure',
        title: 'Case study structure',
        table: {
          head: ['Section', 'What it shows', 'Evidence from your work'],
          rows: [
            ['Problem and user', 'You start from users, not technology', 'Discovery summary (Day 28)'],
            ['Why AI', 'Judgement about when AI fits', 'AI-vs-rules decision (Day 29)'],
            ['Design and architecture', 'Technical fluency', 'Architecture and model decision (Day 25), trust copy (Day 35)'],
            ['Evaluation', 'You can measure quality', 'Golden set, eval report (Day 52)'],
            ['Build and launch', 'You can ship safely', 'Demo, readiness review (Day 68)'],
            ['Business', 'You think about value and cost', 'Unit economics, memo (Days 73, 78)'],
            ['Lessons and limits', 'Honesty and growth', 'What failed and what you would change'],
          ],
        },
      },
      {
        id: 'teardown',
        title: 'Optional: an AI product teardown (T8)',
        paragraphs: ['A short critique of a real AI product shows product sense beyond your own project. Use T8: user and job, the AI moment, architecture from behaviour (what you observed vs assumed), failure handling, one trade-off, and one change with the metric to prove it.'],
      },
      {
        id: 'honest',
        title: 'Honesty wins',
        bullets: [
          { text: 'Say clearly it is a learning project, and whether users were real or simulated.' },
          { text: 'Separate what you built from what you designed or planned.' },
          { text: 'Show a failure and what you learned. Interviewers trust candidates who can.' },
        ],
      },
    ],
    quiz: {
      title: 'Which case study section does it belong in?',
      options: ['Why AI', 'Evaluation', 'Business', 'Lessons and limits'],
      questions: [
        { q: '“Pass rate rose from 68% to 86% after fixing table parsing.”', answer: 1, why: 'Evidence about quality measurement.' },
        { q: '“Keyword search failed on 60% of real questions.”', answer: 0, why: 'Justifies the AI approach.' },
        { q: '“Cost per successful answer is ₹2.10; margin 70%.”', answer: 2, why: 'Economics.' },
        { q: '“Our judge agreed with humans only 70%, so we fell back to manual review.”', answer: 3, why: 'An honest limitation and what you did.' },
      ],
    },
    completion: [
      'I know the seven case study sections.',
      'Every section has evidence.',
      'I completed the four questions.',
    ],
    takeaway: 'a case study is evidence, not a story about effort. Show the decision, the proof, and the honest limits.',
  },

  80: {
    intro: 'A short demo shows more than a long document. Today you script a 3–5 minute walkthrough.',
    objectives: [
      'Plan a demo that shows the real workflow and its safeguards.',
      'Script it to fit 3–5 minutes.',
      'Record it or prepare to present it live.',
    ],
    parts: [
      {
        id: 'script',
        title: 'A five-part demo',
        table: {
          head: ['Part', 'Time', 'Show'],
          rows: [
            ['Context', '30 s', 'The user, the problem and one number'],
            ['Happy path', '60–90 s', 'A real task, start to finish, with sources'],
            ['Safeguards', '60 s', 'An abstain, a refused restricted request, a confirmation'],
            ['Evidence', '45 s', 'Eval results and one improvement you made'],
            ['Close', '30 s', 'What you learned and what you would build next'],
          ],
        },
      },
      {
        id: 'tips',
        title: 'Demo tips',
        bullets: [
          { text: 'Use realistic data, never real personal data.' },
          { text: 'Prepare inputs in advance; record a backup in case the live demo fails.' },
          { text: 'Zoom in on the screen so text is readable on a phone.' },
          { text: 'Talk about decisions, not buttons: “I made it abstain here because…”.' },
        ],
        callout: { label: 'Tools', text: 'Loom, OBS or your laptop’s screen recorder are enough. Add captions if you can.' },
      },
      {
        id: 'safeguards',
        title: 'Why show failures on purpose',
        paragraphs: ['Anyone can demo the happy path. Showing how your product handles a question it can’t answer, or a request it must refuse, is what makes it look like an AI PM’s work.'],
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'What makes an AI demo stand out?', options: ['Only happy paths', 'Showing safeguards and evidence', 'Long setup explanations'], answer: 1, why: 'It shows judgement, not just a working app.' },
        { q: 'The live demo might fail. What should you prepare?', options: ['Nothing', 'A recorded backup'], answer: 1, why: 'Always have a fallback.' },
        { q: 'What should you narrate?', options: ['Every click', 'The decisions behind what users see'], answer: 1, why: 'Decisions show product thinking.' },
        { q: 'Which data should appear?', options: ['Real employee records', 'Realistic synthetic data'], answer: 1, why: 'Never expose real personal data.' },
      ],
    },
    completion: [
      'My demo fits 3–5 minutes.',
      'It shows at least two safeguards.',
      'I completed the four questions.',
    ],
    takeaway: 'a great AI demo shows the happy path, the safeguards and the evidence, and explains the decisions behind them.',
  },

  81: {
    intro: 'Today you write the full case study, ready to publish.',
    objectives: [
      'Write the case study from your outline.',
      'Use visuals and numbers to make it skimmable.',
      'Publish it where hiring managers can find it.',
    ],
    parts: [
      {
        id: 'skim',
        title: 'Write for a two-minute reader',
        bullets: [
          { text: 'A summary box at the top: problem, what you built, three numbers, your role.' },
          { text: 'Headings that state the point: “Retrieval, not the model, caused most errors.”' },
          { text: 'One visual per section: journey map, architecture, eval table, screenshots.' },
          { text: 'Keep it to 1,200–2,000 words, with a link to the demo.' },
        ],
      },
      {
        id: 'decisions',
        title: 'Show decisions and trade-offs',
        paragraphs: ['Hiring managers look for judgement. For each key decision, say what you chose, what you rejected, and why.'],
        quote: '“I chose RAG over fine-tuning because policies change monthly and users need citations. Fine-tuning would have needed retraining on every change.”',
      },
      {
        id: 'publish',
        title: 'Where to publish',
        bullets: [
          { term: 'A personal site or Notion page', text: 'Easy to share and update.' },
          { term: 'Medium or Substack', text: 'Discoverable; good for a LinkedIn link.' },
          { term: 'GitHub', text: 'If you built code, add a README with the same summary.' },
          { term: 'A PDF version', text: 'For applications that ask for attachments.' },
        ],
      },
    ],
    quiz: {
      title: 'Better or worse for a case study?',
      options: ['Better', 'Worse'],
      questions: [
        { q: 'A heading: “Section 4: Evaluation”.', answer: 1, why: 'State the point instead.' },
        { q: 'A summary box with three numbers at the top.', answer: 0, why: 'Readers get the value in seconds.' },
        { q: '“I chose RAG over fine-tuning because policies change monthly.”', answer: 0, why: 'It shows a decision and reasoning.' },
        { q: '5,000 words with no visuals.', answer: 1, why: 'Too long to skim.' },
      ],
    },
    completion: [
      'My case study has a summary box with numbers.',
      'It shows decisions and trade-offs.',
      'I completed the four questions.',
    ],
    takeaway: 'write for a two-minute reader: summary first, decisions with reasons, numbers and visuals, and honest limits.',
  },

  82: {
    intro: 'Your resume needs to show AI PM evidence in six seconds. Today you rewrite it.',
    objectives: [
      'Write evidence-based bullets without overclaiming.',
      'Map your experience to AI PM job requirements.',
      'Prepare your 90-second background story (T9).',
    ],
    parts: [
      {
        id: 'bullets',
        title: 'Better bullets',
        table: {
          head: ['Weak', 'Strong'],
          rows: [
            ['“Worked on AI features.”', '“Defined eval criteria and a 50-case golden set for a support assistant; raised grounded answers from 68% to 86%.”'],
            ['“Expert in LLMs and RAG.”', '“Built a RAG knowledge assistant prototype with citations, permission filtering and fallback states (portfolio project).”'],
            ['“Led AI strategy.”', '“Wrote the AI-vs-rules decision that kept 40% of use cases on simple search, saving an estimated ₹3 lakh a year in model costs.”'],
          ],
        },
        callout: { tone: 'amber', label: 'Don’t inflate', text: 'Label projects as projects. Interviewers will ask detailed questions about every bullet, and inflated claims fall apart fast.' },
      },
      {
        id: 'map',
        title: 'Map to the job',
        bullets: [
          { text: 'Pick 3–5 target job descriptions and highlight repeated requirements.' },
          { text: 'Make sure each requirement has a bullet that proves it.' },
          { text: 'Translate past non-AI PM work: experiments, metrics, launches, and stakeholder work all transfer.' },
        ],
      },
      {
        id: 'story',
        title: 'Your 90-second story (T9)',
        bullets: [
          { term: 'Your PM work in one line', text: 'With a number.' },
          { term: 'The AI PM skill it trained', text: 'For example, metrics and experiments.' },
          { term: 'The project exhibit that proves it', text: 'Your eval report or demo.' },
          { term: 'One number from the project', text: 'Pass rate, cost per task, or task success.' },
          { term: 'What you want next', text: 'The role and the kind of AI product.' },
        ],
      },
    ],
    quiz: {
      title: 'Strong bullet or weak bullet?',
      options: ['Strong', 'Weak'],
      questions: [
        { q: '“Passionate about AI and its potential.”', answer: 1, why: 'No evidence.' },
        { q: '“Designed fallback and escalation states that cut wrong answers acted on by users to under 1% in testing.”', answer: 0, why: 'Specific action and result.' },
        { q: '“Expert in machine learning.”', answer: 1, why: 'An unsupported claim.' },
        { q: '“Ran a 4-week A/B test; feature reduced HR tickets 18% with no rise in wrong-answer reports.”', answer: 0, why: 'Method, result and guardrail.' },
      ],
    },
    completion: [
      'My bullets show actions and results.',
      'Each key requirement has evidence.',
      'I completed the four questions.',
    ],
    takeaway: 'every resume bullet should be a claim you can defend for ten minutes in an interview.',
  },

  83: {
    intro: 'Recruiters search LinkedIn. Today you make your profile and one post show your AI PM work.',
    objectives: [
      'Write a profile headline and summary that position you clearly.',
      'Draft a LinkedIn post about your AI project.',
      'Share a point of view without overclaiming.',
    ],
    parts: [
      {
        id: 'profile',
        title: 'Profile basics',
        bullets: [
          { term: 'Headline', text: 'Role plus focus plus proof. “Product Manager | Building AI products with evals and RAG | Project: HR knowledge assistant”.' },
          { term: 'About', text: 'Three short paragraphs: your PM background, what you’ve built in AI, what you’re looking for.' },
          { term: 'Featured', text: 'Pin your case study and demo.' },
          { term: 'Skills', text: 'Add specific ones: AI evaluation, RAG, prompt design, experimentation.' },
        ],
      },
      {
        id: 'post',
        title: 'A post that works',
        table: {
          head: ['Part', 'Example'],
          rows: [
            ['Hook', '“My AI assistant was 68% accurate. The fix wasn’t a better model.”'],
            ['Story', 'What you built and the surprising finding'],
            ['Lesson', 'One thing other PMs can use'],
            ['Proof', 'Link to the case study or demo'],
            ['Question', 'Invite replies: “How do you evaluate your AI features?”'],
          ],
        },
      },
      {
        id: 'pov',
        title: 'Have a point of view',
        paragraphs: ['Posts that share a specific lesson from real work get more attention than general AI news. Write about what you learned, not what you can do. Avoid claiming expertise you don’t have yet.'],
      },
    ],
    quiz: {
      title: 'Better headline or post?',
      questions: [
        { q: 'Which headline is stronger?', options: ['“Aspiring AI enthusiast”', '“Product Manager | AI evals and RAG | Built an HR knowledge assistant”'], answer: 1, why: 'Specific role, skills and proof.' },
        { q: 'Which hook is stronger?', options: ['“AI is changing everything.”', '“My AI assistant was 68% accurate. The fix wasn’t a better model.”'], answer: 1, why: 'Specific and curious.' },
        { q: 'What should go in Featured?', options: ['Your case study and demo', 'Nothing'], answer: 0, why: 'Visible proof.' },
        { q: 'Which is better?', options: ['“I’m an AI expert.”', '“Here’s what I learned building my first RAG product.”'], answer: 1, why: 'Shares learning without overclaiming.' },
      ],
    },
    completion: [
      'My headline shows role, focus and proof.',
      'My case study and demo are featured.',
      'I completed the four questions.',
    ],
    takeaway: 'share specific lessons from real work, link to proof, and let the evidence do the claiming.',
  },

  84: {
    intro: 'AI product sense questions test whether you can design an AI product from scratch under time pressure. Today you practise one.',
    objectives: [
      'Use a structure for AI product sense cases.',
      'Include when not to use AI, metrics and risks.',
      'Answer one timed case and review it.',
    ],
    parts: [
      {
        id: 'structure',
        title: 'A structure for AI product cases',
        table: {
          head: ['Step', 'What to cover', 'Time'],
          rows: [
            ['Clarify', 'Goal, users, constraints', '2–3 min'],
            ['Users and pain points', 'Pick one segment and its biggest problem', '5 min'],
            ['Solutions', 'Three options, including one without AI', '5 min'],
            ['AI design', 'Inputs, model approach, UX, failure handling', '8 min'],
            ['Metrics and evals', 'North star, guardrails, how you evaluate quality', '5 min'],
            ['Risks and rollout', 'Top risks and a staged launch', '3 min'],
            ['Summary', 'Recommendation in four sentences', '2 min'],
          ],
        },
      },
      {
        id: 'stand-out',
        title: 'What makes an AI PM answer stand out',
        bullets: [
          { text: 'Asking whether AI is needed at all, and comparing a non-AI option.' },
          { text: 'Naming what happens when the AI is wrong, and designing for it.' },
          { text: 'Including evals, not just engagement metrics.' },
          { text: 'Mentioning cost and latency where they matter.' },
        ],
      },
      {
        id: 'example',
        title: 'Example prompt',
        quote: '“Design an AI feature to help small shop owners in India manage their inventory.”',
        paragraphs: ['A strong answer might choose kirana owners who reorder by memory, compare a simple reorder reminder (no AI) with demand forecasting and WhatsApp voice ordering, and pick a design with clear failure handling and a measurable outcome like fewer stock-outs.'],
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'What should come first in a product sense case?', options: ['The AI model', 'Clarifying goal, users and constraints'], answer: 1, why: 'Frame before solving.' },
        { q: 'Why include a non-AI option?', options: ['To fill time', 'To show judgement about when AI fits'], answer: 1, why: 'Interviewers look for it.' },
        { q: 'Which metric set is strongest for an AI feature?', options: ['Daily active users only', 'Outcome metric plus guardrails plus eval quality'], answer: 1, why: 'Covers value, safety and quality.' },
        { q: 'You are at minute 30 of 35. What next?', options: ['Add more features', 'Summarise your recommendation'], answer: 1, why: 'Always land the answer.' },
      ],
    },
    completion: [
      'I used a structure for AI product cases.',
      'I compared a non-AI option.',
      'I completed the four questions.',
    ],
    takeaway: 'stand out by asking whether AI is needed, designing for when it’s wrong, and measuring quality as well as usage.',
  },

  85: {
    intro: 'AI system design questions test whether you can explain how an AI product works and the trade-offs behind it.',
    objectives: [
      'Draw an AI system from user request to response.',
      'Explain retrieval, model choice, permissions and fallbacks.',
      'Narrate trade-offs clearly.',
    ],
    parts: [
      {
        id: 'diagram',
        title: 'The standard diagram',
        bullets: [
          { term: '1. Client', text: 'Where the user asks (app, Slack, voice).' },
          { term: '2. API and auth', text: 'Who the user is and what they can access.' },
          { term: '3. Orchestration', text: 'Builds the prompt, decides on tools.' },
          { term: '4. Retrieval', text: 'Search over indexed documents, filtered by permission.' },
          { term: '5. Model', text: 'Which model, and why; routing between models.' },
          { term: '6. Tools', text: 'Actions, validated and authorised on the server.' },
          { term: '7. Checks', text: 'Output validation, safety filters, fallbacks.' },
          { term: '8. Logging and evals', text: 'Traces, monitoring, offline eval pipeline.' },
        ],
      },
      {
        id: 'tradeoffs',
        title: 'Trade-offs interviewers probe',
        table: {
          head: ['Question', 'Good answer covers'],
          rows: [
            ['Why RAG and not fine-tuning?', 'Freshness, citations, cost of retraining'],
            ['Which model?', 'Quality on your evals, latency, cost, privacy, vendor risk'],
            ['How do you stop data leaks?', 'Permission filtering before retrieval; tenant isolation'],
            ['What if the model is down?', 'Fallback model or graceful error'],
            ['How do you know it works?', 'Golden set, judges checked against humans, online signals'],
          ],
        },
      },
      {
        id: 'narrate',
        title: 'How to narrate',
        paragraphs: ['Start simple: draw the happy path end to end in two minutes. Then add depth where the interviewer is interested. Always say why, not just what.'],
      },
    ],
    quiz: {
      title: 'Which part of the system handles it?',
      options: ['API and auth', 'Retrieval', 'Checks', 'Logging and evals'],
      questions: [
        { q: 'Making sure the answer is valid JSON before display.', answer: 2, why: 'Output validation.' },
        { q: 'Knowing which documents this user may see.', answer: 0, why: 'Identity and permissions.' },
        { q: 'Finding the 5 most relevant policy passages.', answer: 1, why: 'Search over the index.' },
        { q: 'Tracking pass rate after each prompt change.', answer: 3, why: 'Eval pipeline.' },
      ],
    },
    completion: [
      'I can draw the eight-part diagram.',
      'I can explain RAG vs fine-tuning.',
      'I completed the four questions.',
    ],
    takeaway: 'draw the happy path first, then explain each choice with a reason: permissions, model, checks and evals.',
  },

  86: {
    intro: 'Expect at least one interview question on how you would measure an AI product. Today you prepare a strong answer.',
    objectives: [
      'Answer metrics and eval questions with a clear structure.',
      'Use a worked example from your own project.',
      'Explain golden sets, task success, groundedness and release gates.',
    ],
    parts: [
      {
        id: 'structure',
        title: 'A structure for “how would you measure it?”',
        bullets: [
          { term: 'Goal', text: 'What the product is for, in user terms.' },
          { term: 'Outcome metric', text: 'The business or user result.' },
          { term: 'Quality metrics', text: 'Task success, groundedness, correctness, from evals.' },
          { term: 'Guardrails', text: 'Safety, trust, cost and latency limits.' },
          { term: 'How you measure', text: 'Golden set, judges checked against humans, A/B tests, online signals.' },
          { term: 'Decision', text: 'The release gate or ship rule.' },
        ],
      },
      {
        id: 'questions',
        title: 'Common questions',
        table: {
          head: ['Question', 'Key point to make'],
          rows: [
            ['How do you evaluate an LLM feature?', 'Golden set from real cases, error analysis, code checks plus calibrated judges'],
            ['The metric went up but users complain. Why?', 'Metric doesn’t capture task success; check guardrails and segments'],
            ['How do you know it is safe to ship?', 'Release gates by severity; no S0 failures; red-team results'],
            ['How do you detect quality dropping in production?', 'Live checks, sampled judging, user signals, model version alerts'],
          ],
        },
      },
      {
        id: 'example',
        title: 'Use your own numbers',
        paragraphs: ['Answers backed by a real project stand out: “In my project, 7 of 16 failures were retrieval misses caused by tables in PDFs. Fixing parsing raised the pass rate from 68% to 86% with no S1 regressions.”'],
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'An interviewer asks how to evaluate a summariser. Best start?', options: ['Accuracy on a benchmark', 'What a good summary means for the user, then a golden set'], answer: 1, why: 'Start from the user goal.' },
        { q: 'Engagement rose but trust surveys fell. What do you check?', options: ['Guardrails and wrong-answer rates', 'Nothing'], answer: 0, why: 'Engagement can hide quality problems.' },
        { q: 'How do you make an LLM judge trustworthy?', options: ['Use the biggest model', 'Check agreement with human labels'], answer: 1, why: 'Calibrate against humans.' },
        { q: 'What makes your answer memorable?', options: ['A worked example with real numbers', 'Listing every metric you know'], answer: 0, why: 'Specific beats exhaustive.' },
      ],
    },
    completion: [
      'I have a structure for metrics questions.',
      'I can explain golden sets and judges.',
      'I completed the four questions.',
    ],
    takeaway: 'answer metrics questions from the user goal down, separate outcomes from quality and guardrails, and prove it with your own numbers.',
  },

  87: {
    intro: 'Design cases test whether you can create an AI experience users trust. Today you practise one with template T10.',
    objectives: [
      'Design an AI experience with controls and uncertainty handling.',
      'Map failure states and recovery.',
      'Complete a 35-minute design case.',
    ],
    parts: [
      {
        id: 't10',
        title: 'The 35-minute design case (T10)',
        bullets: [
          { term: 'Goal and constraint', text: 'What success means and what limits you.' },
          { term: 'Segment and problem', text: 'One user group, one problem.' },
          { term: 'Options', text: 'At least one without AI.' },
          { term: 'AI design', text: 'The key screens and moments.' },
          { term: 'Metrics and evals', text: 'How you know it works.' },
          { term: 'Risks and rollout', text: 'What could go wrong; how you launch.' },
          { term: 'Four-sentence trade-off', text: 'What you chose, what you gave up, why.' },
        ],
      },
      {
        id: 'failure-map',
        title: 'Failure-state map',
        table: {
          head: ['Failure', 'What the user sees', 'Recovery'],
          rows: [
            ['AI unsure', '“I’m not sure. Here’s what I found…”', 'Show sources; offer a human'],
            ['AI wrong', 'User flags the answer', 'Correct it, log it, add to evals'],
            ['Out of scope', '“I can help with X and Y.”', 'Suggest what it can do'],
            ['System down', '“Something went wrong.”', 'Retry or alternative path'],
          ],
        },
      },
      {
        id: 'controls',
        title: 'Controls users value',
        bullets: [
          { text: 'Edit before sending: drafts, not automatic actions.' },
          { text: 'Undo and history.' },
          { text: 'Settings for tone, length, or turning AI suggestions off.' },
          { text: 'Clear labels on AI-generated content.' },
        ],
      },
    ],
    quiz: {
      title: 'Which design response fits?',
      questions: [
        { q: 'The AI might send a wrong email to a customer.', options: ['Send automatically', 'Show a draft the user edits and sends'], answer: 1, why: 'Keep users in control of outward actions.' },
        { q: 'The AI found only weak evidence.', options: ['Answer confidently', 'Show uncertainty and sources'], answer: 1, why: 'Calibrate trust.' },
        { q: 'A user asks something outside scope.', options: ['Guess', 'Say what it can help with'], answer: 1, why: 'Set expectations and redirect.' },
        { q: 'A user spots a wrong answer.', options: ['No way to report', 'Flag, correct and add to evals'], answer: 1, why: 'Close the loop.' },
      ],
    },
    completion: [
      'I followed the T10 steps.',
      'I mapped failure states and recovery.',
      'I completed the four questions.',
    ],
    takeaway: 'a strong AI design keeps users in control, shows uncertainty honestly, and has a recovery path for every failure.',
  },

  88: {
    intro: 'Behavioural rounds decide many AI PM offers. Today you prepare five stories from real experience.',
    objectives: [
      'Write stories using STAR (situation, task, action, result).',
      'Cover trade-offs, conflict, prioritisation, ambiguity and failure.',
      'Keep each story under two minutes.',
    ],
    parts: [
      {
        id: 'star',
        title: 'STAR, kept short',
        table: {
          head: ['Part', 'Share of time', 'Tip'],
          rows: [
            ['Situation', '15%', 'Just enough context'],
            ['Task', '10%', 'Your specific responsibility'],
            ['Action', '50%', 'What you did, with “I”, and why'],
            ['Result', '25%', 'Numbers, plus what you learned'],
          ],
        },
      },
      {
        id: 'five',
        title: 'Five stories to prepare',
        cards: [
          { title: 'Trade-off', text: 'You chose one thing over another for a good reason.' },
          { title: 'Conflict', text: 'You disagreed with engineering, design or a stakeholder and resolved it.' },
          { title: 'Prioritisation', text: 'You said no to something important.' },
          { title: 'Ambiguity', text: 'You made progress without clear direction.' },
          { title: 'Failure', text: 'Something went wrong and you learned from it.' },
        ],
        cardCols: 2,
        callout: { label: 'AI angle', text: 'Where you can, use a story involving AI: arguing for evals before launch, saying no to an AI feature that didn’t need AI, or handling a quality problem.' },
      },
      {
        id: 'real',
        title: 'Real stories only',
        paragraphs: ['Use real experiences from work, studies or your own projects. Interviewers ask follow-ups, and invented stories fall apart. A small real story beats a big invented one.'],
      },
    ],
    quiz: {
      title: 'Which story type is it?',
      options: ['Trade-off', 'Conflict', 'Prioritisation', 'Failure'],
      questions: [
        { q: 'You launched a feature too early, users complained, and you added evals before the next release.', answer: 3, why: 'Something went wrong; you learned.' },
        { q: 'Engineering wanted to fine-tune; you argued for RAG and reached agreement with data.', answer: 1, why: 'A disagreement resolved.' },
        { q: 'You cut a requested chatbot feature to fix a data quality issue first.', answer: 2, why: 'Saying no to something.' },
        { q: 'You chose a slower, more accurate model for medical content.', answer: 0, why: 'Speed given up for accuracy.' },
      ],
    },
    completion: [
      'I can tell a STAR story in under two minutes.',
      'I have five story types covered.',
      'I completed the four questions.',
    ],
    takeaway: 'five short, real STAR stories, heavy on your actions and clear on results, cover most behavioural questions.',
  },

  89: {
    intro: 'Practice is how interviews get easier. Today you do a full mock and find your biggest gaps.',
    objectives: [
      'Run a realistic mock covering product, technical, metrics and leadership.',
      'Score it honestly against a rubric.',
      'Pick the three highest-impact gaps.',
    ],
    parts: [
      {
        id: 'format',
        title: 'A 60-minute mock',
        table: {
          head: ['Part', 'Time', 'Question type'],
          rows: [
            ['Background', '5 min', 'Your 90-second story and follow-ups'],
            ['Product sense', '20 min', 'Design an AI feature (Day 84)'],
            ['Technical', '15 min', 'System design or “how does RAG work?” (Day 85)'],
            ['Metrics', '10 min', 'How would you measure it? (Day 86)'],
            ['Behavioural', '10 min', 'One or two STAR stories (Day 88)'],
          ],
        },
      },
      {
        id: 'who',
        title: 'Who to practise with',
        bullets: [
          { text: 'A PM friend or mentor, ideally one who has interviewed candidates.' },
          { text: 'A peer from the course: take turns as interviewer.' },
          { text: 'An AI mock interviewer, followed by a careful self-review of the recording.' },
        ],
      },
      {
        id: 'score',
        title: 'Scoring',
        paragraphs: ['Score each part 1–5 on structure, depth, AI judgement and communication. Record the session if you can; watching yourself is uncomfortable but very useful.'],
        callout: { label: 'Gaps', text: 'Choose the three gaps that would most change the outcome, not the easiest to fix. Each becomes part of your 30-day plan on Day 90.' },
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Best use of a mock recording?', options: ['Delete it', 'Watch it and score yourself'], answer: 1, why: 'You see what interviewers see.' },
        { q: 'Which gaps should you focus on?', options: ['The easiest', 'The ones with highest impact on the outcome'], answer: 1, why: 'Fix what matters most.' },
        { q: 'You scored 2/5 on technical. What next?', options: ['Ignore it', 'Practise system design and review Phase 2'], answer: 1, why: 'Target the gap.' },
        { q: 'Why include behavioural questions in an AI PM mock?', options: ['They are rarely asked', 'They often decide offers'], answer: 1, why: 'Behavioural rounds matter a lot.' },
      ],
    },
    completion: [
      'I ran a full 60-minute mock.',
      'I scored each part honestly.',
      'I completed the four questions.',
    ],
    takeaway: 'mock interviews turn knowledge into performance. Score honestly and fix the gaps that matter most.',
  },

  90: {
    intro: 'Day 90. This is the final gate: check your portfolio, compare yourself with real job descriptions, and plan your next 30 days.',
    objectives: [
      'Complete the final portfolio checklist.',
      'Build a skills matrix from five real AI PM job descriptions.',
      'Write a 30-day gap plan.',
    ],
    parts: [
      {
        id: 'portfolio',
        title: 'Final portfolio checklist',
        bullets: [
          { text: 'Case study published, with a summary box and numbers.' },
          { text: '3–5 minute demo recorded.' },
          { text: 'Resume rewritten with evidence-based bullets.' },
          { text: 'LinkedIn headline, about and featured updated.' },
          { text: 'Five STAR stories and a 90-second background story ready.' },
          { text: 'At least one full mock interview done.' },
        ],
      },
      {
        id: 'matrix',
        title: 'Five-JD skills matrix',
        paragraphs: ['Collect five real AI PM job descriptions for roles you want. List the skills they ask for, count how often each appears, and rate yourself.'],
        table: {
          head: ['Skill', 'JDs asking (of 5)', 'My evidence', 'Rating 1–5'],
          rows: [
            ['Evals and quality', '5', 'Eval report, golden set', '4'],
            ['LLM and RAG fluency', '4', 'Project build', '3'],
            ['Experimentation', '4', 'Experiment plan only', '2'],
            ['Domain (e.g. fintech)', '3', 'None', '1'],
          ],
        },
      },
      {
        id: 'plan',
        title: 'The 30-day gap plan',
        bullets: [
          { term: 'Pick the top three gaps', text: 'Skills most JDs ask for where your rating is lowest.' },
          { term: 'One concrete action each', text: '“Run a real A/B test on a side project”, not “learn experimentation”.' },
          { term: 'Weekly checkpoints', text: 'What you will have done by each week.' },
          { term: 'Keep applying', text: 'Don’t wait to be perfect. Apply while closing gaps.' },
        ],
        quote: 'You started 90 days ago as a PM curious about AI. Now you have a product, evidence, and a plan.',
      },
    ],
    quiz: {
      title: 'Final self-check',
      questions: [
        { q: 'What should a case study lead with?', options: ['Your effort', 'A summary with numbers and decisions'], answer: 1, why: 'Day 79–81.' },
        { q: 'Which resume bullet is stronger?', options: ['“AI expert”', '“Raised grounded answers from 68% to 86% via error analysis”'], answer: 1, why: 'Day 82.' },
        { q: 'What makes an AI product sense answer stand out?', options: ['Comparing a non-AI option and handling failures', 'Using the newest model'], answer: 0, why: 'Day 84.' },
        { q: 'Why RAG over fine-tuning for changing policies?', options: ['Freshness and citations', 'It is always cheaper'], answer: 0, why: 'Day 85.' },
        { q: 'How do you make an LLM judge trustworthy?', options: ['Check agreement with humans', 'Use temperature 1'], answer: 0, why: 'Day 86.' },
        { q: 'Which gaps go in the 30-day plan?', options: ['The easiest', 'Most-requested skills with the lowest ratings'], answer: 1, why: 'Day 90.' },
      ],
    },
    completion: [
      'I scored at least 5 of 6 on the final self-check.',
    ],
    takeaway: 'you finish with a real AI product, evidence of how you built and measured it, and a plan for what comes next. Keep shipping.',
  },
};
