import React from 'react';
import { ArrowDown, PlayCircle } from 'lucide-react';

// Renders lesson text written in a small Markdown-like format (see data/aiPmCourse/week1/text.ts):
// ## and ### headings, paragraphs with **bold**, "- " and "1. " lists, "> " quotes, ``` code, ```flow chains,
// | tables |, "@video <YouTube id> <title>" and "@image <file in /ai-pm/> <alt text>".

type Block =
  | { t: 'h2' | 'h3' | 'p'; text: string }
  | { t: 'ul' | 'ol'; items: string[] }
  | { t: 'quote'; lines: string[] }
  | { t: 'code'; text: string }
  | { t: 'flow'; steps: string[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'video'; id: string; title: string }
  | { t: 'image'; src: string; alt: string };

const parse = (src: string): Block[] => {
  const lines = src.split('\n');
  const out: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith('```')) {
      const kind = line.slice(3).trim();
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) body.push(lines[i++]);
      i++;
      if (kind === 'flow') out.push({ t: 'flow', steps: body.filter((b) => b.trim()) });
      else out.push({ t: 'code', text: body.join('\n') });
      continue;
    }
    if (line.startsWith('### ')) { out.push({ t: 'h3', text: line.slice(4) }); i++; continue; }
    if (line.startsWith('## ')) { out.push({ t: 'h2', text: line.slice(3) }); i++; continue; }
    if (line.startsWith('@video ')) {
      const [, id, ...rest] = line.split(' ');
      out.push({ t: 'video', id, title: rest.join(' ') });
      i++;
      continue;
    }
    if (line.startsWith('@image ')) {
      const [, file, ...rest] = line.split(' ');
      out.push({ t: 'image', src: `/ai-pm/${file}`, alt: rest.join(' ') });
      i++;
      continue;
    }
    if (line.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        const cells = lines[i].split('|').slice(1, -1).map((c) => c.trim());
        if (!cells.every((c) => /^-+$/.test(c))) rows.push(cells);
        i++;
      }
      out.push({ t: 'table', head: rows[0], rows: rows.slice(1) });
      continue;
    }
    if (line.startsWith('>')) {
      const q: string[] = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        q.push(lines[i].replace(/^> ?/, '').replace(/ {2}$/, ''));
        i++;
        // Separate "> " lines with a blank line between them are one quote block only if the next block is a quote too.
        if (i < lines.length - 1 && !lines[i].trim() && lines[i + 1].startsWith('>')) { q.push(''); i++; }
      }
      out.push({ t: 'quote', lines: q });
      continue;
    }
    const isUl = (l: string) => /^\s*- /.test(l);
    const isOl = (l: string) => /^\d+\. /.test(l);
    if (isUl(line) || isOl(line)) {
      const ordered = isOl(line);
      const items: string[] = [];
      while (i < lines.length && (ordered ? isOl(lines[i]) : isUl(lines[i]))) {
        items.push(lines[i].replace(ordered ? /^\d+\. / : /^\s*- /, ''));
        i++;
      }
      out.push({ t: ordered ? 'ol' : 'ul', items });
      continue;
    }
    out.push({ t: 'p', text: line });
    i++;
  }
  return out;
};

// **bold** inside a line.
const Inline: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\*\*[^*]+\*\*)/g).map((part, k) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={k} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>
      ) : (
        <React.Fragment key={k}>{part}</React.Fragment>
      ),
    )}
  </>
);

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const articleHeadings = (src: string) =>
  parse(src).filter((b): b is { t: 'h2'; text: string } => b.t === 'h2').map((b) => ({ id: slug(b.text), text: b.text }));

export const Article: React.FC<{ source: string; skipHeading?: string }> = ({ source, skipHeading }) => {
  let skipped = false;
  const blocks = parse(source).filter((b) => {
    // The lesson title is already shown above the article, so drop its first repeat.
    if (!skipped && b.t === 'h2' && skipHeading && b.text.toLowerCase() === skipHeading.toLowerCase()) { skipped = true; return false; }
    return true;
  });
  return (
    <div className="text-[15px] sm:text-base leading-[1.75] text-slate-700 space-y-4">
      {blocks.map((b, k) => {
        switch (b.t) {
          case 'h2':
            return <h2 key={k} id={slug(b.text)} className="scroll-mt-20 pt-6 text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">{b.text}</h2>;
          case 'h3':
            return <h3 key={k} className="pt-2 text-base sm:text-lg font-black text-slate-900 leading-snug">{b.text}</h3>;
          case 'p':
            return <p key={k}><Inline text={b.text} /></p>;
          case 'ul':
            return (
              <ul key={k} className="space-y-1.5 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2.5"><span className="mt-[0.7em] size-1.5 rounded-full bg-brand-500 shrink-0" /><span><Inline text={it} /></span></li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={k} className="space-y-1.5 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2.5"><span className="font-black text-brand-700 tabular-nums">{j + 1}.</span><span><Inline text={it} /></span></li>
                ))}
              </ol>
            );
          case 'quote':
            return (
              <blockquote key={k} className="border-l-4 border-brand-400 bg-brand-50/60 rounded-r-xl px-4 py-3 text-slate-800 font-medium space-y-2">
                {b.lines.filter((l) => l.trim()).map((l, j) => <p key={j}><Inline text={l} /></p>)}
              </blockquote>
            );
          case 'code':
            return (
              <pre key={k} className="rounded-xl bg-slate-900 text-emerald-100 text-[13px] leading-relaxed p-4 overflow-x-auto"><code>{b.text}</code></pre>
            );
          case 'flow':
            return (
              <div key={k} className="flex flex-col items-start gap-1 py-1">
                {b.steps.map((s, j) => (
                  <React.Fragment key={j}>
                    {j > 0 && <ArrowDown className="size-4 text-brand-400 ml-4" />}
                    <span className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-800 shadow-sm">{s}</span>
                  </React.Fragment>
                ))}
              </div>
            );
          case 'table':
            return (
              <div key={k} className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>{b.head.map((h, j) => <th key={j} className="text-left font-black text-slate-900 px-3 py-2">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-slate-100">
                        {r.map((c, m) => <td key={m} className={`px-3 py-2 align-top ${m === 0 ? 'font-bold text-slate-800' : ''}`}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'video':
            return (
              <figure key={k} className="space-y-2">
                <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-slate-200">
                  <iframe
                    src={`https://www.youtube.com/embed/${b.id}`}
                    title={b.title}
                    className="w-full h-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <figcaption className="text-xs font-bold text-slate-500 flex items-center gap-1.5"><PlayCircle className="size-3.5" /> {b.title}</figcaption>
              </figure>
            );
          case 'image':
            return (
              <figure key={k} className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
                <img src={b.src} alt={b.alt} loading="lazy" className="mx-auto max-h-[420px] w-auto rounded-lg" />
                <figcaption className="pt-2 text-center text-xs text-slate-500">{b.alt}</figcaption>
              </figure>
            );
        }
      })}
    </div>
  );
};
