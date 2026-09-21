"use client";

import ProjectCard from "@/components/ProjectCard";
import { Lens } from "@/components/ui/lens";
import { ProjectItem } from "@/types/project";
import { useEffect, useState } from "react";
import { 
  VscGithubAlt, 
  VscLinkExternal, 
  VscCode, 
  VscChevronDown, 
  VscChevronUp 
} from "react-icons/vsc";

// Separate component to handle individual expandable description state


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