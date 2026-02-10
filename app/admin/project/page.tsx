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
  
  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        redirect("/admin");
      }
      setIsLoading(false);
    };

    checkUser();
  }, []);

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
      
      <form action={signOutAction}>
        <button type="submit" className="text-sm text-red-600 hover:text-red-800">
          Sign Out
        </button>
      </form>
      
      {/* 1. Ensure the form has encType set for file uploads */}
      <form action={action} className="space-y-4" encType="multipart/form-data">
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
    </div>
  );
};

export default Page;