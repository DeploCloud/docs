import type { ReactNode } from "react";
import {
  siAlmalinux,
  siAlpinelinux,
  siArchlinux,
  siCentos,
  siDebian,
  siFedora,
  siLinux,
  siOpensuse,
  siRaspberrypi,
  siRedhat,
  siRockylinux,
  siSuse,
  siUbuntu,
} from "simple-icons";

const ICONS = {
  almalinux: siAlmalinux,
  alpine: siAlpinelinux,
  arch: siArchlinux,
  centos: siCentos,
  debian: siDebian,
  fedora: siFedora,
  linux: siLinux,
  opensuse: siOpensuse,
  raspberrypi: siRaspberrypi,
  rhel: siRedhat,
  rocky: siRockylinux,
  suse: siSuse,
  ubuntu: siUbuntu,
} as const;

// simple-icons carries each brand's MONOCHROME hex, and three of them are black or
// near-black - invisible on this site's black page. They take the brand's own
// published primary instead: almalinux.org/branding, brand.suse.com, the CentOS mark.
const ON_BLACK: Partial<Record<keyof typeof ICONS, string>> = {
  almalinux: "0069DA",
  centos: "932279",
  suse: "30BA78",
};

export function Os({
  name,
  children,
}: {
  name: keyof typeof ICONS;
  children?: ReactNode;
}) {
  const icon = ICONS[name];
  return (
    <>
      <svg
        role="img"
        viewBox="0 0 24 24"
        width="14"
        height="14"
        className="mr-1.5 inline-block align-text-bottom"
        fill={`#${ON_BLACK[name] ?? icon.hex}`}
        aria-hidden="true"
      >
        <path d={icon.path} />
      </svg>
      {children}
    </>
  );
}
