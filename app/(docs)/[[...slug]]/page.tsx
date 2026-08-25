import { notFound } from "next/navigation";
import { DocsPage, DocsBody, DocsDescription, DocsTitle, EditOnGitHub } from "fumadocs-ui/page";
import { getMDXComponents } from "@/mdx-components";
import { source } from "@/lib/source";
import { PageFeedback } from "@/components/page-feedback";

export default async function Page(props: PageProps<"/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent components={getMDXComponents()} />
      </DocsBody>
      <EditOnGitHub href={`https://github.com/DeploCloud/docs/edit/main/content/docs/${page.path}`} />
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
