
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Graduation Cap */}
      <path 
        d="M25 45L50 35L75 45L50 55L25 45Z" 
        fill="#2D2B72" 
      />
      <path 
        d="M50 55V65C50 65 65 65 75 55" 
        stroke="#2D2B72" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M75 45V58" 
        stroke="#2D2B72" 
        strokeWidth="3" 
        strokeLinecap="round" 
      />
      <circle cx="75" cy="60" r="2.5" fill="#2D2B72" />
      
      {/* Lightbulb Spark */}
      <circle cx="23" cy="48" r="3" fill="#FFD700" />

      {/* Bar Chart Base */}
      <rect x="15" y="65" width="10" height="10" rx="2" fill="#2D2B72" />
      <rect x="28" y="58" width="10" height="17" rx="2" fill="#3B82F6" />
      <rect x="41" y="52" width="10" height="23" rx="2" fill="#60A5FA" />
    </svg>
  );
};
