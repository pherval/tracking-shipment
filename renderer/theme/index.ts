import { useEffect, useState } from "react";

type Themes = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Themes | null>(null);

  console.log("current theme", document.documentElement.classList);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }

    // Whenever the user explicitly chooses light mode
    // localStorage.theme = "light";

    // // Whenever the user explicitly chooses dark mode
    // localStorage.theme = "dark";

    // // Whenever the user explicitly chooses to respect the OS preference
    // localStorage.removeItem("theme");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  };

  return { theme, setTheme, toggleTheme };
}
