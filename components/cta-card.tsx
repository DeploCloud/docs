import type { ReactNode } from "react";
import { primaryButton } from "@/lib/button-styles";
import { CtaChevron } from "@/components/cta-chevron";

export function CtaCard({
  badge,
  title,
  href,
  cta,
  children,
}: {
  badge?: string;
  title: string;
  href: string;
  cta: string;
  children: ReactNode;
}) {
  return (
    <div className="tile not-prose my-6 p-6">
      <div className="flex flex-wrap items-center gap-3">
        <p className="font-display text-2xl font-semibold tracking-tight text-fd-foreground md:text-3xl">{title}</p>
        {badge && (
          <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-fd-muted-foreground">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-3 text-sm leading-7 text-balance text-fd-muted-foreground">{children}</div>
      <a href={href} className={`${primaryButton} mt-5`}>
        <CtaChevron>{cta}</CtaChevron>
      </a>
    </div>
  );
}
