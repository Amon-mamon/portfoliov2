import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], display: "swap" });

export default function MinimalistLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${geist.className} h-full`}>{children}</div>;
}
