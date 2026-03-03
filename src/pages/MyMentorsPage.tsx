import { ArrowLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";

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

      <div className="fixed top-16 left-0 right-0 z-40 glass border-b">
        <div className="container mx-auto px-4 md:px-6 h-11 flex items-center gap-2 text-sm">
          <button
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Home
          </button>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <button
            onClick={() => navigate("/", { state: { scrollTo: "about-detailed" } })}
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            About
          </button>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-primary font-semibold">My Mentors</span>
        </div>
      </div>

      <section className="relative pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <button
            onClick={() => navigate("/", { state: { scrollTo: "about-detailed" } })}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to About
          </button>

          <div className="text-center mb-10 md:mb-12">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">Gratitude</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-3">
              My <span className="text-gradient">Mentors</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-2xl mx-auto">
              People who shaped my approach to analytics, delivery, and professional growth.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass rounded-xl overflow-hidden group border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:border-white hover:bg-primary/10 hover:scale-[1.5] hover:z-50 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-3 text-center border-t border-primary/20">
                  <h3 className="text-sm md:text-base font-semibold text-foreground">{mentor.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{mentor.designation}</p>
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
