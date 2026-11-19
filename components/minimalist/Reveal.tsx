"use client";

import React, { useEffect, useRef } from "react";

/** Shared observer: one IntersectionObserver for every <Reveal> on the page. */
let sharedObserver: IntersectionObserver | null = null;
function getObserver() {
  if (sharedObserver || typeof window === "undefined") return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          sharedObserver?.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );
  return sharedObserver;
}

type RevealProps = {
  as?: "div" | "section" | "li" | "article";
  delay?: number;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">;

/** Fades + lifts its content in once, the first time it scrolls into view. */
export function Reveal({ as = "div", delay = 0, className = "", children, style, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    const observer = getObserver();
    if (!el) return;
    if (!observer) {
      el.classList.add("is-visible");
      return;
    }
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={`mv-reveal ${className}`}
      style={{ ...style, ["--mv-delay" as string]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Counts from 0 to `value` once it becomes visible (writes to the DOM, no re-renders). */
export function CountUp({ value, duration = 1400 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const write = (n: number) => (el.textContent = n.toLocaleString("en-US"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      write(value);
      return;
    }

    write(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          write(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  // Server/no-JS render shows the real number; the effect resets it to 0 and animates.
  return <span ref={ref}>{value.toLocaleString("en-US")}</span>;
}
