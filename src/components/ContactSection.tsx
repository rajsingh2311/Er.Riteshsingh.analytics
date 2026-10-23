import { motion } from "framer-motion";
import { Mail, Send, Linkedin, Github } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="pt-12 pb-16 md:pt-14 md:pb-24 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-primary font-mono text-xs sm:text-sm tracking-wider uppercase">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3">
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5 sm:p-8 border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10 transition-all duration-300"
          >
            <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              {[
                { icon: Mail, label: "Email", href: "mailto:riteshsingh.analytics@gmail.com?subject=Hello%20from%20your%20Portfolio" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/riteshsingh-analytics" },
                { icon: Github, label: "GitHub", href: "https://github.com/rajsingh2311" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-gradient-brand hover:text-primary-foreground transition-colors shrink-0"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>

            <div className="text-center text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 space-y-1">
              <p>📞 +91 8318174679</p>
              <p>📍 Sector 62, Noida, UP, India</p>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-5 sm:mb-6 text-xs sm:text-sm leading-relaxed">
                Have a question or want to work together? Fill out the form below!
              </p>
              <motion.a
                href="https://forms.gle/syRejRzWydawhLbs9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-lg bg-gradient-brand text-primary-foreground font-semibold text-xs sm:text-sm md:text-base glow-primary transition-all"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>Send Message</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 mt-20">
        <div className="text-center text-sm text-muted-foreground border-t border-border pt-8">
          <p>© 2026 Er Ritesh Singh — Data & analytics portfolio</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
