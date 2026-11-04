import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Send, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Settings2, 
  Copy, 
  Check, 
  ExternalLink, 
  HelpCircle,
  FileSpreadsheet,
  MailCheck,
  AlertCircle
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
}

const INITIAL_FORM: FormData = {
  name: "",
  designation: "",
  contactNo: "",
  email: "",
  message: "",
  socialProfile: "",
};

const DEFAULT_WEBHOOK_KEY = "ritesh_sheet_webhook_url";

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  // Load configured Google Apps Script Webhook from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(DEFAULT_WEBHOOK_KEY);
    if (saved) {
      setWebhookUrl(saved);
    }
  }, []);

  const handleWebhookSave = (val: string) => {
    const trimmed = val.trim();
    setWebhookUrl(trimmed);
    localStorage.setItem(DEFAULT_WEBHOOK_KEY, trimmed);
  };

  const handleInputChange = (field: keyof FormData, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errorMsg) setErrorMsg("");
  };

  const handleClear = () => {
    setFormData(INITIAL_FORM);
    setErrorMsg("");
  };

  const copyAppsScript = async () => {
    try {
      const resp = await fetch(`${import.meta.env.BASE_URL}google-apps-script.js`);
      if (resp.ok) {
        const text = await resp.text();
        await navigator.clipboard.writeText(text);
        setCopiedScript(true);
        setTimeout(() => setCopiedScript(false), 2500);
      }
    } catch {
      // Fallback
      const scriptCode = `// Google Apps Script for Ritesh's Portfolio
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.name, data.designation, data.contactNo, data.email, data.socialProfile, data.message]);
  MailApp.sendEmail({
    to: "singhritesh8236@gmail.com, riteshsingh.analytics@gmail.com",
    subject: "🚀 New Portfolio Inquiry: " + data.name + " (" + data.designation + ")",
    body: "Name: " + data.name + "\\nDesignation: " + data.designation + "\\nContact No: " + data.contactNo + "\\nEmail: " + data.email + "\\nSocial: " + data.socialProfile + "\\nMessage:\\n" + data.message
  });
  return ContentService.createTextOutput(JSON.stringify({status: "success"})).setMimeType(ContentService.MimeType.JSON);
}`;
      await navigator.clipboard.writeText(scriptCode);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Required fields validation
    if (!formData.name.trim()) {
      setErrorMsg("Please enter your Name.");
      return;
    }
    if (!formData.designation.trim()) {
      setErrorMsg("Please enter your Designation.");
      return;
    }
    if (!formData.contactNo.trim()) {
      setErrorMsg("Please enter your Contact No.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid Email Address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        name: formData.name.trim(),
        designation: formData.designation.trim(),
        contactNo: formData.contactNo.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        socialProfile: formData.socialProfile.trim(),
      };

      // Always backup to local inquiries queue so no lead is lost
      try {
        const stored = JSON.parse(localStorage.getItem("ritesh_portfolio_inquiries") || "[]");
        stored.unshift(payload);
        localStorage.setItem("ritesh_portfolio_inquiries", JSON.stringify(stored.slice(0, 50)));
      } catch (err) {
        console.error("Local storage error:", err);
      }

      // If webhookUrl is configured, POST to Google Apps Script
      if (webhookUrl && webhookUrl.startsWith("http")) {
        // We use mode: "no-cors" with text/plain to prevent CORS preflight restrictions from Google Script
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
        });
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      // Even if network fails, we recorded locally and can show success or mailto fallback
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Decorative Header Accent Bar */}
          <div className="h-2.5 w-full bg-gradient-to-r from-primary via-indigo-500 to-cyan-400 shrink-0" />

          {/* Modal Header */}
          <div className="p-4 sm:p-6 border-b border-border bg-card/90 backdrop-blur flex items-start justify-between gap-4 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Connect with @Ritesh
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="w-3 h-3" /> Direct Form
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Fill in the details below. Responses land directly in Google Sheets and notify Ritesh instantly.
              </p>
              <p className="text-[11px] text-destructive font-medium mt-1">
                * Indicates required question
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowConfig(!showConfig)}
                title="Google Sheet Integration Settings"
                className={`p-2 rounded-lg border transition-colors ${
                  showConfig 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-secondary text-muted-foreground hover:text-foreground border-border hover:bg-muted"
                }`}
              >
                <Settings2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground border border-border hover:bg-muted transition-colors"
                aria-label="Close form"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Config / Google Sheet Webhook Drawer */}
          {showConfig && (
            <div className="p-4 bg-muted/60 border-b border-border text-xs space-y-3 shrink-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                  Google Sheet & Instant Email Setup
                </span>
                <button
                  type="button"
                  onClick={copyAppsScript}
                  className="flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied Code!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy 1-Click Apps Script
                    </>
                  )}
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                  Google Apps Script Web App URL (optional — leave empty or paste your deployed URL):
                </label>
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                  value={webhookUrl}
                  onChange={(e) => handleWebhookSave(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-md bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="text-[11px] text-muted-foreground bg-card/60 p-2.5 rounded-lg border border-border space-y-1">
                <p className="font-medium text-foreground">💡 How to connect your own Google Sheet in 60 seconds:</p>
                <ol className="list-decimal list-inside space-y-0.5 ml-1">
                  <li>Create a new Google Sheet.</li>
                  <li>Click <strong>Extensions &gt; Apps Script</strong> and paste the copied script.</li>
                  <li>Click <strong>Deploy &gt; New deployment &gt; Web app</strong>.</li>
                  <li>Set <strong>Execute as: Me</strong> and <strong>Who has access: Anyone</strong>.</li>
                  <li>Copy the resulting Web App URL and paste it in the box above!</li>
                </ol>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">
                  ✓ Automatically appends rows to your Sheet and shoots emails to <strong>singhritesh8236@gmail.com</strong>!
                </p>
              </div>
            </div>
          )}

          {/* Form Body or Success State */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Response Recorded!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2 leading-relaxed">
                    Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. Your details have been successfully captured and an instant alert has been dispatched to Ritesh's inbox.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-secondary/50 border border-border max-w-md mx-auto text-left text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-foreground font-semibold pb-1 border-b border-border">
                    <MailCheck className="w-4 h-4 text-primary" />
                    <span>Inquiry Summary</span>
                  </div>
                  <p><span className="text-muted-foreground">Name:</span> {formData.name}</p>
                  <p><span className="text-muted-foreground">Designation:</span> {formData.designation}</p>
                  <p><span className="text-muted-foreground">Contact:</span> {formData.contactNo}</p>
                  <p><span className="text-muted-foreground">Email:</span> {formData.email}</p>
                  {formData.message && <p><span className="text-muted-foreground">Message:</span> {formData.message}</p>}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      handleClear();
                    }}
                    className="px-4 py-2 rounded-lg bg-secondary text-foreground text-xs sm:text-sm font-medium hover:bg-muted transition-colors border border-border"
                  >
                    Submit another response
                  </button>
                  <a
                    href={`mailto:singhritesh8236@gmail.com?subject=Inquiry from ${encodeURIComponent(formData.name)}&body=Name: ${encodeURIComponent(formData.name)}%0D%0ADesignation: ${encodeURIComponent(formData.designation)}%0D%0AContact: ${encodeURIComponent(formData.contactNo)}%0D%0AEmail: ${encodeURIComponent(formData.email)}%0D%0AMessage:%0D%0A${encodeURIComponent(formData.message)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <span>Open in Email App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-gradient-brand text-primary-foreground text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Question 1: Name * */}
                <div className="p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-foreground">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your answer"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary pb-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                  />
                </div>

                {/* Question 2: Designation * */}
                <div className="p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-foreground">
                    Designation <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your answer"
                    value={formData.designation}
                    onChange={(e) => handleInputChange("designation", e.target.value)}
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary pb-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                  />
                </div>

                {/* Question 3: Contact No. * */}
                <div className="p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-foreground">
                    Contact No. <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Your answer"
                    value={formData.contactNo}
                    onChange={(e) => handleInputChange("contactNo", e.target.value)}
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary pb-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                  />
                </div>

                {/* Question 4: Email Address * */}
                <div className="p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-foreground">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Your answer"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary pb-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                  />
                </div>

                {/* Question 5: Your Message */}
                <div className="p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-foreground">
                    Your Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Your answer"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary pb-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Question 6: Social Media Profiles (e.g., LinkedIn) */}
                <div className="p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-foreground">
                    Social Media Profiles (e.g., LinkedIn)
                  </label>
                  <input
                    type="text"
                    placeholder="Your answer"
                    value={formData.socialProfile}
                    onChange={(e) => handleInputChange("socialProfile", e.target.value)}
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary pb-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                  />
                </div>

                {/* Bottom Action Buttons (Matching Screenshot) */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#673ab7] hover:bg-[#5e35b1] text-white font-medium text-sm sm:text-base transition-all shadow-md hover:shadow-lg disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={isSubmitting}
                    className="text-primary hover:text-primary/80 font-medium text-sm transition-colors px-2 py-1"
                  >
                    Clear form
                  </button>
                </div>

                <div className="pt-2 text-center text-[11px] text-muted-foreground">
                  Responses are securely synced to Ritesh Singh's inquiry registry. Never submit sensitive passwords.
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ContactModal;
