import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowUp, 
  ChevronRight, 
  Home, 
  Compass, 
  FolderOpen, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Zap, 
  User, 
  Mail, 
  ChevronDown,
  Check
} from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  to?: string;
  onClick?: () => void;
}

export interface SectionNavigatorProps {
  currentPage: string;
  parentPage?: { label: string; to?: string };
  subPage?: string;
  breadcrumbs?: BreadcrumbItem[];
  backTo?: string;
  backLabel?: string;
  onBack?: () => void;
  mode?: "page" | "inline";
  prevSection?: { id: string; label: string };
  nextSection?: { id: string; label: string };
  className?: string;
}

const portfolioSections = [
  { id: "home", label: "Home", targetId: "home", pagePath: "/", icon: Home },
  { id: "about", label: "About", targetId: "about-detailed", pagePath: "/section/about", icon: User },
  { id: "experience", label: "Experience", targetId: "experience", pagePath: "/section/experience", icon: Briefcase },
  { id: "education", label: "Education", targetId: "education", pagePath: "/section/education", icon: GraduationCap },
  { id: "certifications", label: "Certifications", targetId: "certifications", pagePath: "/section/certifications", icon: Award },
  { id: "projects", label: "Projects", targetId: "projects", pagePath: "/section/projects", icon: FolderOpen },
  { id: "skills", label: "Skills", targetId: "skills", pagePath: "/section/skills", icon: Zap },
  { id: "contact", label: "Contact", targetId: "contact", pagePath: "/section/contact", icon: Mail },
];

export const SectionNavigator: React.FC<SectionNavigatorProps> = ({
  currentPage,
  parentPage,
  subPage,
  breadcrumbs,
  backTo,
  backLabel,
  onBack,
  mode = "inline",
  prevSection,
  nextSection,
  className = "",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (backTo) {
      navigate(backTo);
      return;
    }
    if (mode === "inline") {
      if (prevSection) {
        if (prevSection.id === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const el = document.getElementById(prevSection.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleJumpToSection = (section: typeof portfolioSections[0]) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      if (section.id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(section.targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate("/", { state: { scrollTo: section.targetId } });
    }
  };

  // Compile final breadcrumb array
  const computedBreadcrumbs: BreadcrumbItem[] = breadcrumbs || [
    { label: "Home", to: "/" },
    ...(parentPage ? [{ label: parentPage.label, to: parentPage.to }] : []),
    { label: currentPage },
    ...(subPage ? [{ label: subPage }] : []),
  ];

  // For Inline Mode (top of sections in Index.tsx or inside components)
  if (mode === "inline") {
    return (
      <nav 
        aria-label={`Navigation for ${currentPage} section`}
        className={`w-full py-2 px-2.5 sm:px-4 mb-5 sm:mb-6 rounded-xl border border-primary/20 bg-card/60 backdrop-blur-md shadow-sm flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm ${className}`}
      >
        {/* Left: Go Back / Back to Top button + Breadcrumbs */}
        <div className="flex items-center flex-wrap gap-2 min-w-0">
          <motion.button
            type="button"
            onClick={handleBack}
            whileHover={{ scale: 1.02, x: -1 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all shrink-0"
            title={backLabel || (prevSection ? `Back to ${prevSection.label}` : "Back to Top")}
          >
            {prevSection ? <ArrowLeft className="w-3.5 h-3.5 shrink-0" /> : <ArrowUp className="w-3.5 h-3.5 shrink-0" />}
            <span className="font-semibold text-xs sm:text-sm">{backLabel || (prevSection ? `← ${prevSection.label}` : "Top ↑")}</span>
          </motion.button>

          {/* Breadcrumbs trail */}
          <div className="flex items-center flex-wrap gap-1 text-muted-foreground min-w-0">
            {computedBreadcrumbs.map((crumb, idx) => {
              const isLast = idx === computedBreadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.label + idx}>
                  {idx > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground/60 shrink-0" />}
                  {isLast ? (
                    <span className="font-semibold text-primary px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 truncate max-w-[120px] xs:max-w-[200px] sm:max-w-none">
                      {crumb.label}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (crumb.onClick) crumb.onClick();
                        else if (crumb.to) {
                          if (crumb.to === "/" && location.pathname === "/") {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else {
                            navigate(crumb.to);
                          }
                        }
                      }}
                      className="hover:text-foreground hover:underline transition-colors font-medium truncate max-w-[90px] xs:max-w-[140px] sm:max-w-none"
                    >
                      {crumb.label}
                    </button>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Jump Menu & Next Section button */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-all text-xs"
            >
              <Compass className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="hidden xs:inline">Jump</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 sm:w-52 max-w-[calc(100vw-32px)] p-1.5 rounded-xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-xl z-50 divide-y divide-border/40"
                  >
                    <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Portfolio Navigation
                    </div>
                    <div className="py-1 space-y-0.5">
                      {portfolioSections.map((sec) => {
                        const IconComponent = sec.icon;
                        const isCurrent = currentPage.toLowerCase() === sec.label.toLowerCase();
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => handleJumpToSection(sec)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                              isCurrent 
                                ? "bg-primary/15 text-primary font-semibold" 
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            <span className="flex items-center gap-2 truncate">
                              <IconComponent className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span className="truncate">{sec.label}</span>
                            </span>
                            {isCurrent && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {nextSection && (
            <motion.button
              type="button"
              onClick={() => {
                const el = document.getElementById(nextSection.id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.02, x: 1 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground text-xs transition-all shrink-0"
              title={`Next: ${nextSection.label}`}
            >
              <span className="truncate max-w-[80px] xs:max-w-none">{nextSection.label}</span>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </motion.button>
          )}
        </div>
      </nav>
    );
  }

  // Page Mode (for full pages like /pgdm, /btech, /section/:sectionId, etc.)
  return (
    <nav 
      aria-label={`Page navigation for ${currentPage}`}
      className={`sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-xl transition-all shadow-sm ${className}`}
    >
      <div className="container mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Left: Go Back Button & Breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          <motion.button
            type="button"
            onClick={handleBack}
            whileHover={{ scale: 1.02, x: -1 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary/15 hover:bg-primary/25 border border-primary/30 text-primary text-xs sm:text-sm font-semibold transition-all shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span>{backLabel || "Back"}</span>
          </motion.button>

          <div className="h-4 w-px bg-border/80 hidden xs:block shrink-0" />

          {/* Breadcrumb Hierarchy */}
          <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground min-w-0 overflow-hidden">
            {computedBreadcrumbs.map((crumb, idx) => {
              const isLast = idx === computedBreadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.label + idx}>
                  {idx > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground/60 shrink-0" />}
                  {isLast ? (
                    <span className="font-semibold text-primary truncate max-w-[100px] xs:max-w-[160px] md:max-w-none">
                      {crumb.label}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (crumb.onClick) crumb.onClick();
                        else if (crumb.to) navigate(crumb.to);
                      }}
                      className="hover:text-foreground hover:underline transition-colors truncate font-medium max-w-[80px] xs:max-w-[130px] md:max-w-none"
                    >
                      {crumb.label}
                    </button>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right: Current Page Badge & Quick Jump */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-mono text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Viewing: {currentPage}</span>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-card/60 hover:bg-muted text-foreground text-xs font-medium transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="hidden sm:inline">Sections</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 sm:w-56 max-w-[calc(100vw-32px)] p-1.5 rounded-xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-xl z-50 divide-y divide-border/40"
                  >
                    <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Explore Portfolio
                    </div>
                    <div className="py-1 space-y-0.5">
                      {portfolioSections.map((sec) => {
                        const IconComponent = sec.icon;
                        const isCurrent = currentPage.toLowerCase().includes(sec.label.toLowerCase());
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => handleJumpToSection(sec)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                              isCurrent 
                                ? "bg-primary/15 text-primary font-semibold" 
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            <span className="flex items-center gap-2 truncate">
                              <IconComponent className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span className="truncate">{sec.label}</span>
                            </span>
                            {isCurrent && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SectionNavigator;
