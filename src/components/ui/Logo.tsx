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
      aria-label="PADH - Poesia Aplicada ao Desenvolvimento Humano Logo"
    >
      <svg
        viewBox="20 8 60 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
        aria-hidden="true"
        focusable="false"
      >
        {/* Central Symbol - Minimalist Leaf/Feather Flow */}
        <path
          d="M50 85 C35 70 30 55 30 40 C30 25 40 15 50 15 C60 15 70 25 70 40 C70 55 65 70 50 85 Z"
          fill="currentColor"
          className="text-primary"
        />

        {/* The "Golden Flow" - Symbolic of Poetry and Insight */}
        <path
          d="M50 20 Q55 45 50 75"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-warm"
        />

        {/* The Spark of Transformation */}
        <circle cx="50" cy="15" r="3" fill="currentColor" className="text-warm" />
      </svg>

    </div>
  );
};

export default Logo;