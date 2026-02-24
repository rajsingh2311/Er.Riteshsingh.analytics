import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import ParticleField from "@/components/ParticleField";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const PGDMPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleField />
      
      {/* Header */}
      <div className="sticky top-0 z-50 glass backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <motion.button
            onClick={() => navigate("/section/education")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 md:w-5 h-4 md:h-5" />
            <span className="hidden sm:inline text-xs md:text-sm">Back to Education</span>
          </motion.button>
          <ThemeSwitcher />
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="relative z-40 bg-background/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-2 md:py-3 flex items-center overflow-x-auto text-xs md:text-sm">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-primary transition-colors font-mono whitespace-nowrap"
          >
            Portfolio
          </motion.button>
          <span className="mx-1 md:mx-2 text-muted-foreground">/</span>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/section/education")}
            className="text-muted-foreground hover:text-primary transition-colors font-mono whitespace-nowrap"
          >
            Education
          </motion.button>
          <span className="mx-1 md:mx-2 text-muted-foreground">/</span>
          <span className="text-primary font-mono font-semibold whitespace-nowrap">PGDM</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-16 flex items-center justify-center">
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              My Journey
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
          >
            <span className="text-gradient">PGDM</span> (Business Analytics)
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary-foreground font-mono mb-2"
          >
            Jaipuria School of Business
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-primary font-mono mb-6"
          >
            2024 — 2026 | CGPA: 6.85
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base text-muted-foreground max-w-2xl mx-auto"
          >
            Focus: Business Analytics, CRISP‑DM methodology, high-dimensional data visualization, predictive analytics.
          </motion.p>
        </div>
      </div>

      {/* Details Section */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Activities */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 mb-12"
          >
            <h3 className="text-2xl font-bold mb-6 text-gradient">Activities & Societies</h3>
            <div className="space-y-3">
              {["Business analytics coursework", "Dashboarding & reporting", "Statistics for decision making"].map((activity, i) => (
                <motion.div
                  key={activity}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-primary">◆</span>
                  <p className="text-secondary-foreground">{activity}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Journey Section - Placeholder for user to add content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 mb-12 border-2 border-dashed border-primary/30"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">My PGDM Journey</h3>
            <p className="text-muted-foreground mb-4">
              Add your PGDM journey details, projects, achievements, and experiences here. 
              You can include images, milestones, and key learnings from your Business Analytics program.
            </p>
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-primary/70 font-mono">
                {"// Edit src/pages/PGDMPage.tsx to add your journey details and images"}
              </p>
            </div>
          </motion.div>

          {/* Image Gallery Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-gradient">Journey Gallery</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center"
                >
                  <p className="text-muted-foreground text-center">
                    <span className="block text-sm mb-2">Image Placeholder {i}</span>
                    <span className="text-xs">Add your PGDM images here</span>
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PGDMPage;
