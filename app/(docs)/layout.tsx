import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { SidebarActiveIndicator } from "@/components/sidebar-active-indicator";
import { TabsActiveIndicator } from "@/components/tabs-active-indicator";

// Above [[...slug]] so the sidebar stays mounted across pages and keeps its scroll.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions()}>
      <SidebarActiveIndicator />
      <TabsActiveIndicator />
      {children}
    </DocsLayout>
  );
}
