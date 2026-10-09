import React, { useEffect, useRef, useState } from 'react';
import {
  motion, AnimatePresence, MotionValue,
  useAnimationFrame, useMotionValue, useReducedMotion, useTransform
} from 'motion/react';
import {
  Sparkles, Compass, Users, Search, BarChart3, PenTool,
  Code2, FlaskConical, Map, ShieldCheck
} from 'lucide-react';

// Skills a modern PM needs, in orbit order.
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
const MOBILE_SKILLS = SKILLS.filter((s) => s.mobile);

// The orbit is a circle tilted away from the viewer, so it reads as an ellipse.
// Values are percentages of the square stage.
const ORBIT = { cx: 50, cy: 50, rx: 38, ry: 31 };
const SECONDS_PER_LAP = 60;

const useIsSmallScreen = () => {
  const query = '(max-width: 639px)';
  const [small, setSmall] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setSmall(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return small;
};

type Skill = (typeof SKILLS)[number];

const OrbitCard: React.FC<{ skill: Skill; offset: number; lap: MotionValue<number>; order: number; still: boolean }> = ({
  skill, offset, lap, order, still,
}) => {
  // Angle 0 sits at the top (behind the character); cards travel clockwise.
  const angle = useTransform(lap, (p) => (p + offset) * Math.PI * 2 - Math.PI / 2);
  const left = useTransform(angle, (a) => `${ORBIT.cx + ORBIT.rx * Math.cos(a)}%`);
  const top = useTransform(angle, (a) => `${ORBIT.cy + ORBIT.ry * Math.sin(a)}%`);
  // depth: 0 at the back of the orbit, 1 at the front
  const depth = useTransform(angle, (a) => (Math.sin(a) + 1) / 2);
  // Depth shows through fading only, so every skill stays the same size.
  const opacity = useTransform(depth, [0, 1], [0.55, 1]);
  const zIndex = useTransform(depth, (d) => (d > 0.42 ? 30 : 5));
  const Icon = skill.icon;

  return (
    <motion.li
      className="absolute"
      style={{ left, top, zIndex, x: '-50%', y: '-50%', opacity: still ? 1 : opacity }}
      initial={still ? false : { filter: 'blur(6px)' }}
      animate={{ filter: 'blur(0px)' }}
      exit={{ filter: 'blur(6px)', transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, delay: still ? 0 : 0.4 + order * 0.05 }}
    >
      <motion.div
        whileHover={still ? undefined : { y: -4, transition: { duration: 0.2 } }}
        className="group flex items-center gap-1.5 sm:gap-2"
      >
        <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-white text-[#065F46] shadow-[0_4px_12px_rgba(4,60,44,0.10)] transition-colors duration-300 group-hover:border-[#065F46] group-hover:bg-[#065F46] group-hover:text-white">
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.2} aria-hidden="true" />
        </span>
        {/* The off-white halo keeps the name readable when it passes in front of the character. */}
        <span
          className="max-w-[92px] sm:max-w-[96px] xl:max-w-[104px] text-[10px] sm:text-[11px] xl:text-xs font-semibold leading-tight text-[#0F2A3D] transition-colors duration-300 group-hover:text-[#065F46]"
          style={{ textShadow: '0 0 2px #FAFAF9, 0 0 6px #FAFAF9, 0 0 10px #FAFAF9' }}
        >
          {skill.label}
        </span>
      </motion.div>
    </motion.li>
  );
};

export const HeroSkillOrbit: React.FC = () => {
  // Visitors who ask for less motion get a still orbit.
  const reduceMotion = useReducedMotion() ?? false;
  const small = useIsSmallScreen();
  const skills = small ? MOBILE_SKILLS : SKILLS;

  // One lap = 1. Pauses while the pointer is over the orbit so cards can be read and hovered.
  const lap = useMotionValue(0.02);
  const paused = useRef(false);
  useAnimationFrame((_, delta) => {
    if (reduceMotion || paused.current) return;
    lap.set((lap.get() + delta / 1000 / SECONDS_PER_LAP) % 1);
  });

  return (
    <div
      className="hero-shot relative w-full max-w-[340px] sm:max-w-[500px] lg:max-w-[540px] aspect-square"
      onPointerEnter={() => { paused.current = true; }}
      onPointerLeave={() => { paused.current = false; }}
    >
      {/* Soft green glow the character sits in */}
      <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.20)_0%,rgba(20,184,166,0.08)_45%,transparent_70%)] pointer-events-none" />

      {/* Glowing orbital paths */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="orbit-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="orbit-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>
        <ellipse cx={ORBIT.cx} cy={ORBIT.cy} rx={ORBIT.rx} ry={ORBIT.ry} fill="none" stroke="url(#orbit-glow)" strokeOpacity="0.35" strokeWidth="1.2" filter="url(#orbit-blur)" />
        <motion.ellipse
          cx={ORBIT.cx} cy={ORBIT.cy} rx={ORBIT.rx} ry={ORBIT.ry}
          fill="none" stroke="url(#orbit-glow)" strokeOpacity="0.7" strokeWidth="0.3" strokeDasharray="0.6 1.4"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -40] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        />
        <ellipse cx={ORBIT.cx} cy={ORBIT.cy + 2} rx={ORBIT.rx - 12} ry={ORBIT.ry - 9} fill="none" stroke="#14B8A6" strokeOpacity="0.28" strokeWidth="0.25" />
      </svg>

      {/* Central 3D character */}
      <div className="absolute left-1/2 top-[52%] z-20 w-[46%] sm:w-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <img
          src="/landing/pm-character.png"
          alt="A product manager thinking at a laptop with a coffee mug"
          width={294}
          height={260}
          className="relative w-full h-auto drop-shadow-[0_18px_24px_rgba(4,60,44,0.22)] select-none"
          draggable={false}
        />
        <div className="mx-auto -mt-2 h-3 w-3/4 rounded-[50%] bg-[#043C2C]/10 blur-md" />
      </div>

      {/* Skill cards travelling along the orbit; front cards pass in front of the character */}
      <ul aria-label="Skills you will build">
        <AnimatePresence initial={false}>
          {skills.map((skill, i) => (
            <OrbitCard
              key={`${small ? 'm' : 'd'}-${skill.label}`}
              skill={skill}
              offset={i / skills.length}
              lap={lap}
              order={i}
              still={reduceMotion}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
