"use client";

import { useEffect } from "react";

// navigator.clipboard only exists in a secure context, so every fumadocs copy
// button (headings, code blocks, page actions) throws when the site is served
// over plain http, e.g. a dev server on a bare IP.
export function ClipboardFallback() {
  useEffect(() => {
    if (navigator.clipboard) return;

    const writeText = (text: string) => {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "0";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      return Promise.resolve();
    };

    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
  }, []);

  return null;
}
