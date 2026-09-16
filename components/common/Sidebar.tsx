"use client"
import React, { useEffect, useState } from 'react'
import { Tree, TreeViewElement } from '../ui/file-tree'
import { FileText } from 'lucide-react'
import { FaFilePdf } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { useSectionStore } from '@/store/useSectionStore' // adjust path to wherever this actually lives

// Maps a tree item's id -> the section id used by the store / page.tsx
const TREE_ID_TO_SECTION: Record<string, string> = {
  hero: 'home',
  about: 'about',
  project: 'project',
  contact: 'contact',
}

// Reverse lookup: section id -> tree item id, so the sidebar can highlight
// the right item when the store's activeSection changes from scrolling.
const SECTION_TO_TREE_ID: Record<string, string> = Object.fromEntries(
  Object.entries(TREE_ID_TO_SECTION).map(([treeId, sectionId]) => [sectionId, treeId])
)

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<Boolean>(false)
  const activeSection = useSectionStore((state) => state.activeSection)
  const setActiveSection = useSectionStore((state) => state.setActiveSection)

  // Footer panel state — footer.tsx isn't a scrollable section, it toggles
  // a VS-Code-terminal-style bottom panel instead.
  const isFooterOpen = useSectionStore((state) => state.isFooterOpen)
  const toggleFooter = useSectionStore((state) => state.toggleFooter)

  // What the Tree currently highlights. Starts synced to whatever section
  // is active, but also updates instantly on click for snappy feedback.
  const [selectedId, setSelectedId] = useState<string | undefined>(
    SECTION_TO_TREE_ID[activeSection]
  )

  // Keep the sidebar highlight in sync when the ACTIVE SECTION changes
  // because the user scrolled (see the IntersectionObserver in page.tsx).
  // Skipped while the footer panel is open so "footer" stays highlighted
  // instead of being overridden by whatever section is behind it.
  useEffect(() => {
    if (isFooterOpen) return
    const treeId = SECTION_TO_TREE_ID[activeSection]
    if (treeId) {
      setSelectedId(treeId)
    }
  }, [activeSection, isFooterOpen])

  // If the footer panel gets closed some other way (e.g. an X button on
  // the panel itself, not via clicking footer.tsx again), fall back the
  // highlight to whatever section is actually active.
  useEffect(() => {
    if (!isFooterOpen) {
      const treeId = SECTION_TO_TREE_ID[activeSection]
      if (treeId) setSelectedId(treeId)
    }
  }, [isFooterOpen, activeSection])

  const handleSelectedIdChange = (id: string) => {
    setSelectedId(id) // instant highlight for any item, including folders

    // Footer isn't a scrollable section — it toggles the bottom panel
    if (id === 'footer') {
      toggleFooter()
      return
    }

    const sectionId = TREE_ID_TO_SECTION[id]
    if (!sectionId) return // clicked a folder or a non-section file, nothing to scroll to

    setActiveSection(sectionId)

    const container = document.getElementById('page-scroll-container')
    const target = document.getElementById(sectionId)
    if (container && target) {
      // Scroll only the inner container's scrollTop — never scrollIntoView,
      // which can also scroll the document/body and push a Header sitting
      // above this container out of view.
      const top =
        target.getBoundingClientRect().top -
        container.getBoundingClientRect().top +
        container.scrollTop
      container.scrollTo({ top, behavior: 'smooth' })
    }
  }

    const ELEMENTS: TreeViewElement[] = [
  {
    id: "src",
    type: "folder",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "app",
        type: "folder",
        isSelectable: true,
        name: "app",
        children: [
          {
            id: "page",
            isSelectable: true,
            name: "page.tsx",
          },
          {
            id: "layout",
            isSelectable: true,
            name: "layout.tsx",
          },
        ],
      },
      {
        id: "components",
        type: "folder",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "header",
            isSelectable: false,
            name: "header.tsx",
          },
          {
            id: "sidebar",
            isSelectable: false,
            name: "sidebar.tsx",
          },
          {
            id: "hero",
            isSelectable: true,
            name: "hero.tsx",
          },
          {
            id: "about",
            isSelectable: true,
            name: "about.tsx",
          },
          {
            id: "project",
            isSelectable: true,
            name: "project.tsx",
          },
          {
            id: "contact",
            isSelectable: true,
            name: "contact.tsx",
          },
          {
            id: "feedback",
            isSelectable: true,
            name: "feedback.tsx",
          },
          {
            id: "footer",
            isSelectable: true,
            name: "footer.tsx",
          },
        ],
      },
      {
        id: "lib",
        type: "folder",
        isSelectable: true,
        name: "lib",
        children: [
          {
            id: "utils",
            isSelectable: true,
            name: "utils.ts",
          },
        ],
      },
      {
        id: "services",
        type: "folder",
        isSelectable: true,
        name: "services",
        children: [
          {
            id: "service.ts",
            isSelectable: true,
            name: "service.ts",
            serviceIcon:<BiLogoTypescript className='text-blue-400' size={"15"}/>
          },
        ],
      },
      {
        id: "public",
        type: "folder",
        isSelectable: true,
        name: "public",
        children: [
          {
            id: "resume.pdf",
            isSelectable: true,
            name: "resume.pdf",
            pdfIcon: <FaFilePdf className='text-red-500' size={"15"}/>
          },
        ],
      },
      
      
    ],
  },
]
  return (
      <div className={`bg-[#121314] h-full flex ${isCollapsed ? "w-[60px]" : "w-[300px]"} flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-200/5`}>
            <h1 className='p-1 w-full text-white'>
               <button onClick={() => setIsCollapsed(!isCollapsed)}>
                portfolio
                </button>
            </h1>
            <Tree 
              sort="none"
              className="overflow-hidden rounded-md p-2"
              selectedId={selectedId}
              onSelectedIdChange={handleSelectedIdChange}
              initialExpandedItems={["src", "app", "components", "ui", "lib","public"]}
              elements={ELEMENTS}
            />
      </div>
  )
}

export default Sidebar