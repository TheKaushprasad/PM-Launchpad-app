// Options for the feedback card shown while an interview is being scored.
// The server only accepts these ids (server/interviewFeedback.ts), plus free text under "Other".

export interface FeedbackOption {
  id: string;
  label: string;
}

export const FEEDBACK_LIKED_OPTIONS: FeedbackOption[] = [
  { id: 'realistic_questions', label: 'Realistic questions' },
  { id: 'follow_ups', label: 'Follow-ups felt real' },
  { id: 'priya_voice', label: "Priya's voice" },
  { id: 'hints_helped', label: 'Hints helped' },
  { id: 'pm_tools', label: 'PM tools' },
  { id: 'easy_to_use', label: 'Easy to use' }
];

export const FEEDBACK_DISLIKED_OPTIONS: FeedbackOption[] = [
  { id: 'slow_replies', label: 'Slow replies or lag' },
  { id: 'voice_not_heard', label: "My voice wasn't picked up" },
  { id: 'unclear_questions', label: 'Questions were unclear' },
  { id: 'too_hard', label: 'Too hard' },
  { id: 'too_easy', label: 'Too easy' },
  { id: 'felt_robotic', label: 'Felt robotic' }
];

export const FEEDBACK_OTHER_MAX_CHARS = 500;

export interface InterviewFeedbackInput {
  rating: number | null;
  liked: string[];
  likedOther: string;
  disliked: string[];
  dislikedOther: string;
}

export const feedbackLabel = (id: string) =>
  [...FEEDBACK_LIKED_OPTIONS, ...FEEDBACK_DISLIKED_OPTIONS].find((o) => o.id === id)?.label || id;
