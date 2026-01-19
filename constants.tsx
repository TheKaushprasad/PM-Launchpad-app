
import React from 'react';
import { Lesson, ModuleInfo, Category } from './types';
import { 
  Lightbulb, Search, BarChart, 
  Code, Bot, Layers, Brain, Target, Sparkles, CheckCircle, Smartphone, Zap, Users, MessageSquare, Rocket, Activity, Database, Cpu, X, Box, HelpCircle, Terminal, TrendingUp, Settings2, ShieldCheck,
  FileText, Calendar, Compass, ClipboardList, PenTool, Hammer, Ship, RefreshCcw, Layout, FileEdit, PieChart, Send, Clock, ArrowRight, Play, LineChart, Recycle, Settings, HeartHandshake, Package, Beaker, AlertTriangle, Eye, Scale,
  BookOpen, ExternalLink, Map, Ear, UserCheck, Link, Smile, History, FileStack, Presentation, Megaphone, Briefcase, Users2, DollarSign, TrendingDown, Percent, ClipboardCheck, Mic2, Users2 as UsersIcon, Star
} from 'lucide-react';

export const getCategoryColor = (category: Category): string => {
  switch (category) {
    case 'Foundations': return 'bg-blue-50 text-blue-600 border-blue-100';
    case 'Research': return 'bg-purple-50 text-purple-600 border-purple-100';
    case 'Data': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'Design': return 'bg-pink-50 text-pink-600 border-pink-100';
    case 'AI': return 'bg-orange-50 text-orange-600 border-orange-100';
    case 'Strategy': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
    case 'Tech': return 'bg-cyan-50 text-cyan-600 border-cyan-100';
    default: return 'bg-zinc-50 text-zinc-600 border-zinc-100';
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
  { id: 'foundations', title: 'Foundations', category: 'Foundations', description: 'Core mindset, PLC, PDLC, and essential PM documentation.' },
  { id: 'research', title: 'Research', category: 'Research', description: 'User interviews, market analysis, and opportunity sizing.' },
  { id: 'strategy', title: 'Strategy', category: 'Strategy', description: 'Business fundamentals, stakeholder management, and roadmapping.' },
  { id: 'data', title: 'Data', category: 'Data', description: 'SQL, Excel, Power BI, and Product Analytics.' },
  { id: 'tech', title: 'Tech', category: 'Tech', description: 'APIs, System Design, and Cloud Computing for PMs.' },
  { id: 'design', title: 'Design', category: 'Design', description: 'UI/UX principles, wireframing, and usability testing.' },
  { id: 'ai', title: 'AI', category: 'AI', description: 'LLMs, Prompt Engineering, RAG, and AI Agents.' },
];

export const LESSONS: Lesson[] = [
  {
    day: 0,
    title: 'Foundation & Mindset',
    category: 'Foundations',
    preview: 'Start Your PM Journey Right 🚀. Before we jump into frameworks, today is about building the right mindset.',
    content: (
      <div className="space-y-6">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 mb-6">Day-0: Foundation & Mindset — Start Your PM Journey Right 🚀</h1>
        <p>Welcome to Day-0 of learning Product Management from scratch!</p>
        <p>Product Management is one of the most competitive and rewarding careers today. But breaking into PM without prior experience can feel overwhelming because the role demands:</p>
        <ul className="list-disc pl-5 space-y-2 font-medium">
          <li>Cross-functional collaboration</li>
          <li>Strategic thinking & decision-making</li>
          <li>Problem-solving with ambiguity</li>
          <li>Understanding of business, design, tech & data</li>
        </ul>
        <p>Many aspiring PMs struggle not because they lack skills, but because they lack clarity of purpose and direction.</p>
        <h2 className="text-2xl font-black tracking-tight text-zinc-900 mt-8 mb-4">Why Day-0 Matters</h2>
        <p>Before learning “how to be a PM”, you must understand why you want to be a PM. PMs face pressure, ownership, ambiguity, and constant context switching — your motivation will keep you going when it gets hard.</p>
        <p>Understanding the reality of the role—not just the glamour—helps you evaluate:</p>
        <ul className="list-disc pl-5 space-y-2 font-medium">
          <li>Is the PM role aligned with your strengths & interests?</li>
          <li>Do you enjoy solving problems and talking to users?</li>
          <li>Are you comfortable making decisions without perfect data?</li>
        </ul>
        <p>The fastest way to answer these questions is to talk to real PMs, understand their challenges, impact, and day-to-day responsibilities.</p>
        <h2 className="text-2xl font-black tracking-tight text-zinc-900 mt-8 mb-4">Reflection Exercise</h2>
        <p>Write answers to this question: <strong>Why do I want to become a Product Manager?</strong></p>
        <p>Clarity today will drive consistency tomorrow.</p>
        <h2 className="text-2xl font-black tracking-tight text-zinc-900 mt-8 mb-4">Outcome of Day-0</h2>
        <p>By the end of today, you should have:</p>
        <ul className="list-disc pl-5 space-y-2 font-medium">
          <li>Real understanding of what PM is</li>
          <li>Motivation aligned with reality</li>
          <li>Early networking with professionals</li>
          <li>A clear starting point for the course</li>
        </ul>
        <div className="mt-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
           <h3 className="font-black text-zinc-900 flex items-center gap-2 mb-2">
              <Rocket className="w-5 h-5 text-indigo-600" />
              Up Next
           </h3>
           <p className="font-bold text-indigo-600">What is Product Management? 🚀</p>
        </div>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-black text-indigo-900 mb-2">Task 1 — Must Do Today</h4>
          <p className="text-zinc-700 leading-relaxed mb-4">
            Reach out to <strong>5 Product Managers</strong> and ask them about their journey & role.
          </p>
          <p className="text-zinc-600 italic text-sm">Use LinkedIn, alumni networks, or company communities.</p>
        </div>
        <div className="pt-4 border-t border-indigo-100">
          <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-1">Goal</h4>
          <p className="text-zinc-700">Collect insights and note patterns. This will guide your expectations.</p>
        </div>
      </div>
    )
  },
  {
    day: 1,
    title: 'What is Product Management?',
    category: 'Foundations',
    preview: 'Understand the role, responsibilities, types, and myths about Product Management.',
    content: (
      <div className="space-y-8">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 1: What is Product Management? 🚀</h1>
        <p className="text-lg">Understand the role, responsibilities, types, and myths about Product Management.</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">1. What is a Product?</h2>
          <p>A product is anything that creates value by solving a real user problem or fulfilling a need—whether physical, digital, or service-based.</p>
          <div className="flex flex-wrap gap-2">
            {['Uber', 'Spotify', 'iPhone', 'Google Ads', 'ATM', 'WhatsApp'].map(p => (
              <span key={p} className="px-3 py-1 bg-zinc-100 rounded-lg text-sm font-bold border border-zinc-200">{p}</span>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">2. Do Companies Need Product Managers?</h2>
          <p>Short answer: <strong>Yes</strong>—but the title isn’t always necessary. <strong>Product thinking is.</strong></p>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-zinc-200">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="border p-3 text-left">Stage</th>
                  <th className="border p-3 text-left">Who acts as PM</th>
                  <th className="border p-3 text-left">Why it works</th>
                  <th className="border p-3 text-left">When it breaks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 font-bold">Early startup</td>
                  <td className="border p-3">Founder</td>
                  <td className="border p-3">Small team, fast decisions</td>
                  <td className="border p-3">Complexity increases, decisions overload</td>
                </tr>
                <tr>
                  <td className="border p-3 font-bold">Growth stage</td>
                  <td className="border p-3">Dedicated PMs</td>
                  <td className="border p-3">Align teams, prioritize impact</td>
                  <td className="border p-3">Without PMs: confusion, misalignment</td>
                </tr>
                <tr>
                  <td className="border p-3 font-bold">Large enterprise</td>
                  <td className="border p-3">Product Leaders</td>
                  <td className="border p-3">Scale, governance, coordination</td>
                  <td className="border p-3">Without PMs: feature bloat, chaos, slow</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4 bg-zinc-50 p-6 rounded-2xl border border-zinc-200">
          <h2 className="text-xl font-black tracking-tight text-zinc-900">3. Real-World Exceptions</h2>
          <p>Some companies succeeded without formal PMs: <strong>Basecamp</strong> (Design-led), <strong>Valve</strong> (Self-organized), <strong>Early FB / Stripe</strong> (Engineer-led).</p>
          <p className="text-sm italic">👉 These work only when everyone practices product thinking: user obsession + data + trade-offs + execution focus.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">4. What is Product Management?</h2>
          <p>Product Management is the function responsible for guiding a product from <strong>idea → launch → growth → scale</strong> by balancing Business, Design, and Tech.</p>
          <p className="font-black text-indigo-600">"PMs don’t decide how to build — they decide what to build and why."</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">5. The PM Equation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="font-black text-blue-700">Business</p>
              <p className="text-sm">Revenue, success metrics, GTM strategy.</p>
            </div>
            <div className="p-4 bg-pink-50 border border-pink-100 rounded-xl">
              <p className="font-black text-pink-700">Design</p>
              <p className="text-sm">User experience & usability focus.</p>
            </div>
            <div className="p-4 bg-cyan-50 border border-cyan-100 rounded-xl">
              <p className="font-black text-cyan-700">Tech</p>
              <p className="text-sm">Feasibility & backend system thinking.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">6. PM Responsibilities</h2>
          <div className="space-y-2">
            {[
              { a: "User understanding", b: "Research, interviews, personas, feedback" },
              { a: "Problem definition", b: "Insights, hypotheses, opportunity sizing" },
              { a: "Prioritization", b: "RICE, MoSCoW, Kano frameworks" },
              { a: "Strategy & Roadmapping", b: "Vision, goals, milestones, timelines" },
              { a: "Execution & Delivery", b: "PRDs, user stories, cross-functional collab" },
              { a: "Analytics & Learning", b: "KPI tracking, experiments, iterations" },
              { a: "Communication", b: "Stakeholders, presentations, influence" }
            ].map(r => (
              <div key={r.a} className="flex gap-4 border-b border-zinc-100 pb-2">
                <p className="w-1/3 font-black text-zinc-800">{r.a}</p>
                <p className="w-2/3 text-zinc-500">{r.b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">7. Types of Product Managers 🔍</h2>
          <div className="grid grid-cols-1 gap-6">
            {[
              { title: "Core Product Manager", sub: "The Generalist", body: "End-to-end ownership of user-facing experiences. Metrics: Retention, Adoption, NPS.", ex: "Swiggy improving checkout conversion." },
              { title: "Growth Product Manager", sub: "The Optimizer", body: "Focus on Funnel optimization, A/B testing, and monetization. Metrics: DAU/MAU, LTV, Churn.", ex: "Duolingo improving streak feature." },
              { title: "Platform Product Manager", sub: "The Enabler", body: "Build scalable internal platforms and APIs. Metrics: Uptime, Latency, Integration Adoption.", ex: "Razorpay unified gateway API." },
              { title: "Data Product Manager", sub: "The Analyst PM", body: "Define data schemas, dashboards, and partner with ML teams. Metrics: Accuracy, Dashboard usage.", ex: "Meesho real-time retention dashboards." },
              { title: "Technical Product Manager (TPM)", sub: "The Architect", body: "Translate business requirements to architecture. Metrics: Reliability, Performance.", ex: "Slack developer API endpoints." },
              { title: "AI Product Manager", sub: "The Intelligent Builder", body: "Identify AI impact, work on model lifecycle and training. Metrics: Model accuracy, Adoption.", ex: "Netflix personalization engine." }
            ].map((type, i) => (
              <div key={i} className="p-6 border border-zinc-100 rounded-2xl bg-white shadow-sm">
                <h3 className="font-black text-lg text-indigo-600 mb-1">{type.title}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">{type.sub}</p>
                <p className="text-sm mb-4">{type.body}</p>
                <p className="text-xs bg-zinc-50 p-2 rounded-lg italic">Example: {type.ex}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">8. PM Deliverables</h2>
          <div className="flex flex-wrap gap-3">
            {['PRD', 'Roadmap', 'User Stories', 'Metrics Dashboard', 'GTM / Launch Plan'].map(d => (
              <span key={d} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold border border-indigo-100">{d}</span>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">Myths vs Reality</h2>
          <ul className="space-y-4">
            <li>
              <p className="font-black line-through text-zinc-400">“PMs are the boss of the team.”</p>
              <p className="text-sm text-zinc-600">PMs have no authority — influence only.</p>
            </li>
            <li>
              <p className="font-black line-through text-zinc-400">“PMs must know how to code.”</p>
              <p className="text-sm text-zinc-600">Not required, but tech literacy is crucial.</p>
            </li>
            <li>
              <p className="font-black line-through text-zinc-400">“PMs define timelines.”</p>
              <p className="text-sm text-zinc-600">That's project management. PMs define what & why.</p>
            </li>
          </ul>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-black text-indigo-900 mb-2">🎯 Assignment</h4>
          <p className="text-zinc-700 mb-4">Pick a product you use daily (e.g., Spotify, Zomato, Notion, Cred) and answer:</p>
          <div className="bg-white/50 p-4 rounded-xl border border-indigo-100 text-sm font-mono">
            Product Name: ___ <br/> User Problem: ___ <br/> Key Metrics: ___ <br/> Improvement Suggestion: ___
          </div>
        </div>
        <div className="pt-4 border-t border-indigo-100">
          <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-1">Reflection Task</h4>
          <p className="text-zinc-700">Identify which of the 6 PM types excites you the most and why. Does it align with your current background?</p>
        </div>
      </div>
    )
  },
  {
    day: 2,
    title: 'Product Development Lifecycle (PDLC)',
    category: 'Foundations',
    preview: 'Theme: How products move from idea → design → build → launch → iterate.',
    content: (
      <div className="space-y-8">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 2: The Product Development Lifecycle (PDLC) 📘</h1>
        <div className="bg-[#fdf9f0] rounded-[2.5rem] p-8 md:p-12 border border-zinc-100 shadow-sm flex flex-col items-center">
           <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-12 text-center tracking-tight">The Product Development <br/> Lifecycle (PDLC)</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              {[
                { name: 'DISCOVERY', col: 'bg-[#a3a3af]' },
                { name: 'DEFINITION', col: 'bg-[#a3a3af]' },
                { name: 'DESIGN', col: 'bg-[#a3a3af]' },
                { name: 'DEVELOPMENT', col: 'bg-[#a3a3af]' },
                { name: 'LAUNCH', col: 'bg-[#a3a3af]' },
                { name: 'ITERATION', col: 'bg-[#a3a3af]' }
              ].map((step) => (
                <div key={step.name} className="relative group">
                  <div className={`clip-path-arrow ${step.col} h-16 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 group-hover:shadow-indigo-200/50`}>
                    <span className="font-black text-zinc-900 text-xs tracking-widest">{step.name}</span>
                  </div>
                </div>
              ))}
           </div>
        </div>
        <section className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200">
          <h2 className="text-xl font-black mb-4">Learning Objectives</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start gap-2 text-sm font-bold text-zinc-600">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Understand the full lifecycle of product development
            </li>
            <li className="flex items-start gap-2 text-sm font-bold text-zinc-600">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Know what happens at every stage & what PMs contribute
            </li>
            <li className="flex items-start gap-2 text-sm font-bold text-zinc-600">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Learn common outputs, tools, and real examples
            </li>
            <li className="flex items-start gap-2 text-sm font-bold text-zinc-600">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Avoid typical mistakes junior PMs make
            </li>
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">1. What is PDLC?</h2>
          <p>Product Development Lifecycle (PDLC) is the structured process of taking a product from problem discovery → launch → continuous improvement, ensuring decisions are user-driven, data-backed, and business-aligned.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-zinc-200">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="border p-3 text-left">Stage</th>
                  <th className="border p-3 text-left">Goal</th>
                  <th className="border p-3 text-left">Key Output</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-3 font-bold">Discovery</td><td className="border p-3">Understand the user problem</td><td className="border p-3">Problem statement, Personas</td></tr>
                <tr><td className="border p-3 font-bold">Definition</td><td className="border p-3">Scope & prioritize solution</td><td className="border p-3">PRD, success metrics</td></tr>
                <tr><td className="border p-3 font-bold">Design</td><td className="border p-3">Visualize experience</td><td className="border p-3">Wireframes, Prototype</td></tr>
                <tr><td className="border p-3 font-bold">Development</td><td className="border p-3">Build & test</td><td className="border p-3">MVP, QA sign-off</td></tr>
                <tr><td className="border p-3 font-bold">Launch</td><td className="border p-3">Ship product to users</td><td className="border p-3">GTM plan, adoption data</td></tr>
                <tr><td className="border p-3 font-bold">Iteration</td><td className="border p-3">Improve continuously</td><td className="border p-3">Insights, next roadmap</td></tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="space-y-12 py-8">
          {[
            {
              num: "01",
              phase: "Phase 1: Discovery (Find the Right Problem)",
              goal: "“Fall in love with the problem, not the solution.” Understand real user needs and validate the painpoint.",
              activities: ["Market & competitor research", "User interviews, surveys", "Data analysis (Mixpanel, GA, SQL)", "Identify Jobs-to-be-Done (JTBD)"],
              outputs: ["Problem statement", "Personas", "Hypothesis", "Opportunity sizing"],
              case: "Zomato observes high checkout drop-offs because of unpredictable surge delivery fees."
            },
            {
              num: "02",
              phase: "Phase 2: Definition (Scope the Solution)",
              goal: "Turn insights into an actionable plan. Define what we are building and how we measure success.",
              activities: ["Prioritization (RICE, MOSCOW, Value-Effort)", "Success metrics / OKRs", "PRD writing", "Align with design & engineering"],
              outputs: ["PRD", "Prioritized roadmap", "Success metrics"],
              case: "Test a Flat Delivery Fee Subscription Model to reduce checkout abandonment by 15%."
            },
            {
              num: "03",
              phase: "Phase 3: Design (Shape the Experience)",
              goal: "Design an intuitive experience for solving the defined problem.",
              activities: ["Wireframes & prototypes in Figma", "User testing & usability reviews", "Accessibility & UI polishing"],
              outputs: ["Prototype", "Usability results", "Design specs"],
              case: "Prototype for 1-click subscription to Zomato delivery fee waiver."
            },
            {
              num: "04",
              phase: "Phase 4: Development (Build)",
              goal: "Build and test the feature until ready for release. Focus on functional alignment.",
              activities: ["Sprint planning & execution (Jira)", "Daily standups, bug triage", "QA & UAT testing", "Feature flag rollout"],
              outputs: ["Working MVP", "Release candidate", "Go/No-Go decision"],
              case: "Feature toggle rollout to 5% of users in Bangalore to test load performance."
            },
            {
              num: "05",
              phase: "Phase 5: Launch (Ship & Distribute)",
              goal: "“Shipping is a feature.” Release value to users and drive broad adoption.",
              activities: ["GTM strategy (Marketing, Sales, Support)", "Announcements, tutorials, walkthroughs", "Monitor adoption & sentiment"],
              outputs: ["GTM docs", "Release comms", "Launch dashboard"],
              case: "Email + push campaign tracking adoption of the new delivery subscription."
            },
            {
              num: "06",
              phase: "Phase 6: Iteration (Learn & Improve)",
              goal: "Improve continuously based on data. The cycle never truly ends.",
              activities: ["Analyze Mixpanel, GA, SQL reports", "Collect feedback (NPS, CSAT)", "Identify improvement opportunities"],
              outputs: ["Insights report", "Updated roadmap", "New hypothesis"],
              case: "Feature adoption = 70%, renewal = 30% → pricing experiment planned to improve retention."
            }
          ].map((item) => (
            <div key={item.num} className="relative pl-16">
              <div className="absolute left-0 top-0 text-5xl font-black text-zinc-100 select-none leading-none">{item.num}</div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-zinc-900 tracking-tight">{item.phase}</h3>
                <p className="font-bold text-zinc-600">Goal: {item.goal}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-2">Activities</h4>
                    <ul className="space-y-1">
                      {item.activities.map(a => <li key={a} className="text-sm font-medium text-zinc-500">• {a}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-2">Outputs</h4>
                    <ul className="space-y-1">
                      {item.outputs.map(o => <li key={o} className="text-sm font-medium text-zinc-500">• {o}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl mt-4">
                  <p className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-1">Industry Case</p>
                  <p className="text-sm font-bold text-indigo-700">{item.case}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
        <section className="bg-white border border-zinc-200 rounded-[2rem] p-8 shadow-sm">
          <h2 className="text-2xl font-black mb-8">SDLC VS PDLC</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="p-3 text-left text-xs uppercase tracking-widest">Aspect</th>
                  <th className="p-3 text-left text-xs uppercase tracking-widest">SDLC</th>
                  <th className="p-3 text-left text-xs uppercase tracking-widest">PDLC</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { a: "Focus", s: "Building software correctly", p: "Building the right product" },
                  { a: "Goal", s: "Deliver working, stable system", p: "Deliver user & business value" },
                  { a: "Scope", s: "Technical implementation", p: "Business + user + tech" },
                  { a: "Owner", s: "Engineering / Tech team", p: "Product Manager" },
                  { a: "Starts with", s: "Technical requirements", p: "Problem / opportunity" },
                  { a: "Ends with", s: "Deployment & maintenance", p: "Iteration, scale, or sunset" },
                  { a: "Success Metric", s: "Bug-free, performant software", p: "Adoption, retention, revenue" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-zinc-100 last:border-0">
                    <td className="p-3 font-black text-zinc-900">{row.a}</td>
                    <td className="p-3 text-zinc-500">{row.s}</td>
                    <td className="p-3 text-zinc-700 font-medium">{row.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-black text-indigo-900 mb-2">🎯 Assignment</h4>
          <p className="text-zinc-700 mb-4 italic">Pick any app (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and describe a new feature across the PDLC:</p>
          <div className="bg-white/50 p-6 rounded-xl border border-indigo-100 text-sm font-mono space-y-2">
            <div><strong>Product:</strong> ___</div>
            <div><strong>Feature Idea:</strong> ___</div>
            <div><strong>Discovery:</strong> Problem & insight: ___</div>
            <div><strong>Definition:</strong> Hypothesis & metrics: ___</div>
            <div><strong>Design:</strong> Sketch or description: ___</div>
            <div><strong>Development:</strong> Dependencies / risks: ___</div>
            <div><strong>Launch:</strong> Target segment & rollout plan: ___</div>
            <div><strong>Iteration:</strong> What will you measure?: ___</div>
          </div>
        </div>
        <div className="p-4 bg-zinc-950 rounded-xl flex items-center gap-4">
           <div className="p-3 bg-red-600 rounded-lg"><Play className="w-5 h-5 text-white fill-current" /></div>
           <div>
              <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Watch Tutorial</p>
              <a href="https://youtu.be/Fi3_BjVzpqk?si=sna3cOvBlGnX0ckI" target="_blank" className="text-sm font-bold text-white hover:text-indigo-400">SDLC Life Cycle for Beginners</a>
           </div>
        </div>
      </div>
    ),
    resources: [
        { title: "SDLC Life Cycle for Beginners", url: "https://youtu.be/Fi3_BjVzpqk?si=sna3cOvBlGnX0ckI", type: "video" }
    ]
  },
  {
    day: 3,
    title: 'Product Life Cycle (PLC) & PLM',
    category: 'Foundations',
    preview: 'Understand how products evolve in the market over time and how companies manage that journey.',
    content: (
      <div className="space-y-8">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 3: Product Life Cycle (PLC) & PLM 📘</h1>
        <p className="text-lg text-zinc-600 font-medium">Understand how products evolve in the market over time and how companies manage that journey.</p>
        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">What is Product Life Cycle (PLC)?</h2>
          <p>Product Life Cycle is the journey a product goes through in the market — from the day it is launched to the day it is eventually retired.</p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">What Are the 4 Stages of Product Life Cycle?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
               <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4"><Rocket className="w-6 h-6" /></div>
               <h3 className="font-black text-xl mb-2">Introduction</h3>
               <p className="text-sm text-zinc-500 leading-relaxed">This is when a new product is first introduced to the market. Sales are usually low because customers are just starting to become aware of the product, and marketing efforts are focused on building awareness and generating interest. Companies may be investing heavily in research and development during this stage.</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
               <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4"><TrendingUp className="w-6 h-6" /></div>
               <h3 className="font-black text-xl mb-2">Growth</h3>
               <p className="text-sm text-zinc-500 leading-relaxed">In this stage, the product starts to gain interest. Sales begin to increase as more customers become aware of the product and start buying it. Marketing efforts now focus on expanding market share and building brand loyalty. Competitors may also start entering the market during this stage.</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
               <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4"><CheckCircle className="w-6 h-6" /></div>
               <h3 className="font-black text-xl mb-2">Maturity</h3>
               <p className="text-sm text-zinc-500 leading-relaxed">This is the stage of peak sales. The product has reached its maximum market penetration, and sales growth starts to level off. Competition is usually intense, and companies may need to focus on differentiating their product through added features, improved quality, or competitive pricing.</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
               <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4"><ArrowRight className="w-6 h-6 rotate-45" /></div>
               <h3 className="font-black text-xl mb-2">Decline</h3>
               <p className="text-sm text-zinc-500 leading-relaxed">In the decline stage, sales begin to decline as customer preferences change, new technologies emerge, or market saturation occurs. Companies may choose to discontinue the product or try to extend it via strategies like updates, new marketing, or new segments.</p>
            </div>
          </div>
        </section>
        <section className="bg-zinc-900 text-white p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Settings className="w-24 h-24" /></div>
          <h2 className="text-2xl font-black mb-4 relative z-10">What is Product Lifecycle Management (PLM)?</h2>
          <p className="text-zinc-400 font-medium mb-6 relative z-10">Product Lifecycle Management (PLM) is the practice of managing a product from its initiation to its eventual retirement through a systematic approach.</p>
          <p className="text-zinc-300 text-sm leading-relaxed relative z-10">It's a system that helps manage every step of a product's life, from the initial idea and design to manufacturing, distribution, and even after it's sold. It's a way for companies to keep track of all the details and make sure everyone involved is on the same page throughout the product's journey. So, in simpler terms, PLM is like a guidebook that helps companies manage their products from start to finish.</p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">Stages of a Product in PLM</h2>
          <div className="space-y-4">
            {[
              { icon: <Lightbulb />, title: "Concept Stage", body: "The start of making a new product. Involves initial ideas and planning, market research, identifying customer needs, and determining feasibility. Usually R&D takes the lead." },
              { icon: <Beaker />, title: "Design Stage", body: "Careful plan for the product, building prototypes, and testing everything. Ensuring the design meets all rules and safety standards. Significant R&D spend happens here." },
              { icon: <Package />, title: "Production Stage", body: "Making the product at scale—getting materials, putting everything together, and quality checks. Design changes should be minimal at this point." },
              { icon: <Zap />, title: "Sales Stage", body: "About telling people about the product and getting them to buy it via advertisements, prices, and special deals. Forecasting is crucial." },
              { icon: <HeartHandshake />, title: "Support Stage", body: "Ongoing customer support including customer service, warranties, repairs, and services or training to enhance user experience." },
              { icon: <Recycle />, title: "Retirement Stage", body: "The life of the product ends due to better products, preference shifts, or tech moves. Includes responsible recycling or find new uses." }
            ].map((s, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-100 items-start">
                <div className="p-2 bg-white rounded-xl shadow-sm text-indigo-600">{s.icon}</div>
                <div>
                   <h4 className="font-black text-zinc-900">{s.title}</h4>
                   <p className="text-sm text-zinc-500 mt-1">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">Benefits of PLM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-zinc-100 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">Improved Collaboration</h4>
                <p className="text-xs text-zinc-500">PLM encourages cross-functional collaboration, ensuring all stakeholders work seamlessly.</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl border border-zinc-100 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">Enhanced Product Quality</h4>
                <p className="text-xs text-zinc-500">Integrating quality control into each phase results in higher-quality products.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-black text-indigo-900 mb-2">🎯 Assignment</h4>
          <p className="text-zinc-700 mb-4 italic">Pick any product (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and evaluate its lifecycle:</p>
          <div className="bg-white/50 p-6 rounded-xl border border-indigo-100 text-sm font-mono space-y-2">
            <div><strong>Product:</strong> ___</div>
            <div><strong>Current PLC Stage:</strong> ___</div>
            <div><strong>What signals tell you this stage?:</strong> ___</div>
            <div><strong>What should PM focus on right now (Strategy)?:</strong> ___</div>
            <div><strong>One risky decision PM must make at this stage:</strong> ___</div>
            <div><strong>If it’s declining, how would you extend or sunset it?:</strong> ___</div>
          </div>
        </div>
      </div>
    )
  },
  {
    day: 4,
    title: 'Product Sense Framework',
    category: 'Foundations',
    preview: 'Great PMs don’t build features. They solve meaningful problems. Master the "sixth sense" of Product Management.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 4: Product Sense Framework 📘</h1>
        <p className="text-xl text-zinc-600 font-medium leading-relaxed">Great PMs don’t build features. They solve meaningful problems. Master the "sixth sense" of Product Management.</p>
        <section className="bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 mb-4">What is Product Sense?</h2>
          <p className="text-zinc-700 leading-relaxed">Product sense is the ability to see through complexity and spot the user needs that matter most. Experts like <strong>Marty Cagan</strong> emphasize that it is deep product knowledge built through immersion, not an innate gift.</p>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
             <Eye className="text-indigo-600 w-8 h-8" />
             The 7 Pillars of Product Sense
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <HeartHandshake />, title: "Empathy & Customer Needs", body: "Listening for spoken and unspoken pain points and emotional drivers." },
              { icon: <Search />, title: "Market & Competitive Insight", body: "Analyzing trends and mapping competitor gaps to find unique value." },
              { icon: <Layout />, title: "Design & UX Perspective", body: "Recognizing good flows and how design decisions affect engagement." },
              { icon: <Compass />, title: "Problem Framing & Mapping", body: "Distinguishing root causes from symptoms and exploring options." },
              { icon: <Cpu />, title: "Feasibility & Execution", body: "Balancing ambitious ideas with tech constraints, budgets, and timelines." },
              { icon: <RefreshCcw />, title: "Iteration & Validation", body: "Using prototypes and experiments to adjust based on real data." },
              { icon: <Database />, title: "Domain Immersion", body: "Gaining deep knowledge of a space to predict behaviors and outcomes." }
            ].map((pillar, i) => (
              <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:border-indigo-200 transition-colors">
                 <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">{pillar.icon}</div>
                 <h4 className="font-black text-zinc-900 mb-2">{pillar.title}</h4>
                 <p className="text-sm text-zinc-500">{pillar.body}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-zinc-900 text-white p-8 md:p-12 rounded-[2.5rem]">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
            <Activity className="text-indigo-400" />
            Daily Habits to Build Instincts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div><h4 className="text-indigo-400 font-black uppercase tracking-widest text-xs mb-3">Talk to Users Regularly</h4><p className="text-zinc-400 text-sm">Read tickets, join sales calls, and observe context surveys miss.</p></div>
             <div><h4 className="text-indigo-400 font-black uppercase tracking-widest text-xs mb-3">Reverse-Engineer Products</h4><p className="text-zinc-400 text-sm">Break down apps like Airbnb to understand core needs and trade-offs.</p></div>
             <div><h4 className="text-indigo-400 font-black uppercase tracking-widest text-xs mb-3">Perform Product Drills</h4><p className="text-zinc-400 text-sm">List 3 strengths and 3 weaknesses of a daily-use app with justifications.</p></div>
             <div><h4 className="text-indigo-400 font-black uppercase tracking-widest text-xs mb-3">Embrace Constraints</h4><p className="text-zinc-400 text-sm">Design solutions under strict limits (e.g., 30s onboarding) to sharpen judgment.</p></div>
          </div>
        </section>
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">Common Pitfalls to Avoid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <LineChart />, title: "Over-reliance on 'Gut'", body: "Instincts must be tempered by data; ignoring analytics is dangerous unless honed by experience." },
              { icon: <PenTool />, title: "The Aesthetic Trap", body: "Don't mistake polished UI for good product sense; a beautiful design solving the wrong problem is a failure." },
              { icon: <AlertTriangle />, title: "Feature Bloat", body: "Weak sense leads to 'copying competitors', resulting in a bloated product that fails real problems." }
            ].map((pitfall, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-red-50/30 border border-red-100 items-start">
                 <div className="p-2 bg-white rounded-xl shadow-sm text-red-600 shrink-0">{pitfall.icon}</div>
                 <div><h4 className="font-black text-zinc-900">{pitfall.title}</h4><p className="text-sm text-zinc-500 mt-1">{pitfall.body}</p></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-8">
        <div className="p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm">
          <h4 className="text-lg font-black text-indigo-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5" />Reading Task</h4>
          <a href="https://www.parallelhq.com/blog/what-product-sense" target="_blank" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline">“What is Product Sense? by Robin Dhanwani” <ExternalLink className="w-4 h-4" /></a>
        </div>
      </div>
    )
  },
  {
    day: 5,
    title: 'User Empathy',
    category: 'Foundations',
    preview: 'Step into their shoes. User empathy is the fundamental driver of human-centered development.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 5: User Empathy 📘</h1>
        <p className="text-xl text-zinc-600 font-medium leading-relaxed">Step into their shoes. User empathy is the fundamental driver of human-centered development.</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">User Empathy in Product</h2>
          <p className="text-zinc-700 leading-relaxed">User empathy is the ability to understand and share the feelings, needs, and perspectives of users by "stepping into their shoes" to view the product through their eyes. It drives human-centered development.</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">Core Principles of User Empathy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
               <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4"><Ear className="w-6 h-6" /></div>
               <h4 className="font-black text-zinc-900 mb-2">Active Listening</h4>
               <p className="text-sm text-zinc-500 leading-relaxed">Listen without judgment. Encourage open communication and hear what's NOT being said.</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
               <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4"><UserCheck className="w-6 h-6" /></div>
               <h4 className="font-black text-zinc-900 mb-2">Putting Users First</h4>
               <p className="text-sm text-zinc-500 leading-relaxed">Prioritize user needs over internal assumptions or ego. Align decisions with their interests.</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
               <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4"><Smile className="w-6 h-6" /></div>
               <h4 className="font-black text-zinc-900 mb-2">Deep Connection</h4>
               <p className="text-sm text-zinc-500 leading-relaxed">Grasp challenges, desires, and emotional motivations of your audience, not just tech specs.</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">Implementation Process for PMs</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
               <div className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center font-black shrink-0 shadow-lg">1</div>
               <div className="space-y-3">
                  <h4 className="font-black text-xl text-zinc-900">User Research & Personas</h4>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">Research Methods:</p>
                  <p className="text-sm text-zinc-600">Interviews, surveys, and usability testing.</p>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">Personas:</p>
                  <p className="text-sm text-zinc-600">Visualize different user groups.</p>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">Empathy Maps:</p>
                  <p className="text-sm text-zinc-600">Map what users think, feel, experience, and do.</p>
               </div>
            </div>

            <div className="flex gap-6 items-start">
               <div className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center font-black shrink-0 shadow-lg">2</div>
               <div className="space-y-3">
                  <h4 className="font-black text-xl text-zinc-900">Design Thinking Integration</h4>
                  <div className="flex flex-wrap gap-2 py-2">
                     {['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'].map((step, i) => (
                       <React.Fragment key={step}>
                         <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-black uppercase tracking-widest">{step}</span>
                         {i < 4 && <ArrowRight className="w-4 h-4 text-zinc-300 self-center" />}
                       </React.Fragment>
                     ))}
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">PMs observe interactions, define pain points, ideate solutions, and test prototypes to refine the experience based on feedback.</p>
               </div>
            </div>

            <div className="flex gap-6 items-start">
               <div className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center font-black shrink-0 shadow-lg">3</div>
               <div className="space-y-3">
                  <h4 className="font-black text-xl text-zinc-900">Continuous Feedback Loops</h4>
                  <p className="text-sm text-zinc-600 leading-relaxed">Involve users at every stage, not just at the end. Use User Acceptance Testing (UAT) and iterative analysis to evolve with changing user preferences.</p>
               </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">Key Tools & Frameworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100"><h4 className="font-black text-zinc-900 mb-1">User Journey Mapping</h4><p className="text-xs text-zinc-500">Visualizing the path a user takes.</p></div>
             <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100"><h4 className="font-black text-zinc-900 mb-1">User Stories</h4><p className="text-xs text-zinc-500">Features from the user's perspective.</p></div>
             <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100"><h4 className="font-black text-zinc-900 mb-1">User Flows</h4><p className="text-xs text-zinc-500">Step-by-step task completion.</p></div>
             <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100"><h4 className="font-black text-zinc-900 mb-1">User Segments</h4><p className="text-xs text-zinc-500">Categorizing unique group needs.</p></div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">Real-World Success</h2>
          <div className="space-y-4">
             <div className="p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                <h4 className="font-black text-zinc-900 mb-2">Apple</h4>
                <p className="text-sm text-zinc-600">Demonstrates empathy through user-friendly interfaces and seamless experiences that create a loyal base.</p>
             </div>
             <div className="p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                <h4 className="font-black text-zinc-900 mb-2">Airbnb</h4>
                <p className="text-sm text-zinc-600">Achieved success by focusing on the traveler's need for unique and personalized experiences.</p>
             </div>
          </div>
          <p className="text-center font-black text-indigo-600 italic py-6">"Empathy is a core value that ensures products exceed expectations, not just meet them."</p>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-10">
        <div className="p-8 bg-white rounded-[2rem] border border-indigo-100 shadow-sm">
           <h4 className="text-lg font-black text-indigo-900 mb-6 flex items-center gap-2"><Target className="w-5 h-5" /> 🎯 Task</h4>
           <p className="text-zinc-700 leading-relaxed mb-6 font-medium">Find out: <strong>How did Airbnb use user empathy to drive their success?</strong> Look for specific stories about their "early days" and how they handled user problems.</p>
           
           <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400">Reflection Questions</h4>
              <div className="grid grid-cols-1 gap-4">
                 {[
                   { q: "How did they identify the problem travelers faced?", num: "1" },
                   { q: "What 'unscalable' things did the founders do to empathize with hosts?", num: "2" },
                   { q: "How is that empathy reflected in the current app experience?", num: "3" }
                 ].map((item) => (
                   <div key={item.num} className="flex gap-4 items-start p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">{item.num}</div>
                      <p className="text-sm font-bold text-zinc-800">{item.q}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 6,
    title: "Essential Product Documentation",
    category: "Foundations",
    preview: "PRDs, BRDs, User Stories, and Roadmaps. The tools of a professional translator.",
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 6: Essential Product Documentation: A Product Manager's Complete Guide 📘</h1>
        
        <section className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-200">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-zinc-900 uppercase tracking-widest">
             <Target className="text-indigo-600" />
             Learning Objective
          </h2>
          <div className="space-y-4">
            <h4 className="font-bold text-zinc-800">Essential Product Documentation for Product Managers</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 "Distinguish between document types (PRD, BRD, user stories, roadmaps, etc.) and select the appropriate format for different communication needs",
                 "Create comprehensive Product Requirements Documents (PRDs) that include problem statements, success metrics, prioritized requirements, and clear scope boundaries",
                 "Build compelling Business Requirements Documents (BRDs) that articulate business objectives, market analysis, financial projections, and ROI justification",
                 "Write effective user stories and acceptance criteria using the standard format while ensuring they are independent, valuable, and testable",
                 "Develop outcome-focused roadmaps that communicate product strategy across multiple time horizons without over-committing to specific features",
                 "Produce go-to-market documentation including launch plans, sales enablement materials, and customer-facing release notes",
                 "Apply documentation best practices such as knowing your audience, maintaining accessibility, keeping content scannable, and updating documents regularly",
                 "Make strategic decisions about when to document versus when to communicate through other channels, balancing value creation against maintenance costs",
                 "Maintain decision logs and meeting notes to create institutional memory and prevent endless relitigating of past choices",
                 "Develop a documentation mindset that views writing as a tool for clarifying thinking, creating alignment, and multiplying product management impact"
               ].map((obj, i) => (
                 <li key={i} className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> {obj}
                 </li>
               ))}
            </ul>
          </div>
        </section>

        <section className="prose prose-zinc max-w-none">
          <p className="text-lg leading-relaxed">
            Product managers are <strong>professional translators</strong>. We translate customer needs into technical requirements, business strategy into product roadmaps, and abstract visions into concrete execution plans. Documentation is the primary medium for this translation work.
          </p>
          <p>
            Yet many product managers struggle with documentation—either producing volumes of text nobody reads or creating nothing at all and wondering why teams feel misaligned. The key is understanding which documents serve which purposes and crafting each with intention.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <FileStack className="text-indigo-600" />
            The Product Requirements Document (PRD)
          </h2>
          <div className="space-y-4">
            <p>The PRD is the product manager's most fundamental artifact. It defines what you're building, why you're building it, and what success looks like. Think of it as the single source of truth that aligns engineering, design, marketing, and leadership around a shared understanding.</p>
            <p>A strong PRD typically includes several core elements. Start with the problem statement and context—what customer or business problem are you solving, and why does it matter now? Include relevant background on market dynamics, competitive landscape, or strategic rationale. Next comes the objectives and success metrics. Define what good looks like with specific, measurable outcomes. Are you increasing conversion by 15 percent, reducing support tickets by half, or entering a new market segment?</p>
            <p>The requirements themselves should be clear and prioritized. Describe user stories or use cases that illustrate how people will interact with the product. Specify functional requirements—what the product must do—and non-functional requirements like performance, security, or scalability constraints. Distinguish between must-haves for launch and nice-to-haves for future iterations.</p>
            <p>Include user experience considerations, even if you have separate design documentation. Call out key user flows, information architecture decisions, or design principles that should guide the work. Add technical considerations or constraints that engineering should know upfront. If you're integrating with existing systems, migrating data, or working within platform limitations, surface these early.</p>
            <p>Finally, define scope boundaries explicitly. What are you deliberately not doing? What questions remain open? What assumptions are you making? These boundaries prevent scope creep and clarify decision-making authority.</p>
            <p>The best PRDs are living documents. Update them as you learn from user testing, technical discovery, or changing business conditions. Date your revisions and maintain a changelog so everyone knows they're working from current information.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <Briefcase className="text-indigo-600" />
            The Business Requirements Document (BRD)
          </h2>
          <div className="space-y-4">
            <p>While PRDs focus on the product itself, BRDs articulate the business case. This document answers the question every executive asks: why should we invest resources in this?</p>
            <p>BRDs typically flow from strategy to execution. Begin with business objectives—how does this initiative support company goals? Connect the dots between your product work and revenue growth, market expansion, cost reduction, or strategic positioning.</p>
            <p>Market analysis provides essential context. What's the opportunity size? Who are the target customers and what segments are you pursuing? How does the competitive landscape influence your approach? Include relevant market research, customer insights, or industry trends that validate the opportunity.</p>
            <p>The financial analysis is where you quantify the business case. Project expected revenue impact, development costs, ongoing operational expenses, and return on investment. Be honest about assumptions and risks. Executives appreciate realistic projections more than hockey-stick fantasies.</p>
            <p>Outline high-level requirements from a business perspective—not technical features but business capabilities. For instance, "enable enterprise customers to manage user permissions" rather than "build role-based access control system." Include stakeholder analysis showing who's impacted and who needs to be involved.</p>
            <p>Define success criteria and key performance indicators. How will you measure whether this initiative achieved its business objectives? Include both leading indicators you can track during development and lagging indicators that show ultimate business impact.</p>
            <p>BRDs are particularly valuable for large initiatives requiring executive approval or significant resource allocation. For smaller features, the business rationale might fold into your PRD rather than warranting a separate document.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <MessageSquare className="text-indigo-600" />
            User Stories and Acceptance Criteria
          </h2>
          <div className="space-y-4">
            <p>User stories translate requirements into human terms. The classic format—"As a [user type], I want [action] so that [benefit]"—forces you to think from the user's perspective and articulate the underlying value.</p>
            <p>Effective user stories are independent, negotiable, valuable, estimable, small, and testable. They describe what users want to accomplish, not how the system should work. Instead of "the system shall display a confirmation dialog," write "as a user, I want confirmation before deleting data so that I don't accidentally lose my work."</p>
            <p>Acceptance criteria define when a story is complete. These are specific, testable conditions that must be met. Use clear language: "Given I'm on the checkout page, when I click 'Apply Coupon' and enter a valid code, then the discount appears and the total updates." This precision prevents misunderstandings and makes testing straightforward.</p>
            <p>Group related user stories into epics for larger features. An epic like "Customer Self-Service Portal" might contain dozens of individual stories about login, account management, support ticket creation, and knowledge base search.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <Map className="text-indigo-600" />
            Product Roadmaps
          </h2>
          <div className="space-y-4">
            <p>Roadmaps communicate your product strategy over time. Unlike detailed project plans, roadmaps show the big picture—what you're building, when, and why it matters.</p>
            <p>The best roadmaps are theme-based or outcome-focused rather than feature-committed. Instead of promising "advanced search functionality in Q2," articulate the goal: "improve content discoverability." This gives you flexibility in execution while maintaining strategic clarity.</p>
            <p>Include multiple time horizons. The current quarter might show specific features in development. The next two quarters might show planned initiatives or problem areas you'll address. Beyond that, indicate strategic themes or areas of exploration. This graduated specificity acknowledges increasing uncertainty over time.</p>
            <p>Color-code or categorize initiatives by strategic pillar—customer acquisition, retention, operational efficiency, or platform foundation. This helps stakeholders see how you're balancing different priorities.</p>
            <p>Roadmaps are communication tools, not commitments. Make the assumptions and dependencies explicit. Note that timelines shift based on learning, resource changes, or strategic pivots. Update roadmaps regularly and communicate changes transparently.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <Code className="text-indigo-600" />
            Technical Specifications and Architecture Documents
          </h2>
          <div className="space-y-4">
            <p>While product managers don't typically write detailed technical specs, you might create high-level architecture documents or integration specifications, especially when coordinating across multiple systems or teams.</p>
            <p>These documents describe system components, data flows, integration points, and technical dependencies. Include diagrams showing how pieces fit together. Specify API contracts when systems need to communicate. Call out technical constraints or requirements that impact product decisions.</p>
            <p>Work closely with engineering leads on these documents. You bring the product context and business requirements; they bring technical expertise and implementation knowledge. The collaboration ensures technical approaches align with product vision.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <Megaphone className="text-indigo-600" />
            Go-to-Market Documentation
          </h2>
          <div className="space-y-4">
            <p>Product launches require coordinating marketing, sales, customer success, and support teams. Go-to-market documents ensure everyone understands the product and their role in the launch.</p>
            <p>Launch plans outline timelines, responsibilities, and dependencies across teams. When does marketing need final messaging? When should sales training happen? When do you notify existing customers? Map out the critical path and identify potential bottlenecks.</p>
            <p>Product messaging and positioning documents help marketing tell your product's story. What problem does it solve? Who is it for? How is it different from alternatives? What are the key benefits and use cases? Provide concrete examples and customer quotes when possible.</p>
            <p>Sales enablement materials translate product features into value propositions. Create one-pagers with customer-facing benefits, demo scripts highlighting key workflows, objection handling for common concerns, and competitive differentiation guides. Sales teams need to understand not just what the product does but why customers should care.</p>
            <p>Create support and customer success documentation covering common questions, known issues, and troubleshooting steps. Training materials should help teams guide customers through setup, onboarding, and common use cases.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <RefreshCcw className="text-indigo-600" />
            Release Notes and Changelogs
          </h2>
          <div className="space-y-4">
            <p>Release notes document what changed in each product update. They serve multiple audiences—customers who want to know what's new, support teams who need to answer questions, and internal teams tracking progress.</p>
            <p>Write release notes in customer-friendly language. Instead of "implemented OAuth 2.0 authentication," say "you can now sign in using your Google account." Group changes into categories like new features, improvements, and bug fixes.</p>
            <p>Include relevant context. If you're removing a feature, explain why and provide alternatives. If you're changing workflows, help users understand what to expect. Link to detailed documentation for complex features.</p>
            <p>Maintain a public changelog showing your product's evolution over time. This transparency builds trust and helps customers see your commitment to continuous improvement.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <PenTool className="text-indigo-600" />
            Design Documentation
          </h2>
          <div className="space-y-4">
            <p>While designers typically own detailed design specs, product managers should contribute to or review design documentation covering user flows, wireframes, and interaction patterns.</p>
            <p>User flow diagrams map how users move through key tasks. They reveal complexity, dead ends, or opportunities to streamline experiences. Annotated wireframes explain the rationale behind layout decisions, prioritization of information, and interaction patterns.</p>
            <p>Design specifications detail visual elements, spacing, typography, and interaction states. Even if designers create these, your review ensures they align with product requirements and use cases.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <History className="text-indigo-600" />
            Meeting Notes and Decision Logs
          </h2>
          <div className="space-y-4">
            <p>Some of the most valuable documentation happens in real time. Detailed meeting notes capture discussions, decisions, and action items. They're especially critical for cross-functional meetings where misalignment can derail projects.</p>
            <p>Decision logs record important product choices, the reasoning behind them, and who was involved. When someone questions a decision months later—and they will—you can point to the documented rationale rather than relitigating endlessly.</p>
            <p>Include the context, alternatives considered, tradeoffs analyzed, and the final decision. Note any dissenting opinions or concerns raised. This creates institutional memory and helps new team members understand how you got where you are.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <Presentation className="text-indigo-600" />
            One-Pagers and Executive Summaries
          </h2>
          <div className="space-y-4">
            <p>Busy stakeholders rarely read lengthy documents. One-pagers distill complex initiatives into digestible summaries covering the problem, proposed solution, expected impact, required resources, and key risks.</p>
            <p>Use visual elements—diagrams, charts, or mockups—to convey information quickly. Structure content with clear headers so readers can scan for what matters to them. Lead with the most important information rather than building to a conclusion.</p>
            <p>One-pagers work well for pitching new initiatives, securing resources, or updating executives on progress. They force you to clarify your thinking and strip away unnecessary detail.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <ShieldCheck className="text-indigo-600" />
            Documentation Best Practices
          </h2>
          <div className="space-y-4">
            <p>Regardless of document type, certain principles create more effective documentation. Know your audience and write for them. Engineers need technical detail; executives need business context. Tailor depth, terminology, and emphasis accordingly.</p>
            <p>Be concise and scannable. Use headers, bullet points, and white space to break up text. Front-load key information. Most readers skim rather than read every word.</p>
            <p>Keep documentation accessible and discoverable. Use a central repository—whether that's Confluence, Notion, Google Docs, or another platform—where teams know to look. Use consistent naming conventions and folder structures. Link related documents together.</p>
            <p>Maintain documentation as you go rather than letting it rot. Outdated documentation is worse than none because it spreads misinformation. Set reminders to review and update key documents quarterly.</p>
            <p>Be visual when it helps understanding. Diagrams often communicate relationships, flows, or architecture more clearly than paragraphs. Screenshots illustrate UI concepts better than descriptions.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <AlertTriangle className="text-indigo-600" />
            When Not to Document
          </h2>
          <div className="space-y-4">
            <p>Documentation has costs. It takes time to create and maintain. It can become a crutch that prevents verbal communication. It sometimes gives false confidence that alignment exists when people interpret written words differently.</p>
            <p>Don't document for documentation's sake. If a quick conversation resolves something, talk. If requirements are changing rapidly during early exploration, capture decisions without premature specification. If a document would have one reader, consider whether an email or message suffices.</p>
            <p>The test is simple: does this documentation create more value than it costs to produce and maintain? If yes, write it. If no, find another way to communicate and align.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <Zap className="text-indigo-600" />
            The Documentation Mindset
          </h2>
          <div className="space-y-4">
            <p>Great product managers develop a documentation mindset. They recognize that writing clarifies thinking, that documents create shared understanding, and that good documentation multiplies their impact by aligning teams asynchronously.</p>
            <p>They invest in documentation templates and frameworks that make creation faster. They build documentation time into their workflow rather than treating it as an afterthought. They refine their writing to be clearer and more concise.</p>
            <p>Most importantly, they view documentation not as a bureaucratic requirement but as a tool for building better products with less friction. When teams spend less time confused and more time executing, that's documentation working exactly as it should.</p>
            <p>The documents themselves matter less than the clarity, alignment, and momentum they create. Master the art of product documentation, and you'll master much of what makes product management effective.</p>
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl">
              <h3 className="font-black text-white mb-6 flex items-center gap-2 tracking-tight text-lg uppercase">
                  <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                  Task: Watch & Learn
              </h3>
              <ul className="space-y-4">
                  <li>
                    <a href="https://youtu.be/cnp6Ck8OIiY?si=eJHw5hzcwuiZZyf0" target="_blank" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                        <ExternalLink className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-bold text-zinc-100 tracking-tight">Watch: PRODUCT STRATEGY & ROADMAP</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://youtu.be/eDVtBleIxag?si=mE-x6s3HPTloD13x" target="_blank" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                        <ExternalLink className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-bold text-zinc-100 tracking-tight">Watch: GTM Strategy</span>
                    </a>
                  </li>
              </ul>
           </div>

           <div className="bg-white rounded-2xl p-8 border border-indigo-100 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-black text-indigo-900 mb-4 flex items-center gap-2 uppercase tracking-tighter">
                   <PenTool className="w-5 h-5" /> 🎯 Assignment
                </h4>
                <p className="text-zinc-700 mb-6 font-medium leading-relaxed">
                   Create your own professional PRD using ChatPRD. Apply the principles learned today to define a feature idea from scratch.
                </p>
              </div>
              <a href="https://www.chatprd.ai/" target="_blank" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-sm shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
                 Open ChatPRD <ArrowRight className="w-5 h-5" />
              </a>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 7,
    title: 'Stakeholder Management',
    category: 'Strategy',
    preview: 'Learn to align diverse groups without direct authority using the Power Map.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 7: Stakeholder Management: The Product Manager's Essential Guide 📘</h1>
        
        <section className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-200">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-zinc-900 uppercase tracking-widest">
             <Target className="text-indigo-600" />
             Learning Objectives
          </h2>
          <div className="space-y-4">
            <h4 className="font-bold text-zinc-800">Stakeholder Management for Product Managers</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 "Identify and categorize stakeholders using influence and interest matrices to prioritize engagement efforts effectively",
                 "Tailor communication strategies to different stakeholder groups based on their specific needs, concerns, and decision-making authority",
                 "Build coalitions rather than seeking consensus by identifying champions, addressing skeptics, and securing sufficient support for product decisions",
                 "Manage executive relationships by framing recommendations in business outcomes, respecting their time, and using reviews strategically",
                 "Navigating conflict constructively by uncovering underlying concerns, using data to inform debates, and maintaining focus on ideas rather than personal disagreements",
                 "Say no gracefully while preserving relationships by grounding refusals in strategy, offering alternatives, and maintaining transparency",
                 "Collaborate effectively with engineering teams by involving them early in problem-framing, respecting technical constraints, and defending against disruptive scope changes",
                 "Measure stakeholder management success through indicators like decision velocity, cross-functional volunteering, and whether decisions remain stable over time"
               ].map((obj, i) => (
                 <li key={i} className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> {obj}
                 </li>
               ))}
            </ul>
          </div>
        </section>

        <section className="prose prose-zinc max-w-none">
          <p className="text-lg leading-relaxed">Product managers often joke that they have "all the responsibility but none of the authority." This paradox makes stakeholder management not just important—it's the difference between shipping transformative products and watching promising ideas die in committee.</p>
          <p>At its core, stakeholder management is the art and science of aligning diverse groups around a shared product vision while navigating competing priorities, limited resources, and organizational politics. For product managers, it's as fundamental as roadmap planning or user research.</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <Search className="text-indigo-600" />
            Understanding Your Stakeholder Landscape
          </h2>
          <div className="space-y-4">
            <p>The first step in effective stakeholder management is mapping who actually matters to your product's success. Stakeholders typically fall into several categories: executives who control budgets and strategic direction, engineering teams who build your vision, designers who craft the experience, sales and marketing who bring products to market, customer success teams on the front lines, and of course, the customers themselves.</p>
            <p>Each group views your product through a different lens. Each lens is valid. Your job isn't to make everyone think alike but to synthesize these perspectives into coherent product decisions.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <Layers className="text-indigo-600" />
            The Power Map: Influence vs. Interest
          </h2>
          <div className="space-y-4">
            <p>Not all stakeholders deserve equal time. Create a simple two-by-two matrix plotting stakeholders by their influence over your product and their interest in it. Those with high influence and high interest are your key players who need regular engagement and input. High influence but lower interest stakeholders need enough information to stay supportive without overwhelming them with details. High interest but lower influence groups can be valuable allies and advocates. Low on both dimensions might only need basic updates.</p>
            <p>This isn't about playing politics or being manipulative. It's about being strategic with your most limited resource: time.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <MessageSquare className="text-indigo-600" />
            Communication: Tailored, Transparent, and Timely
          </h2>
          <div className="space-y-4">
            <p>The biggest mistake product managers make is using one-size-fits-all communication. Your engineering lead doesn't need the same update as your CFO. Tailor your message to what each stakeholder cares about and the level of detail they need.</p>
            <p>For executives, focus on outcomes, metrics, and strategic alignment. Keep it high-level unless they drill down. For technical teams, share the reasoning behind decisions, technical tradeoffs, and how their input shaped direction. For go-to-market teams, emphasize customer value, positioning, and competitive angles.</p>
            <p>Transparency builds trust, even when delivering bad news. If a feature is slipping or a metric missed its target, share it early with context and a plan. Stakeholders can handle setbacks; they can't handle surprises.</p>
            <p>Timing matters too. Involve stakeholders when their input can actually influence decisions, not after choices are made. Nothing breeds resentment faster than consultation theater where people are asked for opinions you'll ignore.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <Users2 className="text-indigo-600" />
            Building Coalitions, Not Consensus
          </h2>
          <div className="space-y-4">
            <p>Here's a liberating truth: you don't need everyone to agree. Seeking universal consensus leads to watered-down products that please no one. Instead, build coalitions around decisions.</p>
            <p>This means understanding who needs to actively support a decision versus who simply needs to not block it. For major product bets, identify your champions who will advocate alongside you. Find common ground with skeptics rather than trying to convert them entirely. Sometimes the best outcome is neutral acceptance rather than enthusiastic support.</p>
            <p>Document decisions and the reasoning behind them. When disagreements arise later—and they will—you can point back to the shared understanding rather than relitigating every choice.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <TrendingUp className="text-indigo-600" />
            Managing Up: Your Executive Stakeholders
          </h2>
          <div className="space-y-4">
            <p>Executives control resources, remove roadblocks, and provide air cover for bold bets. Managing up effectively means making their jobs easier while advancing your product goals.</p>
            <p>Come prepared with recommendations, not just problems. Frame choices in terms of business outcomes they care about. If you need a decision, provide clear options with your recommendation. Respect their time by being concise and knowing when to escalate versus when to decide yourself.</p>
            <p>Use executive reviews strategically. These aren't just status updates but opportunities to secure commitment, remove obstacles, or shift strategy. Always leave with clear next steps and documented decisions.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <Code className="text-indigo-600" />
            The Delicate Dance with Engineering
          </h2>
          <div className="space-y-4">
            <p>Product and engineering partnerships make or break execution. The best product managers treat engineers as collaborators, not order-takers. Involve them early in problem framing before jumping to solutions. Respect technical constraints while pushing for creative approaches. Defend engineers from scope creep and last-minute changes that erode trust.</p>
            <p>When priorities shift—and they always do—explain the why, acknowledge the disruption, and work together on the path forward. Engineers will accept change when they understand the reasoning and feel heard in the process.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <X className="text-indigo-600" />
            Saying No Gracefully
          </h2>
          <div className="space-y-4">
            <p>Product managers must say no constantly. Every yes to one feature is a no to dozens of others. The key is saying no in a way that preserves relationships.</p>
            <p>Ground refusals in strategy and data rather than personal preference. Instead of "we can't do that," try "here's where that sits against our priorities and why we're sequencing things this way." Offer alternatives or a path to revisiting the request later. Sometimes "not now" is easier to accept than "never."</p>
            <p>Keep a backlog of rejected ideas. When stakeholders see that you track and occasionally resurrect good suggestions, they trust the process more.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <AlertTriangle className="text-indigo-600" />
            Navigating Conflict and Disagreement
          </h2>
          <div className="space-y-4">
            <p>Conflict is inevitable when passionate people care about product direction. Healthy conflict focused on ideas improves outcomes. Personal conflict derails teams.</p>
            <p>When disagreements arise, seek first to understand the underlying concern. A VP demanding a feature might really be worried about competitive positioning. An engineer pushing back on architecture might be concerned about future scalability. Address the root issue, not just the surface request.</p>
            <p>Find data to inform debates. User research, competitive analysis, and customer feedback can shift conversations from opinion to evidence. Sometimes you need to run small experiments to resolve disputes rather than endless discussions.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <Activity className="text-indigo-600" />
            Measuring Stakeholder Management Success
          </h2>
          <div className="space-y-4">
            <p>How do you know if you're managing stakeholders well? Look for leading indicators like response times when you need input, unsolicited support from stakeholders in key meetings, and whether people come to you proactively with ideas versus ambushing you with complaints.</p>
            <p>Track whether decisions stick or get relitigated constantly. Measure how quickly you can move from idea to execution. Notice whether cross-functional teams volunteer for your initiatives or drag their feet.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
            <Zap className="text-indigo-600" />
            The Long Game
          </h2>
          <div className="space-y-4">
            <p>Stakeholder management isn't about manipulation or playing politics. It's about building trust over time through consistent communication, delivered results, and treating people with respect even in disagreement.</p>
            <p>Invest in relationships before you need them. Grab coffee with that engineering director when things are calm, not just when you need something. Understand what keeps your executives up at night. Learn what sales is hearing from customers.</p>
            <p>The best product managers make stakeholder management look effortless because they've built a foundation of credibility, clear communication, and genuine partnership. It's not a skill you master overnight but one you hone throughout your career.</p>
            <p>In the end, products succeed not just through brilliant strategy or flawless execution but through the collective will of organizations aligned around a common goal. That alignment doesn't happen by accident. It happens through thoughtful, strategic stakeholder management that turns individual contributors into a unified force. And that's what separates good product managers from truly great ones.</p>
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl">
              <h3 className="font-black text-white mb-6 flex items-center gap-2 tracking-tight text-lg uppercase">
                  <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                  Must Watch
              </h3>
              <ul className="space-y-4">
                  <li>
                    <a href="https://youtu.be/jz7tPVDwb50?si=71B7Acqz6U2F0XA8" target="_blank" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                        <ExternalLink className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-bold text-zinc-100 tracking-tight">Communicating and Working with Stakeholders</span>
                    </a>
                  </li>
              </ul>
           </div>

           <div className="bg-indigo-900 rounded-2xl p-8 border border-indigo-800 shadow-xl flex flex-col justify-between text-white">
              <div>
                <h4 className="text-lg font-black text-indigo-300 mb-4 flex items-center gap-2 uppercase tracking-tighter">
                   <PenTool className="w-5 h-5" /> 🎯 Task
                </h4>
                <p className="text-indigo-100 mb-6 font-medium leading-relaxed">
                   Draft a "Stakeholder Plan" for a feature launch involving Engineering, Design, Legal, and Marketing teams. Map each group on the Influence/Interest matrix and define your communication cadence for each.
                </p>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 8,
    title: 'Business Fundamentals for PMs',
    category: 'Strategy',
    preview: 'Master the metrics that drive sustainable products. Learn CAC, LTV, and the "Golden Ratio" of business success.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 8: Business Fundamentals for PMs 💰</h1>
        <p className="text-xl text-zinc-600 font-medium leading-relaxed">Master the metrics that drive sustainable products. Learn CAC, LTV, and the "Golden Ratio" of business success.</p>

        <section className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-zinc-900 uppercase tracking-widest">
             <Target className="text-indigo-600" />
             Learning Objectives
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               "Understand and calculate key unit economics metrics (CAC, LTV, payback period)",
               "Identify and analyze different business models and revenue streams",
               "Evaluate product decisions through a business lens",
               "Communicate the business impact of product features",
               "Assess product-market fit using business metrics"
             ].map((obj, i) => (
               <li key={i} className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> {obj}
               </li>
             ))}
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">Why Business Fundamentals Matter for PMs</h2>
          <p className="text-zinc-600 font-medium">Product Managers are often called the "mini-CEO" of their product. Here's why business knowledge is critical:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
                <h4 className="font-black text-zinc-900 mb-4 flex items-center gap-2">
                   <Smile className="text-indigo-600 w-5 h-5" /> What Good PMs Do
                </h4>
                <ul className="space-y-2 text-sm text-zinc-500 font-bold">
                   <li>• Balance user value with business value</li>
                   <li>• Justify investments with ROI calculations</li>
                   <li>• Speak confidently to executives</li>
                   <li>• Understand customer lifecycle economics</li>
                </ul>
             </div>
             <div className="bg-red-50/30 p-6 rounded-3xl border border-red-100 shadow-sm">
                <h4 className="font-black text-red-900 mb-4 flex items-center gap-2">
                   <AlertTriangle className="text-red-600 w-5 h-5" /> Common PM Mistakes
                </h4>
                <ul className="space-y-2 text-sm text-red-700 font-bold">
                   <li>• Building features users love but don't pay for</li>
                   <li>• Ignoring customer acquisition costs</li>
                   <li>• Focusing on vanity metrics</li>
                   <li>• Ignoring sustainability</li>
                </ul>
             </div>
          </div>
        </section>

        <section className="space-y-6">
           <h2 className="text-2xl font-black tracking-tight text-zinc-900">Business Success & Failure</h2>
           <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex gap-6 items-start">
                 <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0"><X className="text-zinc-900" /></div>
                 <div>
                    <h4 className="font-black text-zinc-900 mb-1">Twitter/X</h4>
                    <p className="text-sm text-zinc-500 font-medium leading-relaxed">Built incredible engagement but struggled with monetization for a decade. Engagement ≠ Business Success.</p>
                 </div>
              </div>
              <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex gap-6 items-start">
                 <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0 text-pink-600"><Smartphone /></div>
                 <div>
                    <h4 className="font-black text-zinc-900 mb-1">Instagram</h4>
                    <p className="text-sm text-zinc-500 font-medium leading-relaxed">Delayed monetization to focus on growth. Worked because they had Facebook's massive resources.</p>
                 </div>
              </div>
              <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex gap-6 items-start">
                 <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0"><PenTool /></div>
                 <div>
                    <h4 className="font-black text-zinc-900 mb-1">Notion</h4>
                    <p className="text-sm text-zinc-500 font-medium leading-relaxed">Freemium model carefully designed to convert power users. Model aligned perfectly with user behavior.</p>
                 </div>
              </div>
           </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
                 <TrendingDown className="text-red-500" /> Customer Acquisition Cost (CAC)
              </h2>
              <div className="bg-[#F0FFFF] text-zinc-900 p-8 rounded-[2rem] shadow-xl border border-blue-100">
                 <p className="text-indigo-600 font-black uppercase tracking-widest text-[10px] mb-2">The Formula</p>
                 <div className="text-xl md:text-2xl font-black font-mono mb-4">CAC = (Total Mkt + Sales Costs) / # New Users</div>
                 <div className="pt-4 border-t border-indigo-100">
                    <p className="text-xs text-indigo-700 font-black">Example: $50,000 spend + 500 users = $100 CAC</p>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
                 <TrendingUp className="text-emerald-500" /> Lifetime Value (LTV)
              </h2>
              <div className="bg-[#F0FFFF] text-zinc-900 p-8 rounded-[2rem] shadow-xl border border-blue-100">
                 <p className="text-indigo-600 font-black uppercase tracking-widest text-[10px] mb-2">Simple LTV</p>
                 <div className="text-xl md:text-2xl font-black font-mono mb-4">ARPU × Avg Lifespan</div>
                 <p className="text-indigo-600 font-black uppercase tracking-widest text-[10px] mb-2">LTV with Churn</p>
                 <div className="text-xl font-black font-mono">(ARPU × Gross Margin) / Churn Rate</div>
              </div>
           </div>
        </section>

        <div className="p-6 bg-amber-50 rounded-2xl border-l-4 border-amber-500 text-amber-900 font-bold italic">
           Critical Insight: Increasing customer lifespan by 50% directly increases LTV by 50%, without spending more on marketing! This is why retention features are high-ROI.
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">The Golden Ratio: LTV:CAC</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <div className="text-red-600 font-black text-xl mb-2">&lt; 1:1</div>
                <h4 className="font-black text-zinc-900 mb-1">Crisis Mode</h4>
                <p className="text-xs text-zinc-500 font-medium">Losing money. Reduce CAC or increase LTV urgently.</p>
             </div>
             <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl shadow-sm">
                <div className="text-blue-600 font-black text-xl mb-2">3:1 to 5:1</div>
                <h4 className="font-black text-zinc-900 mb-1">The Sweet Spot</h4>
                <p className="text-xs text-zinc-500 font-medium">Optimal balance. Scalable and healthy business.</p>
             </div>
             <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <div className="text-zinc-400 font-black text-xl mb-2">&gt; 5:1</div>
                <h4 className="font-black text-zinc-900 mb-1">Underinvesting</h4>
                <p className="text-xs text-zinc-500 font-medium">Too conservative. Competitors might outgrow you.</p>
             </div>
          </div>
          <div className="p-6 bg-zinc-900 text-white rounded-2xl flex items-center justify-between">
             <div>
                <h4 className="font-black text-indigo-400 uppercase tracking-widest text-xs mb-1">Payback Period</h4>
                <p className="text-sm font-medium">Time to recover CAC. Target: &lt; 12 months.</p>
             </div>
             <div className="text-xl font-mono">CAC / (ARPU × GM)</div>
          </div>
        </section>

        <section className="space-y-8">
           <h2 className="text-2xl font-black tracking-tight text-zinc-900">Business Models & Revenue Streams</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Subscription', sub: 'Netflix, SaaS', focus: 'Retention, MRR' },
                { title: 'Freemium', sub: 'Slack, Spotify', focus: 'Upgrade loops' },
                { title: 'Marketplace', sub: 'Airbnb, Uber', focus: 'Liquidity, Trust' },
                { title: 'Advertising', sub: 'Google, Meta', focus: 'Attention, Data' },
                { title: 'E-commerce', sub: 'Amazon, Myntra', focus: 'Conv Rate, GMV' },
                { title: 'Enterprise SaaS', sub: 'Salesforce', focus: 'Adoption, Security' },
                { title: 'Usage-Based', sub: 'Stripe, AWS', focus: 'Volume driving' },
                { title: 'Hybrid', sub: 'LinkedIn', focus: 'Multi-stream' }
              ].map((model, i) => (
                <div key={i} className="p-5 rounded-3xl bg-blue-50 border border-blue-100">
                   <h4 className="font-black text-zinc-900 text-sm mb-1">{model.title}</h4>
                   <p className="text-[10px] text-zinc-400 font-black uppercase mb-3">{model.sub}</p>
                   <p className="text-xs text-indigo-600 font-bold">Focus: {model.focus}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-6">
           <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
              <Brain className="text-indigo-600" /> Strategy Insight
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white border border-zinc-100 rounded-[2rem] shadow-sm">
                 <h4 className="font-black text-zinc-900 mb-3 uppercase tracking-widest text-xs">Subscription Model</h4>
                 <p className="text-sm text-zinc-500 font-medium leading-relaxed">Prioritize engagement & retention. Avoid high-friction flows that cause churn. Measure NRR (Net Revenue Retention).</p>
              </div>
              <div className="p-6 bg-white border border-zinc-100 rounded-[2rem] shadow-sm">
                 <h4 className="font-black text-zinc-900 mb-3 uppercase tracking-widest text-xs">Marketplace Model</h4>
                 <p className="text-sm text-zinc-500 font-medium leading-relaxed">Prioritize supply growth & liquidity. Avoid changes hurting one side of the market. Measure GMV (Gross Merchandise Value).</p>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-10">
        <div className="p-8 bg-white rounded-[2.5rem] border border-indigo-100 shadow-xl">
           <h4 className="text-lg font-black text-indigo-900 mb-6 flex items-center gap-2 uppercase tracking-tighter">
              <Percent className="w-5 h-5" /> Mini Assignment
           </h4>
           
           <div className="space-y-8">
              <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                 <h5 className="font-black text-zinc-900 mb-4 uppercase tracking-widest text-xs">Unit Economics Problem</h5>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm font-bold text-zinc-600">
                    <div>Ad Spend: <span className="text-indigo-600">$30,000</span></div>
                    <div>Sales Team Costs: <span className="text-indigo-600">$20,000</span></div>
                    <div>New Customers: <span className="text-indigo-600">250</span></div>
                    <div>ARPU: <span className="text-indigo-600">$40/month</span></div>
                    <div>Avg Lifespan: <span className="text-indigo-600">10 months</span></div>
                    <div>Gross Margin: <span className="text-indigo-600">80%</span></div>
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400">Calculate</h4>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                       <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black mb-3">1</div>
                       <p className="text-sm font-bold text-zinc-800 mb-1">CAC</p>
                       <p className="text-[10px] text-zinc-400">(Total Mkt + Sales / New Users)</p>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                       <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black mb-3">2</div>
                       <p className="text-sm font-bold text-zinc-800 mb-1">LTV</p>
                       <p className="text-[10px] text-zinc-400">(ARPU × GM × Lifespan)</p>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                       <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black mb-3">3</div>
                       <p className="text-sm font-bold text-zinc-800 mb-1">LTV:CAC Ratio</p>
                       <p className="text-[10px] text-zinc-400">sustainability check</p>
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-zinc-100">
                 <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-4">Reflective Strategy</h4>
                 <p className="text-zinc-600 font-medium mb-4">Based on your results, what should the PM prioritize:</p>
                 <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-widest">
                    <span className="px-4 py-2 bg-white border border-zinc-200 rounded-lg">Growth (spend more)</span>
                    <span className="px-4 py-2 bg-white border border-zinc-200 rounded-lg">Efficiency (reduce CAC)</span>
                    <span className="px-4 py-2 bg-white border border-zinc-200 rounded-lg">Retention (increase lifespan)</span>
                 </div>
                 <p className="mt-4 text-[10px] text-zinc-400 font-bold italic">Hint: Look at the LTV:CAC Ratio Sweet Spot table above.</p>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 9,
    title: 'Introduction to User & Market Research',
    category: 'Research',
    preview: 'Think like a researcher. Learn structured methods to uncover pain points and validate product ideas.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 9: Introduction to User & Market Research 🔍</h1>
        
        <div className="p-8 bg-zinc-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Search className="w-24 h-24" /></div>
          <blockquote className="text-xl md:text-2xl font-black italic mb-6 relative z-10 leading-tight">
            “Great products start with deep understanding — of users, their needs, and the market around them.”
          </blockquote>
          <p className="text-zinc-400 font-medium relative z-10">Today’s focus is to think like a researcher, not a builder. You’ll learn how to identify who your users are, what they struggle with, and why solving it matters.</p>
        </div>

        <section className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-200">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-zinc-900 uppercase tracking-widest">
             <Target className="text-indigo-600" />
             Learning Objectives
          </h2>
          <ul className="space-y-4">
             {[
               "Explain the difference between user research and market research",
               "Identify user pain points using qualitative and quantitative methods",
               "Apply basic frameworks — Empathy Map, JTBD, and Segmentation",
               "Use AI tools to accelerate research synthesis"
             ].map((obj, i) => (
               <li key={i} className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> {obj}
               </li>
             ))}
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
             <Scale className="text-indigo-600" />
             1. User Research vs Market Research
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-zinc-100">
                <tr>
                  <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-zinc-500">Aspect</th>
                  <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-zinc-500">User Research</th>
                  <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-zinc-500">Market Research</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { a: "Focus", u: "Individual behaviors & pain points", m: "Industry, competitors, trends" },
                  { a: "Goal", u: "Validate Problem", m: "Validate Opportunity" },
                  { a: "Methods", u: "Interviews, surveys, usability tests", m: "Desk research, benchmarking" },
                  { a: "Output", u: "Personas, Journey Maps", m: "TAM/SAM/SOM, SWOT" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-zinc-100">
                    <td className="p-4 font-black text-zinc-900">{row.a}</td>
                    <td className="p-4 text-zinc-600">{row.u}</td>
                    <td className="p-4 text-zinc-600">{row.m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex gap-3">
             <div className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px] font-black h-fit mt-1 uppercase">👉 PM Tip</div>
             <p className="text-sm text-indigo-900 font-bold">Always start with user research before market research. If users don’t want it, market data doesn’t matter.</p>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">2. The Research Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
             {[
               { n: 1, t: "Define Objective", d: "“What do I want to learn?”" },
               { n: 2, t: "Choose Method", d: "Interviews, surveys, or secondary." },
               { n: 3, t: "Recruit Users", d: "Identify your target segments." },
               { n: 4, t: "Collect Data", d: "Ask open-ended questions." },
               { n: 5, t: "Synthesize", d: "Identify themes and insights." }
             ].map((step) => (
               <div key={step.n} className="p-5 rounded-3xl bg-zinc-50 border border-zinc-100 flex flex-col gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-black text-xs">{step.n}</div>
                  <h4 className="font-black text-zinc-900 text-sm">{step.t}</h4>
                  <p className="text-xs text-zinc-500 font-medium">{step.d}</p>
               </div>
             ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">3. Research Frameworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <h3 className="text-xl font-black text-zinc-900">Empathy Map</h3>
               <p className="text-sm text-zinc-500 font-medium">Map out what users: Says, Does, Thinks, and Feels.</p>
               <div className="grid grid-cols-2 gap-2">
                  {['SAYS', 'DOES', 'THINKS', 'FEELS'].map(m => (
                    <div key={m} className="aspect-square bg-zinc-100 border border-zinc-200 flex items-center justify-center rounded-2xl font-black text-zinc-400 tracking-widest text-xs">{m}</div>
                  ))}
               </div>
            </div>
            <div className="space-y-6">
               <h3 className="text-xl font-black text-zinc-900">Jobs To Be Done (JTBD)</h3>
               <p className="text-sm text-zinc-500 font-medium">“People don’t buy products; they hire them to get a job done.”</p>
               <div className="bg-[#89CFF0] text-zinc-900 p-6 rounded-[2rem] space-y-4 border border-blue-200 shadow-sm">
                  <div>
                    <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-1">When I...</p>
                    <p className="text-sm font-bold italic">(situation)</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-1">I want to...</p>
                    <p className="text-sm font-bold italic">(motivation)</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-1">So I can...</p>
                    <p className="text-sm font-bold italic">(desired outcome)</p>
                  </div>
               </div>
               <p className="text-xs text-zinc-400 font-bold italic">Example: hiring Duolingo to feel productive while waiting.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">Segmentation Strategies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { t: 'Demographics', d: 'Age, gender, location, income.' },
               { t: 'Psychographics', d: 'Motivations, lifestyle, values.' },
               { t: 'Behavior', d: 'Usage freq, loyalty, spending.' },
               { t: 'Needs-Based', d: 'Specific pain points & goals.' }
             ].map((s, i) => (
               <div key={i} className="p-6 rounded-3xl bg-white border border-zinc-100 shadow-sm">
                  <h4 className="font-black text-sm text-zinc-900 mb-2">{s.t}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">{s.d}</p>
               </div>
             ))}
          </div>
        </section>

        <section className="space-y-8">
           <h2 className="text-2xl font-black tracking-tight text-zinc-900">Tools & AI Assistants</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { t: 'Interview Prep', app: 'ChatGPT', cmd: '“Generate 10 questions for student productivity challenges.”' },
                { t: 'Competitor Scan', app: 'Perplexity AI', cmd: '“Real-time deep competitive analysis and market data.”' },
                { t: 'Synthesis', app: 'Notion AI', cmd: '“Summarize key pain points from long interview transcripts.”' },
                { t: 'Visualization', app: 'Canva', cmd: '“Create visually compelling user personas.”' }
              ].map((tool, i) => (
                <div key={i} className="p-5 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                   <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">{tool.t}</p>
                   <h4 className="font-black text-indigo-600 mb-2">{tool.app}</h4>
                   <p className="text-xs text-zinc-500 italic font-medium leading-relaxed">{tool.cmd}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="bg-white rounded-[2.5rem] border border-zinc-200 overflow-hidden">
           <div className="bg-zinc-900 p-8 text-white">
              <h3 className="text-xl font-black flex items-center gap-3">
                 <Rocket className="text-indigo-400" />
                 Real-World Case: Zomato One-Tap
              </h3>
           </div>
           <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div><p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Pain Point</p><p className="text-sm font-bold text-zinc-800">“Hungry but don't want to call restaurants or search again.”</p></div>
              <div><p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Method</p><p className="text-sm font-bold text-zinc-800">Surveys & Usage Data Analysis</p></div>
              <div><p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Insight</p><p className="text-sm font-bold text-zinc-800">Users repeat specific orders 60% of the time.</p></div>
              <div><p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Outcome</p><p className="text-sm font-black text-indigo-600">1-Tap Reordering feature launched → Orders ↑ 22%</p></div>
           </div>
        </section>

        <section className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100">
           <h2 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-3">
              <Activity className="w-5 h-5" />
              Research Drill
           </h2>
           <div className="space-y-4 text-indigo-900/80 font-medium">
              <p>1. Use ChatGPT to generate 5 open-ended interview questions for your idea.</p>
              <p>2. Document these in your workspace and highlight the top 3 themes you expect to uncover.</p>
              <p className="pt-4 text-indigo-600 font-black italic underline decoration-2 underline-offset-4">Reflect: “What might surprise you about how real users respond vs your assumptions?”</p>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-10">
        <div className="p-8 bg-white rounded-[2.5rem] border border-purple-100 shadow-xl">
           <h4 className="text-lg font-black text-purple-900 mb-8 flex items-center gap-2 uppercase tracking-tighter">
              <ClipboardCheck className="w-6 h-6" /> Comprehensive Assignment: Research Task List
           </h4>
           
           <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-black mb-4">1</div>
                    <h5 className="font-black text-zinc-900 mb-2">Define Target Segment</h5>
                    <p className="text-xs text-zinc-500 font-medium">Identify exactly who you are solving for using demographics and psychographics.</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-black mb-4">2</div>
                    <h5 className="font-black text-zinc-900 mb-2">Pain Point vs. Outcome Table</h5>
                    <p className="text-xs text-zinc-500 font-medium">Create a 2x2 table mapping current struggles to desired future states.</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-black mb-4">3</div>
                    <h5 className="font-black text-zinc-900 mb-2">Competitor Scan</h5>
                    <p className="text-xs text-zinc-500 font-medium">Use Perplexity AI to find 3 direct or indirect competitors.</p>
                 </div>
              </div>

              <div className="p-8 rounded-[2rem] border-2 border-dashed border-purple-200 bg-purple-50/30">
                 <h5 className="font-black text-purple-900 mb-6 uppercase tracking-widest text-xs">Final Deliverable (One-Slide Summary)</h5>
                 <div className="space-y-4 text-sm font-bold text-zinc-600">
                    <p>• The User: <span className="text-purple-600 font-mono text-xs italic">[Who are they?]</span></p>
                    <p>• The Problem: <span className="text-purple-600 font-mono text-xs italic">[What is their core struggle?]</span></p>
                    <p>• The Market: <span className="text-purple-600 font-mono text-xs italic">[Why does this matter right now?]</span></p>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                 <div className="px-6 py-3 bg-zinc-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3">
                    Deliverable: User & Market Research Report
                 </div>
                 <div className="px-6 py-3 bg-white border border-zinc-200 text-zinc-400 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3">
                    Outcome: Readiness for Day 10 User Interviews
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl">
              <h3 className="font-black text-white mb-6 flex items-center gap-2 tracking-tight text-lg uppercase">
                  <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                  Must Watch
              </h3>
              <ul className="space-y-4">
                  <li>
                    <a href="https://youtu.be/MxwyGi-3dzY?si=CV5VWd2bNnUDW-fP" target="_blank" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                        <ExternalLink className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-bold text-zinc-100 tracking-tight">Doing User Research</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://youtu.be/LoJDAeq6i34?si=Ok2GW9U0wFmSJzz8" target="_blank" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                        <ExternalLink className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-bold text-zinc-100 tracking-tight">Market Research</span>
                    </a>
                  </li>
              </ul>
           </div>
        </div>
      </div>
    ),
  },
  {
    day: 10,
    title: 'User Interviews & Surveys',
    category: 'Research',
    preview: 'Learn the "The Mom Test" style of interviewing. Ask behavioral, not aspirational questions.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 10: User Interviews & Surveys 🎙️</h1>
        
        <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-200">
           <blockquote className="text-xl md:text-2xl font-black italic mb-4 text-zinc-900">
             “If you listen carefully, your users will write your roadmap for you.”
           </blockquote>
           <p className="text-zinc-500 font-medium">Yesterday we explored target segments. Today we learn how to validate insights through real conversations and structured feedback.</p>
        </div>

        <section className="bg-zinc-900 text-white p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-widest text-indigo-400">
             <Target className="w-5 h-5" />
             Learning Objectives
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               "Conduct structured discovery interviews",
               "Design clear & unbiased surveys",
               "Identify recurring pain themes",
               "Synthesize insights using AI tools"
             ].map((obj, i) => (
               <li key={i} className="flex items-start gap-3 text-sm font-medium text-zinc-400">
                  <CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" /> {obj}
               </li>
             ))}
          </ul>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
             <MessageSquare className="text-indigo-600" />
             1. Why User Interviews Matter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               { t: "Deep 'Why'", d: "Understand user motivation beyond what behavioral data shows.", icon: <Search /> },
               { t: "Assumptions", d: "Validate high-risk assumptions early before spending engineering resources.", icon: <AlertTriangle /> },
               { t: "Unspoken Needs", d: "Discover emotional triggers and pain points users didn't mention.", icon: <Ear /> },
               { t: "Empathy", d: "Build genuine intuition for the user's daily life and environment.", icon: <Smile /> }
             ].map((item, i) => (
               <div key={i} className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-black text-zinc-900 mb-1">{item.t}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">{item.d}</p>
                  </div>
               </div>
             ))}
          </div>
          <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100">
             <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">Example: Insight to Feature</p>
             <p className="text-sm text-indigo-900 font-bold leading-relaxed">
               "I want to feel progress even if I study for 5 minutes." <br/>
               <span className="text-indigo-600">→ Inspired Duolingo's Streak system, now a core retention driver.</span>
             </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
             <HelpCircle className="text-indigo-600" />
             2. Types of Interview Questions
          </h2>
          <div className="overflow-x-auto">
             <table className="min-w-full border-collapse">
                <thead className="bg-zinc-100">
                   <tr>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-zinc-500">Type</th>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-zinc-500">Example</th>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-zinc-500">Purpose</th>
                   </tr>
                </thead>
                <tbody className="text-sm">
                   {[
                     { t: "Behavioral (Past)", e: "“Tell me about the last time you ordered food.”", p: "Habit Analysis" },
                     { t: "Attitudinal (Feelings)", e: "“What frustrates you most about your current apps?”", p: "Pain Discovery" },
                     { t: "Aspirational (Future)", e: "“What would make your experience 10x better?”", p: "Ideation" }
                   ].map((row, i) => (
                     <tr key={i} className="border-b border-zinc-100">
                        <td className="p-4 font-black text-zinc-900">{row.t}</td>
                        <td className="p-4 text-zinc-600 italic font-medium">{row.e}</td>
                        <td className="p-4 text-zinc-500 font-bold">{row.p}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
             <div className="bg-amber-600 text-white p-1 rounded shadow-sm shrink-0"><Brain className="w-4 h-4" /></div>
             <p className="text-sm text-amber-900 font-bold">
               <span className="uppercase text-[10px] tracking-widest block mb-1">🧠 Golden Rule</span>
               No leading questions. Don't ask "Wouldn't it be better if...?" Ask "How do you feel about...?"
             </p>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">3. Interview Structure (15–20 min)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { n: 1, t: "Intro", d: "Make the user comfortable. Explain purpose, emphasize there are no wrong answers." },
               { n: 2, t: "Context", d: "Understand background. Ask about their current tools, role, and daily routine." },
               { n: 3, t: "Core Questions", d: "Explore behaviors & pain. Deep dive into the specific problem area you're solving." },
               { n: 4, t: "Wrap Up", d: "Final insights & referrals. Ask if they have anything to add or know someone else to talk to." }
             ].map((step) => (
               <div key={step.n} className="p-6 rounded-[2rem] bg-white border border-zinc-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 text-4xl font-black text-zinc-50 group-hover:text-indigo-50 transition-colors -z-0">{step.n}</div>
                  <div className="relative z-10">
                    <h4 className="font-black text-zinc-900 mb-2">{step.t}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">{step.d}</p>
                  </div>
               </div>
             ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900">AI Accelerator</h2>
              <div className="p-6 rounded-[2rem] bg-[#B6D0E2] text-zinc-900 shadow-xl relative overflow-hidden border border-blue-200/50">
                 <div className="absolute top-0 right-0 p-4 opacity-10"><Bot className="w-16 h-16" /></div>
                 <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-3">Synthesis Prompt</p>
                 <p className="text-sm font-bold italic leading-relaxed">
                   "Summarize these interview transcripts into 3 distinct pain points and 3 desired outcomes."
                 </p>
              </div>
           </div>
           <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900">Survey Principles</h2>
              <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm space-y-3">
                 {[
                   "Ask one thing per question",
                   "Avoid biased wording",
                   "Mix question types (MCQ + scale)",
                   "Keep it under 10 questions"
                 ].map((p, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-bold text-zinc-600">{p}</span>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
             <RefreshCcw className="text-indigo-600" />
             4. Synthesizing Insights
          </h2>
          <p className="text-zinc-600 font-medium">After 5–10 interviews, group similar issues into actionable themes.</p>
          <div className="p-8 rounded-[2.5rem] border border-zinc-200 bg-white grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div>
                 <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">The Insight</p>
                 <p className="text-lg font-black text-zinc-900 italic">"I forget my fitness goals midweek."</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-black uppercase tracking-widest mb-2 border border-red-100">The Pain</div>
                 <p className="text-sm font-bold text-zinc-600">Motivation Drop</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Feature Opportunity</p>
                 <p className="text-sm font-black text-indigo-900 mb-1">AI Reminder Coach</p>
                 <p className="text-xs text-indigo-600 font-medium italic">Contextual nudges based on historical low-activity days.</p>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-10">
        <div className="p-8 bg-white rounded-[2.5rem] border border-indigo-100 shadow-xl">
           <h4 className="text-lg font-black text-indigo-900 mb-8 flex items-center gap-2 uppercase tracking-tighter">
              <ClipboardList className="w-6 h-6" /> 🎯 Day-10: User Insights Report
           </h4>
           
           <div className="space-y-8">
              <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                 <h5 className="font-black text-zinc-900 mb-6 uppercase tracking-widest text-xs">1-Page Deliverable</h5>
                 <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                       <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">1</div>
                       <p className="text-sm font-bold text-zinc-600">Top 3 Pain Points <span className="text-zinc-400 font-normal">(with supporting user quotes)</span></p>
                    </div>
                    <div className="flex gap-4 items-start">
                       <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">2</div>
                       <p className="text-sm font-bold text-zinc-600">Top 3 Desired Outcomes <span className="text-zinc-400 font-normal">(what users want to achieve)</span></p>
                    </div>
                    <div className="flex gap-4 items-start">
                       <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">3</div>
                       <p className="text-sm font-bold text-zinc-600">One Opportunity Statement: <span className="italic text-indigo-600">How might we solve for X?</span></p>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-black text-emerald-600 uppercase tracking-widest">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 Evaluation: Great = 3 strong actionable themes supported by data.
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl">
              <h3 className="font-black text-white mb-6 flex items-center gap-2 tracking-tight text-lg uppercase">
                  <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                  Must Watch
              </h3>
              <ul className="space-y-4">
                  <li>
                    <a href="https://youtu.be/5tVbFfGDQCk?si=91eAIcNvjUAFfxM1" target="_blank" className="w-full flex flex-col gap-3 group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-left">
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800">
                            <img 
                                src={`https://img.youtube.com/vi/5tVbFfGDQCk/mqdefault.jpg`} 
                                className="w-full h-full object-cover opacity-60" 
                                alt="Conduct User Interviews"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                                    <Play className="w-5 h-5 fill-current" />
                                </div>
                            </div>
                        </div>
                        <span className="block text-sm font-bold text-zinc-100 tracking-tight leading-snug">How To Conduct User Interviews Like A Pro</span>
                    </a>
                  </li>
              </ul>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 11,
    title: 'User Personas & JTBD',
    category: 'Research',
    preview: '“You don’t design for everyone — you design for someone.” Convert raw feedback into structured user profiles.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 11: User Personas & JTBD 👥</h1>
        
        {/* Videos at the Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl">
              <h3 className="font-black text-white mb-6 flex items-center gap-2 tracking-tight text-lg uppercase">
                  <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                  Watch: Jobs To Be Done
              </h3>
              <a href="https://youtu.be/dbVN6EYql6k?si=2440TMiKd3ZVmGvK" target="_blank" className="w-full flex flex-col gap-3 group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-left">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800">
                      <img 
                          src={`https://img.youtube.com/vi/dbVN6EYql6k/mqdefault.jpg`} 
                          className="w-full h-full object-cover opacity-60" 
                          alt="Jobs to be done"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 fill-current" />
                          </div>
                      </div>
                  </div>
                  <span className="block text-sm font-bold text-zinc-100 tracking-tight">Understanding the JTBD Framework</span>
              </a>
           </div>

           <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl">
              <h3 className="font-black text-white mb-6 flex items-center gap-2 tracking-tight text-lg uppercase">
                  <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                  Watch: Creating Personas
              </h3>
              <a href="https://youtu.be/v6EWN4EjHM0?si=5up6JXpGPfYnIq1d" target="_blank" className="w-full flex flex-col gap-3 group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-left">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800">
                      <img 
                          src={`https://img.youtube.com/vi/v6EWN4EjHM0/mqdefault.jpg`} 
                          className="w-full h-full object-cover opacity-60" 
                          alt="Creating Personas"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 fill-current" />
                          </div>
                      </div>
                  </div>
                  <span className="block text-sm font-bold text-zinc-100 tracking-tight">How to Build User Personas</span>
              </a>
           </div>
        </div>

        <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-200">
           <blockquote className="text-xl md:text-2xl font-black italic mb-4 text-zinc-900">
             “You don’t design for everyone — you design for someone.”
           </blockquote>
           <p className="text-zinc-500 font-medium">Yesterday we captured raw feedback. Today we turn that data into structured, usable insights.</p>
        </div>

        <section className="bg-zinc-900 text-white p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-widest text-indigo-400">
             <Target className="w-5 h-5" />
             Learning Objectives
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               "Build realistic user personas based on real data",
               "Write JTBD statements that reflect true motivations",
               "Use personas to guide feature & UX decisions",
               "Apply AI tools to accelerate synthesis"
             ].map((obj, i) => (
               <li key={i} className="flex items-start gap-3 text-sm font-medium text-zinc-400">
                  <CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" /> {obj}
               </li>
             ))}
          </ul>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">1. From Research → Insights → Personas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { t: "Step 1", title: "Clustering", d: "Group similar behaviors and motivations from transcripts." },
               { t: "Step 2", title: "Identification", d: "Find recurring pain points and primary goals across clusters." },
               { t: "Step 3", title: "Narrative", d: "Write a short, human-centric story for each segment." }
             ].map((step, i) => (
               <div key={i} className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                  <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">{step.t}</div>
                  <h4 className="font-black text-zinc-900 mb-1">{step.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">{step.d}</p>
               </div>
             ))}
          </div>
          
          <div className="overflow-x-auto">
             <table className="min-w-full border-collapse">
                <thead className="bg-zinc-100">
                   <tr>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-zinc-500">User Quote</th>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-zinc-500">Persona Name</th>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-zinc-500">Core Insight</th>
                   </tr>
                </thead>
                <tbody className="text-sm">
                   {[
                     { q: "“I start strong but can’t stay consistent.”", n: "Motivated Starter", i: "Needs daily accountability loops" },
                     { q: "“I want data to track my progress.”", n: "Data-Driven Achiever", i: "Needs progress visualizations" }
                   ].map((row, i) => (
                     <tr key={i} className="border-b border-zinc-100">
                        <td className="p-4 text-zinc-600 italic font-medium">{row.q}</td>
                        <td className="p-4 font-black text-zinc-900">{row.n}</td>
                        <td className="p-4 text-zinc-500 font-bold">{row.i}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
             <div className="bg-amber-600 text-white p-1 rounded shadow-sm shrink-0"><Brain className="w-4 h-4" /></div>
             <p className="text-sm text-amber-900 font-bold">
               <span className="uppercase text-[10px] tracking-widest block mb-1">🧠 Best Practice</span>
               2–3 meaningful personas are better than 8–10 generic ones.
             </p>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">2. Persona Template</h2>
          <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm p-8 max-w-2xl mx-auto">
             <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-3xl bg-zinc-100 flex items-center justify-center">
                    <UsersIcon className="w-10 h-10 text-zinc-400" />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Rahul Sharma, 27</h3>
                   <p className="text-indigo-600 font-bold">Software Engineer</p>
                </div>
             </div>
             <blockquote className="text-lg font-black text-zinc-800 italic mb-8 border-l-4 border-indigo-600 pl-4">
                “I need a coach who reminds me daily.”
             </blockquote>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Bio</h4>
                   <p className="text-sm text-zinc-600 font-medium leading-relaxed">Works long hours; highly motivated to stay fit but misses consistency due to exhaustion.</p>
                </div>
                <div>
                   <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Goals</h4>
                   <p className="text-sm text-zinc-600 font-medium leading-relaxed">Build a long-term habit and see measurable physical results.</p>
                </div>
                <div>
                   <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Frustrations</h4>
                   <p className="text-sm text-zinc-600 font-medium leading-relaxed">Lack of personalized accountability; generalized tools don't adapt to his schedule.</p>
                </div>
                <div>
                   <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Tech Comfort</h4>
                   <p className="text-sm text-zinc-600 font-medium leading-relaxed">High. Owns a Garmin smartwatch and uses multiple trackers.</p>
                </div>
             </div>
          </div>
          <div className="flex justify-center">
             <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black flex items-center gap-2">
                <Map className="w-3.5 h-3.5" />
                📍 Tip: Add emotion — Personas should feel human, not just like data points.
             </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">3. Jobs To Be Done (JTBD) Framework</h2>
          <p className="text-zinc-600 font-medium">Users don’t buy products. They hire them to get a job done.</p>
          <div className="bg-[#B6D0E2] text-zinc-900 p-8 rounded-[2.5rem] relative overflow-hidden border border-blue-200/50 shadow-sm">
             <div className="absolute top-0 right-0 p-8 opacity-10"><ClipboardCheck className="w-32 h-32" /></div>
             <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-indigo-700">The Template</h3>
             <div className="space-y-4 font-black text-2xl md:text-3xl tracking-tighter text-zinc-800">
                <p><span className="text-indigo-700">When I</span> situation,</p>
                <p><span className="text-indigo-700">I want to</span> motivation,</p>
                <p><span className="text-indigo-700">So I can</span> desired outcome.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { app: "Duolingo", t: "“When I have free time, I want quick practice, so I feel productive.”" },
               { app: "Notion", t: "“When I start a project, I want everything in one place, so I stay organized.”" },
               { app: "Swiggy", t: "“When I’m tired, I want fast ordering, so I can relax without effort.”" }
             ].map((item, i) => (
               <div key={i} className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                  <h4 className="font-black text-zinc-900 mb-2">{item.app}</h4>
                  <p className="text-sm text-zinc-500 font-medium italic">{item.t}</p>
               </div>
             ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">4. Connecting Personas → JTBD → Features</h2>
          <div className="overflow-x-auto">
             <table className="min-w-full border-collapse">
                <thead className="bg-zinc-900 text-white">
                   <tr>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest">Persona</th>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest">Job To Be Done</th>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest">Feature Idea</th>
                   </tr>
                </thead>
                <tbody className="text-sm font-medium">
                   {[
                     { p: "Motivated Starter", j: "Stay consistent even when busy", f: "AI habit reminders + streaks" },
                     { p: "Data Achiever", j: "Track measurable progress", f: "Analytics dashboard" },
                     { p: "Social Sharer", j: "Celebrate success publicly", f: "Leaderboards & badges" }
                   ].map((row, i) => (
                     <tr key={i} className="border-b border-zinc-100">
                        <td className="p-4 font-black text-zinc-900">{row.p}</td>
                        <td className="p-4 text-zinc-600">{row.j}</td>
                        <td className="p-4 text-indigo-600 font-bold">{row.f}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900">AI Accelerator</h2>
              <div className="p-6 rounded-[2.5rem] border-2 border-dashed border-zinc-200 bg-white">
                 <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">ChatGPT / Notion AI Prompt</p>
                 <p className="text-sm text-zinc-500 font-bold leading-relaxed italic">
                    “You are a Product Manager summarizing interview transcripts about study habits. Group user patterns into 2-3 personas and write JTBD statements for each.”
                 </p>
              </div>
           </div>
           <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900">Spotify Case Study</h2>
              <div className="space-y-4">
                 <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
                    <h4 className="font-black text-zinc-900 text-sm mb-1">Music Explorer</h4>
                    <p className="text-xs text-zinc-500 font-bold italic mb-2">“Give me music for my mood instantly”</p>
                    <p className="text-sm text-indigo-600 font-black">→ Discover Weekly</p>
                 </div>
                 <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
                    <h4 className="font-black text-zinc-900 text-sm mb-1">Loyal Listener</h4>
                    <p className="text-xs text-zinc-500 font-bold italic mb-2">“Save songs automatically for later”</p>
                    <p className="text-sm text-indigo-600 font-black">→ Liked Songs Library</p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-10">
        <div className="p-8 bg-white rounded-[2.5rem] border border-purple-100 shadow-xl">
           <h4 className="text-lg font-black text-purple-900 mb-8 flex items-center gap-2 uppercase tracking-tighter">
              <ClipboardCheck className="w-6 h-6" /> 🎯 Day-11: Persona & JTBD Deck
           </h4>
           
           <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                 <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-black mx-auto mb-4">1</div>
                    <h5 className="font-black text-zinc-900 mb-2">2 Personas</h5>
                    <p className="text-[10px] text-zinc-500 font-medium">Name, Bio, Goals, Pains, Behavior, Quote.</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-black mx-auto mb-4">2</div>
                    <h5 className="font-black text-zinc-900 mb-2">JTBD Statements</h5>
                    <p className="text-[10px] text-zinc-500 font-medium">1 clear statement per persona.</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-black mx-auto mb-4">3</div>
                    <h5 className="font-black text-zinc-900 mb-2">1 Feature Suggestion</h5>
                    <p className="text-[10px] text-zinc-500 font-medium">Clearly aligned to the "Job".</p>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                 <div className="px-6 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                    Format: Canva / Slides / Notion
                 </div>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 12,
    title: 'Competitive & Market Analysis',
    category: 'Research',
    preview: '“You can’t build a better product until you understand what already exists.” Master SWOT and feature benchmarking.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 12: Competitive & Market Analysis 🧭</h1>
        
        {/* Prioritized Video at the Top */}
        <div className="grid grid-cols-1 gap-6 mb-8">
           <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl max-w-3xl">
              <h3 className="font-black text-white mb-6 flex items-center gap-2 tracking-tight text-lg uppercase">
                  <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                  Watch: Competitive Analysis for PMs
              </h3>
              <a href="https://youtu.be/UnBL8h8TVX8?si=v7_4Kx9EDy357xjg" target="_blank" className="w-full flex flex-col gap-3 group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-left">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800">
                      <img 
                          src={`https://img.youtube.com/vi/UnBL8h8TVX8/mqdefault.jpg`} 
                          className="w-full h-full object-cover opacity-60" 
                          alt="Competitive Analysis"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                              <Play className="w-6 h-6 fill-current" />
                          </div>
                      </div>
                  </div>
                  <span className="block text-sm font-bold text-zinc-100 tracking-tight leading-snug">Mastering Competitive Benchmarking</span>
              </a>
           </div>
        </div>

        <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-200">
           <blockquote className="text-xl md:text-2xl font-black italic mb-4 text-zinc-900">
             “You can’t build a better product until you understand what already exists.”
           </blockquote>
           <p className="text-zinc-500 font-medium">Today’s goal is to position your idea intelligently. Learn to identify market gaps — not by copying, but by identifying where competitors fall short.</p>
        </div>

        <section className="bg-zinc-900 text-white p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-widest text-indigo-400">
             <Target className="w-5 h-5" />
             Learning Objectives
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               "Conduct structured competitive benchmarking",
               "Perform SWOT analysis for 2–3 competitors",
               "Identify feature gaps and differentiators",
               "Define your product's unique positioning statement"
             ].map((obj, i) => (
               <li key={i} className="flex items-start gap-3 text-sm font-medium text-zinc-400">
                  <CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" /> {obj}
               </li>
             ))}
          </ul>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
             <Map className="text-indigo-600" />
             1. Mapping the Landscape
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { t: "Direct Competitors", d: "Same product, same target audience.", ex: "Example: Habitica vs Streaks", icon: <ArrowRight className="text-indigo-600" /> },
               { t: "Indirect Competitors", d: "Solve the same need differently.", ex: "Example: Google Tasks vs Notion", icon: <RefreshCcw className="text-indigo-600" /> },
               { t: "Aspirational", d: "Inspire UX or growth strategies.", i: "Example: Headspace for UI vibes", icon: <Sparkles className="text-indigo-600" /> }
             ].map((item, i) => (
               <div key={i} className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100 group hover:border-indigo-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">{item.icon}</div>
                  <h4 className="font-black text-zinc-900 mb-1">{item.t}</h4>
                  <p className="text-xs text-zinc-500 font-medium mb-3">{item.d}</p>
                  <p className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded inline-block">{item.ex || item.i}</p>
               </div>
             ))}
          </div>
          <div className="p-4 bg-zinc-900 text-white rounded-2xl flex items-center gap-4 border border-zinc-800">
             <div className="bg-indigo-600 p-2 rounded-lg"><Bot className="w-5 h-5" /></div>
             <p className="text-sm font-bold">
               <span className="text-indigo-400 uppercase text-[10px] tracking-widest block mb-0.5">AI Hack</span>
               Ask Perplexity AI: "List top 10 apps competing with [idea], include audience and unique features."
             </p>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900">2. Framework 1: SWOT Analysis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {[
               { t: "Strengths", d: "What do they do well?", ex: "Example: \"Beautiful UI, gamified loop\"", col: "border-green-100 bg-green-50/30" },
               { t: "Weaknesses", d: "Where do they fall short?", ex: "Example: \"Limited AI personalization\"", col: "border-red-100 bg-red-50/30" },
               { t: "Opportunities", d: "What can we do better?", ex: "Example: \"Add AI coach habit nudges\"", col: "border-blue-100 bg-blue-50/30" },
               { t: "Threats", d: "What could hurt us?", ex: "Example: \"Big tech (Apple) entry\"", col: "border-amber-100 bg-amber-50/30" }
             ].map((item, i) => (
               <div key={i} className={`p-6 rounded-[2rem] border-2 ${item.col}`}>
                  <h4 className="font-black text-lg text-zinc-900 mb-2">{item.t}</h4>
                  <p className="text-sm text-zinc-600 font-bold mb-2">{item.d}</p>
                  <p className="text-xs text-zinc-400 italic">{item.ex}</p>
               </div>
             ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
             <Layers className="text-indigo-600" />
             3. Framework 2: Feature Comparison Matrix
          </h2>
          <div className="overflow-x-auto rounded-[2rem] border border-zinc-200">
             <table className="min-w-full border-collapse bg-white">
                <thead className="bg-zinc-900 text-white">
                   <tr>
                      <th className="p-5 text-left text-xs font-black uppercase tracking-widest">Feature</th>
                      <th className="p-5 text-center text-xs font-black uppercase tracking-widest text-indigo-400">Us</th>
                      <th className="p-5 text-center text-xs font-black uppercase tracking-widest">Comp A</th>
                      <th className="p-5 text-center text-xs font-black uppercase tracking-widest">Comp B</th>
                   </tr>
                </thead>
                <tbody className="text-sm font-medium">
                   {[
                     { f: "Personalized Dashboard", u: true, a: false, b: true },
                     { f: "AI Habit Coach", u: true, a: false, b: false },
                     { f: "Gamified Streaks", u: true, a: true, b: true }
                   ].map((row, i) => (
                     <tr key={i} className="border-b border-zinc-100 last:border-0">
                        <td className="p-5 font-black text-zinc-800">{row.f}</td>
                        <td className="p-5 text-center">{row.u ? <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-zinc-300 mx-auto" />}</td>
                        <td className="p-5 text-center">{row.a ? <CheckCircle className="w-5 h-5 text-zinc-500 mx-auto" /> : <X className="w-5 h-5 text-zinc-300 mx-auto" />}</td>
                        <td className="p-5 text-center">{row.b ? <CheckCircle className="w-5 h-5 text-zinc-500 mx-auto" /> : <X className="w-5 h-5 text-zinc-300 mx-auto" />}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
          <div className="flex justify-center">
             <div className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black flex items-center gap-2 border border-indigo-100">
                <Brain className="w-4 h-4" />
                🧠 Insight: Discover what is "table-stakes" vs "differentiating".
             </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900">AI Prompts for Strategy</h2>
              <div className="space-y-4">
                 <div className="p-5 rounded-2xl border-2 border-dashed border-zinc-200 bg-white">
                    <p className="text-sm text-zinc-500 font-bold italic leading-relaxed">
                       "Create a SWOT analysis for Fitbit and identify two strategic gaps a new product could exploit."
                    </p>
                 </div>
                 <div className="p-5 rounded-2xl border-2 border-dashed border-zinc-200 bg-white">
                    <p className="text-sm text-zinc-500 font-bold italic leading-relaxed">
                       "Summarize the top 5 AI habit tracking apps in 2025, their core features, and pricing."
                    </p>
                 </div>
              </div>
           </div>
           <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900">Zerodha vs Groww</h2>
              <div className="p-8 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp className="w-16 h-16 text-indigo-600" /></div>
                 <div className="space-y-4 relative z-10">
                    <div>
                       <h4 className="font-black text-indigo-900 text-sm mb-1">Zerodha Strength:</h4>
                       <p className="text-xs text-indigo-700 font-bold">Advanced tools for Traders.</p>
                    </div>
                    <div>
                       <h4 className="font-black text-indigo-900 text-sm mb-1">Groww Strength:</h4>
                       <p className="text-xs text-indigo-700 font-bold">UI simplicity for First-timers.</p>
                    </div>
                    <p className="pt-4 text-xs text-zinc-500 font-medium leading-relaxed italic">
                       Design simplicity was the differentiator Groww used to disrupt a market of "complex dashboards."
                    </p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-10">
        <div className="p-8 bg-white rounded-[2.5rem] border border-indigo-100 shadow-xl">
           <h4 className="text-lg font-black text-indigo-900 mb-8 flex items-center gap-2 uppercase tracking-tighter">
              <ClipboardCheck className="w-6 h-6" /> 🎯 Competitive Report
           </h4>
           
           <div className="space-y-8">
              <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                 <h5 className="font-black text-zinc-900 mb-6 uppercase tracking-widest text-xs">Final Deliverables (2–3 slides)</h5>
                 <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                       <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">•</div>
                       <p className="text-sm font-bold text-zinc-600">2 SWOT Analysis: <span className="text-zinc-400 font-normal">Competitor A & B.</span></p>
                    </div>
                    <div className="flex gap-4 items-start">
                       <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">•</div>
                       <p className="text-sm font-bold text-zinc-600">Feature Comparison Matrix: <span className="text-zinc-400 font-normal">Us vs others.</span></p>
                    </div>
                    <div className="flex gap-4 items-start">
                       <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">•</div>
                       <p className="text-sm font-bold text-zinc-600">Positioning Statement: <span className="italic text-indigo-600">“Unlike X and Y, our product [does what] for [whom].”</span></p>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                 <div className="px-6 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                    Deadline: End of Day
                 </div>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 13,
    title: 'Opportunity Sizing (TAM/SAM/SOM)',
    category: 'Research',
    preview: 'Quantify the market potential. Learn top-down and bottom-up sizing models.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 13: Opportunity Sizing (TAM / SAM / SOM) 📊</h1>
        
        {/* Video at the Top */}
        <div className="grid grid-cols-1 gap-6 mb-8">
           <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl max-w-3xl mx-auto w-full">
              <h3 className="font-black text-white mb-6 flex items-center gap-2 tracking-tight text-lg uppercase">
                  <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                  Watch: TAM, SAM, SOM Explained
              </h3>
              <a href="https://youtu.be/nCYOMU7rKCs?si=cvu8yrnAbxDueKEI" target="_blank" className="w-full flex flex-col gap-3 group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-left">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800">
                      <img 
                          src={`https://img.youtube.com/vi/nCYOMU7rKCs/mqdefault.jpg`} 
                          className="w-full h-full object-cover opacity-60" 
                          alt="TAM SAM SOM"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                              <Play className="w-6 h-6 fill-current" />
                          </div>
                      </div>
                  </div>
                  <span className="block text-sm font-bold text-zinc-100 tracking-tight leading-snug">Estimating Market Potential</span>
              </a>
           </div>
        </div>

        <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100">
           <div className="flex items-center gap-3 mb-4">
              <Compass className="text-indigo-600 w-8 h-8" />
              <h2 className="text-2xl font-black text-indigo-900 tracking-tighter">Theme</h2>
           </div>
           <blockquote className="text-xl font-black italic mb-4 text-zinc-900">
             “A great product solves a real problem — but a great business solves it for a market that’s big enough.”
           </blockquote>
           <p className="text-zinc-700 font-medium">Today you’ll quantify the potential behind your product idea and learn how PMs and founders evaluate market opportunities before investing in them.</p>
        </div>

        <section className="bg-zinc-900 text-white p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-widest text-[#79BAEC]">
             <Target className="w-5 h-5" />
             Learning Objectives
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               "Define TAM, SAM, and SOM clearly and apply them to a product idea.",
               "Use top-down, bottom-up, and value-based approaches for market sizing.",
               "Leverage AI + data tools to find reliable market estimates.",
               "Create a Market Opportunity Slide (for PRD or pitch decks)."
             ].map((obj, i) => (
               <li key={i} className="flex items-start gap-3 text-sm font-medium text-zinc-400">
                  <CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" /> {obj}
               </li>
             ))}
          </ul>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
             <Layers className="text-indigo-600" />
             1. Key Concepts
          </h2>
          <div className="overflow-x-auto rounded-[2rem] border border-zinc-200">
             <table className="min-w-full border-collapse bg-white">
                <thead className="bg-zinc-100">
                   <tr>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-zinc-500">Term</th>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-zinc-500">Meaning</th>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest text-zinc-500">Example</th>
                   </tr>
                </thead>
                <tbody className="text-sm font-medium">
                   {[
                     { t: "TAM (Total Addressable Market)", m: "The total global demand for your product — if everyone bought it", e: "“Global fitness app market = $7B”" },
                     { t: "SAM (Serviceable Available Market)", m: "The portion you can serve based on geography or target users", e: "“India’s fitness app market = $1.2B”" },
                     { t: "SOM (Serviceable Obtainable Market)", m: "The share you can realistically capture in 2–3 years", e: "“Target 1% of SAM → $12M”" }
                   ].map((row, i) => (
                     <tr key={i} className="border-b border-zinc-100">
                        <td className="p-4 font-black text-zinc-900">{row.t}</td>
                        <td className="p-4 text-zinc-600">{row.m}</td>
                        <td className="p-4 text-indigo-600 font-bold italic">{row.e}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
          <div className="flex justify-center">
             <div className="px-6 py-2 bg-zinc-900 text-white rounded-full text-xs font-black flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#79BAEC]" />
                🧠 Rule of Thumb: TAM shows scale, SAM shows focus, SOM shows realism.
             </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
             <TrendingUp className="text-indigo-600" />
             2. Approaches to Estimate Market Size
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-4">
                <h4 className="font-black text-xl text-indigo-600">🔹 A. Top-Down (Market Reports)</h4>
                <p className="text-zinc-600">Use existing industry reports to derive size.</p>
                <p className="text-sm font-bold text-zinc-400">Source: Statista, McKinsey, Gartner, IBISWorld</p>
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                    <p className="text-sm font-medium italic"><span className="font-black text-zinc-900">Example:</span> Statista reports the Indian EdTech market is $5.7B → your product targets 10% → SAM = $570M</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-4">
                <h4 className="font-black text-xl text-indigo-600">🔹 B. Bottom-Up (User-Based)</h4>
                <p className="text-zinc-600">Start from your customer base and scale up.</p>
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                    <p className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-1">Formula</p>
                    <p className="text-lg font-black text-indigo-600 font-mono">SOM = (Number of target users × Price per user × Frequency)</p>
                </div>
                <p className="text-sm font-medium italic"><span className="font-black text-zinc-900">Example:</span> 1M potential users × ₹300/year = ₹300M</p>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-4">
                <h4 className="font-black text-xl text-indigo-600">🔹 C. Value-Based</h4>
                <p className="text-zinc-600">Estimate based on how much value you create or replace.</p>
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
                    <p className="text-sm font-medium italic"><span className="font-black text-zinc-900">Example:</span> AI recruitment tool saves 5 hours/week per recruiter × ₹500/hour → ₹2,500 value per user/month.</p>
                    <p className="text-sm font-medium italic">If users pay 10% → ₹250/month × 10,000 users = ₹30M market.</p>
                </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
             <Bot className="text-indigo-600" />
             3. Using AI Tools for Market Sizing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 rounded-[2rem] border-2 border-dashed border-zinc-200 bg-white space-y-4">
                <h4 className="font-black text-indigo-600 uppercase tracking-widest text-xs">Perplexity AI Prompt</h4>
                <p className="text-sm text-zinc-500 font-bold italic leading-relaxed">
                   “Estimate the total addressable market (TAM) for AI-powered personal productivity tools globally and in India for 2025. Include data sources.”
                </p>
                <div className="pt-4 border-t border-zinc-100">
                    <p className="text-[10px] font-black text-zinc-400 mb-2">OUTPUT EXAMPLE</p>
                    <ul className="text-xs space-y-1 text-zinc-600 font-medium">
                        <li>• Global market: $9.8B (CAGR 17%)</li>
                        <li>• India: $520M (growing at 22%)</li>
                        <li>• Sources: Statista, Markets & Markets</li>
                    </ul>
                </div>
             </div>

             <div className="p-6 rounded-[2rem] border-2 border-dashed border-zinc-200 bg-white space-y-4">
                <h4 className="font-black text-indigo-600 uppercase tracking-widest text-xs">ChatGPT Prompt</h4>
                <p className="text-sm text-zinc-500 font-bold italic leading-relaxed">
                   “You’re a Product Manager at a startup building a sleep-tracking AI app. Estimate TAM, SAM, and SOM using a bottom-up model based on smartphone users aged 20–45.”
                </p>
                <div className="pt-4 border-t border-zinc-100">
                    <p className="text-[10px] font-black text-emerald-600 mb-2">BENEFIT</p>
                    <p className="text-xs text-zinc-600 font-medium">✅ ChatGPT can then calculate user segments × pricing × conversion = SOM estimate.</p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100 flex flex-col gap-3">
                <h4 className="font-black text-zinc-900 text-sm">Google Trends</h4>
                <p className="text-xs text-zinc-500 font-medium">Use to identify demand spikes by region or term.</p>
                <p className="text-[10px] italic text-zinc-400">Example: “AI productivity tools” searches ↑ 350% YoY → validates growing market.</p>
             </div>
             <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100 flex flex-col gap-3">
                <h4 className="font-black text-zinc-900 text-sm">Power BI / Excel</h4>
                <p className="text-xs text-zinc-500 font-medium">Use to visualize TAM → SAM → SOM funnel and highlight potential revenue over 3 years.</p>
             </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
             <PieChart className="text-indigo-600" />
             4. Visual Framework
          </h2>
          <div className="relative py-12 flex justify-center">
             <div className="space-y-4 w-full max-w-md">
                <div className="bg-indigo-600 text-white p-6 rounded-[3rem] text-center shadow-lg border-4 border-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">TAM</p>
                    <p className="text-2xl font-black">$5B (Global market)</p>
                </div>
                <div className="flex justify-center"><ArrowRight className="rotate-90 text-zinc-300 w-8 h-8" /></div>
                <div className="bg-indigo-500 text-white p-5 rounded-[2.5rem] text-center shadow-md border-4 border-white w-[90%] mx-auto">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">SAM</p>
                    <p className="text-xl font-black">$1B (India + SEA)</p>
                </div>
                <div className="flex justify-center"><ArrowRight className="rotate-90 text-zinc-300 w-8 h-8" /></div>
                <div className="bg-indigo-400 text-white p-4 rounded-[2rem] text-center shadow-sm border-4 border-white w-[80%] mx-auto">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">SOM</p>
                    <p className="text-lg font-black">$50M (5% capture)</p>
                </div>
             </div>
          </div>
          <div className="flex justify-center">
             <div className="px-6 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black flex items-center gap-2 border border-emerald-100">
                <LineChart className="w-4 h-4" />
                📈 Pro Tip: Investors and PMs always look for large TAM (>$1B) but realistic SOM (~1–5% of SAM).
             </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
             <Zap className="text-indigo-600" />
             5. Example: Zomato (Early Days)
          </h2>
          <div className="overflow-x-auto rounded-[2rem] border border-zinc-200">
             <table className="min-w-full border-collapse bg-white">
                <thead className="bg-zinc-900 text-white">
                   <tr>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest">Metric</th>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest">Estimate</th>
                      <th className="p-4 text-left text-xs font-black uppercase tracking-widest">Explanation</th>
                   </tr>
                </thead>
                <tbody className="text-sm font-medium">
                   <tr className="border-b border-zinc-100">
                      <td className="p-4 font-black">TAM</td>
                      <td className="p-4 text-indigo-600">$20B</td>
                      <td className="p-4 text-zinc-600">Global food delivery market</td>
                   </tr>
                   <tr className="border-b border-zinc-100">
                      <td className="p-4 font-black">SAM</td>
                      <td className="p-4 text-indigo-600">$1.5B</td>
                      <td className="p-4 text-zinc-600">Indian food delivery segment</td>
                   </tr>
                   <tr className="border-b border-zinc-100">
                      <td className="p-4 font-black">SOM</td>
                      <td className="p-4 text-indigo-600">$150M</td>
                      <td className="p-4 text-zinc-600">10% share targeted in 3 years</td>
                   </tr>
                   <tr className="bg-indigo-50/50">
                      <td className="p-4 font-black text-indigo-900 italic">Result</td>
                      <td colSpan={2} className="p-4 text-indigo-700 font-bold">Large TAM, strong focus → Attracted early investors due to market depth</td>
                   </tr>
                </tbody>
             </table>
          </div>
        </section>

        <section className="space-y-8">
           <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
              <Star className="text-indigo-600" />
              6. Real-World PM Example
           </h2>
           <div className="p-8 rounded-[2.5rem] bg-white border border-zinc-200 relative overflow-hidden shadow-sm">
              <h4 className="font-black text-xl text-zinc-900 mb-6">Product: <span className="text-indigo-600">Duolingo</span></h4>
              <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></div>
                      <p className="text-sm font-bold text-zinc-600"><span className="text-zinc-900 font-black">TAM:</span> Global EdTech & language learning market ($60B)</p>
                  </div>
                  <div className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></div>
                      <p className="text-sm font-bold text-zinc-600"><span className="text-zinc-900 font-black">SAM:</span> App-based learning ($8B)</p>
                  </div>
                  <div className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></div>
                      <p className="text-sm font-bold text-zinc-600"><span className="text-zinc-900 font-black">SOM:</span> 2% of SAM ($160M initial target)</p>
                  </div>
                  <div className="mt-8 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex gap-3">
                      <Layers className="text-indigo-600 w-5 h-5 shrink-0" />
                      <p className="text-sm font-black text-indigo-900">🧩 Result: PMs used this sizing to justify product investment → Duolingo’s monetization strategy followed later.</p>
                  </div>
              </div>
           </div>
        </section>

        <section className="p-8 bg-zinc-900 text-white rounded-[2.5rem] border border-zinc-800">
           <h2 className="text-xl font-black text-[#79BAEC] mb-6 flex items-center gap-3">
              <BookOpen className="w-5 h-5" />
              7. Activity
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                  {[
                    "Choose your product idea.",
                    "Use Perplexity AI to get TAM + SAM data.",
                    "Use Excel or Notion to calculate SOM (bottom-up).",
                    "Visualize your TAM → SAM → SOM funnel in Canva or Power BI."
                  ].map((act, i) => (
                    <div key={i} className="flex gap-4 items-center">
                        <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-[#79BAEC] font-black text-xs border border-zinc-700">{i+1}</div>
                        <p className="text-sm font-bold text-zinc-300">{act}</p>
                    </div>
                  ))}
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-10">
        <div className="p-8 bg-white rounded-[2.5rem] border border-purple-100 shadow-xl">
           <h4 className="text-lg font-black text-purple-900 mb-8 flex items-center gap-2 uppercase tracking-tighter">
              <ClipboardCheck className="w-6 h-6" /> 🧩 8. Assignment: Market Sizing Deck
           </h4>
           
           <div className="space-y-8">
              <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                 <h5 className="font-black text-zinc-900 mb-6 uppercase tracking-widest text-xs">Deliverable: (1–2 slides)</h5>
                 <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                       <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">1</div>
                       <p className="text-sm font-bold text-zinc-600">1 Funnel diagram <span className="text-zinc-400 font-normal">(TAM → SAM → SOM)</span></p>
                    </div>
                    <div className="flex gap-4 items-start">
                       <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">2</div>
                       <p className="text-sm font-bold text-zinc-600">Data source references</p>
                    </div>
                    <div className="flex gap-4 items-start">
                       <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">3</div>
                       <p className="text-sm font-bold text-zinc-600">Key assumptions <span className="text-zinc-400 font-normal">(pricing, target audience, % penetration)</span></p>
                    </div>
                    <div className="flex gap-4 items-start">
                       <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">4</div>
                       <p className="text-sm font-bold text-zinc-600">1-line insight: <span className="italic text-purple-600">“Our product addresses a $500M opportunity growing at 15% CAGR.”</span></p>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                 <div className="px-6 py-3 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                    📄 Format: Canva / Notion / PowerPoint
                 </div>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 14,
    title: 'SQL Basics (SELECT & WHERE)',
    category: 'Data',
    preview: 'Data is the voice of your users. Start querying with the most essential SQL commands.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">SQL for PMs</h2>
        <p>You don't need to be an engineer, but you must be self-sufficient in getting data. <br/> <code>SELECT feature_name FROM feature_usage WHERE user_id = 101;</code></p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Install a SQLite browser or use a web-based SQL editor. Practice 10 basic SELECT queries on a sample dataset.</p>
      </div>
    )
  },
  {
    day: 15,
    title: 'SQL Joins & Filtering',
    category: 'Data',
    preview: 'Combine data from multiple tables. Learn INNER, LEFT, and RIGHT joins.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Relational Data</h2>
        <p>Learn how to connect a "Users" table with a "Purchases" table to find your highest-spending cohorts.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Write a query that joins "User_Profiles" and "Order_History" to list all users who spent more than $100 in the last 30 days.</p>
      </div>
    )
  },
  {
    day: 16,
    title: 'SQL Set Operators & Functions',
    category: 'Data',
    preview: 'Master UNION, INTERSECT, and String/Numeric functions for complex data manipulation.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Advanced Filtering</h2>
        <p>Use <code>LIKE</code>, <code>IN</code>, and <code>BETWEEN</code> to narrow down user segments accurately.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Practice using string functions (UPPER, LOWER, SUBSTR) to clean a messy database of user email addresses.</p>
      </div>
    )
  },
  {
    day: 17,
    title: 'SQL Date Functions & Case Logic',
    category: 'Data',
    preview: 'Analyze trends over time and build conditional logic for reporting.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Case Statements</h2>
        <p><code>CASE WHEN activity_score > 80 THEN 'Power User' ELSE 'Casual' END</code>. Essential for cohort classification.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Write a query to find the "7-day retention" of users who signed up in the first week of January.</p>
      </div>
    )
  },
  {
    day: 18,
    title: 'Excel Fundamentals',
    category: 'Data',
    preview: 'The PM\'s Swiss Army knife. Learn VLOOKUP, Pivot Tables, and logical formulas.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Why Excel?</h2>
        <p>Perfect for quick modeling, financial projections, and merging small CSV exports from your analytics tools.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Take a raw CSV of "App Usage Log". Use VLOOKUP to bring in user demographic data and create a summary table.</p>
      </div>
    )
  },
  {
    day: 19,
    title: 'Excel Charts & Dashboards',
    category: 'Data',
    preview: 'A picture is worth a thousand rows. Build interactive dashboards for stakeholders.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Visualization Principles</h2>
        <p>Avoid pie charts for >3 categories. Use bar charts for comparisons and line charts for trends over time.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Build a "Weekly Product Health Dashboard" in Excel featuring DAU trends, Conversion rate, and Top 5 feature usage.</p>
      </div>
    )
  },
  {
    day: 20,
    title: 'Power BI Essentials',
    category: 'Data',
    preview: 'Transform raw data into scalable interactive dashboards using Power Query and DAX.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Scalable Analytics</h2>
        <p>Power BI is essential for merging disparate data sources (Mixpanel + Salesforce + SQL) without manual re-entry.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Download Power BI Desktop. Import two sample Excel files and create a "Drill-down" report for Sales performance.</p>
      </div>
    )
  },
  {
    day: 21,
    title: 'Mixpanel & Event Analytics',
    category: 'Data',
    preview: 'Track user behavior at a granular level. Learn Funnels, Retention, and Flow reports.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Event-Based Tracking</h2>
        <p>Focus on user actions (Clicked Button, Completed Signup) rather than just page views.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Draft a "Tracking Plan" (Event name, Properties, Trigger) for a core feature in your app idea.</p>
      </div>
    )
  },
  {
    day: 22,
    title: 'GA4 & A/B Testing',
    category: 'Data',
    preview: 'Make evidence-based decisions. Learn the A/B testing framework and Google Analytics 4.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">A/B Testing Framework</h2>
        <p>1. <strong>Hypothesis:</strong> "Changing X will do Y because of Z." <br/> 2. <strong>Metrics:</strong> Primary, Secondary, and Guardrail metrics.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Design an A/B test for Netflix's "Continue Watching" row. What is the hypothesis and the primary success metric?</p>
      </div>
    )
  },
  {
    day: 23,
    title: 'API Fundamentals',
    category: 'Tech',
    preview: 'Learn how software systems talk. Understand endpoints, JSON, and reading documentation.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">What is an API?</h2>
        <p>An Application Programming Interface is like a waiter in a restaurant. You make a request, they get it from the kitchen (server), and bring it back.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Browse the Stripe API documentation. Identify two endpoints and the parameters required to "Create a Customer".</p>
      </div>
    )
  },
  {
    day: 24,
    title: 'System Design for PMs',
    category: 'Tech',
    preview: 'Bridge the gap with Engineering. Learn about Client-Server, Caching, and Load Balancing.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Building Products that Scale</h2>
        <p>Understand technical debt, scalability constraints, and why a simple feature might take 6 weeks to build.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Sketch a high-level system architecture for a simple "Chat App". Label the Client, Server, and Database.</p>
      </div>
    )
  },
  {
    day: 25,
    title: 'UI/UX Design Basics',
    category: 'Design',
    preview: 'Master 12 UI/UX laws (e.g., Fitts\'s Law, Hick\'s Law) and learn usability auditing.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">The Aesthetic Trap</h2>
        <p>Don't mistake polished UI for good product sense. A beautiful design solving the wrong problem is a failure.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Perform a usability audit on an app you dislike. Suggest 3 improvements based on "Nielsen's Heuristics".</p>
      </div>
    )
  },
  {
    day: 26,
    title: 'Agile & Scrum Ops',
    category: 'Strategy',
    preview: 'Learn Sprint Planning, Daily Standups, Sprint Reviews, and Backlog Refinement.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">The Scrum Roles</h2>
        <p><strong>Product Owner (You):</strong> Owns the "What". <br/> <strong>Scrum Master:</strong> Facilitates process. <br/> <strong>Dev Team:</strong> Owns the "How".</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Take a messy list of 10 feature requests. Prioritize them using the RICE framework (Reach, Impact, Confidence, Effort).</p>
      </div>
    )
  },
  {
    day: 27,
    title: 'Cloud Computing (IaaS/PaaS/SaaS)',
    category: 'Tech',
    preview: 'Understand the modern tech stack. AWS, Azure, and why cloud economics matter for PMs.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Cloud Service Models</h2>
        <p><strong>IaaS:</strong> Renting hardware. <br/> <strong>PaaS:</strong> Renting a platform to build. <br/> <strong>SaaS:</strong> Software delivered over the internet.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Identify which cloud service model (SaaS/PaaS/IaaS) three popular products (Slack, Heroku, AWS EC2) use.</p>
      </div>
    )
  },
  {
    day: 28,
    title: 'AI/ML Fundamentals',
    category: 'AI',
    preview: 'Understand Artificial Intelligence, Machine Learning, and Deep Learning in simple terms.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Supervised vs. Unsupervised</h2>
        <p><strong>Supervised:</strong> Training with labeled data (Sick vs Healthy). <br/> <strong>Unsupervised:</strong> Finding patterns in unlabeled data (Clustering).</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Find a feature in an app you use that likely uses Machine Learning. Is it Supervised or Unsupervised?</p>
      </div>
    )
  },
  {
    day: 29,
    title: 'LLMs & Assistants',
    category: 'AI',
    preview: 'Deep dive into Large Language Models like GPT-4. Learn how they are built and trained.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Stages of Building an LLM</h2>
        <p>1. Pre-training (Internet simulator). <br/> 2. Supervised Fine-Tuning (Assistant persona). <br/> 3. Reinforcement Learning from Human Feedback (RLHF).</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Watch Andrej Karpathy's "Deep Dive into LLMs". Write down 3 limitations of LLMs that a PM must account for.</p>
      </div>
    )
  },
  {
    day: 30,
    title: 'Prompt Engineering',
    category: 'AI',
    preview: 'Learn how to write effective prompts: Instructions, Context, and Constraints.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Prompt Patterns</h2>
        <p>Few-Shot prompting, Chain-of-Thought reasoning, and Persona-based constraints. <strong>Goal:</strong> Relevant, Accurate, Actionable outputs.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Write a "System Prompt" for an AI assistant that critiques PRDs. Test it on an existing PRD section.</p>
      </div>
    )
  },
  {
    day: 31,
    title: 'Context Engineering',
    category: 'AI',
    preview: 'Manage the "attention budget" of LLMs. Learn Write, Select, Compress, and Isolate strategies.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Why Context Matters</h2>
        <p>LLMs have "context rot": as tokens increase, recall accuracy decreases. A PM must decide what information goes into the context window.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Explain how you would "isolate context" for a multi-agent AI system tasked with writing and then debugging code.</p>
      </div>
    )
  },
  {
    day: 32,
    title: 'RAG Systems',
    category: 'AI',
    preview: 'Retrieval Augmented Generation. Learn how to connect LLMs to private knowledge bases.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">The RAG Pipeline</h2>
        <p>1. <strong>Retrieval:</strong> Search private docs. <br/> 2. <strong>Augmentation:</strong> Add info to prompt. <br/> 3. <strong>Generation:</strong> LLM answers with context.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Sketch a workflow for a "Customer Support RAG" system. How would you handle outdated documentation?</p>
      </div>
    )
  },
  {
    day: 33,
    title: 'Model Context Protocol (MCP)',
    category: 'AI',
    preview: 'The open-source standard for connecting AI to tools and data sources modularly.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">The USB-C of AI</h2>
        <p>MCP allows a single AI host to connect to many servers (Google Drive, Slack, GitHub) without brittle ad-hoc integrations.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Brainstorm one MCP server you would build to help with your daily personal productivity.</p>
      </div>
    )
  },
  {
    day: 34,
    title: 'Agentic Workflows',
    category: 'AI',
    preview: 'Move from single-prompting to iterative agent cycles: Planning, Tool use, and Reflection.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Agent Patterns</h2>
        <p>Agentic workflows mimic human problem-solving by breaking tasks into atomic steps and iterating until satisfied.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Decompose the task "Write a 1500-word blog post on PM Mindset" into an agentic workflow of 4 sub-tasks.</p>
      </div>
    )
  },
  {
    day: 35,
    title: 'Building AI Agents (n8n)',
    category: 'AI',
    preview: 'Low-code agent building. Learn to use n8n to automate complex logic and API calls.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Autonomous Systems</h2>
        <p>An AI agent perceives its environment, makes decisions, and takes actions to achieve a specific goal without constant intervention.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Build a simple automation in n8n or Zapier that triggers an AI analysis when a new row is added to a Google Sheet.</p>
      </div>
    )
  },
  {
    day: 36,
    title: 'Building Proof of Work',
    category: 'Foundations',
    preview: 'Why shipping matters. Master the no-code stack: Lovable, Replit, Vercel, and Cursor.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Proof of Work > Credentials</h2>
        <p>Hiring managers prioritize demonstrated ability. Building small products teaches you user research, PRD writing, and engineering collab.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Pick a small problem you face. Aim to build and ship a "Minimal Valuable Proof" using a no-code tool within 5 hours.</p>
      </div>
    )
  },
  {
    day: 37,
    title: 'Product Teardowns',
    category: 'Foundations',
    preview: 'Reverse-engineer digital products to showcase your analytical rigor and strategic insight.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">What is a Teardown?</h2>
        <p>A systematic breakdown of a product's user journey, feature decisions, growth mechanics, and UX logic.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Create a 5-slide Product Teardown for a popular app's "Onboarding Flow". Identify one friction point and propose a fix.</p>
      </div>
    )
  },
  {
    day: 38,
    title: 'Startup Case Study',
    category: 'Foundations',
    preview: 'Proof of product thinking. Identify real problems and propose solutions with trade-offs.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Startup Outreach</h2>
        <p>Doing a case study is half the work. The other half is getting it in front of the right person (Founder/PM Leader) without being spammy.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Pick a Seed-stage startup. Write a short outreach message to the founder highlighting one insight from your case study.</p>
      </div>
    )
  },
  {
    day: 39,
    title: 'The PM Portfolio',
    category: 'Foundations',
    preview: 'Showcase your 45 days of work. Structure your portfolio to highlight discovery, execution, and impact.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Portfolio Sections</h2>
        <p>1. <strong>About:</strong> User-centric problem solver focus. <br/> 2. <strong>Case Studies:</strong> The meat of your portfolio. <br/> 3. <strong>Shipped Projects:</strong> Live links to your no-code apps.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Draft your "About" section for your PM portfolio. Highlight your transition journey and your core skill blueprint.</p>
      </div>
    )
  },
  {
    day: 40,
    title: 'CV & LinkedIn Optimization',
    category: 'Foundations',
    preview: 'Recruiter-grade analysis. Optimize for search visibility and hiring manager shortlisting.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">LinkedIn Best Practices</h2>
        <p>Keywords density, Role clarity (Title + Domain + Scope), and 3-second scan effectiveness. Aim for an ATS score > 85.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Run your CV through an AI Resume Checker. Rewrite your "Experience" bullets using the Action -> Context -> Outcome -> Metric format.</p>
      </div>
    )
  },
  {
    day: 41,
    title: 'Applying to Roles',
    category: 'Foundations',
    preview: 'Master platforms like Naukri, Wellfound, and LinkedIn. Learn the art of asking for referrals.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Referral Outreach</h2>
        <p>Never ask for a job first. Lead with insight, thoughtfulness, and respect for their time. Your case study is your entry ticket.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Shortlist 10 target companies. Find 1 PM at each and send a personalized connection request using the provided template.</p>
      </div>
    )
  },
  {
    day: 42,
    title: 'Case Study Interviews',
    category: 'Foundations',
    preview: 'Practice real-world interview prompts. Learn what is evaluated during Case rounds.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Round One Evaluation</h2>
        <p>1. Depth of analysis. <br/> 2. Assumptions & reasoning. <br/> 3. Prioritization framework use. <br/> 4. Metrics & Impact focus.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Practice the prompt: "Design a movie-booking app for elderly users." Follow the structure: User -> Pain Point -> Solution -> Metric.</p>
      </div>
    )
  },
  {
    day: 43,
    title: 'RCA & Guesstimates',
    category: 'Foundations',
    preview: 'Master Root Cause Analysis and Market Sizing estimations under pressure.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">RCA Framework</h2>
        <p>Sudden drop in metric? Check External (Seasonality, Competitor), Internal (Bug, Update), and Data (Tracking issues) factors.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Solve the guesstimate: "How many tube lights are there in Bangalore?". Write down your step-by-step assumptions.</p>
      </div>
    )
  },
  {
    day: 44,
    title: 'Product Improvement Rounds',
    category: 'Foundations',
    preview: 'Critique and improve your favorite products for specific business goals.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Structure</h2>
        <p>Identify one high-impact improvement for Spotify, Netflix, or Zepto. Connect it to a business metric like Retention or AOV.</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Pick an app. Identify 3 concrete improvements for its "Checkout Flow". Rank them by Impact vs. Effort.</p>
      </div>
    )
  },
  {
    day: 45,
    title: 'Behavioral Rounds & Graduation',
    category: 'Foundations',
    preview: 'Final preparations. Reflect on your 45-day journey and prepare for behavioral questions.',
    content: (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">The Wrap</h2>
        <p>Product Management is a journey of lifelong learning. You now have the skills, the portfolio, and the confidence to land your role.</p>
        <p className="font-bold text-indigo-600">Congratulations on completing the 45-Day PM Launchpad!</p>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p>Submit your final portfolio link for review. Record a 2-minute "Elevator Pitch" of yourself and your top project.</p>
      </div>
    )
  }
];
