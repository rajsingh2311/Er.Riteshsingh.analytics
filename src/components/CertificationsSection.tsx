import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

import certGoogle from "@/assets/cert-google.jpg";
import certAws from "@/assets/cert-aws.jpg";
import certPowerbi from "@/assets/cert-powerbi.jpg";

const certifications = [
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    image: certGoogle,
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    image: certAws,
  },
  {
    title: "Microsoft Power BI Certification",
    issuer: "Microsoft",
    image: certPowerbi,
  },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="pt-12 pb-10 md:pt-14 md:pb-12 relative overflow-hidden">
      {/* Floating atoms background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-primary/60 animate-float-slow" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-primary/40 animate-float-slower" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-accent/50 animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/6 w-1.5 h-1.5 rounded-full bg-primary/70 animate-float-slower" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-2.5 h-2.5 rounded-full bg-accent/40 animate-float-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/5 w-1.5 h-1.5 rounded-full bg-primary/50 animate-float-slower" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Credentials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            <span className="text-gradient">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.article
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className="glass rounded-xl overflow-hidden animate-float-card"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
                <h3 className="font-semibold leading-snug mb-1">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;