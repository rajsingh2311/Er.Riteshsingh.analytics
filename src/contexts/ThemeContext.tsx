import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "cyber" | "ocean" | "ember";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "cyber", setTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("cyber");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-cyber", "theme-ocean", "theme-ember");
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
