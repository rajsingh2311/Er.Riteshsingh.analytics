import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  Eye, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  FolderGit2, 
  CheckCircle2, 
  Printer, 
  Smartphone,
  ChevronRight
} from "lucide-react";

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<"pdf" | "digital">("pdf");
  const resumePdfUrl = `${import.meta.env.BASE_URL}Ritesh_Singh_Resume.pdf`;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-card border-2 border-primary/50 shadow-[0_0_35px_rgba(139,92,246,0.35)] rounded-2xl md:rounded-3xl overflow-hidden my-auto max-h-[94vh] flex flex-col backdrop-blur-xl"
        >
          {/* Top Gradient Themed Accent Line */}
          <div className="h-2 w-full bg-gradient-to-r from-primary via-indigo-500 to-cyan-400 shrink-0" />

          {/* Modal Header Bar with Theme Border */}
          <div className="p-3 sm:p-5 border-b border-border/80 bg-card/90 backdrop-blur flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/30 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-foreground">
                    Er. Ritesh Singh — Resume Preview
                  </h2>
                  <span className="hidden xs:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-primary/15 text-primary border border-primary/25">
                    <Sparkles className="w-3 h-3" /> Latest Edition (2026)
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-muted-foreground">
                  Data Analyst | Business Analyst • Noida, UP • +91 8318174679
                </p>
              </div>
            </div>

            {/* View Mode Switcher & Actions */}
            <div className="flex items-center gap-2 flex-wrap ml-auto">
              {/* Tab Selector */}
              <div className="flex items-center p-1 rounded-xl bg-muted/60 border border-border">
                <button
                  type="button"
                  onClick={() => setViewMode("pdf")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === "pdf"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>PDF Document</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("digital")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === "digital"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Interactive CV</span>
                </button>
              </div>

              {/* Action Buttons */}
              <a
                href={resumePdfUrl}
                download="Ritesh_Singh_Data_Analyst_Resume.pdf"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-brand text-primary-foreground font-semibold text-xs shadow-md hover:shadow-primary/30 transition-all"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>

              <a
                href={resumePdfUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-secondary text-muted-foreground hover:text-foreground border border-border hover:bg-muted transition-colors"
                title="Open in new window"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-secondary text-muted-foreground hover:text-foreground border border-border hover:bg-muted transition-colors"
                aria-label="Close resume preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="overflow-y-auto flex-1 p-3 sm:p-5 md:p-6 bg-background/50">
            {viewMode === "pdf" ? (
              <div className="space-y-3">
                {/* Mobile Fallback Hint */}
                <div className="sm:hidden p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs text-foreground flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[11px]">
                      If PDF does not scroll smoothly on your phone, switch to <strong>Interactive CV</strong> tab!
                    </span>
                  </div>
                  <button
                    onClick={() => setViewMode("digital")}
                    className="px-2 py-1 rounded bg-primary text-primary-foreground text-[10px] font-semibold shrink-0"
                  >
                    Switch
                  </button>
                </div>

                {/* PDF Viewer Container in our Theme Border */}
                <div className="w-full rounded-2xl overflow-hidden border-2 border-primary/40 shadow-xl bg-card">
                  <iframe
                    src={`${resumePdfUrl}#toolbar=1&navpanes=0`}
                    title="Ritesh Singh Data Analyst Resume"
                    className="w-full h-[65vh] sm:h-[72vh] md:h-[76vh] border-0 bg-white"
                  />
                </div>
              </div>
            ) : (
              /* Digital Interactive CV (Matching exact uploaded resume content) */
              <div className="max-w-4xl mx-auto space-y-6 text-foreground">
                {/* Header Profile Section in Theme Border */}
                <div className="p-5 sm:p-6 rounded-2xl glass border-2 border-primary/40 shadow-lg text-center space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    RITESH SINGH
                  </h1>
                  <p className="text-sm sm:text-base font-semibold text-primary">
                    Data Analyst | Business Analyst
                  </p>
                  <p className="text-xs text-muted-foreground max-w-xl mx-auto flex flex-wrap justify-center items-center gap-2 pt-1 font-mono">
                    <span>Noida, Uttar Pradesh, India</span>
                    <span>•</span>
                    <a href="tel:+918318174679" className="hover:text-primary hover:underline">+91 8318174679</a>
                    <span>•</span>
                    <a href="mailto:riteshsingh.raj.23@gmail.com" className="hover:text-primary hover:underline">riteshsingh.raj.23@gmail.com</a>
                    <span>•</span>
                    <a href="https://linkedin.com/in/riteshsingh-analytics" target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">linkedin.com/in/riteshsingh-analytics</a>
                  </p>
                </div>

                {/* Professional Summary */}
                <div className="p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-2">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary font-mono flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Professional Summary
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-justify">
                    Data Analyst with a PGDM in Business Analytics and hands-on experience building Power BI, Excel and automated reporting solutions. Currently delivering 30+ school-level dashboards and a Head Office audit dashboard that give leadership a single view of fee collections, admissions, enrollment and compliance across a 30-school group. Skilled in SQL, Python, DAX, statistical analysis (SPSS) and the CRISP-DM methodology, with a track record of automating manual workflows (12+ hours/week saved) and turning raw data into decisions.
                  </p>
                </div>

                {/* Core Skills */}
                <div className="p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-3">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary font-mono flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Core Skills
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-secondary/50 border border-border/80">
                      <span className="font-semibold text-foreground block mb-1">BI &amp; Visualization</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Power BI (DAX, Power Query), Tableau, Advanced Excel (PivotTables, Slicers, Power Query), Dashboard Design, KPI Reporting
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/50 border border-border/80">
                      <span className="font-semibold text-foreground block mb-1">Programming &amp; Data</span>
                      <p className="text-muted-foreground leading-relaxed">
                        SQL (Queries, Joins), Python (Pandas, NumPy, Matplotlib, Seaborn), Data Cleaning, Data Pipelines, Structured / Semi-Structured / Unstructured Data
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/50 border border-border/80">
                      <span className="font-semibold text-foreground block mb-1">Statistics &amp; Methods</span>
                      <p className="text-muted-foreground leading-relaxed">
                        SPSS, Hypothesis Testing (Chi-Square, T-Test, ANOVA), RFM Segmentation, Pareto Analysis, Forecasting, CRISP-DM
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/50 border border-border/80">
                      <span className="font-semibold text-foreground block mb-1">Business &amp; Platforms</span>
                      <p className="text-muted-foreground leading-relaxed">
                        SAP ERP, Workflow Automation (Google Sheets, WATI), GDPR-Compliant Data Handling, AWS (Fundamentals), Generative AI &amp; Prompt Engineering
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Experience */}
                <div className="p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-4">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary font-mono flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Professional Experience
                  </h3>

                  {/* Experience 1 */}
                  <div className="border-l-2 border-primary/50 pl-4 py-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-foreground">Data Analyst</h4>
                        <p className="text-xs font-medium text-secondary-foreground">SRJ Edu Services Pvt. Ltd. (Jaipuria Edu Services Pvt. Ltd.), Noida, UP</p>
                      </div>
                      <span className="text-xs font-mono text-primary font-semibold">Dec 2025 – Present</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 leading-relaxed">
                      <li>Built 30+ customized school dashboards giving promoters a single point of truth for real-time fee collections, student strength and admission tracking.</li>
                      <li>Developed a centralized Head Office Audit Dashboard to monitor academic and financial compliance across 30 schools through one unified data interface.</li>
                      <li>Engineered a master data pipeline that aggregates group-wide student enrollment and financial health metrics for Head Office review at a glance.</li>
                      <li>Streamlined multi-school reporting by consolidating fragmented metrics into standardized visual dashboards for both school leadership and corporate oversight.</li>
                    </ul>
                  </div>

                  {/* Experience 2 */}
                  <div className="border-l-2 border-primary/50 pl-4 py-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-foreground">Data Analyst Intern</h4>
                        <p className="text-xs font-medium text-secondary-foreground">WTF Gyms, Noida, UP</p>
                      </div>
                      <span className="text-xs font-mono text-primary font-semibold">May 2025 – Jul 2025</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 leading-relaxed">
                      <li>Built Power BI dashboards (DAX) for lead-funnel tracking, agent productivity and multi-location performance analysis.</li>
                      <li>Automated lead capture and routing with a data pipeline (Meta Ads → Google Sheets → WhatsApp/WATI), removing manual lead handling.</li>
                      <li>Developed a real-time interview tracking system integrated with WATI and ERP-based HR workflows for scheduling and candidate notifications.</li>
                      <li>Designed GDPR-compliant automated reporting, reducing manual effort by 12+ hours per week.</li>
                    </ul>
                  </div>

                  {/* Experience 3 */}
                  <div className="border-l-2 border-primary/50 pl-4 py-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-foreground">Engineering Intern</h4>
                        <p className="text-xs font-medium text-secondary-foreground">Kribhco Fertilizers Ltd., Shahjahanpur, UP</p>
                      </div>
                      <span className="text-xs font-mono text-primary font-semibold">Jun 2022 – Jul 2022</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 leading-relaxed">
                      <li>Worked with SAP ERP for workforce operations and reporting; supported process data collection within industrial teams.</li>
                    </ul>
                  </div>
                </div>

                {/* Projects */}
                <div className="p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-3">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary font-mono flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4" />
                    Key Projects
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/80 space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-foreground">Customer Segmentation &amp; Marketing Analytics (RFM)</span>
                        <span className="text-[10px] font-mono text-primary">Aug 2025</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Processed 100,000+ customer transactions with an RFM model; built an interactive Excel dashboard identifying top 3 segments generating ~82% of revenue.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/80 space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-foreground">Employee Attrition &amp; Retention Analysis</span>
                        <span className="text-[10px] font-mono text-primary">May–Jul 2025</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Analyzed HR data using CRISP-DM and built an Attrition Dashboard tracking monthly churn; delivered location-based retention strategies to HR leadership.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/80 space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-foreground">Customer Satisfaction in E-Banking</span>
                        <span className="text-[10px] font-mono text-primary">Feb–Apr 2025</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Surveyed 226 respondents and applied Chi-Square, T-Test and ANOVA; recommended UX improvements and digital-literacy programs for e-banking adoption.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/80 space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-foreground">National Logistics Policy Prospects</span>
                        <span className="text-[10px] font-mono text-primary">Dec 2024–Apr 2025</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Applied policy analysis and forecasting to assess infrastructure and cost gaps; proposed ERP-integrated data-driven supply-chain recommendations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Education & Certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Education */}
                  <div className="p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-2.5">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary font-mono flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Education
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div>
                        <div className="flex justify-between font-semibold text-foreground">
                          <span>PGDM (Business Analytics)</span>
                          <span className="font-mono text-primary">2024 – 2026</span>
                        </div>
                        <p className="text-muted-foreground">Jaipuria School of Business, Ghaziabad | CGPA: 7.06</p>
                      </div>
                      <div>
                        <div className="flex justify-between font-semibold text-foreground">
                          <span>B.Tech (Chemical Engineering)</span>
                          <span className="font-mono text-primary">2019 – 2023</span>
                        </div>
                        <p className="text-muted-foreground">SCRIET, CCSU Meerut | CGPA: 6.74</p>
                      </div>
                      <div>
                        <div className="flex justify-between font-semibold text-foreground">
                          <span>Class XII (PCM)</span>
                          <span className="font-mono text-primary">2019</span>
                        </div>
                        <p className="text-muted-foreground">S Devi Inter College, Madhuban, Mau | 61%</p>
                      </div>
                      <div>
                        <div className="flex justify-between font-semibold text-foreground">
                          <span>Class X (Science)</span>
                          <span className="font-mono text-primary">2017</span>
                        </div>
                        <p className="text-muted-foreground">S Devi Inter College, Madhuban, Mau | 81.33%</p>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-2.5">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary font-mono flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Certifications
                    </h3>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span><strong>MOS: Excel Associate</strong> – Microsoft (2019)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span><strong>Google AI Essentials</strong> – Google, Coursera</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span><strong>AI Chat Prompts for Business Analysis</strong> – LinkedIn</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span><strong>What Is Generative AI?</strong> – LinkedIn Learning</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span><strong>International Business Analytics</strong> – MDIS Singapore (Mar 2025)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        <span><strong>Data Analytics (Python, SQL, Power BI)</strong> – PW Skills</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        <span><strong>Strategic Management</strong> – SWAYAM, IIM Bangalore</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer in Theme Border */}
          <div className="p-3 sm:p-4 border-t border-border bg-card/90 backdrop-blur flex items-center justify-between gap-3 shrink-0">
            <span className="text-[11px] text-muted-foreground font-mono">
              Er. Ritesh Singh • Complete Data &amp; Business Analyst Curriculum Vitae
            </span>

            <div className="flex items-center gap-2">
              <a
                href={resumePdfUrl}
                download="Ritesh_Singh_Data_Analyst_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-brand text-primary-foreground font-semibold text-xs shadow-md hover:shadow-primary/30 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-secondary text-foreground text-xs font-medium hover:bg-muted transition-colors border border-border cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumePreviewModal;
