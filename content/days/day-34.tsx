import React from 'react';
import { 
  Bot, Brain, Cpu, Zap, Layers, Activity, 
  Search, ShieldCheck, MessageSquare, Target, 
  MonitorPlay, Info, Sparkles, Database, 
  Layout, ArrowRight, Share2, Box, Link, 
  Terminal, RefreshCw, CheckCircle, ExternalLink,
  // Added missing Briefcase icon
  Briefcase
} from 'lucide-react';

export const Day34Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 34: Generative AI Agents 🚀</h1>
      
      <section className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">AI Module</span>
          <p className="text-lg font-black text-orange-900 leading-relaxed italic">
            "An AI agent is an AI system that can use tools and reasoning to accomplish a goal. While a traditional LLM is a 'brain in a jar', an agent is a 'brain with hands'."
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <a 
              href="https://youtu.be/p6pI79qV640?si=WpQ3D01Nf-w17_zX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-900 transition-colors"
            >
              Agents Intro Video <MonitorPlay className="w-4 h-4" />
            </a>
            <a 
              href="https://learn.deeplearning.ai/courses/ai-agents-in-langgraph/lesson/1/introduction" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-900 transition-colors"
            >
              DeepLearning.ai Agents Course <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-orange-600" />
          What are AI Agents?
        </h2>
        <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             AI agents are software programs that can use reasoning to achieve a goal. Unlike a standard LLM that just predicts text, an agent can use tools, interact with users, and reason through a multi-step problem.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">LLM (Chatbot)</h4>
                 <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <p className="text-xs font-bold text-zinc-500">"Brain in a jar" — can only respond to what you ask within its current text window.</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-600">AI Agent</h4>
                 <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100">
                    <p className="text-xs font-bold text-orange-900">"Brain with hands" — can interact with the world through tools and autonomous action.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-orange-600" />
          Core Characteristics of Agents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           {[
             { 
               title: "Autonomy", 
               desc: "Agents can determine the sequence of steps needed to achieve a goal without constant human oversight.",
               icon: Bot
             },
             { 
               title: "Tool Use", 
               desc: "Agents can use external tools (web search, calculators, APIs, databases) to gather info or take actions.",
               icon: Terminal
             },
             { 
               title: "Reasoning", 
               desc: "Agents use LLMs to plan, reflect, and correct their own mistakes as they work through a task.",
               icon: Brain
             },
             { 
               title: "Persistence", 
               desc: "Agents can maintain state across multiple steps or even multiple sessions to ensure long-term goals are met.",
               icon: RefreshCw
             }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-black text-zinc-900 mb-1">{item.title}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Activity className="text-orange-600" />
          The Agent Loop: ReAct Framework
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          The ReAct (Reason + Act) pattern is the fundamental way agents process work. It separates cognitive planning from external action.
        </p>
        
        <div className="space-y-4">
          {[
            { label: "1. Think (Reasoning)", text: "The LLM analyzes the goal, the current context, and determines what it doesn't know." },
            { label: "2. Act (Action)", text: "The LLM selects a specific tool (e.g., Search, Database, API) to execute a step." },
            { label: "3. Observe (Observation)", text: "The system records the output of the tool and feeds it back into the LLM's context." },
            { label: "4. Repeat", text: "The LLM processes the new information and continues the loop until the final goal is accomplished." }
          ].map((step, i) => (
            <div key={i} className="flex gap-6 p-6 bg-zinc-50 border border-zinc-200 rounded-[2rem] items-center">
               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-orange-600 font-black text-sm shadow-sm shrink-0 border border-zinc-100">{i+1}</div>
               <div>
                  <h4 className="font-black text-zinc-900 text-sm mb-0.5">{step.label}</h4>
                  <p className="text-xs font-medium text-zinc-500 leading-relaxed">{step.text}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-orange-600" />
          Multi-Agent Systems
        </h2>
        <div className="bg-zinc-900 text-white p-10 rounded-[3rem] space-y-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10"><Share2 className="w-32 h-32 text-orange-400" /></div>
           <p className="text-sm font-medium text-zinc-400 leading-relaxed">
             Complex tasks are often handled better by a team of specialized agents rather than a single generalist. This is known as Multi-Agent Orchestration.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center">
                 <Search className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                 <h5 className="font-black text-sm mb-2">Researcher Agent</h5>
                 <p className="text-[10px] text-zinc-500">Gathers raw data from the web and docs.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center">
                 <Terminal className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
                 <h5 className="font-black text-sm mb-2">Writer Agent</h5>
                 <p className="text-[10px] text-zinc-500">Drafts reports based on research input.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center">
                 <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
                 <h5 className="font-black text-sm mb-2">Editor Agent</h5>
                 <p className="text-[10px] text-zinc-500">Reviews for safety, tone, and accuracy.</p>
              </div>
           </div>
           <p className="text-xs font-bold text-zinc-500 pt-4 italic border-t border-white/10">
             Common Frameworks: LangGraph, CrewAI, OpenAI Swarm, AutoGen.
           </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Briefcase className="text-orange-600" />
          Why Agents for Product Managers?
        </h2>
        <div className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <p className="text-sm font-bold text-zinc-700 leading-relaxed mb-8">
             Agents represent the shift from 'Generative AI' (making content) to 'Agentic AI' (getting work done). As a PM, this changes how you build:
           </p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Workflow Design", desc: "You don't just design screens; you design agentic reasoning chains and multi-step workflows." },
                { title: "Managing Uncertainty", desc: "Agents are non-deterministic. You must design for failure cases and define new metrics for 'reliability'." },
                { title: "New Utility", desc: "Agents enable 10x value by performing chores (e.g., adding Jira tickets) rather than just helping you write them." },
                { title: "Human-in-the-loop", desc: "Deciding where an agent acts autonomously and where it must pause for human approval." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                   <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                   <div>
                      <h4 className="font-black text-zinc-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-orange-500">
        <h2 className="text-2xl font-black text-orange-400 flex items-center gap-3 mb-6">
          <Sparkles className="text-orange-400" />
          The Bottom Line
        </h2>
        <div className="space-y-4">
           <p className="text-sm font-bold text-zinc-300 leading-relaxed italic">
             "The first era of AI was chatbots. The second era is agents. As a PM, you aren't just building a helpful companion; you're building a digital employee."
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

export default Day34Content;