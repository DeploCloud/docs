<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Documentation writing rules

These rules apply to every page under `content/docs/`. They are not optional style
suggestions, they are the bar every doc page is reviewed against.

- **Clear, direct, as simple as possible.** When a technical term is genuinely needed, use
  it plainly, don't dilute it with a weak explanation, and don't wrap it in jargon that
  isn't needed.
- **No walls of text.** Short sentences, one concept per block, lists instead of long
  paragraphs, more concrete examples (real commands, real values, real snippets) than prose.
- **Stay inside Deplo's mission.** Self-hosted, no SSH required on the happy path, no Docker
  socket exposed, the control plane never touches a host directly. Never invent a feature
  that doesn't exist in the product. If you're unsure whether something is real, check
  `docs/` in the `DeploCloud/deplo` repo before writing about it, don't guess.
- **Use the available Fumadocs components** (all pre-registered in `mdx-components.tsx`, no
  import needed except icons for `Card`):
  - `Callout` for a tip, warning, or note
  - `Steps` / `Step` for a sequential procedure
  - `Tabs` / `Tab` for alternatives (OS, package manager, plain vs. secret, ...)
  - `TypeTable` for field/type/description reference tables (env vars, capabilities, ports,
    config keys)
  - `Accordions` / `Accordion` for optional or grouped content, FAQ-style
  - `Cards` / `Card` for outbound links at the end of a page ("See also")
  Don't force a component where a plain paragraph or a normal markdown table already reads
  fine.
- **Show every Node package manager.** Any example that runs a Node command (`install`,
  `run dev`, etc.) gets a `Tabs` with bun, pnpm and npm variants, not just one.
- **Hyphen only, never an em dash or en dash**, in any doc content (same rule as chat).
