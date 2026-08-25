import type { SVGProps } from "react";

const DEPLO_MARK_PATH =
  "M90.0498 45.2217H191.11C271.682 45.2219 336.999 110.538 336.999 191.11C336.999 271.682 271.682 336.999 191.11 336.999H45.2217V257.566H179.707C216.409 257.566 246.163 227.813 246.163 191.11C246.163 154.408 216.409 124.655 179.707 124.654H45.2217V90.0498H0V0H90.0498V45.2217Z";

/**
 * Landing page hero: the developer's push landing on Deplo, which
 * builds it and hands the result to the agent, which runs it in
 * Docker. Static, so the picture reads at a glance: a real person,
 * the real Deplo mark, a real Docker hull.
 *
 * Same grammar as components/feedback-illustration.tsx: recessive
 * structure in fd-border, the subject (Deplo, the containers) in
 * fd-primary, pure SVG, no motion. Decoration only, next to prose
 * that already says this, so it stays aria-hidden.
 */
export function RequestFlowIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 360 100" fill="none" aria-hidden className={className} {...props}>
      <defs>
        <radialGradient id="flow-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-fd-primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-fd-primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Ambient glow behind Deplo, the one gradient in this hero spot. */}
      <ellipse cx="140" cy="50" rx="70" ry="40" fill="url(#flow-glow)" />

      {/* The wire: browser to the containers, drawn once. */}
      <line x1="44" y1="50" x2="298" y2="50" className="stroke-fd-border" strokeWidth="2" strokeLinecap="round" />

      {/* The developer: where the push starts. */}
      <circle cx="27" cy="36" r="9" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <rect x="13" y="48" width="28" height="22" rx="11" className="fill-fd-background stroke-fd-border" strokeWidth="2" />

      {/* Deplo: the brain, carrying its own mark, drawn bigger than everything else. */}
      <rect x="104" y="14" width="72" height="72" rx="14" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <g transform="translate(116,26) scale(0.1424)" className="fill-fd-primary">
        <path d={DEPLO_MARK_PATH} />
      </g>

      {/* The agent: one box, one host. */}
      <rect x="232" y="34" width="32" height="32" rx="6" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
      <line x1="240" y1="45" x2="256" y2="45" className="stroke-fd-border" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="240" y1="55" x2="256" y2="55" className="stroke-fd-border" strokeWidth="1.5" strokeLinecap="round" />

      {/* Docker: the hull recessive, the containers it carries are the subject. */}
      <path d="M350 54l8-6v16z" className="fill-fd-background stroke-fd-muted-foreground" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="324" cy="58" rx="26" ry="12" className="fill-fd-background stroke-fd-muted-foreground" strokeWidth="2" />
      <rect x="306" y="38" width="10" height="10" rx="2" className="fill-fd-background stroke-fd-primary" strokeWidth="2" />
      <rect x="319" y="38" width="10" height="10" rx="2" className="fill-fd-background stroke-fd-primary" strokeWidth="2" />
      <rect x="332" y="38" width="10" height="10" rx="2" className="fill-fd-background stroke-fd-primary" strokeWidth="2" />
    </svg>
  );
}
