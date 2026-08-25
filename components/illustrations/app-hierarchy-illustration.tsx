import type { SVGProps } from "react";

/**
 * The nesting the page is explaining: an Environment holding a
 * Project/Folder holding Apps. Widened into a rectangular frame
 * instead of a cramped square, so each layer gets room to read.
 * Static.
 */
export function AppHierarchyIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 -3.75 220 137.5" fill="none" aria-hidden className={className} {...props}>
      {/* Environment: the outer, isolated boundary. */}
      <rect x="10" y="10" width="200" height="110" rx="14" className="stroke-fd-border" strokeWidth="2" strokeDasharray="4 5" />
      {/* Project / Folder: groups the apps. */}
      <rect x="30" y="28" width="160" height="74" rx="10" className="fill-fd-background stroke-fd-muted-foreground" strokeWidth="2" />
      {/* Apps: the deployable units. */}
      <rect x="48" y="48" width="34" height="34" rx="6" className="fill-fd-background stroke-fd-primary" strokeWidth="2" />
      <rect x="93" y="48" width="34" height="34" rx="6" className="fill-fd-background stroke-fd-primary" strokeWidth="2" />
      <rect x="138" y="48" width="34" height="34" rx="6" className="fill-fd-background stroke-fd-primary" strokeWidth="2" />
    </svg>
  );
}
