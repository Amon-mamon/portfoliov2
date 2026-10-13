"use client";

import React from "react";
import { VSCodeMarquee, SkillItem } from "@/components/ui/vscode-marquee";

// Row 1: Frontend Core
const SKILLS_ROW_1: SkillItem[] = [
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#e34f26",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#1572b6",
  },
  {
    name: "GSAP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gsap/gsap-original.svg",
    color: "#1572b6",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#f7df1e",
  },
  {
    name: "jQuery",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
    color: "#0769ad",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#569cd6",
  },
  {
    name: "ReactJS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#4ec9b0",
  },
];

// Row 2: Frameworks & Styling
const SKILLS_ROW_2: SkillItem[] = [
  {
    name: "NextJS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#ffffff",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "#9cdcfe",
  },
  {
    name: "NodeJS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#6a9955",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776ab",
  },
  {
    name: "Django",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    color: "#092e20",
  },
];

// Row 3: Databases & BaaS
const SKILLS_ROW_3: SkillItem[] = [
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#c586c0",
  },
  {
    name: "Supabase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    color: "#b5cea8",
  },
  {
    name: "NeonDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#00e599",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#ce9178",
  },
];

// Row 4: DevOps & Tools
const SKILLS_ROW_4: SkillItem[] = [
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "#ffffff",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ed",
  },
  {
    name: "Postman",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    color: "#ff6c37",
  },
  {
    name: "Vercel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    color: "#ffffff",
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
      <div className="relative w-full min-w-0 overflow-hidden space-y-2">
        <VSCodeMarquee items={SKILLS_ROW_1} speed={50} reverse={false} />
        <VSCodeMarquee items={SKILLS_ROW_2} speed={50} reverse={true} />
        <VSCodeMarquee items={SKILLS_ROW_3} speed={50} reverse={false} />
        <VSCodeMarquee items={SKILLS_ROW_4} speed={50} reverse={true} />
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