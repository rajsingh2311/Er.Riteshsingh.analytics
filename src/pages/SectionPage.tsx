import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import { Star, Briefcase, GraduationCap, Award, FolderOpen, Heart, Zap, MessageSquare, Trophy, MapPin, Calendar, User, ChevronRight, X, Terminal, BarChart3, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import SectionNavigator from "@/components/SectionNavigator";
import ParticleField from "@/components/ParticleField";
import LinkPreview from "@/components/ui/link-preview";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import PythonProjectSimulator from "@/components/projects/PythonProjectSimulator";
import PowerBIProjectViewer from "@/components/projects/PowerBIProjectViewer";

import certGoogle from "@/assets/cert-google.jpg";
import certAws from "@/assets/cert-aws.jpg";
import certPowerbi from "@/assets/cert-powerbi.jpg";
import awardInnovation from "@/assets/award-innovation.jpg";
import volunteering from "@/assets/volunteering.jpg";
import featuredDashboard from "@/assets/featured-dashboard.jpg";

const sectionMeta: Record<string, { label: string; icon: React.ElementType }> = {
  about: { label: "About", icon: User },
  featured: { label: "Featured", icon: Star },
  experience: { label: "Experience", icon: Briefcase },
  education: { label: "Education", icon: GraduationCap },
  certifications: { label: "Certifications", icon: Award },
  projects: { label: "Projects", icon: FolderOpen },
  volunteering: { label: "Workshops", icon: Heart },
  skills: { label: "Skills", icon: Zap },
  recommendations: { label: "Highlights", icon: MessageSquare },
  honors: { label: "Achievements", icon: Trophy },
};

const SectionPage = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const meta = sectionMeta[sectionId || ""] || { label: "Section", icon: Star };
  const Icon = meta.icon;
  const [projectSubTab, setProjectSubTab] = React.useState<"all" | "python" | "powerbi">("all");

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setProjectSubTab("all");
  }, [sectionId]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleField />
      
      {/* Use main Navbar component */}
      <Navbar />

      {/* Top Section Navigator */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <SectionNavigator
          mode="page"
          currentPage={meta.label}
          subPage={
            sectionId === "projects" && projectSubTab !== "all"
              ? projectSubTab === "powerbi" 
                ? "Power BI Hub & .PBIX" 
                : "Python Live Simulator"
              : undefined
          }
          backTo="/"
          backLabel={
            sectionId === "projects" && projectSubTab !== "all"
              ? "All Projects"
              : "Back to Home"
          }
          onBack={
            sectionId === "projects" && projectSubTab !== "all"
              ? () => setProjectSubTab("all")
              : undefined
          }
          breadcrumbs={[
            { label: "Home", to: "/" },
            { 
              label: meta.label,
              onClick: sectionId === "projects" && projectSubTab !== "all" ? () => setProjectSubTab("all") : undefined,
              to: sectionId === "projects" && projectSubTab !== "all" ? undefined : `/section/${sectionId}` 
            },
            ...(sectionId === "projects" && projectSubTab !== "all" ? [{
              label: projectSubTab === "powerbi" ? "Power BI Hub & .PBIX" : "Python Live Simulator"
            }] : [])
          ]}
        />
      </div>

      <div className="pt-28 sm:pt-32 md:pt-36 pb-8 md:pb-16 container mx-auto px-3 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <div className="w-12 md:w-16 h-12 md:h-16 mx-auto rounded-xl bg-gradient-brand flex items-center justify-center mb-3 md:mb-4 glow-primary">
            <Icon className="w-6 md:w-8 h-6 md:h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold break-words">
            <span className="text-gradient">{meta.label}</span>
          </h1>
        </motion.div>

        <SectionContent 
          sectionId={sectionId || ""} 
          projectSubTab={projectSubTab}
          setProjectSubTab={setProjectSubTab}
        />
      </div>
    </div>
  );
};

const SectionContent = ({ 
  sectionId,
  projectSubTab,
  setProjectSubTab
}: { 
  sectionId: string;
  projectSubTab: "all" | "python" | "powerbi";
  setProjectSubTab: (tab: "all" | "python" | "powerbi") => void;
}) => {
  switch (sectionId) {
    case "about":
      return <AboutContent />;
    case "featured":
      return <FeaturedContent />;
    case "experience":
      return <ExperienceContent />;
    case "education":
      return <EducationContent />;
    case "certifications":
      return <CertificationsContent />;
    case "projects":
      return <ProjectsContent activeTab={projectSubTab} setActiveTab={setProjectSubTab} />;
    case "volunteering":
      return <VolunteeringContent />;
    case "skills":
      return <SkillsContent />;
    case "recommendations":
      return <RecommendationsContent />;
    case "honors":
      return <HonorsContent />;
    default:
      return <p className="text-center text-muted-foreground">Section not found.</p>;
  }
};

const AboutContent = () => (
  <div className="max-w-4xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Gradient Border Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-teal-400 to-cyan-300 rounded-2xl p-[2px]">
        <div className="absolute inset-0 bg-background/95 rounded-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 rounded-2xl p-6 md:p-12 bg-background/50 backdrop-blur-sm">
        {/* Title */}
        <h3 className="text-xl md:text-3xl font-bold text-gradient mb-6 md:mb-8">
          Data Analyst | Business Intelligence Specialist
        </h3>

        {/* Main Content - Justified Text */}
        <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
          <p className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed text-justify">
            I am a Data Analyst at Seth Anandram Jaipuria Group of Educational Institutions, where I leverage SQL, 
            Predictive Analytics, and Power BI to transform raw institutional data into strategic insights. My focus is on 
            driving operational efficiency and supporting evidence-based decision-making within the education sector.
          </p>

          <p className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed text-justify">
            Previously, I honed my ability to merge technical analysis with business impact at WTF Gyms. There, I engineered 
            automation workflows (Make.com & WATI) that reduced lead response times by 65% and developed comprehensive Power BI 
            dashboards to track agent performance and funnel conversion.
          </p>

          <p className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed text-justify">
            I am passionate about #BuildingInPublic and sharing workflows that help businesses make smarter, faster decisions. 
            Let's connect to discuss data strategy and automation.
          </p>
        </div>

        {/* Core Competencies */}
        <div className="border-t border-white/20 pt-6 md:pt-8">
          <h4 className="text-lg md:text-xl font-bold text-gradient mb-4 md:mb-6">Core Competencies</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
            >
              <h5 className="font-semibold text-primary mb-3">Analytics</h5>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>SQL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Excel (MOS Expert)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Power BI (DAX)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Python</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>SPSS</span>
                </li>
              </ul>
            </motion.div>

            {/* Business Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
            >
              <h5 className="font-semibold text-primary mb-3">Business Tools</h5>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>SAP ERP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Make.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>WATI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>N8N</span>
                </li>
              </ul>
            </motion.div>

            {/* Methodologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
            >
              <h5 className="font-semibold text-primary mb-3">Methodologies</h5>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>CRISP-DM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Six Sigma</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Statistical Analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>GDPR Compliance</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);


const FeaturedContent = () => (
  <div className="max-w-4xl mx-auto space-y-8">
    {[
      {
        image: featuredDashboard,
        title: "Customer Segmentation & Marketing Analytics Dashboard (RFM)",
        desc: "Processed 100,000+ customer transactions using the RFM model and built an Excel dashboard with slicers and dynamic visuals. Identified top 3 segments contributing ~82% revenue (Pareto 80/20) and proposed actionable strategies for retention, conversion, and monetization.",
        tags: ["Excel", "RFM", "Segmentation", "Dashboarding"],
      },
    ].map((item, i) => (
      <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="glass rounded-2xl overflow-hidden border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10 transition-all duration-300 min-w-0">
        <img src={item.image} alt={item.title} className="w-full h-56 sm:h-64 md:h-80 object-cover" />
        <div className="p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 break-words leading-tight">{item.title}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed break-words">{item.desc}</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map(t => <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary">{t}</span>)}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const ExperienceContent = () => {
  const experiences = [
    {
      title: "Data Analyst",
      company: "Seth Anandram Jaipuria Group of Educational Institutions",
      logo: `${import.meta.env.BASE_URL}images/Professional%20Experience/Jaipuria%20Logo.png`,
      location: "Ghaziabad",
      type: "Full-time",
      period: "Dec 2025 — Present",
      desc: "Connected, trained, and collaborated with 30+ MIS Executives across schools to build automated dashboards and executive reports in Power BI & Excel for senior leadership.",
      skills: ["Power BI", "Excel", "MIS Automation", "Data Modeling", "Executive Reporting"],
    },
    {
      title: "Data Analyst Intern",
      company: "WTF Gyms",
      logo: `${import.meta.env.BASE_URL}images/Professional%20Experience/WTF%20Logo.png`,
      location: "Noida, UP",
      type: "Internship",
      period: "May 2025 — Jul 2025",
      desc: "Automated lead capture & routing pipelines (Meta Ads → Sheets → WATI), built real-time interview tracking, and designed Power BI dashboards saving 12+ hours/week.",
      skills: ["Workflow automation", "Power BI", "Make.com", "WATI", "GDPR"],
    },
    {
      title: "Student Co‑ordinator — Business Analytics Club",
      company: "Jaipuria School of Business",
      logo: `${import.meta.env.BASE_URL}images/Professional%20Experience/Jaipuria%20Logo.png`,
      location: "Ghaziabad",
      type: "Full-time",
      period: "Sep 2024 — Present",
      desc: "Organizing Power BI bootcamps, analytics hackathons, and peer-to-peer mentoring on high-dimensional data visualization and dashboard design.",
      skills: ["Community Leadership", "Power BI Workshops", "Data Storytelling"],
    },
    {
      title: "Team Leader (Market Research)",
      company: "Stagnet Research Pvt. Ltd",
      logo: `${import.meta.env.BASE_URL}images/Professional%20Experience/Stagnate%20Logo.png`,
      location: "Noida, UP",
      type: "Full-time",
      period: "Jul 2023 — Jul 2024",
      desc: "Led a 20-member research team conducting qualitative and market surveys; built Power BI dashboards and automated data cleaning frameworks reducing turnaround by 25%.",
      skills: ["Power BI (DAX)", "Statistics", "Survey Design", "Data Quality", "Team Leadership"],
    },
    {
      title: "Chemical Engineer",
      company: "Reliance Industries Limited",
      logo: `${import.meta.env.BASE_URL}images/Professional%20Experience/Reliance%20Logo.png`,
      location: "Jamnagar, Gujarat",
      type: "Full-time",
      period: "Jan 2023 — Jul 2023",
      desc: "Monitored refinery operations and plant telemetry; built Pareto charts and trend analysis dashboards to isolate process bottlenecks.",
      skills: ["Industrial Data", "Process Analytics", "Pareto Analysis", "Safety Metrics"],
    },
  ];
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {experiences.map((exp, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: i * 0.12 }} 
          className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group border border-border/80 hover:border-primary/50 shadow-sm hover:shadow-[0_0_30px_rgba(var(--glow)/0.25)] hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-white p-2 flex items-center justify-center flex-shrink-0 shadow-md border border-white/20">
              <img 
                src={exp.logo} 
                alt={`${exp.company} logo`}
                className="w-full h-full object-contain rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {exp.title}
              </h3>
              <p className="text-sm md:text-base text-secondary-foreground font-semibold mt-1">
                {exp.company}
              </p>
              <div className="flex flex-wrap items-center gap-2.5 mt-2.5 text-xs">
                <span className="inline-flex items-center gap-1.5 font-mono text-primary font-medium bg-primary/10 px-2.5 py-1 rounded-md border border-primary/25">
                  <Calendar className="w-3.5 h-3.5" />
                  {exp.period}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground font-medium">
                  <MapPin className="w-3.5 h-3.5 text-primary/70" />
                  {exp.location}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/30">
                  {exp.type}
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{exp.desc}</p>
          <div className="flex flex-wrap gap-2">
            {exp.skills.map(s => <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground border border-border/50">{s}</span>)}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const EducationContent = () => {
  const navigate = useNavigate();

  const edu = [
    {
      degree: "PGDM (Business Analytics & Operation) — Pursuing",
      school: "Jaipuria School of Business",
      period: "2024 — 2026 · CGPA: 7.03",
      desc: "Focus: Business Analytics, CRISP‑DM methodology, high-dimensional data visualization, predictive analytics.",
      activities: ["Student Co-Ordinator Business Analytics Club", "Organized Power BI workshops & hackathons", "Mentored students on analytics projects & dashboard design", "Winner Talent Hunt 2024 (Poetry Competition)"],
    },
    {
      degree: "B.Tech (Chemical Engineering)",
      school: "SCRIET, CCSU Meerut",
      period: "2019 — 2023 · CGPA: 6.74",
      desc: "Exposure to SAP ERP systems, data processing (structured & semi‑structured), and applied research.",
      activities: ["Student Coordinator — IWRS (Organized seminars & awareness activities)", "Student Coordinator — Unnat Bharat Abhiyan (Organized awareness programs)"],
    },
    {
      degree: "12th (Physics, Chemistry, Math)",
      school: "S Devi Inter College, Madhuban, Mau (UP Board)",
      period: "2019 · 61%",
      desc: "PCM curriculum with quantitative foundation.",
      activities: ["Academic coursework"],
    },
    {
      degree: "10th (Science)",
      school: "S Devi Inter College, Madhuban, Mau (UP Board)",
      period: "2019 · 81.33%",
      desc: "Science curriculum.",
      activities: ["Academic coursework"],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Education Cards */}
      <div className="space-y-6">
        {edu.map((e, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: i * 0.2 }} 
          onClick={() => {
            if (e.school === "Jaipuria School of Business") {
              navigate("/pgdm");
            }
          }}
          className={`glass rounded-xl p-4 sm:p-6 min-w-0${e.school === "Jaipuria School of Business" ? ' border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10 cursor-pointer' : ''} transition-all duration-300`}
          whileHover={e.school === "Jaipuria School of Business" ? { y: -3 } : {}}
        >
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold break-words leading-tight">{e.degree}</h3>
              <span className="text-secondary-foreground block text-xs sm:text-sm font-medium mt-0.5 break-words">
                {e.school === "Jaipuria School of Business" ? (
                  <LinkPreview
                    href="https://jsb.jaipuria.edu.in/overview-jsbpgdm/"
                    imgSrc="/images/JSB.png"
                    label="Jaipuria School of Business"
                    sizeClass="w-44 sm:w-52 max-w-[80vw]"
                  />
                ) : (
                  e.school
                )}
              </span>
              <p className="text-xs font-mono text-primary mt-1">{e.period}</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 leading-relaxed break-words">{e.desc}</p>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-foreground">Activities & Societies:</p>
            {e.activities.map(a => <p key={a} className="text-xs text-muted-foreground break-words">• {a}</p>)}
          </div>
        </motion.div>
      ))}
      </div>
    </div>
  );
};

const CertificationsContent = () => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const certs = [
    { title: "Strategic Management", issuer: "Indian Institute of Management Bangalore", date: "Jan 2026", id: "—", link: "", image: `${import.meta.env.BASE_URL}images/certification/Strategic%20Management.png` },
    { title: "Lean Six Sigma Green Belt Certification", issuer: "Grant Thornton Bharat LLP", date: "Nov 2025", id: "8cc214ce5219", link: "https://leansixsigma.gtbharat.in/verify/8cc214ce5219?s=true", image: `${import.meta.env.BASE_URL}images/certification/Six%20Sigma.png` },
    { title: "AI Chat Prompts for Business Analysis", issuer: "LinkedIn Learning", date: "Oct 2025", id: "—", link: "https://www.linkedin.com/learning/certificates/051d700d947fe8919ecc5113dbecd87181a45c457649bb434000d8d10b7aac40?u=295910228", image: `${import.meta.env.BASE_URL}images/certification/AI%20Chat%20Prompt%20For%20Business%20Analysis.png` },
    { title: "What Is Generative AI?", issuer: "LinkedIn Learning", date: "Sep 2025", id: "28d95f99605f52e45b24279b802dbcaca2b14cee367f841c242de288f00ef29a", link: "https://www.linkedin.com/learning/certificates/28d95f99605f52e45b24279b802dbcaca2b14cee367f841c242de288f00ef29a?u=295910228", image: `${import.meta.env.BASE_URL}images/certification/What%20Is%20Generative%20AI.png` },
    { title: "The Development and Implementation of International Business", issuer: "Management Development Institute of Singapore", date: "Mar 2025", id: "—", link: "", image: `${import.meta.env.BASE_URL}images/certification/MDIS%20Singapur.png` },
    { title: "Microsoft Office Specialist: Microsoft Excel Expert", issuer: "Microsoft", date: "Mar 2025", id: "UcLk-sFpA", link: "", image: `${import.meta.env.BASE_URL}images/certification/Excel%202019%20Associate.png` },
    { title: "Google AI Essentials", issuer: "Google", date: "Jan 2025", id: "B0SW463I0XDY", link: "https://www.linkedin.com/in/riteshsingh-analytics/details/certifications/1750708039171/single-media-viewer/?profileId=ACoAAEamlyABDk_G7aLuwqmnQBmZM-vzr1jBoHc", image: `${import.meta.env.BASE_URL}images/certification/Google%20AI%20Assential.png` },
  ];
  return (
    <>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {certs.map((cert, i) => (
          <HoverCard openDelay={200} closeDelay={100} key={i}>
            <HoverCardTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.12 }}
                whileHover={cert.link || cert.image ? { y: -4 } : {}}
                className={`glass rounded-xl overflow-hidden group cursor-pointer block min-w-0${cert.link || cert.image ? ' border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10' : ''} transition-all duration-300`}
                onClick={() => {
                  if (cert.link) {
                    window.open(cert.link, "_blank");
                  } else if (cert.image) {
                    setSelectedImage(cert.image);
                  }
                }}
              >
                <div className="relative h-40 sm:h-44 overflow-hidden bg-muted/40">
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-3.5 sm:p-4">
                  <h3 className="font-bold text-xs sm:text-sm mb-1 group-hover:text-gradient transition-all break-words leading-snug">{cert.title}</h3>
                  <p className="text-[11px] sm:text-xs text-secondary-foreground break-words">{cert.issuer}</p>
                  <p className="text-[10px] sm:text-xs text-primary mt-1 font-mono">Issued {cert.date}</p>
                  {cert.id !== "—" && <p className="text-[10px] sm:text-xs font-mono text-muted-foreground mt-0.5 truncate">ID: {cert.id}</p>}
                </div>
              </motion.div>
            </HoverCardTrigger>
            <HoverCardContent 
              side="right" 
              align="center" 
              sideOffset={10}
              className="hidden md:block w-[380px] max-w-[calc(100vw-32px)] p-2 bg-background/95 backdrop-blur-md border border-primary/20"
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-auto object-contain rounded-lg"
              />
              <p className="text-center text-sm font-medium mt-2 text-foreground">{cert.title}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
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
              alt="Certificate"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

interface ProjectsContentProps {
  activeTab: "all" | "python" | "powerbi";
  setActiveTab: (tab: "all" | "python" | "powerbi") => void;
}

const ProjectsContent: React.FC<ProjectsContentProps> = ({ activeTab, setActiveTab }) => {

  const projects = [
    {
      title: "Customer Segmentation & Marketing Analytics Dashboard (RFM)",
      desc: "Processed 100,000+ transactions using the RFM framework; built an Excel dashboard with slicers and dynamic visuals; identified top 3 segments contributing ~82% revenue and proposed retention/conversion strategies.",
      tags: ["Excel", "RFM", "Dashboard"],
      metric: "100K+ txns",
      type: "python" as const,
    },
    {
      title: "Attrition & Retention Analysis",
      desc: "Analyzed semi‑structured HR datasets (attrition, retention, exit interviews) using Excel/PivotTables and Python; applied CRISP‑DM to build an attrition dashboard and deliver retention strategies.",
      tags: ["Python", "Excel", "CRISP‑DM"],
      metric: "HR analytics",
      type: "python" as const,
    },
    {
      title: "Customer Satisfaction in E‑Banking — Demographic Impact",
      desc: "Collected 226 responses and analyzed using SPSS (Chi‑Square, T‑Test, ANOVA). Found gender significantly impacted satisfaction (p = 0.0085) and recommended GDPR‑compliant UX improvements and digital literacy initiatives.",
      tags: ["SPSS", "Statistics", "GDPR"],
      metric: "226 responses",
      type: "python" as const,
    },
    {
      title: "Jaipuria Schools Academic & Admissions MIS",
      desc: "Enterprise Power BI reporting architecture tracking 28+ schools, branch KPIs, admission conversion rates, fee collections, and staff retention.",
      tags: ["Power BI", "DAX", "Executive MIS"],
      metric: "28+ Campuses",
      type: "powerbi" as const,
    },
    {
      title: "WTF Gyms Lead Funnel & Conversion Dashboard",
      desc: "End-to-end sales pipeline tracking across 12 branch locations. Decreased lead response time by 65% with automated WATI & Make.com triggers.",
      tags: ["Power BI", "Make.com", "WATI"],
      metric: "65% Faster SLA",
      type: "powerbi" as const,
    },
    {
      title: "Challenges & Future Prospect of National Logistics Policy",
      desc: "Researched logistics sector challenges (infrastructure, costs, digital gaps) and evaluated NLP’s impact with policy analysis and forecasting; proposed ERP‑integrated, data‑driven recommendations.",
      tags: ["Policy analysis", "Forecasting", "ERP"],
      metric: "Research",
      type: "all" as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Mode Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 p-1.5 rounded-2xl bg-card/60 backdrop-blur-md border border-border/60 max-w-2xl mx-auto shadow-sm">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === "all"
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>All Projects ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("python")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === "python"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/25"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Python Live Simulator</span>
          <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            Interactive
          </span>
        </button>

        <button
          onClick={() => setActiveTab("powerbi")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === "powerbi"
              ? "bg-amber-600 text-white shadow-md shadow-amber-500/25"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          <BarChart3 className="w-4 h-4 text-amber-300" />
          <span>Power BI Hub & .PBIX</span>
          <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider rounded-md bg-amber-500/20 text-amber-200 font-mono">
            Viewer
          </span>
        </button>
      </div>

      {/* Tab 1: All Projects Grid */}
      {activeTab === "all" && (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-5 flex flex-col justify-between border border-border/60 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div>
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h3 className="text-base font-bold text-foreground leading-snug">{p.title}</h3>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary flex-shrink-0">
                    {p.metric}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-border/40">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                {p.type === "python" && (
                  <button
                    onClick={() => setActiveTab("python")}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Run in Python Simulator &rarr;</span>
                  </button>
                )}
                {p.type === "powerbi" && (
                  <button
                    onClick={() => setActiveTab("powerbi")}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Explore in Power BI Hub &rarr;</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Tab 2: Python Live Simulator */}
      {activeTab === "python" && (
        <div className="max-w-6xl mx-auto">
          <PythonProjectSimulator />
        </div>
      )}

      {/* Tab 3: Power BI Hub & .PBIX Viewer */}
      {activeTab === "powerbi" && (
        <div className="max-w-6xl mx-auto">
          <PowerBIProjectViewer />
        </div>
      )}
    </div>
  );
};

const VolunteeringContent = () => {
  const items = [
    {
      image: volunteering,
      title: "MDIS International Business Workshop",
      org: "MDIS Singapore (Prof. Philip Yu)",
      period: "Mar 2025",
      desc: "7‑day program on development and implementation of international business. Focused on ERP‑driven analytics, high‑dimensional global datasets, forecasting, and GDPR‑compliant cross‑border data flows.",
    },
    {
      title: "Design Thinking Workshop",
      org: "Jaipuria School of Business",
      period: "Oct 16–17, 2024",
      desc: "Applied Design Thinking and CRISP‑DM frameworks to analytics‑driven product ideation and problem solving.",
    },
    {
      title: "Cyber Security Workshop",
      org: "Jaipuria School of Business",
      period: "Dec 19, 2024",
      desc: "Covered structured & unstructured data security, GDPR, and analytics risk management.",
    },
    {
      title: "The Spotlight Within: Creative Theatre Workshop",
      org: "Jaipuria School of Business",
      period: "Apr 26, 2025",
      desc: "Enhanced storytelling, presentation, and communication skills useful for analytics reporting.",
    },
    {
      title: "Indian Values & Ethos Workshop",
      org: "Jaipuria School of Business",
      period: "Jan 28, 2025",
      desc: "Focused on ethics and practical decision‑making.",
    },
  ];
  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {items.map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="glass rounded-xl overflow-hidden border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10 transition-all duration-300 min-w-0">
          {item.image && <img src={item.image} alt={item.title} className="w-full h-44 sm:h-48 object-cover" />}
          <div className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-1 break-words">{item.title}</h3>
            <p className="text-secondary-foreground text-xs sm:text-sm font-medium">{item.org}</p>
            <p className="text-xs font-mono text-primary mb-2 sm:mb-3">{item.period}</p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const SkillsContent = () => {
  const categories = [
    { category: "Data Analytics & BI Tools", skills: [{ name: "Power BI (DAX)", level: 90 }, { name: "MS Excel (Advanced)", level: 92 }, { name: "SPSS", level: 78 }, { name: "Python", level: 80 }] },
    { category: "Data Handling", skills: [{ name: "Structured / Semi‑Structured / Unstructured Data", level: 85 }, { name: "High‑Dimensional Data Analysis", level: 82 }, { name: "GDPR‑Compliant Processing", level: 80 }, { name: "Data Cleaning", level: 85 }] },
    { category: "Business Applications", skills: [{ name: "SAP ERP Systems", level: 70 }, { name: "Workflow Automation", level: 78 }, { name: "CRISP‑DM", level: 82 }, { name: "Statistical Analysis", level: 80 }] },
    { category: "Visualization & Reporting", skills: [{ name: "Dashboards", level: 88 }, { name: "Forecasting Models", level: 76 }, { name: "Process Optimization", level: 78 }, { name: "Presentation & Storytelling", level: 80 }] },
    { category: "Soft Skills", skills: [{ name: "Problem Solving", level: 85 }, { name: "Critical Thinking", level: 85 }, { name: "Leadership", level: 80 }, { name: "Communication", level: 82 }] },
  ];
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {categories.map((cat, ci) => (
        <motion.div key={ci} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.12 }} className="glass rounded-xl p-4 sm:p-6 border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10 transition-all duration-300 min-w-0">
          <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-gradient break-words">{cat.category}</h3>
          <div className="space-y-2.5 sm:space-y-3">
            {cat.skills.map((s, si) => (
              <div key={si} className="min-w-0">
                <div className="flex justify-between text-xs sm:text-sm mb-1 gap-2">
                  <span className="truncate">{s.name}</span>
                  <span className="text-muted-foreground font-mono text-xs shrink-0">{s.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 1, delay: ci * 0.15 + si * 0.1 }} className="h-full rounded-full bg-gradient-brand" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const RecommendationsContent = () => {
  const recs = [
    { text: "Designed GDPR‑compliant automated reporting systems, reducing manual effort by 12+ hours/week.", author: "Impact", role: "Automation & reporting" },
    { text: "Processed 100,000+ customer transactions using RFM; identified top segments contributing ~82% revenue (Pareto 80/20).", author: "Impact", role: "Segmentation & analytics" },
    { text: "Analyzed 226 survey responses in SPSS; found gender significantly impacted satisfaction (p = 0.0085) and proposed UX improvements.", author: "Impact", role: "Statistics & insights" },
  ];
  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {recs.map((rec, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="glass rounded-xl p-4 sm:p-6 relative border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10 transition-all duration-300 min-w-0">
          <span className="text-5xl sm:text-6xl text-primary/15 font-serif absolute top-2 left-4 pointer-events-none">"</span>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground italic pl-5 sm:pl-6 pt-3 sm:pt-4 mb-4 leading-relaxed break-words">{rec.text}</p>
          <div className="flex items-center gap-3 pl-5 sm:pl-6">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-brand flex items-center justify-center text-xs sm:text-sm font-bold text-primary-foreground shrink-0">
              {rec.author.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-xs sm:text-sm truncate">{rec.author}</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground truncate">{rec.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const HonorsContent = () => {
  const awards = [
    { image: awardInnovation, title: "Talent Hunt — 1st Prize (Poetry)", org: "Jaipuria School of Business", year: "Aug 2024", desc: "Recognized for public speaking, creative expression, and presentation skills." },
    { title: "Trading Simulation Challenge — Finalist", org: "Jaipuria School of Business", year: "Nov 2024", desc: "Applied statistical modeling and market analytics to simulate investment strategies." },
    { title: "Melange — Poetry Competition Participant", org: "IMS Ghaziabad", year: "Mar 2025", desc: "Showcased communication, presentation, and creative expression." },
    { title: "National Seminar Organizer — Environment Day", org: "College event", year: "Jun 2023", desc: "Coordinated event on Beat Plastic Pollution, managing participant engagement and event data." },
    { title: "National Seminar Organizer — World Water Day", org: "College event", year: "Mar 2023", desc: "Organized session on “Accelerating Change: through Participation & Cooperation” as student coordinator." },
    { title: "Agriculture Seminar Organizer", org: "College event", year: "Dec 2022", desc: "Coordinated seminar on 21st Century Agriculture: Advancement & Future Prospects." },
  ];
  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {awards.map((award, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="glass rounded-xl overflow-hidden group border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10 transition-all duration-300 min-w-0">
          {award.image && (
            <div className="relative h-44 sm:h-48 overflow-hidden bg-muted/40">
              <img src={award.image} alt={award.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            </div>
          )}
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs font-mono text-primary font-medium">{award.year}</span>
            </div>
            <h3 className="text-base sm:text-xl font-bold mb-1 break-words">{award.title}</h3>
            <p className="text-xs sm:text-sm text-secondary-foreground font-medium mb-2">{award.org}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SectionPage;

