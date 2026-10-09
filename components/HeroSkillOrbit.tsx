import React from 'react';
import {
  Sparkles, Compass, Users, Search, BarChart3, PenTool,
  Code2, FlaskConical, Map, ShieldCheck
} from 'lucide-react';

// Skills a modern PM needs, placed clockwise from the top of the orbit.
// `mobile` cards stay on small screens, where the orbit is simplified to six.
const SKILLS = [
  { label: 'AI & LLMs', icon: Sparkles, mobile: true },
  { label: 'Product Strategy', icon: Compass, mobile: true },
  { label: 'Stakeholder Management', icon: Users, mobile: false },
  { label: 'User Research', icon: Search, mobile: true },
  { label: 'Data & Analytics', icon: BarChart3, mobile: true },
  { label: 'UX Design', icon: PenTool, mobile: false },
  { label: 'Engineering Collaboration', icon: Code2, mobile: false },
  { label: 'Experimentation', icon: FlaskConical, mobile: true },
  { label: 'Product Roadmaps', icon: Map, mobile: true },
  { label: 'Responsible AI', icon: ShieldCheck, mobile: false },
];

// Point on the orbit, as percentages of the square stage.
const orbitPoint = (index: number, count: number, rx: number, ry: number) => {
  const angle = ((-90 + (360 / count) * index) * Math.PI) / 180;
  return {
    x: `${(50 + rx * Math.cos(angle)).toFixed(2)}%`,
    y: `${(50 + ry * Math.sin(angle)).toFixed(2)}%`,
  };
};

const MOBILE_SKILLS = SKILLS.filter((s) => s.mobile);

export const HeroSkillOrbit: React.FC = () => (
  <div className="hero-shot relative w-full max-w-[340px] sm:max-w-[500px] lg:max-w-[540px] aspect-square">
    {/* Soft green glow the character sits in */}
    <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.20)_0%,rgba(20,184,166,0.08)_45%,transparent_70%)] pointer-events-none" />

    {/* Central 3D character */}
    <div className="absolute left-1/2 top-[52%] w-[46%] sm:w-[50%] -translate-x-1/2 -translate-y-1/2">
      <img
        src="/landing/pm-character.png"
        alt="A product manager thinking at a laptop with a coffee mug"
        width={294}
        height={260}
        className="relative z-10 w-full h-auto drop-shadow-[0_18px_24px_rgba(4,60,44,0.22)] select-none"
        draggable={false}
      />
      <div className="mx-auto -mt-2 h-3 w-3/4 rounded-[50%] bg-[#043C2C]/10 blur-md" />
    </div>

    {/* Orbit: rings and skill cards drift together */}
    <div className="hero-orbit absolute inset-0">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" aria-hidden="true">
        <ellipse cx="50" cy="50" rx="39" ry="39" fill="none" stroke="#10B981" strokeOpacity="0.5" strokeWidth="0.3" strokeDasharray="0.6 1.4" className="hero-orbit-ring" />
        <ellipse cx="50" cy="50" rx="27" ry="24" fill="none" stroke="#14B8A6" strokeOpacity="0.28" strokeWidth="0.25" />
        {[20, 128, 200, 305].map((deg) => {
          const a = (deg * Math.PI) / 180;
          return <circle key={deg} cx={50 + 39 * Math.cos(a)} cy={50 + 39 * Math.sin(a)} r="0.9" fill="#059669" fillOpacity="0.7" />;
        })}
        {[60, 240].map((deg) => {
          const a = (deg * Math.PI) / 180;
          return <circle key={deg} cx={50 + 27 * Math.cos(a)} cy={50 + 24 * Math.sin(a)} r="0.7" fill="#0D9488" fillOpacity="0.6" />;
        })}
      </svg>

      <ul aria-label="Skills you will build">
        {SKILLS.map((skill, i) => {
          const desktop = orbitPoint(i, SKILLS.length, 39, 39);
          const mobileIndex = MOBILE_SKILLS.indexOf(skill);
          const mobile = mobileIndex >= 0 ? orbitPoint(mobileIndex, MOBILE_SKILLS.length, 38, 37) : desktop;
          const Icon = skill.icon;
          return (
            <li
              key={skill.label}
              className={`${skill.mobile ? 'flex' : 'hidden sm:flex'} absolute z-20 -translate-x-1/2 -translate-y-1/2 left-[var(--mx)] top-[var(--my)] sm:left-[var(--x)] sm:top-[var(--y)]`}
              style={{ '--x': desktop.x, '--y': desktop.y, '--mx': mobile.x, '--my': mobile.y } as React.CSSProperties}
            >
              <div className="group flex w-[90px] sm:w-[100px] lg:w-[108px] flex-col items-center gap-1 sm:gap-1.5 rounded-2xl border border-emerald-200 bg-white px-1.5 py-2 sm:px-2 sm:py-2.5 text-center shadow-[0_8px_20px_rgba(4,60,44,0.08)] transition duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-[0_14px_28px_rgba(4,60,44,0.14)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <span className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-emerald-50 text-[#065F46] transition-colors duration-300 group-hover:bg-[#065F46] group-hover:text-white">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.2} aria-hidden="true" />
                </span>
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-semibold leading-tight text-[#0F2A3D]">
                  {skill.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);
