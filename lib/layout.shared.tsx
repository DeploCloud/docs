import Image from "next/image";
import { Heart } from "lucide-react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { SidebarMenu } from "@/components/sidebar-menu";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image src="/logo.svg" alt="Deplo" width={72} height={22} priority />
        </>
      ),
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
