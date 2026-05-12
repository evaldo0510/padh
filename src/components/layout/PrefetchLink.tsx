import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { prefetchRoute } from "@/lib/route-prefetch";

interface PrefetchLinkProps extends LinkProps {
  to: string;
}

const PrefetchLink = React.forwardRef<HTMLAnchorElement, PrefetchLinkProps>(
  ({ to, onMouseEnter, onFocus, onTouchStart, ...props }, ref) => (
    <Link
      ref={ref}
      to={to}
      onMouseEnter={(e) => {
        prefetchRoute(to);
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        prefetchRoute(to);
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        prefetchRoute(to);
        onTouchStart?.(e);
      }}
      {...props}
    />
  ),
);

PrefetchLink.displayName = "PrefetchLink";
export default PrefetchLink;
