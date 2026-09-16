"use client"
import React, { useEffect, useRef } from 'react'
import Contact from '../../pages/contact/Contact'
import Home from '../../pages/home/home'
import About from '../../pages/about/About'
import Project from '../../pages/project/Project'
import NavBar from '@/components/common/NavBar'
import Footer from '@/components/common/Footer'
import { SmoothCursor } from '@/components/ui/smooth-cursor'
import { useSectionStore } from '@/store/useSectionStore' // adjust path to wherever this actually lives

// Must match the ids used in Sidebar.tsx's TREE_ID_TO_SECTION map
const SECTION_IDS = ['home', 'about', 'project', 'contact']

const page = () => {
  const setActiveSection = useSectionStore((state) => state.setActiveSection)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
    <div ref={scrollContainerRef} id="page-scroll-container" className='bg-[#121314]  px-2 h-screen  overflow-y-auto'>
     {/* <div className='text-white px-6'>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
     </div> */}
      {/* <div className='w-full'> */}
        <SmoothCursor/>
          <div id="home"><Home/></div>
          {/* <div id="about"><About/></div>
          <div id="project"><Project/></div>
          <div id="contact"><Contact/></div> */}
          
      {/* </div> */}
    </div>
    </>
  )
}

export default page