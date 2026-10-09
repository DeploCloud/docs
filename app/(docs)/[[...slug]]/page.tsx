import { notFound } from "next/navigation";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
  MarkdownCopyButton,
  PageBreadcrumb,
} from "fumadocs-ui/layouts/docs/page";
import { getMDXComponents } from "@/mdx-components";
import { source } from "@/lib/source";
import { pageUrl } from "@/lib/base-path";
import { PageFeedback } from "@/components/page-feedback";
import { ViewOptions } from "@/components/view-options";
import { BetaChip } from "@/components/beta-chip";
import { IsoHero } from "@/components/iso-hero";

const BETA_PAGES = new Set([
  "/guides/mcp-server",
  "/advanced/build-servers",
  "/operations/servers/container-registries",
  "/migrations",
  "/migrations/move-from-dokploy",
  "/migrations/move-from-coolify",
  "/migrations/move-from-another-deplo",
  "/operations/move-deplo",
  "/api-reference/mcp",
]);

export default async function Page(props: PageProps<"/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const markdownUrl = page.url === "/" ? "/index.mdx" : `${page.url}.mdx`;
  const isHome = page.url === "/";
  const isBeta = BETA_PAGES.has(page.url);

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} breadcrumb={{ enabled: false }}>
      {!isHome && (
        <IsoHero className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 flex-col gap-4">
            <PageBreadcrumb className="min-w-0" />
            <div className="flex flex-wrap items-center gap-3">
              <DocsTitle className="text-4xl leading-[1.15] tracking-tight text-balance md:text-5xl">
                {page.data.title}
              </DocsTitle>
              {isBeta && <BetaChip />}
            </div>
            <DocsDescription className="mb-0 max-w-xl text-base leading-relaxed text-balance">
              {page.data.description}
            </DocsDescription>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <MarkdownCopyButton markdownUrl={markdownUrl} />
            <ViewOptions
              markdownUrl={markdownUrl}
              githubUrl={`https://github.com/DeploCloud/docs/blob/main/content/docs/${page.path}`}
            />
          </div>
        </IsoHero>
      )}
      <DocsBody className={isHome ? "max-w-none" : undefined}>
        <MDXContent components={getMDXComponents()} />
      </DocsBody>
      <PageFeedback />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<"/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    // Without one Google picks a canonical itself and files the page as a
    // duplicate. Absolute because Next does not add basePath to metadata.
    alternates: { canonical: pageUrl(page.url) },
  };
}
