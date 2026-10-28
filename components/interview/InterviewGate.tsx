import React, { useState } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useInterviewAccess, hasEvalConsent, setEvalConsent } from '../../lib/interviewAccess';
import { Button } from '../ui/button';
import { InterviewHub } from './InterviewHub';
import { InterviewComingSoon } from './InterviewComingSoon';

// Decides what /interview-studio shows: the studio when the interview is on (or the user is an
// invited tester), otherwise Coming soon. Testers agree once to share their interviews before starting.
export const InterviewGate: React.FC = () => {
  const { user } = useAuth();
  const access = useInterviewAccess(user?.uid);
  const [agreed, setAgreed] = useState(() => hasEvalConsent(user?.uid));
  const [ticked, setTicked] = useState(false);

  if (access.loading && !access.enabled) {
    return (
      <div className="flex items-center justify-center py-24" role="status">
        <Loader2 className="size-6 animate-spin text-brand-600" />
      </div>
    );
  }
  if (!access.enabled) return <InterviewComingSoon />;

  if (access.tester && user && !agreed && !hasEvalConsent(user.uid)) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-16 sm:py-20">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <ShieldCheck className="size-6" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">You're an early tester</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Thanks for trying the AI mock interview</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            To make Priya a better interviewer, we save the full text of your interviews (what you and Priya said, and
            your scorecard). Only the founder reads them. Your name and email are removed before an interview is used to
            test the AI.
          </p>
          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-slate-800">
            <input
              type="checkbox"
              className="mt-0.5 size-4 accent-emerald-700"
              checked={ticked}
              onChange={(e) => setTicked(e.target.checked)}
            />
            <span>I agree that my interviews are saved and used to improve the AI interviewer.</span>
          </label>
          <Button
            variant="brand"
            className="mt-6 w-full"
            disabled={!ticked}
            onClick={() => {
              setEvalConsent(user.uid, true);
              setAgreed(true);
            }}
          >
            Start practising
          </Button>
        </div>
      </div>
    );
  }

  return <InterviewHub />;
};
