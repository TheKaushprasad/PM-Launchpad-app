import { CornsilkSection } from '../../components/CornsilkSection';

import React from 'react';
import { 
  Target, CheckCircle, Users, Zap, Briefcase, MessageSquare, 
  TrendingUp, BarChart, Layers, Activity, FileText, Scale, Coffee, Eye
} from 'lucide-react';

export const Day7Content = () => {
  return (
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-blue-50/70 p-3.5 sm:p-4 rounded-xl border border-blue-100/80">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
          <p className="text-sm sm:text-base font-medium text-blue-900 leading-relaxed italic">
            "Product managers often joke that they have 'all the responsibility but none of the authority.' This paradox makes stakeholder management not just important—it's the difference between shipping transformative products and watching promising ideas die in committee."
          </p>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Identify and categorize stakeholders using influence and interest matrices to prioritize engagement efforts effectively",
            "Tailor communication strategies to different stakeholder groups based on their specific needs, concerns, and decision-making authority",
            "Build coalitions rather than seeking consensus by identifying champions, addressing skeptics, and securing sufficient support for product decisions",
            "Manage executive relationships by framing recommendations in business outcomes, respecting their time, and using reviews strategically",
            "Navigate conflict constructively by uncovering underlying concerns, using data to inform debates, and maintaining focus on ideas rather than personal disagreements",
            "Say no gracefully while preserving relationships by grounding refusals in strategy, offering alternatives, and maintaining transparency",
            "Collaborate effectively with engineering teams by involving them early in problem-framing, respecting technical constraints, and defending against disruptive scope changes",
            "Measure stakeholder management success through indicators like decision velocity, cross-functional volunteering, and whether decisions remain stable over time",
            "Develop a documentation mindset that views writing as a tool for clarifying thinking, creating alignment, and multiplying product management impact"
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-zinc-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2.5">
        <p className="text-zinc-600 font-medium leading-relaxed">
          At its core, stakeholder management is the art and science of aligning diverse groups around a shared product vision while navigating competing priorities, limited resources, and organizational politics. For product managers, it's as fundamental as roadmap planning or user research.
        </p>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-indigo-600" />
          Understanding Your Stakeholder Landscape
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          The first step in effective stakeholder management is mapping who actually matters to your product's success. Stakeholders typically fall into several categories:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5">
          {[
            { title: "Executives", desc: "Control budgets and strategic direction. Care about revenue impact." },
            { title: "Engineering", desc: "Build your vision. Worry about technical debt and feasibility." },
            { title: "Design", desc: "Craft the user experience and interaction patterns." },
            { title: "Sales & Marketing", desc: "Bring products to market. Need competitive differentiation." },
            { title: "Customer Success", desc: "On the front lines with users. Care about usability and support." },
            { title: "Customers", desc: "The ultimate end-users whose problems you are solving." }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-white border border-zinc-100 rounded-[2rem] shadow-sm space-y-2">
               <h4 className="font-black text-zinc-900">{item.title}</h4>
               <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Scale className="text-indigo-600" />
          The Power Map: Influence vs. Interest
        </h2>
        <div className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200 space-y-4">
          <p className="text-zinc-600 font-medium leading-relaxed">
            Not all stakeholders deserve equal time. Create a simple two-by-two matrix plotting stakeholders by their influence over your product and their interest in it.
          </p>
          <ul className="space-y-3">
            {[
              { label: "High Influence, High Interest", text: "Key players who need regular engagement and input." },
              { label: "High Influence, Low Interest", text: "Need enough information to stay supportive without overwhelming them with details." },
              { label: "Low Influence, High Interest", text: "Valuable allies and advocates." },
              { label: "Low Influence, Low Interest", text: "Might only need basic updates." }
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm font-bold text-zinc-700">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span><span className="text-indigo-600">{item.label}:</span> {item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <MessageSquare className="text-indigo-600" />
          Communication: Tailored, Transparent, and Timely
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
           <div className="space-y-4">
              <h4 className="font-black text-zinc-900">Tailored Messaging</h4>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                Your engineering lead doesn't need the same update as your CFO. Tailor your message to what each stakeholder cares about. Executives need outcomes and strategic alignment; technical teams need the 'why' and tradeoffs.
              </p>
           </div>
           <div className="space-y-4">
              <h4 className="font-black text-zinc-900">Transparent & Timely</h4>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                Transparency builds trust, even when delivering bad news. If a feature is slipping, share it early with context and a plan. Stakeholders can handle setbacks; they can't handle surprises.
              </p>
           </div>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Users className="text-indigo-600" />
          Building Coalitions, Not Consensus
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed italic">
          "Here's a liberating truth: you don't need everyone to agree. Seeking universal consensus leads to watered-down products that please no one. Instead, build coalitions around decisions."
        </p>
        <div className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm">
           <p className="text-sm text-zinc-600 font-medium leading-relaxed">
             Identify champions who will advocate alongside you. Find common ground with skeptics rather than trying to convert them entirely. Sometimes the best outcome is neutral acceptance.
           </p>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <TrendingUp className="text-indigo-600" />
          Managing Up: Your Executive Stakeholders
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-3.5">
           <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-3xl space-y-2">
              <h4 className="font-black text-indigo-900">Come with Recommendations</h4>
              <p className="text-xs text-indigo-700 font-bold leading-relaxed">Don't just bring problems. Frame choices in terms of business outcomes they care about.</p>
           </div>
           <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-3xl space-y-2">
              <h4 className="font-black text-indigo-900">Strategic Reviews</h4>
              <p className="text-xs text-indigo-700 font-bold leading-relaxed">Use reviews to secure commitment, remove obstacles, or shift strategy—not just for status updates.</p>
           </div>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-indigo-600" />
          The Delicate Dance with Engineering
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Product and engineering partnerships make or break execution. The best product managers treat engineers as collaborators, not order-takers. Involve them early in problem framing, respect technical constraints, and defend them from scope creep.
        </p>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Scale className="text-indigo-600" />
          Saying No Gracefully
        </h2>
        <div className="p-4 sm:p-5 bg-zinc-950 text-white rounded-2xl border-l-8 border-indigo-600">
           <p className="text-base font-bold text-zinc-300 leading-relaxed mb-4">
             "Ground refusals in strategy and data rather than personal preference. Instead of 'we can't do that,' try 'here's where that sits against our priorities and why we're sequencing things this way.'"
           </p>
           <p className="text-sm font-black text-indigo-400">Offer alternatives or a path to revisiting the request later.</p>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Coffee className="text-indigo-600" />
          The Long Game
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Stakeholder management isn't about manipulation or playing politics. It's about building trust over time through consistent communication, delivered results, and treating people with respect even in disagreement. Invest in relationships before you need them.
        </p>
      </section>

            <CornsilkSection
        title="Frameworks for Stakeholder Alignment"
        titleColor="blue"
        items={[
                {
                          "subtitle": "Power-Interest Mapping",
                          "headerColor": "blue",
                          "description": "Categorize stakeholders systematically to tailor communication frequency, detail depth, and consultative buy-in for every strategic initiative."
                },
                {
                          "subtitle": "Proactive Expectation Setting",
                          "headerColor": "red",
                          "description": "Establish transparent constraints, engineering trade-offs, and timeline risks early to prevent scope creep and misaligned executive expectations."
                },
                {
                          "subtitle": "Constructive Conflict Resolution",
                          "headerColor": "blue",
                          "description": "Anchor difficult stakeholder disagreements in shared North Star metrics and verified customer data rather than subjective opinions or hierarchy."
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

export default Day7Content;
