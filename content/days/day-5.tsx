
import React from 'react';
import { 
  Target, CheckCircle, Lightbulb, Zap, Users, HeartHandshake, 
  Search, Eye, RefreshCcw, Layout, Compass, Smartphone, Apple, 
  History, Smile, Ear, Briefcase, ArrowRight
} from 'lucide-react';

export const Day5Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 5: User Empathy 🚀</h1>
      
      <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
          <p className="text-lg font-medium text-blue-900 leading-relaxed">
            Step into their shoes. User empathy is the fundamental driver of human-centered development.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <HeartHandshake className="text-indigo-600" />
          User Empathy in Product
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          User empathy is the ability to understand and share the feelings, needs, and perspectives of users by "stepping into their shoes" to view the product through their eyes. It drives human-centered development.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Compass className="text-indigo-600" />
          Core Principles of User Empathy
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div key={i} className={`p-8 rounded-[2.5rem] border ${item.color} space-y-4 shadow-sm group hover:scale-[1.02] transition-transform duration-300`}>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black">{item.title}</h3>
              <p className="text-sm font-medium leading-relaxed opacity-90">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <RefreshCcw className="text-indigo-600" />
          Implementation Process for PMs
        </h2>
        
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="relative pl-12 border-l-2 border-dashed border-zinc-200 ml-4">
            <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-black text-xl shadow-lg">1</div>
            <div className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900">User Research & Personas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                   <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Research Methods</p>
                   <p className="text-sm font-bold text-zinc-700">Interviews, surveys, and usability testing.</p>
                </div>
                <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                   <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">Personas</p>
                   <p className="text-sm font-bold text-zinc-700">Visualize different user groups.</p>
                </div>
                <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                   <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">Empathy Maps</p>
                   <p className="text-sm font-bold text-zinc-700">Map what users think, feel, experience, and do.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative pl-12 border-l-2 border-dashed border-zinc-200 ml-4">
            <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-black text-xl shadow-lg">2</div>
            <div className="space-y-6">
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
            <div className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900">Continuous Feedback Loops</h3>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed max-w-2xl">
                Involve users at every stage, not just at the end. Use User Acceptance Testing (UAT) and iterative analysis to evolve with changing user preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
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
              <div key={i} className="p-6 bg-white border border-zinc-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 mb-4">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="font-black text-zinc-900 mb-1">{item.title}</h4>
                <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
      </section>

      <section className="bg-zinc-950 text-white p-12 rounded-[3.5rem] space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Zap className="w-24 h-24 text-indigo-400" /></div>
        <h2 className="text-2xl font-black text-indigo-400">Real-World Success</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 p-8 bg-white/5 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3">
              <Apple className="w-6 h-6 text-white" />
              <h3 className="text-xl font-black">Apple</h3>
            </div>
            <p className="text-sm font-bold leading-relaxed text-zinc-400">
              Demonstrates empathy through user-friendly interfaces and seamless experiences that create a loyal base.
            </p>
          </div>
          <div className="space-y-4 p-8 bg-white/5 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-white" />
              <h3 className="text-xl font-black">Airbnb</h3>
            </div>
            <p className="text-sm font-bold leading-relaxed text-zinc-400">
              Achieved success by focusing on the traveler's need for unique and personalized experiences.
            </p>
          </div>
        </div>

        <blockquote className="pt-8 border-t border-white/10 text-center">
            <p className="text-xl font-black tracking-tight leading-relaxed italic text-indigo-300">
              "Empathy is a core value that ensures products exceed expectations, not just meet them."
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

export default Day5Content;
