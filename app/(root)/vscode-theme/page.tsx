"use client"
import React, { useEffect, useRef, useState } from "react";
import Home from '../../../features/home/home'
import { useSectionStore } from '@/store/useSectionStore' // adjust path to wherever this actually lives
import { getProjects } from "@/service/project.service";
import { ProjectItem } from "@/types/project";

// Must match the ids used in Sidebar.tsx's TREE_ID_TO_SECTION map
const SECTION_IDS = ['home', 'about', 'project', 'contact']

const page = () => {
  const setActiveSection = useSectionStore((state) => state.setActiveSection)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  useEffect(() => {
    let active = true;
    getProjects()
      .then((res) => {
        const list = Array.isArray(res)
          ? res
          : ((res as { projects?: ProjectItem[] })?.projects ?? []);
        if (active) setProjects(list);
      })
      .catch((err) => console.error("Failed to load projects:", err));
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    const root = scrollContainerRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Of all sections currently on screen, pick whichever has the
        // largest visible portion and treat that as "active".
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (mostVisible?.target.id) {
          setActiveSection(mostVisible.target.id)
        }
      },
      {
        root, // observe visibility relative to the scrollable div, not the window
        threshold: [0.25, 0.5, 0.75],
      }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [setActiveSection])

  return (
    <>
      <div
        ref={scrollContainerRef}
        id="page-scroll-container"
        className="bg-[#121314] overflow-y-hidden"
      >
        <div id="home">
          <Home projects={projects} />
        </div>
      </div>
    </>
  );
}

export default page