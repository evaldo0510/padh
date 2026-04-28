import React from "react";
import { Feather, Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const sparkleSizes = {
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5",
  };

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 transition-transform duration-500 ease-out group-hover:scale-105 ${sizeClasses[size]} ${className}`}
      role="img"
      aria-label="P.A.D.H. Logo"
    >
      {/* Outer ring - smoother rotation and color shift */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rotate-3 transition-all duration-700 ease-in-out group-hover:rotate-12 group-hover:border-primary/40 group-hover:from-primary/30 group-hover:to-primary/10" />

      {/* Inner square - smoother behavior */}
      <div className="absolute inset-0 rounded-xl bg-background border border-primary/30 -rotate-3 transition-all duration-700 ease-in-out group-hover:rotate-0 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:border-primary/60 overflow-hidden">
        {/* SVG Fallback & Texture - Recognizable even if icons don't load */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.1]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle quill shape as fallback */}
          <path
            d="M30 70 L70 30 M65 25 L75 35 M30 70 C25 75 20 70 25 65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
        </svg>

        {/* The Icons with smoother scale */}
        <div className="relative z-10 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
          <Feather
            className={`${iconSizes[size]} text-primary`}
            strokeWidth={1.5}
          />

          {/* Sparkle with distinct animation */}
          <Sparkles
            className={`absolute -top-1.5 -right-1.5 ${sparkleSizes[size]} text-primary animate-pulse transition-all duration-500 group-hover:text-secondary group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}
          />
        </div>
      </div>

      {/* Decorative dots - consistent transition */}
      <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all duration-500 ease-in-out shadow-[0_0_0_0_rgba(var(--primary),0)] group-hover:shadow-[0_0_8px_2px_rgba(var(--primary),0.3)]" />
      <div className="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-all duration-500 ease-in-out" />
    </div>
  );
};

export default Logo;
