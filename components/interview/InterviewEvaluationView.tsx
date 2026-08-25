import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  RotateCcw, 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Target, 
  Brain, 
  MessageSquare,
  BarChart3
} from 'lucide-react';
import { InterviewEvaluation, InterviewScenario, InterviewerPersona } from '../../types/interview';
import { INTERVIEWER_PERSONAS } from '../../data/interviewPersonas';

interface InterviewEvaluationViewProps {
  evaluation: InterviewEvaluation;
  scenario: InterviewScenario;
  onRetry: () => void;
  onNewInterview: () => void;
}

export const InterviewEvaluationView: React.FC<InterviewEvaluationViewProps> = ({
  evaluation,
  scenario,
  onRetry,
  onNewInterview
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedPillar, setExpandedPillar] = useState<string | null>('clarification');
  const [showBenchmark, setShowBenchmark] = useState<boolean>(true);

  const persona = INTERVIEWER_PERSONAS.find(p => p.id === evaluation.personaId) || INTERVIEWER_PERSONAS[0];

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'Strong Yes':
        return { color: 'bg-emerald-500 text-white border-emerald-600', shadow: 'shadow-emerald-500/20' };
      case 'Lean Yes':
        return { color: 'bg-blue-500 text-white border-blue-600', shadow: 'shadow-blue-500/20' };
      case 'Lean No':
        return { color: 'bg-amber-500 text-white border-amber-600', shadow: 'shadow-amber-500/20' };
      default:
        return { color: 'bg-rose-500 text-white border-rose-600', shadow: 'shadow-rose-500/20' };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 65) return 'text-blue-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-rose-600';
  };

  const handleCopySummary = () => {
    const text = `
🎯 PM Mock Interview Scorecard — ${evaluation.scenarioTitle}
Overall Score: ${evaluation.overallScore}/100 (${evaluation.verdict})
Interviewer: ${persona.name} (${persona.role})
Duration: ${Math.floor(evaluation.durationSeconds / 60)} minutes

Scores Breakdown:
1. Clarification & Scope: ${evaluation.pillars.clarification.score}/20
2. Framework & Decomposition: ${evaluation.pillars.framework.score}/20
3. Analytical Rigor: ${evaluation.pillars.analyticalRigor.score}/20
4. Communication: ${evaluation.pillars.communication.score}/20
5. Synthesis & Recommendation: ${evaluation.pillars.synthesis.score}/20

Top Strengths:
${evaluation.topStrengths.map(s => `• ${s}`).join('\n')}

Critical Growth Areas:
${evaluation.criticalGrowthAreas.map(g => `• ${g}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const verdictStyle = getVerdictBadge(evaluation.verdict);

  const pillarsList = [
    { key: 'clarification', data: evaluation.pillars.clarification, icon: Target },
    { key: 'framework', data: evaluation.pillars.framework, icon: Brain },
    { key: 'analyticalRigor', data: evaluation.pillars.analyticalRigor, icon: BarChart3 },
    { key: 'communication', data: evaluation.pillars.communication, icon: MessageSquare },
    { key: 'synthesis', data: evaluation.pillars.synthesis, icon: CheckCircle2 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4 py-8 space-y-10"
    >
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onNewInterview}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 font-bold text-xs uppercase tracking-wider hover:bg-zinc-50 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Scenario Hub
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 font-bold text-xs uppercase tracking-wider hover:bg-zinc-50 shadow-sm transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied Scorecard!" : "Share Summary"}
          </button>
          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-black shadow-lg shadow-zinc-200 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Retry Scenario
          </button>
        </div>
      </div>

      {/* Hero Grand Scorecard */}
      <div className="relative rounded-[3rem] p-8 md:p-12 bg-zinc-950 text-white shadow-2xl overflow-hidden border border-zinc-800">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Main Score Gauge */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border shadow-lg ${verdictStyle.color} ${verdictStyle.shadow}`}>
                Verdict: {evaluation.verdict}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider">
                {scenario.company} • {scenario.track.toUpperCase()}
              </span>
              <span className="text-xs text-zinc-400 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" /> {Math.floor(evaluation.durationSeconds / 60)}m {evaluation.durationSeconds % 60}s
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              {evaluation.scenarioTitle}
            </h1>

            <p className="text-zinc-400 text-sm md:text-base font-medium leading-relaxed max-w-2xl">
              {evaluation.transcriptSummary}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <img src={persona.avatarImage} alt={persona.name} className="w-8 h-8 rounded-full border border-white/20 object-cover" />
              <div className="text-xs">
                <span className="text-zinc-300 font-bold">{persona.name}</span>
                <span className="text-zinc-500 ml-1">({persona.role})</span>
              </div>
            </div>
          </div>

          {/* Grand Score Display */}
          <div className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-zinc-900/90 border border-zinc-800 backdrop-blur-md text-center">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Overall Score</span>
            <div className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              {evaluation.overallScore}
            </div>
            <span className="text-xs font-bold text-zinc-500 mt-1">out of 100 points</span>
          </div>
        </div>
      </div>

      {/* 5-Pillar Scorecard Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Rubric Evaluation (5 Pillars)</h2>
            <p className="text-xs text-zinc-500 font-medium">Standardized L5/L6 competency breakdown (20 points per pillar).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {pillarsList.map(({ key, data, icon: Icon }) => {
            const isExpanded = expandedPillar === key;
            const percent = (data.score / data.maxScore) * 100;

            return (
              <div 
                key={key}
                className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm overflow-hidden transition-all duration-300"
              >
                <div 
                  onClick={() => setExpandedPillar(isExpanded ? null : key)}
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg text-zinc-900 tracking-tight">{data.name}</h3>
                      <p className="text-xs text-zinc-500 font-medium line-clamp-1">{data.feedback}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                    <div className="text-right">
                      <span className={`text-2xl font-black ${getScoreColor(data.score * 5)}`}>
                        {data.score}
                      </span>
                      <span className="text-xs font-bold text-zinc-400"> / {data.maxScore}</span>
                    </div>

                    <div className="w-24 h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          percent >= 80 ? 'bg-emerald-500' : percent >= 60 ? 'bg-indigo-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="p-1.5 rounded-full bg-zinc-100 text-zinc-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-zinc-100 grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50/30">
                    {/* Strengths */}
                    <div className="space-y-3">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Strengths & Demonstrated Behaviors
                      </span>
                      <ul className="space-y-2">
                        {data.strengths.map((s, idx) => (
                          <li key={idx} className="text-xs font-semibold text-zinc-700 flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-100 shadow-sm">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvements */}
                    <div className="space-y-3">
                      <span className="text-xs font-black uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-600" /> Growth Opportunities
                      </span>
                      <ul className="space-y-2">
                        {data.improvements.map((imp, idx) => (
                          <li key={idx} className="text-xs font-semibold text-zinc-700 flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-100 shadow-sm">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Strengths & Critical Growth Areas Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-50/40 rounded-[2.5rem] p-8 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h3 className="font-extrabold text-xl tracking-tight">Top Performed Strengths</h3>
          </div>
          <ul className="space-y-3">
            {evaluation.topStrengths.map((str, i) => (
              <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-emerald-200/60 shadow-sm text-xs font-bold text-zinc-800 leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black shrink-0 text-[10px]">
                  {i+1}
                </span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50/40 rounded-[2.5rem] p-8 border border-amber-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            <h3 className="font-extrabold text-xl tracking-tight">Critical Traps & Growth Areas</h3>
          </div>
          <ul className="space-y-3">
            {evaluation.criticalGrowthAreas.map((area, i) => (
              <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-amber-200/60 shadow-sm text-xs font-bold text-zinc-800 leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black shrink-0 text-[10px]">
                  {i+1}
                </span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Exemplar Benchmark Answer & Recommended Structural Breakdown */}
      {evaluation.exemplarAnswer && (
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-zinc-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-zinc-900 tracking-tight">
                  Exemplar Benchmark Breakdown
                </h3>
                <p className="text-xs text-zinc-500 font-medium">How an L6 Senior PM structures this exact case.</p>
              </div>
            </div>

            <button
              onClick={() => setShowBenchmark(!showBenchmark)}
              className="px-4 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-700 transition-colors"
            >
              {showBenchmark ? "Collapse" : "Expand"}
            </button>
          </div>

          {showBenchmark && (
            <div className="space-y-6 pt-4 border-t border-zinc-100">
              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs font-medium text-indigo-950 leading-relaxed">
                <strong className="block font-black text-sm text-indigo-900 mb-1">Strategic Approach:</strong>
                {evaluation.exemplarAnswer.recommendedApproach}
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-zinc-500">Step-by-Step Architecture</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {evaluation.exemplarAnswer.stepByStepStructure.map((step, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                      <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 block">
                        {step.step}
                      </span>
                      <p className="text-xs text-zinc-700 font-medium leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {evaluation.exemplarAnswer.interviewerSecretNotes && (
                <div className="p-4 rounded-2xl bg-zinc-900 text-zinc-300 text-xs font-mono space-y-1">
                  <span className="text-amber-400 font-bold text-[10px] uppercase tracking-widest block">Interviewer Calibration Notes:</span>
                  <p>{evaluation.exemplarAnswer.interviewerSecretNotes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bottom Floating Navigation */}
      <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onNewInterview}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-100 hover:bg-zinc-200 font-bold text-sm text-zinc-800 transition-colors text-center"
        >
          Select Another Scenario
        </button>

        <button
          onClick={onRetry}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-100 transition-all text-center flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Retake Mock Session
        </button>
      </div>
    </motion.div>
  );
};
