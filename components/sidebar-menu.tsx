"use client";

import Link from "next/link";
import { Globe, Mail, Menu, Heart } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "fumadocs-ui/components/ui/popover";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { DiscordIcon, GithubIcon } from "@/components/social-icons";

const items = [
  { icon: GithubIcon, label: "GitHub", href: "https://github.com/DeploCloud/deplo" },
  { icon: Globe, label: "Website", href: "https://deplo.build" },
  { icon: DiscordIcon, label: "Discord", href: "https://ds.deplo.build" },
  { icon: Mail, label: "Email", href: "mailto:info@deplo.build" },
  { icon: Heart, label: "Sponsor", href: "https://github.com/sponsors/IdraDev" },
];

// Mobile bar only: on desktop the same links sit in SiteHeader and SiteFooter.
export function SidebarMenu() {
  return (
    <Popover>
      <PopoverTrigger
        aria-label="More links"
        className={buttonVariants({
          color: "ghost",
          size: "icon-sm",
          className: "text-fd-muted-foreground md:hidden",
        })}
      >
        <Menu className="size-4.5" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-auto min-w-[180px] flex-col p-0">
        {items.map(({ icon: Icon, label, href }) => (
          <Link
            key={href}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-fd-popover-foreground hover:bg-fd-accent"
          >
            <Icon className="size-4 text-fd-muted-foreground" />
            {label}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}
