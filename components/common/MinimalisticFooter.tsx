"use client";

import React, { useState } from "react";
import { scrollToId } from "@/components/minimalist/SmoothScroll";
import { VscGithub, VscMention, VscMail, VscCheck, VscCopy, VscArrowUp } from "react-icons/vsc";

const EMAIL = "stoicdavid16@gmail.com";

const LINKS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Work", id: "projects" },
  { label: "Contact", id: "contact" },
];

export function MinimalisticFooter() {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const scrollTo = scrollToId;

  return (
    <footer className="bg-night text-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 pt-16 pb-8 sm:pt-20 sm:pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="space-y-6">
            <p className="text-base font-semibold text-stone-300">Let&apos;s work together</p>
            <button
              onClick={handleCopyEmail}
              className="group text-left cursor-pointer"
              aria-label="Copy email address"
            >
              <span className="block text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-paper group-hover:text-ember transition-colors break-all sm:break-normal">
                {EMAIL}
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-stone-300 group-hover:text-paper transition-colors">
                {copied ? <VscCheck className="text-emerald-400" /> : <VscCopy />}
                {copied ? "Copied to clipboard" : "Click to copy"}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {[
              { href: "https://github.com/Amon-mamon", icon: VscGithub, label: "GitHub" },
              { href: "https://www.linkedin.com/in/vince-stephen-david-ab72292a0/", icon: VscMention, label: "LinkedIn" },
              { href: `mailto:${EMAIL}`, icon: VscMail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-night-raised text-lg text-paper hover:bg-ember-deep transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6 text-sm text-stone-300">
          <p>© {currentYear} Vince Stephen David</p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="hover:text-paper transition-colors cursor-pointer">
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("home")}
              className="inline-flex items-center gap-1.5 hover:text-paper transition-colors cursor-pointer"
            >
              Back to top <VscArrowUp />
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
