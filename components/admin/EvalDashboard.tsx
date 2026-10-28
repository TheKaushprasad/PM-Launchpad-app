import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, FolderOpen, Loader2, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { DashboardCaseRow, InterviewerRunSummary, ScoringRunSummary } from '../../server/evalDashboard';

// Local eval dashboard: shows the reports that `npm run eval` and `npm run eval:interviewer` save in
// eval/results/. Only in `npm run dev` (App.tsx), and the server route only answers on localhost
// (server/evalDashboard.ts). It only reads saved files, so opening it never calls Gemini.

type Run = ScoringRunSummary | InterviewerRunSummary;
interface EvalData { resultsDir: string; runs: Run[]; unreadable: string[] }

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);

const PassMark = ({ passed, label }: { passed: boolean; label?: string }) =>
  passed ? (
    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium"><CheckCircle2 className="size-4" />{label ?? 'Pass'}</span>
  ) : (
    <span className="inline-flex items-center gap-1 text-rose-700 font-medium"><XCircle className="size-4" />{label ?? 'Fail'}</span>
  );

const Tile = ({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4">
    <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</div>
    <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
    {sub && <div className="mt-0.5 text-xs text-slate-500">{sub}</div>}
  </div>
);

/** Rows of the chosen track (or every row) in one scoring run. */
const rowsFor = (run: ScoringRunSummary, track: string) => (track === 'all' ? run.rows : run.rows.filter((r) => r.track === track));

/** Pass rate per run, oldest first, with a marker wherever the eval version changes. */
function TrendChart({ runs, track }: { runs: ScoringRunSummary[]; track: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const points = runs
    .slice()
    .reverse()
    .map((run) => {
      const rows = rowsFor(run, track);
      return { run, cases: rows.length, passed: rows.filter((r) => r.passed).length };
    })
    .filter((p) => p.cases > 0);
  if (points.length < 2) {
    return <p className="text-sm text-slate-500">The trend line appears once there are two or more runs{track !== 'all' ? ` with ${track} cases` : ''}.</p>;
  }

  const W = 760, H = 220, L = 40, R = 16, T = 28, B = 28;
  const x = (i: number) => L + (i * (W - L - R)) / (points.length - 1);
  const y = (v: number) => T + ((100 - v) * (H - T - B)) / 100;
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(pct(p.passed, p.cases))}`).join(' ');
  const h = hover !== null ? points[hover] : null;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Cases passed per run, in percent">
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="#e2e8f0" strokeWidth={1} />
            <text x={L - 6} y={y(v) + 4} textAnchor="end" fontSize={11} fill="#64748b">{v}%</text>
          </g>
        ))}
        {points.map((p, i) =>
          i === 0 || p.run.promptVersion !== points[i - 1].run.promptVersion ? (
            <g key={`v${i}`}>
              <line x1={x(i)} x2={x(i)} y1={T - 6} y2={H - B} stroke="#94a3b8" strokeWidth={1} strokeDasharray="3 3" />
              <text x={i > points.length / 2 ? x(i) - 4 : x(i) + 4} y={T - 10} fontSize={11} fill="#475569" textAnchor={i > points.length / 2 ? 'end' : 'start'}>{p.run.promptVersion}</text>
            </g>
          ) : null
        )}
        <path d={line} fill="none" stroke="#047857" strokeWidth={2} strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={p.run.file} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <circle cx={x(i)} cy={y(pct(p.passed, p.cases))} r={14} fill="transparent" />
            <circle cx={x(i)} cy={y(pct(p.passed, p.cases))} r={hover === i ? 6 : 4} fill="#047857" stroke="#fff" strokeWidth={2} pointerEvents="none" />
          </g>
        ))}
        <text x={L} y={H - 8} fontSize={11} fill="#64748b">{fmtDate(points[0].run.startedAt)}</text>
        <text x={W - R} y={H - 8} fontSize={11} fill="#64748b" textAnchor="end">{fmtDate(points[points.length - 1].run.startedAt)}</text>
      </svg>
      {h && hover !== null && (
        <div
          className="pointer-events-none absolute z-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-md"
          style={{ left: `${(x(hover) / W) * 100}%`, top: 0, transform: `translateX(${hover > points.length / 2 ? '-105%' : '5%'})` }}
        >
          <div className="font-semibold text-slate-900">{fmtDate(h.run.startedAt)}</div>
          <div className="text-slate-600">{h.run.label} · {h.run.promptVersion}</div>
          <div className="text-slate-900">{h.passed}/{h.cases} cases passed ({pct(h.passed, h.cases)}%)</div>
        </div>
      )}
    </div>
  );
}

/** Score the same case got in the most recent earlier run that included it. */
function previousScores(runs: ScoringRunSummary[], selected: ScoringRunSummary): Record<string, number | undefined> {
  const older = runs.filter((r) => r.startedAt < selected.startedAt); // runs are newest first
  const prev: Record<string, number | undefined> = {};
  for (const row of selected.rows) {
    const earlier = older.find((r) => r.rows.some((x) => x.caseId === row.caseId && typeof x.score === 'number'));
    prev[row.caseId] = earlier?.rows.find((x) => x.caseId === row.caseId)?.score;
  }
  return prev;
}

function CaseTable({ rows, prev }: { rows: DashboardCaseRow[]; prev: Record<string, number | undefined> }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-3 py-2">Case</th>
            <th className="px-3 py-2">Track</th>
            <th className="px-3 py-2">Kind</th>
            <th className="px-3 py-2 text-right">Score</th>
            <th className="px-3 py-2 text-right">Change</th>
            <th className="px-3 py-2">Verdict</th>
            <th className="px-3 py-2">Result</th>
            <th className="px-3 py-2">Why it failed</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => {
            const before = prev[r.caseId];
            const delta = typeof r.score === 'number' && typeof before === 'number' ? r.score - before : undefined;
            return (
              <tr key={r.caseId} className={r.passed ? '' : 'bg-rose-50/40'}>
                <td className="px-3 py-2 font-mono text-xs text-slate-800">{r.caseId}<div className="font-sans text-[11px] text-slate-400">{r.model || ''}</div></td>
                <td className="px-3 py-2 text-slate-700">{r.track}</td>
                <td className="px-3 py-2 text-slate-700">{r.edgeType || r.category}</td>
                <td className="px-3 py-2 text-right tabular-nums font-semibold text-slate-900">{r.status === 'insufficient' ? 'insufficient' : r.score ?? '-'}</td>
                <td className="px-3 py-2 text-right tabular-nums text-slate-600" title={before !== undefined ? `Was ${before} last time` : 'First run with this case'}>
                  {delta === undefined ? '-' : delta === 0 ? '0' : delta > 0 ? `+${delta}` : delta}
                </td>
                <td className="px-3 py-2 text-slate-700">{r.verdict || (r.status === 'error' ? 'error' : '-')}</td>
                <td className="px-3 py-2"><PassMark passed={r.passed} /></td>
                <td className="px-3 py-2 text-xs text-slate-600 max-w-md">{r.problems.join(' · ') || ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ScoringView({ runs }: { runs: ScoringRunSummary[] }) {
  const [track, setTrack] = useState('all');
  const [selectedFile, setSelectedFile] = useState(runs[0]?.file);
  const selected = runs.find((r) => r.file === selectedFile) ?? runs[0];
  const tracks = useMemo(() => [...new Set(runs.flatMap((r) => r.tracks))].sort(), [runs]);
  const prev = useMemo(() => (selected ? previousScores(runs, selected) : {}), [runs, selected]);

  if (!selected) return <p className="text-sm text-slate-500">No scoring runs saved yet.</p>;
  const rows = rowsFor(selected, track);
  const activeThresholds = selected.thresholds.filter((t) => t.active);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-600">Track</span>
        <Select value={track} onValueChange={setTrack}>
          <SelectTrigger className="w-44 bg-white"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tracks</SelectItem>
            {tracks.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">Cases passed per run</h2>
        <p className="mb-2 text-xs text-slate-500">Dashed lines mark a new eval version. Hover a point for the run.</p>
        <TrendChart runs={runs} track={track} />
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-slate-900">All runs</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">When</th>
                <th className="px-3 py-2">What ran</th>
                <th className="px-3 py-2">Version</th>
                <th className="px-3 py-2">Cases passed</th>
                <th className="px-3 py-2">All checks</th>
                <th className="px-3 py-2">Consistency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {runs.map((r) => {
                const rs = rowsFor(r, track);
                if (!rs.length) return null;
                const isSel = r.file === selected.file;
                return (
                  <tr key={r.file} onClick={() => setSelectedFile(r.file)} className={`cursor-pointer hover:bg-slate-50 ${isSel ? 'bg-emerald-50' : ''}`}>
                    <td className="px-3 py-2 whitespace-nowrap text-slate-800">{fmtDate(r.startedAt)}</td>
                    <td className="px-3 py-2 text-slate-700">{r.label}{r.errors ? <span className="ml-2 text-xs text-amber-700">{r.errors} errored</span> : null}</td>
                    <td className="px-3 py-2 text-slate-700">{r.promptVersion}</td>
                    <td className="px-3 py-2 tabular-nums text-slate-900">{rs.filter((x) => x.passed).length}/{rs.length}</td>
                    <td className="px-3 py-2"><PassMark passed={r.allPassed} /></td>
                    <td className="px-3 py-2 text-xs text-slate-600">
                      {r.consistency ? `x${r.consistency.runsPerCase}: ${r.consistency.passedCases}/${r.consistency.totalCases} stable, max std dev ${r.consistency.maxStdDev.toFixed(1)}, ${r.consistency.verdictFlips} flips` : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">Click a run to see its cases below.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-slate-900">Run of {fmtDate(selected.startedAt)} · {selected.label}</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Tile label="Cases passed" value={`${rows.filter((r) => r.passed).length}/${rows.length}`} sub={track === 'all' ? 'all tracks' : track} />
          <Tile label="Checks passed" value={`${activeThresholds.filter((t) => t.passed).length}/${activeThresholds.length}`} />
          <Tile label="Eval version" value={selected.promptVersion} />
          <Tile label="Model" value={<span className="text-base">{selected.models.join(', ') || '-'}</span>} />
        </div>

        {activeThresholds.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr><th className="px-3 py-2">Check (whole run)</th><th className="px-3 py-2">Target</th><th className="px-3 py-2">Actual</th><th className="px-3 py-2">Result</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selected.thresholds.map((t) => (
                  <tr key={t.id}>
                    <td className="px-3 py-2 text-slate-800">{t.name}</td>
                    <td className="px-3 py-2 text-slate-600">{t.target}</td>
                    <td className="px-3 py-2 text-slate-600">{t.actual}</td>
                    <td className="px-3 py-2">{t.active ? <PassMark passed={t.passed} /> : <span className="text-slate-400">skipped</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <CaseTable rows={rows} prev={prev} />
        <p className="text-xs text-slate-500">"Change" compares with the last earlier run that scored the same case. Full report: eval/results/{selected.file}</p>
      </section>
    </div>
  );
}

function InterviewerView({ runs }: { runs: InterviewerRunSummary[] }) {
  const [selectedFile, setSelectedFile] = useState(runs[0]?.file);
  const selected = runs.find((r) => r.file === selectedFile) ?? runs[0];
  if (!selected) {
    return <p className="text-sm text-slate-500">No interviewer runs saved yet. Runs of <code>npm run eval:interviewer</code> are saved from now on.</p>;
  }
  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="px-3 py-2">When</th><th className="px-3 py-2">Model</th><th className="px-3 py-2">Cases passed</th><th className="px-3 py-2">Prompt leak check</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {runs.map((r) => (
              <tr key={r.file} onClick={() => setSelectedFile(r.file)} className={`cursor-pointer hover:bg-slate-50 ${r.file === selected.file ? 'bg-emerald-50' : ''}`}>
                <td className="px-3 py-2 whitespace-nowrap text-slate-800">{fmtDate(r.startedAt)}</td>
                <td className="px-3 py-2 text-slate-700">{r.model}</td>
                <td className="px-3 py-2 tabular-nums text-slate-900">{r.passed}/{r.cases}</td>
                <td className="px-3 py-2"><PassMark passed={r.leakProblems.length === 0} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected.leakProblems.length > 0 && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          {selected.leakProblems.map((p) => <div key={p}>{p}</div>)}
        </div>
      )}

      <div className="space-y-3">
        {selected.rows.map((r) => (
          <div key={r.caseId} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-medium text-slate-900">{r.name} <span className="font-mono text-xs text-slate-400">{r.caseId}</span></div>
              {r.status === 'error' ? <PassMark passed={false} label="Error" /> : <PassMark passed={r.status === 'pass'} />}
            </div>
            {r.reply && <p className="mt-2 text-sm text-slate-700">Priya: “{r.reply}”</p>}
            {r.error && <p className="mt-2 text-sm text-amber-700">{r.error}</p>}
            {r.failures.length > 0 && <ul className="mt-2 list-disc pl-5 text-sm text-rose-700">{r.failures.map((f) => <li key={f}>{f}</li>)}</ul>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EvalDashboard() {
  const [data, setData] = useState<EvalData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/evals');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
      setData(json);
    } catch (e: any) {
      setError(e?.message || 'Could not load eval results');
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  const scoring = (data?.runs.filter((r) => r.kind === 'scoring') ?? []) as ScoringRunSummary[];
  const interviewer = (data?.runs.filter((r) => r.kind === 'interviewer') ?? []) as InterviewerRunSummary[];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Eval results</h1>
            <p className="text-sm text-slate-600">Admin only, on this computer. Reads the saved run files; opening this page never calls Gemini.</p>
          </div>
          <Button variant="outline" onClick={load} disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />} Refresh
          </Button>
        </header>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>{error}. Start the app with <code>npm run dev</code> and open this page on the same computer.</span>
          </div>
        )}

        {data && data.unreadable.length > 0 && (
          <p className="text-xs text-amber-700">Could not read: {data.unreadable.join(', ')}</p>
        )}

        {data && data.runs.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
            <FolderOpen className="mb-2 size-5 text-slate-400" />
            No saved runs in <code>{data.resultsDir}</code> yet. Run <code>npm run eval -- --track rca --delay 15</code> or{' '}
            <code>npm run eval:interviewer</code>, then press Refresh.
          </div>
        )}

        {data && data.runs.length > 0 && (
          <Tabs defaultValue="scoring">
            <TabsList>
              <TabsTrigger value="scoring">Scoring ({scoring.length})</TabsTrigger>
              <TabsTrigger value="interviewer">Interviewer ({interviewer.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="scoring" className="pt-4"><ScoringView runs={scoring} /></TabsContent>
            <TabsContent value="interviewer" className="pt-4"><InterviewerView runs={interviewer} /></TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
