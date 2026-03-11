import { Skeleton } from "@/components/ui/skeleton";

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
        <div key={i} className="rounded-xl border border-border/50 p-6 space-y-4">
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

export const PageSkeleton = () => (
  <div className="min-h-screen bg-background animate-in fade-in duration-300">
    <div className="h-16 border-b border-border/50 px-6 flex items-center gap-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-5 w-32" />
      <div className="flex-1" />
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-5 w-20" />
    </div>
    <HeroSkeleton />
    <CardGridSkeleton />
  </div>
);
