"use client";

import { useEffect } from "react";
import { usePathname } from "fumadocs-core/framework";

// Slides one underline between tab triggers instead of each trigger's border
// snapping on/off, same idea as SidebarActiveIndicator.
export function TabsActiveIndicator() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups = [...document.querySelectorAll<HTMLElement>('#nd-page [role="tablist"]')].map(
      (list) => {
        const bar = document.createElement("span");
        bar.className = "tabs-active-indicator";
        list.classList.add("has-tabs-indicator");
        list.appendChild(bar);
        let placed = false;

        const place = () => {
          const tab = list.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
          if (!tab) return;
          if (!placed) bar.style.transition = "none";
          bar.style.transform = `translateX(${tab.offsetLeft}px)`;
          bar.style.width = `${tab.offsetWidth}px`;
          bar.style.opacity = "1";
          if (!placed) {
            void bar.offsetWidth;
            bar.style.transition = "";
            placed = true;
          }
        };

        place();
        const mo = new MutationObserver(place);
        mo.observe(list, { attributes: true, subtree: true, attributeFilter: ["data-state"] });
        const ro = new ResizeObserver(place);
        ro.observe(list);

        return () => {
          mo.disconnect();
          ro.disconnect();
          bar.remove();
          list.classList.remove("has-tabs-indicator");
        };
      },
    );
    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
