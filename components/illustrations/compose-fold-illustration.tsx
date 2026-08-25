import type { SVGProps } from "react";

const DEPLO_MARK_PATH =
  "M90.0498 45.2217H191.11C271.682 45.2219 336.999 110.538 336.999 191.11C336.999 271.682 271.682 336.999 191.11 336.999H45.2217V257.566H179.707C216.409 257.566 246.163 227.813 246.163 191.11C246.163 154.408 216.409 124.655 179.707 124.654H45.2217V90.0498H0V0H90.0498V45.2217Z";

/**
 * Three services folding into one deployable stack, carrying the
 * Deplo mark: it's what runs the composed result. The services above
 * are recessive. Static.
 */
export function ComposeFoldIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 140 100" fill="none" aria-hidden className={className} {...props}>
      <line x1="20" y1="28" x2="60" y2="64" className="stroke-fd-border" strokeWidth="2" />
      <line x1="64" y1="28" x2="68" y2="64" className="stroke-fd-border" strokeWidth="2" />
      <line x1="108" y1="28" x2="76" y2="64" className="stroke-fd-border" strokeWidth="2" />

      <rect x="40" y="64" width="60" height="28" rx="8" className="fill-fd-background stroke-fd-primary" strokeWidth="2.5" />
      <g transform="translate(61,69) scale(0.0534)" className="fill-fd-primary">
        <path d={DEPLO_MARK_PATH} />
      </g>

      <rect x="8" y="8" width="24" height="20" rx="4" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <rect x="52" y="8" width="24" height="20" rx="4" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <rect x="96" y="8" width="24" height="20" rx="4" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
    </svg>
  );
}
