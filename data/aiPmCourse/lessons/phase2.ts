import type { AiPmLesson } from './types';

// Phase 2 (GenAI and LLM systems), Days 15–25.

export const PHASE2_LESSONS: Record<number, AiPmLesson> = {
  15: {
    intro: 'Phase 2 starts here. Everything you learned about neural networks now applies to the models behind ChatGPT, Claude and Gemini.',
    objectives: [
      'Explain tokens, next-token prediction, and context windows in plain language.',
      'Explain why fluent output is not proof of truth.',
      'List what LLMs are good and bad at, as product constraints.',
    ],
    parts: [
      {
        id: 'next-token',
        title: 'A very large next-word predictor',
        paragraphs: [
          'A large language model (LLM) is a neural network trained on huge amounts of text to do one thing: predict the next piece of text. Given “The capital of France is”, it predicts “Paris”.',
          'It writes a whole answer by predicting one piece, adding it to the text, and predicting again, many times per second.',
        ],
        callout: { tone: 'violet', label: 'Why this matters', text: 'The model is predicting what text is likely, not looking facts up. Usually likely text is also true, but not always.' },
      },
      {
        id: 'tokens',
        title: 'Tokens and context windows',
        cards: [
          { title: 'Tokens', text: 'Models read and write in tokens: chunks of text, often a word or part of a word. “Unbelievable” might be three tokens.', note: 'Pricing, speed and limits are all counted in tokens. Hindi and other languages often use more tokens per word than English.', noteLabel: 'PM implication' },
          { title: 'Context window', text: 'The maximum number of tokens the model can consider at once: your instructions, the conversation, any documents, and its own reply.', note: 'Anything outside the window is invisible to the model. Long chats and big documents must be trimmed or summarised.', noteLabel: 'PM implication' },
        ],
        cardCols: 2,
      },
      {
        id: 'limits',
        title: 'Strengths and limits as product constraints',
        table: {
          head: ['Good at', 'Weak at'],
          rows: [
            ['Summarising, rewriting and translating text', 'Facts it never saw, or recent events after training'],
            ['Drafting emails, code and documents', 'Exact maths and counting without a tool'],
            ['Understanding messy, natural questions', 'Knowing when it does not know'],
            ['Following a format or style', 'Staying consistent across very long tasks'],
          ],
        },
        quote: 'An LLM sounds equally confident when it is right and when it is making something up (a “hallucination”). Never treat fluency as evidence. Ground it in real sources and check important outputs.',
      },
    ],
    quiz: {
      title: 'Check your understanding',
      questions: [
        { q: 'What is an LLM fundamentally trained to do?', options: ['Look up facts in a database', 'Predict the next piece of text', 'Follow hand-written rules'], answer: 1, why: 'It predicts likely next tokens; facts come out only when the likely text happens to be true.' },
        { q: 'Your chatbot “forgets” what a user said at the start of a very long conversation. Why?', options: ['The model is broken', 'The early messages fell outside the context window', 'The temperature is too high'], answer: 1, why: 'The model can only see what fits in its context window.' },
        { q: 'An assistant confidently states a refund policy that doesn’t exist. What is this called?', options: ['Overfitting', 'A hallucination', 'Leakage'], answer: 1, why: 'It generated plausible text that is not true.' },
        { q: 'Why might the same feature cost more for Hindi users than English users?', options: ['Hindi text often needs more tokens', 'Models refuse Hindi', 'Hindi needs a different API'], answer: 0, why: 'Costs are per token, and many languages use more tokens per word than English.' },
      ],
    },
    exercise: {
      title: 'Build an LLM cheat sheet for your capstone',
      intro: 'Write a one-page cheat sheet your team could pin up: what the LLM in your capstone can be trusted with, and what needs a safeguard.',
      capstone: true,
      fields: [
        { key: 'can', label: 'Three jobs the LLM is good for in your capstone', rows: 3 },
        { key: 'cannot', label: 'Three things it should not be trusted to do alone', rows: 3 },
        { key: 'context', label: 'What must fit in the context window for a good answer?', rows: 2 },
        { key: 'safeguard', label: 'One safeguard against confident wrong answers', rows: 2 },
      ],
      rubric: 'Check that the strengths are realistic language tasks, the limits include hallucination, missing or stale knowledge, and maths or exact facts, the context answer names what the model must see (question, relevant documents, instructions), and the safeguard is concrete, such as grounding in sources with citations or saying “I don’t know”.',
      button: 'Review my cheat sheet',
    },
    completion: [
      'I can explain next-token prediction and tokens.',
      'I can explain what a context window limits.',
      'I completed the four questions.',
      'I wrote an LLM cheat sheet for my capstone.',
    ],
    takeaway: 'an LLM predicts likely text, not true text. Design products that give it the right context and check what matters.',
  },

  16: {
    intro: 'Why does a raw language model ramble, while ChatGPT follows instructions? The answer is in how it was trained.',
    objectives: [
      'Describe the main training stages of a modern LLM.',
      'Explain what instruction tuning and preference tuning change.',
      'Explain these stages to a non-technical stakeholder.',
    ],
    parts: [
      {
        id: 'stages',
        title: 'Three training stages',
        cards: [
          { title: 'Pretraining', text: 'The model reads a huge amount of text from the internet, books and code, learning to predict the next token. This gives it broad knowledge and language skill.', example: 'Result: a model that can continue any text, but doesn’t reliably follow instructions.' },
          { title: 'Instruction tuning', text: 'The model is trained further on examples of instructions paired with good responses, written or checked by people.', example: 'Result: it answers questions and follows requests instead of just continuing text.' },
          { title: 'Preference tuning', text: 'People (or AI judges) compare pairs of answers and pick the better one. The model is tuned towards preferred answers; RLHF is one method.', example: 'Result: more helpful, polite and safer answers, and refusals for harmful requests.' },
        ],
        cardCols: 3,
      },
      {
        id: 'knowledge',
        title: 'What each stage means for your product',
        bullets: [
          { term: 'Knowledge cutoff', text: 'The model only knows what was in its pretraining data, up to a date. Anything newer must be given to it in the prompt.' },
          { term: 'Behaviour comes from tuning', text: 'Tone, refusals and format habits come from instruction and preference tuning. Different providers tune differently, so models “feel” different.' },
          { term: 'You rarely train', text: 'Product teams almost never pretrain. You choose a model, write prompts, add your data through retrieval, and occasionally fine-tune.' },
        ],
        callout: { label: 'Fine-tuning', text: 'Fine-tuning is extra training on your own examples to change behaviour or style. You will compare it with prompting and retrieval on Day 23.' },
      },
      {
        id: 'explain',
        title: 'Explaining it simply',
        quote: 'A useful analogy: pretraining is reading the whole library; instruction tuning is learning to answer questions like a helpful assistant; preference tuning is feedback from a manager on which answers are better.',
      },
    ],
    quiz: {
      title: 'Which training stage?',
      options: ['Pretraining', 'Instruction tuning', 'Preference tuning'],
      questions: [
        { q: 'The model learns grammar, facts and coding patterns from billions of pages of text.', answer: 0, why: 'This broad learning happens during pretraining.' },
        { q: 'Reviewers rank two answers to the same question, and the model is nudged towards the better one.', answer: 2, why: 'Comparing answers and learning from preferences is preference tuning.' },
        { q: 'The model is trained on thousands of “instruction → ideal response” examples.', answer: 1, why: 'That is instruction tuning.' },
        { q: 'A model doesn’t know about a law passed after its training data was collected. Which stage set that limit?', answer: 0, why: 'Its knowledge comes from pretraining data, which has a cutoff date.' },
      ],
    },
    exercise: {
      title: 'Explain model training to a stakeholder',
      intro: 'Your CEO asks: “Why can’t we just teach the AI our company policies?” Write a short, accurate answer that uses today’s ideas.',
      fields: [
        { key: 'stages', label: 'Explain the three training stages in plain language', rows: 4 },
        { key: 'answer', label: 'Answer the CEO’s question: how should the company’s policies get into the product?', rows: 3 },
        { key: 'cutoff', label: 'What happens when policies change, and how will the product stay up to date?', rows: 2 },
      ],
      rubric: 'Check the stages are described accurately and simply; the answer explains that teams usually give policies to the model at question time (retrieval or the prompt) rather than retraining, with fine-tuning mentioned as an option for behaviour not facts; and the update answer explains that retrieved documents can be updated without retraining.',
      button: 'Review my explanation',
    },
    completion: [
      'I can name the three training stages.',
      'I can explain a knowledge cutoff.',
      'I completed the four questions.',
      'I answered the CEO’s question in plain language.',
    ],
    takeaway: 'pretraining gives knowledge, tuning gives behaviour. Your product adds fresh, company-specific knowledge at question time.',
  },

  17: {
    intro: 'A prompt is not a magic phrase. It is a product specification the model reads on every request.',
    objectives: [
      'Structure a prompt with role, task, context, examples, constraints and output format.',
      'Treat prompts as versioned product assets with test cases.',
      'Write a prompt template for a capstone feature.',
    ],
    parts: [
      {
        id: 'anatomy',
        title: 'The anatomy of a good prompt',
        table: {
          head: ['Part', 'What it does', 'Example (support assistant)'],
          rows: [
            ['Role', 'Sets who the model is', '“You are a support assistant for an online store.”'],
            ['Task', 'States the job clearly', '“Answer the customer’s question about their order.”'],
            ['Context', 'Gives the facts it needs', 'Order details and the relevant policy text.'],
            ['Examples', 'Shows a good answer', 'One sample question with an ideal reply.'],
            ['Constraints', 'Sets limits', '“Only use the policy text. If unsure, offer a human agent.”'],
            ['Output format', 'Defines the shape', '“Reply in under 80 words, in the customer’s language.”'],
          ],
        },
      },
      {
        id: 'product-asset',
        title: 'Prompts are product assets',
        bullets: [
          { term: 'Templates', text: 'Real prompts have fixed instructions plus slots filled at runtime, such as {customer_question} and {policy_text}.' },
          { term: 'Version them', text: 'A one-word change can shift behaviour for every user. Keep versions and a change log, like code.' },
          { term: 'Test them', text: 'Keep a set of test inputs, including tricky ones, and check outputs before every change.' },
          { term: 'Separate instructions from user input', text: 'Users may write “ignore your instructions”. Mark user text clearly and tell the model to treat it as data.' },
        ],
      },
      {
        id: 'mistakes',
        title: 'Common prompt mistakes',
        cards: [
          { title: 'Vague task', text: '“Help the user” gives the model no target.', note: 'Say exactly what a good answer contains.', noteLabel: 'Fix' },
          { title: 'Missing context', text: 'Asking about a policy without giving the policy invites made-up answers.', note: 'Provide the facts in the prompt.', noteLabel: 'Fix' },
          { title: 'No fallback', text: 'The model always answers, even when it shouldn’t.', note: 'Tell it what to do when unsure.', noteLabel: 'Fix' },
          { title: 'Untested change', text: 'A tweak fixes one case and breaks five others.', note: 'Run the test set before shipping.', noteLabel: 'Fix' },
        ],
        cardCols: 2,
      },
    ],
    quiz: {
      title: 'Which part of the prompt is missing?',
      options: ['Context', 'Constraints', 'Output format', 'Examples'],
      questions: [
        { q: 'The assistant answers questions about leave policy, but the policy text is never included.', answer: 0, why: 'Without the facts, the model will guess.' },
        { q: 'Replies come back as long essays when the app can only show two lines.', answer: 2, why: 'Define the length and shape of the output.' },
        { q: 'The assistant gives medical advice, which the company doesn’t allow.', answer: 1, why: 'State what the model must not do and what to do instead.' },
        { q: 'Each reply uses a different tone and structure, even though you have a house style.', answer: 3, why: 'A sample of an ideal answer shows the style better than a description.' },
      ],
    },
    exercise: {
      title: 'Write a prompt template for your capstone',
      intro: 'Write the prompt template for your capstone’s main feature, with slots for runtime inputs, plus three test cases.',
      capstone: true,
      fields: [
        { key: 'prompt', label: 'Your prompt template (role, task, context slots, constraints, output format)', rows: 8, placeholder: 'You are… Answer the employee’s {question} using only {retrieved_documents}…' },
        { key: 'normal', label: 'Test case 1: a normal question and what a good answer looks like', rows: 2 },
        { key: 'edge', label: 'Test case 2: a question the documents can’t answer, and the expected behaviour', rows: 2 },
        { key: 'attack', label: 'Test case 3: a user trying to override the instructions, and the expected behaviour', rows: 2 },
      ],
      rubric: 'Check that the template includes role, task, clearly marked context slots, constraints including a fallback when unsure, and an output format; that user input is separated from instructions; and that the three test cases cover a normal case, an unanswerable case, and a prompt-injection attempt with sensible expected behaviour.',
      button: 'Review my prompt',
    },
    completion: [
      'I can name the six parts of a prompt.',
      'I understand why prompts need versions and tests.',
      'I completed the four questions.',
      'I wrote a prompt template with three test cases.',
    ],
    takeaway: 'a prompt is a product spec. Give it structure, context and a fallback, and test it like code.',
  },

  18: {
    intro: 'Ask an LLM the same question twice and you may get two different answers. Today you learn why, and how to control it.',
    objectives: [
      'Explain what temperature does in plain language.',
      'Choose generation settings for creative vs factual features.',
      'Set realistic expectations for repeatability.',
    ],
    parts: [
      {
        id: 'sampling',
        title: 'How the model picks the next word',
        paragraphs: [
          'At each step, the model has a list of possible next tokens with probabilities. Sampling is how it picks one. Always picking the most likely token gives safe, repetitive text; picking more freely gives varied, creative text.',
        ],
        cards: [
          { title: 'Low temperature (around 0–0.3)', text: 'Picks the most likely tokens. More focused and consistent.', example: 'Data extraction, classification, factual answers, code.' },
          { title: 'High temperature (around 0.7–1.0)', text: 'Picks less likely tokens more often. More varied and creative, and more likely to drift.', example: 'Brainstorming, marketing taglines, story ideas.' },
        ],
        cardCols: 2,
      },
      {
        id: 'repeatability',
        title: 'Repeatability is not guaranteed',
        bullets: [
          { text: 'Even at temperature 0, outputs can vary slightly because of how models run on servers.' },
          { text: 'A provider updating the model version can change answers overnight. Pin a specific model version where you can.' },
          { text: 'Changing the prompt, the retrieved documents or the conversation history changes the answer.' },
        ],
        callout: { tone: 'amber', label: 'Product implication', text: 'If users or auditors need the exact same answer later, store the answer you showed. Don’t rely on regenerating it.' },
      },
      {
        id: 'other-settings',
        title: 'Other settings worth knowing',
        table: {
          head: ['Setting', 'What it controls', 'PM use'],
          rows: [
            ['Max output tokens', 'The longest reply allowed', 'Controls cost and keeps replies short.'],
            ['Top-p', 'How many likely options are considered', 'Usually left at default; adjust temperature instead.'],
            ['Stop sequences', 'Where the model stops writing', 'Keeps output to the format you need.'],
            ['Model version', 'Which exact model runs', 'Pin it so behaviour doesn’t change without testing.'],
          ],
        },
      },
    ],
    quiz: {
      title: 'Low or high temperature?',
      options: ['Low temperature', 'High temperature'],
      questions: [
        { q: 'Extract the invoice number and amount from a PDF.', answer: 0, why: 'You want the same correct answer every time.' },
        { q: 'Suggest ten different names for a new snack brand.', answer: 1, why: 'Variety is the goal.' },
        { q: 'Answer an employee’s question about the leave policy.', answer: 0, why: 'Factual answers should be consistent and grounded.' },
        { q: 'Write five different versions of a LinkedIn post for A/B testing.', answer: 1, why: 'You want the versions to differ.' },
      ],
    },
    exercise: {
      title: 'Specify generation settings',
      intro: 'Write the generation settings for two features of your capstone, and the repeatability promise you would make to users or stakeholders.',
      capstone: true,
      fields: [
        { key: 'feature1', label: 'Feature 1, its temperature, max length, and why', rows: 2, placeholder: 'e.g. Policy answers: temperature 0.1, max 300 tokens, because…' },
        { key: 'feature2', label: 'Feature 2, its temperature, max length, and why', rows: 2 },
        { key: 'version', label: 'How will you handle model version updates?', rows: 2 },
        { key: 'promise', label: 'What will you promise about getting the same answer twice?', rows: 2 },
      ],
      rubric: 'Check that temperature matches the task (low for factual or extraction, higher for creative), max length is justified by the interface and cost, model versions are pinned and tested before upgrades, and the repeatability promise is honest (stored answers rather than guaranteed regeneration).',
      button: 'Review my settings',
    },
    completion: [
      'I can explain temperature in plain language.',
      'I know why outputs can vary even at temperature 0.',
      'I completed the four questions.',
      'I specified settings for two capstone features.',
    ],
    takeaway: 'use low temperature for facts and higher for ideas, pin model versions, and store important answers instead of hoping to regenerate them.',
  },

  19: {
    intro: 'Your product talks to an LLM through an API. Knowing its shape helps you write better requirements.',
    objectives: [
      'Describe what goes into an LLM API request and what comes back.',
      'Explain why structured outputs (JSON) matter for products.',
      'Write failure-handling requirements for errors, limits and timeouts.',
    ],
    parts: [
      {
        id: 'request',
        title: 'Anatomy of an API call',
        table: {
          head: ['In the request', 'In the response'],
          rows: [
            ['Model name and version', 'The generated text or structured data'],
            ['System instructions and messages', 'Why it stopped (finished, hit the length limit, or blocked)'],
            ['Settings such as temperature and max tokens', 'Token counts for input and output, which drive cost'],
            ['Optional: tools and an output schema', 'Optional: tool calls the model wants to make'],
          ],
        },
      },
      {
        id: 'structured',
        title: 'Structured outputs',
        paragraphs: [
          'Free text is fine for a chat bubble, but most product features need data your code can use: a category, a score, a list of items. Asking the model for JSON that matches a schema turns its answer into reliable fields.',
        ],
        callout: { label: 'Example', text: 'Instead of “The ticket seems to be about billing and is urgent”, the model returns {"category": "billing", "urgency": "high", "summary": "Charged twice"}. Your app can route it automatically.' },
        quote: 'Even with a schema, validate the output. Check required fields exist and values are allowed before your app acts on them.',
      },
      {
        id: 'failures',
        title: 'Things that go wrong',
        cards: [
          { title: 'Rate limits', text: 'Too many requests per minute and the provider rejects some.', note: 'Retry with a short wait; queue non-urgent work.', noteLabel: 'Requirement' },
          { title: 'Timeouts', text: 'Long requests can take too long or hang.', note: 'Set a time limit and show a friendly message.', noteLabel: 'Requirement' },
          { title: 'Cut-off output', text: 'The reply hits the max token limit mid-sentence.', note: 'Detect the “length” stop reason and handle it.', noteLabel: 'Requirement' },
          { title: 'Invalid output', text: 'JSON is missing a field or has a wrong value.', note: 'Validate, retry once, then fall back.', noteLabel: 'Requirement' },
        ],
        cardCols: 2,
      },
    ],
    quiz: {
      title: 'What should the product do?',
      questions: [
        { q: 'A ticket-routing feature needs a category your code can use. What should you ask the model for?', options: ['A friendly paragraph', 'JSON with a category field from a fixed list', 'A longer system prompt'], answer: 1, why: 'Structured output gives your code a reliable field to act on.' },
        { q: 'The provider returns a “rate limit” error during a traffic spike.', options: ['Show a crash screen', 'Retry after a short wait and queue non-urgent work', 'Switch temperature to 0'], answer: 1, why: 'Rate limits are temporary; retry with backoff and queue what can wait.' },
        { q: 'A summary stops mid-sentence and the stop reason says “length”.', options: ['The model refused', 'It hit the max output tokens', 'The prompt was too short'], answer: 1, why: 'The reply was cut off at the token limit.' },
        { q: 'The model returns {"urgency": "super-high"} but your app only allows low, medium, high.', options: ['Accept it', 'Validate, then retry or fall back to a safe default', 'Ignore the urgency'], answer: 1, why: 'Never act on unvalidated values.' },
      ],
    },
    exercise: {
      title: 'Draft an output schema and failure rules',
      intro: 'For one capstone feature, write the JSON output you need and what the product does when things go wrong.',
      capstone: true,
      fields: [
        { key: 'feature', label: 'The feature and what the app does with the output', rows: 2 },
        { key: 'schema', label: 'Your JSON output schema (fields, types, allowed values)', rows: 6, placeholder: '{ "answer": string, "sources": [string], "confidence": "high" | "low" }' },
        { key: 'validation', label: 'How you validate it before using it', rows: 2 },
        { key: 'failures', label: 'What happens on rate limits, timeouts, cut-off or invalid output', rows: 3 },
      ],
      rubric: 'Check that the schema has clear fields, types and allowed values that match what the app needs (for the knowledge assistant, ideally an answer, its sources, and a way to say “not found”); that validation checks required fields and allowed values; and that each failure type has a specific user-facing behaviour and retry or fallback rule.',
      button: 'Review my schema',
    },
    completion: [
      'I know what goes into an API request and response.',
      'I can explain why structured outputs matter.',
      'I completed the four questions.',
      'I wrote a schema and failure rules for my capstone.',
    ],
    takeaway: 'ask for structured output, validate it before acting, and design for rate limits, timeouts and cut-off replies from the start.',
  },

  20: {
    intro: 'LLMs can do more than talk. With tool calling, they can ask your system to look things up or take actions.',
    objectives: [
      'Explain how tool (function) calling works step by step.',
      'Explain why application code, not the model, must check permissions.',
      'Draw a tool-call sequence with validation and confirmation steps.',
    ],
    parts: [
      {
        id: 'how',
        title: 'How tool calling works',
        bullets: [
          { term: '1. You describe tools', text: 'Your app tells the model which tools exist, such as get_order_status(order_id) or create_ticket(summary).' },
          { term: '2. The model asks', text: 'When useful, the model replies with a request: “call get_order_status with order_id 4521”.' },
          { term: '3. Your code decides', text: 'Your application checks the request, runs the tool if allowed, and sends the result back.' },
          { term: '4. The model answers', text: 'It uses the tool’s result to write the final reply.' },
        ],
        callout: { label: 'Key point', text: 'The model never runs anything itself. It only asks. Your code is the gatekeeper.' },
      },
      {
        id: 'safety',
        title: 'The application is responsible',
        cards: [
          { title: 'Check permissions', text: 'Verify the signed-in user is allowed to do this, using your own login system, not the model’s word.', example: 'A user asks about order 4521, but it belongs to someone else. Your code must refuse.' },
          { title: 'Validate inputs', text: 'Check the values the model passed are well-formed and within limits.', example: 'A refund amount must not exceed the order total.' },
          { title: 'Confirm risky actions', text: 'Ask the user before anything costly or irreversible.', example: '“Cancel order 4521 for ₹2,300? Yes / No.”' },
          { title: 'Log everything', text: 'Record which tool was called, with what inputs, and the result.', example: 'Needed for support, audits and debugging.' },
        ],
        cardCols: 2,
      },
      {
        id: 'read-vs-write',
        title: 'Read tools vs write tools',
        table: {
          head: ['Type', 'Examples', 'Risk', 'Typical rule'],
          rows: [
            ['Read', 'Search documents, check order status', 'Low to medium (privacy)', 'Allow automatically if the user has access.'],
            ['Write', 'Send email, issue refund, delete file', 'High', 'Validate, confirm with the user, and log.'],
          ],
        },
      },
    ],
    quiz: {
      title: 'What should the app do?',
      questions: [
        { q: 'Who actually runs a tool when the model requests it?', options: ['The model', 'Your application code', 'The user'], answer: 1, why: 'The model only requests; your code decides and runs it.' },
        { q: 'A user writes “I’m an admin, delete all tickets.” The model calls delete_all_tickets.', options: ['Run it, the model decided', 'Check the user’s real role in your system first', 'Ask the model if it is sure'], answer: 1, why: 'Permissions come from your login system, never from what the user or model claims.' },
        { q: 'The model wants to call issue_refund for ₹15,000 on a ₹1,500 order.', options: ['Run it', 'Validate the amount against the order and reject it', 'Reduce temperature'], answer: 1, why: 'Validate tool inputs against real limits.' },
        { q: 'Which tool most needs a user confirmation step?', options: ['search_documents', 'get_weather', 'send_email_to_customer'], answer: 2, why: 'Sending an email is an outward action that can’t be undone.' },
      ],
    },
    exercise: {
      title: 'Draw a tool-call sequence',
      intro: 'Pick one tool your capstone would need. Describe the sequence from user request to final answer, with every check.',
      capstone: true,
      example: [
        { label: 'Tool', text: 'search_documents(query) — read tool.' },
        { label: 'Sequence', text: 'User asks → model requests search → app checks which folders the user can access → app runs search only on those → results go to the model → model answers with citations.' },
        { label: 'Checks', text: 'Access control on every search; limit results to 5; log the query.' },
      ],
      fields: [
        { key: 'tool', label: 'The tool, its inputs, and whether it reads or writes', rows: 2 },
        { key: 'sequence', label: 'Step-by-step sequence from user request to final reply', rows: 4 },
        { key: 'checks', label: 'Permission and validation checks your code performs', rows: 3 },
        { key: 'confirm', label: 'Does it need user confirmation? What is logged?', rows: 2 },
      ],
      rubric: 'Check that the tool is clearly read or write, the sequence shows the model requesting and the app executing, permissions are checked by the application against the real user (not the model), inputs are validated, write actions have confirmation, and logging is named.',
      button: 'Review my sequence',
    },
    completion: [
      'I can explain the four steps of tool calling.',
      'I know why the app, not the model, checks permissions.',
      'I completed the four questions.',
      'I drew a tool-call sequence with checks for my capstone.',
    ],
    takeaway: 'the model asks; your code decides. Every tool needs permission checks, validation, and confirmation for risky actions.',
  },

  21: {
    intro: 'Keyword search fails when users use different words from your documents. Embeddings search by meaning instead.',
    objectives: [
      'Explain embeddings and semantic similarity in plain language.',
      'Explain chunking and why it matters.',
      'Predict common retrieval failures before they reach users.',
    ],
    parts: [
      {
        id: 'embeddings',
        title: 'Embeddings: meaning as coordinates',
        paragraphs: [
          'An embedding model turns text into a list of numbers that represents its meaning. Texts with similar meanings get similar numbers, like points that sit close together on a map.',
          '“How many leaves do I get?” and “annual holiday allowance” share no words, but their embeddings are close, so semantic search finds the right policy.',
        ],
      },
      {
        id: 'flow',
        title: 'How semantic search works',
        bullets: [
          { term: '1. Chunk', text: 'Split documents into passages, for example a few paragraphs each.' },
          { term: '2. Embed', text: 'Turn each chunk into an embedding and store it in a vector database.' },
          { term: '3. Query', text: 'Embed the user’s question the same way.' },
          { term: '4. Match', text: 'Find the chunks whose embeddings are closest to the question, and return the top few.' },
        ],
        callout: { label: 'Chunking matters', text: 'Chunks too small lose context (“see the table above”); too large mix several topics and dilute the match. Good chunking often follows headings and sections.' },
      },
      {
        id: 'failures',
        title: 'Where retrieval fails',
        cards: [
          { title: 'Exact terms', text: 'Embeddings can miss exact codes, names or numbers, such as “Form 16” or “SKU-4471”.', note: 'Combine with keyword search (hybrid search).', noteLabel: 'Fix' },
          { title: 'Outdated duplicates', text: 'An old and a new version of a policy both match.', note: 'Remove old versions or prefer newer dates.', noteLabel: 'Fix' },
          { title: 'Answer split across chunks', text: 'The question needs facts from two places.', note: 'Better chunking, or retrieve more chunks.', noteLabel: 'Fix' },
          { title: 'No good match', text: 'The answer isn’t in the documents, but something vaguely similar is returned.', note: 'Set a similarity threshold and say “not found”.', noteLabel: 'Fix' },
        ],
        cardCols: 2,
      },
    ],
    quiz: {
      title: 'Diagnose the retrieval problem',
      options: ['Exact-term miss', 'Outdated duplicate', 'Bad chunking', 'No good match'],
      questions: [
        { q: 'A user searches “GST code 998314” and semantic search returns general tax pages.', answer: 0, why: 'Exact codes are better matched by keyword search.' },
        { q: 'The assistant quotes the 2022 travel policy instead of the 2025 one.', answer: 1, why: 'Both versions were indexed and the old one matched.' },
        { q: 'A retrieved chunk says “the limits in the table above apply”, but the table is in a different chunk.', answer: 2, why: 'The split cut the context in two.' },
        { q: 'An employee asks about a benefit the company doesn’t offer, and gets a loosely related passage.', answer: 3, why: 'Nothing relevant existed, but search still returned the closest text.' },
      ],
    },
    exercise: {
      title: 'Sketch your retrieval flow',
      intro: 'Sketch how your capstone will find the right passages, and the failures you expect.',
      capstone: true,
      fields: [
        { key: 'sources', label: 'What gets indexed, and how you will chunk it', rows: 2 },
        { key: 'search', label: 'Search type (semantic, keyword, or hybrid) and why', rows: 2 },
        { key: 'failures', label: 'Three retrieval failures you expect with your documents', rows: 3 },
        { key: 'fixes', label: 'How you will detect or reduce each one', rows: 3 },
      ],
      rubric: 'Check that chunking follows document structure, the search choice is justified (hybrid when exact terms matter), the failures are specific to their documents (duplicates, exact terms, split answers, no match), and each has a practical fix or detection method such as a similarity threshold, version filtering, or hybrid search.',
      button: 'Review my retrieval flow',
    },
    completion: [
      'I can explain embeddings in plain language.',
      'I know why chunking matters.',
      'I completed the four questions.',
      'I sketched a retrieval flow and its failure modes.',
    ],
    takeaway: 'semantic search finds meaning, not words. Plan for exact terms, stale duplicates and “not found” from day one.',
  },

  22: {
    intro: 'Today you combine retrieval and generation into the architecture behind most enterprise AI assistants, including your capstone.',
    objectives: [
      'Describe each stage of a RAG system.',
      'Explain why citations matter for trust.',
      'Draw a RAG architecture for your capstone.',
    ],
    parts: [
      {
        id: 'pipeline',
        title: 'The RAG pipeline',
        paragraphs: ['Retrieval-augmented generation (RAG) means: find relevant passages first, then ask the LLM to answer using only those passages.'],
        table: {
          head: ['Stage', 'What happens', 'When it runs'],
          rows: [
            ['Ingestion', 'Collect documents, clean them, record owner and date', 'When documents change'],
            ['Chunking and indexing', 'Split, embed and store in a search index', 'When documents change'],
            ['Retrieval', 'Find the best passages for the question (respecting access rights)', 'Every question'],
            ['Context assembly', 'Put instructions, passages and question into the prompt', 'Every question'],
            ['Generation', 'The LLM writes an answer from the passages', 'Every question'],
            ['Citations', 'Show which passages support the answer', 'Every question'],
          ],
        },
      },
      {
        id: 'why',
        title: 'Why RAG is the default for company knowledge',
        bullets: [
          { term: 'Fresh', text: 'Update a document and the next answer uses it; no retraining.' },
          { term: 'Grounded', text: 'The model answers from real text, so hallucinations drop.' },
          { term: 'Checkable', text: 'Citations let users verify answers and build trust.' },
          { term: 'Access-aware', text: 'Retrieval can respect who is allowed to see which document.' },
        ],
        callout: { tone: 'amber', label: 'RAG is not magic', text: 'If retrieval finds the wrong passage, the model will confidently answer from the wrong passage. Most RAG quality problems are retrieval problems.' },
      },
      {
        id: 'design',
        title: 'Product decisions in a RAG system',
        cards: [
          { title: 'What if nothing relevant is found?', text: 'Say so clearly and suggest who to ask, rather than guessing.' },
          { title: 'How are citations shown?', text: 'Link each claim to a source with its title and date, so users can click through.' },
          { title: 'Who owns the documents?', text: 'Every source needs an owner who keeps it current. Stale documents mean stale answers.' },
        ],
        cardCols: 3,
      },
    ],
    quiz: {
      title: 'Which stage is responsible?',
      options: ['Ingestion', 'Retrieval', 'Generation', 'Citations'],
      questions: [
        { q: 'Scanned PDFs were added as images, so their text can never be found.', answer: 0, why: 'Text should be extracted when documents are collected and cleaned.' },
        { q: 'The right policy exists, but the system fetched an unrelated passage.', answer: 1, why: 'Finding the right passage is retrieval’s job.' },
        { q: 'The passages were right, but the answer added a detail they don’t contain.', answer: 2, why: 'The model went beyond its sources while writing the answer.' },
        { q: 'Users can’t tell which document an answer came from, so they don’t trust it.', answer: 3, why: 'Showing sources builds trust and lets users check.' },
      ],
    },
    exercise: {
      title: 'Design your capstone’s RAG architecture',
      intro: 'Describe each stage of your capstone’s RAG system in a sentence or two, as if presenting to your engineering lead.',
      capstone: true,
      fields: [
        { key: 'ingestion', label: 'Ingestion and indexing: sources, update frequency, owners', rows: 3 },
        { key: 'retrieval', label: 'Retrieval: search type, number of passages, access control', rows: 3 },
        { key: 'generation', label: 'Context and generation: key prompt instructions', rows: 3 },
        { key: 'ux', label: 'Citations and “not found” behaviour', rows: 2 },
      ],
      rubric: 'Check that ingestion names sources, owners and update cadence; retrieval respects document permissions and names the search type; generation instructs the model to answer only from passages and admit gaps; citations link to sources with dates; and “not found” is handled honestly.',
      button: 'Review my RAG design',
    },
    completion: [
      'I can name the six RAG stages.',
      'I can explain why most RAG problems are retrieval problems.',
      'I completed the four questions.',
      'I designed the RAG architecture for my capstone.',
    ],
    takeaway: 'RAG grounds answers in your real documents. Its quality depends most on ingestion and retrieval, and its trust on citations.',
  },

  23: {
    intro: 'Prompting, RAG and fine-tuning solve different problems. Choosing the wrong one wastes months.',
    objectives: [
      'Explain what prompting, RAG and fine-tuning each change.',
      'Choose an approach based on freshness, behaviour, data, cost and evaluation.',
      'Fill in a decision matrix for real scenarios.',
    ],
    parts: [
      {
        id: 'three',
        title: 'Three tools, three jobs',
        cards: [
          { title: 'Prompting', text: 'Change the instructions and examples you send.', example: 'Best first step for tone, format and task clarity. Fast and cheap to change.', note: 'Is the model failing because it wasn’t told clearly?' },
          { title: 'RAG', text: 'Give the model the right facts at question time.', example: 'Best for knowledge that is private, large, or changes often.', note: 'Is the model failing because it lacks the facts?' },
          { title: 'Fine-tuning', text: 'Train the model further on your examples.', example: 'Best for consistent behaviour, style or a narrow task at scale, once prompting is not enough.', note: 'Do we have hundreds of good examples and a way to evaluate?' },
        ],
        cardCols: 3,
      },
      {
        id: 'matrix',
        title: 'The decision matrix',
        table: {
          head: ['Need', 'Prompting', 'RAG', 'Fine-tuning'],
          rows: [
            ['Fresh or changing facts', 'Weak', 'Strong', 'Weak (facts go stale)'],
            ['Consistent style or format', 'Good', 'No effect', 'Strong'],
            ['Cost and speed to start', 'Lowest', 'Medium', 'Highest'],
            ['Data needed', 'A few examples', 'Your documents', 'Hundreds or thousands of labelled examples'],
            ['Citations and traceability', 'No', 'Yes', 'No'],
          ],
        },
        quote: 'The usual order: start with prompting, add RAG when facts are missing, and consider fine-tuning only when you have clear evidence and good examples. They also combine.',
      },
    ],
    quiz: {
      title: 'Which approach first?',
      options: ['Better prompting', 'RAG', 'Fine-tuning'],
      questions: [
        { q: 'An HR assistant must answer from 300 policy documents that change every quarter.', answer: 1, why: 'Large, changing, private knowledge belongs in retrieval.' },
        { q: 'Replies are correct but too long and too formal for your brand.', answer: 0, why: 'Tone and length are instruction problems; fix the prompt first.' },
        { q: 'After months of prompt work, a high-volume classifier is still inconsistent, and you have 20,000 labelled examples.', answer: 2, why: 'With lots of good examples and a narrow task, fine-tuning can add consistency.' },
        { q: 'Users need to see which contract clause an answer came from.', answer: 1, why: 'RAG can cite the passages it used.' },
      ],
    },
    exercise: {
      title: 'Complete a decision matrix',
      intro: 'For three scenarios, one from your capstone, choose prompting, RAG, fine-tuning, or a combination, and justify it.',
      capstone: true,
      fields: [
        { key: 's1', label: 'Scenario 1: problem, choice, and why', rows: 3 },
        { key: 's2', label: 'Scenario 2: problem, choice, and why', rows: 3 },
        { key: 's3', label: 'Capstone scenario: problem, choice, and why', rows: 3 },
        { key: 'evidence', label: 'What evidence would make you switch approach?', rows: 2 },
      ],
      rubric: 'Check that each choice matches the failure type (instructions → prompting, missing or changing facts → RAG, consistent behaviour with many examples → fine-tuning), that cheaper options are tried first, combinations are used where sensible, and the switching evidence is measurable.',
      button: 'Review my matrix',
    },
    completion: [
      'I can explain what prompting, RAG and fine-tuning each change.',
      'I know the usual order to try them in.',
      'I completed the four questions.',
      'I completed a decision matrix for three scenarios.',
    ],
    takeaway: 'diagnose the failure first: unclear instructions need prompting, missing facts need RAG, and inconsistent behaviour with lots of examples may need fine-tuning.',
  },

  24: {
    intro: 'Agents are the most hyped idea in AI. A PM needs to know when an agent helps and when a simple workflow is better.',
    objectives: [
      'Distinguish a fixed workflow from an agentic loop.',
      'Choose between them based on predictability, risk and cost.',
      'Recognise what multimodal models add (images, audio, documents).',
    ],
    parts: [
      {
        id: 'workflow-agent',
        title: 'Workflow vs agent',
        cards: [
          { title: 'Workflow', text: 'Your code fixes the steps in advance; the LLM handles some of them.', example: 'Classify ticket → retrieve policy → draft reply → human approves.', note: 'Predictable, testable, cheaper. The right default.', noteLabel: 'Trade-off' },
          { title: 'Agent', text: 'The LLM decides which step to take next, uses tools, checks results, and loops until done.', example: '“Research these 5 vendors and compare pricing” — it chooses which pages to read and when to stop.', note: 'Flexible for open-ended tasks, but slower, costlier and harder to test.', noteLabel: 'Trade-off' },
        ],
        cardCols: 2,
        quote: 'Start with the simplest workflow that works. Add agentic steps only where the path truly can’t be known in advance.',
      },
      {
        id: 'boundaries',
        title: 'Setting tool boundaries for agents',
        bullets: [
          { term: 'Least privilege', text: 'Give the agent only the tools it needs, with the user’s own permissions.' },
          { term: 'Step and cost limits', text: 'Cap the number of steps and spending so loops can’t run forever.' },
          { term: 'Human checkpoints', text: 'Require approval before outward or irreversible actions.' },
          { term: 'Visible progress', text: 'Show users what the agent is doing so they can stop it.' },
        ],
      },
      {
        id: 'multimodal',
        title: 'Multimodal AI',
        table: {
          head: ['Input', 'What it enables', 'Watch out for'],
          rows: [
            ['Images and screenshots', 'Read receipts, inspect damage photos, describe UI bugs', 'Misreading small text; privacy of faces and IDs'],
            ['Audio', 'Voice assistants, call summaries, transcription', 'Accents and noise; consent to record'],
            ['Documents (PDF, tables)', 'Answer questions over forms and reports', 'Complex tables and scanned pages'],
          ],
        },
      },
    ],
    quiz: {
      title: 'Workflow or agent?',
      options: ['Fixed workflow', 'Agent'],
      questions: [
        { q: 'Every expense claim goes through: extract fields → check policy → flag exceptions → manager approves.', answer: 0, why: 'The steps are known in advance, so fix them.' },
        { q: 'Investigate why sign-ups dropped last week, exploring whichever dashboards and logs seem relevant.', answer: 1, why: 'The path depends on what it finds along the way.' },
        { q: 'Send a welcome email to each new employee with their manager’s name.', answer: 0, why: 'A simple fixed sequence is enough.' },
        { q: 'Plan a multi-city business trip within a budget, checking flights and hotels until a good option is found.', answer: 1, why: 'Open-ended search with many choices fits an agent, with a human approving the booking.' },
      ],
    },
    exercise: {
      title: 'Choose workflow or agent for your capstone',
      intro: 'Pick one use case in your capstone. Decide between a workflow and an agent, and set the tool boundaries.',
      capstone: true,
      fields: [
        { key: 'usecase', label: 'The use case', rows: 2 },
        { key: 'choice', label: 'Your choice', choices: ['Fixed workflow', 'Agent', 'Workflow with one agentic step'] },
        { key: 'why', label: 'Why, considering predictability, risk and cost', rows: 3 },
        { key: 'boundaries', label: 'Tools allowed, limits, and human checkpoints', rows: 3 },
      ],
      rubric: 'Check that the choice fits how predictable the steps are, that a workflow is preferred unless the path is truly open-ended, and that boundaries cover least-privilege tools, step or cost limits, and human approval for risky actions.',
      button: 'Review my choice',
    },
    completion: [
      'I can explain workflow vs agent with examples.',
      'I can name four tool boundaries for agents.',
      'I completed the four questions.',
      'I chose workflow or agent for a capstone use case.',
    ],
    takeaway: 'default to a predictable workflow. Use an agent only where the path can’t be known in advance, and fence it with limits and checkpoints.',
  },

  25: {
    intro: 'This is Gate 2. Today you choose the model and architecture for your capstone and write it down as a decision record.',
    objectives: [
      'Compare models on quality, latency, cost, privacy, context length, deployment and vendor risk.',
      'Write a model and architecture decision record.',
      'Confirm you are ready for Phase 3 (discovery and product definition).',
    ],
    parts: [
      {
        id: 'criteria',
        title: 'Seven criteria for choosing a model',
        table: {
          head: ['Criterion', 'Question to ask'],
          rows: [
            ['Quality', 'Does it answer our real test questions well?'],
            ['Latency', 'Is it fast enough for the interaction (chat vs background job)?'],
            ['Cost', 'What is the cost per request and per active user per month?'],
            ['Privacy and compliance', 'Where is data processed, is it stored, and is it used for training?'],
            ['Context length', 'Does our largest prompt fit comfortably?'],
            ['Deployment', 'API, cloud platform, or self-hosted open model?'],
            ['Vendor risk', 'What if prices change, the model is retired, or the provider has an outage?'],
          ],
        },
        callout: { label: 'Tip', text: 'Many products use more than one model: a small, fast one for simple steps and a stronger one for hard questions.' },
      },
      {
        id: 'recap',
        title: 'Phase 2 in one page',
        bullets: [
          { term: 'LLMs (Days 15–16)', text: 'Next-token predictors with a knowledge cutoff; fluent is not the same as true.' },
          { term: 'Prompts and settings (Days 17–18)', text: 'Prompts are versioned specs; low temperature for facts.' },
          { term: 'APIs and tools (Days 19–20)', text: 'Structured, validated outputs; the app checks every tool call.' },
          { term: 'Retrieval and RAG (Days 21–22)', text: 'Ground answers in your documents with citations.' },
          { term: 'Choosing approaches (Days 23–24)', text: 'Prompting, then RAG, then fine-tuning; workflow before agent.' },
        ],
      },
    ],
    quiz: {
      title: 'Phase 2 self-check',
      questions: [
        { q: 'An assistant confidently invents a policy. Which fix addresses the root cause?', options: ['Raise temperature', 'Ground answers in retrieved policy text', 'Fine-tune on chat logs'], answer: 1, why: 'Hallucinated facts are fixed by giving the model the real facts (Days 15, 22).' },
        { q: 'Which part of a system must enforce permissions on tool calls?', options: ['The model', 'The application code', 'The prompt'], answer: 1, why: 'The model only requests; the app decides (Day 20).' },
        { q: 'You need answers from documents that change monthly. What is the default approach?', options: ['Fine-tuning', 'RAG', 'Higher temperature'], answer: 1, why: 'Changing knowledge belongs in retrieval (Day 23).' },
        { q: 'A semantic search misses exact product codes. What helps?', options: ['Hybrid search with keywords', 'Smaller chunks only', 'A longer prompt'], answer: 0, why: 'Keyword search catches exact terms (Day 21).' },
        { q: 'A fixed four-step expense approval process. Workflow or agent?', options: ['Workflow', 'Agent'], answer: 0, why: 'Known steps should be fixed (Day 24).' },
        { q: 'Your provider retires the model you built on. Which criterion covers this risk?', options: ['Latency', 'Vendor risk', 'Context length'], answer: 1, why: 'Plan for model retirement and outages (Day 25).' },
      ],
    },
    exercise: {
      title: 'Submit your model and architecture decision record',
      intro: 'Write the decision record for your capstone: what you chose, what you compared, and why. A stakeholder should be able to approve it.',
      capstone: true,
      fields: [
        { key: 'architecture', label: 'Architecture summary (e.g. RAG workflow with hybrid search)', rows: 3 },
        { key: 'model', label: 'Model choice, and the alternative you compared', rows: 2 },
        { key: 'criteria', label: 'How they compare on quality, latency, cost and privacy', rows: 4 },
        { key: 'risks', label: 'Vendor risk and fallback plan', rows: 2 },
        { key: 'revisit', label: 'What evidence would make you revisit this decision?', rows: 2 },
      ],
      rubric: 'This is a gate review. Check that the architecture fits the capstone (grounded retrieval, workflow before agent), the model choice compares at least two options on quality, latency, cost and privacy with concrete reasons, vendor risk has a fallback, and revisit triggers are measurable. Say clearly whether they look ready for Phase 3, and which day to revisit if not.',
      button: 'Review my decision record',
    },
    completion: [
      'I scored at least 5 of 6 on the self-check, or revisited the days I missed.',
      'I compared at least two models on the seven criteria.',
      'I submitted my model and architecture decision record.',
      'I ticked the Phase 2 checklist honestly.',
    ],
    takeaway: 'a model choice is a product decision with trade-offs. Write it down, compare real options, and plan for the day the vendor changes.',
  },
};
