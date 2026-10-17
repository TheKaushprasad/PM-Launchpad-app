import React from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, ChevronRight, ExternalLink, FileText } from 'lucide-react';
import { assignmentPath, findAssignment, ON_SITE_ASSIGNMENTS } from '../../data/assignments';
import { BriefMarkdown } from './BriefMarkdown';

export const AssignmentDetail: React.FC = () => {
  const { slug = '' } = useParams();
  const a = findAssignment(slug);
  if (!a) return <Navigate to="/resources?view=assignments" replace />;

  const index = ON_SITE_ASSIGNMENTS.indexOf(a);
  const more = [...ON_SITE_ASSIGNMENTS.slice(index + 1), ...ON_SITE_ASSIGNMENTS.slice(0, index)].slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 pb-20"
    >
      <header className="relative w-full bg-gradient-to-r from-[#032A1F] via-[#043C2C] to-[#064E3B] rounded-3xl p-7 sm:p-9 text-white overflow-hidden shadow-2xl border border-[#065F46]/60 mb-6">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-gradient-to-bl from-brand-600/25 via-brand-600/15 to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/4 translate-x-1/4" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs font-semibold text-slate-300 mb-3">
            <Link to="/resources" className="hover:text-white transition-colors">Resources</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link to="/resources?view=assignments" className="hover:text-white transition-colors">PM Assignments</Link>
          </nav>
          <p className="text-xs font-black uppercase tracking-widest text-brand-300 mb-2">
            {a.company} · {a.position}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight leading-[1.1]">{a.title}</h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{a.summary}</p>
        </div>
      </header>

      <article className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-xs">
        <BriefMarkdown source={a.body} />
      </article>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-500">
        <p>Shared by the community. If you own this brief and want it removed, email contact@thenoobpm.com.</p>
        <a href={a.url} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 font-bold text-zinc-600 hover:text-brand-700 shrink-0">
          Original on Google Drive <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="mt-6 rounded-2xl bg-[#043C2C] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-extrabold text-lg">Get feedback on a real PM case</p>
          <p className="text-sm text-slate-300">Solve a real-world product project and get AI feedback on your answer.</p>
        </div>
        <Link
          to="/projects"
          className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#043C2C] font-bold text-sm hover:bg-brand-50 transition-colors"
        >
          Try a project <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {more.length > 0 && (
        <section className="pt-8">
          <h2 className="text-lg font-extrabold text-zinc-900 mb-3">More PM assignments</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {more.map((m) => (
              <li key={m.slug}>
                <Link
                  to={assignmentPath(m)}
                  className="group flex items-start gap-3 p-4 bg-white rounded-2xl border border-zinc-200/80 hover:border-brand-300 hover:shadow-md transition-all"
                >
                  <FileText className="w-5 h-5 mt-0.5 shrink-0 text-zinc-400 group-hover:text-brand-600" />
                  <div className="min-w-0">
                    <p className="font-bold text-zinc-900 leading-snug group-hover:text-brand-700">{m.title}</p>
                    <p className="text-xs text-zinc-500 mt-1">{m.company} · {m.position}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </motion.div>
  );
};
