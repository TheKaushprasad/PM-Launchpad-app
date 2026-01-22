
import React from 'react';
import { Lesson, ModuleInfo, Category } from './types';
import { 
  Lightbulb, Search, BarChart, 
  Code, Bot, Layers, Brain, Target, Sparkles, CheckCircle, Smartphone, Zap, Users, MessageSquare, Rocket, Activity, Database, Cpu, X, Box, HelpCircle, Terminal, TrendingUp, Settings2, ShieldCheck,
  FileText, Calendar, Compass, ClipboardList, PenTool, Hammer, Ship, RefreshCcw, Layout, FileEdit, PieChart, Send, Clock, ArrowRight, Play, LineChart, Recycle, Settings, HeartHandshake, Package, Beaker, AlertTriangle, Eye, Scale,
  BookOpen, ExternalLink, Map, Ear, UserCheck, Link, Smile, History, FileStack, Presentation, Megaphone, Briefcase, Users2, DollarSign, TrendingDown, Percent, ClipboardCheck, Mic2, Users2 as UsersIcon, Star, BarChart2, GraduationCap,
  MonitorPlay, ArrowLeft, Coffee
} from 'lucide-react';
import { Day0Content } from './content/days/day-0';
import { Day1Content } from './content/days/day-1';
import { Day2Content } from './content/days/day-2';
import { Day3Content } from './content/days/day-3';
import { Day4Content } from './content/days/day-4';
import { Day5Content } from './content/days/day-5';
import { Day6Content } from './content/days/day-6';
import { Day7Content } from './content/days/day-7';
import { Day8Content } from './content/days/day-8';
import { Day9Content } from './content/days/day-9';
import { Day10Content } from './content/days/day-10';
import { Day11Content } from './content/days/day-11';
import { Day12Content } from './content/days/day-12';
import { Day13Content } from './content/days/day-13';
import { Day14Content } from './content/days/day-14';
import { Day15Content } from './content/days/day-15';
import { Day16Content } from './content/days/day-16';
import { Day17Content } from './content/days/day-17';
import { Day18Content } from './content/days/day-18';
import { Day19Content } from './content/days/day-19';
import { Day20Content } from './content/days/day-20';
import { Day21Content } from './content/days/day-21';
import { Day22Content } from './content/days/day-22';
import { Day23Content } from './content/days/day-23';
import { Day24Content } from './content/days/day-24';
import { Day25Content } from './content/days/day-25';
import { Day26Content } from './content/days/day-26';
import { Day27Content } from './content/days/day-27';
import { Day28Content } from './content/days/day-28';
import { Day29Content } from './content/days/day-29';
import { Day30Content } from './content/days/day-30';
import { Day31Content } from './content/days/day-31';

export const getCategoryColor = (category: Category): string => {
  switch (category) {
    case 'Foundations': return 'bg-blue-50 text-blue-600 border-blue-100';
    case 'Research': return 'bg-purple-50 text-purple-600 border-purple-100';
    case 'Data': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'Design': return 'bg-pink-50 text-pink-600 border-pink-100';
    case 'AI': return 'bg-orange-50 text-orange-600 border-orange-100';
    case 'Strategy': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
    case 'Tech': return 'bg-cyan-50 text-cyan-600 border-cyan-100';
    case 'Job Ready': return 'bg-amber-50 text-amber-600 border-amber-100';
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
    case 'Job Ready': return <Briefcase className="w-4 h-4" />;
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
  { id: 'jobready', title: 'Job Ready', category: 'Job Ready', description: 'Portfolio building, resume optimization, and interview preparation.' },
];

export const LESSONS: Lesson[] = [
  {
    day: 0,
    title: 'Day-0: Foundation & Mindset — Start Your PM Journey Right',
    category: 'Foundations',
    preview: 'Start Your PM Journey Right . Before we jump into frameworks, tools, and case studies, today is about building the right mindset.',
    content: <Day0Content />
  },
  {
    day: 1,
    title: 'Day 1: What is Product Management?',
    category: 'Foundations',
    preview: 'Understand the role, responsibilities, types, and myths about Product Management.',
    content: <Day1Content />,
    assignment: (
      <div className="space-y-4">
        <p className="font-bold">Pick a product you use daily (e.g., Spotify, Zomato, Notion, Cred) and answer:</p>
        <div className="bg-white/50 p-4 rounded-xl border border-indigo-100">
          <p className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-1">Submission Format</p>
          <p className="text-sm">Product Name: ___ User Problem: ___ Key Metrics: ___ Improvement Suggestion: ___</p>
        </div>
        <p className="font-bold">Reflection Task</p>
        <p className="text-sm">Identify which of the 6 PM types excites you the most and why. Does it align with your current background (e.g., Engineer → TPM, Marketing → Growth)?</p>
      </div>
    )
  },
  {
    day: 2,
    title: 'Day 2: The Product Development Lifecycle (PDLC)',
    category: 'Foundations',
    preview: 'Discover the end-to-end journey of a product from discovery to launch and iteration.',
    content: <Day2Content />,
    resources: [
      { title: 'SDLC Life Cycle for Beginners', url: 'https://youtu.be/SaCYkPD4_K0?si=yXgsQq8esgNLi575', type: 'video' }
    ],
    assignment: (
      <div className="space-y-4">
        <p className="font-bold">Pick any app (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and describe a new feature across the PDLC:</p>
        <div className="bg-white/50 p-6 rounded-2xl border border-indigo-100 space-y-2">
            <p className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-1">Structured Thinking</p>
            <p className="text-sm"><strong>Product:</strong> ___</p>
            <p className="text-sm"><strong>Feature Idea:</strong> ___</p>
            <p className="text-sm"><strong>Discovery:</strong> Problem & insight: ___</p>
            <p className="text-sm"><strong>Definition:</strong> Hypothesis & metrics: ___</p>
            <p className="text-sm"><strong>Design:</strong> Sketch or description: ___</p>
            <p className="text-sm"><strong>Development:</strong> Dependencies / risks: ___</p>
            <p className="text-sm"><strong>Launch:</strong> Target segment & rollout plan: ___</p>
            <p className="text-sm"><strong>Iteration:</strong> What will you measure?: ___</p>
        </div>
        <p className="text-sm font-bold text-zinc-500 italic">Expected outcome: You learn to think like a PM end-to-end, considering everything from feasibility to measurement.</p>
      </div>
    )
  },
  {
    day: 3,
    title: 'Day 3: Product Life Cycle (PLC) & PLM',
    category: 'Foundations',
    preview: 'Understand how products evolve in the market over time and how companies manage that journey.',
    content: <Day3Content />,
    assignment: (
      <div className="space-y-4">
        <p className="font-bold">Pick any product (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and evaluate its lifecycle:</p>
        <div className="bg-white/50 p-6 rounded-2xl border border-indigo-100 space-y-2">
            <p className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-1">Analysis Framework</p>
            <p className="text-sm"><strong>Product:</strong> ___</p>
            <p className="text-sm"><strong>Current PLC Stage:</strong> ___</p>
            <p className="text-sm"><strong>Signals:</strong> What signals tell you this stage?: ___</p>
            <p className="text-sm"><strong>Strategy:</strong> What should PM focus on right now?: ___</p>
            <p className="text-sm"><strong>Risk:</strong> One risky decision PM must make at this stage: ___</p>
            <p className="text-sm"><strong>Extension:</strong> If it’s declining, how would you extend or sunset it?: ___</p>
        </div>
        <p className="text-sm font-bold text-zinc-500 italic">Expected outcome: You learn to think like a PM end-to-end, considering everything from feasibility to measurement.</p>
      </div>
    )
  },
  {
    day: 4,
    title: 'Day 4: Product Sense: The PM Sixth Sense',
    category: 'Foundations',
    preview: "Great PMs don’t build features. They solve meaningful problems. Master the 'sixth sense' of Product Management.",
    content: <Day4Content />,
    resources: [
      { title: 'What is Product Sense?', url: 'https://www.parallelhq.com/blog/white-product-sense', type: 'article' }
    ],
    assignment: (
      <div className="space-y-4">
        <p className="font-bold">Read this expert breakdown of Product Sense and apply it to a feature teardown.</p>
        <p className="font-bold">Task:</p>
        <p className="text-sm">Pick a feature from an app you use daily. Write a 1-page "Product Sense Teardown" identifying:</p>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="font-black text-indigo-600">1)</span> The core user problem
          </li>
          <li className="flex gap-2">
            <span className="font-black text-indigo-600">2)</span> The hypothesis behind the design
          </li>
          <li className="flex gap-2">
            <span className="font-black text-indigo-600">3)</span> One critical trade-off they made.
          </li>
        </ul>
      </div>
    )
  },
  {
    day: 5,
    title: 'Day 5: User Empathy',
    category: 'Foundations',
    preview: "Step into their shoes. User empathy is the fundamental driver of human-centered development.",
    content: <Day5Content />,
    resources: [
      { title: 'The Importance of Empathy', url: 'https://youtu.be/fqNAWyOOVfw?si=kDNECTry9tz-J9yf', type: 'video' }
    ],
    assignment: (
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="font-bold">Research Task</p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Find out How did Airbnb use user empathy to drive their success? Look for specific stories about their "early days" and how they handled user problems.
          </p>
        </div>
        
        <div className="space-y-3">
          <p className="font-bold">Reflection Questions</p>
          <div className="space-y-3">
            {[
              "How did they identify the problem travelers faced?",
              "What \"unscalable\" things did the founders do to empathize with hosts?",
              "How is that empathy reflected in the current app experience?"
            ].map((q, i) => (
              <div key={i} className="flex gap-3 items-start bg-white/50 p-3 rounded-xl border border-indigo-50">
                <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-0.5">{i+1}</span>
                <p className="text-sm font-bold text-zinc-700">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    day: 6,
    title: 'Day 6: Essential Product Documentation',
    category: 'Foundations',
    preview: "Essential Product Documentation for Product Managers. Distinguish between document types (PRD, BRD, user stories, roadmaps, etc.).",
    content: <Day6Content />,
    resources: [
      { title: 'Product Strategy & Roadmap', url: 'https://youtu.be/cnp6Ck8OIiY?si=eJHw5hzcwuiZZyf0', type: 'video' },
      { title: 'GTM Strategy', url: 'https://youtu.be/eDVtBleIxag?si=mE-x6s3HPTloD13x', type: 'video' }
    ],
    assignment: (
      <div className="space-y-4">
        <p className="font-bold">Assignment: Create your own PRD using ChatPRD.</p>
        <p className="text-sm text-zinc-600">Go to <a href="https://www.chatprd.ai/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold underline">ChatPRD</a> and experiment with building a document for a feature idea you have.</p>
      </div>
    )
  },
  {
    day: 7,
    title: 'Day 7: Stakeholder Management: The Product Manager\'s Essential Guide',
    category: 'Foundations',
    preview: "Identify and categorize stakeholders using influence and interest matrices to prioritize engagement efforts effectively.",
    content: <Day7Content />,
    resources: [
      { title: 'Communicating and Working with Stakeholders', url: 'https://youtu.be/jz7tPVDwb50?si=71B7Acqz6U2F0XA8', type: 'video' }
    ]
  },
  {
    day: 8,
    title: 'Day 8: Business Fundamentals for Product Managers',
    category: 'Foundations',
    preview: "Master the Metrics That Drive Sustainable Products. Learn CAC, LTV, and the 'Golden Ratio' of business success.",
    content: <Day8Content />,
    resources: [
      { title: 'Product Management Basics Certification', url: 'https://www.pendo.io/product-management-basics-certification/', type: 'tool' }
    ],
    assignment: (
      <div className="space-y-4">
        <p className="font-bold">Assignment: Business Certification</p>
        <p className="text-sm text-zinc-600">Complete the Product Management Basics Certification by Pendo to solidify your understanding of how products drive business value.</p>
        <a 
          href="https://www.pendo.io/product-management-basics-certification/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-700 transition-all"
        >
          Get Certified <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    )
  },
  {
    day: 9,
    title: 'Day 9: Introduction to User & Market Research',
    category: 'Research',
    preview: "Think like a researcher. Learn structured methods to uncover pain points and validate product ideas.",
    content: <Day9Content />,
    resources: [
      { title: 'Doing User Research', url: 'https://youtu.be/MxwyGi-3dzY?si=CV5VWd2bNnUDW-fP', type: 'video' },
      { title: 'Market Research', url: 'https://youtu.be/LoJDAeq6i34?si=Ok2GW9U0wFmSJzz8', type: 'video' }
    ],
    assignment: (
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="font-bold">Assignment: User & Market Research Report</p>
          <p className="text-sm text-zinc-600">Complete these 3 tasks to build your research foundation:</p>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-indigo-900 mb-1">1. Define Target Segment</h4>
             <p className="text-xs text-zinc-500">Identify exactly who you are solving for using demographics and psychographics.</p>
          </div>
          <div className="p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-indigo-900 mb-1">2. Pain Point vs. Outcome Table</h4>
             <p className="text-xs text-zinc-500">Create a 2x2 table mapping current struggles to desired future states.</p>
          </div>
          <div className="p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-indigo-900 mb-1">3. Competitor Scan</h4>
             <p className="text-xs text-zinc-500">Use Perplexity AI to find 3 direct or indirect competitors.</p>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 space-y-3">
           <p className="text-xs font-black text-indigo-900 uppercase tracking-widest">Final Deliverable (One-Slide Summary)</p>
           <ul className="text-sm font-medium text-zinc-700 space-y-1">
             <li>• <strong>The User:</strong> [Who are they?]</li>
             <li>• <strong>The Problem:</strong> [What is their core struggle?]</li>
             <li>• <strong>The Market:</strong> [Why does this matter right now?]</li>
           </ul>
        </div>
      </div>
    )
  },
  {
    day: 10,
    title: 'Day 10: User Interviews & Surveys',
    category: 'Research',
    preview: "“If you listen carefully, your users will write your roadmap for you.” Learn how to validate insights through real conversations and structured feedback.",
    content: <Day10Content />,
    resources: [
      { title: 'How To Conduct User Interviews Like A Pro', url: 'https://youtu.be/5tVbFfGDQCk?si=91eAIcNvjUAFfxM1', type: 'video' }
    ],
    assignment: (
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="font-bold">Assignment: Day-8: User Insights Report</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">1-Page Deliverable</p>
        </div>
        
        <div className="space-y-4">
          <div className="p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-indigo-900 mb-2">1. Top 3 Pain Points</h4>
             <p className="text-xs text-zinc-500">Include supporting user quotes for each pain point identified.</p>
          </div>
          <div className="p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-indigo-900 mb-2">2. Top 3 Desired Outcomes</h4>
             <p className="text-xs text-zinc-500">Describe what users explicitly want to achieve.</p>
          </div>
          <div className="p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-indigo-900 mb-2">3. Opportunity Statement</h4>
             <p className="text-xs text-zinc-500 font-bold text-indigo-600">"How might we solve for X?"</p>
          </div>
        </div>

        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
           <p className="text-xs font-bold text-emerald-800 italic">Evaluation: Great - 3 strong actionable themes supported by data.</p>
        </div>
      </div>
    )
  },
  {
    day: 11,
    title: 'Day 11: User Personas & JTBD',
    category: 'Research',
    preview: "“You don’t design for everyone — you design for someone.” Convert raw feedback into structured user profiles.",
    content: <Day11Content />,
    resources: [
      { title: 'Jobs to be done', url: 'https://youtu.be/dbVN6EYql6k?si=2440TMiKd3ZVmGvK', type: 'video' },
      { title: 'Creating Personas', url: 'https://youtu.be/v6EWN4EjHM0?si=5up6JXpGPfYnIq1d', type: 'video' }
    ],
    assignment: (
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="font-bold">Assignment: Day-9: Persona & JTBD Deck</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Final Deliverables</p>
        </div>
        
        <div className="space-y-4">
          <div className="p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-indigo-900 mb-2">1. 2 Personas</h4>
             <p className="text-xs text-zinc-500">Name, Bio, Goals, Pains, Behavior, Quote.</p>
          </div>
          <div className="p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-indigo-900 mb-2">2. JTBD Statements</h4>
             <p className="text-xs text-zinc-500">1 clear statement per persona.</p>
          </div>
          <div className="p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-indigo-900 mb-2">3. 1 Feature Suggestion</h4>
             <p className="text-xs text-zinc-500 font-bold text-indigo-600">Clearly aligned to the "Job".</p>
          </div>
        </div>

        <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
           <p className="text-xs font-bold text-indigo-800">Format: Canva / Slides / Notion</p>
        </div>
      </div>
    )
  },
  {
    day: 12,
    title: 'Day 12: Competitive & Market Analysis',
    category: 'Research',
    preview: "“You can’t build a better product until you understand what already exists.” Master SWOT and feature benchmarking.",
    content: <Day12Content />,
    resources: [
      { title: 'Competitive Analysis for Product Managers', url: 'https://youtu.be/UnBL8h8TVX8?si=v7_4Kx9EDy357xjg', type: 'video' }
    ],
    assignment: (
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="font-bold">Assignment: Competitive Report</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Final Deliverables (2–3 slides)</p>
        </div>
        
        <div className="space-y-4">
          <div className="p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-indigo-900 mb-2">• 2 SWOT Analysis</h4>
             <p className="text-xs text-zinc-500">Complete analysis for Competitor A & B.</p>
          </div>
          <div className="p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-indigo-900 mb-2">• Feature Comparison Matrix</h4>
             <p className="text-xs text-zinc-500">Us vs others mapping.</p>
          </div>
          <div className="p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-indigo-900 mb-2">• Positioning Statement</h4>
             <p className="text-xs text-zinc-500 font-bold text-indigo-600">“Unlike X and Y, our product [does what] for [whom].”</p>
          </div>
        </div>
      </div>
    )
  },
  {
    day: 13,
    title: 'Day 13: Opportunity Sizing (TAM / SAM / SOM)',
    category: 'Research',
    preview: "“A great product solves a real problem — but a great business solves it for a market that’s big enough.” Learn how to quantify your product idea.",
    content: <Day13Content />,
    resources: [
      { title: 'TAM, SAM, SOM Explained', url: 'https://youtu.be/nCYOMU7rKCs?si=cvu8yrnAbxDueKEI', type: 'video' }
    ],
    assignment: (
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="font-bold">Assignment: Market Opportunity Slide</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">For PRD or Pitch Deck</p>
        </div>
        
        <div className="space-y-4">
          <div className="p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-[#7d99bf] mb-2">1. Quantified Funnel</h4>
             <p className="text-xs text-zinc-500">Define TAM, SAM, and SOM for your product idea with specific $ or user numbers.</p>
          </div>
          <div className="p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-[#7d99bf] mb-2">2. Methodology Disclosure</h4>
             <p className="text-xs text-zinc-500">Note whether you used Top-Down, Bottom-Up, or Value-Based approaches.</p>
          </div>
          <div className="p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-black text-[#7d99bf] mb-2">3. Strategic Justification</h4>
             <p className="text-xs text-zinc-500 font-bold text-[#7d99bf]">Explain why this market is "big enough" or "growing fast enough" to invest in.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    day: 14,
    title: 'Day 14: Introduction to SQL (SELECT, WHERE, Basics)',
    category: 'Data',
    preview: '"Data is the voice of your users. SQL lets you listen." Learn the fundamentals of querying databases to answer your own questions independently.',
    content: <Day14Content />,
    topics: [
      { time: "00:00", title: "Intro" },
      { time: "07:38", title: "Introduction to SQL" },
      { time: "22:33", title: "Setup Your Environment" },
      { time: "34:01", title: "Query Data (SELECT)" },
      { time: "01:32:31", title: "DDL Commands" },
      { time: "01:43:44", title: "DML Commands" }
    ],
    resources: [
      { title: 'Introduction to SQL for PMs', url: 'https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg', type: 'video' }
    ]
  },
  {
    day: 15,
    title: 'Day 15: Filtering Data & SQL Joins',
    category: 'Data',
    preview: '"Joining tables is where SQL becomes powerful for PMs." Master advanced filtering and learn to combine data from multiple tables.',
    content: <Day15Content />,
    topics: [
      { time: "02:08:03", title: "Filtering Data" },
      { time: "02:47:57", title: "SQL Joins (Basics)" },
      { time: "03:27:29", title: "SQL Joins (Advanced)" }
    ],
    resources: [
      { title: 'Advanced SQL Filtering & Joins', url: 'https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg', type: 'video' }
    ]
  },
  {
    day: 16,
    title: 'Day 16: SQL Set Operators & Functions Deep Dive',
    category: 'Data',
    preview: '"Master SQL functions to transform raw data into actionable insights." learn advanced SQL techniques for combining datasets and manipulating data.',
    content: <Day16Content />,
    topics: [
      { time: "04:02:09", title: "Set Operators" },
      { time: "04:47:41", title: "SQL Functions" },
      { time: "04:52:58", title: "String Functions" },
      { time: "05:18:44", title: "Numeric Functions" }
    ],
    resources: [
      { title: 'SQL Set Operators & Functions Deep Dive', url: 'https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg', type: 'video' }
    ]
  },
  {
    day: 17,
    title: 'Day 17— SQL Date Functions, NULL Handling & Advanced Logic',
    category: 'Data',
    preview: '"Transform messy data into clean insights with SQL\'s most powerful functions." Today you\'ll master the essential SQL functions that PMs use daily for time-based analysis, handling missing data, and building conditional logic.',
    content: <Day17Content />,
    topics: [
      { time: "05:22:48", title: "Date and Time Functions" },
      { time: "06:59:06", title: "NULL Functions" },
      { time: "08:07:50", title: "Case Statement" },
      { time: "08:43:36", title: "Aggregate Functions" }
    ],
    resources: [
      { title: 'SQL Advanced Functions & Logic', url: 'https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg', type: 'video' }
    ]
  },
  {
    day: 18,
    title: 'Day 18 — Excel Fundamentals for PMs',
    category: 'Data',
    preview: '"Excel is the PM\'s Swiss Army knife — from quick analysis to complex models." Master Excel basics and essential formulas that PMs use daily for data analysis.',
    content: <Day18Content />,
    topics: [
      { time: "0:03:53", title: "What is Excel?" },
      { time: "0:07:19", title: "About Course" },
      { time: "0:11:19", title: "Excel Install" },
      { time: "0:22:42", title: "Worksheets" },
      { time: "0:39:15", title: "Workbooks" },
      { time: "0:52:06", title: "Ribbon" },
      { time: "1:06:39", title: "Formulas Intro" },
      { time: "1:18:08", title: "Function Intro" },
      { time: "1:29:14", title: "Logical Functions" },
      { time: "1:39:54", title: "Math Functions" },
      { time: "1:49:46", title: "Statistical Functions" },
      { time: "2:01:14", title: "Array Formulas" },
      { time: "2:21:28", title: "Lookup Function" },
      { time: "2:39:25", title: "Text Functions" },
      { time: "2:53:19", title: "Date and Time Functions" }
    ],
    resources: [
      { title: 'Excel Fundamentals for PMs', url: 'https://youtu.be/pCJ15nGFgVg?si=aqGEbVfcwFuLi7fY', type: 'video' }
    ]
  },
  {
    day: 19,
    title: 'Day 19— Excel Charts, Pivot Tables & Dashboards',
    category: 'Data',
    preview: '"A picture is worth a thousand rows of data." Learn to transform data into compelling visualizations and build interactive dashboards.',
    content: <Day19Content />,
    topics: [
      { time: "3:01:33", title: "Charts Intro" },
      { time: "3:22:05", title: "Charts Advanced" },
      { time: "3:35:37", title: "Charts Statistics" },
      { time: "3:47:59", title: "Sparklines" },
      { time: "3:51:57", title: "Tables" },
      { time: "4:09:28", title: "Formatting" },
      { time: "4:26:00", title: "Collaboration" },
      { time: "4:40:30", title: "Project #1: Build Dashboard" },
      { time: "5:26:43", title: "Project #1: Share Projects" },
      { time: "5:33:46", title: "PivotTable Intro" },
      { time: "5:54:53", title: "PivotTable Advanced" },
      { time: "6:09:33", title: "PivotCharts" }
    ],
    resources: [
      { title: 'Excel Charts, Pivot Tables & Dashboards', url: 'https://youtu.be/pCJ15nGFgVg?si=aqGEbVfcwFuLi7fY', type: 'video' }
    ]
  },
  {
    day: 20,
    title: 'Day 20 — Learn Power BI',
    category: 'Data',
    preview: 'Build a strong foundation in Power BI by understanding how raw data is transformed, modeled, calculated, and finally presented as interactive dashboards.',
    content: <Day20Content />,
    resources: [
      { title: 'Power BI Masterclass', url: 'https://youtu.be/I0vQ_VLZTWg?si=Gkh1WYh75MOngmbS', type: 'video' }
    ]
  },
  {
    day: 21,
    title: 'Day 21: Product Analytics & Metrics Foundations',
    category: 'Data',
    preview: 'Understand how product analytics fits into the PDLC, define success metrics, and learn the basics of behavior tracking with Mixpanel.',
    content: <Day21Content />,
    resources: [
      { title: 'Product Analytics & Mixpanel Foundations', url: 'https://youtu.be/5O4ST-R5ZVw?si=IN49CzqS5qHexth3', type: 'video' }
    ]
  },
  {
    day: 22,
    title: 'Day 22: Google Analytics 4 & A/B Testing',
    category: 'Data',
    preview: 'Gain a step-by-step understanding of GA4 and master the art of A/B testing to make evidence-based product decisions.',
    content: <Day22Content />,
    resources: [
      { title: 'Google Analytics 4 Mastery', url: 'https://youtu.be/hsIP4iH25Wg?si=kahtDEdtF6LY7cTU', type: 'video' },
      { title: 'A/B Testing with VWO', url: 'https://youtu.be/QEqholJ28qI?si=Y7KfY4Sr_eKJUIBn', type: 'video' }
    ]
  },
  {
    day: 23,
    title: 'Day 23: Understanding APIs as a Product Manager',
    category: 'Tech',
    preview: "APIs are the building blocks of modern software. Learn how they work and why they're critical for product strategy and execution.",
    content: <Day23Content />,
    resources: [
      { title: 'How Does the Internet Work?', url: 'https://www.cloudflare.com/en-in/learning/network-layer/how-does-the-internet-work/', type: 'article' },
      { title: 'API for Product Managers', url: 'https://dune-leek-31a.notion.site/API-for-Product-Managers-24abaab379148074abc3f57b062db2bf', type: 'article' }
    ]
  },
  {
    day: 24,
    title: 'Day 24: System Design for Product Managers',
    category: 'Strategy',
    preview: 'System Design for Product Managers: Building Products That Scale. Bridge the gap between product vision and technical reality.',
    content: <Day24Content />,
    resources: [
      { title: 'System Design for Product Managers', url: 'https://youtu.be/m8Icp_Cid5o?si=u52HzOf12e0cMvyI', type: 'video' }
    ]
  },
  {
    day: 25,
    title: 'Day 25: UI/UX for Product Managers',
    category: 'Design',
    preview: 'Build a solid foundation in UI/UX principles, including design fundamentals, usability testing, and visual design laws.',
    content: <Day25Content />,
    resources: [
      { title: 'UX Design UI Essentials Course', url: 'https://youtu.be/QJBP2uy8LcU?si=GIa6MA8amS8vYBdd', type: 'video' },
      { title: 'Usability Testing for UX', url: 'https://youtu.be/nYCJTea1AUQ?si=8RcveOgK6wybwlk4', type: 'video' },
      { title: 'Basics of UI/UX', url: 'https://youtu.be/ziQEqGZB8GE?si=gdeMwyRMYEwOmBOL', type: 'video' },
      { title: '12 UI/UX Laws You MUST KNOW', url: 'https://youtu.be/wELfwQmtnvo?si=t7AEn1xVBoB8lPTm', type: 'video' }
    ]
  },
  {
    day: 26,
    title: 'Day 26: Foundations of Agile & Scrum Project Management',
    category: 'Strategy',
    preview: 'Build a solid understanding of Agile principles, Scrum practices, and prioritization frameworks used in real product delivery.',
    content: <Day26Content />,
    resources: [
      { title: 'Agile & Scrum Intro Video', url: 'https://youtu.be/WDAQq5vCMME?si=FaBFP9KwcKDsviFh', type: 'video' },
      { title: 'Jira Beginner Course', url: 'https://youtu.be/NDVSMlVYxm8?si=GptGyKBBY7AlhEZ8', type: 'video' },
      { title: 'Prioritization Frameworks', url: 'https://www.atlassian.com/agile/product-management/prioritization-framework', type: 'article' }
    ]
  },
  {
    day: 27,
    title: 'Day 27: Cloud Computing for Product Managers',
    category: 'Strategy',
    preview: 'Understanding cloud computing fundamentally changes how you think about building products. Learn about service models, economics, and cloud-native architecture.',
    content: <Day27Content />
  },
  {
    day: 28,
    title: 'Day 28: What is Artificial Intelligence, Machine Learning and Deep Learning?',
    category: 'AI',
    preview: 'Understand the core foundations of AI, the modern method of Machine Learning, and the breakthroughs of Deep Learning.',
    content: <Day28Content />,
    resources: [
        { title: 'AI for Everyone - DeepLearning.ai', url: 'https://learn.deeplearning.ai/courses/ai-for-everyone/lesson/i76hs/machine-learning', type: 'video' }
    ]
  },
  {
    day: 29,
    title: 'Day 29: Large Language Models (LLM) Foundations',
    category: 'AI',
    preview: 'Deep dive into what LLMs are, how they work, and why product managers need to understand their capabilities and limitations.',
    content: <Day29Content />,
    resources: [
        { title: 'LLM Introduction Video', url: 'https://youtu.be/7xTGNNLPyMI?si=_FGxNCEjJcvyxdAz', type: 'video' }
    ]
  },
  {
    day: 30,
    title: 'Day 30: Prompt Engineering for Product Managers',
    category: 'AI',
    preview: 'Learn how to write effective prompts so that large language models (LLMs) return useful, reliable, and actionable outputs.',
    content: <Day30Content />,
    resources: [
        { title: 'Prompting 101 Video', url: 'https://youtu.be/ysPbXH0LpIE?si=5Riv7IB9ezFAt_Kc', type: 'video' },
        { title: 'AWS Prompt Engineering Foundation', url: 'https://share.google/FdZPEVTPVCkN85d33', type: 'tool' }
    ]
  },
  {
    day: 31,
    title: 'Day 31: Context Engineering',
    category: 'AI',
    preview: 'Master the set of strategies for curating and maintaining the optimal set of tokens during LLM inference.',
    content: <Day31Content />,
    resources: [
        { title: 'Context Engineering for Agents', url: 'https://www.blog.langchain.com/context-engineering-for-agents/', type: 'article' }
    ]
  }
];
