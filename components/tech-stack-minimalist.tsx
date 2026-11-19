"use client";

import React, { useState } from "react";
import type { IconType } from "react-icons";
import {
  SiHtml5, SiCss, SiGreensock, SiJavascript, SiJquery, SiTypescript, SiReact, SiNextdotjs,
  SiTailwindcss, SiNodedotjs, SiPython, SiDjango, SiPostgresql, SiSupabase, SiNeon, SiGit,
  SiGithub, SiDocker, SiPostman, SiVercel,
} from "react-icons/si";
import { Reveal } from "@/components/minimalist/Reveal";

interface SkillItem {
  name: string;
  symbol: string;
  icon: IconType;
  color: string;
}

interface SkillCategory {
  title: string;
  description: string;
  /** colour used for the category bar on each tile + the filter dot */
  tone: string;
  skills: SkillItem[];
}

// Icons are bundled (react-icons), so there are no external image requests.
export const TECH_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Interfaces & interactions",
    tone: "#e8552d",
    skills: [
      { name: "React.js", symbol: "Re", icon: SiReact, color: "#149ECA" },
      { name: "Next.js", symbol: "Nx", icon: SiNextdotjs, color: "#000000" },
      { name: "TypeScript", symbol: "Ts", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", symbol: "Js", icon: SiJavascript, color: "#D4A900" },
      { name: "Tailwind CSS", symbol: "Tw", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "HTML5", symbol: "Ht", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", symbol: "Cs", icon: SiCss, color: "#1572B6" },
      { name: "GSAP", symbol: "Gs", icon: SiGreensock, color: "#0AE448" },
      { name: "jQuery", symbol: "Jq", icon: SiJquery, color: "#0769AD" },
    ],
  },
  {
    title: "Backend",
    description: "APIs & server logic",
    tone: "#2f7a55",
    skills: [
      { name: "Node.js", symbol: "No", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Python", symbol: "Py", icon: SiPython, color: "#3776AB" },
      { name: "Django", symbol: "Dj", icon: SiDjango, color: "#092E20" },
    ],
  },
  {
    title: "Database",
    description: "Data modeling & storage",
    tone: "#3f5fa8",
    skills: [
      { name: "PostgreSQL", symbol: "Pg", icon: SiPostgresql, color: "#4169E1" },
      { name: "Supabase", symbol: "Sb", icon: SiSupabase, color: "#3FCF8E" },
      { name: "NeonDB", symbol: "Ne", icon: SiNeon, color: "#00C08B" },
    ],
  },
  {
    title: "Tools & DevOps",
    description: "Workflow & deployment",
    tone: "#a07a16",
    skills: [
      { name: "Git", symbol: "Gt", icon: SiGit, color: "#F05032" },
      { name: "GitHub", symbol: "Gh", icon: SiGithub, color: "#181717" },
      { name: "Docker", symbol: "Dk", icon: SiDocker, color: "#2496ED" },
      { name: "Postman", symbol: "Pm", icon: SiPostman, color: "#FF6C37" },
      { name: "Vercel", symbol: "Vc", icon: SiVercel, color: "#000000" },
    ],
  },
];

export const ALL_TECH = TECH_CATEGORIES.flatMap((c) => c.skills);
export const TECH_COUNT = ALL_TECH.length;

const TILES = TECH_CATEGORIES.flatMap((c) => c.skills.map((s) => ({ ...s, category: c.title, tone: c.tone })));

/** "Periodic table" of the stack, with category filters. */
export default function TechStackMinimalist() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Category filters / legend */}
      <Reveal className="flex flex-wrap gap-2.5" role="group" aria-label="Filter skills by category">
        <FilterButton label="All" count={TECH_COUNT} tone="#16130f" selected={active === null} onClick={() => setActive(null)} />
        {TECH_CATEGORIES.map((c) => (
          <FilterButton
            key={c.title}
            label={c.title}
            count={c.skills.length}
            tone={c.tone}
            selected={active === c.title}
            onClick={() => setActive(active === c.title ? null : c.title)}
          />
        ))}
      </Reveal>

      {/* Element tiles */}
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
        {TILES.map((t, i) => {
          const dimmed = active !== null && active !== t.category;
          const Icon = t.icon;
          return (
            <Reveal as="li" key={t.name} delay={(i % 5) * 60 + Math.floor(i / 5) * 40}>
              <div
                className={`group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl bg-paper-deep p-4 sm:p-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-24px_rgba(22,19,15,0.5)] ${
                  dimmed ? "scale-[0.94] opacity-25 saturate-0" : ""
                }`}
              >
                {/* brand-colour wash on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `color-mix(in srgb, ${t.color} 12%, transparent)` }}
                />
                {/* category bar */}
                <span aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: t.tone }} />

                <div className="relative flex items-start justify-between">
                  <span className="text-sm font-bold tabular-nums text-stone-warm">{String(i + 1).padStart(2, "0")}</span>
                  <Icon
                    className="text-2xl transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-125 sm:text-3xl"
                    style={{ color: t.color }}
                    aria-hidden
                  />
                </div>

                <span className="relative text-5xl font-bold leading-none tracking-[-0.04em] text-ink sm:text-6xl">
                  {t.symbol}
                </span>

                <div className="relative">
                  <p className="truncate text-base font-bold text-ink">{t.name}</p>
                  <p className="truncate text-xs font-semibold" style={{ color: t.tone }}>
                    {t.category}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}

function FilterButton({
  label,
  count,
  tone,
  selected,
  onClick,
}: {
  label: string;
  count: number;
  tone: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`inline-flex cursor-pointer items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
        selected ? "bg-ink text-paper" : "bg-paper-deep text-ink hover:bg-sand"
      }`}
    >
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: selected && label === "All" ? "#f6f2eb" : tone }} />
      {label}
      <span className={selected ? "text-paper/60" : "text-stone-warm"}>{count}</span>
    </button>
  );
}
