// src/components/Hero.tsx
import Link from 'next/link';
const Home = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row justify-center items-center gap-16  px-6 py-12 bg-gray-950 text-white border-b border-gray-800">
      
      {/* Profile Image Container */}
      <div className="relative group">
        <div className="absolute -inset-2 rounded-full bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 opacity-60 blur-lg group-hover:opacity-100 transition-opacity duration-500"></div>
        <img
          src="/1X1.png" // <-- Put image in /public folder
          alt="Vince Profile"
          className="relative rounded-full w-120 h-120 object-cover border-4 border-gray-900 shadow-2xl select-none pointer-events-none "
        />
      </div>

      {/* Text Container */}
      <div className="text-center md:text-left md:max-w-xl">
        <span className="inline-flex items-center rounded-full bg-blue-950 px-4 py-1.5 text-sm font-semibold text-blue-300 ring-1 ring-inset ring-blue-700/50 mb-6">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          Available for opportunities
        </span>

        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
          Hi, I'm <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Vince</span>.
            A Web Developer.
        </h1>

        <p className="text-xl text-gray-400 mb-10 leading-relaxed">
         I build high-performance web experiences that focus on speed and user experience. Let's build something great together.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center md:justify-start">
          <Link
            href="/project"
            className="group relative inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-950/30"
          >
            Explore Projects
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/contact"
            className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;