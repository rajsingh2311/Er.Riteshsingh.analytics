import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

const themes = [
  { id: "cyber" as const, label: "Cyber", colors: ["#00ffcc", "#aa55ff"] },
  { id: "ocean" as const, label: "Ocean", colors: ["#3b82f6", "#22c55e"] },
  { id: "ember" as const, label: "Ember", colors: ["#f97316", "#eab308"] },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {themes.map((t) => (
        <motion.button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`relative w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
            theme === t.id ? "border-primary glow-primary scale-110" : "border-border opacity-60 hover:opacity-100"
          }`}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${t.label} theme`}
        >
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})`,
            }}
          />
        </motion.button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
