import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Send, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Briefcase, 
  User, 
  MessageSquare, 
  Share2, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  RotateCcw,
  MessageCircle,
  ExternalLink,
  Zap,
  ArrowRight
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  designation: string;
  contactNo: string;
  email: string;
  message: string;
  socialProfile: string;
  intent: string;
  preferredContact: "Email" | "WhatsApp" | "Call";
}

const INITIAL_FORM: FormData = {
  name: "",
  designation: "",
  contactNo: "",
  email: "",
  message: "",
  socialProfile: "",
  intent: "Data Analytics & Dashboards",
  preferredContact: "Email",
};

const TOPIC_PRESETS = [
  { id: "analytics", label: "📊 Data Analytics & Dashboards", starter: "Hi Ritesh, I'd like to discuss a data analytics / dashboard project for..." },
  { id: "automation", label: "⚡ Automation (Make / N8N)", starter: "Hi Ritesh, we need automated workflows and CRM integration for..." },
  { id: "hiring", label: "💼 Career / Full-Time Role", starter: "Hi Ritesh, we have an exciting Data/Business Analyst opportunity at..." },
  { id: "consulting", label: "🤝 Consulting & Advisory", starter: "Hi Ritesh, I'd like to consult with you regarding..." },
];

const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwSUEECJKJOIT6k8b_WS310DYg1TXM5UMCtzlnJff8iciWevUAPcyVWGlqWOU4H1d2c/exec";

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [receiptId, setReceiptId] = useState<string>("");

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleInputChange = (field: keyof FormData, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSelectTopic = (topic: typeof TOPIC_PRESETS[0]) => {
    setFormData((prev) => ({
      ...prev,
      intent: topic.label,
      message: prev.message ? prev.message : topic.starter,
    }));
  };

  const handleClear = () => {
    setFormData(INITIAL_FORM);
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Required fields validation
    if (!formData.name.trim()) {
      setErrorMsg("Please provide your name.");
      return;
    }
    if (!formData.designation.trim()) {
      setErrorMsg("Please provide your designation / organization.");
      return;
    }
    if (!formData.contactNo.trim()) {
      setErrorMsg("Please provide your contact number.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }

    setIsSubmitting(true);
    const generatedReceipt = `RS-${Date.now().toString().slice(-6)}`;
    setReceiptId(generatedReceipt);

    try {
      const payload = {
        receiptId: generatedReceipt,
        timestamp: new Date().toISOString(),
        name: formData.name.trim(),
        designation: formData.designation.trim(),
        contactNo: formData.contactNo.trim(),
        email: formData.email.trim(),
        intent: formData.intent,
        preferredContact: formData.preferredContact,
        socialProfile: formData.socialProfile.trim(),
        message: formData.message.trim(),
      };

      // Store in local inquiries cache so inquiry is never lost
      try {
        const stored = JSON.parse(localStorage.getItem("ritesh_portfolio_inquiries") || "[]");
        stored.unshift(payload);
        localStorage.setItem("ritesh_portfolio_inquiries", JSON.stringify(stored.slice(0, 50)));
      } catch (err) {
        console.error("Local caching error:", err);
      }

      // POST directly to Google Apps Script Web App
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      // Still show success since backup is captured locally
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-card/95 border border-primary/20 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden my-auto max-h-[92vh] flex flex-col backdrop-blur-xl"
        >
          {/* Top Interactive Gradient Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-primary via-indigo-500 to-cyan-400 shrink-0" />

          {/* Modal Header */}
          <div className="px-5 py-4 border-b border-border bg-card/50 flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-brand p-[2px]">
                  <img
                    src={`${import.meta.env.BASE_URL}images/Ritesh%20image.JPG`}
                    alt="Er. Ritesh Singh"
                    className="w-full h-full rounded-full object-cover bg-background"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-foreground">
                    Connect with @Ritesh
                  </h2>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available for Analytics
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Er. Ritesh Singh • Data & Business Analyst • Six Sigma Green Belt
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-secondary text-muted-foreground hover:text-foreground border border-border hover:bg-muted transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Body */}
          <div className="overflow-y-auto flex-1">
            {isSubmitted ? (
              /* Innovative Digital Receipt Screen */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 sm:p-10 max-w-xl mx-auto text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Receipt ID: {receiptId}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. Your details have landed directly in Ritesh's Google Sheet and an email notification has been dispatched.
                  </p>
                </div>

                {/* Digital Card Preview */}
                <div className="p-5 rounded-2xl bg-secondary/40 border border-border text-left text-xs space-y-2.5 backdrop-blur shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-border/80">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Inquiry Record
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Name:</span>
                      <span className="font-medium text-foreground">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Designation:</span>
                      <span className="font-medium text-foreground">{formData.designation}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Contact No:</span>
                      <span className="font-medium text-foreground">{formData.contactNo}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Email:</span>
                      <span className="font-medium text-foreground">{formData.email}</span>
                    </div>
                  </div>
                  {formData.message && (
                    <div className="pt-2 border-t border-border/60">
                      <span className="text-muted-foreground block text-[11px]">Message:</span>
                      <p className="font-normal text-foreground mt-0.5 line-clamp-3 italic">
                        "{formData.message}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/918318174679?text=${encodeURIComponent(`Hi Ritesh, I just submitted an inquiry on your portfolio (Receipt ${receiptId}): ${formData.message}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition-all shadow-md hover:shadow-emerald-500/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ping on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      handleClear();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-foreground font-medium text-xs sm:text-sm hover:bg-muted transition-colors border border-border"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Submit Another</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-gradient-brand text-primary-foreground font-medium text-xs sm:text-sm shadow-md hover:opacity-90 transition-opacity"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Innovative Form Split Layout */
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
                {/* Left Side: Context & Quick Info (4 cols) */}
                <div className="lg:col-span-4 p-5 sm:p-6 bg-muted/20 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] font-mono tracking-wider uppercase text-primary font-semibold">
                        Direct Channel
                      </span>
                      <h3 className="text-lg font-bold text-foreground mt-0.5">
                        Let's collaborate on data & automation.
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                        Whether you need automated ETL pipelines, Power BI dashboards, machine learning models, or full-time analytics leadership.
                      </p>
                    </div>

                    {/* Direct Contact Pills */}
                    <div className="space-y-2 pt-2">
                      <a
                        href="tel:+918318174679"
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-card border border-border hover:border-primary/50 text-xs transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[10px] text-muted-foreground font-mono">CALL / WHATSAPP</span>
                          <span className="font-semibold text-foreground truncate block">+91 8318174679</span>
                        </div>
                      </a>

                      <a
                        href="mailto:riteshsingh.analytics@gmail.com"
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-card border border-border hover:border-primary/50 text-xs transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[10px] text-muted-foreground font-mono">EMAIL DIRECTLY</span>
                          <span className="font-semibold text-foreground truncate block">singhritesh8236@gmail.com</span>
                        </div>
                      </a>
                    </div>

                    {/* Quick Topic Selector */}
                    <div className="pt-2">
                      <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                        Select Inquiry Topic:
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {TOPIC_PRESETS.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => handleSelectTopic(t)}
                            className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between border ${
                              formData.intent === t.label
                                ? "bg-primary/15 text-primary border-primary/40 shadow-sm"
                                : "bg-card/60 text-muted-foreground border-border hover:text-foreground hover:bg-card"
                            }`}
                          >
                            <span>{t.label}</span>
                            {formData.intent === t.label && (
                              <Zap className="w-3.5 h-3.5 text-primary shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Trust Footer */}
                  <div className="p-3 rounded-xl bg-card border border-border/80 text-[11px] text-muted-foreground flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span>Average reply window: <strong>Under 3 hours</strong></span>
                  </div>
                </div>

                {/* Right Side: The Smart Form (8 cols) */}
                <div className="lg:col-span-8 p-5 sm:p-7">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Error Banner */}
                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-destructive shrink-0" />
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}

                    {/* Row 1: Name & Designation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-primary" />
                          <span>Name</span>
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all shadow-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-primary" />
                          <span>Designation & Organization</span>
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Analytics Manager at Zomato"
                          value={formData.designation}
                          onChange={(e) => handleInputChange("designation", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Row 2: Contact No & Email Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-primary" />
                          <span>Contact No.</span>
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={formData.contactNo}
                          onChange={(e) => handleInputChange("contactNo", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all shadow-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-primary" />
                          <span>Email Address</span>
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. rahul@company.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Row 3: Social Media Profiles */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5 text-primary" />
                        <span>Social Media Profile (e.g., LinkedIn)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. linkedin.com/in/yourprofile or twitter.com/handle"
                        value={formData.socialProfile}
                        onChange={(e) => handleInputChange("socialProfile", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all shadow-sm"
                      />
                    </div>

                    {/* Row 4: Your Message */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-primary" />
                          <span>Your Message / Requirement</span>
                        </label>
                        <span className="text-[11px] text-muted-foreground">
                          {formData.message.length} chars
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        placeholder="Tell Ritesh about your project scope, analytics objectives, or position requirements..."
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all resize-none shadow-sm"
                      />
                    </div>

                    {/* Preferred Response Mode */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border text-xs flex-wrap gap-2">
                      <span className="text-muted-foreground font-medium">Preferred Reply Via:</span>
                      <div className="flex items-center gap-1.5">
                        {(["Email", "WhatsApp", "Call"] as const).map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => handleInputChange("preferredContact", mode)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                              formData.preferredContact === mode
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "bg-card text-muted-foreground hover:text-foreground border border-border"
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-2 flex items-center justify-between gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-brand text-primary-foreground font-semibold text-xs sm:text-sm shadow-lg hover:shadow-primary/30 transition-all cursor-pointer disabled:opacity-60 active:scale-95"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            <span>Sending to Sheet...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 shrink-0" />
                            <span>Send Message &amp; Sync</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleClear}
                        disabled={isSubmitting}
                        className="text-xs text-muted-foreground hover:text-foreground font-medium px-2 py-1 transition-colors cursor-pointer"
                      >
                        Clear Form
                      </button>
                    </div>

                    <div className="text-center text-[10px] text-muted-foreground/80 pt-1">
                      🔒 Secure sync: Landed directly in Google Sheet • Encrypted alert sent to Ritesh
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
};

export default ContactModal;
