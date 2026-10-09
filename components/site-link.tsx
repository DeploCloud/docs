import Link from "next/link";
import type { ComponentProps } from "react";
import { SITE } from "@/lib/site";

/** A docs path goes through next/link (and gets the basePath); deplo.build stays in the tab, the rest opens a new one. */
export function SiteLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  const external = href.startsWith("http") && !href.startsWith(SITE);
  return <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props} />;
}
