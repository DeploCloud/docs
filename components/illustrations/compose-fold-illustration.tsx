import type { SVGProps } from "react";

/**
 * Three services folding into one deployable stack. The stack itself
 * is the subject (fd-primary); the services are recessive. Static.
 */
export function ComposeFoldIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 140 100" fill="none" aria-hidden className={className} {...props}>
      <line x1="20" y1="28" x2="60" y2="64" className="stroke-fd-border" strokeWidth="2" />
      <line x1="64" y1="28" x2="68" y2="64" className="stroke-fd-border" strokeWidth="2" />
      <line x1="108" y1="28" x2="76" y2="64" className="stroke-fd-border" strokeWidth="2" />

      <rect x="40" y="64" width="60" height="28" rx="8" className="fill-fd-background stroke-fd-primary" strokeWidth="2.5" />

      <rect x="8" y="8" width="24" height="20" rx="4" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <rect x="52" y="8" width="24" height="20" rx="4" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <rect x="96" y="8" width="24" height="20" rx="4" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
    </svg>
  );
}
