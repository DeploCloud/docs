import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { SidebarMenu } from "@/components/sidebar-menu";
import { NavTitle } from "@/components/nav-title";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: NavTitle,
      children: <SidebarMenu />,
    },
    themeSwitch: { enabled: false },
  };
}
