import { motion } from "framer-motion";

const mentors = [
  {
    name: "Anita Nigam",
    role: "Co-founder at WTF Gyms and Fitness",
    image: `${import.meta.env.BASE_URL}images/Anita%20nigam.png`,
  },
  {
    name: "Ashu Arora Jha",
    role: "HR Manager | People Strategy | Ex HR Head Yes Madam, WTF GYMs",
    image: `${import.meta.env.BASE_URL}images/Aashu%20Arora.png`,
  },
  {
    name: "Pawan Kumar Singh",
    role: "Co-Founder at Cuatro Labs | Ex Operation Manager WTF Gyms, Yes Madam",
    image: `${import.meta.env.BASE_URL}images/Pawan%20Sir.png`,
  },
  {
    name: "Dheeraj",
    role: "System Engineer at TCS",
    image: `${import.meta.env.BASE_URL}images/Dheeraj.png`,
  },
];

const MentorsSection = () => {
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {mentors.map((mentor, index) => (
            <motion.article
              key={`${mentor.name}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 border-l-4 border-primary">
                <h3 className="text-lg font-bold text-foreground">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{mentor.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorsSection;
