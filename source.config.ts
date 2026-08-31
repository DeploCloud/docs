import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "content/docs",
});

const SEARCHABLE_MDX_ATTRIBUTES = ["title", "description"];

export default defineConfig({
  mdxOptions: {
    // Self-closing components like <Card title="x" description="y" /> have
    // no text children, so remark-structure indexes the whole element as its
    // own search result. By default it serializes it back to raw JSX
    // (`<Card title="x" description="y" />`), which isn't real markdown and
    // renders blank/garbled in the Ctrl+K result list (the dialog runs
    // content through a plain, non-MDX markdown renderer). Stringify it to
    // plain "title: description" text instead so it reads like normal prose.
    remarkStructureOptions: {
      stringify: {
        filterMdxAttributes: (_node, attribute) =>
          attribute.type === "mdxJsxAttribute" &&
          SEARCHABLE_MDX_ATTRIBUTES.includes(attribute.name),
        stringify(node) {
          if (node.type !== "mdxJsxFlowElement" && node.type !== "mdxJsxTextElement") return;
          return node.attributes
            .filter(
              (attribute) =>
                attribute.type === "mdxJsxAttribute" &&
                typeof attribute.value === "string" &&
                SEARCHABLE_MDX_ATTRIBUTES.includes(attribute.name),
            )
            .map((attribute) => attribute.value)
            .join(": ");
        },
      },
    },
  },
});
