import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    // Card/Callout/TypeTable/File are indexed for search with every string
    // attribute by default, including `icon={<UsersIcon .../>}` - which
    // shows up as raw JSX in Ctrl+K results. Only title/description are
    // actual search-relevant text.
    remarkStructureOptions: {
      allowedMdxAttributes: ["title", "description"],
    },
  },
});
