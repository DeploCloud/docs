import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

// deplo.build reverse-proxies /docs/* to this app, set NEXT_BASE_PATH=/docs
// for that deployment. Left unset, the app serves from the root as usual.
const basePath = process.env.NEXT_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  ...(basePath ? { basePath } : {}),
  async rewrites() {
    return [
      // :path* doesn't cleanly match the empty (root page) case when glued
      // directly to a literal suffix, so the root gets its own explicit rule
      { source: "/index.mdx", destination: "/llms.mdx" },
      { source: "/:path*.mdx", destination: "/llms.mdx/:path*" },
    ];
  },
};

export default withMDX(config);
