import type { MetadataRoute } from "next";

import { source } from "@/lib/source";
import { basePath } from "@/lib/base-path";

/**
 * The docs sitemap. deplo.build serves this app under /docs, so the main
 * site's sitemap cannot see these pages: it walks the CMS, and the manual
 * is not in it. The URLs are absolute and carry the deployment's basePath,
 * which Next does not add to what a sitemap returns.
 *
 * Nothing is listed by hand: a new page under content/docs/ shows up here
 * the moment it is built. deplo-web's robots.txt points crawlers at it.
 */
const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://deplo.build";

const url = (path: string) => `${origin}${basePath}${path}`.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    url: url(page.url),
    changeFrequency: "weekly",
    priority: page.url === "/" ? 0.9 : 0.7,
  }));
}
