"use client"; // needed now, since you're reading a Zustand store here

import { useSectionStore } from "@/store/useSectionStore";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { useFooterShortcut } from "@/hooks/useFooterShortcut";
import { useSidebarShortcut } from "@/hooks/useSidebarShortcut";
import Particles from "@/components/ui/background-particles";
import FooterToolbar from "@/components/footer-toolbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const isFooterOpen = useSectionStore((state) => state.isFooterOpen);
  const isSidebarOpen = useSectionStore((state) => state.isSidebarOpen);
  useFooterShortcut(); 
  useSidebarShortcut();
  return (
    <div className="bg-[#121314] h-screen overflow-hidden flex flex-col">
      {/* <SmoothCursor /> */}
      <Header />
      <div className="flex gap-2 flex-1 min-h-0">
        <div className={`shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-72" : "w-0"}`}>

          <Sidebar />
        </div>
        <div className="flex flex-col w-full min-h-0 border-t border-l border-gray-200/5 rounded-t-md">
          <NavBar />
          <div id="page-scroll-container" className="flex-1 min-h-0 px-2 overflow-y-auto">
            {children}
          </div>
          <div
            className={`transition-all duration-300 ease-in-out border-t border-gray-200/5 ${
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