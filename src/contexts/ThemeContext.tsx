import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Theme = "cyber" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "cyber",
  setTheme: () => {},
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved === "light" || saved === "cyber") return saved;
    }
    return "cyber";
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-theme", newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "cyber" ? "light" : "cyber");
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-cyber", "theme-ocean", "theme-ember", "theme-light");
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
