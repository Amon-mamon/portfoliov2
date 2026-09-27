"use client";

import React from "react";
import Image from "next/image";

interface SkillItem {
  name: string;
  icon: string;
  invertOnLight?: boolean;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

const TECH_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "GSAP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gsap/gsap-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "jQuery", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invertOnLight: true },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
      { name: "NeonDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invertOnLight: true },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invertOnLight: true },
    ],
  },
];

export default function TechStackMinimalist() {
  return (
    <section className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Tech Stack &amp; Skills</h3>
          <p className="text-xs text-slate-500">Core technologies used across development workflows</p>
        </div>

        <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs font-mono text-slate-600 border border-slate-200/60">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <span>Full-Stack Engineer</span>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TECH_CATEGORIES.map((category) => (
          <div
            key={category.title}
            className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <h4 className="text-sm font-bold text-slate-900 font-mono tracking-tight">
                // {category.title}
              </h4>
              <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">
                {category.skills.length} Items
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group bg-white hover:bg-slate-100/80 border border-slate-200/80 hover:border-indigo-300 px-3 py-2 rounded-lg flex items-center gap-2.5 transition-all duration-150 shadow-2xs"
                >
                  <div className="w-4 h-4 relative flex items-center justify-center shrink-0">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      width={16}
                      height={16}
                      className={`w-full h-full object-contain ${skill.invertOnLight ? "invert brightness-0" : ""
                        }`}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Details */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Production Ready Stack</span>
        </span>
        <span className="text-slate-400">19 Technologies Mastered</span>
      </div>
    </section>
  );
}