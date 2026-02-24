import { motion } from "framer-motion";
import { TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";
import LinkPreview from "./ui/link-preview";

const projects = [
  {
    title: "Customer Segmentation & Marketing Analytics (RFM)",
    desc: "Processed 100,000+ customer transactions using the RFM model and built an Excel dashboard with slicers and dynamic visuals. Identified top 3 segments contributing ~82% revenue (Pareto 80/20).",
    tags: ["Excel", "RFM", "Segmentation"],
    icon: TrendingUp,
    metric: "100K+ txns",
  },
  {
    title: "Attrition & Retention Analysis Dashboard",
    desc: "Analyzed HR attrition/retention data using Excel (PivotTables) and Python; applied CRISP-DM and delivered role/location-based retention strategies to HR leadership.",
    tags: ["Python", "Excel", "CRISP-DM"],
    icon: PieChart,
    metric: "HR insights",
  },
  {
    title: "E‑Banking Customer Satisfaction (SPSS)",
    desc: "Collected 226 responses and analyzed demographic impact using SPSS (Chi‑Square, T‑Test, ANOVA). Found gender significantly impacted satisfaction (p = 0.0085) and recommended GDPR‑compliant UX improvements.",
    tags: ["SPSS", "Statistics", "GDPR"],
    icon: BarChart3,
    metric: "226 responses",
  },
  {
    title: "National Logistics Policy (Research)",
    desc: "Researched India’s logistics sector challenges and evaluated NLP’s impact. Proposed ERP‑integrated, data‑driven recommendations to improve efficiency and supply chain competitiveness.",
    tags: ["Policy analysis", "ERP", "Forecasting"],
    icon: Activity,
    metric: "Research",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass rounded-xl p-6 group cursor-default relative overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-brand" style={{ opacity: 0, mixBlendMode: "overlay" }} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center">
                    <project.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {project.metric}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-1 rounded bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex justify-end">
                  {/* Demo preview: replace imgSrc with real screenshot path per project */}
                  <LinkPreview
                    href={"https://example.com"}
                    imgSrc={"https://via.placeholder.com/600.png?text=Preview"}
                    label={"View"}
                    sizeClass={"w-48"}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
