import { motion } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import { BarChart3, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { id: "home", label: "Home", targetId: "home" },
  { id: "about", label: "About", targetId: "about-detailed" },
  { id: "experience", label: "Experience", targetId: "experience" },
  { id: "education", label: "Education", targetId: "education" },
  { id: "certifications", label: "Licenses", targetId: "certifications" },
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

  const activeItem = navItems.find((item) => item.id === active);

  const handleNavClick = (item: { id: string; label: string; targetId: string }) => {
    setActive(item.id);

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
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b"
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <motion.button
            type="button"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              handleNavClick(navItems[0]);
              setMobileOpen(false);
            }}
          >
            <BarChart3 className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold text-gradient">Ritesh.Analytics</span>
          </motion.button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`text-sm transition-colors duration-300 relative group ${
                  active === item.id ? "text-primary" : "text-muted-foreground hover:text-primary"
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

          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-foreground"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavClick(item);
                    setMobileOpen(false);
                  }}
                  className={`text-sm transition-colors py-2 text-left ${
                    active === item.id ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {location.pathname === "/" && active !== "home" && activeItem && (
        <div className="fixed top-16 left-0 right-0 z-40 glass border-b">
          <div className="container mx-auto px-6 h-11 flex items-center gap-2 text-sm">
            <button
              onClick={() => handleNavClick(navItems[0])}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <span className="text-muted-foreground">›</span>
            <span className="text-foreground font-semibold">{activeItem.label}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
