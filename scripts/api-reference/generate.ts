// Generates content/docs/api-reference/*.mdx from schema.graphql + gates.json.
// Regenerate: `bun scripts/api-reference/generate.ts` (see README.md here).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import {
  buildSchema,
  getNamedType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isListType,
  isNonNullType,
  isObjectType,
  isScalarType,
  isUnionType,
  type GraphQLArgument,
  type GraphQLEnumType,
  type GraphQLField,
  type GraphQLInputObjectType,
  type GraphQLInputType,
  type GraphQLNamedType,
  type GraphQLObjectType,
  type GraphQLOutputType,
} from "graphql";
import { PAGES, EXAMPLES, VALUES, INTS, type OpKind, type Page } from "./pages";

const HERE = import.meta.dir;
const OUT = join(HERE, "../../content/docs/api-reference");

type Gate =
  | { kind: "capability"; cap: string; orInstanceAdmin: boolean }
  | { kind: "loggedIn" }
  | { kind: "instanceAdmin" }
  | { kind: "none" };

const schema = buildSchema(readFileSync(join(HERE, "schema.graphql"), "utf8"));
const gates = JSON.parse(readFileSync(join(HERE, "gates.json"), "utf8")) as Record<string, Gate>;

const ROOTS: Record<OpKind, GraphQLObjectType | null | undefined> = {
  query: schema.getQueryType(),
  mutation: schema.getMutationType(),
  subscription: schema.getSubscriptionType(),
};

/* ------------------------------------------------------------------ */
/* Text helpers                                                        */
/* ------------------------------------------------------------------ */

/** Schema prose -> MDX-safe prose: no em/en dashes, no JSX-looking angle brackets. */
function prose(s: string | null | undefined): string {
  if (!s) return "";
  const t = s
    .replace(/[—–]/g, "-")
    .replace(/→/g, "->")
    .replace(/⇒/g, "=>")
    .replace(/…/g, "...")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
  // Escape outside backtick spans only.
  return t
    .split(/(`[^`]*`)/)
    .map((part, i) =>
      i % 2 === 1
        ? part
        : part.replace(/[{}]/g, (c) => `\\${c}`).replace(/<(?=[A-Za-z/])/g, "&lt;"),
    )
    .join("");
}

/** One table cell: no newlines, no bare pipes. */
function cell(s: string): string {
  return prose(s).replace(/\s*\n\s*/g, " ").replace(/\|/g, "\\|");
}

function typeRef(t: GraphQLInputType | GraphQLOutputType): string {
  const named = getNamedType(t);
  const text = String(t);
  if (isScalarType(named)) return `\`${text}\``;
  const page = isEnumType(named) ? "enums" : isInputObjectType(named) ? "inputs" : "objects";
  return `[\`${text}\`](/api-reference/types/${page}#${named.name.toLowerCase()})`;
}

function gateLine(kind: OpKind, name: string): string {
  const g = gates[`${cap(kind)}.${name}`] ?? { kind: "none" };
  switch (g.kind) {
    case "capability":
      return g.orInstanceAdmin
        ? `Needs \`${g.cap}\`, or instance admin`
        : `Needs \`${g.cap}\``;
    case "instanceAdmin":
      return "Instance admin only";
    case "loggedIn":
      return "Any signed-in principal";
    default:
      return "Public, no authentication";
  }
}

function cap(kind: OpKind): string {
  return kind[0].toUpperCase() + kind.slice(1);
}

/* ------------------------------------------------------------------ */
/* Example documents                                                   */
/* ------------------------------------------------------------------ */

const ID_BY_WORD: [RegExp, string][] = [
  [/^connection$/i, "gitc"],
  [/deployWithoutMigratedData/, "prj"],
  [/startWithoutMigratedData/, "db"],
  [/panel/i, "srv"],
  [/^installation$/i, "ghi"],
  [/^job$/i, "cron"],
  [/^target$/i, "prj"],
  [/sharedvar|var$/i, "svar"],
  [/deployment/i, "dpl"],
  [/database|connection/i, "db"],
  [/server/i, "srv"],
  [/environment/i, "environ"],
  [/env/i, "env"],
  [/folder/i, "fld"],
  [/project/i, "prc"],
  [/domain/i, "dom"],
  [/role/i, "role"],
  [/token/i, "tok"],
  [/backup|run/i, "brun"],
  [/destination/i, "dst"],
  [/registry/i, "reg"],
  [/cron/i, "cron"],
  [/preview/i, "prv"],
  [/passkey/i, "pk"],
  [/session/i, "ses"],
  [/member/i, "mbr"],
  [/team/i, "team"],
  [/user/i, "user"],
  [/channel|notification/i, "chan"],
  [/link/i, "rlt"],
  [/gitconnection|git/i, "gitc"],
  [/githubapp/i, "gha"],
  [/basicauth/i, "bau"],
  [/app/i, "prj"],
];
const HEX = "9f1c2ab7d3e4f5a6";

function idFor(hint: string): string {
  for (const [re, prefix] of ID_BY_WORD) if (re.test(hint)) return `"${prefix}_${HEX}"`;
  return `"id_${HEX}"`;
}

function scalarValue(typeName: string, argName: string, opName: string): string {
  if (typeName === "String" || typeName === "ID") {
    if (VALUES[argName] !== undefined) return VALUES[argName]!;
    if (/Id$/.test(argName)) return idFor(argName.replace(/Id$/, ""));
    if (/Ids$/.test(argName)) return `[${idFor(argName.replace(/Ids$/, ""))}]`;
    if (argName === "id") return idFor(opName);
    return `"${argName}"`;
  }
  switch (typeName) {
    case "Int":
      return String(INTS[argName] ?? 1);
    case "Float":
      return "1.0";
    case "Boolean":
      return "true";
    case "JSON":
      return "{}";
    case "DateTime":
      return '"2026-09-01T00:00:00Z"';
    default:
      return `"${argName}"`;
  }
}

function inputLiteral(t: GraphQLInputType, argName: string, opName: string, depth = 0): string {
  if (isNonNullType(t)) return inputLiteral(t.ofType, argName, opName, depth);
  if (isListType(t)) return `[${inputLiteral(t.ofType, argName, opName, depth)}]`;
  if (isEnumType(t)) return VALUES[argName] ?? t.getValues()[0]!.name;
  if (isScalarType(t)) return scalarValue(t.name, argName, opName);
  if (isInputObjectType(t)) {
    const own = EXAMPLES.inputs[t.name];
    if (own) return own;
    if (depth > 2) return "{}";
    const fields = Object.values(t.getFields()).filter((f) => isNonNullType(f.type));
    return `{ ${fields.map((f) => `${f.name}: ${inputLiteral(f.type, f.name, opName, depth + 1)}`).join(", ")} }`;
  }
  return "null";
}

const PREFERRED = ["id", "slug", "name", "status", "ok", "url", "key", "email", "role", "createdAt"];

function selection(t: GraphQLOutputType, depth = 0): string {
  const named = getNamedType(t);
  if (isScalarType(named) || isEnumType(named)) return "";
  if (isUnionType(named)) return " { __typename }";
  if (!isObjectType(named) && !isInterfaceType(named)) return "";
  const own = EXAMPLES.selections[named.name];
  if (own) return ` ${own}`;
  const fields = Object.values(named.getFields());
  const scalars = fields.filter((f) => {
    const n = getNamedType(f.type);
    return (isScalarType(n) || isEnumType(n)) && f.args.length === 0;
  });
  const picked = [
    ...PREFERRED.map((p) => scalars.find((f) => f.name === p)).filter(Boolean),
    ...scalars,
  ]
    .filter((f, i, a) => a.indexOf(f) === i)
    .slice(0, 4) as typeof scalars;
  if (picked.length === 0 && depth === 0) {
    // Nothing scalar at the top: go one level down on the first object field.
    const first = fields.find((f) => isObjectType(getNamedType(f.type)) && f.args.length === 0);
    if (first) return ` { ${first.name}${selection(first.type, depth + 1)} }`;
    return " { __typename }";
  }
  return ` { ${picked.map((f) => f.name).join(" ")} }`;
}

/** `{ a b { c } }` -> one field per line, indented under `indent`. */
function prettySelection(sel: string, indent: string): string {
  const tokens = sel.trim().match(/[{}]|[^\s{}]+/g) ?? [];
  const out: string[] = [];
  let depth = 0;
  let line = "";
  for (const t of tokens) {
    if (t === "{") {
      line += " {";
      out.push(indent + "  ".repeat(depth) + line.trim());
      line = "";
      depth++;
    } else if (t === "}") {
      if (line) out.push(indent + "  ".repeat(depth) + line.trim());
      line = "";
      depth--;
      out.push(indent + "  ".repeat(depth) + "}");
    } else {
      if (line) out.push(indent + "  ".repeat(depth) + line.trim());
      line = t;
    }
  }
  return out.join("\n").replace(/^\s*\{\n/, " {\n");
}

function example(kind: OpKind, field: GraphQLField<unknown, unknown>): string {
  const own = EXAMPLES.ops[field.name];
  if (own) return own.trim();
  let args = field.args.filter((a) => isNonNullType(a.type));
  if (args.length === 0 && field.args.length > 0) args = [field.args[0]!];
  const pairs = args.map((a) => `${a.name}: ${inputLiteral(a.type, a.name, field.name)}`);
  const inline = pairs.join(", ");
  const argText = !pairs.length ? "" : inline.length <= 60 ? `(${inline})` : `(\n${pairs.map((p) => `    ${p}`).join("\n")}\n  )`;
  const sel = selection(field.type);
  const body = `${field.name}${argText}${sel ? prettySelection(sel, "  ") : ""}`;
  return `${kind} {\n  ${body}\n}`;
}

/* ------------------------------------------------------------------ */
/* Rendering                                                           */
/* ------------------------------------------------------------------ */

function argRows(args: readonly GraphQLArgument[]): string[] {
  const rows: string[] = [];
  for (const a of args) {
    rows.push(`| \`${a.name}\` | ${typeRef(a.type)} | ${cell(a.description ?? "")} |`);
    const named = getNamedType(a.type);
    if (isInputObjectType(named)) {
      for (const f of Object.values(named.getFields())) {
        rows.push(`| \`${a.name}.${f.name}\` | ${typeRef(f.type)} | ${cell(fieldDoc(f.description, f.type))} |`);
      }
    } else if (isEnumType(named)) {
      const last = rows.pop()!;
      rows.push(last.replace(/ \|$/, ` ${enumHint(named)} |`).replace(/\|  /, "| "));
    }
  }
  return rows;
}

function enumHint(e: GraphQLEnumType): string {
  const vals = e.getValues().filter((v) => !v.deprecationReason);
  if (vals.length > 8) return "";
  return `One of ${vals.map((v) => `\`${v.name}\``).join(", ")}.`;
}

function fieldDoc(desc: string | null | undefined, t: GraphQLInputType): string {
  const named = getNamedType(t);
  const hint = isEnumType(named) ? enumHint(named) : "";
  return [desc ?? "", hint].filter(Boolean).join(" ");
}

function renderOp(kind: OpKind, name: string): string {
  const root = ROOTS[kind];
  const field = root?.getFields()[name];
  if (!field) throw new Error(`No ${kind} named ${name}`);
  const override = EXAMPLES.docs[name];
  const out: string[] = [];
  out.push(`### \`${name}\``);
  out.push("");
  out.push(`${gateLine(kind, name)}. Returns ${typeRef(field.type)}.`);
  out.push("");
  const doc = prose(override ?? field.description);
  if (doc) {
    out.push(doc);
    out.push("");
  }
  if (field.args.length) {
    out.push("| Argument | Type | Description |");
    out.push("| --- | --- | --- |");
    out.push(...argRows(field.args));
    out.push("");
  }
  out.push("```graphql");
  out.push(example(kind, field));
  out.push("```");
  out.push("");
  return out.join("\n");
}

function renderPage(page: Page): string {
  const out: string[] = [];
  out.push("---");
  out.push(`title: ${page.title}`);
  out.push(`description: ${JSON.stringify(page.description)}`);
  out.push("---");
  out.push("");
  out.push("{/* Generated by scripts/api-reference/generate.ts. Edit pages.ts, not this file. */}");
  out.push("");
  out.push(page.intro.trim());
  out.push("");
  for (const section of page.sections) {
    out.push(`## ${section.title}`);
    out.push("");
    if (section.intro) {
      out.push(section.intro.trim());
      out.push("");
    }
    for (const op of section.ops) out.push(renderOp(op[0], op[1]));
  }
  if (page.seeAlso?.length) {
    out.push("## See also");
    out.push("");
    out.push("<Cards>");
    for (const c of page.seeAlso)
      out.push(`  <Card title=${JSON.stringify(c.title)} description=${JSON.stringify(c.description)} href=${JSON.stringify(c.href)} />`);
    out.push("</Cards>");
    out.push("");
  }
  return out.join("\n");
}

/* ------------------------------------------------------------------ */
/* Type pages                                                          */
/* ------------------------------------------------------------------ */

function namedTypes(): GraphQLNamedType[] {
  return Object.values(schema.getTypeMap())
    .filter((t) => !t.name.startsWith("__"))
    .filter((t) => !["Query", "Mutation", "Subscription"].includes(t.name))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function renderObjects(): string {
  const out = [
    "---",
    "title: Object types",
    'description: "Every object a query, mutation or subscription can return, with its fields."',
    "---",
    "",
    "{/* Generated by scripts/api-reference/generate.ts. Edit pages.ts, not this file. */}",
    "",
    "Every object type in the schema, A to Z. Pick fields from these tables when you write a selection set. A field that takes arguments lists them in its description.",
    "",
  ];
  for (const t of namedTypes()) {
    if (!isObjectType(t) && !isInterfaceType(t)) continue;
    out.push(`### ${t.name}`);
    out.push("");
    if (t.description) out.push(prose(t.description), "");
    out.push("| Field | Type | Description |");
    out.push("| --- | --- | --- |");
    for (const f of Object.values(t.getFields())) {
      const args = f.args.length
        ? ` Arguments: ${f.args.map((a) => `\`${a.name}: ${String(a.type)}\``).join(", ")}.`
        : "";
      const dep = f.deprecationReason ? ` Deprecated: ${f.deprecationReason}` : "";
      out.push(`| \`${f.name}\` | ${typeRef(f.type)} | ${cell((f.description ?? "") + args + dep)} |`);
    }
    out.push("");
  }
  for (const t of namedTypes()) {
    if (!isUnionType(t)) continue;
    out.push(`### ${t.name}`, "");
    if (t.description) out.push(prose(t.description), "");
    out.push(`A union of ${t.getTypes().map((m) => typeRef(m)).join(", ")}. Select with an inline fragment on the member type.`, "");
  }
  return out.join("\n");
}

function renderInputs(): string {
  const out = [
    "---",
    "title: Input types",
    'description: "Every input object a mutation or query argument takes, with its fields."',
    "---",
    "",
    "{/* Generated by scripts/api-reference/generate.ts. Edit pages.ts, not this file. */}",
    "",
    "Every input type in the schema, A to Z. A `!` on the type means the field is required.",
    "",
  ];
  for (const t of namedTypes()) {
    if (!isInputObjectType(t)) continue;
    out.push(`### ${t.name}`, "");
    if (t.description) out.push(prose(t.description), "");
    out.push("| Field | Type | Description |");
    out.push("| --- | --- | --- |");
    for (const f of Object.values((t as GraphQLInputObjectType).getFields()))
      out.push(`| \`${f.name}\` | ${typeRef(f.type)} | ${cell(fieldDoc(f.description, f.type))} |`);
    out.push("");
  }
  return out.join("\n");
}

function renderEnums(): string {
  const out = [
    "---",
    "title: Enums",
    'description: "Every enum in the schema and the values it accepts."',
    "---",
    "",
    "{/* Generated by scripts/api-reference/generate.ts. Edit pages.ts, not this file. */}",
    "",
    "Every enum in the schema, A to Z. Send a value bare in a document (`status: ready`) and as a string in JSON variables (`\"ready\"`).",
    "",
  ];
  for (const t of namedTypes()) {
    if (!isEnumType(t)) continue;
    out.push(`### ${t.name}`, "");
    if (t.description) out.push(prose(t.description), "");
    if (t.name === "Capability") {
      out.push("The 44 capabilities, one action each. What each one grants is on [Capabilities](/reference/capabilities).", "");
    }
    out.push("| Value | Description |");
    out.push("| --- | --- |");
    for (const v of t.getValues()) {
      const dep = v.deprecationReason ? `Deprecated. ${v.deprecationReason}` : "";
      out.push(`| \`${v.name}\` | ${cell([v.description ?? "", dep].filter(Boolean).join(" "))} |`);
    }
    out.push("");
  }
  return out.join("\n");
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

const seen = new Map<string, string>();
for (const page of PAGES)
  for (const s of page.sections)
    for (const [kind, name] of s.ops) {
      const key = `${kind}.${name}`;
      if (seen.has(key)) throw new Error(`${key} is on both ${seen.get(key)} and ${page.slug}`);
      seen.set(key, page.slug);
    }
const missing: string[] = [];
for (const kind of ["query", "mutation", "subscription"] as OpKind[])
  for (const name of Object.keys(ROOTS[kind]?.getFields() ?? {}))
    if (!seen.has(`${kind}.${name}`)) missing.push(`${kind}.${name}`);
if (missing.length) throw new Error(`Not on any page:\n  ${missing.join("\n  ")}`);
for (const key of seen.keys()) {
  const [kind, name] = key.split(".") as [OpKind, string];
  if (!ROOTS[kind]?.getFields()[name]) throw new Error(`${key} is not in the schema`);
}

mkdirSync(join(OUT, "types"), { recursive: true });
for (const page of PAGES) writeFileSync(join(OUT, `${page.slug}.mdx`), renderPage(page));
writeFileSync(join(OUT, "types/objects.mdx"), renderObjects());
writeFileSync(join(OUT, "types/inputs.mdx"), renderInputs());
writeFileSync(join(OUT, "types/enums.mdx"), renderEnums());
console.log(`${seen.size} operations on ${PAGES.length} pages, plus 3 type pages`);
