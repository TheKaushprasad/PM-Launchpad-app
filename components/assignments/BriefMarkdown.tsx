import React from 'react';

// Renders the small markdown subset used by the assignment briefs in data/assignments.ts:
// ## and ### headings, paragraphs, - and 1. lists (one nested level), pipe tables,
// **bold**, *italic* and [links](https://...). Also used by scripts/seo.tsx at build time.

type Block =
  | { kind: 'h2' | 'h3' | 'p'; text: string }
  | { kind: 'list'; ordered: boolean; items: { text: string; children: { ordered: boolean; items: string[] } | null }[] }
  | { kind: 'table'; head: string[]; rows: string[][] };

const LIST_ITEM = /^(\s*)(-|\d+\.)\s+(.*)$/;
const cells = (line: string) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

function parse(md: string): Block[] {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      blocks.push({ kind: 'h3', text: line.slice(4).trim() });
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push({ kind: 'h2', text: line.slice(3).trim() });
      i++;
      continue;
    }
    if (line.trim().startsWith('|') && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1] ?? '')) {
      const head = cells(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(cells(lines[i++]));
      blocks.push({ kind: 'table', head, rows });
      continue;
    }
    const first = line.match(LIST_ITEM);
    if (first && !first[1]) {
      const list: Extract<Block, { kind: 'list' }> = { kind: 'list', ordered: first[2] !== '-', items: [] };
      while (i < lines.length) {
        const m = lines[i].match(LIST_ITEM);
        if (!m) break;
        if (m[1]) {
          const parent = list.items[list.items.length - 1];
          if (parent) {
            parent.children ??= { ordered: m[2] !== '-', items: [] };
            parent.children.items.push(m[3]);
          }
        } else {
          list.items.push({ text: m[3], children: null });
        }
        i++;
      }
      blocks.push(list);
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^#{2,3} /.test(lines[i]) && !LIST_ITEM.test(lines[i]) && !lines[i].trim().startsWith('|')) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push({ kind: 'p', text: para.join(' ') });
  }
  return blocks;
}

const INLINE = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

function inline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index! > last) out.push(text.slice(last, m.index));
    const key = m.index;
    if (m[1] !== undefined) out.push(<strong key={key} className="font-bold text-zinc-900">{m[1]}</strong>);
    else if (m[2] !== undefined) out.push(<em key={key}>{m[2]}</em>);
    else
      out.push(
        <a key={key} href={m[4]} target="_blank" rel="noopener noreferrer nofollow" className="text-brand-700 font-semibold underline underline-offset-2">
          {m[3]}
        </a>,
      );
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const listClass = (ordered: boolean) => `${ordered ? 'list-decimal' : 'list-disc'} pl-5 space-y-1.5 marker:text-zinc-400`;

export const BriefMarkdown: React.FC<{ source: string }> = ({ source }) => (
  <div className="space-y-4 text-sm sm:text-[15px] text-zinc-700 leading-relaxed">
    {parse(source).map((b, idx) => {
      switch (b.kind) {
        case 'h2':
          return <h2 key={idx} className="text-lg font-extrabold text-zinc-900 pt-2">{inline(b.text)}</h2>;
        case 'h3':
          return <h3 key={idx} className="text-base font-bold text-zinc-900 pt-1">{inline(b.text)}</h3>;
        case 'p':
          return <p key={idx}>{inline(b.text)}</p>;
        case 'list': {
          const Tag = b.ordered ? 'ol' : 'ul';
          return (
            <Tag key={idx} className={listClass(b.ordered)}>
              {b.items.map((item, j) => {
                const Sub = item.children?.ordered ? 'ol' : 'ul';
                return (
                  <li key={j}>
                    {inline(item.text)}
                    {item.children && (
                      <Sub className={`${listClass(item.children.ordered)} mt-1.5`}>
                        {item.children.items.map((c, k) => (
                          <li key={k}>{inline(c)}</li>
                        ))}
                      </Sub>
                    )}
                  </li>
                );
              })}
            </Tag>
          );
        }
        case 'table':
          return (
            <div key={idx} className="overflow-x-auto rounded-xl border border-zinc-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 text-zinc-900">
                  <tr>{b.head.map((h, j) => <th key={j} className="px-3 py-2 font-bold">{inline(h)}</th>)}</tr>
                </thead>
                <tbody>
                  {b.rows.map((r, j) => (
                    <tr key={j} className="border-t border-zinc-100">
                      {r.map((c, k) => <td key={k} className="px-3 py-2 align-top">{inline(c)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
      }
    })}
  </div>
);
