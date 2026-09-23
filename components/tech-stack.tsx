"use client";

import React from "react";
import { VSCodeMarquee, SkillItem } from "@/components/ui/vscode-marquee";

// Skills populated with SVG CDN icons
const SKILLS_ROW_1: SkillItem[] = [
  {
    name: "ReactJS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#4ec9b0",
  },
  {
    name: "NextJS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#ffffff",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#569cd6",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "#9cdcfe",
  },
];

const SKILLS_ROW_2: SkillItem[] = [
  {
    name: "NodeJS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#6a9955",
  },
  {
    name: "Supabase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    color: "#b5cea8",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#c586c0",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#ce9178",
  },
];

const TechStack = () => {
  return (
    <section className="@container w-full min-w-0 max-w-full bg-[#181818] border border-[#2b2b2b] rounded-xl p-5 md:p-6 space-y-4 shadow-2xl overflow-hidden relative group/section">
      {/* Top Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#569cd6]/50 to-transparent" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#2b2b2b] pb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#569cd6] font-semibold">02.</span>
          <span className="text-[#808080]">src/config/</span>
          <span className="text-[#dcdcaa] font-medium">tech_stack.json</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-2 py-0.5 rounded bg-[#252526] text-[#808080] text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ec9b0] animate-pulse" />
          <span>JSON Valid</span>
        </div>
      </div>

      {/* Marquee Rows */}
      <div className="relative w-full min-w-0 overflow-hidden">
        <VSCodeMarquee items={SKILLS_ROW_1} speed={60} reverse={false} />
        <VSCodeMarquee items={SKILLS_ROW_2} speed={60} reverse={true} />
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between pt-2 border-t border-[#2b2b2b]/60 text-[11px] font-mono text-[#666666]">
        <span>&#123; &quot;status&quot;: &quot;ready_for_production&quot; &#125;</span>
        <span className="text-[#569cd6]/70">UTF-8</span>
      </div>
    </section>
  );
};

export default TechStack;