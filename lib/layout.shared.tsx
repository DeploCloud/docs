import { Heart } from "lucide-react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { SidebarMenu } from "@/components/sidebar-menu";
import { NavTitle } from "@/components/nav-title";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: NavTitle,
      children: <SidebarMenu />,
    },
    githubUrl: "https://github.com/DeploCloud/deplo",
    links: [
      {
        type: "icon",
        label: "Sponsor",
        text: "Sponsor",
        icon: <Heart className="text-rose-400" />,
        url: "https://github.com/sponsors/IdraDev",
        external: true,
      },
    ],
  };
}
