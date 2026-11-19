"use client";

import React, { useState, useSyncExternalStore } from "react";
import { VscArrowRight, VscCheck, VscCopy, VscGithub, VscMention } from "react-icons/vsc";
import ContactComposer from "./ContactComposer";
import { Reveal } from "./Reveal";

const EMAIL = "stoicdavid16@gmail.com";
const TIME_ZONE = "Asia/Manila";

const STEPS = [
  { title: "You send a message", text: "Share the role or project. A few lines is plenty." },
  { title: "I reply within one business day", text: "With my availability and any questions I have." },
  { title: "We schedule a quick call", text: "A short call to see if we're a good fit, no pressure." },
];

/* ─────────── live local time (client-only, hydration-safe) ─────────── */

function subscribe(cb: () => void) {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
}
function getSnapshot() {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "numeric", minute: "2-digit" }).format(now);
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "numeric", hourCycle: "h23" }).format(now)
  );
  return `${time}|${hour}`;
}
const getServerSnapshot = () => "";

function LocalTime() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [time, hourStr] = snap ? snap.split("|") : ["--:--", ""];
  const hour = Number(hourStr);
  const online = snap !== "" && hour >= 8 && hour < 22;

  return (
    <div className="flex items-center gap-4">
      <span className="relative flex h-3 w-3 shrink-0">
        {online && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />}
        <span className={`relative inline-flex h-3 w-3 rounded-full ${online ? "bg-emerald-600" : "bg-stone-warm"}`} />
      </span>
      <div>
        <p className="text-sm text-stone-warm">Local time in the Philippines (GMT+8)</p>
        <p className="text-2xl font-bold tabular-nums tracking-tight text-ink">
          {time}
          <span className="ml-3 text-sm font-semibold tracking-normal text-ink-soft">
            {snap === "" ? "" : online ? "Likely online" : "Offline: I'll reply in the morning"}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ─────────── copy email ─────────── */

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={`mailto:${EMAIL}`}
        className="text-lg font-bold text-ink underline decoration-ember decoration-2 underline-offset-[6px] transition-colors hover:text-ember-deep"
      >
        {EMAIL}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="inline-flex items-center gap-1.5 rounded-full bg-paper-deep px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper cursor-pointer"
      >
        {copied ? <VscCheck className="text-emerald-600" /> : <VscCopy />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

/* ─────────── section ─────────── */

export default function ContactSection() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-6 py-12 sm:py-14 lg:py-16">
      {/* Heading row */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal className="max-w-2xl">
          <p className="flex items-center gap-2.5 text-base font-semibold text-ember-deep">
            <span className="h-2 w-2 rounded-full bg-ember" />
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-5xl">
            Let&apos;s work{" "}
            <span className="relative inline-block">
              together
              <span aria-hidden className="mv-underline-reveal absolute -bottom-0.5 left-0 h-1.5 w-full rounded-full bg-ember/70 sm:h-2" />
            </span>
            .
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Open to full-time roles and freelance projects. Tell me what you&apos;re working on and I&apos;ll get back
            to you.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <LocalTime />
        </Reveal>
      </div>

      <div className="mt-10 grid gap-12 sm:mt-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: what happens next + direct channels */}
        <div className="space-y-10 lg:col-span-5">
          <Reveal>
            <h3 className="text-lg font-bold text-ink">What happens next</h3>
            <ol className="relative mt-6 space-y-8">
              {/* connector line, draws in on reveal */}
              <span
                aria-hidden
                className="mv-line-reveal absolute left-[19px] top-3 bottom-3 w-0.5 bg-ink/15"
              />
              {STEPS.map((step, i) => (
                <li key={step.title} className="relative flex gap-5">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="mt-1 text-base leading-relaxed text-ink-soft">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={100} className="space-y-5">
            <h3 className="text-lg font-bold text-ink">Prefer email?</h3>
            <CopyEmail />
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                { label: "GitHub", href: "https://github.com/Amon-mamon", icon: VscGithub },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/vince-stephen-david-ab72292a0/", icon: VscMention },
              ].map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-paper-deep px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <Icon className="text-base" />
                  {label}
                  <VscArrowRight className="-rotate-45 transition-transform group-hover:rotate-0" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: the form */}
        <Reveal delay={150} className="lg:col-span-7">
          <ContactComposer />
        </Reveal>
      </div>
    </div>
  );
}
