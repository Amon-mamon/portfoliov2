import { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Particles from "@/components/ui/background-particles";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { ThemeOnboardingProvider } from "@/components/ThemeOnboardProvider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono", // exposes it as a CSS variable
  weight: ["400", "500", "700"], // pick whichever weights you'll actually use
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Vince | Web Developer", // Global title
  description:
    "Welcome to my portfolio! I'm Vince, a passionate web developer specializing in creating responsive, accessible, and interactive web applications.",
    verification: {
    google: "wN764yalHKrGK0gm2uuXTx9hhZPxgTLijiVJuk1ARqM", 
  },
  openGraph: {
    type:"website",
    title: "Vince | Web Developer | Creating User-Friendly Websites",
    description:
      "Welcome to my portfolio! I'm Vince, a passionate web developer specializing in creating responsive, accessible, and interactive web applications.",
    images: [
      {
        url: "https://v-devs.vercel.app/image.png", // Example Open Graph image
        width: 1200,
        height: 630,
        alt: "Vince's Portfolio",
      },
    ],
    url: "https://v-devs.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://v-devs.vercel.app",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full w-full text-[#d4d4d4] antialiased overflow-hidden">
        <ThemeOnboardingProvider>
          {children}
        </ThemeOnboardingProvider>
      </body>
    </html>
  )
}
