import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from "./supabaseServer"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}  
