import type { SVGProps } from "react";

/**
 * Repository to running site, through the build in between. Static
 * wire-and-nodes grammar, sized for a 3-node trip.
 */
export function DeployFlowIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 90" fill="none" aria-hidden className={className} {...props}>
      <line x1="40" y1="45" x2="190" y2="45" className="stroke-fd-border" strokeWidth="2" strokeLinecap="round" />

      {/* The repository. */}
      <rect x="8" y="29" width="32" height="32" rx="6" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <rect x="8" y="25" width="14" height="6" rx="2" className="fill-fd-background stroke-fd-border" strokeWidth="1.5" />

      {/* The build. */}
      <rect
        x="105"
        y="30"
        width="30"
        height="30"
        rx="4"
        transform="rotate(45 120 45)"
        className="fill-fd-background stroke-fd-muted-foreground"
        strokeWidth="2"
      />

      {/* The running site. */}
      <circle cx="208" cy="45" r="18" className="fill-fd-background stroke-fd-primary" strokeWidth="2" />
      <line x1="190" y1="45" x2="226" y2="45" className="stroke-fd-border" strokeWidth="1.5" />
    </svg>
  );
}
