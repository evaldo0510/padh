import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 transition-all duration-700 ease-in-out group ${sizeClasses[size]} ${className}`}
      role="img"
      aria-label="PCH - Poesia Cognitiva Hipnótica Logo"
    >
      {/* Background Glow - Subtle violet aura */}
      <div className="absolute inset-0 bg-violet-600/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D1B4B" /> {/* roxo escuro */}
            <stop offset="100%" stopColor="#8B5CF6" /> {/* violeta */}
          </linearGradient>
          
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" /> {/* dourado profundo */}
            <stop offset="50%" stopColor="#FDE68A" /> {/* brilho central */}
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Ring - Represents the cycle of transformation */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#logo-gradient)"
          strokeWidth="0.5"
          strokeDasharray="2 6"
          className="opacity-20 animate-[spin_30s_linear_infinite]"
        />

        {/* Central Symbol - Minimalist Leaf/Feather Flow */}
        <path
          d="M50 85 C35 70 30 55 30 40 C30 25 40 15 50 15 C60 15 70 25 70 40 C70 55 65 70 50 85 Z"
          fill="url(#logo-gradient)"
          className="transition-all duration-700 group-hover:scale-105 origin-center opacity-90"
        />

        {/* The "Golden Flow" - Symbolic of Poetry and Insight */}
        <path
          d="M50 20 Q55 45 50 75"
          stroke="url(#gold-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#soft-glow)"
          className="transition-all duration-500 group-hover:stroke-[2]"
        />

        {/* Subtle Accents - Representing Consciousness (C) and Hypnosis (H) */}
        <path
          d="M38 35 A15 15 0 0 0 38 65"
          stroke="white"
          strokeWidth="0.5"
          className="opacity-20"
        />
        <path
          d="M62 35 A15 15 0 0 1 62 65"
          stroke="white"
          strokeWidth="0.5"
          className="opacity-20"
        />

        {/* The Spark of Transformation */}
        <circle cx="50" cy="15" r="2.5" fill="url(#gold-gradient)" filter="url(#soft-glow)">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Brand Acronym - Ultra minimalist */}
        <text
          x="50"
          y="53"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="white"
          className="opacity-60 tracking-[0.2em] pointer-events-none uppercase"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          PCH
        </text>
      </svg>

      {/* Grounding Shadow */}
      <div className="absolute -bottom-1 w-1/3 h-[1px] bg-white/5 blur-sm" />
    </div>
  );
};

export default Logo;