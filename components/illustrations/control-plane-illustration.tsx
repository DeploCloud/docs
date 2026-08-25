import type { SVGProps } from "react";

/**
 * The two planes: the control plane at the top, three agents it never
 * touches directly underneath. Static. Replaces the box-drawn ASCII
 * diagram this page used to open with.
 *
 * One agent carries the small marks for Traefik and its containers,
 * the other two are plain hosts, matching what the prose says. One
 * dot, on the agent that answers first, sits in fd-success: the only
 * accent in the drawing.
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

      {/* The control plane. */}
      <rect x="110" y="8" width="80" height="48" rx="10" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <line x1="124" y1="26" x2="176" y2="26" className="stroke-fd-border" strokeWidth="2" strokeLinecap="round" />
      <line x1="124" y1="36" x2="164" y2="36" className="stroke-fd-border" strokeWidth="2" strokeLinecap="round" />

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
