export type ThemePref = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";

const KEY = "zill-theme-pref";
const LEGACY_KEY = "zill-theme";

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function getStoredPref(): ThemePref {
  if (typeof window === "undefined") return "dark";
  const v = localStorage.getItem(KEY) as ThemePref | null;
  if (v === "dark" || v === "light" || v === "system") return v;
  const legacy = localStorage.getItem(LEGACY_KEY);
  if (legacy === "light" || legacy === "dark") return legacy;
  return "dark";
}

export function resolveTheme(pref: ThemePref): ResolvedTheme {
  return pref === "system" ? getSystemTheme() : pref;
}

export function applyTheme(pref: ThemePref) {
  if (typeof document === "undefined") return;
  const resolved = resolveTheme(pref);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePref = pref;
  try {
    localStorage.setItem(KEY, pref);
    localStorage.setItem(LEGACY_KEY, resolved);
  } catch {}
}

export function watchSystemTheme(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  const handler = () => onChange();
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}
