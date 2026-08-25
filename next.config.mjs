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
      { source: "/guides/console-and-files", destination: "/guides/observability/console-and-files", permanent: false },
      { source: "/guides/cron-jobs", destination: "/guides/observability/cron-jobs", permanent: false },
      { source: "/guides/teams-and-members", destination: "/guides/team/members", permanent: false },
      { source: "/guides/account-security", destination: "/guides/team/account-security", permanent: false },
      { source: "/guides/add-a-server", destination: "/guides/server/add-a-server", permanent: false },
      { source: "/guides/server-settings", destination: "/guides/server", permanent: false },
      { source: "/guides/container-registries", destination: "/guides/server/container-registries", permanent: false },
      { source: "/api-reference/queries-and-mutations", destination: "/api-reference/apps", permanent: false },
    ];
  },
};

export default withMDX(config);
