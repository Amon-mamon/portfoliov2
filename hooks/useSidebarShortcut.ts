"use client";
import { useEffect } from "react";
import { useSectionStore } from "@/store/useSectionStore";

export function useSidebarShortcut() {
  const toggleSidebar = useSectionStore((state) => state.toggleSidebar);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack the shortcut while the user is typing in a form field
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (isTyping) return;

      // Ctrl + B — matches VS Code's toggle primary sidebar shortcut
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        toggleSidebar();

        // Dispatch immediately when transition starts
        window.dispatchEvent(new Event("resize"));

        // Dispatch again when the 300ms width transition finishes
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 310);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
}