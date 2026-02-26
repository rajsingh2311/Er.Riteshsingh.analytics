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
    <section id="certifications" className="py-24 pt-28 md:pt-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Credentials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Licenses <span className="text-gradient">& Certifications</span>
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
              className="glass rounded-xl overflow-hidden"
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