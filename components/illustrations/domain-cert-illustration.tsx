import type { SVGProps } from "react";

/**
 * A hostname earning its certificate: the domain pill on the left,
 * the badge ring on the right always there (the domain exists), the
 * lock inside it (the certificate issued). Wired left to right so it
 * fills a rectangular frame instead of floating a lone badge in a
 * square. Static.
 */
export function DomainCertIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 -13.75 220 137.5" fill="none" aria-hidden className={className} {...props}>
      <line x1="76" y1="55" x2="150" y2="55" className="stroke-fd-border" strokeWidth="2" strokeLinecap="round" />

      {/* The hostname. */}
      <rect x="10" y="39" width="66" height="32" rx="8" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <line x1="24" y1="55" x2="62" y2="55" className="stroke-fd-border" strokeWidth="2" strokeLinecap="round" />

      {/* The badge: always there, the domain exists. */}
      <circle cx="180" cy="55" r="30" className="fill-fd-background stroke-fd-primary" strokeWidth="2.5" />
      <path
        d="M172 53v-8a8 8 0 0 1 16 0v8 M166 53h28v20h-28z"
        className="stroke-fd-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
