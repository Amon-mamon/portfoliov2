// components/OnboardingModal.tsx
"use client"

import { VscCode, VscLayout } from "react-icons/vsc"
import Image from "next/image"
interface OnboardingModalProps {
  onSelect: (mode: "minimalist" | "vscode") => void
}


export function WelcomeModal({ onSelect }: OnboardingModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/20 backdrop-blur-md font-mono text-[#d4d4d4]">
      <div className="w-full max-w-xl bg-[#181818] border border-[#2b2b2b] rounded-xl p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-white">Choose Your Experience</h2>
          <p className="text-xs text-gray-400">
            Select how you would like to view my portfolio. You can switch theme anytime.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Basic / Minimalist SPA Card */}
          <button
            onClick={() => onSelect("minimalist")}
            className="flex flex-col gap-2 items-center p-5 rounded-lg border border-[#3c3c3c] bg-white/90 hover:border-indigo-500 hover:bg-gray-300 hover:border-3 transition-all group cursor-pointer text-left"
          >
            <Image width={300} height={300} alt="minimalist" src="/MINIMALIST.png" className="w-full h-full"></Image>
            <div className="p-3 rounded-full bg-indigo-400 group-hover:bg-indigo-600 text-indigo-500 mb-3 group-hover:scale-100 transition-transform">
              <VscLayout className="text-xl text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">Minimalist Portfolio</h3>
            <p className="text-[11px] text-gray-600 text-center leading-relaxed">
              Clean, single-page layout designed for quick reading and traditional viewing.
            </p>
            <span className="mt-4 text-[10px] text-indigo-500 font-semibold bg-indigo-text-indigo-500/10 px-2 py-0.5 rounded">
              Recommended for non-devs
            </span>
          </button>

          {/* Advanced / VS Code Theme Card */}
          <button
            onClick={() => onSelect("vscode")}
            className="flex gap-2 flex-col items-center p-5 rounded-lg border hover:border-3 border-[#3c3c3c] bg-[#1e1e1e] hover:border-[#007acc] hover:bg-[#252526] transition-all group cursor-pointer text-left"
          >
            <Image width={300} height={300} alt="vscode" src="/vscode.png" className="w-full h-full"></Image>
            <div className="p-3 rounded-full bg-[#007acc]/10 text-[#007acc] mb-3 group-hover:scale-100 transition-transform">
              <VscCode className="text-xl" />
            </div>
            <h3 className="font-semibold text-white mb-1 text-sm">Developer IDE (VS Code)</h3>
            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
              Interactive code editor experience complete with sidebar file trees and tabs.
            </p>
            <span className="mt-4 text-[10px] text-[#007acc] font-semibold bg-[#007acc]/10 px-2 py-0.5 rounded">
              Interactive IDE
            </span>
          </button>

        </div>

      </div>
    </div>
  )
}