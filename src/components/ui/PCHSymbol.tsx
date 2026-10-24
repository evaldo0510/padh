import React, { useId } from "react";
import Logo from "./Logo";

export type PCHSymbolVariant = "feather" | "flow" | "glow";

interface PCHSymbolProps {
  variant?: PCHSymbolVariant;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

/**
 * Three minimal symbol variations for PCH brand.
 * - feather: full identity (cards, headers)
 * - flow: abstract verticality (buttons, inline accents)
 * - glow: pure radiance (loading states, badges)
 */
const PCHSymbol: React.FC<PCHSymbolProps> = ({
  variant = "feather",
  className = "",
  size = "md",
  animated = false,
}) => {
  const id = useId();
  if (variant === "feather") return <Logo size={size} className={className} />;
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClasses[size]} ${className}`}
      role="img"
      aria-label={`PCH símbolo (${variant})`}
    >
      <defs>
        <linearGradient id={`pch-violet-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D1B4B" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id={`pch-gold-${id}`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <filter id={`pch-glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {variant === "flow" && (
        <g>
          <path
            d="M20 12 C28 22 28 42 20 52"
            stroke={`url(#pch-violet-${id})`}
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M32 8 C40 22 40 42 32 56"
            stroke={`url(#pch-gold-${id})`}
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            filter={`url(#pch-glow-${id})`}
          />
          <path
            d="M44 12 C36 22 36 42 44 52"
            stroke={`url(#pch-violet-${id})`}
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          {animated && (
            <circle r="1.4" fill={`url(#pch-gold-${id})`} filter={`url(#pch-glow-${id})`}>
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M32 8 C40 22 40 42 32 56"
              />
            </circle>
          )}
        </g>
      )}

      {variant === "glow" && (
        <g>
          <circle
            cx="32"
            cy="32"
            r="18"
            fill="none"
            stroke={`url(#pch-violet-${id})`}
            strokeWidth="0.8"
            opacity="0.4"
          />
          <circle
            cx="32"
            cy="32"
            r="12"
            fill="none"
            stroke={`url(#pch-violet-${id})`}
            strokeWidth="1.2"
            opacity="0.7"
          />
          <circle
            cx="32"
            cy="32"
            r="6"
            fill={`url(#pch-gold-${id})`}
            filter={`url(#pch-glow-${id})`}
          >
            {animated && (
              <animate attributeName="r" values="5;7;5" dur="2.4s" repeatCount="indefinite" />
            )}
          </circle>
          {animated && (
            <circle
              cx="32"
              cy="32"
              r="18"
              fill="none"
              stroke={`url(#pch-gold-${id})`}
              strokeWidth="0.4"
              opacity="0.6"
            >
              <animate attributeName="r" values="14;22;14" dur="3.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="3.6s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      )}
    </svg>
  );
};

export default PCHSymbol;
