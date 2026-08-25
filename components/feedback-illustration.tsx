import type { SVGProps } from "react";

/**
 * The "did this page help" card illustration: a page with a checkmark badge
 * that draws itself in on a loop, a soft halo breathing behind it.
 *
 * Same grammar as Deplo's own illustrations (see DeploCloud/deplo,
 * NoResultsGraphic / NotificationIllustration): recessive muted structure
 * (the page, its lines), the subject in primary (the badge ring and check),
 * pure SVG + CSS keyframes (see global.css) so it costs one paint, needs no
 * JS, and renders in a server component. Decoration only, next to a card
 * that already asks the question in text, so the figure is aria-hidden.
 * Under `prefers-reduced-motion` it holds the frame with the check fully
 * drawn.
 */
export function FeedbackIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={className} {...props}>
      {/* The page: never animated, so the eye goes to the badge, not the paper. */}
      <rect x="28" y="14" width="64" height="92" rx="8" className="stroke-fd-border" strokeWidth="2.5" />
      {/* Three lines of text, shorter each time, just enough to read as "a page". */}
      <line x1="40" y1="38" x2="80" y2="38" className="stroke-fd-border" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="50" x2="80" y2="50" className="stroke-fd-border" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="62" x2="64" y2="62" className="stroke-fd-border" strokeWidth="2.5" strokeLinecap="round" />
      {/* The halo, breathing behind the badge on the same clock as the check. */}
      <circle cx="86" cy="90" r="24" className="animate-feedback-halo fill-fd-primary" />
      {/* The badge: filled so it reads as sitting on top of the page, not cut into it. */}
      <circle cx="86" cy="90" r="19" className="fill-fd-background stroke-fd-primary" strokeWidth="2.5" />
      <path
        d="M78 90l6 6 13-15"
        className="animate-feedback-check stroke-fd-primary"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
