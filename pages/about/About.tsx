"use client";

import TechStack from "@/components/tech-stack";
import { 
  VscChevronDown, 
  VscCode, 
  VscFolder, 
  VscSymbolParameter, 
  VscGlobe, 
  VscBriefcase, 
  VscLocation 
} from "react-icons/vsc";

const About = () => {
  return (
    <section id="about" className="relative flex flex-col w-full bg-[#121314] text-[#d4d4d4] font-mono select-none p-4 md:p-8">
      
      {/* ── Editor Body Content ─────────────────────────── */}
      <div className="pb-12 overflow-x-auto text-xs sm:text-sm leading-relaxed">

        {/* Line 3: Component Signature */}
        <div className="flex items-center">
          <div className="flex items-center gap-1 py-2">
            <span className="text-[#569cd6]">const</span>{" "}
            <span className="text-[#dcdcaa]">About</span> = () =&gt; &#123;
          </div>
        </div>

        {/* Line 4: Return */}
        <div className="flex items-center pt-3">
          <div className="pl-4 sm:pl-8">
            <span className="text-[#c586c0]">return</span> (
          </div>
        </div>

        {/* Line 5: Section Tag Open */}
        <div className="flex items-center">
          <div className="pl-8 sm:pl-16 pt-2">
            &lt;<span className="text-[#569cd6]">section</span>{" "}
            <span className="text-[#9cdcfe]">id</span>=
            <span className="text-[#ce9178]">&quot;about&quot;</span>&gt;
          </div>
        </div>

        {/* ── Actual Rendered Section Visual ────────────── */}
        <div className="my-8 mx-3 sm:mx-8 md:mx-16 p-6 sm:p-10 bg-[#181818] rounded-xl border border-[#2b2b2b] shadow-2xl">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Title Header Block */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#252526] border border-[#3c3c3c] px-3 py-1 rounded-full text-xs text-[#4ec9b0]">
                <VscSymbolParameter />
                <span>developer_profile.json</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
                The <span className="text-[#007acc] font-mono">&lt;Mind&gt;</span> Behind the Code.
              </h1>
              <p className="text-[#808080] text-sm sm:text-base max-w-2xl font-mono leading-relaxed">
                &#47;&#47; Passionate full-stack developer committed to crafting clean, functional, and scalable digital solutions.
              </p>
            </div>

            {/* Quick Metadata Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1e1e1e] p-4 rounded-lg border border-[#2b2b2b] flex items-center gap-3">
                <VscLocation className="text-[#569cd6] text-xl shrink-0" />
                <div>
                  <span className="text-[#808080] text-[10px] block font-mono">LOCATION</span>
                  <span className="text-white text-xs font-bold">Philippines 🇵🇭</span>
                </div>
              </div>
              
              <div className="bg-[#1e1e1e] p-4 rounded-lg border border-[#2b2b2b] flex items-center gap-3">
                <VscBriefcase className="text-[#4ec9b0] text-xl shrink-0" />
                <div>
                  <span className="text-[#808080] text-[10px] block font-mono">FOCUS</span>
                  <span className="text-white text-xs font-bold">Full-Stack & UX</span>
                </div>
              </div>

              <div className="bg-[#1e1e1e] p-4 rounded-lg border border-[#2b2b2b] flex items-center gap-3">
                <VscGlobe className="text-[#ce9178] text-xl shrink-0" />
                <div>
                  <span className="text-[#808080] text-[10px] block font-mono">STATUS</span>
                  <span className="text-white text-xs font-bold">Available for Projects</span>
                </div>
              </div>
            </div>

            {/* Detailed Bio Card */}
            <div className="bg-[#1e1e1e] p-6 sm:p-8 rounded-lg border border-[#2b2b2b] space-y-4 font-sans text-gray-300">
              <div className="flex items-center gap-2 border-b border-[#2b2b2b] pb-3 text-white font-mono text-sm font-bold">
                <span className="text-[#569cd6]">01.</span>
                <span>Bio Overview</span>
              </div>
              
              <p className="text-sm sm:text-base leading-relaxed text-[#cccccc]">
                Based in the Philippines, I specialize in bridging design with robust engineering. I build end-to-end web applications that emphasize smooth UI performance, resilient database schemas, and intuitive user experiences.
              </p>
              
              <p className="text-sm leading-relaxed text-[#808080] font-mono">
                &#47;&#47; I focus heavily on writing modular, self-documenting TypeScript code and implementing optimized modern workflows.
              </p>
            </div>

            {/* Tech Stack Component Section */}
            <div className="pt-4">
              <TechStack />
            </div>

          </div>
        </div>

        {/* Line 6: Section Tag Close */}
        <div className="flex items-center">
          <span className="w-10 sm:w-12 text-right pr-4 text-[#5c6370] text-xs">6</span>
          <div className="pl-12">
            &lt;/<span className="text-[#569cd6]">section</span>&gt;
          </div>
        </div>

        {/* Line 7: Return Close */}
        <div className="flex items-center">
          <span className="w-10 sm:w-12 text-right pr-4 text-[#5c6370] text-xs">7</span>
          <div className="pl-6">);</div>
        </div>

        {/* Line 8: Function Close */}
        <div className="flex items-center">
          <span className="w-10 sm:w-12 text-right pr-4 text-[#5c6370] text-xs">8</span>
          <div>&#125;;</div>
        </div>

        {/* Line 9: Empty Line */}
        <div className="flex items-center">
          <span className="w-10 sm:w-12 text-right pr-4 text-[#5c6370] text-xs">9</span>
        </div>

        {/* Line 10: Export Statement */}
        <div className="flex items-center">
          <span className="w-10 sm:w-12 text-right pr-4 text-[#5c6370] text-xs">10</span>
          <div>
            <span className="text-[#c586c0]">export default</span>{" "}
            <span className="text-[#dcdcaa]">About</span>;
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;