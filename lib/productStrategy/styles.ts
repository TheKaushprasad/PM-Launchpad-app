// Strategy styles for the AI Product Strategy tool. Each style is plain config: its sections in
// order, what the AI should write in each, and the "why it matters" tip the user sees. To add a
// style, add an entry here; the form, the prompt, the preview and the PDF all read from this list.
//
// The tool uses these frameworks as structures only and credits their authors. It must not copy
// any paid template text or brand assets.

export interface StyleSection {
  key: string;
  title: string;
  /** What the AI should write (goes into the prompt). */
  guidance: string;
  /** Shown under the section in the preview: what this part of the framework is for. */
  tip: string;
}

export interface StrategyStyle {
  id: string;
  name: string;
  /** Framework credit for the preview and the PDF footer. */
  credit: string;
  bestFor: string;
  description: string;
  /** Canvas styles also get a one-page grid view in the PDF. */
  canvas: boolean;
  /** Always include an assumptions list for this style, even if the user did not tick it. */
  alwaysAssumptions?: boolean;
  sections: StyleSection[];
}

export const STRATEGY_STYLES: StrategyStyle[] = [
  {
    id: 'ST-01',
    name: 'Product Strategy Canvas',
    credit: 'Structure inspired by Melissa Perri’s product strategy work (Escaping the Build Trap)',
    bestFor: 'Assignments and interviews',
    description: 'Goes from vision to where you are today, then the bets that close the gap.',
    canvas: true,
    sections: [
      { key: 'vision', title: 'Vision', guidance: 'One or two sentences on the future the product creates for its users, within the time horizon. Inspiring but concrete.', tip: 'The vision is the north star every other section must serve. If a section does not move you towards it, cut it.' },
      { key: 'challenges', title: 'Challenges', guidance: 'The 2 to 4 biggest obstacles (user, market, business or tech) standing between today and the vision.', tip: 'Naming the hard problems shows you understand why this is not already solved.' },
      { key: 'target_condition', title: 'Target condition', guidance: 'Where the product must be by the end of the time horizon, stated as measurable outcomes.', tip: 'A target condition turns the vision into a dated, checkable goal. Interviewers look for this.' },
      { key: 'current_state', title: 'Current state', guidance: 'An honest picture of where the product is now (stage, users, metrics given by the user). Mark anything not given by the user as an assumption.', tip: 'Strategy is the path from here to there, so you need an honest “here”.' },
      { key: 'strategic_intents', title: 'Strategic intents', guidance: '2 or 3 focused areas the company will invest in to reach the target condition, each with why it beats the alternatives.', tip: 'Intents are choices: saying what you will focus on also says what you will not do.' },
      { key: 'product_initiatives', title: 'Product initiatives', guidance: '3 to 5 initiatives that deliver the intents, each tied to one intent and one expected outcome. These are bets, not a feature list.', tip: 'This is where a strategy becomes work. Each initiative should trace back to an intent.' },
      { key: 'metrics', title: 'Metrics', guidance: 'One North Star metric and 3 to 4 supporting metrics with targets. Label every number not given by the user as an assumption.', tip: 'Metrics tell you whether the bets worked. Without targets, nobody can say the strategy failed.' },
    ],
  },
  {
    id: 'ST-02',
    name: 'Product Vision Board',
    credit: 'Structure inspired by Roman Pichler’s Product Vision Board',
    bestFor: 'New products and early ideas',
    description: 'A one-page board: who it is for, what they need, what you build and why the business cares.',
    canvas: true,
    sections: [
      { key: 'vision', title: 'Vision', guidance: 'One sentence on the change the product brings to the world. It should not describe the product itself.', tip: 'The vision is your “why”. It stays the same even if the product changes.' },
      { key: 'target_group', title: 'Target group', guidance: 'The specific users and customers, with the primary segment first. Be narrow, not “everyone”.', tip: 'A narrow first segment is easier to win and easier to measure.' },
      { key: 'needs', title: 'Needs', guidance: 'The main problem or benefit for the target group, ranked. Use the user’s words where possible.', tip: 'Needs keep the board user-first: the product exists to meet these.' },
      { key: 'product', title: 'Product', guidance: 'The 3 to 5 key things the product does to meet the needs and what makes it stand out from the alternatives.', tip: 'Only the features that make the product special belong here, not a full backlog.' },
      { key: 'business_goals', title: 'Business goals', guidance: 'How the product benefits the company (revenue, growth, cost, brand) with measurable targets. Label made-up numbers as assumptions.', tip: 'A product that users love but does not help the business will not get funded.' },
    ],
  },
  {
    id: 'ST-03',
    name: 'One-page Strategy',
    credit: 'Structure inspired by Amplitude’s North Star and one-page strategy approach',
    bestFor: 'A fast first draft',
    description: 'One North Star metric, who you serve, your big bets and the input metrics that move it.',
    canvas: false,
    sections: [
      { key: 'north_star', title: 'North Star metric', guidance: 'One metric that captures the value users get, why it is the right one, and a target within the time horizon (assumption unless given).', tip: 'A good North Star measures value delivered to users, not just revenue or sign-ups.' },
      { key: 'personas', title: 'Personas and promises', guidance: '2 or 3 personas, each with the one promise the product makes to them.', tip: 'Each promise is something you can be held to. It keeps the team honest about who it serves.' },
      { key: 'key_bets', title: 'Key bets', guidance: '3 bets the team will make, each with the expected impact on the North Star and what you are choosing not to do.', tip: 'Bets admit uncertainty. Calling them bets makes it normal to stop one that is not working.' },
      { key: 'inputs_outputs', title: 'Inputs and outputs', guidance: '3 to 4 input metrics the team can move directly, and how each one drives the North Star (the output).', tip: 'Teams cannot move a North Star directly; they move inputs. This links daily work to the big goal.' },
    ],
  },
];

export const styleById = (id: string) => STRATEGY_STYLES.find((s) => s.id === id);
