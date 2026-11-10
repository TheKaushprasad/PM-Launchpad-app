import type { Express } from 'express';
import { getAppFirestore, isFirebaseAdminConfigured } from '../services/firebaseAdmin';
import { getVerifiedUser } from './security';
import { FEEDBACK_TOOLS, TOOL_FEEDBACK, TOOL_FEEDBACK_COMMENT_MAX, type FeedbackTool } from '../data/toolFeedback';

/**
 * Optional feedback on a tool's result (Resume Auditor, LinkedIn Optimiser, AI Product Strategy, PRD Coach).
 * Only the answers are kept, never the resume, profile or document.
 *
 *   tool_feedback/{tool}_{uid}_{resultId}  { tool, uid, resultId, rating, good, bad, comment, createdAt }
 *
 * Written only by the server (Admin SDK); the Firestore rules have no match for it, so browsers can't read or write it.
 */

const COLLECTION = 'tool_feedback';
const cleanId = (raw: unknown) => (typeof raw === 'string' ? raw.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80) : '');

export function registerToolFeedbackRoutes(app: Express) {
  app.post(['/api/tool-feedback', '/api/tool-feedback/'], async (req, res) => {
    const user = await getVerifiedUser(req);
    if (!user) return res.status(401).json({ error: 'Please sign in to send feedback.' });
    const body = req.body || {};
    const tool = body.tool as FeedbackTool;
    if (!FEEDBACK_TOOLS.includes(tool)) return res.status(400).json({ error: 'Unknown tool.' });
    const rating = Math.round(Number(body.rating));
    if (!(rating >= 1 && rating <= 5)) return res.status(400).json({ error: 'Pick a star rating first.' });
    const options = TOOL_FEEDBACK[tool];
    const pick = (v: unknown, allowed: string[]) => [...new Set((Array.isArray(v) ? v : []).filter((x): x is string => allowed.includes(x)))];
    const resultId = cleanId(body.resultId) || `t${Date.now()}`;
    const feedback = {
      tool,
      uid: user.uid,
      resultId,
      rating,
      good: pick(body.good, options.good),
      bad: pick(body.bad, options.bad),
      comment: typeof body.comment === 'string' ? body.comment.trim().slice(0, TOOL_FEEDBACK_COMMENT_MAX) : '',
      createdAt: new Date().toISOString(),
    };
    try {
      if (isFirebaseAdminConfigured()) {
        await getAppFirestore().collection(COLLECTION).doc(`${tool}_${user.uid}_${resultId}`).set(feedback);
      }
      res.json({ ok: true });
    } catch (err: any) {
      console.error('[Tool feedback] Could not save:', err?.message || err);
      res.status(500).json({ error: 'Could not save your feedback. Please try again.' });
    }
  });
}
