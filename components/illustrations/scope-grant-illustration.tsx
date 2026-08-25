import type { SVGProps } from "react";

/**
 * One grant, several routes out of the container: the same gate
 * grammar as team-gates-illustration.tsx, flipped from converging to
 * fanning out. Static, saying "one grant covers all of it" at a
 * glance.
 */
const TARGETS = [10, 44, 78, 112];

export function ScopeGrantIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-26 0 192 120" fill="none" aria-hidden className={className} {...props}>
      {TARGETS.map((x) => (
        <line key={x} x1="70" y1="26" x2={x + 10} y2="96" className="stroke-fd-primary" strokeWidth="2" />
      ))}

      <circle cx="70" cy="16" r="10" className="fill-fd-background stroke-fd-primary" strokeWidth="2.5" />

      {TARGETS.map((x) => (
        <rect key={x} x={x} y="96" width="20" height="16" rx="3" className="fill-fd-background stroke-fd-muted-foreground" strokeWidth="2" />
      ))}
    </svg>
  );
}
