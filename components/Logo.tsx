import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Steps / Growth Blocks */}
      <rect x="10" y="70" width="16" height="10" rx="2" fill="#1E1B4B" />
      <rect x="30" y="60" width="16" height="20" rx="2" fill="#3B82F6" />
      <rect x="50" y="50" width="16" height="30" rx="2" fill="#60A5FA" />
      
      {/* Lightbulb */}
      <circle cx="35" cy="40" r="4" fill="#FBBF24" />
      <path d="M35 44V46" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Graduation Cap */}
      <path 
        d="M38 48L65 35L92 48L65 61L38 48Z" 
        fill="#312E81" 
        stroke="#312E81" 
        strokeWidth="1" 
        strokeLinejoin="round" 
      />
      <path 
        d="M50 54V65C50 65 55 68 65 68C75 68 80 65 80 65V54" 
        fill="#312E81" 
      />
      <path 
        d="M92 48V60" 
        stroke="#312E81" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <circle cx="92" cy="62" r="2" fill="#312E81" />
    </svg>
  );
};
