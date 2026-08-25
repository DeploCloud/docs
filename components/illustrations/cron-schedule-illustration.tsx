import type { SVGProps } from "react";

/**
 * A dial with its hand at the mark it fires on. Static adaptation of
 * DeploCloud/deplo's own CronGraphic (components/crons/cron-graphic.tsx):
 * same dial, same fire mark, mapped onto deplo-docs' mono tokens.
 */
export function CronScheduleIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={className} {...props}>
      <circle cx="60" cy="60" r="42" className="stroke-fd-muted-foreground" strokeWidth="2.5" />

      <g className="stroke-fd-border" strokeWidth="2" strokeLinecap="round">
        <line x1="93" y1="60" x2="100" y2="60" />
        <line x1="60" y1="93" x2="60" y2="100" />
        <line x1="27" y1="60" x2="20" y2="60" />
      </g>

      <line x1="60" y1="60" x2="60" y2="32" className="stroke-fd-primary" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="60" cy="60" r="3" className="fill-fd-primary" />

      <circle cx="60" cy="18" r="5" fill="var(--color-fd-success)" />
    </svg>
  );
}
