import React from 'react';
import { Lesson, ModuleInfo, Category } from './types';
import { 
  Lightbulb, Search, BarChart, 
  Code, Bot, Layers, Brain, Target, Sparkles, CheckCircle, Smartphone, Zap, Users, MessageSquare, Rocket, Activity, Database, Cpu, X, Box, HelpCircle, Terminal, TrendingUp, Settings2, ShieldCheck,
  FileText, Calendar, Compass, ClipboardList, PenTool, Hammer, Ship, RefreshCcw, Layout, FileEdit, PieChart, Send,
  TrendingDown, Info, Settings, LifeBuoy, Recycle, Users2, Gauge, Timer, ShieldAlert, BookOpen, UserPlus, Milestone,
  ArrowRight, Briefcase, DollarSign, PieChart as PieChartIcon, TrendingUp as TrendingUpIcon, Landmark, Play, Mic, ClipboardCheck, MessageCircle, User, HeartHandshake, Star,
  Globe, BarChart3, Filter, Table, Network, GitMerge, Binary, Hash, Type, Calculator, CalendarDays, Ghost, FileSpreadsheet,
  Palette, ArrowLeft, ExternalLink, Heart, ChevronRight, TrendingUp as TrendingUpLucide,
  Music, UserCheck, ClipboardList as ClipboardIcon, Clock, Footprints, Coins, TrendingUp as TrendingUp2,
  ListChecks, Quote, UserCircle, Compass as CompassIcon, ShieldAlert as ShieldAlertIcon,
  PlayCircle
} from 'lucide-react';

export const getCategoryColor = (category: Category): string => {
  switch (category) {
    case 'Foundations': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Research': return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Data': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Design': return 'bg-pink-50 text-pink-700 border-pink-200';
    case 'AI': return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'Strategy': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'Tech': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    default: return 'bg-zinc-50 text-zinc-700 border-zinc-200';
  }
};

export const getCategoryIcon = (category: Category) => {
  switch (category) {
    case 'Foundations': return <Layers className="w-4 h-4" />;
    case 'Research': return <Search className="w-4 h-4" />;
    case 'Data': return <BarChart className="w-4 h-4" />;
    case 'Design': return <Smartphone className="w-4 h-4" />;
    case 'AI': return <Bot className="w-4 h-4" />;
    case 'Strategy': return <Zap className="w-4 h-4" />;
    case 'Tech': return <Code className="w-4 h-4" />;
    default: return <Lightbulb className="w-4 h-4" />;
  }
};

export const MODULES: ModuleInfo[] = [
  { id: 'foundations', title: 'PM Foundations', category: 'Foundations', description: 'Mindset, PDLC, PLC, Product Sense, and User Empathy.' },
  { id: 'research', title: 'Research & Strategy', category: 'Research', description: 'User Research, Competitor Analysis, and Market Sizing.' },
  { id: 'data', title: 'Data Analytics', category: 'Data', description: 'SQL Foundations, Advanced Excel, Power BI, and Mixpanel.' },
  { id: 'tech-ai', title: 'Tech & AI Engine', category: 'AI', description: 'APIs, System Design, Prompt Engineering, RAG, and AI Agents.' },
  { id: 'execution', title: 'Execution & Career', category: 'Strategy', description: 'Agile/Scrum, Portfolio Building, and Interview Prep.' },
];

export const LESSONS: Lesson[] = [
  {
    day: 0,
    title: 'Foundation & Mindset',
    category: 'Foundations',
    preview: 'Start Your PM Journey Right 🚀. Before we jump into frameworks, tools, and case studies, today is about building the right mindset.',
    content: (
      <div className="space-y-6">
        <h2>Day-0: Foundation & Mindset — Start Your PM Journey Right 🚀</h2>
        <p>Welcome to Day-0 of learning Product Management from scratch! Before we jump into frameworks, tools, and case studies, today is about building the right mindset to succeed as a Product Manager.</p>
        <p>Product Management is one of the most competitive and rewarding careers today. But breaking into PM without prior experience can feel overwhelming because the role demands:</p>
        <ol>
          <li>Cross-functional collaboration</li>
          <li>Strategic thinking & decision-making</li>
          <li>Problem-solving with ambiguity</li>
          <li>Understanding of business, design, tech & data</li>
          <li>Many aspiring PMs struggle not because they lack skills, but because they lack clarity of purpose and direction.</li>
        </ol>
        <h3>Why Day-0 Matters</h3>
        <p>Before learning “how to be a PM”, you must understand why you want to be a PM. PMs face pressure, ownership, ambiguity, and constant context switching — your motivation will keep you going when it gets hard.</p>
        <p>Understanding the reality of the role—not just the glamour—helps you evaluate:</p>
        <ul>
          <li>Is the PM role aligned with your strengths & interests?</li>
          <li>Do you enjoy solving problems and talking to users?</li>
          <li>Are you comfortable making decisions without perfect data?</li>
        </ul>
        <p>The fastest way to answer these questions is to talk to real PMs, understand their challenges, impact, and day-to-day responsibilities.</p>
        <h3>Reflection Exercise</h3>
        <p>Write answers to this question: Why do I want to become a Product Manager?</p>
        <p><strong>Clarity today will drive consistency tomorrow.</strong></p>
        <h3>Outcome of Day-0</h3>
        <p>By the end of today, you should have:</p>
        <ul>
          <li>Real understanding of what PM is</li>
          <li>Motivation aligned with reality</li>
          <li>Early networking with professionals</li>
          <li>A clear starting point for the course</li>
        </ul>
      </div>
    ),
    assignment: (
      <div>
        <h4>Task 1 — Must Do Today</h4>
        <p>Reach out to 5 Product Managers and ask them about their journey & role. Use LinkedIn, alumni networks, or company communities.</p>
        <p><strong>Goal:</strong> Collect insights and note patterns. This will guide your expectations.</p>
      </div>
    )
  },
  {
    day: 1,
    title: 'What is Product Management?',
    category: 'Foundations',
    preview: 'Understand the role, responsibilities, types, and myths about Product Management.',
    content: (
      <div className="space-y-6">
        <h2>Day 1: What is Product Management? 🚀</h2>
        <p>Understand the role, responsibilities, types, and myths about Product Management.</p>
        <h3>1. What is a Product?</h3>
        <p>A product is anything that creates value by solving a real user problem or fulfilling a need—whether physical, digital, or service-based.</p>
        <p>Examples: Uber, Spotify, iPhone, Google Ads, ATM, WhatsApp</p>
        <h3>2. Do Companies Need Product Managers?</h3>
        <p>Short answer: Yes—but the title isn’t always necessary. Product thinking is.</p>
        <p>Why PMs emerge: Company Growth Stages</p>
        <table>
          <thead>
            <tr><th>Stage</th><th>Who acts as PM</th><th>Why it works</th><th>When it breaks</th></tr>
          </thead>
          <tbody>
            <tr><td>Early startup</td><td>Founder</td><td>Small team, fast decisions</td><td>Complexity increases</td></tr>
            <tr><td>Growth stage</td><td>Dedicated PMs</td><td>Align teams, prioritize impact</td><td>Confusion, misalignment</td></tr>
            <tr><td>Large enterprise</td><td>Product org</td><td>Scale, governance</td><td>Feature bloat, chaos, slow</td></tr>
          </tbody>
        </table>
        <h3>3. Real-World Exceptions</h3>
        <p>Some companies have succeeded without formal PMs: Basecamp (Design-led), Valve (Self-organized), Early FB / Stripe (Engineer-led).</p>
        <p>👉 These work only when everyone practices product thinking: user obsession + data + trade-offs + execution focus.</p>
        <h3>4. What is Product Management?</h3>
        <p>Product Management is the function responsible for guiding a product from idea → launch → growth → scale by balancing Business, Design, and Tech.</p>
        <p><em>"PMs don’t decide how to build — they decide what to build and why."</em></p>
      </div>
    ),
    assignment: (
        <div>
            <h4>Day-1 Mini Assignment</h4>
            <p>Pick a product you use daily (e.g., Spotify, Zomato, Notion, Cred) and answer: Product Name, User Problem, Key Metrics, Improvement Suggestion.</p>
            <p><strong>Reflection Task:</strong> Identify which of the 6 PM types excites you the most and why.</p>
        </div>
    )
  },
  {
    day: 2,
    title: 'The Product Development Lifecycle (PDLC)',
    category: 'Foundations',
    preview: 'Theme: How products move from idea → design → build → launch → iterate.',
    content: (
      <div className="space-y-6">
        <h2>Day 2: The Product Development Lifecycle (PDLC) 📘</h2>
        <p>Theme: How products move from idea → design → build → launch → iterate.</p>
        <h3>1. What is PDLC?</h3>
        <p>Product Development Lifecycle (PDLC) is the structured process of taking a product from problem discovery → launch → continuous improvement.</p>
        <ul>
          <li><strong>Discovery:</strong> Understand the user problem</li>
          <li><strong>Definition:</strong> Scope & prioritize solution</li>
          <li><strong>Design:</strong> Visualize experience</li>
          <li><strong>Development:</strong> Build & test</li>
          <li><strong>Launch:</strong> Ship product to users</li>
          <li><strong>Iteration:</strong> Improve continuously</li>
        </ul>
        <h3>SDLC VS PDLC</h3>
        <p><strong>SDLC:</strong> Building software correctly. Focus on technical implementation.</p>
        <p><strong>PDLC:</strong> Building the right product. Focus on user & business value.</p>
      </div>
    ),
    resources: [
        { title: 'SDLC Life Cycle for Beginners', url: 'https://youtu.be/kSU2MPeptpM?si=k5ln45xHGIlrPV_o', type: 'video' }
    ]
  },
  {
    day: 3,
    title: 'Product Life Cycle (PLC) & PLM',
    category: 'Foundations',
    preview: 'Understand how products evolve in the market over time and how companies manage that journey.',
    content: (
      <div className="space-y-6">
        <h2>Day 3: Product Life Cycle (PLC) & PLM 📈</h2>
        <h3>What is Product Life Cycle (PLC)?</h3>
        <p>PLC is the journey a product goes through in the market — from Introduction to Decline.</p>
        <ol>
          <li><strong>Introduction:</strong> Low sales, building awareness.</li>
          <li><strong>Growth:</strong> Increasing interest, expanding market share.</li>
          <li><strong>Maturity:</strong> Peak sales, intense competition.</li>
          <li><strong>Decline:</strong> Declining sales, changing preferences.</li>
        </ol>
        <h3>What is Product Lifecycle Management (PLM)?</h3>
        <p>PLM is the practice of managing a product from its initiation to its eventual retirement through a systematic approach.</p>
        <p>Stages: Concept → Design → Production → Sales → Support → Retirement.</p>
      </div>
    ),
    assignment: (
        <div>
            <h4>Day-3 Assignment</h4>
            <p>Pick any product and evaluate its lifecycle stage. What signals tell you this? What should the PM focus on right now?</p>
        </div>
    )
  },
  {
    day: 4,
    title: 'Product Sense Framework',
    category: 'Foundations',
    preview: 'Great PMs don’t build features. They solve meaningful problems. Master the "sixth sense".',
    content: (
      <div className="space-y-6">
        <h2>Day 4: Product Sense Framework 🧭</h2>
        <p>Product sense is the ability to see through complexity and spot the user needs that matter most. Experts like Marty Cagan emphasize that it is deep product knowledge built through immersion.</p>
        <h3>The 7 Pillars of Product Sense</h3>
        <ul>
          <li>Empathy & Customer Needs</li>
          <li>Market & Competitive Insight</li>
          <li>Design & UX Perspective</li>
          <li>Problem Framing & Mapping</li>
          <li>Feasibility & Execution</li>
          <li>Iteration & Validation</li>
          <li>Domain Immersion</li>
        </ul>
        <h3>Daily Habits to Build Instincts</h3>
        <p>Talk to users regularly, reverse-engineer products like Airbnb, perform product drills, and embrace constraints.</p>
      </div>
    ),
    resources: [
        { title: 'What is Product Sense? by Robin Dhanwani', url: 'https://www.parallelhq.com/blog/what-product-sense', type: 'article' }
    ]
  },
  {
    day: 5,
    title: 'User Empathy',
    category: 'Foundations',
    preview: 'Step into their shoes. User empathy is the fundamental driver of human-centered development.',
    content: (
      <div className="space-y-6">
        <h2>Day 5: User Empathy 🤝</h2>
        <p>User empathy is the ability to understand and share the feelings, needs, and perspectives of users. It drives human-centered development.</p>
        <h3>Core Principles</h3>
        <ul>
          <li>Active Listening: Listen without judgment.</li>
          <li>Putting Users First: Prioritize needs over internal assumptions.</li>
          <li>Deep Connection: Grasp emotional motivations.</li>
        </ul>
        <h3>Implementation Process</h3>
        <ol>
          <li>User Research & Personas</li>
          <li>Design Thinking Integration (Empathize, Define, Ideate, Prototype, Test)</li>
          <li>Continuous Feedback Loops</li>
        </ol>
      </div>
    ),
    assignment: (
        <div>
            <h4>Task: Find out How did Airbnb use user empathy?</h4>
            <p>Look for stories about their "early days" and how they handled user problems.</p>
        </div>
    )
  },
  {
    day: 6,
    title: 'Essential Product Documentation',
    category: 'Foundations',
    preview: 'A Product Manager\'s Complete Guide to PRDs, BRDs, User Stories, and Roadmaps.',
    content: (
      <div className="space-y-6">
        <h2>Day 6: Essential Product Documentation 📄</h2>
        <p>Product managers are professional translators. Documentation is the primary medium for this translation work.</p>
        <h3>The Product Requirements Document (PRD)</h3>
        <p>The PRD is the single source of truth that aligns engineering, design, marketing, and leadership.</p>
        <h3>User Stories and Acceptance Criteria</h3>
        <p>"As a [user type], I want to [action] so that [benefit]." Acceptance criteria define when a story is complete.</p>
        <h3>Product Roadmaps</h3>
        <p>Roadmaps show the big picture—what you're building, when, and why it matters. Best roadmaps are outcome-focused.</p>
      </div>
    ),
    resources: [
        { title: 'Product Strategy & Roadmap', url: 'https://youtu.be/cnp6Ck8OIiY?si=eJHw5hzcwuiZZyf0', type: 'video' },
        { title: 'GTM Strategy', url: 'https://youtu.be/eDVtBleIxag?si=mE-x6s3HPTloD13x', type: 'video' }
    ],
    assignment: (
        <div>
            <p>Create your own PRD using ChatPRD.</p>
            <a href="https://www.chatprd.ai/" target="_blank" rel="noopener noreferrer">ChatPRD.ai</a>
        </div>
    )
  },
  {
    day: 7,
    title: 'Stakeholder Management',
    category: 'Strategy',
    preview: 'The Product Manager\'s Essential Guide to Influence without Authority.',
    content: (
      <div className="space-y-6">
        <h2>Day 7: Stakeholder Management 🤝</h2>
        <p>At its core, stakeholder management is the art and science of aligning diverse groups around a shared product vision.</p>
        <h3>The Power Map: Influence vs. Interest</h3>
        <p>Create a 2x2 matrix plotting stakeholders by their influence over your product and their interest in it.</p>
        <h3>Communication: Tailored, Transparent, and Timely</h3>
        <p>Your engineering lead doesn't need the same update as your CFO. Tailor your message to what each stakeholder cares about.</p>
        <h3>Building Coalitions, Not Consensus</h3>
        <p>You don't need everyone to agree. Seeking universal consensus leads to watered-down products.</p>
      </div>
    ),
    resources: [
        { title: 'Communicating and Working with Stakeholders', url: 'https://youtu.be/jz7tPVDwb50?si=71B7Acqz6U2F0XA8', type: 'video' }
    ]
  },
  {
    day: 8,
    title: 'Business Fundamentals for PMs',
    category: 'Strategy',
    preview: 'Master the metrics that drive sustainable products. Learn CAC, LTV, and revenue streams.',
    content: (
      <div className="space-y-6">
        <h2>Day 8: Business Fundamentals for PMs 💰</h2>
        <h3>What Good PMs Do</h3>
        <ul>
          <li>Balance user value with business value</li>
          <li>Justify investments with ROI calculations</li>
          <li>Understand customer lifecycle economics</li>
        </ul>
        <h3>Unit Economics</h3>
        <p><strong>CAC (Customer Acquisition Cost):</strong> (Total Mkt + Sales Costs) / # New Users</p>
        <p><strong>LTV (Lifetime Value):</strong> Simple LTV = ARPU × Avg Lifespan</p>
        <p><strong>LTV:CAC Ratio:</strong> 3:1 to 5:1 is the Sweet Spot.</p>
        <h3>Business Models</h3>
        <p>Subscription (Netflix), Freemium (Slack), Marketplace (Airbnb), Advertising (Google), E-commerce (Amazon).</p>
      </div>
    ),
    assignment: (
        <div>
            <h4>Day-6 Mini Assignment: Unit Economics Problem</h4>
            <p>Ad Spend: $30,000, Sales Costs: $20,000, New Users: 250, ARPU: $40/mo, Lifespan: 10mo, Margin: 80%. Calculate CAC, LTV, and Ratio.</p>
        </div>
    )
  },
  {
    day: 9,
    title: 'Introduction to User & Market Research',
    category: 'Research',
    preview: 'Think like a researcher. Learn structured methods to uncover pain points and validate ideas.',
    content: (
      <div className="space-y-6">
        <h2>Day 9: Introduction to User & Market Research 🔍</h2>
        <p>“Great products start with deep understanding — of users, their needs, and the market around them.”</p>
        <h3>User Research vs Market Research</h3>
        <p>User research focuses on individual behaviors & pain points. Market research focuses on industry, competitors, and trends.</p>
        <h3>The Research Process</h3>
        <ol>
          <li>Define Objective</li>
          <li>Choose Method</li>
          <li>Recruit Users</li>
          <li>Collect Data</li>
          <li>Synthesize</li>
        </ol>
      </div>
    ),
    resources: [
        { title: 'Doing User Research', url: 'https://youtu.be/MxwyGi-3dzY?si=CV5VWd2bNnUDW-fP', type: 'video' },
        { title: 'Market Research', url: 'https://youtu.be/LoJDAeq6i34?si=Ok2GW9U0wFmSJzz8', type: 'video' }
    ],
    assignment: (
        <div>
            <h4>Day-9 Comprehensive Assignment</h4>
            <p>Task: Define Target Segment, Create Pain Point vs. Outcome Table, Competitor Scan.</p>
        </div>
    )
  },
  {
    day: 10,
    title: 'User Interviews & Surveys',
    category: 'Research',
    preview: '“If you listen carefully, your users will write your roadmap for you.”',
    content: (
      <div className="space-y-6">
        <h2>Day 10: User Interviews & Surveys 🎙️</h2>
        <p>Yesterday we explored target segments. Today we learn how to validate insights through real conversations.</p>
        <h3>Why User Interviews Matter</h3>
        <ul>
          <li>Understand user motivation (The Why)</li>
          <li>Validate high-risk assumptions</li>
          <li>Discover emotional triggers</li>
        </ul>
        <h3>Types of Interview Questions</h3>
        <p>Behavioral (Past), Attitudinal (Feelings), Aspirational (Future).</p>
        <p><strong>Golden Rule:</strong> No leading questions. Don't ask "Wouldn't it be better if...?" Ask "How do you feel about...?"</p>
      </div>
    ),
    resources: [
        { title: 'How To Conduct User Interviews Like A Pro', url: 'https://youtu.be/5tVbFfQCk?si=91eAlcNvjUAFfxM1', type: 'video' }
    ],
    assignment: (
        <div>
            <h4>Day-8: User Insights Report</h4>
            <p>Create a 1-page deliverable: Top 3 Pain Points, Top 3 Desired Outcomes, One Opportunity Statement.</p>
        </div>
    )
  },
  {
    day: 11,
    title: 'User Personas & JTBD',
    category: 'Research',
    preview: '“You don’t design for everyone — you design for someone.” Convert feedback into profiles.',
    content: (
      <div className="space-y-6">
        <h2>Day 11: User Personas & JTBD 👥</h2>
        <p>“You don’t design for everyone — you design for someone.” Convert raw feedback into structured user profiles.</p>
        <h3>Jobs To Be Done (JTBD) Framework</h3>
        <p>Users don’t buy products. They hire them to get a job done.</p>
        <p><strong>The Template:</strong> When I [situation], I want to [motivation], So I can [desired outcome].</p>
        <h3>Persona Template</h3>
        <p>Add emotion — Personas should feel human, not just like data points. Example: Rahul Sharma, 27, Software Engineer.</p>
      </div>
    ),
    resources: [
        { title: 'Jobs to be done', url: 'https://youtu.be/dbVN6EYql6k?si=2440TMiKd3ZVmGvK', type: 'video' },
        { title: 'Creating Personas', url: 'https://youtu.be/v6EWN4EjHM0?si=5up6JXpGPfYnIq1d', type: 'video' }
    ],
    assignment: (
        <div>
            <h4>Day-9: Persona & JTBD Deck</h4>
            <p>Final Deliverables: 2 Personas, JTBD Statements, 1 Feature Suggestion.</p>
        </div>
    )
  },
  {
    day: 12,
    title: 'Introduction to SQL for PMs',
    category: 'Data',
    preview: '"Data is the voice of your users. SQL lets you listen." Master basic querying and environment setup.',
    content: (
      <div className="space-y-12">
        <header className="bg-emerald-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
           <div className="flex gap-4 mb-6">
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">Data</span>
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">45m read</span>
           </div>
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Introduction to SQL for PMs (SELECT, WHERE, Basics)</h1>
           <p className="text-emerald-100 text-lg font-bold italic">"Data is the voice of your users. SQL lets you listen."</p>
        </header>

        <section className="bg-white border border-zinc-100 p-8 rounded-3xl">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><Target className="text-emerald-600"/> Learning Objectives</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Understand what SQL is and why PMs need it",
              "Set up a practice SQL environment",
              "Write basic SELECT queries to retrieve data",
              "Filter data using WHERE clauses",
              "Execute DDL and DML commands"
            ].map((obj, i) => (
              <li key={i} className="flex gap-3 text-zinc-700 font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> {obj}
              </li>
            ))}
          </ul>
        </section>

        <section className="p-8 bg-zinc-50 rounded-3xl border border-zinc-200">
          <h3 className="text-2xl font-black mb-4">1. What is SQL and Why PMs Need It</h3>
          <p className="text-zinc-700 leading-relaxed mb-6 font-medium">
            SQL (Structured Query Language) is the language for communicating with databases. Think of it as asking questions to a spreadsheet on steroids.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                <h4 className="font-bold text-emerald-700 mb-2 uppercase tracking-widest text-xs">Without SQL</h4>
                <p className="text-sm text-zinc-500 italic">You wait for analysts, ask vague questions, get delayed answers.</p>
             </div>
             <div className="bg-emerald-900 p-6 rounded-2xl text-white">
                <h4 className="font-bold text-emerald-400 mb-2 uppercase tracking-widest text-xs">With SQL</h4>
                <p className="text-sm">Validate hypotheses in real-time and make data-driven decisions independently.</p>
             </div>
          </div>
        </section>

        <section className="p-8 bg-zinc-950 rounded-[3rem] text-white">
          <h3 className="text-2xl font-black mb-8 text-emerald-400">Must Watch: SQL Beginners</h3>
          <div className="max-w-xl mx-auto mb-10">
            <a href="https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                <img src="https://img.youtube.com/vi/SSKVgrwhzus/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="SQL Intro"/>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/0 transition-all">
                  <PlayCircle className="w-16 h-16 text-emerald-400 fill-zinc-950"/>
                </div>
              </div>
              <p className="text-center font-bold group-hover:text-emerald-400">SQL Beginner Course - Cover these topics</p>
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[{t:"00:00", l:"Intro"}, {t:"07:38", l:"Introduction to SQL"}, {t:"22:33", l:"Setup Environment"}, {t:"34:01", l:"Query Data (SELECT)"}, {t:"01:32:31", l:"DDL Commands"}, {t:"01:43:44", l:"DML Commands"}].map(idx => (
              <div key={idx.t} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                <span className="text-emerald-400 font-mono text-xs">{idx.t}</span>
                <span className="text-xs font-bold">{idx.l}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  },
  {
    day: 13,
    title: 'Filtering Data & SQL Joins',
    category: 'Data',
    preview: '"Joining tables is where SQL becomes powerful for PMs." Master advanced filtering and table relationships.',
    content: (
      <div className="space-y-12">
        <header className="bg-emerald-700 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Day 13 — Filtering Data & SQL Joins</h1>
           <p className="text-emerald-100 text-lg font-bold italic leading-relaxed">"Joining tables is where SQL becomes powerful for PMs."</p>
        </header>

        <section className="bg-white border border-zinc-100 p-8 rounded-3xl">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><Target className="text-emerald-600"/> Learning Objectives</h2>
          <div className="space-y-4">
            {["Use advanced WHERE filters (LIKE, IN, BETWEEN)", "Understand the concept of database relationships", "Perform INNER, LEFT, RIGHT, and FULL JOINS", "Combine data from multiple tables to answer complex PM questions", "Use UNION and other set operators"].map((obj, i) => (
              <div key={i} className="flex gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shrink-0">{i+1}</div>
                <p className="font-bold text-zinc-700">{obj}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 bg-zinc-950 rounded-[3rem] text-white">
          <h3 className="text-2xl font-black mb-8 text-emerald-400">Intermediate SQL Mastery</h3>
          <div className="max-w-xl mx-auto mb-10 text-white">
            <a href="https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img src="https://img.youtube.com/vi/SSKVgrwhzus/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="SQL Joins"/>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/0 transition-all">
                  <PlayCircle className="w-16 h-16 text-emerald-400 fill-zinc-950"/>
                </div>
              </div>
              <p className="text-center font-bold text-emerald-300">Intermediate Level Lessons</p>
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            {[{t:"02:08:03", l:"Filtering Data"}, {t:"02:47:57", l:"SQL Joins (Basics)"}, {t:"03:27:29", l:"SQL Joins (Advanced)"}].map(idx => (
              <div key={idx.t} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center px-8">
                <span className="text-emerald-400 font-black tracking-widest">{idx.t}</span>
                <span className="font-black italic uppercase tracking-tighter text-zinc-400">{idx.l}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  },
  {
    day: 14,
    title: 'SQL Set Operators & Functions',
    category: 'Data',
    preview: '"Master SQL functions to transform raw data into actionable insights." Learn UNION, INTERSECT, and data manipulation.',
    content: (
      <div className="space-y-12">
        <header className="bg-emerald-800 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Day 14 — SQL Set Operators & Functions</h1>
           <p className="text-emerald-200 text-lg font-bold italic leading-relaxed">"Master SQL functions to transform raw data into actionable insights."</p>
        </header>

        <section className="bg-white border-2 border-emerald-100 p-8 rounded-3xl shadow-sm">
           <h2 className="text-2xl font-black mb-6 text-zinc-900">Learning Objectives</h2>
           <ul className="space-y-3">
             {["Combine query results using UNION, INTERSECT, and EXCEPT", "Apply string functions to clean and format text data", "Use numeric functions for calculations and rounding", "Solve complex data transformation problems", "Write efficient queries for real-world PM scenarios"].map((item, i) => (
               <li key={i} className="flex items-center gap-3 font-medium text-zinc-600">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {item}
               </li>
             ))}
           </ul>
        </section>

        <section className="p-8 bg-zinc-950 rounded-[3rem] text-white">
          <h3 className="text-2xl font-black mb-8 text-emerald-400">Deep Dive Video</h3>
          <div className="max-w-xl mx-auto mb-10">
            <a href="https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img src="https://img.youtube.com/vi/SSKVgrwhzus/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="SQL Functions"/>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-current text-white"/>
                  </div>
                </div>
              </div>
              <p className="text-center font-black uppercase tracking-widest text-xs text-zinc-400">SQL Functions & Sets Section</p>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{t:"04:02:09", l:"Set Operators"}, {t:"04:47:41", l:"SQL Functions"}, {t:"04:52:58", l:"String Functions"}, {t:"05:18:44", l:"Numeric Functions"}].map(idx => (
              <div key={idx.t} className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-emerald-400 font-mono text-sm mb-1">{idx.t}</p>
                <p className="text-sm font-black">{idx.l}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  },
  {
    day: 15,
    title: 'SQL Date Functions & Advanced Logic',
    category: 'Data',
    preview: '"Transform messy data into clean insights with SQL’s most powerful functions." Master conditional logic.',
    content: (
      <div className="space-y-12">
        <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Day 15 — SQL Date Functions & Advanced Logic</h1>
           <p className="text-indigo-100 text-lg font-bold italic leading-relaxed italic text-white">"Transform messy data into clean insights with SQL’s most powerful functions."</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <section className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm h-full">
              <h3 className="text-2xl font-black mb-6 text-zinc-900">Learning Objectives</h3>
              <ul className="space-y-4">
                {[
                  "Perform sophisticated date and time calculations",
                  "Handle NULL values correctly in queries",
                  "Build complex conditional logic with CASE statements",
                  "Use aggregate functions for data summarization",
                  "Solve real-world PM analytics problems"
                ].map((obj, i) => (
                  <li key={i} className="flex gap-4 font-bold text-zinc-600 leading-relaxed">
                    <span className="text-indigo-600 font-black">0{i+1}.</span> {obj}
                  </li>
                ))}
              </ul>
           </section>
           
           <section className="bg-zinc-950 p-8 rounded-3xl text-white h-full">
              <h3 className="text-xl font-black mb-6 text-indigo-400">Timestamps</h3>
              <div className="space-y-3">
                 {[{t:"05:22:48", l:"Date and Time Functions"}, {t:"06:59:06", l:"NULL Functions"}, {t:"08:07:50", l:"Case Statement"}, {t:"08:43:36", l:"Aggregate Functions"}].map(idx => (
                    <div key={idx.t} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                       <span className="font-mono text-indigo-300 text-xs">{idx.t}</span>
                       <span className="font-bold text-xs">{idx.l}</span>
                    </div>
                 ))}
              </div>
              <div className="mt-8 text-white">
                <a href="https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 bg-indigo-600 rounded-2xl hover:bg-indigo-500 transition-all">
                  <PlayCircle className="w-8 h-8 text-white" />
                  <span className="font-black text-sm uppercase tracking-widest text-white">Watch Final SQL Session</span>
                </a>
              </div>
           </section>
        </div>
      </div>
    )
  },
  {
    day: 16,
    title: 'Advanced SQL Set Operators & Functions',
    category: 'Data',
    preview: 'Master complex techniques for combining datasets and manipulating data with built-in functions.',
    content: (
      <div className="space-y-12">
        <header className="bg-emerald-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">Day 16 — SQL Functions Deep Dive</h1>
        </header>

        <section className="p-8 bg-zinc-950 rounded-[3rem] text-white">
          <div className="max-w-xl mx-auto mb-10 text-white">
            <a href="https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                <img src="https://img.youtube.com/vi/SSKVgrwhzus/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="SQL Functions Deep Dive"/>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/0 transition-all">
                  <PlayCircle className="w-16 h-16 text-emerald-400 fill-zinc-950"/>
                </div>
              </div>
              <p className="text-center font-bold text-emerald-300">Advanced Functions - Cover these topics</p>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{t:"04:02:09", l:"Set Operators"}, {t:"04:47:41", l:"SQL Functions"}, {t:"04:52:58", l:"String Functions"}, {t:"05:18:44", l:"Numeric Functions"}].map(idx => (
              <div key={idx.t} className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-emerald-400 font-mono text-sm mb-1">{idx.t}</p>
                <p className="text-sm font-black">{idx.l}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  },
  {
    day: 17,
    title: 'Final SQL Date & Advanced Logic Session',
    category: 'Data',
    preview: 'Transform messy data into clean insights with SQL\'s most powerful functions for time-based analysis.',
    content: (
      <div className="space-y-12">
        <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">Day 17 — SQL Logic & Dates</h1>
        </header>

        <section className="p-8 bg-zinc-950 rounded-[3rem] text-white">
          <div className="max-w-xl mx-auto mb-10 text-white">
            <a href="https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                <img src="https://img.youtube.com/vi/SSKVgrwhzus/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="SQL Logic Mastery"/>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/0 transition-all">
                  <PlayCircle className="w-16 h-16 text-indigo-400 fill-zinc-950"/>
                </div>
              </div>
              <p className="text-center font-bold text-indigo-300">Final SQL Mastery Modules</p>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{t:"05:22:48", l:"Date and Time Functions"}, {t:"06:59:06", l:"NULL Functions"}, {t:"08:07:50", l:"Case Statement"}, {t:"08:43:36", l:"Aggregate Functions"}].map(idx => (
              <div key={idx.t} className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-indigo-400 font-mono text-sm mb-1">{idx.t}</p>
                <p className="text-sm font-black">{idx.l}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  },
  {
    day: 18,
    title: 'Excel Fundamentals for PMs',
    category: 'Data',
    preview: 'Excel is the PM\'s Swiss Army knife. Master workbooks, ribbons, and core daily formulas.',
    content: (
      <div className="space-y-12">
        <header className="bg-emerald-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">Excel Mastery 📘</h1>
           <p className="text-emerald-100 text-xl font-bold italic">"Excel is the PM's Swiss Army knife — from quick analysis to complex models."</p>
        </header>

        <section className="p-10 bg-zinc-950 rounded-[4rem] text-white">
           <h3 className="text-3xl font-black mb-10 text-emerald-400 text-center uppercase tracking-widest text-sm">Timestamps</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {t:"0:00:00", l:"Welcome"}, {t:"0:03:53", l:"What is Excel?"}, {t:"0:07:19", l:"About Course"},
                {t:"0:11:19", l:"Excel Setup"}, {t:"0:22:42", l:"Worksheets"}, {t:"0:39:15", l:"Workbooks"},
                {t:"0:52:06", l:"Ribbon"}, {t:"1:06:39", l:"Formulas Intro"}, {t:"1:18:08", l:"Functions Intro"},
                {t:"1:29:14", l:"Logical Functions"}, {t:"1:39:54", l:"Math Functions"}, {t:"2:21:28", l:"Lookup Functions"}
              ].map(item => (
                <div key={item.t} className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center gap-4">
                   <span className="text-emerald-400 font-mono text-xs">{item.t}</span>
                   <span className="text-sm font-bold opacity-80">{item.l}</span>
                </div>
              ))}
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'Excel PM Bootcamp', url: 'https://youtu.be/pCJ15nGFgVg?si=aqGEbVfcwFuLi7fY', type: 'video' }
    ]
  },
  {
    day: 19,
    title: 'Excel Charts, Pivot Tables & Dashboards',
    category: 'Data',
    preview: 'Learn to transform data into compelling visualizations and building interactive dashboards that tell stories.',
    content: (
      <div className="space-y-12">
        <section className="p-8 bg-zinc-950 rounded-[4rem] text-white">
           <h3 className="text-3xl font-black mb-10 text-blue-400 text-center uppercase tracking-widest text-sm">Visualization Modules</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                 <h4 className="text-indigo-400 font-black text-xs uppercase tracking-widest">3️⃣ Charts & Visualization</h4>
                 {[{t:"3:01:33", l:"Charts Intro"}, {t:"3:22:05", l:"Charts Advanced"}, {t:"3:35:37", l:"Charts Statistics"}, {t:"3:47:59", l:"Sparklines"}].map(idx => (
                    <div key={idx.t} className="p-3 bg-white/5 rounded-xl border border-white/5 flex gap-4">
                       <span className="font-mono text-blue-300 text-xs">{idx.t}</span>
                       <span className="text-xs font-bold">{idx.l}</span>
                    </div>
                 ))}
              </div>
              <div className="space-y-4">
                 <h4 className="text-emerald-400 font-black text-xs uppercase tracking-widest">4️⃣ Tables & Dashboards</h4>
                 {[{t:"3:51:57", l:"Excel Tables"}, {t:"4:40:30", l:"Project: Salary Dashboard"}, {t:"5:33:46", l:"PivotTable Intro"}, {t:"6:09:33", l:"PivotCharts"}].map(idx => (
                    <div key={idx.t} className="p-3 bg-white/5 rounded-xl border border-white/5 flex gap-4">
                       <span className="font-mono text-emerald-300 text-xs">{idx.t}</span>
                       <span className="text-xs font-bold">{idx.l}</span>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'Excel Dashboards Masterclass', url: 'https://youtu.be/pCJ15nGFgVg?si=aqGEbVfcwFuLi7fY', type: 'video' }
    ]
  },
  {
    day: 20,
    title: 'Learn Power BI in Under 3 Hours',
    category: 'Data',
    preview: 'Build a solid foundation in data transformation, modeling, DAX, and dashboard finalization.',
    content: (
      <div className="space-y-12">
        <section className="bg-yellow-500 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Power BI Masterclass 📈</h1>
           <p className="text-yellow-100 text-xl font-bold italic leading-relaxed">Formatting, Visualizations, Dashboards + Full Project.</p>
        </section>

        <section className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
              <h3 className="text-2xl font-black text-zinc-950">Today’s Goal</h3>
              <p className="text-lg text-zinc-600 leading-relaxed font-medium italic border-l-4 border-yellow-500 pl-6">
                  Build a strong foundation in Power BI by understanding how raw data is transformed, modeled, calculated, and finally presented as interactive dashboards. The focus is on hands-on concepts essential for real-world analytics.
              </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-50 rounded-3xl">
                <h4 className="font-black mb-4 uppercase tracking-widest text-xs text-zinc-400">Core Workflow</h4>
                <ul className="space-y-3 font-bold text-zinc-700">
                    <li>1. Data Transformation (Power Query)</li>
                    <li>2. Data Modeling & Relationships</li>
                    <li>3. DAX Calculations (Measures)</li>
                    <li>4. Visualizations & Interactivity</li>
                    <li>5. Dashboard Finalization</li>
                </ul>
            </div>
            <div className="p-6 bg-zinc-900 rounded-3xl text-white">
                <h4 className="font-black mb-4 uppercase tracking-widest text-xs text-yellow-400">Cardinality Basics</h4>
                <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-black text-zinc-400">
                    <div className="p-2 border border-white/10 rounded">One-to-many</div>
                    <div className="p-2 border border-white/10 rounded">Many-to-one</div>
                    <div className="p-2 border border-white/10 rounded">One-to-one</div>
                    <div className="p-2 border border-white/10 rounded">Many-to-many</div>
                </div>
            </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'Learn Power BI in Under 3 Hours', url: 'https://youtu.be/I0vQ_VLZTWg?si=Gkh1WYh75MOngmbS', type: 'video' }
    ]
  },
  {
    day: 21,
    title: 'Product Analytics with Mixpanel',
    category: 'Data',
    preview: 'Differentiate web vs product analytics. Master event-based tracking, funnels, retention, and cohort analysis.',
    content: (
      <div className="space-y-12">
        <section className="bg-indigo-700 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Analytics Foundations</h1>
           <p className="text-indigo-200 text-xl font-bold italic">Understand how product analytics fits into the entire lifecycle.</p>
        </section>

        <section className="p-10 bg-zinc-950 rounded-[4rem] text-white">
            <h3 className="text-2xl font-black mb-8 text-indigo-400 tracking-tight">The Metric Pyramid</h3>
            <div className="flex flex-col items-center gap-4">
                <div className="w-48 h-12 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-sm uppercase">Focus Metric</div>
                <div className="w-72 h-12 bg-indigo-800 rounded-lg flex items-center justify-center font-black text-sm uppercase">Engagement & Retention</div>
                <div className="w-full h-12 bg-zinc-900 rounded-lg flex items-center justify-center font-black text-sm uppercase border border-white/5">Activation & Exposure</div>
            </div>
        </section>

        <section className="bg-white border-2 border-zinc-100 p-8 rounded-3xl">
           <h4 className="text-xl font-black mb-6 text-zinc-900">What is Product Analytics?</h4>
           <p className="text-lg text-zinc-600 italic">"Product analytics focuses on tracking user actions and events within your product rather than just page views."</p>
        </section>
      </div>
    ),
    resources: [
        { title: 'Mixpanel Basics', url: 'https://youtu.be/5O4ST-R5ZVw?si=IN49CzqS5qHexth3', type: 'video' }
    ]
  },
  {
    day: 22,
    title: 'GA4 and A/B Testing with VWO',
    category: 'Data',
    preview: 'End-to-End GA4 Setup, Reporting, and Installation. Learn to run scientific experiments that settle disputes objectives.',
    content: (
      <div className="space-y-12">
        <section className="bg-orange-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">GA4 & A/B Testing 🧪</h1>
           <p className="text-orange-100 text-xl font-bold italic text-white">"Actions speak louder than opinions, and A/B tests measure actions."</p>
        </section>

        <section className="p-8 bg-zinc-50 border border-zinc-100 rounded-[3rem] space-y-8">
            <h4 className="text-2xl font-black text-zinc-900">The A/B Testing Framework</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Start with Clear Hypothesis', 'Define Success Metrics', 'Sample Size & Duration'].map((step, i) => (
                    <div key={step} className="p-5 bg-white rounded-2xl border border-zinc-100 shadow-sm font-black text-zinc-700 text-sm">0{i+1}. {step}</div>
                ))}
            </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'End-to-End GA4 Setup', url: 'https://youtu.be/hsIP4iH25Wg?si=kahtDEdtF6LY7cTU', type: 'video' },
        { title: 'VWO A/B Testing Tutorial', url: 'https://youtu.be/QEqholJ28qI?si=Y7KfY4Sr_eKJUIBn', type: 'video' }
    ]
  },
  {
    day: 23,
    title: 'Understanding APIs as a Product Manager',
    category: 'Tech',
    preview: '“Tech literacy is a PM\'s bridge to engineering success.” Learn how the internet works and why APIs matter.',
    content: (
      <div className="space-y-12">
        <header className="bg-cyan-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">APIs as a PM 🌐</h1>
           <p className="text-cyan-100 text-xl font-bold italic">Building blocks of integrations and extensible products.</p>
        </header>

        <section className="bg-white border-2 border-cyan-100 p-10 rounded-[3rem] space-y-6">
           <h3 className="text-2xl font-black text-zinc-900 mb-6">Learning Objectives</h3>
           <ul className="space-y-4 font-bold text-zinc-700">
               <li>● Explain what APIs are and how they work</li>
               <li>● Identify key API concepts every PM should know</li>
               <li>● Understand API documentation and testing basics</li>
               <li>● Use APIs to inform product strategy and partnerships</li>
           </ul>
        </section>
      </div>
    ),
    resources: [
        { title: 'How the Internet Works (Cloudflare)', url: 'https://www.cloudflare.com/en-in/learning/network-layer/how-does-the-internet-work/', type: 'article' },
        { title: 'API for Product Managers', url: 'https://dune-leek-31a.notion.site/API-for-Product-Managers-24abaab379148074abc3f57b062db2bf', type: 'tool' }
    ]
  },
  {
    day: 24,
    title: 'System Design for PMs',
    category: 'Tech',
    preview: 'Bridge the gap between product vision and technical reality to avoid costly mistakes.',
    content: (
      <div className="space-y-12">
        <header className="bg-zinc-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">System Design 🏗️</h1>
           <p className="text-zinc-400 text-xl font-bold italic text-white text-white">Building Products That Scale</p>
        </header>

        <section className="p-12 bg-white border-4 border-zinc-100 rounded-[4rem] shadow-xl text-zinc-900">
           <h3 className="text-3xl font-black mb-8 text-zinc-950">Why PMs Need This?</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 italic font-bold">"Making realistic roadmap commitments requires understanding technical complexity."</div>
              <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 italic font-bold">"Evaluating build versus buy decisions demands technical literacy."</div>
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'System Design Masterclass', url: 'https://youtu.be/m8Icp_Cid5o?si=u52HzOf12e0cMvyI', type: 'video' }
    ]
  },
  {
    day: 25,
    title: 'UI/UX for Product Managers',
    category: 'Design',
    preview: 'Essential UX & UI Concepts + Practical Usability. Learn to evaluate interfaces using design laws.',
    content: (
      <div className="space-y-12">
        <header className="bg-pink-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">UI/UX Strategy</h1>
           <p className="text-pink-100 text-xl font-bold italic leading-relaxed text-white">"A product is only as good as its experience."</p>
        </header>

        <section className="bg-white border-2 border-pink-100 p-10 rounded-[3rem] shadow-sm space-y-10">
              <h3 className="text-3xl font-black tracking-tight text-zinc-900">Learning Objectives</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Recognize fundamental UX/UI concepts', 'Apply design principles in product discussions', 'Understand how and when to run usability tests', 'Use key visual design laws to evaluate interfaces'].map(goal => (
                   <div key={goal} className="flex items-center gap-4 text-sm font-bold text-zinc-700 bg-pink-50/50 p-4 rounded-xl border border-pink-50">
                      <CheckCircle className="w-5 h-5 text-pink-500" /> {goal}
                   </div>
                ))}
              </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'UX Design Essentials', url: 'https://youtu.be/QJBP2uy8LCU?si=GIa6MA8amS8vYBdd', type: 'video' },
        { title: '12 UI/UX Laws You MUST KNOW', url: 'https://youtu.be/wELfwQmtnvo?si=t7AEn1xVBoB8lPTm', type: 'video' }
    ]
  },
  {
    day: 26,
    title: 'Agile & Scrum Project Management',
    category: 'Strategy',
    preview: 'Master iterative delivery, customer feedback, and adaptability. Learn the roles and ceremonies of Scrum.',
    content: (
      <div className="space-y-12">
        <header className="bg-indigo-800 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Agile & Scrum</h1>
           <p className="text-indigo-200 text-xl font-bold italic leading-relaxed text-white">"Agile isn’t a checklist — it’s a way to deliver value faster."</p>
        </header>

        <section className="p-10 bg-zinc-50 border border-zinc-200 rounded-[3.5rem] space-y-10">
           <h3 className="text-2xl font-black text-indigo-950 px-4">SCRUM ROLES</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { r: 'Product Owner', d: 'Represents the customer, owns the backlog, makes prioritization decisions.' },
                { r: 'Scrum Master', d: 'Facilitates the process, removes impediments, and coaches on Agile.' },
                { r: 'Development Team', d: 'Engineers, designers, QA who build the potentially shippable increment.' }
              ].map(role => (
                <div key={role.r} className="p-8 bg-white rounded-3xl border border-indigo-100 shadow-sm">
                   <h4 className="font-black text-indigo-600 mb-2 uppercase text-xs tracking-widest">{role.r}</h4>
                   <p className="text-xs font-bold text-zinc-500 leading-relaxed italic">{role.d}</p>
                </div>
              ))}
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'Agile & Scrum Intro', url: 'https://youtu.be/WDAQq5vCMME?si=FaBFP9KwcKDsviFh', type: 'video' },
        { title: 'Jira Beginner Tooling', url: 'https://youtu.be/NDVSMIVYxm8?si=GptGyKBY7AlhEZ8', type: 'video' }
    ]
  },
  {
    day: 27,
    title: 'Cloud Computing for PMs',
    category: 'Tech',
    preview: 'Understand IaaS, PaaS, and SaaS models. Master cloud economics, elasticity, and microservices.',
    content: (
      <div className="space-y-12">
        <header className="bg-blue-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Cloud Strategy ☁️</h1>
           <p className="text-blue-200 text-xl font-bold italic leading-relaxed text-white">"The cloud isn't just someone else's computer—it's a paradigm shift."</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { m: 'IaaS', d: 'Raw compute: EC2, GCE, Azure VMs. Max control.' },
                { m: 'PaaS', d: 'Managed platforms: Heroku, App Engine. Speed over config.' },
                { m: 'SaaS', d: 'Complete apps: Salesforce, Slack. Zero infra worries.' }
            ].map(model => (
                <div key={model.m} className="p-8 bg-white border-2 border-blue-100 rounded-3xl shadow-sm">
                    <h4 className="font-black text-blue-800 text-xl mb-2">{model.m}</h4>
                    <p className="text-xs text-zinc-500 font-bold italic">{model.d}</p>
                </div>
            ))}
        </section>
      </div>
    )
  },
  {
    day: 28,
    title: 'What is AI, ML, and DL?',
    category: 'AI',
    preview: 'The modern method for Artificial Intelligence. Learn Supervised, Unsupervised, and Reinforcement Learning.',
    content: (
      <div className="space-y-12">
        <header className="bg-orange-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">AI Foundations 🤖</h1>
           <p className="text-orange-100 text-xl font-bold italic text-white">"ML teaches systems to think like humans by learning from data."</p>
        </header>

        <section className="p-12 bg-white border-4 border-zinc-100 rounded-[4rem] shadow-xl text-center">
            <h3 className="text-3xl font-black mb-8 text-zinc-950">Three Core ML Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                    <div className="text-5xl">📊</div>
                    <h5 className="text-xl font-black uppercase text-orange-600">Supervised</h5>
                    <p className="text-xs font-bold text-zinc-500 italic">Labeled data with known outputs. (Classification/Regression)</p>
                </div>
                <div className="space-y-4">
                    <div className="text-5xl">🔍</div>
                    <h5 className="text-xl font-black uppercase text-orange-600">Unsupervised</h5>
                    <p className="text-xs font-bold text-zinc-500 italic">Unlabeled data. (Clustering/Association)</p>
                </div>
                <div className="space-y-4">
                    <div className="text-5xl">🕹️</div>
                    <h5 className="text-xl font-black uppercase text-orange-600">Reinforcement</h5>
                    <p className="text-xs font-bold text-zinc-500 italic">Trial and error with rewards/penalties.</p>
                </div>
            </div>
        </section>
      </div>
    )
  },
  {
    day: 29,
    title: 'Large Language Models (LLM)',
    category: 'AI',
    preview: 'Deep dive into LLMs like ChatGPT. Learn Statistical Token Simulation, RLHF, and the "Swiss Cheese" capability model.',
    content: (
      <div className="space-y-12">
        <header className="bg-zinc-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">LLM Mastery</h1>
           <p className="text-zinc-400 text-xl font-bold italic leading-relaxed text-white">Statistical Token Simulators and Internet Document Simulators.</p>
        </header>

        <section className="bg-white border-2 border-zinc-100 p-8 rounded-3xl">
            <h4 className="text-xl font-black mb-6 text-zinc-900 uppercase tracking-widest text-xs">LLM Characteristics</h4>
            <div className="space-y-4 font-bold text-zinc-600">
                <p>● <strong>Stochastic & Imperfect:</strong> Relying on probability and sampling.</p>
                <p>● <strong>Hallucinations:</strong> Prone to fabricating information confidently.</p>
                <p>● <strong>Swiss Cheese Capability:</strong> Brilliant in one domain, fail randomly at simple tasks.</p>
            </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'Deep Dive into LLMs (Karpathy)', url: 'https://youtu.be/7xTGNNLPyMI?si=_FGxNCEjJcvyxdAz', type: 'video' }
    ]
  },
  {
    day: 30,
    title: 'Prompt Engineering for PMs',
    category: 'AI',
    preview: 'Learn to write effective prompts to get actionable outputs for ideation, spec writing, and research.',
    content: (
      <div className="space-y-12">
        <header className="bg-orange-500 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Prompt Engineering</h1>
           <p className="text-orange-100 text-xl font-bold italic text-white">"It’s about clear thinking expressed as structured instructions."</p>
        </header>

        <section className="bg-zinc-950 p-10 rounded-[3rem] text-white">
            <h4 className="text-xl font-black mb-8 text-orange-400 text-center uppercase tracking-widest text-xs">Prompt Structure</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {['Role', 'Task', 'Behavior', 'Output Format'].map(item => (
                    <div key={item} className="p-5 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest">{item}</div>
                ))}
            </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'Prompting 101 Video', url: 'https://youtu.be/ysPbXH0LpIE?si=5Riv7IB9ezFAt_Kc', type: 'video' },
        { title: 'AWS Prompting Foundation', url: 'https://share.google/FdZPEVTPVCkN85d33', type: 'tool' }
    ]
  },
  {
    day: 31,
    title: 'Context Engineering',
    category: 'AI',
    preview: 'The natural progression of prompt engineering. Learn to curate and maintain the optimal set of tokens during inference.',
    content: (
        <div className="space-y-12">
            <section className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Context Engineering</h1>
                <p className="text-indigo-200 text-xl font-bold italic text-white text-white">"LLM context window is like RAM, serving as working memory."</p>
            </section>

            <section className="bg-white border-2 border-zinc-100 p-8 rounded-3xl space-y-6">
                <h3 className="text-2xl font-black">Building Capable Agents</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {['Write Context', 'Select Context', 'Compress Context', 'Isolate Context'].map(item => (
                        <div key={item} className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl font-black text-center text-[10px] uppercase tracking-widest">{item}</div>
                    ))}
                </div>
            </section>
        </div>
    )
  },
  {
    day: 32,
    title: 'Retrieval Augmented Generation (RAG)',
    category: 'AI',
    preview: 'Build sophisticated Q&A chatbots by giving LLMs access to private documents. Master chunking and vector databases.',
    content: (
        <div className="space-y-12">
            <header className="bg-zinc-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">RAG Strategy</h1>
                <p className="text-zinc-400 text-xl font-bold italic leading-relaxed text-white">Bridging the gap between LLMs and private data.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { c: 'Retrieval (R)', d: 'Look up internal documents and retrieve information.' },
                    { c: 'Augmenting (A)', d: 'Improve user prompt with retrieved info.' },
                    { c: 'Generation (G)', d: 'LLM generates response based on context.' }
                ].map(item => (
                    <div key={item.c} className="p-8 bg-white border-2 border-indigo-100 rounded-3xl shadow-sm">
                        <h4 className="font-black text-indigo-600 mb-2">{item.c}</h4>
                        <p className="text-xs font-bold text-zinc-500 italic">{item.d}</p>
                    </div>
                ))}
            </section>
        </div>
    )
  },
  {
    day: 33,
    title: 'Model Context Protocol (MCP)',
    category: 'AI',
    preview: 'Think of MCP like a USB-C port for AI. Standardize how models communicate with tools and context providers safely.',
    content: (
        <div className="space-y-12">
            <header className="bg-indigo-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">MCP 🔌</h1>
                <p className="text-indigo-200 text-xl font-bold italic leading-relaxed text-white">Standardizing AI application connectivity.</p>
            </header>

            <section className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-sm">
                <h3 className="text-2xl font-black mb-6">Why MCP Exists?</h3>
                <p className="text-lg text-zinc-600 italic">"RAG and Plugins tried to solve this, but each had limitations: text chunks only, difficult to reuse, and brittle integrations."</p>
            </section>
        </div>
    )
  },
  {
    day: 34,
    title: 'Introduction to Agent Workflow',
    category: 'AI',
    preview: 'Design AI systems that execute series of steps iteratively. Master task decomposition and varying degrees of autonomy.',
    content: (
        <div className="space-y-12">
            <header className="bg-zinc-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Agentic AI Workflows</h1>
                <p className="text-indigo-400 text-xl font-bold italic text-white">Mimicking complex human problem-solving stages.</p>
            </header>

            <section className="bg-zinc-50 p-10 rounded-[3rem] space-y-8">
                <h3 className="text-2xl font-black">Degrees of Autonomy</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bold text-zinc-600">
                    <div className="p-6 bg-white rounded-2xl border">Less Autonomous: Predefined steps.</div>
                    <div className="p-6 bg-white rounded-2xl border">Semi-Autonomous: Decisions on tools.</div>
                    <div className="p-6 bg-white rounded-2xl border">Highly Autonomous: Dynamic planning.</div>
                </div>
            </section>
        </div>
    ),
    resources: [
        { title: 'Agentic AI Course (DeepLearning.ai)', url: 'https://www.deeplearning.ai/courses/agentic-ai/', type: 'tool' }
    ]
  },
  {
    day: 35,
    title: 'AI Agents for Product Managers',
    category: 'AI',
    preview: 'Learn to build agents using LangChain or AutoGPT. Understand why direct experience with failure modes is crucial.',
    content: (
        <div className="space-y-12">
            <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">Building AI Agents</h1>
                <p className="text-indigo-100 text-xl font-bold italic text-white text-white">Move from prompts to autonomous systems.</p>
            </header>

            <section className="p-10 bg-zinc-950 rounded-[4rem] text-white">
                <h3 className="text-2xl font-black mb-8 text-indigo-400 text-center uppercase tracking-widest text-xs">Types of Agents</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {['Simple Reflex', 'Model-based', 'Goal-based', 'Utility-based'].map(item => (
                        <div key={item} className="p-5 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest">{item}</div>
                    ))}
                </div>
            </section>
        </div>
    ),
    resources: [
        { title: 'AI Agent Course', url: 'https://youtu.be/ZHH3sr234zY?si=5qMS4pLlfl2gYaDs', type: 'video' }
    ]
  },
  {
    day: 36,
    title: 'Building Proof of Work: No-Code',
    category: 'Tech',
    preview: 'Why aspiring PMs must ship. Learn to use Replit, Lovable, Claude, and Vercel to build real products.',
    content: (
        <div className="space-y-12">
            <header className="bg-zinc-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Proof of Work 🛠️</h1>
                <p className="text-zinc-400 text-xl font-bold italic text-white">Hiring managers prioritize demonstrated ability over potential.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-4">
                    <h4 className="text-xl font-black">Modern No-Code Stack</h4>
                    <ul className="text-sm font-medium text-zinc-500 space-y-2 italic">
                        <li>● <strong>Lovable:</strong> Complete web apps from prompts.</li>
                        <li>● <strong>Replit:</strong> AI-powered dev environment.</li>
                        <li>● <strong>Vercel:</strong> Zero-config deployment.</li>
                        <li>● <strong>Zapier/Make:</strong> Business workflow automation.</li>
                    </ul>
                </div>
                <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 italic font-bold text-indigo-900">
                    "Better to ship ten small projects than spend six months on one ambitious product you never finish."
                </div>
            </section>
        </div>
    )
  },
  {
    day: 37,
    title: 'Structured Product Teardowns',
    category: 'Strategy',
    preview: 'Reverse-engineer digital products to extract insights. Demonstrate analytical rigor and product sense.',
    content: (
        <div className="space-y-12">
            <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">Product Teardowns</h1>
                <p className="text-indigo-100 text-xl font-bold italic text-white">"Reverse-engineer to understand how it works and WHY."</p>
            </header>

            <section className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-sm">
                <h3 className="text-2xl font-black mb-6">Core Teardown Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-zinc-600 italic">
                    <div>✔️ Product Sense (Feature Interpretations)</div>
                    <div>✔️ User Empathy (Pains & Motivations)</div>
                    <div>✔️ Strategic Thinking (Business Goals)</div>
                    <div>✔️ Communication (Clarity of Insights)</div>
                </div>
            </section>
        </div>
    ),
    resources: [
        { title: 'The Stare: Case Studies', url: 'https://thestare.in/case-studies', type: 'article' },
        { title: 'What is a Product Teardown?', url: 'https://youtu.be/3cqHleDYgys', type: 'video' }
    ]
  },
  {
    day: 38,
    title: 'Startup Case Studies for PM Jobs',
    category: 'Strategy',
    preview: 'Pick the right startup, define scope, map the journey, and identify high-impact problems.',
    content: (
        <div className="space-y-12">
            <header className="bg-emerald-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white text-white">Startup Case Studies</h1>
                <p className="text-emerald-100 text-xl font-bold italic text-white">Proof of product thinking, not a presentation exercise.</p>
            </header>

            <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
                <h4 className="text-xl font-black mb-6">Process Checklist</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold text-zinc-700">
                    <div>1. Pick the Right Startup (Live/Usable)</div>
                    <div>2. Define Scope (Don't do everything)</div>
                    <div>3. Map the User Journey</div>
                    <div>4. Root Cause Analysis (5 Whys)</div>
                </div>
            </section>
        </div>
    )
  },
  {
    day: 39,
    title: 'Building a Strong PM Portfolio',
    category: 'Strategy',
    preview: 'Master the About section, project showcases, certifications, and testimonials that land interviews.',
    content: (
        <div className="space-y-12">
            <header className="bg-indigo-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white text-white">PM Portfolio Mastery</h1>
                <p className="text-indigo-200 text-xl font-bold italic text-white">"Show, don't just tell, your product management value."</p>
            </header>

            <section className="bg-white border-2 border-zinc-100 p-10 rounded-[3rem] shadow-sm">
                <h3 className="text-2xl font-black mb-6">Key Portfolio Elements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 italic font-bold text-zinc-500">
                    <div>● User-Centric About Section</div>
                    <div>● Proof of Work (Teardowns)</div>
                    <div>● Validated Certifications</div>
                </div>
            </section>
        </div>
    )
  },
  {
    day: 40,
    title: 'CV Building & LinkedIn Optimization',
    category: 'Strategy',
    preview: 'Optimize your profile for the 7-10 second recruiter scan. Use AI to refine your headline and about section.',
    content: (
        <div className="space-y-12">
            <header className="bg-zinc-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white text-white">Career Optimization</h1>
                <p className="text-zinc-400 text-xl font-bold italic text-white">Increasing search visibility and credibility signaling.</p>
            </header>

            <section className="bg-white border-2 border-zinc-100 p-10 rounded-[3rem] space-y-8">
                <h3 className="text-2xl font-black">Analysis Framework</h3>
                <ul className="space-y-2 font-bold text-zinc-600">
                    <li>1. Headline (SEO-first)</li>
                    <li>2. About (Value Proposition)</li>
                    <li>3. Experience (Outcomes {" > "} Responsibilities)</li>
                    <li>4. Skills Audit (Target relevance)</li>
                </ul>
            </section>
        </div>
    ),
    resources: [
        { title: 'Resume Worded (ATS Check)', url: 'https://resumeworded.com/', type: 'tool' }
    ]
  },
  {
    day: 41,
    title: 'Applying to Jobs & Referrals',
    category: 'Strategy',
    preview: 'Learn the right platforms and outreach messages. Follow-up tips to get shortlisted at top companies.',
    content: (
        <div className="space-y-12">
            <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">Job Hunt Strategy</h1>
                <p className="text-indigo-100 text-xl font-bold italic text-white">"Lead with insight and thoughtfulness, not just asks."</p>
            </header>

            <section className="p-10 bg-zinc-50 border border-zinc-200 rounded-[3.5rem] space-y-6">
                <h4 className="text-xl font-black uppercase tracking-widest text-xs text-zinc-400">Top Platforms</h4>
                <p className="font-black text-indigo-700">Linkedin | Wellfound | Ycombinator jobs | Instahyre</p>
            </section>
        </div>
    )
  },
  {
    day: 42,
    title: 'Interview Prep: Case & Product Sense',
    category: 'Strategy',
    preview: 'Master depth of analysis, assumptions, and prioritisation. Practice designing for Google, Atlassian, and Meta.',
    content: (
        <div className="space-y-12">
            <header className="bg-zinc-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">Interview Prep (Part 1)</h1>
                <p className="text-zinc-400 text-xl font-bold italic text-white">Depth of analysis and clarity of communication.</p>
            </header>

            <section className="bg-white border-2 border-zinc-100 p-10 rounded-[3rem] space-y-6 shadow-sm">
                <h3 className="text-2xl font-black">Practice Questions</h3>
                <ul className="space-y-4 italic font-bold text-zinc-500">
                    <li>● Design a movie-booking app for elderly users (Flipkart)</li>
                    <li>● Design a Google Pixel tablet for restaurants (Google)</li>
                    <li>● Design a TV remote for older people (Netflix)</li>
                </ul>
            </section>
        </div>
    ),
    resources: [
        { title: 'Product Sense Round Prep', url: 'https://youtu.be/tlpfb_VsogA?si=VMQtzA2CME3KtR1z', type: 'video' }
    ]
  },
  {
    day: 43,
    title: 'Interview Prep: RCA & Guestimates',
    category: 'Strategy',
    preview: 'Learn to solve "Sudden revenue drop" and "Number of tube lights" problems with structured frameworks.',
    content: (
        <div className="space-y-12">
            <section className="p-8 bg-zinc-50 border border-zinc-200 rounded-[3rem] space-y-6">
                <h4 className="text-2xl font-black">Round Three: RCA (Root Cause Analysis)</h4>
                <ul className="space-y-2 font-bold text-zinc-600 italic">
                    <li>● Drop in average watch time by 30% (Netflix)</li>
                    <li>● Increase in returns at Amazon (Amazon)</li>
                </ul>
            </section>
            <section className="p-8 bg-indigo-900 rounded-[3rem] text-white shadow-xl">
                <h4 className="text-2xl font-black text-indigo-400 mb-4">Round Four: Guestimates</h4>
                <p className="italic text-indigo-200">"Number of tube lights in Bangalore or Tennis balls in an airplane."</p>
            </section>
        </div>
    ),
    resources: [
        { title: 'RCA Mastery', url: 'https://youtu.be/PA-Z__0G8Cs?si=DjJ7mkmdWhzpYU6l', type: 'video' },
        { title: 'Guestimates Framework', url: 'https://youtu.be/7C0L_XdIE50?si=bxBFIUcsJEFUsSqr', type: 'video' }
    ]
  },
  {
    day: 44,
    title: 'Interview Prep: Product Improvement',
    category: 'Strategy',
    preview: 'Learn how to improve Netflix, Spotify, or Gmail. Answer "What would you improve in your favorite product?".',
    content: (
        <div className="space-y-12">
            <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white text-white">Product Improvement</h1>
                <p className="text-indigo-100 text-xl font-bold italic text-white text-white">Learn to evaluate and evolve existing success stories.</p>
            </header>
        </div>
    ),
    resources: [
        { title: 'Product Improvement Round', url: 'https://youtu.be/Fhm0F240v9Y?si=Sqp9VhYoenUKYcw7', type: 'video' }
    ]
  },
  {
    day: 45,
    title: 'Interview Prep: Behavioral Rounds',
    category: 'Strategy',
    preview: 'Final behavioral round preparation. Course conclusion and feedback loop for continuous learning.',
    content: (
        <div className="space-y-12 text-center">
            <div className="p-12 bg-white border-2 border-zinc-100 rounded-[4rem] shadow-xl space-y-8">
                <h2 className="text-4xl font-black text-zinc-900 tracking-tighter">Congratulations! 🎓</h2>
                <p className="text-xl text-zinc-600 italic">"You've completed the 45-day PM Launchpad journey."</p>
                <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
                    <h4 className="text-2xl font-black text-indigo-900 mb-4">Final Feedback</h4>
                    <p className="text-zinc-600 mb-6 font-medium">We hope you liked the course, please help us by your valuable feedback.</p>
                    <a href="https://docs.google.com/forms/d/14esag07MESDVDzUmHGRFWyGfSkahwky18qZmW36_ooQ/preview" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 shadow-lg transition-all">
                        Take Feedback Survey
                    </a>
                </div>
            </div>
        </div>
    ),
    resources: [
        { title: 'Behavioral Rounds Part 1', url: 'https://youtu.be/1rOcpwcDTuY?si=GXoS-FRzroxPPJ0U', type: 'video' },
        { title: 'Behavioral Rounds Part 2', url: 'https://youtu.be/Wyvm8vcsaP0?si=JeY3xJKXWfRrGCXG', type: 'video' }
    ]
  }
];

export const DayCard: React.FC<{ lesson: Lesson; index: number }> = ({ lesson, index }) => {
  return (
    <div className="group relative bg-white rounded-[2.8rem] border border-zinc-100 p-2 h-full flex flex-col transition-all duration-700 hover:border-indigo-100 hover:shadow-[0_32px_64px_rgba(79,70,229,0.12)] cursor-pointer overflow-hidden">
        <div className="flex flex-col h-full rounded-[2.4rem] p-8 bg-white group-hover:bg-indigo-50/20 transition-colors duration-500">
            <div className="flex justify-between items-center mb-8">
                <span className={`text-[10px] px-3.5 py-2 rounded-full font-black uppercase tracking-widest flex items-center gap-2 border ${getCategoryColor(lesson.category)} shadow-sm`}>
                   {getCategoryIcon(lesson.category)}
                   {lesson.category}
                </span>
                <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-indigo-600 transition-colors">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-black tracking-tight">45m read</span>
                </div>
            </div>

            <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-zinc-900 text-white text-[9px] font-black uppercase tracking-widest mb-4">
                   <ShieldCheck className="w-3 h-3 text-indigo-400" />
                   Day {lesson.day}
                </div>
                <h3 className="font-black text-2xl leading-[1.1] transition-colors line-clamp-2 text-zinc-900 group-hover:text-indigo-600 tracking-tighter text-zinc-900">
                    {lesson.title}
                </h3>
            </div>

            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-10 flex-grow font-medium text-zinc-500">
                {lesson.preview}
            </p>

            <div className="mt-auto pt-8 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[12px] font-black text-zinc-400 group-hover:text-indigo-600 transition-colors tracking-[0.15em] uppercase">
                    Launch Lesson
                </span>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 bg-zinc-50 text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                    <ArrowRight className="w-6 h-6" />
                </div>
            </div>
        </div>
    </div>
  );
};
