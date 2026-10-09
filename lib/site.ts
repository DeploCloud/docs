// deplo.build's own header and footer, mirrored: the site's copy lives in its CMS, not here.
export const SITE = "https://deplo.build";

export type SiteLink = { label: string; href: string };

export const headerNav: SiteLink[] = [
  { label: "Product", href: `${SITE}/features` },
  { label: "Pricing", href: `${SITE}/pricing` },
  { label: "Compare", href: `${SITE}/comparison` },
  { label: "Community", href: "https://ds.deplo.build" },
];

export const getStarted: SiteLink = { label: "Get started", href: `${SITE}/get-started` };

export const footerTagline = "Open source deployment for the servers you already own.";

export const footerColumns: { title: string; links: SiteLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: `${SITE}/features` },
      { label: "Use cases", href: `${SITE}/use-cases` },
      { label: "Frameworks", href: `${SITE}/frameworks` },
      { label: "Templates", href: `${SITE}/templates` },
      { label: "Pricing", href: `${SITE}/pricing` },
      { label: "Demo", href: "https://demo.deplo.build" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/" },
      { label: "Changelog", href: `${SITE}/changelog` },
      { label: "Security", href: `${SITE}/security` },
      { label: "Brand kit", href: `${SITE}/brand` },
      { label: "GitHub", href: "https://github.com/DeploCloud/deplo" },
    ],
  },
  {
    title: "Deplo",
    links: [
      { label: "About", href: `${SITE}/about` },
      { label: "Partners", href: `${SITE}/partners` },
      { label: "Sponsor", href: "https://github.com/sponsors/IdraDev" },
      { label: "Contact", href: "mailto:hello@deplo.build" },
    ],
  },
];

export const socials = [
  { platform: "discord", label: "Discord", href: "https://ds.deplo.build" },
  { platform: "x", label: "X", href: "https://x.com/deplocloud" },
  { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/deplocloud" },
] as const;

export const footerLegal = "© 2026 Kevin Paratore (DeploCloud). All rights reserved.";

export const footerBottomLinks: SiteLink[] = [
  { label: "Privacy Policy", href: `${SITE}/privacy` },
  { label: "Terms of Service", href: `${SITE}/terms` },
];
