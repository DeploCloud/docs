import type { SVGProps } from "react";

const DEPLO_MARK_PATH =
  "M90.0498 45.2217H191.11C271.682 45.2219 336.999 110.538 336.999 191.11C336.999 271.682 271.682 336.999 191.11 336.999H45.2217V257.566H179.707C216.409 257.566 246.163 227.813 246.163 191.11C246.163 154.408 216.409 124.655 179.707 124.654H45.2217V90.0498H0V0H90.0498V45.2217Z";

/**
 * The two planes: the control plane, carrying the Deplo mark, at the
 * top; three agents it never touches directly underneath. Static.
 * Replaces the box-drawn ASCII diagram this page used to open with.
 *
 * One agent carries the small marks for Traefik and its containers,
 * the other two are plain hosts, matching what the prose says. One
 * dot, on the agent that answers first, sits in fd-success: the only
 * accent in the drawing besides the mark itself.
 */
export function ControlPlaneIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 300 160" fill="none" aria-hidden className={className} {...props}>
      <defs>
        <radialGradient id="plane-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-fd-primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-fd-primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="36" rx="85" ry="26" fill="url(#plane-glow)" />

      {/* The fan-out. */}
      <line x1="150" y1="56" x2="48" y2="112" className="stroke-fd-border" strokeWidth="2" />
      <line x1="150" y1="56" x2="150" y2="112" className="stroke-fd-border" strokeWidth="2" />
      <line x1="150" y1="56" x2="252" y2="112" className="stroke-fd-border" strokeWidth="2" />

      {/* The control plane, carrying the mark: this is Deplo itself. */}
      <rect x="110" y="8" width="80" height="48" rx="10" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <g transform="translate(136,18) scale(0.0831)" className="fill-fd-primary">
        <path d={DEPLO_MARK_PATH} />
      </g>

      {/* Three agents. */}
      <rect x="20" y="112" width="56" height="40" rx="8" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <rect x="30" y="132" width="10" height="10" rx="2" className="stroke-fd-border" strokeWidth="1.5" />
      <rect x="44" y="132" width="10" height="10" rx="2" className="stroke-fd-border" strokeWidth="1.5" />
      <circle cx="70" cy="118" r="3" className="fill-fd-success" />

      <rect x="122" y="112" width="56" height="40" rx="8" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <rect x="224" y="112" width="56" height="40" rx="8" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
    </svg>
  );
}
