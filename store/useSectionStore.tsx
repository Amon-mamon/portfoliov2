import { create } from 'zustand'

type SectionStore = {
    activeSection:string;
    setActiveSection: (id:string) => void;
}

export const useSectionStore = create<SectionStore>((set) => ({
        activeSection: 'home',
        setActiveSection: (id) => set({activeSection:id})
}))