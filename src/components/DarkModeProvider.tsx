"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeProvider() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) setDarkMode(stored === "true");
    else setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode, mounted]);

  if (!mounted) return null; // wait until mounted to render

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
