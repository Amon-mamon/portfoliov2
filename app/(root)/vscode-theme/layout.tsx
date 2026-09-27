"use client";

import { useEffect, useState } from "react";
import { useSectionStore } from "@/store/useSectionStore";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { useFooterShortcut } from "@/hooks/useFooterShortcut";
import { useSidebarShortcut } from "@/hooks/useSidebarShortcut";
import { VscLoading } from "react-icons/vsc";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  const isFooterOpen = useSectionStore((state) => state.isFooterOpen);
  const isSidebarOpen = useSectionStore((state) => state.isSidebarOpen);

  useFooterShortcut(); 
  useSidebarShortcut();

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Loading Skeleton / Unmounted Fallback ──────────────────────────────
  if (!mounted) {
    return (
      <div className="bg-[#121314] h-screen overflow-hidden flex flex-col items-center justify-center font-mono text-xs text-[#808080]">
        <div className="flex items-center gap-2 bg-[#1e1e1e] border border-[#2b2b2b] px-4 py-2 rounded-md shadow-lg">
          <VscLoading className="animate-spin text-[#007acc] text-base" />
          <span className="text-[#cccccc]">Initializing workspace...</span>
        </div>
      </div>
    );
  }

  // ── Main Layout ────────────────────────────────────────────────────────
  return (
    <div className="bg-[#121314] h-screen overflow-hidden flex flex-col">
      {/* <SmoothCursor /> */}
      <Header />
      <div className="flex gap-2 flex-1 min-h-0">
        <div
          className={`shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-72" : "w-0"
          }`}
        >
          <Sidebar />
        </div>
        <div className="flex flex-col w-full min-h-0 border-t border-l border-gray-200/5 rounded-t-md">
          <div className="shrink-0">
            <NavBar />
          </div>
          <div id="page-scroll-container" className="flex-1 px-2 overflow-y-auto">
            {children}
          </div>
          <div
            className={`transition-all duration-300 ease-in-out border-t border-gray-200/5 overflow-hidden ${
              isFooterOpen ? "h-0" : "h-72"
            }`}
          >
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}