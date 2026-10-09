// Ctrl+K regression check: `bun dev`, then `bun scripts/search-check.ts [base-url]`.
// Each query lists acceptable targets; one must be in the top 3 pages, and a #section among its rows.
type Result = { type: string; url: string };

const BASE = process.argv[2] ?? "http://localhost:3000";

const CASES: [string, ...string[]][] = [
  ["reset password", "/operations/break-glass-recovery#reset-a-password", "/operations/instance-administration#users"],
  ["how do i reset my password", "/operations/break-glass-recovery#reset-a-password", "/operations/instance-administration#users"],
  ["change password", "/guides/team/account-security#change-your-password"],
  ["forgot password", "/troubleshooting/sign-in-and-access#you-cannot-sign-in", "/operations/break-glass-recovery#reset-a-password"],
  ["two factor", "/guides/team/account-security#two-factor-authentication"],
  ["2fa", "/guides/team/account-security#two-factor-authentication"],
  ["passkey", "/guides/team/account-security#passkeys"],
  ["passw", "/guides/team/account-security#change-your-password"],
  ["custom domain", "/getting-started/add-a-domain", "/guides/networking/domains-and-https"],
  ["add a domain", "/getting-started/add-a-domain"],
  ["ssl certificate", "/guides/networking/domains-and-https#certificates", "/advanced/custom-certificates"],
  ["environment variables", "/guides/config/environment-variables"],
  ["env vars", "/guides/config/environment-variables"],
  ["shared variables", "/guides/config/shared-variables"],
  ["rollback", "/guides/releases/rollbacks"],
  ["backup", "/guides/data/backups-and-restore"],
  ["restore a backup", "/guides/data/backups-and-restore#restore"],
  ["s3", "/guides/data/backups-and-restore"],
  ["cron job", "/guides/observability/cron-jobs"],
  ["logs", "/guides/observability/logs"],
  ["add a server", "/operations/servers/add-a-server"],
  ["install", "/getting-started/install"],
  ["uninstall", "/operations/remove-a-server-or-uninstall", "/reference/installers/uninstall"],
  ["update deplo", "/operations/upgrade"],
  ["docker compose", "/advanced/compose-apps"],
  ["dockerfile", "/guides/releases/build-settings#the-four-build-methods"],
  ["github", "/guides/git-providers/github"],
  ["pull request preview", "/guides/networking/pull-request-previews"],
  ["api token", "/advanced/api-tokens-and-oauth"],
  ["mcp", "/guides/mcp-server"],
  ["deploy hook", "/guides/releases/automatic-deployments#the-deploy-hook"],
  ["auto deploy", "/guides/releases/automatic-deployments"],
  ["publish port", "/advanced/published-ports"],
  ["volume", "/guides/data/persistent-storage"],
  ["no space left on device", "/troubleshooting/deploys-and-builds#no-space-left-on-device"],
  ["why is my build failing", "/troubleshooting/deploys-and-builds#the-build-fails"],
  ["migrate from coolify", "/migrations/move-from-coolify"],
  ["health check", "/guides/observability/health-checks"],
  ["memory limit", "/advanced/resource-limits#memory-and-cpu"],
  ["owner locked out", "/troubleshooting/sign-in-and-access#you-are-the-owner-and-locked-out"],
  ["recover owner", "/operations/break-glass-recovery#restore-ownership-or-access"],
  ["private registry", "/operations/servers/container-registries"],
  ["manage_mcp", "/reference/capabilities#integrations--api"],
  ["docker cleanup", "/operations/servers/cleanup"],
  ["telemetry", "/operations/anonymous-usage-statistics"],
  ["cannot resolve host", "/advanced/network-isolation#cannot-resolve-host"],
  ["certificate warning", "/troubleshooting/domains-and-tls#the-browser-shows-a-certificate-warning"],
  ["deploy", "/guides/deploy", "/getting-started/first-app"],
];

let failed = 0;
for (const [query, ...targets] of CASES) {
  const results: Result[] = await (await fetch(`${BASE}/api/search?tag=docs&query=${encodeURIComponent(query)}`)).json();
  const pages: { url: string; rows: string[] }[] = [];
  for (const result of results) {
    if (result.type === "page") pages.push({ url: result.url, rows: [] });
    else pages.at(-1)?.rows.push(result.url);
  }
  const pass = targets.some((target) => {
    const page = pages.slice(0, 3).find((p) => p.url === target.split("#")[0]);
    return page && (!target.includes("#") || page.rows.includes(target));
  });
  if (!pass) {
    failed++;
    console.log(`FAIL ${query.padEnd(28)} top: ${pages.slice(0, 3).map((p) => p.url).join("  ")}`);
  }
}
console.log(`${CASES.length - failed}/${CASES.length} queries find their page`);
process.exit(failed ? 1 : 0);
