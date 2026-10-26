import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import { 
  BarChart3, 
  Menu, 
  X, 
  ChevronRight, 
  Compass, 
  ChevronDown, 
  Check, 
  ArrowLeft, 
  ArrowRight 
} from "lucide-react";
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
  const [jumpMenuOpen, setJumpMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const navigate = useNavigate();
  const location = useLocation();

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

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const activeIndex = navItems.findIndex((item) => item.id === active);
  const activeItem = navItems[activeIndex] || navItems[0];
  const prevItem = activeIndex > 0 ? navItems[activeIndex - 1] : null;
  const nextItem = activeIndex >= 0 && activeIndex < navItems.length - 1 ? navItems[activeIndex + 1] : null;

  const handleNavClick = (item: { id: string; label: string; targetId: string }) => {
    setActive(item.id);
    setJumpMenuOpen(false);

    if (item.id === "home") {
      if (location.pathname !== "/") {
        navigate("/");
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: item.targetId } });
      return;
    }

    const element = document.getElementById(item.targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b shadow-sm"
    >
      <div className="container mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 min-w-0">
        {/* Left: Brand Logo + Location Breadcrumb Indicator inside Navbar (ss2) */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <motion.button
            type="button"
            className="flex items-center gap-2 shrink-0 min-w-0"
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              handleNavClick(navItems[0]);
              setMobileOpen(false);
            }}
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
              onClick={() => handleNavClick(item)}
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
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Toggle Navigation Menu"
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
            className="lg:hidden glass border-t max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1.5">
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider px-3 mb-1">
                Portfolio Navigation
              </div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavClick(item);
                    setMobileOpen(false);
                  }}
                  className={`text-sm transition-colors py-2 px-3 rounded-lg text-left flex items-center justify-between ${
                    active === item.id
                      ? "text-primary bg-primary/10 font-semibold border border-primary/20"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/30"
                  }`}
                >
                  <span>{item.label}</span>
                  {active === item.id && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
