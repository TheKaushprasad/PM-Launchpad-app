import type { AiPmLesson } from './types';

// Days added on 2026-11-10 to close gaps in the course: AI PM frameworks, advanced prompting, MCP, context
// engineering, model choice, agents in depth, harness engineering, judgment, custom assistants, vibe coding,
// the ship stack, automation, the AI landscape and moats. Keyed by day number in the 104-day plan.

export const ADDED_LESSONS: Record<number, AiPmLesson> = {
  5: {
    intro: 'You now know what AI is and how models learn. Today you get two simple frameworks for spotting where AI actually helps.',
    objectives: [
      'Use the UTG model to describe what an LLM does to data: Understand, Transform or Generate.',
      'Use the POWER framework to go from “AI could help” to a measured change in a real workflow.',
      'Tell a high-value AI use case from a demo that nobody needs.',
    ],
    parts: [
      {
        id: 'utg',
        title: 'UTG: the three things an LLM does',
        paragraphs: [
          'Almost every LLM feature does one of three things to data. Naming which one helps you write the requirement and pick how to test it.',
        ],
        cards: [
          { title: 'Understand', text: 'Read messy input and pull out meaning: classify a ticket, detect intent, extract fields from an invoice.', example: 'Tag each Swiggy complaint as late, wrong item or rude rider.', note: 'Test it like classification: precision and recall.', noteLabel: 'How to test' },
          { title: 'Transform', text: 'Change the form but keep the meaning: summarise, translate, rewrite, convert a call into notes.', example: 'Turn a 40-minute sales call into five CRM fields.', note: 'Test faithfulness: nothing added, nothing important lost.', noteLabel: 'How to test' },
          { title: 'Generate', text: 'Create something new from a brief: a draft email, product copy, code, an image.', example: 'Write three subject lines for a Diwali sale email.', note: 'Test quality with a rubric and human review.', noteLabel: 'How to test' },
        ],
        cardCols: 3,
        callout: { tone: 'violet', label: 'PM tip', text: 'Many features chain them: understand a ticket, transform it into a summary, generate a reply. Each step can fail on its own, so measure each one.' },
      },
      {
        id: 'power',
        title: 'POWER: from idea to impact',
        table: {
          head: ['Step', 'Question to answer', 'Example: support team'],
          rows: [
            ['Possibilities', 'What can AI do today, reliably?', 'Classify tickets, draft replies, summarise threads'],
            ['Opportunities', 'Where is the costly bottleneck?', 'Agents spend 6 minutes reading history per ticket'],
            ['Workflow', 'What are the exact steps today?', 'Open ticket → read history → check order → reply'],
            ['Engineering', 'Which tool or level of AI fits?', 'A summary at the top of each ticket; no agent needed'],
            ['Reflection', 'Did it change a real number?', 'Handle time fell from 9 to 6 minutes; CSAT flat'],
          ],
        },
        quote: 'Start from the bottleneck, not the model. A use case that saves 3 minutes on 10,000 tickets a day beats a clever demo nobody uses.',
      },
      {
        id: 'pick',
        title: 'Spotting a good AI use case',
        bullets: [
          { term: 'High volume', text: 'The task happens often, so small savings add up.' },
          { term: 'Tolerant of small errors', text: 'A wrong answer is cheap to catch or fix.' },
          { term: 'Text or media heavy', text: 'The work is reading, writing, listening or looking.' },
          { term: 'Measurable', text: 'You can say what “better” means with a number before you build.' },
        ],
      },
    ],
    quiz: {
      title: 'Check your understanding',
      options: ['Understand', 'Transform', 'Generate'],
      questions: [
        { q: 'Pull the GST number, date and total out of a scanned invoice.', answer: 0, why: 'It reads messy input and extracts meaning.' },
        { q: 'Turn a long Hindi customer call into a short English summary.', answer: 1, why: 'Same meaning, new form and language.' },
        { q: 'Write five Instagram captions for a new shoe launch.', answer: 2, why: 'It creates new content from a brief.' },
        { q: 'In POWER, which step checks that handle time actually fell after launch?', options: ['Possibilities', 'Workflow', 'Reflection'], answer: 2, why: 'Reflection measures real-world impact.' },
      ],
    },
    completion: [
      'I can sort an AI feature into Understand, Transform or Generate.',
      'I can walk an idea through the five POWER steps.',
      'I completed the four questions.',
    ],
    takeaway: 'name what the model does (UTG), then start from a costly bottleneck and prove the change with a number (POWER).',
  },

  19: {
    intro: 'Yesterday you treated prompts as product design. Today you learn the techniques that make prompts reliable in production.',
    objectives: [
      'Use role, context, task, format and examples in one prompt.',
      'Explain when to ask a model to reason step by step.',
      'Use Markdown or XML tags to separate instructions from data.',
    ],
    parts: [
      {
        id: 'anatomy',
        title: 'The parts of a strong prompt',
        cards: [
          { title: 'Role', text: 'Who the model should act as.', example: 'You are a support agent for a food delivery app.' },
          { title: 'Context', text: 'Facts it needs and cannot guess: policies, user data, tone.', example: 'Refunds are allowed only if the order is over 45 minutes late.' },
          { title: 'Task', text: 'One clear job, stated as an action.', example: 'Decide if this customer gets a refund and draft a reply.' },
          { title: 'Format', text: 'Exactly what the output should look like.', example: 'Return JSON with fields decision and reply.' },
          { title: 'Examples', text: 'Two or three sample inputs with ideal outputs (few-shot).', example: 'One late order, one on-time order, one abusive message.' },
          { title: 'Constraints', text: 'What it must never do.', example: 'Never promise a refund the policy does not allow.' },
        ],
        cardCols: 3,
      },
      {
        id: 'reasoning',
        title: 'Reasoning before answering',
        paragraphs: [
          'For multi-step problems, models do better when they work through the steps before giving the answer. This is called chain-of-thought. You can ask for it directly (“think through the policy step by step before deciding”), and many newer models do it on their own when “thinking” is switched on.',
          'Reasoning costs more tokens and adds delay. Use it for decisions with several conditions, maths and planning. Skip it for simple lookups and rewrites.',
        ],
        callout: { tone: 'amber', label: 'Watch out', text: 'Users should usually see only the final answer. Keep the reasoning in a hidden field or a separate step so a long thought process never leaks into the UI.' },
      },
      {
        id: 'structure',
        title: 'Structure with Markdown and XML',
        paragraphs: [
          'Long prompts mix instructions with data: a policy, a user message, a document. Wrapping each part in tags such as <policy>, <customer_message> and <order> tells the model what is an instruction and what is just material to read.',
        ],
        bullets: [
          { term: 'Clarity', text: 'The model is less likely to confuse a sentence in the document with your instruction.' },
          { term: 'Safety', text: 'Text inside <customer_message> is easier to treat as data, which reduces prompt-injection risk.' },
          { term: 'Maintenance', text: 'Your team can edit one section without breaking the others.' },
        ],
        quote: 'Prompts are product code. Version them, test them with fixed cases, and change one thing at a time.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Your bot keeps writing three paragraphs when you need one line. What should you add first?', options: ['A role', 'A format instruction with an example', 'Higher temperature'], answer: 1, why: 'Format and examples control the shape of the output.' },
        { q: 'When is step-by-step reasoning most worth its extra cost?', options: ['Fixing typos', 'Deciding a refund under four policy conditions', 'Translating one word'], answer: 1, why: 'Multi-condition decisions benefit from working through steps.' },
        { q: 'Why wrap the customer’s message in <customer_message> tags?', options: ['It makes the reply shorter', 'It separates data from instructions', 'It is required by every API'], answer: 1, why: 'Tags show the model what is instruction and what is material.' },
        { q: 'What is few-shot prompting?', options: ['Giving the model a few worked examples', 'Calling the model a few times', 'Using a smaller model'], answer: 0, why: 'Few-shot means including sample inputs with ideal outputs.' },
      ],
    },
    completion: [
      'I can name the six parts of a strong prompt.',
      'I know when reasoning is worth the extra tokens.',
      'I completed the four questions.',
    ],
    takeaway: 'give the model a role, the facts, one task, an exact format and examples, and fence data off with tags.',
  },

  23: {
    intro: 'Yesterday a model called one tool through function calling. MCP is the standard that lets any AI app plug into many tools without custom wiring for each.',
    objectives: [
      'Explain what the Model Context Protocol (MCP) is and why it exists.',
      'Name the parts: host, client, server, and what a server exposes.',
      'Judge the product and security questions MCP raises.',
    ],
    parts: [
      {
        id: 'why-mcp',
        title: 'The problem MCP solves',
        paragraphs: [
          'Before MCP, every AI app had to write its own connector for every tool: one for Slack, one for GitHub, one for Google Drive. With 10 apps and 10 tools, that is 100 custom integrations.',
          'MCP is an open standard, released by Anthropic in late 2024 and now supported by many AI apps, that defines one way for AI apps to talk to tools and data. A tool builds one MCP server; every MCP-compatible app can use it. People call it “USB-C for AI”.',
        ],
      },
      {
        id: 'parts',
        title: 'How it fits together',
        cards: [
          { title: 'Host', text: 'The AI app the user works in.', example: 'Claude Desktop, Cursor, an IDE, or your own product.' },
          { title: 'Client', text: 'The connector inside the host that speaks MCP to one server.' },
          { title: 'Server', text: 'A small program that wraps a tool or data source and exposes it over MCP.', example: 'A GitHub MCP server, a Postgres MCP server, a Figma MCP server.' },
        ],
        cardCols: 3,
        table: {
          head: ['A server can offer', 'What it is', 'Example'],
          rows: [
            ['Tools', 'Actions the model can call', 'create_issue, send_message'],
            ['Resources', 'Data the model can read', 'A file, a table, a document'],
            ['Prompts', 'Ready-made templates', '“Summarise this pull request”'],
          ],
        },
      },
      {
        id: 'pm-questions',
        title: 'The PM questions',
        bullets: [
          { term: 'Distribution', text: 'Shipping an MCP server for your product puts it inside every AI assistant your users already use.' },
          { term: 'Permissions', text: 'Which actions need user approval? Reading a calendar is low risk; sending money is not.' },
          { term: 'Trust', text: 'A third-party server can return text that tries to instruct the model (prompt injection). Only connect servers you trust.' },
          { term: 'Context cost', text: 'Every connected tool’s description uses up context window. Twenty servers can crowd out the actual task.' },
        ],
        quote: 'MCP makes connecting easy. Your job is deciding what the model should be allowed to do once it is connected.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'What does MCP standardise?', options: ['How models are trained', 'How AI apps connect to tools and data', 'How tokens are priced'], answer: 1, why: 'It is a protocol between AI apps and external tools or data.' },
        { q: 'Your company wants every AI assistant to be able to search its help centre. What should it build?', options: ['A new LLM', 'An MCP server for the help centre', 'A fine-tuned model'], answer: 1, why: 'One server makes the data usable from any MCP host.' },
        { q: 'Which MCP action most needs a human approval step?', options: ['Reading a public doc', 'Listing calendar events', 'Issuing a customer refund'], answer: 2, why: 'Irreversible, costly actions need a human in the loop.' },
        { q: 'Why can connecting too many MCP servers hurt quality?', options: ['Tool descriptions fill the context window', 'MCP slows the internet', 'Servers retrain the model'], answer: 0, why: 'Each tool adds text the model must read every turn.' },
      ],
    },
    completion: [
      'I can explain MCP as a standard between AI apps and tools.',
      'I can name host, client and server, and tools, resources and prompts.',
      'I completed the four questions.',
    ],
    takeaway: 'MCP lets one integration work across many AI apps; the PM decides which actions need approval and which servers to trust.',
  },

  27: {
    intro: 'You have seen prompting, retrieval and tools. Context engineering is the discipline that ties them together: deciding what the model sees on every call.',
    objectives: [
      'Define context engineering and how it differs from prompt engineering.',
      'List what goes into a model’s context window.',
      'Spot the common ways context goes wrong.',
    ],
    parts: [
      {
        id: 'define',
        title: 'Prompt engineering vs context engineering',
        paragraphs: [
          'Prompt engineering is writing good instructions. Context engineering is choosing everything the model sees at the moment it answers: instructions, the user’s history, retrieved documents, tool results and memory, within a fixed token budget.',
          'Most AI failures in production are context failures: the model was capable, but it was missing a fact, or buried it under irrelevant text.',
        ],
      },
      {
        id: 'ingredients',
        title: 'What goes into the window',
        table: {
          head: ['Ingredient', 'Example', 'PM question'],
          rows: [
            ['System instructions', 'Role, rules, tone', 'Are the rules short and current?'],
            ['User input', 'The question being asked', 'Is it clean, or full of pasted noise?'],
            ['Conversation history', 'Earlier turns', 'How many turns do we keep? Do we summarise?'],
            ['Retrieved knowledge', 'Top 5 help articles', 'Are they the right ones, and fresh?'],
            ['Tool results', 'Order status from an API', 'Do we pass only the fields we need?'],
            ['Memory', 'User prefers Hindi replies', 'What do we store, and can users delete it?'],
          ],
        },
      },
      {
        id: 'failures',
        title: 'How context goes wrong',
        cards: [
          { title: 'Missing', text: 'The fact the model needed was never retrieved.', note: 'It guesses, and the guess sounds confident.', noteLabel: 'Result' },
          { title: 'Buried', text: 'The right fact is there, lost among 30 irrelevant pages.', note: 'Models pay less attention to the middle of long contexts.', noteLabel: 'Result' },
          { title: 'Conflicting', text: 'An old and a new policy are both included.', note: 'The model picks one at random.', noteLabel: 'Result' },
          { title: 'Poisoned', text: 'An earlier wrong answer or injected text stays in the history.', note: 'The error repeats on every later turn.', noteLabel: 'Result' },
        ],
        cardCols: 2,
        quote: 'More context is not better context. Give the model the smallest set of facts that lets it do the job.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Your bot quotes last year’s return policy alongside this year’s. Which failure is this?', options: ['Missing', 'Conflicting', 'Buried'], answer: 1, why: 'Two versions of the truth are both in context.' },
        { q: 'Which is context engineering rather than prompt engineering?', options: ['Rewording the instruction', 'Deciding to keep only the last 10 turns plus a summary', 'Changing the tone'], answer: 1, why: 'It decides what goes into the window, not how the instruction is worded.' },
        { q: 'Why can pasting a 200-page manual into every call hurt answers?', options: ['The key fact gets buried', 'Models cannot read manuals', 'It lowers temperature'], answer: 0, why: 'Relevant facts get lost among irrelevant ones, and cost rises.' },
        { q: 'A wrong answer early in a chat keeps coming back. What is the fix?', options: ['A bigger model', 'Drop or correct the poisoned turn in the history', 'More examples'], answer: 1, why: 'Remove the bad context so it stops steering later turns.' },
      ],
    },
    completion: [
      'I can explain context engineering in one sentence.',
      'I can list the six ingredients of a context window.',
      'I completed the four questions.',
    ],
    takeaway: 'the model can only be as good as what it sees; choose the smallest, freshest, non-conflicting context for each call.',
  },

  28: {
    intro: 'Choosing between RAG and fine-tuning was one decision. Choosing which model to build on is another, and it shapes cost, speed and control.',
    objectives: [
      'Compare closed frontier models with open-weight models.',
      'Explain distillation and why small models matter.',
      'Pick a model with a simple scorecard instead of hype.',
    ],
    parts: [
      {
        id: 'open-closed',
        title: 'Closed vs open-weight models',
        table: {
          head: ['', 'Closed (API only)', 'Open-weight'],
          rows: [
            ['Examples', 'OpenAI GPT, Anthropic Claude, Google Gemini', 'Meta Llama, DeepSeek, Qwen, Mistral'],
            ['How you use it', 'Call the vendor’s API', 'Download and run it yourself, or use a host'],
            ['Strengths', 'Usually the most capable; no servers to run', 'Data stays with you; can fine-tune deeply; no per-token vendor bill'],
            ['Costs', 'Pay per token; vendor can change price or model', 'Pay for GPUs and the team to run them'],
          ],
        },
        callout: { tone: 'brand', label: 'Middle path', text: 'Services like OpenRouter or Together AI give you one API to many models, open and closed, so you can switch without rewriting your product.' },
      },
      {
        id: 'distillation',
        title: 'Distillation: big teacher, small student',
        paragraphs: [
          'Distillation trains a small model to copy a large model’s answers on a specific task. The small “student” loses general ability but can match the large “teacher” on that one job, while being far cheaper and faster.',
          'This is why many products use a big model while exploring, then switch a high-volume step to a small distilled or fine-tuned model once the task is stable.',
        ],
      },
      {
        id: 'scorecard',
        title: 'A model choice scorecard',
        bullets: [
          { term: 'Quality on your eval set', text: 'Not public benchmarks. Run your own 50 cases.' },
          { term: 'Cost per successful task', text: 'Price × tokens ÷ success rate.' },
          { term: 'Latency', text: 'Time to first token and total time, at your traffic.' },
          { term: 'Data and compliance', text: 'Where data goes, retention, and region.' },
          { term: 'Lock-in', text: 'How hard it is to switch if price or quality changes.' },
        ],
        quote: 'Use the biggest model to find out what is possible, then the smallest model that passes your evals to ship it.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'A bank cannot send customer data to outside APIs. Which option fits best?', options: ['A closed API model', 'An open-weight model run in its own cloud', 'No AI at all'], answer: 1, why: 'Self-hosting keeps data inside the bank.' },
        { q: 'What is distillation?', options: ['Removing bad training data', 'Training a small model to copy a large one on a task', 'Compressing images'], answer: 1, why: 'The student learns from the teacher’s outputs.' },
        { q: 'Which number best compares two models for your product?', options: ['Leaderboard rank', 'Cost per successful task on your eval set', 'Parameter count'], answer: 1, why: 'It combines quality and price on your real task.' },
        { q: 'Why might a team use OpenRouter?', options: ['To train models', 'To switch between many models through one API', 'To label data'], answer: 1, why: 'A unified API reduces lock-in.' },
      ],
    },
    completion: [
      'I can compare closed and open-weight models.',
      'I can explain distillation in one sentence.',
      'I completed the four questions.',
    ],
    takeaway: 'pick models with your own evals, cost per successful task and data rules, and keep the option to switch.',
  },

  30: {
    intro: 'Yesterday you learned when to use an agent. Today you look inside one: how it remembers, loops and coordinates work.',
    objectives: [
      'Describe the agent loop: think, act, observe, repeat.',
      'Explain short-term and long-term memory in agents.',
      'Choose between one agent and several cooperating agents.',
    ],
    parts: [
      {
        id: 'loop',
        title: 'The agent loop',
        paragraphs: [
          'An agent is a model that runs in a loop. It reasons about the goal, picks a tool, reads the result, and decides the next step, until the goal is met or it gives up. This pattern is often called ReAct: reason, then act.',
        ],
        table: {
          head: ['Step', 'Travel agent example'],
          rows: [
            ['Think', 'User wants Delhi to Goa under ₹6,000 on Friday. Search flights first.'],
            ['Act', 'Call search_flights(DEL, GOI, Friday).'],
            ['Observe', 'Cheapest is ₹6,400. Over budget.'],
            ['Think', 'Try Thursday and Saturday.'],
            ['Act and observe', 'Saturday has ₹5,200. Ask the user to confirm before booking.'],
          ],
        },
        callout: { tone: 'amber', label: 'Errors compound', text: 'If each step is 95% reliable, a 10-step task succeeds only about 60% of the time. Fewer steps and checks between them matter more than a smarter model.' },
      },
      {
        id: 'memory',
        title: 'Memory',
        cards: [
          { title: 'Short-term memory', text: 'What is in the context window right now: the conversation and recent tool results.', note: 'Lost when the session ends or the window fills.', noteLabel: 'Limit' },
          { title: 'Long-term memory', text: 'Facts saved outside the model and loaded back when relevant: preferences, past decisions, project notes.', note: 'Needs rules for what to save, how long, and how users delete it.', noteLabel: 'PM question' },
        ],
        cardCols: 2,
      },
      {
        id: 'orchestration',
        title: 'One agent or many',
        bullets: [
          { term: 'Single agent', text: 'One model with a few tools. Easiest to build, test and debug. Start here.' },
          { term: 'Orchestrator and workers', text: 'A lead agent splits a big task and hands parts to worker agents, then combines results. Useful for research or large codebases.' },
          { term: 'Cost', text: 'Multi-agent systems can use many times more tokens. Use them only when the task is large enough to need parallel work.' },
        ],
        quote: 'Give agents clear stop conditions, a step limit, and a human checkpoint before anything irreversible.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'What does an agent do after it calls a tool?', options: ['Ends the task', 'Reads the result and decides the next step', 'Retrains itself'], answer: 1, why: 'Observing the result and looping is what makes it an agent.' },
        { q: 'A user’s preferred language should be remembered next week. Which memory is that?', options: ['Short-term', 'Long-term', 'Neither'], answer: 1, why: 'It must survive past the current session.' },
        { q: 'Each step of an agent is 90% reliable. What happens over many steps?', options: ['Reliability rises', 'Overall success drops fast', 'Nothing changes'], answer: 1, why: 'Errors multiply across steps.' },
        { q: 'When is a multi-agent setup worth its extra cost?', options: ['Answering one FAQ', 'Researching 30 competitors in parallel', 'Fixing a typo'], answer: 1, why: 'Large tasks that split into parallel parts benefit most.' },
      ],
    },
    completion: [
      'I can explain the think, act, observe loop.',
      'I can tell short-term from long-term memory.',
      'I completed the four questions.',
    ],
    takeaway: 'agents loop, and errors compound with every step; keep loops short, memory deliberate and humans in charge of irreversible actions.',
  },

  31: {
    intro: 'Why do two products built on the same model feel completely different? The answer is the harness: everything wrapped around the model.',
    objectives: [
      'Define an agent harness and its parts.',
      'Explain how coding agents like Claude Code and Cursor work at a high level.',
      'See why the harness, not the model, is often the product.',
    ],
    parts: [
      {
        id: 'define',
        title: 'Model vs harness',
        paragraphs: [
          'The model predicts text. The harness is the software around it that turns predictions into work: it builds the context, offers tools, runs the loop, checks results, asks for permission and keeps state.',
          'Two products can use the same model and get very different results because their harnesses differ.',
        ],
      },
      {
        id: 'parts',
        title: 'Parts of a harness',
        table: {
          head: ['Part', 'What it does', 'In a coding agent'],
          rows: [
            ['Context builder', 'Decides what the model sees', 'Project instructions file, open files, search results'],
            ['Tools', 'Actions the model can take', 'Read file, edit file, run tests, search code'],
            ['Loop', 'Repeats think, act, observe', 'Edit, run tests, fix, run again'],
            ['Permissions', 'Asks before risky actions', 'Approve before running a shell command'],
            ['Memory and state', 'Keeps progress across steps', 'A to-do list and notes between sessions'],
            ['Checks', 'Verifies the work', 'Linters, type checks and tests'],
          ],
        },
      },
      {
        id: 'pm-view',
        title: 'Why PMs should care',
        bullets: [
          { term: 'It is the moat', text: 'Models are shared by everyone; a well-tuned harness is not.' },
          { term: 'It drives quality', text: 'Giving the agent tests to run often improves results more than switching models.' },
          { term: 'It drives trust', text: 'Clear permission prompts and visible plans let users stay in control.' },
          { term: 'It drives cost', text: 'Smart context building keeps token bills down on long tasks.' },
        ],
        quote: 'When you write requirements for an AI product, spec the harness: context, tools, loop, permissions, memory and checks.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Two apps use the same model, but one fixes bugs far more reliably. The most likely reason?', options: ['Luck', 'A better harness, such as running tests in the loop', 'A different internet speed'], answer: 1, why: 'Checks inside the loop let the agent correct itself.' },
        { q: 'Which part of a harness asks the user before deleting files?', options: ['Permissions', 'Context builder', 'Memory'], answer: 0, why: 'Permissions gate risky actions.' },
        { q: 'A project instructions file loaded on every run belongs to which part?', options: ['Tools', 'Context builder', 'Checks'], answer: 1, why: 'It shapes what the model sees.' },
        { q: 'Why is a harness often a stronger moat than the model?', options: ['Competitors can use the same model', 'Harnesses are open source by law', 'Models never change'], answer: 0, why: 'Everyone can rent the model; the harness is yours.' },
      ],
    },
    completion: [
      'I can name the six parts of an agent harness.',
      'I can explain how a coding agent loops with tests.',
      'I completed the four questions.',
    ],
    takeaway: 'the model is rented; the harness of context, tools, loop, permissions, memory and checks is the product.',
  },

  36: {
    intro: 'AI can now summarise every interview and survey for you. Today is about using that speed without losing the judgment that makes you a PM.',
    objectives: [
      'Spot the ways AI summaries can mislead discovery.',
      'Keep direct contact with raw customer evidence.',
      'Use AI research tools such as NotebookLM with checks.',
    ],
    parts: [
      {
        id: 'risks',
        title: 'Where AI summaries mislead',
        cards: [
          { title: 'Averaging away the signal', text: 'Summaries keep what is common and drop the one angry, specific quote that reveals the real problem.' },
          { title: 'Invented themes', text: 'A model can produce tidy themes that no customer actually said.' },
          { title: 'Confirmation', text: 'If you ask “do users want feature X?”, the model finds support for X.' },
          { title: 'Lost context', text: 'Tone, hesitation and what users did, not just said, rarely survive a summary.' },
        ],
        cardCols: 2,
      },
      {
        id: 'habits',
        title: 'Habits that keep your judgment sharp',
        bullets: [
          { term: 'Read raw first', text: 'Read or listen to at least three full interviews yourself before reading any summary.' },
          { term: 'Demand quotes', text: 'Ask the AI to back every theme with exact quotes and sources, then spot-check them.' },
          { term: 'Ask for the opposite', text: 'Ask “what evidence argues against this?” as well as “what supports it?”.' },
          { term: 'Decide yourself', text: 'Use AI to gather and sort. The trade-off and the call stay with you.' },
        ],
      },
      {
        id: 'tools',
        title: 'Research tools worth knowing',
        table: {
          head: ['Tool', 'Good for', 'Check'],
          rows: [
            ['NotebookLM', 'Asking questions across your own interview notes, PDFs and transcripts, with citations', 'Click the citations; confirm the quote says what the answer claims'],
            ['ChatGPT, Claude or Gemini projects', 'Clustering feedback, drafting interview guides', 'Compare themes with a sample you coded by hand'],
            ['Mobbin', 'Seeing how shipped apps design a flow', 'Patterns from big apps may not fit your users'],
          ],
        },
        quote: 'AI can make you faster at discovery. Only talking to customers makes you right.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'An AI summary says “users love the new checkout”. What should you do first?', options: ['Ship more features', 'Ask for supporting quotes and evidence against', 'Trust it'], answer: 1, why: 'Check the claim against raw evidence from both sides.' },
        { q: 'Why read some interviews in full yourself?', options: ['Summaries drop specific, surprising details', 'It is faster', 'AI cannot read transcripts'], answer: 0, why: 'The rare, specific signal is what summaries lose.' },
        { q: 'What is NotebookLM most useful for?', options: ['Answering questions over your own documents with citations', 'Designing logos', 'Running A/B tests'], answer: 0, why: 'It grounds answers in sources you upload.' },
        { q: 'Who should make the final trade-off call?', options: ['The AI', 'The PM, using the evidence', 'Whoever asked last'], answer: 1, why: 'AI gathers; the PM decides.' },
      ],
    },
    completion: [
      'I can name four ways AI summaries mislead.',
      'I have a habit for checking AI research against raw evidence.',
      'I completed the four questions.',
    ],
    takeaway: 'let AI gather and sort evidence, but read raw customer words yourself and keep the decision.',
  },

  37: {
    intro: 'You repeat the same prompts every week: PRD reviews, release notes, interview synthesis. Today you turn them into reusable assistants.',
    objectives: [
      'Compare Custom GPTs, Gemini Gems and Claude Skills.',
      'Design one reusable assistant for a recurring PM task.',
      'Know what not to put inside a shared assistant.',
    ],
    parts: [
      {
        id: 'options',
        title: 'Three ways to save your best prompts',
        table: {
          head: ['Tool', 'Lives in', 'What you give it'],
          rows: [
            ['Custom GPTs', 'ChatGPT', 'Instructions, knowledge files and optional actions; shareable with others'],
            ['Gems', 'Google Gemini', 'Instructions and files; good if your team lives in Google Workspace'],
            ['Claude Skills', 'Claude apps and Claude Code', 'A folder with instructions, examples and scripts that Claude loads when the task needs it'],
          ],
        },
      },
      {
        id: 'design',
        title: 'Design a good assistant',
        cards: [
          { title: 'One job', text: 'Make it do one recurring task well, not everything.', example: '“PRD reviewer” that checks a draft against your template.' },
          { title: 'Your standards', text: 'Paste your template, a great example and the common mistakes.', example: 'Every PRD must state a success metric and a kill criterion.' },
          { title: 'Fixed output', text: 'Always return the same structure so results are easy to scan.', example: 'Score, three gaps, three questions for the author.' },
          { title: 'Test it', text: 'Run it on three old documents where you know the right answer.' },
        ],
        cardCols: 2,
      },
      {
        id: 'safety',
        title: 'What to keep out',
        bullets: [
          { term: 'Secrets', text: 'No API keys, passwords or customer data inside instructions or files.' },
          { term: 'Stale facts', text: 'Pricing or policies change. Link to the source or update the files on a schedule.' },
          { term: 'Sharing', text: 'Anyone you share it with may be able to see its instructions and files.' },
        ],
        quote: 'If you have typed the same prompt three times, make it an assistant.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Your team writes release notes every sprint the same way. What helps most?', options: ['A reusable assistant with your template and an example', 'A bigger model', 'Writing them by hand forever'], answer: 0, why: 'Recurring tasks with a fixed standard suit a saved assistant.' },
        { q: 'Which belongs in an assistant’s files?', options: ['Your PRD template and a good example', 'The production database password', 'A customer’s phone numbers'], answer: 0, why: 'Standards and examples help; secrets and personal data never go in.' },
        { q: 'Claude Skills are best described as…', options: ['Folders of instructions and resources Claude loads when needed', 'A new model', 'A browser extension'], answer: 0, why: 'A skill packages instructions, examples and scripts.' },
        { q: 'Why give an assistant a fixed output format?', options: ['Results are easier to scan and compare', 'It is required', 'It makes answers longer'], answer: 0, why: 'Consistent structure makes reviews faster.' },
      ],
    },
    completion: [
      'I can compare Custom GPTs, Gems and Claude Skills.',
      'I can list four rules for a good reusable assistant.',
      'I completed the four questions.',
    ],
    takeaway: 'turn every prompt you repeat into a one-job assistant with your standards, a fixed output and no secrets.',
  },

  63: {
    intro: 'Phase 5 is about building. Today you learn to build a working prototype yourself, without waiting for engineers.',
    objectives: [
      'Explain vibe coding and where it fits in a PM’s work.',
      'Choose between app builders and AI coding tools.',
      'Write a build brief that gets a usable first version.',
    ],
    parts: [
      {
        id: 'what',
        title: 'What vibe coding is',
        paragraphs: [
          'Vibe coding means describing what you want in plain language and letting AI write the code, then testing and refining by talking to it. The term was coined by Andrej Karpathy in early 2025.',
          'For a PM it turns a PRD into a clickable prototype in hours. Users can react to a real thing instead of a document.',
        ],
        callout: { tone: 'amber', label: 'Limits', text: 'Vibe-coded apps are great for learning and demos. Security, data handling and scale still need engineering review before real users and real data.' },
      },
      {
        id: 'tools',
        title: 'Two kinds of tools',
        table: {
          head: ['Type', 'Tools', 'Best for'],
          rows: [
            ['App builders (browser)', 'Google AI Studio, Lovable, Bolt, v0, Replit', 'A first prototype in hours; no setup; easy to share a link'],
            ['AI coding tools', 'Cursor, Claude Code, Codex, Antigravity', 'Working in a real codebase; more control; needs some comfort with files and Git'],
          ],
        },
      },
      {
        id: 'brief',
        title: 'A build brief that works',
        bullets: [
          { term: 'User and job', text: 'Who uses it and the one task they finish.' },
          { term: 'Screens', text: 'List each screen and what is on it.' },
          { term: 'Data', text: 'What is stored and where it comes from. Use fake data.' },
          { term: 'AI step', text: 'The prompt, the expected output format and what happens on failure.' },
          { term: 'Done means', text: 'Three things a tester can do end to end.' },
        ],
        quote: 'Build one thin slice that works end to end before adding a second feature.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'You need a shareable demo of a new idea by tomorrow and have never coded. Start with…', options: ['An app builder such as Lovable or AI Studio', 'Training your own model', 'A full engineering sprint'], answer: 0, why: 'Browser builders are fastest for a first prototype.' },
        { q: 'What should a vibe-coded app use before engineering review?', options: ['Real customer data', 'Fake data', 'Production passwords'], answer: 1, why: 'Prototypes should not touch real personal data.' },
        { q: 'Which tool fits changing an existing production codebase?', options: ['An AI coding tool such as Cursor or Claude Code', 'A slide deck', 'A Custom GPT'], answer: 0, why: 'Coding tools work inside real repositories.' },
        { q: 'What is a “thin slice”?', options: ['One feature working end to end', 'A short PRD', 'A cheap model'], answer: 0, why: 'It proves the whole path works before you widen it.' },
      ],
    },
    completion: [
      'I can explain vibe coding and its limits.',
      'I can choose between app builders and AI coding tools.',
      'I completed the four questions.',
    ],
    takeaway: 'describe one thin slice clearly, build it with AI, and keep real data out until engineers review it.',
  },

  64: {
    intro: 'A prototype on your laptop helps nobody. Today you learn the simple stack that puts it online with logins, data and AI.',
    objectives: [
      'Name what each part of a common AI app stack does.',
      'Explain how code goes from GitHub to a live URL.',
      'Know the basics of keys, costs and monitoring.',
    ],
    parts: [
      {
        id: 'stack',
        title: 'The stack in one table',
        table: {
          head: ['Layer', 'Common tools', 'What it does'],
          rows: [
            ['Code', 'GitHub', 'Stores the code and its history; every change is a commit'],
            ['Hosting', 'Vercel, Netlify', 'Builds the code and serves it at a URL; a preview link for every change'],
            ['Database and login', 'Supabase, Firebase', 'Stores user data; handles sign-up and sign-in'],
            ['Model access', 'OpenAI, Anthropic, Google APIs, or OpenRouter for many models through one API', 'Sends prompts and gets answers'],
            ['Analytics and errors', 'PostHog, Microsoft Clarity, Sentry, Uptime Robot', 'Shows what users do, records errors, alerts when the site is down'],
          ],
        },
      },
      {
        id: 'flow',
        title: 'From change to live site',
        paragraphs: [
          'You (or an AI tool) change the code and push it to GitHub. Vercel sees the change, builds it and gives you a preview link. When the change is merged into the main branch, Vercel puts it on the live site. If something breaks, you roll back to the previous version in one click.',
        ],
      },
      {
        id: 'basics',
        title: 'Three basics to get right',
        cards: [
          { title: 'Keys stay secret', text: 'API keys go in the host’s environment settings, never in code or the browser.', note: 'A leaked key can run up a large bill in hours.', noteLabel: 'Why' },
          { title: 'Set spend limits', text: 'Set a monthly budget and alerts on every AI provider.', note: 'One bug in a loop can call the model thousands of times.', noteLabel: 'Why' },
          { title: 'Watch from day one', text: 'Add analytics and error tracking before your first user.', note: 'You cannot fix what you cannot see.', noteLabel: 'Why' },
        ],
        cardCols: 3,
        quote: 'Learn the stack well enough to ship a prototype and to ask engineers the right questions.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Where should your OpenAI or Gemini API key live?', options: ['In the front-end code', 'In the hosting platform’s environment variables', 'In a public GitHub file'], answer: 1, why: 'Server-side secrets stay out of code and browsers.' },
        { q: 'Which tool gives you sign-in and a database?', options: ['Supabase', 'Vercel', 'Sentry'], answer: 0, why: 'Supabase provides Postgres and authentication.' },
        { q: 'A new release breaks checkout. What does a host like Vercel let you do fast?', options: ['Roll back to the previous version', 'Retrain the model', 'Delete GitHub'], answer: 0, why: 'Instant rollback limits damage.' },
        { q: 'Which tool alerts you when a JavaScript error hits users?', options: ['Sentry', 'OpenRouter', 'GitHub'], answer: 0, why: 'Error tracking catches crashes in real use.' },
      ],
    },
    completion: [
      'I can name the job of each layer in the stack.',
      'I can explain how code goes from GitHub to a live URL.',
      'I completed the four questions.',
    ],
    takeaway: 'GitHub stores it, Vercel ships it, Supabase holds the data, a model API powers it, and analytics shows what happens.',
  },

  65: {
    intro: 'Not every AI idea needs an app. Many PM wins are automations that connect tools you already use.',
    objectives: [
      'Explain triggers, steps and AI nodes in a workflow tool.',
      'Compare n8n, Zapier and Make.',
      'Decide when an automation beats building a product.',
    ],
    parts: [
      {
        id: 'how',
        title: 'How a workflow works',
        table: {
          head: ['Part', 'What it is', 'Example'],
          rows: [
            ['Trigger', 'What starts the workflow', 'A new row in a Google Sheet of feedback'],
            ['Steps', 'Actions in order', 'Read the row, look up the customer in the CRM'],
            ['AI step', 'A model call inside the flow', 'Classify the feedback as bug, idea or praise'],
            ['Output', 'Where the result goes', 'Post bugs to the Jira board and a Slack channel'],
          ],
        },
      },
      {
        id: 'tools',
        title: 'Choosing a tool',
        cards: [
          { title: 'Zapier', text: 'Easiest to start; thousands of ready connections.', note: 'Costs rise with volume.', noteLabel: 'Trade-off' },
          { title: 'Make', text: 'Visual canvas with more control over branching and data.', note: 'Slightly steeper learning curve.', noteLabel: 'Trade-off' },
          { title: 'n8n', text: 'Open source, can self-host, strong AI and agent nodes.', note: 'Self-hosting means you run and secure it.', noteLabel: 'Trade-off' },
        ],
        cardCols: 3,
      },
      {
        id: 'when',
        title: 'Automate, or build a product?',
        bullets: [
          { term: 'Automate', text: 'Internal team use, few users, steps that join existing tools, fine if it breaks for an hour.' },
          { term: 'Build', text: 'Customers use it, it needs its own interface, strict security, or high volume.' },
          { term: 'Always', text: 'Log every run, send failures to a person, and keep a human review on anything sent to customers.' },
        ],
        quote: 'An automation that saves your team an hour a day is often the fastest proof that an AI idea is worth a product.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'In “every new support email gets tagged by AI and posted to Slack”, what is the trigger?', options: ['Posting to Slack', 'A new support email', 'The AI tag'], answer: 1, why: 'The trigger is what starts the run.' },
        { q: 'Your company needs workflows to stay on its own servers. Which tool fits?', options: ['n8n self-hosted', 'Any hosted tool', 'None'], answer: 0, why: 'n8n can be self-hosted.' },
        { q: 'When should you build a product rather than an automation?', options: ['Five teammates need a weekly digest', 'Thousands of customers need their own interface', 'You want a quick test'], answer: 1, why: 'Customer-facing, high-volume use needs a product.' },
        { q: 'What should every automation do when a step fails?', options: ['Retry forever silently', 'Log it and alert a person', 'Delete the data'], answer: 1, why: 'Silent failures go unnoticed.' },
      ],
    },
    completion: [
      'I can explain trigger, steps, AI step and output.',
      'I can compare n8n, Zapier and Make.',
      'I completed the four questions.',
    ],
    takeaway: 'use workflow tools to join existing apps with an AI step, log every run, and build a product only when users need one.',
  },

  86: {
    intro: 'You priced your product yesterday. Today you zoom out: where does money flow in AI, and where does your product sit?',
    objectives: [
      'Describe the layers of the AI industry: chips, cloud, models, tools, apps.',
      'Explain where margins and risks sit for an app built on someone else’s model.',
      'Place a product on the map and name its dependencies.',
    ],
    parts: [
      {
        id: 'layers',
        title: 'The layers',
        table: {
          head: ['Layer', 'Examples', 'What they sell'],
          rows: [
            ['Chips', 'Nvidia, AMD, Google TPUs', 'The hardware that trains and runs models'],
            ['Cloud', 'AWS, Azure, Google Cloud', 'Rented computing and hosted models'],
            ['Models', 'OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, Sarvam', 'Access to models through APIs or open weights'],
            ['Tools and infrastructure', 'Vector databases, eval and observability tools, model routers', 'What builders use to make models reliable'],
            ['Applications', 'Cursor, Perplexity, Lovable, Notion AI, your product', 'Solutions to a user’s problem'],
          ],
        },
      },
      {
        id: 'economics',
        title: 'Economics of the app layer',
        bullets: [
          { term: 'Cost of goods', text: 'Every request costs tokens, so gross margins are lower than classic SaaS unless you manage usage.' },
          { term: 'Platform risk', text: 'Your model provider can change prices, limits or launch a competing feature.' },
          { term: 'Falling prices', text: 'The cost of a given level of model quality has fallen fast, which helps apps that can wait for costs to drop.' },
        ],
      },
      {
        id: 'map',
        title: 'Map your product',
        paragraphs: [
          'For any AI product, write down: which model providers it depends on, which tools it uses, what share of revenue goes to model costs, and what happens if its main provider doubles prices or ships the same feature.',
        ],
        quote: 'Know your dependencies. The best app-layer companies stay valuable even when the model underneath changes.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Which layer does a vector database belong to?', options: ['Chips', 'Tools and infrastructure', 'Applications'], answer: 1, why: 'It is a building block for builders.' },
        { q: 'Why are AI app margins often lower than classic SaaS?', options: ['Every request has a model cost', 'AI apps are free', 'Servers are free'], answer: 0, why: 'Usage drives token spend.' },
        { q: 'Your writing app depends on one model provider, which launches the same feature for free. This is…', options: ['Platform risk', 'Overfitting', 'Data leakage'], answer: 0, why: 'You depend on a supplier that can compete with you.' },
        { q: 'Cursor and Perplexity sit in which layer?', options: ['Models', 'Applications', 'Chips'], answer: 1, why: 'They solve user problems on top of models.' },
      ],
    },
    completion: [
      'I can name the five layers of the AI industry.',
      'I can explain platform risk for an app.',
      'I completed the four questions.',
    ],
    takeaway: 'apps rent their intelligence; know your costs and dependencies, and design to survive model changes.',
  },

  87: {
    intro: 'If anyone can call the same model, what stops a competitor copying your AI product next month? Today is about moats and growth.',
    objectives: [
      'Name the moats that still work for AI products.',
      'Explain the data flywheel and its limits.',
      'Describe how fast-growing AI products grew.',
    ],
    parts: [
      {
        id: 'moats',
        title: 'Moats for AI products',
        cards: [
          { title: 'Workflow depth', text: 'Being built into how a team works every day makes switching painful.', example: 'Cursor sits inside the developer’s editor.' },
          { title: 'Proprietary data', text: 'Data competitors cannot get, from your users or your domain.', example: 'Years of labelled claims at an insurer.' },
          { title: 'Distribution', text: 'Owning the channel where users already are.', example: 'Notion AI ships to millions of existing Notion users.' },
          { title: 'Speed and brand', text: 'Shipping improvements every week and being the name people think of first.', example: 'Lovable became shorthand for building apps by prompt.' },
          { title: 'Switching costs', text: 'Memory, integrations and history that would be lost by moving.', example: 'An assistant that knows your projects and preferences.' },
        ],
        cardCols: 2,
      },
      {
        id: 'flywheel',
        title: 'The data flywheel',
        paragraphs: [
          'More users create more interactions; feedback on those interactions improves the product; a better product attracts more users. Accepted suggestions, edits and thumbs-down are all signals.',
          'The flywheel only turns if you capture the signal, have the right to use it, and actually feed it into evals, prompts or training. Many teams collect data they never use.',
        ],
      },
      {
        id: 'growth',
        title: 'How AI products grow',
        bullets: [
          { term: 'Instant value', text: 'The first session shows a result in minutes, not after setup.' },
          { term: 'Shareable output', text: 'Users share what they made, and that output carries the brand.' },
          { term: 'Usage-based pricing', text: 'Free to try, paid as people rely on it; credits link price to cost.' },
          { term: 'Bottom-up adoption', text: 'Individuals adopt it, then teams, then the company buys.' },
        ],
        quote: 'A model is not a moat. Workflow, data you can use, distribution and speed are.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'Which is the weakest moat for an AI product?', options: ['Using a popular model', 'Deep workflow integration', 'Proprietary data'], answer: 0, why: 'Anyone can use the same model.' },
        { q: 'Your app collects thumbs-down ratings but nobody reads them. Is the flywheel turning?', options: ['Yes', 'No, the signal never improves the product', 'Only on weekends'], answer: 1, why: 'Data only helps when it feeds back into the product.' },
        { q: 'Why does shareable output help growth?', options: ['Each share is free distribution', 'It lowers model costs', 'It improves accuracy'], answer: 0, why: 'Shared results bring in new users.' },
        { q: 'Notion AI reaching existing Notion users is an example of…', options: ['Distribution', 'Distillation', 'Context engineering'], answer: 0, why: 'It rides an existing user base.' },
      ],
    },
    completion: [
      'I can name five moats for AI products.',
      'I can explain when a data flywheel really turns.',
      'I completed the four questions.',
    ],
    takeaway: 'defend an AI product with workflow, usable data, distribution and speed, and design growth around instant, shareable value.',
  },
};
