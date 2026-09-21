"use client"
import React, { useEffect, useState } from 'react'
import { Tree, TreeViewElement } from '../ui/file-tree'
import { Container, FileText } from 'lucide-react'
import { FaFilePdf } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { ID_TO_PATH, PATH_TO_ID, useSectionStore } from '@/store/useSectionStore' // adjust path to wherever this actually lives
import { usePathname, useRouter } from 'next/navigation';

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
              id: "root",
              type: "folder",
              isSelectable: true,
              name: "(root)",
              children: [
                {
                  id: "hero",
                  type:"folder",
                  isSelectable: true,
                  name: "home",
                  children: [
                    {
                      id: "hero",
                      isSelectable:true,
                      name:"page.tsx"
                    }
                  ]
                },
                {
                  id: "about",
                  type:"folder",
                  isSelectable: true,
                  name: "about",
                  children: [
                    {
                      id: "about",
                      isSelectable:true,
                      name:"page.tsx"
                    }
                  ]
                },
                {
                  id: "project",
                  type:"folder",
                  isSelectable: true,
                  name: "project",
                  children: [
                    {
                      id: "project",
                      isSelectable:true,
                      name:"page.tsx"
                    }
                  ]
                },
                {
                  id: "contact",
                  type:"folder",
                  isSelectable: true,
                  name: "contact",
                  children: [
                    {
                      id: "contact",
                      isSelectable:true,
                      name:"page.tsx"
                    }
                  ]
                },
               
              ] 
            },
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
            {
              id: "globals.css",
              isSelectable: true,
              name: "globals.css",
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
               id: "common",
              isSelectable: true,
              name: "common",
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
                  id: "footer",
                  isSelectable: true,
                  name: "footer.tsx",
                },
              ]
            },
            {
              id: "feedback",
              isSelectable: true,
              name: "feedback.tsx",
            },
            {
              id: "card",
              isSelectable: true,
              name: "card.tsx",
            },
            {
              id: "tech-stack",
              isSelectable: true,
              name: "techStack.tsx",
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
              id: "supabaseClient.ts",
              isSelectable: false,
              name: "supabaseclient.ts",
              serviceIcon:<BiLogoTypescript className='text-blue-400' size={"15"}/>
            },
            {
              id: "supabaseServer",
              isSelectable: false,
              name: "supabaseServer.ts",
              serviceIcon:<BiLogoTypescript className='text-blue-400' size={"15"}/>
            },
            {
              id: "utils",
              isSelectable: false,
              name: "utils.ts",
              serviceIcon:<BiLogoTypescript className='text-blue-400' size={"15"}/>
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
          id: "hooks",
          type: "folder",
          isSelectable: true,
          name: "hooks",
          children: [
            {
              id: "useFooterShortcut.ts",
              isSelectable: true,
              name: "useFooterShortcut.ts",
              serviceIcon:<BiLogoTypescript className='text-blue-400' size={"15"}/>
            },
            {
              id: "useSidebarShortcut.ts",
              isSelectable: true,
              name: "useSidebarShortcut.ts",
              serviceIcon:<BiLogoTypescript className='text-blue-400' size={"15"}/>
            },
          ],
        },
        {
          id: "store",
          type: "folder",
          isSelectable: true,
          name: "store",
          children: [
            {
              id: "useSectionStore.ts",
              isSelectable: true,
              name: "useSectionStore.ts",
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
        {
          id: ".env",
          type: "file",
          isSelectable: true,
          name: ".env",
          envIcon: <Container size={15}/>
        }
      ],
    },
  ]

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