import React from 'react';
import { BriefMarkdown } from '../assignments/BriefMarkdown';
import { styleById } from '../../lib/productStrategy/styles';
import type { StrategyRecord } from '../../lib/productStrategy/types';

// The PDF layout (FRD section 9), printed by the browser ("Save as PDF"), so the text stays
// selectable and Indian names and the ₹ sign print with the page's own font. Cover page, summary,
// a one-page canvas grid for canvas styles, the sections in style order, the extras, and a footer
// with the framework credit on every page.

export interface PrintOptions {
  pageSize: 'A4' | 'Letter';
  includeTips: boolean;
}

/** <product-name>-strategy-<style>-<YYYY-MM-DD> (FR-31). Chrome uses the page title as the file name. */
export function pdfFileName(record: StrategyRecord): string {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'product';
  const style = styleById(record.styleId)?.name || record.styleId;
  return `${slug(record.inputs.productName)}-strategy-${slug(style)}-${new Date().toISOString().slice(0, 10)}`;
}

/** Opens the browser's print dialog for the strategy, with the file name set. */
export function printStrategy(record: StrategyRecord) {
  const before = document.title;
  document.title = pdfFileName(record);
  const restore = () => {
    document.title = before;
    window.removeEventListener('afterprint', restore);
  };
  window.addEventListener('afterprint', restore);
  window.print();
  // Some browsers never fire afterprint; put the title back anyway.
  setTimeout(restore, 3000);
}

const firstLines = (md: string, max = 220) => {
  const text = md.replace(/\*\*/g, '').replace(/^\s*-\s+/gm, '• ').replace(/\s+/g, ' ').trim();
  return text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, '')}…` : text;
};

export const StrategyPrint: React.FC<{ record: StrategyRecord; options: PrintOptions }> = ({ record, options }) => {
  const style = styleById(record.styleId);
  const sections = record.output.sections.filter((s) => !s.hidden);
  const date = new Date(record.updatedAt || record.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const md = 'space-y-2 text-[12.5px] text-zinc-800 leading-relaxed';

  return (
    <div id="aps-print" className="hidden">
      <style>{`
        @page { size: ${options.pageSize}; margin: 16mm 14mm 20mm; }
        @media print {
          html, body { background: #fff !important; }
          body * { visibility: hidden !important; }
          #aps-print, #aps-print * { visibility: visible !important; }
          #aps-print { display: block !important; position: absolute; inset: 0 auto auto 0; width: 100%; color: #18181b; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .aps-page-break { break-before: page; }
          .aps-avoid { break-inside: avoid; }
          .aps-footer { position: fixed; bottom: 0; left: 0; right: 0; font-size: 9px; color: #71717a; display: flex; justify-content: space-between; border-top: 1px solid #e4e4e7; padding-top: 4px; }
        }
      `}</style>

      {/* Cover */}
      <section style={{ minHeight: '230mm', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#047857' }}>{style?.name || 'Product strategy'}</p>
        <h1 style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.15, margin: '10px 0 14px' }}>{record.output.title}</h1>
        <p style={{ fontSize: 15, color: '#3f3f46' }}>{record.inputs.productName}: {record.inputs.oneLiner}</p>
        <div style={{ marginTop: 40, fontSize: 13, color: '#3f3f46' }}>
          {record.authorName && <p style={{ fontWeight: 800, color: '#18181b' }}>{record.authorName}{record.authorRole ? `, ${record.authorRole}` : ''}</p>}
          <p>{date}</p>
          <p>{record.inputs.stage} · {record.inputs.industry === 'Other' ? record.inputs.industryOther : record.inputs.industry} · {record.inputs.businessModel} · {record.inputs.geographies.join(', ')} · {record.inputs.horizon}</p>
        </div>
      </section>

      {/* Executive summary + canvas view */}
      <section className="aps-page-break">
        <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 6 }}>Executive summary</h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.6 }}>{record.output.summary}</p>

        {style?.canvas && (
          <div style={{ marginTop: 22 }} className="aps-avoid">
            <h2 style={{ fontSize: 14, fontWeight: 900, marginBottom: 8 }}>The canvas on one page</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {sections.map((s, i) => (
                <div key={s.key} style={{ border: '1px solid #d4d4d8', borderRadius: 8, padding: 10, gridColumn: i === 0 ? 'span 2' : undefined, background: i === 0 ? '#ecfdf5' : '#fff' }}>
                  <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, color: '#047857' }}>{s.title}</p>
                  <p style={{ fontSize: 11, lineHeight: 1.45, marginTop: 3 }}>{firstLines(s.content)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Body */}
      <section className="aps-page-break space-y-5">
        {sections.map((s) => (
          <article key={s.key} className="aps-avoid" style={{ paddingBottom: 6 }}>
            <h2 style={{ fontSize: 17, fontWeight: 900, borderBottom: '2px solid #047857', paddingBottom: 3, marginBottom: 8 }}>{s.title}</h2>
            <BriefMarkdown source={s.content} assumptionPills className={md} />
            {options.includeTips && s.whyItMatters && <p style={{ fontSize: 11, color: '#047857', marginTop: 6 }}><b>Why it matters:</b> {s.whyItMatters}</p>}
          </article>
        ))}
      </section>

      {/* Extras */}
      {(record.output.metrics.length > 0 || record.output.assumptions.length > 0 || record.output.competitorTable.length > 0) && (
        <section className="space-y-5" style={{ marginTop: 18 }}>
          {record.output.metrics.length > 0 && (
            <div className="aps-avoid">
              <h2 style={{ fontSize: 17, fontWeight: 900, marginBottom: 8 }}>Success metrics</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead><tr style={{ background: '#f4f4f5' }}><th style={th}>Metric</th><th style={th}>Target</th><th style={th}>Source</th></tr></thead>
                <tbody>{record.output.metrics.map((m) => <tr key={m.name}><td style={td}>{m.name}</td><td style={td}>{m.target}</td><td style={td}>{m.type}</td></tr>)}</tbody>
              </table>
            </div>
          )}
          {record.output.assumptions.length > 0 && (
            <div className="aps-avoid">
              <h2 style={{ fontSize: 17, fontWeight: 900, marginBottom: 8 }}>Assumptions and risks to test</h2>
              <ul style={{ paddingLeft: 18, listStyle: 'disc', fontSize: 12.5, lineHeight: 1.55 }}>{record.output.assumptions.map((a) => <li key={a}>{a}</li>)}</ul>
            </div>
          )}
          {record.output.competitorTable.length > 0 && (
            <div className="aps-avoid">
              <h2 style={{ fontSize: 17, fontWeight: 900, marginBottom: 8 }}>Competitors</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5 }}>
                <thead><tr style={{ background: '#f4f4f5' }}><th style={th}>Name</th><th style={th}>Strength</th><th style={th}>Gap</th><th style={th}>Our angle</th></tr></thead>
                <tbody>{record.output.competitorTable.map((c) => <tr key={c.name}><td style={td}><b>{c.name}</b></td><td style={td}>{c.strength}</td><td style={td}>{c.gap}</td><td style={td}>{c.ourAngle}</td></tr>)}</tbody>
              </table>
            </div>
          )}
        </section>
      )}

      <div className="aps-footer">
        <span>Made with AI Product Strategy · thenoobpm.com</span>
        <span>{style?.credit}</span>
      </div>
    </div>
  );
};

const th: React.CSSProperties = { textAlign: 'left', padding: '6px 8px', border: '1px solid #e4e4e7', fontWeight: 800 };
const td: React.CSSProperties = { padding: '6px 8px', border: '1px solid #e4e4e7', verticalAlign: 'top' };
