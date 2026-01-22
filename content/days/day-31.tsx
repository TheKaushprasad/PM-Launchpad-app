import React from 'react';
import { 
  Bot, Brain, Cpu, Zap, Layers, Activity, 
  List, Search, ShieldCheck, TrendingUp, 
  MessageSquare, Settings, Target, RefreshCw, 
  MonitorPlay, Info, Sparkles, Database, 
  Terminal, Layout, ArrowRight, BookOpen,
  // Added Share2 to fix the 'Cannot find name' error on line 169
  Share2
} from 'lucide-react';

export const Day31Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 31: CONTEXT ENGINEERING 🚀</h1>
      
      <section className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">AI Module</span>
          <p className="text-lg font-black text-orange-900 leading-relaxed italic">
            "The natural progression of prompt engineering. The art and science of curating what will go into the limited context window."
          </p>
          <a 
            href="https://www.blog.langchain.com/context-engineering-for-agents/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-900 transition-colors"
          >
            Read Source Article <BookOpen className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
           <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
             <Info className="text-orange-600" />
             What is Context?
           </h2>
           <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm">
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Context refers to the set of tokens included when sampling from a large-language model (LLM).
              </p>
           </div>
        </div>

        <div className="space-y-6">
           <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
             <Settings className="text-orange-600" />
             What is Context Engineering?
           </h2>
           <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm">
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Context engineering refers to the set of strategies for curating and maintaining the optimal set of tokens (information) during LLM inference, including all the other information that may land there outside of the prompts.
              </p>
           </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-10 rounded-[3rem] border-t-8 border-orange-500">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-400">The OS Analogy</h4>
            <p className="text-lg font-black text-zinc-300 leading-relaxed">
              "LLMs are like a new kind of operating system. The LLM is like the CPU and its context window is like the RAM, serving as the model’s working memory."
            </p>
          </div>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Just like RAM, the LLM context window has limited capacity to handle various sources of context. And just as an operating system curates what fits into a CPU’s RAM, we can think about “context engineering” playing a similar role.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-orange-600" />
          Types of Context to Manage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { title: "Instructions", desc: "Prompts, memories, few‑shot examples, tool descriptions, etc.", icon: List },
             { title: "Knowledge", desc: "Facts, memories, external domain-specific data.", icon: Brain },
             { title: "Tools", desc: "Feedback from tool calls and structured outputs.", icon: Zap }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-sm">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-zinc-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-6">Context Engineering vs. Prompt Engineering</h2>
        <div className="space-y-6">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             The primary focus of prompt engineering is how to write effective prompts, particularly system prompts. However, as we move towards engineering more capable agents that operate over multiple turns of inference and longer time horizons, we need strategies for managing the entire context state (system instructions, tools, Model Context Protocol (MCP), external data, message history, etc).
           </p>
           <p className="text-sm font-bold text-zinc-700 italic border-l-4 border-orange-500 pl-4">
             An agent running in a loop generates more and more data that could be relevant for the next turn of inference, and this information must be cyclically refined.
           </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <ShieldCheck className="text-orange-600" />
          Why is Context Engineering Important?
        </h2>
        <div className="space-y-6">
           <div className="p-8 bg-white border border-zinc-100 rounded-[3rem] shadow-sm">
              <h4 className="text-lg font-black text-zinc-900 mb-4 flex items-center gap-2">
                <TrendingUp className="text-orange-500 w-5 h-5" />
                The Concept of Context Rot
              </h4>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Studies on needle-in-a-haystack style benchmarking have uncovered the concept of context rot: as the number of tokens in the context window increases, the model’s ability to accurately recall information from that context decreases.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <h5 className="font-black text-zinc-900 uppercase tracking-widest text-[10px]">Architectural Constraints</h5>
                 <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                   LLMs are based on the transformer architecture, which enables every token to attend to every other token. This results in n² pairwise relationships for n tokens. As context length increases, the model's ability to capture these relationships gets stretched thin.
                 </p>
              </div>
              <div className="space-y-4">
                 <h5 className="font-black text-zinc-900 uppercase tracking-widest text-[10px]">Attention Budget</h5>
                 <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                   Like humans, LLMs have an “attention budget”. Every new token introduced depletes this budget by some amount, increasing the need to carefully curate the tokens available to the LLM.
                 </p>
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Activity className="text-orange-600" />
          Common Strategies for Agent Context Engineering
        </h2>
        
        <div className="space-y-6">
           {[
             { 
               title: "1. Write Context", 
               desc: "Saving information outside the context window via a 'scratchpad' or 'memories' to help an agent perform a task over time or across sessions.",
               icon: Terminal
             },
             { 
               title: "2. Select Context", 
               desc: "Pulling relevant external data or scratchpad notes into the context window for a specific turn based on relevance to the current task.",
               icon: MousePointer2
             },
             { 
               title: "3. Compressing Context", 
               desc: "Shortening or summarizing token-heavy tool calls and long interactions so the model stays within token limits while retaining meaning.",
               icon: Shrink
             },
             { 
               title: "4. Isolating Context", 
               desc: "Modularizing context across multiple sub-agents. Each agent has its own specific tools, instructions, and limited context window.",
               icon: Share2
             }
           ].map((item, i) => (
             <div key={i} className="flex gap-6 p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm items-start">
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-orange-600 shrink-0 shadow-inner">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-black text-zinc-900 mb-1">{item.title}</h4>
                   <p className="text-sm font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Sparkles className="text-orange-600" />
          Example Use Case: AI Interview Coach
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Designing an AI Interview Coach that helps users practice PM interviews.
        </p>

        <div className="space-y-8">
           {/* Write Context */}
           <div className="p-8 bg-zinc-900 text-white rounded-[3rem] space-y-6">
              <h4 className="text-lg font-black text-orange-400">1. Write Context</h4>
              <p className="text-xs font-medium text-zinc-400 leading-relaxed">Implementation: explicitly defining the role, task, goals, constraints, and output format.</p>
              <div className="bg-black/50 p-6 rounded-2xl font-mono text-[11px] text-zinc-400">
                [ROLE] You are an AI Interview Coach specializing in Product Management interviews.<br/>
                [TASK] Your goal is to simulate an interviewer...<br/>
                [BEHAVIOR] - Be encouraging but honest...<br/>
                [OUTPUT FORMAT] Return your responses in the following JSON format: ...
              </div>
           </div>

           {/* Select Context */}
           <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-[3rem] space-y-6">
              <h4 className="text-lg font-black text-zinc-900">2. Select Context</h4>
              <p className="text-sm font-medium text-zinc-500">Choosing what past information to reintroduce. We pull only the latest answer, previous question, and short summary.</p>
              <div className="bg-white p-6 rounded-2xl border border-zinc-100 font-mono text-[11px] text-zinc-500">
                [SELECTED CONTEXT]<br/>
                Previous question: “How do you prioritize features in a product roadmap?”<br/>
                User’s answer: “I use RICE scoring to align with business goals.”<br/>
                Last feedback summary: “Good framework usage, try adding more customer empathy.”
              </div>
           </div>

           {/* Compressing Context */}
           <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-[3rem] space-y-4">
              <h4 className="text-lg font-black text-zinc-900">3. Compressing Context</h4>
              <p className="text-sm font-medium text-zinc-500">Shortening what's included to stay within limits. Instead of storing all prior Q&A, we keep a summary snapshot.</p>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 italic text-xs font-bold text-orange-900">
                [COMPRESSED CONTEXT] Summary so far: Candidate strong in frameworks, needs improvement in metrics articulation...
              </div>
           </div>

           {/* Isolating Context */}
           <div className="space-y-6">
              <h4 className="text-lg font-black text-zinc-900">4. Isolating Context</h4>
              <p className="text-sm font-medium text-zinc-500">Modularizing into three sub-agents with their own local context.</p>
              <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm font-medium border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-100">
                        <th className="py-4 px-6 font-black text-zinc-900">Sub-Agent</th>
                        <th className="py-4 px-6 font-black text-zinc-900">Role</th>
                        <th className="py-4 px-6 font-black text-zinc-900">Context Example</th>
                      </tr>
                    </thead>
                    <tbody className="text-zinc-600">
                      <tr className="border-b border-zinc-50">
                        <td className="py-4 px-6 font-bold text-zinc-900">Question Agent</td>
                        <td className="py-4 px-6">Generates the next PM interview question</td>
                        <td className="py-4 px-6">Focuses only on question difficulty level and topic rotation</td>
                      </tr>
                      <tr className="border-b border-zinc-50">
                        <td className="py-4 px-6 font-bold text-zinc-900">Evaluation Agent</td>
                        <td className="py-4 px-6">Evaluates user’s answer</td>
                        <td className="py-4 px-6">Uses evaluation rubric context</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-bold text-zinc-900">Feedback Agent</td>
                        <td className="py-4 px-6">Provides improvement advice</td>
                        <td className="py-4 px-6">Accesses summarized user performance context</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
           </div>
        </div>
      </section>

      <section className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-orange-500">
        <h2 className="text-2xl font-black text-orange-400 flex items-center gap-3 mb-6">
          <Info className="text-orange-400" />
          The Bottom Line
        </h2>
        <div className="space-y-4">
           <p className="text-sm font-bold text-zinc-300 leading-relaxed italic">
             "Prevents context clutter, improves reasoning quality, and mirrors real-world modular architectures (like OpenAI Swarm or CrewAI)."
           </p>
        </div>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

// Added missing standard components for consistency with icons
const Shrink = ({ className }: { className?: string }) => (
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
    <path d="m15 15 6 6" />
    <path d="m9 9-6-6" />
    <path d="M21 3h-6v6" />
    <path d="M9 21H3v-6" />
  </svg>
);

const MousePointer2 = ({ className }: { className?: string }) => (
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
    <path d="m4 4 7.07 17 2.51-7.39L21 11.07z" />
  </svg>
);

export default Day31Content;