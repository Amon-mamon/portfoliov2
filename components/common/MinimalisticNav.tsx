"use client"

import React, { useState, useEffect } from "react"
import { 
  VscMenu, 
  VscClose, 
  VscHome, 
  VscPerson, 
  VscCode, 
  VscMail, 
  VscGithub,
  VscFilePdf
} from "react-icons/vsc"

const navItems = [
  { id: "home", label: "Home", icon: VscHome },
  { id: "about", label: "About", icon: VscPerson },
  { id: "projects", label: "Projects", icon: VscCode },
  { id: "contact", label: "Contact", icon: VscMail },
]

export function MinimalisticNav() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setMobileOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-slate-200/80 py-3.5 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              V
            </div>
            <div>
              <span className="text-sm font-semibold tracking-tight text-slate-900 block leading-none">
                Vince David
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-1">
                Full-Stack Engineer
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
                >
                  <Icon className="text-sm" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* External Links */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/Amon-mamon"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
              title="GitHub Profile"
            >
              <VscGithub className="text-lg" />
            </a>
            <a
              href="/DAVID_VINCE_STEPHEN_CV.pdf"
              download
              className="flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3.5 py-1.5 rounded-lg transition-all"
            >
              <VscFilePdf className="text-blue-600" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <VscClose className="text-2xl" /> : <VscMenu className="text-2xl" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-white/95 backdrop-blur-xl flex flex-col justify-between p-6 pt-24 md:hidden animate-in fade-in duration-200">
          <div className="space-y-3">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest px-2">
              Navigation
            </p>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 w-full p-3.5 rounded-xl text-left text-sm font-medium transition-all ${
                      isActive
                        ? "bg-slate-900 text-white font-semibold shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-3">
            <a
              href="/DAVID_VINCE_STEPHEN_CV.pdf"
              download
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-medium"
            >
              <VscFilePdf className="text-blue-400" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </>
  )
}