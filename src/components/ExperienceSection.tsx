import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const timeline = [
  {
    type: "work",
    icon: Briefcase,
    title: "Senior Data Analyst",
    company: "TechCorp Inc.",
    period: "2022 — Present",
    desc: "Leading data analytics initiatives, building ML models for revenue forecasting, and managing a team of 3 junior analysts.",
  },
  {
    type: "work",
    icon: Briefcase,
    title: "Data Analyst",
    company: "DataDriven Co.",
    period: "2019 — 2022",
    desc: "Developed interactive dashboards, automated reporting pipelines, and conducted A/B testing for product teams.",
  },
  {
    type: "education",
    icon: GraduationCap,
    title: "M.S. Data Science",
    company: "Stanford University",
    period: "2017 — 2019",
    desc: "Focused on statistical learning, NLP, and big data systems. Thesis on anomaly detection in financial datasets.",
  },
  {
    type: "cert",
    icon: Award,
    title: "Google Data Analytics Professional",
    company: "Google",
    period: "2021",
    desc: "Certified in data cleaning, analysis, visualization, and R programming.",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Experience & <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative flex items-start gap-6 mb-10 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary glow-primary -translate-x-1.5 mt-6 z-10" />

              {/* Card */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass rounded-xl p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-mono text-primary">{item.period}</span>
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-secondary-foreground mb-2">{item.company}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
