"use server";

import { createClient } from "@/lib/supabaseServer"; // or your server client path
import { revalidatePath } from "next/cache";

export async function addProjectAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const type = formData.get("type") as string;
    const stack = formData.get("stack") as string;
    const description = formData.get("description") as string;
    
    // Get all uploaded image files
    const files = formData.getAll("projectImage") as File[];
    const validFiles = files.filter((file) => file && file.size > 0);

    if (validFiles.length === 0) {
      return { error: "Please upload at least one image screenshot." };
    }

    const uploadedUrls: string[] = [];

    // Upload each image file to Supabase Storage
    for (const file of validFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    // Insert record into Supabase Table
    const { error: insertError } = await supabase
      .from("project_table")
      .insert({
        project_title: title,
        project_type: type,
        project_stack: stack,
        project_description: description,
        project_image: [uploadedUrls[0] || ""], // Main cover image (backward compatibility)
        project_images: uploadedUrls,    // Full array of screenshot URLs
      });

    if (insertError) {
      throw insertError;
    }

    revalidatePath("/projects");
    return { success: true, error: null };
  } catch (err: any) {
    return { error: err.message || "Failed to create project record." };
  }
}