import { CornsilkSection } from '../../components/CornsilkSection';
import React from 'react';
import { 
  Briefcase, MessageSquare, Send, History, ExternalLink, 
  CheckCircle, Zap, Globe, Sparkles, UserPlus, Info
} from 'lucide-react';

export const Day41Content = () => {
  return (
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-amber-50 p-4 sm:p-5 rounded-2xl border border-amber-100">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Job ready</span>
          <p className="text-lg font-black text-amber-900 leading-relaxed italic">
            "Your application is just the first step. Where you apply and how you leverage your network determines whether you get the interview."
          </p>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Globe className="text-amber-600" />
          Platforms to apply PM jobs
        </h2>
        <div className="bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-sm">
          <div className="flex flex-wrap gap-3">
            {[
              "Naukri", "Linkedin", "Hirist", "Wellfound", "Glassdoor Jobs", 
              "IIM jobs", "Instahyre", "Ycombinator jobs"
            ].map((platform) => (
              <span key={platform} className="px-5 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-bold text-zinc-700 shadow-sm hover:border-amber-200 transition-colors">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <UserPlus className="text-amber-600" />
          How to ask for referral
        </h2>
        <div className="bg-zinc-950 text-white p-4 sm:p-5 rounded-2xl space-y-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 sm:p-5 opacity-10"><MessageSquare className="w-32 h-32 text-white" /></div>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">The Referral Template</p>
           <div className="p-4 sm:p-5 bg-white/5 border border-white/10 rounded-2xl font-medium text-zinc-300 leading-relaxed text-sm">
              Hi [Name],<br/><br/>
              Hope you’re doing well!<br/><br/>
              I recently came across the [Position Name] role ([Job Link/ID]) at [Company Name], and it aligns perfectly with my skills in [mention relevant skills] and passion for [highlight industry/area]. Additionally, my achievement of [mention a relevant accomplishment, e.g., "leading a project that improved customer satisfaction by 20%" or "winning the 'Tech Talk' competition"] demonstrates my ability to contribute effectively to this role.<br/><br/>
              I’d truly appreciate your support with a referral for this opportunity. Please let me know if you need my resume or further details.<br/><br/>
              Thanks so much for considering this!<br/><br/>
              Best regards,<br/>
              [Your Name]
           </div>
           <div className="flex gap-4">
              {['Highlight Skills', 'Mention Accomplishment', 'Clear Ask'].map((point, i) => (
                 <span key={i} className="text-[10px] font-black text-amber-400">✓ {point}</span>
              ))}
           </div>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <History className="text-amber-600" />
          Follow-up Tip
        </h2>
        <div className="bg-indigo-50 border border-indigo-100 p-4 sm:p-5 rounded-2xl space-y-4">
          <p className="text-sm font-bold text-indigo-900">If no response within 48 hours, send:</p>
          <div className="p-4 bg-white rounded-2xl border border-indigo-200 font-medium text-zinc-700 text-sm leading-relaxed italic">
            "Hi [Name], just following up on my previous message about the [Position Name] role. I’d be grateful for any guidance or support regarding a referral. Thank you!"
          </div>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Sparkles className="text-amber-600" />
          How to get shortlisted?
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <a 
            href="https://www.linkedin.com/posts/kaushalprasadkaush7_jobhunt-careeradvice-shortlisting-activity-7256570552532836352-eNjd?utm_source=share&utm_medium=member_desktop&rcm=ACoAACcjST0B1uRjC1RlnTFh2iI-0IVfZ52FWW0" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 p-4 rounded-3xl bg-white border border-zinc-100 hover:border-amber-200 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <ExternalLink className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Resource</p>
              <p className="text-sm font-bold text-zinc-700 group-hover:text-amber-600 leading-relaxed">Refer this detailed guide on shortlisting strategies by Kaushal Prasad</p>
            </div>
          </a>
        </div>
      </section>

            <CornsilkSection
        title="High-Leverage Job Search & Referral Tactics"
        titleColor="blue"
        items={[
                {
                          "subtitle": "Strategic Networking & Cold Outreach",
                          "headerColor": "blue",
                          "description": "Reach out to PMs and engineering managers with personalized, value-first messages referencing specific challenges their product faces."
                },
                {
                          "subtitle": "Target Company Tiers & Focus",
                          "headerColor": "red",
                          "description": "Segment target companies into Tier 1 (dream), Tier 2 (strong growth), and Tier 3 (practice) to sequence interview readiness effectively."
                },
                {
                          "subtitle": "Referral Conversion Optimization",
                          "headerColor": "blue",
                          "description": "Provide referrers with tailored 2-sentence blurbs, resume links, and job IDs to make submitting internal referrals effortless and fast."
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

export default Day41Content;