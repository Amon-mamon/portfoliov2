"use client"
import Link from "next/link";
import { LinkPreview } from "../ui/link-preview";
import { VscSourceControl, VscError, VscWarning, VscRemote, VscFeedback, VscBell } from "react-icons/vsc";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1e1e1e] border-t border-[#2b2b2b] text-[#cccccc] font-mono text-xs">
      
      {/* ── Top Panel Header / Section Tracker ────────────── */}
      <div className="flex items-center gap-6 px-4 py-1.5 bg-[#252526] border-b border-[#2b2b2b] overflow-x-auto text-[11px] text-[#858585]">
        <span className="text-[#858585]">Header</span>
        <span className="text-[#858585]">Sidebar</span>
        <span className="text-[#858585]">Navbar</span>
        <span className="text-[#858585]">Home</span>
        <span className="text-[#858585]">About</span>
        <span className="text-[#858585]">Project</span>
        <span className="text-[#858585]">Contact</span>
        <span className="text-[#4ec9b0] font-semibold border-b border-[#007acc] pb-0.5">Footer.tsx</span>
      </div>

      {/* ── Main Footer Body (Output / Terminal Style) ───── */}
      <div className="mx-auto px-6 py-6 bg-[#181818]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <Link href="/" className="text-lg font-bold text-white tracking-tight flex items-center gap-1">
              <span className="text-[#569cd6]">const</span> vince<span className="text-[#357ec7]">dev</span> = <span className="text-[#ce9178]">&apos;&#123;&#125;&apos;</span>
            </Link>
            <p className="text-xs text-[#858585]">
              Building exceptional digital experiences.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <nav className="flex justify-center gap-6 text-xs font-medium text-[#9cdcfe]">
            <Link href="/home" className="hover:text-white hover:underline transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white hover:underline transition-colors">About</Link>
            <Link href="/project" className="hover:text-white hover:underline transition-colors">Projects</Link>
            <Link href="/contact" className="hover:text-white hover:underline transition-colors">Contact</Link>
          </nav>

          {/* Column 3: Social / Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2 text-xs">
            <div className="flex gap-4">
              <LinkPreview 
                url="https://github.com/Amon-mamon"  
                className="text-[#4ec9b0] hover:text-white transition-colors">
                GitHub
              </LinkPreview>
              <LinkPreview
                isStatic
                url="https://www.linkedin.com/in/vince-stephen-david-ab72292a0/"
                imageSrc="/linkedin-preview.png" 
                className="text-[#4ec9b0] hover:text-white transition-colors">
                LinkedIn
              </LinkPreview>
            </div>
            <p className="text-[11px] text-[#6a9955]">
              &#47;&#47; &copy; {currentYear} Vince. All rights reserved.
            </p>
          </div>

        </div>
      </div>

      {/* ── VS Code Bottom Status Bar Strip ───────────────── */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#007acc] text-white text-[11px] font-sans">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 bg-[#16825d] px-1.5 py-0.2 rounded text-[10px]">
            <VscRemote /> WSL: Ubuntu
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-gray-200">
            <VscSourceControl /> main*
          </span>
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-200">
            <VscError /> 0 <VscWarning /> 0
          </span>
        </div>

        <div className="flex items-center gap-4 hidden sm:flex">
          <span className="cursor-pointer hover:text-gray-200">UTF-8</span>
          <span className="cursor-pointer hover:text-gray-200">TypeScript React</span>
          <span className="cursor-pointer hover:text-gray-200"><VscFeedback /></span>
          <span className="cursor-pointer hover:text-gray-200"><VscBell /></span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;