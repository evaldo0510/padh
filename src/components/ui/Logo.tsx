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
      {/* Background Glow */}
      <div className="absolute inset-0 bg-violet-600/20 blur-xl rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D1B4B" /> {/* roxo escuro */}
            <stop offset="50%" stopColor="#8B5CF6" /> {/* violeta */}
            <stop offset="100%" stopColor="#2D1B4B" />
          </linearGradient>
          
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" /> {/* dourado escuro */}
            <stop offset="50%" stopColor="#FDE68A" /> {/* brilho dourado */}
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Circular Flow - Represents Consciousness and Transformation */}
        <path
          d="M50 5 C74.85 5 95 25.15 95 50 C95 74.85 74.85 95 50 95 C25.15 95 5 74.85 5 50"
          stroke="url(#logo-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="animate-[spin_20s_linear_infinite] opacity-30"
          strokeDasharray="4 4"
        />

        {/* Main Symbolic Element: Stylized Feather/Flame/Flow */}
        <path
          d="M50 85C50 85 30 65 30 45C30 25 50 15 50 15C50 15 70 25 70 45C70 65 50 85 50 85Z"
          fill="url(#logo-gradient)"
          className="transition-all duration-700 group-hover:scale-110 origin-center"
        />
        
        {/* Inner Detail - The "Flow" of Poetry */}
        <path
          d="M50 20C55 35 45 55 50 80"
          stroke="url(#gold-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Abstract "C" Shape for Cognitiva/Consciousness */}
        <path
          d="M35 35C28 42 28 58 35 65"
          stroke="url(#gold-gradient)"
          strokeWidth="1"
          strokeLinecap="round"
          className="opacity-40"
        />
        
        {/* Abstract "H" Accent for Hipnótica/Hypnosis */}
        <path
          d="M65 35C72 42 72 58 65 65"
          stroke="url(#gold-gradient)"
          strokeWidth="1"
          strokeLinecap="round"
          className="opacity-40"
        />

        {/* The Golden Sparkle / Light */}
        <circle cx="50" cy="15" r="3" fill="url(#gold-gradient)" filter="url(#glow)">
          <animate
            attributeName="r"
            values="2;3.5;2"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Modern "PCH" Letterform integration (minimalist) */}
        <text
          x="50"
          y="52"
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fill="white"
          className="opacity-80 tracking-tighter pointer-events-none"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          PCH
        </text>
      </svg>

      {/* Subtle bottom shadow/reflection */}
      <div className="absolute -bottom-2 w-1/2 h-1 bg-violet-500/10 blur-md rounded-full group-hover:bg-violet-500/30 transition-all duration-700" />
    </div>
  );
};

export default Logo;