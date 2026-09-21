"use client"

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity"
// adjust the import path to wherever scroll-based-velocity.tsx lives

const SKILLS = [
  "ReactJS",
  "NextJS",
  "TypeScript",
  "NodeJS",
  "Tailwind CSS",
  "Supabase",
  "PostgreSQL",
  "Git",
]

// Optional: colored chip look per skill. Delete if you want plain text.
const SKILL_STYLES: Record<string, string> = {
  ReactJS:      "text-cyan-300 ring-cyan-500/40 bg-cyan-950/30",
  NextJS:       "text-white ring-white/30 bg-white/5",
  TypeScript:   "text-blue-300 ring-blue-500/40 bg-blue-950/30",
  NodeJS:       "text-green-300 ring-green-500/40 bg-green-950/30",
  "Tailwind CSS": "text-sky-300 ring-sky-500/40 bg-sky-950/30",
  Supabase:     "text-emerald-300 ring-emerald-500/40 bg-emerald-950/30",
  PostgreSQL:   "text-indigo-300 ring-indigo-500/40 bg-indigo-950/30",
  Git:          "text-orange-300 ring-orange-500/40 bg-orange-950/30",
}


const TechStack = () => {
  return (
    <section className="relative py-16 bg-[#121314] overflow-hidden">
      {/* Optional: soft edge fades so items don't pop in/out at the borders */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#121314] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#121314] to-transparent" />

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white">Tech Stack</h2>
      </div>

      <ScrollVelocityContainer>
        {/* Row 1 — drifts right */}
        <ScrollVelocityRow baseVelocity={4} direction={1} pauseOnHover
        className="transition-opacity duration-300 group-hover:opacity-90"
        >
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className={`mx-3 inline-flex items-center rounded-lg px-12 py-4 text-sm font-semibold ring-1 ring-inset ${
                SKILL_STYLES[skill] ?? "text-gray-200 ring-gray-700 bg-gray-900"
              }`}
            >
              {skill}
            </span>
          ))}
          {/* Optional trailing separator so the seam looks intentional */}
        </ScrollVelocityRow>

        {/* Row 2 — drifts left, opposite direction */}
        <ScrollVelocityRow baseVelocity={4} direction={-1} className="mt-6 transition-opacity duration-300 group-hover:opacity-90" pauseOnHover>
          {SKILLS.map((skill) => (
            <span
              key={`b-${skill}`}
              className={`mx-3 inline-flex items-center rounded-lg px-12 py-4 text-sm font-semibold ring-1 ring-inset ${
                SKILL_STYLES[skill] ?? "text-gray-200 ring-gray-700 bg-gray-900"
              }`}
            >
              {skill}
            </span>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  )
}

export default TechStack