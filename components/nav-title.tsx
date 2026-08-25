"use client";

import type { ComponentProps } from "react";
import Image from "next/image";
import { basePath } from "@/lib/base-path";

export function NavTitle({ className }: ComponentProps<"a">) {
  return (
    <a href="https://deplo.build" className={className}>
      <Image src={`${basePath}/logo.svg`} alt="Deplo" width={72} height={22} priority />
    </a>
  );
}
