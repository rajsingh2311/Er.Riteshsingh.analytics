import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import ParticleField from "@/components/ParticleField";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const PGDMPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleField />
      
      {/* Header */}
      <div className="sticky top-0 z-50 glass backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <motion.button
            onClick={() => navigate("/section/education")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 md:w-5 h-4 md:h-5" />
            <span className="hidden sm:inline text-xs md:text-sm">Back to Education</span>
          </motion.button>
          <ThemeSwitcher />
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="relative z-40 bg-background/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-2 md:py-3 flex items-center overflow-x-auto text-xs md:text-sm">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-primary transition-colors font-mono whitespace-nowrap"
          >
            Portfolio
          </motion.button>
          <span className="mx-1 md:mx-2 text-muted-foreground">/</span>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/section/education")}
            className="text-muted-foreground hover:text-primary transition-colors font-mono whitespace-nowrap"
          >
            Education
          </motion.button>
          <span className="mx-1 md:mx-2 text-muted-foreground">/</span>
          <span className="text-primary font-mono font-semibold whitespace-nowrap">PGDM</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-8 flex items-center justify-center">
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              My Journey
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
          >
            <span className="text-gradient">PGDM</span> (Business Analytics & Operation)
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary-foreground font-mono mb-2"
          >
            Jaipuria School of Business
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-primary font-mono mb-6"
          >
            2024 — 2026 | CGPA: 7.03
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base text-muted-foreground max-w-2xl mx-auto"
          >
            Focus: Business Analytics, CRISP‑DM methodology, high-dimensional data visualization, predictive analytics.
          </motion.p>
        </div>
      </div>

      {/* Details Section */}
      <div className="relative z-10 container mx-auto px-6 -mt-8">
        <div className="max-w-4xl mx-auto">
          {/* Activities */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 mb-12 border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-6 text-gradient">Activities & Societies</h3>
            <div className="space-y-3">
              {["Student Co-Ordinator Business Analytics Club", "Organized Power BI workshops & hackathons", "Mentored students on analytics projects & dashboard design", "Winner Talent Hunt 2024 (Poetry Competition)"].map((activity, i) => (
                <motion.div
                  key={activity}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-primary">◆</span>
                  <p className="text-secondary-foreground">{activity}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Journey Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 mb-12 border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-6 text-gradient">My PGDM Journey</h3>
            
            {/* Before PGDM */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-primary mb-3">Before PGDM</h4>
              <p className="text-secondary-foreground leading-relaxed">
                Before stepping into Jaipuria School of Business, I carried <span className="text-primary font-semibold">1.5 years of professional experience</span> — 
                1 year as a <span className="text-primary">Research Analyst</span> and 6 months as a <span className="text-primary">Chemical Engineer</span>. 
                These roles taught me discipline and analytical thinking, but something was missing — the power to turn raw data into decisions.
              </p>
            </div>

            {/* The Transformation */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-primary mb-3">The Transformation</h4>
              <p className="text-secondary-foreground leading-relaxed">
                When I landed at <span className="text-primary font-semibold">Jaipuria School of Business</span> with a specialization in 
                <span className="text-primary font-semibold"> Business Analytics & Operations</span>, it completely changed my perspective on how to see the world. 
                I discovered how <span className="text-primary">numbers can drive decision-making</span>, how data tells deep-dive stories waiting to be uncovered, 
                and how we can empower decision-makers with insights that truly matter.
              </p>
            </div>

            {/* Gratitude - Director */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-primary mb-4">Special Thanks to Our Director</h4>
              
              {/* Director */}
              <div className="p-5 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30">
                <p className="text-secondary-foreground leading-relaxed">
                  <span className="text-primary font-semibold text-lg">Dr. Tapan Kumar Nayak Sir</span> <span className="text-muted-foreground text-sm">(Director)</span>
                  <br />
                  <span className="text-muted-foreground mt-2 block">
                    For being accessible throughout my journey — guiding me on both personal and professional matters. 
                    In an era where people with small positions often behave rudely, his humility and approachability made all the difference. 
                    He created an environment where students don't just learn but thrive — sharing ideas and learning from top industry experts 
                    like <span className="text-primary">HRBP of BMW</span>, <span className="text-primary">Indian Ambassadors</span>, and <span className="text-primary">renowned Co-founders</span>.
                  </span>
                </p>
              </div>
            </div>

            {/* Faculty Mentors */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary mb-3">Faculty Mentors Who Shaped My Journey</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Dr. Sumit Bhardwaj */}
                <div className="p-5 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-secondary-foreground leading-relaxed">
                    <span className="text-primary font-semibold">Dr. Sumit Bhardwaj Sir</span> <span className="text-muted-foreground text-sm">(Faculty & Mentor)</span>
                    <br />
                    <span className="text-muted-foreground mt-2 block">
                      A teacher who teaches like a mentor and solves queries like a best friend. 
                      He turned my errors into lessons and transformed logic into passion. 
                      His guidance shaped not just my technical skills but my entire approach to analytics.
                    </span>
                  </p>
                </div>

                {/* Nishant Singh */}
                <div className="p-5 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-secondary-foreground leading-relaxed">
                    <span className="text-primary font-semibold">Nishant Singh Sir</span> <span className="text-muted-foreground text-sm">(Faculty & Guide)</span>
                    <br />
                    <span className="text-muted-foreground mt-2 block">
                      Always guided me throughout my journey — from academics to career decisions. 
                      His consistent support and mentorship have been invaluable.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Closing */}
            <div className="mt-8 p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30">
              <p className="text-secondary-foreground italic text-center">
                "This PGDM journey wasn't just about earning a degree — it was about discovering how numbers can tell stories, 
                how data can drive decisions, and how the right mentors can transform your entire perspective."
              </p>
            </div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-6 text-gradient">Journey Gallery</h3>
            <div className="masonry-gallery" style={{ columnCount: 3, columnGap: '1.5rem' }}>
              {([
                { src: `${import.meta.env.BASE_URL}images/PGDM/Director%20Sir.jpeg`, caption: "Director Jaipuria School of Business - Dr. Tapan Kumar Nayak Sir" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/@Director%20sir%20in%20talent%20hunt.jpeg`, caption: "With Director Sir at Talent Hunt 2024" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/Sumit%20Sir.jpeg`, caption: "Dr. Sumit Bhardwaj Sir - Post Doc Scientist, Lund University Sweden" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/@BA.jpeg`, caption: "With Nishant Singh Sir" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/Team%20JSB%20AT%20SINGHAPUR.jpeg`, caption: "Team JSB with Director Sir @ Singapore" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/Team%20JSB.jpeg`, caption: "Team JSB with Director Sir @ Scintilla 2025" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/Prof.%20Ashok%20Advani%20sir.jpeg`, caption: "With Prof. Ashok Advani Sir - Last class of Supply Chain & Logistics Management" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/DeepK%20Vohara%20Sir.jpeg`, caption: "IFS Deepak Vohra Sir - Indian Ambassador" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/Akshay%20Rakshit%20sit%20HRBP%20BMW.jpeg`, caption: "Akshay Rakshit Sir - HRBP BMW" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/PW%20Image.jpeg`, caption: "With GM & Director PW School of Startup - Soumen Banerjee Sir & Sudhanshu Agarwal Sir" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/PW%20Image%202.jpeg`, caption: "With Director PW School of Startup - Sudhanshu Agarwal Sir" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/PW%20image%203.jpeg`, caption: "General Manager PW School of Startup - Soumen Banerjee Sir" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/Rishabh%20sir.jpeg`, caption: "Rishabh Sir - Category Head Swiggy (then Blinkit)" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/Rohan%20sudan%20sr.jpeg`, caption: "Rohan Sudan Sir - India Campus Recruitment Head, WNS" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/Nakshatra%20Sachdeva%20sir.jpeg`, caption: "Nakshatra Sachdeva - Theater Artist" },
                { src: `${import.meta.env.BASE_URL}images/PGDM/@Cocacola%20factory.jpeg`, caption: "@ The Happiness Factory - Coca-Cola" },
              ]).map((image, i) => (
                <div key={i} style={{ breakInside: 'avoid', marginBottom: '1.5rem' }}>
                  <div
                    className="rounded-lg overflow-hidden border border-white/10 bg-black flex items-center justify-center cursor-pointer group relative"
                    style={{ width: '100%', background: '#111' }}
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <img 
                      src={image.src} 
                      alt={image.caption}
                      className="w-full h-auto object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      style={{ display: 'block', margin: '0 auto', background: 'transparent' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
                      <span className="text-white text-xs">Click to enlarge</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors text-center mt-2">
                    {image.caption}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[85vh] object-contain rounded-lg border-4 border-primary shadow-[0_0_40px_rgba(139,92,246,0.8)] bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PGDMPage;
