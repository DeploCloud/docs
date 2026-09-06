import { schema } from "@/lib/graphql/schema";
type Gate = { kind: string; cap?: string; orInstanceAdmin?: boolean };
function gateOf(field: any): Gate {
  const scopes = field.extensions?.pothosOptions?.authScopes;
  if (!scopes || typeof scopes !== "object") return { kind: "none" };
  const s = scopes as Record<string, any>;
  const any = s.$any;
  const cap = s.capability ?? any?.capability;
  if (cap) return { kind: "capability", cap, orInstanceAdmin: Boolean(any?.instanceAdmin) };
  if (s.instanceAdmin || any?.instanceAdmin) return { kind: "instanceAdmin" };
  if (s.loggedIn || any?.loggedIn) return { kind: "loggedIn" };
  return { kind: "none" };
}
const out: Record<string, Gate> = {};
for (const [kind, type] of [["Query", schema.getQueryType()], ["Mutation", schema.getMutationType()], ["Subscription", schema.getSubscriptionType()]] as const) {
  if (!type) continue;
  for (const f of Object.values(type.getFields())) out[`${kind}.${f.name}`] = gateOf(f);
}
process.stdout.write(JSON.stringify(out, null, 1) + "\n");
