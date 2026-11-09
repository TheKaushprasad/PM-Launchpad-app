const env = (import.meta as unknown as { env?: Record<string, string | boolean> }).env || {};

// Voice interviews with Priya (she speaks through Sarvam, which costs credits) are hidden on the live
// site. They always work in local dev (`npm run dev`); set VITE_AI_INTERVIEW_ENABLED=true in Vercel and
// redeploy to turn voice on live. The server reads the same variable.
export const isAiInterviewEnabled = env.DEV === true || env.VITE_AI_INTERVIEW_ENABLED === 'true';

// Text interviews with Priya (type or record answers, she replies in text) are live for everyone.
// To switch them off, set VITE_AI_INTERVIEW_TEXT_ENABLED=false in Vercel and redeploy; the server
// reads the same variable.
export const isAiInterviewTextEnabled = env.DEV === true || env.VITE_AI_INTERVIEW_TEXT_ENABLED !== 'false';

// The interview studio is open when either mode is.
export const isAnyAiInterviewEnabled = isAiInterviewEnabled || isAiInterviewTextEnabled;

// The PM → AI PM course is local-only for now: on in `npm run dev`, off on the live site.
// To launch it, set VITE_AI_PM_COURSE_ENABLED=true in Vercel and redeploy. Written with full
// `import.meta.env.X` paths so the build can drop the course code entirely when it is off.
export const isAiPmCourseEnabled = import.meta.env.DEV || import.meta.env.VITE_AI_PM_COURSE_ENABLED === 'true';

// The PM Assignment Solver is live. To switch it off, set VITE_ASSIGNMENT_SOLVER_ENABLED=false in
// Vercel and redeploy; the server reads the same variable.
export const isAssignmentSolverEnabled = import.meta.env.VITE_ASSIGNMENT_SOLVER_ENABLED !== 'false';

// Product Buddy (peer mock-interview matching) is live. To switch it off, set
// VITE_PRODUCT_BUDDY_ENABLED=false in Vercel and redeploy; the server reads the same variable.
export const isProductBuddyEnabled = import.meta.env.VITE_PRODUCT_BUDDY_ENABLED !== 'false';

// Payments (Dodo Payments, test mode) are local-only for now: on in `npm run dev`, off on the live
// site. To try them on a Vercel preview, set VITE_PAYMENTS_ENABLED=true for Preview only and redeploy;
// the server reads the same variable.
export const isPaymentsEnabled = import.meta.env.DEV || import.meta.env.VITE_PAYMENTS_ENABLED === 'true';
