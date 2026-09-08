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
  // 2026-08: guides/ and api-reference/ were split into subcategories.
  // Not yet permanent since the new structure hasn't been verified live.
  async redirects() {
    return [
      { source: "/guides/deploy-from-git", destination: "/guides/deploy/from-git", permanent: false },
      { source: "/guides/deploy-a-docker-image", destination: "/guides/deploy/docker-image", permanent: false },
      { source: "/guides/deploy-from-a-template", destination: "/guides/deploy/from-template", permanent: false },
      { source: "/guides/upload-your-code", destination: "/guides/deploy/upload-code", permanent: false },
      { source: "/guides/build-settings", destination: "/guides/releases/build-settings", permanent: false },
      { source: "/guides/automatic-deployments", destination: "/guides/releases/automatic-deployments", permanent: false },
      { source: "/guides/rollbacks", destination: "/guides/releases/rollbacks", permanent: false },
      { source: "/guides/domains-and-https", destination: "/guides/networking/domains-and-https", permanent: false },
      { source: "/guides/pull-request-previews", destination: "/guides/networking/pull-request-previews", permanent: false },
      { source: "/guides/environment-variables", destination: "/guides/config/environment-variables", permanent: false },
      { source: "/guides/shared-variables", destination: "/guides/config/shared-variables", permanent: false },
      { source: "/guides/databases", destination: "/guides/data/databases", permanent: false },
      { source: "/guides/backups-and-restore", destination: "/guides/data/backups-and-restore", permanent: false },
      { source: "/guides/persistent-storage", destination: "/guides/data/persistent-storage", permanent: false },
      { source: "/guides/logs", destination: "/guides/observability/logs", permanent: false },
      { source: "/guides/monitoring", destination: "/guides/observability/monitoring", permanent: false },
      { source: "/guides/notifications-and-alerts", destination: "/guides/observability/notifications-and-alerts", permanent: false },
      { source: "/guides/console-and-files", destination: "/guides/observability/console", permanent: false },
      { source: "/guides/cron-jobs", destination: "/guides/observability/cron-jobs", permanent: false },
      { source: "/guides/teams-and-members", destination: "/guides/team/members", permanent: false },
      { source: "/guides/account-security", destination: "/guides/team/account-security", permanent: false },
      { source: "/guides/add-a-server", destination: "/operations/servers/add-a-server", permanent: false },
      { source: "/guides/server-settings", destination: "/operations/servers", permanent: false },
      { source: "/guides/container-registries", destination: "/operations/servers/container-registries", permanent: false },
      { source: "/api-reference/queries-and-mutations", destination: "/api-reference/apps", permanent: false },
      // 2026-09: api-reference regenerated from the schema, one page per domain.
      { source: "/api-reference/authorization", destination: "/api-reference/authentication", permanent: false },
      { source: "/api-reference/session-and-login", destination: "/api-reference/account", permanent: false },
      { source: "/api-reference/instance-admin-operations", destination: "/api-reference/instance", permanent: false },
      { source: "/api-reference/apps/deploying-and-rollbacks", destination: "/api-reference/deployments", permanent: false },
      { source: "/api-reference/apps/deploy-hook", destination: "/api-reference/rest", permanent: false },
      { source: "/api-reference/environment-variables/secret-variables", destination: "/api-reference/environment-variables", permanent: false },
      { source: "/api-reference/domains-and-tls", destination: "/api-reference/domains", permanent: false },
      { source: "/api-reference/domains-and-tls/certificates", destination: "/api-reference/servers", permanent: false },
      { source: "/api-reference/projects-and-environments", destination: "/api-reference/folders-and-projects", permanent: false },
      { source: "/api-reference/databases/operations", destination: "/api-reference/databases", permanent: false },
      { source: "/api-reference/databases/console-and-logs", destination: "/api-reference/console-and-logs", permanent: false },
      { source: "/api-reference/servers/metrics", destination: "/api-reference/monitoring", permanent: false },
      { source: "/api-reference/teams-and-members", destination: "/api-reference/members-and-roles", permanent: false },
      { source: "/api-reference/teams-and-members/roles", destination: "/api-reference/members-and-roles", permanent: false },
      { source: "/api-reference/backup-destinations", destination: "/api-reference/backups", permanent: false },
      { source: "/api-reference/dokploy-import", destination: "/api-reference/migration", permanent: false },
      { source: "/api-reference/rest-and-mcp", destination: "/api-reference/mcp", permanent: false },
      { source: "/advanced/mcp-server", destination: "/guides/mcp-server", permanent: false },
      // 2026-09: the migration pages became their own top-level section.
      { source: "/guides/what-migrates", destination: "/migrations", permanent: false },
      { source: "/guides/take-over-your-vps", destination: "/migrations", permanent: false },
      { source: "/guides/move-from-dokploy", destination: "/migrations/move-from-dokploy", permanent: false },
      { source: "/guides/move-from-coolify", destination: "/migrations/move-from-coolify", permanent: false },
      // 2026-09: the server pages moved under Operations.
      { source: "/guides/server/certificates", destination: "/advanced/custom-certificates", permanent: false },
      { source: "/guides/server/add-a-server", destination: "/operations/servers/add-a-server", permanent: false },
      { source: "/guides/server/access", destination: "/operations/servers/access", permanent: false },
      { source: "/guides/server/cleanup", destination: "/operations/servers/cleanup", permanent: false },
      { source: "/guides/server/maintenance-and-advanced", destination: "/operations/servers/maintenance-and-advanced", permanent: false },
      { source: "/guides/server/container-registries", destination: "/operations/servers/container-registries", permanent: false },
      { source: "/guides/server", destination: "/operations/servers", permanent: false },
    ];
  },
};

export default withMDX(config);
