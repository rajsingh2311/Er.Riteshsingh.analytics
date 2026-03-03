import { motion } from "framer-motion";
import { ArrowUpRight, Handshake, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section id="about-detailed" className="relative pt-8 pb-8 md:pt-12 md:pb-10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-2 md:mb-3"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-2">About</h2>
            <div className="h-1 w-24 bg-gradient-brand mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mb-4 md:mb-6"
          >
            <div className="glass rounded-xl p-3 md:p-4 border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:border-white hover:bg-primary/10 hover:scale-[1.05] hover:z-50 transition-all duration-300">
              <div className="grid sm:grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => navigate("/words-that-matter")}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="group rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent px-4 py-3 flex items-center justify-between hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:border-white hover:bg-primary/10 hover:scale-[1.05] hover:z-50 transition-all duration-300"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Quote className="w-4 h-4" />
                    Words That Matter
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-primary/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => navigate("/my-mentors")}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="group rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent px-4 py-3 flex items-center justify-between hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:border-white hover:bg-primary/10 hover:scale-[1.05] hover:z-50 transition-all duration-300"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Handshake className="w-4 h-4" />
                    My Mentors
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-primary/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Main About Card with Highlighted Border */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Gradient Border Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-teal-400 to-cyan-300 rounded-2xl p-[2px]">
              <div className="absolute inset-0 bg-background/95 rounded-2xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 rounded-2xl p-6 md:p-12 bg-background/50 backdrop-blur-sm">
              {/* Title */}
              <h3 className="text-xl md:text-3xl font-bold text-gradient mb-6 md:mb-8">
                Data Analyst | Business Intelligence Specialist
              </h3>

              {/* Main Content - Justified Text */}
              <div id="about-overview" className="scroll-mt-36 space-y-4 md:space-y-6 mb-6 md:mb-8">
                <p className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed text-justify">
                  I am a Data Analyst at Seth Anandram Jaipuria Group of Educational Institutions, where I leverage SQL, 
                  Predictive Analytics, and Power BI to transform raw institutional data into strategic insights. My focus is on 
                  driving operational efficiency and supporting evidence-based decision-making within the education sector.
                </p>

                <p className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed text-justify">
                  Previously, I honed my ability to merge technical analysis with business impact at WTF Gyms. There, I engineered 
                  automation workflows (Make.com & WATI) that reduced lead response times by 65% and developed comprehensive Power BI 
                  dashboards to track agent performance and funnel conversion.
                </p>

                <p className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed text-justify">
                  I am passionate about #BuildingInPublic and sharing workflows that help businesses make smarter, faster decisions. 
                  Let's connect to discuss data strategy and automation.
                </p>
              </div>

              {/* Core Competencies */}
              <div id="core-competencies" className="scroll-mt-36 border-t border-white/20 pt-6 md:pt-8">
                <h4 className="text-lg md:text-xl font-bold text-gradient mb-4 md:mb-6">Core Competencies</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {/* Analytics */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
                  >
                    <h5 className="font-semibold text-primary mb-3">Analytics</h5>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>SQL</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Excel (MOS Expert)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Python (Pandas, NumPy)</span>
                      </li>
                    </ul>
                  </motion.div>

                  {/* Visualization */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
                  >
                    <h5 className="font-semibold text-primary mb-3">Visualization</h5>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Power BI (Advanced DAX, Power Query)</span>
                      </li>
                    </ul>
                  </motion.div>

                  {/* Automation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
                  >
                    <h5 className="font-semibold text-primary mb-3">Automation</h5>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Make.com</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Apps Script</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>CRM Workflows</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
