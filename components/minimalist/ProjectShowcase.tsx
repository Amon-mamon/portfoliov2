"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  VscArrowRight,
  VscChevronLeft,
  VscChevronRight,
  VscClose,
  VscLinkExternal,
  VscLock,
} from "react-icons/vsc";
import { ProjectItem } from "@/types/project";
import { setSmoothScrollPaused } from "./SmoothScroll";

// Same image parsing rules as the VS Code theme's ProjectCard
export function getProjectImages(project: ProjectItem): string[] {
  if (project.project_images?.length) return project.project_images;
  if (typeof project.project_image === "string" && project.project_image.includes(",")) {
    return project.project_image.split(",").map((img) => img.trim()).filter(Boolean);
  }
  return [project.project_image].filter((img): img is string => Boolean(img));
}

/** Fake browser chrome: makes screenshots and cards read as real apps. */
export function BrowserBar({ title }: { title?: string }) {
  return (
    <span className="flex items-center gap-1.5 bg-ink px-3.5 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      {title && <span className="ml-3 truncate text-[11px] font-medium text-paper/70">{title}</span>}
    </span>
  );
}

function splitStack(stack?: string) {
  return stack ? stack.split(",").map((t) => t.trim()).filter(Boolean) : [];
}

/** Uses `project_url`, the same field as the VS Code theme's "Demo" button. */
export function DemoButton({ url }: { url?: string | null }) {
  if (!url) {
    return (
      <span
        className="inline-flex items-center gap-2 rounded-full bg-paper-deep px-5 py-3 text-sm font-medium text-stone-warm"
        title="Client / proprietary build: no public demo"
      >
        <VscLock />
        Private client project
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="group/demo inline-flex items-center gap-2 rounded-full bg-ember-deep hover:bg-ink text-white px-5 py-3 text-sm font-semibold transition-colors"
    >
      Live demo
      <VscLinkExternal className="transition-transform duration-300 group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5" />
    </a>
  );
}

export function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: ProjectItem;
  index: number;
  onOpen: () => void;
}) {
  const images = getProjectImages(project);
  const cover = images[0];
  const stack = splitStack(project.project_stack);
  const flip = index % 2 === 1;

  return (
    <article className="grid items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
      {/* Image */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${project.project_title} screenshots`}
        className={`group relative block cursor-pointer lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
      >
        <span
          className={`block overflow-hidden rounded-2xl bg-paper-deep shadow-[0_30px_60px_-28px_rgba(22,19,15,0.5)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-0 group-hover:-translate-y-1 ${
            flip ? "rotate-[1.5deg]" : "rotate-[-1.5deg]"
          }`}
        >
        <BrowserBar title={project.project_title} />
        <div className="aspect-[16/10] overflow-hidden">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt={`${project.project_title} screenshot`}
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-ember-soft">
              <span className="text-7xl font-bold text-ember">{project.project_title.slice(0, 1)}</span>
            </div>
          )}
        </div>
        </span>
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          View screenshots{images.length > 1 ? ` (${images.length})` : ""}
          <VscArrowRight />
        </span>
      </button>

      {/* Text */}
      <div className={`space-y-5 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="flex items-baseline gap-4">
          <span className="text-5xl font-bold leading-none tracking-tight text-ember sm:text-6xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-semibold text-ember-deep">{project.project_type || "Web Application"}</span>
        </p>
        <h3 className="text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl lg:text-5xl">
          {project.project_title}
        </h3>
        {project.project_description && (
          <p className="text-base sm:text-lg leading-relaxed text-ink-soft">{project.project_description}</p>
        )}

        {stack.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-warm">Built with</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <li key={tech} className="rounded-full bg-paper-deep px-3 py-1 text-sm font-medium text-ink">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <DemoButton url={project.project_url} />
          <button
            type="button"
            onClick={onOpen}
            className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-ink hover:bg-paper-deep transition-colors cursor-pointer"
          >
            Details
            <VscArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProjectModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const images = getProjectImages(project);
  const stack = splitStack(project.project_stack);
  const [active, setActive] = useState(0);
  const count = Math.max(images.length, 1);

  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setActive((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    setSmoothScrollPaused(true);
    return () => setSmoothScrollPaused(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (images.length > 1 && e.key === "ArrowRight") next();
      if (images.length > 1 && e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, next, prev, images.length]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={project.project_title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-paper shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 rounded-full bg-ink p-2.5 text-white hover:bg-ember-deep transition-colors cursor-pointer"
        >
          <VscClose className="text-lg" />
        </button>

        {images.length > 0 && (
          <div className="relative bg-night">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={active}
              src={images[active]}
              alt={`${project.project_title} screenshot ${active + 1}`}
              className="w-full max-h-[55vh] object-contain animate-in fade-in duration-300"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-paper p-2.5 text-ink hover:bg-paper-deep cursor-pointer"
                >
                  <VscChevronLeft className="text-lg" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-paper p-2.5 text-ink hover:bg-paper-deep cursor-pointer"
                >
                  <VscChevronRight className="text-lg" />
                </button>
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Show screenshot ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        i === active ? "w-6 bg-ember" : "w-1.5 bg-paper/60 hover:bg-paper"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="space-y-6 p-6 sm:p-10">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-ember-deep">{project.project_type || "Web Application"}</p>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">{project.project_title}</h3>
          </div>

          {project.project_description && (
            <p className="max-w-2xl text-base leading-relaxed text-ink-soft">{project.project_description}</p>
          )}

          {stack.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <li key={tech} className="rounded-full bg-paper-deep px-3 py-1 text-sm font-medium text-ink">
                  {tech}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <DemoButton url={project.project_url} />
            <button
              onClick={onClose}
              className="rounded-full px-5 py-3 text-sm font-semibold text-ink hover:bg-paper-deep transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
