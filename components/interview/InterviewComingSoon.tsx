import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

// Shown instead of the interview studio on the live site while the AI interview is being finished.
export const InterviewComingSoon: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
      <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        <Sparkles className="h-6 w-6" />
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Coming soon</p>
      <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">AI Mock Interview Studio</h1>
      <p className="mt-4 text-slate-600 leading-relaxed">
        We're polishing a voice interview with Priya, your AI interviewer, so you can practise real PM
        interview questions and get honest, structured feedback. It will be back here very soon.
      </p>
      <p className="mt-3 text-sm text-slate-500">Invited to test it early? Sign in with the email address you were invited with.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-8 inline-flex items-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
      >
        Back to home
      </button>
    </div>
  );
};
