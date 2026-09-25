"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { VscTerminal, VscGithub, VscMention, VscMail } from "react-icons/vsc"

export function MinimalisticFooter() {
  const currentYear = new Date().getFullYear()
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLogs, setTerminalLogs] = useState<Array<{ cmd?: string; output: string }>>([
    { output: 'Type "help" to see available terminal commands.' },
  ])

  const terminalEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalLogs])

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = terminalInput.trim().toLowerCase()
    let response = ''

    if (trimmed === 'help') {
      response = 'Available commands:\n  dev socials.json   - View direct social handles\n  dev location.txt  - View time zone & status\n  clear             - Clear terminal logs'
    } else if (trimmed === 'dev socials.json') {
      response = '{\n  "email": "stoicdavid16@gmail.com",\n  "github": "https://github.com/Amon-mamon",\n  "linkedin": "https://www.linkedin.com/in/vince-stephen-david-ab72292a0/"\n}'
    } else if (trimmed === 'dev location.txt') {
      response = 'Location: Central Luzon, Philippines (UTC+8)\nStatus: Active — Accepting new projects.\nAvg SLA: < 24 hrs response time.'
    } else if (trimmed === 'clear') {
      setTerminalLogs([])
      setTerminalInput('')
      return
    } else if (trimmed === '') {
      return
    } else {
      response = `Command not found: "${trimmed}". Type "help" for a list of available commands.`
    }

    setTerminalLogs((prev) => [...prev, { cmd: terminalInput, output: response }])
    setTerminalInput('')
  }

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 text-slate-600 font-sans text-xs pt-12">
      <div className="max-w-5xl mx-auto px-6 space-y-10 pb-8">
        
        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Brand */}
          <div className="space-y-2">
            <Link href="/" className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Vince Stephen David</span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Full-Stack Software Engineer crafting fast, resilient web systems and clean user experiences.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-2 font-mono text-xs">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Navigation</span>
            <div className="flex flex-col gap-1.5 text-slate-600">
              <button onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-blue-600 transition-colors">01. Home</button>
              <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-blue-600 transition-colors">02. About</button>
              <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-blue-600 transition-colors">03. Projects</button>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-blue-600 transition-colors">04. Contact</button>
            </div>
          </div>

          {/* Column 3: Social Links */}
          <div className="space-y-2 font-mono text-xs">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Connect</span>
            <div className="flex flex-col gap-1.5">
              <a href="https://github.com/Amon-mamon" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                <VscGithub className="text-slate-500" /> GitHub Profile
              </a>
              <a href="https://www.linkedin.com/in/vince-stephen-david-ab72292a0/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                <VscMention className="text-slate-500" /> LinkedIn
              </a>
              <a href="mailto:stoicdavid16@gmail.com" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                <VscMail className="text-slate-500" /> Direct Email
              </a>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
          <p>© {currentYear} Vince Stephen David. Built with Next.js & Tailwind CSS.</p>
          <p className="text-emerald-600 font-semibold">// All Systems Operational</p>
        </div>

      </div>
    </footer>
  )
}