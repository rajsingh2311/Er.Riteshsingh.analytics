import { lazy, Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BarChart3, Cpu, Workflow } from "lucide-react";
import { useShouldRender3D } from "@/hooks/useShouldRender3D";

const Section3DStage = lazy(() => import("./three/Section3DStage"));

interface CapabilityItem {
  number: string;
  title: string;
  subtitle: string;
  impact: string;
  description: string;
  tools: string[];
  targetSection: string;
  ctaLabel: string;
  icon: typeof BarChart3;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    number: "01",
    title: "Business Intelligence & MIS Architecture",
    subtitle: "Executive Dashboards · Star-Schema DAX",
    impact: "30+ School Campuses · 60% Faster Reporting",
    description:
      "Designing single-source-of-truth Power BI reporting ecosystems that unify fragmented institutional and operational spreadsheets into drill-down executive scorecards, real-time attendance audits, and board-level KPI telemetry.",
    tools: ["Power BI", "Advanced DAX", "Power Query", "Star Schema", "MOS Excel Expert"],
    targetSection: "projects",
    ctaLabel: "Explore Power BI Hub",
    icon: BarChart3,
  },
  {
    number: "02",
    title: "Workflow & CRM Automation Systems",
    subtitle: "Lead Pipelines · Zero-Touch Operations",
    impact: "65% Faster Lead SLA · 12+ Hours Saved Weekly",
    description:
      "Engineering resilient end-to-end automations connecting Meta Ads, Google Sheets, WATI WhatsApp, and internal CRMs via Make.com, N8N, and Google Apps Script — turning slow manual routing into instant SLA-tracked pipelines.",
    tools: ["Make.com", "N8N", "WATI", "Google Apps Script", "Webhooks", "GDPR Compliance"],
    targetSection: "experience",
    ctaLabel: "See Production Impact",
    icon: Workflow,
  },
  {
    number: "03",
    title: "Predictive Analytics & Process Rigor",
    subtitle: "Statistical Modeling · Lean Six Sigma",
    impact: "100K+ Transactions Modeled · 25% Faster Turnaround",
    description:
      "Combining chemical engineering first-principles with CRISP-DM data science, Python (Pandas/Scikit-Learn), SQL, and SPSS hypothesis testing to uncover Pareto revenue drivers, predict employee flight risk, and eliminate bottlenecks.",
    tools: ["Python", "SQL", "SPSS", "RFM Segmentation", "CRISP-DM", "Lean Six Sigma Green Belt"],
    targetSection: "projects",
    ctaLabel: "Launch Python Studio",
    icon: Cpu,
  },
];

const CapabilitiesSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const shouldRender3D = useShouldRender3D();

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 76);
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="capabilities" className="py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10"
        >
          <div>
            <p className="text-primary font-mono text-xs sm:text-sm tracking-wider">What I Build</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-1.5 leading-tight text-balance">
              Turning Raw Data Into <span className="text-gradient">Decisions</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
            Select any domain or click the 3D architecture core to inspect the systems, tools, and measurable outcomes behind my work.
          </p>
        </motion.div>

        <div
          className={`grid grid-cols-1 gap-6 lg:gap-8 items-start ${
            shouldRender3D ? "lg:grid-cols-[1.12fr_0.88fr]" : ""
          }`}
        >
          <div className="divide-y divide-border/80 border-y border-border/80">
            {CAPABILITIES.map((cap, idx) => {
              const isActive = activeIndex === idx;
              const Icon = cap.icon;

              return (
                <div
                  key={cap.number}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className="transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-expanded={isActive}
                    className="w-full text-left py-5 sm:py-6 px-2 sm:px-4 flex items-start sm:items-center justify-between gap-4 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 min-w-0">
                      <span
                        className={`font-mono text-sm sm:text-base font-semibold tabular-nums shrink-0 mt-0.5 sm:mt-0 transition-colors ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {cap.number}.
                      </span>
                      <div className="min-w-0">
                        <h3
                          className={`text-lg sm:text-xl md:text-2xl font-bold tracking-tight transition-colors break-words ${
                            isActive
                              ? "text-foreground"
                              : "text-foreground/75 group-hover:text-foreground"
                          }`}
                        >
                          {cap.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-xs sm:text-sm text-muted-foreground">
                          <span>{cap.subtitle}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-primary font-medium tabular-nums">
                            {cap.impact}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card/60 text-muted-foreground border-border group-hover:border-primary/50 group-hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pt-1 pl-9 sm:pl-14 pr-2 sm:pr-4 flex flex-col gap-4">
                          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                            {cap.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-secondary-foreground">
                            {cap.tools.map((tool, tIdx) => (
                              <span key={tool} className="inline-flex items-center gap-2.5">
                                <span>{tool}</span>
                                {tIdx < cap.tools.length - 1 && (
                                  <span className="text-muted-foreground/60" aria-hidden="true">
                                    /
                                  </span>
                                )}
                              </span>
                            ))}
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => scrollToSection(cap.targetSection)}
                              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              <span>{cap.ctaLabel}</span>
                              <ArrowUpRight className="w-4 h-4 shrink-0" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {shouldRender3D && (
            <div className="lg:sticky lg:top-24">
              <Suspense
                fallback={
                  <div className="h-[360px] sm:h-[420px] rounded-2xl border border-primary/20 bg-card/40 flex items-center justify-center text-xs font-mono text-muted-foreground">
                    Initializing 3D Architecture Core...
                  </div>
                }
              >
                <Section3DStage
                  variant="capabilities-core"
                  badge="3D Architecture Core · Live Sync"
                  heightClass="h-[360px] sm:h-[420px]"
                  activeHotspotId={String(activeIndex)}
                  onHotspotSelect={(id) => {
                    const parsed = Number(id);
                    if (!Number.isNaN(parsed) && parsed >= 0 && parsed < CAPABILITIES.length) {
                      setActiveIndex(parsed);
                    }
                  }}
                />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
