import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  { id: "cyber" as const, label: "Cyber Neon", colors: ["#00ffcc", "#aa55ff"] },
  { id: "ocean" as const, label: "Ocean Depth", colors: ["#3b82f6", "#22c55e"] },
  { id: "ember" as const, label: "Ember Glow", colors: ["#f97316", "#eab308"] },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      {themes.map((t) => (
        <motion.button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className="relative flex items-center gap-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${t.label} theme`}
        >
          <div
            className={`w-7 h-7 rounded-full transition-all duration-300 ${
              theme === t.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : "opacity-50 hover:opacity-80"
            }`}
            style={{
              background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})`,
            }}
          />
          <AnimatePresence>
            {theme === t.id && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-xs font-mono text-primary hidden sm:block overflow-hidden whitespace-nowrap"
              >
                {t.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
