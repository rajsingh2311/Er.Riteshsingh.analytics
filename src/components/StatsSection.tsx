import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 100, suffix: "K+", label: "Transactions analyzed (RFM)" },
  { value: 226, suffix: "+", label: "Survey responses analyzed" },
  { value: 12, suffix: "+", label: "Hours/week automated reporting" },
  { value: 3, suffix: "+", label: "Domains (BI, HR, Research)" },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gradient font-mono break-words block">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6 min-w-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center p-3 rounded-xl glass border border-border/40 min-w-0"
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground text-xs sm:text-sm mt-2 break-words">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
