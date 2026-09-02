"use client";

import { useEffect } from "react";

// Mirrors github.com's sidebar nav: one shared pill tweens position/height
// between rows instead of each row fading its own background in place.
export function SidebarHoverIndicator() {
  useEffect(() => {
    const viewport = document.querySelector<HTMLElement>(
      "#nd-sidebar [data-radix-scroll-area-viewport]",
    );
    if (!viewport) return;

    const indicator = document.createElement("div");
    indicator.className = "sidebar-hover-indicator";
    viewport.appendChild(indicator);

    function onOver(e: PointerEvent) {
      const row = (e.target as HTMLElement).closest<HTMLElement>("a, button");
      if (!row) {
        indicator.style.opacity = "0";
        return;
      }
      const rowRect = row.getBoundingClientRect();
      const viewportRect = viewport!.getBoundingClientRect();
      indicator.style.transform = `translateY(${rowRect.top - viewportRect.top + viewport!.scrollTop}px)`;
      indicator.style.height = `${rowRect.height}px`;
      indicator.style.opacity = "1";
    }
    function onLeave() {
      indicator.style.opacity = "0";
    }

    viewport.addEventListener("pointerover", onOver);
    viewport.addEventListener("pointerleave", onLeave);
    return () => {
      viewport.removeEventListener("pointerover", onOver);
      viewport.removeEventListener("pointerleave", onLeave);
      indicator.remove();
    };
  }, []);

  return null;
}
