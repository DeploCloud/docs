"use client";

import { usePathname } from "next/navigation";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";

const SEARCH_TAGS = [
  { name: "Docs", value: "docs" },
  { name: "API Reference", value: "api-reference" },
];

export function DocsRootProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const defaultTag = pathname.startsWith("/api-reference") ? "api-reference" : "docs";

  return (
    <RootProvider
      theme={{ defaultTheme: "dark", forcedTheme: "dark" }}
      search={{ options: { defaultTag, tags: SEARCH_TAGS, allowClear: true } }}
    >
      {children}
    </RootProvider>
  );
}
