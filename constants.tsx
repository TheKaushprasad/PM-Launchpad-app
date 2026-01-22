
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
      { title: 'What is Product Sense?', url: 'https://www.parallelhq.com/blog/what-product-sense', type: 'article' }
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
  }
];
