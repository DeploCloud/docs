import type { SVGProps } from "react";

/**
 * A disk with its snapshot ring closed around it: the scheduled
 * backup, done. Static.
 */
export function BackupSnapshotIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={className} {...props}>
      <ellipse cx="60" cy="32" rx="28" ry="10" className="fill-fd-background stroke-fd-muted-foreground" strokeWidth="2" />
      <line x1="32" y1="32" x2="32" y2="78" className="stroke-fd-muted-foreground" strokeWidth="2" />
      <line x1="88" y1="32" x2="88" y2="78" className="stroke-fd-muted-foreground" strokeWidth="2" />
      <path d="M32 78a28 10 0 0 0 56 0" className="fill-fd-background stroke-fd-muted-foreground" strokeWidth="2" />

      <circle cx="60" cy="55" r="44" className="stroke-fd-success" strokeWidth="2" fill="none" />
    </svg>
  );
}
