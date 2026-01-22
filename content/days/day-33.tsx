import React from 'react';
import { 
  Bot, Brain, Cpu, Zap, Layers, Activity, 
  Search, ShieldCheck, MessageSquare, Target, 
  MonitorPlay, Info, Sparkles, Database, 
  Layout, ArrowRight, Share2, Box, Link, 
  Smartphone, Lock, Terminal, Laptop, Server,
  // Added missing icon imports
  CheckCircle, Code, Users
} from 'lucide-react';

export const Day33Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 33: Model Context Protocol (MCP) 🚀</h1>
      
      <section className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">AI Module</span>
          <p className="text-lg font-black text-orange-900 leading-relaxed italic">
            "Connecting AI models to the tools and data they need to be truly useful."
          </p>
          <a 
            href="https://youtu.be/-UQ6OZywZ2I?si=GumGiQn5M9tGi_Hg" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-900 transition-colors"
          >
            Watch MCP Video <MonitorPlay className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Info className="text-orange-600" />
          What is the Model Context Protocol (MCP)?
        </h2>
        <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems. Using MCP, AI applications like Claude or ChatGPT can connect to data sources (e.g. local files, databases), tools (e.g. search engines, calculators) and workflows (e.g. specialized prompts)—enabling them to access key information and perform tasks.
           </p>
           
           <div className="bg-zinc-950 text-white p-8 rounded-[2rem] border-l-8 border-orange-500 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                 <Link className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-400">The USB-C Analogy</h4>
                 <p className="text-lg font-black text-zinc-300 leading-relaxed italic">
                   "Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect electronic devices, MCP provides a standardized way to connect AI applications to external systems."
                 </p>
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-orange-600" />
          Why does MCP Exist?
        </h2>
        <div className="space-y-6">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Traditional LLMs operate within a fixed context window — they only “know” what’s inside the current prompt. However, in real-world applications, models need access to:
           </p>
           <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { text: "Private company data (e.g., customer tickets, sales reports)", icon: Lock },
                { text: "APIs and tools (e.g., Jira, Slack, Notion)", icon: Share2 },
                { text: "Dynamic or structured context (e.g., user preferences, codebases)", icon: Database }
              ].map((item, i) => (
                <li key={i} className="p-6 bg-zinc-50 border border-zinc-100 rounded-3xl flex flex-col gap-3">
                   <item.icon className="w-5 h-5 text-orange-600" />
                   <p className="text-xs font-bold text-zinc-700 leading-relaxed">{item.text}</p>
                </li>
              ))}
           </ul>
           
           <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm p-8 space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400">Limitations of Previous Solutions</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="space-y-2">
                    <h5 className="font-black text-rose-500 text-sm">RAG</h5>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">Only provides text chunks; limited interactivity.</p>
                 </div>
                 <div className="space-y-2">
                    <h5 className="font-black text-rose-500 text-sm">Plugins</h5>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">Difficult to standardize, manage security, and reuse.</p>
                 </div>
                 <div className="space-y-2">
                    <h5 className="font-black text-rose-500 text-sm">Ad-hoc APIs</h5>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">Brittle integrations and lack of visibility.</p>
                 </div>
              </div>
              <p className="pt-4 text-xs font-bold text-zinc-400 italic">
                Hence, MCP (Model Context Protocol) was introduced by Anthropic to standardize how models communicate with tools and context providers safely and modularly.
              </p>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Sparkles className="text-orange-600" />
          What can MCP enable?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { title: "Personalized AI Assistants", desc: "Agents can access your Google Calendar and Notion, acting as a more personalized AI assistant." },
             { title: "Design to Code", desc: "Claude Code can generate an entire web app using a Figma design." },
             { title: "Enterprise Connectivity", desc: "Enterprise chatbots can connect to multiple databases across an organization, empowering users to analyze data using chat." },
             { title: "Physical World Integration", desc: "AI models can create 3D designs on Blender and print them out using a 3D printer." }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-black text-zinc-900 text-sm mb-1">{item.title}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
           <p className="text-sm font-black text-emerald-800">✨ MCP are reusable</p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-orange-600" />
          Why does MCP matter?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { 
               role: "Developers", 
               desc: "MCP reduces development time and complexity when building, or integrating with, an AI application or agent.",
               icon: Code
             },
             { 
               role: "AI applications or agents", 
               desc: "MCP provides access to an ecosystem of data sources, tools and apps which will enhance capabilities and improve the end-user experience.",
               icon: Bot
             },
             { 
               role: "End-users", 
               desc: "MCP results in more capable AI applications or agents which can access your data and take actions on your behalf when necessary.",
               icon: Users
             }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-orange-600 shadow-sm">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-zinc-900 text-sm uppercase tracking-widest">{item.role}</h4>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-orange-600" />
          Understanding Client Server Architecture in MCP
        </h2>
        
        <div className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Host", 
                  desc: "Clients live inside a host (e.g., Claude desktop or Claude AI). The host is an LLM application that wishes to access data through MCP. The host is responsible for storing and maintaining all the clients and their connections to MCP servers.",
                  icon: Laptop,
                  color: "indigo"
                },
                { 
                  title: "MCP Client", 
                  desc: "MCP clients maintain a 1-to-1 connection with MCP servers. The client’s job is to find resources and find tools. When the client uses a tool (a function provided by the server), the client takes advantage of that tool and executes the necessary data.",
                  icon: Terminal,
                  color: "orange"
                },
                { 
                  title: "MCP Server", 
                  desc: "Servers are lightweight programs that expose specific capabilities through the protocol. The server’s primary job is to expose information (tools, resources, and prompts) to the client.",
                  icon: Server,
                  color: "emerald"
                }
              ].map((comp, i) => (
                <div key={i} className={`p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4 relative overflow-hidden group`}>
                   <div className={`absolute top-0 right-0 w-1 h-full bg-${comp.color}-500`}></div>
                   <div className={`w-12 h-12 rounded-2xl bg-${comp.color}-50 flex items-center justify-center text-${comp.color}-600 shadow-inner`}>
                      <comp.icon className="w-6 h-6" />
                   </div>
                   <h4 className="font-black text-zinc-900">{comp.title}</h4>
                   <p className="text-[11px] font-medium text-zinc-500 leading-relaxed">{comp.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-orange-500">
        <h2 className="text-2xl font-black text-orange-400 flex items-center gap-3 mb-6">
          <Activity className="text-orange-400" />
          The Bottom Line
        </h2>
        <div className="space-y-4">
           <p className="text-sm font-bold text-zinc-300 leading-relaxed italic">
             MCP is essentially the "USB-C" of the AI world — a standard that allows any model to talk to any data source or tool without custom, brittle code for every single integration.
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

export default Day33Content;