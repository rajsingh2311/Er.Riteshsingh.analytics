import { motion } from "framer-motion";
import { BarChart3, PieChart, LineChart, Table2, Code2, Layers } from "lucide-react";

const skills = [
  { icon: LineChart, name: "Power BI (DAX)", level: 90, desc: "Dashboards & BI reporting" },
  { icon: PieChart, name: "MS Excel (Advanced)", level: 92, desc: "PivotTables, slicers, automation" },
  { icon: Table2, name: "SQL", level: 85, desc: "Queries, joins, data prep" },
  { icon: Code2, name: "Python", level: 80, desc: "Analysis, automation, visualization" },
  { icon: Layers, name: "SPSS", level: 78, desc: "Chi-Square, T-Test, ANOVA" },
  { icon: BarChart3, name: "SAP / ERP", level: 70, desc: "Ops reporting & workflow exposure" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="pt-12 pb-10 md:pt-14 md:pb-12 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-primary font-mono text-xs sm:text-sm tracking-wider uppercase">Expertise</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3">
            Technical <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-4 sm:p-6 group cursor-default border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10 transition-all duration-300 min-w-0"
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0">
                  <skill.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm sm:text-base break-words leading-tight">{skill.name}</h3>
                  <p className="text-xs text-muted-foreground break-words mt-0.5">{skill.desc}</p>
                </div>
              </div>
              
              <div className="relative h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1 + 0.3, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-brand"
                />
              </div>
              <span className="text-xs text-muted-foreground font-mono mt-2 block text-right">{skill.level}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
