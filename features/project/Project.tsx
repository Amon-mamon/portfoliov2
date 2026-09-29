"use client";

import ProjectCard from "@/components/ProjectCard";
import VariableDeclaration from "@/components/reusable/variable-declaration";
import { useQuery } from '@tanstack/react-query'
import { getProjects } from "@/service/project.service";

const Project = () => {

  const { data: projects,
          isLoading,
          isError,
          error,
    } = useQuery({
        queryKey:["projects"],
        queryFn:getProjects
  })
  
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

          {/* Loading Skeleton */}
          {isLoading && (
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
          {isError && (
            <div className="my-6 bg-[#1e1e1e] border border-[#f14c4c] text-[#f14c4c] p-4 rounded-xl text-center">
              <p>&#47;&#47; Error: {error.message}</p>
            </div>
          )}

          {/* Projects Grid */}
          {!isLoading && !isError && projects && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

        </div>
      </VariableDeclaration>
    </section>
  );
};

export default Project;