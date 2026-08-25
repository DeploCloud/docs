import type { SVGProps } from "react";

/**
 * A hostname with its certificate: the badge ring always sits there
 * (the domain exists), the lock inside it (the certificate issued).
 * Static. No halo here on purpose, this set of illustrations keeps
 * its one gradient for the two hero spots.
 */
export function DomainCertIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={className} {...props}>
      <circle cx="60" cy="60" r="30" className="fill-fd-background stroke-fd-primary" strokeWidth="2.5" />
      <path
        d="M52 58v-8a8 8 0 0 1 16 0v8 M46 58h28v20h-28z"
        className="stroke-fd-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
