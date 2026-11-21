import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import LinkPreview from "./ui/link-preview";
import { ArrowDown, Download, Eye, Mail, MapPin } from "lucide-react";
import ResumePreviewModal from "./ResumePreviewModal";
import ContactModal from "./ContactModal";
import { useShouldRender3D } from "@/hooks/useShouldRender3D";

const HeroWorkspaceScene = lazy(() => import("./three/HeroWorkspaceScene"));

const HERO_METRICS = [
  { value: "30+", label: "Campuses on Power BI MIS" },
  { value: "65%", label: "Faster Lead Response SLA" },
  { value: "100K+", label: "Transactions Segmented" },
  { value: "12+ hrs", label: "Weekly Reporting Automated" },
];

const HeroSection = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const shouldRender3D = useShouldRender3D();

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg pt-24 pb-10 md:pt-28 md:pb-12"
    >
      <ParticleField />

      <div className="container mx-auto px-3 sm:px-6 relative z-10 max-w-7xl">
        {/* Split-Screen Editorial + Interactive 3D Hero (single column on mobile / reduced-motion) */}
        <div
          className={`grid grid-cols-1 items-stretch gap-8 lg:gap-10 ${
            shouldRender3D ? "lg:grid-cols-[1.08fr_0.92fr]" : "max-w-3xl mx-auto"
          }`}
        >
          {/* Left Column: Identity, Typography & Primary Actions */}
          <div className="flex flex-col justify-center text-left min-w-0">
            {/* Compact Identity Header with Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-4 mb-5"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-brand p-[2.5px] shrink-0 glow-primary">
                <picture className="block w-full h-full rounded-full overflow-hidden bg-muted">
                  <source srcSet={`${import.meta.env.BASE_URL}images/ritesh-hero.webp`} type="image/webp" />
                  <img
                    src={`${import.meta.env.BASE_URL}images/ritesh-hero.jpg`}
                    alt="Er. Ritesh Singh"
                    width={160}
                    height={160}
                    loading="eager"
                    decoding="async"
                    {...({ fetchpriority: "high" } as Record<string, string>)}
                    className="w-full h-full rounded-full object-cover bg-background"
                  />
                </picture>
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-mono text-primary font-semibold">
                  Business &amp; Data Analyst
                </p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <a
                      href="https://www.google.com/maps/place/Sector+62,+Noida,+Uttar+Pradesh/@28.6165456,77.3587009,16z/data=!4m6!3m5!1s0x390ce5456ef36d9f:0x3b7191b1286136c8!8m2!3d28.627981!4d77.3648567!16s%2Fm%2F01283ztw?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-foreground hover:underline transition-colors"
                    >
                      Sector 62, Noida, UP
                    </a>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Available for Analytics &amp; BI Consulting</span>
                </div>
              </div>
            </motion.div>

            {/* Primary Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl xs:text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.06] mb-4 text-balance"
            >
              Er. Ritesh <span className="text-gradient glow-text">Singh</span>
            </motion.h1>

            {/* Credentials & Interactive Link Previews */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="text-sm sm:text-base md:text-lg text-secondary-foreground font-mono leading-relaxed mb-4 max-w-2xl"
            >
              Data Analyst{" "}
              <LinkPreview
                href="https://jaipuria.edu.in/"
                imgSrc={`${import.meta.env.BASE_URL}images/jaipuria.png`}
                label="@Jaipuria_Group"
                sizeClass="w-40 sm:w-44 max-w-[80vw]"
              />{" "}
              ·{" "}
              <LinkPreview
                href="https://leansixsigma.gtbharat.in/verify/8cc214ce5219?s=true"
                imgSrc={`${import.meta.env.BASE_URL}images/Six_sigma.png`}
                label="Six Sigma Green Belt Certified"
                sizeClass="w-48 sm:w-56 max-w-[85vw]"
              />{" "}
              · Ex Data Analyst{" "}
              <LinkPreview
                href="https://www.wtfgyms.com/about"
                imgSrc={`${import.meta.env.BASE_URL}images/wtfgyms.png`}
                label="@WTF_Gyms"
                sizeClass="w-40 sm:w-44 max-w-[80vw]"
              />
            </motion.p>

            {/* Clean Stack Line */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-7 max-w-xl"
            >
              Building executive Power BI reporting architectures, Python predictive models, SQL pipelines, and CRM/WhatsApp workflow automations (Make.com, N8N, WATI, MOS Excel Expert).
            </motion.p>

            {/* Primary & Secondary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-brand text-primary-foreground font-semibold text-xs sm:text-sm flex items-center gap-2 glow-primary shadow-lg hover:shadow-primary/40 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Eye className="w-4 h-4 shrink-0" />
                <span>Preview Resume</span>
              </motion.button>

              <motion.a
                href={`${import.meta.env.BASE_URL}Ritesh_Singh_Resume.pdf`}
                download="Ritesh_Singh_Data_Analyst_Resume.pdf"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-card/70 text-foreground font-semibold text-xs sm:text-sm flex items-center gap-2 border border-border hover:border-primary/60 hover:bg-primary/10 transition-all whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4 shrink-0 text-primary" />
                <span>Download CV</span>
              </motion.a>

              <motion.button
                type="button"
                onClick={() => setIsContactOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-primary font-semibold text-xs sm:text-sm flex items-center gap-2 border border-primary/35 hover:border-primary hover:bg-primary/10 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>Collaborate</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Analytics Core Sculpture (desktop + motion-enabled only) */}
          {shouldRender3D && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="w-full flex items-center"
            >
              <Suspense
                fallback={<div className="w-full h-[340px] xs:h-[380px] sm:h-[440px] lg:h-[540px]" />}
              >
                <HeroWorkspaceScene />
              </Suspense>
            </motion.div>
          )}
        </div>

        {/* Full-Width Quantitative Impact Strip below the Hero Split */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.36 }}
          className="mt-8 lg:mt-10 pt-6 border-t border-border/70 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className="min-w-0">
              <p className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-gradient">
                {metric.value}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-snug">
                {metric.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll Cue */}
        <div className="mt-8 flex justify-center">
          <a
            href="#about-detailed"
            aria-label="Scroll to About section"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("about-detailed");
              if (el) {
                const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 72);
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
          >
            <span>Explore portfolio</span>
            <ArrowDown className="w-4 h-4 animate-float" />
          </a>
        </div>

        {/* Modals */}
        <ResumePreviewModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      </div>
    </section>
  );
};

export default HeroSection;
