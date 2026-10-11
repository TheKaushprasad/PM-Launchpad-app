export type InterviewTrack = 'rca' | 'guesstimate' | 'strategy' | 'design' | 'metrics' | 'behavioral' | 'ai';
/** Interviews are voice-only. Kept as a type so saved sessions and props stay explicit. */
export type InterviewMode = 'voice';
export type InterviewerPersonaId = 'maya' | 'alex' | 'priya' | 'marcus';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type HiringVerdict = 'Strong Hire' | 'Hire' | 'No Hire' | 'Strong No Hire';
/** Verdict names saved before scoring v3. Still found on older history items. */
export type LegacyHiringVerdict = 'Strong Yes' | 'Lean Yes' | 'Lean No' | 'Strong No';
export type CandidateLevel = 'apm' | 'pm' | 'spm';

export interface InterviewerPersona {
  id: InterviewerPersonaId;
  name: string;
  role: string;
  companyBackground: string;
  avatarColor: string;
  avatarImage: string;
  voiceGender: 'female' | 'male';
  tagline: string;
  description: string;
  styleTrait: string;
  interviewerPhilosophy: string;
}

export interface InterviewScenario {
  id: string;
  track: InterviewTrack;
  title: string;
  company: string;
  companyColor: string;
  companyBadge: string;
  difficulty: DifficultyLevel;
  targetDurationMinutes: number; // 15 or 30
  problemStatement: string;
  contextBackground: string;
  candidateBrief: string[];
  keyEvaluationMetrics: string[];
  suggestedFramework: string;
  benchmarkOutline: {
    clarificationQuestions: string[];
    coreHypothesesOrSegments: string[];
    analyticalPath: string[];
    synthesisModel: string;
  };
  /** Facts the interviewer may hand out, one at a time, when the candidate asks for the matching data. */
  dataPack?: string[];
  /** A mid-case twist the interviewer introduces once during the deep dive. */
  curveball?: string;
}

export interface ConversationMessage {
  id: string;
  role: 'interviewer' | 'candidate' | 'system_hint';
  text: string;
  timestamp: string;
  isSpoken?: boolean;
}

export interface EvidenceItem {
  quote: string;
  turnIndex: number;
}

export interface GroundingStats {
  total: number;
  valid: number;
  dropped: number;
  echoed?: number;
  reindexed?: number;
}

export interface RubricPillarScore {
  name: string;
  score: number; // 0-20
  rawScore?: number; // 1-5 raw score
  maxScore: number; // 20
  feedback: string;
  evidence?: (string | EvidenceItem)[];
  whyTheyEarnedThisScore?: string;
  whyTheyDidNotScoreHigher?: string;
  strengths: string[];
  improvements: string[];
}

export interface InterviewEvaluation {
  status?: 'complete' | 'insufficient';
  message?: string;
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  track: InterviewTrack;
  personaId: InterviewerPersonaId;
  completedAt: string;
  durationSeconds: number;
  overallScore: number; // 0-100
  verdict: HiringVerdict | LegacyHiringVerdict;
  confidence?: 'High' | 'Medium' | 'Low' | string;
  level?: CandidateLevel;
  hintsUsed?: number;
  /** Plain-language notes when the hiring bar lowered the verdict (e.g. a pillar scored 1). */
  hireBarNotes?: string[];
  candidateTurnCount?: number;
  pillars: {
    clarification: RubricPillarScore;
    framework: RubricPillarScore;
    analyticalRigor: RubricPillarScore;
    communication: RubricPillarScore;
    synthesis: RubricPillarScore;
  };
  topStrengths: string[];
  criticalGrowthAreas: string[];
  exemplarAnswer: {
    recommendedApproach: string;
    stepByStepStructure: { step: string; detail: string }[];
    interviewerSecretNotes: string;
    highestLeverageImprovement?: {
      focusArea: string;
      currentBehavior: string;
      targetBehavior: string;
      practiceDrill: string;
    };
  };
  transcriptSummary: string;
  saved?: boolean;

  // Drift Tracking & Audit Fields
  scoringVersion?: string;
  promptVersion?: string;
  modelId?: string;
  temperature?: number;
  groundingStats?: GroundingStats;
  injectionAttempt?: boolean;
  latencyMs?: number;
  retryCount?: number;
}

export interface InterviewSessionHistory {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  company: string;
  track: InterviewTrack;
  date: string;
  score: number;
  verdict: HiringVerdict | LegacyHiringVerdict;
  durationMinutes: number;
  scoringVersion?: string;
  level?: CandidateLevel;
  /** Raw 1-5 pillar scores, for the progress view. Missing on sessions saved before scoring v3. */
  pillarScores?: Partial<Record<PillarKey, number>>;
  createdAt?: string;
}

export type PillarKey = 'clarification' | 'framework' | 'analyticalRigor' | 'communication' | 'synthesis';
