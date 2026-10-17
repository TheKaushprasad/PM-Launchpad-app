// One place to load GSAP and register its plugins, so every component animates with the same setup.
// Import gsap, ScrollTrigger and useGSAP from here rather than from the packages directly.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Shared feel for the whole app: quick, soft, never bouncy.
gsap.defaults({ duration: 0.5, ease: 'power2.out' });

// Only animate for visitors who have not asked their system for reduced motion.
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, useGSAP };
