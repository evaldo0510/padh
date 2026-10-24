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
        <linearGradient id={`pch-violet-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D1B4B" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id={`pch-gold-${variant}`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <filter id={`pch-glow-${variant}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {variant === "feather" && (
        <g>
          <path
            d="M32 56 C20 44 18 30 22 18 C26 8 36 6 42 12 C48 18 46 32 38 44 C36 48 34 52 32 56 Z"
            fill={`url(#pch-violet-${variant})`}
            opacity="0.95"
          />
          {/* barbs */}
          {[20, 26, 32, 38, 44].map((y) => (
            <path
              key={y}
              d={`M32 ${y} L${24 + (y - 20) * 0.4} ${y + 3}`}
              stroke="#FFFFFF"
              strokeOpacity="0.18"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
          ))}
          <path
            d="M32 12 L32 54"
            stroke={`url(#pch-gold-${variant})`}
            strokeWidth="1.2"
            strokeLinecap="round"
            filter={`url(#pch-glow-${variant})`}
          />
          <circle
            cx="32"
            cy="11"
            r="1.6"
            fill={`url(#pch-gold-${variant})`}
            filter={`url(#pch-glow-${variant})`}
          >
            {animated && (
              <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            )}
          </circle>
        </g>
      )}

      {variant === "flow" && (
        <g>
          <path
            d="M20 12 C28 22 28 42 20 52"
            stroke={`url(#pch-violet-${variant})`}
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M32 8 C40 22 40 42 32 56"
            stroke={`url(#pch-gold-${variant})`}
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            filter={`url(#pch-glow-${variant})`}
          />
          <path
            d="M44 12 C36 22 36 42 44 52"
            stroke={`url(#pch-violet-${variant})`}
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          {animated && (
            <circle r="1.4" fill={`url(#pch-gold-${variant})`} filter={`url(#pch-glow-${variant})`}>
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
            stroke={`url(#pch-violet-${variant})`}
            strokeWidth="0.8"
            opacity="0.4"
          />
          <circle
            cx="32"
            cy="32"
            r="12"
            fill="none"
            stroke={`url(#pch-violet-${variant})`}
            strokeWidth="1.2"
            opacity="0.7"
          />
          <circle
            cx="32"
            cy="32"
            r="6"
            fill={`url(#pch-gold-${variant})`}
            filter={`url(#pch-glow-${variant})`}
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
              stroke={`url(#pch-gold-${variant})`}
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
