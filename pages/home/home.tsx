"use client";

import VariableDeclaration from '@/components/reusable/variable-declaration';
import Link from 'next/link';
import { FaDownload } from "react-icons/fa6";
import { VscTerminal } from "react-icons/vsc";

const Home = () => {
  return (
    <div id="home" className="relative w-full text-xs sm:text-sm font-mono text-[#d4d4d4] select-none p-4 md:p-8">
      
      {/* ── Scoped Animation & VS Code Utility Styles ────── */}
      <style jsx>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(86,156,214,0.4)); }
          50%      { filter: drop-shadow(0 0 24px rgba(86,156,214,0.7)); }
        }
        .hero-fade-up { animation: hero-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hero-delay-1 { animation-delay: 0.1s; }
        .hero-delay-2 { animation-delay: 0.2s; }
        .hero-delay-3 { animation-delay: 0.3s; }
        .glow-effect { animation: glow-pulse 4s ease-in-out infinite; }
      `}</style>

      {/* ── Reusable Variable Declaration Wrapper ────── */}
      <VariableDeclaration variableName="Home" tagName="main" tagId="home">
        
        {/* ── Inner Hero Content / Screen (Passed as children) ───────── */}
        <div className="my-6 pl-8 sm:pl-20 border-l-2 border-[#2d2d2d] ml-8 sm:ml-20">
          <div className="flex flex-col gap-6 max-w-6xl">

            {/* Status Badge */}
            <div className="hero-fade-up hero-delay-1 inline-flex items-center gap-2 self-start rounded-md bg-[#1e293b] px-3 py-1.5 text-xs text-[#38bdf8] border border-[#0284c7]/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="font-semibold">// Available for full-time opportunities</span>
            </div>

            {/* Headline */}
            <div className="hero-fade-up hero-delay-2 space-y-2">
              <p className="text-[#6a9955] italic text-xs sm:text-sm">/** Developer Profile Info */</p>
              <h1 className="text-3xl sm:text-5xl lg:text-8xl font-bold tracking-tight text-[#d4d4d4] leading-tight">
                Hi, I&apos;m{" "}
                <span className="text-[#4ec9b0] font-mono glow-effect underline decoration-[#007acc] decoration-wavy underline-offset-8">
                  Vince
                </span>
                .
              </h1>
              <h2 className="text-xl sm:text-5xl text-[#ce9178] font-semibold">
                Full-Stack Developer
              </h2>
            </div>

            {/* Paragraphs Styled as a Code Block / Comments */}
            <div className="hero-fade-up hero-delay-3 bg-[#181818] border border-[#2b2b2b] rounded-md p-4 text-[#9cdcfe] space-y-3 font-mono text-xs sm:text-base">
              <p className="flex items-start gap-2">
                <span>I craft fast, intuitive web applications — from responsive front-end interfaces to robust backend architectures.</span>
              </p>
              <p className="text-[#6a9955] italic">
                &#47;&#47; Specialized in React, Next.js, TypeScript, and modern API integration.
              </p>
            </div>

            {/* CTA Interactive Buttons */}
            <div className="hero-fade-up hero-delay-3 flex flex-wrap gap-4 pt-4">
              <a
                href="/DAVID_VINCE_STEPHEN_CV.pdf"
                download="DAVID_VINCE_STEPHEN_CV.pdf"
                className="group flex items-center gap-2 bg-[#007acc] hover:bg-[#0062a3] text-white px-5 py-2.5 rounded-md font-mono text-xs transition-all shadow-md active:scale-95"
              >
                <FaDownload className="group-hover:translate-y-0.5 transition-transform" />
                <span>download_cv.pdf</span>
              </a>

              <Link
                href="/contact"
                className="flex items-center gap-2 bg-[#2d2d2d] hover:bg-[#3c3c3c] border border-[#3c3c3c] text-[#cccccc] hover:text-white px-5 py-2.5 rounded-md font-mono text-xs transition-all active:scale-95"
              >
                <VscTerminal className="text-[#4ec9b0]" />
                <span>./get-in-touch.sh</span>
              </Link>
            </div>

          </div>
        </div>

      </VariableDeclaration>

    </div>
  );
};

export default Home;