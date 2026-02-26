import { ArrowLeft, ArrowRight, ChevronRight, Handshake, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";

const mentors = [
  {
    name: "Mentor Name",
    designation: "Business Analytics Mentor",
    area: "Problem Framing",
    guidance:
      "Helped me shape raw business questions into measurable analytics goals and outcome-focused dashboards.",
    strengths: ["Structured Thinking", "Business Context", "Decision Mapping"],
    image: `${import.meta.env.BASE_URL}images/Ritesh%20image.JPG`,
  },
  {
    name: "Mentor Name",
    designation: "Industry Mentor",
    area: "Execution Strategy",
    guidance:
      "Guided me on execution discipline, stakeholder communication, and translating analytics into action plans.",
    strengths: ["Execution", "Communication", "Stakeholder Alignment"],
    image: `${import.meta.env.BASE_URL}images/Ritesh%20image.JPG`,
  },
  {
    name: "Mentor Name",
    designation: "Technical Mentor",
    area: "Data Craft",
    guidance:
      "Improved my storytelling in dashboards, query thinking, and practical automation for business workflows.",
    strengths: ["Dashboard Storytelling", "SQL Thinking", "Automation"],
    image: `${import.meta.env.BASE_URL}images/Ritesh%20image.JPG`,
  },
];

const MyMentorsPage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMentor = mentors[activeIndex];

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % mentors.length);
  };

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + mentors.length) % mentors.length);
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
            <span className="text-primary font-mono text-sm tracking-wider uppercase">Guidance</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-3">
              My <span className="text-gradient">Mentors</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-2xl mx-auto">
              People who shaped my approach to analytics, delivery, and professional growth.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {["Mentorship Impact", "Career Guidance", "Execution Discipline"].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  <Star className="w-3.5 h-3.5" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="glass rounded-2xl border border-primary/20 p-4 md:p-5 relative overflow-hidden">
              <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-brand opacity-20 blur-3xl" />

              <div className="relative z-10 grid lg:grid-cols-[260px_1fr] gap-4 md:gap-6">
                  <div className="rounded-xl border border-primary/20 bg-background/40 p-3">
                    <img src={activeMentor.image} alt={activeMentor.name} className="w-full h-56 object-cover rounded-lg" />
                    <div className="mt-3">
                      <p className="font-semibold text-foreground">{activeMentor.name}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{activeMentor.designation}</p>
                      <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-mono px-2 py-1 rounded-full bg-primary/10 text-primary">
                        <Sparkles className="w-3 h-3" />
                        {activeMentor.area}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent p-5 md:p-7 flex">
                    <div className="my-auto w-full">
                      <div className="inline-flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded-full bg-primary/15 text-primary mb-3">
                        <Handshake className="w-3.5 h-3.5" />
                        Mentor Guidance
                      </div>
                      <p className="text-lg md:text-2xl leading-relaxed text-foreground/95">{activeMentor.guidance}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeMentor.strengths.map((topic) => (
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

                <div className="flex items-center gap-2 overflow-x-auto max-w-full">
                  {mentors.map((mentor, index) => (
                    <button
                      key={`${mentor.name}-thumb-${index}`}
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-center gap-2 rounded-full px-2.5 py-1.5 border transition-all whitespace-nowrap ${
                        activeIndex === index
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background/40 hover:border-primary/40"
                      }`}
                    >
                      <img src={mentor.image} alt={mentor.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs font-mono text-foreground/90">{mentor.designation}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyMentorsPage;
