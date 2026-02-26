import { motion } from "framer-motion";
import { Mail, Send, Linkedin, Github } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [focused, setFocused] = useState("");

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
                { icon: Mail, label: "Email", href: "mailto:riteshsingh.jsb2426@jaipuria.edu.in" },
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

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {[
                { name: "name", label: "Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <input
                    type={field.type}
                    placeholder={field.label}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused("")}
                    className={`w-full px-4 py-3 rounded-lg bg-secondary border-2 transition-all duration-300 text-foreground placeholder:text-muted-foreground outline-none ${
                      focused === field.name ? "border-primary glow-primary" : "border-transparent"
                    }`}
                  />
                </div>
              ))}
              <textarea
                placeholder="Your message..."
                rows={4}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused("")}
                className={`w-full px-4 py-3 rounded-lg bg-secondary border-2 transition-all duration-300 text-foreground placeholder:text-muted-foreground outline-none resize-none ${
                  focused === "message" ? "border-primary glow-primary" : "border-transparent"
                }`}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg bg-gradient-brand text-primary-foreground font-semibold flex items-center justify-center gap-2 glow-primary"
              >
                <Send className="w-4 h-4" />
                Send Message
              </motion.button>
            </form>
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
