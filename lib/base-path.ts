// next/image skips its optimizer for local .svg sources, so basePath isn't
// applied automatically there (unlike Link/Image for other file types).
// Mirrors the basePath read in next.config.mjs.
export const basePath = process.env.NEXT_BASE_PATH || "";
