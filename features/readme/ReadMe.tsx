"use client";

import { useState, useEffect } from "react";
import { 
  VscFiles, 
  VscTerminal, 
  VscCode, 
  VscFolder, 
  VscFolderOpened, 
  VscMarkdown, 
  VscInfo,
  VscChevronDown,
  VscChevronRight
} from "react-icons/vsc";

export default function ReadMe() {

  return (
    <div className="flex h-screen w-full  text-[#d4d4d4] font-mono text-xs sm:text-sm select-none overflow-hidden">
      
      {/* ── MAIN WORKSPACE / EDITOR ────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 ">
        
        {/* Tab Content Display */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className=" space-y-6">
              
              {/* Header Banner */}
              <div className="bg-[#252526] border border-[#3c3c3c] rounded-lg p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#4ec9b0] font-bold text-base">
                  <VscInfo className="text-xl" />
                  <h3>Portfolio Navigation Guide</h3>
                </div>
                <p className="text-[#808080] leading-relaxed">
                  Welcome to my portfolio! This interface is engineered like a functional VS Code IDE. Use the custom keyboard triggers below to control your workspace layout.
                </p>
              </div>
              
              {/* Instructions Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Sidebar Card */}
                <div className="bg-[#252526] border border-[#2b2b2b] rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#569cd6] font-bold flex items-center gap-2">
                      <VscFiles /> Toggle Sidebar
                    </span>
                    <kbd className="bg-[#007acc] text-white px-2 py-0.5 rounded text-[11px] font-bold">
                      Ctrl + B
                    </kbd>
                  </div>
                  <p className="text-[#808080] text-xs leading-relaxed">
                    Expands or collapses the project explorer pane. Use it to clear space or browse through site directories.
                  </p>
                </div>

                {/* Terminal Card */}
                <div className="bg-[#252526] border border-[#2b2b2b] rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#4ec9b0] font-bold flex items-center gap-2">
                      <VscTerminal /> Toggle Terminal Footer
                    </span>
                    <kbd className="bg-[#007acc] text-white px-2 py-0.5 rounded text-[11px] font-bold">
                      Ctrl + `
                    </kbd>
                  </div>
                  <p className="text-[#808080] text-xs leading-relaxed">
                    Opens or hides the interactive CLI terminal panel at the bottom of the viewport.
                  </p>
                </div>
              </div>

              <div className="w-full space-y-4">
                <div className="text-[#808080] font-mono text-xs">// Global IDE Keybindings configuration</div>
                <pre className="bg-[#252526] p-4 rounded-lg border text-start border-[#2b2b2b] text-[#ce9178] overflow-x-auto">
{`[
  {
    "key": "ctrl+b",
    "command": "workbench.action.toggleSidebarVisibility",
    "description": "Collapses or expands the explorer panel"
  },
  {
    "key": "ctrl+\`",
    "command": "workbench.action.terminal.toggleTerminal",
    "description": "Opens or closes the footer status terminal"
  }
]`
}
                </pre>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}