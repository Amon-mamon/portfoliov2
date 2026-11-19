import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import MinimalistPage from "@/components/minimalist/MinimalistPage";
import { ProjectItem } from "@/types/project";

export const metadata: Metadata = {
  title: "Vince Stephen David | Full-Stack Developer",
  description:
    "Full-stack developer from the Philippines building fast, reliable web applications with React, Next.js, Node.js and PostgreSQL.",
};

// Pre-render this page and refresh the project list at most every 5 minutes.
export const revalidate = 300;

async function getProjects(): Promise<ProjectItem[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  if (!url || !key) return [];

  try {
    // Cookie-less client: projects are public, so the page can stay static.
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await supabase
      .from("project_table")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      console.error("Project fetch error:", error.message);
      return [];
    }
    return (data ?? []) as ProjectItem[];
  } catch (e) {
    console.error("Project fetch error:", e);
    return [];
  }
}

export default async function Page() {
  const projects = await getProjects();
  return <MinimalistPage initialProjects={projects} />;
}
