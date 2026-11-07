import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronRight, ChevronUp, ChevronDown, Camera, Trophy, Heart, X, Sparkles, Calendar, MapPin } from "lucide-react";
import { useState } from "react";

const timeline = [
  {
    icon: Briefcase,
    title: "Data Analyst",
    company: "Seth Anandram Jaipuria Group of Educational Institutions",
    logo: `${import.meta.env.BASE_URL}images/Professional%20Experience/Jaipuria%20Logo.png`,
    location: "Ghaziabad",
    type: "Full-time",
    period: "Dec 2025 — Present",
    desc: "Connected, trained, and collaborated with 30+ MIS Executives across Seth Anandram Jaipuria Schools to establish a robust data bridge between individual schools and the corporate office. Transformed complex datasets — including exam results, academic audit reports, financial audit data, and operational metrics — into clear, actionable insights using Excel, Power BI, and advanced analytical techniques. Enabled key stakeholders including the VP Corporate, School Principals, and Promoters to make informed, data-driven decisions through intuitive dashboards and automated reporting systems.",
    memories: {
      highlights: [
        "Organized and executed event operations & data tracking for #Athletica_2026 Annual Sports Day (543 student athletes & 58 sporting events)",
        "Welcomed Chief Guest Mr. Praveen Kumar (Former Indian International Cricketer) & Guest of Honour Taarun Chawlla Sir",
        "Trained 30+ MIS Executives across multiple schools",
        "Established data communication bridge between schools & corporate",
        "Presented analytical insights to VP, Principals & Promoters",
        "Transformed raw data into executive-ready dashboards",
      ],
      achievements: [
        "Successfully tracked & coordinated logistics for Athletica 2026 with 543 student participants",
        "Built unified reporting system for 30+ schools",
        "Reduced data turnaround time by 60%",
        "Created automated exam result analysis dashboards",
        "Standardized academic & financial audit reporting",
        "Enabled real-time data visibility for leadership team",
      ],
      photos: [
        { 
          src: `${import.meta.env.BASE_URL}images/Professional%20Experience/athletica_2026_praveen_kumar.png`, 
          caption: "Athletica 2026: With Chief Guest Mr. Praveen Kumar, Former Indian International Cricketer",
          tag: "Athletica 2026"
        },
        { 
          src: `${import.meta.env.BASE_URL}images/Professional%20Experience/athletica_2026_taarun_chawlla.png`, 
          caption: "Athletica 2026: With Guest of Honour Mr. Taarun Chawlla Sir, Sr. VP – Partner Schools, Seth Anandram Jaipuria Group of Schools",
          tag: "Athletica 2026"
        },
        { 
          src: `${import.meta.env.BASE_URL}images/Professional%20Experience/athletica_2026_group_dignitaries.png`, 
          caption: "Athletica 2026: Group Photo with Chief Guest Mr. Praveen Kumar, Mr. Taarun Chawlla Sir, and the Jaipuria Team",
          tag: "Athletica 2026"
        },
        { 
          src: `${import.meta.env.BASE_URL}images/Professional%20Experience/athletica_2026_team_field.png`, 
          caption: "Athletica 2026: On-field celebration with Chief Guest Mr. Praveen Kumar, Mr. Taarun Chawlla Sir, Ms. Kirti Srivastava Ma'am, and Organizing Team",
          tag: "Athletica 2026"
        },
        { 
          src: `${import.meta.env.BASE_URL}images/DA%20SAJS%20%20(1).png`, 
          caption: "9th Leadership Conclave — Strategic Analytics Presentation",
          tag: "Conclave"
        },
        { 
          src: `${import.meta.env.BASE_URL}images/DA%20SAJS%20%20(2).png`, 
          caption: "With Mr. Taarun Chawlla Sir (Sr. VP Franchises), Ms. Kirti Srivastava Ma'am (GM Academics), and Mr. Debashish Majumder Sir (DGM Operations)",
          tag: "Leadership"
        },
      ],
      note: "This role has been transformational — taking raw, scattered data from 30+ schools and turning it into a unified story that empowers decision-makers. Every dashboard I build, every training session I conduct, bridges the gap between numbers and understanding. From corporate MIS pipelines to coordinating high-energy events like Athletica 2026 alongside dignitaries like Mr. Praveen Kumar and Taarun Chawlla Sir, I am deeply grateful to work where data truly drives educational and institutional excellence.",
    },
  },
  {
    icon: Briefcase,
    title: "Data Analyst Intern",
    company: "WTF Gyms",
    logo: `${import.meta.env.BASE_URL}images/Professional%20Experience/WTF%20Logo.png`,
    location: "Noida, Uttar Pradesh",
    type: "Internship",
    period: "May 2025 — Jul 2025",
    desc: "Automated lead capture & routing from Meta Ads → Google Sheets → WhatsApp (WATI), reducing first-response time from 30 mins to under 10 mins. Built a single-click acknowledgment & offer letter generation system for both corporate & gym business units using Google Docs + Make.com. Developed a real-time interview tracking system — candidates scan a reception Google Form → auto HR notification via WATI → scheduled interview time auto-sent to candidate. Created Power BI dashboards for lead funnel tracking, agent productivity, and gym-wise performance reporting. Implemented conditional routing logic in automation workflows to segment leads by source, priority, and status. Established daily manager reporting system with automated data pulls, saving 12+ hours/week of manual reporting.",
    memories: {
      highlights: [
        "First hands-on experience with real-time data automation & analytics",
        "Mastered Make.com automation from absolute scratch",
        "Built complete Meta Ads → Google Sheets → WATI pipeline",
        "Designed real-time interview tracking system with QR-based check-in",
        "Created automated offer letter generation for corporate & gym units",
        "Collaborated directly with HR, Operations & Marketing teams",
      ],
      achievements: [
        "Reduced lead first-response time from 30 mins to under 10 mins",
        "Saved 12+ hours/week through automated manager reporting",
        "Built 5+ production-ready Power BI dashboards",
        "Automated single-click offer letter generation system",
        "Implemented smart lead routing by source, priority & status",
        "Developed reception-to-HR interview notification system",
      ],
      photos: [
        { src: `${import.meta.env.BASE_URL}images/Professional%20Experience/Vishal%20nigam.png`, caption: "On last day for me as intern with CEO of WTF Gyms, Vishal Nigam Sir" },
      ],
      note: "WTF Gyms was where theory met reality. Walking in as a PGDM student with Excel skills, I walked out as someone who could automate entire business workflows. Building the Meta Ads → WATI pipeline, watching leads flow in real-time, seeing HR generate offer letters with a single click — these weren't just projects, they were proof that data can transform operations. The mentorship from Vishal Nigam Sir (CEO, WTF Gyms), Anita Ma'am (CPO, WTF Gyms), and Pawan Sir (Operation Manager) gave me confidence I didn't know I had. This internship didn't just teach me tools — it taught me that with the right data and automation, anything is possible.",
    },
  },
  {
    icon: Briefcase,
    title: "Student Co‑ordinator — Business Analytics Club",
    company: "Jaipuria School of Business",
    logo: `${import.meta.env.BASE_URL}images/Professional%20Experience/Jaipuria%20Logo.png`,
    location: "Ghaziabad",
    type: "Full-time",
    period: "Sep 2024 — Present",
    desc: "Leading and coordinating club initiatives focused on data analytics, business intelligence, and Microsoft Power BI. Organizing workshops, hackathons, and peer learning sessions to build a community of data enthusiasts. Mentoring junior students on analytics projects, dashboard design, and data storytelling. Bridging the gap between academic learning and industry-relevant skills through hands-on sessions and real-world case studies.",
    memories: {
      highlights: [
        "Founded and grew a thriving analytics community",
        "Organized 4-5 hands-on Power BI workshops",
        "Mentored 20+ students on data projects",
        "Conducted industry case study sessions",
        "Built peer-to-peer learning culture",
      ],
      achievements: [
        "Grew club membership by 50% in first semester",
        "Hosted successful Power BI bootcamp series",
        "Created club's first analytics resource library",
        "Organized inter-batch data visualization competition",
        "Established partnerships with industry speakers",
      ],
      photos: [],
      note: "Leading this club taught me that knowledge multiplies when shared. Every workshop I conduct, every student I mentor, reminds me why I fell in love with data analytics. Building this community of curious minds has been one of the most fulfilling experiences of my academic journey.",
    },
  },
  {
    icon: Briefcase,
    title: "Team Leader",
    company: "Stagnet Research",
    logo: `${import.meta.env.BASE_URL}images/Professional%20Experience/Stagnate%20Logo.png`,
    location: "Noida, Uttar Pradesh",
    type: "Full-time",
    period: "Jul 2023 — Jul 2024",
    desc: "Led a team of 20 researchers in market and qualitative research projects. Developed Excel-based trackers and data cleaning processes to improve reporting accuracy. Analyzed survey data, creating client-ready reports and visualizations. Reduced project turnaround time by 25% through streamlined workflows.",
    memories: {
      highlights: [
        "Led a team of 20 researchers in market & qualitative research",
        "Developed Excel-based trackers for project management",
        "Created data cleaning processes to improve accuracy",
        "Analyzed survey data and created client-ready reports",
      ],
      achievements: [
        "Reduced project turnaround time by 25%",
        "Improved reporting accuracy through streamlined workflows",
        "Built client-ready visualizations and reports",
        "Developed standardized data cleaning processes",
      ],
      photos: [
        { src: `${import.meta.env.BASE_URL}images/Professional%20Experience/TL%20Staganate.png`, caption: "As Team Leader @Stagnet Research" },
      ],
      note: "Stagnet Research was my crash course in leadership and real-world data handling. Managing a team of 20 taught me patience, communication, and the art of turning chaos into clarity. Every client deliverable, every team stand-up, shaped me into someone who understands that data is only as powerful as the team behind it.",
    },
  },
  {
    icon: Briefcase,
    title: "Chemical Engineer",
    company: "Reliance Industries Limited",
    logo: `${import.meta.env.BASE_URL}images/Professional%20Experience/Reliance%20Logo.png`,
    location: "Jamnagar, Gujarat",
    type: "Full-time",
    period: "Jan 2023 — Jul 2023",
    desc: "Operated at the world's largest petroleum refining complex in Jamnagar, acquiring and evaluating real-time plant telemetry and process performance data using statistical methods and Excel. Developed Pareto charts, variance trend analysis models, and process tracking dashboards to isolate operational bottlenecks. Collaborated with multi-disciplinary operations, maintenance, and safety teams to execute continuous improvement initiatives, blending chemical engineering principles with industrial data analytics.",
    memories: {
      highlights: [
        "Worked on-site at the world's largest petroleum refining complex",
        "Monitored live plant telemetry and chemical process unit metrics",
        "Applied chemical engineering first-principles to industrial operations",
        "Discovered a strong passion for enterprise data pipelines and process analytics",
        "Collaborated across operations, maintenance, and plant safety divisions",
      ],
      achievements: [
        "Enhanced process efficiency tracking through automated Excel telemetry models",
        "Constructed Pareto charts and cause-and-effect models for bottleneck diagnosis",
        "Formulated daily trend analysis dashboards for process parameter stability",
        "Contributed to plant debottlenecking, yield optimization, and safety audits",
        "Bridged operational chemical engineering with data-driven decision frameworks",
      ],
      photos: [
        {
          src: `${import.meta.env.BASE_URL}images/Professional%20Experience/reliance_refinery_site_inspection.jpg`,
          caption: "On-site industrial plant inspection and operations with engineering colleagues at Reliance Industries Limited (Jamnagar Refinery Complex, Gujarat)",
        },
      ],
      note: "Reliance Industries was where my professional journey began — where an engineer discovered his true calling in data. Standing inside the world's largest refinery complex, I realized that behind every chemical reaction, every distillation column, and every valve, there is data waiting to tell a story. This formative experience planted the seed that grew into my career in analytics and intelligent automation.",
    },
  },
];

const ExperienceSection = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [activePhoto, setActivePhoto] = useState<{ src: string; caption: string } | null>(null);

  const scrollToExperience = (index: number) => {
    const element = document.getElementById(`experience-${index}`);
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - (window.innerHeight - rect.height) / 2;
      window.scrollTo({ 
        top: Math.max(0, scrollTop), 
        behavior: 'smooth' 
      });
    }
  };

  const openMemories = (index: number) => {
    setSelectedJob(index);
    document.body.style.overflow = 'hidden';
  };

  const closeMemories = () => {
    setSelectedJob(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="experience" className="pt-12 pb-10 md:pt-14 md:pb-12 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-primary font-mono text-xs sm:text-sm tracking-wider uppercase">Journey</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3">
            Professional <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-px bg-primary/60 md:-translate-x-px" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative flex items-start gap-4 sm:gap-6 mb-8 sm:mb-10 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 sm:left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary glow-primary -translate-x-1.5 mt-6 z-10" />

              {/* Card */}
              <div className={`ml-9 sm:ml-12 md:ml-0 md:w-[calc(50%-2rem)] min-w-0 flex-1 ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                {/* Up Arrow - only if previous experience exists */}
                {i > 0 && (
                  <div className="flex justify-center mb-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); scrollToExperience(i - 1); }}
                      className="p-1.5 sm:p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-primary/60 hover:text-primary transition-all duration-300 group"
                      aria-label="Previous experience"
                    >
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                )}
                <motion.div
                  id={`experience-${i}`}
                  whileHover={typeof openMemories === 'function' ? { y: -3 } : {}}
                  className={`glass rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden${typeof openMemories === 'function' ? ' cursor-pointer group border-2 border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:border-white hover:bg-primary/10' : ''} transition-all duration-300`}
                  onClick={() => openMemories(i)}
                >
                  {/* Rearranged Header: Logo + Title + Company + Metadata */}
                  <div className="flex flex-col xs:flex-row items-start gap-3 sm:gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 shadow-md border border-white/20">
                      <img 
                        src={item.logo} 
                        alt={`${item.company} logo`}
                        className="w-full h-full object-contain rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors leading-tight break-words">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-secondary-foreground font-semibold mt-1 break-words">
                        {item.company}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 text-[11px] sm:text-xs">
                        <span className="inline-flex items-center gap-1 font-mono text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-md border border-primary/25">
                          <Calendar className="w-3 h-3" />
                          {item.period}
                        </span>
                        <span className="inline-flex items-center gap-1 text-muted-foreground font-medium">
                          <MapPin className="w-3 h-3 text-primary/70" />
                          {item.location}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium border border-primary/30">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Key Achievements Preview */}
                  <div className="space-y-1.5 sm:space-y-2 mb-4">
                    <p className="text-[11px] sm:text-xs font-mono text-primary uppercase tracking-wider">Key Achievements</p>
                    <div className="space-y-1.5">
                      {item.memories.achievements.slice(0, 3).map((achievement, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                        >
                          <span className="text-primary mt-0.5 shrink-0">▸</span>
                          <span className="line-clamp-2">{achievement}</span>
                        </div>
                      ))}
                    </div>
                    {item.memories.achievements.length > 3 && (
                      <p className="text-[11px] sm:text-xs text-primary/60 pl-3">+{item.memories.achievements.length - 3} more achievements...</p>
                    )}
                  </div>
                  
                  {/* Click hint */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-primary/80 group-hover:text-primary transition-colors bg-primary/10 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 group-hover:bg-primary/20">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">Click to explore journey</span>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform ml-auto shrink-0" />
                  </div>
                </motion.div>
                {/* Down Arrow - only if next experience exists */}
                {i < timeline.length - 1 && (
                  <div className="flex justify-center mt-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); scrollToExperience(i + 1); }}
                      className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-primary/60 hover:text-primary transition-all duration-300 group"
                      aria-label="Next experience"
                    >
                      <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Memories Modal/Section */}
      <AnimatePresence>
        {selectedJob !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={closeMemories}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-2xl border border-primary/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 glass border-b border-primary/20 p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white p-2 flex items-center justify-center flex-shrink-0 shadow-md border border-white/20">
                      <img 
                        src={timeline[selectedJob].logo} 
                        alt={`${timeline[selectedJob].company} logo`} 
                        className="w-full h-full object-contain rounded" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl md:text-3xl font-bold text-gradient leading-tight"
                      >
                        {timeline[selectedJob].title}
                      </motion.h2>
                      <p className="font-semibold text-base md:text-lg text-foreground mt-1">
                        {timeline[selectedJob].company}
                      </p>
                      <div className="flex flex-wrap items-center gap-2.5 mt-2.5 text-xs md:text-sm">
                        <span className="inline-flex items-center gap-1.5 font-mono text-primary font-medium bg-primary/10 px-2.5 py-1 rounded-md border border-primary/25">
                          <Calendar className="w-3.5 h-3.5" />
                          {timeline[selectedJob].period}
                        </span>
                        <span className="inline-flex items-center gap-1 text-muted-foreground font-medium">
                          <MapPin className="w-3.5 h-3.5 text-primary/70" />
                          {timeline[selectedJob].location}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/30">
                          {timeline[selectedJob].type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeMemories}
                    className="p-2 rounded-full hover:bg-primary/20 transition-colors flex-shrink-0 text-muted-foreground hover:text-foreground"
                    title="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content Grid */}
              <div className="p-6 grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-card/50 rounded-xl p-5 border border-border"
                  >
                    <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Role Overview
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                      {timeline[selectedJob].desc}
                    </p>
                  </motion.div>

                  {/* Highlights */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card/50 rounded-xl p-5 border border-border"
                  >
                    <h3 className="text-sm font-semibold text-accent mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Highlights & Memories
                    </h3>
                    <ul className="space-y-2">
                      {timeline[selectedJob].memories.highlights.map((highlight, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + idx * 0.05 }}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <span className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Achievements */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-card/50 rounded-xl p-5 border border-border"
                  >
                    <h3 className="text-sm font-semibold text-yellow-500 mb-3 flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Key Achievements
                    </h3>
                    <ul className="space-y-2">
                      {timeline[selectedJob].memories.achievements.map((achievement, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0" />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Personal Note */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-5 border border-primary/30"
                  >
                    <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Personal Reflection
                    </h3>
                    <p className="text-sm text-foreground/80 italic leading-relaxed text-justify">
                      "{timeline[selectedJob].memories.note}"
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Athletica 2026 Spotlight - Only for Jaipuria */}
              {selectedJob === 0 && (
                <div className="px-6 pb-2">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38 }}
                    className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-primary/10 to-emerald-500/10 border-2 border-primary/30 shadow-lg space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/20 text-amber-500 border border-amber-500/30">
                          <Trophy className="w-3.5 h-3.5" />
                          <span>Annual Sports Extravaganza</span>
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-foreground mt-2">
                          #Athletica_2026: A Celebration of Sportsmanship 🏅
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Hosted on 31st October at Seth Anandram Jaipuria School
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-card/80 border border-border text-foreground font-medium">
                          Chief Guest: Mr. Praveen Kumar (Former Indian Cricketer)
                        </span>
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-card/80 border border-border text-foreground font-medium">
                          Guest of Honour: Taarun Chawlla Sir (Sr. VP)
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed text-justify">
                      From the first sprint to the final cheer, <strong>Athletica 2026</strong> was nothing short of spectacular! We were honoured to welcome former Indian cricketer <strong>Mr. Praveen Kumar</strong> as our Chief Guest, and <strong>Taarun Chawlla Sir</strong> (Sr. VP – Partner Schools, Seth Anandram Jaipuria Group of Schools) as Guest of Honour, whose presence and words inspired our students to play with passion and purpose. A big thank you to <strong>Ms. Kirti Srivastava Ma'am</strong> for her constant guidance and support, and to the entire team whose planning and hard work made the day run seamlessly.
                    </p>

                    {/* Athletica 2026 Metrics */}
                    <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-card/70 border border-border/80 text-center">
                        <span className="block text-xl sm:text-2xl font-bold text-primary font-mono">543</span>
                        <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">Students Participated</span>
                      </div>
                      <div className="p-3 rounded-xl bg-card/70 border border-border/80 text-center">
                        <span className="block text-xl sm:text-2xl font-bold text-emerald-500 font-mono">58</span>
                        <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">Sports Events</span>
                      </div>
                      <div className="p-3 rounded-xl bg-card/70 border border-border/80 text-center">
                        <span className="block text-xl sm:text-2xl font-bold text-amber-500 font-mono">1</span>
                        <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">Spirit of Fair Play</span>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-primary/80 italic pt-1">
                      #Athletica2026 #JaipuriaSchool #AnnualSportsDay #SportsAndSportsmanship #Teamwork #StudentLife #Jaipurians
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Photos - Full Width Section */}
              {timeline[selectedJob].memories.photos.length > 0 && (
                <div className="px-6 pb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-card/50 rounded-xl p-6 border border-border"
                  >
                    <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                      <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        Photo Memories ({timeline[selectedJob].memories.photos.length} Photos)
                      </h3>
                      <span className="text-[11px] text-muted-foreground font-mono">Click any photo to expand</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {timeline[selectedJob].memories.photos.map((photo, idx) => {
                        const photoSrc = typeof photo === 'string' ? photo : photo.src;
                        const photoCaption = typeof photo === 'string' ? '' : photo.caption;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.45 + idx * 0.08 }}
                            className="rounded-xl overflow-hidden bg-muted/50 shadow-lg flex flex-col items-center p-3 border-2 border-primary/30 hover:border-primary/70 transition-all group/photo cursor-pointer"
                            onClick={() => setActivePhoto({ src: photoSrc, caption: photoCaption })}
                          >
                            <div className="relative w-full overflow-hidden rounded-lg">
                              <img
                                src={photoSrc}
                                alt={photoCaption || `Memory ${idx + 1}`}
                                className="w-full h-auto object-contain rounded-lg group-hover/photo:scale-[1.02] transition-transform duration-500 border border-border"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            </div>
                            {photoCaption && (
                              <p className="mt-3 text-xs sm:text-sm text-center text-foreground font-semibold leading-snug">
                                {photoCaption}
                              </p>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* High-Resolution Photo Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            <div 
              className="relative max-w-4xl max-h-[92vh] flex flex-col items-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="self-end mb-2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={activePhoto.src}
                alt={activePhoto.caption}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/20"
              />
              {activePhoto.caption && (
                <p className="mt-3 text-center text-xs sm:text-sm text-white font-medium max-w-2xl px-4 py-2 rounded-xl bg-black/70 backdrop-blur border border-white/10">
                  {activePhoto.caption}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceSection;
