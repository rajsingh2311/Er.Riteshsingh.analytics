import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import ParticleField from "@/components/ParticleField";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const BTechPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
          <span className="text-primary font-mono font-semibold whitespace-nowrap">B.Tech</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-8 flex items-center justify-center">
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
            <span className="text-gradient">B.Tech</span> (Chemical Engineering)
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary-foreground font-mono mb-2"
          >
            SCRIET, CCSU Meerut
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-primary font-mono mb-6"
          >
            2019 — 2023 | CGPA: 6.74
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base text-muted-foreground max-w-2xl mx-auto"
          >
            Exposure to SAP ERP systems, data processing (structured & semi‑structured), and applied research.
          </motion.p>
        </div>
      </div>

      {/* Details Section */}
      <div className="relative z-10 container mx-auto px-6 -mt-8">
        <div className="max-w-4xl mx-auto">
          {/* Activities */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 mb-12 border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:border-white hover:bg-primary/10 hover:scale-[1.1] hover:z-50 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-6 text-gradient">Activities & Societies</h3>
            <div className="space-y-3">
              {[
                { text: "Student Coordinator — Indian Water Resources Society (IWRS)", link: "https://iwrs.org.in/", desc: "Organized seminars & awareness activities on water conservation" },
                { text: "Student Coordinator — Unnat Bharat Abhiyan (IIT Delhi)", link: "https://unnatbharatabhiyan.gov.in/", desc: "Organized awareness programs for rural development initiatives" },
              ].map((activity, i) => (
                <motion.div
                  key={activity.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary">◆</span>
                    <a href={activity.link} target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors underline underline-offset-2">{activity.text}</a>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{activity.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Journey Section - Placeholder for user to add content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 mb-12 border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:border-white hover:bg-primary/10 hover:scale-[1.1] hover:z-50 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">My B.Tech Journey</h3>
            <p className="text-muted-foreground mb-4">
              Add your B.Tech journey details, projects, achievements, and experiences here. 
              You can include research work, internships, coursework, and key learnings from your Chemical Engineering program.
            </p>
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-primary/70 font-mono">
                {"// Edit src/pages/BTechPage.tsx to add your journey details and images"}
              </p>
            </div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:border-white hover:bg-primary/10 hover:scale-[1.1] hover:z-50 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-6 text-gradient">Journey Gallery</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { src: `${import.meta.env.BASE_URL}images/Education/B.Tech%20Volunteer%201.png`, alt: "B.Tech Volunteer Activity 1" },
                { src: `${import.meta.env.BASE_URL}images/Education/B..Tech%20Volunteer%202.png`, alt: "B.Tech Volunteer Activity 2" },
                { src: `${import.meta.env.BASE_URL}images/Education/B..Tech%20Volunteer%203.png`, alt: "B.Tech Volunteer Activity 3" },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-video rounded-lg overflow-hidden border border-white/10 cursor-pointer"
                  onDoubleClick={() => setSelectedImage(img.src)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BTechPage;
