import React from 'react';
import { ArrowLeft, Layers } from 'lucide-react';
import { CandidateLevel, InterviewEvaluation } from '../../types/interview';
import { getLevelConfig, getTrackConfig, normalizeVerdict } from '../../data/interviewTracks';
import { computeLoopVerdict, LoopRoundPlan } from '../../lib/interviewLoop';

interface LoopSummaryProps {
  plan: LoopRoundPlan[];
  results: InterviewEvaluation[];
  level: CandidateLevel;
  onDone: () => void;
}

const VERDICT_STYLES: Record<string, string> = {
  'Strong Hire': 'bg-emerald-500 text-white',
  'Hire': 'bg-blue-500 text-white',
  'No Hire': 'bg-amber-500 text-white',
  'Strong No Hire': 'bg-rose-500 text-white'
};

/** Combined hiring-committee view after the last round of a full loop. */
export const LoopSummary: React.FC<LoopSummaryProps> = ({ plan, results, level, onDone }) => {
  const decision = computeLoopVerdict(results);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <button
        onClick={onDone}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 font-bold text-xs uppercase tracking-wider hover:bg-zinc-50"
      >
        <ArrowLeft className="w-4 h-4" /> Scenario Hub
      </button>

      <div className="rounded-3xl p-8 bg-zinc-950 text-white space-y-4">
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" /> Full loop • {getLevelConfig(level).label}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className={`px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider ${VERDICT_STYLES[decision.verdict]}`}>
            {decision.verdict}
          </span>
          <span className="text-3xl font-black tabular-nums">{decision.averageScore}<span className="text-base text-zinc-500">/100 average</span></span>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed">{decision.reason}</p>
      </div>

      <div className="space-y-3">
        {plan.map((round, i) => {
          const result = results[i];
          const verdict = result && result.status !== 'insufficient' ? normalizeVerdict(result.verdict) : null;
          return (
            <div key={round.scenario.id} className="p-4 rounded-2xl bg-white border border-zinc-200 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[11px] font-black uppercase tracking-wider text-indigo-600">
                  Round {i + 1} • {getTrackConfig(round.scenario.track).label} • {round.persona.name}
                </div>
                <div className="text-sm font-bold text-zinc-900 truncate">{round.scenario.title}</div>
              </div>
              <div className="text-right shrink-0">
                {verdict ? (
                  <>
                    <div className="text-lg font-black text-zinc-900 tabular-nums">{result.overallScore}/100</div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${VERDICT_STYLES[verdict]}`}>{verdict}</span>
                  </>
                ) : (
                  <span className="text-xs font-bold text-zinc-400">Not scored</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-zinc-500">Each round's full scorecard is saved in Past Scorecards.</p>
    </div>
  );
};
