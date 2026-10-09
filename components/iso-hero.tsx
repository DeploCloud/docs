import type { ReactNode } from "react";

/** deplo.build's hero ground: the isometric grid from the header down to a dashed line, across the whole column. */
export function IsoHero({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`iso-hero not-prose ${className}`}>
      <svg aria-hidden className="iso-hero-grid">
        <defs>
          <pattern id="iso-grid" width="96" height="55.4256" patternUnits="userSpaceOnUse">
            <path d="M0 0L96 55.4256M0 55.4256L96 0" stroke="#111" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iso-grid)" />
      </svg>
      {children}
    </div>
  );
}
