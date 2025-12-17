import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Rising Bars */}
      <rect x="8" y="28" width="8" height="12" rx="2" className="fill-indigo-900" />
      <rect x="18" y="20" width="8" height="20" rx="2" className="fill-indigo-600" />
      <rect x="28" y="14" width="8" height="26" rx="2" className="fill-indigo-400" />

      {/* Graduation Cap */}
      <path d="M28 6L14 13L28 20L42 13L28 6Z" className="fill-slate-900" />
      <path d="M42 13V22" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 13L28 20L42 13" stroke="#1E293B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Lightbulb Idea */}
      <circle cx="10" cy="14" r="3" className="fill-yellow-400" />
      <path d="M10 17V19" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 9L7 8" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 9L13 8" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 7V5" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};