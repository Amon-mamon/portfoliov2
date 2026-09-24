// components/common/Clock.tsx
"use client";
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date()); // set immediately on mount
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null; // avoids hydration mismatch (server has no "current time")

  const formatted = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return <span className="text-sm text-gray-300 font-mono">{formatted}</span>;
}