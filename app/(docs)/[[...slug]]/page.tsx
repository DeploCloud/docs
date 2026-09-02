import { notFound } from "next/navigation";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
  MarkdownCopyButton,
} from "fumadocs-ui/layouts/docs/page";
import { getMDXComponents } from "@/mdx-components";
import { source } from "@/lib/source";
import { PageFeedback } from "@/components/page-feedback";
import { ViewOptions } from "@/components/view-options";
import { BetaChip } from "@/components/beta-chip";

const BETA_PAGES = new Set([
  "/guides/mcp-server",
  "/advanced/build-servers",
  "/guides/server/cleanup",
  "/guides/server/container-registries",
  "/guides/what-migrates",
  "/guides/take-over-your-vps",
  "/guides/move-from-dokploy",
  "/guides/move-from-coolify",
  "/api-reference/rest-and-mcp",
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
    <DocsPage toc={page.data.toc} full={page.data.full}>
      {!isHome && (
        <div className="flex items-center justify-end gap-2">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptions
            markdownUrl={markdownUrl}
            githubUrl={`https://github.com/DeploCloud/docs/blob/main/content/docs/${page.path}`}
          />
        </div>
      )}
      {!isHome && (
        <>
          {isBeta ? (
            <div className="flex flex-wrap items-center gap-3">
              <DocsTitle>{page.data.title}</DocsTitle>
              <BetaChip />
            </div>
          ) : (
            <DocsTitle>{page.data.title}</DocsTitle>
          )}
          <DocsDescription>{page.data.description}</DocsDescription>
        </>
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
  };
}
