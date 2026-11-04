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
  Maximize2,
  Search,
  School,
  Presentation,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import ParticleField from "@/components/ParticleField";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SectionNavigator from "@/components/SectionNavigator";
import LinkPreview from "@/components/ui/link-preview";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  role: string;
  category: "faculty" | "seminars" | "academics" | "outreach";
  categoryLabel: string;
  tag: string;
  description: string;
}

const btechGallery: GalleryItem[] = [
  {
    id: "guest-lecture-iit-roorkee",
    src: `${import.meta.env.BASE_URL}images/Education/btech_guest_lecture_iit_roorkee.jpg`,
    title: "Guest Lecture by Dr. C. Balomajumder",
    subtitle: "Department of Chemical Engineering, IIT Roorkee",
    role: "Guest Lecture by Eminent IIT Roorkee Professor",
    category: "faculty",
    categoryLabel: "Faculty & Leadership",
    tag: "IIT Roorkee Guest Lecture",
    description: "Engaging in an advanced technical guest lecture and interactive academic seminar with Dr. C. Balomajumder, distinguished Professor of Chemical Engineering at IIT Roorkee, exploring industrial separation processes, environmental biotechnology, and mass transfer operations at SCRIET, Chaudhary Charan Singh University, Meerut."
  },
  {
    id: "director-engineering-delegation",
    src: `${import.meta.env.BASE_URL}images/Education/btech_director_engineering_delegation.jpg`,
    title: "Delegation with Director of Engineering",
    subtitle: "Sir Chhotu Ram Institute of Engineering & Technology (SCRIET)",
    role: "SCRIET Leadership & Faculty Delegation",
    category: "faculty",
    categoryLabel: "Faculty & Leadership",
    tag: "Director Delegation",
    description: "Official departmental delegation of Chemical & Mechanical Engineering student coordinators alongside the Director of Engineering at SCRIET, Chaudhary Charan Singh University, Meerut, celebrating university technical milestones, departmental innovation, and student-led initiatives."
  },
  {
    id: "hod-dr-aman-dr-pratyush",
    src: `${import.meta.env.BASE_URL}images/Education/btech_hod_dr_aman_kumar_dr_pratyush.jpg`,
    title: "With HoD Dr. Aman Kumar & Dr. Pratyush Upadhyay",
    subtitle: "Department of Chemical Engineering, CCSU Meerut",
    role: "Academic Mentors & Departmental Leadership",
    category: "faculty",
    categoryLabel: "Faculty & Leadership",
    tag: "Faculty Leadership",
    description: "Commemorative departmental gathering in front of the Chemical Engineering mural alongside Head of Department Dr. Aman Kumar and respected Professor Dr. Pratyush Upadhyay, acknowledging academic contributions and active student coordination throughout the 4-year degree program."
  },
  {
    id: "chemical-engineering-cohort",
    src: `${import.meta.env.BASE_URL}images/Education/btech_chemical_engineering_cohort.jpg`,
    title: "Chemical Engineering Graduating Cohort",
    subtitle: "Class of 2019 — 2023 · SCRIET, CCSU Meerut",
    role: "Class of 2019 — 2023 Cohort",
    category: "academics",
    categoryLabel: "Cohort & Academics",
    tag: "Graduating Cohort",
    description: "Full departmental group portrait bringing together graduating chemical engineering classmates and faculty mentors outside the departmental complex, reflecting on four transformative years of engineering studies, thermodynamic modeling, and camaraderie."
  },
  {
    id: "urea-plant-review",
    src: `${import.meta.env.BASE_URL}images/Education/btech_urea_plant_process_review.jpg`,
    title: "Process Engineering & Plant Flowsheet Evaluation",
    subtitle: "Urea Plant Process Review with Department Faculty",
    role: "With HoD Dr. Aman Kumar & Dr. Pratyush Upadhyay",
    category: "faculty",
    categoryLabel: "Faculty & Leadership",
    tag: "Process Design",
    description: "Engaging in an in-depth technical flowsheet review in front of the industrial Urea Plant process engineering diagram, dissecting high-pressure reaction loops, stripping columns, and recycling dynamics alongside Head of Department Dr. Aman Kumar and Dr. Pratyush Upadhyay."
  },
  {
    id: "hod-office-mentorship",
    src: `${import.meta.env.BASE_URL}images/Education/btech_hod_office_mentorship.jpg`,
    title: "Senior Thesis & Capstone Review with HoD",
    subtitle: "In the Office of Dr. Aman Kumar, Head of Department",
    role: "Capstone Research & Documentation Review",
    category: "faculty",
    categoryLabel: "Faculty & Leadership",
    tag: "Academic Mentorship",
    description: "Presenting and submitting final engineering capstone project dossiers and documentation in the office of Head of Department Dr. Aman Kumar at SCRIET, CCSU Meerut, reviewing technical methodologies and practical industrial applicability."
  },
  {
    id: "environment-day-felicitation",
    src: `${import.meta.env.BASE_URL}images/Education/btech_environment_day_felicitation.jpg`,
    title: "World Environment Day — Felicitation Ceremony",
    subtitle: "Stage Felicitation & Green Sapling Honor",
    role: "Seminar Organizing Committee & University Dignitaries",
    category: "seminars",
    categoryLabel: "Seminars & Events",
    tag: "World Environment Day",
    description: "On-stage felicitation ceremony presenting green saplings to esteemed guests, faculty patrons, and university leadership following the successful execution of the university-wide World Environment Day seminar on industrial sustainability and green chemistry."
  },
  {
    id: "environment-day-team",
    src: `${import.meta.env.BASE_URL}images/Education/btech_environment_day_team.jpg`,
    title: "World Environment Day — Core Organizing Team",
    subtitle: "Celebrating a Successful Campus Sustainability Drive",
    role: "Student Organizing Team & Faculty Coordinator",
    category: "seminars",
    categoryLabel: "Seminars & Events",
    tag: "Campus Leadership",
    description: "Celebratory on-stage gathering of the core student organizing team alongside the faculty coordinator after successfully hosting the university World Environment Day seminar, attended by hundreds of engineering students and faculty delegates."
  },
  {
    id: "unnat-bharat-abhiyan",
    src: `${import.meta.env.BASE_URL}images/Education/B.Tech%20Volunteer%201.png`,
    title: "Unnat Bharat Abhiyan (IIT Delhi) Outreach",
    subtitle: "Rural Community Field Survey & Socio-Economic Assessment",
    role: "Student Coordinator · National GOI Mission",
    category: "outreach",
    categoryLabel: "Field Outreach",
    tag: "IIT Delhi Mission",
    description: "Leading rural awareness and socio-economic baseline data surveys across adopted villages under the flagship Unnat Bharat Abhiyan initiative mentored by IIT Delhi, gathering primary field data to evaluate rural development indicators."
  },
  {
    id: "iwrs-seminar",
    src: `${import.meta.env.BASE_URL}images/Education/B..Tech%20Volunteer%202.png`,
    title: "IWRS Water Resources Awareness Drive",
    subtitle: "Indian Water Resources Society Technical Symposium",
    role: "Student Coordinator · IWRS Student Chapter",
    category: "seminars",
    categoryLabel: "Seminars & Events",
    tag: "Water Conservation",
    description: "Coordinating technical symposiums on sustainable water resource management, chemical filtration ethics, and ecological conservation with faculty and peers under the Indian Water Resources Society (IWRS)."
  },
  {
    id: "technical-leadership",
    src: `${import.meta.env.BASE_URL}images/Education/B..Tech%20Volunteer%203.png`,
    title: "Student Leadership & Technical Workshop",
    subtitle: "(SCRIET) Chaudhary Charan Singh University, Meerut Initiative",
    role: "Student Coordinator & Technical Organizer",
    category: "seminars",
    categoryLabel: "Seminars & Events",
    tag: "Student Leadership",
    description: "Collaborating with student delegates, organizing technical workshops, and driving student engagement initiatives across the engineering campus."
  }
];

const categoryTabs = [
  { id: "all", label: "All Moments", icon: Sparkles },
  { id: "faculty", label: "Faculty & Leadership", icon: School },
  { id: "seminars", label: "Seminars & Events", icon: Presentation },
  { id: "outreach", label: "Field Outreach", icon: Globe },
  { id: "academics", label: "Cohort & Academics", icon: Users },
];

const BTechPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredImages = useMemo(() => {
    return btechGallery.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handlePrev = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1));
  }, [activeModalIndex, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0));
  }, [activeModalIndex, filteredImages.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (activeModalIndex === null) return;
    if (e.key === "Escape") setActiveModalIndex(null);
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  }, [activeModalIndex, handlePrev, handleNext]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const currentModalItem = activeModalIndex !== null ? filteredImages[activeModalIndex] : null;

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
            className="text-base xs:text-lg md:text-2xl text-secondary-foreground font-mono mb-2 font-medium break-words flex items-center justify-center flex-wrap gap-2"
          >
            <LinkPreview
              href="https://www.ccsuniversity.ac.in/"
              imgSrc={`${import.meta.env.BASE_URL}images/CCSU.png`}
              label="(SCRIET) Chaudhary Charan Singh University, Meerut"
              sizeClass="w-64 sm:w-80 max-w-[88vw]"
            />
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
              <LinkPreview
                href="https://www.ccsuniversity.ac.in/"
                imgSrc={`${import.meta.env.BASE_URL}images/CCSU.png`}
                label="4-Year Degree · (SCRIET) Chaudhary Charan Singh University, Meerut"
                sizeClass="w-64 sm:w-80 max-w-[88vw]"
              />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed break-words"
          >
            Gained profound mathematical rigor, thermodynamic modeling, and exposure to SAP ERP systems. Developed the quantitative first-principles mindset that laid the foundation for modern business analytics, data automation, and operations leadership.
          </motion.p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 pb-20 min-w-0">
        <div className="max-w-5xl mx-auto space-y-10 min-w-0">
          
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
                  Chemical Engineering is the science of transforming raw materials into finished products through rigorous mass and energy balances. At (SCRIET) Chaudhary Charan Singh University, Meerut, I mastered the art of breaking complex, non-linear problems into solvable mathematical components — a mental framework that now powers my approach to business modeling.
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

          {/* Distinguished Faculty & Mentorship Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5 sm:p-7 md:p-9 border border-primary/30 shadow-[0_0_25px_rgba(139,92,246,0.15)] min-w-0"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-primary-foreground">
                <School className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gradient">Faculty Mentors & Academic Leadership</h3>
                <p className="text-xs text-muted-foreground font-mono">Esteemed professors, researchers, and administrators who guided my engineering foundation</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
              <div className="p-5 rounded-xl bg-card/50 border border-border/80 hover:border-primary/40 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">Guest Lecturer</span>
                  <span className="text-[11px] font-mono text-muted-foreground">IIT Roorkee</span>
                </div>
                <h4 className="text-base font-bold text-foreground mb-1">
                  Dr. C. Balomajumder
                </h4>
                <p className="text-xs text-primary font-mono mb-2">
                  Professor · Department of Chemical Engineering, IIT Roorkee
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Delivered an inspiring advanced guest lecture at SCRIET on environmental biochemical engineering and multi-stage separation processes, deepening our appreciation for sustainable process design.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-card/50 border border-border/80 hover:border-primary/40 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">Institutional Leader</span>
                  <span className="text-[11px] font-mono text-muted-foreground">SCRIET Meerut</span>
                </div>
                <h4 className="text-base font-bold text-foreground mb-1">
                  Director of Engineering
                </h4>
                <p className="text-xs text-primary font-mono mb-2">
                  Sir Chhotu Ram Institute of Engineering & Technology (SCRIET)
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Provided continuous institutional encouragement, modernized engineering laboratory infrastructure, and supported student delegation initiatives across state and national engineering forums.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-card/50 border border-border/80 hover:border-primary/40 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">Head of Department</span>
                  <span className="text-[11px] font-mono text-muted-foreground">Chemical Engg.</span>
                </div>
                <h4 className="text-base font-bold text-foreground mb-1">
                  Dr. Aman Kumar
                </h4>
                <p className="text-xs text-primary font-mono mb-2">
                  Head of Department (HoD) · Chemical Engineering, CCSU Meerut
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Provided constant guidance on capstone projects, plant simulation flowsheets, and academic rigor, motivating students to bridge theoretical process thermodynamics with enterprise automation.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-card/50 border border-border/80 hover:border-primary/40 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">Faculty & Guide</span>
                  <span className="text-[11px] font-mono text-muted-foreground">Chemical Engg.</span>
                </div>
                <h4 className="text-base font-bold text-foreground mb-1">
                  Dr. Pratyush Upadhyay
                </h4>
                <p className="text-xs text-primary font-mono mb-2">
                  Professor · Department of Chemical Engineering, CCSU Meerut
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Mentored core engineering coursework, plant design principles, and reaction kinetics, challenging students to analyze equipment specifications from first-principles data.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Leadership & Society Roles */}
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

          {/* Photo Gallery with Interactive Lightbox & Filters */}
          <motion.div
            id="gallery"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5 sm:p-7 md:p-9 border border-primary/30 shadow-[0_0_25px_rgba(139,92,246,0.15)] min-w-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gradient">Campus & Academic Moments</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-mono font-semibold border border-primary/30">
                    {filteredImages.length} {filteredImages.length === 1 ? "Photo" : "Photos"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  Photographic documentation of guest lectures, departmental leadership, faculty mentorship, and seminars
                </p>
              </div>
              <span className="text-[11px] font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded-full border border-primary/20 self-start sm:self-auto shrink-0">
                Click any photo to enlarge & navigate
              </span>
            </div>

            {/* Filter Pills & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {categoryTabs.map((tab) => {
                  const TabIcon = tab.icon;
                  const isActive = selectedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20"
                          : "bg-card/60 hover:bg-card border border-border/70 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <TabIcon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search input */}
              <div className="relative shrink-0 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search moments..."
                  className="w-full bg-card/60 border border-border/80 focus:border-primary rounded-full pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Photo Grid */}
            {filteredImages.length === 0 ? (
              <div className="text-center py-12 rounded-xl bg-card/30 border border-dashed border-border">
                <p className="text-muted-foreground text-sm">No photos match your current filter or search criteria.</p>
                <button
                  onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                  className="mt-3 text-xs text-primary font-mono hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filteredImages.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="rounded-xl overflow-hidden glass border border-primary/30 shadow-md hover:shadow-2xl cursor-pointer group flex flex-col transition-all"
                    onClick={() => setActiveModalIndex(idx)}
                  >
                    <div className="aspect-video relative overflow-hidden bg-black/40">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-primary border border-primary/30">
                          {item.tag}
                        </span>
                      </div>
                      <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h5 className="font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors leading-snug">
                          {item.title}
                        </h5>
                        <p className="text-[11px] text-primary font-mono mb-2 leading-tight">{item.subtitle}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-[11px] text-primary font-semibold mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        View photo detail →
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
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

      {/* Enlarged Photo Lightbox Modal with Next / Prev */}
      <AnimatePresence>
        {activeModalIndex !== null && currentModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
            onClick={() => setActiveModalIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[92vh] glass rounded-2xl overflow-hidden border border-primary/40 shadow-2xl flex flex-col bg-card/95"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalIndex(null)}
                className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 text-white hover:text-primary hover:bg-black/90 transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white hover:text-primary border border-white/10 transition-colors shadow-lg"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white hover:text-primary border border-white/10 transition-colors shadow-lg"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Counter Badge */}
              <div className="absolute top-3 left-3 z-30 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-primary font-semibold">
                Photo {activeModalIndex + 1} of {filteredImages.length}
              </div>

              {/* Image Container */}
              <div className="relative max-h-[62vh] sm:max-h-[66vh] flex items-center justify-center bg-black/70 overflow-hidden">
                <img
                  src={currentModalItem.src}
                  alt={currentModalItem.title}
                  className="max-h-[62vh] sm:max-h-[66vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Details & Caption */}
              <div className="p-4 sm:p-5 bg-card/95 border-t border-border overflow-y-auto max-h-[25vh]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <h4 className="font-bold text-base sm:text-lg text-foreground">{currentModalItem.title}</h4>
                  <span className="text-xs font-mono text-primary font-semibold shrink-0">{currentModalItem.tag}</span>
                </div>
                <p className="text-xs text-primary/90 font-mono mb-2">{currentModalItem.subtitle}</p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {currentModalItem.description}
                </p>

                {/* Thumbnails Strip */}
                <div className="mt-3.5 pt-3 border-t border-border/50 flex items-center gap-2 overflow-x-auto pb-1">
                  {filteredImages.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveModalIndex(i)}
                      className={`relative w-12 h-10 sm:w-14 sm:h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        i === activeModalIndex ? "border-primary scale-105 shadow-md shadow-primary/30" : "border-border/60 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BTechPage;
