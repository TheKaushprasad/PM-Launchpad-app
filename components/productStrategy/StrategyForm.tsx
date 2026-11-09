import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles, Wand2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  BUSINESS_MODELS, EXTRAS, EXTRA_LABELS, FIELD_RULES, GEOGRAPHIES, HORIZONS, INDUSTRIES, MAX_COMPETITORS, STAGES, TONES,
  type StrategyInputs,
} from '../../lib/productStrategy/types';
import { STRATEGY_STYLES, type StrategyStyle } from '../../lib/productStrategy/styles';
import { STEP_TITLES, fieldError, stepValid } from '../../lib/productStrategy/validate';

// The 4-step input form (FRD section 5). "Next" stays disabled until the step is valid; errors show
// under a field once it has been touched. The parent saves the draft in this browser as you type.

type Field = keyof StrategyInputs;

const Req = () => <span className="text-rose-600" aria-hidden> *</span>;
const Optional = () => <span className="text-slate-400 font-medium"> (optional)</span>;

const FieldError: React.FC<{ id: string; text: string }> = ({ id, text }) =>
  text ? <p id={id} className="text-xs font-semibold text-rose-700">{text}</p> : null;

/** A small drawing of each style's layout for the style cards (FR-07). */
const StylePreview: React.FC<{ style: StrategyStyle }> = ({ style }) => {
  const box = 'rounded-[3px] bg-brand-100 border border-brand-200';
  if (style.id === 'ST-01') {
    return (
      <div className="grid grid-cols-3 gap-1 h-16" aria-hidden>
        <div className={`${box} col-span-3`} />
        <div className={box} /><div className={box} /><div className={box} />
        <div className={`${box} col-span-2`} /><div className={box} />
      </div>
    );
  }
  if (style.id === 'ST-02') {
    return (
      <div className="grid grid-cols-4 grid-rows-3 gap-1 h-16" aria-hidden>
        <div className={`${box} col-span-4`} />
        <div className={`${box} row-span-2`} /><div className={`${box} row-span-2`} /><div className={`${box} row-span-2`} /><div className={`${box} row-span-2`} />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-1 h-16" aria-hidden>
      <div className={`${box} col-span-2 bg-brand-200`} />
      <div className={box} /><div className={box} />
    </div>
  );
};

const ChipToggle: React.FC<{ on: boolean; onClick: () => void; children: React.ReactNode }> = ({ on, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={on}
    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${on ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-brand-400'}`}
  >
    {on && <Check className="size-3.5" />} {children}
  </button>
);

export const StrategyForm: React.FC<{
  inputs: StrategyInputs;
  step: number;
  onChange: (inputs: StrategyInputs) => void;
  onStep: (step: number) => void;
  onUseExample: () => void;
  onGenerate: () => void;
  busy: boolean;
  signedIn: boolean;
  draftSaved: boolean;
}> = ({ inputs, step, onChange, onStep, onUseExample, onGenerate, busy, signedIn, draftSaved }) => {
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [tag, setTag] = useState('');
  const set = <K extends Field>(field: K, value: StrategyInputs[K]) => onChange({ ...inputs, [field]: value });
  const touch = (field: Field) => setTouched((t) => ({ ...t, [field]: true }));
  const err = (field: Field) => (touched[field] ? fieldError(inputs, field) : '');
  const valid = stepValid(inputs, step);

  const text = (field: Field, label: string, opts: { long?: boolean; placeholder?: string; required?: boolean; rows?: number } = {}) => {
    const rule = FIELD_RULES[field as string];
    const value = String(inputs[field] || '');
    const id = `aps-${field}`;
    const e = err(field);
    const common = {
      id,
      value,
      maxLength: rule?.max,
      placeholder: opts.placeholder,
      'aria-invalid': Boolean(e),
      'aria-describedby': e ? `${id}-error` : undefined,
      onBlur: () => touch(field),
      onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(field, ev.target.value as never),
    };
    return (
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <Label htmlFor={id} className="font-bold">{label}{opts.required === false ? <Optional /> : <Req />}</Label>
          {rule && <span className="text-[11px] text-slate-400">{value.length}/{rule.max}</span>}
        </div>
        {opts.long ? <Textarea {...common} rows={opts.rows || 3} className="max-h-60" /> : <Input {...common} />}
        <FieldError id={`${id}-error`} text={e} />
      </div>
    );
  };

  const pick = (field: Field, label: string, options: readonly string[], placeholder: string) => {
    const id = `aps-${field}`;
    const e = err(field);
    return (
      <div className="space-y-1.5">
        <Label htmlFor={id} className="font-bold">{label}<Req /></Label>
        <Select value={String(inputs[field] || '') || undefined} onValueChange={(v) => { set(field, v as never); touch(field); }}>
          <SelectTrigger id={id} className="w-full" aria-invalid={Boolean(e)} onBlur={() => touch(field)}><SelectValue placeholder={placeholder} /></SelectTrigger>
          <SelectContent>{options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
        <FieldError id={`${id}-error`} text={e} />
      </div>
    );
  };

  const addTag = () => {
    const t = tag.trim().slice(0, 60);
    if (t && !inputs.competitors.includes(t) && inputs.competitors.length < MAX_COMPETITORS) set('competitors', [...inputs.competitors, t]);
    setTag('');
  };

  const toggle = <T extends string>(list: T[], value: T) => (list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  const next = () => {
    if (!valid) return;
    onStep(step + 1);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-6">
      {/* Progress bar (Step 1 of 4) */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-black text-slate-900">Step {step + 1} of 4 · {STEP_TITLES[step]}</p>
          <div className="flex items-center gap-3">
            {draftSaved && <span className="text-[11px] font-semibold text-slate-400">Draft saved in this browser</span>}
            <button type="button" onClick={onUseExample} className="text-xs font-bold text-brand-700 underline underline-offset-2 inline-flex items-center gap-1">
              <Wand2 className="size-3.5" /> Use example
            </button>
          </div>
        </div>
        <ol className="grid grid-cols-4 gap-1.5" aria-label="Form progress">
          {STEP_TITLES.map((t, i) => (
            <li key={t}>
              <button
                type="button"
                disabled={i > step && !Array.from({ length: i }, (_, k) => stepValid(inputs, k)).every(Boolean)}
                onClick={() => onStep(i)}
                className={`h-2 w-full rounded-full transition-colors disabled:cursor-not-allowed ${i <= step ? 'bg-brand-600' : 'bg-slate-200'}`}
                aria-label={`Step ${i + 1}: ${t}`}
                aria-current={i === step ? 'step' : undefined}
              />
            </li>
          ))}
        </ol>
      </div>

      {step === 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {text('productName', 'Product name', { placeholder: 'e.g. SkillSetu' })}
          {pick('stage', 'Product stage', STAGES, 'Pick a stage')}
          <div className="sm:col-span-2">{text('oneLiner', 'One-line description', { placeholder: 'What it is and who it is for, in one sentence' })}</div>
          {pick('industry', 'Industry', INDUSTRIES, 'Pick an industry')}
          {pick('businessModel', 'Business model', BUSINESS_MODELS, 'Pick a model')}
          {inputs.industry === 'Other' && (
            <div className="space-y-1.5">
              <Label htmlFor="aps-industryOther" className="font-bold">Your industry<Req /></Label>
              <Input id="aps-industryOther" value={inputs.industryOther} maxLength={60} onBlur={() => touch('industryOther')} onChange={(e) => set('industryOther', e.target.value)} placeholder="e.g. AgriTech" />
              <FieldError id="aps-industryOther-error" text={err('industryOther')} />
            </div>
          )}
          <div className="sm:col-span-2 space-y-1.5">
            <p className="text-sm font-bold">Geography<Req /></p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Geography">
              {GEOGRAPHIES.map((g) => (
                <ChipToggle key={g} on={inputs.geographies.includes(g)} onClick={() => { set('geographies', toggle(inputs.geographies, g)); touch('geographies'); }}>{g}</ChipToggle>
              ))}
            </div>
            <FieldError id="aps-geographies-error" text={err('geographies')} />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          {text('targetUsers', 'Target users', { long: true, placeholder: 'Who exactly? Age, city tier, job, device, habits...' })}
          {text('problem', 'Main user problem', { long: true, placeholder: 'What pain do they have today, and what does it cost them?' })}
          {text('alternatives', 'Current alternatives', { long: true, required: false, placeholder: 'What do they use or do today instead?' })}
          <div className="space-y-1.5">
            <Label htmlFor="aps-competitor" className="font-bold">Top competitors<Optional /></Label>
            <div className="flex gap-2">
              <Input
                id="aps-competitor"
                value={tag}
                maxLength={60}
                disabled={inputs.competitors.length >= MAX_COMPETITORS}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); } }}
                placeholder={inputs.competitors.length >= MAX_COMPETITORS ? `Up to ${MAX_COMPETITORS} competitors` : 'Type a name and press Enter'}
              />
              <Button type="button" variant="outline" onClick={addTag} disabled={!tag.trim() || inputs.competitors.length >= MAX_COMPETITORS}>Add</Button>
            </div>
            {inputs.competitors.length > 0 && (
              <ul className="flex flex-wrap gap-2 pt-1">
                {inputs.competitors.map((c) => (
                  <li key={c} className="inline-flex items-center gap-1 rounded-full bg-slate-100 pl-3 pr-1 py-1 text-sm font-semibold text-slate-800">
                    {c}
                    <button type="button" onClick={() => set('competitors', inputs.competitors.filter((x) => x !== c))} className="rounded-full p-1 hover:bg-slate-200" aria-label={`Remove ${c}`}>
                      <X className="size-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">{text('goal', 'Company or business goal', { long: true, rows: 2, placeholder: 'What must the business achieve? e.g. prove people will pay, reach break-even' })}</div>
          {pick('horizon', 'Time horizon', HORIZONS, 'Pick a horizon')}
          <div className="hidden sm:block" />
          {text('constraints', 'Key constraints', { long: true, rows: 2, required: false, placeholder: 'Budget, team size, tech, legal' })}
          {text('metrics', 'Current metrics', { long: true, rows: 2, required: false, placeholder: 'e.g. 20k MAU, 8% D30 retention' })}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-bold">Strategy style<Req /></p>
            <div className="grid sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Strategy style">
              {STRATEGY_STYLES.map((s) => {
                const on = inputs.styleId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => set('styleId', s.id)}
                    className={`text-left rounded-xl border-2 p-3 space-y-2 transition-colors ${on ? 'border-brand-600 bg-brand-50/60' : 'border-slate-200 bg-white hover:border-brand-300'}`}
                  >
                    <StylePreview style={s} />
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-black text-slate-900 text-sm">{s.name}</p>
                      <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-black uppercase text-emerald-700">Free</span>
                    </div>
                    <p className="text-xs font-bold text-brand-700">Best for: {s.bestFor}</p>
                    <p className="text-xs text-slate-600">{s.description}</p>
                    <p className="text-[11px] text-slate-500">{s.sections.map((x) => x.title).join(' · ')}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <p className="text-sm font-bold">Detail level<Req /></p>
              <div className="inline-flex rounded-xl border border-slate-200 p-1 bg-slate-50" role="radiogroup" aria-label="Detail level">
                {([['concise', 'Concise (1–2 pages)'], ['detailed', 'Detailed (4–6 pages)']] as const).map(([v, l]) => (
                  <button key={v} type="button" role="radio" aria-checked={inputs.detail === v} onClick={() => set('detail', v)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-bold ${inputs.detail === v ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="aps-tone" className="font-bold">Tone<Optional /></Label>
              <Select value={inputs.tone} onValueChange={(v) => set('tone', v)}>
                <SelectTrigger id="aps-tone" className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>{TONES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-bold">Include extras<Optional /></legend>
            <div className="flex flex-wrap gap-2">
              {EXTRAS.map((x) => (
                <ChipToggle key={x} on={inputs.extras.includes(x)} onClick={() => set('extras', toggle(inputs.extras, x))}>{EXTRA_LABELS[x]}</ChipToggle>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {step > 0 && <Button variant="outline" onClick={() => onStep(step - 1)} disabled={busy}><ArrowLeft className="size-4" /> Back</Button>}
        {step < 3 && <Button variant="brand" onClick={next} disabled={!valid}>Next <ArrowRight className="size-4" /></Button>}
        {step === 3 && (
          <Button variant="brand" size="lg" onClick={onGenerate} disabled={!valid || busy}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />} {signedIn ? 'Generate strategy' : 'Sign in to generate'}
          </Button>
        )}
        {!valid && <p className="text-xs text-slate-500">Fill the fields marked <span className="text-rose-600">*</span> to continue.</p>}
      </div>
      {step === 3 && (
        <p className="text-xs text-slate-500">
          Your answers are sent to Google’s Gemini to write the strategy. Don’t include confidential company information.
          Takes about 20 to 40 seconds{inputs.detail === 'detailed' ? ' per half (Detailed is written in two parts)' : ''}.
        </p>
      )}
    </div>
  );
};
