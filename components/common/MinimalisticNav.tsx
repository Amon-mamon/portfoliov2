"use client";

import React, { useState, useEffect } from "react";
import { VscGithub, VscFilePdf } from "react-icons/vsc";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

export default function MinimalisticNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // 1. Detect active section when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Track active section using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 } // Triggers when section is 40% visible
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // 2. Smooth scroll handler
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-2 font-bold text-slate-900 text-sm hover:opacity-80 transition-opacity shrink-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
          <span>Vince.dev</span>
        </button>

        {/* Navigation Bar */}
        <nav className="hidden sm:flex items-center bg-slate-100/80 border border-slate-200/80 p-1 rounded-full shadow-2xs font-mono text-xs">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;

            return (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-4 py-1.5 rounded-full font-medium transition-all duration-200 select-none ${
                  isActive
                    ? "text-slate-900 bg-white shadow-xs font-semibold"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                {/* Visual Active Dot Indicator */}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-600" />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* External Action Links (GitHub & Resume) */}
        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
          <a
            href="https://github.com/Amon-mamon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 shadow-2xs"
            aria-label="GitHub Profile"
          >
            <VscGithub className="text-sm text-slate-800" />
            <span className="hidden md:inline font-medium">GitHub</span>
          </a>

           <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-200 shadow-2xs hover:shadow-xs"
          >
            <VscFilePdf className="text-sm" />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
}