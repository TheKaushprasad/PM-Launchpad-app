import { InterviewerPersona } from '../types/interview';

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
    avatarColor: 'from-blue-500 to-indigo-600',
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
    companyBackground: 'Ex-Stripe, Netflix',
    avatarColor: 'from-purple-500 to-pink-600',
    avatarImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    voiceGender: 'female',
    tagline: 'Strategic Vision, Competitive Moats & Unit Economics',
    description: 'Big-picture thinker. Priya evaluates your strategic intuition, network effects, monetization strategies, and long-term defensibility.',
    styleTrait: 'Visionary & High-Altitude',
    interviewerPhilosophy: 'Features are easy to build. Defensible business models and market positioning win games. Show me the 3-year moat.'
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
