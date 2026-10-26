import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div 
      className="relative flex items-center p-1 rounded-full glass border border-border/80 shadow-sm bg-background/60 backdrop-blur-md"
      role="radiogroup"
      aria-label="Theme mode toggle"
    >
      {/* Light Mode Icon Button (First) */}
      <button
        onClick={() => setTheme("light")}
        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
          theme === "light"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
        role="radio"
        aria-checked={theme === "light"}
        title="Light Mode (Prism Light)"
        aria-label="Switch to Light Mode"
      >
        {theme === "light" && (
          <motion.div
            layoutId="activeThemeHighlight"
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
            className="absolute inset-0 rounded-full bg-card border border-primary/40 shadow-[0_0_12px_rgba(var(--glow)/0.35)] -z-10"
          />
        )}
        <motion.div
          animate={theme === "light" ? { scale: [1, 1.15, 1], rotate: [0, 45, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Sun className="w-4 h-4 fill-primary/20 stroke-[2.2]" />
        </motion.div>
      </button>

      {/* Dark Mode Icon Button (Second) */}
      <button
        onClick={() => setTheme("cyber")}
        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
          theme === "cyber"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
        role="radio"
        aria-checked={theme === "cyber"}
        title="Dark Mode (Cyber Neon)"
        aria-label="Switch to Dark Mode"
      >
        {theme === "cyber" && (
          <motion.div
            layoutId="activeThemeHighlight"
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
            className="absolute inset-0 rounded-full bg-card border border-primary/40 shadow-[0_0_12px_rgba(var(--glow)/0.35)] -z-10"
          />
        )}
        <motion.div
          animate={theme === "cyber" ? { scale: [1, 1.15, 1], rotate: [0, -10, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Moon className="w-4 h-4 fill-primary/20 stroke-[2.2]" />
        </motion.div>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
