import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PCHSymbol from "@/components/ui/PCHSymbol";

export const HeroSkeleton = () => (
  <section className="relative overflow-hidden min-h-[60vh] flex items-center">
    <div className="container mx-auto px-6 py-20 text-center space-y-6">
      <Skeleton className="h-8 w-48 mx-auto rounded-full" />
      <Skeleton className="h-16 md:h-24 w-3/4 mx-auto rounded-lg" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
      <Skeleton className="h-6 w-1/2 mx-auto" />
      <div className="flex justify-center gap-4 pt-4">
        <Skeleton className="h-12 w-40 rounded-lg" />
        <Skeleton className="h-12 w-40 rounded-lg" />
      </div>
    </div>
  </section>
);

export const CardGridSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="container mx-auto px-6 py-12">
    <Skeleton className="h-10 w-64 mx-auto mb-8" />
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-border/50 p-6 space-y-4"
        >
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  </div>
);

export const ContentSkeleton = () => (
  <div className="container mx-auto px-6 py-12 max-w-4xl space-y-6">
    <Skeleton className="h-8 w-1/2" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-48 w-full rounded-xl" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
);

export const PageSkeleton = () => {
  const [showSlowMessage, setShowSlowMessage] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowSlowMessage(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="relative flex flex-col items-center gap-8">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
          <PCHSymbol variant="glow" size="xl" animated />
        </div>
        
        <div className="space-y-3 text-center">
          <p className="text-[11px] uppercase tracking-[0.5em] text-primary/60 font-medium">
            Poesia Cognitiva Hipnótica
          </p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
          </div>
        </div>

        {showSlowMessage && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <button 
              onClick={() => window.location.reload()}
              className="text-xs text-muted-foreground hover:text-primary transition-colors border-b border-muted-foreground/20"
            >
              Carregamento lento? Clique para recarregar.
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const SessionSkeleton = () => (
  <div className="min-h-screen bg-[#050505] flex flex-col overflow-hidden animate-in fade-in duration-500">
    {/* Progress bar */}
    <div className="h-0.5 w-full bg-white/5">
      <div className="h-full bg-primary/20 w-1/3 animate-pulse" />
    </div>
    
    {/* Header */}
    <div className="px-4 md:px-6 h-12 flex items-center justify-between">
      <Skeleton className="h-4 w-24 bg-white/5 rounded-full" />
      <Skeleton className="h-3 w-12 bg-white/5 rounded-full" />
    </div>

    {/* Center content */}
    <div className="flex-1 flex items-center justify-center px-6 md:px-12">
      <div className="w-full max-w-2xl mx-auto space-y-12 text-center">
        <Skeleton className="h-16 md:h-24 w-3/4 mx-auto bg-white/5 rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full bg-white/5 rounded-full" />
          <Skeleton className="h-6 w-5/6 mx-auto bg-white/5 rounded-full" />
          <Skeleton className="h-6 w-2/3 mx-auto bg-white/5 rounded-full" />
        </div>
        <div className="pt-8 flex justify-center">
           <Skeleton className="h-14 w-48 bg-primary/20 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);