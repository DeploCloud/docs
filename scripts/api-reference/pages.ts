// Page layout for the generated GraphQL reference: which operation goes where,
// the prose around it, and the example values. Regenerate after editing.
export type OpKind = "query" | "mutation" | "subscription";
export type Op = [OpKind, string];

export interface Page {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { title: string; intro?: string; ops: Op[] }[];
  seeAlso?: { title: string; description: string; href: string }[];
}

const q = (name: string): Op => ["query", name];
const m = (name: string): Op => ["mutation", name];
const s = (name: string): Op => ["subscription", name];

/** String / ID argument values by argument name. Ids are derived from the name. */
export const VALUES: Record<string, string> = {
  email: '"ada@example.com"',
  password: '"correct-horse-battery-staple"',
  currentPassword: '"correct-horse-battery-staple"',
  newPassword: '"a-longer-new-passphrase"',
  code: '"123456"',
  name: '"shop"',
  slug: '"shop"',
  username: '"ada"',
  teamName: '"Acme"',
  orgName: '"acme"',
  q: '"shop"',
  query: '"ada"',
  url: '"https://panel.example.com"',
  address: '"203.0.113.10"',
  host: '"203.0.113.10"',
  timezone: '"Europe/Rome"',
  key: '"DATABASE_URL"',
  newKey: '"POSTGRES_URL"',
  value: '"postgres://shop:secret@db-orders:5432/orders"',
  branch: '"main"',
  repo: '"acme/shop"',
  fullName: '"acme/shop"',
  rootDirectory: '"apps/web"',
  buildMethod: '"nixpacks"',
  path: '"config/app.yml"',
  content: '"port: 3000\\n"',
  blob: '"API_URL=https://api.example.com\\nLOG_LEVEL=info"',
  color: '"#3b82f6"',
  schedule: '"0 3 * * *"',
  command: '"ls -la /app"',
  framework: '"vite"',
  role: '"build"',
  apiKey: '"<source panel api key>"',
  token: '"<token from the registration link>"',
  certificateId: '"sha256:3f8c…"',
  clientId: '"oauth_client_9f1c2ab7"',
  endpoint: '"https://push.example.com/send/abc"',
  p256dh: '"BNc…"',
  auth: '"k8s…"',
  kind: '"app"',
  sourceKind: '"application"',
  sourceId: '"<service id from the scan>"',
  environment: '"production"',
  status: '"ready"',
  image: '"data:image/png;base64,…"',
  logo: '"data:image/png;base64,…"',
  container: '"web"',
  containerName: '"web"',
  service: '"web"',
  fromTeamId: '"team_9f1c2ab7d3e4f5a6"',
  expectedTeamId: '"team_9f1c2ab7d3e4f5a6"',
};

/** Int argument values by argument name. */
export const INTS: Record<string, number> = {
  limit: 20,
  count: 5,
  days: 30,
  concurrency: 2,
  prNumber: 42,
  port: 5432,
  ports: 5432,
  agentPort: 7443,
  retentionCount: 7,
};

export const EXAMPLES: {
  /** Whole-document overrides, by operation name. */
  ops: Record<string, string>;
  /** Input-object literals, by input type name. */
  inputs: Record<string, string>;
  /** Selection sets, by return type name. */
  selections: Record<string, string>;
  /** Description overrides, by operation name. */
  docs: Record<string, string>;
} = {
  inputs: {
    CreateAppInput: `{
      name: "shop"
      source: GITHUB
      repo: { provider: "github", repo: "acme/shop", branch: "main", url: "https://github.com/acme/shop", installationId: "ghi_9f1c2ab7d3e4f5a6" }
      build: { buildMethod: "nixpacks", port: 3000 }
      env: [{ key: "NODE_ENV", value: "production" }]
      autoDeploy: true
    }`,
    CreateAppFromTemplateInput: `{ templateSlug: "umami", name: "analytics", deploy: true }`,
    CreateDatabaseInput: `{ name: "orders", type: postgres, version: "17" }`,
    CreateTokenInput: `{ name: "ci", capabilities: [deploy_apps, view_logs], teamIds: ["team_9f1c2ab7d3e4f5a6"] }`,
    UpdateTokenInput: `{ id: "tok_9f1c2ab7d3e4f5a6", name: "ci", capabilities: [deploy_apps] }`,
    AddMemberInput: `{ userId: "user_9f1c2ab7d3e4f5a6", roleId: "role_9f1c2ab7d3e4f5a6" }`,
    UpdateMemberInput: `{ userId: "user_9f1c2ab7d3e4f5a6", roleId: "role_9f1c2ab7d3e4f5a6" }`,
    SetMemberAccessInput: `{ userId: "user_9f1c2ab7d3e4f5a6", roleId: "role_9f1c2ab7d3e4f5a6", granular: true, grants: [{ folderIds: ["fld_9f1c2ab7d3e4f5a6"], capabilities: [deploy_apps, view_logs] }] }`,
    SetUserTeamAccessInput: `{ userId: "user_9f1c2ab7d3e4f5a6", teamId: "team_9f1c2ab7d3e4f5a6", roleId: "role_9f1c2ab7d3e4f5a6", granular: false }`,
    UserTeamInput: `{ userId: "user_9f1c2ab7d3e4f5a6", teamId: "team_9f1c2ab7d3e4f5a6", roleId: "role_9f1c2ab7d3e4f5a6" }`,
    CreateRoleInput: `{ name: "Deployer", capabilities: [deploy_apps, rollback_apps, view_logs] }`,
    UpdateRoleInput: `{ id: "role_9f1c2ab7d3e4f5a6", name: "Deployer", capabilities: [deploy_apps, rollback_apps, view_logs, open_app_console] }`,
    UpdateTeamInput: `{ name: "Acme", requireTwoFactor: true }`,
    MintRegistrationLinkInput: `{ mode: existing_teams, teamAssignments: [{ teamId: "team_9f1c2ab7d3e4f5a6", role: member }] }`,
    UpdateUserAdminInput: `{ userId: "user_9f1c2ab7d3e4f5a6", isInstanceAdmin: false, suspended: false, canExposePorts: true }`,
    DeleteUserInput: `{ userId: "user_9f1c2ab7d3e4f5a6", deleteFoundedTeams: false }`,
    UpsertEnvInput: `{ appId: "prj_9f1c2ab7d3e4f5a6", key: "DATABASE_URL", value: "postgres://shop:secret@db-orders:5432/orders", type: secret, targets: [production, preview] }`,
    SaveSharedVarInput: `{ key: "API_BASE_URL", value: "https://api.example.com", type: plain, teamIds: [], projectIds: [], environmentIds: [], appIds: ["prj_9f1c2ab7d3e4f5a6"] }`,
    EnvEntryInput: `{ key: "NODE_ENV", value: "production" }`,
    DomainConfigInput: `{ port: 3000, www: toThis }`,
    DomainPatchInput: `{ pathPrefix: "/api", stripPrefix: true }`,
    UpdateSourceInput: `{ source: DOCKER_IMAGE, dockerImage: "ghcr.io/acme/shop:1.4.0" }`,
    BuildConfigInput: `{ buildMethod: "nixpacks", buildCommand: "npm run build", startCommand: "npm start", port: 3000 }`,
    ResourceLimitsInput: `{ memoryMb: 512, cpuMilli: 500 }`,
    HealthCheckInput: `{ type: http, path: "/healthz", port: 3000, intervalS: 10, timeoutS: 5, retries: 3, startPeriodS: 15 }`,
    PublishedPortInput: `{ published: 8080, target: 3000, protocol: "tcp" }`,
    VolumeInput: `{ type: "named", name: "uploads", mountPath: "/app/uploads" }`,
    MountInput: `{ filePath: "config/app.yml", content: "port: 3000\\n" }`,
    DatabaseMountInput: `{ filePath: "postgresql.conf", mountPath: "/etc/postgresql/postgresql.conf", content: "max_connections = 200\\n" }`,
    UpdateDatabaseInput: `{ exposedPublicly: true, exposedPort: 5432 }`,
    UpdateDatabaseImageInput: `{ version: "17.2" }`,
    CronJobInput: `{ name: "nightly-report", schedule: "0 3 * * *", command: "node scripts/report.js", timezone: "Europe/Rome" }`,
    CreateBackupInput: `{ name: "orders nightly", databaseId: "db_9f1c2ab7d3e4f5a6", destinationId: "dst_9f1c2ab7d3e4f5a6", schedule: "0 3 * * *", retentionCount: 7 }`,
    UpdateBackupInput: `{ name: "orders nightly", destinationId: "dst_9f1c2ab7d3e4f5a6", schedule: "0 4 * * *", retentionCount: 14 }`,
    CreateDestinationInput: `{ name: "R2 backups", kind: s3, provider: CLOUDFLARE_R2, bucket: "deplo-backups", endpoint: "https://<account>.r2.cloudflarestorage.com", accessKey: "…", secretKey: "…" }`,
    AddRegistryInput: `{ name: "GHCR", type: ghcr, username: "ada", password: "<personal access token>" }`,
    AddServerInput: `{ name: "eu-1", host: "203.0.113.10", allTeams: true }`,
    SetServerTeamsInput: `{ serverId: "srv_9f1c2ab7d3e4f5a6", allTeams: false, teamIds: ["team_9f1c2ab7d3e4f5a6"] }`,
    ConnectGitProviderInput: `{ provider: "gitlab", label: "GitLab", baseUrl: "https://gitlab.com", token: "<personal access token>" }`,
    UpdateGitConnectionInput: `{ label: "GitLab (ops)" }`,
    ServerCertificateInput: `{ certificate: "-----BEGIN CERTIFICATE-----\\n…", privateKey: "-----BEGIN PRIVATE KEY-----\\n…" }`,
    UpdateDockerCleanupPolicyInput: `{ enabled: true, schedule: "0 4 * * *", minAgeHours: 24, keepImagesPerApp: 3, scopes: [dangling_images, build_cache] }`,
    AppPreviewSettingsInput: `{ enabled: true, port: 3000, ttlDays: 7 }`,
    ComposeNameClashesInput: `{ compose: "services:\\n  web:\\n    image: nginx\\n", serverId: "srv_9f1c2ab7d3e4f5a6" }`,
    MigrationSourceInput: `{ url: "https://dokploy.example.com", apiKey: "<source panel api key>" }`,
    MigrationServerChoiceInput: `{ from: "<source server id>", to: "srv_9f1c2ab7d3e4f5a6" }`,
    MigrationPlacementInput: `{ serviceId: "<service id from the scan>", serverId: "srv_9f1c2ab7d3e4f5a6" }`,
    MigrationRunTargetInput: `{ projectId: "<project id from the scan>", projectName: "shop", serviceId: "<service id from the scan>", serverId: "srv_9f1c2ab7d3e4f5a6" }`,
    NodeGrantInput: `{ folderIds: ["fld_9f1c2ab7d3e4f5a6"], capabilities: [deploy_apps, view_logs] }`,
    RoleScopeInput: `{ projectIds: ["prc_9f1c2ab7d3e4f5a6"] }`,
    GitRepoInput: `{ provider: "github", repo: "acme/shop", branch: "main", url: "https://github.com/acme/shop", installationId: "ghi_9f1c2ab7d3e4f5a6" }`,
    ExtraDomainInput: `{ service: "api", port: 4000, path: "/api" }`,
    AppEnvInput: `{ key: "NODE_ENV", value: "production" }`,
  },
  selections: {
    App: "{ id slug name status productionUrl }",
    Deployment: "{ id status createdAt commitMessage url }",
    Database: "{ id name type version status host port }",
    Server: "{ id name host role status agentVersion }",
    Domain: "{ id name status ssl primary }",
    EnvVar: "{ id key type targets isMasked }",
    SharedVar: "{ id key type teamWide }",
    Team: "{ id slug name requireTwoFactor }",
    Member: "{ userId username roleName }",
    TeamRole: "{ id name capabilities memberCount }",
    ApiToken: "{ id name prefix capabilities expiresAt }",
    CreateTokenPayload: "{ raw token { id name prefix } }",
    AuthPayload: "{ requiresTwoFactor viewer { id username } }",
    Viewer: "{ id username email isInstanceAdmin }",
    Folder: "{ id name parentId appCount }",
    Project: "{ id slug name environmentCount }",
    Environment: "{ id slug name isDefault gitBranch }",
    Backup: "{ id name schedule enabled lastStatus }",
    BackupRun: "{ id status startedAt sizeBytes verified }",
    BackupDestination: "{ id name kind status }",
    CronJob: "{ id name schedule enabled nextRunAt }",
    CronRun: "{ id status exitCode startedAt }",
    Activity: "{ id type message actor createdAt }",
    AddServerPayload: "{ installCommand server { id name status } }",
    ServerRemoval: "{ uninstallCommand warning }",
    ServerUninstall: "{ removed uninstallCommand }",
    ExecResult: "{ output }",
    EnvImportResult: "{ added skippedSecrets }",
    DestinationTestResult: "{ report { ok error } destination { id status } }",
    S3TestReport: "{ ok error never steps { label status } }",
    SearchResults: "{ apps { id slug name team { slug } } databases { id name team { slug } } }",
    AppRuntime: "{ running total unhealthy unreachable }",
    ContainerMetrics: "{ cpu memUsed memLimit netRx netTx }",
    ServerMetrics: "{ cpu memPct diskPct online }",
    InstanceSettings: "{ panelUrl panelUrlSource gravatarEnabled logMaxDays version }",
    PanelAddressImpact: "{ sessions passkeys deployHooks mcpConnections losesHttps }",
    MigrationPlan: "{ platform orgName projects { name sourceId exists } }",
    MigrationRun: "{ id status phase created failed }",
    MigrationProjectResult: "{ projectName created skipped failed }",
    AppPreview: "{ id prNumber status url }",
    AppPreviewsView: "{ enabled previews { id prNumber status url } }",
    GitConnection: "{ id provider label health }",
    GithubConnectStart: "{ actionUrl manifest state }",
    DockerCleanupPolicy: "{ enabled schedule scopes }",
    DockerCleanupRun: "{ id status reclaimedBytes trigger }",
    UserDetail: "{ userId username email isInstanceAdmin suspended }",
    GlobalUser: "{ userId username isInstanceAdmin suspended }",
    RegistrationLink: "{ id status mode expiresAt }",
    UserTeamAccess: "{ teamId roleName granular }",
    TeamMembership: "{ id slug name role }",
    Takeover: "{ state platform dataLoss error }",
    ServerHostInfo: "{ osPretty kernel arch cpuCores timezone }",
    ServerReadinessReport: "{ verdict summary checks { label severity } }",
    ServerRestartReport: "{ restarted skipped failures { name error } }",
    CertificateAccount: "{ serverName email unavailable }",
    ServerCertificate: "{ id subject domains expiresInDays }",
    RecognizedFramework: "{ id name buildCommand startCommand defaultPort }",
    HostPortCheck: "{ checked inUse reason }",
    Passkey: "{ id name kind createdAt }",
    UserSession: "{ id label browser os current lastSeenAt }",
    TwoFactorEnrolment: "{ totpUri recoveryCodes }",
    McpSettings: "{ enabled }",
    McpTeam: "{ id slug mcpEnabled canConnect }",
    MonitoringSettings: "{ saveMetrics }",
    PanelHttps: "{ enabled domain certificateTrusted }",
    PanelDns: "{ host status resolved }",
    UpdateInfo: "{ current latest updateAvailable }",
    DeploChangelog: "{ releases { tag name publishedAt } }",
    BasicAuthUser: "{ id username }",
    Registry: "{ id name type username }",
    ConsoleInfo: "{ running containerName instances { name service running } }",
    LogsInfo: "{ running streamable instances { name service } }",
    CronJobsView: "{ enabled services jobs { id name schedule } }",
    AppStorageFile: "{ path state text }",
    AppTransferInfo: "{ appName targets { id name serverAvailable } }",
    BulkAppActionResult: "{ ok failed error }",
    MigrationInvite: "{ name email outcome link }",
    MigrationDataService: "{ sourceName targetName sourceReachable volumes { mountPath } }",
    MigrationDataMoveResult: "{ moved failed notes }",
    MigrationRevertResult: "{ apps databases projects failed }",
    MigrationSourceTeam: "{ platform teamName otherTeams }",
    MigrationRecopySource: "{ platform sourceUrl sourceName runId }",
    TakeoverPreflight: "{ agentReady diskTight diskFreeBytes }",
    TakeoverCancelResult: "{ restarted left }",
    RecoveryKey: "{ name recipient where }",
    DestinationRemovalImpact: "{ schedules runs artifacts }",
    BackupDestinationOption: "{ id name kind status }",
    FleetServerMetrics: "{ serverId online cpu memPct diskPct }",
    ContainerMetricsSample: "{ ts cpu memUsed }",
    ServerMetricsHistory: "{ ts cpu memPct }",
    DeleteUserImpact: "{ username tokenCount soloTeams { name appCount } blockedReason }",
    DeleteUserResult: "{ username teamsDeleted appsDeleted }",
    FolderGrant: "{ userId username capabilities isOwner }",
    FolderShareCandidate: "{ userId username name }",
    AppSharedVar: "{ id key linked inScope }",
    AppEnvGroup: "{ app { slug } vars { key type } }",
    PreviewEnvVar: "{ key type }",
    GitProvider: "{ id label defaultBaseUrl hasApi }",
    GitRepoSummary: "{ fullName defaultBranch private }",
    GithubApp: "{ id name slug installations { id accountLogin } }",
    GithubInstallation: "{ id accountLogin accountType }",
    GithubRepo: "{ fullName defaultBranch private }",
    GithubPullRequest: "{ number title headRef fromFork }",
    TemplateVariantSummary: "{ templateSlug variantSlug name category }",
    ComposeNameClash: "{ name owner renamedTo }",
    BuildServerChoice: "{ id name buildOnly hostArch }",
    UserSearchResult: "{ userId username name }",
  },
  ops: {
    apps: `query {
  apps(q: "shop") {
    id
    slug
    name
    status
    latestDeployment { status createdAt }
  }
}`,
    app: `query {
  app(slug: "shop") {
    id
    name
    status
    productionUrl
    framework
    deployments { id status createdAt }
  }
}`,
    search: `query {
  search(q: "shop", kinds: [app, database]) {
    apps { id slug name team { slug } }
    databases { id name team { slug } }
  }
}`,
    deployments: `query {
  deployments(appId: "prj_9f1c2ab7d3e4f5a6", status: ready) {
    id
    status
    commitSha
    commitMessage
    createdAt
    canRollback
  }
}`,
    activity: `query {
  activity(types: [deployment, domain], limit: 50) {
    id
    type
    message
    actor
    createdAt
    cursor
  }
}`,
    login: `mutation {
  login(email: "ada@example.com", password: "correct-horse-battery-staple") {
    requiresTwoFactor
    viewer { id username }
  }
}`,
    createToken: `mutation {
  createToken(input: { name: "ci", capabilities: [deploy_apps, view_logs] }) {
    raw
    token { id prefix expiresAt }
  }
}`,
    appStatus: `subscription {
  appStatus(slug: "shop") {
    id
    status
    latestDeployment { id status }
  }
}`,
    databaseStatus: `subscription {
  databaseStatus(id: "db_9f1c2ab7d3e4f5a6") {
    id
    status
  }
}`,
    setAppEnv: `mutation {
  setAppEnv(
    appId: "prj_9f1c2ab7d3e4f5a6"
    entries: [{ key: "NODE_ENV", value: "production" }, { key: "PORT", value: "3000" }]
    defaultTargets: [production, preview]
  )
}`,
    cancelAllDeployments: `mutation {
  cancelAllDeployments(appId: "prj_9f1c2ab7d3e4f5a6")
}`,
    deleteAllDeployments: `mutation {
  deleteAllDeployments(appId: "prj_9f1c2ab7d3e4f5a6", status: "error")
}`,
    bulkAppAction: `mutation {
  bulkAppAction(action: restart, folderId: "fld_9f1c2ab7d3e4f5a6") {
    ok
    failed
  }
}`,
    bulkRedeployApps: `mutation {
  bulkRedeployApps(projectId: "prc_9f1c2ab7d3e4f5a6") {
    ok
    failed
  }
}`,
    backupRuns: `query {
  backupRuns(databaseId: "db_9f1c2ab7d3e4f5a6") {
    id
    status
    startedAt
    sizeBytes
    verified
  }
}`,
    dockerCleanupRuns: `query {
  dockerCleanupRuns(limit: 10) {
    id
    serverName
    status
    reclaimedBytes
  }
}`,
    saveNotificationChannel: `mutation {
  saveNotificationChannel(
    input: { kind: "slack", name: "#deploys", enabled: true, url: "https://hooks.slack.com/services/…", alerts: ["deployment_failed", "backup_failed"] }
  )
}`,
    setPanelUrl: `mutation {
  setPanelUrl(url: "https://deplo.example.com") {
    panelUrl
    panelUrlSource
  }
}`,
    panelAddressImpact: `query {
  panelAddressImpact(url: "https://deplo.example.com") {
    sessions
    passkeys
    deployHooks
    mcpConnections
    losesHttps
  }
}`,
    setPanelHttps: `mutation {
  setPanelHttps(enabled: false) {
    enabled
    domain
  }
}`,
    subscribeWebPush: `mutation {
  subscribeWebPush(endpoint: "https://push.example.com/send/abc", p256dh: "BNc…", auth: "k8s…")
}`,
    updateServerAddress: `mutation {
  updateServerAddress(id: "srv_9f1c2ab7d3e4f5a6", address: "203.0.113.20")
}`,
    setMigrationMachineAddress: `mutation {
  setMigrationMachineAddress(
    url: "https://dokploy.example.com"
    sourceId: ""
    serverId: "srv_9f1c2ab7d3e4f5a6"
    address: "203.0.113.20"
  )
}`,
    requestTakeover: `mutation {
  requestTakeover(runId: "run_9f1c2ab7d3e4f5a6") {
    state
    platform
    dataLoss
  }
}`,
    moveMigrationServiceData: `mutation {
  moveMigrationServiceData(
    input: { url: "https://dokploy.example.com", apiKey: "<source panel api key>" }
    runId: "run_9f1c2ab7d3e4f5a6"
    sourceKind: "postgres"
    sourceId: "<service id from the scan>"
  ) {
    moved
    failed
    notes
  }
}`,
    dataRecopySource: `query {
  dataRecopySource(kind: "database", id: "db_9f1c2ab7d3e4f5a6") {
    platform
    sourceUrl
    sourceName
    runId
  }
}`,
    createCronJob: `mutation {
  createCronJob(
    targetKind: "app"
    targetId: "prj_9f1c2ab7d3e4f5a6"
    input: { name: "nightly-report", schedule: "0 3 * * *", command: "node scripts/report.js", timezone: "Europe/Rome" }
  ) {
    id
    name
    nextRunAt
  }
}`,
    setCronEnabled: `mutation {
  setCronEnabled(targetKind: "app", targetId: "prj_9f1c2ab7d3e4f5a6", enabled: false)
}`,
    shellLabel: `query {
  shellLabel(input: { appId: "prj_9f1c2ab7d3e4f5a6" })
}`,
    execConsole: `mutation {
  execConsole(input: { appId: "prj_9f1c2ab7d3e4f5a6", command: "ls -la /app" }) {
    output
  }
}`,
    hostPortsInUse: `query {
  hostPortsInUse(serverId: "srv_9f1c2ab7d3e4f5a6", ports: [5432, 6379]) {
    checked
    inUse
    reason
  }
}`,
    setAppPorts: `mutation {
  setAppPorts(id: "prj_9f1c2ab7d3e4f5a6", ports: [{ published: 8080, target: 3000, protocol: "tcp" }]) {
    id
    ports { published target protocol }
  }
}`,
    setAppVolumes: `mutation {
  setAppVolumes(
    id: "prj_9f1c2ab7d3e4f5a6"
    volumes: [
      { type: "named", name: "uploads", mountPath: "/app/uploads" }
      { type: "app", projectPath: "config", mountPath: "/app/config" }
    ]
  ) {
    id
    volumes { type name mountPath }
  }
}`,
    setAppBuildServer: `mutation {
  setAppBuildServer(id: "prj_9f1c2ab7d3e4f5a6", buildServerId: "srv_9f1c2ab7d3e4f5a6", buildFallback: true) {
    id
    buildServerId
    buildFallback
  }
}`,
    updateAppHealthCheck: `mutation {
  updateAppHealthCheck(
    id: "prj_9f1c2ab7d3e4f5a6"
    input: { type: http, path: "/healthz", port: 3000, intervalS: 10, timeoutS: 5, retries: 3, startPeriodS: 15 }
  ) {
    id
    healthCheck { type path }
  }
}`,
    addDomain: `mutation {
  addDomain(appId: "prj_9f1c2ab7d3e4f5a6", name: "shop.example.com", config: { port: 3000, www: toThis }) {
    id
    name
    status
    ssl
  }
}`,
    setServerRole: `mutation {
  setServerRole(id: "srv_9f1c2ab7d3e4f5a6", role: "build") {
    id
    role
  }
}`,
    setServerTimezone: `mutation {
  setServerTimezone(id: "srv_9f1c2ab7d3e4f5a6", timezone: "Europe/Rome") {
    timezone
    utcOffsetMinutes
  }
}`,
    detectRepoFramework: `query {
  detectRepoFramework(repo: "acme/shop", buildMethod: "nixpacks", installationId: "ghi_9f1c2ab7d3e4f5a6") {
    id
    name
    buildCommand
    startCommand
    defaultPort
  }
}`,
    templateVariants: `query {
  templateVariants(q: "analytics") {
    templateSlug
    variantSlug
    name
    category
  }
}`,
    authorizeMcpClient: `mutation {
  authorizeMcpClient(clientId: "oauth_client_9f1c2ab7", capabilities: ["view", "deploy_apps"], teamIds: ["team_9f1c2ab7d3e4f5a6"])
}`,
    registerThroughLink: `mutation {
  registerThroughLink(
    token: "<token from the registration link>"
    email: "ada@example.com"
    username: "ada"
    name: "Ada"
    password: "correct-horse-battery-staple"
  ) {
    viewer { id username }
  }
}`,
    completeSetup: `mutation {
  completeSetup(email: "ada@example.com", name: "Ada", password: "correct-horse-battery-staple", teamName: "Acme") {
    viewer { id username }
  }
}`,
    verifyTwoFactorLogin: `mutation {
  verifyTwoFactorLogin(code: "123456") {
    viewer { id username }
  }
}`,
    startMigration: `mutation {
  startMigration(
    input: { url: "https://dokploy.example.com", apiKey: "<source panel api key>" }
    targets: [
      { projectId: "<project id from the scan>", projectName: "shop", serviceId: "<service id from the scan>", serverId: "srv_9f1c2ab7d3e4f5a6" }
    ]
  )
}`,
    importMigrationProject: `mutation {
  importMigrationProject(
    input: { url: "https://dokploy.example.com", apiKey: "<source panel api key>" }
    runId: "run_9f1c2ab7d3e4f5a6"
    projectId: "<project id from the scan>"
    placements: [{ serviceId: "<service id from the scan>", serverId: "srv_9f1c2ab7d3e4f5a6" }]
  ) {
    projectName
    created
    skipped
    failed
    items { sourceName outcome message }
  }
}`,
    scanMigrationSource: `mutation {
  scanMigrationSource(input: { url: "https://dokploy.example.com", apiKey: "<source panel api key>" }) {
    platform
    orgName
    projects {
      name
      sourceId
      exists
      environments { name services { name kind status } }
    }
    servers { name ipAddress deploServerName }
  }
}`,
    updateMyAvatar: `mutation {
  updateMyAvatar(image: "pixelbot:default:ada")
}`,
    reorderMyTeams: `mutation {
  reorderMyTeams(teamIds: ["team_9f1c2ab7d3e4f5a6", "team_0a1b2c3d4e5f6a7b"])
}`,
    setFolderGrant: `mutation {
  setFolderGrant(folderId: "fld_9f1c2ab7d3e4f5a6", userId: "user_9f1c2ab7d3e4f5a6", capabilities: ["deploy_apps", "view_logs"]) {
    userId
    capabilities
  }
}`,
    setPreviewEnvVar: `mutation {
  setPreviewEnvVar(appId: "prj_9f1c2ab7d3e4f5a6", key: "API_URL", value: "https://staging-api.example.com")
}`,
    importEnv: `mutation {
  importEnv(appId: "prj_9f1c2ab7d3e4f5a6", blob: "API_URL=https://api.example.com\\nLOG_LEVEL=info", targets: [production]) {
    added
    skippedSecrets
  }
}`,
    setSharedVarAppLink: `mutation {
  setSharedVarAppLink(varId: "svar_9f1c2ab7d3e4f5a6", appId: "prj_9f1c2ab7d3e4f5a6", linked: true)
}`,
    rotateDatabasePassword: `mutation {
  rotateDatabasePassword(id: "db_9f1c2ab7d3e4f5a6")
}`,
    setDatabaseRunning: `mutation {
  setDatabaseRunning(id: "db_9f1c2ab7d3e4f5a6", running: false) {
    id
    status
  }
}`,
    moveDatabaseToEnvironment: `mutation {
  moveDatabaseToEnvironment(id: "db_9f1c2ab7d3e4f5a6", environmentId: "environ_9f1c2ab7d3e4f5a6")
}`,
    generateAvailableDbPort: `mutation {
  generateAvailableDbPort(serverId: "srv_9f1c2ab7d3e4f5a6")
}`,
    setAppFramework: `mutation {
  setAppFramework(id: "prj_9f1c2ab7d3e4f5a6", framework: "vite") {
    id
    framework
  }
}`,
    setAppComposeUpArgs: `mutation {
  setAppComposeUpArgs(id: "prj_9f1c2ab7d3e4f5a6", value: "--remove-orphans") {
    id
    composeUpArgs
  }
}`,
    updateAppLogo: `mutation {
  updateAppLogo(id: "prj_9f1c2ab7d3e4f5a6", logo: "data:image/png;base64,…") {
    id
    logo
  }
}`,
    deleteFolder: `mutation {
  deleteFolder(id: "fld_9f1c2ab7d3e4f5a6", deleteApps: false)
}`,
    deleteProject: `mutation {
  deleteProject(id: "prc_9f1c2ab7d3e4f5a6", deleteApps: false)
}`,
    deleteDatabase: `mutation {
  deleteDatabase(id: "db_9f1c2ab7d3e4f5a6")
}`,
    deleteDestination: `mutation {
  deleteDestination(id: "dst_9f1c2ab7d3e4f5a6", deleteArtifacts: false)
}`,
    checkServerHealth: `mutation {
  checkServerHealth(id: "srv_9f1c2ab7d3e4f5a6", force: true) {
    id
    status
    statusMessage
  }
}`,
    checkAllServerHealth: `mutation {
  checkAllServerHealth {
    id
    name
    status
  }
}`,
    setServerBuildFallback: `mutation {
  setServerBuildFallback(id: "srv_9f1c2ab7d3e4f5a6", buildFallback: true) {
    id
    buildFallback
  }
}`,
    startGithubConnect: `mutation {
  startGithubConnect(org: "acme") {
    actionUrl
    manifest
    state
  }
}`,
    transferTeamOwnership: `mutation {
  transferTeamOwnership(userId: "user_9f1c2ab7d3e4f5a6", password: "correct-horse-battery-staple")
}`,
    cancelTakeover: `mutation {
  cancelTakeover {
    restarted
    left
  }
}`,
    myTeams: `query {
  myTeams {
    id
    slug
    name
    role
  }
}`,
    me: `query {
  me {
    id
    username
    email
    isInstanceAdmin
  }
}`,
    apiContext: `query {
  apiContext
}`,
    updateProfile: `mutation {
  updateProfile(name: "Ada Lovelace", username: "ada")
}`,
    renamePasskey: `mutation {
  renamePasskey(id: "pk_9f1c2ab7d3e4f5a6", name: "MacBook Touch ID")
}`,
    finishPasskeyRegistration: `mutation {
  finishPasskeyRegistration(name: "MacBook Touch ID", response: { id: "…", rawId: "…", type: "public-key", response: { … } }) {
    id
    name
    kind
  }
}`,
    renameDatabase: `mutation {
  renameDatabase(id: "db_9f1c2ab7d3e4f5a6", name: "orders") {
    id
    name
  }
}`,
    revealConnection: `mutation {
  revealConnection(id: "db_9f1c2ab7d3e4f5a6")
}`,
  },
  docs: {
    moveAppToEnvironment:
      "Move an app into a specific environment of a project. Each environment holds its own apps, so the app's project follows the environment.",
    app: "One app by its team-scoped slug, or null.",
    database: "One database by id, or null.",
    deployment: "One deployment by id, or null. `logs` carries the build output.",
    deployments: "Deployment history in the active team, newest first. Filter to one app, one environment or one status.",
    server: "One server by id, or null.",
    addDomain: "Attach a hostname to an app. `config` sets the routing (port, service, path prefix, www redirect) and the certificate provider; omit it for the defaults.",
    addServer: "Enrol a machine. Returns the install command to paste on the host; the row stays `provisioning` until the agent calls home. `importOnly` registers a migration source instead (instance admin).",
    cancelDeployment: "Stop a queued or building deployment. Returns true.",
    createApp: "Create an app from a repository, an uploaded archive, a Docker image or a compose stack, with its first build settings, variables, domains and mounts. Deploys immediately unless the source needs an upload first.",
    createAppFromTemplate: "Create an app from the public template catalog. `deploy: true` builds it right away.",
    createCronJob: "Add a job to an app or a database. `targetKind` is `app` or `database`.",
    createDatabase: "Provision a managed database. `username`, `password` and `dbName` are generated when omitted; `environmentId` files it into an environment, or omit it for the team's top level.",
    createDestination: "Add a backup destination: an S3-compatible bucket, or a folder on one of the team's servers. Test it with `testDestination` before trusting it.",
    redeploy: "Build and release the app again from its current source and settings. Returns the queued deployment.",
    renameApp: "Rename an app. The slug, and with it the auto domain, stays as it is.",
    setAppAutoDeploy: "Turn automatic deploys on push on or off.",
    setDatabaseRunning: "Start (`running: true`) or stop the database container.",
    startApp: "Start a stopped app from its last deployment.",
    stopApp: "Stop the app's containers without deleting anything.",
    updateAppBuild: "Save the app's build settings: method, commands, port, root directory, runtime version. Applied on the next deploy.",
    updateAppLogo: "Set the app's logo (an image data-URI), or clear it with null.",
    updateAppSource: "Change where the app is built from: another repository or branch, a different image, or a new compose file. Applied on the next deploy.",
    updateCronJob: "Edit a job. Every omitted field is left as it is.",
    updateTeam: "Rename the team, or require two-factor authentication from every member.",
  },
};

/* ------------------------------------------------------------------ */

export const PAGES: Page[] = [
  {
    slug: "account",
    title: "Account",
    description: "Signing in, sessions, profile, two-factor and passkeys: the operations only a person at the dashboard can call.",
    intro: `
Everything on this page acts on the caller's **own** account. An API token is refused by all of it, whatever capabilities it holds: the answer is \`An API token can't access <that resource>\`. See [Authentication](/api-reference/authentication) for why a token is never a stand-in for the person who minted it.

The sign-in mutations are public. They set the session cookie the browser sends on every later request.
`,
    sections: [
      { title: "Identity", ops: [q("me"), q("apiContext")] },
      {
        title: "Signing in and out",
        intro: `A password login on an account with two-factor turned on answers \`requiresTwoFactor: true\` and no session. Finish it with \`verifyTwoFactorLogin\`. A passkey login is two steps too: \`passkeyChallenge\`, then \`verifyPasskeyLogin\` with what the authenticator produced.`,
        ops: [m("login"), m("verifyTwoFactorLogin"), m("passkeyChallenge"), m("verifyPasskeyLogin"), m("logout")],
      },
      { title: "Signed-in devices", ops: [q("mySessions"), m("revokeSession"), m("revokeOtherSessions")] },
      { title: "Profile", ops: [m("updateProfile"), m("updateEmail"), m("changePassword"), m("updateMyAvatar")] },
      {
        title: "Two-factor authentication",
        ops: [m("startTwoFactorEnrolment"), m("confirmTwoFactorEnrolment"), m("regenerateRecoveryCodes"), m("disableTwoFactor")],
      },
      {
        title: "Passkeys",
        ops: [q("myPasskeys"), m("startPasskeyRegistration"), m("finishPasskeyRegistration"), m("renamePasskey"), m("deletePasskey")],
      },
    ],
    seeAlso: [
      { title: "Authentication", description: "Session cookie, API token, OAuth", href: "/api-reference/authentication" },
      { title: "Account security", description: "The same settings in the dashboard", href: "/guides/team/account-security" },
    ],
  },
  {
    slug: "api-tokens",
    title: "API tokens",
    description: "Create, scope, update and revoke the tokens behind Settings -> API tokens, and approve an OAuth client.",
    intro: `
A token is **personal**: only its owner lists, edits or revokes it, an instance admin included. A bearer request sees only the token it is made with.

A token's effective power is the **intersection** of what it was granted and what its owner can still do in that team. Two capabilities decide where it acts at all: \`manage_tokens\` (the owner's tokens reach the team) and \`manage_mcp\` (they may drive it over MCP). Any member may mint a token; minting needs no capability of its own.

The scope is four optional lists on the same input (\`teamIds\`, \`projectIds\`, \`folderIds\`, \`appIds\`):

- Naming a node grants everything under it, now and later.
- Naming nothing means every team where the owner holds \`manage_tokens\`, read live on each request.
- Naming anything below a team narrows the token inside that team, and the team-wide permissions it holds (members, roles, registries, databases) stop applying there.
`,
    sections: [
      { title: "Reading", ops: [q("apiTokens")] },
      {
        title: "Lifecycle",
        intro: `The raw secret comes back **once**, in \`createToken\`'s payload. A token that names no capabilities is view-only.`,
        ops: [m("createToken"), m("updateToken"), m("revokeToken")],
      },
      {
        title: "OAuth clients",
        intro: `A web AI client connects through OAuth, and the consent screen mints an ordinary token for it. This is the mutation behind that screen. Revoking the token disconnects the client everywhere it reached.`,
        ops: [m("authorizeMcpClient")],
      },
    ],
    seeAlso: [
      { title: "Authentication", description: "Sending a token on a request", href: "/api-reference/authentication" },
      { title: "API tokens and OAuth", description: "The same model, from the dashboard", href: "/advanced/api-tokens-and-oauth" },
      { title: "Capabilities", description: "The full list a token draws from", href: "/reference/capabilities" },
    ],
  },
  {
    slug: "teams",
    title: "Teams",
    description: "The active team, the teams the viewer belongs to, team settings, ownership and the MCP switch.",
    intro: `
Every request acts in exactly one team. \`viewerTeam\` says which. A session picks it with \`switchTeam\`; an API token picks it with the \`X-Deplo-Team\` header (see [Authentication](/api-reference/authentication)).
`,
    sections: [
      { title: "Reading", ops: [q("viewerTeam"), q("myTeams")] },
      {
        title: "Creating and switching",
        intro: `\`reorderMyTeams\` is personal, like the rest of [Account](/api-reference/account): an API token cannot call it.`,
        ops: [m("createTeam"), m("switchTeam"), m("reorderMyTeams")],
      },
      { title: "Settings", ops: [m("updateTeam"), m("updateTeamAvatar")] },
      { title: "Ownership and deletion", ops: [m("transferTeamOwnership"), m("deleteTeam")] },
      {
        title: "MCP",
        intro: `Whether AI agents may act in this team over MCP. The wire protocol is on [MCP](/api-reference/mcp).`,
        ops: [q("mcpSettings"), m("setMcpSettings"), q("mcpTeams"), q("mcpAgentCount"), q("mcpConnected")],
      },
    ],
    seeAlso: [
      { title: "Members and roles", description: "Who is in the team and what they may do", href: "/api-reference/members-and-roles" },
      { title: "Teams and capabilities", description: "The concept", href: "/concepts/teams-and-capabilities" },
    ],
  },
  {
    slug: "members-and-roles",
    title: "Members and roles",
    description: "Who is on the active team, the role each one holds, and the roles themselves.",
    intro: `
A role is a named set of [capabilities](/reference/capabilities), owned by the team, that any number of members hold. Membership mutations take a \`roleId\`. The older \`role\` + \`capabilities\` pair still works and lands on the matching role when there is one.

<Callout type="info" title="Inviting somebody new is not a mutation">
  Registering an account that does not exist yet goes through a registration link, see [Users](/api-reference/users). These mutations put an account that already exists onto the team.
</Callout>
`,
    sections: [
      { title: "Members", ops: [q("members"), q("searchUsers"), m("addExistingMember"), m("updateMember"), m("setMemberAccess"), m("removeMember")] },
      {
        title: "Roles",
        intro: `On \`updateRole\`, every omitted optional field means leave it as it is: omit \`capabilities\`, \`requireTwoFactor\` or \`scope\` and they are untouched. Send \`clearScope: true\` to make a role reach the whole team again.`,
        ops: [q("teamRoles"), m("createRole"), m("updateRole"), m("resetRole"), m("deleteRole")],
      },
    ],
    seeAlso: [
      { title: "Members", description: "Adding and removing people, in the dashboard", href: "/guides/team/members" },
      { title: "Roles and permissions", description: "Building a role, in the dashboard", href: "/guides/roles-and-permissions" },
      { title: "Capabilities", description: "The full list", href: "/reference/capabilities" },
    ],
  },
  {
    slug: "users",
    title: "Users and registration",
    description: "Instance-admin operations on accounts, team access across the instance, and registration links.",
    intro: `
Everything here is gated on **instance admin**, except the two public mutations that create an account: \`registerThroughLink\` for an invitee, \`completeSetup\` for the first account on a fresh install.
`,
    sections: [
      {
        title: "Accounts",
        ops: [q("allUsers"), q("userDetail"), m("updateUserAdmin"), m("resetUserTwoFactor"), m("resetUserPasskeys"), q("deleteUserImpact"), m("deleteUser")],
      },
      {
        title: "Team access",
        intro: `A person's role in any team, from the instance-admin user editor. \`allTeamsForAdmin\` feeds the team picker.`,
        ops: [q("allTeamsForAdmin"), m("addUserToTeam"), m("setUserTeamAccess"), m("removeUserFromTeam")],
      },
      {
        title: "Registration links",
        ops: [q("registrationLinks"), m("mintRegistrationLink"), m("revealRegistrationLink"), m("revokeRegistrationLink"), m("revokeAllRegistrationLinks")],
      },
      { title: "Creating an account", ops: [m("registerThroughLink"), m("completeSetup")] },
    ],
    seeAlso: [
      { title: "Instance administration", description: "The dashboard view", href: "/operations/instance-administration" },
      { title: "Members", description: "Registration links in context", href: "/guides/team/members" },
    ],
  },
  {
    slug: "folders-and-projects",
    title: "Folders, projects and environments",
    description: "The containers apps and databases live in, folder sharing, and moving things between them.",
    intro: `
A **folder** groups apps in the overview and can be shared with a member at a capability level that differs from their team role. A **project** groups apps and databases and holds **environments** (production, staging, whatever you call them), the boundary environment variables and previews respect. Filing an app into a folder clears its project link, so most apps live in one or the other.
`,
    sections: [
      { title: "Folders", ops: [q("folders"), m("createFolder"), m("renameFolder"), m("setFolderColor"), m("moveFolder"), m("reorderFolders"), m("deleteFolder")] },
      {
        title: "Folder sharing",
        intro: `A grant is bounded by both the granter's and the grantee's capabilities. Only the folder's owner or a team admin may hand one out.`,
        ops: [q("folderGrants"), q("folderShareCandidates"), q("grantableFolderCapabilities"), m("setFolderGrant"), m("removeFolderGrant")],
      },
      { title: "Projects", ops: [q("projects"), q("project"), m("createProject"), m("renameProject"), m("setProjectColor"), m("reorderProjects"), m("deleteProject")] },
      {
        title: "Environments",
        ops: [q("environments"), m("createEnvironment"), m("renameEnvironment"), m("setDefaultEnvironment"), m("setEnvironmentBranch"), m("deleteEnvironment")],
      },
      {
        title: "Moving apps and databases",
        ops: [m("moveAppToFolder"), m("moveAppsToFolder"), m("moveAppToProject"), m("moveAppToEnvironment"), m("moveDatabaseToEnvironment")],
      },
    ],
    seeAlso: [
      { title: "Apps, projects and environments", description: "The concept", href: "/concepts/apps-projects-and-environments" },
      { title: "Folder shares", description: "Sharing a folder, in the dashboard", href: "/guides/roles-and-permissions/folder-shares" },
    ],
  },
  {
    slug: "apps",
    title: "Apps",
    description: "The app catalogue, creating an app, starting and stopping it, and the subscription that follows its state.",
    intro: `
An app is one deployable unit: a repository, an uploaded archive, a Docker image or a compose stack. Its settings have their own page, [App settings](/api-reference/app-settings); shipping it is on [Deployments](/api-reference/deployments).

<Callout type="info" title="search(q) is not scoped to the active team">
  It answers with hits from every team the caller can reach, each carrying the team it lives in, so a client that has a name but not a team can find it and then work there (with \`X-Deplo-Team\` for a token, or the \`team\` argument of an MCP tool). A team the caller cannot enter right now contributes nothing. At most 50 hits per kind.
</Callout>
`,
    sections: [
      { title: "Reading", ops: [q("apps"), q("app"), q("search"), q("appRuntime"), q("appTransferInfo")] },
      {
        title: "Creating",
        intro: `\`createApp\` takes the whole first configuration in one input. The new-app wizard runs \`detectRepoFramework\` while you pick a repository and \`composeNameClashes\` before it submits a stack.`,
        ops: [m("createApp"), m("createAppFromTemplate"), q("templateVariants"), m("refreshTemplates"), q("composeNameClashes"), q("detectRepoFramework")],
      },
      {
        title: "Running and stopping",
        ops: [m("startApp"), m("stopApp"), m("reloadApp"), m("rebuildApp"), m("bulkAppAction"), m("bulkRedeployApps")],
      },
      {
        title: "Renaming, moving and deleting",
        ops: [m("renameApp"), m("reorderApps"), m("transferAppToTeam"), m("deleteApp"), m("deleteApps")],
      },
      { title: "Logo and framework", ops: [m("updateAppLogo"), m("detectAppLogo"), m("setAppFramework")] },
      { title: "Subscription", ops: [s("appStatus")] },
    ],
    seeAlso: [
      { title: "App settings", description: "Source, build, resources, ports, volumes and files", href: "/api-reference/app-settings" },
      { title: "Deployments", description: "Deploying, cancelling, rolling back", href: "/api-reference/deployments" },
      { title: "Deploy from Git", description: "The dashboard flow", href: "/guides/deploy/from-git" },
    ],
  },
  {
    slug: "app-settings",
    title: "App settings",
    description: "Source, build, build server, resources, health check, published ports, volumes and config files of an existing app.",
    intro: `
Every write here changes what the **next** deploy renders. None of them starts a deploy on its own: call \`redeploy\` (see [Deployments](/api-reference/deployments)) when you want the change live.
`,
    sections: [
      {
        title: "Source and build",
        ops: [m("updateAppSource"), m("updateAppBuild"), q("buildServerChoices"), m("setAppBuildServer"), m("clearAppBuildCache"), m("setAppComposeUpArgs"), m("renderComposeStack"), m("setAppAutoDeploy"), m("setAppRollbackKeep")],
      },
      {
        title: "Runtime",
        ops: [m("updateAppResources"), m("updateAppHealthCheck"), q("hostPortsInUse"), m("setAppPorts"), m("setAppVolumes")],
      },
      {
        title: "Config files",
        intro: `A **File** storage entry mounts a file Deplo keeps for the app. These two read and write its content.`,
        ops: [q("appStorageFile"), m("writeAppFile")],
      },
    ],
    seeAlso: [
      { title: "Build settings", description: "The dashboard view", href: "/guides/releases/build-settings" },
      { title: "Resource limits", description: "What each limit does", href: "/advanced/resource-limits" },
      { title: "Persistent storage", description: "Volumes and files", href: "/guides/data/persistent-storage" },
    ],
  },
  {
    slug: "deployments",
    title: "Deployments",
    description: "Deployment history, redeploying, cancelling, rolling back, the deploy hook, and the live counter.",
    intro: `
A deployment is one build-and-release of an app. \`redeploy\` starts one from the current source; the [deploy hook](/api-reference/rest#deploy-hook) is the same action behind a REST URL a webhook sender can call.

A rollback re-runs the image an earlier build already produced, no rebuild. Only the code goes back: variables, domains, volumes and limits stay current. Ask for \`Deployment.canRollback\` first.
`,
    sections: [
      { title: "Reading", ops: [q("deployments"), q("deployment")] },
      { title: "Deploying and cancelling", ops: [m("redeploy"), m("cancelDeployment"), m("cancelAllDeployments")] },
      { title: "Rolling back", ops: [m("rollbackDeployment")] },
      { title: "Pruning history", ops: [m("deleteDeployments"), m("deleteAllDeployments")] },
      {
        title: "Deploy hook",
        intro: `The hook URL carries its own token. Calling it still needs an API token with \`deploy_apps\`; see [REST endpoints](/api-reference/rest#deploy-hook) for the request.`,
        ops: [m("revealAppDeployHook"), m("rotateAppDeployHook"), m("setAppDeployHookEnabled")],
      },
      { title: "Subscription", ops: [s("activeDeployments")] },
    ],
    seeAlso: [
      { title: "REST endpoints", description: "The deploy hook, upload and log stream", href: "/api-reference/rest" },
      { title: "Rollbacks", description: "The dashboard flow", href: "/guides/releases/rollbacks" },
      { title: "Automatic deployments", description: "The deploy hook in context", href: "/guides/releases/automatic-deployments" },
    ],
  },
  {
    slug: "previews",
    title: "Pull request previews",
    description: "Preview settings, the previews of an app, deploying a pull request, and preview-only variables.",
    intro: `
A preview is a short-lived deployment of one pull request, on its own hostname. A pull request from a fork waits for approval; \`deployPullRequest\` on it is the approval.
`,
    sections: [
      { title: "Reading", ops: [q("appPreviews"), q("openPullRequests")] },
      { title: "Settings", ops: [m("setAppPreviewSettings")] },
      { title: "Building and destroying", ops: [m("deployPullRequest"), m("approvePreview"), m("redeployPreview"), m("destroyPreview")] },
      {
        title: "Preview-only variables",
        intro: `An override outranks the app's own value and any shared variable, in previews only.`,
        ops: [q("previewEnvVars"), m("setPreviewEnvVar"), m("deletePreviewEnvVar")],
      },
    ],
    seeAlso: [
      { title: "Pull request previews", description: "The dashboard guide", href: "/guides/networking/pull-request-previews" },
      { title: "Environment variables", description: "The app's own variables", href: "/api-reference/environment-variables" },
    ],
  },
  {
    slug: "environment-variables",
    title: "Environment variables",
    description: "App-level variables and the team-owned shared variables that link into several apps at once.",
    intro: `
A variable is \`plain\` or \`secret\` and applies to one or more \`targets\` (\`production\`, \`preview\`). A shared variable is owned by the team and **linked** into apps; the link is what injects it.

<Callout type="warn" title="A secret variable is write-only and immutable">
  Once a row is \`secret\`, \`upsertEnv\`, \`renameEnv\` and \`saveSharedVar\` refuse it, \`setAppEnv\` skips it, and \`importEnv\` counts it in \`skippedSecrets\` instead of writing over it. Rotating one is delete + create, and no mutation turns a secret back into a plain variable. The reverse (\`plain\` to \`secret\`) is always allowed.
</Callout>
`,
    sections: [
      { title: "App variables", ops: [q("env"), q("allAppEnv"), m("upsertEnv"), m("renameEnv"), m("deleteEnv"), m("setAppEnv"), m("importEnv")] },
      {
        title: "Shared variables",
        ops: [q("sharedVars"), q("sharedVarsForApp"), m("saveSharedVar"), m("setSharedVarAppLink"), m("deleteSharedVar")],
      },
    ],
    seeAlso: [
      { title: "Environment variables", description: "The dashboard guide", href: "/guides/config/environment-variables" },
      { title: "Shared variables", description: "The dashboard guide", href: "/guides/config/shared-variables" },
      { title: "Pull request previews", description: "Preview-only overrides", href: "/api-reference/previews" },
    ],
  },
  {
    slug: "domains",
    title: "Domains and basic auth",
    description: "Hostnames on an app, their routing and certificate settings, and the edge password gate.",
    intro: `
A domain is a hostname routed to one app, or to one service and path of it. \`certProvider\` picks how it gets HTTPS: \`letsencrypt\`, \`cloudflare\` (proxied, origin left alone), \`custom\` (a certificate installed on the host, see [Servers](/api-reference/servers#certificates)) or \`none\`.

Basic auth is a separate grant, \`manage_basic_auth\`. A login applies to every domain of the app within seconds, no redeploy.
`,
    sections: [
      {
        title: "Domains",
        ops: [q("domains"), m("addDomain"), m("updateDomain"), m("setPrimaryDomain"), m("verifyDomain"), m("removeDomain"), m("dismissImportedDomains")],
      },
      {
        title: "Basic auth",
        ops: [q("basicAuthUsers"), m("addBasicAuthUser"), m("updateBasicAuthUserPassword"), m("revealBasicAuthPassword"), m("removeBasicAuthUser")],
      },
    ],
    seeAlso: [
      { title: "Domains and HTTPS", description: "DNS states, routing, redirects", href: "/guides/networking/domains-and-https" },
      { title: "Custom certificates", description: "Installing one on a host", href: "/advanced/custom-certificates" },
    ],
  },
  {
    slug: "databases",
    title: "Databases",
    description: "Managed Postgres, MySQL, MariaDB, MongoDB, Redis and ClickHouse: reading, creating, configuring, running and credentials.",
    intro: `
A managed database is provisioned and versioned the same way an app is, and reachable from apps in the same environment as \`db-<slug>\`. Backups are on [Backups](/api-reference/backups), the console on [Console and logs](/api-reference/console-and-logs).

<Callout type="warn" title="Three recreates, one of them destructive">
  \`restartDatabase\` stops and starts the container. \`redeployDatabase\` re-renders the compose from current settings and keeps the data. \`rebuildDatabase\` tears down the data volume too and re-provisions an **empty** instance.
</Callout>
`,
    sections: [
      { title: "Reading", ops: [q("databases"), q("database"), q("databaseRuntime")] },
      {
        title: "Creating and settings",
        ops: [m("createDatabase"), m("updateDatabase"), m("updateDatabaseImage"), m("updateDatabaseResources"), m("setDatabaseMounts"), m("renameDatabase"), m("updateDatabaseLogo"), m("reorderDatabases"), m("generateAvailableDbPort")],
      },
      {
        title: "Running and recreating",
        ops: [m("setDatabaseRunning"), m("restartDatabase"), m("redeployDatabase"), m("rebuildDatabase"), m("deleteDatabase")],
      },
      {
        title: "Credentials",
        intro: `Both return the connection string as a \`String\`, not the entity. \`rotateDatabasePassword\` cuts off anything still using the old credentials the moment it succeeds.`,
        ops: [m("revealConnection"), m("rotateDatabasePassword")],
      },
      { title: "Subscription", ops: [s("databaseStatus")] },
    ],
    seeAlso: [
      { title: "Databases", description: "The dashboard guide", href: "/guides/data/databases" },
      { title: "Backups", description: "Schedules, runs, destinations", href: "/api-reference/backups" },
      { title: "Console and logs", description: "A shell into the container", href: "/api-reference/console-and-logs" },
    ],
  },
  {
    slug: "console-and-logs",
    title: "Console and logs",
    description: "What a client needs to open a console or a log stream for an app or a database, and running one command.",
    intro: `
The console and the log viewer are byte streams, so they are REST, not GraphQL: see [REST endpoints](/api-reference/rest). These operations tell a client which containers exist and what shell they have, and run one command without a session.

Opening an app console needs \`open_app_console\`; a database console needs \`open_database_console\`. Both are arbitrary code execution inside the container.
`,
    sections: [
      { title: "App", ops: [q("consoleInfo"), q("shellLabel"), m("execConsole"), q("logsInfo"), m("setConsoleEnabled")] },
      { title: "Database", ops: [q("databaseConsoleInfo"), q("databaseShellLabel"), m("execDatabaseConsole"), q("databaseLogsInfo")] },
    ],
    seeAlso: [
      { title: "REST endpoints", description: "The attach and log streams", href: "/api-reference/rest" },
      { title: "Console", description: "The dashboard guide", href: "/guides/observability/console" },
      { title: "Logs", description: "The dashboard guide", href: "/guides/observability/logs" },
    ],
  },
  {
    slug: "cron-jobs",
    title: "Cron jobs",
    description: "Scheduled commands inside an app or database container, their runs and the master switch per target.",
    intro: `
A job runs a command inside a running container on a cron schedule. Every job belongs to one target, an app or a database, and \`targetKind\` names which (\`"app"\` or \`"database"\`). Runs and their output are gated on \`manage_crons\`, not on view: stdout can carry whatever the command printed.
`,
    sections: [
      { title: "Reading", ops: [q("appCronJobs"), q("databaseCronJobs"), q("cronRuns")] },
      { title: "Jobs", ops: [m("createCronJob"), m("updateCronJob"), m("deleteCronJob"), m("setCronEnabled")] },
      { title: "Runs", ops: [m("runCronJobNow"), m("cancelCronRun")] },
    ],
    seeAlso: [{ title: "Cron jobs", description: "The dashboard guide", href: "/guides/observability/cron-jobs" }],
  },
  {
    slug: "backups",
    title: "Backups",
    description: "Backup schedules, runs and artifacts, restores, and the destinations backups are sent to.",
    intro: `
A **schedule** backs up one target (an app or a database) to one **destination** on a cron. Every execution is a **run**; a successful run leaves an **artifact** at the destination. Restoring overwrites the live target and needs \`restore_backups\`.

Downloading an artifact and restoring from an uploaded file are byte streams, so they are REST: see [REST endpoints](/api-reference/rest#backups).

<Callout type="info" title="A verdict is a return value, not an error">
  \`testDestination\` resolves normally when the probe fails. \`report.ok\` is the verdict, \`report.error\` the agent's verbatim message, \`report.steps\` the probe sequence. A client that treats a resolved call as success will report a working destination over one that just failed.
</Callout>
`,
    sections: [
      { title: "Schedules", ops: [q("backups"), m("createBackup"), m("updateBackup"), m("toggleBackup"), m("deleteBackup")] },
      {
        title: "Runs and artifacts",
        ops: [q("backupRuns"), q("backupArtifactCount"), m("runBackup"), m("runAppBackup"), m("runDatabaseBackup"), m("cancelBackupRun"), m("restoreBackup"), m("deleteBackupRun"), m("deleteBackupArtifacts")],
      },
      {
        title: "Destinations",
        ops: [q("backupDestinations"), q("backupDestinationOptions"), m("createDestination"), m("testDestination"), m("testDestinations"), q("destinationTestReport"), q("destinationRemovalImpact"), m("destinationRecoveryKey"), m("deleteDestination")],
      },
    ],
    seeAlso: [
      { title: "Backups and restore", description: "The dashboard guide", href: "/guides/data/backups-and-restore" },
      { title: "REST endpoints", description: "Download and upload-restore", href: "/api-reference/rest" },
    ],
  },
  {
    slug: "git",
    title: "Git providers",
    description: "Git connections for GitLab, Gitea, Bitbucket and plain git, and the GitHub App integration.",
    intro: `
Two kinds of source integration. A **git connection** stores a token for a git host and drives repository listing, branch listing and push webhooks. A **GitHub App** is installed on an account or organisation through GitHub's manifest flow and covers repositories, branches, pull requests and previews.

The webhook receivers themselves are REST: see [REST endpoints](/api-reference/rest#git-webhooks).
`,
    sections: [
      {
        title: "Git connections",
        ops: [q("gitProviders"), q("gitConnections"), q("gitRepos"), q("gitBranches"), m("connectGitProvider"), m("updateGitConnection"), m("testGitConnection"), m("removeGitConnection")],
      },
      {
        title: "GitHub Apps",
        intro: `\`startGithubConnect\` returns what the browser posts to GitHub. GitHub then sends the user back through the callback endpoint; there is no mutation to finish the flow.`,
        ops: [q("githubApps"), q("githubInstallations"), q("githubRepos"), q("githubBranches"), m("startGithubConnect"), m("removeGithubApp")],
      },
    ],
    seeAlso: [
      { title: "Git connections", description: "The dashboard guide", href: "/guides/git-providers/git-connections" },
      { title: "GitHub", description: "Installing the GitHub App", href: "/guides/git-providers/github" },
    ],
  },
  {
    slug: "registries",
    title: "Container registries",
    description: "Credentials for pulling private images.",
    intro: `
A registry credential lets a server pull a private image for an app deployed from a Docker image or a compose stack. The password is write-only; the entity never returns it.
`,
    sections: [{ title: "Operations", ops: [q("registries"), m("addRegistry"), m("deleteRegistry")] }],
    seeAlso: [
      { title: "Container registries", description: "The dashboard guide", href: "/guides/server/container-registries" },
      { title: "Deploy a Docker image", description: "Where the credential is used", href: "/guides/deploy/docker-image" },
    ],
  },
  {
    slug: "servers",
    title: "Servers",
    description: "The fleet: enrolling and removing machines, their role, teams and settings, health checks, maintenance and host certificates.",
    intro: `
A server is a machine running the Deplo agent. Servers are the one resource shared across teams, so most writes here are **instance admin**.

Enrolling an ordinary server is a two-step flow: \`addServer\` returns an install command, and the host calls home when the command has run. Removing one is trust revocation: \`removeServer\` forgets the row and stops trusting the agent, without touching the host. \`uninstallServerAgent\` goes further and is only for a migration source.

A server's \`role\` is \`everything\`, \`build\`, \`storage\` or \`import\`. The install command is the only way into or out of \`import\`.
`,
    sections: [
      { title: "Reading", ops: [q("servers"), q("server"), q("primaryServer")] },
      {
        title: "Enrolling and removing",
        ops: [m("addServer"), m("reissueServerBootstrap"), m("removeServer"), m("uninstallServerAgent"), q("agentUninstallCommand")],
      },
      {
        title: "Settings",
        ops: [m("setServerRole"), m("setServerTeams"), m("setServerBuildFallback"), m("setServerDeployConcurrency"), m("setServerTimezone"), m("updateServerAddress")],
      },
      {
        title: "Health and readiness",
        ops: [m("checkServerHealth"), m("checkAllServerHealth"), m("checkServerHostInfo"), m("checkServerReadiness")],
      },
      {
        title: "Maintenance",
        ops: [m("updateServerAgent"), m("checkAgentUpdates"), m("restartServerTraefik"), m("restartServerWorkloads"), m("restartDeploPanel"), m("retryNetworkIsolation")],
      },
      {
        title: "Certificates",
        intro: `A host's own TLS certificates, installed by hand outside Let's Encrypt. They live in that host's proxy, Deplo keeps no copy, and the private key is write-only. A domain uses one by setting \`certProvider: custom\`. The Let's Encrypt account email is per host too. All of these are mutations even where they only read, because they dial a server.`,
        ops: [m("serverCertificates"), m("addServerCertificate"), m("removeServerCertificate"), m("serverCertificateAccounts"), m("setCertificateEmail")],
      },
    ],
    seeAlso: [
      { title: "Add a server", description: "The dashboard flow", href: "/guides/server/add-a-server" },
      { title: "Server roles", description: "everything, build, storage", href: "/advanced/server-roles" },
      { title: "Maintenance and advanced", description: "The dashboard view", href: "/guides/server/maintenance-and-advanced" },
      { title: "Custom certificates", description: "Installing one from the dashboard", href: "/advanced/custom-certificates" },
    ],
  },
  {
    slug: "monitoring",
    title: "Monitoring",
    description: "Live and historical resource usage for servers, apps and databases, and the switch that turns history on.",
    intro: `
A \`*Metrics\` query returns a fresh live sample; its \`*MetricsHistory\` counterpart returns the short rolling buffer the Monitoring charts seed from. \`setSaveMetrics\` is the instance-wide switch: off, no history accumulates anywhere.
`,
    sections: [
      { title: "Servers", ops: [q("serverMetrics"), q("serverMetricsHistory"), q("fleetMetrics")] },
      { title: "Apps and databases", ops: [q("appMetrics"), q("appMetricsHistory"), q("databaseMetrics"), q("databaseMetricsHistory")] },
      { title: "Settings", ops: [q("monitoringSettings"), m("setSaveMetrics")] },
    ],
    seeAlso: [{ title: "Monitoring", description: "The dashboard guide", href: "/guides/observability/monitoring" }],
  },
  {
    slug: "notifications",
    title: "Notifications",
    description: "Alert channels and browser push subscriptions.",
    intro: `
A channel is a webhook (Slack, Discord, a generic URL) with its own set of subscribed alerts. Channels are \`JSON\` in and out: the shape is the one the dashboard's channel editor saves, and the webhook URL is the credential for the room it posts in, so reading channels needs \`manage_notifications\`.
`,
    sections: [
      { title: "Channels", ops: [q("notificationChannels"), m("saveNotificationChannel"), m("testNotificationChannel"), m("deleteNotificationChannel")] },
      { title: "Browser push", ops: [q("webPushPublicKey"), m("subscribeWebPush"), m("unsubscribeWebPush")] },
    ],
    seeAlso: [{ title: "Notifications and alerts", description: "The dashboard guide", href: "/guides/observability/notifications-and-alerts" }],
  },
  {
    slug: "activity",
    title: "Activity",
    description: "The team's audit trail.",
    intro: `
One read-only query. Nothing writes to the trail directly; every mutation that changes state is what populates a row. Page with \`cursor\`: pass the last row's \`cursor\` to get the next page.
`,
    sections: [{ title: "Operations", ops: [q("activity")] }],
    seeAlso: [{ title: "Activity", description: "The same trail, in the dashboard", href: "/guides/team/activity" }],
  },
  {
    slug: "docker-cleanup",
    title: "Docker cleanup",
    description: "The instance-wide cleanup policy, per-server exclusion, manual sweeps and their history.",
    intro: `
One policy over every host, since servers are shared across teams. A sweep is allow-listed: it never prunes containers, volumes or networks, so a stopped app, its data and its network survive. A manual sweep ignores the exclusion list.
`,
    sections: [
      { title: "Policy", ops: [q("dockerCleanupPolicy"), m("updateDockerCleanupPolicy"), m("setServerCleanupExcluded")] },
      { title: "Sweeps", ops: [m("runDockerCleanupNow"), q("dockerCleanupRuns"), s("dockerCleanupRuns")] },
    ],
    seeAlso: [{ title: "Cleanup", description: "The dashboard guide", href: "/guides/server/cleanup" }],
  },
  {
    slug: "instance",
    title: "Instance settings",
    description: "The panel's own address and HTTPS, instance-wide switches, updates and instance ownership.",
    intro: `
The panel publishes itself through its host's proxy, so the address it answers on is a setting, not an install-time fact. \`setPanelUrl\` moves the route with the address and puts the old one back if the new address does not answer. \`instanceSettings.panelIpUrl\` is the address every instance also answers on straight on its own machine: not a setting, cannot be turned off, and the way back in when a domain or certificate broke.

<Callout type="warn">
  Moving the address or dropping HTTPS breaks things a text field does not show: passkeys welded to the current hostname, live sessions, deploy hooks pasted into CI, connected AI clients. \`panelAddressImpact\` counts what a given address would cost. Read it before you write.
</Callout>
`,
    sections: [
      { title: "Settings", ops: [q("instanceSettings"), m("setGravatarEnabled"), m("setLogMaxDays")] },
      { title: "Panel address and HTTPS", ops: [q("panelAddressImpact"), m("setPanelUrl"), m("panelDns"), m("panelHttps"), m("setPanelHttps")] },
      { title: "Updates", ops: [q("updateInfo"), q("deploChangelog"), m("checkForUpdates")] },
      {
        title: "Ownership",
        intro: `The instance owner is the tier above instance admin: the one account that can hand the instance over.`,
        ops: [q("viewerIsInstanceOwner"), m("transferInstanceOwner")],
      },
    ],
    seeAlso: [
      { title: "Panel address and certificates", description: "The dashboard guide", href: "/operations/panel-address-and-certificates" },
      { title: "Upgrade", description: "Updating Deplo", href: "/operations/upgrade" },
      { title: "Instance administration", description: "The dashboard view", href: "/operations/instance-administration" },
    ],
  },
  {
    slug: "migration",
    title: "Migration and takeover",
    description: "Reading another panel, importing it project by project, moving its data, and taking over the machine it runs on.",
    intro: `
A migration reads a Dokploy or Coolify panel through its API and recreates what it finds here: environments, apps, compose stacks, databases, variables, domains, config files, volumes, limits, basic-auth users and crons. Nothing is deployed by an import, the source is still answering those hostnames.

The source's API key rides every call in \`MigrationSourceInput\` and is stored only for the length of a run started with \`startMigration\`. Everything is gated on \`create_projects\` and refused to a narrowed principal, since an import writes across the whole team.

<Callout type="warn" title="Neither data-move call accepts a volume, a path or a host">
  The volumes are derived from the service and the app, the target from the run's own record of what it created, and the source machine from its address. Naming any of them would be an instruction to copy any volume on any host over any other one.
</Callout>
`,
    sections: [
      { title: "Reading a source", ops: [m("identifyMigrationSource"), m("scanMigrationSource")] },
      {
        title: "Running an import",
        intro: `\`startMigration\` hands the whole run to the control plane. The older per-project calls (\`beginMigration\`, \`importMigrationProject\`, \`finishMigration\`) drive the same import one step at a time.`,
        ops: [m("startMigration"), m("beginMigration"), m("importMigrationProject"), m("importMigrationMembers"), m("finishMigration"), m("stopMigration"), m("abandonMigration"), m("revertMigration"), m("dismissMigrationReport")],
      },
      { title: "History", ops: [q("migrationRuns"), q("migrationRun"), s("activeMigration")] },
      {
        title: "Moving data",
        ops: [m("planMigrationDataMove"), m("moveMigrationServiceData"), q("dataRecopySource"), m("deployWithoutMigratedData"), m("startWithoutMigratedData")],
      },
      {
        title: "Source machines",
        intro: `The agent an import needs on the source machine is registered as a migration source: \`addServer(input: { importOnly: true })\` on [Servers](/api-reference/servers). These two point a run at where such a machine really is, and hand the machines to another team.`,
        ops: [m("setMigrationMachineAddress"), m("handOverMigrationSources")],
      },
      {
        title: "Takeover",
        intro: `A takeover runs after a migration finished on the same machine: the installer stops the other platform, inherits its certificates, moves the proxy onto 80/443 and removes the other platform. The installer's own endpoint is REST, see [REST endpoints](/api-reference/rest#takeover).`,
        ops: [q("takeover"), q("takeoverPreflight"), m("requestTakeover"), m("cancelTakeover")],
      },
    ],
    seeAlso: [
      { title: "Move from Dokploy", description: "The dashboard wizard", href: "/guides/move-from-dokploy" },
      { title: "Move from Coolify", description: "The dashboard wizard", href: "/guides/move-from-coolify" },
      { title: "Take over your VPS", description: "The takeover, step by step", href: "/guides/take-over-your-vps" },
      { title: "What migrates", description: "What comes across and what does not", href: "/guides/what-migrates" },
    ],
  },
];
