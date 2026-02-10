import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Vince | Web Developer | Creating User-Friendly Websites", // Global title
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
