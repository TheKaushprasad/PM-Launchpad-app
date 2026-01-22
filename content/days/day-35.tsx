
import React from 'react';
import { 
  Bot, Brain, Cpu, Zap, Layers, Activity, 
  Target, CheckCircle, Database, Settings, 
  RefreshCw, Rocket, Briefcase, Info, 
  Sparkles, MousePointer2, Smartphone, 
  MonitorPlay, Layout, List, Search, Share2, 
  Terminal, ShieldCheck
} from 'lucide-react';

export const Day35Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 35: AI Agents for Product Managers 🚀</h1>
      
      <section className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">AI AGENT</span>
          <h2 className="text-xl font-black text-orange-900">AI Agents for Product Managers: What They Are and Why Building Them Matters</h2>
          <p className="text-sm font-medium text-orange-800 leading-relaxed">
            Artificial intelligence is shifting from tools that respond to prompts to agents that accomplish complex tasks autonomously. This evolution fundamentally changes what product managers can build, how teams operate, and what customers expect from software products.
          </p>
          <p className="text-sm font-bold text-orange-700 leading-relaxed italic">
            Understanding AI agents—and knowing how to build them using platforms like n8n, LangChain, or AutoGPT—isn't just technically interesting. It's strategically essential for modern product managers who want to deliver transformative value and operate more efficiently.
          </p>
          <a 
            href="https://youtu.be/ZHH3sr234zY?si=5qMS4pLlfl2gYaDs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-900 transition-colors mt-2"
          >
            WATCH: AI Agents Deep Dive <MonitorPlay className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Info className="text-orange-600" />
          What Are AI Agents?
        </h2>
        <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             An AI agent is an autonomous system that perceives its environment, makes decisions, and takes actions to achieve specific goals without constant human intervention. Unlike traditional software that follows predefined rules or AI chatbots that simply respond to prompts, agents can plan multi-step tasks, use tools, adapt strategies based on feedback, and work toward objectives over extended periods.
           </p>
           
           <div className="bg-zinc-900 text-white p-8 rounded-[2rem] space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-400">The Difference</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <p className="text-xs font-black text-zinc-300">Chatbot:</p>
                    <p className="text-sm italic text-zinc-500">Answers the question "What's the weather?"</p>
                 </div>
                 <div className="space-y-2">
                    <p className="text-xs font-black text-orange-400">AI Agent:</p>
                    <p className="text-sm italic text-zinc-300">Given the goal "Plan my outdoor wedding," checks forecasts, suggests backups, recommends venues, creates timelines, and sends invites—all autonomously.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-orange-600" />
          Defining Characteristics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[
             { title: "Autonomy", desc: "Agents operate independently once given objectives. You define the goal and the agent figures out how to achieve it.", icon: Bot },
             { title: "Goal-directed behavior", desc: "Focuses agents on outcomes. Instead of 'run query,' say 'find churn risk' and it decides the patterns to investigate.", icon: Target },
             { title: "Reasoning and planning", desc: "Break complex goals into subtasks, sequence actions logically, and adapt plans when circumstances change.", icon: Brain },
             { title: "Tool use", desc: "Accomplish tasks by invoking external capabilities—web search, databases, emails, APIs, and code execution.", icon: Settings },
             { title: "Memory and context", desc: "Maintain continuity across interactions. They remember previous conversations and learn from past actions.", icon: Database },
             { title: "Perception and feedback", desc: "Observe results of actions and adjust. If a strategy isn't working, agents notice and try different approaches.", icon: RefreshCw }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-inner">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-zinc-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Activity className="text-orange-600" />
          Types of AI Agents
        </h2>
        <div className="space-y-4">
           {[
             { title: "Simple reflex agents", desc: "Respond to current inputs based on predefined rules. A thermostat adjusting temperature is a reflex agent." },
             { title: "Model-based agents", desc: "Maintain internal representations of the world. Customer service agents that remember user preferences exemplify this." },
             { title: "Goal-based agents", desc: "Work toward specific objectives, planning sequences of actions. A travel planning agent booking flights satisfies this." },
             { title: "Utility-based agents", desc: "Optimize for specific metrics or preferences. An agent negotiating prices might maximize savings while minimizing time." },
             { title: "Learning agents", desc: "Improve performance over time through experience. Recommendation agents that personalize suggestions based on behavior." }
           ].map((type, i) => (
             <div key={i} className="flex gap-6 p-6 bg-zinc-50 border border-zinc-200 rounded-[2rem] items-start">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 font-black text-sm shadow-sm shrink-0 border border-zinc-100">{i+1}</div>
                <div>
                   <h4 className="font-black text-zinc-900 text-sm mb-0.5">{type.title}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{type.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Briefcase className="text-orange-600" />
          Why AI Agents Matter for Product Managers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 bg-white border border-zinc-100 rounded-[3rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900">New Product Possibilities</h4>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                Instead of building tools users must learn to operate, you build agents that accomplish tasks for users. The product does the work rather than merely enabling it.
              </p>
           </div>
           <div className="p-8 bg-white border border-zinc-100 rounded-[3rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900">Competitive Differentiation</h4>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                The question shifts from "does your product have AI?" to "can your product accomplish complex tasks autonomously?"
              </p>
           </div>
           <div className="p-8 bg-white border border-zinc-100 rounded-[3rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900">Value Propositions Transform</h4>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                Time savings, error reduction, and capability extension become core value drivers. A product that saves users 20 hours per week justifies premium pricing.
              </p>
           </div>
           <div className="p-8 bg-white border border-zinc-100 rounded-[3rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900">Business Models Evolve</h4>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                Outcome-based pricing becomes feasible—charge for tasks completed rather than seats or features.
              </p>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Rocket className="text-orange-600" />
          Why Product Managers Should Build AI Agents
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             "Direct experience with capabilities and limitations beats abstract knowledge.",
             "Rapid prototyping of product ideas becomes possible in hours.",
             "Stakeholder communication improves by showing working examples.",
             "Technical collaboration deepens as you speak the same language as engineering.",
             "Strategic insight accelerates as you recognize when agents add value.",
             "Competitive awareness sharpens by replicating competitors' features.",
             "Customer conversations become richer through real-time co-creation sessions."
           ].map((text, i) => (
             <li key={i} className="flex gap-3 items-start bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-zinc-700 leading-relaxed">{text}</p>
             </li>
           ))}
        </ul>
      </section>

      <section className="space-y-12">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-orange-600" />
          Enter n8n: Agent Building for Product Managers
        </h2>
        
        <div className="bg-zinc-900 text-white p-10 rounded-[3rem] space-y-8 border-t-8 border-orange-500">
           <div className="space-y-4">
              <h3 className="text-xl font-black text-orange-400">What is n8n?</h3>
              <p className="text-sm font-medium text-zinc-400 leading-relaxed">
                n8n is a workflow automation platform that makes building AI agents accessible to non-engineers. Think of n8n as connective tissue between AI models and the tools your agents need. It provides a canvas where you visually design agent workflows without writing code.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">How n8n Works</h4>
                 <ul className="space-y-3">
                    {[
                      { name: "Visual workflow editor", desc: "Drag and drop nodes to define agent behavior." },
                      { name: "AI model integration", desc: "Supports OpenAI, Anthropic, Google, and more." },
                      { name: "Tool nodes", desc: "Connect to Slack, Gmail, Notion, Salesforce, etc." },
                      { name: "Conditional logic", desc: "Branch workflows based on context or sentiment." },
                      { name: "Memory management", desc: "Store history and preferences in databases." },
                      { name: "Triggers and scheduling", desc: "Start based on emails, forms, or webhooks." }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2 items-start text-xs">
                         <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                         <p className="text-zinc-300"><strong>{item.name}:</strong> {item.desc}</p>
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-400">Example: Feedback Agent</h4>
                 <div className="space-y-3">
                    {[
                      "Trigger monitors support inbox.",
                      "AI Agent analyzes sentiment and urgency.",
                      "Conditional logic routes negative feedback.",
                      "Tool nodes create Jira tickets or notify Slack.",
                      "Database node stores analysis for reporting."
                    ].map((step, i) => (
                      <div key={i} className="flex gap-3 items-center">
                         <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center text-[10px] font-black text-orange-400">{i+1}</div>
                         <p className="text-[11px] font-medium text-zinc-400">{step}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-xl font-black text-zinc-900">Why n8n Works for Product Managers</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Low barrier to entry", desc: "If you can create a flowchart, you can build agents in n8n." },
                { title: "Rapid iteration", desc: "Experiment, test, and refine logic all in the same day." },
                { title: "Real integration", desc: "Automate real workflows with your company's existing systems." },
                { title: "Cost-effective", desc: "Validate solutions before committing expensive engineering resources." },
                { title: "Gradual complexity", desc: "Start simple and add memory or error handling over time." },
                { title: "Template community", desc: "Clone and customize workflows shared by other users." }
              ].map((benefit, i) => (
                <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-2">
                   <h4 className="font-black text-zinc-900 text-xs uppercase tracking-widest text-orange-600">{benefit.title}</h4>
                   <p className="text-[11px] font-bold text-zinc-500 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-orange-600" />
          Other Agent Building Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { name: "Zapier and Make", desc: "Business-process-focused visual automation, extremely accessible." },
             { name: "LangChain", desc: "Developer framework for building powerful AI applications and agents." },
             { name: "AutoGPT and BabyAGI", desc: "Experimental frameworks for highly autonomous, goal-seeking agents." },
             { name: "Voiceflow", desc: "Specialized tools for conversational voice and chat experience agents." },
             { name: "LlamaIndex", desc: "Specialized for agents working with private data and RAG systems." },
             { name: "Relevance AI", desc: "Low-code templates for lead qualification and content creation." }
           ].map((platform, i) => (
             <div key={i} className="p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] flex flex-col gap-2">
                <h4 className="font-black text-indigo-900 text-sm uppercase tracking-widest">{platform.name}</h4>
                <p className="text-xs font-bold text-zinc-500 leading-relaxed">{platform.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-orange-500">
        <h2 className="text-2xl font-black text-orange-400 flex items-center gap-3 mb-6">
          <Sparkles className="text-orange-400" />
          The Final Insight
        </h2>
        <div className="space-y-4">
           <p className="text-sm font-bold text-zinc-300 leading-relaxed italic">
             "The shift from GenAI as a tool to Agentic AI as a worker is the most significant change in product strategy of the decade. Building agents isn't just about automation—it's about redefining the relationship between your user and your product."
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

export default Day35Content;
