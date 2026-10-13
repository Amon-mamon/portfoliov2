// hooks/useFooterShortcut.ts
"use client";
import { useEffect } from "react";
import { useSectionStore } from "@/store/useSectionStore";

export function useFooterShortcut() {
  const toggleFooter = useSectionStore((state) => state.toggleFooter);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack the shortcut while the user is typing in a form field
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (isTyping) return;

      // Ctrl + ` — matches VS Code's toggle terminal shortcut (Mac uses Ctrl even though Cmd is the usual modifier)
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault(); // stops the browser from doing anything weird with backtick
        toggleFooter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleFooter]);
}