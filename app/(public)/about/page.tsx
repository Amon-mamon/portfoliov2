const About = () => {
  const skills = [
    "ReactJS", "NextJS", "TypeScript", "NodeJS", 
    "Tailwind CSS", "Supabase", "PostgreSQL", "Git",
  ];

  return (
    <div className="px-6 py-16 bg-gray-950 text-white border-b border-gray-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Creative Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-7xl mb-6 animate-bounce">🧠</span>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter mb-4">
            The <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Mind</span> Behind the Code.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            A creative developer driven by crafting functional, aesthetic digital experiences.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* About Me Column */}
          <div className="md:col-span-2 space-y-6 text-gray-300 bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-inner">
            <h2 className="text-4xl font-bold flex items-center gap-3 text-white">
              <span>👨‍💻</span> About Me
            </h2>
            
            <p className="leading-relaxed text-lg text-gray-200">
              Based in the Philippines, I am a passionate developer focused on bridging the gap between design and functionality.
            </p>
            <p className="leading-relaxed text-gray-400">
              I specialize in building full-stack web applications, ensuring that every project is not only visually stunning but also technically robust, scalable, and user-centric. I believe in writing clean, maintainable code that delivers real value.
            </p>
            <p className="leading-relaxed text-gray-400">
              When I'm not coding, I'm exploring new design trends or optimizing performance workflows.
            </p>
          </div>

          {/* Tech Stack Column - Network Graph Effect */}
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 relative overflow-hidden">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3 text-white relative z-10">
              <span>💻</span> Tech Stack
            </h2>
            
            {/* Visual Skills Nodes */}
            <div className="relative flex flex-wrap gap-4 justify-center">
              {skills.map((skill) => (
                <div 
                  key={skill}
                  className="bg-gray-950 text-gray-200 px-5 py-3 rounded-2xl border border-gray-800 
                             hover:border-blue-500 hover:text-white hover:scale-110 
                             transition-all duration-300 cursor-default shadow-lg
                             relative z-10 flex items-center justify-center
                             hover:bg-blue-950/30"
                >
                  <span className="font-semibold text-sm tracking-wide">{skill}</span>
                </div>
              ))}
              
              {/* Background decorative elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-500 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-cyan-500 rounded-lg rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default About;