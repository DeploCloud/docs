import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { defaultStringifier, type StructuredData } from "fumadocs-core/mdx-plugins";
import type { Expression, ObjectExpression } from "estree";
import type { Nodes } from "mdast";
import type { Processor } from "unified";

export const docs = defineDocs({
  dir: "content/docs",
});

type Content = StructuredData["contents"][number];
type Context = { addContent: (...content: Content[]) => void };

const toText = defaultStringifier({}) as (this: Processor, node: Nodes, ctx: Context) => string;

const BLOCK_TYPES = ["heading", "paragraph", "blockquote", "mdxJsxFlowElement"];
// Navigation and lookup lists stay out of search: the page they point at is the hit (AGENTS.md).
const SKIPPED = ["Accordions", "Cards", "Card", "a"];
const NAV_HEADINGS = ["Next steps", "See also"];

const jsxName = (node: Nodes) =>
  node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement" ? node.name : undefined;

// Words outside code and links: "See [Deploys and builds] for more." has three.
function proseWords(node: Nodes): number {
  if (node.type === "text") return node.value.split(/\s+/).filter((word) => /[a-z]{2}/i.test(word)).length;
  if (node.type === "link" || !("children" in node)) return 0;
  return node.children.reduce((sum, child) => sum + proseWords(child), 0);
}

const hasLink = (node: Nodes): boolean =>
  node.type === "link" || ("children" in node && node.children.some(hasLink));

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

// Header rows of every table: only body rows become search entries.
const headerRows = new WeakSet<Nodes>();

export default defineConfig({
  mdxOptions: {
    remarkStructureOptions: {
      types(node) {
        if (node.type === "table") headerRows.add(node.children[0]);
        if (node.type === "tableRow") return !headerRows.has(node);
        return BLOCK_TYPES.includes(node.type);
      },
      mdxTypes: (node) => SKIPPED.includes(node.name ?? "") || !node.children?.length,
      stringify(this: Processor, node: Nodes, ctx: Context) {
        const name = jsxName(node);
        if (name === "TypeTable") {
          ctx.addContent(...typeTableRows(node));
          return "";
        }
        if (node.type === "heading") {
          const text = toText.call(this, node, ctx);
          return NAV_HEADINGS.includes(text.trim()) ? "" : text;
        }
        // Fragments ("Save.", a lone `reset_role`) and "See [that page]." lines.
        const words = proseWords(node);
        if ((name && SKIPPED.includes(name)) || words < 2 || (words <= 3 && hasLink(node))) return "";
        if (node.type !== "tableRow") return toText.call(this, node, ctx);
        return node.children
          .map((cell) => toText.call(this, { type: "paragraph", children: cell.children }, ctx).trim())
          .filter(Boolean)
          .join(" - ");
      },
    },
  },
});
