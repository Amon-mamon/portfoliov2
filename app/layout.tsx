import { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Particles from "@/components/ui/background-particles";
import { BetaNoticeModal } from "./components/BetaNoticeModal";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

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
        url: "https://v-devs.vercel.app/meta.png", // Example Open Graph image
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`max-w-[2000px] mx-auto relative ${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased overflow-hidden`}
      >
        <BetaNoticeModal contactEmail="your-email@example.com" />
          {/* <Particles
          className='w-full h-screen absolute'
          particleColors={["#a2a0a0"]}
          particleCount={600}
          particleSpread={10}
          speed={0.3}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={true}
          pixelRatio={1}
        />  */}
        <SmoothCursor/>
        {children}

        <button className="bg-red-200 absolute left-3 bottom-3 w-15 h-15 rounded-full text-5xl font-extrabold">?</button>
      </body>
    </html>
  );
}
