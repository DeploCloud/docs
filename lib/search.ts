import { create, insertMultiple, search } from "zbsearch";
import { createContentHighlighter, type SortedResult } from "fumadocs-core/search";
import { findPath } from "fumadocs-core/page-tree";
import { source } from "@/lib/source";

const MAX_PAGES = 10;
const ROWS_PER_PAGE = 3;

// Words that never narrow a search: "how do i ..." phrasing, and "deplo", which is on every page.
const STOP_WORDS = new Set(
  (
    "a an and are as at be by can deplo do does for from get how i in into is it its me my no not of on or " +
    "our so that the their them then this to was we what when where which who why will with you your"
  ).split(" "),
);

// Words people type that the manual spells differently.
const ALIASES: Record<string, string[]> = {
  "2fa": ["two-factor"],
  mfa: ["two-factor"],
  totp: ["two-factor"],
  ssl: ["tls", "certificate"],
  cert: ["certificate"],
  certs: ["certificate"],
  env: ["environment"],
  vars: ["variable"],
  var: ["variable"],
  db: ["database"],
  postgresql: ["postgres"],
  repo: ["repository"],
  auto: ["automatic"],
  login: ["sign in"],
  logout: ["sign out"],
  delete: ["remove"],
  remove: ["delete"],
  update: ["upgrade"],
  reset: ["recover"],
  forgot: ["reset", "recover", "lost"],
  telemetry: ["usage statistics"],
  webhook: ["deploy hook"],
};

// A generic word should lead to the guide that teaches it, not to a page that lists it.
const SECTION_WEIGHT: [string, number][] = [
  ["/migrations", 0.5],
  ["/troubleshooting", 0.8],
  ["/reference", 0.8],
];

type Doc = { page: string; type: "page" | "heading" | "text"; url: string; content: string; tag: string };
type Page = { title: string; breadcrumbs: string[]; weight: number };

const pages = new Map<string, Page>();
const db = (async () => {
  const db = create({ schema: { page: "string", type: "string", url: "string", content: "string", tag: "enum" } as const });
  const docs: Doc[] = [];
  for (const page of source.getPages()) {
    const { title = "", description, structuredData } = page.data;
    const tag = page.url.startsWith("/api-reference") ? "api-reference" : "docs";
    const add = (type: Doc["type"], content: string, hash?: string) =>
      docs.push({ page: page.url, type, url: hash ? `${page.url}#${hash}` : page.url, content, tag });
    // The tree's own name would open every trail with a second "Docs".
    const trail = findPath(source.pageTree.children, (node) => node.type === "page" && node.url === page.url) ?? [];
    pages.set(page.url, {
      title,
      breadcrumbs: trail.slice(0, -1).flatMap((node) => (typeof node.name === "string" && node.name ? [node.name] : [])),
      weight: SECTION_WEIGHT.find(([prefix]) => page.url.startsWith(prefix))?.[1] ?? 1,
    });
    add("page", title);
    if (description) add("text", description);
    for (const heading of structuredData.headings) add("heading", heading.content, heading.id);
    for (const content of structuredData.contents) add("text", content.content, content.heading);
  }
  await insertMultiple(db, docs);
  return db;
})();

// Light stemmer whose stem starts every form of the word: "policies" -> "polic", "failing" -> "fail".
function stem(word: string) {
  if (word.length < 4 || /[^a-z]/.test(word) || /(ss|us|is)$/.test(word)) return word;
  const cut = (suffix: RegExp) => {
    const base = word.replace(suffix, "");
    return base.length >= 3 && /[aeiouy]/.test(base) ? base.replace(/([^aeioulsz])\1$/, "$1") : word;
  };
  if (word.length >= 5) {
    if (/ies$/.test(word)) return cut(/ies$/);
    if (/(ch|sh|ss|x)es$/.test(word)) return cut(/es$/);
    if (/ing$/.test(word)) return cut(/ing$/);
    if (/[^e]ed$/.test(word)) return cut(/ed$/);
    if (/ation$/.test(word) && word.length > 9) return cut(/ation$/);
    if (/ments?$/.test(word) && word.length > 8) return cut(/ments?$/);
    if (/[^aeiou]y$/.test(word)) return word.slice(0, -1);
  }
  return word.endsWith("s") ? word.slice(0, -1) : word;
}

const WORD_START = "(?<![\\p{L}\\p{N}_])";
const WORD_REST = "[\\p{L}\\p{N}_]*";
const WORD_END = "(?![\\p{L}\\p{N}_])";
const INFLECTION = "(?:e|es|s|d|ed|ing|y|ies|ment|ments|'s)?";
const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const phrase = (text: string, word: (part: string) => string) => text.split(/[\s\-]+/).map(word).join("[\\s\\-]+");
// The word still being typed matches as a prefix; a finished one matches whole, so "custom" skips "customers".
const typing = (part: string) => escape(stem(part));
const finished = (part: string) => `(?:${escape(part)}|${escape(stem(part))})${INFLECTION}${WORD_END}`;
const alias = (part: string) =>
  (/[^aeiou]y$/.test(part) ? `${escape(part.slice(0, -1))}(?:y|ies)` : `${escape(part)}(?:s|es|d|ed|ing|'s)?`) + WORD_END;

function parse(query: string) {
  const words = query
    .toLowerCase()
    .split(/[^\p{L}\p{N}_.\-]+/u)
    .map((word) => word.replace(/^[.\-]+|[.\-]+$/g, ""))
    .filter(Boolean);
  const meaningful = words.filter((word) => !STOP_WORDS.has(word));
  const unique = [...new Set(meaningful.length ? meaningful : words)];
  const last = /\s$/.test(query) ? undefined : unique.at(-1);
  const terms = unique.map((word) => {
    const aliases = ALIASES[word] ?? [];
    const source = [phrase(word, word === last ? typing : finished), ...aliases.map((text) => phrase(text, alias))].join("|");
    return {
      source,
      regex: new RegExp(`${WORD_START}(?:${source})`, "iu"),
      every: new RegExp(`${WORD_START}(?:${source})`, "giu"),
      engineWords: [...word.split(/[\s\-]+/).map(stem), ...aliases.flatMap((text) => text.split(/[\s\-]+/))],
    };
  });
  return {
    terms,
    engineTerm: [...new Set(terms.flatMap((term) => term.engineWords))].filter((w) => !STOP_WORDS.has(w)).join(" "),
    highlight: new RegExp(`${WORD_START}(?:${terms.map((term) => term.source).join("|")})${WORD_REST}`, "giu"),
  };
}

type Row = { doc: Doc; score: number; covered: number; near: boolean };

export async function searchDocs(query: string, tag: string | null): Promise<SortedResult[]> {
  const { terms, engineTerm, highlight } = parse(query);
  if (!terms.length) return [];
  const where = tag ? { tag: { eq: tag } } : undefined;
  const run = async (tolerance: number) =>
    (await search(await db, { term: engineTerm, properties: ["content"], limit: 1000, tolerance, where })).hits;
  // Nothing at all: a typo, so retry forgiving one letter per word.
  let hits = await run(0);
  if (!hits.length) hits = await run(1);

  const n = terms.length;
  const coverage = (text: string) => terms.filter((term) => term.regex.test(text)).length;
  // Every word within a few words of the others: "reset its password", not two sentences apart.
  const near = (text: string) => {
    const spots = terms.map((term) => [...text.matchAll(term.every)].map((match) => match.index));
    return spots[0].some((start) => spots.every((at) => at.some((i) => Math.abs(i - start) <= 40)));
  };
  // Share of the title the query accounts for: "deploy" fits "Deploy" better than "Deploy from Git".
  const titleFit = (title: string) => {
    const words = title.split(/[^\p{L}\p{N}_]+/u).filter((word) => word && !STOP_WORDS.has(word.toLowerCase()));
    return words.filter((word) => coverage(word)).length / (words.length || 1);
  };
  const groups = new Map<string, Row[]>();
  for (const { document, score } of hits) {
    const doc = document as unknown as Doc;
    const rows = groups.get(doc.page) ?? [];
    if (doc.type !== "page" && !rows.some((row) => row.doc.content === doc.content)) {
      const covered = coverage(doc.content);
      rows.push({ doc, score, covered, near: covered === n && near(doc.content) });
    }
    groups.set(doc.page, rows);
  }

  // Pages compare on each key in turn: words covered, words in the title and how much of it they
  // fill, a heading holding every word, the section, a row holding every word close together,
  // words in headings, then how strongly the page is about them.
  const ranked = [...groups].map(([url, rows], order) => {
    const page = pages.get(url)!;
    const covered = terms.filter((term) => term.regex.test(page.title) || rows.some((row) => term.regex.test(row.doc.content)));
    const strength = rows
      .map((row) => row.score)
      .sort((a, b) => b - a)
      .slice(0, ROWS_PER_PAGE)
      .reduce((sum, score) => sum + score, 0);
    const headings = rows.filter((row) => row.doc.type === "heading");
    rows.sort(
      (a, b) =>
        b.covered - a.covered ||
        +b.near - +a.near ||
        +(b.doc.type === "heading") - +(a.doc.type === "heading") ||
        b.score - a.score,
    );
    const key = [
      covered.length,
      coverage(page.title),
      titleFit(page.title),
      +headings.some((row) => row.covered === n),
      page.weight,
      +rows.some((row) => row.near),
      terms.filter((term) => headings.some((row) => term.regex.test(row.doc.content))).length,
      strength,
      -order,
    ];
    return { url, page, rows, key };
  });
  ranked.sort((a, b) => {
    const i = a.key.findIndex((value, k) => value !== b.key[k]);
    return i === -1 ? 0 : b.key[i] - a.key[i];
  });

  const mark = createContentHighlighter(highlight);
  return ranked.slice(0, MAX_PAGES).flatMap(({ url, page, rows }) => [
    { id: url, type: "page" as const, url, content: mark.highlightMarkdown(page.title), breadcrumbs: page.breadcrumbs },
    // Only the page's best-matching rows: one word of two is not an answer when a row has both.
    ...rows.filter((row) => row.covered === rows[0].covered).slice(0, ROWS_PER_PAGE).map(({ doc }, i) => ({
      id: `${url}#${i}`,
      type: doc.type,
      url: doc.url,
      content: mark.highlightMarkdown(doc.content),
    })),
  ]);
}
