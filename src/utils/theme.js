const STORAGE_KEY = "tablero-ingles-theme-v1";

export function loadTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch (e) {}
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {}
}

export function applyTheme(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}
