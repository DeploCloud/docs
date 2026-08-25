"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Next's own scroll restoration doesn't reliably reset to top on every
 * route change inside the docs shell (the sidebar/TOC providers stay
 * mounted across navigations), so it's forced here instead.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
