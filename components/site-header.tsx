import Image from "next/image";
import { basePath } from "@/lib/base-path";
import { primaryButton } from "@/lib/button-styles";
import { SITE, getStarted, headerNav } from "@/lib/site";
import { CtaChevron } from "@/components/cta-chevron";
import { GithubBadge } from "@/components/github-badge";
import { SearchPill } from "@/components/search-pill";
import { SiteLink } from "@/components/site-link";

/** deplo.build's header on desktop; below md the Fumadocs bar takes over with the sidebar trigger. */
export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40 h-(--fd-banner-height) bg-black/80 backdrop-blur-lg max-md:hidden">
      <div className="relative mx-auto flex h-full w-full max-w-[97rem] items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-9">
          <a href={SITE} className="interact shrink-0">
            <Image src={`${basePath}/logo.svg`} alt="Deplo" width={81} height={24} className="h-6 w-auto" priority />
          </a>
          <nav className="hidden items-center gap-9 text-white lg:flex xl:absolute xl:left-1/2 xl:-translate-x-1/2">
            {headerNav.map((link) => (
              <SiteLink key={link.label} href={link.href} className="interact">
                {link.label}
              </SiteLink>
            ))}
          </nav>
        </div>
        <div className="flex items-stretch gap-2">
          <SearchPill />
          <GithubBadge bare />
          <a href={getStarted.href} className={`${primaryButton} px-4!`}>
            <CtaChevron>{getStarted.label}</CtaChevron>
          </a>
        </div>
        <span aria-hidden className="rail-marks bottom-[-5px] z-10" />
      </div>
    </header>
  );
}
