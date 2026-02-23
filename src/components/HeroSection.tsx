import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import { ArrowDown, Download, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      <ParticleField />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-brand opacity-10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-brand opacity-10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              Open to opportunities
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6"
          >
            <div className="w-28 h-28 mx-auto rounded-full bg-gradient-brand p-[3px] glow-primary">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-3xl font-bold text-gradient">
                RS
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight"
          >
            Ritesh <span className="text-gradient glow-text">Singh</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-xl md:text-2xl text-secondary-foreground font-mono mb-4"
          >
            Business/Data Analyst{" "}
            <a
              href="https://jaipuria.edu.in/"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              @Jaipuria_Group
            </a>{" "}
            |{" "}
            <a
              href="https://leansixsigma.gtbharat.in/verify/8cc214ce5219?s=true"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Six Sigma Green Belt Certified
            </a>{" "}
            | Ex Data Analyst @WTF_Gyms | N8N • Excel • Power BI • SQL • Python • Make.com | CRM & Marketing Automation
            (Make.com, WATI) | MOS Excel Expert
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-6"
          >
            <MapPin className="w-4 h-4" />
            <span>Sector 62, Noida, UP, India</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Analytically driven Business Analytics student experienced with high-dimensional data,
            CRISP-DM methodology, statistical analysis, and BI workflows. Skilled in Power BI (DAX),
            SQL, Python, SPSS, SAP/ERP, and GDPR-compliant data handling to drive data-driven decisions
            and process automation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-brand text-primary-foreground font-semibold glow-primary"
            >
              Hire Me
            </motion.a>
            <motion.a
              href="/Ritesh_Singh_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg glass text-foreground font-semibold flex items-center gap-2"
              download
            >
              <Download className="w-4 h-4" />
              Download Resume
            </motion.a>
          </motion.div>

          <motion.a
            href="#skills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="inline-block animate-float"
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
