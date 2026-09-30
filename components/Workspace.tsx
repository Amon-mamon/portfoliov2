import React from "react";
import { 
  VscCode, 
  VscGitCommit, 
  VscCheck, 
  VscHistory,
  VscTerminal,
  VscCircleFilled
} from "react-icons/vsc";

export default function WorkspaceTimeline() {
  // Hardcoded timeline logs for now
  const timelineLogs = [
    {
      id: "1",
      date: "Today",
      title: "Refactoring Portfolio Codebase",
      description: "Refactor codebase, apply tanstack query, mutation for admin side.",
      status: "In Progress",
      type: "refactor",
      tags: ["Next.js", "tanstack", "Tailwind"],
    },
    {
      id: "2",
      date: "9-30-2026",
      title: "Added GitHub & Tech Stack Minimalist Views",
      description: "Integrated GitHub contribution graph and tech stack icons into the main SPA structure.",
      status: "Completed",
      type: "feature",
      tags: ["React", "API"],
    },
  ];

  return (
    <div className="w-full h-72 p-4 bg-[#1e1e1e]  text-[#cccccc] font-mono shadow-md flex flex-col justify-between">
      {/* VS Code Header / Status Bar Style */}
      <div className="flex items-center justify-between border-b border-[#2d2d2d] pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#007acc]/20 text-[#3794ff] rounded">
            <VscTerminal className="text-base" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#858585] block">
              // WORKSPACE_LOG
            </span>
            <h3 className="text-xs font-semibold text-[#e1e1e1] leading-none flex items-center gap-1.5 pt-0.5">
              <span>timeline.json</span>
            </h3>
          </div>
        </div>

        <span className="text-[10px] bg-[#0e639c]/30 text-[#4fc1ff] border border-[#007acc]/40 px-2 py-0.5 rounded flex items-center gap-1 font-sans">
          <VscCircleFilled className="text-[8px] text-[#3794ff] animate-pulse" />
          <span>Session</span>
        </span>
      </div>

      {/* Vertical Timeline Feed with VS Code Scrollbar */}
      <div className="relative overflow-y-auto h-[210px] my-2 pr-1 pl-4 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-0 before:w-[1px] before:bg-[#3c3c3c] scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent">
        {timelineLogs.map((log) => {
          const isInProgress = log.status === "In Progress";

          return (
            <div key={log.id} className="relative group">
              {/* Timeline Indicator Node */}
              <div
                className={`absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full border ${
                  isInProgress
                    ? "bg-[#007acc] border-[#3794ff] ring-4 ring-[#007acc]/20"
                    : "bg-[#252526] border-[#858585]"
                }`}
              />

              <div className="space-y-1 bg-[#252526] p-2.5 rounded border border-[#2d2d2d] hover:border-[#007acc]/50 transition-colors">
                {/* Meta Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#858585] uppercase tracking-wide">
                    {log.date}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                      isInProgress
                        ? "bg-[#cca700]/10 text-[#dcdcaa] border-[#cca700]/30"
                        : "bg-[#89d185]/10 text-[#89d185] border-[#89d185]/30"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>

                {/* Log Content */}
                <h4 className="text-xs font-bold text-[#4ec9b0] group-hover:text-[#9cdcfe] transition-colors">
                  {log.title}
                </h4>
                <p className="text-[11px] text-[#9cdcfe] font-sans leading-relaxed">
                  <span className="text-[#ce9178] font-mono text-[10px]">&quot;</span>
                  {log.description}
                  <span className="text-[#ce9178] font-mono text-[10px]">&quot;</span>
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {log.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-[#1e1e1e] text-[#d4d4d4] px-1.5 py-0.5 rounded border border-[#3c3c3c]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}