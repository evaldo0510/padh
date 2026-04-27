import React from 'react';
import { Feather, Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const sparkleSizes = {
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5"
  };

  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 ${sizeClasses[size]} ${className}`}
      role="img"
      aria-label="P.A.D.H. Logo"
    >
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rotate-3 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
      
      {/* Inner square */}
      <div className="absolute inset-0 rounded-xl bg-background dark:bg-zinc-900 border border-primary/30 -rotate-3 transition-all duration-500 group-hover:rotate-0 flex items-center justify-center shadow-sm group-hover:shadow-primary/20 group-hover:border-primary/50 overflow-hidden">
        {/* Simple SVG Fallback/Background Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 100 100">
          <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="1" />
        </svg>

        <Feather className={`${iconSizes[size]} text-primary transition-transform duration-500 group-hover:scale-110`} strokeWidth={1.5} />
        <Sparkles className={`absolute -top-1 -right-1 ${sparkleSizes[size]} text-primary animate-pulse`} />
      </div>
      
      {/* Decorative dots */}
      <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
      <div className="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
    </div>
  );
};

export default Logo;
