import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  success?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, success, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border bg-background/50 px-4 py-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          !error && !success && "border-primary/20 focus-visible:ring-primary/40 focus:border-primary/50",
          error && "border-destructive/50 focus-visible:ring-destructive/30 focus:border-destructive shadow-[0_0_10px_rgba(239,68,68,0.1)]",
          success && "border-spiritual-sage/50 focus-visible:ring-spiritual-sage/30 focus:border-spiritual-sage shadow-[0_0_10px_rgba(45,212,191,0.1)]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
