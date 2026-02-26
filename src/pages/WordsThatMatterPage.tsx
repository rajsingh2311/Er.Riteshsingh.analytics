import { ArrowLeft, ArrowRight, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";

const testimonials = [
  {
    name: "Mentor Name",
    designation: "Business Analytics Mentor",
    focus: ["Business Clarity", "Decision Support", "Ownership"],
    quote:
      "Ritesh consistently converts complex datasets into clear business narratives and actionable decisions.",
    image: `${import.meta.env.BASE_URL}images/Ritesh%20image.JPG`,
  },
  {
    name: "Anita Nigam",
    designation: "Co-founder at WTF Gyms and Fitness",
    focus: ["Reporting Quality", "Turnaround", "Stakeholder Trust"],
    quote:
      "Ritesh handled multiple HR data projects, maintained accuracy in reporting, and supported operational processes with a high level of dedication. His ability to adapt quickly, take ownership, and deliver work on time made him a valuable part of the team.",
    image: `${import.meta.env.BASE_URL}images/Anita%20nigam.png`,
  },
  {
    name: "Manager Name",
    designation: "Project Manager",
    focus: ["Insight Storytelling", "Empathy", "Actionable Outputs"],
    quote:
      "Ritesh communicates insights with precision and empathy, making analytics outcomes easy to act upon.",
    image: `${import.meta.env.BASE_URL}images/Ritesh%20image.JPG`,
  },
];

const WordsThatMatterPage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = testimonials[activeIndex];

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
            <div className="glass rounded-2xl border border-primary/20 p-3 md:p-4 relative overflow-hidden">
              <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
              <div className="pointer-events-none absolute -left-20 -bottom-16 w-64 h-64 rounded-full bg-gradient-brand opacity-15 blur-3xl" />

              <div className="relative z-10 grid lg:grid-cols-[260px_1fr] gap-4 md:gap-6">
                  <div className="rounded-xl border border-primary/20 bg-background/40 p-3">
                    <img src={activeItem.image} alt={activeItem.name} className="w-full h-44 md:h-48 object-contain bg-background/60 rounded-lg" />
                    <div className="mt-3">
                      <p className="font-semibold text-foreground">{activeItem.name}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{activeItem.designation}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent p-4 md:p-5 flex">
                    <div className="my-auto w-full">
                      <div className="inline-flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded-full bg-primary/15 text-primary mb-3">
                        <Quote className="w-3.5 h-3.5" />
                        Spotlight Feedback
                      </div>
                      <p className="text-base md:text-xl leading-relaxed text-foreground/95">“{activeItem.quote}”</p>

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

          <div className="max-w-6xl mx-auto mt-8 md:mt-10">
            <div className="text-center mb-5 md:mb-6">
              <h2 className="text-xl md:text-3xl font-bold">
                All <span className="text-gradient">Testimonials</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Scroll down to read each feedback in detail.
              </p>
            </div>

            <div className="space-y-4 md:space-y-5">
              {testimonials.map((item, index) => (
                <article
                  key={`${item.name}-manual-${index}`}
                  className="glass rounded-2xl border border-primary/20 p-4 md:p-5"
                >
                  <div
                    className={`grid md:grid-cols-[220px_1fr] gap-4 md:gap-6 items-stretch ${
                      index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="rounded-xl border border-primary/20 bg-background/40 p-3">
                      <img src={item.image} alt={item.name} className="w-full h-40 object-contain bg-background/60 rounded-lg" />
                      <div className="mt-2.5">
                        <p className="font-semibold text-foreground">{item.name}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">{item.designation}</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent p-4 md:p-5 flex">
                      <div className="my-auto">
                        <div className="inline-flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded-full bg-primary/15 text-primary mb-3">
                          <Quote className="w-3.5 h-3.5" />
                          Testimonial
                        </div>
                        <p className="text-base md:text-lg leading-relaxed text-foreground/95">“{item.quote}”</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.focus.map((topic) => (
                            <span
                              key={`${item.name}-${topic}`}
                              className="text-[11px] md:text-xs font-mono px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground"
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
