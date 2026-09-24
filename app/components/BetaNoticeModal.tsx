"use client"

import { useEffect, useState } from "react"
import { 
  VscWarning, 
  VscBug, 
  VscCode, 
  VscCheck, 
  VscMail, 
  VscTerminal 
} from "react-icons/vsc"

interface BetaNoticeModalProps {
  contactEmail?: string
}

export function BetaNoticeModal({ contactEmail = "stoicdavid16@gmail.com" }: BetaNoticeModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has already acknowledged the beta notice
    const hasSeenNotice = localStorage.getItem("beta_notice_acknowledged")
    if (!hasSeenNotice) {
      setIsOpen(true)
    }
  }, [])

  const handleAcknowledge = () => {
    localStorage.setItem("beta_notice_acknowledged", "true")
    setIsOpen(false)
  }

  if (!isOpen) return null

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
        <div className="p-5 space-y-4">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-[#e5c07b]/10 border border-[#e5c07b]/30 text-[#e5c07b] px-2.5 py-1 rounded text-xs">
            <VscTerminal className="shrink-0" />
            <span>Status: Public Beta / Active Development</span>
          </div>

          {/* Description Block */}
          <div className="space-y-3 text-gray-300 leading-relaxed">
            <p>
              Welcome! You are viewing an early, active build of my portfolio. Features and UI components are continuously being deployed.
            </p>

            <div className="bg-[#1e1e1e] border-l-2 border-amber-500 p-3 rounded-r space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <VscBug />
                <span>Possible Bugs Ahead</span>
              </div>
              <p className="text-[11px] text-[#808080]">
                Unexpected glitches, visual bugs, or missing assets may spawn as updates roll out in real-time.
              </p>
            </div>

            <p className="text-xs">
              If you run into any broken features or weird interactions, please feel free to drop me a message so I can squash them!
            </p>
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
              onClick={handleAcknowledge}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#007acc] hover:bg-[#0062a3] text-white px-4 py-2 rounded font-semibold transition-colors cursor-pointer"
            >
              <VscCheck className="text-base" />
              <span>Proceed to Site</span>
            </button>
          </div>

        </div>

        {/* Subtle Status Line */}
        <div className="bg-[#007acc] text-white text-[10px] px-4 py-1 flex items-center justify-between font-mono">
          <span>// press proceed to close terminal banner</span>
          <span>v2.0-beta</span>
        </div>

      </div>
    </div>
  )
}