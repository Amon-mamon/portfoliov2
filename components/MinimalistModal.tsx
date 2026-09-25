"use client"

import React from "react"

interface MinimalistWelcomeModalProps {
  onClose: () => void
}

export function MinimalistWelcomeModal({ onClose }: MinimalistWelcomeModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl text-neutral-200 font-sans space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium tracking-widest uppercase text-neutral-500">
            Minimalist View
          </span>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white text-sm transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Welcome to the Clean SPA
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            You are viewing the streamlined portfolio experience designed for fast navigation and pure content focus without the IDE shell.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-white text-black py-2.5 text-sm font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Explore Portfolio
          </button>
        </div>

      </div>
    </div>
  )
}