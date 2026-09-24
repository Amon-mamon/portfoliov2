import { TreeViewElement } from "@/components/ui/file-tree";
import { Container, FileText } from 'lucide-react'
import { FaFilePdf } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { FaCss3Alt } from "react-icons/fa6";
import { CgReadme } from "react-icons/cg";
import { VscJson } from "react-icons/vsc";
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
                {
                  id: "activitylog",
                  type:"folder",
                  isSelectable: true,
                  name: "activity-log",
                  children: [
                    {
                      id: "activitylog",
                      isSelectable:true,
                      name:"page.tsx"
                    }
                  ]
                },
                {
                  id: "feedback",
                  type:"folder",
                  isSelectable: true,
                  name: "feedback",
                  children: [
                    {
                      id: "feedback",
                      isSelectable:true,
                      name:"page.tsx"
                    }
                  ]
                },
                {
                  id: "resume",
                  type:"folder",
                  isSelectable: true,
                  name: "resume",
                  children: [
                    {
                      id: "resume",
                      isSelectable:true,
                      name:"page.tsx"
                    }
                  ]
                },
                {
                  id: "readme",
                  type:"folder",
                  isSelectable: true,
                  name: "readme",
                  children: [
                    {
                      id: "readme",
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
               id: "reusable",
              isSelectable: true,
              name: "reusable",
              children: [
                {
                  id: "variabledeclaration",
                  isSelectable: false,
                  name: "var-declaration.tsx",
                },
                {
                  id: "clock",
                  isSelectable: false,
                  name: "clock.tsx",
                },
              ]
            },
            {
              id: "card",
              isSelectable: false,
              name: "card.tsx",
            },
            {
              id: "tech-stack",
              isSelectable: false,
              name: "tech-stack.tsx",
            },
            {
              id: "github-activty",
              isSelectable: false,
              name: "github-activity.tsx",
            },  
            {
              id: "under-development",
              isSelectable: false,
              name: "under-development.tsx",
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
              isSelectable: false,
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
              isSelectable: false,
              name: "useFooterShortcut.ts",
              serviceIcon:<BiLogoTypescript className='text-blue-400' size={"15"}/>
            },
            {
              id: "useSidebarShortcut.ts",
              isSelectable: false,
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
        },
        {
          id: "readme",
          type: "file",
          isSelectable: true,
          name: "readme.md",
          readmeIcon: <CgReadme size={15}/>
        },
        {
          id: "keybind",
          type: "file",
          isSelectable: false,
          name: "keybind.json",
          readmeIcon: <VscJson size={15} className="text-orange-400"/>
        }
      ],
    },
  ]