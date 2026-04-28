import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex w-full border border-primary/20 bg-background/50 text-base text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-300 hover:border-primary/40 hover:bg-background/60 focus-visible:border-primary/50",
  {
    variants: {
      textareaSize: {
        default: "min-h-[80px] px-4 py-2 rounded-xl",
        sm: "min-h-[60px] px-3 py-1 rounded-lg",
        lg: "min-h-[120px] px-6 py-3 rounded-2xl",
      },
    },
    defaultVariants: {
      textareaSize: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, textareaSize, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ textareaSize, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
