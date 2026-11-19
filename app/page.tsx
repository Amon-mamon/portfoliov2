import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Spotlight } from "@/components/ui/background-spotlight";
import RootRedirect from "@/components/theme/RootRedirect";
import { THEME_COOKIE, THEME_ROUTES, isThemeMode } from "@/lib/themeCookie";

export default async function RootPage() {
  // Returning visitors are redirected on the server, before any JS loads.
  const saved = (await cookies()).get(THEME_COOKIE)?.value;
  if (isThemeMode(saved)) redirect(THEME_ROUTES[saved]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
      <Spotlight />
      <RootRedirect />
      {/* ThemeOnboardingProvider (app/layout.tsx) shows the theme picker over this backdrop */}
      <p className="font-mono text-sm text-gray-400">Loading portfolio...</p>
    </div>
  );
}
