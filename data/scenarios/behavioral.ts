import { DifficultyLevel, InterviewScenario } from '../../types/interview';

/**
 * Behavioral & Leadership round. Every PM loop has one; at Amazon it is spread
 * across the Leadership Principles. Answers are the candidate's own stories, so
 * there is no fact sheet: the interviewer probes for specifics instead.
 */
interface BehavioralSeed {
  id: string;
  question: string;
  title: string;
  company: string;
  companyColor: string;
  companyBadge: string;
  difficulty: DifficultyLevel;
  /** What the interviewer is really testing. */
  focus: string;
  competencies: string[];
  /** Follow-up probes a real interviewer would use. */
  probes: string[];
  /** Signals of a strong answer. */
  signals: string[];
  strongAnswer: string;
  curveball?: string;
}

const STAR_PATH = [
  'Situation: specific context, their role, and why it mattered (stakes)',
  'Task: what they personally owned',
  'Action: concrete steps they took, decisions and trade-offs, using "I" not "we"',
  'Result: measurable outcome, plus what they learned or would do differently'
];

const behavioral = (s: BehavioralSeed): InterviewScenario => ({
  id: s.id,
  track: 'behavioral',
  title: s.title,
  company: s.company,
  companyColor: s.companyColor,
  companyBadge: s.companyBadge,
  difficulty: s.difficulty,
  targetDurationMinutes: s.difficulty === 'Hard' ? 20 : 15,
  problemStatement: s.question,
  contextBackground: `What the interviewer is testing: ${s.focus}`,
  candidateBrief: [
    'Pick one real, specific story (not a hypothetical or a summary of many)',
    'Set the scene in two or three sentences, including the stakes',
    'Spend most of the time on what you personally did and why',
    'End with a measurable result and what you learned'
  ],
  keyEvaluationMetrics: s.competencies,
  suggestedFramework: 'STAR: Situation -> Task -> Action -> Result, with a short reflection at the end',
  benchmarkOutline: {
    clarificationQuestions: s.probes,
    coreHypothesesOrSegments: s.signals,
    analyticalPath: STAR_PATH,
    synthesisModel: s.strongAnswer
  },
  curveball: s.curveball
});

const AMAZON = { company: 'Amazon', companyColor: 'bg-zinc-900 text-amber-400', companyBadge: 'Leadership Principles' };
const GOOGLE = { company: 'Google', companyColor: 'bg-brand-500 text-white', companyBadge: 'Googleyness & Leadership' };
const META = { company: 'Meta', companyColor: 'bg-brand-600 text-white', companyBadge: 'Behavioral' };
const FLIPKART = { company: 'Flipkart', companyColor: 'bg-brand-600 text-white', companyBadge: 'Hiring Manager Round' };
const RAZORPAY = { company: 'Razorpay', companyColor: 'bg-brand-700 text-white', companyBadge: 'Culture Round' };
const MICROSOFT = { company: 'Microsoft', companyColor: 'bg-brand-600 text-white', companyBadge: 'Behavioral' };
const SWIGGY = { company: 'Swiggy', companyColor: 'bg-orange-500 text-white', companyBadge: 'Hiring Manager Round' };
const STRIPE = { company: 'Stripe', companyColor: 'bg-brand-600 text-white', companyBadge: 'Behavioral' };

export const BEHAVIORAL_SCENARIOS: InterviewScenario[] = [
  // ==========================================
  // 🟢 EASY: common openers and core stories
  // ==========================================
  behavioral({
    id: 'beh-why-pm',
    ...GOOGLE,
    difficulty: 'Easy',
    title: 'Why product management, and why now?',
    question: 'Tell me about yourself and why you want to be a product manager.',
    focus: 'a clear, honest narrative that connects past experience to PM work, without reciting a CV.',
    competencies: ['Self-awareness', 'Motivation', 'Concise storytelling'],
    probes: ['What specifically in your past work felt like product work?', 'What part of the PM job do you expect to find hardest?', 'Why this company rather than any PM role?'],
    signals: ['A two-minute arc, not a CV walk-through', 'One concrete example of doing PM-like work', 'Honest about gaps'],
    strongAnswer: 'A short arc: background, one concrete moment where they acted like a PM (for example, talking to users and changing what got built), what they learned, and why this role is the logical next step.'
  }),
  behavioral({
    id: 'beh-proudest-product',
    ...META,
    difficulty: 'Easy',
    title: 'Your proudest product or project',
    question: 'Tell me about the product or project you are most proud of.',
    focus: 'ownership and impact: what the candidate personally drove and how they measured success.',
    competencies: ['Ownership', 'Impact', 'User focus'],
    probes: ['What was your specific role versus the team\'s?', 'How did you know it was successful? What were the numbers?', 'What would you do differently?'],
    signals: ['Clear personal contribution', 'A measurable outcome', 'Mentions users and trade-offs, not just shipping'],
    strongAnswer: 'Names the problem and user, explains the key decision they made, quantifies the result (for example, activation up from 30% to 42%), and reflects on what they would change.'
  }),
  behavioral({
    id: 'beh-customer-obsession',
    ...AMAZON,
    difficulty: 'Easy',
    title: 'Customer Obsession: going beyond for a customer',
    question: 'Tell me about a time you went above and beyond for a customer or user.',
    focus: 'Customer Obsession: starting from the customer and working backwards, even when it was inconvenient.',
    competencies: ['Customer Obsession', 'Ownership', 'Judgment'],
    probes: ['How did you find out about the customer\'s problem?', 'What did it cost you or the team to help?', 'Did it change anything for other customers afterwards?'],
    signals: ['Real customer insight gathered first-hand', 'A trade-off accepted for the customer', 'Fix scaled beyond one customer'],
    strongAnswer: 'A specific customer problem found through direct contact, the extra step they took personally, the measurable effect, and how they turned a one-off fix into a lasting change.'
  }),
  behavioral({
    id: 'beh-learned-quickly',
    ...MICROSOFT,
    difficulty: 'Easy',
    title: 'Learning something new fast',
    question: 'Tell me about a time you had to learn something completely new very quickly to get your job done.',
    focus: 'learning agility and a growth mindset.',
    competencies: ['Learning agility', 'Resourcefulness', 'Growth mindset'],
    probes: ['How did you decide what to learn first?', 'Who did you ask for help?', 'How did you know you had learned enough?'],
    signals: ['A deliberate learning plan', 'Used people as well as documents', 'Applied the learning to a real outcome'],
    strongAnswer: 'Describes the gap, a deliberate approach to closing it (experts, docs, small experiments), the deadline pressure, and the concrete result.'
  }),
  behavioral({
    id: 'beh-prioritise-competing',
    ...SWIGGY,
    difficulty: 'Easy',
    title: 'Prioritising competing requests',
    question: 'Tell me about a time you had too many requests from different teams and had to decide what to work on.',
    focus: 'prioritisation with a clear rationale and communication to those who were told no.',
    competencies: ['Prioritisation', 'Stakeholder management', 'Communication'],
    probes: ['What framework or criteria did you use?', 'Who did you say no to, and how did they react?', 'Looking back, was it the right call?'],
    signals: ['Explicit criteria tied to goals', 'Said no clearly and kindly', 'Revisited the decision with data'],
    strongAnswer: 'Lists the competing asks, the criteria (impact on a goal metric, effort, urgency), the decision, how they told the teams that lost out, and the outcome.'
  }),
  behavioral({
    id: 'beh-feedback-received',
    ...GOOGLE,
    difficulty: 'Easy',
    title: 'Hard feedback you received',
    question: 'Tell me about the most difficult feedback you have received. What did you do with it?',
    focus: 'self-awareness and coachability.',
    competencies: ['Self-awareness', 'Coachability', 'Growth'],
    probes: ['How did you feel when you heard it?', 'What did you change, specifically?', 'How do you know the change stuck?'],
    signals: ['Real feedback, not a disguised strength', 'Concrete behaviour change', 'Evidence the change worked'],
    strongAnswer: 'Shares genuine critical feedback, admits the initial reaction, describes the specific habit they changed, and gives evidence (later feedback or results) that it stuck.'
  }),
  behavioral({
    id: 'beh-data-decision',
    ...RAZORPAY,
    difficulty: 'Easy',
    title: 'A decision you made with data',
    question: 'Tell me about a decision you made using data. What did the data show and what did you decide?',
    focus: 'data-informed judgment, including knowing the limits of the data.',
    competencies: ['Analytical thinking', 'Judgment', 'Bias for action'],
    probes: ['Where did the data come from and how much did you trust it?', 'What did the data not tell you?', 'What happened after the decision?'],
    signals: ['States the key numbers', 'Acknowledges data limits', 'Clear decision and follow-up'],
    strongAnswer: 'Explains the question, the data gathered, the key numbers, the decision, what the data could not answer, and the measured outcome.'
  }),
  behavioral({
    id: 'beh-team-motivation',
    ...FLIPKART,
    difficulty: 'Easy',
    title: 'Keeping a team motivated',
    question: 'Tell me about a time your team was demotivated. What did you do?',
    focus: 'leadership without authority and empathy for the team.',
    competencies: ['Leadership', 'Empathy', 'Communication'],
    probes: ['How did you find out why they were demotivated?', 'What was in your control and what was not?', 'How did morale change, and how could you tell?'],
    signals: ['Diagnosed the cause by talking to people', 'Took concrete action, not just a pep talk', 'Visible change in output or morale'],
    strongAnswer: 'Names the cause found through one-on-ones, the concrete changes (clearer goals, removing a blocker, celebrating wins), and observable improvement.'
  }),

  // ==========================================
  // 🟡 MEDIUM: conflict, failure, influence
  // ==========================================
  behavioral({
    id: 'beh-disagree-engineering',
    ...META,
    difficulty: 'Medium',
    title: 'Disagreeing with an engineering lead',
    question: 'Tell me about a time you strongly disagreed with an engineering lead. How did you resolve it?',
    focus: 'handling conflict constructively and building trust with engineering.',
    competencies: ['Conflict resolution', 'Collaboration', 'Influence'],
    probes: ['What was their argument, in their words?', 'What did you concede?', 'How is your relationship with them now?'],
    signals: ['Can state the other side fairly', 'Used data or users to break the tie', 'Relationship intact or better'],
    strongAnswer: 'States both positions fairly, how they found common ground (shared goal, data, a small test), what they gave up, the decision and its result, and the healthy relationship afterwards.',
    curveball: 'Ask what they would have done if the engineering lead had escalated to their manager without telling them.'
  }),
  behavioral({
    id: 'beh-failure',
    ...GOOGLE,
    difficulty: 'Medium',
    title: 'A product that failed',
    question: 'Tell me about a time something you launched failed or did not meet its goals.',
    focus: 'accountability, honest post-mortem thinking and learning.',
    competencies: ['Accountability', 'Learning', 'Judgment'],
    probes: ['What was your part in the failure?', 'When did you first see warning signs?', 'What do you do differently now?'],
    signals: ['Owns their part without blaming others', 'Specific lesson, applied later', 'Numbers for the miss'],
    strongAnswer: 'Real failure with numbers, honest ownership of their mistakes, what they did to limit damage, and a specific lesson they applied in a later project.'
  }),
  behavioral({
    id: 'beh-disagree-and-commit',
    ...AMAZON,
    difficulty: 'Medium',
    title: 'Have Backbone; Disagree and Commit',
    question: 'Tell me about a time you disagreed with your manager\'s decision. What did you do?',
    focus: 'Have Backbone; Disagree and Commit: challenging respectfully, then committing fully once a decision is made.',
    competencies: ['Have Backbone; Disagree and Commit', 'Judgment', 'Communication'],
    probes: ['How did you raise the disagreement?', 'What happened after the decision went against you?', 'Who turned out to be right?'],
    signals: ['Raised it with data, privately and early', 'Committed fully afterwards', 'Reflects honestly on who was right'],
    strongAnswer: 'Disagreed with evidence at the right moment, accepted the decision, executed it fully without undermining it, and reflects on the outcome.'
  }),
  behavioral({
    id: 'beh-influence-without-authority',
    ...MICROSOFT,
    difficulty: 'Medium',
    title: 'Influence without authority',
    question: 'Tell me about a time you had to convince another team, which did not report to you, to change their roadmap for your project.',
    focus: 'influence through shared goals, data and relationships rather than escalation.',
    competencies: ['Influence', 'Stakeholder management', 'Strategic thinking'],
    probes: ['What did the other team gain?', 'What did you try first that did not work?', 'Did you escalate? Why or why not?'],
    signals: ['Framed the ask in their goals', 'Adjusted approach when blocked', 'Got the outcome without burning bridges'],
    strongAnswer: 'Understood the other team\'s goals, reframed the ask as a win for them, offered something in return, and reached a decision with measurable results.'
  }),
  behavioral({
    id: 'beh-ambiguity',
    ...STRIPE,
    difficulty: 'Medium',
    title: 'Working with high ambiguity',
    question: 'Tell me about a time you were given a vague goal with no clear plan. How did you get started?',
    focus: 'creating clarity from ambiguity: framing the problem, picking a first step, and setting checkpoints.',
    competencies: ['Dealing with ambiguity', 'Problem framing', 'Bias for action'],
    probes: ['How did you decide what problem to solve first?', 'What did you deliberately not do?', 'How did you know you were on the right track?'],
    signals: ['Defined the problem and success before solutions', 'Small, fast first step', 'Checkpoints with stakeholders'],
    strongAnswer: 'Turned a vague goal into a clear problem statement and success metric, ran a fast discovery step, chose a direction with explicit trade-offs, and showed results.'
  }),
  behavioral({
    id: 'beh-deliver-results',
    ...AMAZON,
    difficulty: 'Medium',
    title: 'Deliver Results under a tight deadline',
    question: 'Tell me about a time you had to deliver something important with a deadline that felt impossible.',
    focus: 'Deliver Results: focusing on the key inputs and delivering with quality despite setbacks.',
    competencies: ['Deliver Results', 'Prioritisation', 'Execution'],
    probes: ['What did you cut, and why?', 'What setback did you hit along the way?', 'Did you hit the deadline? What was the quality like?'],
    signals: ['Explicit scope cuts with rationale', 'Handled a setback', 'Delivered and measured the outcome'],
    strongAnswer: 'Re-scoped to the essential outcome, made explicit trade-offs, handled at least one setback, delivered on time, and reports the measured impact.'
  }),
  behavioral({
    id: 'beh-say-no-leadership',
    ...SWIGGY,
    difficulty: 'Medium',
    title: 'Saying no to a senior leader',
    question: 'Tell me about a time a senior leader asked for a feature you believed was wrong. What did you do?',
    focus: 'courage and judgment when pushing back upwards, while staying open to being wrong.',
    competencies: ['Courage', 'Stakeholder management', 'Product judgment'],
    probes: ['What was their reasoning?', 'What evidence did you bring?', 'What would you have done if they insisted?'],
    signals: ['Understood the leader\'s underlying goal', 'Offered an alternative that met it', 'Respectful, data-backed pushback'],
    strongAnswer: 'Found the goal behind the request, presented evidence and an alternative that served it better, and reached a decision (theirs or the leader\'s) with a clear outcome.'
  }),
  behavioral({
    id: 'beh-user-research-surprise',
    ...RAZORPAY,
    difficulty: 'Medium',
    title: 'When users surprised you',
    question: 'Tell me about a time user research changed what you were building.',
    focus: 'genuine user focus and willingness to change plans based on evidence.',
    competencies: ['User empathy', 'Discovery', 'Adaptability'],
    probes: ['What did you believe before the research?', 'How did you convince the team to change course?', 'What did the change achieve?'],
    signals: ['Clear before-and-after belief', 'Changed the plan, not just noted the finding', 'Outcome data'],
    strongAnswer: 'States the original assumption, the specific research insight, how they changed the roadmap and convinced the team, and the measured result.'
  }),
  behavioral({
    id: 'beh-invent-simplify',
    ...AMAZON,
    difficulty: 'Medium',
    title: 'Invent and Simplify',
    question: 'Tell me about a time you found a much simpler way to solve a problem.',
    focus: 'Invent and Simplify: looking for new ideas and removing complexity.',
    competencies: ['Invent and Simplify', 'Creativity', 'Customer focus'],
    probes: ['What was the complicated approach everyone assumed?', 'How did you test that the simpler way worked?', 'What did it save?'],
    signals: ['Clear contrast between old and new approach', 'Validated before rolling out', 'Quantified savings or impact'],
    strongAnswer: 'Describes the complex default, the simpler idea and where it came from, how they tested it, and the savings in time, cost or user effort.'
  }),
  behavioral({
    id: 'beh-missed-deadline',
    ...FLIPKART,
    difficulty: 'Medium',
    title: 'A deadline you missed',
    question: 'Tell me about a time you missed a commitment or deadline.',
    focus: 'accountability and communication when things slip.',
    competencies: ['Accountability', 'Communication', 'Planning'],
    probes: ['When did you realise it would slip?', 'Who did you tell, and when?', 'What changed in how you plan?'],
    signals: ['Flagged early', 'Owned it without excuses', 'Changed planning habits'],
    strongAnswer: 'Owns the miss, explains when and how they raised it, the recovery plan, and the planning change they made afterwards.'
  }),
  behavioral({
    id: 'beh-mentor',
    ...GOOGLE,
    difficulty: 'Medium',
    title: 'Helping someone grow',
    question: 'Tell me about a time you helped a colleague grow or improve.',
    focus: 'leadership and investing in others.',
    competencies: ['Mentorship', 'Leadership', 'Empathy'],
    probes: ['How did you know what they needed?', 'What did you do week to week?', 'How did they change?'],
    signals: ['Tailored to the person', 'Sustained effort', 'Visible growth'],
    strongAnswer: 'Identifies the colleague\'s specific gap, the deliberate support given over time, and the concrete growth that followed.'
  }),
  behavioral({
    id: 'beh-bias-for-action',
    ...AMAZON,
    difficulty: 'Medium',
    title: 'Bias for Action with incomplete information',
    question: 'Tell me about a time you made a decision quickly without all the information you wanted.',
    focus: 'Bias for Action: taking calculated risks when decisions are reversible.',
    competencies: ['Bias for Action', 'Judgment', 'Risk management'],
    probes: ['Was the decision reversible?', 'What information were you missing?', 'How did you limit the downside?'],
    signals: ['Recognised reversibility', 'Limited risk deliberately', 'Followed up with data'],
    strongAnswer: 'Explains why waiting was costly, why the decision was reversible, how they limited risk, and what the outcome and follow-up data showed.'
  }),

  // ==========================================
  // 🔴 HARD: senior-level judgment
  // ==========================================
  behavioral({
    id: 'beh-kill-project',
    ...META,
    difficulty: 'Hard',
    title: 'Killing a project people loved',
    question: 'Tell me about a time you decided to stop or kill a project that your team had invested a lot in.',
    focus: 'senior judgment: sunk cost, communication and looking after the team.',
    competencies: ['Strategic judgment', 'Communication', 'Leadership'],
    probes: ['What signal made you decide?', 'How did you tell the team?', 'What happened to the people and the learnings?'],
    signals: ['Clear stopping criteria', 'Handled team morale deliberately', 'Redeployed effort to higher value'],
    strongAnswer: 'Explains the evidence and criteria, resisted sunk cost, communicated with care, kept the learnings, and moved the team to higher-impact work with results.',
    curveball: 'Ask what they would have done if their own manager wanted to keep the project going.'
  }),
  behavioral({
    id: 'beh-think-big',
    ...AMAZON,
    difficulty: 'Hard',
    title: 'Think Big: a bold vision',
    question: 'Tell me about a time you proposed a much bigger vision than what was asked of you.',
    focus: 'Think Big: creating a bold direction and getting others to follow it.',
    competencies: ['Think Big', 'Vision', 'Influence'],
    probes: ['What was originally asked?', 'How did you get buy-in for the bigger idea?', 'What part actually happened?'],
    signals: ['Clear contrast between the ask and the vision', 'Grounded in customer need', 'Concrete first steps and outcome'],
    strongAnswer: 'Contrasts the small ask with a bigger customer-backed vision, explains how they won support, the first milestone delivered and what it achieved.'
  }),
  behavioral({
    id: 'beh-ethics',
    ...STRIPE,
    difficulty: 'Hard',
    title: 'Doing the right thing under pressure',
    question: 'Tell me about a time you were under pressure to ship something you thought could harm users or the company.',
    focus: 'integrity and judgment when business goals conflict with user trust.',
    competencies: ['Integrity', 'User trust', 'Courage'],
    probes: ['Who was pushing and why?', 'What exactly was the risk?', 'What did it cost you to push back?'],
    signals: ['Specific risk identified', 'Proposed a safer path that still met the goal', 'Accepted personal cost'],
    strongAnswer: 'Names the risk to users, raises it with evidence, proposes a safer alternative that still serves the business goal, and describes the outcome and cost.'
  }),
  behavioral({
    id: 'beh-cross-functional-crisis',
    ...SWIGGY,
    difficulty: 'Hard',
    title: 'Leading through an outage or crisis',
    question: 'Tell me about a time you led a team through a crisis, such as a major outage or incident.',
    focus: 'calm leadership, clear communication and follow-through after the fire.',
    competencies: ['Crisis leadership', 'Communication', 'Ownership'],
    probes: ['What did you do in the first hour?', 'How did you communicate with customers and leaders?', 'What changed afterwards to prevent a repeat?'],
    signals: ['Clear roles and communication cadence', 'Customer impact limited', 'Post-mortem led to real fixes'],
    strongAnswer: 'Explains the first actions, how they set roles and update cadence, customer communication, the resolution timeline, and preventive changes that stuck.'
  }),
  behavioral({
    id: 'beh-earn-trust',
    ...AMAZON,
    difficulty: 'Hard',
    title: 'Earn Trust after a mistake',
    question: 'Tell me about a time you lost the trust of a stakeholder or team. How did you earn it back?',
    focus: 'Earn Trust: listening, speaking candidly and being self-critical.',
    competencies: ['Earn Trust', 'Self-awareness', 'Relationship building'],
    probes: ['What did you do that broke trust?', 'How did you find out?', 'How do you know trust was restored?'],
    signals: ['Owns the cause', 'Consistent actions over time', 'Evidence of restored trust'],
    strongAnswer: 'Names their mistake candidly, the direct conversation they had, consistent actions over weeks, and clear evidence the relationship recovered.'
  }),
  behavioral({
    id: 'beh-strategy-change',
    ...GOOGLE,
    difficulty: 'Hard',
    title: 'Changing a team\'s strategy',
    question: 'Tell me about a time you changed the strategy or direction of your product. How did you bring people along?',
    focus: 'strategic thinking plus change management across teams and leaders.',
    competencies: ['Strategy', 'Influence', 'Change management'],
    probes: ['What evidence told you the old strategy was wrong?', 'Who resisted most and why?', 'How did you measure whether the new strategy worked?'],
    signals: ['Evidence-led case for change', 'Addressed resistance directly', 'Measurable outcomes of the new direction'],
    strongAnswer: 'Explains the evidence, the new strategy and its trade-offs, how they won over sceptics, and the metrics that showed it working.'
  }),
  behavioral({
    id: 'beh-hire-raise-bar',
    ...AMAZON,
    difficulty: 'Hard',
    title: 'Hire and Develop the Best',
    question: 'Tell me about a time you raised the bar on your team, through hiring, coaching or by setting a higher standard.',
    focus: 'Hire and Develop the Best and Insist on the Highest Standards.',
    competencies: ['Hire and Develop the Best', 'Insist on the Highest Standards', 'Leadership'],
    probes: ['What was the standard before?', 'Who pushed back on the higher bar?', 'How did quality change?'],
    signals: ['Specific standard raised', 'Handled pushback', 'Quality measured before and after'],
    strongAnswer: 'Defines the old and new standard, how they introduced it, the pushback and how it was handled, and the measured improvement.'
  }),
  behavioral({
    id: 'beh-tradeoff-quality-speed',
    ...FLIPKART,
    difficulty: 'Hard',
    title: 'Trading quality for speed',
    question: 'Tell me about a time you had to choose between shipping fast and shipping with high quality. What did you choose and why?',
    focus: 'explicit trade-off reasoning and owning the consequences.',
    competencies: ['Judgment', 'Execution', 'Risk management'],
    probes: ['What would have happened if you had chosen the other way?', 'How did you limit the downside?', 'Would you make the same call again?'],
    signals: ['Weighed both options with evidence', 'Mitigation plan for the risk taken', 'Honest reflection'],
    strongAnswer: 'States the choice, the evidence behind it, how they limited the downside (flags, staged rollout, follow-up fixes), the result, and an honest reflection.'
  }),
  behavioral({
    id: 'beh-dive-deep',
    ...AMAZON,
    difficulty: 'Hard',
    title: 'Dive Deep into a problem',
    question: 'Tell me about a time a metric looked fine on the surface but you dug in and found a real problem.',
    focus: 'Dive Deep: staying connected to details and auditing frequently.',
    competencies: ['Dive Deep', 'Analytical rigour', 'Ownership'],
    probes: ['What made you suspicious?', 'What did you look at, step by step?', 'What did you fix and what did it change?'],
    signals: ['Specific trigger for suspicion', 'Methodical investigation', 'Measurable fix'],
    strongAnswer: 'Explains the anomaly that triggered curiosity, the step-by-step investigation, the hidden problem found, the fix and its measurable impact.'
  }),
  behavioral({
    id: 'beh-remote-team-alignment',
    ...MICROSOFT,
    difficulty: 'Hard',
    title: 'Aligning teams across time zones',
    question: 'Tell me about a time you had to align several teams in different locations on one launch.',
    focus: 'program leadership: clear goals, decision rights and communication at scale.',
    competencies: ['Cross-functional leadership', 'Communication', 'Execution'],
    probes: ['How did decisions get made when people disagreed?', 'What broke down, and how did you fix it?', 'How did the launch go?'],
    signals: ['Clear decision-making process', 'Fixed a real breakdown', 'Launch outcome measured'],
    strongAnswer: 'Describes the teams and goal, the alignment mechanisms (single goal metric, decision owner, written updates), a breakdown they fixed, and the launch result.'
  })
];
