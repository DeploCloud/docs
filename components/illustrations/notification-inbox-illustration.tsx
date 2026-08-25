import type { SVGProps } from "react";

/**
 * A bell with alerts rippling out from it. Static, graduated opacity
 * standing in for the ripple. The bell itself is recessive
 * (fd-muted-foreground, "the drawn object, not the subject"), the
 * rings in fd-primary are what the page is actually about.
 */
export function NotificationInboxIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={className} {...props}>
      <circle cx="60" cy="48" r="20" className="stroke-fd-primary" strokeWidth="2" opacity="0.7" />
      <circle cx="60" cy="48" r="27" className="stroke-fd-primary" strokeWidth="2" opacity="0.45" />
      <circle cx="60" cy="48" r="34" className="stroke-fd-primary" strokeWidth="2" opacity="0.2" />

      <path
        d="M60 30a18 18 0 0 1 18 18v14l6 8h-48l6-8v-14a18 18 0 0 1 18-18z"
        className="fill-fd-background stroke-fd-muted-foreground"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="60" cy="76" r="4" className="fill-fd-muted-foreground" />
    </svg>
  );
}
