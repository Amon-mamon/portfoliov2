import { TreeViewElement } from "@/components/ui/file-tree";
import { Container, FileText } from 'lucide-react'
import { FaFilePdf } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { FaCss3Alt } from "react-icons/fa6";
export const ELEMENTS: TreeViewElement[] = [
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
              globalCssIcon:<FaCss3Alt className='text-blue-500' size={15}/>
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