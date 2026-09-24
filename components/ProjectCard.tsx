"use client";

import { ProjectItem } from "@/types/project";
import { useState, useEffect, useCallback } from "react";
import {
  VscChevronDown,
  VscChevronUp,
  VscCode,
  VscEye,
  VscLinkExternal,
  VscClose,
  VscLock,
  VscChevronLeft,
  VscChevronRight,
  VscCircleFilled,
} from "react-icons/vsc";
import { Lens } from "./ui/lens";

export interface MultiImageProjectItem extends ProjectItem {
  project_images?: string[];
  is_active?: boolean; // Added status boolean
}

const ProjectCard = ({ project }: { project: MultiImageProjectItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Default to true if not specified
  const isActive = project.is_active ?? true;

  // Parse images into a clean array
  const images: string[] = project.project_images?.length
    ? project.project_images
    : typeof project.project_image === "string" && project.project_image.includes(",")
    ? project.project_image.split(",").map((img) => img.trim())
    : [project.project_image].filter((img): img is string => Boolean(img));

  const formattedFilename = `${project.project_title
    .toLowerCase()
    .replace(/\s+/g, "_")}.tsx`;

  // Gallery Navigation Handlers
  const handleNext = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard Navigation (Arrow Keys & ESC)
  useEffect(() => {
    if (!isPreviewOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPreviewOpen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPreviewOpen, handleNext, handlePrev]);

  return (
    <>
      <div className="group bg-[#1e1e1e] border border-[#2b2b2b] hover:border-[#569cd6]/60 rounded-xl overflow-hidden transition-all duration-300 flex flex-col shadow-xl hover:shadow-2xl">
        {/* VS Code File Top Header */}
        <div className="bg-[#252526] px-3.5 py-2 border-b border-[#2b2b2b] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 min-w-0">
            <VscCode className="text-[#569cd6] shrink-0" />
            <span className="text-[#cccccc] font-semibold truncate">
              {formattedFilename}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Active / Inactive Indicator Badge */}
            <span
              className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-mono ${
                isActive
                  ? "bg-[#132a13] text-[#89b4fa] border-[#2a4d2a]"
                  : "bg-[#2a1313] text-[#808080] border-[#4d2a2a]"
              }`}
            >
              <VscCircleFilled
                className={`text-[8px] ${
                  isActive ? "text-[#4ec9b0] animate-pulse" : "text-[#808080]"
                }`}
              />
              {isActive ? "Active" : "Archived"}
            </span>

            <span className="text-[#ce9178] bg-[#181818] px-2 py-0.5 rounded border border-[#3c3c3c] text-[10px] font-mono">
              {project.project_type || "Web App"}
            </span>
          </div>
        </div>

        {/* Cover Image Showcase */}
        <div className="relative bg-[#181818] border-b border-[#2b2b2b] overflow-hidden aspect-video group/img">
          <Lens containerClassname="w-full h-full [&>div]:w-full [&>div]:h-full">
            <img
              src={images[0]}
              alt={project.project_title}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </Lens>

          {/* Quick Trigger Badge */}
          <button
            onClick={() => {
              setActiveImageIndex(0);
              setIsPreviewOpen(true);
            }}
            className="absolute bottom-2 right-2 bg-[#1e1e1e]/90 hover:bg-[#0e639c] text-white px-2.5 py-1 rounded-md border border-[#3c3c3c] text-xs font-mono flex items-center gap-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer z-10"
          >
            <VscEye />
            <span>
              View Screenshots {images.length > 1 ? `(${images.length})` : ""}
            </span>
          </button>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-1 space-y-4 font-mono">
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-[#4ec9b0] transition-colors mb-1.5 font-sans">
              {project.project_title}
            </h3>

            {/* Description Text */}
            <p
              className={`text-[#a0a0a0] text-xs leading-relaxed font-sans ${
                !isExpanded ? "line-clamp-3" : ""
              }`}
            >
              {project.project_description}
            </p>

            {/* Read More Toggle */}
            {project.project_description &&
              project.project_description.length > 110 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 flex items-center gap-1 text-[11px] text-[#569cd6] hover:text-[#4ec9b0] font-mono transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{isExpanded ? "// see_less" : "// see_more"}</span>
                  {isExpanded ? <VscChevronUp /> : <VscChevronDown />}
                </button>
              )}
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {project.project_stack?.split(",").map((tag: string) => (
              <span
                key={tag}
                className="bg-[#252526] text-[#9cdcfe] text-[10px] font-mono px-2 py-0.5 rounded border border-[#3c3c3c]"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>

          {/* Direct Action Bar */}
          <div className="flex items-center gap-2 pt-3 border-t border-[#2b2b2b] mt-auto font-mono text-xs">
            <button
              onClick={() => {
                setActiveImageIndex(0);
                setIsPreviewOpen(true);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#252526] hover:bg-[#2d2d2d] border border-[#3c3c3c] text-[#cccccc] py-1.5 px-3 rounded-md transition-colors cursor-pointer"
            >
              <VscEye className="text-[#569cd6]" />
              <span>
                View Screenshots {images.length > 1 ? `(${images.length})` : ""}
              </span>
            </button>

            {project.live_url ? (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-[#0e639c] hover:bg-[#1177bb] text-white py-1.5 px-3 rounded-md transition-colors"
                title="Live Preview"
              >
                <VscLinkExternal />
                <span>Demo</span>
              </a>
            ) : (
              <div
                className="flex items-center gap-1 text-[11px] text-[#808080] bg-[#181818] px-2.5 py-1.5 rounded-md border border-[#2b2b2b]"
                title="Proprietary Codebase"
              >
                <VscLock className="text-[#ce9178]" />
                <span>Private</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Multi-Image Gallery Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800/10 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-[#1e1e1e]/10 border border-[#2b2b2b] rounded-xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh] font-mono">
            {/* Modal Top Bar */}
            <div className="bg-[#252526] px-4 py-2.5 border-b border-[#2b2b2b] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="text-[#808080] ml-2">gallery/</span>
                <span className="text-white font-semibold truncate max-w-[200px] sm:max-w-xs">
                  {project.project_title}
                </span>
                <span className="text-[#ce9178] bg-[#181818] px-2 py-0.5 rounded border border-[#2b2b2b] text-[10px]">
                  {activeImageIndex + 1} / {images.length}
                </span>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-[#808080] hover:text-white transition-colors p-1 rounded hover:bg-[#333333] cursor-pointer"
              >
                <VscClose className="text-lg" />
              </button>
            </div>

            {/* Main Stage View with Next/Prev Controls */}
            <div className="relative p-4 bg-[#181818] flex-1 min-h-[300px] flex items-center justify-center overflow-hidden">
              <img
                src={images[activeImageIndex]}
                alt={`${project.project_title} screenshot ${activeImageIndex + 1}`}
                className="max-w-full max-h-[60vh] object-contain border border-[#2b2b2b] transition-all duration-300"
              />

              {/* Prev / Next Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#1e1e1e]/90 hover:bg-[#0e639c] text-white p-2 rounded-full border border-[#3c3c3c] transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <VscChevronLeft className="text-xl" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#1e1e1e]/90 hover:bg-[#0e639c] text-white p-2 rounded-full border border-[#3c3c3c] transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <VscChevronRight className="text-xl" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {images.length > 1 && (
              <div className="bg-[#181818] px-4 py-2 border-t border-[#2b2b2b] flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-[#333333]">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-10 rounded border overflow-hidden shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-[#569cd6] ring-1 ring-[#569cd6] opacity-100"
                        : "border-[#2b2b2b] opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Modal Footer Description */}
            <div className="bg-[#252526] p-4 border-t border-[#2b2b2b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <p className="text-white font-bold">{project.project_title}</p>
                <p className="text-[#a0a0a0] text-[11px] font-sans mt-0.5">
                  {project.project_description}
                </p>
              </div>
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0e639c] hover:bg-[#1177bb] text-white px-4 py-2 rounded-md transition-colors shrink-0 flex items-center gap-2"
                >
                  <VscLinkExternal />
                  <span>Visit App</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;