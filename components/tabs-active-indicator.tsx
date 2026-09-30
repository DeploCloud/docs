"use client";

import { useEffect } from "react";
import { usePathname } from "fumadocs-core/framework";

const SELECTOR = '#nd-page [role="tablist"]';

// Slides one underline between tab triggers instead of each trigger's border
// snapping on/off, same idea as SidebarActiveIndicator. Nested tab lists mount
// later (inside an inactive tab), so new ones are picked up as they appear.
function attach(list: HTMLElement) {
  const bar = document.createElement("span");
  bar.className = "tabs-active-indicator";
  list.classList.add("has-tabs-indicator");
  list.appendChild(bar);
  let placed = false;

  const place = () => {
    const tab = list.querySelector<HTMLElement>(
      ':scope > [role="tab"][data-state="active"]',
    );
    if (!tab || tab.offsetWidth === 0) return;
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
  mo.observe(list, {
    attributes: true,
    subtree: true,
    attributeFilter: ["data-state"],
  });
  const ro = new ResizeObserver(place);
  ro.observe(list);

  return () => {
    mo.disconnect();
    ro.disconnect();
    bar.remove();
    list.classList.remove("has-tabs-indicator");
  };
}

export function TabsActiveIndicator() {
  const pathname = usePathname();

  useEffect(() => {
    const attached = new Map<HTMLElement, () => void>();
    const scan = () => {
      for (const list of document.querySelectorAll<HTMLElement>(SELECTOR)) {
        if (!attached.has(list)) attached.set(list, attach(list));
      }
      for (const [list, detach] of attached) {
        if (!list.isConnected) {
          detach();
          attached.delete(list);
        }
      }
    };

    scan();
    const page = document.getElementById("nd-page");
    const mo = new MutationObserver(scan);
    if (page) mo.observe(page, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      attached.forEach((detach) => detach());
    };
  }, [pathname]);

  return null;
}
