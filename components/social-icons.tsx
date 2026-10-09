import type { SVGProps } from "react";
import { siDiscord, siGithub, siInstagram, siX, type SimpleIcon } from "simple-icons";

function brandIcon(icon: SimpleIcon) {
  return function BrandIcon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
        <path d={icon.path} />
      </svg>
    );
  };
}

export const DiscordIcon = brandIcon(siDiscord);
export const GithubIcon = brandIcon(siGithub);
export const InstagramIcon = brandIcon(siInstagram);
export const XIcon = brandIcon(siX);

export const socialIcons = { discord: DiscordIcon, x: XIcon, instagram: InstagramIcon };
