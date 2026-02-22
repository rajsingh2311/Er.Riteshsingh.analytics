import { motion } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import { BarChart3 } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
          <BarChart3 className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold text-gradient">DataViz</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        <ThemeSwitcher />
      </div>
    </motion.nav>
  );
};

export default Navbar;
