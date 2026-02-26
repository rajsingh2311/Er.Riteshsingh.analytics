import { motion } from "framer-motion";
import { Handshake, Sparkles } from "lucide-react";

const mentors = [
  {
    name: "Mentor Name",
    role: "Business Analytics Mentor",
    guidance: "Helped me sharpen problem framing and connect analytics outputs to business impact.",
  },
  {
    name: "Mentor Name",
    role: "Industry Mentor",
    guidance: "Guided me on real-world KPI selection, stakeholder communication, and delivery quality.",
  },
  {
    name: "Mentor Name",
    role: "Technical Mentor",
    guidance: "Supported my growth in dashboard storytelling, automation workflows, and data thinking.",
  },
];

const MentorsSection = () => {
  return (
    <section id="mentors" className="py-24 pt-20 md:pt-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Gratitude</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            My <span className="text-gradient">Mentors</span>
          </h2>
        </motion.div>

        <div className="space-y-5 max-w-5xl mx-auto">
          {mentors.map((mentor, index) => (
            <motion.article
              key={`${mentor.name}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-5 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-gradient-brand flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{mentor.name}</h3>
                    <p className="text-sm text-secondary-foreground">{mentor.role}</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary w-fit">
                  <Sparkles className="w-3.5 h-3.5" />
                  Mentorship Impact
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mt-4">{mentor.guidance}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorsSection;
