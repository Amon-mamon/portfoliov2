export const THEME_COOKIE = "portfolio_theme_mode";
export type ThemeMode = "vscode" | "minimalist";

export const THEME_ROUTES: Record<ThemeMode, string> = {
  minimalist: "/minimalist-view",
  vscode: "/vscode-theme",
};

export function isThemeMode(v: unknown): v is ThemeMode {
  return v === "vscode" || v === "minimalist";
}

/** Mirror the theme choice into a cookie so the server can redirect "/" instantly. */
export function writeThemeCookie(mode: ThemeMode) {
  document.cookie = `${THEME_COOKIE}=${mode}; path=/; max-age=31536000; samesite=lax`;
}
