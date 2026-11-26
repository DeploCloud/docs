"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Top at 85% of the screen, clamped above the page bottom so a block low on the page still fires. */
export function revealStart(self: ScrollTrigger) {
  const top = (self.trigger as HTMLElement).getBoundingClientRect().top + window.scrollY;
  return Math.min(top - window.innerHeight * 0.85, Math.max(ScrollTrigger.maxScroll(window) - 64, 0));
}

export { gsap, useGSAP, ScrollTrigger };
