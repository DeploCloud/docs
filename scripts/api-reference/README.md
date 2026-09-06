# API reference generator

The GraphQL pages under `content/docs/api-reference/` (every domain page plus `types/`) are generated. Do not edit them by hand; edit `pages.ts` and regenerate.

Inputs:

- `schema.graphql` - a verbatim copy of the file at the root of `DeploCloud/deplo`.
- `gates.json` - who may call each operation, read off the built schema with `dump-gates.ts`.
- `pages.ts` - which operation goes on which page, the prose around it, and the example values.

Regenerate after a schema change:

```bash
# 1. In the deplo checkout, refresh both inputs
cd ../deplo
cp schema.graphql ../deplo-docs/scripts/api-reference/schema.graphql
NODE_TEST_CONTEXT=1 node --require ./lib/test/server-only-shim.cjs --import tsx \
  ../deplo-docs/scripts/api-reference/dump-gates.ts > ../deplo-docs/scripts/api-reference/gates.json

# 2. Back here, regenerate
cd ../deplo-docs
bun scripts/api-reference/generate.ts
```

The generator fails if an operation in the schema is on no page, or on two. Add new operations to `pages.ts` and run again. `dump-gates.ts` imports `@/lib/graphql/schema` from the deplo checkout it is run in, which is why step 1 runs from there.
