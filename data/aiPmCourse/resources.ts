// PM → AI PM: reading, videos and sources. `url` is left out when no reliable link was found.

export interface AiPmResource {
  title: string;
  by: string;
  url?: string;
  note?: string;
}

export const AI_PM_RESOURCES: Record<string, AiPmResource> = {
  // Core reading
  lenny_evals_podcast: { title: 'Why AI evals are the hottest new skill for product builders', by: 'Hamel Husain and Shreya Shankar, Lenny’s Podcast', url: 'https://www.lennysnewsletter.com/p/why-ai-evals-are-the-hottest-new-skill' },
  lenny_ai_lifecycle: { title: 'Why your AI product needs a different development lifecycle', by: 'Lenny’s Newsletter', url: 'https://www.lennysnewsletter.com/p/why-your-ai-product-needs-a-different' },
  anthropic_agents: { title: 'Building effective agents', by: 'Anthropic', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
  openai_accuracy: { title: 'Optimizing LLM Accuracy', by: 'OpenAI', url: 'https://developers.openai.com/api/docs/guides/optimizing-llm-accuracy' },
  pair_errors: { title: 'Errors + Graceful Failure', by: 'Google PAIR', url: 'https://pair.withgoogle.com/chapter/errors-failing/' },
  hamel_evals_faq: { title: 'AI Evals FAQ', by: 'Hamel Husain and Shreya Shankar', url: 'https://hamel.dev/blog/posts/evals-faq/' },
  hax_guidelines: { title: 'Guidelines for Human-AI Interaction', by: 'Microsoft HAX Toolkit', url: 'https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/' },
  rules_of_ml: { title: 'Rules of Machine Learning', by: 'Google', url: 'https://developers.google.com/machine-learning/guides/rules-of-ml' },
  openai_agents_guide: { title: 'A practical guide to building agents', by: 'OpenAI', url: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf' },
  voice_ai_primer: { title: 'Voice AI & Voice Agents: an illustrated primer', by: 'Kwindla Hultman Kramer', url: 'https://voiceaiandvoiceagents.com/' },
  karpathy_tokenizer: { title: 'Let’s build the GPT Tokenizer (2 h 13 min)', by: 'Andrej Karpathy', url: 'https://youtu.be/zduSFxRajkE' },
  karpathy_intro_llms: { title: 'Intro to Large Language Models (1-hour talk)', by: 'Andrej Karpathy', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g' },
  deeplearning_short_courses: { title: 'Short courses on LLMs, agents and RAG', by: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/courses' },
  openai_playground: { title: 'OpenAI Playground', by: 'OpenAI', url: 'https://platform.openai.com/playground' },

  // Videos
  video_hellopm_course: { title: 'AI Product Management complete course (3.5 h)', by: 'HelloPM', url: 'https://www.youtube.com/watch?v=KjYCEiBTHFo' },
  video_aishwarya: { title: 'How to Become an AI Product Manager in 2026', by: 'Aishwarya Srinivasan', url: 'https://www.youtube.com/watch?v=JKaA6HcxyXU' },
  video_aman_khan: { title: 'Becoming an AI PM, with Aman Khan', by: 'Lenny’s Podcast', url: 'https://www.youtube.com/watch?v=E_rNotqs--I' },
  video_james_lowe: { title: 'Why your product needs an AI product manager', by: 'James Lowe, i.AI (AI Engineer)', url: 'https://www.youtube.com/watch?v=xzJdSi2Tsqw' },
  video_agentic_ai_institute: { title: 'AI Product Sense: How AI PM Interviews Actually Work in 2026', by: 'Agentic AI Institute', url: 'https://www.youtube.com/watch?v=2CpMEXCv8t4' },

  // Roadmaps and posts
  hellopm_roadmap: { title: 'AI PM roadmap post', by: 'HelloPM' },
  batu_akin_roadmap: { title: '5-stage AI PM roadmap', by: 'Batu Akin' },
  product_faculty_skills: { title: 'AI PM skills by category', by: 'Product Faculty' },
  aakash_ai_pm_guide: { title: 'AI PM Guide 2026', by: 'Aakash Gupta', url: 'https://www.news.aakashg.com/p/become-an-ai-pm-no-experience' },
  six_week_roadmap: { title: 'Six-Week AI PM Roadmap', by: 'the roadmap behind the checklists, napkin math, failure specs and templates' },

  // Interview prep
  aced_ai_pm_questions: { title: 'AI PM interview questions 2026', by: 'Aced (formerly Exponent)', url: 'https://www.aced.io/blog/ai-product-manager-interview-questions' },
  gil_chaouat_questions: { title: 'AI PM interview question list', by: 'Gil Chaouat' },
  kore1_interview_questions: { title: 'AI PM interview questions 2026', by: 'KORE1', url: 'https://www.kore1.com/ai-product-manager-interview-questions-2026/' },
  kore1_jd_template: { title: 'AI PM job description template 2026', by: 'KORE1', url: 'https://www.kore1.com/ai-product-manager-job-description-template/' },
  prachub_llm_metrics: { title: 'LLM metrics, safety and trade-offs', by: 'PracHub', url: 'https://prachub.com/resources/ai-product-manager-interview-questions-llm-metrics-safety-product-sense-and-trade-offs' },
  // Job postings that were still open on 2026-10-17
  jd_sarvam: { title: 'Product Manager', by: 'Sarvam AI, Bengaluru', url: 'https://careers.kula.ai/sarvam-ai/28847' },
  jd_anthropic: { title: 'Product Manager, Claude (App Foundations)', by: 'Anthropic', url: 'https://job-boards.greenhouse.io/anthropic/jobs/5448167008' },
  jd_servicenow: { title: 'Staff Technical Product Manager, AI/LLM + AI Evaluation Science', by: 'ServiceNow', url: 'https://careers.servicenow.com/jobs/744000153729109/staff-technical-product-manager-aillm-expertise-plus-ai-evaluation-science/' },
};

export const AI_PM_CORE_READING: { key: string; days: string }[] = [
  { key: 'lenny_evals_podcast', days: 'Day 39' },
  { key: 'lenny_ai_lifecycle', days: 'Day 31' },
  { key: 'anthropic_agents', days: 'Day 24' },
  { key: 'openai_accuracy', days: 'Day 23' },
  { key: 'pair_errors', days: 'Day 34' },
];

export const AI_PM_FREE_READING: { key: string; days: string }[] = [
  { key: 'hamel_evals_faq', days: 'Day 44' },
  { key: 'hax_guidelines', days: 'Day 30' },
  { key: 'rules_of_ml', days: 'Day 29' },
  { key: 'openai_agents_guide', days: 'Day 24' },
  { key: 'voice_ai_primer', days: 'Day 36, for voice products' },
];

export const AI_PM_VIDEOS: { key: string; adds: string; weeks: string }[] = [
  { key: 'video_hellopm_course', adds: 'LLM training stages, transformers, the AI PM value chain, an AI note-taker case study, RAG, prompt engineering, fine-tuning, transfer learning, visual agents, guardrails, evals, portfolio', weeks: '2, 3, 4, 5, 6, 8, 12' },
  { key: 'video_aishwarya', adds: 'Break AI products to find failure modes. Ship a tiny AI product as PRD + prototype + design rationale. Learn MLOps and observability', weeks: '3, 7, 10' },
  { key: 'video_aman_khan', adds: 'AI PM role types. Stand out with a portfolio. Do not automate away every customer experience. Habits of the top 5% of AI PMs', weeks: '1, 3, 12' },
  { key: 'video_james_lowe', adds: 'A demo is not a product. AI uncertainty needs a PM. Use it to explain to your team why the product needs an AI PM', weeks: '1, 7' },
  { key: 'video_agentic_ai_institute', adds: 'How AI product sense rounds run. Use it with the interview rounds table', weeks: '12' },
];

export const AI_PM_VIDEO_EXTRAS: { key: string; weeks: string }[] = [
  { key: 'karpathy_intro_llms', weeks: 'Week 2' },
  { key: 'deeplearning_short_courses', weeks: 'Weeks 4–6' },
  { key: 'openai_playground', weeks: 'Week 4' },
];

export const AI_PM_VIDEO_EXTRAS_NOTE =
  'For prototypes, Aman Khan uses Cursor, Replit, v0, Vercel, NotebookLM and Excalidraw.';

export const AI_PM_SOURCE_GROUPS: { title: string; keys?: string[]; items?: string[] }[] = [
  {
    title: 'Job descriptions (Oct 2026 snapshot; postings expire)',
    items: [
      'JPMorgan Chase — AI Product Manager, LLMs, Executive Director',
      'HCLTech — AI Product Manager I (E5) and (E3)',
      'Clanx — Senior PM, AI Services, Bengaluru',
      'HiringBlaze — AI Product Manager, Bangalore',
      'Anthropic — Product Manager, Claude; Lead PM, Research; PM, Claude Code Growth',
      'Senior TPM — AI Agents, Evals & Reliability',
      'Morgan Philips — AI Product Manager role profile',
      'Spencer Ogden — AI Product Manager, NYC',
      'Virtual Vocations remote listings',
      'Builder roles: Djinni AI Product Builder, Paralect AI Product Maker, Beewise AI PM, SoFi Product Builder, Microsoft PM, AI-first apps',
    ],
    keys: ['jd_sarvam', 'jd_anthropic', 'jd_servicenow', 'kore1_jd_template'],
  },
  { title: 'Roadmaps and posts', keys: ['hellopm_roadmap', 'batu_akin_roadmap', 'product_faculty_skills', 'aakash_ai_pm_guide', 'six_week_roadmap'] },
  { title: 'Interview prep', keys: ['aced_ai_pm_questions', 'gil_chaouat_questions', 'kore1_interview_questions', 'prachub_llm_metrics'] },
];
