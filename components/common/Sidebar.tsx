import React from 'react'
import { Tree, TreeViewElement } from '../ui/file-tree'
const Sidebar = () => {

    const ELEMENTS: TreeViewElement[] = [
  {
    id: "src",
    type: "folder",
    isSelectable: true,
    name: "src",
    children: [
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
        id: "public",
        type: "folder",
        isSelectable: true,
        name: "public",
        children: [
          {
            id: "resume.pdf",
            isSelectable: true,
            name: "resume.pdf",
          },
        ],
      },
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
            isSelectable: true,
            name: "header.tsx",
          },
          {
            id: "ui",
            type: "folder",
            isSelectable: true,
            name: "ui",
            children: [
              {
                id: "button",
                isSelectable: true,
                name: "button.tsx",
              },
            ],
          },
          {
            id: "footer",
            isSelectable: true,
            name: "footer.tsx",
          },
        ],
      },
    ],
  },
]
  return (
      <div className="bg-[#121314] fixed h-screen flex w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-200/5">
            <h1 className='p-1 w-full text-white'>
              portfolio
            </h1>
            <Tree
              className="overflow-hidden rounded-md p-2"
              initialSelectedId="button"
              initialExpandedItems={["src", "app", "components", "ui", "lib","public"]}
              elements={ELEMENTS}
            />
      </div>
  )
}

export default Sidebar