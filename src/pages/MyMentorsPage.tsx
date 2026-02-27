import { ArrowLeft, ChevronRight, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";

const mentors = [
  {
    name: "Anita Nigam",
    designation: "Co-founder at WTF Gyms and Fitness",
    image: `${import.meta.env.BASE_URL}images/Anita%20nigam.png`,
    linkedin: "https://www.linkedin.com/in/anita-nigam/",
  },
  {
    name: "Ashu Arora Jha",
    designation: "HR Manager | People Strategy | Ex HR Head Yes Madam, WTF GYMs",
    image: `${import.meta.env.BASE_URL}images/Aashu%20Arora.png`,
    linkedin: "https://www.linkedin.com/in/ashu-arora-jha/",
  },
  {
    name: "Pawan Kumar Singh",
    designation: "Co-Founder at Cuatro Labs | Ex Operation Manager WTF Gyms, Yes Madam",
    image: `${import.meta.env.BASE_URL}images/Pawan%20Sir.png`,
    linkedin: "https://www.linkedin.com/in/pawan-kumar-singh/",
  },
  {
    name: "Dheeraj",
    designation: "System Engineer at TCS",
    image: `${import.meta.env.BASE_URL}images/Dheeraj.png`,
    linkedin: "https://www.linkedin.com/in/dheeraj/",
  },
];

const MyMentorsPage = () => {
  const navigate = useNavigate();

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

      <section className="relative pt-32 md:pt-36 pb-12 md:pb-16">
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

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass rounded-xl overflow-hidden group"
              >
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <Linkedin className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-4 text-center border-t border-primary/20">
                    <h3 className="text-base md:text-lg font-semibold text-foreground">{mentor.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{mentor.designation}</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyMentorsPage;
