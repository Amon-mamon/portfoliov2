"use client";

import GitHubActivity from "@/components/github-activity";
import VariableDeclaration from "@/components/reusable/variable-declaration";
import TechStack from "@/components/tech-stack";
import { 
  VscSymbolParameter, 
  VscGlobe, 
  VscBriefcase, 
  VscLocation, 
  VscFolder,
  VscCode
} from "react-icons/vsc";

const About = () => {
  return (
    <section 
      suppressHydrationWarning
      id="about" 
      className="p-4 md:p-8 text-[#d4d4d4] font-mono text-xs sm:text-sm select-none"
    >
      <VariableDeclaration variableName="About" tagName="section" tagId="about">
        
        {/* ── Rendered Card View ────────── */}
        <div className="my-6 pl-4 sm:pl-12 md:pl-20 ml-2 sm:ml-8 md:ml-12 min-w-0">
          <div className="w-full space-y-12 min-w-0">

            {/* Title Header */}
            <div className="@container w-full min-w-0 space-y-6">
              {/* VS Code Breadcrumb Header */}
              <div className="space-y-3">
                {/* Hero Title */}
                <h3 className="text-3xl @md:text-5xl font-bold tracking-tight text-white font-sans">
                  The <span className="text-[#569cd6] font-mono">&lt;Mind&gt;</span>{" "}
                  Behind the Code.
                </h3>

                <p className="text-[#808080] text-xs @sm:text-sm font-mono leading-relaxed max-w-2xl">
                  &#47;&#47; Full-stack engineer building fast, responsive web systems
                  with clean architecture and live data workflows.
                </p>
              </div>

              {/* Quick Metadata Matrix */}
              <div className="grid grid-cols-1 @sm:grid-cols-3 gap-3 font-mono">
                {/* Location Card */}
                <div className="group bg-[#1e1e1e] hover:bg-[#252526] p-3.5 rounded-xl border border-[#2b2b2b] hover:border-[#569cd6]/40 transition-all duration-200 flex items-center gap-3 min-w-0 shadow-lg">
                  <div className="p-2 rounded-lg bg-[#252526] group-hover:bg-[#1e1e1e] border border-[#2b2b2b] shrink-0">
                    <VscLocation className="text-[#569cd6] text-lg" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[#808080] text-[10px] block uppercase tracking-wider">
                      const location
                    </span>
                    <span className="text-[#ce9178] text-xs font-semibold truncate block">
                      &quot;Philippines 🇵🇭&quot;
                    </span>
                  </div>
                </div>

                {/* Focus Card */}
                <div className="group bg-[#1e1e1e] hover:bg-[#252526] p-3.5 rounded-xl border border-[#2b2b2b] hover:border-[#4ec9b0]/40 transition-all duration-200 flex items-center gap-3 min-w-0 shadow-lg">
                  <div className="p-2 rounded-lg bg-[#252526] group-hover:bg-[#1e1e1e] border border-[#2b2b2b] shrink-0">
                    <VscBriefcase className="text-[#4ec9b0] text-lg" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[#808080] text-[10px] block uppercase tracking-wider">
                      const focus
                    </span>
                    <span className="text-[#4ec9b0] text-xs font-semibold truncate block">
                      &quot;Full-Stack &amp; UX&quot;
                    </span>
                  </div>
                </div>

                {/* Status Card */}
                <div className="group bg-[#1e1e1e] hover:bg-[#252526] p-3.5 rounded-xl border border-[#2b2b2b] hover:border-[#b5cea8]/40 transition-all duration-200 flex items-center gap-3 min-w-0 shadow-lg">
                  <div className="p-2 rounded-lg bg-[#252526] group-hover:bg-[#1e1e1e] border border-[#2b2b2b] shrink-0">
                    <VscGlobe className="text-[#b5cea8] text-lg" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[#808080] text-[10px] block uppercase tracking-wider">
                      let availability
                    </span>
                    <span className="text-[#b5cea8] text-xs font-semibold truncate block flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ec9b0] animate-pulse shrink-0" />
                      &quot;Open for Work&quot;
                    </span>
                  </div>
                </div>
              </div>
            </div>
           {/* Detailed Bio Card - Object Style */}
            {/* Detailed Bio Card - IDE Styled with Original Content */}
            <div className="@container w-full min-w-0 max-w-full bg-[#1e1e1e] rounded-xl border border-[#2b2b2b] p-5 sm:p-6 space-y-4 shadow-2xl overflow-hidden relative">
              {/* VS Code File Window Header */}
              <div className="flex items-center justify-between border-b border-[#2b2b2b] pb-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  {/* Decorative Window Controls */}
                  <span className="text-[#569cd6]">01.</span>
                  <span className="text-[#808080]">src/bio/</span>
                  <span className="text-[#dcdcaa]">overview.md</span>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-[#808080]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ec9b0]" />
                  <span>UTF-8</span>
                </div>
              </div>

              {/* Original Content */}
              <div className="space-y-4 font-sans text-gray-300">
                <p className="text-sm sm:text-base leading-relaxed text-[#cccccc]">
                  Based in the Philippines, I specialize in bridging design with robust engineering. I build end-to-end web applications that emphasize smooth UI performance, resilient database schemas, and intuitive user experiences.
                </p>

                <p className="text-sm leading-relaxed text-[#808080] font-mono">
                  &#47;&#47; I prioritize quality, maintainability, and efficiency by following proven development best practices and modern workflows.
                </p>
              </div>

              {/* Terminal Footer Indicator */}
              <div className="pt-2 border-t border-[#2b2b2b]/60 flex items-center justify-between text-[11px] font-mono text-[#666666]">
                <span>bio_overview.md &gt; rendered</span>
                <span className="text-[#6a9955]">// 0 warnings</span>
              </div>
            </div>

            {/* Tech Stack Component Section */}
              <div className="@container @max-w-full z-30">
                <TechStack />
              </div>
              <GitHubActivity
              username="amon-mamon"
              />
          </div>
        </div>
      </VariableDeclaration>
    </section>
  );
};

export default About;