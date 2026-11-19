import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeRibbon from "@/components/MarqueeRibbon";
import AboutSection from "@/components/AboutSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import InteractiveCursor from "@/components/InteractiveCursor";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!scrollTo) {
      return;
    }

    const timer = window.setTimeout(() => {
      const element = document.getElementById(scrollTo);
      if (element) {
        const navOffset = 72;
        const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY - navOffset);
        window.scrollTo({ top, behavior: "smooth" });
      }
      navigate("/", { replace: true, state: null });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen overflow-x-clip scroll-smooth">
      <InteractiveCursor />
      {/* Precision scroll-driven progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-brand origin-left z-[60] pointer-events-none"
      />
      <Navbar />
      <HeroSection />
      <MarqueeRibbon />
      <AboutSection />
      <CapabilitiesSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
