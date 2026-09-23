"use client";

import React from "react";
import Image from "next/image";

export interface SkillItem {
  name: string;
  icon: string; // URL to SVG icon (e.g. from Devicon CDN or local public folder)
  color?: string; // Brand color for hover glow
}

interface MarqueeProps {
  items: SkillItem[];
  speed?: number; // duration in seconds
  reverse?: boolean;
}

export const VSCodeMarquee: React.FC<MarqueeProps> = ({
  items,
  speed = 35,
  reverse = false,
}) => {
  const quadItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full min-w-0 max-w-full overflow-hidden select-none py-2">
      {/* VS Code Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-20 bg-gradient-to-r from-[#181818] via-[#181818]/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-20 bg-gradient-to-l from-[#181818] via-[#181818]/80 to-transparent" />

      {/* Container query layout protection */}
      <div className="w-full min-w-0 overflow-hidden">
        <div className="flex w-max group">
          {/* Marquee Track 1 */}
          <div
            className={`flex shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused] ${
              reverse ? "animate-marquee-reverse" : "animate-marquee"
            }`}
            style={{ animationDuration: `${speed}s` }}
          >
            {quadItems.map((item, idx) => (
              <MarqueeCard key={`t1-${idx}`} item={item} />
            ))}
          </div>

          {/* Marquee Track 2 (Seamless Copy) */}
          <div
            className={`flex shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused] ${
              reverse ? "animate-marquee-reverse" : "animate-marquee"
            }`}
            style={{ animationDuration: `${speed}s` }}
            aria-hidden="true"
          >
            {quadItems.map((item, idx) => (
              <MarqueeCard key={`t2-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon-based Glassmorphic Card
const MarqueeCard = ({ item }: { item: SkillItem }) => {
  return (
    <div
      className="group/card relative inline-flex shrink-0 items-center gap-2 rounded-md px-3.5 py-2 text-xs font-mono border border-[#2b2b2b] bg-[#1e1e1e] hover:bg-[#252526] hover:z-30 transition-all duration-300 transform  cursor-pointer shadow-lg hover:shadow-2xl"
      style={
        item.color
          ? {
              // Subtle glow effect on card hover using brand color
              borderColor: undefined,
            }
          : undefined
      }
    >
      {/* Technology Icon */}
      <div className="relative w-4 h-4 shrink-0 transition-transform duration-300 group-hover/card:scale-110">
        <Image
          src={item.icon}
          alt={`${item.name} icon`}
          width={16}
          height={16}
          className="object-contain w-full h-full"
          unoptimized // Useful for external CDN SVG links like Devicon
        />
      </div>

      {/* Syntax Text */}
      <span className="text-[#ce9178] opacity-80">&quot;</span>
      <span className="text-[#d4d4d4] font-medium tracking-wide group-hover/card:text-white transition-colors">
        {item.name}
      </span>
      <span className="text-[#ce9178] opacity-80">&quot;</span>

      {/* VS Code Property Indicator */}
      <span className="text-[#808080] text-[10px] ml-0.5 opacity-40 group-hover/card:opacity-100 transition-opacity">
        : true
      </span>
    </div>
  );
};