"use client";

import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "fumadocs-core/link";
import { ArrowLeft } from "lucide-react";
import { basePath } from "@/lib/base-path";

export function NavTitle({ href = "/", className }: ComponentProps<"a">) {
  return (
    <div className={`group/logo ${className ?? ""}`}>
      <div className="flex items-center">
        <a
          href="https://deplo.build"
          className="flex max-w-0 shrink-0 -translate-x-2 items-center gap-1 overflow-hidden whitespace-nowrap text-xs text-fd-muted-foreground opacity-0 transition-all duration-300 ease-out hover:text-fd-foreground group-hover/logo:mr-2 group-hover/logo:max-w-32 group-hover/logo:translate-x-0 group-hover/logo:opacity-100"
        >
          <ArrowLeft className="size-3.5 shrink-0" />
          Back to site
        </a>
        <Link href={href}>
          <Image src={`${basePath}/logo.svg`} alt="Deplo" width={72} height={22} priority />
        </Link>
      </div>
    </div>
  );
}
