import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Calculator, 
  Atom, 
  FlaskConical, 
  Sparkles,
  Award,
  Compass
} from "lucide-react";
import { useEffect } from "react";
import ParticleField from "@/components/ParticleField";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SectionNavigator from "@/components/SectionNavigator";

const TwelfthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground">
      <ParticleField />
      
      {/* Top Navigator */}
      <div className="sticky top-0 z-50 glass backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-2 xs:px-4 md:px-6 flex items-center justify-between">
          <SectionNavigator
            mode="page"
            currentPage="12th Grade (PCM)"
            parentPage={{ label: "Education", to: "/section/education" }}
            backTo="/section/education"
            backLabel="Back to Education"
            className="border-none bg-transparent !shadow-none p-0 flex-1 min-w-0"
          />
          <div className="pl-2 shrink-0">
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-10 pb-12 flex items-center justify-center">
        <div className="relative z-10 container mx-auto px-3 sm:px-6 text-center min-w-0 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs sm:text-sm text-primary font-mono border border-primary/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Senior Secondary Education
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold mb-3 leading-tight tracking-tight break-words"
          >
            <span className="text-gradient">12th Grade</span> (PCM)
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base xs:text-lg md:text-2xl text-secondary-foreground font-mono mb-2 font-medium break-words"
          >
            S Devi Inter College, Madhuban, Mau (UP Board)
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm md:text-base font-mono mb-5"
          >
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-semibold">
              Completed: 2019
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-semibold">
              Score: 61% (First Division)
            </span>
            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold">
              Physics · Chemistry · Mathematics
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed break-words"
          >
            Completed rigorous higher secondary science education with focus on advanced calculus, coordinate geometry, mechanics, and molecular chemistry. This quantitative foundation became the launchpad for engineering and data science.
          </motion.p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 pb-20 min-w-0">
        <div className="max-w-5xl mx-auto space-y-10 min-w-0">

          {/* Academic Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5 sm:p-7 md:p-9 border border-primary/30 shadow-[0_0_25px_rgba(139,92,246,0.15)] min-w-0"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-primary-foreground">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gradient">Core Subject Pillars</h3>
                <p className="text-xs text-muted-foreground font-mono">Foundational science and mathematical mastery</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-5 rounded-xl bg-card/60 border border-border/80 hover:border-primary/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <Calculator className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-foreground mb-1.5">Mathematics</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Calculus (differential & integral), algebraic systems, coordinate geometry, vectors, and mathematical induction. Built logical reasoning and structural proof abilities.
                </p>
                <div className="text-[11px] font-mono text-primary font-semibold">Calculus · Vectors · Matrices</div>
              </div>

              <div className="p-5 rounded-xl bg-card/60 border border-border/80 hover:border-primary/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <Atom className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-foreground mb-1.5">Physics</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Classical mechanics, electrostatics, electromagnetic induction, wave optics, and modern atomic physics. Fostered deep intuition for physical modeling and dynamic systems.
                </p>
                <div className="text-[11px] font-mono text-primary font-semibold">Mechanics · Optics · Electrodynamics</div>
              </div>

              <div className="p-5 rounded-xl bg-card/60 border border-border/80 hover:border-primary/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-foreground mb-1.5">Chemistry</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Chemical thermodynamics, equilibrium kinetics, coordination complexes, and organic reaction mechanisms. Sparked the early interest that led directly into Chemical Engineering.
                </p>
                <div className="text-[11px] font-mono text-primary font-semibold">Kinetics · Thermodynamics · Organic</div>
              </div>
            </div>
          </motion.div>

          {/* The Journey Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5 sm:p-7 md:p-9 border border-primary/30 shadow-[0_0_25px_rgba(139,92,246,0.15)] min-w-0"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-primary-foreground">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gradient">The Senior Secondary Journey</h3>
                <p className="text-xs text-muted-foreground font-mono">Developing intellectual stamina and mathematical problem-solving</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-xl bg-card/50 border border-border/80">
                <h4 className="text-base font-bold text-primary mb-2 flex items-center gap-2">
                  <span>Cultivating Discipline & Rigor</span>
                </h4>
                <p className="text-secondary-foreground text-xs sm:text-sm leading-relaxed">
                  The Uttar Pradesh Board intermediate curriculum is recognized for its thorough, exam-focused depth. Solving complex multi-step calculus problems and balancing complex chemical reactions taught me analytical stamina, mental clarity, and the value of structured problem decomposition.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-card/50 border border-border/80">
                <h4 className="text-base font-bold text-primary mb-2 flex items-center gap-2">
                  <span>The Catalyst for Technical Education</span>
                </h4>
                <p className="text-secondary-foreground text-xs sm:text-sm leading-relaxed">
                  During 12th grade, my curiosity shifted from pure memorization to understanding how theoretical formulas govern industrial machinery, chemical reactions, and computational algorithms. This clarity drove me to pursue engineering at university.
                </p>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-primary/10 via-card/50 to-accent/10 border border-primary/20 text-center">
              <p className="text-secondary-foreground italic text-xs sm:text-sm md:text-base leading-relaxed">
                "High school mathematics wasn't just numbers on paper — it was the training ground where I learned to see patterns, navigate uncertainty, and think analytically."
              </p>
            </div>
          </motion.div>

          {/* Education Milestone Navigation Bar */}
          <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => navigate("/tenth")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass border border-border hover:border-primary text-xs sm:text-sm font-semibold transition-all hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 text-primary" />
              <span>Previous: 10th Grade (Science)</span>
            </button>

            <button
              onClick={() => navigate("/section/education")}
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors order-last sm:order-none"
            >
              All Education Milestones
            </button>

            <button
              onClick={() => navigate("/btech")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass border border-border hover:border-primary text-xs sm:text-sm font-semibold transition-all hover:bg-primary/10"
            >
              <span>Next: B.Tech (Chemical Engineering)</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TwelfthPage;
