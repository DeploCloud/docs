import Image from "next/image";
import { basePath } from "@/lib/base-path";
import { SITE, footerBottomLinks, footerColumns, footerLegal, footerTagline, socials } from "@/lib/site";
import { GithubBadge } from "@/components/github-badge";
import { SiteLink } from "@/components/site-link";
import { socialIcons } from "@/components/social-icons";

/** deplo.build's footer, under every docs page. */
export function SiteFooter() {
  return (
    <footer className="site-footer overflow-hidden">
      <div className="relative mx-auto w-full max-w-[97rem] px-6 pt-20 md:px-10">
        <span aria-hidden className="rail-marks top-[-5px] max-md:hidden" />
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <a href={SITE} className="interact">
              <Image src={`${basePath}/logo.svg`} alt="Deplo" width={108} height={32} className="h-8 w-auto" />
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
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:flex md:flex-wrap md:gap-16">
            {footerColumns.map((column, index) => (
              <div
                key={column.title}
                className={`flex flex-col items-center gap-4 text-center md:items-start md:text-left ${index === footerColumns.length - 1 ? "col-span-2" : ""}`}
              >
                <h3 className="font-sans text-base font-medium tracking-normal text-white">{column.title}</h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <SiteLink href={link.href} className="interact text-sm text-fd-muted-foreground hover:text-white">
                        {link.label}
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-fd-muted-foreground md:flex-row">
          <span>{footerLegal}</span>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerBottomLinks.map((link) => (
              <SiteLink key={link.label} href={link.href} className="interact hover:text-white">
                {link.label}
              </SiteLink>
            ))}
          </div>
        </div>
      </div>
      <div aria-hidden className="footer-mark mt-10" style={{ maskImage: `url(${basePath}/logo.svg)` }} />
    </footer>
  );
}
