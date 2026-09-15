import React from 'react'
import Contact from '../../pages/contact/Contact'
import Home from '../../pages/home/home'
import About from '../../pages/about/About'
import Project from '../../pages/project/Project'
import NavBar from '@/components/common/NavBar'
import Footer from '@/components/common/Footer'

const page = () => {
  return (
    <>
    <div className='bg-[#121314]  px-2 h-screen pb-32  overflow-y-auto'>
      <Home/>
      <About/>
      <Project/>
      <Contact/>   
      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
    </>
  )
}

export default page