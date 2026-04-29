import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const StreamingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 animate-fade-in">
      {/* Hero Skeleton */}
      <div className="relative h-[85vh] w-full overflow-hidden flex items-center px-[var(--space-3)] md:px-[var(--space-6)]">
        <div className="max-w-3xl space-y-8 w-full">
          <Skeleton className="h-8 w-32 rounded-full" />
          <div className="space-y-4">
            <Skeleton className="h-20 w-3/4 md:h-32" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-16 w-60 rounded-full" />
            <Skeleton className="h-16 w-48 rounded-full" />
          </div>
        </div>
      </div>

      <div className="streaming-container -mt-48 relative z-30 space-y-32">
        {/* Row Skeleton 1 */}
        <div className="space-y-8">
          <Skeleton className="h-10 w-64" />
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="flex-shrink-0 w-80 aspect-video rounded-2xl" />
            ))}
          </div>
        </div>

        {/* Row Skeleton 2 */}
        <div className="space-y-8">
          <Skeleton className="h-10 w-48" />
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="flex-shrink-0 w-64 aspect-video rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
