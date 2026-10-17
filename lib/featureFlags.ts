const env = (import.meta as unknown as { env?: Record<string, string | boolean> }).env || {};

// The AI interview is hidden on the live site until it is ready. It always works in local dev
// (`npm run dev`); set VITE_AI_INTERVIEW_ENABLED=true in Vercel and redeploy to turn it on live.
export const isAiInterviewEnabled = env.DEV === true || env.VITE_AI_INTERVIEW_ENABLED === 'true';

// The PM → AI PM course is local-only for now: on in `npm run dev`, off on the live site.
// To launch it, set VITE_AI_PM_COURSE_ENABLED=true in Vercel and redeploy. Written with full
// `import.meta.env.X` paths so the build can drop the course code entirely when it is off.
export const isAiPmCourseEnabled = import.meta.env.DEV || import.meta.env.VITE_AI_PM_COURSE_ENABLED === 'true';
