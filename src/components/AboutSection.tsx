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
            <div className="glass rounded-xl p-3 md:p-4 border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10 transition-all duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <motion.button
                  type="button"
                  onClick={() => navigate("/words-that-matter")}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between hover:border-white hover:bg-primary/15 transition-all duration-300"
                >
                  <span className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary truncate">
                    <Quote className="w-4 h-4 shrink-0" />
                    <span className="truncate">Words That Matter</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-primary/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => navigate("/my-mentors")}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between hover:border-white hover:bg-primary/15 transition-all duration-300"
                >
                  <span className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary truncate">
                    <Handshake className="w-4 h-4 shrink-0" />
                    <span className="truncate">My Mentors</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-primary/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
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
            <div className="relative z-10 rounded-2xl p-4 sm:p-6 md:p-10 bg-background/50 backdrop-blur-sm">
              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-gradient mb-4 sm:mb-6 md:mb-8 leading-snug">
                Data Analyst | Business Intelligence Specialist
              </h3>

              {/* Main Content - Justified Text */}
              <div id="about-overview" className="scroll-mt-36 space-y-3 sm:space-y-4 md:space-y-6 mb-6 md:mb-8 text-xs sm:text-sm md:text-base leading-relaxed text-left sm:text-justify text-foreground">
                <p>
                  I am a Data Analyst at Seth Anandram Jaipuria Group of Educational Institutions, where I leverage SQL, 
                  Predictive Analytics, and Power BI to transform raw institutional data into strategic insights. My focus is on 
                  driving operational efficiency and supporting evidence-based decision-making within the education sector.
                </p>

                <p>
                  Previously, I honed my ability to merge technical analysis with business impact at WTF Gyms. There, I engineered 
                  automation workflows (Make.com & WATI) that reduced lead response times by 65% and developed comprehensive Power BI 
                  dashboards to track agent performance and funnel conversion.
                </p>

                <p>
                  I am passionate about #BuildingInPublic and sharing workflows that help businesses make smarter, faster decisions. 
                  Let's connect to discuss data strategy and automation.
                </p>
              </div>

              {/* Core Competencies */}
              <div id="core-competencies" className="scroll-mt-36 border-t border-white/20 pt-5 sm:pt-6 md:pt-8">
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gradient mb-4 md:mb-6">Core Competencies</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {/* Analytics */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="p-3.5 sm:p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
                  >
                    <h5 className="font-semibold text-primary mb-2 sm:mb-3 text-sm sm:text-base">Analytics</h5>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>SQL</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Excel (MOS Expert)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
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
                    className="p-3.5 sm:p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
                  >
                    <h5 className="font-semibold text-primary mb-2 sm:mb-3 text-sm sm:text-base">Visualization</h5>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
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
                    className="p-3.5 sm:p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 sm:col-span-2 md:col-span-1"
                  >
                    <h5 className="font-semibold text-primary mb-2 sm:mb-3 text-sm sm:text-base">Automation</h5>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Make.com</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Apps Script</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
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
