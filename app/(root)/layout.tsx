// app/(public)/layout.tsx

import Sidebar from "@/components/common/Sidebar";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import NavBar from "@/components/common/NavBar";


export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <div className="bg-[#121314]">
        <Header />
      <div className="w-full flex gap-2">
            <div className="w-1/4">
              <Sidebar/>
            </div>
            <div className="w-full border-t border-l border-gray-200/5 rounded-t-md">
              <NavBar/>
              {children}
            </div>
      </div>
    </div>
    </>
  );
}