
import React from 'react';
import { 
  FileText, Briefcase, MessageSquare, Map, Terminal, Rocket, History, 
  Smartphone, ClipboardList, FileEdit, CheckCircle, Zap, BookOpen, Target, Layers
} from 'lucide-react';

export const Day6Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 6: Essential Product Documentation: A Product Manager's Complete Guide 🚀</h1>
      
      <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
          <p className="text-lg font-medium text-blue-900 leading-relaxed">
            Product managers are professional translators. We translate customer needs into technical requirements, business strategy into product roadmaps, and abstract visions into concrete execution plans. Documentation is the primary medium for this translation work.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Distinguish between document types (PRD, BRD, user stories, roadmaps, etc.)",
            "Create comprehensive Product Requirements Documents (PRDs)",
            "Build compelling Business Requirements Documents (BRDs)",
            "Write effective user stories and acceptance criteria",
            "Develop outcome-focused roadmaps that communicate strategy",
            "Produce go-to-market documentation including launch plans",
            "Apply documentation best practices (scannability, accessibility)",
            "Strategic decision-making on when to document vs communicate",
            "Maintain decision logs and meeting notes for institutional memory",
            "Develop a documentation mindset for alignment and impact"
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-zinc-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
            <FileText className="text-indigo-600" />
            The Product Requirements Document (PRD)
          </h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            The PRD is the product manager's most fundamental artifact. It defines what you're building, why you're building it, and what success looks like. Think of it as the single source of truth that aligns engineering, design, marketing, and leadership around a shared understanding.
          </p>
          <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 shadow-sm space-y-4">
            <p className="text-sm font-bold text-zinc-800">A strong PRD typically includes:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Problem statement and context",
                "Objectives and success metrics",
                "Prioritized requirements",
                "User stories or use cases",
                "User experience considerations",
                "Technical constraints",
                "Explicit scope boundaries",
                "Assumption and open questions"
              ].map((point, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-zinc-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
            <Briefcase className="text-indigo-600" />
            The Business Requirements Document (BRD)
          </h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            While PRDs focus on the product itself, BRDs articulate the business case. This document answers the question every executive asks: why should we invest resources in this?
          </p>
          <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-200">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                   <h4 className="font-black text-indigo-900">Market Analysis</h4>
                   <p className="text-xs text-zinc-500 font-medium">Opportunity size, target customers, and competitive landscape.</p>
                </div>
                <div className="space-y-2">
                   <h4 className="font-black text-indigo-900">Financial Analysis</h4>
                   <p className="text-xs text-zinc-500 font-medium">Projected revenue, dev costs, and ROI justification.</p>
                </div>
                <div className="space-y-2">
                   <h4 className="font-black text-indigo-900">Business Objectives</h4>
                   <p className="text-xs text-zinc-500 font-medium">Connection to company goals and strategic positioning.</p>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <h3 className="text-xl font-black text-zinc-900 flex items-center gap-3">
                <MessageSquare className="text-indigo-600" />
                User Stories
              </h3>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                User stories translate requirements into human terms. The classic format—"As a [user type], I want to [action] so that [benefit]"—forces you to think from the user's perspective.
              </p>
              <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl italic text-sm font-bold text-indigo-900">
                "Effective user stories are independent, negotiable, valuable, estimable, small, and testable."
              </div>
           </div>
           <div className="space-y-4">
              <h3 className="text-xl font-black text-zinc-900 flex items-center gap-3">
                <Map className="text-indigo-600" />
                Product Roadmaps
              </h3>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                Roadmaps communicate your product strategy over time. Unlike detailed project plans, roadmaps show the big picture—what you're building, when, and why it matters.
              </p>
              <div className="p-5 bg-zinc-900 text-white rounded-2xl text-xs font-bold">
                PRO TIP: Focus on themes or outcomes (e.g., "improve discoverability") rather than specific feature commitments.
              </div>
           </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-black text-zinc-900">Specialized Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Go-to-Market (GTM)",
                icon: Rocket,
                content: "Launch plans, messaging/positioning, sales enablement materials, and support docs."
              },
              {
                title: "Technical Specs",
                icon: Terminal,
                content: "Architecture documents, integration specs, data flows, and API contracts."
              },
              {
                title: "Release Notes",
                icon: History,
                content: "Customer-facing changes, bug fixes, and changelogs for transparency."
              },
              {
                title: "Design Specs",
                icon: Smartphone,
                content: "User flow diagrams, annotated wireframes, and interaction patterns."
              },
              {
                title: "Decision Logs",
                icon: ClipboardList,
                content: "Captured discussions, rationale behind choices, and action items."
              },
              {
                title: "One-Pagers",
                icon: FileEdit,
                content: "Distilled summaries for busy stakeholders to grab context quickly."
              }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border border-zinc-100 rounded-[2rem] shadow-sm flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-indigo-600">
                   <item.icon className="w-5 h-5" />
                </div>
                <h4 className="font-black text-zinc-900">{item.title}</h4>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-12 rounded-[3.5rem] space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Zap className="w-24 h-24 text-indigo-400" /></div>
        <h2 className="text-2xl font-black text-indigo-400">Documentation Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { label: "Know Your Audience", text: "Engineers need detail; executives need business context. Tailor depth accordingly." },
            { label: "Be Concise & Scannable", text: "Use headers, bullets, and white space. Front-load key info for skimmers." },
            { label: "Ensure Discoverability", text: "Use a central repository (Notion, Confluence) with consistent naming." },
            { label: "Maintain or Retire", text: "Outdated docs spread misinformation. Review and update key artifacts quarterly." }
          ].map((tip, i) => (
            <div key={i} className="space-y-2">
               <h4 className="font-black text-indigo-300 uppercase tracking-widest text-[10px]">{tip.label}</h4>
               <p className="text-sm font-bold leading-relaxed text-zinc-300">{tip.text}</p>
            </div>
          ))}
        </div>
        
        <blockquote className="pt-8 border-t border-white/10">
          <p className="text-xl font-black tracking-tight leading-relaxed italic text-indigo-200">
            "The test is simple: does this documentation create more value than it costs to produce and maintain? If yes, write it."
          </p>
        </blockquote>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day6Content;
