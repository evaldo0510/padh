import React from 'react';
import { Feather, Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rotate-3 transition-transform group-hover:rotate-6" />
      
      {/* Inner square */}
      <div className="absolute inset-0 rounded-xl bg-background border border-primary/30 -rotate-3 transition-transform group-hover:rotate-0 flex items-center justify-center shadow-sm">
        <Feather className="w-5 h-5 text-primary" strokeWidth={1.5} />
        <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-primary animate-pulse" />
      </div>
      
      {/* Decorative dots for a clinical/scientific feel */}
      <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-primary/40" />
      <div className="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-primary/40" />
    </div>
  );
};

export default Logo;
