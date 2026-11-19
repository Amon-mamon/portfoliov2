import { Metadata } from "next";
import "./globals.css";
import { ThemeOnboardingProvider } from "@/components/ThemeOnboardProvider";
import QueryProvider from "@/components/provider/QueryClientProvider";

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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full w-full text-[#d4d4d4] antialiased overflow-hidden max-w-[2000px] mx-auto">
        <ThemeOnboardingProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeOnboardingProvider>
      </body>
    </html>
  )
}
