import type { SVGProps } from "react";

const DEPLO_MARK_PATH =
  "M90.0498 45.2217H191.11C271.682 45.2219 336.999 110.538 336.999 191.11C336.999 271.682 271.682 336.999 191.11 336.999H45.2217V257.566H179.707C216.409 257.566 246.163 227.813 246.163 191.11C246.163 154.408 216.409 124.655 179.707 124.654H45.2217V90.0498H0V0H90.0498V45.2217Z";

/**
 * Repository to running site, through the build in between: the
 * diamond housing the Deplo mark, since Deplo is what does the
 * building. Static wire-and-nodes grammar, sized for a 3-node trip.
 */
export function DeployFlowIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 90" fill="none" aria-hidden className={className} {...props}>
      <line x1="40" y1="45" x2="190" y2="45" className="stroke-fd-border" strokeWidth="2" strokeLinecap="round" />

      {/* The repository. */}
      <rect x="8" y="29" width="32" height="32" rx="6" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <rect x="8" y="25" width="14" height="6" rx="2" className="fill-fd-background stroke-fd-border" strokeWidth="1.5" />

      {/* The build: Deplo's own mark, housed in a rotated chip. */}
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
      <g transform="translate(112,37) scale(0.0475)" className="fill-fd-primary">
        <path d={DEPLO_MARK_PATH} />
      </g>

      {/* The running site. */}
      <circle cx="208" cy="45" r="18" className="fill-fd-background stroke-fd-primary" strokeWidth="2" />
      <line x1="190" y1="45" x2="226" y2="45" className="stroke-fd-border" strokeWidth="1.5" />
    </svg>
  );
}
