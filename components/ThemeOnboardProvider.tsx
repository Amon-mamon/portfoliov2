"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { WelcomeModal } from "./WelcomeModal"
import { MinimalistWelcomeModal } from "./MinimalistModal"
import { VscodeWelcomeModal } from "./VscodeModal"

export function ThemeOnboardingProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<"selection" | "minimalist" | "vscode" | null>(null)
  const [currentTheme, setCurrentTheme] = useState<"vscode" | "minimalist" | null>(null)
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio_theme_mode") as "vscode" | "minimalist" | null

    if (!savedTheme) {
      // First-time visitor -> Open root selection modal
      setActiveModal("selection")
    } else {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const handleSelect = (mode: "vscode" | "minimalist") => {
    localStorage.setItem("portfolio_theme_mode", mode)
    setCurrentTheme(mode)

    if (mode === "minimalist") {
      const hasSeenMinimalist = localStorage.getItem("has_seen_minimalist_modal")
      if (!hasSeenMinimalist) {
        setActiveModal("minimalist")
      } else {
        setActiveModal(null)
      }
      router.push("/minimalist-view")
    } else {
      const hasSeenVscode = localStorage.getItem("has_seen_vscode_modal")
      if (!hasSeenVscode) {
        setActiveModal("vscode")
      } else {
        setActiveModal(null)
      }
      router.push("/vscode-theme")
    }
  }

  const dismissModal = (themeKey: "has_seen_minimalist_modal" | "has_seen_vscode_modal") => {
    localStorage.setItem(themeKey, "true")
    setActiveModal(null)
  }

  const toggleTheme = () => {
    const nextTheme = currentTheme === "minimalist" ? "vscode" : "minimalist"
    handleSelect(nextTheme)
  }

  return (
    <>
      {/* 1. Root Choice Selection Modal (First-Time Visitor Only) */}
      {activeModal === "selection" && (
        <WelcomeModal onSelect={handleSelect} />
      )}

      {/* 2. Minimalist SPA Welcome Modal (Pops up once) */}
      {activeModal === "minimalist" && (
        <MinimalistWelcomeModal onClose={() => dismissModal("has_seen_minimalist_modal")} />
      )}

      {/* 3. VS Code IDE Welcome Terminal Modal (Pops up once) */}
      {activeModal === "vscode" && (
        <VscodeWelcomeModal onClose={() => dismissModal("has_seen_vscode_modal")} />
      )}

      {/* Floating Theme Switcher Button */}
      {currentTheme && !activeModal && (
        <button
          onClick={toggleTheme}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-md border border-[#3c3c3c] bg-[#1e1e1e]/90 px-3 py-2 text-xs font-mono text-[#d4d4d4] shadow-2xl backdrop-blur transition-all hover:bg-[#252526] hover:text-[#ffffff] cursor-pointer"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Switch to {currentTheme === "vscode" ? "Minimalist SPA" : "VS Code IDE"}
        </button>
      )}

      {children}
    </>
  )
}