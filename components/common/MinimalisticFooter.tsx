"use client";

import React, { useState } from "react";
import { VscGithub, VscMention, VscMail, VscSend, VscCheck, VscCopy } from "react-icons/vsc";

export function MinimalisticFooter() {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const email = "stoicdavid16@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    window.location.href = `mailto:${email}?subject=Portfolio Inquiry&body=${encodeURIComponent(
      message
    )}`;
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <footer className="w-full bg-white text-slate-600 text-xs font-sans pt-16 pb-8 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        
        {/* Upper Footer Navigation & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <span>Vince Stephen David</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              Building high-performance, maintainable web applications and modern user experiences.
            </p>
            <div className="pt-1">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs transition-colors"
              >
                {copied ? <VscCheck className="text-emerald-600" /> : <VscCopy className="text-slate-400" />}
                <span>{copied ? "Email Copied!" : email}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 font-mono">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">
              Quick Links
            </span>
            <div className="flex flex-col gap-1.5 text-slate-600">
              <button
                onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left hover:text-indigo-600 transition-colors"
              >
                → Home
              </button>
              <button
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left hover:text-indigo-600 transition-colors"
              >
                → About
              </button>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left hover:text-indigo-600 transition-colors"
              >
                → Projects
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="text-left hover:text-indigo-600 transition-colors"
              >
                → Contact
              </button>
            </div>
          </div>

          {/* Connect Links */}
          <div className="space-y-2 font-mono">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">
              Social Links
            </span>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/Amon-mamon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
              >
                <VscGithub className="text-slate-400 text-sm" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/vince-stephen-david-ab72292a0/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
              >
                <VscMention className="text-slate-400 text-sm" /> LinkedIn
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
              >
                <VscMail className="text-slate-400 text-sm" /> Direct Email
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
          <p>© {currentYear} Vince Stephen David. All rights reserved.</p>
          <div className="flex items-center gap-2 text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Systems Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
}