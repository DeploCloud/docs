import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { notFound } from "next/navigation";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { SidebarHoverIndicator } from "@/components/sidebar-hover-indicator";

export default async function Layout({
  children,
  params,
}: LayoutProps<"/[[...slug]]">) {
  const { slug } = await params;
  if (!source.getPage(slug)) notFound();

  return (
    <DocsLayout tree={source.pageTree} {...baseOptions()}>
      <SidebarHoverIndicator />
      {children}
    </DocsLayout>
  );
}
