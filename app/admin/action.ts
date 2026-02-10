// app/admin/action.ts
"use server";

import { createClient } from "../lib/supabaseServer";


export async function addProjectAction(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const stack = formData.get("stack") as string;
  const description = formData.get("description") as string;
  // 1. Get the file from FormData
  const imageFile = formData.get("projectImage") as File;

  const supabase = createClient();

  let imageUrl = "";

  // 2. Upload file to Supabase Storage if it exists
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images") // Name of your bucket
      .upload(filePath, imageFile);

    if (uploadError) {
      return { error: uploadError.message };
    }

    // 3. Get the public URL
    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);
    
    imageUrl = data.publicUrl;
  }

  // 4. Insert data into database
  const { error: dbError } = await supabase.from("project_table").insert({
    project_title:title,
    project_stack:stack,
    project_description:description,
    project_image: imageUrl, // Save the URL
  });

  if (dbError) {
    return { error: dbError.message };
  }

  return { success: true };
}