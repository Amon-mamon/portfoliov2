"use client";

import useSWR from "swr";
import { VscArrowRight } from "react-icons/vsc";
import { ProjectItem } from "@/types/project";
import { TECH_COUNT } from "@/components/tech-stack-minimalist";
import { BrowserBar, getProjectImages } from "./ProjectShowcase";
import { CountUp } from "./Reveal";

const GITHUB_USER = "Amon-mamon";
const delay = (ms: number) => ({ ["--mv-delay" as string]: `${ms}ms` }) as React.CSSProperties;

/* ─────────────────────────── Availability stamp ─────────────────────────── */

/** Rotating circular "open to work" stamp. */
export function AvailabilityStamp({
  onClick,
  className = "",
  idSuffix,
}: {
  onClick: () => void;
  className?: string;
  idSuffix: string;
}) {
  const pathId = `stamp-path-${idSuffix}`;
  const text = "OPEN TO WORK • FULL-TIME & CONTRACTS • ";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open to work: full-time roles and contracts. Go to contact."
      className={`group relative block cursor-pointer ${className}`}
    >
      {/* solid backing disc so the stamp reads clearly on top of screenshots */}
      <span
        aria-hidden
        className="absolute inset-[6%] rounded-full bg-paper shadow-[0_12px_30px_-12px_rgba(22,19,15,0.45)]"
      />
      <svg
        viewBox="0 0 200 200"
        aria-hidden
        className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite] group-hover:[animation-duration:6s] motion-reduce:animate-none"
      >
        <defs>
          <path
            id={pathId}
            d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
          />
        </defs>
        <text className="fill-ink text-[15px] font-bold tracking-[0.16em]">
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex h-[34%] w-[34%] items-center justify-center rounded-full bg-ink text-paper transition-colors duration-300 group-hover:bg-ember-deep">
        <span className="relative flex h-3 w-3 transition-opacity duration-200 group-hover:opacity-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
        </span>
        <VscArrowRight className="absolute rotate-45 text-xl opacity-0 transition-all duration-300 group-hover:rotate-90 group-hover:opacity-100" />
      </span>
    </button>
  );
}

/* ─────────────────────────── Project stack ─────────────────────────── */

// Resting and hover ("fanned out") positions for up to three cards, front card first.
const CARD_STYLES = [
  "z-30 right-[4%] bottom-[2%] rotate-[-2deg] group-hover/stack:rotate-0 group-hover/stack:-translate-y-2",
  "z-20 left-0 top-[16%] rotate-[-8deg] group-hover/stack:rotate-[-12deg] group-hover/stack:-translate-x-6",
  "z-10 right-0 top-0 rotate-[6deg] group-hover/stack:rotate-[10deg] group-hover/stack:translate-x-4 group-hover/stack:-translate-y-4",
];

/** Fanned stack of the latest project screenshots: real work, front and centre. */
export function ProjectStack({
  projects,
  onOpen,
  onStampClick,
}: {
  projects: ProjectItem[];
  onOpen: () => void;
  onStampClick: () => void;
}) {
  const cards = projects
    .map((p) => ({ project: p, cover: getProjectImages(p)[0] }))
    .filter((c): c is { project: ProjectItem; cover: string } => Boolean(c.cover))
    .slice(0, 3);

  if (cards.length === 0) {
    return (
      <div
        className="mv-rise flex h-full items-center justify-center"
        style={delay(400)}
      >
        <AvailabilityStamp
          idSuffix="stack"
          onClick={onStampClick}
          className="h-56 w-56"
        />
      </div>
    );
  }

  const latest = cards[0].project;

  return (
    <div className="relative h-[460px] xl:h-[500px]">
      <button
        type="button"
        onClick={onOpen}
        aria-label="See my projects"
        className="group/stack absolute inset-0 cursor-pointer"
      >
        {cards
          .map(({ project, cover }, i) => (
            <span
              key={project.id}
              className={`mv-rise absolute block w-[80%] ${CARD_STYLES[i]} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]`}
              style={delay(350 + (cards.length - i) * 140)}
            >
              <span className="block overflow-hidden rounded-2xl bg-paper-deep shadow-[0_30px_60px_-25px_rgba(22,19,15,0.55)]">
                <BrowserBar title={project.project_title} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cover}
                  alt={`${project.project_title} screenshot`}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  className="block aspect-[16/10] w-full object-cover object-top"
                />
              </span>
            </span>
          ))
          .reverse()}

        {/* Caption on the front card */}
        <span
          className="mv-rise absolute bottom-[-4%] right-[8%] z-40 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper shadow-lg transition-colors group-hover/stack:bg-ember-deep"
          style={delay(900)}
        >
          Latest: {latest.project_title}
          <VscArrowRight className="transition-transform group-hover/stack:translate-x-1" />
        </span>
      </button>

      <div
        className="mv-rise absolute -left-10 bottom-6 z-40"
        style={delay(1000)}
      >
        <AvailabilityStamp
          idSuffix="stack"
          onClick={onStampClick}
          className="h-36 w-36 xl:h-40 xl:w-40"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────── Proof numbers ─────────────────────────── */

/* ─────────────────────────── Proof numbers ─────────────────────────── */

type GitHubSummary = { totalContributions?: number };
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export type HeroStat = {
  key: string;
  value: number;
  suffix: string;
  label: string;
};

/** Shared data: any page can call this and style the result however it wants. */
export function useHeroStats(projectCount: number): HeroStat[] {
  // Same SWR key as GitHubActivityMinimalist, so this is a single shared request.
  const { data } = useSWR<GitHubSummary>(
    `/api/github?username=${GITHUB_USER}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    },
  );
  const contributions = data?.totalContributions;

  return [
    typeof contributions === "number" &&
      contributions > 0 && {
        key: "contributions",
        value: contributions,
        suffix: "+",
        label: "GitHub contributions this year",
      },
    {
      key: "technologies",
      value: TECH_COUNT,
      suffix: "",
      label: "Technologies in my stack",
    },
    {
      key: "projects",
      value: projectCount,
      suffix: "",
      label: "Projects shipped",
    },
  ].filter(Boolean) as HeroStat[];
}

/** Minimalist design (unchanged look). */
export function HeroStats({ projectCount }: { projectCount: number }) {
  const stats = useHeroStats(projectCount);

  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-6">
      {stats.map((s) => (
        <div key={s.key} className="min-w-[7rem]">
          <dd className="text-4xl font-bold tracking-tight text-ink">
            <CountUp value={s.value} />
            <span className="text-ember">{s.suffix}</span>
          </dd>
          <dt className="mt-1 max-w-[10rem] text-sm font-medium leading-snug text-stone-warm">
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
