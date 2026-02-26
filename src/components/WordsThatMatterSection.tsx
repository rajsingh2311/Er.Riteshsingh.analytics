import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const wordsThatMatter = [
  {
    quote:
      "Ritesh turns complex data into clear business actions and always keeps outcomes in focus.",
    from: "Senior Manager",
    context: "Analytics Review",
  },
  {
    quote:
      "Reliable, process-driven, and proactive. His dashboards helped our team make faster decisions.",
    from: "Team Lead",
    context: "Performance Reporting",
  },
  {
    quote:
      "Strong ownership mindset and excellent collaboration across business and technical stakeholders.",
    from: "Program Mentor",
    context: "Capstone Project",
  },
];

const WordsThatMatterSection = () => {
  return (
    <section id="words" className="py-24 pt-20 md:pt-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Words That <span className="text-gradient">Matter</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {wordsThatMatter.map((item, index) => (
            <motion.article
              key={`${item.from}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-xl p-6"
            >
              <Quote className="w-5 h-5 text-primary mb-4" />
              <p className="text-sm text-foreground leading-relaxed mb-6">“{item.quote}”</p>
              <div className="pt-4 border-t border-border">
                <p className="font-semibold text-sm">{item.from}</p>
                <p className="text-xs text-muted-foreground font-mono">{item.context}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WordsThatMatterSection;
