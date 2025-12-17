import React from 'react';
import { Lesson, ModuleInfo } from './types';
import { Lightbulb, Users, Target, PenTool, Brain, Search, Layout, BarChart, Code, Bot, CheckCircle, Zap, TrendingUp, Layers, Database, Server, Cpu, Rocket, RefreshCw, Play, Wrench, XCircle, Settings, HelpCircle, Youtube, ExternalLink, Compass, ClipboardList, CheckSquare, FileText, Flag, Microscope } from 'lucide-react';

export const MODULES: ModuleInfo[] = [
  { id: 'foundations', title: 'Foundations & Strategy', category: 'Foundations', description: 'Core PM concepts and strategic thinking.' },
  { id: 'research', title: 'Discovery & Research', category: 'Research', description: 'User interviews, personas, and market analysis.' },
  { id: 'data', title: 'Data & Analytics', category: 'Data', description: 'Metrics, SQL, and data-driven decision making.' },
  { id: 'design', title: 'Design, Tech & Agile', category: 'Design', description: 'UI/UX principles, engineering basics, and execution.' },
  { id: 'ai', title: 'AI & Future of PM', category: 'AI', description: 'Leveraging AI tools and preparing for the future.' },
];

export const LESSONS: Lesson[] = [
  {
    day: 0,
    title: 'Foundation & Mindset',
    category: 'Foundations',
    preview: 'Start Your PM Journey Right 🚀. Before we jump into frameworks, tools, and case studies, today is about building the right mindset.',
    content: (
      <div className="space-y-8 text-gray-800">
        <section>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
             <h3 className="font-bold text-blue-900 text-lg">Day-0: Foundation & Mindset — Start Your PM Journey Right 🚀</h3>
          </div>
          
          <p className="text-lg leading-relaxed mb-6">
            Welcome to Day-0 of learning Product Management from scratch! Before we jump into frameworks, tools, and case studies, today is about building the right mindset to succeed as a Product Manager.
          </p>

          <p className="mb-4 font-medium">
            Product Management is one of the most competitive and rewarding careers today. But breaking into PM without prior experience can feel overwhelming because the role demands:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-500" />
                <span>Cross-functional collaboration</span>
            </div>
             <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center gap-3">
                <Brain className="w-5 h-5 text-orange-500" />
                <span>Strategic thinking & decision-making</span>
            </div>
             <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center gap-3">
                <Target className="w-5 h-5 text-red-500" />
                <span>Problem-solving with ambiguity</span>
            </div>
             <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center gap-3">
                <Code className="w-5 h-5 text-blue-500" />
                <span>Understanding of business, design, tech & data</span>
            </div>
          </div>

          <p className="italic text-gray-600 border-l-2 border-gray-300 pl-4">
            Many aspiring PMs struggle not because they lack skills, but because they lack <strong>clarity of purpose and direction</strong>.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" /> Why Day-0 Matters
          </h3>
          <p className="mb-4">
            Before learning “how to be a PM”, you must understand <strong>why</strong> you want to be a PM. PMs face pressure, ownership, ambiguity, and constant context switching — your motivation will keep you going when it gets hard.
          </p>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
             <p className="font-bold text-gray-900 mb-3">Understanding the reality of the role—not just the glamour—helps you evaluate:</p>
             <ul className="space-y-2">
                <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Is PM aligned with your strengths & interests?</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Do you enjoy solving problems and talking to users?</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Are you comfortable making decisions without perfect data?</span>
                </li>
             </ul>
             <p className="mt-4 text-sm text-gray-600 bg-white p-3 rounded border border-gray-100 inline-block">
                The fastest way to answer these questions is to talk to real PMs, understand their challenges, impact, and day-to-day responsibilities.
             </p>
          </div>
        </section>

        <section>
           <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-pink-500" /> Reflection Exercise
           </h3>
           <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-orange-100">
              <p className="font-bold text-orange-900 mb-4">Write answers to these 3 questions:</p>
              <div className="space-y-3">
                  <div className="bg-white p-3 rounded shadow-sm text-gray-800">1. Why do I want to become a Product Manager?</div>
                  <div className="bg-white p-3 rounded shadow-sm text-gray-800">2. What strengths do I already have that can help me succeed?</div>
                  <div className="bg-white p-3 rounded shadow-sm text-gray-800">3. What areas do I need to improve over the next 45 days?</div>
              </div>
              <p className="mt-4 font-medium text-orange-800 text-center">Clarity today will drive consistency tomorrow.</p>
           </div>
        </section>

        <section>
            <h3 className="text-2xl font-bold mb-4">Outcome of Day-0</h3>
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <p className="font-medium text-green-900 mb-4">By the end of today, you should have:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        "Real understanding of what PM is",
                        "Motivation aligned with reality",
                        "Early networking with professionals",
                        "A clear starting point for the roadmap"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-gray-700">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="bg-gray-900 text-white p-8 rounded-2xl text-center relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">Mindset Reminder</h3>
                <p className="text-lg text-gray-300 italic mb-6">"You don’t get into PM by reading. You get into PM by doing, asking, learning, and iterating."</p>
                <div className="inline-block bg-blue-600 hover:bg-blue-500 transition-colors px-6 py-3 rounded-full font-bold shadow-lg">
                    This journey begins TODAY. 🚀
                </div>
             </div>
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 opacity-50 z-0"></div>
        </section>
      </div>
    ),
    assignment: (
        <div className="space-y-4">
            <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" /> Task 1 — Must Do Today
            </h4>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <p className="font-medium text-gray-800 mb-3">Reach out to <span className="text-blue-600 font-bold">5 Product Managers</span> and ask them about their journey & role.</p>
                <p className="text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded">Use LinkedIn, alumni networks, or company communities.</p>
                
                <p className="font-semibold text-xs text-gray-500 uppercase tracking-wide mb-2">Suggested questions:</p>
                <ul className="list-disc pl-4 space-y-2 text-sm text-gray-600 mb-4">
                    <li>What does a typical day look like for you?</li>
                    <li>What is the hardest part of your job?</li>
                    <li>How did you break into product without prior experience?</li>
                    <li>What advice would you give to someone starting now?</li>
                </ul>
                <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
                    <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                    <p className="text-xs text-blue-800 font-medium">Goal: Collect insights and note patterns. This will guide your expectations.</p>
                </div>
            </div>
        </div>
    )
  },
  {
    day: 1,
    title: 'What is Product Management? 🚀',
    category: 'Foundations',
    preview: 'Theme: Understanding the role, responsibilities, types, and myths about Product Management.',
    content: (
        <div className="space-y-8 text-gray-800">
          {/* Learning Objectives */}
          <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-blue-900">
              <Target className="w-5 h-5" /> Learning Objectives
            </h3>
            <p className="mb-2 font-medium text-blue-800">By the end of today, you will:</p>
            <ul className="space-y-2">
              {['Understand what a product and product management truly mean', 'Learn why PMs exist and how their value changes with company stage', 'Know the core responsibilities, deliverables, and skill areas of PMs', 'Break common myths and misconceptions about PM careers', 'Analyze real-world examples through a structured lens'].map((item, i) => (
                 <li key={i} className="flex items-start gap-2 text-blue-700">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                 </li>
              ))}
            </ul>
          </section>
    
          {/* 1. What is a Product? */}
          <section>
            <h3 className="text-2xl font-bold mb-4">1. What is a Product?</h3>
            <p className="text-lg mb-4">A product is anything that creates value by solving a real user problem or fulfilling a need—whether physical, digital, or service-based.</p>
            <div className="bg-gray-100 p-4 rounded-lg">
               <span className="font-bold">Examples:</span> Uber, Spotify, iPhone, Google Ads, ATM, WhatsApp.
            </div>
          </section>
    
          {/* 2. Do Companies Need PMs? */}
          <section>
            <h3 className="text-2xl font-bold mb-4">2. Do Companies Need Product Managers?</h3>
            <p className="mb-4 font-medium">Short answer: Yes—but the title isn’t always necessary. Product thinking is.</p>
            
            <h4 className="font-bold mb-2 text-gray-700">Why PMs emerge: Company Growth Stages</h4>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 border-b font-semibold">Stage</th>
                            <th className="p-3 border-b font-semibold">Who acts as PM</th>
                            <th className="p-3 border-b font-semibold">Why it works</th>
                            <th className="p-3 border-b font-semibold">When it breaks</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b">
                            <td className="p-3 font-medium">Early startup</td>
                            <td className="p-3">Founder</td>
                            <td className="p-3">Small team, fast decisions</td>
                            <td className="p-3">Complexity increases, decisions overload</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-3 font-medium">Growth stage</td>
                            <td className="p-3">Dedicated PMs</td>
                            <td className="p-3">Align teams, prioritize impact</td>
                            <td className="p-3">Without PMs: confusion, misalignment</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium">Large enterprise</td>
                            <td className="p-3">Product org</td>
                            <td className="p-3">Scale, governance</td>
                            <td className="p-3">Without PMs: feature bloat, chaos</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>
    
          {/* 3. Real-World Exceptions */}
          <section>
             <h3 className="text-2xl font-bold mb-4">3. Real-World Exceptions</h3>
             <p className="mb-3">Some companies have succeeded without formal PMs:</p>
             <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-700">
                <li>Basecamp (design-lead)</li>
                <li>Valve (self-organized)</li>
                <li>Early Facebook / Stripe (engineer-led)</li>
             </ul>
             <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-yellow-900 text-sm font-medium">
                👉 These work only when everyone practices product thinking: user obsession + data + trade-offs + execution focus.
             </div>
          </section>
    
          {/* 4. What is Product Management? */}
          <section>
            <h3 className="text-2xl font-bold mb-4">4. What is Product Management?</h3>
            <p className="mb-4">Product Management is the function responsible for guiding a product from idea → launch → growth → scale by balancing: <br/><strong className="text-blue-600">User value × Business goals × Technical feasibility</strong></p>
            <p className="italic text-gray-600 mb-6">PMs don’t decide how to build — they decide what to build and why.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="font-bold text-green-800 mb-1">Business</div>
                    <div className="text-xs text-green-700">Revenue, success metrics, GTM</div>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
                    <div className="font-bold text-pink-800 mb-1">Design</div>
                    <div className="text-xs text-pink-700">User experience & usability</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="font-bold text-blue-800 mb-1">Tech</div>
                    <div className="text-xs text-blue-700">Feasibility & system thinking</div>
                </div>
            </div>
          </section>
    
           {/* 5. PM Responsibilities */}
           <section>
            <h3 className="text-2xl font-bold mb-4">5. PM Responsibilities</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr><th className="p-3 border-b">Area</th><th className="p-3 border-b">What it includes</th></tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b"><td className="p-3 font-medium">User understanding</td><td className="p-3">Research, interviews, personas, feedback</td></tr>
                        <tr className="border-b"><td className="p-3 font-medium">Problem definition</td><td className="p-3">Insights, hypotheses, opportunity sizing</td></tr>
                        <tr className="border-b"><td className="p-3 font-medium">Prioritization</td><td className="p-3">RICE, MoSCoW, Kano</td></tr>
                        <tr className="border-b"><td className="p-3 font-medium">Strategy & Roadmapping</td><td className="p-3">Vision, goals, milestones</td></tr>
                        <tr className="border-b"><td className="p-3 font-medium">Execution & Delivery</td><td className="p-3">PRDs, user stories, collaboration with engineering</td></tr>
                        <tr className="border-b"><td className="p-3 font-medium">Analytics & Learning</td><td className="p-3">KPIs, experiments, iterations</td></tr>
                        <tr><td className="p-3 font-medium">Communication</td><td className="p-3">Stakeholders, presentations, influence</td></tr>
                    </tbody>
                </table>
            </div>
           </section>
    
           {/* 6. Deliverables */}
           <section>
            <h3 className="text-2xl font-bold mb-4">6. PM Deliverables</h3>
             <div className="grid grid-cols-2 gap-3">
                {[
                    {name: "PRD", purpose: "Clarifies what & why"},
                    {name: "Roadmap", purpose: "Timeline of priorities"},
                    {name: "User Stories", purpose: "Execution details"},
                    {name: "Metrics Dashboard", purpose: "Success tracking"},
                    {name: "GTM / Launch Plan", purpose: "Go-to-market alignment"},
                ].map((d,i) => (
                    <div key={i} className="bg-white border p-3 rounded shadow-sm">
                        <span className="block font-bold text-gray-800">{d.name}</span>
                        <span className="text-xs text-gray-500">{d.purpose}</span>
                    </div>
                ))}
             </div>
           </section>
    
           {/* 7. Types of PMs */}
           <section>
            <h3 className="text-2xl font-bold mb-4">7. Types of Product Managers</h3>
            <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50"><tr><th className="p-2 border-b">Type</th><th className="p-2 border-b">Focus</th><th className="p-2 border-b">Example</th></tr></thead>
                    <tbody className="text-sm">
                        <tr className="border-b"><td className="p-2 font-medium">Core</td><td className="p-2">End-to-end features</td><td className="p-2">Zomato ordering UX</td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Growth</td><td className="p-2">Metrics & funnels</td><td className="p-2">Activation, retention</td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Platform</td><td className="p-2">Internal tools/APIs</td><td className="p-2">Payment service APIs</td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Technical PM</td><td className="p-2">Engineering-heavy products</td><td className="p-2">Integrations, infra</td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Data PM</td><td className="p-2">Experimentation & models</td><td className="p-2">Recommendation engine</td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">AI PM</td><td className="p-2">AI features, data models</td><td className="p-2">Prompt, model performance</td></tr>
                        <tr><td className="p-2 font-medium">Ops PM</td><td className="p-2">Process optimization</td><td className="p-2">Workforce efficiency</td></tr>
                    </tbody>
                 </table>
            </div>
           </section>
    
           {/* 8. Who works with PM */}
           <section>
             <h3 className="text-2xl font-bold mb-4">8. Who Does a PM Work With?</h3>
             <div className="flex flex-wrap gap-2">
                {[
                    {team: "Engineering", provides: "Priorities, clarity, context"},
                    {team: "Design", provides: "Problem, constraints, feedback"},
                    {team: "Marketing", provides: "Messaging, positioning, GTM"},
                    {team: "Leadership", provides: "Strategy, metrics, roadmap"},
                    {team: "Users", provides: "Feedback loops"},
                ].map((t,i) => (
                    <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        <strong>{t.team}:</strong> {t.provides}
                    </span>
                ))}
             </div>
           </section>
    
           {/* 9. Myths vs Reality */}
           <section>
             <h3 className="text-2xl font-bold mb-4">9. Myths vs Reality</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded border border-red-100">
                    <h4 className="font-bold text-red-800 mb-2">Myths ❌</h4>
                    <ul className="space-y-2 text-sm text-red-700">
                        <li>“PMs are the boss.”</li>
                        <li>“PMs must code.”</li>
                        <li>“PMs only build features.”</li>
                        <li>“PMs manage timelines.”</li>
                    </ul>
                </div>
                <div className="bg-green-50 p-4 rounded border border-green-100">
                    <h4 className="font-bold text-green-800 mb-2">Reality ✅</h4>
                     <ul className="space-y-2 text-sm text-green-700">
                        <li>PMs have no authority — influence only.</li>
                        <li>Not required, but tech literacy is crucial.</li>
                        <li>PMs solve problems. Sometimes by removing features.</li>
                        <li>That’s project management. PMs define what & why.</li>
                    </ul>
                </div>
             </div>
           </section>
           
           {/* 10. Example */}
           <section>
            <h3 className="text-2xl font-bold mb-4">10. Example: PM at a Food Delivery App</h3>
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    <div className="font-medium text-gray-500 border-b pb-1">Phase</div><div className="font-medium text-gray-500 border-b pb-1">Example PM activity</div>
                    
                    <div className="font-semibold text-gray-700">Research</div><div>Understand checkout drop-offs</div>
                    <div className="font-semibold text-gray-700">Prioritize</div><div>Identify high-impact issues</div>
                    <div className="font-semibold text-gray-700">Design</div><div>Improve cart UX</div>
                    <div className="font-semibold text-gray-700">Build</div><div>Collaborate via PRD + sprint goals</div>
                    <div className="font-semibold text-gray-700">Launch</div><div>Marketing coordination</div>
                    <div className="font-semibold text-gray-700">Measure</div><div>Track completion rate in Mixpanel</div>
                </div>
            </div>
           </section>
           
           {/* Recap */}
           <section className="bg-indigo-900 text-white p-6 rounded-xl">
             <h3 className="text-xl font-bold mb-3">📌 Quick Recap</h3>
             <ul className="space-y-2">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> PM = Outcome-driven, not output-driven</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> PM is a role of clarity, empathy, and decision-making</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> PM success = Impact on user + business</li>
             </ul>
           </section>
    
        </div>
      ),
    assignment: (
        <div className="space-y-4">
            <h4 className="font-bold text-lg text-gray-900">🎯 Day-1 Mini Assignment</h4>
            <p className="text-sm text-gray-600">Pick a product you use daily (e.g., Spotify, Zomato, Notion, Cred).</p>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <p className="font-bold text-gray-800">Answer these questions:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li>What problem does it solve for you?</li>
                    <li>What metrics might the PM track?</li>
                    <li>What is one improvement you would suggest?</li>
                </ul>
    
                <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-sm">
                    <p className="font-bold text-gray-500 mb-2 uppercase text-xs">Submission Format</p>
                    <p>Product Name: ___</p>
                    <p>User Problem: ...</p>
                    <p>Key Metrics: ...</p>
                    <p>Improvement Suggestion: ...</p>
                </div>
            </div>
        </div>
    )
  },
  {
    day: 2,
    title: 'Types of Product Managers & Why They Exist 🔍',
    category: 'Foundations',
    preview: 'Theme: Understanding PM specializations and choosing the right path.',
    content: (
      <div className="space-y-8 text-gray-800">
        
        {/* Learning Objectives */}
        <section className="bg-purple-50 p-6 rounded-xl border border-purple-100">
           <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-purple-900">
             <Target className="w-5 h-5" /> Learning Objectives
           </h3>
           <p className="mb-2 font-medium text-purple-800">By the end of Day-2, you will:</p>
           <ul className="space-y-2">
             {[
               'Understand why PM roles diversify as companies scale',
               'Learn the responsibilities, skills, metrics & examples for each PM specialization',
               'Identify which PM role aligns with your strengths & interests',
               'See real-world examples across popular tech companies'
             ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-purple-700">
                   <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                   <span>{item}</span>
                </li>
             ))}
           </ul>
        </section>

        {/* 1. Why Different PM Types Exist */}
        <section>
           <h3 className="text-2xl font-bold mb-4">1. Why Different PM Types Exist</h3>
           <p className="mb-4">As products scale, complexity grows — more users, more data, multiple systems, deeper specialization needs.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                   <h4 className="font-bold text-orange-900 mb-2">At Early Stage</h4>
                   <p className="text-sm text-orange-800">One PM owns everything → discovery → design → delivery</p>
               </div>
               <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                   <h4 className="font-bold text-blue-900 mb-2">At Scale</h4>
                   <p className="text-sm text-blue-800">Specialization drives efficiency, ownership & clarity.</p>
               </div>
           </div>
        </section>

        {/* PM Types Table Summary */}
        <section className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                    <tr><th className="p-3 border-b">PM Type</th><th className="p-3 border-b">Primary Focus</th></tr>
                </thead>
                <tbody>
                    <tr className="border-b"><td className="p-3 font-semibold">Core PM</td><td className="p-3">What to build</td></tr>
                    <tr className="border-b"><td className="p-3 font-semibold">Growth PM</td><td className="p-3">How to grow and scale usage</td></tr>
                    <tr className="border-b"><td className="p-3 font-semibold">Platform PM</td><td className="p-3">How to scale systems & internal tools</td></tr>
                    <tr className="border-b"><td className="p-3 font-semibold">Data PM</td><td className="p-3">How to measure & optimize</td></tr>
                    <tr className="border-b"><td className="p-3 font-semibold">Technical PM (TPM)</td><td className="p-3">How to make it work seamlessly</td></tr>
                    <tr><td className="p-3 font-semibold">AI PM</td><td className="p-3">How to make it intelligent & adaptive</td></tr>
                </tbody>
            </table>
        </section>

        {/* Detailed Cards Grid */}
        <h3 className="text-2xl font-bold pt-4">Deep Dive: PM Specializations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Core PM */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Users className="w-6 h-6" /></div>
                   <h4 className="font-bold text-lg text-gray-900">2. Core PM</h4>
               </div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">The Generalist</p>
               <p className="text-sm text-gray-600 mb-4 flex-grow">Focus: End-to-end ownership of user-facing product experiences.</p>
               <div className="space-y-3 text-sm">
                   <div>
                       <span className="font-semibold block text-gray-800">Responsibilities:</span>
                       <ul className="list-disc pl-4 text-gray-600 text-xs mt-1">
                           <li>Define product vision & roadmap</li>
                           <li>User research & discovery</li>
                           <li>Prioritization & PRD writing</li>
                       </ul>
                   </div>
                   <div className="bg-gray-50 p-2 rounded">
                       <span className="block text-xs font-bold text-gray-500">📌 Example</span>
                       <span className="text-xs text-gray-700">Swiggy improving checkout conversion 85% → 92%</span>
                   </div>
                   <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                       <BarChart className="w-3 h-3" /> Retention, adoption, NPS, DAU
                   </div>
               </div>
            </div>

            {/* Growth PM */}
             <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-green-100 rounded-lg text-green-600"><TrendingUp className="w-6 h-6" /></div>
                   <h4 className="font-bold text-lg text-gray-900">3. Growth PM</h4>
               </div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">The Optimizer</p>
               <p className="text-sm text-gray-600 mb-4 flex-grow">Focus: Driving acquisition, activation, retention & revenue.</p>
               <div className="space-y-3 text-sm">
                   <div>
                       <span className="font-semibold block text-gray-800">Responsibilities:</span>
                       <ul className="list-disc pl-4 text-gray-600 text-xs mt-1">
                           <li>Funnel optimization & loops</li>
                           <li>A/B testing & experimentation</li>
                           <li>Monetization strategy</li>
                       </ul>
                   </div>
                   <div className="bg-gray-50 p-2 rounded">
                       <span className="block text-xs font-bold text-gray-500">📌 Example</span>
                       <span className="text-xs text-gray-700">Duolingo improving streak feature → +15% retention</span>
                   </div>
                   <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                       <BarChart className="w-3 h-3" /> DAU/MAU, Conversion rate, LTV
                   </div>
               </div>
            </div>

            {/* Platform PM */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Layers className="w-6 h-6" /></div>
                   <h4 className="font-bold text-lg text-gray-900">4. Platform PM</h4>
               </div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">The Enabler</p>
               <p className="text-sm text-gray-600 mb-4 flex-grow">Focus: Internal systems, APIs & developer experience.</p>
               <div className="space-y-3 text-sm">
                   <div>
                       <span className="font-semibold block text-gray-800">Responsibilities:</span>
                       <ul className="list-disc pl-4 text-gray-600 text-xs mt-1">
                           <li>Build scalable internal platforms</li>
                           <li>Align engineering & reliability</li>
                           <li>Reduce build time</li>
                       </ul>
                   </div>
                   <div className="bg-gray-50 p-2 rounded">
                       <span className="block text-xs font-bold text-gray-500">📌 Example</span>
                       <span className="text-xs text-gray-700">Razorpay building unified payments gateway API</span>
                   </div>
                   <div className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
                       <BarChart className="w-3 h-3" /> Uptime, latency, integration adoption
                   </div>
               </div>
            </div>

            {/* Data PM */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-teal-100 rounded-lg text-teal-600"><Database className="w-6 h-6" /></div>
                   <h4 className="font-bold text-lg text-gray-900">5. Data PM</h4>
               </div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">The Analyst PM</p>
               <p className="text-sm text-gray-600 mb-4 flex-grow">Focus: Data pipelines, dashboards & experimentation framework.</p>
               <div className="space-y-3 text-sm">
                   <div>
                       <span className="font-semibold block text-gray-800">Responsibilities:</span>
                       <ul className="list-disc pl-4 text-gray-600 text-xs mt-1">
                           <li>Define tracking & data schemas</li>
                           <li>Partner with DS/ML teams</li>
                           <li>Ensure data quality & governance</li>
                       </ul>
                   </div>
                   <div className="bg-gray-50 p-2 rounded">
                       <span className="block text-xs font-bold text-gray-500">📌 Example</span>
                       <span className="text-xs text-gray-700">Meesho enabling real-time retention dashboards</span>
                   </div>
                   <div className="flex items-center gap-1 text-xs text-teal-600 font-medium">
                       <BarChart className="w-3 h-3" /> Data accuracy, latency, usage
                   </div>
               </div>
            </div>

             {/* Technical PM */}
             <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Server className="w-6 h-6" /></div>
                   <h4 className="font-bold text-lg text-gray-900">6. Technical PM</h4>
               </div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">TPM</p>
               <p className="text-sm text-gray-600 mb-4 flex-grow">Focus: Highly technical systems & integrations.</p>
               <div className="space-y-3 text-sm">
                   <div>
                       <span className="font-semibold block text-gray-800">Responsibilities:</span>
                       <ul className="list-disc pl-4 text-gray-600 text-xs mt-1">
                           <li>Translate requirements → architecture</li>
                           <li>Manage APIs, integrations & scale</li>
                           <li>Balance tech debt</li>
                       </ul>
                   </div>
                   <div className="bg-gray-50 p-2 rounded">
                       <span className="block text-xs font-bold text-gray-500">📌 Example</span>
                       <span className="text-xs text-gray-700">Slack launching developer API endpoints</span>
                   </div>
                   <div className="flex items-center gap-1 text-xs text-slate-600 font-medium">
                       <BarChart className="w-3 h-3" /> Reliability, performance, success
                   </div>
               </div>
            </div>

             {/* AI PM */}
             <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-pink-100 rounded-lg text-pink-600"><Cpu className="w-6 h-6" /></div>
                   <h4 className="font-bold text-lg text-gray-900">7. AI Product Manager</h4>
               </div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">The Intelligent Builder</p>
               <p className="text-sm text-gray-600 mb-4 flex-grow">Focus: Products powered by machine learning & generative AI.</p>
               <div className="space-y-3 text-sm">
                   <div>
                       <span className="font-semibold block text-gray-800">Responsibilities:</span>
                       <ul className="list-disc pl-4 text-gray-600 text-xs mt-1">
                           <li>Identify AI opportunities</li>
                           <li>Work on model lifecycle (data → deploy)</li>
                           <li>Ensure responsible, bias-free AI</li>
                       </ul>
                   </div>
                   <div className="bg-gray-50 p-2 rounded">
                       <span className="block text-xs font-bold text-gray-500">📌 Example</span>
                       <span className="text-xs text-gray-700">Netflix personalization engine</span>
                   </div>
                   <div className="flex items-center gap-1 text-xs text-pink-600 font-medium">
                       <BarChart className="w-3 h-3" /> Model accuracy, usage, NPS
                   </div>
               </div>
            </div>

        </div>

      </div>
    ),
    assignment: (
        <div className="space-y-4">
            <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" /> Reflection Task
            </h4>
             <p className="text-sm text-gray-600">Based on today's lesson, which PM path resonates most with you?</p>
             <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <p className="font-bold text-gray-800 mb-2">Self-Assessment:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li>Which role aligns best with your current skills?</li>
                    <li>Which role interests you the most for the future?</li>
                </ul>
                <div className="mt-4 bg-yellow-50 border border-yellow-100 p-3 rounded text-xs text-yellow-800 italic">
                    Note: It's okay to start as a Core PM and specialize later!
                </div>
             </div>
        </div>
    )
  },
  {
    day: 3,
    title: 'The Product Development Lifecycle (PDLC) 📘',
    category: 'Foundations',
    preview: 'Theme: How products move from idea → design → build → launch → iterate.',
    content: (
        <div className="space-y-8 text-gray-800">
             
             {/* Learning Objectives */}
             <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-blue-900">
                  <Target className="w-5 h-5" /> Learning Objectives
                </h3>
                <p className="mb-2 font-medium text-blue-800">By the end of today, you will:</p>
                <ul className="space-y-2">
                  {[
                    'Understand the full lifecycle of product development',
                    'Know what happens at every stage & what PMs contribute',
                    'Learn common outputs, tools, and real examples',
                    'Avoid the typical mistakes that junior PMs make'
                  ].map((item, i) => (
                     <li key={i} className="flex items-start gap-2 text-blue-700">
                        <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                     </li>
                  ))}
                </ul>
             </section>
 
             {/* 1. What is PDLC? */}
             <section>
                <h3 className="text-2xl font-bold mb-4">1. What is PDLC?</h3>
                <p className="mb-4">Product Development Lifecycle (PDLC) is the structured process of taking a product from problem discovery → launch → continuous improvement, ensuring decisions are user-driven, data-backed, and business-aligned.</p>
                
                <h4 className="font-bold text-lg mb-3">Six Key Stages of PDLC</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr><th className="p-3 border-b">Stage</th><th className="p-3 border-b">Goal</th><th className="p-3 border-b">Key Output</th></tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b"><td className="p-3 font-semibold text-purple-600">1. Discovery</td><td className="p-3">Understand the user problem</td><td className="p-3">Problem statement, Personas</td></tr>
                            <tr className="border-b"><td className="p-3 font-semibold text-blue-600">2. Definition</td><td className="p-3">Scope & prioritize solution</td><td className="p-3">PRD, success metrics</td></tr>
                            <tr className="border-b"><td className="p-3 font-semibold text-pink-600">3. Design</td><td className="p-3">Visualize experience</td><td className="p-3">Wireframes, Prototype</td></tr>
                            <tr className="border-b"><td className="p-3 font-semibold text-slate-600">4. Development</td><td className="p-3">Build & test</td><td className="p-3">MVP, QA sign-off</td></tr>
                            <tr className="border-b"><td className="p-3 font-semibold text-green-600">5. Launch</td><td className="p-3">Ship product to users</td><td className="p-3">GTM plan, adoption data</td></tr>
                            <tr><td className="p-3 font-semibold text-orange-600">6. Iteration</td><td className="p-3">Improve continuously</td><td className="p-3">Insights, next roadmap</td></tr>
                        </tbody>
                    </table>
                </div>
             </section>
 
             {/* 2. Phase 1 — Discovery */}
             <section className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                 <h3 className="text-xl font-bold mb-2 text-purple-900 flex items-center gap-2"><Search className="w-5 h-5"/> Phase 1 — Discovery (Find the Right Problem)</h3>
                 <p className="italic text-purple-800 mb-4">“Fall in love with the problem, not the solution.” — Marty Cagan</p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                     <div>
                         <h4 className="font-bold text-purple-900 mb-1">PM Activities</h4>
                         <ul className="list-disc pl-4 text-purple-800 space-y-1">
                             <li>Market & competitor research</li>
                             <li>User interviews, surveys</li>
                             <li>Data analysis (Mixpanel, GA)</li>
                             <li>Identify Jobs-to-be-Done (JTBD)</li>
                         </ul>
                     </div>
                     <div>
                         <h4 className="font-bold text-purple-900 mb-1">Outputs</h4>
                         <ul className="list-disc pl-4 text-purple-800 space-y-1">
                             <li>Problem statement</li>
                             <li>Personas</li>
                             <li>Hypothesis & Sizing</li>
                         </ul>
                     </div>
                 </div>
                 <div className="mt-4 bg-white p-3 rounded border border-purple-200 text-sm text-purple-800">
                     <strong>📌 Example:</strong> Zomato observes high checkout drop-offs because of unpredictable surge delivery fees.
                 </div>
             </section>
 
             {/* 3. Phase 2 — Definition */}
             <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                 <h3 className="text-xl font-bold mb-2 text-blue-900 flex items-center gap-2"><PenTool className="w-5 h-5"/> Phase 2 — Definition (Scope the Solution)</h3>
                 <p className="text-blue-800 mb-4">Turn insights into an actionable plan.</p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                     <div>
                         <h4 className="font-bold text-blue-900 mb-1">PM Activities</h4>
                         <ul className="list-disc pl-4 text-blue-800 space-y-1">
                             <li>Prioritization (RICE, MoSCoW)</li>
                             <li>Success metrics / OKRs</li>
                             <li>PRD writing</li>
                             <li>Align with design & engineering</li>
                         </ul>
                     </div>
                     <div>
                         <h4 className="font-bold text-blue-900 mb-1">Outputs</h4>
                         <ul className="list-disc pl-4 text-blue-800 space-y-1">
                             <li>PRD</li>
                             <li>Prioritized roadmap</li>
                             <li>Success metrics</li>
                         </ul>
                     </div>
                 </div>
                  <div className="mt-4 bg-white p-3 rounded border border-blue-200 text-sm text-blue-800">
                     <strong>📌 Example:</strong> Test a Flat Delivery Fee Subscription Model to reduce checkout abandonment by 15%.
                 </div>
             </section>
 
             {/* 4. Phase 3 — Design */}
             <section className="bg-pink-50 p-6 rounded-xl border border-pink-100">
                 <h3 className="text-xl font-bold mb-2 text-pink-900 flex items-center gap-2"><Layout className="w-5 h-5"/> Phase 3 — Design (Shape the Experience)</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                     <div>
                         <h4 className="font-bold text-pink-900 mb-1">Activities</h4>
                         <ul className="list-disc pl-4 text-pink-800 space-y-1">
                             <li>Wireframes & prototypes in Figma</li>
                             <li>User testing & usability reviews</li>
                             <li>Accessibility & UI polishing</li>
                         </ul>
                     </div>
                     <div>
                         <h4 className="font-bold text-pink-900 mb-1">Outputs</h4>
                         <ul className="list-disc pl-4 text-pink-800 space-y-1">
                             <li>Prototype</li>
                             <li>Usability testing results</li>
                             <li>Design specs</li>
                         </ul>
                     </div>
                 </div>
                  <div className="mt-4 bg-white p-3 rounded border border-pink-200 text-sm text-pink-800">
                     <strong>📌 Example:</strong> Prototype for 1-click subscription to Zomato delivery fee waiver.
                 </div>
             </section>
 
             {/* 5. Phase 4 — Development */}
             <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                 <h3 className="text-xl font-bold mb-2 text-slate-900 flex items-center gap-2"><Code className="w-5 h-5"/> Phase 4 — Development (Build)</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                     <div>
                         <h4 className="font-bold text-slate-900 mb-1">Activities</h4>
                         <ul className="list-disc pl-4 text-slate-700 space-y-1">
                             <li>Sprint planning & execution in Jira</li>
                             <li>Daily standups, bug triage</li>
                             <li>QA & UAT</li>
                         </ul>
                     </div>
                     <div>
                         <h4 className="font-bold text-slate-900 mb-1">Outputs</h4>
                         <ul className="list-disc pl-4 text-slate-700 space-y-1">
                             <li>Working MVP</li>
                             <li>Release candidate</li>
                             <li>Go/No-Go decision</li>
                         </ul>
                     </div>
                 </div>
             </section>
 
             {/* 6. Phase 5 & 6 — Launch & Iteration */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <section className="bg-green-50 p-6 rounded-xl border border-green-100">
                     <h3 className="text-xl font-bold mb-2 text-green-900 flex items-center gap-2"><Rocket className="w-5 h-5"/> Phase 5 — Launch</h3>
                     <p className="italic text-green-800 text-sm mb-2">“Shipping is a feature.”</p>
                     <ul className="list-disc pl-4 text-sm text-green-800 space-y-1">
                         <li>GTM strategy with Marketing</li>
                         <li>Announcements, tutorials</li>
                         <li>Monitor adoption & sentiment</li>
                     </ul>
                 </section>
                 
                 <section className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                     <h3 className="text-xl font-bold mb-2 text-orange-900 flex items-center gap-2"><RefreshCw className="w-5 h-5"/> Phase 6 — Iteration</h3>
                      <p className="italic text-orange-800 text-sm mb-2">Improve continuously based on data.</p>
                     <ul className="list-disc pl-4 text-sm text-orange-800 space-y-1">
                         <li>Analyze Mixpanel, GA reports</li>
                         <li>Collect feedback (NPS, CSAT)</li>
                         <li>Identify improvement opportunities</li>
                     </ul>
                 </section>
             </div>
 
             {/* Tools & Mistakes */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section>
                     <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Wrench className="w-5 h-5 text-gray-600"/> Tools for Each Stage</h3>
                     <div className="bg-white border rounded-lg overflow-hidden text-sm">
                         {[
                             {stage: "Discovery", tool: "Typeform, Maze, Mixpanel"},
                             {stage: "Definition", tool: "Notion, Jira, Confluence"},
                             {stage: "Design", tool: "Figma, Miro"},
                             {stage: "Development", tool: "Jira, GitHub, Slack"},
                             {stage: "Launch", tool: "Loom, Notion, GA"},
                             {stage: "Iteration", tool: "Amplitude, SQL, Power BI"}
                         ].map((r, i) => (
                             <div key={i} className={`flex justify-between p-2 px-3 ${i%2===0 ? 'bg-gray-50':''}`}>
                                 <span className="font-semibold text-gray-700">{r.stage}</span>
                                 <span className="text-gray-500">{r.tool}</span>
                             </div>
                         ))}
                     </div>
                  </section>
                  
                  <section>
                      <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-red-600"><XCircle className="w-5 h-5"/> Common Mistakes</h3>
                      <ul className="space-y-2 text-sm text-gray-700 bg-red-50 p-4 rounded-lg border border-red-100">
                          <li className="flex gap-2"><span className="text-red-500 font-bold">❌</span> Jumping to solutions without understanding problem</li>
                          <li className="flex gap-2"><span className="text-red-500 font-bold">❌</span> Skipping user validation</li>
                          <li className="flex gap-2"><span className="text-red-500 font-bold">❌</span> Shipping features, not outcomes</li>
                          <li className="flex gap-2"><span className="text-red-500 font-bold">❌</span> Poor design → dev → QA handoff</li>
                          <li className="flex gap-2"><span className="text-red-500 font-bold">❌</span> No iteration after launch</li>
                      </ul>
                  </section>
             </div>
             
             {/* Netflix Example */}
             <section className="bg-gray-900 text-white p-6 rounded-xl">
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Play className="w-5 h-5 text-red-500"/> PDLC Example — Netflix “Play Something”</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                     <div className="bg-white/10 p-3 rounded">
                         <div className="text-gray-400 text-xs uppercase font-bold mb-1">Discovery</div>
                         <div>Too many options → decision fatigue</div>
                     </div>
                     <div className="bg-white/10 p-3 rounded">
                         <div className="text-gray-400 text-xs uppercase font-bold mb-1">Definition</div>
                         <div>Randomized autoplay button</div>
                     </div>
                     <div className="bg-white/10 p-3 rounded">
                         <div className="text-gray-400 text-xs uppercase font-bold mb-1">Design</div>
                         <div>Experiment with placement & animation</div>
                     </div>
                     <div className="bg-white/10 p-3 rounded">
                         <div className="text-gray-400 text-xs uppercase font-bold mb-1">Development</div>
                         <div>Personalization engine + rollout</div>
                     </div>
                     <div className="bg-white/10 p-3 rounded">
                         <div className="text-gray-400 text-xs uppercase font-bold mb-1">Launch</div>
                         <div>Regional A/B experiment</div>
                     </div>
                     <div className="bg-white/10 p-3 rounded">
                         <div className="text-gray-400 text-xs uppercase font-bold mb-1">Iteration</div>
                         <div>Tune personalization & UX</div>
                     </div>
                 </div>
             </section>
 
        </div>
      ),
    assignment: (
        <div className="space-y-4">
            <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" /> Day-3 Mini Assignment
            </h4>
            <p className="text-sm text-gray-600">Pick any app (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and describe a new feature across the PDLC.</p>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <div className="font-mono text-sm space-y-2 text-gray-600">
                    <p><strong>Product:</strong> ___</p>
                    <p><strong>Feature Idea:</strong> ___</p>
                    <p><strong>Discovery:</strong> Problem & insight...</p>
                    <p><strong>Definition:</strong> Hypothesis & metrics...</p>
                    <p><strong>Design:</strong> Sketch or description...</p>
                    <p><strong>Development:</strong> Dependencies / risks...</p>
                    <p><strong>Launch:</strong> Target segment & rollout...</p>
                    <p><strong>Iteration:</strong> What will you measure?...</p>
                </div>
                <div className="bg-blue-50 p-3 rounded border border-blue-100 text-xs text-blue-800 font-medium">
                    📌 Expected outcome: You learn to think like a PM end-to-end.
                </div>
            </div>
        </div>
    )
  },
  {
    day: 4,
    title: 'Product Sense Framework 📘',
    category: 'Foundations',
    preview: 'Great PMs don’t build features. They solve meaningful problems. Theme: Product Sense Framework.',
    content: (
        <div className="space-y-8 text-gray-800">
          
          {/* Quote & Intro */}
          <section className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl">
            <h3 className="font-bold text-indigo-900 text-lg mb-2">“Great PMs don’t build features. They solve meaningful problems.”</h3>
            <p className="text-indigo-800">Today we cover the <strong>Product Sense Framework</strong> — the ability to understand user problems deeply, translate them into smart solutions, and measure real impact.</p>
          </section>

          {/* Learning Outcomes */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
               <Target className="w-5 h-5 text-green-600" /> Learning Outcomes
             </h3>
             <ul className="space-y-2">
               {['Identify meaningful user problems worth solving', 'Craft simple, value-driven solutions', 'Define success using measurable impact'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                     <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                     <span>{item}</span>
                  </li>
               ))}
             </ul>
          </section>

          {/* What is Product Sense? */}
          <section>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Brain className="w-6 h-6 text-purple-500"/> What is Product Sense?</h3>
            <p className="mb-4 text-lg">Product Sense = The ability to understand user problems deeply, translate them into smart solutions, and measure real impact.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
                    <HelpCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <div className="font-bold text-purple-900">What should we build?</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                     <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="font-bold text-blue-900">Why does it matter?</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                     <BarChart className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="font-bold text-green-900">How will we know it worked?</div>
                </div>
            </div>
          </section>

          {/* The Framework */}
          <section>
             <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Settings className="w-6 h-6 text-slate-700"/> The Product Sense Framework</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr><th className="p-4 border-b">Step</th><th className="p-4 border-b">Question</th><th className="p-4 border-b">Output</th></tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b bg-white">
                            <td className="p-4 font-bold text-red-500">🧩 Problem</td>
                            <td className="p-4">What problem are we solving & for whom?</td>
                            <td className="p-4 bg-red-50 rounded-r-lg font-medium text-red-800">Clear problem statement</td>
                        </tr>
                        <tr className="border-b bg-white">
                            <td className="p-4 font-bold text-blue-500">💡 Solution</td>
                            <td className="p-4">What’s the simplest high-value solution?</td>
                            <td className="p-4 bg-blue-50 rounded-r-lg font-medium text-blue-800">Proposed UX / flow</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-4 font-bold text-green-500">📈 Impact</td>
                            <td className="p-4">What metric shows success?</td>
                            <td className="p-4 bg-green-50 rounded-r-lg font-medium text-green-800">Measurable KPI</td>
                        </tr>
                    </tbody>
                </table>
             </div>
          </section>

          {/* Zomato Example */}
           <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">🔍 Example Walkthrough — Zomato</h3>
             <div className="space-y-3">
                 <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                     <div className="w-24 font-bold text-red-500 uppercase text-xs tracking-wider">Problem</div>
                     <div className="text-gray-700">Users abandon checkout due to unpredictable delivery fees</div>
                 </div>
                 <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                     <div className="w-24 font-bold text-blue-500 uppercase text-xs tracking-wider">Solution</div>
                     <div className="text-gray-700">Flat delivery subscription option</div>
                 </div>
                 <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                     <div className="w-24 font-bold text-green-500 uppercase text-xs tracking-wider">Impact</div>
                     <div className="text-gray-700 font-medium">Conversion ↑ 18%, retention ↑ 12%</div>
                 </div>
             </div>
           </section>

           {/* Strengthening Product Sense */}
           <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                 <h4 className="font-bold text-red-900 mb-3">Ask these 4 problem questions:</h4>
                 <ul className="space-y-2 text-red-800 text-sm">
                     <li className="flex gap-2"><span className="font-bold">•</span> Who is the user?</li>
                     <li className="flex gap-2"><span className="font-bold">•</span> What do they struggle with?</li>
                     <li className="flex gap-2"><span className="font-bold">•</span> Why now?</li>
                     <li className="flex gap-2"><span className="font-bold">•</span> How are they solving it today?</li>
                 </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                 <h4 className="font-bold text-blue-900 mb-3">Ask these 3 solution questions:</h4>
                 <ul className="space-y-2 text-blue-800 text-sm">
                     <li className="flex gap-2"><span className="font-bold">•</span> Is it feasible?</li>
                     <li className="flex gap-2"><span className="font-bold">•</span> Is it valuable?</li>
                     <li className="flex gap-2"><span className="font-bold">•</span> Is it usable quickly?</li>
                 </ul>
              </div>
           </section>

           {/* Video Resource */}
           <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Youtube className="w-6 h-6 text-red-600"/> Recommended Watch</h3>
              
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/XmIUg2nrZgw" 
                    title="AI Product Sense" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
              </div>
           </section>

        </div>
    ),
    assignment: (
        <div className="space-y-4">
            <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" /> Day-4 Mini Assignment
            </h4>
            <p className="text-sm text-gray-600">Pick any app (Spotify / Zomato / Cred / Duolingo / ChatGPT).</p>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <div className="font-mono text-sm space-y-2 text-gray-600">
                    <p><strong>Product:</strong> ___</p>
                    <p><strong>User problem:</strong> ___</p>
                    <p><strong>Solution suggestion:</strong> ___</p>
                    <p><strong>Impact metric:</strong> ___</p>
                    <p><strong>Expected result:</strong> ___</p>
                </div>
            </div>
        </div>
    )
  },
  {
    day: 5,
    title: 'Writing Vision, Mission & Product OKRs 🎯',
    category: 'Foundations',
    preview: 'Theme: How strategy shapes decisions using Vision, Mission & OKRs.',
    content: (
        <div className="space-y-8 text-gray-800">
            
            {/* Quote */}
            <section className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl">
               <h3 className="font-bold text-indigo-900 text-lg mb-2">“Vision gives direction. OKRs turn it into motion.”</h3>
               <p className="text-indigo-800">Yesterday we learned Product Sense. Today we learn how strategy shapes those decisions.</p>
            </section>
  
            {/* Learning Outcomes */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                 <Target className="w-5 h-5 text-indigo-600" /> Learning Outcomes
               </h3>
               <ul className="space-y-2">
                 {[
                   'Understand the difference between Vision, Mission & OKRs',
                   'Write clear vision/mission statements for products',
                   'Create measurable OKRs linked to real impact',
                   'Connect goals to user and business value'
                 ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                       <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                       <span>{item}</span>
                    </li>
                 ))}
               </ul>
            </section>
  
            {/* 1. Vision */}
            <section>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Lightbulb className="w-6 h-6 text-yellow-500"/> 1. Vision — The WHY</h3>
              <p className="mb-4 text-lg">A vision describes the future state you want to create. It’s aspirational, emotional, and long-term.</p>
              
              <div className="bg-yellow-50 rounded-xl overflow-hidden border border-yellow-100">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-4 border-b md:border-b-0 md:border-r border-yellow-200">
                          <h4 className="font-bold text-yellow-900 mb-1">Duolingo</h4>
                          <p className="text-yellow-800">Make language learning free and fun for everyone</p>
                      </div>
                      <div className="p-4">
                          <h4 className="font-bold text-yellow-900 mb-1">Notion</h4>
                          <p className="text-yellow-800">Empower every person to build their own tools</p>
                      </div>
                      <div className="p-4 md:col-span-2 border-t border-yellow-200">
                          <h4 className="font-bold text-yellow-900 mb-1">Zomato</h4>
                          <p className="text-yellow-800">Ensure nobody has a bad meal</p>
                      </div>
                  </div>
              </div>
            </section>
  
            {/* 2. Mission */}
            <section>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Compass className="w-6 h-6 text-blue-500"/> 2. Mission — The HOW</h3>
              <p className="mb-4 text-lg">Mission explains how the product will achieve the vision. More practical and action-oriented.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr><th className="p-3 border-b">Company</th><th className="p-3 border-b">Mission</th></tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b bg-white">
                            <td className="p-3 font-semibold">Duolingo</td>
                            <td className="p-3">Gamify education to make learning habit-forming</td>
                        </tr>
                        <tr className="border-b bg-white">
                            <td className="p-3 font-semibold">Notion</td>
                            <td className="p-3">Provide flexible tools that adapt to any workflow</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-3 font-semibold">Spotify</td>
                            <td className="p-3">Help artists earn and help listeners discover content they love</td>
                        </tr>
                    </tbody>
                </table>
              </div>
            </section>
  
            {/* 3. OKRs */}
            <section>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Target className="w-6 h-6 text-red-500"/> 3. OKRs — Objectives & Key Results</h3>
              <p className="mb-4 text-lg">OKRs translate strategy into measurable execution.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                      <h4 className="font-bold text-red-900 mb-2">Objective</h4>
                      <p className="text-sm text-red-800">What do we want to achieve? (Qualitative)</p>
                  </div>
                  <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                      <h4 className="font-bold text-green-900 mb-2">Key Results</h4>
                      <p className="text-sm text-green-800">How will we measure success? (Quantitative)</p>
                  </div>
              </div>
  
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                   <h4 className="font-bold text-gray-900 mb-3">Example: Improve Duolingo Retention</h4>
                   <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">KR1: 7-day retention +20%</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">KR2: Avg lesson time +15%</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">KR3: Daily streak completion +10%</span>
                   </div>
              </div>
            </section>
  
            {/* Comparison Table */}
            <section>
               <h3 className="text-xl font-bold mb-4">🧠 Vision vs Mission vs OKRs</h3>
               <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse border border-gray-200">
                      <thead className="bg-gray-100">
                          <tr>
                              <th className="p-3 border-b text-left">Component</th>
                              <th className="p-3 border-b">Vision</th>
                              <th className="p-3 border-b">Mission</th>
                              <th className="p-3 border-b">OKRs</th>
                          </tr>
                      </thead>
                      <tbody className="text-sm">
                          <tr className="border-b"><td className="p-3 text-left font-semibold">Focus</td><td>Future</td><td>Strategy</td><td>Measurement</td></tr>
                          <tr className="border-b"><td className="p-3 text-left font-semibold">Tone</td><td>Emotional</td><td>Actionable</td><td>Numerical</td></tr>
                          <tr><td className="p-3 text-left font-semibold">Horizon</td><td>Long term</td><td>Short-medium</td><td>Quarterly</td></tr>
                      </tbody>
                  </table>
               </div>
            </section>
  
            {/* Writing Strong OKRs */}
            <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><PenTool className="w-5 h-5"/> Writing Strong OKRs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold text-slate-900 mb-3">Checklist</h4>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500"/> Outcome-driven, not tasks</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500"/> Measurable + time-bound</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500"/> Ambitious but realistic</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500"/> Max 3–4 KRs per Objective</li>
                        </ul>
                    </div>
                    <div>
                         <h4 className="font-bold text-slate-900 mb-3">Example</h4>
                         <div className="space-y-3 text-sm">
                             <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded">
                                 <XCircle className="w-4 h-4"/> <span>Bad: "Add leaderboard feature"</span>
                             </div>
                             <div className="flex items-center gap-2 text-green-700 bg-green-50 p-2 rounded">
                                 <CheckCircle className="w-4 h-4"/> <span>Good: "Increase weekly engagement by 15%"</span>
                             </div>
                         </div>
                    </div>
                </div>
            </section>
  
        </div>
    ),
    assignment: (
        <div className="space-y-6">
            <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" /> Day-5 Mini Assignment
            </h4>
            <p className="text-sm text-gray-600">Choose any product you use daily & write:</p>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm font-mono text-sm space-y-3">
                 <div className="text-gray-500">Product: ...</div>
                 <div className="text-gray-500">Vision (1 sentence): ...</div>
                 <div className="text-gray-500">Mission (1 sentence): ...</div>
                 <div className="text-gray-500">Objective: ...</div>
                 <div className="pl-4 text-gray-500">KR1: ...</div>
                 <div className="pl-4 text-gray-500">KR2: ...</div>
                 <div className="pl-4 text-gray-500">KR3: ...</div>
            </div>
  
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                <h5 className="font-bold text-indigo-900 mb-3 text-sm uppercase tracking-wide">Sample Submission (Spotify)</h5>
                <div className="space-y-2 text-sm text-indigo-800">
                    <p><strong>Vision:</strong> Enable everyone to enjoy and discover music effortlessly.</p>
                    <p><strong>Mission:</strong> Deliver personalized listening through intelligent recommendations.</p>
                    <p><strong>Objective:</strong> Improve user listening engagement.</p>
                    <ul className="list-disc pl-5">
                        <li>KR1: Increase weekly listening time +12%</li>
                        <li>KR2: Increase playlist saves +18%</li>
                    </ul>
                </div>
            </div>
        </div>
    )
  },
  {
    day: 6,
    title: 'Case Study Deep Dive: Duolingo & Notion 🌟',
    category: 'Foundations',
    preview: 'Theme: How real products connect vision → problem → solution → impact.',
    content: (
      <div className="space-y-8 text-gray-800">
        
        {/* Quote */}
        <section className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl">
           <p className="text-lg italic text-indigo-800 font-medium">“Study great products not to copy, but to understand their thinking.”</p>
        </section>

        {/* Learning Objectives */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
             <Target className="w-5 h-5 text-indigo-600" /> Learning Objectives
           </h3>
           <ul className="space-y-3">
             {[
               'Understand how real products connect vision → problem → solution → impact',
               'Analyze product decisions and success metrics',
               'Extract mental models you can apply in your own projects'
             ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                   <span>{item}</span>
                </li>
             ))}
           </ul>
        </section>

        {/* Case Study 1: Duolingo */}
        <section className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-200">D</div>
                <h3 className="text-2xl font-bold text-gray-900">Case Study 1 — Duolingo</h3>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                        <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Vision</h4>
                        <p className="font-medium text-gray-900">Make learning free and fun for everyone</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Mission</h4>
                        <p className="font-medium text-gray-900">Gamify education to make learning habit-building</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Core Problem</h4>
                        <p className="font-medium text-gray-900">Learning is boring & inconsistent</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Solution</h4>
                        <p className="font-medium text-gray-900">Gamification (streaks, badges, XP, characters)</p>
                    </div>
                     <div className="md:col-span-2">
                        <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Impact</h4>
                        <div className="flex items-center gap-2 font-bold text-gray-900">
                             <TrendingUp className="w-4 h-4 text-green-600" /> 500M+ learners, retention ↑ 35%
                        </div>
                    </div>
                </div>
            </div>

            {/* Duolingo OKR */}
            <div className="bg-white border-l-4 border-green-500 p-5 rounded-r-xl shadow-sm">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">🎯 Duolingo Example OKR</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                        <span className="font-bold text-green-700 w-20">Objective:</span>
                        <span className="text-gray-800">Make learning addictive</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-bold text-green-700 w-20">Key Results:</span>
                        <div className="text-gray-600 space-x-3">
                            <span className="bg-green-50 px-2 py-1 rounded text-green-800 border border-green-100">KR1: DAU +15%</span>
                            <span className="bg-green-50 px-2 py-1 rounded text-green-800 border border-green-100">KR2: Avg session +10%</span>
                            <span className="bg-green-50 px-2 py-1 rounded text-green-800 border border-green-100">KR3: Lessons/week +20%</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Case Study 2: Notion */}
        <section className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-slate-300">N</div>
                <h3 className="text-2xl font-bold text-gray-900">Case Study 2 — Notion</h3>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Vision</h4>
                        <p className="font-medium text-gray-900">Build tools that empower anyone to shape workflows</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Mission</h4>
                        <p className="font-medium text-gray-900">Unite docs, tasks, databases & collaboration</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Core Problem</h4>
                        <p className="font-medium text-gray-900">Too many disconnected productivity tools</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Solution</h4>
                        <p className="font-medium text-gray-900">All-in-one flexible workspace</p>
                    </div>
                     <div className="md:col-span-2">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Impact</h4>
                        <div className="flex items-center gap-2 font-bold text-gray-900">
                             <TrendingUp className="w-4 h-4 text-slate-600" /> 30M+ users, retention ↑ 50%, API ecosystem growth
                        </div>
                    </div>
                </div>
            </div>

            {/* Notion OKR */}
            <div className="bg-white border-l-4 border-slate-700 p-5 rounded-r-xl shadow-sm">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">🎯 Notion Example OKR</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                        <span className="font-bold text-slate-700 w-20">Objective:</span>
                        <span className="text-gray-800">Improve team collaboration</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-bold text-slate-700 w-20">Key Results:</span>
                        <div className="text-gray-600 space-x-3">
                            <span className="bg-slate-100 px-2 py-1 rounded text-slate-800 border border-slate-200">KR1: Active teams +25%</span>
                            <span className="bg-slate-100 px-2 py-1 rounded text-slate-800 border border-slate-200">KR2: Shared docs +30%</span>
                            <span className="bg-slate-100 px-2 py-1 rounded text-slate-800 border border-slate-200">KR3: Team sessions +20%</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Key Takeaways */}
        <section className="bg-indigo-900 text-white p-6 rounded-xl shadow-md">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6 text-indigo-300" /> Key Takeaways
             </h3>
             <ul className="space-y-3">
                <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mt-0.5" />
                    <span>Strong alignment between <strong>vision ↔ problem ↔ solution ↔ metrics</strong></span>
                </li>
                 <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mt-0.5" />
                    <span>Obsession with <strong>behavioral psychology</strong></span>
                </li>
                 <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mt-0.5" />
                    <span>Retention {'>'} growth vanity metrics</span>
                </li>
             </ul>
        </section>

      </div>
    ),
    assignment: (
        <div className="space-y-6">
            <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-indigo-600" /> Day-6 Mini Assignment
            </h4>
            <p className="text-sm text-gray-600">Pick Duolingo or Notion and complete the following analysis.</p>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <div className="font-mono text-sm space-y-3 text-gray-700">
                    <div className="p-2 bg-gray-50 rounded border border-gray-100">Product chosen: ...</div>
                    <div className="p-2 bg-gray-50 rounded border border-gray-100">Vision: ...</div>
                    <div className="p-2 bg-gray-50 rounded border border-gray-100">Core problem: ...</div>
                    <div className="p-2 bg-gray-50 rounded border border-gray-100">Defining feature: ...</div>
                    <div className="p-2 bg-gray-50 rounded border border-gray-100">North Star metric: ...</div>
                    <div className="p-2 bg-gray-50 rounded border border-gray-100">New feature suggestion: ...</div>
                    <div className="p-2 bg-gray-50 rounded border border-gray-100">
                        Objective + 3 Key Results: ...
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h5 className="font-bold text-blue-900 mb-3 text-sm uppercase tracking-wide">Example Answer</h5>
                <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>Product:</strong> Duolingo</p>
                    <p><strong>Vision:</strong> Make language learning accessible & enjoyable.</p>
                    <p><strong>Core Problem:</strong> Users struggle to stay consistent due to low motivation.</p>
                    <p><strong>Defining Feature:</strong> Streaks + gamification.</p>
                    <p><strong>North Star Metric:</strong> Weekly active learners.</p>
                    <p><strong>Feature Suggestion:</strong> “Learning Partner Challenge”</p>
                    <div className="mt-2 bg-white/50 p-3 rounded">
                        <strong>OKR:</strong><br/>
                        O — Improve weekly engagement<br/>
                        KR1 — WAU +15%<br/>
                        KR2 — Avg session +8%<br/>
                        KR3 — Repeat lesson rate +10%
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    day: 7,
    title: 'Week 1 Capstone: Create Your Product Charter 🚩',
    category: 'Strategy',
    preview: 'Goal: Apply everything from Week 1 — Product Sense • Vision • Mission • OKRs • PDLC.',
    content: (
        <div className="space-y-8 text-gray-800">
            {/* Goal Section */}
            <section className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
                 <h3 className="font-bold text-orange-900 text-lg mb-2">Goal: Apply Week 1 Learnings</h3>
                 <p className="text-orange-800">
                    Consolidate your knowledge of <strong>Product Sense, Vision, Mission, OKRs, and PDLC</strong> into a single strategic document.
                 </p>
            </section>

            {/* Deliverables */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                    <ClipboardList className="w-5 h-5 text-indigo-600" /> 📦 Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <CheckSquare className="w-5 h-5 text-green-500" />
                        <span className="font-medium">1-page Product Charter</span>
                     </div>
                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <CheckSquare className="w-5 h-5 text-green-500" />
                        <span className="font-medium">3 measurable Key Results</span>
                     </div>
                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <CheckSquare className="w-5 h-5 text-green-500" />
                        <span className="font-medium">1 North Star Metric</span>
                     </div>
                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <CheckSquare className="w-5 h-5 text-purple-500" />
                        <span className="font-medium">(Bonus) Low-fidelity Wireframe</span>
                     </div>
                </div>
            </section>

            {/* Template */}
            <section>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-slate-700"/> 🧰 Product Charter Template
                </h3>
                <div className="bg-slate-800 text-slate-200 p-6 rounded-xl font-mono text-sm shadow-lg overflow-x-auto">
                    <p className="text-slate-400 mb-4 uppercase tracking-widest text-xs font-bold">Copy & Fill</p>
                    <div className="space-y-2">
                        <p><span className="text-blue-400">Product Name:</span> ____________</p>
                        <p><span className="text-blue-400">Vision:</span> ____________</p>
                        <p><span className="text-blue-400">Mission:</span> ____________</p>
                        <p><span className="text-blue-400">Problem Statement:</span> ____________</p>
                        <p><span className="text-blue-400">Target User:</span> ____________</p>
                        <p><span className="text-blue-400">Value Proposition:</span> ____________</p>
                        <p><span className="text-blue-400">Core Features:</span> ____________</p>
                        <p><span className="text-blue-400">North Star Metric:</span> ____________</p>
                        <p><span className="text-green-400">Objective:</span> ____________</p>
                        <p className="pl-4"><span className="text-green-400">KR1:</span> ____________</p>
                        <p className="pl-4"><span className="text-green-400">KR2:</span> ____________</p>
                        <p className="pl-4"><span className="text-green-400">KR3:</span> ____________</p>
                        <p><span className="text-yellow-400">Timeline:</span> ____________</p>
                    </div>
                </div>
            </section>

            {/* Example Submission */}
            <section className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h3 className="text-xl font-bold mb-4 text-indigo-900 flex items-center gap-2">
                    <Flag className="w-5 h-5"/> 🧩 Example Submission
                </h3>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-indigo-100 space-y-3 text-sm text-slate-700">
                    <div className="border-b pb-2 mb-2">
                        <span className="font-bold text-indigo-700">Product Name:</span> CalmSpace — Mindfulness app for busy professionals
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p><span className="font-semibold text-slate-900">Vision:</span> Create calm in the chaos of modern work.</p>
                            <p className="mt-2"><span className="font-semibold text-slate-900">Mission:</span> Provide 2-minute micro-meditations to reduce stress & improve focus.</p>
                            <p className="mt-2"><span className="font-semibold text-slate-900">Problem:</span> Users can’t maintain long meditation routines due to time constraints.</p>
                        </div>
                        <div>
                            <p><span className="font-semibold text-slate-900">Target User:</span> Working professionals age 23–40</p>
                            <p className="mt-2"><span className="font-semibold text-slate-900">Value Prop:</span> Instant 2-minute meditations anytime, anywhere.</p>
                             <p className="mt-2"><span className="font-semibold text-slate-900">North Star:</span> Weekly active meditators</p>
                        </div>
                    </div>
                    <div className="mt-4 bg-gray-50 p-3 rounded border border-gray-100">
                         <p className="font-bold text-slate-900 mb-1">OKRs</p>
                         <p><span className="font-medium">Objective:</span> Improve habit consistency</p>
                         <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
                            <li>KR1: 7-day streak completion +30%</li>
                            <li>KR2: Avg daily meditation time +20%</li>
                            <li>KR3: 30-day retention +15%</li>
                         </ul>
                    </div>
                    <div className="text-xs text-gray-500 pt-2">Timeline: MVP launch in 6 weeks</div>
                </div>
            </section>
        </div>
    ),
    assignment: (
        <div className="space-y-4">
             <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" /> Reflection Questions
            </h4>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <p className="text-sm text-gray-600 italic">After completing your charter, ask yourself:</p>
                <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                        <span className="font-bold text-indigo-300 text-lg">1</span>
                        What was hardest while defining the problem?
                    </li>
                    <li className="flex gap-3">
                         <span className="font-bold text-indigo-300 text-lg">2</span>
                        Did your OKRs measure value or just activity?
                    </li>
                    <li className="flex gap-3">
                         <span className="font-bold text-indigo-300 text-lg">3</span>
                        What assumptions must be validated before building MVP?
                    </li>
                </ul>
            </div>
        </div>
    )
  },
  {
    day: 8,
    title: 'Introduction to User & Market Research 🧭',
    category: 'Research',
    preview: 'Theme: Great products start with deep understanding. Learn structured methods to uncover user pain points.',
    content: (
        <div className="space-y-8 text-gray-800">
            {/* Context */}
            <section className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl">
                 <h3 className="font-bold text-purple-900 text-lg mb-2">“Great products start with deep understanding — of users, their needs, and the market.”</h3>
                 <p className="text-purple-800">
                    Today’s focus is to think like a researcher, not a builder. You’ll learn how to identify who your users are, what they struggle with, and why solving it matters.
                 </p>
            </section>

            {/* Learning Objectives */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                    <Target className="w-5 h-5 text-purple-600" /> Learning Objectives
                </h3>
                <ul className="space-y-3">
                    {[
                        'Explain the difference between user research and market research',
                        'Identify user pain points using qualitative and quantitative methods',
                        'Apply basic frameworks — Empathy Map, JTBD, and Segmentation',
                        'Use AI tools to accelerate research synthesis'
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* 1. User Research vs Market Research */}
            <section>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Microscope className="w-6 h-6 text-blue-500"/> 1. User Research vs Market Research
                </h3>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border-b font-bold text-gray-700">Aspect</th>
                                <th className="p-3 border-b font-bold text-blue-700">User Research</th>
                                <th className="p-3 border-b font-bold text-green-700">Market Research</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b bg-white">
                                <td className="p-3 font-semibold text-gray-900">Focus</td>
                                <td className="p-3">Individual behaviors & pain points</td>
                                <td className="p-3">Industry, competitors, trends</td>
                            </tr>
                            <tr className="border-b bg-white">
                                <td className="p-3 font-semibold text-gray-900">Goal</td>
                                <td className="p-3">Validate problem</td>
                                <td className="p-3">Validate opportunity</td>
                            </tr>
                            <tr className="border-b bg-white">
                                <td className="p-3 font-semibold text-gray-900">Methods</td>
                                <td className="p-3">Interviews, surveys, usability testing</td>
                                <td className="p-3">Desk research, benchmarking</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="p-3 font-semibold text-gray-900">Output</td>
                                <td className="p-3">User personas, journey maps</td>
                                <td className="p-3">TAM/SAM/SOM, SWOT</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 bg-yellow-50 p-3 rounded border border-yellow-100 text-sm text-yellow-800">
                    <strong>🧠 PM Tip:</strong> Always start with user research before market research. If users don’t want it, market data doesn’t matter.
                </div>
            </section>

            {/* 2. Research Process */}
            <section>
                <h3 className="text-2xl font-bold mb-4">2. The Research Process</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    {[
                        {step: 1, title: "Define Objective", desc: "“What do I want to learn?”"},
                        {step: 2, title: "Choose Method", desc: "Interviews, surveys, analytics"},
                        {step: 3, title: "Recruit Users", desc: "Target segments"},
                        {step: 4, title: "Collect Data", desc: "Ask open-ended questions"},
                        {step: 5, title: "Synthesize", desc: "Identify themes and insights"}
                    ].map((s) => (
                        <div key={s.step} className="flex-1 bg-white border border-gray-100 p-4 rounded-xl shadow-sm text-center">
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold flex items-center justify-center mx-auto mb-2">{s.step}</div>
                            <h4 className="font-bold text-gray-900 text-sm mb-1">{s.title}</h4>
                            <p className="text-xs text-gray-500">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Frameworks */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Layout className="w-6 h-6 text-pink-500"/> 3. Frameworks
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Empathy Map */}
                    <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
                        <h4 className="font-bold text-pink-900 mb-4 text-lg">🧠 Empathy Map</h4>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <div className="text-xs uppercase text-gray-400 font-bold mb-1">Says</div>
                                <div className="text-sm font-medium">Quotes & words</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <div className="text-xs uppercase text-gray-400 font-bold mb-1">Thinks</div>
                                <div className="text-sm font-medium">Beliefs & Doubts</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <div className="text-xs uppercase text-gray-400 font-bold mb-1">Does</div>
                                <div className="text-sm font-medium">Actions & Behaviors</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <div className="text-xs uppercase text-gray-400 font-bold mb-1">Feels</div>
                                <div className="text-sm font-medium">Emotions</div>
                            </div>
                        </div>
                        <p className="text-xs text-pink-700 mt-4 text-center">Use this to understand motivations vs frustrations.</p>
                    </div>

                    {/* JTBD */}
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <h4 className="font-bold text-blue-900 mb-2 text-lg">💡 Jobs To Be Done (JTBD)</h4>
                        <p className="text-sm text-blue-800 mb-4 italic">“People don’t buy products; they hire them to get a job done.”</p>
                        
                        <div className="space-y-2 bg-white p-4 rounded-xl border border-blue-100 text-sm">
                            <div className="flex gap-2">
                                <span className="font-bold text-blue-600 min-w-[60px]">When I</span>
                                <span className="text-gray-600">... (situation)</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-bold text-blue-600 min-w-[60px]">I want to</span>
                                <span className="text-gray-600">... (motivation)</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-bold text-blue-600 min-w-[60px]">So I can</span>
                                <span className="text-gray-600">... (desired outcome)</span>
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-blue-700">
                            <strong>Ex:</strong> "Hire Duolingo" to feel productive while learning.
                        </div>
                    </div>
                </div>
            </section>

             {/* 5. Tools & AI Assistants */}
             <section>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Bot className="w-6 h-6 text-indigo-500"/> 5. Tools & AI Assistants
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-gray-200 rounded-xl">
                        <h4 className="font-bold text-gray-900 mb-2">User Interview Prep</h4>
                        <p className="text-sm text-gray-600 mb-2">Tool: ChatGPT</p>
                        <div className="bg-gray-100 p-2 rounded text-xs font-mono text-gray-700">
                            “Generate 10 questions to understand student productivity challenges.”
                        </div>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-xl">
                        <h4 className="font-bold text-gray-900 mb-2">Synthesizing Insights</h4>
                        <p className="text-sm text-gray-600 mb-2">Tool: Notion AI</p>
                        <div className="bg-gray-100 p-2 rounded text-xs font-mono text-gray-700">
                            “Summarize key pain points from these interview notes.”
                        </div>
                    </div>
                </div>
            </section>

            {/* Real World Example */}
            <section className="bg-gray-900 text-white p-6 rounded-xl">
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5 text-red-500"/> Real-World Example: Zomato
                 </h3>
                 <div className="space-y-2 text-sm">
                    <p><span className="text-gray-400 font-bold uppercase tracking-wider text-xs">User Pain:</span> “Hungry but don’t want to call restaurants.”</p>
                    <p><span className="text-gray-400 font-bold uppercase tracking-wider text-xs">Method:</span> Surveys & usage data.</p>
                    <p><span className="text-gray-400 font-bold uppercase tracking-wider text-xs">Insight:</span> People prefer quick ordering + tracking.</p>
                    <div className="pt-2 border-t border-gray-700 mt-2">
                        <span className="text-green-400 font-bold">Outcome:</span> Introduced 1-tap reordering → repeat orders ↑ 22 %.
                    </div>
                 </div>
            </section>

        </div>
    ),
    resources: [
        { title: "Doing User Research", url: "https://youtu.be/MxwyGi-3dzY?si=AWM6_QJxOvbw0ARn", type: 'video' },
        { title: "Market Research Guide", url: "https://youtu.be/LoJDAeq6i34?si=O3IMIfyNvl-USRWv", type: 'video' },
        { title: "Canva Persona Template", url: "https://www.canva.com/search/templates?q=user%20persona", type: 'tool' },
    ],
    assignment: (
        <div className="space-y-6">
            <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Microscope className="w-5 h-5 text-purple-600" /> Day-8 Assignment
            </h4>
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h5 className="font-bold text-gray-800">Task: User & Market Research Report</h5>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li>Identify a target user segment for your product idea.</li>
                    <li>Create a 2×2 table: Pain points vs Desired outcomes.</li>
                    <li>Use ChatGPT/Perplexity to find 3 competitors.</li>
                </ul>
                
                <div className="bg-purple-50 p-4 rounded border border-purple-100">
                    <p className="text-xs font-bold text-purple-900 uppercase mb-2">One-Slide Summary Template</p>
                    <div className="space-y-2 text-sm text-purple-800">
                        <p><strong>Who is the user?</strong> (Demographics/Behavior)</p>
                        <p><strong>What is their problem?</strong> (Core pain point)</p>
                        <p><strong>Why does it matter now?</strong> (Urgency/Market Trend)</p>
                    </div>
                </div>
            </div>

            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                <h5 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <Bot className="w-4 h-4" /> In-Class Activity
                </h5>
                <p className="text-sm text-indigo-800 mb-2">Use ChatGPT to generate 5 open-ended interview questions for your idea.</p>
                <div className="bg-white p-2 rounded text-xs font-mono text-gray-600 border border-indigo-200">
                    Prompt: "Generate 5 open-ended user interview questions to understand [problem] for [target user]."
                </div>
            </div>
        </div>
    )
  },
];

export const getCategoryColor = (category: string) => {
    switch(category) {
        case 'Foundations': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
        case 'Research': return 'text-purple-600 bg-purple-50 border-purple-200';
        case 'Data': return 'text-teal-600 bg-teal-50 border-teal-200';
        case 'Design': return 'text-pink-600 bg-pink-50 border-pink-200';
        case 'AI': return 'text-blue-600 bg-blue-50 border-blue-200';
        case 'Strategy': return 'text-orange-600 bg-orange-50 border-orange-200';
        case 'Tech': return 'text-slate-600 bg-slate-50 border-slate-200';
        default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
}

export const getCategoryIcon = (category: string) => {
    switch(category) {
        case 'Foundations': return <Layers className="w-3 h-3" />;
        case 'Research': return <Search className="w-3 h-3" />;
        case 'Data': return <BarChart className="w-3 h-3" />;
        case 'Design': return <PenTool className="w-3 h-3" />;
        case 'AI': return <Bot className="w-3 h-3" />;
        case 'Strategy': return <Target className="w-3 h-3" />;
        case 'Tech': return <Code className="w-3 h-3" />;
        default: return <Lightbulb className="w-3 h-3" />;
    }
}

// Generate placeholders for remaining days
for (let i = 9; i <= 45; i++) {
    LESSONS.push({
        day: i,
        title: `Day ${i}: Upcoming Lesson`,
        category: i % 2 === 0 ? 'Data' : 'Design', // Alternating categories for demo
        preview: 'This content will be unlocked as you progress through the course.',
        content: (
            <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-gray-300 mb-4">Content Locked</h3>
                <p className="text-gray-500">Complete previous lessons to unlock Day {i}.</p>
            </div>
        )
    });
}