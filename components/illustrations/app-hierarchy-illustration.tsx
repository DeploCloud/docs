import type { SVGProps } from "react";

/**
 * The nesting the page is explaining: an Environment holding a
 * Project/Folder holding Apps. Static.
 */
export function AppHierarchyIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={className} {...props}>
      {/* Environment: the outer, isolated boundary. */}
      <rect x="10" y="10" width="100" height="100" rx="12" className="stroke-fd-border" strokeWidth="2" strokeDasharray="4 5" />
      {/* Project / Folder: groups the apps. */}
      <rect x="24" y="28" width="72" height="68" rx="10" className="fill-fd-background stroke-fd-muted-foreground" strokeWidth="2" />
      {/* Apps: the deployable units. */}
      <rect x="36" y="44" width="16" height="16" rx="3" className="fill-fd-background stroke-fd-primary" strokeWidth="2" />
      <rect x="58" y="44" width="16" height="16" rx="3" className="fill-fd-background stroke-fd-primary" strokeWidth="2" />
      <rect x="36" y="66" width="16" height="16" rx="3" className="fill-fd-background stroke-fd-primary" strokeWidth="2" />
    </svg>
  );
}
