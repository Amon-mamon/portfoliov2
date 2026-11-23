"use client";

import React, { useState, useEffect } from "react";
import { VscGithub, VscFilePdf, VscMenu, VscClose } from "react-icons/vsc";
import { scrollToId } from "@/components/minimalist/SmoothScroll";

/** id of the element that actually scrolls on the minimalist page (body is overflow-hidden) */
export const MV_SCROLL_ID = "mv-scroll";

const NAV_ITEMS = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

export default function MinimalisticNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const scroller = document.getElementById(MV_SCROLL_ID);
    const target: HTMLElement | Window = scroller ?? window;
    const handleScroll = () =>
      setScrolled((scroller?.scrollTop ?? window.scrollY) > 20);
    handleScroll();
    target.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ["home", ...NAV_ITEMS.map((i) => i.href)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      target.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,padding] duration-300 ${
        scrolled || menuOpen
          ? "bg-paper shadow-[0_1px_0_rgba(22,19,15,0.08)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-6">
        <button
          onClick={() => scrollToSection("home")}
          className="text-xl font-bold tracking-tight text-ink cursor-pointer"
          aria-label="Back to top"
        >
          Vince<span className="text-ember">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`relative rounded-full px-4 py-2 text-[15px] font-semibold transition-colors cursor-pointer ${
                  isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute left-4 right-4 -bottom-0.5 h-[3px] rounded-full bg-ember transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Amon-mamon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5 transition-colors"
          >
            <VscGithub className="text-xl" />
          </a>
          <button
            onClick={() => scrollToSection("contact")}
            className="group cursor-pointer relative overflow-hidden bg-ink  px-4 py-2.5 text-white text-sm font-medium transition-colors duration-400 rounded-full"
          >
            <span className="relative z-10">Hire me</span>
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0  bg-ember-deep transition-transform duration-300 ease-out group-hover:scale-x-100"
            ></span>
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5 cursor-pointer"
          >
            {menuOpen ? (
              <VscClose className="text-xl" />
            ) : (
              <VscMenu className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden mx-auto max-w-6xl px-5 sm:px-6 pt-3 pb-4 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="py-3 text-left text-lg font-semibold text-ink cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
