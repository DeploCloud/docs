import type { SVGProps } from "react";

/**
 * One hostname forking into two path-routed apps. Replaces the
 * "example.com/api -> the API app" ASCII example on the domains page.
 * Static.
 */
export function PathRoutingIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 100" fill="none" aria-hidden className={className} {...props}>
      <line x1="80" y1="32" x2="30" y2="68" className="stroke-fd-border" strokeWidth="2" />
      <line x1="80" y1="32" x2="130" y2="68" className="stroke-fd-border" strokeWidth="2" />

      <rect x="56" y="8" width="48" height="24" rx="6" className="fill-fd-background stroke-fd-primary" strokeWidth="2" />

      <rect x="8" y="68" width="44" height="28" rx="6" className="fill-fd-background stroke-fd-muted-foreground" strokeWidth="2" />
      <rect x="108" y="68" width="44" height="28" rx="6" className="fill-fd-background stroke-fd-muted-foreground" strokeWidth="2" />
    </svg>
  );
}
