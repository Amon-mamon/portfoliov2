// app/admin/layout.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vince | Web Developer | Creating User-Friendly Websites", // Global title
  description:
    "Welcome to my portfolio! I'm Vince, a passionate web developer specializing in creating responsive, accessible, and interactive web applications.",
  openGraph: {
    type:"website",
    title: "Vince | Web Developer | Creating User-Friendly Websites",
    description:
      "Welcome to my portfolio! I'm Vince, a passionate web developer specializing in creating responsive, accessible, and interactive web applications.",
    images: [
      {
        url: "https://v-devs.vercel.app", // Example Open Graph image
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Only wrap children, do not add Header or Footer here!
    <section >
      {children}
    </section>
  );
}