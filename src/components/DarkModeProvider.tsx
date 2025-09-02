"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeProvider() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Initialize from localStorage or system preference
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return stored === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Apply dark mode class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
