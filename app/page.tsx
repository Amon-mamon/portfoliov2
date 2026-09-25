// app/page.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio_theme_mode")
    
    if (savedTheme === "minimalist") {
      router.replace("/minimalist-view")
    } else if (savedTheme === "vscode") {
      router.replace("/vscode-theme")
    }
  }, [router])

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#121314] text-white">
      {/* If ThemeOnboardingProvider in app/layout.tsx renders the modal, 
          this acts as a clean loading backdrop until they make a choice */}
      <p className="font-mono text-sm text-gray-400">Loading portfolio...</p>
    </div>
  )
}