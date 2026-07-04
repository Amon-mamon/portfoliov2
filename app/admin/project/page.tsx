// app/admin/project/page.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { signOutAction } from "@/app/actions";
import { addProjectAction } from "../action";
import { createClient } from "@/app/lib/supabaseClient";
import { redirect } from "next/navigation";

const Page = () => {
  const [state, action, isPending] = useActionState(addProjectAction, null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<any | null[]>(null)
   const supabase = createClient();
  useEffect(() => {
    const checkUser = async () => {
     
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        redirect("/admin");
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const fetchProjects = async () => {
    const {data:projects} = await supabase.from("project_table").select("*")
    setProjects(projects)

  }
  useEffect(() => {
    fetchProjects()
  },[])

  const handleLogout = async () => {
      await signOutAction()
  }


  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
      
      {state?.error && (
        <p className="text-red-500 mb-4 bg-red-50 p-3 rounded">
          Error: {state.error}
        </p>
      )}
      
        <button onClick={() => handleLogout()} type="submit" className="text-sm text-red-600 hover:text-red-800">
          Sign Out
        </button>
      
      {/* 1. Ensure the form has encType set for file uploads */}
      <form action={action} className="space-y-4" encType="multipart/form-data">
       <div>
          <label htmlFor="type" className="block text-sm font-medium">Project Type</label>
          <input id="type" type="text" name="type" required className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Project Title</label>
          <input id="title" type="text" name="title" required className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
        </div>

        <div>
          <label htmlFor="stack" className="block text-sm font-medium">Tech Stack</label>
          <input id="stack" type="text" name="stack" placeholder="e.g. React, Next.js, Supabase" required className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea id="description" name="description" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows={4}/>
        </div>

        <div>
          {/* 2. Change input type to file */}
          <label htmlFor="projectImage" className="block text-sm font-medium">
            Project Image
          </label>
          <input
            id="projectImage"
            type="file" // File input
            name="projectImage" // Updated name
            accept="image/*" // Restrict to images
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? "Adding..." : "Add Project"}
        </button>
      </form>

      {projects?.map((project:any) => (
              <div
                key={project.id}
                className="group relative bg-gray-900 rounded-3xl w-2xl border border-gray-800 p-6 flex flex-col hover:border-blue-900 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/30"
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
                    <div className="flex justif-start w-full">
                <p className=" text-white border border-blue-200 py px-4 rounded bg-blue-600 mb-2">{project.project_type}</p>
                  </div>
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
  );
};

export default Page;