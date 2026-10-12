import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  AlertCircle, ArrowLeft, Briefcase, CheckCircle2, Clock, Lightbulb, ListChecks, Loader2, Send, Sparkles, Target, TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { getProjectById } from '../../data/realWorldProjects';
import { ProjectSubmissionRecord } from '../../types/projects';
import { DIFFICULTY_STYLES, useProjectSubmissions } from './ProjectsHub';

const MIN_CHARS = 200;
const MAX_CHARS = 20000;

const draftKey = (projectId: string) => `project_draft_${projectId}`;

const BriefSection: React.FC<{ title: string; icon: React.ElementType; items: string[] }> = ({ title, icon: Icon, items }) => (
  <div>
    <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
      <Icon className="w-3.5 h-3.5" />
      {title}
    </h3>
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="text-sm text-slate-700 leading-relaxed flex gap-2">
          <span className="text-brand-400 mt-1.5 w-1 h-1 rounded-full bg-brand-400 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const FeedbackView: React.FC<{ record: ProjectSubmissionRecord }> = ({ record }) => {
  const { feedback } = record;
  const scoreColor =
    feedback.overallScore >= 80 ? 'text-emerald-600' : feedback.overallScore >= 60 ? 'text-amber-600' : 'text-rose-600';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-brand-600 font-extrabold text-xs tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            AI FEEDBACK
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">{feedback.verdict}</h2>
          <p className="text-xs text-slate-400 mt-0.5">Submitted {new Date(record.submittedAt).toLocaleString()}</p>
        </div>
        <div className="text-right">
          <div className={`text-4xl font-black ${scoreColor}`}>{feedback.overallScore}</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">out of 100</div>
        </div>
      </div>

      <p className="text-sm text-slate-700 leading-relaxed">{feedback.summary}</p>

      {feedback.criteria.length > 0 && (
        <div className="space-y-3">
          {feedback.criteria.map((c) => (
            <div key={c.name}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-bold text-slate-800">{c.name}</span>
                <span className="font-black text-slate-900">{c.score}/10</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-brand-500 rounded-full" style={{ width: `${c.score * 10}%` }} />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{c.comment}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <BriefSection title="Strengths" icon={CheckCircle2} items={feedback.strengths} />
        <BriefSection title="Improve" icon={TrendingUp} items={feedback.improvements} />
      </div>
      {feedback.nextSteps.length > 0 && <BriefSection title="Next steps" icon={Target} items={feedback.nextSteps} />}
      {record.saved === false && (
        <p className="text-xs text-amber-600">This feedback could not be saved to your profile, so copy anything you want to keep.</p>
      )}
    </div>
  );
};

export const ProjectDetail: React.FC = () => {
  const { projectId = '' } = useParams();
  const project = getProjectById(projectId);
  const { user } = useAuth();
  const { submissions, setSubmissions } = useProjectSubmissions();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [draft, setDraft] = useState<string>(() => {
    try {
      return localStorage.getItem(draftKey(projectId)) || '';
    } catch {
      return '';
    }
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const existing = project ? submissions[project.id] : undefined;

  // Prefill the editor with the last submitted answer when there is no local draft
  useEffect(() => {
    if (existing && !draft) setDraft(existing.submission);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existing]);

  useEffect(() => {
    try {
      localStorage.setItem(draftKey(projectId), draft);
    } catch {
      // ignore storage errors
    }
  }, [draft, projectId]);

  if (!project) return <Navigate to="/projects" replace />;

  const handleSubmit = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    if (draft.trim().length < MIN_CHARS) {
      setError(`Please write at least ${MIN_CHARS} characters before submitting.`);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/projects/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ projectId: project.id, submission: draft }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Feedback generation failed');
      setSubmissions((prev) => ({ ...prev, [project.id]: data as ProjectSubmissionRecord }));
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
        redirectTo={`/projects/${project.id}`}
        onSuccess={() => setAuthModalOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 pb-20"
      >
        <Link to="/projects" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 mb-4">
          <ArrowLeft className="w-3.5 h-3.5" />
          All projects
        </Link>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Brief */}
          <section className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 h-fit">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-600">{project.category}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${DIFFICULTY_STYLES[project.difficulty]}`}>
                  {project.difficulty}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{project.title}</h1>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="inline-flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{project.company}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />~{project.estimatedHours}h</span>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Context</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{project.context}</p>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Your task</h3>
              <p className="text-sm text-slate-900 font-semibold leading-relaxed">{project.problemStatement}</p>
            </div>
            <BriefSection title="Deliverables" icon={ListChecks} items={project.deliverables} />
            <BriefSection title="Constraints" icon={AlertCircle} items={project.constraints} />
            <BriefSection title="How you'll be scored" icon={Target} items={project.evaluationCriteria} />
            <BriefSection title="Hints" icon={Lightbulb} items={project.hints} />
          </section>

          {/* Submission + feedback */}
          <section className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
              <h2 className="text-lg font-extrabold text-slate-900 mb-1">Your submission</h2>
              <p className="text-xs text-slate-500 mb-3">
                Write your answer as you would for a real take-home assignment. Use headings for each deliverable. Your draft is saved in this browser as you type.
              </p>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, MAX_CHARS))}
                rows={18}
                placeholder={project.deliverables.map((d, i) => `${i + 1}. ${d}\n`).join('\n')}
                className="w-full rounded-xl border border-slate-200 p-4 text-sm text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 resize-y font-mono"
              />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                <span className={`text-xs ${draft.trim().length < MIN_CHARS ? 'text-slate-400' : 'text-emerald-600'}`}>
                  {draft.trim().length.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters (min {MIN_CHARS})
                </span>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-zinc-800 disabled:opacity-60 transition-colors"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {submitting ? 'Reviewing...' : !user ? 'Sign in to get feedback' : existing ? 'Resubmit for feedback' : 'Submit for AI feedback'}
                </button>
              </div>
              {error && (
                <div className="mt-3 flex items-start gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl p-3">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  {error}
                </div>
              )}
            </div>

            {existing && <FeedbackView record={existing} />}
          </section>
        </div>
      </motion.div>
    </>
  );
};
