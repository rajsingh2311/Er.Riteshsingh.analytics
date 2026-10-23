import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import LinkPreview from "./ui/link-preview";
import { ArrowDown, Download, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-20">
      <ParticleField />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-brand opacity-10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-brand opacity-10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-3 sm:mb-5"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] sm:text-xs md:text-sm text-primary font-mono border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow shrink-0" />
              <span>Open to collaborate</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4 sm:mb-6"
          >
            <div className="w-32 h-32 xs:w-40 xs:h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 mx-auto rounded-full bg-gradient-brand p-[3px] glow-primary">
              <img
                src={`${import.meta.env.BASE_URL}images/Ritesh%20image.JPG`}
                alt="Ritesh Singh"
                className="w-full h-full rounded-full object-cover bg-background"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4 leading-tight break-words"
          >
            Er. Ritesh <span className="text-gradient glow-text">Singh</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-secondary-foreground font-mono mb-4 md:mb-6 leading-relaxed break-words px-1"
          >
            Business/Data Analyst{" "}
            <LinkPreview
              href={"https://jaipuria.edu.in/"}
              imgSrc={`${import.meta.env.BASE_URL}images/jaipuria.png`}
              label={"@Jaipuria_Group"}
              sizeClass={"w-40 sm:w-44 max-w-[80vw]"}
            />{" "}
            |{" "}
            <LinkPreview
              href={"https://leansixsigma.gtbharat.in/verify/8cc214ce5219?s=true"}
              imgSrc={`${import.meta.env.BASE_URL}images/Six_sigma.png`}
              label={"Six Sigma Green Belt Certified"}
              sizeClass={"w-48 sm:w-56 max-w-[85vw]"}
            />{" "}
            | Ex Data Analyst{' '}
            <LinkPreview
              href={"https://www.wtfgyms.com/about"}
              imgSrc={`${import.meta.env.BASE_URL}images/wtfgyms.png`}
              label={'@WTF_Gyms'}
              sizeClass={"w-40 sm:w-44 max-w-[80vw]"}
            />{' '}
            | N8N • Excel • Power BI • SQL • Python • Make.com | CRM & Marketing Automation
            (Make.com, WATI) | MOS Excel Expert
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs sm:text-sm mb-5 sm:mb-6 flex-wrap"
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
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
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 sm:mb-12 md:mb-16"
          >
            <motion.a
              href="/Ritesh_Singh_Resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 sm:px-8 py-2 sm:py-3 rounded-lg glass text-foreground font-semibold text-xs sm:text-sm md:text-base flex items-center gap-2 border border-primary/30 hover:border-primary/60 transition-all shadow-sm"
              download
            >
              <Download className="w-4 h-4 shrink-0 text-primary" />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>

          <motion.a
            href="#about-detailed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="inline-block animate-float"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about-detailed')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
