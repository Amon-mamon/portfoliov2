"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GitHubActivity from "@/components/github-activity";
import TechStack from "@/components/tech-stack";
import { ProjectItem } from "@/types/project";
import { 
  VscLocation, 
  VscBriefcase, 
  VscGlobe, 
  VscFilePdf, 
  VscMail, 
  VscGithub, 
  VscMention, 
  VscCheck,
  VscError,
  VscRunAll,
  VscSearch,
  VscFilter,
  VscArrowRight,
  VscClose
} from "react-icons/vsc";
import { MinimalisticFooter } from "@/components/common/MinimalisticFooter";
import TechStackMinimalist from "@/components/tech-stack-minimalist";
import GitHubActivityMinimalist from "@/components/github-activity-minimalist";
import MinimalisticNav from "@/components/common/MinimalisticNav";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SPA() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModal, setActiveModal] = useState<ProjectItem | null>(null);

  // Parent scroll container ref
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Section Refs for GSAP
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Fetch projects
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch("/api/project");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setProjects(data);
        }
      } catch (e) {
        console.error("Project fetch error:", e);
      } finally {
        setLoadingProjects(false);
      }
    };
    loadProjects();
  }, []);

  // GSAP Animations Setup
  useEffect(() => {
    const scroller = mainContainerRef.current;
    if (!scroller) return;

    // Refresh ScrollTrigger when container scrolls
    const ctx = gsap.context(() => {
      // Hero Entrance Animation
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }

      // Section Fade + Rise Animations
      const sections = [aboutRef.current, skillsRef.current, projectsRef.current, contactRef.current];

      sections.forEach((section) => {
        if (!section) return;

        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              scroller: scroller, // Scroller container ref
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, mainContainerRef);

    return () => ctx.revert();
  }, [loadingProjects]);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        p.project_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.project_stack?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.project_description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat =
        selectedCategory === "All" ||
        p.project_type?.toLowerCase() === selectedCategory.toLowerCase() ||
        p.project_stack?.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchSearch && matchCat;
    });
  }, [projects, searchQuery, selectedCategory]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div 
      ref={mainContainerRef}
      className="h-full overflow-y-auto bg-slate-50/60 text-slate-800 font-sans selection:bg-indigo-600 selection:text-white"
    >
      <MinimalisticNav />
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-20 space-y-12 md:space-y-32">
        
        {/* HERO SECTION */}
        <section id="home" ref={heroRef} className="space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs text-indigo-700 font-semibold">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            <span>Available for Full-Stack Roles &amp; Contracts</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Crafting reliable, <br className="hidden sm:inline" />
              <span className="text-indigo-600">modern web solutions</span>.
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              I&apos;m Vince Stephen David—a Full-Stack Developer. I craft fast, intuitive web applications — from responsive front-end interfaces to robust backend architectures.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 group bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-3 text-sm transition-all cursor-pointer"
            >
              <span>Explore Projects</span>
              <VscArrowRight className="group-hover:translate-x-2 transition-all duration-300" />
            </button>

            <a
              href="/DAVID_VINCE_STEPHEN_CV.pdf"
              download
              className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-semibold px-5 py-3 text-sm transition-all"
            >
              <VscFilePdf className="text-indigo-600 text-base" />
              <span>Download CV</span>
            </a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" ref={aboutRef} className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">About Me</h2>
            <p className="text-sm text-slate-500">Core metrics & background overview</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 flex items-center gap-3.5 border border-gray-300 hover:border-indigo-300 rounded">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <VscLocation className="text-xl" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Location</span>
                <span className="text-sm font-bold text-slate-800">Central Luzon, PH 🇵🇭</span>
              </div>
            </div>

            <div className="bg-white p-4 flex items-center gap-3.5 border border-gray-300 hover:border-indigo-300 rounded">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <VscBriefcase className="text-xl" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Experience</span>
                <span className="text-sm font-bold text-slate-800">Full-Stack Development</span>
              </div>
            </div>

            <div className="bg-white p-4 flex items-center gap-3.5 border border-gray-300 hover:border-indigo-300 rounded">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
                <VscGlobe className="text-xl" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Status</span>
                <span className="text-sm font-bold text-emerald-600">Open for Work</span>
              </div>
            </div>
          </div>

          {/* Bio card */}
          <div className="p-6 rounded-2xl leading-relaxed text-slate-700 text-sm space-y-3">
            <p className="text-sm sm:text-base leading-relaxed ">
              Based in the Philippines, I specialize in bridging design with robust engineering. I build end-to-end web applications that emphasize smooth UI performance, resilient database schemas, and intuitive user experiences.
            </p>

            <p className="text-sm leading-relaxed font-mono">
             I prioritize quality, maintainability, and efficiency by following proven development best practices and modern workflows.
            </p>
          </div>

            <GitHubActivityMinimalist username="Amon-mamon" />
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" ref={skillsRef}>
          <div className="space-y-6 mt-0 md:-mt-18">
            <TechStackMinimalist />
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" ref={projectsRef} className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Featured Projects</h2>
              <p className="text-sm text-slate-500">Project Builts and Handle</p>
            </div>

            {/* Filter Pills */}
            {/* <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <VscFilter className="text-slate-400 shrink-0" />
              {["All", "Web App", "Next.js", "React"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg border  text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div> */}
          </div>

          {/* Search Box */}
          {/* <div className="relative">
            <VscSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
            <input
              type="text"
              placeholder="Search by project name or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-colors"
            />
          </div> */}

          {/* Project Cards */}
          {loadingProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-48 bg-white rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveModal(project)}
                  className="group bg-white hover:border-indigo-300 border border-gray-300 rounded-2xl p-5 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                      {project.project_type || "Web Application"}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {project.project_title}
                    </h3>
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
            <div className="py-12 text-center bg-white rounded-2xl text-slate-500 font-mono text-sm">
              No matching projects found.
            </div>
          )}
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" ref={contactRef} className="space-y-8 ">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Get in Touch</h2>
            <p className="text-sm text-slate-500">Send a direct inquiry or start a conversation</p>
          </div>

          <div className="bg-white rounded-2xl p-6 space-y-6 border border-gray-300 hover:border-indigo-300 rounded-2xl hover:shadow-sm">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Jane Doe"
                    className="w-full border border-gray-300 rounded bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-600 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="jane@example.com"
                    className="w-full border border-gray-300 rounded bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-slate-700">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  placeholder="Share details about your inquiry..."
                  className="w-full border border-gray-300 rounded bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-600 focus:outline-none transition-colors resize-y"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-mono">
                  {status === "loading" && <span className="text-amber-600">Sending message...</span>}
                  {status === "success" && <span className="text-emerald-600 flex items-center gap-1"><VscCheck /> Message sent successfully!</span>}
                  {status === "error" && <span className="text-rose-600 flex items-center gap-1"><VscError /> Failed to send message.</span>}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center gap-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-2.5 transition-all cursor-pointer disabled:bg-slate-300"
                >
                  <VscRunAll />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          </div>

          {/* Social Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="mailto:stoicdavid16@gmail.com"
              className="bg-white p-4 flex items-center gap-3 border border-gray-300 hover:border-indigo-300 rounded transition-all group"
            >
              <VscMail className="text-xl text-indigo-600 group-hover:scale-110 transition-transform" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Direct Email</span>
                <span className="text-xs font-bold text-slate-800 truncate block">stoicdavid16@gmail.com</span>
              </div>
            </a>

            <a
              href="https://github.com/Amon-mamon"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 flex items-center gap-3 border border-gray-300 hover:border-indigo-300 rounded transition-all group"
            >
              <VscGithub className="text-xl text-slate-800 group-hover:scale-110 transition-transform" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">GitHub</span>
                <span className="text-xs font-bold text-slate-800 truncate block">@Amon-mamon</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/vince-stephen-david-ab72292a0/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 flex items-center gap-3 border border-gray-300 hover:border-indigo-300 rounded transition-all group"
            >
              <VscMention className="text-xl text-indigo-600 group-hover:scale-110 transition-transform" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">LinkedIn</span>
                <span className="text-xs font-bold text-slate-800 truncate block">vince-stephen-david</span>
              </div>
            </a>
          </div>
        </section>

      </main>

      {/* Project Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">{activeModal.project_title}</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <VscClose className="text-xl" />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {activeModal.project_description}
            </p>

            {activeModal.project_stack && (
              <div className="space-y-1 pt-2">
                <span className="text-xs font-mono text-slate-400 font-bold uppercase">Tech Stack</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeModal.project_stack.split(",").map((tech, i) => (
                    <span key={i} className="text-xs font-mono bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 text-sm transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      <MinimalisticFooter />
    </div>
  );
}