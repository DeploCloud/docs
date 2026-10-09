import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { SidebarMenu } from "@/components/sidebar-menu";
import { NavTitle } from "@/components/nav-title";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: NavTitle,
      children: <SidebarMenu />,
    },
    // On desktop the search lives in SiteHeader; the mobile bar keeps its icon.
    searchToggle: { components: { lg: <></> } },
    themeSwitch: { enabled: false },
  };
}
