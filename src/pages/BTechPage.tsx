import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import ParticleField from "@/components/ParticleField";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SectionNavigator from "@/components/SectionNavigator";

const BTechPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleField />
      
      {/* Top Navigator */}
      <div className="sticky top-0 z-50 glass backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-2 xs:px-4 md:px-6 flex items-center justify-between">
          <SectionNavigator
            mode="page"
            currentPage="B.Tech (Chemical Engineering)"
            parentPage={{ label: "Education", to: "/section/education" }}
            backTo="/section/education"
            backLabel="Back to Education"
            className="border-none bg-transparent !shadow-none p-0 flex-1 min-w-0"
          />
          <div className="pl-2 shrink-0">
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-8 flex items-center justify-center">
        {/* Content */}
        <div className="relative z-10 container mx-auto px-3 sm:px-6 text-center min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass text-xs sm:text-sm text-primary font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              My Journey
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight break-words"
          >
            <span className="text-gradient">B.Tech</span> (Chemical Engineering)
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base xs:text-lg md:text-2xl text-secondary-foreground font-mono mb-2 break-words"
          >
            SCRIET, CCSU Meerut
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-primary font-mono mb-6"
          >
            2019 — 2023 | CGPA: 6.74
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto break-words"
          >
            Exposure to SAP ERP systems, data processing (structured & semi‑structured), and applied research.
          </motion.p>
        </div>
      </div>

      {/* Details Section */}
      <div className="relative z-10 container mx-auto px-3 sm:px-6 -mt-4 sm:-mt-8 min-w-0">
        <div className="max-w-4xl mx-auto min-w-0">
          {/* Activities */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] hover:border-white hover:bg-primary/10 transition-all duration-300 min-w-0"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gradient break-words">Activities & Societies</h3>
            <div className="space-y-4">
              {[
                { text: "Student Coordinator — Indian Water Resources Society (IWRS)", link: "https://iwrs.org.in/", desc: "Organized seminars & awareness activities on water conservation" },
                { text: "Student Coordinator — Unnat Bharat Abhiyan (IIT Delhi)", link: "https://unnatbharatabhiyan.gov.in/", desc: "Organized awareness programs for rural development initiatives" },
              ].map((activity, i) => (
                <motion.div
                  key={activity.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-1 min-w-0"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="text-primary mt-1 shrink-0">◆</span>
                    <a href={activity.link} target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors underline underline-offset-2 text-sm sm:text-base break-words min-w-0">{activity.text}</a>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground ml-5 sm:ml-6 break-words">{activity.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Journey Section - Placeholder for user to add content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] hover:border-white hover:bg-primary/10 transition-all duration-300 min-w-0"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary break-words">My B.Tech Journey</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 break-words">
              Add your B.Tech journey details, projects, achievements, and experiences here. 
              You can include research work, internships, coursework, and key learnings from your Chemical Engineering program.
            </p>
            <div className="p-4 sm:p-6 rounded-lg bg-primary/5 border border-primary/20 min-w-0">
              <p className="text-xs sm:text-sm text-primary/70 font-mono break-all">
                {"// Edit src/pages/BTechPage.tsx to add your journey details and images"}
              </p>
            </div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-4 sm:p-6 md:p-8 border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] hover:border-white hover:bg-primary/10 transition-all duration-300 min-w-0"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gradient break-words">Journey Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
