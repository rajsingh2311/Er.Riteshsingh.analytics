const MARQUEE_ITEMS = [
  "Power BI & Advanced DAX",
  "Workflow Automation (Make.com · N8N)",
  "SQL & Multi-Source ETL",
  "Python Predictive Modeling",
  "MOS Excel Expert",
  "Lean Six Sigma Green Belt",
  "Enterprise MIS Architecture",
  "CRM & WATI Lead Pipelines",
];

const MarqueeRibbon = () => {
  return (
    <div
      className="relative w-full overflow-hidden border-y border-border/60 bg-card/30 py-3 sm:py-3.5 select-none"
      aria-label="Core analytics disciplines"
    >
      <div className="marquee-track flex w-max items-center gap-6 sm:gap-8">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-mono text-muted-foreground whitespace-nowrap shrink-0"
          >
            <span className="hover:text-primary transition-colors">{item}</span>
            <span className="text-primary/50" aria-hidden="true">
              ·
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeRibbon;
