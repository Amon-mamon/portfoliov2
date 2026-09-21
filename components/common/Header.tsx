'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  VscCode, 
  VscSearch, 
  VscSourceControl, 
  VscChromeMinimize, 
  VscChromeMaximize, 
  VscChromeClose,
  VscTerminal
} from 'react-icons/vsc';
import { LuMessageSquareDot } from "react-icons/lu";
import Clock from './Clock';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#1e1e1e] border-b border-[#2b2b2b] text-[#cccccc] font-mono text-xs select-none">
      
      {/* ── Top IDE Title Bar ────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#181818] border-b border-[#2b2b2b] text-[11px]">
        
        {/* Left: Brand Logo & IDE Menu */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1.5 font-bold text-white hover:text-[#007acc] transition-colors">
            <span className="bg-[#007acc] text-white p-1 rounded">
              <VscCode className="text-xs" />
            </span>
            <span className="tracking-tight text-xs">vincedev<span className="text-[#569cd6]">.ide</span></span>
          </Link>

          <ul className="hidden md:flex items-center gap-3 text-[#808080]">
            <li className="hover:text-white cursor-pointer transition-colors">File</li>
            <li className="hover:text-white cursor-pointer transition-colors">Edit</li>
            <li className="hover:text-white cursor-pointer transition-colors">Selection</li>
            <li className="hover:text-white cursor-pointer transition-colors">View</li>
            <li className="hover:text-white cursor-pointer transition-colors">Go</li>
            <li className="hover:text-white cursor-pointer transition-colors">Terminal</li>
          </ul>
        </div>

        {/* Center: Command Palette / Search Input */}
        <div className="flex-1 max-w-md mx-4">
          <div className="flex items-center gap-2 bg-[#252526] border border-[#3c3c3c] focus-within:border-[#007acc] px-2.5 py-1 rounded text-[#808080] transition-colors">
            <VscSearch className="text-sm shrink-0" />
            <input 
              type="text" 
              placeholder="vincedev-portfolio (Workspace) — Search files..."
              className="w-full bg-transparent outline-none text-[#cccccc] text-[11px] placeholder-[#808080]"
            />
            <div className="flex items-center gap-1 shrink-0 border-l border-[#3c3c3c] pl-2">
              <Link href="/contact" title="Open Discussion / Contact">
                <LuMessageSquareDot className="text-sm text-[#808080] hover:text-[#4ec9b0] cursor-pointer transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Clock & Window Controls */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-[#808080]">
            <Clock />
          </div>

          {/* VS Code Window Controls */}
          <div className="flex items-center gap-2.5 text-[#808080] ml-2">
            <VscChromeMinimize className="hover:text-white cursor-pointer" />
            <VscChromeMaximize className="hover:text-white cursor-pointer" />
            <VscChromeClose className="hover:text-[#f14c4c] cursor-pointer" />
          </div>
        </div>
      </div>

      {/* ── Editor Open Tabs Bar (Navigation Links) ──────── */}
    </header>
  );
};

export default Header;