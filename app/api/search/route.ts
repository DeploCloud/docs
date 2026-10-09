import { createFromSource } from "fumadocs-core/search/server";
import type { SortedResult } from "fumadocs-core/search";
import { findPath } from "fumadocs-core/page-tree";
import { source } from "@/lib/source";

const server = createFromSource(source, {
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      tag: page.url.startsWith("/api-reference") ? "api-reference" : "docs",
      // The default prepends the tree's own name, a second "Docs".
      breadcrumbs: findPath(source.pageTree.children, (node) => node.type === "page" && node.url === page.url)
        ?.slice(0, -1)
        .flatMap((node) => (typeof node.name === "string" && node.name ? [node.name] : [])),
    };
  },
  // Entries matching every word come first, then the best half of partial matches.
  search: { threshold: 0.5 },
});

const words = (text: string) =>
  text.toLowerCase().replace(/<\/?mark>/g, "").split(/[^a-z0-9_]+/).filter((word) => word.length > 2);

// A page whose title holds the query's words outranks one that only mentions them.
export async function GET(request: Request) {
  const results: SortedResult[] = await (await server.GET(request)).json();
  const query = words(new URL(request.url).searchParams.get("query") ?? "");
  const groups: SortedResult[][] = [];
  for (const result of results) {
    if (result.type === "page") groups.push([result]);
    else groups.at(-1)?.push(result);
  }
  const titleScore = ([page]: SortedResult[]) => {
    const title = words(page.content);
    // "rollback" holds for "Rollbacks", "custom" not for "customers".
    return query.filter((word) => title.some((t) => t.startsWith(word) && t.length - word.length <= 2)).length;
  };
  return Response.json(
    groups
      .map((group) => ({ group, score: titleScore(group) }))
      .sort((a, b) => b.score - a.score)
      .flatMap(({ group }) => group),
  );
}
