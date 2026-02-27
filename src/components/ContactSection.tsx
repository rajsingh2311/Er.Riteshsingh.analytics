import { motion } from "framer-motion";
import { Mail, Send, Linkedin, Github } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="pt-12 pb-20 md:pt-14 md:pb-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex justify-center gap-4 mb-8">
              {[
                { icon: Mail, label: "Email", href: "mailto:riteshsingh.analytics@gmail.com?subject=Hello%20from%20your%20Portfolio" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/riteshsingh-analytics" },
                { icon: Github, label: "GitHub", href: "https://github.com/rajsingh2311" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-gradient-brand hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <div className="text-center text-sm text-muted-foreground mb-8 space-y-1">
              <p>📞 +91 8318174679</p>
              <p>📍 Sector 62, Noida, UP, India</p>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                Have a question or want to work together? Fill out the form below!
              </p>
              <motion.a
                href="https://forms.gle/syRejRzWydawhLbs9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-brand text-primary-foreground font-semibold glow-primary"
              >
                <Send className="w-4 h-4" />
                Send Message
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
