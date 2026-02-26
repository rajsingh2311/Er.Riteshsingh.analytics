import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const timeline = [
  {
    icon: Briefcase,
    title: "Data Analyst",
    company: "Seth Anandram Jaipuria Group of Educational Institutions · Ghaziabad · Full-time",
    period: "Dec 2025 — Present",
    desc: "Working with SQL, predictive analytics, and reporting to support data‑driven decisions across educational operations.",
  },
  {
    icon: Briefcase,
    title: "Data Analyst Intern",
    company: "WTF Gyms · Noida, Uttar Pradesh · Internship",
    period: "May 2025 — Jul 2025",
    desc: "Automated lead capture & routing from Meta Ads → Google Sheets → WhatsApp (WATI), reducing first‑response time from 30 mins to under 10 mins. Built a single‑click acknowledgment & offer‑letter generation system using Google Docs + Make.com. Developed a real‑time interview tracking system integrated with WATI and ERP workflows. Created Power BI dashboards for lead funnel tracking, agent productivity, and gym‑wise performance. Implemented conditional routing logic and a daily manager reporting system saving 12+ hours/week of manual reporting.",
  },
  {
    icon: Briefcase,
    title: "Student Co‑ordinator — Business Analytics Club",
    company: "Jaipuria School of Business, Ghaziabad · Full-time",
    period: "Sep 2024 — Present",
    desc: "Co‑ordinating club initiatives focused on data analysis and Microsoft Power BI, organizing events and supporting peers in analytics projects.",
  },
  {
    icon: Briefcase,
    title: "Team Leader",
    company: "Stagnet Research · Noida, Uttar Pradesh · Full-time",
    period: "Jul 2023 — Jul 2024",
    desc: "Led a team of ~20 researchers on market and qualitative research projects. Developed Excel‑based trackers and data cleaning processes, analyzed survey data, and created client‑ready reports and visualizations, reducing project turnaround time by about 25%.",
  },
  {
    icon: Briefcase,
    title: "Chemical Engineer",
    company: "Reliance Industries Limited · Jamnagar, Gujarat · Full-time",
    period: "Jan 2023 — Jul 2023",
    desc: "Collected and analyzed process performance data using Excel and statistical methods, built Pareto and trend charts to identify bottlenecks, and supported process improvement initiatives to enhance operational efficiency.",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 pt-28 md:pt-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Professional <span className="text-gradient">Experience</span>
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
