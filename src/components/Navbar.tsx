import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import { BarChart3, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { id: "home", label: "Home", targetId: "home" },
  { id: "about", label: "About", targetId: "about-detailed" },
  { id: "experience", label: "Experience", targetId: "experience" },
  { id: "education", label: "Education", targetId: "education" },
  { id: "certifications", label: "Certifications", targetId: "certifications" },
  { id: "projects", label: "Projects", targetId: "projects" },
  { id: "skills", label: "Skills", targetId: "skills" },
  { id: "contact", label: "Contact", targetId: "contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => ({ id: item.id, element: document.getElementById(item.targetId) }))
        .filter((entry): entry is { id: string; element: HTMLElement } => !!entry.element);

      let current = "home";
      let minOffset = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.element.getBoundingClientRect();
        const offset = Math.abs(rect.top - 80); // account for navbar height
        if (rect.top <= window.innerHeight - 100 && offset < minOffset) {
          minOffset = offset;
          current = section.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToTarget = (targetId: string) => {
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 72;
      const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY - navOffset);
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleNavClick = (item: { id: string; label: string; targetId: string }, fromMobile = false) => {
    setActive(item.id);
    if (fromMobile) {
      setMobileOpen(false);
    }

    if (item.id === "home") {
      if (location.pathname !== "/") {
        navigate("/");
        return;
      }
      if (fromMobile) {
        window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 180);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: item.targetId } });
      return;
    }

    if (fromMobile) {
      window.setTimeout(() => scrollToTarget(item.targetId), 180);
    } else {
      scrollToTarget(item.targetId);
    }
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/30 backdrop-blur-[1px] md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b shadow-sm"
      >
        <div className="container mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 min-w-0">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <motion.button
              type="button"
              className="flex items-center gap-2 shrink-0 min-w-0"
              whileHover={{ scale: 1.02 }}
              onClick={() => handleNavClick(navItems[0], mobileOpen)}
            >
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
              <span className="text-sm sm:text-base md:text-lg font-bold text-gradient truncate">
                Ritesh.Analytics
              </span>
            </motion.button>
          </div>

          {/* Middle: Desktop Navigation Items */}
          <div className="hidden md:flex items-center gap-1.5 xl:gap-3 flex-wrap justify-center py-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item, false)}
                className={`text-[11px] xl:text-xs transition-colors duration-300 relative group py-1 px-1.5 shrink-0 ${
                  active === item.id ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    active === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right: Theme Switcher & Mobile Drawer Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ThemeSwitcher />
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted/50 active:bg-muted transition-colors shrink-0 touch-manipulation"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="md:hidden glass border-t max-h-[calc(100dvh-4rem)] overflow-y-auto overflow-x-hidden"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider px-3 py-1">
                  Portfolio Navigation
                </div>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item, true)}
                    className={`w-full text-sm transition-colors py-2.5 px-3 rounded-lg text-left flex items-center justify-between touch-manipulation active:scale-[0.99] ${
                      active === item.id
                        ? "text-primary bg-primary/10 font-semibold border border-primary/20"
                        : "text-muted-foreground hover:text-primary hover:bg-muted/30"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active === item.id && <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
