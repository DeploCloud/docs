import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { defaultStringifier, type StructuredData } from "fumadocs-core/mdx-plugins";
import type { Expression, ObjectExpression } from "estree";
import type { Nodes } from "mdast";
import type { Processor } from "unified";

export const docs = defineDocs({
  dir: "content/docs",
});

const SEARCHABLE_MDX_ATTRIBUTES = ["title", "description"];
const BLOCK_TYPES = ["heading", "paragraph", "blockquote", "mdxJsxFlowElement"];

type Content = StructuredData["contents"][number];
type Context = { addContent: (...content: Content[]) => void };

const isJsx = (node: Nodes, name: string) =>
  (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") && node.name === name;

// Self-closing components like <Card title="x" description="y" /> would be
// indexed as raw JSX; render them as plain "title: description" text instead.
const toText = defaultStringifier({
  filterMdxAttributes: (_node, attribute) =>
    attribute.type === "mdxJsxAttribute" && SEARCHABLE_MDX_ATTRIBUTES.includes(attribute.name),
  stringify(node) {
    if (node.type !== "mdxJsxFlowElement" && node.type !== "mdxJsxTextElement") return;
    return node.attributes
      .flatMap((attribute) =>
        attribute.type === "mdxJsxAttribute" &&
        typeof attribute.value === "string" &&
        SEARCHABLE_MDX_ATTRIBUTES.includes(attribute.name)
          ? [attribute.value]
          : [],
      )
      .join(": ");
  },
}) as (this: Processor, node: Nodes, ctx: Context) => string;

const literal = (value: Expression) =>
  value.type === "Literal" && typeof value.value === "string" ? value.value : undefined;

// One search entry per <TypeTable> row: "`key` - type - description".
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
    const content = [key && `\`${key}\``, fields.get("type"), fields.get("description")].filter(Boolean).join(" - ");
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
      // Accordion content stays out of search: a hit cannot open it (AGENTS.md).
      mdxTypes: (node) => node.name === "Accordions" || !node.children?.length,
      stringify(this: Processor, node: Nodes, ctx: Context) {
        if (isJsx(node, "Accordions")) return "";
        if (isJsx(node, "TypeTable")) {
          ctx.addContent(...typeTableRows(node));
          return "";
        }
        if (node.type !== "tableRow") return toText.call(this, node, ctx);
        return node.children
          .map((cell) => toText.call(this, { type: "paragraph", children: cell.children }, ctx).trim())
          .filter(Boolean)
          .join(" - ");
      },
    },
  },
});
