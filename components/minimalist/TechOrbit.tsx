import { useState } from "react";
import { ALL_TECH } from "../tech-stack-minimalist";

export default function TechOrbit() {
  const [active, setActive] = useState<string | null>(null);
const MARQUEE_NAMES = [
  "React.js", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS",
  "Supabase", "Python", "Django", "Docker", "GSAP", "Vercel",
];
const MARQUEE = MARQUEE_NAMES.map((n) => ALL_TECH.find((t) => t.name === n)).filter(
  (t): t is (typeof ALL_TECH)[number] => Boolean(t)
);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="group/orbit relative mx-auto aspect-square w-full max-w-[26rem] sm:max-w-[32rem]">
        <span aria-hidden className="absolute inset-[10%] rounded-full border-2 border-dashed border-ink/20" />

        {/* Center label */}
        <span className="absolute inset-0 m-auto flex h-[38%] w-[38%] items-center justify-center rounded-full bg-ink p-4 text-center text-lg font-bold leading-tight text-paper sm:text-2xl">
          {active ?? `${MARQUEE.length} tools`}
        </span>

        {/* Spinning ring */}
        <ul className="absolute inset-0 animate-[spin_50s_linear_infinite] group-hover/orbit:[animation-play-state:paused] motion-reduce:animate-none">
          {MARQUEE.map(({ name, icon: Icon }, i) => {
            const a = (i / MARQUEE.length) * 2 * Math.PI;
            return (
              <li
                key={name}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${50 + 40 * Math.sin(a)}%`, top: `${50 - 40 * Math.cos(a)}%` }}
              >
                <button
                  type="button"
                  aria-label={name}
                  onMouseEnter={() => setActive(name)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(name)}
                  onBlur={() => setActive(null)}
                  className="block animate-[spin_50s_linear_infinite_reverse] rounded-full bg-paper-deep p-3 text-ink shadow-md transition-colors hover:bg-ember-deep hover:text-white group-hover/orbit:[animation-play-state:paused] motion-reduce:animate-none sm:p-4"
                >
                  <Icon className="text-2xl sm:text-3xl" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}