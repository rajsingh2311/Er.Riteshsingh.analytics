import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Briefcase, GraduationCap, Award, FolderOpen, Heart, Zap, MessageSquare, Trophy, ExternalLink, MapPin, Calendar } from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ParticleField from "@/components/ParticleField";

import certGoogle from "@/assets/cert-google.jpg";
import certAws from "@/assets/cert-aws.jpg";
import certPowerbi from "@/assets/cert-powerbi.jpg";
import awardInnovation from "@/assets/award-innovation.jpg";
import volunteering from "@/assets/volunteering.jpg";
import featuredDashboard from "@/assets/featured-dashboard.jpg";

const sectionMeta: Record<string, { label: string; icon: any }> = {
  featured: { label: "Featured", icon: Star },
  experience: { label: "Experience", icon: Briefcase },
  education: { label: "Education", icon: GraduationCap },
  certifications: { label: "Licenses & Certifications", icon: Award },
  projects: { label: "Projects", icon: FolderOpen },
  volunteering: { label: "Volunteering", icon: Heart },
  skills: { label: "Skills", icon: Zap },
  recommendations: { label: "Recommendations", icon: MessageSquare },
  honors: { label: "Honors & Awards", icon: Trophy },
};

const SectionPage = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const meta = sectionMeta[sectionId || ""] || { label: "Section", icon: Star };
  const Icon = meta.icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleField />
      
      {/* Top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </motion.button>
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-primary" />
            <span className="font-bold text-gradient">{meta.label}</span>
          </div>
          <ThemeSwitcher />
        </div>
      </nav>

      <div className="pt-24 pb-16 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-brand flex items-center justify-center mb-4 glow-primary">
            <Icon className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">
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

const FeaturedContent = () => (
  <div className="max-w-4xl mx-auto space-y-8">
    {[
      { image: featuredDashboard, title: "Revenue Analytics Dashboard", desc: "An interactive dashboard processing 2M+ data points to visualize revenue trends, customer lifetime value, and predictive forecasts. Built with Tableau and custom Python backend.", tags: ["Tableau", "Python", "AWS"] },
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
    { title: "Senior Data Analyst", company: "TechCorp Inc.", location: "San Francisco, CA", period: "Jan 2022 — Present", desc: "Leading data analytics initiatives, building ML models for revenue forecasting, and managing a team of 3 junior analysts. Increased forecast accuracy by 35%.", skills: ["Python", "SQL", "Tableau", "TensorFlow"] },
    { title: "Data Analyst", company: "DataDriven Co.", location: "New York, NY", period: "Jun 2019 — Dec 2021", desc: "Developed interactive dashboards, automated reporting pipelines, and conducted A/B testing for product teams. Reduced report generation time by 60%.", skills: ["Power BI", "R", "PostgreSQL", "Airflow"] },
    { title: "Junior Data Analyst", company: "AnalyticsFirst", location: "Boston, MA", period: "Aug 2017 — May 2019", desc: "Built ETL pipelines, created weekly KPI reports, and assisted in customer segmentation analysis.", skills: ["Excel", "SQL", "Python", "SPSS"] },
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
  const edu = [
    { degree: "M.S. Data Science", school: "Stanford University", period: "2017 — 2019", desc: "Focused on statistical learning, NLP, and big data systems. Thesis on anomaly detection in financial datasets. GPA: 3.9/4.0", activities: ["Research Assistant", "Data Science Club President", "Teaching Assistant for Statistics 101"] },
    { degree: "B.S. Statistics", school: "UC Berkeley", period: "2013 — 2017", desc: "Strong foundation in probability, mathematical statistics, and applied data analysis. Minor in Computer Science.", activities: ["Dean's List", "Undergraduate Research", "Statistics Tutoring Center"] },
  ];
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {edu.map((e, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="glass rounded-xl p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{e.degree}</h3>
              <p className="text-secondary-foreground">{e.school}</p>
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
  );
};

const CertificationsContent = () => {
  const certs = [
    { image: certGoogle, title: "Google Data Analytics Professional Certificate", issuer: "Google", date: "Issued Mar 2021", id: "CERT-GA-2021-0847" },
    { image: certAws, title: "AWS Certified Data Analytics – Specialty", issuer: "Amazon Web Services", date: "Issued Nov 2022", id: "AWS-DAT-2022-1293" },
    { image: certPowerbi, title: "Microsoft Power BI Data Analyst Associate", issuer: "Microsoft", date: "Issued Jun 2023", id: "MS-PBI-2023-5621" },
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
    { title: "Revenue Forecasting Engine", desc: "Built a predictive model that increased forecast accuracy by 35% using time-series analysis and ensemble methods.", tags: ["Python", "Prophet", "Pandas"], metric: "+35% accuracy" },
    { title: "Customer Segmentation Dashboard", desc: "Interactive Tableau dashboard processing 2M+ customer records with K-means clustering for targeted marketing.", tags: ["Tableau", "SQL", "K-Means"], metric: "2M+ records" },
    { title: "Supply Chain Optimization", desc: "Reduced inventory costs by 22% through demand pattern analysis and automated reorder point calculations.", tags: ["Power BI", "R", "DAX"], metric: "-22% costs" },
    { title: "Real-time Anomaly Detection", desc: "Streaming pipeline detecting fraud patterns with 99.2% precision across financial transaction data.", tags: ["Python", "Kafka", "TensorFlow"], metric: "99.2% precision" },
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
    { image: volunteering, title: "Data Literacy Workshop Instructor", org: "Code for Good Foundation", period: "2021 — Present", desc: "Teaching data analysis fundamentals to underserved communities. Organized 12+ workshops reaching 300+ participants." },
    { title: "Open Source Data Tools Contributor", org: "DataForAll Initiative", period: "2020 — Present", desc: "Contributing to open-source data visualization libraries and creating free educational resources for aspiring data analysts." },
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
    { category: "Programming", skills: [{ name: "Python", level: 95 }, { name: "R", level: 88 }, { name: "SQL", level: 92 }, { name: "JavaScript", level: 75 }] },
    { category: "Visualization", skills: [{ name: "Tableau", level: 90 }, { name: "Power BI", level: 88 }, { name: "D3.js", level: 72 }, { name: "Matplotlib", level: 85 }] },
    { category: "Machine Learning", skills: [{ name: "Scikit-learn", level: 85 }, { name: "TensorFlow", level: 78 }, { name: "NLP", level: 74 }, { name: "Deep Learning", level: 70 }] },
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
    { text: "Alex's analytical thinking transformed our entire data strategy. Their ability to turn complex datasets into clear, actionable insights is unmatched. A true data wizard.", author: "Sarah Chen", role: "VP of Analytics, TechCorp Inc." },
    { text: "Working with Alex on the customer segmentation project was a game-changer. The dashboard they built became the single source of truth for our marketing team.", author: "Michael Torres", role: "Head of Marketing, DataDriven Co." },
    { text: "Alex has an exceptional talent for making data accessible. Their presentations to leadership always hit the mark, combining technical depth with business relevance.", author: "Dr. Emily Nakamura", role: "Professor, Stanford University" },
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
    { image: awardInnovation, title: "Best Data Innovation Award", org: "DataCon International", year: "2024", desc: "Recognized for the Revenue Forecasting Engine that achieved 35% improvement in prediction accuracy." },
    { title: "Top 10 Data Analysts Under 35", org: "Analytics Magazine", year: "2023", desc: "Featured in the annual list of rising data analytics professionals making industry impact." },
    { title: "Dean's Award for Research Excellence", org: "Stanford University", year: "2019", desc: "Awarded for outstanding M.S. thesis on anomaly detection in financial datasets." },
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
