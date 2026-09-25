import { create } from 'zustand'

// tree/file id -> URL path. Used by Sidebar + NavBar to route.
export const ID_TO_PATH: Record<string, string> = {
  hero: '/vscode-theme/',
  about: '/vscode-theme/about',
  project: '/vscode-theme/project',
  contact: '/vscode-theme/contact',
  resume: '/vscode-theme/resume',
  readme: '/vscode-theme/readme',
  activitylog: '/vscode-theme/activity-log',
  feedback: '/vscode-theme/feedback',
  // keybind:'/keybind-json'
}

// URL path -> tree/file id (reverse of above)
export const PATH_TO_ID: Record<string, string> = Object.fromEntries(
  Object.entries(ID_TO_PATH).map(([id, path]) => [path, id])
)

type SectionStore = {
  activeSection: string
  setActiveSection: (id: string) => void
  isFooterOpen: boolean
  toggleFooter: () => void
  closeFooter: () => void
  isSidebarOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
}

export const useSectionStore = create<SectionStore>((set) => ({
  activeSection: 'home',
  setActiveSection: (id) => set({ activeSection: id }),
  isFooterOpen: false,
  toggleFooter: () => set((s) => ({ isFooterOpen: !s.isFooterOpen })),
  closeFooter: () => set({ isFooterOpen: false }),
  isSidebarOpen: true,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
}))