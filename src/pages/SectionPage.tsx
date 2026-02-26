import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import { Star, Briefcase, GraduationCap, Award, FolderOpen, Heart, Zap, MessageSquare, Trophy, MapPin, Calendar, User, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";
import LinkPreview from "@/components/ui/link-preview";

import certGoogle from "@/assets/cert-google.jpg";
import certAws from "@/assets/cert-aws.jpg";
import certPowerbi from "@/assets/cert-powerbi.jpg";
import awardInnovation from "@/assets/award-innovation.jpg";
import volunteering from "@/assets/volunteering.jpg";
import featuredDashboard from "@/assets/featured-dashboard.jpg";

const sectionMeta: Record<string, { label: string; icon: any }> = {
  about: { label: "About", icon: User },
  featured: { label: "Featured", icon: Star },
  experience: { label: "Experience", icon: Briefcase },
  education: { label: "Education", icon: GraduationCap },
  certifications: { label: "Licenses & Certifications", icon: Award },
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

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [sectionId]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleField />
      
      {/* Use main Navbar component */}
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="fixed top-16 left-0 right-0 z-40 glass border-b">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/")}
            className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Home
          </motion.button>
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 mx-2 text-muted-foreground" />
          <span className="text-sm md:text-base text-primary font-semibold">{meta.label}</span>
        </div>
      </div>

      <div className="pt-32 md:pt-36 pb-8 md:pb-16 container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="w-12 md:w-16 h-12 md:h-16 mx-auto rounded-xl bg-gradient-brand flex items-center justify-center mb-3 md:mb-4 glow-primary">
            <Icon className="w-6 md:w-8 h-6 md:h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">
            <span className="text-gradient">{meta.label}</span>
          </h1>
        </motion.div>

        <SectionContent sectionId={sectionId || ""} />
      </div>
    </div>
  );
};

const SectionContent = ({ sectionId }: { sectionId: string }) => {
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
      return <ProjectsContent />;
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
      <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="glass rounded-2xl overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-64 md:h-80 object-cover" />
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
          <p className="text-muted-foreground mb-4">{item.desc}</p>
          <div className="flex gap-2">
            {item.tags.map(t => <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">{t}</span>)}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const ExperienceContent = () => {
  const experiences = [
    {
      title: "Business Analyst (Team Leader – Market Research)",
      company: "Stagnate Research Pvt. Ltd",
      location: "India",
      period: "Jul 2023 — Jul 2024",
      desc: "Built and optimized Power BI dashboards (DAX) for high-dimensional data visualization and operational reporting (sales funnels, agent performance). Designed and tested survey frameworks using statistical analysis (Chi‑Square, T‑Test, ANOVA) and supervised structured/unstructured data collection with quality and compliance.",
      skills: ["Power BI (DAX)", "Statistics", "Survey design", "Data quality"],
    },
    {
      title: "Data Analyst Intern",
      company: "WTF Gyms",
      location: "Noida, UP",
      period: "May 2025 — Jul 2025",
      desc: "Automated lead capture/routing pipelines (Meta Ads → Google Sheets → WhatsApp/WATI). Built real-time interview tracking integrated with WATI and ERP HR workflows. Created Power BI dashboards for lead funnel tracking and agent productivity; designed GDPR‑compliant automated reporting saving 12+ hours/week.",
      skills: ["Workflow automation", "Power BI", "Excel/Sheets", "GDPR"],
    },
    {
      title: "Intern Engineer",
      company: "Kribhco Fertilizers Ltd",
      location: "Shahjahanpur, UP",
      period: "Jun 2022 — Jul 2022",
      desc: "Gained exposure to SAP ERP systems for workforce operations and reporting; supported process data collection and learning within industrial teams.",
      skills: ["SAP ERP", "Operations reporting", "Process data"],
    },
  ];
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {experiences.map((exp, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="glass rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-brand" />
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold group-hover:text-gradient transition-all">{exp.title}</h3>
              <p className="text-secondary-foreground font-medium">{exp.company}</p>
            </div>
            <div className="flex flex-col items-start md:items-end mt-2 md:mt-0">
              <span className="text-xs font-mono text-primary flex items-center gap-1"><Calendar className="w-3 h-3" />{exp.period}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{exp.desc}</p>
          <div className="flex flex-wrap gap-2">
            {exp.skills.map(s => <span key={s} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-secondary-foreground">{s}</span>)}
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
      degree: "PGDM (Business Analytics) — Pursuing",
      school: "Jaipuria School of Business",
      period: "2024 — 2026 · CGPA: 6.85",
      desc: "Focus: Business Analytics, CRISP‑DM methodology, high-dimensional data visualization, predictive analytics.",
      activities: ["Business analytics coursework", "Dashboarding & reporting", "Statistics for decision making"],
    },
    {
      degree: "B.Tech (Chemical Engineering)",
      school: "SCRIET, CCSU Meerut",
      period: "2019 — 2023 · CGPA: 6.74",
      desc: "Exposure to SAP ERP systems, data processing (structured & semi‑structured), and applied research.",
      activities: ["Applied research projects", "Data processing & reporting"],
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
          className={`glass rounded-xl p-6 ${e.school === "Jaipuria School of Business" ? "cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all" : ""}`}
          whileHover={e.school === "Jaipuria School of Business" ? { y: -4 } : {}}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{e.degree}</h3>
              <p className="text-secondary-foreground">
                {e.school === "Jaipuria School of Business" ? (
                  <LinkPreview
                    href="https://jsb.jaipuria.edu.in/overview-jsbpgdm/"
                    imgSrc="/images/JSB.png"
                    label="Jaipuria School of Business"
                    sizeClass="w-52"
                  />
                ) : (
                  e.school
                )}
              </p>
              <p className="text-xs font-mono text-primary">{e.period}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{e.desc}</p>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-foreground">Activities & Societies:</p>
            {e.activities.map(a => <p key={a} className="text-xs text-muted-foreground">• {a}</p>)}
          </div>
        </motion.div>
      ))}
      </div>
    </div>
  );
};

const CertificationsContent = () => {
  const certs = [
    { image: certGoogle, title: "Google AI Essentials", issuer: "Coursera", date: "Completed", id: "—" },
    { image: certPowerbi, title: "Microsoft Office Specialist — Excel Associate", issuer: "Microsoft", date: "2019", id: "—" },
    { image: certAws, title: "Data Analytics", issuer: "PW Skills", date: "Pursuing", id: "—" },
    { image: certAws, title: "Strategic Management", issuer: "Swayam — IIM Bangalore", date: "Pursuing", id: "—" },
    { image: certGoogle, title: "AI Chat Prompts for Business Analysis", issuer: "LinkedIn Learning", date: "Completed", id: "—" },
    { image: certGoogle, title: "What Is Generative AI?", issuer: "Online course", date: "Completed", id: "—" },
  ];
  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certs.map((cert, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }} whileHover={{ y: -6 }} className="glass rounded-xl overflow-hidden group cursor-pointer">
          <div className="relative">
            <img src={cert.image} alt={cert.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-sm mb-1 group-hover:text-gradient transition-all">{cert.title}</h3>
            <p className="text-xs text-secondary-foreground">{cert.issuer}</p>
            <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">ID: {cert.id}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ProjectsContent = () => {
  const projects = [
    {
      title: "Customer Segmentation & Marketing Analytics Dashboard (RFM)",
      desc: "Processed 100,000+ transactions using the RFM framework; built an Excel dashboard with slicers and dynamic visuals; identified top 3 segments contributing ~82% revenue and proposed retention/conversion strategies.",
      tags: ["Excel", "RFM", "Dashboard"],
      metric: "100K+ txns",
    },
    {
      title: "Attrition & Retention Analysis",
      desc: "Analyzed semi‑structured HR datasets (attrition, retention, exit interviews) using Excel/PivotTables and Python; applied CRISP‑DM to build an attrition dashboard and deliver retention strategies.",
      tags: ["Python", "Excel", "CRISP‑DM"],
      metric: "HR analytics",
    },
    {
      title: "Customer Satisfaction in E‑Banking — Demographic Impact",
      desc: "Collected 226 responses and analyzed using SPSS (Chi‑Square, T‑Test, ANOVA). Found gender significantly impacted satisfaction (p = 0.0085) and recommended GDPR‑compliant UX improvements and digital literacy initiatives.",
      tags: ["SPSS", "Statistics", "GDPR"],
      metric: "226 responses",
    },
    {
      title: "Challenges & Future Prospect of National Logistics Policy",
      desc: "Researched logistics sector challenges (infrastructure, costs, digital gaps) and evaluated NLP’s impact with policy analysis and forecasting; proposed ERP‑integrated, data‑driven recommendations.",
      tags: ["Policy analysis", "Forecasting", "ERP"],
      metric: "Research",
    },
    {
      title: "Treatment of Waste Water Through Electrocoagulation",
      desc: "Conducted electrocoagulation experiments and processed semi‑structured lab data using Excel & Python for visualization; authored report on industrial applications.",
      tags: ["Python", "Excel", "Research"],
      metric: "Lab study",
    },
    {
      title: "Pyrolysis of Plastic",
      desc: "Conducted experiments and processed lab data in Excel & Python for visualization; authored report on industrial applications.",
      tags: ["Excel", "Python", "Research"],
      metric: "Lab study",
    },
  ];
  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
      {projects.map((p, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }} whileHover={{ y: -6 }} className="glass rounded-xl p-6 group">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold group-hover:text-gradient transition-all">{p.title}</h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">{p.metric}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
          <div className="flex flex-wrap gap-2">
            {p.tags.map(t => <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-secondary-foreground">{t}</span>)}
          </div>
        </motion.div>
      ))}
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
    <div className="max-w-3xl mx-auto space-y-6">
      {items.map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="glass rounded-xl overflow-hidden">
          {item.image && <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
            <p className="text-secondary-foreground text-sm">{item.org}</p>
            <p className="text-xs font-mono text-primary mb-3">{item.period}</p>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
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
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat, ci) => (
        <motion.div key={ci} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.15 }} className="glass rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4 text-gradient">{cat.category}</h3>
          <div className="space-y-3">
            {cat.skills.map((s, si) => (
              <div key={si}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground font-mono text-xs">{s.level}%</span>
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
    <div className="max-w-3xl mx-auto space-y-6">
      {recs.map((rec, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="glass rounded-xl p-6 relative">
          <span className="text-6xl text-primary/15 font-serif absolute top-2 left-4">"</span>
          <p className="text-muted-foreground italic pl-6 pt-4 mb-4 leading-relaxed">{rec.text}</p>
          <div className="flex items-center gap-3 pl-6">
            <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-sm font-bold text-primary-foreground">
              {rec.author.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <p className="font-semibold text-sm">{rec.author}</p>
              <p className="text-xs text-muted-foreground">{rec.role}</p>
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
    <div className="max-w-3xl mx-auto space-y-6">
      {awards.map((award, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="glass rounded-xl overflow-hidden group">
          {award.image && (
            <div className="relative h-48 overflow-hidden">
              <img src={award.image} alt={award.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono text-primary">{award.year}</span>
            </div>
            <h3 className="text-xl font-bold mb-1 group-hover:text-gradient transition-all">{award.title}</h3>
            <p className="text-sm text-secondary-foreground mb-2">{award.org}</p>
            <p className="text-sm text-muted-foreground">{award.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SectionPage;
