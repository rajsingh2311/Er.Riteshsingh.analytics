import { motion } from "framer-motion";
import { ExternalLink, GitBranch, TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";

const projects = [
  {
    title: "Revenue Forecasting Engine",
    desc: "Built a predictive model that increased forecast accuracy by 35% using time-series analysis and ensemble methods.",
    tags: ["Python", "Prophet", "Pandas"],
    icon: TrendingUp,
    metric: "+35% accuracy",
  },
  {
    title: "Customer Segmentation Dashboard",
    desc: "Interactive Tableau dashboard processing 2M+ customer records with K-means clustering for targeted marketing.",
    tags: ["Tableau", "SQL", "K-Means"],
    icon: PieChart,
    metric: "2M+ records",
  },
  {
    title: "Supply Chain Optimization",
    desc: "Reduced inventory costs by 22% through demand pattern analysis and automated reorder point calculations.",
    tags: ["Power BI", "R", "DAX"],
    icon: BarChart3,
    metric: "-22% costs",
  },
  {
    title: "Real-time Anomaly Detection",
    desc: "Streaming pipeline detecting fraud patterns with 99.2% precision across financial transaction data.",
    tags: ["Python", "Kafka", "TensorFlow"],
    icon: Activity,
    metric: "99.2% precision",
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
