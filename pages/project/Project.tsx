"use client";

import ProjectCard from "@/components/ProjectCard";
import VariableDeclaration from "@/components/reusable/variable-declaration";
import { ProjectItem } from "@/types/project";
import { useEffect, useState, useMemo } from "react";
import { VscFolder, VscSearch, VscFilter } from "react-icons/vsc";

const Project = () => {
  const [projects, setProjects] = useState<ProjectItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

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

  // Filter projects by Search Input and Category Tags
  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    return projects.filter((project) => {
      const matchesSearch =
        project.project_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.project_stack?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.project_description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === "All" ||
        project.project_type?.toLowerCase() === selectedTag.toLowerCase() ||
        project.project_stack?.toLowerCase().includes(selectedTag.toLowerCase());

      return matchesSearch && matchesTag;
    });
  }, [projects, searchQuery, selectedTag]);

  return (
    <section
      suppressHydrationWarning
      id="projects"
      className="p-4 md:p-8 text-[#d4d4d4] font-mono text-xs sm:text-sm select-none"
    >
      <VariableDeclaration variableName="Project" tagName="section" tagId="projects">
        <div className="my-6 pl-4 sm:pl-12 md:pl-20 ml-2 sm:ml-8 md:ml-12 min-w-0 space-y-6">
          
          {/* Section IDE Header */}
          <div className="pb-4 border-b border-[#2b2b2b] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                <span className="text-[#569cd6]">const</span> showcase ={" "}
                <span className="text-[#ce9178]">&apos;[visual_gallery]&apos;</span>
              </h1>
            </div>
            <p className="text-[#808080] text-xs max-w-md font-mono leading-relaxed">
              &#47;&#47; Interface previews and application visual breakdowns. Source code and live environments are private for client builds.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          
          {/* for future purposes once i had many projects */}
          {/* {!loading && !error && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#1e1e1e] p-3 rounded-lg border border-[#2b2b2b]">
             
              <div className="relative flex-1">
                <VscSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" />
                <input
                  type="text"
                  placeholder="Filter projects by title, stack, keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#252526] border border-[#2b2b2b] focus:border-[#569cd6] rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#808080] outline-none transition-colors"
                />
              </div>

         
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
                <VscFilter className="text-[#808080] shrink-0 mr-1" />
                {["All", "Web App", "Next.js", "React", "Mobile"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors shrink-0 cursor-pointer ${
                      selectedTag === tag
                        ? "bg-[#0e639c] text-white"
                        : "bg-[#252526] text-[#808080] hover:text-white border border-[#2b2b2b]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )} */}

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[#1e1e1e] border border-[#2b2b2b] rounded-xl p-5 space-y-4 animate-pulse"
                >
                  <div className="h-44 bg-[#252526] rounded-lg" />
                  <div className="h-5 bg-[#252526] rounded w-3/4" />
                  <div className="h-4 bg-[#252526] rounded w-full" />
                  <div className="h-4 bg-[#252526] rounded w-2/3" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="my-6 bg-[#1e1e1e] border border-[#f14c4c] text-[#f14c4c] p-4 rounded-xl text-center">
              <p>&#47;&#47; Error: {error}</p>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {/* Empty Search State */}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="my-12 text-center py-12 bg-[#1e1e1e] border border-[#2b2b2b] rounded-xl font-mono text-[#808080]">
              <p className="text-sm">// No matching projects found for filter criteria.</p>
            </div>
          )}
        </div>
      </VariableDeclaration>
    </section>
  );
};

export default Project;