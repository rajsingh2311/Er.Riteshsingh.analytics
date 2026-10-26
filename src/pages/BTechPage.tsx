import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  X, 
  GraduationCap, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Globe, 
  Compass,
  Maximize2
} from "lucide-react";
import { useEffect, useState } from "react";
import ParticleField from "@/components/ParticleField";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SectionNavigator from "@/components/SectionNavigator";

interface GalleryItem {
  src: string;
  title: string;
  subtitle: string;
  description: string;
}

const btechGallery: GalleryItem[] = [
  {
    src: `${import.meta.env.BASE_URL}images/Education/B.Tech%20Volunteer%201.png`,
    title: "Unnat Bharat Abhiyan (IIT Delhi) Outreach",
    subtitle: "Rural Community Field Survey & Development",
    description: "Leading rural awareness and socio-economic baseline data surveys across adopted villages under the flagship Unnat Bharat Abhiyan initiative mentored by IIT Delhi."
  },
  {
    src: `${import.meta.env.BASE_URL}images/Education/B..Tech%20Volunteer%202.png`,
    title: "IWRS Water Resources Awareness Drive",
    subtitle: "Indian Water Resources Society Seminar",
    description: "Coordinating technical symposiums on sustainable water resource management, chemical filtration ethics, and ecological conservation with faculty and peers."
  },
  {
    src: `${import.meta.env.BASE_URL}images/Education/B..Tech%20Volunteer%203.png`,
    title: "Student Leadership & Technical Workshop",
    subtitle: "SCRIET CCSU Meerut Department Initiative",
    description: "Collaborating with student delegates, organizing technical workshops, and driving student engagement initiatives across the engineering campus."
  }
];

const BTechPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

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
            currentPage="B.Tech (Chemical Engineering)"
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
              Undergraduate Engineering Foundation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold mb-3 leading-tight tracking-tight break-words"
          >
            <span className="text-gradient">B.Tech</span> in Chemical Engineering
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base xs:text-lg md:text-2xl text-secondary-foreground font-mono mb-2 font-medium break-words"
          >
            Sir Chhotu Ram Institute of Engineering & Technology (SCRIET), CCSU Meerut
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm md:text-base font-mono mb-5"
          >
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-semibold">
              2019 — 2023
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-semibold">
              CGPA: 6.74
            </span>
            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold">
              4-Year Degree (Dr. A.P.J. Abdul Kalam Technical University Affiliate)
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed break-words"
          >
            Gained profound mathematical rigor, thermodynamic modeling, and exposure to SAP ERP systems. Developed the quantitative first-principles mindset that laid the foundation for modern business analytics and systems automation.
          </motion.p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 pb-20 min-w-0">
        <div className="max-w-5xl mx-auto space-y-10 min-w-0">
          
          {/* Activities & Leadership Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5 sm:p-7 md:p-9 border border-primary/30 shadow-[0_0_25px_rgba(139,92,246,0.15)] min-w-0"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-primary-foreground">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gradient">Leadership & Society Roles</h3>
                <p className="text-xs text-muted-foreground font-mono">Campus involvement, social initiatives, and national community missions</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-5 rounded-xl bg-card/60 border border-border/80 hover:border-primary/40 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">National Society</span>
                    <span className="text-[11px] font-mono text-muted-foreground">Coordinator</span>
                  </div>
                  <h4 className="text-base font-bold text-foreground mb-1.5">
                    Indian Water Resources Society (IWRS)
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                    Served as Student Coordinator organizing regional seminars, technical presentations, and student awareness drives focusing on water sustainability, industrial effluent management, and conservation science.
                  </p>
                </div>
                <a 
                  href="https://iwrs.org.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-semibold"
                >
                  Visit IWRS Official Portal <Globe className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-5 rounded-xl bg-card/60 border border-border/80 hover:border-primary/40 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">Government of India Mission</span>
                    <span className="text-[11px] font-mono text-muted-foreground">Coordinator</span>
                  </div>
                  <h4 className="text-base font-bold text-foreground mb-1.5">
                    Unnat Bharat Abhiyan (IIT Delhi)
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                    Coordinated ground initiatives under the national mission anchored by IIT Delhi. Led rural surveys, gathered primary village data, and evaluated public infrastructure, clean water access, and school education indicators.
                  </p>
                </div>
                <a 
                  href="https://unnatbharatabhiyan.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-semibold"
                >
                  Visit Unnat Bharat Abhiyan Portal <Globe className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Detailed Journey & Engineering Mindset */}
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
                <h3 className="text-xl sm:text-2xl font-bold text-gradient">My B.Tech Engineering Journey</h3>
                <p className="text-xs text-muted-foreground font-mono">How 4 years of engineering built the foundation for analytical leadership</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-xl bg-card/50 border border-border/80">
                <h4 className="text-base font-bold text-primary mb-2 flex items-center gap-2">
                  <span>First-Principles Engineering Mindset</span>
                </h4>
                <p className="text-secondary-foreground text-xs sm:text-sm leading-relaxed">
                  Chemical Engineering is the science of transforming raw materials into finished products through rigorous mass and energy balances. At SCRIET Meerut, I mastered the art of breaking complex, non-linear problems into solvable mathematical components — a mental framework that now powers my approach to business modeling.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-card/50 border border-border/80">
                <h4 className="text-base font-bold text-primary mb-2 flex items-center gap-2">
                  <span>The Bridge to Analytics & Automation</span>
                </h4>
                <p className="text-secondary-foreground text-xs sm:text-sm leading-relaxed">
                  Working with numerical methods, reaction kinetics, and SAP ERP telemetry taught me how datasets describe physical and operational reality. Translating thousands of chemical data points into clear graphs sparked my passion for enterprise data pipelines, dashboard architecture, and predictive intelligence.
                </p>
              </div>
            </div>

            {/* Core Coursework Grid */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Core Technical & Analytical Coursework
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { name: "Numerical Methods & Computing", desc: "Iterative algorithms, regression modeling, and error minimization" },
                  { name: "SAP ERP & Data Processing", desc: "Materials management, process scheduling, and structured data" },
                  { name: "Process Dynamics & Optimization", desc: "System control loops, feedback telemetry, and throughput efficiency" },
                  { name: "Thermodynamics & Transport Phenomena", desc: "Mathematical governing equations and multi-variable analysis" },
                  { name: "Statistical Quality & Process Control", desc: "Six Sigma principles, variance analysis, and quality assurance" },
                  { name: "Applied Research & Technical Reporting", desc: "Synthesizing experimental findings into executive summaries" }
                ].map((course) => (
                  <div key={course.name} className="p-3.5 rounded-xl bg-card/40 border border-border/70 hover:border-primary/40 transition-colors">
                    <p className="font-semibold text-xs sm:text-sm text-foreground mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{course.name}</span>
                    </p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed pl-5">{course.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Block */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-primary/10 via-card/50 to-accent/10 border border-primary/20 text-center">
              <p className="text-secondary-foreground italic text-xs sm:text-sm md:text-base leading-relaxed">
                "Engineering taught me how systems behave under pressure; business analytics taught me how to guide those systems toward profitable, impactful outcomes."
              </p>
            </div>
          </motion.div>

          {/* Photo Gallery with Interactive Lightbox */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5 sm:p-7 md:p-9 border border-primary/30 shadow-[0_0_25px_rgba(139,92,246,0.15)] min-w-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gradient">Field & Society Moments</h3>
                <p className="text-xs text-muted-foreground font-mono">Photographic documentation from campus leadership and rural initiatives</p>
              </div>
              <span className="text-[11px] font-mono text-primary/80 bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 self-start sm:self-auto">
                Click any photo to enlarge
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {btechGallery.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl overflow-hidden glass border border-primary/30 shadow-md hover:shadow-xl cursor-pointer group flex flex-col"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="aspect-video relative overflow-hidden bg-black/40">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-primary font-mono mb-2">{item.subtitle}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-[11px] text-primary font-semibold mt-3 flex items-center gap-1">
                      View full detail →
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Milestone Navigation Bar */}
          <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => navigate("/twelfth")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass border border-border hover:border-primary text-xs sm:text-sm font-semibold transition-all hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 text-primary" />
              <span>Previous: 12th Grade (PCM)</span>
            </button>

            <button
              onClick={() => navigate("/section/education")}
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors order-last sm:order-none"
            >
              All Education Milestones
            </button>

            <button
              onClick={() => navigate("/pgdm")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass border border-border hover:border-primary text-xs sm:text-sm font-semibold transition-all hover:bg-primary/10"
            >
              <span>Next: PGDM (Business Analytics)</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </button>
          </div>

        </div>
      </div>

      {/* Enlarged Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] glass rounded-2xl overflow-hidden border border-primary/40 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 text-white hover:text-primary hover:bg-black/80 transition-colors"
                aria-label="Close image modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[65vh] flex items-center justify-center bg-black/60 overflow-hidden">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="p-4 sm:p-6 bg-card/90 border-t border-border">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-base sm:text-lg text-foreground">{selectedImage.title}</h4>
                  <span className="text-xs font-mono text-primary font-semibold">{selectedImage.subtitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BTechPage;
