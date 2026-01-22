
import React from 'react';
import { 
  Target, CheckCircle, Code, Zap, Share2, 
  Terminal, MonitorPlay, Briefcase, Layers, 
  Sparkles, Info, ShieldCheck, Globe, 
  ExternalLink, MessageSquare, Bot
} from 'lucide-react';

export const Day23Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 23: Understanding APIs as a Product Manager 🚀</h1>
      
      <section className="bg-cyan-50 p-10 rounded-[3rem] border border-cyan-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-600">Tech</span>
          <p className="text-lg font-black text-cyan-900 leading-relaxed italic">
            "APIs (Application Programming Interfaces) are how software systems communicate — they’re the building blocks of integrations, automation, and extensible products."
          </p>
          <p className="text-sm font-bold text-cyan-700">
            Today you'll understand why a solid grasp of APIs lets you communicate clearly with engineering, design better integrations, and build scalable products.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Globe className="text-indigo-600" />
          Foundation: How the Internet Works
        </h2>
        <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row gap-8 items-center">
           <div className="flex-1 space-y-4">
              <h4 className="font-black text-zinc-900">Lets first understand How the Internet Works</h4>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Before diving into APIs, it's crucial to understand the network layers and how data travels across the globe.
              </p>
              <a 
                href="https://www.cloudflare.com/en-in/learning/network-layer/how-does-the-internet-work/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-700 transition-all"
              >
                Read Cloudflare Guide <ExternalLink className="w-4 h-4" />
              </a>
           </div>
           <div className="w-full md:w-1/3 aspect-video bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800">
              <MonitorPlay className="w-12 h-12 text-indigo-400" />
           </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <p className="text-sm font-bold text-zinc-500">By the end of Day 23, you will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Explain what APIs are and how they work",
            "Identify key API concepts every PM should know",
            "Understand API documentation and testing basics",
            "Use APIs to inform product strategy and partnerships",
            "Collaborate effectively with engineers on API-driven features"
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-zinc-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-indigo-600" />
          Why APIs Matter for Product Managers
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          A solid grasp of APIs lets you:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { title: "Communicate clearly with engineering teams", desc: "Speak the language of technical feasibility and constraints.", icon: MessageSquare },
             { title: "Design integrations that unlock value for users", desc: "Understand how to leverage third-party data and functionality.", icon: Share2 },
             { title: "Build products that scale with partner ecosystems", desc: "Turn your product into a platform that others can build upon.", icon: Layers },
             { title: "Reduce dependencies on reinventing functionality internally", desc: "Know when to buy or integrate instead of building from scratch.", icon: ShieldCheck }
           ].map((item, i) => (
             <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm flex items-start gap-4 hover:border-cyan-200 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-cyan-600 shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-black text-zinc-900 text-sm mb-1">{item.title}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Briefcase className="text-indigo-600" />
          Deep Dive: API for Product Managers
        </h2>
        <div className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-indigo-500 space-y-8">
           <div className="space-y-4">
              <p className="text-lg font-black tracking-tight leading-relaxed italic text-zinc-300">
                "Cover API for product managers from this detailed guide."
              </p>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="space-y-2">
                    <h4 className="font-black text-indigo-400 uppercase tracking-widest text-[10px]">External Guide</h4>
                    <p className="text-sm font-bold text-zinc-300">Master REST, JSON, Endpoints, and Authentication.</p>
                 </div>
                 <a 
                    href="https://dune-leek-31a.notion.site/API-for-Product-Managers-24abaab379148074abc3f57b062db2bf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full md:w-auto px-8 py-4 bg-white text-zinc-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all shadow-lg text-center"
                 >
                    Open Notion Guide
                 </a>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              {[
                { title: "Endpoints", text: "The 'addresses' where API requests are sent to perform specific actions." },
                { title: "Methods", text: "GET, POST, PUT, DELETE — the basic verbs of API communication." },
                { title: "JSON", text: "The most common format for structuring data in API requests and responses." },
                { title: "Auth & Keys", text: "How systems verify identity and control access to data." }
              ].map((term, i) => (
                <div key={i} className="space-y-2">
                   <h4 className="font-black text-indigo-300 uppercase tracking-widest text-[10px]">{term.title}</h4>
                   <p className="text-sm font-bold leading-relaxed text-zinc-300">{term.text}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
          <Sparkles className="text-amber-500" />
          Technical PM Tip
        </h2>
        <p className="text-sm font-bold text-zinc-600 leading-relaxed italic">
          "You don't need to write the code for an API, but you should be able to read the documentation. Use tools like <strong>Postman</strong> to test API endpoints yourself. It will help you understand data structures and error handling before the dev team even starts building."
        </p>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day23Content;
