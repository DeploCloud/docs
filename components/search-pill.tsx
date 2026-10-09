"use client";

import { Search } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";

/** The Ctrl+K search, drawn like deplo.build's search field. */
export function SearchPill() {
  const { setOpenSearch, hotKey } = useSearchContext();
  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      className="interact flex h-11 w-60 items-center gap-2 rounded-full border border-white/15 bg-black ps-4 pe-2 text-sm text-fd-muted-foreground"
    >
      <Search className="size-4" />
      Search
      <span className="ms-auto inline-flex gap-0.5">
        {hotKey.map((key, i) => (
          <kbd key={i} className="rounded-full border border-white/15 px-2 py-0.5 text-xs">
            {key.display}
          </kbd>
        ))}
      </span>
    </button>
  );
}
