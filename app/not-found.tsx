"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  VscError, 
  VscCode, 
  VscArrowLeft, 
  VscHome, 
  VscTerminal, 
  VscFolderOpened 
} from "react-icons/vsc"; // Adjust icon imports to react-icons/vsc if preferred

export default function NotFound() {
  const router = useRouter();
  const status = "404"
  const throwError = `throw new Error ${status} Page Moved or Deleted`
  
  return (
    <main className="min-h-screen w-full bg-[#1e1e1e] text-[#cccccc] font-mono text-xs sm:text-sm flex items-center justify-center p-4 sm:p-8 select-none">
      {/* ── VS CODE WINDOW CONTAINER ─────────────────────────── */}
      <div className="w-full max-w-3xl bg-[#1e1e1e] border border-[#2b2b2b] rounded-lg shadow-2xl overflow-hidden flex flex-col">
        
        {/* Editor Title Bar */}
        <div className="bg-[#252526] px-4 py-2 border-b border-[#2b2b2b] flex items-center justify-between text-xs text-[#808080]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
            <span className="ml-2 text-[#d4d4d4] font-semibold flex items-center gap-1.5">
              <VscError className="text-[#f14c4c]" /> 404_not_found.ts
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="bg-[#f14c4c]/20 text-[#f14c4c] px-1.5 py-0.5 rounded font-bold border border-[#f14c4c]/30">
              ERROR 404
            </span>
            <span className="text-[#808080]">UTF-8</span>
          </div>
        </div>

        {/* Editor Code View */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#1e1e1e] overflow-x-auto">
          
          {/* Code Lines with Line Numbers */}
          <div className="space-y-1 font-mono leading-relaxed">
            
            {/* Line 1 */}
            <div className="flex items-start gap-4">
              <span className="text-[#5a5a5a] select-none w-6 text-right shrink-0">1</span>
              <div>
                <span className="text-[#569cd6]">import</span>{" "}
                <span className="text-[#9cdcfe]">{"{ Exception }"}</span>{" "}
                <span className="text-[#569cd6]">from</span>{" "}
                <span className="text-[#ce9178]">&quot;@/system/router&quot;</span>;
              </div>
            </div>

            {/* Line 2 */}
            <div className="flex items-start gap-4">
              <span className="text-[#5a5a5a] select-none w-6 text-right shrink-0">2</span>
              <div>&nbsp;</div>
            </div>

            {/* Line 3 */}
            <div className="flex items-start gap-4">
              <span className="text-[#5a5a5a] select-none w-6 text-right shrink-0">3</span>
              <div>
                <span className="text-[#808080]">// CRITICAL: Request path could not be resolved</span>
              </div>
            </div>

            {/* Line 4 */}
            <div className="flex items-start gap-4">
              <span className="text-[#5a5a5a] select-none w-6 text-right shrink-0">4</span>
              <div>
                <span className="text-[#569cd6]">export default function</span>{" "}
                <span className="text-[#dcdcaa]">HandleNotFoundError</span>
                <span className="text-[#ffd700]">()</span>{" "}
                <span className="text-[#da70d6]">{"{"}</span>
              </div>
            </div>

            {/* Line 5 */}
            <div className="flex items-start gap-4">
              <span className="text-[#5a5a5a] select-none w-6 text-right shrink-0">5</span>
              <div className="pl-6">
                <span className="text-[#569cd6]">const</span>{" "}
                <span className="text-[#4ec9b0]">status</span>{" "}
                <span className="text-[#d4d4d4]">=</span>{" "}
                <span className="text-[#b5cea8]">404</span>;
              </div>
            </div>

            {/* Line 6 */}
            <div className="flex items-start gap-4">
              <span className="text-[#5a5a5a] select-none w-6 text-right shrink-0">6</span>
              <div className="pl-6">
                <span className="text-[#569cd6]">const</span>{" "}
                <span className="text-[#4ec9b0]">message</span>{" "}
                <span className="text-[#d4d4d4]">=</span>{" "}
                <span className="text-[#ce9178]">&quot;The requested file or route does not exist.&quot;</span>;
              </div>
            </div>

            {/* Line 7 */}
            <div className="flex items-start gap-4">
              <span className="text-[#5a5a5a] select-none w-6 text-right shrink-0">7</span>
              <div>&nbsp;</div>
            </div>

            {/* Line 8 */}
            <div className="flex items-start gap-4">
              <span className="text-[#5a5a5a] select-none w-6 text-right shrink-0">8</span>
              <div className="pl-6">
                <span className="text-[#c586c0]">return</span>{" "}
                <span className="text-[#ffd700]">(</span>
              </div>
            </div>

            {/* Line 9 */}
            <div className="flex items-start gap-4">
              <span className="text-[#5a5a5a] select-none w-6 text-right shrink-0">9</span>
              <div className="pl-12 text-[#f14c4c] font-semibold bg-[#f14c4c]/10 px-2 py-0.5 rounded border border-[#f14c4c]/20 inline-block">
                    {`${throwError}`}
              </div>
            </div>

            {/* Line 10 */}
            <div className="flex items-start gap-4">
              <span className="text-[#5a5a5a] select-none w-6 text-right shrink-0">10</span>
              <div className="pl-6">
                <span className="text-[#ffd700]">)</span>;
              </div>
            </div>

            {/* Line 11 */}
            <div className="flex items-start gap-4">
              <span className="text-[#5a5a5a] select-none w-6 text-right shrink-0">11</span>
              <div>
                <span className="text-[#da70d6]">{"}"}</span>
              </div>
            </div>

          </div>

          {/* Integrated Mini Terminal Action Panel */}
          <div className="bg-[#181818] border border-[#2b2b2b] rounded-md p-4 space-y-3 mt-6">
            <div className="flex items-center gap-2 text-[#808080] text-xs pb-2 border-b border-[#2b2b2b]">
              <VscTerminal className="text-[#007acc]" />
              <span className="text-[#cccccc] font-medium">TERMINAL</span>
              <span>— Quick Navigation Actions</span>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#252526] hover:bg-[#323233] border border-[#3c3c3c] text-white hover:text-[#569cd6] transition-colors text-xs font-mono"
              >
                <VscArrowLeft />
                <span>cd .. (Go Back)</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#007acc] hover:bg-[#0062a3] text-white transition-colors text-xs font-mono font-medium"
              >
                <VscHome />
                <span>cd ~/home</span>
              </Link>
            </div>
          </div>

        </div>

        {/* VS Code Status Bar */}
        <div className="bg-[#007acc] px-4 py-1 flex items-center justify-between text-white text-[11px]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <VscError className="text-white text-xs" /> 1 Error, 0 Warnings
            </span>
            <span className="hidden sm:inline">Ln 9, Col 15</span>
          </div>
          <div className="flex items-center gap-3">
            <span>TypeScript React</span>
            <span>UTF-8</span>
          </div>
        </div>

      </div>
    </main>
  );
}