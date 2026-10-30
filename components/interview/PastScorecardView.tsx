import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { AlertTriangle, ArrowLeft, Bot, Lightbulb, Loader2, MessageSquare, RotateCcw, User } from 'lucide-react';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { INTERVIEW_SCENARIOS } from '../../data/interviewScenarios';
import { ACTIVE_INTERVIEWER } from '../../data/interviewPersonas';
import { getTrackConfig, PILLAR_KEYS } from '../../data/interviewTracks';
import { InterviewEvaluation, InterviewScenario, InterviewSessionHistory } from '../../types/interview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { InterviewEvaluationView } from './InterviewEvaluationView';

interface PastScorecardViewProps {
  session: InterviewSessionHistory;
  onBack: () => void;
  onRetake: (scenario: InterviewScenario) => void;
}

type SavedMessage = { role: string; text: string };

const UNSCORED_REASONS: Record<string, string> = {
  exited: 'You left this interview before it was scored.',
  too_short: 'This interview was too short to score fairly (it needs at least 3 full answers).',
  scoring_failed: "Scoring didn't finish for this interview."
};

/** Rebuilds the scorecard from the saved session, or null if it was saved in an older format. */
function toEvaluation(d: any): InterviewEvaluation | null {
  if (d?.status === 'unscored' || !d?.pillars || !PILLAR_KEYS.every((k) => d.pillars[k])) return null;
  return {
    status: 'complete',
    id: d.sessionId || d.id,
    scenarioId: d.scenarioId,
    scenarioTitle: d.scenarioTitle || '',
    track: d.track,
    personaId: d.personaId || ACTIVE_INTERVIEWER.id,
    completedAt: d.createdAt || '',
    durationSeconds: d.durationSeconds || (d.durationMinutes || 0) * 60,
    overallScore: d.overallScore ?? d.score ?? 0,
    verdict: d.verdict,
    confidence: d.confidence,
    level: d.level,
    mode: d.mode,
    hintsUsed: d.hintsUsed || 0,
    hireBarNotes: d.hireBarNotes || [],
    candidateTurnCount: d.candidateTurnCount,
    pillars: d.pillars,
    topStrengths: d.topStrengths || [],
    criticalGrowthAreas: d.criticalGrowthAreas || [],
    exemplarAnswer: d.exemplarAnswer || null,
    transcriptSummary: d.transcriptSummary || d.evaluationSummary || '',
    scoringVersion: d.scoringVersion
  } as InterviewEvaluation;
}

function Conversation({ messages }: { messages: SavedMessage[] | null }) {
  if (!messages || messages.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
        The conversation wasn't saved for this interview. Interviews from 30 Oct 2026 onwards keep the full conversation.
      </div>
    );
  }
  const interviewerName = ACTIVE_INTERVIEWER.name.split(' ')[0];
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-4 sm:p-6 space-y-3">
      {messages.map((m, i) => {
        if (m.role === 'system_hint') {
          return (
            <div key={i} className="mx-auto max-w-lg flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
              <Lightbulb className="mt-0.5 size-3.5 shrink-0" /> <span><span className="font-bold">Hint:</span> {m.text}</span>
            </div>
          );
        }
        const isYou = m.role === 'candidate';
        return (
          <div key={i} className={`flex items-start gap-2.5 ${isYou ? 'flex-row-reverse' : ''}`}>
            <div className={`size-8 shrink-0 rounded-full flex items-center justify-center ${isYou ? 'bg-zinc-900 text-white' : 'bg-brand-50 text-brand-700'}`}>
              {isYou ? <User className="size-4" /> : <Bot className="size-4" />}
            </div>
            <div className={`max-w-[85%] sm:max-w-[75%] ${isYou ? 'text-right' : ''}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5">{isYou ? 'You' : interviewerName}</div>
              <div className={`inline-block text-left whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${isYou ? 'bg-zinc-900 text-white rounded-tr-sm' : 'bg-zinc-100 text-zinc-900 rounded-tl-sm'}`}>
                {m.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** A past interview from Past Scorecards: the scorecard (when scored) and the full conversation. */
export const PastScorecardView: React.FC<PastScorecardViewProps> = ({ session, onBack, onRetake }) => {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setError('Sign in to see your saved interviews.');
      return;
    }
    getDoc(doc(db, 'users', user.uid, 'interview_sessions', session.id))
      .then((snap) => (snap.exists() ? setData(snap.data()) : setError("This interview isn't saved to your account.")))
      .catch(() => setError("Couldn't load this interview. Check your connection and try again."));
  }, [user, session.id]);

  const scenario: InterviewScenario | undefined = INTERVIEW_SCENARIOS.find((s) => s.id === session.scenarioId);

  const header = (
    <div className="max-w-5xl mx-auto px-4 pt-6 flex flex-wrap items-center justify-between gap-3">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 font-bold text-xs uppercase tracking-wider hover:bg-zinc-50 shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" /> Past Scorecards
      </button>
      {scenario && (
        <button
          onClick={() => onRetake(scenario)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Practice this case again
        </button>
      )}
    </div>
  );

  if (error) {
    return (
      <div>
        {header}
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" /> {error}
          </div>
        </div>
      </div>
    );
  }
  if (!data) {
    return (
      <div>
        {header}
        <div className="flex justify-center py-16"><Loader2 className="size-6 animate-spin text-zinc-400" /></div>
      </div>
    );
  }

  const evaluation = toEvaluation(data);
  const transcript: SavedMessage[] | null = Array.isArray(data.transcript) ? data.transcript : null;
  const unscored = data.status === 'unscored';

  return (
    <div>
      {header}
      <div className="max-w-5xl mx-auto px-4 pt-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-brand-600">
            {getTrackConfig(session.track).shortLabel} • {session.company}
          </span>
          {unscored && (
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200">Not scored</span>
          )}
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-zinc-900 mt-1">{session.scenarioTitle}</h1>
        <p className="text-xs text-zinc-500 mt-0.5">{session.date} • {session.durationMinutes} mins</p>
        {unscored && (
          <p className="mt-3 text-sm text-zinc-600">{UNSCORED_REASONS[data.unscoredReason] || UNSCORED_REASONS.exited}</p>
        )}
      </div>

      <Tabs defaultValue={evaluation ? 'scorecard' : 'conversation'} className="pt-4">
        <div className="max-w-5xl mx-auto px-4">
          <TabsList>
            {evaluation && <TabsTrigger value="scorecard">Scorecard</TabsTrigger>}
            <TabsTrigger value="conversation">
              <MessageSquare className="size-4" /> Conversation{transcript ? ` (${transcript.filter((m) => m.role !== 'system_hint').length})` : ''}
            </TabsTrigger>
          </TabsList>
        </div>
        {evaluation && (
          <TabsContent value="scorecard">
            <InterviewEvaluationView
              evaluation={evaluation}
              scenario={scenario || ({ track: session.track, company: session.company } as InterviewScenario)}
              onRetry={() => (scenario ? onRetake(scenario) : onBack())}
              onNewInterview={onBack}
            />
          </TabsContent>
        )}
        <TabsContent value="conversation">
          <div className="max-w-5xl mx-auto px-4 py-6">
            {!evaluation && !unscored && (
              <p className="mb-3 text-xs text-zinc-500">
                Score {session.score}/100. This scorecard was saved in an older format, so only the summary is kept.
                {data.transcriptSummary ? ` ${data.transcriptSummary}` : ''}
              </p>
            )}
            <Conversation messages={transcript} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
