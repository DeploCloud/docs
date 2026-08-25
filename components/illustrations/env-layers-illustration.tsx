import type { SVGProps } from "react";

/**
 * The four variable layers, lowest priority at the bottom, the one
 * that wins drawn in fd-primary. Static. Shared by
 * concepts/what-happens-on-a-deploy.mdx and guides/config/environment-variables.mdx,
 * which draw the exact same ASCII diagram today.
 */
export function EnvLayersIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 -2.5 200 125" fill="none" aria-hidden className={className} {...props}>
      {/* instance-wide (lowest priority) */}
      <rect x="20" y="92" width="160" height="22" rx="6" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      {/* the app's own variables */}
      <rect x="20" y="64" width="160" height="22" rx="6" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      {/* a shared variable the app has linked */}
      <rect x="20" y="36" width="160" height="22" rx="6" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      {/* a preview override: highest priority, the one that wins */}
      <rect x="20" y="8" width="160" height="22" rx="6" className="fill-fd-background stroke-fd-primary" strokeWidth="3" />
    </svg>
  );
}
