import React from 'react';
import { motion } from 'framer-motion';

export const RocketIllustration: React.FC<{ className?: string }> = ({ className = "w-80 lg:w-96 h-56 lg:h-64" }) => {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-blue-500/25 via-indigo-500/10 to-transparent blur-3xl rounded-full transform translate-x-2 -translate-y-2" />

      {/* Floating Sparkle Stars */}
      <div className="absolute top-2 left-8 text-amber-300 text-sm animate-pulse opacity-90">✦</div>
      <div className="absolute top-8 right-14 text-amber-300 text-base animate-pulse opacity-85" style={{ animationDelay: '800ms' }}>★</div>
      <div className="absolute bottom-6 right-8 text-amber-200 text-xs opacity-75">✦</div>
      <div className="absolute top-24 left-3 text-sky-300 text-xs opacity-80" style={{ animationDelay: '400ms' }}>★</div>
      <div className="absolute bottom-3 left-14 text-blue-300 text-xs opacity-70">✦</div>

      {/* Floating badge: "Smarter learning for brighter PMs" (Left of rocket) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="absolute left-1 lg:left-0 top-10 -rotate-6 z-20"
      >
        <div className="px-3.5 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/15 shadow-xl text-center">
          <p className="text-[11px] font-bold text-slate-100 leading-tight">
            Smarter learning
          </p>
          <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
            for brighter PMs
          </p>
        </div>
      </motion.div>

      {/* 3D Glossy Rocket Centerpiece with gentle floating animation */}
      <motion.div 
        animate={{ 
          y: [-5, 5, -5],
          rotate: [-1, 1, -1]
        }}
        transition={{ 
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10 w-48 h-48 lg:w-56 lg:h-56 flex items-center justify-center"
      >
        <svg 
          viewBox="0 0 240 240" 
          className="w-full h-full filter drop-shadow-[0_12px_28px_rgba(56,189,248,0.35)]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rocket Fuselage Metallic Body */}
            <linearGradient id="fuselageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="25%" stopColor="#F8FAFC" />
              <stop offset="55%" stopColor="#FFFFFF" />
              <stop offset="85%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            {/* Specular Longitudinal Highlight */}
            <linearGradient id="specularGleam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Nose Cone Red/Coral Accent */}
            <linearGradient id="noseConeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="50%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>

            {/* Wings/Fins Left Gradient */}
            <linearGradient id="leftWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="60%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>

            {/* Wings/Fins Right Gradient */}
            <linearGradient id="rightWingGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="60%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>

            {/* Center Dorsal Spine Fin */}
            <linearGradient id="spineFinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BE123C" />
              <stop offset="50%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>

            {/* Engine Bell Nozzle */}
            <linearGradient id="nozzleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="40%" stopColor="#64748B" />
              <stop offset="70%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            {/* Outer Exhaust Flame Plume (Fiery Cyan/Blue to violet) */}
            <linearGradient id="outerFlameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="35%" stopColor="#0284C7" />
              <stop offset="75%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>

            {/* Mid Flame Plume (Vibrant Cyan) */}
            <linearGradient id="midFlameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#67E8F9" />
              <stop offset="70%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
            </linearGradient>

            {/* Core Hot White Flame */}
            <linearGradient id="coreFlameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>

            {/* Porthole Glass Gradient */}
            <radialGradient id="portholeGlass" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="30%" stopColor="#38BDF8" />
              <stop offset="75%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0C4A6E" />
            </radialGradient>
          </defs>

          {/* Unified Rocket Assembly: Angled at 45 degrees towards top-right */}
          <g transform="translate(120, 120) rotate(45) translate(-120, -120)">
            {/* 1. Exhaust Flame Plumes (Directly below nozzle at X=120) */}
            {/* Outer Wide Plume */}
            <path 
              d="M102 154 C92 185 106 215 120 230 C134 215 148 185 138 154 Z" 
              fill="url(#outerFlameGrad)" 
              opacity="0.95"
            />
            {/* Mid Vibrant Plume */}
            <path 
              d="M108 154 C100 178 112 205 120 216 C128 205 140 178 132 154 Z" 
              fill="url(#midFlameGrad)" 
            />
            {/* Core Hot White Flame */}
            <path 
              d="M112 154 C110 170 116 190 120 196 C124 190 130 170 128 154 Z" 
              fill="url(#coreFlameGrad)" 
            />
            {/* White Hot Ignition Core Spark */}
            <ellipse cx="120" cy="156" rx="8" ry="4" fill="#FFFFFF" opacity="0.95" />

            {/* 2. Swept-Back Symmetrical Wings / Fins (Under the fuselage) */}
            {/* Left Wing */}
            <path 
              d="M93 115 C80 125 54 148 50 162 C64 163 88 152 97 144 Z" 
              fill="url(#leftWingGrad)" 
              filter="drop-shadow(-3px 4px 5px rgba(15,23,42,0.4))"
            />
            {/* Right Wing */}
            <path 
              d="M147 115 C160 125 186 148 190 162 C176 163 152 152 143 144 Z" 
              fill="url(#rightWingGrad)" 
              filter="drop-shadow(3px 4px 5px rgba(15,23,42,0.4))"
            />

            {/* 3. Engine Bell Nozzle */}
            <path 
              d="M106 144 L134 144 L138 155 L102 155 Z" 
              fill="url(#nozzleGrad)" 
            />
            <ellipse cx="120" cy="155" rx="18" ry="3.5" fill="#1E293B" />
            <ellipse cx="120" cy="144" rx="14" ry="2.5" fill="#0F172A" />

            {/* 4. Aerodynamic Fuselage Body (Smooth parabolic 3D rocket hull) */}
            <path 
              d="M120 32 
                 C105 50 92 88 94 144 
                 C102 147 138 147 146 144 
                 C148 88 135 50 120 32 Z" 
              fill="url(#fuselageGrad)" 
            />

            {/* Longitudinal Specular Highlight on Hull */}
            <path 
              d="M120 34 
                 C114 52 108 85 109 144 
                 C114 145 126 145 131 144 
                 C132 85 126 52 120 34 Z" 
              fill="url(#specularGleam)" 
              opacity="0.8"
            />

            {/* 5. Nose Cone Cap (Red/Coral Accent) */}
            <path 
              d="M120 32 
                 C113 42 106 58 103 72 
                 C110 74 130 74 137 72 
                 C134 58 127 42 120 32 Z" 
              fill="url(#noseConeGrad)" 
            />

            {/* 6. Center Dorsal Spine Fin (Adds rich 3D depth) */}
            <path 
              d="M118 116 C117 130 116 144 117 154 L123 154 C124 144 123 130 122 116 Z" 
              fill="url(#spineFinGrad)" 
            />

            {/* 7. Centered Porthole Window */}
            {/* Outer Beveled Chrome Rim */}
            <circle cx="120" cy="102" r="16" fill="#94A3B8" />
            <circle cx="120" cy="102" r="14.5" fill="#F1F5F9" />
            <circle cx="120" cy="102" r="12.5" fill="#64748B" />
            {/* Deep Cyan Glass */}
            <circle cx="120" cy="102" r="11" fill="url(#portholeGlass)" />
            {/* Glass Curved Glare / Reflection */}
            <ellipse cx="117" cy="99" rx="4.5" ry="2.5" transform="rotate(-35 117 99)" fill="#FFFFFF" opacity="0.85" />
          </g>
        </svg>
      </motion.div>

      {/* Playful script text: "Learn Practice Grow ⤹" (Right of rocket) */}
      <motion.div 
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="absolute right-0 lg:right-2 top-4 flex flex-col items-start text-white/95 z-20"
      >
        <span className="font-semibold text-xs tracking-tight text-slate-100">Learn</span>
        <span className="font-semibold text-xs tracking-tight text-slate-200">Practice</span>
        <div className="flex items-center gap-1">
          <span className="font-bold text-xs tracking-tight text-white">Grow</span>
          <svg className="w-4 h-4 text-white -rotate-12 translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10a8 8 0 0 0 12 8l4-4" />
            <path d="M12 22l4-4-4-4" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};
