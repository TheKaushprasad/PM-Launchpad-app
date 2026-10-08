export type InterviewTrack = 'rca' | 'guesstimate' | 'strategy' | 'design';
export type InterviewMode = 'avatar' | 'voice' | 'chat';
export type InterviewerPersonaId = 'maya' | 'alex' | 'priya' | 'marcus';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type HiringVerdict = 'Strong Yes' | 'Lean Yes' | 'Lean No' | 'Strong No';

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
  verdict: HiringVerdict;
  confidence?: 'High' | 'Medium' | 'Low' | string;
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
  verdict: HiringVerdict;
  durationMinutes: number;
  scoringVersion?: string;
}
