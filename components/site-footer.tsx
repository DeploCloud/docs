import Image from "next/image";
import { basePath } from "@/lib/base-path";
import { SITE, footerBottomLinks, footerColumns, footerLegal, footerTagline, socials } from "@/lib/site";
import { GithubBadge } from "@/components/github-badge";
import { RevealGroup } from "@/components/reveal-group";
import { SiteLink } from "@/components/site-link";
import { socialIcons } from "@/components/social-icons";

/** deplo.build's footer, under every docs page. */
export function SiteFooter() {
  return (
    <footer className="site-footer overflow-x-clip">
      <div className="rail-ticks relative mx-auto w-full max-w-(--fd-layout-width) px-6 pt-20 md:px-10">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <RevealGroup className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <a href={SITE} className="interact">
              <Image src={`${basePath}/logo.svg`} alt="Deplo" width={108} height={32} draggable={false} className="h-8 w-auto" />
            </a>
            <p className="max-w-xs leading-[1.75] text-fd-muted-foreground">{footerTagline}</p>
            <div className="flex items-stretch gap-2">
              <GithubBadge />
              {socials.map(({ platform, label, href }) => {
                const Icon = socialIcons[platform];
                return (
                  <SiteLink
                    key={platform}
                    href={href}
                    aria-label={label}
                    className="interact flex size-10 items-center justify-center rounded-full border border-white/15 bg-black"
                  >
                    <Icon className="size-4" />
                  </SiteLink>
                );
              })}
            </div>
          </RevealGroup>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:flex md:flex-wrap md:gap-12 lg:gap-16">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
                <h3 className="font-sans text-base font-medium tracking-normal text-white">{column.title}</h3>
                <RevealGroup as="ul" stagger={0.05} y={16} className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <SiteLink
                        href={link.href}
                        className="interact flex items-center justify-center gap-2 text-sm text-fd-muted-foreground hover:text-white md:justify-start"
                      >
                        {link.logo && (
                          <>
                            <span>vs.</span>
                            <Image src={`${basePath}${link.logo}`} alt="" width={16} height={16} draggable={false} />
                          </>
                        )}
                        {link.label}
                      </SiteLink>
                    </li>
                  ))}
                </RevealGroup>
              </div>
            ))}
          </div>
        </div>
        <RevealGroup className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-fd-muted-foreground md:flex-row">
          <span>{footerLegal}</span>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerBottomLinks.map((link) => (
              <SiteLink key={link.label} href={link.href} className="interact hover:text-white">
                {link.label}
              </SiteLink>
            ))}
          </div>
        </RevealGroup>
      </div>
      <RevealGroup delay={0.15} className="mt-10 overflow-hidden">
        <Image
          src={`${basePath}/footer_logo.svg`}
          alt=""
          aria-hidden
          width={1727}
          height={350}
          draggable={false}
          className="h-auto w-full select-none"
        />
      </RevealGroup>
    </footer>
  );
}
