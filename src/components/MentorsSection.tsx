import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";

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

const MentorsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="mentors" className="py-24 pt-20 md:pt-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Gratitude</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            My <span className="text-gradient">Mentors</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button
            onClick={() => navigate("/my-mentors")}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            View All Mentors
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MentorsSection;
