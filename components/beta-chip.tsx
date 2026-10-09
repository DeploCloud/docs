import type { HTMLAttributes } from "react";

/** The one spelling of "this is beta" in the docs: the product's beta badge colours, in deplo.build's pill shape. */
export function BetaChip({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-transparent bg-fd-info/15 px-2.5 py-0.5 text-[10px] font-normal text-fd-info uppercase ${className}`}
      {...props}
    >
      Beta
    </span>
  );
}
