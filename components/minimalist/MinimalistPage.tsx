"use client";

import React, { useState } from "react";
import {
  VscArrowRight,
  VscFilePdf,
} from "react-icons/vsc";

import { ProjectItem } from "@/types/project";
import MinimalisticNav, { MV_SCROLL_ID } from "@/components/common/MinimalisticNav";
import { MinimalisticFooter } from "@/components/common/MinimalisticFooter";
import TechStackMinimalist, { ALL_TECH } from "@/components/tech-stack-minimalist";
import GitHubActivityMinimalist from "@/components/github-activity-minimalist";
import { BrowserBar, ProjectModal, ProjectRow } from "./ProjectShowcase";
import { Reveal } from "./Reveal";
import { SmoothScroll, scrollToId } from "./SmoothScroll";
import { AvailabilityStamp, HeroStats, ProjectStack } from "./HeroShowcase";
import WhatIDo from "./WhatIDo";
import ContactSection from "./ContactSection";

const QUICK_FACTS = [
  { label: "Role", value: "Full-Stack Developer" },
  { label: "Location", value: "Central Luzon, Philippines" },
  { label: "Availability", value: "Open to full-time roles & contracts" },
  { label: "Main stack", value: "React, Next.js, TypeScript, Node.js, PostgreSQL" },
];

const MARQUEE_NAMES = [
  "React.js", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS",
  "Supabase", "Python", "Django", "Docker", "GSAP", "Vercel",
];
const MARQUEE = MARQUEE_NAMES.map((n) => ALL_TECH.find((t) => t.name === n)).filter(
  (t): t is (typeof ALL_TECH)[number] => Boolean(t)
);

const delay = (ms: number) => ({ ["--mv-delay" as string]: `${ms}ms` }) as React.CSSProperties;

/** Big statement heading with an ember underline that draws in on scroll (matches the hero). */
function SectionHeading({
  label,
  title,
  highlight,
  intro,
  className = "",
}: {
  label: string;
  title: string;
  highlight?: string;
  intro?: string;
  className?: string;
}) {
  const [before, after] = highlight ? title.split(highlight) : [title, ""];
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <p className="flex items-center gap-2.5 text-base font-semibold text-ember-deep">
        <span className="h-2 w-2 rounded-full bg-ember" />
        {label}
      </p>
      <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.08] text-ink">
        {before}
        {highlight && (
          <span className="relative inline-block">
            {highlight}
            <span aria-hidden className="mv-underline-reveal absolute -bottom-0.5 left-0 h-1.5 sm:h-2 w-full rounded-full bg-ember/70" />
          </span>
        )}
        {after}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{intro}</p>}
    </Reveal>
  );
}

export default function MinimalistPage({ initialProjects }: { initialProjects: ProjectItem[] }) {
  const [activeModal, setActiveModal] = useState<ProjectItem | null>(null);
  const projects = initialProjects;

  const scrollTo = scrollToId;

  return (
    <div
      id={MV_SCROLL_ID}
      className="h-full overflow-y-auto overflow-x-hidden bg-paper text-ink antialiased selection:bg-ember selection:text-white"
    >
      <SmoothScroll wrapperId={MV_SCROLL_ID} contentId="mv-content" />
      <MinimalisticNav />
      <div id="mv-content">
        {/* ───────────── HERO ───────────── */}
        <section
          id="home"
          className="mx-auto max-w-7xl px-5 sm:px-6 pt-28 pb-12 sm:pt-36 sm:pb-18 lg:pb-40"
        >
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left: who I am */}
            <div className="lg:col-span-7">
              <div className="mv-rise lg:hidden" style={delay(500)}>
                <AvailabilityStamp
                  idSuffix="hero"
                  onClick={() => scrollTo("contact")}
                  className="h-28 w-28 sm:h-32 sm:w-32"
                />
              </div>
              <h1
                className="mv-rise mt-6 lg:mt-0 text-[clamp(2.5rem,11vw,5.5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-ink"
                style={delay(100)}
              >
                Vince Stephen
                <br />
                David<span className="text-ember">.</span>
              </h1>

              <p
                className="mv-rise mt-5 text-xl sm:text-3xl font-semibold text-ink"
                style={delay(220)}
              >
                <span className="relative inline-block">
                  Full-Stack Developer
                  <span
                    aria-hidden
                    className="mv-underline absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-ember/70"
                  />
                </span>
              </p>

              <p
                className="mv-rise mt-6 max-w-xl text-base sm:text-xl leading-relaxed text-ink-soft"
                style={delay(320)}
              >
                I build fast, reliable web applications, from clean user
                interfaces to the APIs and databases behind them. Based in the
                Philippines, working with teams anywhere.
              </p>

              <div
                className="mv-rise mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
                style={delay(420)}
              >
                <button
                  onClick={() => scrollTo("projects")}
                  className="group inline-flex items-center gap-3 cursor-pointer relative overflow-hidden bg-ember-deep px-5 py-4 text-sm font-medium transition-all duration-500 rounded-full hover:pr-6"
                >
                  <span className="relative z-15 text-white">
                    View my projects
                  </span>
                  <VscArrowRight className="text-white text-lg relative z-15 transition-transform group-hover:translate-x-1" />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0  bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100"
                  ></span>
                </button>
                <a
                  href="/DAVID_VINCE_STEPHEN_CV.pdf"
                  download
                  className="group relative inline-flex items-center gap-2 py-2 text-base font-semibold text-ink"
                >
                  <VscFilePdf className="text-ember-deep transition-transform duration-300 group-hover:-translate-y-1" />
                  Download CV
                  <span
                    aria-hidden
                    className="absolute left-0 bottom-0 h-0.5 w-full origin-right scale-x-100 bg-ink/25 transition-transform duration-300 group-hover:scale-x-0"
                  />
                  <span
                    aria-hidden
                    className="absolute left-0 bottom-0 h-0.5 w-full origin-left scale-x-0 bg-ember transition-transform duration-300 delay-150 group-hover:scale-x-100"
                  />
                </a>
              </div>

              <div className="mv-rise mt-10 sm:mt-12" style={delay(560)}>
                <HeroStats projectCount={projects.length} />
              </div>
            </div>

            {/* Right: proof, the actual work */}
            <div className="hidden lg:block lg:col-span-5">
              <ProjectStack
                projects={projects}
                onOpen={() => scrollTo("projects")}
                onStampClick={() => scrollTo("contact")}
              />
            </div>
          </div>
        </section>

        {/* ───────────── ABOUT ───────────── */}
        <section
          id="about"
          className="mx-auto max-w-7xl px-5 sm:px-6 py-12 sm:py-14 lg:py-16"
        >
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <SectionHeading
                label="About me"
                title="I build products people enjoy using."
                highlight="enjoy using"
              />
              <Reveal
                delay={120}
                className="mt-8 space-y-5 text-lg sm:text-xl leading-relaxed text-ink-soft"
              >
                <p>
                  I&apos;m a full-stack developer who enjoys the{" "}
                  <span className="font-semibold text-ink">whole journey</span>{" "}
                  of a product: turning an idea into a clear interface, wiring
                  it to a solid back-end, and shipping it to real users.
                </p>
                <p>
                  I care about{" "}
                  <span className="font-semibold text-ink">
                    quality and maintainability
                  </span>
                  : clean code, sensible database design and proven practices,
                  so what I build keeps working long after launch.
                </p>
              </Reveal>
            </div>

            {/* Profile card: same "app window" language as the hero */}
            <Reveal delay={200} className="lg:col-span-5">
              <div className="group rotate-2 overflow-hidden rounded-2xl bg-ink text-paper shadow-[0_40px_80px_-35px_rgba(22,19,15,0.6)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-0">
                <BrowserBar title="vince.profile" />
                <dl className="space-y-6 p-7 sm:p-9">
                  {QUICK_FACTS.map((f) => (
                    <div key={f.label}>
                      <dt className="text-sm font-semibold text-paper/60">
                        {f.label}
                      </dt>
                      <dd className="mt-1 flex items-center gap-2.5 text-lg font-semibold text-paper">
                        {f.label === "Availability" && (
                          <span className="relative flex h-2.5 w-2.5 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                          </span>
                        )}
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          {/* What I do: interactive showcase */}
          <div className="mt-16 sm:mt-20">
            <SectionHeading
              label="What I do"
              title="From first pixel to production."
              highlight="production"
            />
            <div className="mt-10 sm:mt-12">
              <WhatIDo />
            </div>
          </div>

          <Reveal className="mt-14 sm:mt-16">
            <GitHubActivityMinimalist username="Amon-mamon" />
          </Reveal>
        </section>

        {/* ───────────── SKILLS ───────────── */}
        <section id="skills">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 py-12 sm:py-14 lg:py-16">
            <SectionHeading
              label="Skills"
              title="Tools I use to build and ship."
              highlight="build and ship"
              intro={`${ALL_TECH.length} technologies across the whole product, from the interface to the database and the deploy.`}
            />
            <div className="mt-10 sm:mt-12">
              <TechStackMinimalist />
            </div>
          </div>
        </section>

        {/* ───────────── PROJECTS ───────────── */}
        <section
          id="projects"
          className="mx-auto max-w-7xl px-5 sm:px-6 py-12 sm:py-14 lg:py-16"
        >
          <SectionHeading
            label="Projects"
            title="Selected work I'm proud of."
            highlight="proud of"
            intro="Personal products and client builds. Open a live demo, or view screenshots and details. Some client projects are private."
          />

          {projects.length > 0 ? (
            <div className="mt-10 space-y-16 sm:mt-12 sm:space-y-20 lg:space-y-24">
              {projects.map((project, i) => (
                <Reveal key={project.id}>
                  <ProjectRow
                    project={project}
                    index={i}
                    onOpen={() => setActiveModal(project)}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-10 rounded-3xl bg-paper-deep py-12 text-center text-lg text-ink-soft">
              Projects are being updated. Check back soon, or{" "}
              <a
                href="https://github.com/Amon-mamon"
                className="font-semibold text-ember-deep underline underline-offset-4"
              >
                see my GitHub
              </a>
              .
            </p>
          )}
        </section>

        {/* ───────────── CONTACT ───────────── */}
        <section id="contact">
          <ContactSection />
        </section>

        <MinimalisticFooter />
      </div>

      {activeModal && (
        <ProjectModal
          project={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
