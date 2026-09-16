// src/components/Hero.tsx
import Link from 'next/link';
import { FaDownload } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { HiOutlineEquals } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import { useSectionStore } from '@/store/useSectionStore';
import Particles from '@/components/ui/background-particles';

const Home = () => {
  return (
  <>
      <div id='home' className=" relative flex flex-col">
          <Particles
              className='w-full h-screen absolute'
              particleColors={["#a2a0a0"]}
              particleCount={300}
              particleSpread={10}
              speed={0.3}
              particleBaseSize={100}
              moveParticlesOnHover={false}
              alphaParticles={false}
              disableRotation={true}
              pixelRatio={1}
          />
          <div className='text-white sticky top-0 z-1000'>
            <p className='flex gap-3 items-center bg-[#121314]'>const Hero <span><HiOutlineEquals/></span> ( ) <span className='flex gap-1 items-center'><HiOutlineEquals/> <MdKeyboardDoubleArrowRight className='text-xl'/></span> {'{'}</p>
          </div>
            <p className='pl-12 text-white pt-2'>return {'('}</p>
          <div className='text-white pl-24'>
            <p className='flex items-center gap-1'><IoIosArrowBack /> main <IoIosArrowForward/></p>
          </div>
        <div className='flex flex-col md:flex-row h-screen justify-center items-center gap-16'>
              {/* Profile Image Container */}
            <div className="relative group">
              <div className="absolute -inset-2 rounded-full bg-linear-to-r  group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* <img
                src="/" // <-- Put image in /public folder
                alt="Vince Profile"
                className="relative rounded-full w-120 h-120 object-cover border-4 border-gray-900 shadow-2xl select-none pointer-events-none "
              /> */}
            </div>
            
            {/* Text Container */}
            <div className="text-center md:text-left w-ful">
              <span className="inline-flex items-center rounded-full bg-blue-950 px-4 py-1.5 text-sm font-semibold text-blue-300 ring-1 ring-inset ring-blue-700/50 mb-6">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                Available for opportunities
              </span>

              <h1 className="text-8xl w-full font-extrabold tracking-tighter mb-6 leading-tight">
                Hi, I'm <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Vince</span>.
                  A Web Developer.
              </h1>

              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              I build high-performance web experiences that focus on speed and user experience. Let's build something great together.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 justify-center md:justify-start">
                {/* <Link
                  href="/project"
                  className="group relative inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-950/30"
                >
                  Explore Projects
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link> */}
                <a
                  href="/DAVID_VINCE_STEPHEN_CV.pdf"
                  download="DAVID_VINCE_STEPHEN_CV.pdf"
                  className="group relative inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-950/30"
                >
                  Download CV
                  <span className="ml-2 group-hover:animate-bounce"><FaDownload/></span>
                </a>
                <Link
                  href="/contact"
                  className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
            <div className='text-white pl-24'>
              <p className='flex items-center gap-1'><IoIosArrowBack /> / main <IoIosArrowForward/></p>
            </div>
            <div className='text-white'>
              <p className='pl-12'>{');'}</p>
              <p>{'};'}</p>
            </div>
        </div>
          <div className='text-white'>
              <p>export default Hero;</p>
          </div>
  </>
  );
};

export default Home;