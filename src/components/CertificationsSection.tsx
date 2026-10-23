import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const certifications = [
  {
    title: "Strategic Management",
    issuer: "Indian Institute of Management Bangalore",
    date: "Jan 2026",
    link: "",
    image: `${import.meta.env.BASE_URL}images/certification/Strategic%20Management.png`,
  },
  {
    title: "Lean Six Sigma Green Belt Certification",
    issuer: "Grant Thornton Bharat LLP",
    date: "Nov 2025",
    credentialId: "8cc214ce5219",
    link: "https://leansixsigma.gtbharat.in/verify/8cc214ce5219?s=true",
    image: `${import.meta.env.BASE_URL}images/certification/Six%20Sigma.png`,
  },
  {
    title: "AI Chat Prompts for Business Analysis",
    issuer: "LinkedIn Learning",
    date: "Oct 2025",
    link: "https://www.linkedin.com/learning/certificates/051d700d947fe8919ecc5113dbecd87181a45c457649bb434000d8d10b7aac40?u=295910228",
    image: `${import.meta.env.BASE_URL}images/certification/AI%20Chat%20Prompt%20For%20Business%20Analysis.png`,
  },
  {
    title: "What Is Generative AI?",
    issuer: "LinkedIn Learning",
    date: "Sep 2025",
    credentialId: "28d95f99605f52e45b24279b802dbcaca2b14cee367f841c242de288f00ef29a",
    link: "https://www.linkedin.com/learning/certificates/28d95f99605f52e45b24279b802dbcaca2b14cee367f841c242de288f00ef29a?u=295910228",
    image: `${import.meta.env.BASE_URL}images/certification/What%20Is%20Generative%20AI.png`,
  },
  {
    title: "The Development and Implementation of International Business",
    issuer: "Management Development Institute of Singapore",
    date: "Mar 2025",
    link: "",
    image: `${import.meta.env.BASE_URL}images/certification/MDIS%20Singapur.png`,
  },
  {
    title: "Microsoft Office Specialist: Microsoft Excel Expert",
    issuer: "Microsoft",
    date: "Mar 2025",
    credentialId: "UcLk-sFpA",
    link: "",
    image: `${import.meta.env.BASE_URL}images/certification/Excel%202019%20Associate.png`,
  },
  {
    title: "Google AI Essentials",
    issuer: "Google",
    date: "Jan 2025",
    credentialId: "B0SW463I0XDY",
    link: "https://www.linkedin.com/in/riteshsingh-analytics/details/certifications/1750708039171/single-media-viewer/?profileId=ACoAAEamlyABDk_G7aLuwqmnQBmZM-vzr1jBoHc",
    image: `${import.meta.env.BASE_URL}images/certification/Google%20AI%20Assential.png`,
  },
];

const CertificationsSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

      <div className="container mx-auto px-3 sm:px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-primary font-mono text-xs sm:text-sm tracking-wider uppercase">Credentials</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3">
            <span className="text-gradient">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <HoverCard openDelay={200} closeDelay={100} key={cert.title}>
              <HoverCardTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  whileHover={cert.link || cert.image ? { y: -4 } : {}}
                  className={`glass rounded-xl overflow-hidden animate-float-card block min-w-0${cert.link || cert.image ? ' cursor-pointer border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10' : ''} transition-all duration-300`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                  onClick={() => {
                    if (cert.link) {
                      window.open(cert.link, "_blank");
                    } else if (cert.image) {
                      setSelectedImage(cert.image);
                    }
                  }}
                >
                  <div className="w-full h-44 sm:h-48 overflow-hidden bg-muted/40">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                      </div>
                      {cert.link && <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />}
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base leading-snug mb-1 break-words">{cert.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground break-words">{cert.issuer}</p>
                    <p className="text-[11px] sm:text-xs text-primary mt-1 font-mono">Issued {cert.date}</p>
                  </div>
                </motion.div>
              </HoverCardTrigger>
              <HoverCardContent 
                side="right" 
                align="center" 
                sideOffset={10}
                className="hidden md:block w-[380px] max-w-[calc(100vw-32px)] p-2 bg-background/95 backdrop-blur-md border border-primary/20"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-auto object-contain rounded-lg"
                />
                <p className="text-center text-sm font-medium mt-2 text-foreground">{cert.title}</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Certificate"
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsSection;