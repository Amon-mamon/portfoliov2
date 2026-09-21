"use client";

import { Lens } from "@/components/ui/lens";
import { useEffect, useState } from "react";
import { 
  VscGithubAlt, 
  VscLinkExternal, 
  VscCode, 
  VscChevronDown, 
  VscChevronUp 
} from "react-icons/vsc";

interface ProjectItem {
  id: string | number;
  project_title: string;
  project_type: string;
  project_description: string;
  project_stack?: string;
  project_image: string;
  live_url?: string;
  github_url?: string;
}

// Separate component to handle individual expandable description state
const ProjectCard = ({ project }: { project: ProjectItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group bg-[#181818] border border-[#2b2b2b] hover:border-[#007acc] rounded-lg overflow-hidden transition-all duration-300 flex flex-col shadow-xl">
      {/* File Top Bar */}
      <div className="bg-[#252526] px-3 py-1.5 border-b border-[#2b2b2b] flex items-center justify-between text-[11px] text-[#808080]">
        <div className="flex items-center gap-1.5 truncate">
          <VscCode className="text-[#4ec9b0]" />
          <span className="text-[#cccccc] font-semibold truncate">
            {project.project_title.toLowerCase().replace(/\s+/g, '-')}.tsx
          </span>
        </div>
        <span className="text-[#569cd6] bg-[#1e1e1e] px-2 py-0.5 rounded border border-[#3c3c3c] shrink-0">
          {project.project_type || "Web App"}
        </span>
      </div>

      {/* Image Preview Lens Container */}
      <div className="relative bg-[#1e1e1e] overflow-hidden border-b border-[#2b2b2b]">
        <Lens containerClassname="w-full h-full [&>div]:w-full [&>div]:h-full">
          <img
            src={project.project_image}
            alt={project.project_title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Lens>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 space-y-4">
        
        {/* Title & Description */}
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#4ec9b0] transition-colors mb-2">
            {project.project_title}
          </h3>
          
          {/* Description Text */}
          <p className={`text-[#808080] text-xs leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
            {project.project_description}
          </p>

          {/* Toggle Expand Button */}
          {project.project_description && project.project_description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1.5 flex items-center gap-1 text-[11px] text-[#569cd6] hover:text-[#4ec9b0] font-mono transition-colors focus:outline-none"
            >
              <span>{isExpanded ? "// See Less" : "// See More"}</span>
              {isExpanded ? <VscChevronUp /> : <VscChevronDown />}
            </button>
          )}
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.project_stack?.split(",").map((tag: string) => (
            <span
              key={tag}
              className="bg-[#252526] text-[#9cdcfe] text-[11px] font-mono px-2 py-0.5 rounded border border-[#3c3c3c]"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>

        {/* Direct Action Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-[#2b2b2b] mt-auto">
          <a
            href={project.live_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#0e639c] hover:bg-[#1177bb] text-white py-1.5 px-3 rounded text-xs transition-colors"
          >
            <VscLinkExternal />
            <span>./preview</span>
          </a>
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#2d2d2d] hover:bg-[#3c3c3c] border border-[#3c3c3c] text-[#cccccc] hover:text-white py-1.5 px-3 rounded text-xs transition-colors"
          >
            <VscGithubAlt />
            <span>Source</span>
          </a>
        </div>

      </div>
    </div>
  );
};

const Project = () => {
  const [projects, setProjects] = useState<ProjectItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/project");
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message || "Error fetching projects");
        }
        setProjects(result);
      } catch (err: any) {
        setError(err.message || "Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 text-[#d4d4d4] font-mono text-xs sm:text-sm select-none space-y-8">
      
      {/* ── IDE Header ───────────────────────────────── */}
      <div className="pb-4 border-b border-[#2b2b2b] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-[#569cd6]">const</span> project = <span className="text-[#ce9178]">&apos;[All_Projects]&apos;</span>
          </h1>
        </div>
        <p className="text-[#808080] text-xs max-w-md">
          &#47;&#47; Complete showcase of repositories, client builds, and experimental full-stack applications.
        </p>
      </div>

      {/* ── Loading Skeleton State ─────────────────────── */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#181818] border border-[#2b2b2b] rounded-lg p-5 space-y-4 animate-pulse">
              <div className="h-44 bg-[#252526] rounded" />
              <div className="h-5 bg-[#252526] rounded w-3/4" />
              <div className="h-4 bg-[#252526] rounded w-full" />
              <div className="h-4 bg-[#252526] rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {/* ── Error State ───────────────────────────────── */}
      {error && (
        <div className="bg-[#181818] border border-[#f14c4c] text-[#f14c4c] p-4 rounded-lg text-center">
          <p>&#47;&#47; Error: {error}</p>
        </div>
      )}

      {/* ── Projects Grid Layout ──────────────────────── */}
      {!loading && !error && projects && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Project;