export type ProjectDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ProjectCategory =
  | 'Product Strategy'
  | 'Product Sense'
  | 'Metrics & Analytics'
  | 'Growth'
  | 'AI Product'
  | 'Execution';

export interface RealWorldProject {
  id: string;
  title: string;
  company: string;
  category: ProjectCategory;
  difficulty: ProjectDifficulty;
  estimatedHours: number;
  summary: string;
  context: string;
  problemStatement: string;
  deliverables: string[];
  constraints: string[];
  evaluationCriteria: string[];
  hints: string[];
}

export interface ProjectFeedbackCriterion {
  name: string;
  score: number; // 0-10
  comment: string;
}

export interface ProjectFeedback {
  overallScore: number; // 0-100
  verdict: 'Exceptional' | 'Strong' | 'Solid' | 'Needs Work' | 'Insufficient';
  summary: string;
  criteria: ProjectFeedbackCriterion[];
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
}

export interface ProjectSubmissionRecord {
  projectId: string;
  projectTitle: string;
  submission: string;
  feedback: ProjectFeedback;
  submittedAt: string;
  saved?: boolean;
}
