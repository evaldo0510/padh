import React from "react";
import { Play, Plus, Info, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface StreamingCardProps {
  title: string;
  subtitle?: string;
  image?: string;
  progress?: number;
  isLocked?: boolean;
  isCompleted?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "series" | "episode" | "tool";
}

const StreamingCard: React.FC<StreamingCardProps> = ({
  title,
  subtitle,
  image,
  progress,
  isLocked,
  isCompleted,
  onClick,
  className,
  type = "series",
}) => {
  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className={cn(
        "relative flex-shrink-0 group cursor-pointer transition-all duration-500 snap-start",
        type === "series" ? "w-[280px] md:w-[340px] aspect-video" : "w-[200px] md:w-[240px] aspect-[2/3]",
        isLocked && "cursor-not-allowed grayscale-[0.5] opacity-80",
        className
      )}
    >
      {/* Background Image / Placeholder */}
      <div className="absolute inset-0 rounded-lg overflow-hidden border border-white/5 bg-muted/20 shadow-lg group-hover:shadow-primary/10 transition-shadow">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
             <div className="text-4xl font-heading font-black opacity-10 select-none">P.A.D.H.</div>
          </div>
        )}
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Content */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <div className="space-y-1 transform transition-transform duration-300 group-hover:-translate-y-2">
            {subtitle && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80 block">
                {subtitle}
              </span>
            )}
            <h3 className="text-sm md:text-base font-bold text-white line-clamp-2 leading-tight">
              {title}
            </h3>
            
            {/* Hover Actions */}
            <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               {isLocked ? (
                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase">
                    <Lock className="w-3 h-3" /> Bloqueado
                 </div>
               ) : (
                 <>
                   <Button size="icon" variant="default" className="h-8 w-8 rounded-full shadow-lg">
                      <Play className="w-4 h-4 fill-current" />
                   </Button>
                   <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-white/20 bg-white/5 backdrop-blur-sm">
                      <Plus className="w-4 h-4" />
                   </Button>
                   <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-white/20 bg-white/5 backdrop-blur-sm">
                      <Info className="w-4 h-4" />
                   </Button>
                 </>
               )}
            </div>
          </div>
        </div>

        {/* Status Badges */}
        {isCompleted && (
          <div className="absolute top-2 right-2 bg-primary/20 backdrop-blur-md p-1 rounded-full border border-primary/30">
            <CheckCircle2 className="w-4 h-4 text-primary" />
          </div>
        )}

        {/* Progress Bar */}
        {progress !== undefined && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div 
              className="h-full bg-primary transition-all duration-500 shadow-[0_0_10px_rgba(var(--primary),0.5)]" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamingCard;
