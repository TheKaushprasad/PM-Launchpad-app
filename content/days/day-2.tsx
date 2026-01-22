
import React from 'react';
import { 
  Target, CheckCircle, Users, Lightbulb, Zap, ArrowRight, Star, 
  BarChart, Code, Bot, Smartphone, Briefcase, Activity, 
  Layers, Search, MessageSquare, ArrowLeft, FileText, Calendar, Rocket, TrendingUp, RefreshCcw, Ship, Hammer, Box, Scale
} from 'lucide-react';

// Fixing missing 'Scale' import on line 3 and ensuring it is available for use on line 238
export const Day2Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 2: The Product Development Lifecycle (PDLC) 🚀</h1>
      
      <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
          <p className="text-lg font-medium text-blue-900 leading-relaxed">
            Theme: How products move? Learn how products go from problem discovery → launch → continuous improvement.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <p className="text-zinc-600 font-medium">By the end of today, you will:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Understand the full lifecycle of product development",
            "Know what happens at every stage & what PMs contribute",
            "Learn common outputs, tools, and real examples",
            "Avoid the typical mistakes that junior PMs make"
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-zinc-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-indigo-600" />
          1. What is PDLC?
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Product Development Lifecycle (PDLC) is the structured process of taking a product from problem discovery → launch → continuous improvement, ensuring decisions are user-driven, data-backed, and business-aligned.
        </p>
        
        <div className="bg-zinc-950 p-8 rounded-[2.5rem] border border-zinc-800 overflow-hidden text-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-medium border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="pb-4 pr-4 font-black text-indigo-400">Stage</th>
                  <th className="pb-4 px-4 font-black text-zinc-200">Goal</th>
                  <th className="pb-4 pl-4 font-black text-zinc-200">Key Output</th>
                </tr>
              </thead>
              <tbody className="text-zinc-400">
                <tr className="border-b border-zinc-900/50">
                  <td className="py-4 pr-4 font-bold text-white">Discovery</td>
                  <td className="py-4 px-4">Understand the user problem</td>
                  <td className="py-4 pl-4">Problem statement, Personas</td>
                </tr>
                <tr className="border-b border-zinc-900/50">
                  <td className="py-4 pr-4 font-bold text-white">Definition</td>
                  <td className="py-4 px-4">Scope & prioritize solution</td>
                  <td className="py-4 pl-4">PRD, success metrics</td>
                </tr>
                <tr className="border-b border-zinc-900/50">
                  <td className="py-4 pr-4 font-bold text-white">Design</td>
                  <td className="py-4 px-4">Visualize experience</td>
                  <td className="py-4 pl-4">Wireframes, Prototype</td>
                </tr>
                <tr className="border-b border-zinc-900/50">
                  <td className="py-4 pr-4 font-bold text-white">Development</td>
                  <td className="py-4 px-4">Build & test</td>
                  <td className="py-4 pl-4">MVP, QA sign-off</td>
                </tr>
                <tr className="border-b border-zinc-900/50">
                  <td className="py-4 pr-4 font-bold text-white">Launch</td>
                  <td className="py-4 px-4">Ship product to users</td>
                  <td className="py-4 pl-4">GTM plan, adoption data</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-bold text-white">Iteration</td>
                  <td className="py-4 px-4">Improve continuously</td>
                  <td className="py-4 pl-4">Insights, next roadmap</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-2xl font-black text-zinc-900">PDLC Phases in Detail</h2>
        
        <div className="space-y-12">
          {[
            {
              id: "01",
              phase: "Discovery (Find the Right Problem)",
              goal: "“Fall in love with the problem, not the solution.” Understand real user needs and validate the painpoint.",
              activities: ["Market & competitor research", "User interviews, surveys", "Data analysis (Mixpanel, GA, SQL)", "Identify Jobs-to-be-Done (JTBD)"],
              outputs: ["Problem statement", "Personas", "Hypothesis", "Opportunity sizing"],
              case: "Zomato observes high checkout drop-offs because of unpredictable surge delivery fees.",
              icon: Search,
              color: "indigo"
            },
            {
              id: "02",
              phase: "Definition (Scope the Solution)",
              goal: "Turn insights into an actionable plan. Define what we are building and how we measure success.",
              activities: ["Prioritization (RICE, MOSCOW, Value-Effort)", "Success metrics / OKRs", "PRD writing", "Align with design & engineering"],
              outputs: ["PRD", "Prioritized roadmap", "Success metrics"],
              case: "Test a Flat Delivery Fee Subscription Model to reduce checkout abandonment by 15%.",
              icon: FileText,
              color: "blue"
            },
            {
              id: "03",
              phase: "Design (Shape the Experience)",
              goal: "Design an intuitive experience for solving the defined problem.",
              activities: ["Wireframes & prototypes in Figma", "User testing & usability reviews", "Accessibility & UI polishing"],
              outputs: ["Prototype", "Usability results", "Design specs"],
              case: "Prototype for 1-click subscription to Zomato delivery fee waiver.",
              icon: Smartphone,
              color: "pink"
            },
            {
              id: "04",
              phase: "Development (Build)",
              goal: "Build and test the feature until ready for release. Focus on functional alignment.",
              activities: ["Sprint planning & execution (Jira)", "Daily standups, bug triage", "QA & UAT testing", "Feature flag rollout"],
              outputs: ["Working MVP", "Release candidate", "Go/No-Go decision"],
              case: "Feature toggle rollout to 5% of users in Bangalore to test load performance.",
              icon: Code,
              color: "emerald"
            },
            {
              id: "05",
              phase: "Launch (Ship & Distribute)",
              goal: "“Shipping is a feature.” Release value to users and drive broad adoption.",
              activities: ["GTM strategy (Marketing, Sales, Support)", "Announcements, tutorials, walkthroughs", "Monitor adoption & sentiment"],
              outputs: ["GTM docs", "Release comms", "Launch dashboard"],
              case: "Email + push campaign tracking adoption of the new delivery subscription.",
              icon: Rocket,
              color: "orange"
            },
            {
              id: "06",
              phase: "Iteration (Learn & Improve)",
              goal: "Improve continuously based on data. The cycle never truly ends.",
              activities: ["Analyze Mixpanel, GA, SQL reports", "Collect feedback (NPS, CSAT)", "Identify improvement opportunities"],
              outputs: ["Insights report", "Updated roadmap", "New hypothesis"],
              case: "Feature adoption = 70%, renewal = 30% → pricing experiment planned to improve retention.",
              icon: RefreshCcw,
              color: "cyan"
            }
          ].map((p) => (
            <div key={p.id} className="relative group">
              <div className="absolute -left-12 top-0 text-5xl font-black text-zinc-100 group-hover:text-indigo-50 transition-colors hidden lg:block">{p.id}</div>
              <div className={`p-8 md:p-10 rounded-[2.5rem] border bg-white border-zinc-100 shadow-sm space-y-8`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-indigo-600 shadow-sm">
                      <p.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Phase {p.id}</p>
                      <h3 className="text-xl font-black text-zinc-900">{p.phase}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="bg-zinc-50 p-6 rounded-2xl italic font-medium text-zinc-600 border-l-4 border-indigo-500">
                  {p.goal}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Activities</p>
                    <ul className="space-y-2">
                      {p.activities.map((a, i) => (
                        <li key={i} className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Key Outputs</p>
                    <div className="flex flex-wrap gap-2">
                      {p.outputs.map((o, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white border border-zinc-200 rounded-xl text-xs font-black text-zinc-500 shadow-sm">{o}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-zinc-400" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Industry Case</p>
                  </div>
                  <p className="text-sm font-bold text-indigo-900">{p.case}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-12 rounded-[3.5rem] space-y-8">
        <h2 className="text-2xl font-black text-indigo-400">Key Takeaways</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: "1", text: "The best PMs don’t build features — they solve problems." },
            { num: "2", text: "PDLC creates structure, clarity, and alignment across the org." },
            { num: "3", text: "Launch is not the end — iteration is where results come from." }
          ].map((t) => (
            <div key={t.num} className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-black text-lg">{t.num}</div>
              <p className="text-sm font-bold leading-relaxed text-zinc-300">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Scale className="text-indigo-600" />
          SDLC VS PDLC
        </h2>
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-medium border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="py-4 px-6 font-black text-zinc-900">Aspect</th>
                  <th className="py-4 px-6 font-black text-zinc-900">SDLC (Software Development)</th>
                  <th className="py-4 px-6 font-black text-zinc-900">PDLC (Product Development)</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Focus</td>
                  <td className="py-4 px-6">Building software correctly</td>
                  <td className="py-4 px-6">Building the right product</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Goal</td>
                  <td className="py-4 px-6">Deliver a working, stable system</td>
                  <td className="py-4 px-6">Deliver user & business value</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Scope</td>
                  <td className="py-4 px-6">Technical implementation</td>
                  <td className="py-4 px-6">Business + user + tech</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Owner</td>
                  <td className="py-4 px-6">Engineering / Tech team</td>
                  <td className="py-4 px-6">Product Manager</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Starts with</td>
                  <td className="py-4 px-6">Technical requirements</td>
                  <td className="py-4 px-6">Problem / opportunity</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Ends with</td>
                  <td className="py-4 px-6">Deployment & maintenance</td>
                  <td className="py-4 px-6">Iteration, scale, or sunset</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-zinc-900">Success Metric</td>
                  <td className="py-4 px-6">Bug-free, performant software</td>
                  <td className="py-4 px-6">Adoption, retention, revenue</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day2Content;
