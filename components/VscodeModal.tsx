"use client"

import { 
  VscWarning, 
  VscBug, 
  VscCheck, 
  VscMail, 
  VscTerminal,
  VscFileCode
} from "react-icons/vsc"

interface VscodeWelcomeModalProps {
  onClose: () => void
  contactEmail?: string
}

export function VscodeWelcomeModal({ 
  onClose, 
  contactEmail = "stoicdavid16@gmail.com" 
}: VscodeWelcomeModalProps) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-mono text-xs sm:text-sm text-[#d4d4d4]">
      {/* IDE Window Box */}
      <div className="w-full max-w-lg bg-[#181818] border border-[#2b2b2b] rounded-lg shadow-2xl overflow-hidden animate-scale-up">
        
        {/* IDE Header Bar */}
        <div className="bg-[#252526] px-4 py-2.5 border-b border-[#2b2b2b] flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <VscWarning className="text-base shrink-0" />
            <span>sys.warning: BUILD_IN_PROGRESS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f14c4c]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#e5c07b]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4ec9b0]/80 inline-block" />
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-3.5">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-[#e5c07b]/10 border border-[#e5c07b]/30 text-[#e5c07b] px-2.5 py-1 rounded text-xs">
            <VscTerminal className="shrink-0" />
            <span>Status: Public Beta / VS Code Theme Active</span>
          </div>

          {/* Description Block */}
          <div className="space-y-2.5 text-gray-300 leading-relaxed">
            <p className="text-xs">
              Welcome! You are viewing the interactive VS Code-themed portfolio. Features and UI components are continuously being updated.
            </p>

            {/* Non-Developer VS Code Instructions Callout */}
            <div className="bg-[#1e1e1e] border-l-2 border-[#569cd6] p-2.5 rounded-r space-y-1">
              <div className="flex items-center gap-2 text-[#569cd6] font-semibold text-xs">
                <VscFileCode className="text-sm shrink-0" />
                <span>New to VS Code / Non-Developers:</span>
              </div>
              <p className="text-[11px] text-[#808080] leading-normal">
                Check out the <code className="bg-[#252526] text-[#ce9178] px-1 py-0.5 rounded border border-[#3c3c3c]">README.md</code> file in the sidebar explorer to see how to navigate tabs and explore projects.
              </p>
            </div>

            {/* Bugs Warning */}
            <div className="bg-[#1e1e1e] border-l-2 border-amber-500 p-2.5 rounded-r space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <VscBug className="shrink-0" />
                <span>Possible Bugs Ahead</span>
              </div>
              <p className="text-[11px] text-[#808080]">
                Unexpected visual glitches may occur during live builds. Feel free to send a report if you encounter any issue!
              </p>
            </div>
          </div>

          {/* Code Footer / Contact */}
          <div className="pt-2 border-t border-[#2b2b2b] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <a
              href={`mailto:${contactEmail}?subject=Portfolio%20Bug%20Report`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#252526] hover:bg-[#3c3c3c] text-[#9cdcfe] border border-[#3c3c3c] px-3 py-2 rounded transition-colors"
            >
              <VscMail className="text-sm" />
              <span>Report a Bug</span>
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#007acc] hover:bg-[#0062a3] text-white px-4 py-2 rounded font-semibold transition-colors cursor-pointer"
            >
              <VscCheck className="text-base" />
              <span>Explore IDE</span>
            </button>
          </div>

        </div>

        {/* Status Line */}
        <div className="bg-[#007acc] text-white text-[10px] px-4 py-1 flex items-center justify-between font-mono">
          <span>// press explore ide to close terminal banner</span>
          <span>v2.0-beta</span>
        </div>

      </div>
    </div>
  )
}