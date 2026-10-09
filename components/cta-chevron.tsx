"use client";

import { useRef, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";

/** A primary button's label: on hover or focus a chevron slides in, as on deplo.build. */
export function CtaChevron({ children }: { children: ReactNode }) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const host = root.current?.closest<HTMLElement>("a, button");
      if (!host || !contextSafe) return;

      const open = gsap
        .timeline({ paused: true })
        .to("[data-slot]", { width: "auto", duration: 0.45, ease: "expo.out" })
        .fromTo("[data-icon]", { x: -8, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0.08)
        .timeScale(reducedMotion() ? 100 : 1);

      const enter = contextSafe(() => open.play());
      const leave = contextSafe(() => open.reverse());
      const events = [
        ["pointerenter", enter],
        ["focus", enter],
        ["pointerleave", leave],
        ["blur", leave],
      ] as const;
      events.forEach(([name, fn]) => host.addEventListener(name, fn));
      return () => events.forEach(([name, fn]) => host.removeEventListener(name, fn));
    },
    { scope: root },
  );

  return (
    <span ref={root} className="inline-flex items-center">
      {children}
      <span data-slot="" className="inline-flex w-0 overflow-hidden">
        <ChevronRight data-icon="" aria-hidden="true" className="ml-1 size-4 shrink-0 opacity-0" />
      </span>
    </span>
  );
}
