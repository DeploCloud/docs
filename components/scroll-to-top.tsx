"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Next's scroll restoration doesn't reliably reset inside the docs shell
// (sidebar/TOC providers stay mounted), so force it. A hash in the URL means
// the browser/Next already scrolled to that anchor: leave it alone.
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
