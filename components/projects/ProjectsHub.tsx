import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { ArrowRight, Briefcase, CheckCircle2, Clock } from 'lucide-react';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { REAL_WORLD_PROJECTS } from '../../data/realWorldProjects';
import { ProjectDifficulty, ProjectSubmissionRecord } from '../../types/projects';

export const DIFFICULTY_STYLES: Record<ProjectDifficulty, string> = {
  Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
  Advanced: 'bg-rose-50 text-rose-700 border-rose-200',
};

export const useProjectSubmissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Record<string, ProjectSubmissionRecord>>({});

  useEffect(() => {
    if (!user) {
      setSubmissions({});
      return;
    }
    let cancelled = false;
    getDocs(collection(db, 'users', user.uid, 'project_submissions'))
      .then((snap) => {
        if (cancelled) return;
        const next: Record<string, ProjectSubmissionRecord> = {};
        snap.forEach((d) => {
          next[d.id] = d.data() as ProjectSubmissionRecord;
        });
        setSubmissions(next);
      })
      .catch((err) => console.warn('[Projects] Could not load submissions:', err?.message));
    return () => {
      cancelled = true;
    };
  }, [user]);

  return { submissions, setSubmissions };
};

export const ProjectsHub: React.FC = () => {
  const { submissions } = useProjectSubmissions();
  const [category, setCategory] = useState<string>('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(REAL_WORLD_PROJECTS.map((p) => p.category)))],
    []
  );
  const projects = category === 'All' ? REAL_WORLD_PROJECTS : REAL_WORLD_PROJECTS.filter((p) => p.category === category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 pb-20"
    >

      <header className="relative w-full bg-gradient-to-r from-[#032A1F] via-[#043C2C] to-[#064E3B] rounded-3xl p-7 sm:p-9 text-white overflow-hidden shadow-2xl border border-[#065F46]/60 mb-7">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-gradient-to-bl from-purple-600/25 via-indigo-600/15 to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/4 translate-x-1/4" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold mb-3 tracking-tight leading-[1.08]">
            Build a portfolio <br />
            <span className="text-[#6EE7B7]">that proves you think like a PM.</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Pick a case brief, write your answer like a real take-home assignment, and get structured AI feedback scored against the same criteria hiring managers use.
          </p>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              category === c
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => {
          const submission = submissions[project.id];
          return (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group bg-white rounded-2xl border border-slate-200 p-5 flex flex-col hover:shadow-lg hover:border-indigo-200 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">{project.category}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${DIFFICULTY_STYLES[project.difficulty]}`}>
                  {project.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-1">{project.title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                {project.company}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">{project.summary}</p>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                {submission ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    Scored {submission.feedback?.overallScore ?? '-'}/100
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <Clock className="w-3.5 h-3.5" />~{project.estimatedHours}h
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors">
                  {submission ? 'View feedback' : 'Start project'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};
