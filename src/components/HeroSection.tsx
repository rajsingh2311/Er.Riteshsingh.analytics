import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import { ArrowDown, Database, TrendingUp, Brain } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      <ParticleField />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-brand opacity-10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-brand opacity-10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              Available for projects
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Turning{" "}
            <span className="text-gradient glow-text">Data</span>
            <br />
            Into Decisions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Data Analyst specializing in transforming complex datasets into 
            actionable insights through advanced analytics and visualization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {[
              { icon: Database, label: "SQL & Databases" },
              { icon: TrendingUp, label: "Predictive Analytics" },
              { icon: Brain, label: "Machine Learning" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-5 py-3 rounded-lg glass text-sm"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-secondary-foreground">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            href="#skills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="inline-block animate-float"
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
