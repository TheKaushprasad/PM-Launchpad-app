import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Target, Search, CheckCircle2, 
  TrendingUp, Shield, Zap, Eye, FileText, Award, Layers,
  ChevronRight, Star
} from 'lucide-react';

interface LinkedInLandingProps {
  onStartAudit: () => void;
  onSeeExample: () => void;
}

export const LinkedInLanding: React.FC<LinkedInLandingProps> = ({
  onStartAudit,
  onSeeExample
}) => {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950 p-8 sm:p-12 md:p-16 text-white border border-zinc-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-indigo-300 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered LinkedIn Auditor & Personal Branding Coach</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
            Turn Your LinkedIn Profile Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#79BAEC] to-indigo-400">Recruiter Magnet.</span>
          </h1>

          <p className="text-zinc-300 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
            Get an AI-powered LinkedIn audit, discover what's holding your profile back, and get specific, recruiter-proven recommendations to maximize inbound interview requests.
          </p>

          {/* Primary & Secondary CTA */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              id="cta-optimise-linkedin"
              onClick={onStartAudit}
              className="px-6 sm:px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm tracking-wide flex items-center gap-2.5 shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Optimise My LinkedIn</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="cta-see-example-audit"
              onClick={onSeeExample}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm tracking-wide flex items-center gap-2 transition-all"
            >
              <Eye className="w-4 h-4 text-indigo-300" />
              <span>See Example Audit</span>
            </button>
          </div>

          {/* Value pill highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100-Point Scoring</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Keyword Gap Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Action + Result Rewrites</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>3-Day Action Plan</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-indigo-600">
            <Zap className="w-3.5 h-3.5" />
            Simple 4-Step Process
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            How The LinkedIn Optimiser Works
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            From publicly accessible data to a prioritized blueprint in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              step: '01',
              title: 'Paste Profile Details',
              desc: 'Copy and paste your full LinkedIn profile text or PDF resume.',
              icon: FileText
            },
            {
              step: '02',
              title: 'Target Role Matching',
              desc: 'We benchmark against current hiring filters for your chosen career track.',
              icon: Search
            },
            {
              step: '03',
              title: '8-Dimension Audit',
              desc: 'Comprehensive 100-point rubric assessing clarity, metrics, and searchability.',
              icon: Award
            },
            {
              step: '04',
              title: 'Fix & Rewrite',
              desc: 'Copy high-impact rewrites and follow the day-by-day action plan.',
              icon: TrendingUp
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="p-6 bg-white rounded-3xl border border-zinc-200/80 shadow-sm space-y-3 relative hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-sm">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-zinc-200">{item.step}</span>
              </div>
              <h3 className="font-bold text-zinc-900 text-base">{item.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Analyse: 8 Categories Breakdown */}
      <section className="space-y-8 bg-zinc-50 rounded-[2.5rem] p-8 sm:p-12 border border-zinc-200/70">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-indigo-600">
            <Layers className="w-3.5 h-3.5" />
            Recruiter-Grade Scoring Rubric
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            What We Analyse (100 Points Total)
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            Evaluated by the same standards executive hiring managers and ATS algorithms use.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Headline', points: '15 Pts', desc: 'Keyword density, value proposition, and differentiation.', badge: 'High Impact' },
            { name: 'About Section', points: '15 Pts', desc: 'Narrative hook, 10-second readability, and quantified proof.', badge: 'High Impact' },
            { name: 'Experience', points: '20 Pts', desc: 'Action + Context + Result bullet formulation and metrics.', badge: 'Highest Weight' },
            { name: 'Skills & Keywords', points: '10 Pts', desc: 'Target-role keyword coverage vs recruiter search queries.', badge: 'ATS Critical' },
            { name: 'Education & Certs', points: '5 Pts', desc: 'Relevance, completeness, and credential positioning.', badge: 'Credibility' },
            { name: 'Completeness', points: '10 Pts', desc: 'Visual media, custom banner, and featured portfolio assets.', badge: 'Engagement' },
            { name: 'Personal Branding', points: '10 Pts', desc: 'Niche positioning and 10-second recruiter impression test.', badge: 'Perception' },
            { name: 'Discoverability', points: '10 Pts', desc: 'Boolean search indexing and keyword gap optimization.', badge: 'Search Rank' }
          ].map((cat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-zinc-900 text-sm">{cat.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-[11px]">
                  {cat.points}
                </span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed">{cat.desc}</p>
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  {cat.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Sample Preview Card */}
      <section className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-zinc-200 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Sample Audit Snapshot</span>
            <h3 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              See How We Diagnose Weaknesses
            </h3>
          </div>
          <button
            onClick={onSeeExample}
            className="self-start sm:self-auto px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <span>Open Full Interactive Sample</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sample Score Card */}
          <div className="bg-zinc-900 text-white p-6 rounded-3xl flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Overall Score</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-[#79BAEC]">78</span>
                <span className="text-xl text-zinc-400 font-bold">/100</span>
                <span className="ml-auto px-2.5 py-1 bg-amber-500/20 text-amber-300 font-black text-xs rounded-lg">
                  Grade B+
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-medium pt-2">
                "Good profile — a few high-leverage changes will dramatically improve recruiter inbound messages."
              </p>
            </div>
            <div className="space-y-1.5 pt-4 border-t border-white/10 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Headline</span>
                <span className="font-bold text-white">12/15</span>
              </div>
              <div className="flex justify-between">
                <span>Experience</span>
                <span className="font-bold text-white">16/20</span>
              </div>
              <div className="flex justify-between">
                <span>Discoverability</span>
                <span className="font-bold text-white">9/10</span>
              </div>
            </div>
          </div>

          {/* Sample Diagnosis Card */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700">What's Holding It Back</span>
              <p className="text-xs font-bold text-rose-950">
                Headline states: "Product Manager at Acme" — tells recruiters what your job is, but fails to indicate your domain (B2B SaaS / AI) or measurable business scale.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">Recruiter-Optimized Rewrite</span>
              <p className="text-xs font-bold text-emerald-950 font-mono">
                "Product Manager | B2B SaaS & AI Workflows | 0-to-1 Product Discovery | Scaled ARR from $2M to $8M"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700">Keyword Gap Flagged</span>
              <p className="text-xs text-sky-950 font-medium">
                Missing 4 high-frequency recruiter search filters: <strong className="font-bold">Product Discovery, A/B Testing, User Research, GTM</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
