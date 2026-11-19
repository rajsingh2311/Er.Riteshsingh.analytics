import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LinkPreview from "./ui/link-preview";
import { useShouldRender3D } from "@/hooks/useShouldRender3D";

const Section3DStage = lazy(() => import("./three/Section3DStage"));

const education = [
  {
    id: "pgdm",
    degree: "PGDM (Business Analytics & Operation)",
    school: "Jaipuria School of Business",
    cgpa: "CGPA: 7.03",
    period: "2024 — 2026",
    desc: "Focus on Business Analytics, CRISP‑DM methodology, high-dimensional data visualization, and predictive analytics.",
    link: "https://jsb.jaipuria.edu.in/",
    previewImg: `${import.meta.env.BASE_URL}images/JSB.png`,
    logo: `${import.meta.env.BASE_URL}assets/aistudio/Water_mark_5eeaecf9.png`,
    route: "/pgdm",
  },
  {
    id: "btech",
    degree: "B.Tech (Chemical Engineering)",
    school: "(SCRIET) Chaudhary Charan Singh University, Meerut",
    cgpa: "CGPA: 6.74",
    period: "2019 — 2023",
    desc: "Exposure to SAP ERP systems, thermodynamic modeling, guest lecture sessions from IIT Roorkee, and departmental student leadership.",
    link: "https://www.ccsuniversity.ac.in/",
    previewImg: `${import.meta.env.BASE_URL}images/CCSU.png`,
    logo: `${import.meta.env.BASE_URL}assets/aistudio/CCSU-Logo_39050d02.jpg`,
    route: "/btech",
  },
  {
    id: "twelfth",
    degree: "12th (Physics, Chemistry, Math)",
    school: "S Devi Inter College, Madhuban, Mau (UP Board)",
    period: "2019 · 61%",
    desc: "PCM curriculum with strong quantitative foundation.",
    link: "https://www.subhagideviintercollege.com/",
    previewImg: `${import.meta.env.BASE_URL}assets/aistudio/image_1787efbd.png`,
    logo: `${import.meta.env.BASE_URL}assets/aistudio/image_1787efbd.png`,
    route: "/twelfth",
  },
  {
    id: "tenth",
    degree: "10th (Science)",
    school: "S Devi Inter College, Madhuban, Mau (UP Board)",
    period: "2019 · 81.33%",
    desc: "Science curriculum with focus on core subjects.",
    link: "https://www.subhagideviintercollege.com/",
    previewImg: `${import.meta.env.BASE_URL}assets/aistudio/image_1787efbd.png`,
    logo: `${import.meta.env.BASE_URL}assets/aistudio/image_1787efbd.png`,
    route: "/tenth",
  },
];

const EducationSection = () => {
  const navigate = useNavigate();
  const [focusedEduId, setFocusedEduId] = useState<string>("pgdm");
  const shouldRender3D = useShouldRender3D();

  const handleEducationClick = (degree: string) => {
    if (degree.includes("PGDM")) {
      navigate("/pgdm");
    } else if (degree.includes("B.Tech")) {
      navigate("/btech");
    } else if (degree.includes("12th")) {
      navigate("/twelfth");
    } else if (degree.includes("10th")) {
      navigate("/tenth");
    }
  };

  return (
    <section id="education" className="pt-12 pb-10 md:pt-14 md:pb-12 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-primary font-mono text-xs sm:text-sm tracking-wider uppercase">Academics</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3">
            Education <span className="text-gradient">& Academics</span>
          </h2>
        </motion.div>

        <div
          className={`mx-auto grid grid-cols-1 gap-6 lg:gap-8 items-start ${
            shouldRender3D ? "max-w-6xl lg:grid-cols-[0.88fr_1.12fr]" : "max-w-3xl"
          }`}
        >
          {/* Interactive 3D Academic Pedestal & Astrolabe (desktop + motion-enabled only) */}
          {shouldRender3D && (
            <div className="lg:sticky lg:top-24">
              <Suspense
                fallback={
                  <div className="h-[360px] sm:h-[420px] rounded-2xl border border-primary/20 bg-card/40 flex items-center justify-center text-xs font-mono text-muted-foreground">
                    Initializing 3D Academic Beacon...
                  </div>
                }
              >
                <Section3DStage
                  variant="education-beacon"
                  badge="3D Academic Pedestal & Astrolabe"
                  heightClass="h-[360px] sm:h-[420px]"
                  activeHotspotId={focusedEduId}
                  onHotspotSelect={(id) => setFocusedEduId(id)}
                  onHotspotAction={(id) => {
                    const found = education.find((e) => e.id === id);
                    if (found) navigate(found.route);
                  }}
                />
              </Suspense>
            </div>
          )}

          <div className="space-y-4 sm:space-y-5">
            {education.map((item, i) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                onMouseEnter={() => setFocusedEduId(item.id)}
                className={`glass rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 min-w-0 cursor-pointer border-2 transition-all duration-300 ${
                  focusedEduId === item.id
                    ? "border-primary shadow-[0_0_25px_rgba(139,92,246,0.45)] bg-primary/10"
                    : "border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10"
                }`}
                onClick={() => handleEducationClick(item.degree)}
                role="button"
                tabIndex={0}
              >
                {item.logo ? (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-md border border-white/20 overflow-hidden">
                    <img
                      src={item.logo}
                      alt={`${item.school} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5 sm:mb-2">
                    <h3 className="font-bold text-base sm:text-lg break-words leading-snug">{item.degree}</h3>
                    <span className="text-xs font-mono text-primary shrink-0">{item.period}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-secondary-foreground mb-1 font-medium break-words flex items-center flex-wrap gap-1.5">
                    {item.link ? (
                      <LinkPreview
                        href={item.link}
                        imgSrc={item.previewImg!}
                        label={item.school}
                        sizeClass="w-60 sm:w-72 max-w-[85vw]"
                      />
                    ) : (
                      <span>{item.school}</span>
                    )}
                    {item.cgpa && (
                      <span className="text-muted-foreground font-mono text-xs">
                        · {item.cgpa}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed break-words mb-2.5">{item.desc}</p>
                  <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-2 text-xs text-primary font-semibold">
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="truncate">View Detailed Journey & Highlights</span>
                    </span>
                    <span className="transition-transform group-hover:translate-x-1 text-sm font-bold shrink-0">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

