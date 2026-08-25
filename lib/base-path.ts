// next/image never prefixes a raw `src="/foo.png"` with basePath: the
// optimizer route itself gets it, but the "url" query param stays bare and
// resolves outside /docs in production. Prepend this to every local image src.
// Mirrors the basePath read in next.config.mjs.
export const basePath = process.env.NEXT_BASE_PATH || "";
