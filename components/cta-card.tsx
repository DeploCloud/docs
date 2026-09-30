import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "fumadocs-ui/components/ui/button";

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
    <div className="not-prose my-6 rounded-2xl border border-fd-foreground/20 bg-gradient-to-br from-fd-foreground/10 via-fd-card to-fd-card p-6 shadow-lg">
      {badge && (
        <span className="mb-3 inline-block rounded-full border border-fd-foreground/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
          {badge}
        </span>
      )}
      <p className="font-display text-2xl font-semibold text-fd-foreground md:text-3xl">{title}</p>
      <div className="mt-3 text-sm leading-7 text-balance text-fd-muted-foreground">{children}</div>
      <a
        href={href}
        className={`${buttonVariants({ color: "primary" })} mt-5 gap-2 px-4`}
      >
        {cta}
        <ArrowRight className="size-4" />
      </a>
    </div>
  );
}
