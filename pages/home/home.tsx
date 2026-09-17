// src/components/Hero.tsx
import Link from 'next/link';
import { FaDownload } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { HiOutlineEquals } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Particles from '@/components/ui/background-particles';
import { useSectionStore } from '@/store/useSectionStore';

const Home = () => {
  return (
    <>
      <div id='home' className="relative flex flex-col w-full">
        {/* Scoped animations for hero content only */}
        <style jsx>{`
          @keyframes hero-gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50%      { background-position: 100% 50%; }
          }
          @keyframes hero-shimmer {
            0%   { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes hero-fade-up {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes hero-pulse-glow {
            0%, 100% { text-shadow: 0 0 18px rgba(59,130,246,0.35), 0 0 40px rgba(34,211,238,0.15); }
            50%      { text-shadow: 0 0 28px rgba(59,130,246,0.65), 0 0 60px rgba(34,211,238,0.35); }
          }
          @keyframes hero-underline-sweep {
            0%   { transform: scaleX(0); }
            100% { transform: scaleX(1); }
          }
          @keyframes hero-badge-glow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(56,189,248,0.35); }
            50%      { box-shadow: 0 0 20px 2px rgba(56,189,248,0.35); }
          }

          .hero-fade-up { animation: hero-fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both; }
          .hero-delay-1 { animation-delay: 0.1s; }
          .hero-delay-2 { animation-delay: 0.25s; }
          .hero-delay-3 { animation-delay: 0.4s; }
          .hero-delay-4 { animation-delay: 0.55s; }

          .hero-badge {
            animation: hero-badge-glow 3s ease-in-out infinite;
          }

          .hero-gradient-text {
            background-size: 220% auto;
            animation: hero-gradient-shift 6s ease-in-out infinite,
                       hero-pulse-glow 4s ease-in-out infinite;
          }

          /* Vince: animated underline that sweeps on hover */
          .hero-name {
            position: relative;
            transition: filter 0.4s ease;
          }
          .hero-name::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -6px;
            height: 3px;
            width: 100%;
            border-radius: 999px;
            background: linear-gradient(90deg, #3b82f6, #22d3ee, #3b82f6);
            background-size: 200% auto;
            transform: scaleX(0);
            transform-origin: left center;
            transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
            animation: hero-gradient-shift 4s linear infinite;
            opacity: 0.9;
          }
          .hero-name:hover::after { transform: scaleX(1); }
          .hero-name:hover { filter: drop-shadow(0 0 14px rgba(34,211,238,0.55)); }

          /* Paragraph subtle shimmer on hover */
          .hero-paragraph {
            transition: color 0.4s ease, letter-spacing 0.4s ease;
          }
          .hero-paragraph:hover {
            color: #d1d5db;
            letter-spacing: 0.005em;
          }
        `}</style>

        <div className='text-white sticky top-0 z-1000'>
          <p className='flex gap-3 items-center '>const Hero <span><HiOutlineEquals /></span> ( ) <span className='flex gap-1 items-center'><HiOutlineEquals /> <MdKeyboardDoubleArrowRight className='text-xl' /></span> {'{'}</p>
        </div>
        <p className='pl-16 text-white pt-2'>return {'('}</p>
        <div className='text-white pl-28'>
          <p className='flex items-center gap-1'><IoIosArrowBack /> main <IoIosArrowForward /></p>
        </div>

        <div className='flex flex-col md:flex-row h-full justify-center items-center'>
          {/* Profile Image Container */}
          <div className="relative group">
            <div className="absolute -inset-2 rounded-full bg-linear-to-r group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Text Container */}
          <div className="text-center md:text-left w-full h-full">
            <span className="hero-badge hero-fade-up hero-delay-1 inline-flex items-center rounded-full bg-blue-950 px-4 py-1.5 text-sm font-semibold text-blue-300 ring-1 ring-inset ring-blue-700/50 mb-6">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Available for opportunities
            </span>

            <h1 className="hero-fade-up hero-delay-2 text-4xl xl:text-7xl 2xl:text-8xl w-full font-extrabold tracking-tighter mb-6 leading-tight">
              Hi, I'm{' '}
              <span className="hero-name font-mono bg-linear-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Vince
              </span>
              .
              <br className="hidden md:block" />
              <span className="text-white/90"> A Web Developer.</span>
            </h1>

            <p className="hero-paragraph hero-fade-up hero-delay-3 text-xl text-gray-400 leading-relaxed">
              I craft fast, intuitive web experiences — from pixel-perfect interfaces to the systems that power them. Let's build something great together.
            </p>
            <p className="hero-paragraph hero-fade-up hero-delay-3 text-xl text-gray-400 leading-relaxed">
              I craft fast, intuitive web experiences — from pixel-perfect interfaces to the systems that power them. Let's build something great together.
            </p>
            <p className="hero-paragraph hero-fade-up hero-delay-3 text-xl text-gray-400 leading-relaxed">
              I craft fast, intuitive web experiences — from pixel-perfect interfaces to the systems that power them. Let's build something great together.
            </p>
            <p className="hero-paragraph hero-fade-up hero-delay-3 text-xl text-gray-400 leading-relaxed">
              I craft fast, intuitive web experiences — from pixel-perfect interfaces to the systems that power them. Let's build something great together.
            </p>
            <p className="hero-paragraph hero-fade-up hero-delay-3 text-xl text-gray-400 leading-relaxed">
              I craft fast, intuitive web experiences — from pixel-perfect interfaces to the systems that power them. Let's build something great together.
            </p>
            <p className="hero-paragraph hero-fade-up hero-delay-3 text-xl text-gray-400 leading-relaxed">
              I craft fast, intuitive web experiences — from pixel-perfect interfaces to the systems that power them. Let's build something great together.
            </p>
            <p className="hero-paragraph hero-fade-up hero-delay-3 text-xl text-gray-400 leading-relaxed">
              I craft fast, intuitive web experiences — from pixel-perfect interfaces to the systems that power them. Let's build something great together.
            </p>
            <p className="hero-paragraph hero-fade-up hero-delay-3 text-xl text-gray-400 leading-relaxed">
              I craft fast, intuitive web experiences — from pixel-perfect interfaces to the systems that power them. Let's build something great together.
            </p>
            <p className="hero-paragraph hero-fade-up hero-delay-3 text-xl text-gray-400 leading-relaxed">
              I craft fast, intuitive web experiences — from pixel-perfect interfaces to the systems that power them. Let's build something great together.
            </p>

            {/* CTA Buttons — untouched */}
            {/* <div className="flex gap-4 justify-center md:justify-start hero-fade-up hero-delay-4">
              <a
                href="/DAVID_VINCE_STEPHEN_CV.pdf"
                download="DAVID_VINCE_STEPHEN_CV.pdf"
                className="group relative inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-950/30"
              >
                Download CV
                <span className="ml-2 group-hover:animate-bounce"><FaDownload /></span>
              </a>
              <Link
                href="/contact"
                className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors"
              >
                Get in touch
              </Link>
            </div> */}
          </div>
        </div>

        <div className='text-white pl-28 mt-12'>
          <p className='flex items-center gap-1'><IoIosArrowBack /> / main <IoIosArrowForward /></p>
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