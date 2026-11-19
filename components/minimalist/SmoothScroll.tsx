"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis: Lenis | null = null;

/** Smoothly scroll to a section id (falls back to native smooth scroll). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(id === "home" ? 0 : el, { offset: id === "home" ? 0 : -72, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

/** Pause / resume smooth scrolling (e.g. while a modal is open). */
export function setSmoothScrollPaused(paused: boolean) {
  if (paused) lenis?.stop();
  else lenis?.start();
}

/**
 * Inertia ("buttery") scrolling for the minimalist page's scroll container.
 * The page scrolls inside `wrapperId` because <body> is overflow-hidden.
 */
export function SmoothScroll({ wrapperId, contentId }: { wrapperId: string; contentId: string }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wrapper = document.getElementById(wrapperId);
    const content = document.getElementById(contentId);
    if (!wrapper || !content) return;

    lenis = new Lenis({
      wrapper,
      content,
      lerp: 0.09, // lower = smoother / more glide
      wheelMultiplier: 1,
      smoothWheel: true,
      // touch devices keep their native momentum scrolling
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, [wrapperId, contentId]);

  return null;
}
