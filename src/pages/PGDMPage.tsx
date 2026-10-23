import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Grid3X3, 
  Columns, 
  Search, 
  Sparkles,
  Users,
  Briefcase,
  Globe,
  Rocket
} from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import ParticleField from "@/components/ParticleField";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SectionNavigator from "@/components/SectionNavigator";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  role: string;
  category: "all" | "mentors" | "industry" | "startups" | "visits";
  categoryLabel: string;
  tag: string;
  description: string;
}

const galleryData: GalleryItem[] = [
  {
    id: "director",
    src: `${import.meta.env.BASE_URL}images/PGDM/Director%20Sir.jpeg`,
    title: "Dr. Tapan Kumar Nayak Sir",
    role: "Director · Jaipuria School of Business",
    category: "mentors",
    categoryLabel: "Mentors & Leadership",
    tag: "Director",
    description: "Guiding leadership with remarkable humility, creating an environment where students connect directly with top industry titans."
  },
  {
    id: "talent-hunt",
    src: `${import.meta.env.BASE_URL}images/PGDM/@Director%20sir%20in%20talent%20hunt.jpeg`,
    title: "Winner · Talent Hunt 2024",
    role: "Poetry Competition Winner with Director Sir",
    category: "mentors",
    categoryLabel: "Mentors & Leadership",
    tag: "Achievement",
    description: "Awarded 1st place in Talent Hunt 2024 Poetry Competition and felicitated by Director Dr. Tapan Kumar Nayak Sir."
  },
  {
    id: "sumit-sir",
    src: `${import.meta.env.BASE_URL}images/PGDM/Sumit%20Sir.jpeg`,
    title: "Dr. Sumit Bhardwaj Sir",
    role: "Post-Doc Scientist (Lund University Sweden) · Analytics Mentor",
    category: "mentors",
    categoryLabel: "Mentors & Leadership",
    tag: "Faculty Mentor",
    description: "Transformative faculty mentor who turned coding errors into insights and analytics logic into a lifelong passion."
  },
  {
    id: "nishant-sir",
    src: `${import.meta.env.BASE_URL}images/PGDM/@BA.jpeg`,
    title: "Nishant Singh Sir",
    role: "Faculty Guide & Academic Mentor",
    category: "mentors",
    categoryLabel: "Mentors & Leadership",
    tag: "Faculty Mentor",
    description: "Invaluable guide throughout my academic curriculum, research analysis, and strategic career milestones."
  },
  {
    id: "advani-sir",
    src: `${import.meta.env.BASE_URL}images/PGDM/Prof.%20Ashok%20Advani%20sir.jpeg`,
    title: "Prof. Ashok Advani Sir",
    role: "Supply Chain & Logistics Veteran",
    category: "mentors",
    categoryLabel: "Mentors & Leadership",
    tag: "Supply Chain",
    description: "Concluding session of Supply Chain & Logistics Management, understanding real-world distribution and fulfillment operations."
  },
  {
    id: "deepak-vohra",
    src: `${import.meta.env.BASE_URL}images/PGDM/DeepK%20Vohara%20Sir.jpeg`,
    title: "IFS Deepak Vohra Sir",
    role: "Distinguished Diplomat · Former Ambassador of India",
    category: "industry",
    categoryLabel: "Industry Leaders",
    tag: "Diplomacy & Trade",
    description: "High-impact address on global diplomacy, international relations, economic globalization, and youth leadership."
  },
  {
    id: "akshay-rakshit",
    src: `${import.meta.env.BASE_URL}images/PGDM/Akshay%20Rakshit%20sit%20HRBP%20BMW.jpeg`,
    title: "Akshay Rakshit Sir",
    role: "HRBP · BMW Group India",
    category: "industry",
    categoryLabel: "Industry Leaders",
    tag: "BMW Group",
    description: "Corporate masterclass on talent strategy, agile leadership, and operational culture at the prestigious automotive group."
  },
  {
    id: "rishabh-sir",
    src: `${import.meta.env.BASE_URL}images/PGDM/Rishabh%20sir.jpeg`,
    title: "Rishabh Sir",
    role: "Category Head · Swiggy (ex-Blinkit)",
    category: "industry",
    categoryLabel: "Industry Leaders",
    tag: "Quick Commerce",
    description: "Practical deep-dive into high-velocity supply chains, unit economics, demand forecasting, and inventory turns in quick commerce."
  },
  {
    id: "rohan-sudan",
    src: `${import.meta.env.BASE_URL}images/PGDM/Rohan%20sudan%20sr.jpeg`,
    title: "Rohan Sudan Sir",
    role: "India Campus Recruitment Head · WNS Global Services",
    category: "industry",
    categoryLabel: "Industry Leaders",
    tag: "Talent & BPM",
    description: "Corporate recruitment perspective on business process management, analytical skill requirements, and corporate readiness."
  },
  {
    id: "nakshatra-sachdeva",
    src: `${import.meta.env.BASE_URL}images/PGDM/Nakshatra%20Sachdeva%20sir.jpeg`,
    title: "Nakshatra Sachdeva Sir",
    role: "Acclaimed Theater Artist & Creative Communicator",
    category: "industry",
    categoryLabel: "Industry Leaders",
    tag: "Creative Arts",
    description: "Masterclass on expressive storytelling, public presence, and articulating business data with conviction and impact."
  },
  {
    id: "pw-leadership",
    src: `${import.meta.env.BASE_URL}images/PGDM/PW%20Image.jpeg`,
    title: "PW School of Startups Leadership",
    role: "With Soumen Banerjee Sir (GM) & Sudhanshu Agarwal Sir (Director)",
    category: "startups",
    categoryLabel: "Startups & Innovation",
    tag: "Ecosystem",
    description: "Interactive session on venture building, entrepreneurship frameworks, and fostering scalable innovation."
  },
  {
    id: "pw-sudhanshu",
    src: `${import.meta.env.BASE_URL}images/PGDM/PW%20Image%202.jpeg`,
    title: "Sudhanshu Agarwal Sir",
    role: "Director · PW School of Startups",
    category: "startups",
    categoryLabel: "Startups & Innovation",
    tag: "Venture Lead",
    description: "Mentorship on product-market fit, student incubation opportunities, and early-stage scaling."
  },
  {
    id: "pw-soumen",
    src: `${import.meta.env.BASE_URL}images/PGDM/PW%20image%203.jpeg`,
    title: "Soumen Banerjee Sir",
    role: "General Manager · PW School of Startups",
    category: "startups",
    categoryLabel: "Startups & Innovation",
    tag: "Operations",
    description: "Exchange on startup operations, lean execution, and institutional ecosystem building."
  },
  {
    id: "singapore-immersion",
    src: `${import.meta.env.BASE_URL}images/PGDM/Team%20JSB%20AT%20SINGHAPUR.jpeg`,
    title: "Global Immersion @ Singapore",
    role: "Team JSB with Director Sir & Batchmates",
    category: "visits",
    categoryLabel: "Visits & Campus Life",
    tag: "Global Immersion",
    description: "International study tour at MDIS Singapore exploring cross-border trade hubs, multicultural enterprise, and global logistics."
  },
  {
    id: "scintilla-team",
    src: `${import.meta.env.BASE_URL}images/PGDM/Team%20JSB.jpeg`,
    title: "Team JSB @ Scintilla 2025",
    role: "Annual Flagship Cultural & Management Fest",
    category: "visits",
    categoryLabel: "Visits & Campus Life",
    tag: "Campus Life",
    description: "Moments of collaboration and fest leadership celebrating community spirit with Director Sir, faculty, and student peers."
  },
  {
    id: "coca-cola-visit",
    src: `${import.meta.env.BASE_URL}images/PGDM/@Cocacola%20factory.jpeg`,
    title: "The Happiness Factory · Coca-Cola",
    role: "Industrial Plant Immersion & Logistics Study",
    category: "visits",
    categoryLabel: "Visits & Campus Life",
    tag: "Industrial Plant",
    description: "On-site industrial plant visit analyzing automated bottling lines, inventory control, and supply chain telemetry."
  }
];

const categoryTabs = [
  { id: "all", label: "All Moments", icon: Sparkles },
  { id: "mentors", label: "Mentors & Leadership", icon: Users },
  { id: "industry", label: "Industry Leaders", icon: Briefcase },
  { id: "startups", label: "Startups & Innovation", icon: Rocket },
  { id: "visits", label: "Visits & Campus Life", icon: Globe }
];

const PGDMPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filtered images list
  const filteredImages = useMemo(() => {
    return galleryData.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Keyboard navigation for lightbox
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
            currentPage="PGDM Experience"
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
      <div className="relative py-8 sm:py-10 md:py-14 flex items-center justify-center">
        <div className="relative z-10 container mx-auto px-3 sm:px-6 text-center max-w-4xl min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass text-xs md:text-sm text-primary font-mono border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Academic & Professional Chapter
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight tracking-tight break-words"
          >
            <span className="text-gradient">PGDM</span> (Business Analytics & Operations)
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base xs:text-lg md:text-2xl text-secondary-foreground font-mono mb-2 font-medium break-words"
          >
            Jaipuria School of Business
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-primary font-mono mb-5 font-semibold"
          >
            2024 — 2026 | CGPA: 7.03
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed break-words"
          >
            Focus: Business Analytics, CRISP-DM methodology, high-dimensional data visualization, operational modeling, and predictive intelligence.
          </motion.p>
        </div>
      </div>

      {/* Details Section */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 pb-20 min-w-0">
        <div className="max-w-6xl mx-auto min-w-0">
          {/* Activities & Societies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-10 border border-primary/30 shadow-[0_0_25px_rgba(var(--glow)/0.15)] min-w-0"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-gradient flex items-center gap-2 break-words">
              <span>Activities & Societies</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Student Co-Ordinator Business Analytics Club",
                "Organized Power BI workshops & analytics hackathons",
                "Mentored students on data modeling & dashboard architecture",
                "Winner Talent Hunt 2024 (Poetry Competition)"
              ].map((activity, i) => (
                <motion.div
                  key={activity}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-card/40 border border-border/60 hover:border-primary/40 transition-colors"
                >
                  <span className="text-primary mt-0.5 text-base font-bold">◆</span>
                  <p className="text-secondary-foreground text-sm font-medium leading-relaxed">{activity}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Journey Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-8 mb-12 border border-primary/30 shadow-[0_0_25px_rgba(var(--glow)/0.15)]"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gradient">My PGDM Journey</h3>
            
            {/* Before PGDM & Transformation */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-xl bg-card/50 border border-border/80">
                <h4 className="text-base font-semibold text-primary mb-2 flex items-center gap-2">
                  <span>Before PGDM</span>
                </h4>
                <p className="text-secondary-foreground text-sm leading-relaxed">
                  Before stepping into Jaipuria School of Business, I brought <span className="text-primary font-semibold">1.5 years of industry experience</span> — 
                  1 year as a <span className="text-primary font-medium">Research Analyst</span> and 6 months as a <span className="text-primary font-medium">Chemical Engineer</span>. 
                  These roles taught me discipline and analytical thinking, but motivated me to master the art of turning raw data into strategic decision-making.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-card/50 border border-border/80">
                <h4 className="text-base font-semibold text-primary mb-2 flex items-center gap-2">
                  <span>The Transformation</span>
                </h4>
                <p className="text-secondary-foreground text-sm leading-relaxed">
                  Joining <span className="text-primary font-semibold">Jaipuria School of Business</span> in 
                  <span className="text-primary font-medium"> Business Analytics & Operations</span> revolutionized my perspective. 
                  I discovered how quantitative models tell deep stories, empower C-suite leaders, and optimize cross-functional operations with measurable outcomes.
                </p>
              </div>
            </div>

            {/* Gratitude - Director */}
            <div className="mb-8">
              <h4 className="text-base font-semibold text-primary mb-3">Special Thanks to Our Director</h4>
              <div className="p-5 md:p-6 rounded-xl bg-gradient-to-br from-primary/10 via-card/70 to-accent/10 border border-primary/30">
                <p className="text-secondary-foreground text-sm md:text-base leading-relaxed">
                  <span className="text-primary font-bold text-base md:text-lg">Dr. Tapan Kumar Nayak Sir</span>{" "}
                  <span className="text-muted-foreground text-xs md:text-sm font-mono">(Director)</span>
                  <br />
                  <span className="text-muted-foreground mt-2.5 block text-sm leading-relaxed">
                    Accessible, visionary, and deeply encouraging throughout my journey — guiding me on academic excellence and career strategy. 
                    His approachable mentorship created a thriving campus where students regularly interact with global dignitaries, 
                    such as the <span className="text-primary font-medium">HRBP of BMW</span>, <span className="text-primary font-medium">Indian Ambassadors</span>, and <span className="text-primary font-medium">unicorn startup founders</span>.
                  </span>
                </p>
              </div>
            </div>

            {/* Faculty Mentors */}
            <div>
              <h4 className="text-base font-semibold text-primary mb-3">Faculty Mentors Who Shaped My Analytics Journey</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-card/50 border border-border/80 hover:border-primary/30 transition-colors">
                  <p className="text-secondary-foreground leading-relaxed">
                    <span className="text-primary font-semibold text-base">Dr. Sumit Bhardwaj Sir</span>{" "}
                    <span className="text-muted-foreground text-xs font-mono block sm:inline">(Post-Doc Scientist, Lund University Sweden · Faculty & Mentor)</span>
                    <br />
                    <span className="text-muted-foreground text-sm mt-2 block leading-relaxed">
                      A teacher who guides like a mentor and clarifies doubts like a close confidant. 
                      He turned computational errors into learning breakthroughs and transformed raw logic into a real passion for data science.
                    </span>
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-card/50 border border-border/80 hover:border-primary/30 transition-colors">
                  <p className="text-secondary-foreground leading-relaxed">
                    <span className="text-primary font-semibold text-base">Nishant Singh Sir</span>{" "}
                    <span className="text-muted-foreground text-xs font-mono block sm:inline">(Faculty & Guide)</span>
                    <br />
                    <span className="text-muted-foreground text-sm mt-2 block leading-relaxed">
                      Continuous pillar of support throughout my academic tenure — providing guidance on coursework, practical research, and career progression.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Closing Quote */}
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
              <p className="text-secondary-foreground italic text-sm md:text-base">
                "This PGDM journey wasn't just about earning a degree — it was about discovering how data reveals hidden stories, 
                how analytics drives decisive strategy, and how the right mentors transform potential into purpose."
              </p>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* JOURNEY GALLERY SECTION - PROPERLY ARRANGED & ENHANCED */}
          {/* ============================================================ */}
          <motion.div
            id="journey-gallery"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-8 border border-primary/40 shadow-[0_0_30px_rgba(var(--glow)/0.2)] scroll-mt-24"
          >
            {/* Gallery Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/30">
                    Visual Archive
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {filteredImages.length} {filteredImages.length === 1 ? "Moment" : "Moments"}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gradient">Journey Gallery</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                  Memorable interactions with academic mentors, corporate leaders, startup founders, global immersion, and campus milestones.
                </p>
              </div>

              {/* View Switcher Controls */}
              <div className="flex items-center gap-2 self-start md:self-auto bg-card/60 p-1 rounded-xl border border-border">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                  title="Uniform Grid View"
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                  <span>Card Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === "masonry"
                      ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                  title="Dynamic Masonry View"
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>Masonry</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="space-y-4 mb-8">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide text-xs">
                {categoryTabs.map((tab) => {
                  const Icon = tab.icon;
                  const count =
                    tab.id === "all"
                      ? galleryData.length
                      : galleryData.filter((item) => item.category === tab.id).length;
                  const isActive = selectedCategory === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-medium border ${
                        isActive
                          ? "bg-primary/15 text-primary border-primary shadow-[0_0_12px_rgba(var(--glow)/0.25)] font-semibold"
                          : "bg-card/40 text-muted-foreground border-border/80 hover:text-foreground hover:border-primary/40 hover:bg-card/80"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                      <span
                        className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, company, or keyword (e.g. BMW, Singapore, Director)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 rounded-xl bg-card/50 border border-border/80 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-xs md:text-sm text-foreground placeholder:text-muted-foreground/70 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Empty State */}
            {filteredImages.length === 0 && (
              <div className="py-16 text-center rounded-2xl border border-dashed border-border/80 p-8 bg-card/20">
                <Search className="w-10 h-10 text-muted-foreground/60 mx-auto mb-3" />
                <h4 className="text-base font-semibold text-foreground mb-1">No moments matched your criteria</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your search terms or selecting another category tab.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Gallery Views */}
            {filteredImages.length > 0 && viewMode === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="group glass rounded-2xl overflow-hidden border border-border/80 hover:border-primary/50 transition-all duration-300 flex flex-col hover:shadow-[0_0_25px_rgba(var(--glow)/0.25)] hover:-translate-y-1 cursor-pointer"
                    onClick={() => setActiveModalIndex(index)}
                  >
                    {/* Image Box */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/60 flex items-center justify-center">
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />

                      {/* Tag Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide bg-background/80 backdrop-blur-md text-primary border border-primary/30 shadow-sm">
                          {item.tag}
                        </span>
                      </div>

                      {/* Zoom Indicator */}
                      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="w-8 h-8 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-md">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Content Box */}
                    <div className="p-4 md:p-5 flex-1 flex flex-col justify-between bg-card/40">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-primary">
                            {item.categoryLabel}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-xs font-medium text-secondary-foreground mt-1 line-clamp-1">
                          {item.role}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground group-hover:text-primary transition-colors">
                        <span className="font-mono">Click to view full image</span>
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredImages.length > 0 && viewMode === "masonry" && (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredImages.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="break-inside-avoid group glass rounded-2xl overflow-hidden border border-border/80 hover:border-primary/50 transition-all duration-300 flex flex-col hover:shadow-[0_0_25px_rgba(var(--glow)/0.25)] hover:-translate-y-1 cursor-pointer"
                    onClick={() => setActiveModalIndex(index)}
                  >
                    {/* Natural Ratio Container */}
                    <div className="relative w-full bg-black/60 overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-auto object-contain max-h-[380px] rounded-lg group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide bg-background/80 backdrop-blur-md text-primary border border-primary/30">
                          {item.tag}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="w-8 h-8 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-md">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-card/40">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-primary block mb-1">
                        {item.categoryLabel}
                      </span>
                      <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs font-medium text-secondary-foreground mt-1">
                        {item.role}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LIGHTBOX MODAL WITH NAVIGATION & METADATA */}
      {/* ============================================================ */}
      <AnimatePresence>
        {currentModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setActiveModalIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full max-h-[95vh] flex flex-col rounded-2xl overflow-hidden glass border border-primary/40 shadow-[0_0_50px_rgba(var(--glow)/0.4)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-card/80">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-primary/15 text-primary border border-primary/30">
                    {currentModalItem.tag}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {activeModalIndex! + 1} of {filteredImages.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalIndex(null)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Display */}
              <div className="relative flex-1 bg-black/90 flex items-center justify-center min-h-[300px] max-h-[65vh] p-2 sm:p-4 overflow-hidden select-none">
                <img
                  src={currentModalItem.src}
                  alt={currentModalItem.title}
                  className="max-h-[62vh] max-w-full object-contain rounded-lg"
                />

                {/* Left Navigation Arrow */}
                {filteredImages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-primary text-white hover:text-primary-foreground border border-white/20 transition-all backdrop-blur-sm"
                    title="Previous (Left Arrow)"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}

                {/* Right Navigation Arrow */}
                {filteredImages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-primary text-white hover:text-primary-foreground border border-white/20 transition-all backdrop-blur-sm"
                    title="Next (Right Arrow)"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}
              </div>

              {/* Modal Bottom Metadata Card */}
              <div className="p-4 sm:p-6 bg-card/90 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {currentModalItem.title}
                  </h3>
                  <span className="text-xs font-mono text-primary font-medium">
                    {currentModalItem.categoryLabel}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-secondary-foreground font-medium mb-1">
                  {currentModalItem.role}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {currentModalItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PGDMPage;
