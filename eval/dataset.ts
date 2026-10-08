import fs from 'fs';
import path from 'path';
import { INTERVIEW_SCENARIOS } from '../data/interviewScenarios';
import { INTERVIEWER_PERSONAS } from '../data/interviewPersonas';
import { BenchmarkCase, CaseFileSchema } from './types';

export const DATASET_DIR = path.join(process.cwd(), 'eval', 'dataset');

/**
 * Loads every case file, validates it, and resolves scenarioId / personaId
 * against the production data so cases are scored with the real benchmark
 * outline the app uses. Throws with every problem found, not just the first.
 */
export function loadCases(dir: string = DATASET_DIR): BenchmarkCase[] {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
  const errors: string[] = [];
  const cases: BenchmarkCase[] = [];
  const seen = new Set<string>();

  for (const file of files) {
    let json: unknown;
    try {
      json = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'));
    } catch (e: any) {
      errors.push(`${file}: invalid JSON (${e.message})`);
      continue;
    }

    const parsed = CaseFileSchema.safeParse(json);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => `${i.path.join('.') || 'root'}: ${i.message}`).join('; ');
      errors.push(`${file}: ${issues}`);
      continue;
    }
    const c = parsed.data;

    if (`${c.id}.json` !== file) errors.push(`${file}: id "${c.id}" must match the file name`);
    if (seen.has(c.id)) errors.push(`${file}: duplicate id "${c.id}"`);
    seen.add(c.id);

    const scenario = c.scenario ?? INTERVIEW_SCENARIOS.find((s) => s.id === c.scenarioId);
    if (!scenario) {
      errors.push(`${file}: unknown scenarioId "${c.scenarioId}"`);
      continue;
    }
    if (scenario.track !== c.track) {
      errors.push(`${file}: track "${c.track}" does not match scenario track "${scenario.track}"`);
    }

    const persona = c.persona ?? INTERVIEWER_PERSONAS.find((p) => p.id === c.personaId);
    if (!persona) {
      errors.push(`${file}: unknown personaId "${c.personaId}"`);
      continue;
    }

    if (c.category === 'edge' && !c.edgeType) errors.push(`${file}: edge cases need an edgeType`);
    if (c.category !== 'edge' && c.edgeType) errors.push(`${file}: only edge cases may set edgeType`);

    const { scenarioId, personaId, ...rest } = c;
    cases.push({ ...rest, scenario, persona } as BenchmarkCase);
  }

  if (errors.length) {
    throw new Error(`Dataset validation failed:\n  ${errors.join('\n  ')}`);
  }
  return cases;
}
