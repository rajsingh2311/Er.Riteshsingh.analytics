import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

  // Close on Escape key and lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-card border-2 border-primary/50 shadow-[0_0_40px_rgba(139,92,246,0.4)] rounded-2xl md:rounded-3xl overflow-hidden my-auto max-h-[calc(100vh-5.5rem)] flex flex-col backdrop-blur-xl"
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
                    className="w-full h-[52vh] sm:h-[58vh] md:h-[62vh] border-0 bg-white"
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
                    <span>•</span>
                    <a href="https://rajsingh2311.github.io/Er.Riteshsingh.analytics" target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">Portfolio</a>
                  </p>
                </div>

                {/* Professional Summary */}
                <div className="p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-2">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary font-mono flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Professional Summary
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-justify">
                    Data &amp; Business Analyst with 2+ years of experience turning operational data into decisions for leadership in education, fitness and market research. Own Power BI MIS reporting for a 30+ school group, cutting data turnaround by 60%, and have led a 20-member research team. Skilled in SQL, Power BI (DAX), Advanced Excel (MOS Expert) and Python, with a record of automating workflows (12+ hrs/week saved; lead response cut from 30 to under 10 min). PGDM in Business Analytics; Lean Six Sigma Green Belt.
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
                      <span className="font-semibold text-foreground block mb-1">BI &amp; Reporting</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Power BI (DAX, Power Query, Data Modeling), Advanced Excel (PivotTables, Power Query), Tableau, KPI Dashboards
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/50 border border-border/80">
                      <span className="font-semibold text-foreground block mb-1">Data &amp; Programming</span>
                      <p className="text-muted-foreground leading-relaxed">
                        SQL (Joins, Aggregations), Python (Pandas, NumPy, Scikit-learn, Matplotlib), Data Cleaning, ETL Pipelines
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/50 border border-border/80">
                      <span className="font-semibold text-foreground block mb-1">Analytics &amp; Methods</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Hypothesis Testing (Chi-Square, T-Test, ANOVA – SPSS), RFM, Funnel &amp; Pareto Analysis, Forecasting, CRISP-DM
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/50 border border-border/80">
                      <span className="font-semibold text-foreground block mb-1">Business &amp; Automation</span>
                      <p className="text-muted-foreground leading-relaxed">
                        KPI Definition, Stakeholder Reporting, Lean Six Sigma, Make.com, n8n, Apps Script, WATI, CRM, SAP ERP
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
                        <p className="text-xs font-medium text-secondary-foreground">Seth Anandram Jaipuria Group of Educational Institutions (SRJ Edu Services Pvt. Ltd.), Ghaziabad, UP</p>
                      </div>
                      <span className="text-xs font-mono text-primary font-semibold">Dec 2025 – Present</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                      <li>Built a unified Power BI MIS system (SQL, star schema, multi-level DAX) linking 30+ school campuses to Head Office, cutting data turnaround by 60%.</li>
                      <li>Trained and coordinated 30+ MIS Executives across schools, creating a standardized data bridge between schools and corporate.</li>
                      <li>Built 30+ customized school dashboards and automated exam-result analysis, giving promoters real-time visibility into fees, admissions and results.</li>
                      <li>Standardized academic and financial audit reporting via a Head Office Audit Dashboard; presented insights to the Sr. VP, Principals and Promoters.</li>
                      <li>Led event operations and data tracking for Athletica 2026, the group's annual sports day (543 athletes, 58 events).</li>
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
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                      <li>Automated lead capture for 14K+ leads (Meta Ads → Google Sheets → WhatsApp via Make.com &amp; WATI) with routing by source, priority and status, cutting first-response time from 30 min to under 10 min.</li>
                      <li>Built 5+ production Power BI dashboards (DAX) for lead-funnel conversion, agent productivity and gym-wise performance.</li>
                      <li>Automated daily manager reporting (12+ hours/week saved) and a single-click offer-letter generator for HR (Make.com).</li>
                      <li>Built a QR-based interview tracking system (Google Form → auto WATI alerts to HR and candidates), working with HR, Operations and Marketing.</li>
                    </ul>
                  </div>

                  {/* Experience 3 */}
                  <div className="border-l-2 border-primary/50 pl-4 py-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-foreground">Team Leader</h4>
                        <p className="text-xs font-medium text-secondary-foreground">Stagnet Research Pvt. Ltd., Noida, UP</p>
                      </div>
                      <span className="text-xs font-mono text-primary font-semibold">Jul 2023 – Jul 2024</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                      <li>Led a 20-member research team delivering market and qualitative survey projects for clients.</li>
                      <li>Built Power BI dashboards, Excel trackers and automated data-cleaning processes, cutting project turnaround by 25% and improving reporting accuracy.</li>
                      <li>Analyzed survey data and produced client-ready reports and visualizations.</li>
                    </ul>
                  </div>
                </div>

                {/* Projects */}
                <div className="p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-3">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary font-mono flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4" />
                    Key Projects
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/80 space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-foreground">HR Attrition Flight-Risk Predictor</span>
                      </div>
                      <span className="text-[10px] font-mono text-primary block">Python, Scikit-learn</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Built a classification model (CRISP-DM) predicting 90-day attrition risk from commute, overtime and satisfaction data, with prescriptive retention actions.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/80 space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-foreground">Customer Segmentation – RFM</span>
                      </div>
                      <span className="text-[10px] font-mono text-primary block">Python, Excel</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Segmented 100K+ transactions; found the top 3 tiers drive ~82% of revenue (Pareto) and designed retention strategies.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/80 space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-foreground">E-Banking Customer Satisfaction</span>
                      </div>
                      <span className="text-[10px] font-mono text-primary block">SPSS</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Analyzed 226 survey responses with Chi-Square, T-Test and ANOVA; identified statistically significant drivers of satisfaction (p = 0.0085).
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
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between font-semibold text-foreground">
                          <span>PGDM (Business Analytics &amp; Operations)</span>
                          <span className="font-mono text-primary">2024 – 2026</span>
                        </div>
                        <p className="text-muted-foreground">Jaipuria School of Business, Ghaziabad | CGPA 7.03</p>
                      </div>
                      <div>
                        <div className="flex justify-between font-semibold text-foreground">
                          <span>B.Tech (Chemical Engineering)</span>
                          <span className="font-mono text-primary">2019 – 2023</span>
                        </div>
                        <p className="text-muted-foreground">SCRIET, Chaudhary Charan Singh University, Meerut | CGPA 6.74</p>
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
                        <span><strong>Lean Six Sigma Green Belt</strong> – Grant Thornton Bharat (2025)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span><strong>Microsoft Office Specialist: Excel Expert</strong> – Microsoft (2025)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span><strong>Strategic Management</strong> – IIM Bangalore (2026)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span><strong>Google AI Essentials</strong> – Google (2025)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span><strong>International Business</strong> – MDIS Singapore (2025)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Leadership */}
                <div className="p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-2.5">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary font-mono flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Leadership
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="p-3 rounded-xl bg-secondary/40 border border-border/80">
                      <p className="font-semibold text-foreground mb-0.5">Student Co-ordinator, Business Analytics Club</p>
                      <p className="text-[11px] font-mono text-primary mb-1">Jaipuria School of Business (2024 – 26)</p>
                      <p>Grew membership 50%; mentored 20+ students.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/40 border border-border/80">
                      <p className="font-semibold text-foreground mb-0.5">Finalist, Trading Simulation Challenge</p>
                      <p className="text-[11px] font-mono text-primary mb-1">Jaipuria School of Business (2024)</p>
                      <p>Recognized for strategic analysis and execution in algorithmic trading simulation.</p>
                    </div>
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

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
};

export default ResumePreviewModal;
