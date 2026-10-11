import { InterviewerPersona } from '../types/interview';

/**
 * Every new interview uses this one interviewer. The other personas stay listed only so
 * older scorecards still show who interviewed them.
 */
export const ACTIVE_INTERVIEWER_ID = 'priya';

export const INTERVIEWER_PERSONAS: InterviewerPersona[] = [
  {
    id: 'maya',
    name: 'Maya Chen',
    role: 'Principal PM',
    companyBackground: 'Ex-Google, Airbnb',
    avatarColor: 'from-amber-400 to-rose-400',
    avatarImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    voiceGender: 'female',
    tagline: 'Empathetic, Structured, Framework-Oriented',
    description: 'Encouraging yet thorough. Maya is perfect for first-timers and structured thinkers, helping you organize messy thoughts into clean, logical frameworks.',
    styleTrait: 'Supportive & Methodical',
    interviewerPhilosophy: 'I value clarity of thought, user-centric empathy, and systematic decomposition above fast, unfiltered answers.'
  },
  {
    id: 'alex',
    name: 'Alex Rivera',
    role: 'Staff Product Manager',
    companyBackground: 'Ex-Uber, Meta',
    avatarColor: 'from-[#3B82F6] to-[#4F46E5]',
    avatarImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    voiceGender: 'female',
    tagline: 'Analytical, Data-Rigorous, Quantitative',
    description: 'Data-driven and sharp. Alex pushes for metric definitions, base assumptions, sanity checks on guesstimates, and MECE segmentation.',
    styleTrait: 'Data-Driven & Inquisitive',
    interviewerPhilosophy: 'If you cannot quantify your assumptions or isolate the primary metric drop mathematically, you are guessing, not managing product.'
  },
  {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'VP of Product',
    companyBackground: 'Ex-Stripe, Netflix, Flipkart',
    avatarColor: 'from-[#A855F7] to-[#DB2777]',
    avatarImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    voiceGender: 'female',
    tagline: 'Hiring bar raiser across every PM round',
    description: 'Priya runs every round: product design, metrics, RCA, guesstimates, strategy, behavioral and AI product. She is calm and fair, asks one sharp question at a time, and holds the same hiring bar for everyone.',
    styleTrait: 'Calm, Rigorous & Fair',
    interviewerPhilosophy: 'Clear structure, honest assumptions and a decision you can defend. I care how you think, not whether you guess my answer.'
  },
  {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Director of Product',
    companyBackground: 'Ex-Amazon, Swiggy',
    avatarColor: 'from-emerald-500 to-teal-600',
    avatarImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    voiceGender: 'male',
    tagline: 'Execution, Edge Cases, Tradeoffs & GTM',
    description: 'Pragmatic and execution-focused. Marcus stresses technical constraints, risk mitigation, rollout phases, and stakeholder tradeoffs.',
    styleTrait: 'Pragmatic & Execution-Heavy',
    interviewerPhilosophy: 'A strategy without a flawless execution and risk rollback plan is just a wishlist. How does this survive contact with reality?'
  }
];

export const ACTIVE_INTERVIEWER: InterviewerPersona =
  INTERVIEWER_PERSONAS.find((p) => p.id === ACTIVE_INTERVIEWER_ID) || INTERVIEWER_PERSONAS[0];
