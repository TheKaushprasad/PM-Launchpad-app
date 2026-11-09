// PRD Coach: the learner writes their own PRD section by section, and the coach reviews it.
// Shared by the page (components/prdCoach) and the server (server/prdCoach).

export const PRD_SECTION_KEYS = ['problem', 'users', 'goals', 'scope', 'requirements', 'risks', 'questions'] as const;
export type PrdSectionKey = (typeof PRD_SECTION_KEYS)[number];

export interface PrdSectionDef {
  key: PrdSectionKey;
  title: string;
  /** One line on what the section is for, shown under its title. */
  purpose: string;
  /** What a strong section has. Shown to the learner and given to the reviewer as its checklist. */
  goodLooksLike: string[];
  placeholder: string;
}

export const PRD_SECTIONS: PrdSectionDef[] = [
  {
    key: 'problem',
    title: 'Problem',
    purpose: 'What is broken today, for whom, and why it matters now.',
    goodLooksLike: [
      'Names who has the problem and when it happens',
      'Backs it with evidence: a number, a user quote or an observation (mark guesses as assumptions)',
      'Says why it is worth solving now',
      'Describes the problem, not the solution',
    ],
    placeholder: 'e.g. Weekly Instamart shoppers rebuild the same 15-item basket every week. In 8 user chats, 6 said it takes them over 10 minutes...',
  },
  {
    key: 'users',
    title: 'Target users',
    purpose: 'The specific people this is for, and the job they are trying to get done.',
    goodLooksLike: [
      'One primary segment, specific enough to recruit for a user interview',
      'The job they are trying to get done and what they do today instead',
      'Who is explicitly not the focus',
    ],
    placeholder: 'e.g. Primary: working parents in metro cities who order groceries 3+ times a month...',
  },
  {
    key: 'goals',
    title: 'Goals and success metrics',
    purpose: 'How you will know it worked.',
    goodLooksLike: [
      'One primary metric with a baseline, a target and a timeframe',
      'One or two supporting metrics',
      'A guardrail metric that must not get worse',
      'Ties each metric back to the problem',
    ],
    placeholder: 'e.g. Primary: repeat-basket orders per weekly shopper, from 0 to 1 in 8 weeks after launch. Guardrail: average order value...',
  },
  {
    key: 'scope',
    title: 'Scope and non-goals',
    purpose: 'What the first version includes, and what it deliberately leaves out.',
    goodLooksLike: [
      'A small first version that tests the riskiest assumption',
      'Explicit non-goals, each with a short reason',
      'Hints at what comes in a later version',
    ],
    placeholder: 'e.g. In V1: save a past order as a basket, one-tap reorder. Not in V1: auto-subscription (needs payment changes)...',
  },
  {
    key: 'requirements',
    title: 'Requirements',
    purpose: 'What the product must do, as user stories with priorities.',
    goodLooksLike: [
      'User stories in the form "As a ..., I want ..., so that ..."',
      'Each one prioritised (Must / Should / Could)',
      'Acceptance criteria that an engineer could test',
      'Covers edge cases such as out-of-stock items or empty states',
    ],
    placeholder: 'e.g. Must: As a weekly shopper, I want to reorder a saved basket in one tap, so that... Acceptance: out-of-stock items are shown with a substitute...',
  },
  {
    key: 'risks',
    title: 'Risks and dependencies',
    purpose: 'What could go wrong and what you depend on.',
    goodLooksLike: [
      'The two or three biggest risks (user, business, technical) with a mitigation for each',
      'Dependencies on other teams or systems',
      'Assumptions you have not yet validated',
    ],
    placeholder: 'e.g. Risk: users reorder less variety, lowering basket size. Mitigation: show "you might also need" under the basket...',
  },
  {
    key: 'questions',
    title: 'Open questions',
    purpose: 'What you still need to find out, and how.',
    goodLooksLike: [
      'Real unknowns, not rhetorical questions',
      'How each one will be answered (data pull, user test, experiment) and who owns it',
    ],
    placeholder: 'e.g. Do users want one saved basket or several? Answer with a 2-week fake-door test...',
  },
];

export type PrdSections = Record<PrdSectionKey, string>;

export interface PrdDraft {
  idea: string;
  context: string;
  sections: PrdSections;
}

export const emptySections = (): PrdSections =>
  Object.fromEntries(PRD_SECTION_KEYS.map((k) => [k, ''])) as PrdSections;

/** A section counts as attempted once it has at least this many characters. */
export const MIN_SECTION_CHARS = 40;
/** Reviews need the idea plus this many attempted sections; the example PRD needs a review first. */
export const MIN_SECTIONS_FOR_REVIEW = 3;

export const attemptedSections = (sections: Partial<PrdSections>) =>
  PRD_SECTION_KEYS.filter((k) => (sections[k] || '').trim().length >= MIN_SECTION_CHARS);

export interface PrdFix {
  fix: string;
  why: string;
}

export interface PrdSectionReview {
  key: PrdSectionKey;
  /** 1 to 5; 0 when the learner left the section empty. */
  score: number;
  works: string;
  fixes: PrdFix[];
}

export type PrdVerdict = 'Interview-ready' | 'Getting there' | 'Needs work';

export interface PrdReview {
  /** 0 to 100, the average of the section scores (empty sections count as 0). */
  overall: number;
  verdict: PrdVerdict;
  summary: string;
  topPriority: string;
  sections: PrdSectionReview[];
  reviewedAt: string;
}

export const verdictFor = (overall: number): PrdVerdict =>
  overall >= 80 ? 'Interview-ready' : overall >= 60 ? 'Getting there' : 'Needs work';

export const prdMarkdown = (draft: PrdDraft) =>
  [
    `# PRD: ${draft.idea.trim() || 'Untitled'}`,
    ...PRD_SECTIONS.map((s) => `## ${s.title}\n\n${draft.sections[s.key].trim() || '_Not written yet._'}`),
  ].join('\n\n');
