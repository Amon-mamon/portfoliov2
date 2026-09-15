// app/(public)/layout.tsx

import Sidebar from "@/components/common/Sidebar";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import NavBar from "@/components/common/NavBar";
import { SmoothCursor } from "@/components/ui/smooth-cursor";


export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    {/* h-screen + overflow-hidden locks this to exactly one viewport tall,
        so the document itself can never scroll. flex-col stacks Header
        (natural height) above the row (fills whatever's left). */}
    <div className="bg-[#121314] h-screen overflow-hidden flex flex-col">
      <SmoothCursor/>
        <Header />
      {/* flex-1 min-h-0: takes the remaining height below Header.
          min-h-0 is required — without it flex children refuse to shrink
          below their content size and this row would overflow the screen. */}
      <div className="flex gap-2 flex-1 min-h-0">
            <div className="h-full">
              <Sidebar/>
            </div>
            <div className="w-full h-full flex flex-col min-h-0 border-t border-l border-gray-200/5 rounded-t-md">
              <NavBar/>
              {/* This wrapper is what actually gets a fixed, real height
                  to hand down to page.tsx's h-full scroll container. */}
              <div className="flex-1 min-h-0">
                {children}
              </div>
            </div>
      </div>
    </div>
    </>
  );
}