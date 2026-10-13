// hooks/usePortfolioTheme.ts
"use client"

import { useState, useEffect } from "react"

export type ThemeMode = "minimalist" | "vscode" | null

export function usePortfolioTheme() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const savedTheme = localStorage.getItem("portfolio_theme_mode") as ThemeMode
    if (savedTheme) {
      setThemeMode(savedTheme)
    }
  }, [])

  const selectTheme = (mode: ThemeMode) => {
    if (mode) {
      localStorage.setItem("portfolio_theme_mode", mode)
      setThemeMode(mode)
    } else {
      localStorage.removeItem("portfolio_theme_mode")
      setThemeMode(null)
    }
  }

  return { themeMode, selectTheme, isMounted }
}