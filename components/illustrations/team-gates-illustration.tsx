import type { SVGProps } from "react";

/**
 * The two gates every mutating action passes through: a cosmetic one
 * in the interface, a real one in the data layer. A dot past both
 * sits in fd-success, the moment the write actually happens. Static.
 */
export function TeamGatesIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 -10 160 100" fill="none" aria-hidden className={className} {...props}>
      <line x1="10" y1="40" x2="140" y2="40" className="stroke-fd-border" strokeWidth="2" strokeLinecap="round" />

      {/* Gate 1: cosmetic, in the interface. */}
      <line x1="55" y1="26" x2="55" y2="54" className="stroke-fd-muted-foreground" strokeWidth="2" strokeLinecap="round" />
      {/* Gate 2: the real one, in the data layer. */}
      <line x1="95" y1="22" x2="95" y2="58" className="stroke-fd-muted-foreground" strokeWidth="2.5" strokeLinecap="round" />

      {/* The write, on the far side of both gates. */}
      <rect x="140" y="30" width="16" height="20" rx="3" className="fill-fd-background stroke-fd-border" strokeWidth="2" />

      <circle cx="120" cy="40" r="4" className="fill-fd-success" />
    </svg>
  );
}
