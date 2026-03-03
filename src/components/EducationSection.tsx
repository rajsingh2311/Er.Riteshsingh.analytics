import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const education = [
  {
    degree: "PGDM (Business Analytics & Operation) — Pursuing",
    school: "Jaipuria School of Business · CGPA: 7.03",
    period: "2024 — 2026",
    desc: "Focus on Business Analytics, CRISP‑DM methodology, high-dimensional data visualization, and predictive analytics.",
  },
  {
    degree: "B.Tech (Chemical Engineering)",
    school: "SCRIET, CCSU Meerut · CGPA: 6.74",
    period: "2019 — 2023",
    desc: "Exposure to SAP ERP systems, data processing for structured & semi‑structured data, and applied research projects.",
  },
  {
    degree: "12th (Physics, Chemistry, Math)",
    school: "S Devi Inter College, Madhuban, Mau (UP Board)",
    period: "2019 · 61%",
    desc: "PCM curriculum with strong quantitative foundation.",
  },
  {
    degree: "10th (Science)",
    school: "S Devi Inter College, Madhuban, Mau (UP Board)",
    period: "2019 · 81.33%",
    desc: "Science curriculum with focus on core subjects.",
  },
];

const EducationSection = () => {
  const navigate = useNavigate();
  
  const handleEducationClick = (degree: string) => {
    if (degree.includes("PGDM")) {
      navigate("/pgdm");
    } else if (degree.includes("B.Tech")) {
      navigate("/btech");
    } else if (degree.includes("12th")) {
      navigate("/twelfth");
    } else if (degree.includes("10th")) {
      navigate("/tenth");
    }
  };

  return (
    <section id="education" className="pt-12 pb-10 md:pt-14 md:pb-12 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Academics</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Education <span className="text-gradient">& Academics</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={typeof handleEducationClick === 'function' ? { y: -4 } : {}}
              className={`glass rounded-xl p-6 flex gap-4${typeof handleEducationClick === 'function' ? ' cursor-pointer border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:border-white hover:bg-primary/10 hover:scale-[1.15] hover:z-50' : ''} transition-all duration-300`}
              onClick={() => handleEducationClick(item.degree)}
              role="button"
              tabIndex={0}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                  <h3 className="font-bold text-lg">{item.degree}</h3>
                  <span className="text-xs font-mono text-primary">{item.period}</span>
                </div>
                <p className="text-sm text-secondary-foreground mb-1">{item.school}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

