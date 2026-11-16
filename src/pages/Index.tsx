import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
      <Navbar />
      <HeroSection />
      <AboutSection />
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
