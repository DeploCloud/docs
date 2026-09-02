"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "fumadocs-core/framework";

// github.com sidebar nav: the current-page highlight glides to its new row
// on navigation instead of each row's background snapping on/off in place.
// Hover itself stays the vendor default: static, no animation.
export function SidebarActiveIndicator() {
  const pathname = usePathname();
  const placeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const viewport = document.querySelector<HTMLElement>(
      "#nd-sidebar [data-radix-scroll-area-viewport]",
    );
    if (!viewport) return;

    const indicator = document.createElement("div");
    indicator.className = "sidebar-active-indicator";
    viewport.appendChild(indicator);
    let visible = false;

    function place() {
      const row = viewport!.querySelector<HTMLElement>('a[data-active="true"]');
      if (!row) {
        indicator.style.opacity = "0";
        visible = false;
        return;
      }
      const rowRect = row.getBoundingClientRect();
      const viewportRect = viewport!.getBoundingClientRect();
      const jump = !visible;
      if (jump) indicator.style.transition = "none";
      indicator.style.transform = `translate(${rowRect.left - viewportRect.left + viewport!.scrollLeft}px, ${rowRect.top - viewportRect.top + viewport!.scrollTop}px)`;
      indicator.style.width = `${rowRect.width}px`;
      indicator.style.height = `${rowRect.height}px`;
      indicator.style.opacity = "1";
      if (jump) {
        void indicator.offsetWidth;
        indicator.style.transition = "";
      }
      visible = true;
    }

    placeRef.current = place;
    place();

    return () => {
      indicator.remove();
    };
  }, []);

  useEffect(() => {
    placeRef.current?.();
  }, [pathname]);

  return null;
}
