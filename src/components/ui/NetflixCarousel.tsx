import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { motion, AnimatePresence } from "framer-motion";

interface NetflixCarouselProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}

const NetflixCarousel: React.FC<NetflixCarouselProps> = ({ title, subtitle, children, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    checkScroll();
    const current = scrollRef.current;
    current?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      current?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") scroll("left");
    if (e.key === "ArrowRight") scroll("right");
  };

  return (
    <div 
      className={cn("space-y-6 py-8 relative group/carousel overflow-visible outline-none", className)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`Carrossel: ${title}`}
    >
      <div className="flex flex-col gap-1 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-foreground tracking-tight leading-none">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-muted-foreground font-light">{subtitle}</p>}
      </div>
      
      <div className="relative overflow-visible">
        <AnimatePresence>
          {showLeftArrow && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute left-0 top-0 bottom-0 z-30 flex items-center"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-full w-14 bg-background/40 backdrop-blur-md rounded-r-3xl border-none text-foreground hover:bg-background/80 hover:w-16 transition-all shadow-2xl focus:ring-primary focus:ring-inset"
                onClick={() => scroll("left")}
                aria-label="Rolar para esquerda"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 md:px-12 pb-4 pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {React.Children.map(children, (child) => (
            <div className="snap-start snap-always first:pl-0 last:pr-12 outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-4 focus-within:ring-offset-background rounded-2xl">
              {child}
            </div>
          ))}
        </div>

        <AnimatePresence>
          {showRightArrow && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-0 top-0 bottom-0 z-30 flex items-center"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-full w-14 bg-background/40 backdrop-blur-md rounded-l-3xl border-none text-foreground hover:bg-background/80 hover:w-16 transition-all shadow-2xl focus:ring-primary focus:ring-inset"
                onClick={() => scroll("right")}
                aria-label="Rolar para direita"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NetflixCarousel;
