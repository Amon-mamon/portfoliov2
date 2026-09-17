import { create } from 'zustand'

type SectionStore = {
    activeSection:string;
    setActiveSection: (id:string) => void;
    isFooterOpen: boolean
    toggleFooter: () => void
    closeFooter: () => void
    isSidebarOpen: boolean
    toggleSidebar: () => void
    closeSidebar: () => void
}

export const useSectionStore = create<SectionStore>((set) => ({
        activeSection: 'home',
        setActiveSection: (id) => set({activeSection:id}),
        isFooterOpen:false,
        toggleFooter: () => set((state) => ({ isFooterOpen: !state.isFooterOpen })),
        closeFooter: () => set({ isFooterOpen: false }),
        isSidebarOpen: true,
        toggleSidebar: () => set((state) => ({isSidebarOpen: !state.isSidebarOpen})),
        closeSidebar: () => set({ isSidebarOpen: false})
}))