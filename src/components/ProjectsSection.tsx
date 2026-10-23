import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity, 
  Terminal, 
  Sparkles, 
  Play, 
  FileUp, 
  Layers, 
  FolderGit2, 
  ChevronRight,
  Sliders,
  ExternalLink
} from "lucide-react";
import { PythonProjectSimulator } from "./projects/PythonProjectSimulator";
import { PowerBIProjectViewer } from "./projects/PowerBIProjectViewer";

type SectionTab = "overview" | "python" | "powerbi";

interface ProjectItem {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  icon: typeof TrendingUp;
  metric: string;
  category: "python" | "powerbi" | "stats" | "research";
  interactiveType?: "python" | "powerbi";
}

const projects: ProjectItem[] = [
  {
    id: "rfm",
    title: "Customer Segmentation & Marketing Analytics (RFM)",
    desc: "Processed 100,000+ customer transactions using the RFM model and built dynamic visual scorecards. Identified top 3 customer tiers generating ~82% revenue (Pareto 80/20) and created tailored retention workflows.",
    tags: ["Python", "Excel", "RFM Segmentation", "Customer Lifetime Value"],
    icon: TrendingUp,
    metric: "100K+ txns",
    category: "python",
    interactiveType: "python"
  },
  {
    id: "attrition",
    title: "HR Attrition & Flight Risk Predictive Engine",
    desc: "Built a machine learning attrition risk classifier applying CRISP-DM methodology. Analyzed employee commute distances, overtime loads, and job satisfaction to predict 90-day flight risk probabilities and generate prescriptive action plans.",
    tags: ["Python", "Scikit-Learn", "CRISP-DM", "HR Analytics", "Classification"],
    icon: PieChart,
    metric: "ML Predictor",
    category: "python",
    interactiveType: "python"
  },
  {
    id: "sajs-powerbi",
    title: "Corporate MIS & Academic Intelligence (Power BI)",
    desc: "Designed unified Power BI reporting architecture connecting 30+ school campuses with corporate leadership. Built multi-level DAX measures for academic audits, student attendance, and reduced report turnaround by 60%.",
    tags: ["Power BI", "DAX", "Star Schema", "MIS Telemetry", "Executive Dashboards"],
    icon: BarChart3,
    metric: "30+ Schools",
    category: "powerbi",
    interactiveType: "powerbi"
  },
  {
    id: "wtf-funnel",
    title: "Marketing Lead Funnel & Conversion Analytics",
    desc: "Engineered automated lead tracking pipeline from Meta Ads to WhatsApp WATI and CRM. Created real-time Power BI conversion funnel dashboards, cutting response latency from 30m to under 10m and saving 12+ hrs/week.",
    tags: ["Power BI", "Make.com", "WATI", "Funnel Analytics", "Automation"],
    icon: Activity,
    metric: "14K+ Leads",
    category: "powerbi",
    interactiveType: "powerbi"
  },
  {
    id: "ebanking",
    title: "E‑Banking Customer Satisfaction (SPSS & Statistics)",
    desc: "Analyzed 226 banking consumer responses using SPSS (Chi‑Square, T‑Test, ANOVA). Discovered that digital ease and security perception significantly drive customer retention (p = 0.0085); drafted GDPR UX guidelines.",
    tags: ["SPSS", "Chi-Square", "ANOVA", "GDPR", "Hypothesis Testing"],
    icon: BarChart3,
    metric: "226 responses",
    category: "stats",
    interactiveType: "python"
  },
  {
    id: "logistics",
    title: "National Logistics Policy & ERP Supply Chain Modeling",
    desc: "Researched infrastructure bottlenecks and evaluated NLP impact across multi-modal freight networks. Proposed ERP-integrated telemetry and predictive stock replenishment models to optimize delivery turnarounds.",
    tags: ["Policy Modeling", "SAP ERP", "Forecasting", "Supply Chain"],
    icon: Activity,
    metric: "Research Study",
    category: "research"
  },
];

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState<SectionTab>("overview");

  return (
    <section id="projects" className="pt-12 pb-12 md:pt-16 md:pb-16 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] sm:text-xs font-mono text-primary mb-2.5 border border-primary/30">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Interactive Data Studio</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight break-words">
            Projects <span className="text-gradient">& Analytical Engines</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-2xl mx-auto px-1 leading-relaxed">
            From predictive Python algorithms and SPSS hypothesis testing to executive Power BI dashboards with real-time file upload inspection.
          </p>
        </motion.div>

        {/* Navigation Mode Pill Switcher */}
        <div className="flex justify-center mb-8 max-w-full">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl glass border border-primary/30 shadow-md bg-card/60 backdrop-blur-md max-w-full overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                activeTab === "overview"
                  ? "bg-primary text-primary-foreground font-semibold shadow-[0_0_15px_rgba(var(--glow)/0.3)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>All Projects</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTab === "overview" ? "bg-black/20 text-white" : "bg-muted text-muted-foreground"
              }`}>
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("python")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                activeTab === "python"
                  ? "bg-primary text-primary-foreground font-semibold shadow-[0_0_15px_rgba(var(--glow)/0.3)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span>Python Studio</span>
              <span className="text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold uppercase">
                Interactive
              </span>
            </button>

            <button
              onClick={() => setActiveTab("powerbi")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                activeTab === "powerbi"
                  ? "bg-primary text-primary-foreground font-semibold shadow-[0_0_15px_rgba(var(--glow)/0.3)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span>Power BI Hub</span>
              <span className="text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold uppercase">
                Viewer
              </span>
            </button>
          </div>
        </div>

        {/* Content Container */}
        <AnimatePresence mode="wait">
          {/* ======================================= */}
          {/* VIEW 1: ALL PROJECTS OVERVIEW CARDS    */}
          {/* ======================================= */}
          {activeTab === "overview" && (
            <motion.div
              key="overview-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="max-w-6xl mx-auto space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {projects.map((project, i) => {
                  const Icon = project.icon;

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="glass rounded-2xl p-4 sm:p-6 flex flex-col justify-between border border-border/80 hover:border-primary/50 shadow-sm hover:shadow-[0_0_30px_rgba(var(--glow)/0.25)] hover:-translate-y-1 transition-all duration-300 group min-w-0"
                    >
                      <div>
                        {/* Card Top Row */}
                        <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <span className="text-[11px] sm:text-xs font-mono px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary/15 text-primary border border-primary/25 font-medium shrink-0">
                            {project.metric}
                          </span>
                        </div>

                        {/* Title & Desc */}
                        <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2 break-words">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 break-words">
                          {project.desc}
                        </p>
                      </div>

                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                          {project.interactiveType === "python" && (
                            <button
                              onClick={() => setActiveTab("python")}
                              className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group-hover:translate-x-1 duration-200"
                            >
                              <Play className="w-3.5 h-3.5 fill-emerald-400" />
                              <span>Test Model Live</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {project.interactiveType === "powerbi" && (
                            <button
                              onClick={() => setActiveTab("powerbi")}
                              className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 transition-colors group-hover:translate-x-1 duration-200"
                            >
                              <BarChart3 className="w-3.5 h-3.5" />
                              <span>Open in Power BI Hub</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {!project.interactiveType && (
                            <span className="text-xs font-mono text-muted-foreground">
                              Comprehensive Case Study
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ======================================= */}
          {/* VIEW 2: INTERACTIVE PYTHON SIMULATOR   */}
          {/* ======================================= */}
          {activeTab === "python" && (
            <motion.div
              key="python-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="max-w-6xl mx-auto"
            >
              <PythonProjectSimulator />
            </motion.div>
          )}

          {/* ======================================= */}
          {/* VIEW 3: POWER BI HUB & FILE UPLOADER   */}
          {/* ======================================= */}
          {activeTab === "powerbi" && (
            <motion.div
              key="powerbi-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="max-w-6xl mx-auto"
            >
              <PowerBIProjectViewer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
