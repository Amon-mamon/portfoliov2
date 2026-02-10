"use server";

import { redirect } from "next/navigation";
import { createClient } from "./lib/supabaseServer"; // Ensure this matches file above

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // No arguments needed here
  const supabase = createClient(); 

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/admin/project");
}

export async function signOutAction() {
  const supabase = createClient();
  
  // Sign out the user
  await supabase.auth.signOut();
  
  // Redirect to the login page
  redirect("/admin");
}