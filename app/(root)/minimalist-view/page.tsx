"use client"

import React, { useState, useEffect, useMemo } from "react"
import GitHubActivity from "@/components/github-activity"
import TechStack from "@/components/tech-stack"
import { ProjectItem } from "@/types/project"
import { 
  VscLocation, 
  VscBriefcase, 
  VscGlobe, 
  VscFilePdf, 
  VscMail, 
  VscGithub, 
  VscMention, 
  VscKey,
  VscCheck,
  VscError,
  VscRunAll,
  VscSearch,
  VscFilter,
} from "react-icons/vsc"
import { MinimalisticNav } from "@/components/common/MinimalisticNav"
import { MinimalisticFooter } from "@/components/common/MinimalisticFooter"

export default function MinimalistSPA() {
  // Contact Form State
  const [inquiryType, setInquiryType] = useState("project")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [timeString, setTimeString] = useState("")
  const [showPgp, setShowPgp] = useState(false)

  // Projects State
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("All")
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null)

  // Live Manila Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeString(now.toLocaleTimeString("en-US", { timeZone: "Asia/Manila" }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Fetch Projects API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project")
        const result = await res.json()
        if (res.ok && Array.isArray(result)) {
          setProjects(result)
        }
      } catch (err) {
        console.error("Failed to load projects", err)
      } finally {
        setLoadingProjects(false)
      }
    }
    fetchProjects()
  }, [])

  // Dynamic Filtering
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.project_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.project_stack?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.project_description?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTag =
        selectedTag === "All" ||
        project.project_type?.toLowerCase() === selectedTag.toLowerCase() ||
        project.project_stack?.toLowerCase().includes(selectedTag.toLowerCase())

      return matchesSearch && matchesTag
    })
  }, [projects, searchQuery, selectedTag])

  // Form Submit Handler
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, inquiryType }),
      })
      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="h-full overflow-y-auto bg-slate-50/50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Sticky Top Nav */}
      <MinimalisticNav />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-16 space-y-24">
        
        {/* ── 1. HERO SECTION ─────────────────────────────────── */}
        <section id="home" className="space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs text-emerald-700 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for full-time & contract opportunities</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Hi, I&apos;m <span className="text-blue-600">Vince David</span>.
            </h1>
            <h2 className="text-xl sm:text-2xl text-slate-600 font-medium">
              Full-Stack Software Engineer
            </h2>
          </div>

          <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
            I specialize in designing and engineering high-performance web applications—building clean user interfaces with robust database architectures.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/DAVID_VINCE_STEPHEN_CV.pdf"
              download
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm"
            >
              <VscFilePdf className="text-lg text-blue-400" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 px-5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer shadow-sm"
            >
              <VscMail className="text-lg text-blue-600" />
              <span>Get in Touch</span>
            </button>
          </div>
        </section>

        {/* ── 2. ABOUT SECTION ────────────────────────────────── */}
        <section id="about" className="space-y-8">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">About Me</h3>
            <p className="text-sm text-slate-500">
              Passionate about scalable systems, product engineering, and reliable web infrastructure.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200/80 p-4 rounded-xl flex items-center gap-3.5 shadow-sm">
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                <VscLocation className="text-xl" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono font-bold">Location</span>
                <span className="text-sm font-semibold text-slate-800">Philippines 🇵🇭</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl flex items-center gap-3.5 shadow-sm">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
                <VscBriefcase className="text-xl" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono font-bold">Focus</span>
                <span className="text-sm font-semibold text-slate-800">Full-Stack &amp; UX</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl flex items-center gap-3.5 shadow-sm">
              <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600">
                <VscGlobe className="text-xl" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono font-bold">Status</span>
                <span className="text-sm font-semibold text-emerald-600">Open for Work</span>
              </div>
            </div>
          </div>

          {/* Bio Summary Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              Based in the Philippines, I specialize in bridging UI design with robust backend logic. I build end-to-end web systems that prioritize fast interaction cycles, maintainable database schemes, and high accessibility standards.
            </p>
            <p className="text-xs font-mono text-slate-500">
              Core Tech Stack: TypeScript, React, Next.js, Node.js, Tailwind CSS, PostgreSQL, and REST APIs.
            </p>
          </div>

          <div className="space-y-6 pt-2">
            <TechStack />
            <GitHubActivity username="amon-mamon" />
          </div>
        </section>

        {/* ── 3. PROJECTS SECTION ─────────────────────────────── */}
        <section id="projects" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Featured Projects</h3>
              <p className="text-sm text-slate-500">
                A selection of web applications and full-stack software projects.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <VscFilter className="text-slate-400 shrink-0" />
              {["All", "Web App", "Next.js", "React"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0 ${
                    selectedTag === tag
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <VscSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
            <input
              type="text"
              placeholder="Search by project name, stack, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors shadow-sm"
            />
          </div>

          {/* Projects List */}
          {loadingProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-60 bg-white rounded-2xl border border-slate-200 animate-pulse" />
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProjectModal(project)}
                  className="group bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-5 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                        {project.project_type || "Web Application"}
                      </span>
                      {/* <VscExternalLink className="text-slate-400 group-hover:text-blue-600 transition-colors" /> */}
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {project.project_title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {project.project_description}
                    </p>
                  </div>

                  {project.project_stack && (
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {project.project_stack.split(",").map((tech, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm font-mono shadow-sm">
              No matching projects found.
            </div>
          )}
        </section>

        {/* ── 4. CONTACT SECTION ──────────────────────────────── */}
        <section id="contact" className="space-y-8">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Get in Touch</h3>
            <p className="text-sm text-slate-500">
              Send a message or reach out directly through social channels.
            </p>
          </div>

          {/* Availability Status Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div>
                <span className="text-xs font-semibold text-emerald-700 block">Status: Accepting Opportunities</span>
                <span className="text-[11px] text-slate-500 font-mono">Average Response SLA: &lt; 24 hrs</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <VscGlobe className="text-blue-600" />
              <span>Asia/Manila (UTC+8):</span>
              <span className="text-slate-900 font-bold">{timeString || "12:00:00 PM"}</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-500 font-bold">Select Inquiry Type:</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "project", label: "Project Inquiry" },
                  { id: "freelance", label: "Freelance" },
                  { id: "fulltime", label: "Full-Time Role" },
                  { id: "Bugs", label: "Feedback / Bug" },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setInquiryType(type.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      inquiryType === type.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-slate-700">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Jane Doe"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-slate-700">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    placeholder="jane@example.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-medium text-slate-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows={4}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors resize-y"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-mono">
                  {status === "loading" && <span className="text-amber-600">Sending...</span>}
                  {status === "success" && <span className="text-emerald-600 flex items-center gap-1"><VscCheck /> Message sent!</span>}
                  {status === "error" && <span className="text-rose-600 flex items-center gap-1"><VscError /> Failed to send.</span>}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  <VscRunAll className={status === "loading" ? "animate-spin" : ""} />
                  <span>{status === "loading" ? "Transmitting..." : "Send Message"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Social Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <a
              href="mailto:stoicdavid16@gmail.com"
              className="bg-white border border-slate-200 hover:border-slate-300 p-4 rounded-xl flex items-center gap-3 transition-all group shadow-sm"
            >
              <VscMail className="text-xl text-blue-600 group-hover:scale-110 transition-transform" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono font-bold">Email</span>
                <span className="text-xs font-semibold text-slate-800 truncate block">stoicdavid16@gmail.com</span>
              </div>
            </a>

            <a
              href="https://github.com/Amon-mamon"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-slate-200 hover:border-slate-300 p-4 rounded-xl flex items-center gap-3 transition-all group shadow-sm"
            >
              <VscGithub className="text-xl text-slate-800 group-hover:scale-110 transition-transform" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono font-bold">GitHub</span>
                <span className="text-xs font-semibold text-slate-800 truncate block">@Amon-mamon</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/vince-stephen-david-ab72292a0/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-slate-200 hover:border-slate-300 p-4 rounded-xl flex items-center gap-3 transition-all group shadow-sm"
            >
              <VscMention className="text-xl text-blue-600 group-hover:scale-110 transition-transform" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono font-bold">LinkedIn</span>
                <span className="text-xs font-semibold text-slate-800 truncate block">vince-stephen-david</span>
              </div>
            </a>

            <button
              onClick={() => setShowPgp(!showPgp)}
              className="bg-white border border-slate-200 hover:border-slate-300 p-4 rounded-xl flex items-center gap-3 transition-all text-left group cursor-pointer shadow-sm"
            >
              <VscKey className="text-xl text-purple-600 group-hover:scale-110 transition-transform" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono font-bold">Security</span>
                <span className="text-xs font-semibold text-slate-800 truncate block">{showPgp ? "Hide Key" : "View PGP Key"}</span>
              </div>
            </button>
          </div>

          {showPgp && (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 font-mono text-xs text-slate-600 space-y-2 animate-in fade-in duration-200 shadow-sm">
              <p className="text-amber-600 font-medium">// Fingerprint: 4A8F 9B2C 1D3E 5F7A</p>
              <pre className="bg-slate-50 p-3 rounded-xl border border-slate-200 overflow-x-auto select-all text-[11px] text-slate-500">
{`-----BEGIN PGP PUBLIC KEY BLOCK-----
mQENBF2... Vince Stephen David <stoicdavid16@gmail.com> ...
-----END PGP PUBLIC KEY BLOCK-----`}
              </pre>
            </div>
          )}
        </section>

      </main>

      {/* Project Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 text-slate-800 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-lg font-bold text-slate-900">{activeProjectModal.project_title}</h4>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="text-slate-400 hover:text-slate-700 text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {activeProjectModal.project_description}
            </p>

            {activeProjectModal.project_stack && (
              <div className="space-y-1 pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">Technologies Used</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeProjectModal.project_stack.split(",").map((tech, i) => (
                    <span key={i} className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={() => setActiveProjectModal(null)}
                className="w-full bg-slate-900 text-white font-medium py-2.5 rounded-xl text-sm hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Component */}
      <MinimalisticFooter />
    </div>
  )
}