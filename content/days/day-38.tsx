import React from 'react';
import { 
  Rocket, Briefcase, Zap, Search, Target, MessageSquare, 
  MonitorPlay, ExternalLink, Info, CheckCircle, Eye, Layers,
  Sparkles, RefreshCw, Users2, FileText, ArrowRight, TrendingUp,
  AlertTriangle, Hammer, Smartphone, Activity, X
} from 'lucide-react';

export const Day38Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 38: How Aspiring Product Managers Can Do a Startup Case Study to Get a PM Job 🚀</h1>
      
      <section className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Job ready</span>
          <p className="text-lg font-black text-amber-900 leading-relaxed italic">
            "A strong startup case study is proof of product thinking, not a presentation exercise. Hiring managers don’t care about fancy slides — they care whether you can identify real problems, make trade-offs, and think in metrics."
          </p>
          <div className="flex gap-4">
            <a 
              href="https://thestare.in/case-studies" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-900 transition-colors"
            >
              Refer Case Studies <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Rocket className="text-amber-600" />
          The Exact Process You Should Follow
        </h2>

        <div className="space-y-10">
          {/* Step 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-zinc-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-sm">1</span>
              Pick the Right Startup (Very Important)
            </h3>
            <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Choose a startup where:</p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['The product is live and usable', 'The problem space is clear', 'You can observe gaps, friction, or missed opportunities'].map((item, i) => (
                  <li key={i} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-xs font-bold text-zinc-700 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
                   <h4 className="font-black text-emerald-900 text-sm mb-2">Good examples</h4>
                   <p className="text-xs font-medium text-emerald-700 leading-relaxed">Early-stage consumer apps (fintech, health, edtech, B2B SaaS). Startups with visible onboarding, pricing, or engagement challenges.</p>
                </div>
                <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl">
                   <h4 className="font-black text-rose-900 text-sm mb-2">Avoid</h4>
                   <p className="text-xs font-medium text-rose-700 leading-relaxed">Products you’ve never used. Companies where you don’t understand the user. “Too big” products where decisions are already over-optimised.</p>
                </div>
              </div>
              <p className="text-sm font-black text-indigo-600 bg-indigo-50 p-4 rounded-xl text-center italic border border-indigo-100">
                Rule: If you can’t describe the core problem in one line, don’t pick it.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-zinc-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-sm">2</span>
              Define the Scope (Don’t Do Everything)
            </h3>
            <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-4">
              <p className="text-sm font-medium text-zinc-600">A common mistake is trying to analyze the entire product. Instead, pick ONE clear focus:</p>
              <div className="flex flex-wrap gap-2">
                {['Onboarding experience', 'Activation & first value moment', 'Retention / engagement', 'Monetisation / pricing', 'A single core feature'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-zinc-100 border border-zinc-200 rounded-lg text-[10px] font-black uppercase text-zinc-500 tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs font-bold text-zinc-400 italic pt-2">Refer the reviews by users on platforms like playstore, reddit, linkedin etc</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-zinc-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-sm">3</span>
              Understand the Business & Users (Assumptions Allowed)
            </h3>
            <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
              <p className="text-sm font-medium text-zinc-600">You won’t have internal data — that’s okay. Write explicit assumptions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Target user', 'User goal', 'Startup’s business goal', 'How success is measured (assumed metrics)'].map((item, i) => (
                   <div key={i} className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl text-center">
                     <p className="text-[10px] font-black text-amber-700 uppercase">{item}</p>
                   </div>
                ))}
              </div>
              <p className="text-xs font-bold text-zinc-400 italic">Hiring managers care more about how you think, not whether assumptions are perfect.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-zinc-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-sm">4</span>
              Map the User Journey (This Is the Backbone)
            </h3>
            <div className="bg-zinc-900 text-white p-10 rounded-[3rem] space-y-8 border-t-8 border-amber-500">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Entry point', icon: Smartphone },
                  { label: 'Signup', icon: UserCheck },
                  { label: 'First action', icon: Zap },
                  { label: 'Core usage', icon: Activity },
                  { label: 'Retention', icon: RefreshCw },
                  { label: 'Monetisation', icon: DollarSign }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-amber-400">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                 <p className="text-xs font-black uppercase text-zinc-500">At each step, ask:</p>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-zinc-300">
                   <li>• What is the user trying to do here?</li>
                   <li>• What friction exists?</li>
                   <li>• Where might users drop off?</li>
                   <li>• Is the value clear at this moment?</li>
                 </ul>
              </div>
            </div>
          </div>

          {/* Step 5 & 6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
               <h3 className="text-xl font-black text-zinc-900 flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-sm">5</span>
                 Identify 1–2 High-Impact Problems
               </h3>
               <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
                 <p className="text-xs font-medium text-zinc-500">Do not list 10 issues. Pick 1 or 2 that:</p>
                 <ul className="space-y-2 text-[11px] font-bold text-zinc-700">
                   <li className="flex gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Affect a core metric</li>
                   <li className="flex gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Are realistic for a startup stage</li>
                   <li className="flex gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Clearly hurt user experience</li>
                 </ul>
               </div>
            </div>
            <div className="space-y-4">
               <h3 className="text-xl font-black text-zinc-900 flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-sm">6</span>
                 Do Root Cause Analysis
               </h3>
               <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
                 <p className="text-xs font-medium text-zinc-500">Think Like a PM. For each problem:</p>
                 <ul className="space-y-2 text-[11px] font-bold text-zinc-700">
                   <li className="flex gap-2"><ArrowRight className="w-3.5 h-3.5 text-indigo-500" /> Is it UX, messaging, or incentive?</li>
                   <li className="flex gap-2"><ArrowRight className="w-3.5 h-3.5 text-indigo-500" /> Use “5 Whys” or JTBD</li>
                   <li className="flex gap-2"><ArrowRight className="w-3.5 h-3.5 text-indigo-500" /> Identify technical/cost constraints</li>
                 </ul>
               </div>
            </div>
          </div>

          {/* Step 7, 8, 9 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] space-y-3">
                <h4 className="font-black text-zinc-900 text-sm">7. Propose a Solution</h4>
                <p className="text-[10px] font-medium text-zinc-500">What will change, where it appears, and why it solves the root cause (with trade-offs).</p>
             </div>
             <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] space-y-3">
                <h4 className="font-black text-zinc-900 text-sm">8. Define Success Metrics</h4>
                <p className="text-[10px] font-medium text-zinc-500">Primary, Secondary, and Guardrail metrics. Non-negotiable.</p>
             </div>
             <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] space-y-3">
                <h4 className="font-black text-zinc-900 text-sm">9. Risks & Assumptions</h4>
                <p className="text-[10px] font-medium text-zinc-500">Call out what could be wrong and what you'd validate next. Shows maturity.</p>
             </div>
          </div>
        </div>
      </section>

      <section className="space-y-8 pt-10 border-t border-zinc-100">
        <h2 className="text-3xl font-black text-zinc-900 flex items-center gap-4">
           <Users2 className="text-amber-600" />
           How Aspiring PMs Should Reach Out to Startup Founders
        </h2>
        <p className="text-sm font-medium text-zinc-600 leading-relaxed max-w-2xl">
          Doing a strong case study is only half the work. The other half is getting it in front of the right person — usually the founder or early product leader.
        </p>

        <div className="space-y-10">
           {/* Outreach 1 */}
           <div className="space-y-4">
              <h3 className="text-xl font-black text-zinc-900">1. Identify the Right Founder to Reach Out To</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-4">
                    <p className="text-xs font-black uppercase text-zinc-400">Target:</p>
                    <ul className="space-y-3">
                       {['Founders of early-stage startups (Seed–Series A)', 'Solo PMs or founders acting as PMs', 'Companies actively building & iterating'].map((item, i) => (
                          <li key={i} className="text-xs font-bold text-zinc-700 flex gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" /> {item}
                          </li>
                       ))}
                    </ul>
                 </div>
                 <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-4">
                    <p className="text-xs font-black uppercase text-zinc-400">Best places to find them:</p>
                    <div className="flex flex-wrap gap-2">
                       {['LinkedIn', 'Twitter / X', 'Company “About” pages', 'YC / AngelList'].map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-zinc-100 text-zinc-500 rounded-lg text-[10px] font-black">{tag}</span>
                       ))}
                    </div>
                    <p className="text-[10px] font-black text-indigo-600 italic">Rule: If the company has 20 PMs, your message won’t stand out.</p>
                 </div>
              </div>
           </div>

           {/* Outreach 2 & 3 */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <h3 className="text-xl font-black text-zinc-900">2. Do NOT Ask for a Job First</h3>
                 <div className="p-8 bg-rose-50 border border-rose-100 rounded-[2.5rem] space-y-4">
                    <p className="text-xs font-black text-rose-700 italic">Avoid:</p>
                    <p className="text-[11px] font-bold text-rose-800/60 line-through">“I’m looking for a PM role, can you help?”</p>
                    <p className="text-[11px] font-bold text-rose-800/60 line-through">“Please review my resume”</p>
                    <p className="text-xs font-medium text-rose-700">Founders don’t respond to asks without value. Instead, lead with insight, thoughtfulness, and respect.</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <h3 className="text-xl font-black text-zinc-900">3. Lead With Your Case Study (Not Yourself)</h3>
                 <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] space-y-4">
                    <p className="text-xs font-black text-emerald-700">Your message should show:</p>
                    <ul className="text-[11px] font-bold text-emerald-800 space-y-2">
                       <li>• You’ve used their product</li>
                       <li>• You’ve thought deeply about a real problem</li>
                       <li>• You’re not guessing — you’re analysing</li>
                    </ul>
                 </div>
              </div>
           </div>

           {/* Outreach 4 Template */}
           <div className="space-y-4">
              <h3 className="text-xl font-black text-zinc-900 flex items-center gap-3">
                 <FileText className="text-amber-600" />
                 4. Founder Outreach Message Structure
              </h3>
              <div className="bg-zinc-950 text-white p-10 rounded-[3rem] space-y-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10"><MessageSquare className="w-32 h-32 text-white" /></div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">LinkedIn / Email Message Template</p>
                 <div className="p-8 bg-white/5 border border-white/10 rounded-2xl font-medium text-zinc-300 leading-relaxed text-sm">
                    Hi &lt;Name&gt;,<br/><br/>
                    I’ve been using &lt;Product Name&gt; and recently did a short product case study on it, focused on &lt;specific area: onboarding / activation / retention&gt;.<br/><br/>
                    I noticed &lt;1 concrete insight or problem&gt;, and proposed a solution that could potentially impact &lt;metric&gt;.<br/><br/>
                    I’m not asking for anything — just wanted to share the analysis in case it’s useful.<br/><br/>
                    Here’s the link: &lt;Notion / PDF&gt;<br/><br/>
                    Either way, really admire what you’re building.<br/><br/>
                    — &lt;Your Name&gt;
                 </div>
                 <div className="flex gap-4">
                    {['Clear signal of effort', 'No pressure', 'Founder curiosity triggered'].map((point, i) => (
                       <span key={i} className="text-[10px] font-black text-amber-400">✓ {point}</span>
                    ))}
                 </div>
              </div>
           </div>

           {/* Outreach 5, 6, 7 */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] space-y-4">
                 <h4 className="font-black text-zinc-900 text-sm">5. Founder-Friendly</h4>
                 <p className="text-[10px] font-medium text-zinc-500 leading-relaxed">Be 5–10 mins max. Start with a TL;DR. Highlight 1 core insight. Show trade-offs.</p>
              </div>
              <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] space-y-4">
                 <h4 className="font-black text-zinc-900 text-sm">6. If They Reply</h4>
                 <p className="text-[10px] font-medium text-zinc-500 leading-relaxed">Be concise. Clarify thinking. Ask smart questions about constraints. Don't ask "Are you hiring?" yet.</p>
              </div>
              <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] space-y-4">
                 <h4 className="font-black text-zinc-900 text-sm">7. Turn Into Opportunity</h4>
                 <p className="text-[10px] font-medium text-zinc-500 leading-relaxed">Say: "I really enjoyed understanding how you think. If you’re ever looking for someone who enjoys this kind of problem-solving..."</p>
              </div>
           </div>
        </div>
      </section>

      <section className="bg-rose-50 p-10 rounded-[3rem] border border-rose-100">
        <h2 className="text-xl font-black text-rose-900 mb-6 flex items-center gap-3">
          <AlertTriangle className="text-rose-600" />
          8. Common Mistakes to Avoid
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             'Sending the same generic message to 50 founders',
             'Writing long emotional messages',
             'Over-polishing the case study and never sharing it',
             'Asking for referrals immediately'
           ].map((text, i) => (
             <li key={i} className="flex gap-3 items-center bg-white p-4 rounded-2xl border border-rose-100 text-xs font-bold text-rose-700 shadow-sm">
                <X className="w-4 h-4 text-rose-500" /> {text}
             </li>
           ))}
        </ul>
      </section>

      <section className="bg-zinc-950 text-white p-10 rounded-[3rem] border-t-8 border-amber-500">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-400">Remember</h4>
            <p className="text-lg font-black italic text-zinc-300 leading-relaxed">
              "Founders respect clarity, initiative, and good thinking — not perfection."
            </p>
          </div>
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
const DollarSign = ({ className }: { className?: string }) => (
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
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const UserCheck = ({ className }: { className?: string }) => (
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
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

export default Day38Content;