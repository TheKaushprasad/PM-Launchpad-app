import React from 'react';
// Added Bot icon to fix "Cannot find name" error on line 85
import { 
  Rocket, Briefcase, Zap, Search, Target, MessageSquare, 
  MonitorPlay, ExternalLink, Info, CheckCircle, Eye, Layers,
  Sparkles, FileText, Link, Award, ShieldCheck, Share2, Bot
} from 'lucide-react';

export const Day40Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 40: Building CV and optimising your linkedin 🚀</h1>
      
      <section className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Job ready</span>
          <h2 className="text-xl font-black text-amber-900">Crafting Your Professional Identity</h2>
          <p className="text-sm font-medium text-amber-800 leading-relaxed italic">
            "Your CV and LinkedIn are not historical documents; they are marketing assets designed to get you the 'Yes' for the next round."
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <FileText className="text-amber-600" />
          Building a Winning PM CV
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a 
            href="https://believed-mist-f1a.notion.site/CV-template-for-APM-14551b6fbd0e80779ba5f5ade6f00fc5" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 p-6 rounded-3xl bg-white border border-zinc-100 hover:border-amber-200 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Link className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">CV Blueprint</p>
              <p className="text-sm font-bold text-zinc-700 group-hover:text-amber-600">Refer this template to build your cv</p>
            </div>
          </a>
          <a 
            href="https://resumeworded.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 p-6 rounded-3xl bg-white border border-zinc-100 hover:border-amber-200 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">ATS Optimization</p>
              <p className="text-sm font-bold text-zinc-700 group-hover:text-indigo-600">Check ATS score here & ensure above 85</p>
            </div>
          </a>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Share2 className="text-amber-600" />
          LinkedIn Profile Optimization
        </h2>
        <div className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200 space-y-6">
           <h3 className="text-xl font-black text-zinc-900">How to use the Expert Prompt?</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-black">1</div>
                 <p className="text-xs font-bold text-zinc-700">Copy paste the prompt in chatgpt</p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-black">2</div>
                 <p className="text-xs font-bold text-zinc-700">Paste your LinkedinProfile data</p>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-lg font-black text-zinc-900 flex items-center gap-2">
             <Sparkles className="text-amber-500 w-5 h-5" />
             The Recruiter-Grade Analysis Prompt
           </h3>
           <div className="bg-zinc-950 text-white p-8 md:p-12 rounded-[3rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Bot className="w-48 h-48" /></div>
              <div className="relative z-10 font-mono text-[11px] md:text-xs text-zinc-400 leading-relaxed max-h-[500px] overflow-y-auto no-scrollbar">
                <p className="text-amber-400 mb-4 font-black">COPY THIS ENTIRE TEXT:</p>
                <div className="space-y-4 whitespace-pre-wrap">
{`You are a Senior Recruiter + LinkedIn Search Algorithm Expert with deep experience hiring for Product, Tech, Data, and Business roles. Your job is to first collect the required LinkedIn profile data, then perform a brutally honest, recruiter-grade analysis focused on: • Recruiter search visibility • Hiring manager shortlisting • Credibility & seniority signaling • Inbound opportunity generation Think like a recruiter who spends 7–10 seconds scanning a profile before deciding whether to shortlist or move on. 

STEP 0 — ASK FOR INPUT (DO THIS FIRST, DO NOT ANALYZE YET) 
Start by saying exactly this and nothing else: **“Hey, let’s analyze your LinkedIn profile. Please copy-paste the following sections from your profile (no LinkedIn URL): • Headline • About section • Experience (role titles + descriptions) • Skills • Education • Certifications • Activity (posts / comments / engagement — optional) Paste whatever you have. If something is missing, I’ll call it out as a weak signal.”** Do not provide feedback, assumptions, or suggestions until the user pastes their profile data. 

ROLE & MINDSET (APPLIES AFTER INPUT IS RECEIVED) 
Once the user shares the data, analyze it like a recruiter deciding whether to shortlist or move on. Your goal is not to make the profile sound nice. Your goal is to increase recruiter replies and interview callbacks. 

TONE & RULES (NON-NEGOTIABLE) 
• Be direct, blunt, and no-nonsense 
• Be constructively critical, not polite 
• Never assume or invent data 
• If information is missing, explicitly say: “Cannot evaluate due to missing signal” 
Prioritize: • Outcomes > responsibilities • Metrics > buzzwords • Clarity > storytelling Avoid vague advice like “add more impact.” Be specific and tactical. 

ANALYSIS FRAMEWORK (USE EXACTLY THIS STRUCTURE) 
Step 1: Headline Analysis (Highest Priority) 
Evaluate: • Keyword density & recruiter search relevance • Role clarity (title + domain + scope) • 3-second scan effectiveness • Seniority & credibility signals 
Output: • Headline score (0–10) • What works • What fails • 3 rewritten headlines: – SEO-first – Impact-driven – Clean & recruiter-friendly 

Step 2: About Section Analysis 
Evaluate: • First 2 lines (above the fold) • Role clarity & value proposition • Metrics, scale, outcomes • Skimmability • Signal-to-noise ratio 
Output: • About score (0–10) • Missing elements • Red flags • Rewritten About section (150–250 words, recruiter-optimized) 

Step 3: Experience Section Analysis 
For each role, evaluate: • Action vs responsibility dumping • Quantification • Ownership & decision-making • Product / business thinking 
Output: • Experience score (0–10) • Common issues across roles • Rewrite ONE role using: Context → Action → Outcome → Metric 

Step 4: Skills & Keyword Audit 
Evaluate: • Relevance to target roles • Hard skills vs low-signal skills • Redundant / outdated skills • Missing recruiter keywords 
Output: • Skills score (0–10) • Remove • Add • Top 10 pinned skills (ranked) 

Step 5: Credibility & Trust Signals 
Analyze: • Certifications (relevance > quantity) • Brand names & tools • Education positioning • Community / mentoring / content (if available) 
Output: • Credibility score (0–10) • Strengths • Weaknesses • Authority-building actions 

Step 6: Activity & Personal Brand (If Available) 
If data exists, analyze: • Posting consistency • Signal vs noise • Alignment with target roles 
If not, explicitly say: “Cannot evaluate personal brand due to missing activity data.” 
Output (if applicable): • Personal brand score (0–10) • Content gaps • 3 high-ROI post ideas 

Step 7: Overall Recruiter Readiness 
Provide: • Overall profile score (0–100) • Shortlisting probability: Low / Medium / High • Top 5 fixes with maximum ROI (ranked, actionable)`}
                </div>
              </div>
           </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-10 rounded-[3rem] border-t-8 border-amber-500">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-400">Remember</h4>
            <p className="text-lg font-black italic text-zinc-300 leading-relaxed">
              "Recruiters spending time on your profile are looking for reasons to rule you OUT. Don't give them any. Focus on metrics, brand names, and clear outcomes."
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

export default Day40Content;