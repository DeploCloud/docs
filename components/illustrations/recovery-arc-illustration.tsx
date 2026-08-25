import type { SVGProps } from "react";

/**
 * A ring closed in fd-success: the track back to a working state,
 * walked and done. Dashed track underneath is the recessive
 * structure, the closed ring is the subject. Static.
 */
export function RecoveryArcIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={className} {...props}>
      <circle cx="60" cy="60" r="44" className="stroke-fd-border" strokeWidth="2" strokeDasharray="2 5" />
      <circle cx="60" cy="60" r="36" className="stroke-fd-success" strokeWidth="2.5" fill="none" />
    </svg>
  );
}
