import { ArrowLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";
import SectionNavigator from "@/components/SectionNavigator";

const mentorsData = [
  {
    name: "Anita Nigam",
    designation: "Co-founder at WTF Gyms and Fitness",
    image: `${import.meta.env.BASE_URL}images/Anita%20nigam.png`,
  },
  {
    name: "Ashu Arora Jha",
    designation: "HR Manager | People Strategy | Ex HR Head Yes Madam, WTF GYMs",
    image: `${import.meta.env.BASE_URL}images/Aashu%20Arora.png`,
  },
  {
    name: "Pawan Kumar Singh",
    designation: "Co-Founder at Cuatro Labs | Ex Operation Manager WTF Gyms, Yes Madam",
    image: `${import.meta.env.BASE_URL}images/Pawan%20Sir.png`,
  },
  {
    name: "Dheeraj",
    designation: "System Engineer at TCS",
    image: `${import.meta.env.BASE_URL}images/Dheeraj.png`,
  },
  {
    name: "Kaushal Garud",
    designation: "Senior HR Executive | Talent Acquisition & HR Operations @ Anytime Fitness | Ex. WTF Gyms",
    image: `${import.meta.env.BASE_URL}images/Kausal%20Garud.png`,
  },
  {
    name: "Robin Kumar",
    designation: "Senior Manager Operations at Seth Anandram Jaipuria Group of Schools",
    image: `${import.meta.env.BASE_URL}images/Robin%20Sir.png`,
  },
  {
    name: "Dr. Aman Kumar",
    designation: "Associate Professor, Department Of Chemical Engineering, Chaudhary Charan Singh University Meerut",
    image: `${import.meta.env.BASE_URL}images/Aman%20Sir.jpeg`,
  },
  {
    name: "Dr. Gaurav Singh Pundir",
    designation: "Head of Department, Department of Chemical Engineering, Chaudhary Charan Singh University Meerut",
    image: `${import.meta.env.BASE_URL}images/Gaurav%20Sir.jpeg`,
  },
];

const MyMentorsPage = () => {
  const navigate = useNavigate();

  // Shuffle mentors once on mount
  const [mentors] = useState(() => {
    const arr = [...mentorsData];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleField />
      <Navbar />

      <div className="fixed top-16 left-0 right-0 z-40">
        <SectionNavigator
          mode="page"
          currentPage="My Mentors & Guides"
          parentPage={{ label: "About", to: "/section/about" }}
          backTo="/section/about"
          backLabel="Back to About"
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "About", to: "/section/about" },
            { label: "My Mentors" }
          ]}
        />
      </div>

      <section className="relative pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden">
        <div className="container mx-auto px-3 sm:px-6">
          <button
            onClick={() => navigate("/", { state: { scrollTo: "about-detailed" } })}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mb-5 sm:mb-6"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Back to About</span>
          </button>

          <div className="text-center mb-8 sm:mb-12">
            <span className="text-primary font-mono text-xs sm:text-sm tracking-wider uppercase">Gratitude</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3 break-words">
              My <span className="text-gradient">Mentors</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 max-w-2xl mx-auto px-2 leading-relaxed">
              People who shaped my approach to analytics, delivery, and professional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-6 max-w-5xl mx-auto">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass rounded-xl overflow-hidden group border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10 transition-all duration-300 min-w-0 flex flex-col justify-between"
              >
                <div className="aspect-square overflow-hidden bg-muted/40">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center border-t border-primary/20 flex-1 flex flex-col justify-center">
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-foreground break-words leading-snug">{mentor.name}</h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 break-words line-clamp-3">{mentor.designation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyMentorsPage;
