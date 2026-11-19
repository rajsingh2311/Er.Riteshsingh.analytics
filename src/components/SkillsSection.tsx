import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Box, Code2, Grid2X2, Layers, LineChart, PieChart, Table2 } from "lucide-react";
import { useShouldRender3D } from "@/hooks/useShouldRender3D";

const TechStack3DArena = lazy(() => import("./three/TechStack3DArena"));

const skills = [
  { icon: LineChart, name: "Power BI (DAX)", level: 90, desc: "Executive MIS & star-schema BI reporting" },
  { icon: PieChart, name: "MS Excel (MOS Expert)", level: 92, desc: "PivotTables, Power Query, dynamic models" },
  { icon: Table2, name: "SQL", level: 85, desc: "Queries, joins, CTEs & data preparation" },
  { icon: Code2, name: "Python", level: 80, desc: "Pandas, NumPy, ML & workflow automation" },
  { icon: Layers, name: "SPSS", level: 78, desc: "Chi-Square, T-Test, ANOVA" },
  { icon: BarChart3, name: "SAP / ERP", level: 70, desc: "Ops reporting & workflow exposure" },
];

const SkillsSection = () => {
  const shouldRender3D = useShouldRender3D();
  const [viewMode, setViewMode] = useState<"3d" | "matrix">("3d");
  const show3DArena = shouldRender3D && viewMode === "3d";

  return (
    <section id="skills" className="pt-12 pb-12 md:pt-16 md:pb-16 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10"
        >
          <div>
            <p className="text-primary font-mono text-xs sm:text-sm tracking-wider">Expertise</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-1.5 leading-tight text-balance">
              Technical <span className="text-gradient">Skills</span>
            </h2>
          </div>

          {/* Functional Segmented View Switcher (shown when 3D is supported & enabled) */}
          {shouldRender3D && (
            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-card border border-border self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("3d")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  viewMode === "3d"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Box className="w-3.5 h-3.5 shrink-0" />
                <span>Show 3D</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("matrix")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  viewMode === "matrix"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid2X2 className="w-3.5 h-3.5 shrink-0" />
                <span>Hide 3D</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* 3D arena is an optional extra; the readable skill cards below are always shown */}
        {show3DArena && (
          <div className="mb-8 sm:mb-10">
          <Suspense
            fallback={
              <div className="w-full h-[380px] sm:h-[440px] md:h-[480px] rounded-2xl border border-border/80 bg-card/40 flex items-center justify-center">
                <span className="text-xs font-mono text-muted-foreground">
                  Loading 3D Physics Tech Stack...
                </span>
              </div>
            }
          >
            <TechStack3DArena />
          </Suspense>
          </div>
        )}

        {(
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="glass rounded-xl p-4 sm:p-6 group cursor-default border border-border/80 hover:border-primary/60 transition-all duration-300 min-w-0"
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0">
                    <skill.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base break-words leading-tight">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-muted-foreground break-words mt-0.5">{skill.desc}</p>
                  </div>
                </div>

                <div className="relative h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.9, delay: i * 0.08 + 0.15, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-brand"
                  />
                </div>
                <span className="text-xs text-muted-foreground font-mono tabular-nums mt-2 block text-right">
                  {skill.level}%
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
