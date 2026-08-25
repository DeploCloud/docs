import type { HTMLAttributes } from "react";

/**
 * The one spelling of "this is beta" in the docs, matching
 * DeploCloud/deplo's own components/shared/beta-chip.tsx 1:1: same
 * Badge recipe (info variant, 15% tint background, full-color text),
 * same size and casing.
 */
export function BetaChip({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border border-transparent bg-fd-info/15 px-2 py-0.5 text-[10px] font-normal text-fd-info uppercase ${className}`}
      {...props}
    >
      Beta
    </span>
  );
}
