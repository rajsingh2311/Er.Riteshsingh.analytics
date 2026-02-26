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
    <section id="skills" className="py-24 pt-28 md:pt-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Technical <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-xl p-6 group cursor-default"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center">
                  <skill.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{skill.name}</h3>
                  <p className="text-xs text-muted-foreground">{skill.desc}</p>
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
