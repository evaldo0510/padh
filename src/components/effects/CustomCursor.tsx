import React, { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsPointer(!!isClickable);
    };

    window.addEventListener("mousemove", updateCursor);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
    };
  }, []);

  return (
    <>
      {/* Cursor principal */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-200 ${
            isPointer ? "w-12 h-12" : "w-6 h-6"
          }`}
          style={{
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
          }}
        />
      </div>

      {/* Trilha luminosa */}
      <div
        ref={trailRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`rounded-full bg-primary/30 blur-xl transition-all duration-500 ease-out ${
            isPointer ? "w-24 h-24" : "w-16 h-16"
          }`}
        />
      </div>
    </>
  );
};
