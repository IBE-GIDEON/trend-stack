"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

type Theme = "dark" | "light";

/** Blocking script injected in <head> to apply the saved theme before paint. */
export const themeInitScript = `
(function(){try{
  var t = localStorage.getItem('viz-theme');
  if(!t){ t = 'dark'; }
  document.documentElement.classList.toggle('light', t === 'light');
  document.documentElement.style.colorScheme = t;
}catch(e){}})();
`;

/**
 * Dark/light toggle. Persists to localStorage and flips the `light` class on
 * <html>; the neutral palette is CSS-variable driven, so the whole surface
 * inverts from one class. Dark is the default and the showcase.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("viz-theme") as Theme | null) ?? "dark";
    setTheme(saved);
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("viz-theme", next);
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.style.colorScheme = next;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={className}
    >
      {/* Render the dark-default icon until mounted to avoid a hydration flip. */}
      {mounted && theme === "light" ? (
        <SunIcon className="h-[18px] w-[18px]" />
      ) : (
        <MoonIcon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
