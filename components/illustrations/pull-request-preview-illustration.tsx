import type { SVGProps } from "react";

/**
 * A branch out of the trunk, two commits, merged back in. Static
 * adaptation of DeploCloud/deplo's own PullRequestGraphic
 * (components/apps/previews/pull-request-graphic.tsx), active variant
 * only: this page is explaining the feature, not its off state.
 */
export function PullRequestPreviewIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 100" fill="none" aria-hidden className={className} {...props}>
      <line x1="30" y1="12" x2="30" y2="88" className="stroke-fd-muted-foreground" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="30" cy="12" r="3.5" className="fill-fd-muted-foreground" />

      <path
        d="M30 28 C30 40, 80 34, 80 46 L80 62 C80 74, 30 70, 30 82"
        className="stroke-fd-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <circle cx="80" cy="46" r="4.5" className="fill-fd-primary" />
      <circle cx="80" cy="62" r="4.5" className="fill-fd-primary" />

      <circle cx="30" cy="82" r="5" fill="var(--color-fd-success)" />
    </svg>
  );
}
