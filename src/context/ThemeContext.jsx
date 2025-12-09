import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ThemeContext } from "./themeContextValue";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
