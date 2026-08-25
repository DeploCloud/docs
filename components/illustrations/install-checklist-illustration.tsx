import type { SVGProps } from "react";

/**
 * The one command's checklist, done: Docker, Traefik, Postgres, the
 * control plane and the agent, all checked off. Static.
 */
const ROWS = [
  { y: 8, barWidth: 70 },
  { y: 32, barWidth: 58 },
  { y: 56, barWidth: 64 },
  { y: 80, barWidth: 48 },
  { y: 104, barWidth: 40 },
];

export function InstallChecklistIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 128" fill="none" aria-hidden className={className} {...props}>
      {ROWS.map((row) => (
        <g key={row.y}>
          <circle cx="14" cy={row.y + 10} r="9" className="fill-fd-background stroke-fd-border" strokeWidth="2" />
          <path
            d={`M9 ${row.y + 10}l4 4 8 -9`}
            className="stroke-fd-primary"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="32"
            y1={row.y + 10}
            x2={32 + row.barWidth}
            y2={row.y + 10}
            className="stroke-fd-border"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}
