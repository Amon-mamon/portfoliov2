"use client"
import React, { useEffect, useState } from 'react'
import { Tree, TreeViewElement } from '../ui/file-tree'
import { ID_TO_PATH, PATH_TO_ID, useSectionStore } from '@/store/useSectionStore' // adjust path to wherever this actually lives
import { usePathname, useRouter } from 'next/navigation';
import { ELEMENTS } from '../reusable/sidebar-data';

const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname()

  const setActiveSection = useSectionStore((s) => s.setActiveSection)
  const isFooterOpen = useSectionStore((s) => s.isFooterOpen)
  const toggleFooter = useSectionStore((s) => s.toggleFooter)

  // Highlight is derived directly from the URL. If the URL isn't one of
  // our known routes, fall back to undefined (nothing highlighted).
  const selectedId = pathname ? PATH_TO_ID[pathname] :undefined

  const handleSelectedIdChange = (id: string) => {
    // footer is a panel toggle, not a route
    if (id === 'footer') {
      toggleFooter()
      return
    }

    const path = ID_TO_PATH[id]
    if (!path) return // clicked a folder or unrelated file — nothing to route to

    setActiveSection(id)      // keep store in sync for anything else reading it
    router.push(path)         // real navigation
  }

  

  return (
      <div className="flex-col items-center justify-center overflow-hidden h-full border-r border-[#2b2b2b] bg-[#181818] font-mono text-xs text-[#bbbbbb] select-none">
            <h1 className='p-1.5 px-3 w-full text-[11px] font-bold tracking-wider text-[#cccccc] uppercase bg-[#252526] border-b border-[#2b2b2b] flex items-center justify-between'>
               <button className="hover:text-white uppercase">
                explorer: portfolio
               </button>
            </h1>
            <Tree 
              sort="none"
              className="overflow-hidden p-2 text-[#cccccc]"
              selectedId={selectedId}
              onSelectedIdChange={handleSelectedIdChange}
              initialExpandedItems={["src", "app", "components", "ui", "lib","public"]}
              elements={ELEMENTS}
            />
      </div>
  )
}

export default Sidebar