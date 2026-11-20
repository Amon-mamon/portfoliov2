"use client";

import React from "react";
import { useHeroStats } from "./minimalist/HeroShowcase";
import { CountUp } from "./minimalist/Reveal";

interface VSCodeStatsProps {
  projectCount: number;
  fileName?: string;
  className?: string;
}

export const VSCodeStats = ({
  projectCount,
  fileName = "metrics.config.ts",
  className = "",
}: VSCodeStatsProps) => {
  const stats = useHeroStats(projectCount);

return (
  <dl className={`hero-fade-up hero-delay-3 grid grid-cols-3 gap-4 font-mono sm:gap-12 ${className}`}>
    {stats.map((s) => (
      <div key={s.key}>
        <dt className="text-[10px] w-full whitespace-nowrap italic leading-snug text-[#6a9955] sm:text-xs">
          // {s.label}
        </dt>
        <dd className="mt-1">
          <span className="text-3xl font-bold tracking-tight text-[#d4d4d4] sm:text-5xl">
            <CountUp value={s.value} />
            <span className="text-[#4fc1ff]">{s.suffix}</span>
          </span>
          <span className="mt-1 block text-xs text-[#9cdcfe]">{s.key}</span>
        </dd>
      </div>
    ))}
  </dl>
);
};