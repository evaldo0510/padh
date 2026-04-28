import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface NetflixCarouselProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const NetflixCarousel: React.FC<NetflixCarouselProps> = ({ title, children, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className={cn("space-y-4 py-4 relative group/carousel", className)}>
      <h2 className="text-xl md:text-2xl font-heading font-bold px-6 md:px-12 text-foreground/90 tracking-tight">
        {title}
      </h2>
      
      <div className="relative">
        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 bg-background/20 hover:bg-background/60 rounded-none border-none opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </Button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 md:px-12 pb-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 bg-background/20 hover:bg-background/60 rounded-none border-none opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden md:flex"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default NetflixCarousel;
