import type { ReactNode } from "react";
import {
  siDocker,
  siGit,
  siLetsencrypt,
  siPostgresql,
  siTraefikproxy,
  type SimpleIcon,
} from "simple-icons";

const A = "var(--color-blue-400)";

function Art({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 56 56"
      className="size-11 shrink-0 text-fd-muted-foreground"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect
        x="0.75"
        y="0.75"
        width="54.5"
        height="54.5"
        rx="10"
        className="fill-fd-foreground/[0.03]"
        stroke="none"
      />
      {children}
    </svg>
  );
}

// Real product logos (Simple Icons, CC0), monochrome, only to name the product.
function Logo({ icon }: { icon: SimpleIcon }) {
  return (
    <Art>
      <path
        d={icon.path}
        transform="translate(16 16)"
        className="fill-fd-foreground"
        stroke="none"
      />
    </Art>
  );
}

export const ART = {
  docker: <Logo icon={siDocker} />,
  git: <Logo icon={siGit} />,
  letsencrypt: <Logo icon={siLetsencrypt} />,
  postgres: <Logo icon={siPostgresql} />,
  traefik: <Logo icon={siTraefikproxy} />,
  dashboard: (
    <Art>
      <rect x="9" y="12" width="38" height="30" rx="4" />
      <path d="M9 19h38" />
      <circle cx="13" cy="15.5" r="0.8" fill="currentColor" />
      <circle cx="16" cy="15.5" r="0.8" fill="currentColor" />
      <path d="M19 19v23" />
      <path d="M24 25h17M24 30h11" stroke={A} />
      <rect x="24" y="34" width="8" height="4" rx="1" stroke={A} />
    </Art>
  ),
  terminal: (
    <Art>
      <rect x="9" y="12" width="38" height="30" rx="4" />
      <path d="M15 22l5 4-5 4" stroke={A} />
      <path d="M24 31h9" stroke={A} />
    </Art>
  ),
  containers: (
    <Art>
      <rect x="10" y="30" width="11" height="10" rx="1.5" />
      <rect x="22.5" y="30" width="11" height="10" rx="1.5" />
      <rect x="35" y="30" width="11" height="10" rx="1.5" />
      <rect x="16" y="18" width="11" height="10" rx="1.5" stroke={A} />
      <rect x="29" y="18" width="11" height="10" rx="1.5" />
    </Art>
  ),
  router: (
    <Art>
      <path d="M9 28h12" />
      <circle cx="25" cy="28" r="4" stroke={A} />
      <path d="M29 28h6l8-10M35 28h8M35 28l8 10" />
      <path d="M40 15l3 3-3.5 2M40 41l3-3-3.5-2M41 25.5l2.5 2.5-2.5 2.5" />
    </Art>
  ),
  database: (
    <Art>
      <ellipse cx="28" cy="16" rx="13" ry="4.5" stroke={A} />
      <path d="M15 16v24c0 2.5 5.8 4.5 13 4.5s13-2 13-4.5V16" />
      <path d="M15 28c0 2.5 5.8 4.5 13 4.5s13-2 13-4.5" />
    </Art>
  ),
  volumes: (
    <Art>
      <rect x="11" y="15" width="34" height="11" rx="3" />
      <rect x="11" y="30" width="34" height="11" rx="3" stroke={A} />
      <circle cx="39" cy="20.5" r="1" fill="currentColor" />
      <circle cx="39" cy="35.5" r="1" fill={A} stroke="none" />
      <path d="M16 20.5h10M16 35.5h10" />
    </Art>
  ),
  key: (
    <Art>
      <circle cx="20" cy="28" r="7" stroke={A} />
      <circle cx="20" cy="28" r="2" />
      <path d="M27 28h18M40 28v5M44 28v4" />
    </Art>
  ),
};

export type ArtName = keyof typeof ART;
