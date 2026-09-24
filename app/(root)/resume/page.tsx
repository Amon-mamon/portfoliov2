"use client";

import VariableDeclaration from "@/components/reusable/variable-declaration";
import { 
  VscAccount, 
  VscMail, 
  VscCallOutgoing, 
  VscGlobe, 
  VscBriefcase, 
  VscTools, 
  VscFolderOpened, 
  VscMortarBoard,
  VscLinkExternal,
  VscCode
} from "react-icons/vsc";

const page = () => {
  return (
    <div className="p-4 md:p-8 text-white">
      <VariableDeclaration
        variableName="Resume"
        tagId="resume"
        tagName="section"
        >
          <div className="min-h-screen w-full  text-[#cccccc] font-mono text-xs sm:text-sm p-4 sm:p-8 space-y-6 max-w-6xl mx-auto select-text">
          {/* ── IDE WINDOW CONTAINER ─────────────────────────── */}
          <div className="bg-[#1e1e1e] border border-[#2b2b2b] rounded-lg shadow-2xl overflow-hidden">
            
            {/* Editor Title Bar */}
            <div className="bg-[#252526] px-4 py-2 border-b border-[#2b2b2b] flex items-center justify-between text-xs text-[#808080]">
              <div className="flex items-center gap-2">
                <VscCode className="text-[#569cd6]" />
                <span className="text-[#d4d4d4] font-semibold">vince_david_resume.ts</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span className="bg-[#007acc] text-white px-1.5 py-0.5 rounded">TYPESCRIPT</span>
                <span className="text-[#808080]">UTF-8</span>
              </div>
            </div>

            {/* Editor Body */}
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* ── HEADER SECTION ──────────────────────────── */}
              <header className="border-b border-[#2b2b2b] pb-6 space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                    <span className="text-[#569cd6]">const</span>
                    <span className="text-[#4ec9b0]">VINCE_STEPHEN_DAVID</span>
                    <span className="text-[#d4d4d4]">=</span>
                  </h3>
                  <p className="text-[#9cdcfe] font-semibold text-sm sm:text-base">
                    &quot;Full-Stack Developer&quot;
                  </p>
                </div>

                {/* Contact Metadata Matrix */}
                <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-[#808080] pt-2">
                  <a 
                    href="tel:+639212477004" 
                    className="flex items-center gap-1.5 hover:text-[#ce9178] transition-colors"
                  >
                    <VscCallOutgoing className="text-[#569cd6]" />
                    <span>+63 921 247 7004</span>
                  </a>

                  <a 
                    href="mailto:stoicdavid16@gmail.com" 
                    className="flex items-center gap-1.5 hover:text-[#ce9178] transition-colors"
                  >
                    <VscMail className="text-[#569cd6]" />
                    <span>stoicdavid16@gmail.com</span>
                  </a>

                  <a 
                    href="https://linkedin.com/in/vince-stephen-david" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 hover:text-[#ce9178] transition-colors"
                  >
                    <VscAccount className="text-[#569cd6]" />
                    <span>linkedin.com/in/vince-stephen-david</span>
                    <VscLinkExternal className="text-[10px]" />
                  </a>

                  {/* <a 
                    href="https://v-devs.vercel.app/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 hover:text-[#ce9178] transition-colors"
                  >
                    <VscGlobe className="text-[#569cd6]" />
                    <span>v-devs.vercel.app</span>
                    <VscLinkExternal className="text-[10px]" />
                  </a> */}
                </div>
              </header>

              {/* ── PROFILE OVERVIEW ────────────────────────── */}
              <section className="space-y-2">
                <h2 className="text-[#569cd6] font-bold text-sm flex items-center gap-2">
                  <span className="text-[#808080]">//</span>
                  <span>PROFILE</span>
                </h2>
                <p className="text-[#cccccc] leading-relaxed pl-4 border-l-2 border-[#3c3c3c]">
                  Full-stack developer with experience building and maintaining scalable web applications using React, TypeScript, Next.js, Django, and Supabase. Skilled in developing responsive user interfaces, integrating REST APIs, optimizing application performance, and implementing modern UI/UX practices. Experienced in collaborating with cross-functional teams to deliver business-critical solutions from development through deployment.
                </p>
              </section>

              {/* ── SKILLS ──────────────────────────────────── */}
              <section className="space-y-3">
                <h2 className="text-[#569cd6] font-bold text-sm flex items-center gap-2">
                  <span className="text-[#808080]">//</span>
                  <VscTools className="text-[#e5c07b]" />
                  <span>SKILLS</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                  <div className="bg-[#252526] p-3 rounded border border-[#2b2b2b] space-y-1">
                    <span className="text-[#4ec9b0] font-semibold text-xs">Frontend</span>
                    <p className="text-[#ce9178]">HTML5, CSS, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS</p>
                  </div>

                  <div className="bg-[#252526] p-3 rounded border border-[#2b2b2b] space-y-1">
                    <span className="text-[#4ec9b0] font-semibold text-xs">Backend</span>
                    <p className="text-[#ce9178]">Node.js, Python, Django</p>
                  </div>

                  <div className="bg-[#252526] p-3 rounded border border-[#2b2b2b] space-y-1">
                    <span className="text-[#4ec9b0] font-semibold text-xs">Database</span>
                    <p className="text-[#ce9178]">PostgreSQL, Supabase, NeonDB</p>
                  </div>

                  <div className="bg-[#252526] p-3 rounded border border-[#2b2b2b] space-y-1">
                    <span className="text-[#4ec9b0] font-semibold text-xs">Tools & DevOps</span>
                    <p className="text-[#ce9178]">Git, GitHub, Docker, Postman, Vercel</p>
                  </div>
                </div>
              </section>

              {/* ── WORK EXPERIENCE ─────────────────────────── */}
              <section className="space-y-4">
                <h2 className="text-[#569cd6] font-bold text-sm flex items-center gap-2">
                  <span className="text-[#808080]">//</span>
                  <VscBriefcase className="text-[#e5c07b]" />
                  <span>EXPERIENCE</span>
                </h2>

                <div className="space-y-6 pl-4 border-l-2 border-[#2b2b2b]">
                  
                  {/* Job 1 */}
                  <div className="space-y-2 relative">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h3 className="font-bold text-white text-sm">
                          Web Developer <span className="text-[#808080]">|</span> <span className="text-[#9cdcfe]">Geo Pro Global Solution Inc. — Easethetics</span>
                        </h3>
                      </div>
                      <span className="text-[#808080] text-xs font-mono shrink-0">June 2025 – Present</span>
                    </div>
                    
                    <ul className="list-disc list-inside space-y-1.5 text-[#cccccc] text-xs leading-relaxed pl-1">
                      <li>Developed and maintained responsive websites and web applications, improving load times and user experience.</li>
                      <li>Worked closely with cross-functional teams including designers, product managers, and back-end developers to implement features and fix bugs.</li>
                      <li>Ensured all web solutions adhered to SEO best practices, accessibility standards (WCAG), and cross-browser compatibility.</li>
                      <li>Conducted regular code reviews and implemented version control using Git.</li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div className="space-y-2 relative">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h3 className="font-bold text-white text-sm">
                          Full-Stack Developer Intern <span className="text-[#808080]">|</span> <span className="text-[#9cdcfe]">Geo Pro Global Solution Inc.</span>
                        </h3>
                      </div>
                      <span className="text-[#808080] text-xs font-mono shrink-0">Feb 2025 – Apr 2025</span>
                    </div>
                    
                    <ul className="list-disc list-inside space-y-1.5 text-[#cccccc] text-xs leading-relaxed pl-1">
                      <li>Completed comprehensive training in full-stack development, covering both front-end and back-end technologies.</li>
                      <li>Gained hands-on experience with modern tools and frameworks.</li>
                      <li>Collaborated in agile teams to develop web applications, participating in code reviews, testing, and deployment processes.</li>
                      <li>Applied best practices in responsive design.</li>
                    </ul>
                  </div>

                </div>
              </section>

              {/* ── FEATURED PROJECTS ───────────────────────── */}
              <section className="space-y-4">
                <h2 className="text-[#569cd6] font-bold text-sm flex items-center gap-2">
                  <span className="text-[#808080]">//</span>
                  <VscFolderOpened className="text-[#e5c07b]" />
                  <span>PROJECTS</span>
                </h2>

                <div className="space-y-6 pl-4 border-l-2 border-[#2b2b2b]">
                  
                  {/* Project 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-sm">
                        Easethetics <span className="text-[#808080] font-normal text-xs">— Web Developer</span>
                      </h3>
                    </div>
                    <ul className="list-disc list-inside space-y-1.5 text-[#cccccc] text-xs leading-relaxed pl-1">
                      <li>Refactored and optimized the frontend codebase to improve scalability, maintainability, and performance; implemented semantic HTML, modern UI/UX principles, and responsive design across devices.</li>
                      <li>Developed and enhanced system features based on business requirements, providing ongoing maintenance and bug fixes to ensure reliability.</li>
                      <li>Integrated frontend applications with backend APIs for efficient data flow and consistent client-server communication.</li>
                    </ul>
                  </div>

                  {/* Project 2 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-sm">
                        Car Rental Admin Management System <span className="text-[#808080] font-normal text-xs">— Full-Stack Developer</span>
                      </h3>
                    </div>
                    <ul className="list-disc list-inside space-y-1.5 text-[#cccccc] text-xs leading-relaxed pl-1">
                      <li>Architected and developed a full-stack rental management platform using React.js and Supabase for vehicle inventory, bookings, maintenance tracking, and customer records.</li>
                      <li>Enhanced operational efficiency by implementing automated workflows that reduced repetitive administrative tasks.</li>
                      <li>Integrated third-party APIs, including Google Forms, to automate customer inquiry management.</li>
                    </ul>
                  </div>

                </div>
              </section>

              {/* ── EDUCATION ───────────────────────────────── */}
              <section className="space-y-2">
                <h2 className="text-[#569cd6] font-bold text-sm flex items-center gap-2">
                  <span className="text-[#808080]">//</span>
                  <VscMortarBoard className="text-[#e5c07b]" />
                  <span>EDUCATION</span>
                </h2>

                <div className="pl-4 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                    <span className="font-bold text-white text-sm">Bachelor of Science in Information Technology</span>
                    <span className="text-[#808080] font-mono">2021 – 2025</span>
                  </div>
                  <p className="text-[#808080] text-xs">Mabalacat City College — Mabalacat City, Pampanga</p>
                </div>
              </section>

            </div>

          </div>

        </div>
        </VariableDeclaration>
    </div>
  );
}

export default page;