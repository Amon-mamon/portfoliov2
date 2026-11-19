"use client";

import React from "react";
import { VscBrowser, VscServer, VscRocket } from "react-icons/vsc";
import { Reveal } from "./Reveal";

const SERVICES = [
  {
    icon: VscBrowser,
    title: "Front-end development",
    text: "Responsive, accessible interfaces in React and Next.js that load fast and feel smooth.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: VscServer,
    title: "Back-end development",
    text: "REST APIs, authentication and database design with Node.js, Django and PostgreSQL.",
    tags: ["Node.js", "Django", "PostgreSQL", "Supabase"],
  },
  {
    icon: VscRocket,
    title: "Deployment & delivery",
    text: "Version control, containers and deployments with Git, Docker and Vercel, end to end.",
    tags: ["Git", "Docker", "Vercel", "CI/CD"],
  },
];

/** Three clear columns: what I do, in plain language. */
export default function WhatIDo() {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {SERVICES.map(({ icon: Icon, title, text, tags }, i) => (
        <Reveal key={title} delay={i * 100} className="group">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-soft text-xl text-ember-deep transition-colors duration-300 group-hover:bg-ember-deep group-hover:text-white">
              <Icon />
            </span>
            <span className="text-sm font-semibold tabular-nums text-stone-warm">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="mt-5 text-xl font-bold text-ink">{title}</h3>
          <p className="mt-2 text-base leading-relaxed text-ink-soft">{text}</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm font-medium text-ink">
            {tags.map((t, ti) => (
              <React.Fragment key={t}>
                {ti > 0 && <span className="h-1 w-1 rounded-full bg-ember" aria-hidden />}
                <span>{t}</span>
              </React.Fragment>
            ))}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
