// app/projects/page.tsx (or wherever your display page is)
import { createClient } from "@/app/lib/supabaseServer"; // Adjust path if needed

// 1. Make the component async
const Project = async () => {
  // 2. Fetch data directly inside the component
  const supabase = createClient();
  const { data: projects, error } = await supabase
    .from("project_table") // Replace with your actual table name
    .select("*");

  if (error) {
    console.error("Error fetching projects:", error.message);
    return <div className="text-white">Error loading projects.</div>;
  }

  // 3. Render the fetched data
  return (
    <div className="min-h-screen bg-gray-950  text-white px-6 py-16 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size[4rem_4rem]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-7xl font-extrabold tracking-tighter mb-4">
            <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Projects
            </span>
            .
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A showcase of functional, aesthetic, and high-performance web
            applications.
          </p>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="w-1/2">
            {projects?.map((project) => (
              <div
                key={project.id}
                className="group relative bg-gray-900 rounded-3xl border border-gray-800 p-6 flex flex-col hover:border-blue-900 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/30"
              >
                {/* Image Container with Glow */}
                <div className="relative rounded-2xl overflow-hidden mb-6 h-60">
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  <img
                    src={project.project_image} // Mapped from DB
                    alt={project.project_title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Title and Description */}
                <h3 className="text-3xl font-bold tracking-tight mb-3 text-white group-hover:text-blue-300 transition-colors">
                  {project.project_title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed mb-6 grow">
                  {project.project_description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {/* Assuming project_stack is a comma-separated string in DB */}
                  {project.project_stack?.split(",").map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-gray-950 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-gray-800"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                {/* Links - Add hrefs here based on your DB columns */}
                <div className="flex gap-4 mt-auto">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-gray-800 px-4 py-2 rounded-full transition-colors"
                  >
                    Live Demo
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-full transition-colors"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Project Grid */}
      </div>
    </div>
  );
};

export default Project;
