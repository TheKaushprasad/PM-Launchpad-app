import { CornsilkSection } from '../../components/CornsilkSection';

import React from 'react';
import { 
  Target, CheckCircle, Lightbulb, Zap, Users, HeartHandshake, 
  Search, Eye, RefreshCcw, Layout, Compass, Smartphone, Apple, 
  History, Smile, Ear, Briefcase, ArrowRight
} from 'lucide-react';

export const Day5Content = () => {
  return (
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-blue-50/70 p-3.5 sm:p-4 rounded-xl border border-blue-100/80">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
          <p className="text-sm sm:text-base font-medium text-blue-900 leading-relaxed">
            Step into their shoes. User empathy is the fundamental driver of human-centered development.
          </p>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <HeartHandshake className="text-indigo-600" />
          User Empathy in Product
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          User empathy is the ability to understand and share the feelings, needs, and perspectives of users by "stepping into their shoes" to view the product through their eyes. It drives human-centered development.
        </p>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Compass className="text-indigo-600" />
          Core Principles of User Empathy
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5">
          {[
            {
              title: "Active Listening",
              desc: "Listen without judgment. Encourage open communication and hear what's NOT being said.",
              icon: Ear,
              color: "bg-indigo-50 border-indigo-100 text-indigo-700"
            },
            {
              title: "Putting Users First",
              desc: "Prioritize user needs over internal assumptions or ego. Align decisions with their interests.",
              icon: Target,
              color: "bg-emerald-50 border-emerald-100 text-emerald-700"
            },
            {
              title: "Deep Connection",
              desc: "Grasp challenges, desires, and emotional motivations of your audience, not just tech specs.",
              icon: Search,
              color: "bg-blue-50 border-blue-100 text-blue-700"
            }
          ].map((item, i) => (
            <div key={i} className={`p-4 sm:p-5 rounded-2xl border ${item.color} space-y-4 shadow-sm group hover:scale-[1.02] transition-transform duration-300`}>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black">{item.title}</h3>
              <p className="text-sm font-medium leading-relaxed opacity-90">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <RefreshCcw className="text-indigo-600" />
          Implementation Process for PMs
        </h2>
        
        <div className="space-y-3.5 md:space-y-4">
          {/* Step 1 */}
          <div className="relative pl-12 border-l-2 border-dashed border-zinc-200 ml-4">
            <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-black text-xl shadow-lg">1</div>
            <div className="space-y-2.5">
              <h3 className="text-xl font-black text-zinc-900">User Research & Personas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                   <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Research Methods</p>
                   <p className="text-sm font-bold text-zinc-700">Interviews, surveys, and usability testing.</p>
                </div>
                <div className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                   <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">Personas</p>
                   <p className="text-sm font-bold text-zinc-700">Visualize different user groups.</p>
                </div>
                <div className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                   <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">Empathy Maps</p>
                   <p className="text-sm font-bold text-zinc-700">Map what users think, feel, experience, and do.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative pl-12 border-l-2 border-dashed border-zinc-200 ml-4">
            <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-black text-xl shadow-lg">2</div>
            <div className="space-y-2.5">
              <h3 className="text-xl font-black text-zinc-900">Design Thinking Integration</h3>
              <div className="flex flex-wrap gap-3">
                 {['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'].map((step, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <span className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">{step}</span>
                     {i < 4 && <ArrowRight className="w-4 h-4 text-zinc-300" />}
                   </div>
                 ))}
              </div>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed max-w-2xl">
                PMs observe interactions, define pain points, ideate solutions, and test prototypes to refine the experience based on feedback.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative pl-12 ml-4">
            <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-black text-xl shadow-lg">3</div>
            <div className="space-y-2.5">
              <h3 className="text-xl font-black text-zinc-900">Continuous Feedback Loops</h3>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed max-w-2xl">
                Involve users at every stage, not just at the end. Use User Acceptance Testing (UAT) and iterative analysis to evolve with changing user preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Briefcase className="text-indigo-600" />
          Key Tools & Frameworks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'User Journey Mapping', desc: 'Visualizing the path a user takes.', icon: RefreshCcw },
              { title: 'User Stories', desc: 'Features from the user\'s perspective.', icon: Layout },
              { title: 'User Flows', desc: 'Step-by-step task completion.', icon: Smartphone },
              { title: 'User Segments', desc: 'Categorizing unique group needs.', icon: Users }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white border border-zinc-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 mb-4">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="font-black text-zinc-900 mb-1">{item.title}</h4>
                <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
      </section>

            <CornsilkSection
        title="Practicing Deep Customer Empathy"
        titleColor="blue"
        items={[
                {
                          "subtitle": "Active Listening & Inquiry",
                          "headerColor": "blue",
                          "description": "Conduct unbiased customer interviews without leading questions, allowing authentic user frustrations and emotional drivers to surface naturally."
                },
                {
                          "subtitle": "Immersive Journey Mapping",
                          "headerColor": "red",
                          "description": "Walk through end-to-end customer touchpoints to identify unstated friction, emotional highs and lows, and moments of drop-off across the user lifecycle."
                },
                {
                          "subtitle": "Translating Empathy to Action",
                          "headerColor": "blue",
                          "description": "Convert raw qualitative insights into actionable problem statements and prioritized backlog items that directly eliminate user anxiety and effort."
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

export default Day5Content;
