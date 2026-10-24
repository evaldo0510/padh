import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/** PADH mark: a geometric P paired with three lines representing progress and human development. */
const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 transition-all duration-300 ${sizeClasses[size]} ${className}`}
      role="img"
      aria-label="PADH — Poesia Aplicada ao Desenvolvimento Humano"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="padh-purple" x1="20" y1="12" x2="72" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B45E8" />
            <stop offset="1" stopColor="#6930C3" />
          </linearGradient>
          <linearGradient id="padh-gold" x1="48" y1="76" x2="91" y2="76" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F6B51B" />
            <stop offset="1" stopColor="#E99A00" />
          </linearGradient>
        </defs>

        {/* Geometric P: the selected second concept */}
        <path
          d="M24 86V16H55C73 16 82 27 82 42C82 57 72 66 55 66H43V86H24Z"
          fill="url(#padh-purple)"
        />
        <path d="M43 29V53H55C63 53 68 49 68 41C68 34 63 29 55 29H43Z" fill="white" />
        <path d="M48 33L63 41L48 49V33Z" fill="url(#padh-purple)" />

        {/* Rising lines represent learning, progress, and human development */}
        <path d="M70 61H91" stroke="url(#padh-purple)" strokeWidth="6" strokeLinecap="square" />
        <path d="M61 75H91" stroke="url(#padh-purple)" strokeWidth="6" strokeLinecap="square" />
        <path d="M49 89H91" stroke="url(#padh-gold)" strokeWidth="6" strokeLinecap="square" />
      </svg>
    </div>
  );
};

export default Logo;
