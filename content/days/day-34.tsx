import { CornsilkSection } from '../../components/CornsilkSection';

import React from 'react';
// Added Globe and Users2 to the imports to fix "Cannot find name" errors on lines 179 and 242
import { 
  Bot, Brain, Cpu, Zap, Layers, Activity, 
  List, Search, ShieldCheck, TrendingUp, 
  MessageSquare, Settings, Target, RefreshCw, 
  MonitorPlay, Info, Sparkles, Database, 
  Terminal, Layout, ArrowRight, Share2, 
  CheckCircle, FileText, Briefcase, Globe, Users2
} from 'lucide-react';

export const Day34Content = () => {
  return (
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-blue-50/70 p-3.5 sm:p-4 rounded-xl border border-blue-100/80">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">AI Module</span>
          <p className="text-sm font-bold text-orange-700">
            Task cover this course <a href="https://www.deeplearning.ai/courses/agentic-ai/" target="_blank" rel="noopener noreferrer" className="underline decoration-orange-300">https://www.deeplearning.ai/courses/agentic-ai/</a>
          </p>
          <div className="bg-white border border-orange-200 p-4 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-black text-orange-900">What Is an Agentic AI Workflow?</h2>
            <p className="text-sm font-medium text-orange-900/80 leading-relaxed">
              An agentic AI workflow is a process in which an AI system, most commonly leveraging Large Language Models (LLMs), executes a series of steps—often iteratively—to complete a task. This is distinct from the classic, linear approach where a user prompts an LLM once for an entire output (e.g., writing an essay) and receives a single response. Agentic workflows are designed to more closely mimic complex human problem-solving by involving multiple discrete stages: planning, researching, synthesizing, reviewing, and revising.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-orange-600" />
          Key Characteristics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5">
           {[
             { title: "Iterative Execution", desc: "The workflow involves multiple interdependent steps, typically looping through reflection and improvement stages.", icon: RefreshCw },
             { title: "Task Decomposition", desc: "Complex tasks are broken down into smaller, manageable components—mirroring human strategies for complex work.", icon: Split },
             { title: "Varying Autonomy", desc: "The workflow can be scripted (less autonomous) or grant the AI greater decision-making power (more autonomous).", icon: Cpu }
           ].map((item, i) => (
             <div key={i} className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-sm">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-zinc-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-orange-600" />
          Task Decomposition and Workflow Steps
        </h2>
        <div className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200 space-y-6">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Task decomposition is the practice of dissecting complex tasks into atomic steps the AI (or supporting tools/APIs) can execute.
           </p>
           <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Detailed Steps in Agentic Workflows</h4>
              {[
                "Identify the complex job and break it into specific, sequential subtasks.",
                "Assign each subtask to an LLM, specialized AI model, or external tool/API suited to the task (e.g., PDF-to-text conversion for invoice extraction).",
                "Sequence the steps so output from one subtask flows to the next.",
                "Refine and iterate—decompose further if a step is not easily automatable."
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm">
                   <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-0.5">Step {i+1}</div>
                   <p className="text-xs font-bold text-zinc-700 leading-relaxed">{step}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Activity className="text-orange-600" />
          Examples & Use Cases
        </h2>
        <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-medium border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="py-4 px-6 font-black text-zinc-900">Use Case</th>
                  <th className="py-4 px-6 font-black text-zinc-900">High-Level Steps</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Essay Writing</td>
                  <td className="py-4 px-6">Outline → Search web → Analyze sources → Draft → Reflect → Revise → (Optional)</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Invoice Process</td>
                  <td className="py-4 px-6">PDF to text → Document type check → Field extraction → Database update</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-zinc-900">Customer Service</td>
                  <td className="py-4 px-6">Extract info → Query database → Draft reply → Queue for review/send</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm font-bold text-orange-600 italic">
          Iteration is crucial: If initial outputs are unsatisfactory, add additional steps (such as reflection or human-in-the-loop verification).
        </p>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-orange-600" />
          Degrees of Autonomy in Agentic AI
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Autonomy in agentic workflows is not binary; it lies on a spectrum.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5">
           {[
             { 
               title: "1. Less Autonomous Agents", 
               list: ["Steps strictly predefined by developers", "Functions/tools are hard-coded (limited to set APIs or databases)", "Useful for well-structured tasks like basic invoice processing or order status queries"]
             },
             { 
               title: "2. Semi-Autonomous Agents", 
               list: ["AI has limited discretion over chosen tools and step sequencing", "Steps and tools are predefined but AI may decide which to use for a given query"]
             },
             { 
               title: "3. Highly Autonomous Agents", 
               list: ["Significant decision-making delegated to the AI", "The LLM plans and sequences steps dynamically, often choosing tools and gathering more context as needed", "May even generate new functions or propose workflow extensions", "Suitable for advanced research, creative work, and multi-stage customer service cases"]
             }
           ].map((level, i) => (
             <div key={i} className="p-4 sm:p-5 bg-zinc-900 text-white rounded-2xl border-t-8 border-orange-500 space-y-4">
                <h4 className="font-black text-orange-400 text-sm mb-2">{level.title}</h4>
                <ul className="space-y-2">
                   {level.list.map((item, idx) => (
                      <li key={idx} className="text-[11px] font-medium text-zinc-400 leading-relaxed flex gap-2">
                         <div className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                         {item}
                      </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Sparkles className="text-orange-600" />
          Benefits of Agentic AI Workflows
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3.5">
           {[
             { title: "Higher Quality and Performance", desc: "Iterative, decomposed processes enable more thoughtful, accurate, and robust outputs. As shown in coding evaluations, iterative agentic prompts can outperform newer LLMs running non-agentic, single-command prompts." },
             { title: "Human-Like Iteration", desc: "Mimics natural human work (think-plan-write-revise), greatly improving trustworthiness and reliability." },
             { title: "Parallelization", desc: "Some subtasks (like web search or data retrieval) can run simultaneously, outperforming human speed for scalable workloads." },
             { title: "Modularity", desc: "Components (tools, models, steps) can be swapped or optimized individually. E.g., swapping web search engines or integrating better LLMs for distinct parts of the workflow." }
           ].map((benefit, i) => (
             <div key={i} className="flex gap-4 p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm items-start">
                <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                   <h4 className="font-black text-zinc-900 text-sm mb-1">{benefit.title}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{benefit.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Globe className="text-orange-600" />
          Application Areas for Agentic AI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
           {[
             { title: "1. Invoice Processing", desc: "Automates extraction and system entry of structured data from invoices. Involves PDF conversion, field verification, database update—all decomposed for optimal automation." },
             { title: "2. Customer Service Agents", desc: "Basic inquiries: Structured flows for order status, shipment tracking, etc. Complex queries: Dynamic planning for tasks like inventory checks, returns, and policy exceptions—areas where step-sequencing is not obvious ahead of time." },
             { title: "3. Research Agents", desc: "Multi-step research (search, synthesize, draft, review) for tasks like whitepapers, compliance reviews, or market analysis. Yields deeper, more reliable insights than linear prompting." },
             { title: "4. Computer Use by Agents", desc: "Agents act as digital workers: controlling a browser, filling forms, navigating UI to perform goal-based tasks (e.g., booking flights). Still an emerging area, with reliability challenges (slow sites, unexpected layouts)." }
           ].map((area, i) => (
             <div key={i} className="p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-3">
                <h4 className="font-black text-zinc-900">{area.title}</h4>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">{area.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <ShieldCheck className="text-orange-600" />
          Evaluating Agentic AI Workflows ("AI Evals")
        </h2>
        <div className="bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-sm space-y-6">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Rigorous evaluation ("evals") is essential to gauge, debug, and improve agentic workflows.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Metrics and Approaches</h4>
                 <ul className="space-y-3">
                    <li className="text-xs font-bold text-zinc-700 flex gap-2"><strong>Objective Evals:</strong> Easily codified checks (e.g., “Does the output mention a competitor’s name?”).</li>
                    <li className="text-xs font-bold text-zinc-700 flex gap-2"><strong>Subjective Evals:</strong> Use a separate judging LLM or human review. Prompt the judge with a quality scoring rubric (e.g., 1-5 scale).</li>
                    <li className="text-xs font-bold text-zinc-700 flex gap-2"><strong>End-to-End Evals:</strong> Assess overall system output—does the agent fulfill the end user's goal?</li>
                    <li className="text-xs font-bold text-zinc-700 flex gap-2"><strong>Component-Level Evals:</strong> Judge the output of a single workflow step.</li>
                 </ul>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Improvement Loop</h4>
                 <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                   <strong>Error Analysis:</strong> Manually or automatically inspect intermediate traces to spot flaws or improvement areas.
                 </p>
                 <p className="text-xs font-bold text-orange-600 italic">
                   Iterative improvement is key: Evals help prioritize workflow modifications and drive performance up over time.
                 </p>
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Settings className="text-orange-600" />
          Agentic AI Design Patterns
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Four core design patterns shape agentic workflows:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-3.5">
           {[
             { title: "1. Reflection", desc: "AI reviews and critiques its own outputs, feeding back to improve results (common in code or essay generation).", icon: RefreshCw },
             { title: "2. Tool Use", desc: "AI is empowered to call external tools or APIs: web search, code execution, database queries, etc. The LLM decides which tool to use for which step.", icon: Terminal },
             { title: "3. Planning", desc: "AI autonomously determines the workflow sequencing for unstructured requests, planning step-by-step action chains. E.g., a “Hugging GPT” style agent plans multiple APIs to fulfill one complex objective.", icon: Target },
             { title: "4. Multi-Agent Collaboration", desc: "Multiple simulated agents work together, each with a specialized role: e.g., researcher, writer, editor, or test/critique agent for software. Collaboration between specialized agents often yields more thoughtful and robust outputs for multi-stage tasks.", icon: Users2 }
           ].map((pattern, i) => (
             <div key={i} className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-inner">
                  <pattern.icon className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-black text-zinc-900 text-sm mb-1">{pattern.title}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{pattern.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

            <CornsilkSection
        title="Deterministic vs Autonomous Agent Workflows"
        titleColor="blue"
        items={[
                {
                          "subtitle": "Router & Orchestrator Patterns",
                          "headerColor": "red",
                          "description": "Design intelligent routing nodes that classify user intents and delegate tasks to specialized sub-workflows for peak accuracy."
                },
                {
                          "subtitle": "Human-in-the-Loop (HITL) Controls",
                          "headerColor": "blue",
                          "description": "Insert confirmation gates for high-stakes actions (financial transactions, data deletion) to maintain human oversight and trust."
                },
                {
                          "subtitle": "Parallel & Evaluator Workflows",
                          "headerColor": "red",
                          "description": "Run parallel drafting streams with automated critique and refinement loops to produce high-quality, verified deliverables."
                }
      ]}
      />

      <div className="pt-3.5 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

// Standard components for missing icons
const Split = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 3h5v5" />
    <path d="M8 3H3v5" />
    <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.828L3 3" />
    <path d="m15 11 6-6" />
    <path d="M12 14.3a4 4 0 0 1 1.172-2.828" />
  </svg>
);

export default Day34Content;
