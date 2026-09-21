"use client";

import { useActionState, useEffect, useState } from "react";
import { signOutAction } from "@/app/actions";
import { addProjectAction } from "../action";
import { createClient } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import { 
  VscSignOut, 
  VscAdd, 
  VscTrash, 
  VscFolder, 
  VscCode, 
  VscSymbolVariable, 
  VscCloudUpload, 
  VscLoading, 
  VscError,
  VscEdit,
  VscClose
} from "react-icons/vsc";

interface ProjectItem {
  id: number;
  project_title: string;
  project_type: string;
  project_description: string;
  project_stack?: string;
  project_image: string;
  live_url?: string;
  github_url?: string;
}

const initialFormData = {
  title: "",
  type: "",
  stack: "",
  description: "",
};

const Page = () => {
  const [state, action, isPending] = useActionState(addProjectAction, null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  
  // Form State for both Create and Edit modes
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const supabase = createClient();

  // Auth check
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

  // Fetch Projects Data
  const fetchData = async () => {
    try {
      const res = await fetch('/api/project');
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Error fetching data');
      }
      setProjects(result);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await signOutAction();
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from("project_table")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete failed:", error.message);
    } else {
      setProjects((prev) => prev.filter((project) => project.id !== id));
      if (editingProject?.id === id) {
        cancelEdit();
      }
    }
  };

  // Populate Edit Form
  const startEditing = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      title: project.project_title || "",
      type: project.project_type || "",
      stack: project.project_stack || "",
      description: project.project_description || "",
    });
    setEditError(null);
  };

  // Cancel Edit Mode & Reset Form
  const cancelEdit = () => {
    setEditingProject(null);
    setFormData(initialFormData);
    setEditError(null);
  };

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Execute Edit Update in Supabase
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProject) return;

    setIsUpdating(true);
    setEditError(null);

    try {
      const formEl = e.currentTarget;
      const data = new FormData(formEl);
      const file = data.get("projectImage") as File;

      let imageUrl = editingProject.project_image;

      // Handle optional new image upload
      if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      // Update Database Entry
      const { error: updateError } = await supabase
        .from("project_table")
        .update({
          project_title: formData.title,
          project_type: formData.type,
          project_stack: formData.stack,
          project_description: formData.description,
          project_image: imageUrl,
        })
        .eq("id", editingProject.id);

      if (updateError) throw updateError;

      // Optimistically Update Local UI State
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === editingProject.id
            ? {
                ...proj,
                project_title: formData.title,
                project_type: formData.type,
                project_stack: formData.stack,
                project_description: formData.description,
                project_image: imageUrl,
              }
            : proj
        )
      );

      cancelEdit();
    } catch (err: any) {
      setEditError(err.message || "Failed to update project.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#181818] flex items-center justify-center font-mono text-[#4ec9b0] text-sm">
        <VscLoading className="animate-spin text-2xl mr-2" />
        <span>// Verifying admin authentication...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-black h-screen mx-auto p-4 sm:p-6 text-[#d4d4d4] font-mono text-xs sm:text-sm select-none space-y-6">
      
      {/* ── IDE Header ───────────────────────────────── */}
      <div className="bg-[#252526] border border-[#2b2b2b] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <VscFolder className="text-[#e5c07b] text-xl" />
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <span>admin_control_panel.config</span>
              <span className="text-[10px] bg-[#007acc] text-white px-2 py-0.5 rounded font-mono">AUTH: ACTIVE</span>
            </h1>
            <p className="text-[#808080] text-[11px]">// Manage repository projects and database records</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#f14c4c]/10 border border-[#f14c4c]/40 hover:bg-[#f14c4c] text-[#f14c4c] hover:text-white px-4 py-2 rounded text-xs font-semibold transition-all duration-200"
        >
          <VscSignOut className="text-sm" />
          <span>signOut()</span>
        </button>
      </div>

      {/* ── Main Workspace Grid ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ── LEFT PANEL: Form (Creates OR Updates Project) ── */}
        <div className="lg:col-span-5 bg-[#181818] border border-[#2b2b2b] rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-[#252526] px-4 py-2.5 border-b border-[#2b2b2b] flex items-center justify-between text-xs text-[#cccccc] font-semibold">
            <span className="flex items-center gap-2">
              {editingProject ? <VscEdit className="text-[#e5c07b]" /> : <VscAdd className="text-[#4ec9b0]" />}
              <span>{editingProject ? `updateProjectRecord(id: ${editingProject.id})` : "createProjectRecord.ts"}</span>
            </span>
            {editingProject && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-[#808080] hover:text-white flex items-center gap-1 text-[11px]"
              >
                <VscClose /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={editingProject ? handleUpdate : undefined} action={!editingProject ? action : undefined} className="p-5 space-y-4">
            
            {/* Error Message Feed */}
            {(state?.error || editError) && (
              <div className="bg-[#f14c4c]/10 border border-[#f14c4c] text-[#f14c4c] p-3 rounded flex items-center gap-2 text-xs">
                <VscError className="text-base shrink-0" />
                <span>Error: {state?.error || editError}</span>
              </div>
            )}

            {/* Field: Project Type */}
            <div className="space-y-1">
              <label htmlFor="type" className="flex items-center gap-1.5 text-[#9cdcfe]">
                <VscSymbolVariable className="text-[#569cd6]" />
                <span>&quot;project_type&quot;:</span>
              </label>
              <input
                id="type"
                type="text"
                name="type"
                required
                value={formData.type ?? ""}
                onChange={handleInputChange}
                placeholder='"Work" | "Freelance" | "Personal"'
                className="w-full bg-[#1e1e1e] border border-[#3c3c3c] focus:border-[#007acc] rounded px-3 py-2 text-[#ce9178] outline-none transition-colors"
              />
            </div>

            {/* Field: Project Title */}
            <div className="space-y-1">
              <label htmlFor="title" className="flex items-center gap-1.5 text-[#9cdcfe]">
                <VscSymbolVariable className="text-[#569cd6]" />
                <span>&quot;project_title&quot;:</span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                required
                value={formData.title ?? ""}
                onChange={handleInputChange}
                placeholder='"Easethetics Clinic Platform"'
                className="w-full bg-[#1e1e1e] border border-[#3c3c3c] focus:border-[#007acc] rounded px-3 py-2 text-[#ce9178] outline-none transition-colors"
              />
            </div>

            {/* Field: Tech Stack */}
            <div className="space-y-1">
              <label htmlFor="stack" className="flex items-center gap-1.5 text-[#9cdcfe]">
                <VscSymbolVariable className="text-[#569cd6]" />
                <span>&quot;tech_stack&quot;:</span>
              </label>
              <input
                id="stack"
                type="text"
                name="stack"
                required
                value={formData.stack ?? ""}
                onChange={handleInputChange}
                placeholder='"React, Next.js, Supabase, Tailwind"'
                className="w-full bg-[#1e1e1e] border border-[#3c3c3c] focus:border-[#007acc] rounded px-3 py-2 text-[#ce9178] outline-none transition-colors"
              />
            </div>

            {/* Field: Description */}
            <div className="space-y-1">
              <label htmlFor="description" className="flex items-center gap-1.5 text-[#9cdcfe]">
                <VscSymbolVariable className="text-[#569cd6]" />
                <span>&quot;description&quot;:</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                value={formData.description ?? ""}
                onChange={handleInputChange}
                placeholder='"Summary of architecture, features, and optimizations..."'
                className="w-full bg-[#1e1e1e] border border-[#3c3c3c] focus:border-[#007acc] rounded px-3 py-2 text-[#ce9178] outline-none transition-colors resize-y"
              />
            </div>

            {/* Field: Image Upload */}
            <div className="space-y-1">
              <label htmlFor="projectImage" className="flex items-center gap-1.5 text-[#9cdcfe]">
                <VscCloudUpload className="text-[#569cd6]" />
                <span>&quot;project_image&quot; {editingProject && "(Optional for update)"}:</span>
              </label>
              <input
                id="projectImage"
                type="file"
                name="projectImage"
                accept="image/*"
                required={!editingProject}
                className="w-full text-xs text-[#808080] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#007acc] file:text-white hover:file:bg-[#0062a3] cursor-pointer bg-[#1e1e1e] border border-[#3c3c3c] rounded p-1"
              />
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isPending || isUpdating}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded font-semibold transition-colors disabled:bg-[#3c3c3c] disabled:cursor-not-allowed mt-2 text-white ${
                editingProject ? 'bg-[#e5c07b] hover:bg-[#c8a661] text-black font-bold' : 'bg-[#0e639c] hover:bg-[#1177bb]'
              }`}
            >
              {isPending || isUpdating ? (
                <>
                  <VscLoading className="animate-spin text-base" />
                  <span>{editingProject ? 'Updating Record...' : 'Committing Record...'}</span>
                </>
              ) : (
                <>
                  {editingProject ? <VscEdit className="text-base" /> : <VscAdd className="text-base" />}
                  <span>{editingProject ? 'dispatch(updateRecord)' : 'dispatch(addProjectRecord)'}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* ── RIGHT PANEL: Database Table & Action Buttons ── */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#252526] px-4 py-2.5 border border-[#2b2b2b] rounded-lg flex items-center justify-between text-xs text-[#cccccc]">
            <span className="flex items-center gap-2 font-semibold">
              <VscCode className="text-[#4ec9b0]" />
              Existing Projects Database [{projects?.length || 0}]
            </span>
            <span className="text-[#808080] text-[11px]">// Live Sync</span>
          </div>

          {/* Empty State */}
          {(!projects || projects.length === 0) && (
            <div className="bg-[#181818] border border-[#2b2b2b] rounded-lg p-8 text-center text-[#808080]">
              <p>// No project records found in database.</p>
            </div>
          )}

          {/* Projects List View */}
          <div className="space-y-4">
            {projects?.map((project: ProjectItem) => (
              <div
                key={project.id}
                className={`bg-[#181818] border rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start transition-all ${
                  editingProject?.id === project.id ? 'border-[#e5c07b] bg-[#1e1e1e]' : 'border-[#2b2b2b] hover:border-[#3c3c3c]'
                }`}
              >
                {/* Thumbnail Preview */}
                <div className="w-full sm:w-32 h-24 bg-[#1e1e1e] rounded overflow-hidden shrink-0 border border-[#3c3c3c]">
                  <img
                    src={project.project_image}
                    alt={project.project_title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-2 min-w-0 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-white text-sm truncate">
                      {project.project_title}
                    </h3>
                    <span className="bg-[#252526] text-[#569cd6] border border-[#3c3c3c] text-[10px] px-2 py-0.5 rounded shrink-0">
                      {project.project_type}
                    </span>
                  </div>

                  <p className="text-[#808080] text-xs line-clamp-2 leading-relaxed">
                    {project.project_description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.project_stack?.split(",").map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#1e1e1e] text-[#9cdcfe] text-[10px] px-1.5 py-0.5 rounded border border-[#3c3c3c]"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Controls (Edit & Delete) */}
                <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0 self-end sm:self-start">
                  <button
                    onClick={() => startEditing(project)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#e5c07b]/10 hover:bg-[#e5c07b] border border-[#e5c07b]/30 text-[#e5c07b] hover:text-black px-3 py-1.5 rounded text-xs transition-colors font-semibold"
                  >
                    <VscEdit />
                    <span>Edit</span>
                  </button>
                  
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#f14c4c]/10 hover:bg-[#f14c4c] border border-[#f14c4c]/30 text-[#f14c4c] hover:text-white px-3 py-1.5 rounded text-xs transition-colors"
                  >
                    <VscTrash />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Page;