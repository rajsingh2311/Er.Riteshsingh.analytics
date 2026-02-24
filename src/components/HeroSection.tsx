import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import LinkPreview from "./ui/link-preview";
import { ArrowDown, Download, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-20">
      <ParticleField />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-brand opacity-10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-brand opacity-10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 md:mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full glass text-xs md:text-sm text-primary font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              Open to opportunities
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4 md:mb-6"
          >
            <div className="w-20 md:w-28 h-20 md:h-28 mx-auto rounded-full bg-gradient-brand p-[3px] glow-primary">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-xl md:text-3xl font-bold text-gradient">
                RS
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4 leading-tight"
          >
            Ritesh <span className="text-gradient glow-text">Singh</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-sm sm:text-base md:text-xl lg:text-2xl text-secondary-foreground font-mono mb-4 md:mb-6 leading-relaxed"
          >
            Business/Data Analyst{" "}
            <LinkPreview
              href={"https://jaipuria.edu.in/"}
              imgSrc={"/images/jaipuria.png"}
              label={"@Jaipuria_Group"}
              sizeClass={"w-44"}
            />{" "}
            |{" "}
            <LinkPreview
              href={"https://leansixsigma.gtbharat.in/verify/8cc214ce5219?s=true"}
              imgSrc={"/images/Six_sigma.png"}
              label={"Six Sigma Green Belt Certified"}
              sizeClass={"w-56"}
            />{" "}
            | Ex Data Analyst{' '}
            <LinkPreview
              href={"https://www.wtfgyms.com/about"}
              imgSrc={"/images/wtfgyms.png"}
              label={'@WTF_Gyms'}
              sizeClass={"w-44"}
            />{' '}
            | N8N • Excel • Power BI • SQL • Python • Make.com | CRM & Marketing Automation
            (Make.com, WATI) | MOS Excel Expert
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-6"
          >
            <MapPin className="w-4 h-4" />
            <a
              href="https://www.google.com/maps/place/Sector+62,+Noida,+Uttar+Pradesh/@28.6165456,77.3587009,16z/data=!4m6!3m5!1s0x390ce5456ef36d9f:0x3b7191b1286136c8!8m2!3d28.627981!4d77.3648567!16s%2Fm%2F01283ztw?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:underline"
            >
              Sector 62, Noida, UP, India
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16"
          >
            <motion.a
              href="/Ritesh_Singh_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 md:px-8 py-2 md:py-3 rounded-lg glass text-foreground font-semibold text-sm md:text-base flex items-center gap-2"
              download
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
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
