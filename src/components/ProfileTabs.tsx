import { motion } from "framer-motion";
import { Star, Briefcase, GraduationCap, Award, FolderOpen, Heart, Zap, MessageSquare, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

import certGoogle from "@/assets/cert-google.jpg";
import certAws from "@/assets/cert-aws.jpg";
import featuredDashboard from "@/assets/featured-dashboard.jpg";
import awardInnovation from "@/assets/award-innovation.jpg";
import volunteering from "@/assets/volunteering.jpg";

const tabs = [
  {
    id: "featured",
    label: "Featured",
    icon: Star,
    preview: {
      type: "image",
      image: featuredDashboard,
      title: "Revenue Analytics Dashboard",
      subtitle: "Featured project — 2M+ data points visualized",
    },
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    preview: {
      type: "timeline",
      items: [
        { title: "Senior Data Analyst", sub: "TechCorp Inc.", year: "2022–Present" },
        { title: "Data Analyst", sub: "DataDriven Co.", year: "2019–2022" },
      ],
    },
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    preview: {
      type: "timeline",
      items: [
        { title: "M.S. Data Science", sub: "Stanford University", year: "2017–2019" },
        { title: "B.S. Statistics", sub: "UC Berkeley", year: "2013–2017" },
      ],
    },
  },
  {
    id: "certifications",
    label: "Licenses & Certifications",
    icon: Award,
    preview: {
      type: "certs",
      images: [certGoogle, certAws],
    },
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderOpen,
    preview: {
      type: "stats",
      items: [
        { label: "Revenue Forecasting", metric: "+35% accuracy" },
        { label: "Customer Segmentation", metric: "2M+ records" },
        { label: "Anomaly Detection", metric: "99.2% precision" },
      ],
    },
  },
  {
    id: "volunteering",
    label: "Volunteering",
    icon: Heart,
    preview: {
      type: "image",
      image: volunteering,
      title: "Data Literacy Workshop",
      subtitle: "Teaching data skills to underserved communities",
    },
  },
  {
    id: "skills",
    label: "Skills",
    icon: Zap,
    preview: {
      type: "skills",
      items: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 92 },
        { name: "Tableau", level: 90 },
        { name: "Machine Learning", level: 82 },
      ],
    },
  },
  {
    id: "recommendations",
    label: "Recommendations",
    icon: MessageSquare,
    preview: {
      type: "quote",
      text: "Alex's analytical thinking transformed our entire data strategy...",
      author: "Sarah Chen, VP of Analytics",
    },
  },
  {
    id: "honors",
    label: "Honors & Awards",
    icon: Trophy,
    preview: {
      type: "image",
      image: awardInnovation,
      title: "Best Data Innovation 2024",
      subtitle: "DataCon International Award",
    },
  },
];

const ProfileTabs = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Profile</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Explore My <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        {/* Scrollable tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide"
        >
          {tabs.map((tab, i) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/section/${tab.id}`)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full glass text-sm font-medium whitespace-nowrap text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors duration-300"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Preview cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tabs.map((tab, i) => (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => navigate(`/section/${tab.id}`)}
              className="glass rounded-xl overflow-hidden cursor-pointer group"
            >
              {/* Card header */}
              <div className="px-5 pt-5 pb-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                  <tab.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-sm group-hover:text-gradient transition-all duration-300">{tab.label}</span>
                <motion.span
                  className="ml-auto text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                >
                  View all →
                </motion.span>
              </div>

              {/* Preview content */}
              <div className="px-5 pb-5">
                <PreviewContent preview={tab.preview} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PreviewContent = ({ preview }: { preview: any }) => {
  if (preview.type === "image") {
    return (
      <div className="relative rounded-lg overflow-hidden">
        <img src={preview.image} alt={preview.title} className="w-full h-36 object-cover rounded-lg" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-3">
          <p className="text-sm font-semibold">{preview.title}</p>
          <p className="text-xs text-muted-foreground">{preview.subtitle}</p>
        </div>
      </div>
    );
  }

  if (preview.type === "timeline") {
    return (
      <div className="space-y-3">
        {preview.items.map((item: any) => (
          <div key={item.title} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-1.5 glow-primary" />
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.sub} · {item.year}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (preview.type === "certs") {
    return (
      <div className="flex gap-2">
        {preview.images.map((img: string, i: number) => (
          <motion.img
            key={i}
            src={img}
            alt="Certificate"
            className="w-1/2 h-24 object-cover rounded-lg border border-border"
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </div>
    );
  }

  if (preview.type === "stats") {
    return (
      <div className="space-y-2">
        {preview.items.map((item: any) => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">{item.label}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary">{item.metric}</span>
          </div>
        ))}
      </div>
    );
  }

  if (preview.type === "skills") {
    return (
      <div className="space-y-2">
        {preview.items.map((skill: any) => (
          <div key={skill.name}>
            <div className="flex justify-between text-xs mb-1">
              <span>{skill.name}</span>
              <span className="text-muted-foreground font-mono">{skill.level}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-brand"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (preview.type === "quote") {
    return (
      <div className="relative">
        <span className="text-4xl text-primary/20 font-serif absolute -top-2 -left-1">"</span>
        <p className="text-xs text-muted-foreground italic pl-5 pt-2">{preview.text}</p>
        <p className="text-xs font-medium mt-2 pl-5">— {preview.author}</p>
      </div>
    );
  }

  return null;
};

export default ProfileTabs;
