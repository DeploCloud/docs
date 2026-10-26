import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import type { StructuredDataContent as Content } from "fumadocs-core/mdx-plugins";
import { replaceSource, type Stringifier } from "fumadocs-core/mdx-plugins/stringifier";
import type { Expression, ObjectExpression } from "estree";
import type { Nodes, Root } from "mdast";
import type { VFile } from "vfile";

export const docs = defineDocs({
  dir: "content/docs",
});

const BLOCK_TYPES = ["heading", "paragraph", "blockquote", "tableRow"];
// Navigation and lookup lists stay out of search: the page they point at is the hit (AGENTS.md).
const SKIPPED = ["Accordions", "Cards", "Card", "a"];
const NAV_HEADINGS = ["Next steps", "See also"];

// Words outside code and links: "See [Deploys and builds] for more." has three.
function proseWords(node: Nodes): number {
  if (node.type === "text") return node.value.split(/\s+/).filter((word) => /[a-z]{2}/i.test(word)).length;
  if (node.type === "link" || !("children" in node)) return 0;
  return node.children.reduce((sum, child) => sum + proseWords(child), 0);
}

const hasLink = (node: Nodes): boolean =>
  node.type === "link" || ("children" in node && node.children.some(hasLink));

const plainText = (node: Nodes): string =>
  "value" in node ? node.value : "children" in node ? node.children.map(plainText).join("") : "";

const literal = (value: Expression) =>
  value.type === "Literal" && typeof value.value === "string" ? value.value : undefined;

// One search entry per <TypeTable> row: "**key** - type - description".
function typeTableRows(node: Nodes): Content[] {
  if (node.type !== "mdxJsxFlowElement") return [];
  const value = node.attributes.find((a) => a.type === "mdxJsxAttribute" && a.name === "type")?.value;
  const statement = typeof value === "object" ? value?.data?.estree?.body[0] : undefined;
  if (statement?.type !== "ExpressionStatement" || statement.expression.type !== "ObjectExpression") return [];
  return statement.expression.properties.flatMap((property) => {
    if (property.type !== "Property" || property.value.type !== "ObjectExpression") return [];
    const key = property.key.type === "Identifier" ? property.key.name : literal(property.key as Expression);
    const fields = new Map(
      (property.value as ObjectExpression).properties.flatMap((field) =>
        field.type === "Property" && field.key.type === "Identifier"
          ? [[field.key.name, literal(field.value as Expression)] as const]
          : [],
      ),
    );
    const content = [key && `**${key}**`, fields.get("type"), fields.get("description")].filter(Boolean).join(" - ");
    return content ? [{ heading: undefined, content }] : [];
  });
}

// Picks what each search block contributes; remark-structure then slices the rest from the source.
function remarkSearch() {
  return (tree: Root, file: VFile) => {
    const drop = (node: Nodes) => replaceSource(file, node, "", "search");
    const visit = (node: Nodes) => {
      if (node.type === "mdxJsxFlowElement" && (SKIPPED.includes(node.name ?? "") || !node.children.length)) {
        node.data = { ...node.data, structuredData: { contents: node.name === "TypeTable" ? typeTableRows(node) : [] } };
      } else if (node.type === "heading") {
        if (NAV_HEADINGS.includes(plainText(node).trim())) node.children.forEach(drop);
      } else if (BLOCK_TYPES.includes(node.type)) {
        // Fragments ("Save.", a lone `reset_role`) and "See [that page]." lines.
        const words = proseWords(node);
        if (words < 2 || (words <= 3 && hasLink(node))) drop(node);
        else if (node.type === "tableRow") {
          // `\|` is table syntax: the cell's text is a plain pipe.
          const cells = node.children;
          const text = (s: Stringifier) => cells.map((c) => s.inner(c).replaceAll("\\|", "|").trim());
          replaceSource(file, node, (s) => text(s).filter(Boolean).join(" - "), "search");
        }
      } else if (node.type === "table") {
        // Only body rows become search entries.
        const [header, ...rows] = node.children;
        drop(header);
        rows.forEach(visit);
      } else if ("children" in node) node.children.forEach(visit);
    };
    visit(tree);
  };
}

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkSearch],
    remarkStructureOptions: { types: BLOCK_TYPES },
  },
});
