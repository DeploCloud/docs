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
  // 2026-08: guides/ and api-reference/ were split into subcategories. All
  // permanent: a 307 leaves the old url in the index and passes it nothing.
  async redirects() {
    return [
      { source: "/guides/deploy-from-git", destination: "/guides/deploy/from-git", permanent: true },
      { source: "/guides/deploy-a-docker-image", destination: "/guides/deploy/docker-image", permanent: true },
      { source: "/guides/deploy-from-a-template", destination: "/guides/deploy/from-template", permanent: true },
      { source: "/guides/upload-your-code", destination: "/guides/deploy/upload-code", permanent: true },
      { source: "/guides/build-settings", destination: "/guides/releases/build-settings", permanent: true },
      { source: "/guides/automatic-deployments", destination: "/guides/releases/automatic-deployments", permanent: true },
      { source: "/guides/rollbacks", destination: "/guides/releases/rollbacks", permanent: true },
      { source: "/guides/domains-and-https", destination: "/guides/networking/domains-and-https", permanent: true },
      { source: "/guides/pull-request-previews", destination: "/guides/networking/pull-request-previews", permanent: true },
      { source: "/guides/environment-variables", destination: "/guides/config/environment-variables", permanent: true },
      { source: "/guides/shared-variables", destination: "/guides/config/shared-variables", permanent: true },
      { source: "/guides/databases", destination: "/guides/data/databases", permanent: true },
      { source: "/guides/backups-and-restore", destination: "/guides/data/backups-and-restore", permanent: true },
      { source: "/guides/persistent-storage", destination: "/guides/data/persistent-storage", permanent: true },
      { source: "/guides/logs", destination: "/guides/observability/logs", permanent: true },
      { source: "/guides/monitoring", destination: "/guides/observability/monitoring", permanent: true },
      { source: "/guides/notifications-and-alerts", destination: "/guides/observability/notifications-and-alerts", permanent: true },
      { source: "/guides/console-and-files", destination: "/guides/observability/console", permanent: true },
      { source: "/guides/cron-jobs", destination: "/guides/observability/cron-jobs", permanent: true },
      { source: "/guides/teams-and-members", destination: "/guides/team/members", permanent: true },
      { source: "/guides/account-security", destination: "/guides/team/account-security", permanent: true },
      { source: "/guides/add-a-server", destination: "/operations/servers/add-a-server", permanent: true },
      { source: "/guides/server-settings", destination: "/operations/servers", permanent: true },
      { source: "/guides/container-registries", destination: "/operations/servers/container-registries", permanent: true },
      { source: "/api-reference/queries-and-mutations", destination: "/api-reference/apps", permanent: true },
      // 2026-09: api-reference regenerated from the schema, one page per domain.
      { source: "/api-reference/authorization", destination: "/api-reference/authentication", permanent: true },
      { source: "/api-reference/session-and-login", destination: "/api-reference/account", permanent: true },
      { source: "/api-reference/instance-admin-operations", destination: "/api-reference/instance", permanent: true },
      { source: "/api-reference/apps/deploying-and-rollbacks", destination: "/api-reference/deployments", permanent: true },
      { source: "/api-reference/apps/deploy-hook", destination: "/api-reference/rest", permanent: true },
      { source: "/api-reference/environment-variables/secret-variables", destination: "/api-reference/environment-variables", permanent: true },
      { source: "/api-reference/domains-and-tls", destination: "/api-reference/domains", permanent: true },
      { source: "/api-reference/domains-and-tls/certificates", destination: "/api-reference/servers", permanent: true },
      { source: "/api-reference/projects-and-environments", destination: "/api-reference/folders-and-projects", permanent: true },
      { source: "/api-reference/databases/operations", destination: "/api-reference/databases", permanent: true },
      { source: "/api-reference/databases/console-and-logs", destination: "/api-reference/console-and-logs", permanent: true },
      { source: "/api-reference/servers/metrics", destination: "/api-reference/monitoring", permanent: true },
      { source: "/api-reference/teams-and-members", destination: "/api-reference/members-and-roles", permanent: true },
      { source: "/api-reference/teams-and-members/roles", destination: "/api-reference/members-and-roles", permanent: true },
      { source: "/api-reference/backup-destinations", destination: "/api-reference/backups", permanent: true },
      { source: "/api-reference/dokploy-import", destination: "/api-reference/migration", permanent: true },
      { source: "/api-reference/rest-and-mcp", destination: "/api-reference/mcp", permanent: true },
      { source: "/advanced/mcp-server", destination: "/guides/mcp-server", permanent: true },
      // 2026-09: the migration pages became their own top-level section.
      { source: "/guides/what-migrates", destination: "/migrations", permanent: true },
      { source: "/guides/take-over-your-vps", destination: "/migrations", permanent: true },
      { source: "/guides/move-from-dokploy", destination: "/migrations/move-from-dokploy", permanent: true },
      { source: "/guides/move-from-coolify", destination: "/migrations/move-from-coolify", permanent: true },
      // 2026-09: the server pages moved under Operations.
      { source: "/guides/server/certificates", destination: "/advanced/custom-certificates", permanent: true },
      { source: "/guides/server/add-a-server", destination: "/operations/servers/add-a-server", permanent: true },
      { source: "/guides/server/access", destination: "/operations/servers/access", permanent: true },
      { source: "/guides/server/cleanup", destination: "/operations/servers/cleanup", permanent: true },
      { source: "/guides/server/maintenance-and-advanced", destination: "/operations/servers/maintenance-and-advanced", permanent: true },
      { source: "/guides/server/container-registries", destination: "/operations/servers/container-registries", permanent: true },
      { source: "/guides/server", destination: "/operations/servers", permanent: true },
    ];
  },
};

export default withMDX(config);
