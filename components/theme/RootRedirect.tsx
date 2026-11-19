"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { THEME_COOKIE, THEME_ROUTES, isThemeMode, writeThemeCookie } from "@/lib/themeCookie";

/** Fallback for returning visitors who chose a theme before the cookie existed. */
export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem(THEME_COOKIE);
    if (isThemeMode(saved)) {
      writeThemeCookie(saved);
      router.replace(THEME_ROUTES[saved]);
    }
  }, [router]);

  return null;
}
