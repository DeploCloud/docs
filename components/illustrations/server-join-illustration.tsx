import type { SVGProps } from "react";

/**
 * A server enrolling: four beats (token, certificate signing request,
 * pin, online) along the path into the box. The last one sits in
 * fd-success, the moment the server is trusted. Static.
 */
export function ServerJoinIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={className} {...props}>
      <line x1="8" y1="60" x2="76" y2="60" className="stroke-fd-border" strokeWidth="2" strokeLinecap="round" />

      <rect x="76" y="36" width="32" height="48" rx="6" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <line x1="84" y1="48" x2="100" y2="48" className="stroke-fd-border" strokeWidth="2" strokeLinecap="round" />
      <line x1="84" y1="58" x2="100" y2="58" className="stroke-fd-border" strokeWidth="2" strokeLinecap="round" />

      <circle cx="16" cy="60" r="4" className="fill-fd-primary" />
      <circle cx="34" cy="60" r="4" className="fill-fd-primary" />
      <circle cx="52" cy="60" r="4" className="fill-fd-primary" />
      <circle cx="70" cy="60" r="4" className="fill-fd-success" />
    </svg>
  );
}
