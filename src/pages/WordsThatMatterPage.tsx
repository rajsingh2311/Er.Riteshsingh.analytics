import { ArrowLeft, ArrowRight, ChevronRight, Linkedin, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";

const testimonials = [
  {
    name: "Anita Nigam",
    designation: "Co-founder at WTF Gyms and Fitness",
    focus: ["Reporting Quality", "Turnaround", "Stakeholder Trust"],
    quote:
      "Ritesh handled multiple HR data projects, maintained accuracy in reporting, and supported operational processes with a high level of dedication. His ability to adapt quickly, take ownership, and deliver work on time made him a valuable part of the team.",
    image: `${import.meta.env.BASE_URL}images/Anita%20nigam.png`,
    linkedin: "https://www.linkedin.com/in/anita-nigam-b686944b/",
  },
  {
    name: "Ashu Arora Jha",
    designation: "HR Manager | People Strategy | Ex HR Head Yes Madam, WTF GYMs",
    focus: ["Responsibility", "Dedication", "Hard Work"],
    quote:
      "Ritesh was a responsible, dedicated & hard-working guy.",
    image: `${import.meta.env.BASE_URL}images/Aashu%20Arora.png`,
    linkedin: "https://www.linkedin.com/in/ashu-arora-jha-106832106/",
  },
  {
    name: "Aditya Ranjan Jha",
    designation: "HR Recruiter | Talent Acquisition Specialist",
    focus: ["Analytical Skills", "Attention to Detail", "Actionable Insights"],
    quote:
      "I had the opportunity to work with Ritesh Singh during his internship as a Business Analyst at WTF Gyms. He quickly impressed us with his analytical skills, attention to detail, and ability to turn data into clear, actionable insights. His work on member engagement analysis and reporting added real value to our decision-making. Ritesh is proactive, professional, and a quick learner — a strong asset to any team. I highly recommend him.",
    image: `${import.meta.env.BASE_URL}images/Aditya.png`,
    linkedin: "https://www.linkedin.com/in/aditya-ranjan-jha-38b764232/",
  },
  {
    name: "Pawan Kumar Singh",
    designation: "Co-Founder at Cuatro Labs | Ex Operation Manager WTF Gyms, Yes Madam",
    focus: ["Problem-Solving", "Leadership", "Communication"],
    quote:
      "I wholeheartedly recommend Ritesh for any future opportunities. I have had the pleasure of working with Ritesh, and I can confidently attest to his exceptional skills, work ethic, and dedication. Ritesh possesses a unique combination of technical expertise, creativity, and interpersonal skills that make him an invaluable asset to any team. His ability to get the task done has been impressive, and his passion for the company is evident in everything he does. One of Ritesh's greatest strengths is his problem-solving, leadership, communication. He consistently demonstrates a willingness to learn, adapt, and grow, and his positive attitude makes him a joy to work with. I highly recommend Ritesh for any opportunity.",
    image: `${import.meta.env.BASE_URL}images/Pawan%20Sir.png`,
    linkedin: "https://www.linkedin.com/in/pawan-kumar-singh-4437a0112/",
  },
  {
    name: "Dheeraj",
    designation: "System Engineer at TCS",
    focus: ["Problem-Solving", "Leadership", "Collaboration"],
    quote:
      "I have had the pleasure of knowing Er. Ritesh Singh, a highly dedicated and skilled professional. His problem-solving ability, leadership qualities, and collaborative nature make him stand out. He is committed to excellence, continuously learning, and always supporting his team. Truly an asset to any organization.",
    image: `${import.meta.env.BASE_URL}images/Dheeraj.png`,
    linkedin: "https://www.linkedin.com/in/draj1002/",
  },
  {
    name: "Rohit Kumar Rai",
    designation: "AI/LLM Analyst at Innodata",
    focus: ["Dedication", "Technical Expertise", "Innovation"],
    quote:
      "I had the opportunity to work closely with Er. Ritesh Singh, and I was truly impressed by his dedication, technical expertise, and leadership qualities. He has a remarkable ability to approach complex problems with clarity and provide effective solutions. What I admire the most is his collaborative nature and positive attitude, which not only make him a reliable professional but also an inspiring team player. I highly recommend Er. Ritesh Singh to any organization or project that values excellence, innovation, and commitment. He will undoubtedly be a great asset wherever he contributes.",
    image: `${import.meta.env.BASE_URL}images/Rohit%20Rai.png`,
    linkedin: "https://www.linkedin.com/in/rohitrai13/",
  },
  {
    name: "Shivam Singh",
    designation: "Business Development Management Trainee at Asian Paints",
    focus: ["Excel", "Power BI", "SQL"],
    quote:
      "Ritesh is a highly skilled Business Analyst with strong expertise in Excel, Power BI, SQL, and automation tools. His analytical mindset and ability to turn data into actionable insights make him an asset to any organization. A dedicated and collaborative professional.",
    image: `${import.meta.env.BASE_URL}images/Shivam%20Singh.png`,
    linkedin: "https://www.linkedin.com/in/shivam-singh-4935a8245/",
  },
  {
    name: "Kaushal Garud",
    designation: "Senior HR Executive | Talent Acquisition & HR Operations @ Anytime Fitness | Ex. WTF Gyms",
    focus: ["Analytical Skills", "Data Reporting", "Dashboard Creation"],
    quote:
      "It gives me great pleasure to recommend Ritesh Singh, who recently completed his internship as a Data Analyst at WTF Gyms. During his tenure, Ritesh demonstrated exceptional analytical skills, a strong grasp of data tools, and an eagerness to learn and contribute beyond expectations. Ritesh played a vital role in helping us streamline our data reporting processes, visualize key business metrics, and generate actionable insights that supported decision-making across departments. His ability to handle large datasets, create impactful dashboards, and communicate findings clearly made a notable impact on our operations. He consistently showcased professionalism, a problem-solving mindset, and a positive attitude—making him an asset to any team. I am confident that Ritesh will continue to excel in any data-driven role he pursues. I highly recommend him for future opportunities and wish him all the best in his career journey.",
    image: `${import.meta.env.BASE_URL}images/Kausal%20Garud.png`,
    linkedin: "https://www.linkedin.com/in/kaushal-garud-768742186/",
  },
  {
    name: "Robin Kumar",
    designation: "Senior Manager Operations at Seth Anandram Jaipuria Group of Schools",
    focus: ["Analytical Skills", "Data Management", "Decision Support"],
    quote:
      "I have worked alongside Er. Ritesh Singh at Seth Anandram Jaipuria Group of Educational Institutions. Although I have not directly managed him, I have observed his strong analytical skills and structured approach to data management and reporting. Ritesh is detail-oriented, reliable, and capable of converting complex data into meaningful insights that support informed decision-making. He is professional, supportive, and committed to delivering quality work. I wish him continued success in his career.",
    image: `${import.meta.env.BASE_URL}images/Robin%20Sir.png`,
    linkedin: "https://www.linkedin.com/in/robin-kumar-67b2a4162/",
  },
];

const WordsThatMatterPage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = testimonials[activeIndex];

  // Shuffle testimonials once on mount for the "All Testimonials" section
  const [shuffledTestimonials] = useState(() => {
    const arr = [...testimonials];
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

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
          <span className="text-primary font-semibold">Words That Matter</span>
        </div>
      </div>

      <section className="relative pt-[7rem] md:pt-[7.5rem] pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <button
            onClick={() => navigate("/", { state: { scrollTo: "about-detailed" } })}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to About
          </button>

          <div className="text-center mb-3 md:mb-4">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">Testimonials</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-3">
              Words That <span className="text-gradient">Matter</span>
            </h1>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="glass rounded-2xl border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:border-white hover:bg-primary/10 hover:scale-[1.05] hover:z-50 p-3 md:p-4 relative overflow-hidden transition-all duration-300">
              <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
              <div className="pointer-events-none absolute -left-20 -bottom-16 w-64 h-64 rounded-full bg-gradient-brand opacity-15 blur-3xl" />

              <div className="relative z-10 grid lg:grid-cols-[260px_1fr] gap-4 md:gap-6">
                <a
                  href={activeItem.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-primary/20 bg-background/40 p-3 block group"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img src={activeItem.image} alt={activeItem.name} className="w-full h-44 md:h-48 object-contain bg-background/60 rounded-lg transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <Linkedin className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="font-semibold text-foreground">{activeItem.name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{activeItem.designation}</p>
                  </div>
                </a>

                <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent p-4 md:p-5 flex">
                  <div className="my-auto w-full">
                    <div className="inline-flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded-full bg-primary/15 text-primary mb-3">
                      <Quote className="w-3.5 h-3.5" />
                      Spotlight Feedback
                    </div>
                    <p className="text-base md:text-xl leading-relaxed text-foreground/95 text-justify">"{activeItem.quote}"</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeItem.focus.map((topic) => (
                        <span
                          key={topic}
                          className="text-[11px] md:text-xs font-mono px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-4 md:mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="w-9 h-9 rounded-full border border-primary/30 bg-background/60 flex items-center justify-center text-primary"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    className="w-9 h-9 rounded-full border border-primary/30 bg-background/60 flex items-center justify-center text-primary"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 min-w-[220px] text-center px-2">
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    A live testimonial spotlight from people who have worked closely with me.
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                    {[
                      "Trusted by Mentors",
                      "Leadership Feedback",
                      "Collaboration Highlights",
                    ].map((item) => (
                      <span
                        key={item}
                        className="text-[10px] md:text-xs font-mono px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-[74px]" />
              </div>
            </div>
          </div>

          {/* All Testimonials Section */}
          <div className="max-w-6xl mx-auto mt-8 md:mt-10">
            <div className="text-center mb-5 md:mb-6">
              <h2 className="text-xl md:text-3xl font-bold">
                All <span className="text-gradient">Testimonials</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Scroll down to read each feedback in detail.
              </p>
            </div>

            <div className="space-y-5 md:space-y-6">
              {shuffledTestimonials.map((item, index) => (
                <article
                  key={`${item.name}-manual-${index}`}
                  className="glass rounded-2xl border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] hover:border-white hover:bg-primary/10 hover:scale-[1.15] hover:z-50 overflow-hidden transition-all duration-300"
                >
                  <div className="grid md:grid-cols-[280px_1fr]">
                    {/* Photo Section */}
                    <a
                      href={item.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background/40 border-primary/20 p-4 md:border-r border-b md:border-b-0 block group"
                    >
                      <div className="relative overflow-hidden rounded-lg w-44 h-44 mx-auto">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain bg-background/60 rounded-lg transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <Linkedin className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <div className="mt-3 text-center md:text-left">
                        <p className="font-semibold text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.designation}</p>
                      </div>
                    </a>

                    {/* Testimonial Section */}
                    <div className="bg-gradient-to-r from-primary/10 to-transparent p-5 md:p-6 flex">
                      <div className="my-auto">
                        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-primary/20 text-primary mb-4">
                          <Quote className="w-3.5 h-3.5" />
                          Testimonial
                        </div>
                        <p className="text-base md:text-xl leading-relaxed text-foreground/95 italic text-justify">
                          "{item.quote}"
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.focus.map((topic) => (
                            <span
                              key={`${item.name}-${topic}`}
                              className="text-xs font-mono px-3 py-1 rounded-full border border-primary/30 text-muted-foreground"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WordsThatMatterPage;
