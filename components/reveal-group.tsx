"use client";

import { useRef, type ReactNode } from "react";
import { gsap, reducedMotion, revealStart, useGSAP } from "@/lib/gsap";

/** deplo.build's scroll reveal: the children fade up one after the other. */
export function RevealGroup({
  as: Tag = "div",
  className,
  children,
  stagger = 0.12,
  delay = 0,
  y = 32,
}: {
  as?: "div" | "ul";
  className?: string;
  children: ReactNode;
  stagger?: number;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    if (!ref.current) return;
    if (reducedMotion()) return void gsap.set(ref.current.children, { opacity: 1 });
    // `interact` transitions opacity/transform: left on, it chases the tween and sticks on the from-state.
    gsap.set(ref.current.children, { transition: "none" });
    gsap.fromTo(
      ref.current.children,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        stagger,
        duration: 1,
        delay,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: revealStart, toggleActions: "play none none reverse" },
      },
    );
  }, []);

  return (
    <Tag ref={ref as never} className={className} data-reveal="children">
      {children}
    </Tag>
  );
}
