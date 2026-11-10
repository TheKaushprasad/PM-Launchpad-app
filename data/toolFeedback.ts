// Quick feedback after a tool gives its result: 1-5 stars, what helped, what didn't, an optional note.
// Shared by the browser card (components/feedback/ToolFeedbackCard.tsx) and the server (server/toolFeedback.ts),
// which only keeps options from these lists. The Assignment Solver has its own card (lib/assignmentSolver/types.ts).

export type FeedbackTool = 'resume' | 'linkedin' | 'strategy' | 'prd';

export const TOOL_FEEDBACK: Record<FeedbackTool, { title: string; good: string[]; bad: string[] }> = {
  resume: {
    title: 'How useful was this resume audit?',
    good: ['Clear score', 'Specific fixes', 'Good bullet rewrites', 'Job match check', 'Fast'],
    bad: ['Too generic', 'Score felt wrong', 'Missed parts of my resume', 'Rewrites not usable', 'Too slow'],
  },
  linkedin: {
    title: 'How useful was this LinkedIn audit?',
    good: ['Clear score', 'Useful headline ideas', 'Good About rewrite', 'Keyword tips', 'Fast'],
    bad: ['Too generic', 'Score felt wrong', 'Profile not read properly', 'Rewrites not usable', 'Too slow'],
  },
  strategy: {
    title: 'How useful was this strategy?',
    good: ['Clear structure', 'Sharp insights', 'Realistic metrics', 'Nice design', 'Easy to export'],
    bad: ['Too generic', 'Wrong assumptions', 'Too long', 'Design looks off', 'Too slow'],
  },
  prd: {
    title: 'How useful was this PRD review?',
    good: ['Fair scores', 'Specific fixes', 'Explains the why', 'Good example', 'Fast'],
    bad: ['Too generic', 'Scores felt wrong', 'Missed what I wrote', 'Hard to act on', 'Too slow'],
  },
};

export const FEEDBACK_TOOLS = Object.keys(TOOL_FEEDBACK) as FeedbackTool[];
export const TOOL_FEEDBACK_COMMENT_MAX = 1000;
