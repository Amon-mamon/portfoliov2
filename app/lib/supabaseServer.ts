// app/lib/supabaseServer.ts

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = () => {
  // 1. cookies() is a function that returns a Promise in Next.js 15+
  const cookieStore = cookies();

  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        // 2. Make this method async and await the cookieStore
        async getAll() {
          return (await cookieStore).getAll();
        },
        // 3. Make this method async and await the cookieStore
        async setAll(cookiesToSet) {
          try {
            const resolvedCookies = await cookieStore;
            cookiesToSet.forEach(({ name, value, options }) => 
              resolvedCookies.set(name, value, options)
            );
          } catch {
            // Ignored - expected behavior in Server Components
          }
        },
      },
    },
  );
};