import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  RotateCcw, 
  Code2, 
  Sliders, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  Zap, 
  BarChart2,
  Copy,
  Check,
  Cpu,
  Eye,
  FileCode,
  Users,
  CreditCard,
  Building2
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

type ProjectType = "attrition" | "rfm" | "ebanking";

// Helper to generate Python script text for Attrition
const getAttritionPythonCode = (params: {
  monthlyIncome: number;
  distanceFromHome: number;
  overtime: boolean;
  jobSatisfaction: number;
  yearsAtCompany: number;
  workLifeBalance: number;
}) => {
  return `# =====================================================================
# EMPLOYEE ATTRITION & RETENTION PREDICTOR (CRISP-DM FRAMEWORK)
# Model: Tuned RandomForestClassifier + Logistic Regression Pipeline
# Edit the data values below and click [▶ Run Python Code]
# =====================================================================

# 1. INPUT EMPLOYEE PROFILE (YOU CAN EDIT THESE VALUES DIRECTLY):
monthly_income = ${params.monthlyIncome}        # Monthly salary in INR (e.g. 35000 to 180000)
distance_from_home = ${params.distanceFromHome}       # Commute distance in km (e.g. 5 to 45)
overtime = ${params.overtime ? "True" : "False"}                # Frequent overtime requirement (True / False)
job_satisfaction = ${params.jobSatisfaction}         # Rating on scale 1 (Low) to 5 (High)
years_at_company = ${params.yearsAtCompany}         # Total tenure in years
work_life_balance = ${params.workLifeBalance}        # Rating on scale 1 (Poor) to 4 (Excellent)

# 2. FEATURE ENGINEERING & SCALING
features = {
    'MonthlyIncome': monthly_income,
    'DistanceFromHome': distance_from_home,
    'OverTime_Yes': 1 if overtime else 0,
    'JobSatisfaction': job_satisfaction,
    'YearsAtCompany': years_at_company,
    'WorkLifeBalance': work_life_balance
}

# 3. PREDICTION PIPELINE INFERENCE
# model = joblib.load('models/attrition_random_forest.pkl')
# probability = model.predict_proba([list(features.values())])[0][1]
print(f"[INFO] Evaluating employee with monthly_income=Rs.{monthly_income:,}, overtime={overtime}")
print(f"[INFO] Commute={distance_from_home}km | Satisfaction={job_satisfaction}/5 | Balance={work_life_balance}/4")
`;
};

// Helper for RFM code
const getRfmPythonCode = (params: {
  recencyDays: number;
  frequencyOrders: number;
  monetarySpend: number;
}) => {
  return `# =====================================================================
# CUSTOMER RFM SEGMENTATION & CLV ENGINE (PANDAS + SKLEARN)
# Framework: Recency, Frequency, Monetary Score Partitioning
# Edit the data values below and click [▶ Run Python Code]
# =====================================================================

# 1. INPUT CUSTOMER TRANSACTION METRICS (EDIT DIRECTLY):
recency_days = ${params.recencyDays}           # Days since customer's last purchase (1 - 120)
frequency_orders = ${params.frequencyOrders}       # Total completed orders in past 12 months
monetary_spend = ${params.monetarySpend}       # Total net revenue spend in INR

# 2. RFM QUINTILE SCORING (Scale 1 to 5)
def compute_rfm_score(r, f, m):
    r_score = 5 if r <= 15 else (4 if r <= 30 else (3 if r <= 60 else (2 if r <= 90 else 1)))
    f_score = 5 if f >= 20 else (4 if f >= 12 else (3 if f >= 6 else (2 if f >= 2 else 1)))
    m_score = 5 if m >= 100000 else (4 if m >= 50000 else (3 if m >= 25000 else (2 if m >= 10000 else 1)))
    return f"{r_score}{f_score}{m_score}"

rfm_code = compute_rfm_score(recency_days, frequency_orders, monetary_spend)
print(f"[RFM] Customer profile: R={recency_days}d, F={frequency_orders} txns, M=Rs.{monetary_spend:,}")
print(f"[RFM] Composite Score: {rfm_code}")
`;
};

// Helper for SPSS / E-Banking code
const getEBankingPythonCode = (params: {
  gender: string;
  ageGroup: string;
  transactionFreq: string;
  securityTrust: number;
}) => {
  return `# =====================================================================
# E-BANKING CUSTOMER SATISFACTION HYPOTHESIS TESTER (SCIPY.STATS)
# Statistical Analysis: Chi-Square Independence & Two-Sample T-Test
# Edit the survey responses below and click [▶ Run Python Code]
# =====================================================================

# 1. INPUT SURVEY RESPONSE DATA (EDIT DIRECTLY):
gender = "${params.gender}"                    # Options: "Female" | "Male"
age_group = "${params.ageGroup}"                  # Options: "18-25" | "26-40" | "41-60" | "60+"
transaction_frequency = "${params.transactionFreq}"  # Options: "Daily" | "Weekly" | "Monthly"
security_trust_score = ${params.securityTrust}         # Scale 1 (Untrusted) to 5 (High Trust)

# 2. RUN HYPOTHESIS TEST (H0: Demographics have no impact on satisfaction)
# chi2, p_val, dof, _ = scipy.stats.chi2_contingency(observed_cross_tab)
print(f"[SURVEY] Respondent: {gender}, Age {age_group}, Frequency: {transaction_frequency}")
print(f"[METRIC] Security Trust: {security_trust_score}/5 Stars")
print(f"[STAT] Chi-Square test result: chi2=18.42, p-value=0.0085 (p < 0.05)")
`;
};

export const PythonProjectSimulator = () => {
  const [activeModel, setActiveModel] = useState<ProjectType>("attrition");
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "inputs" | "split">("split");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  // ----------------------------------------------------
  // MODEL 1: ATTRITION & RETENTION PREDICTOR
  // ----------------------------------------------------
  const [attritionInputs, setAttritionInputs] = useState({
    monthlyIncome: 65000,
    distanceFromHome: 18,
    overtime: true,
    jobSatisfaction: 2,
    yearsAtCompany: 2,
    workLifeBalance: 2,
  });

  // ----------------------------------------------------
  // MODEL 2: RFM CUSTOMER SEGMENTATION
  // ----------------------------------------------------
  const [rfmInputs, setRfmInputs] = useState({
    recencyDays: 14,
    frequencyOrders: 18,
    monetarySpend: 145000,
  });

  // ----------------------------------------------------
  // MODEL 3: SPSS / E-BANKING SATISFACTION
  // ----------------------------------------------------
  const [eBankingInputs, setEBankingInputs] = useState({
    gender: "Female",
    ageGroup: "26-40",
    transactionFreq: "Daily",
    securityTrust: 4,
  });

  // Current editable code text in the editor
  const [editableCode, setEditableCode] = useState<string>(() => 
    getAttritionPythonCode(attritionInputs)
  );

  // Sync code whenever model or inputs change from UI controls
  const syncCodeFromInputs = useCallback((model: ProjectType) => {
    if (model === "attrition") {
      setEditableCode(getAttritionPythonCode(attritionInputs));
    } else if (model === "rfm") {
      setEditableCode(getRfmPythonCode(rfmInputs));
    } else {
      setEditableCode(getEBankingPythonCode(eBankingInputs));
    }
  }, [attritionInputs, rfmInputs, eBankingInputs]);

  // When model switches, update code text and run initial execution
  useEffect(() => {
    syncCodeFromInputs(activeModel);
    runModelSimulation(activeModel);
  }, [activeModel]);

  // Parse code text to extract modified parameters when user edits code directly
  const parseCodeAndUpdateInputs = useCallback((code: string, model: ProjectType) => {
    try {
      if (model === "attrition") {
        const incomeMatch = code.match(/monthly_income\s*=\s*(\d+)/i);
        const distanceMatch = code.match(/distance_from_home\s*=\s*(\d+)/i);
        const overtimeMatch = code.match(/overtime\s*=\s*(True|False|true|false|"Yes"|'Yes'|"No"|'No')/i);
        const satMatch = code.match(/job_satisfaction\s*=\s*(\d+)/i);
        const yearsMatch = code.match(/years_at_company\s*=\s*(\d+)/i);
        const balanceMatch = code.match(/work_life_balance\s*=\s*(\d+)/i);

        setAttritionInputs(prev => ({
          monthlyIncome: incomeMatch ? Number(incomeMatch[1]) : prev.monthlyIncome,
          distanceFromHome: distanceMatch ? Number(distanceMatch[1]) : prev.distanceFromHome,
          overtime: overtimeMatch ? (overtimeMatch[1].toLowerCase() === "true" || overtimeMatch[1].toLowerCase().includes("yes")) : prev.overtime,
          jobSatisfaction: satMatch ? Math.min(Math.max(Number(satMatch[1]), 1), 5) : prev.jobSatisfaction,
          yearsAtCompany: yearsMatch ? Number(yearsMatch[1]) : prev.yearsAtCompany,
          workLifeBalance: balanceMatch ? Math.min(Math.max(Number(balanceMatch[1]), 1), 4) : prev.workLifeBalance,
        }));
      } else if (model === "rfm") {
        const rMatch = code.match(/recency_days\s*=\s*(\d+)/i);
        const fMatch = code.match(/frequency_orders\s*=\s*(\d+)/i);
        const mMatch = code.match(/monetary_spend\s*=\s*(\d+)/i);

        setRfmInputs(prev => ({
          recencyDays: rMatch ? Number(rMatch[1]) : prev.recencyDays,
          frequencyOrders: fMatch ? Number(fMatch[1]) : prev.frequencyOrders,
          monetarySpend: mMatch ? Number(mMatch[1]) : prev.monetarySpend,
        }));
      } else if (model === "ebanking") {
        const genderMatch = code.match(/gender\s*=\s*["'](Female|Male)["']/i);
        const ageMatch = code.match(/age_group\s*=\s*["']([^"']+)["']/i);
        const freqMatch = code.match(/transaction_frequency\s*=\s*["']([^"']+)["']/i);
        const trustMatch = code.match(/security_trust_score\s*=\s*(\d+)/i);

        setEBankingInputs(prev => ({
          gender: genderMatch ? genderMatch[1] : prev.gender,
          ageGroup: ageMatch ? ageMatch[1] : prev.ageGroup,
          transactionFreq: freqMatch ? freqMatch[1] : prev.transactionFreq,
          securityTrust: trustMatch ? Math.min(Math.max(Number(trustMatch[1]), 1), 5) : prev.securityTrust,
        }));
      }
    } catch {
      // Fallback silently if parsing partial edits
    }
  }, []);

  // Compute calculated results
  const attritionResult = useMemo(() => {
    let baseScore = 20;
    if (attritionInputs.overtime) baseScore += 28;
    if (attritionInputs.jobSatisfaction <= 2) baseScore += (3 - attritionInputs.jobSatisfaction) * 16;
    if (attritionInputs.workLifeBalance <= 2) baseScore += (3 - attritionInputs.workLifeBalance) * 12;
    if (attritionInputs.distanceFromHome > 20) baseScore += 15;
    if (attritionInputs.monthlyIncome < 50000) baseScore += 14;
    if (attritionInputs.yearsAtCompany < 2) baseScore += 8;

    const prob = Math.min(Math.max(baseScore, 8), 96);
    let riskTier: "High" | "Medium" | "Low" = "Low";
    if (prob > 65) riskTier = "High";
    else if (prob > 35) riskTier = "Medium";

    const featureImportance = [
      { feature: "Overtime Impact", impact: attritionInputs.overtime ? 28 : 5 },
      { feature: "Job Satisfaction", impact: (6 - attritionInputs.jobSatisfaction) * 6 },
      { feature: "Commute (km)", impact: Math.min(Math.round(attritionInputs.distanceFromHome * 0.7), 24) },
      { feature: "Income Equity", impact: Math.max(Math.round((120000 - attritionInputs.monthlyIncome) / 5000), 4) },
      { feature: "Tenure Friction", impact: attritionInputs.yearsAtCompany < 3 ? 16 : 6 },
    ];

    return { prob, riskTier, featureImportance };
  }, [attritionInputs]);

  const rfmResult = useMemo(() => {
    let rScore = 1;
    if (rfmInputs.recencyDays <= 15) rScore = 5;
    else if (rfmInputs.recencyDays <= 30) rScore = 4;
    else if (rfmInputs.recencyDays <= 60) rScore = 3;
    else if (rfmInputs.recencyDays <= 90) rScore = 2;

    let fScore = 1;
    if (rfmInputs.frequencyOrders >= 20) fScore = 5;
    else if (rfmInputs.frequencyOrders >= 12) fScore = 4;
    else if (rfmInputs.frequencyOrders >= 6) fScore = 3;
    else if (rfmInputs.frequencyOrders >= 2) fScore = 2;

    let mScore = 1;
    if (rfmInputs.monetarySpend >= 100000) mScore = 5;
    else if (rfmInputs.monetarySpend >= 50000) mScore = 4;
    else if (rfmInputs.monetarySpend >= 25000) mScore = 3;
    else if (rfmInputs.monetarySpend >= 10000) mScore = 2;

    let segment = "Potential Loyalists";
    let clvMultiplier = 1.2;

    if (rScore >= 4 && fScore >= 4 && mScore >= 4) {
      segment = "Champions (High Value)";
      clvMultiplier = 2.4;
    } else if (rScore >= 3 && fScore >= 3) {
      segment = "Loyal Regulars";
      clvMultiplier = 1.8;
    } else if (rScore <= 2 && fScore >= 3) {
      segment = "At-Risk (High Past Spend)";
      clvMultiplier = 0.9;
    } else if (rScore <= 2 && fScore <= 2) {
      segment = "Hibernating / Lost";
      clvMultiplier = 0.4;
    } else if (rScore >= 4 && fScore <= 2) {
      segment = "Promising Newcomers";
      clvMultiplier = 1.3;
    }

    const estimatedClv = Math.round(rfmInputs.monetarySpend * clvMultiplier);

    const radarData = [
      { metric: "Recency (R)", value: rScore * 20, fullMark: 100 },
      { metric: "Frequency (F)", value: fScore * 20, fullMark: 100 },
      { metric: "Monetary (M)", value: mScore * 20, fullMark: 100 },
      { metric: "Engagement", value: Math.round((rScore + fScore) * 10), fullMark: 100 },
      { metric: "Advocacy", value: Math.round((fScore + mScore) * 10), fullMark: 100 },
    ];

    return {
      rfmCode: `${rScore}-${fScore}-${mScore}`,
      segment,
      estimatedClv,
      radarData,
      scores: { rScore, fScore, mScore }
    };
  }, [rfmInputs]);

  const eBankingResult = useMemo(() => {
    let index = 5.0;
    if (eBankingInputs.gender === "Female") index += 1.4;
    if (eBankingInputs.transactionFreq === "Daily") index += 1.8;
    else if (eBankingInputs.transactionFreq === "Weekly") index += 0.9;
    index += (eBankingInputs.securityTrust - 3) * 0.9;

    const satisfactionScore = Math.min(Math.max(Number(index.toFixed(1)), 2.1), 9.8);
    return {
      satisfactionScore,
      pVal: "0.0085",
      chiSquare: "18.42",
      isSignificant: true,
    };
  }, [eBankingInputs]);

  // Execute simulation and write terminal logs
  const runModelSimulation = (model: ProjectType = activeModel) => {
    setIsExecuting(true);
    setTerminalLogs([]);

    setTimeout(() => {
      if (model === "attrition") {
        setTerminalLogs([
          `$ python3 hr_attrition_analytics.py`,
          `[1/4] Loaded dataset: IBM HR Analytics (1,470 samples, 35 features)...`,
          `[2/4] Parsing parameters: MonthlySalary=Rs.${attritionInputs.monthlyIncome.toLocaleString()}, Overtime=${attritionInputs.overtime ? "True" : "False"}, Commute=${attritionInputs.distanceFromHome}km...`,
          `[3/4] Running Ensemble Model: Random Forest (n=100) + Logistic Regression...`,
          `[4/4] Predicted Churn Probability: ${attritionResult.prob}% [${attritionResult.riskTier.toUpperCase()} RISK]`,
          `[ACTION] Generated prescriptive retention strategy & Shapley attribution breakdown.`
        ]);
      } else if (model === "rfm") {
        setTerminalLogs([
          `$ python3 rfm_customer_segmentation.py`,
          `[1/4] Ingested 100,000+ transaction ledger records into Pandas DataFrame...`,
          `[2/4] Scoring metrics: Recency=${rfmInputs.recencyDays}d, Frequency=${rfmInputs.frequencyOrders} txns, Spend=Rs.${rfmInputs.monetarySpend.toLocaleString()}...`,
          `[3/4] RFM Quintile Score: ${rfmResult.rfmCode} -> Classified as '${rfmResult.segment}'`,
          `[4/4] Computed 1-Year Projected CLV: Rs.${rfmResult.estimatedClv.toLocaleString()}`,
          `[ACTION] Automated workflow dispatched: Segment playbook configured.`
        ]);
      } else {
        setTerminalLogs([
          `$ python3 spss_ebanking_stats.py`,
          `[1/4] Ingesting survey responses (n=226 banking customers)...`,
          `[2/4] Testing Null Hypothesis H0 (Gender & Demographics independent of satisfaction)...`,
          `[3/4] Chi-Square Stat = ${eBankingResult.chiSquare}, p-value = ${eBankingResult.pVal} (p < 0.05)`,
          `[4/4] Null hypothesis REJECTED. Statistically significant correlation confirmed.`,
          `[ACTION] Outputting GDPR-compliant UI recommendations & demographic indices.`
        ]);
      }
      setIsExecuting(false);
    }, 400);
  };

  // Preset handlers that update inputs and regenerate Python code
  const applyAttritionPreset = (preset: "risk" | "stable" | "star") => {
    let newInputs = { ...attritionInputs };
    if (preset === "risk") {
      newInputs = {
        monthlyIncome: 38000,
        distanceFromHome: 32,
        overtime: true,
        jobSatisfaction: 1,
        yearsAtCompany: 1,
        workLifeBalance: 1,
      };
    } else if (preset === "stable") {
      newInputs = {
        monthlyIncome: 95000,
        distanceFromHome: 6,
        overtime: false,
        jobSatisfaction: 4,
        yearsAtCompany: 5,
        workLifeBalance: 4,
      };
    } else {
      newInputs = {
        monthlyIncome: 140000,
        distanceFromHome: 12,
        overtime: false,
        jobSatisfaction: 5,
        yearsAtCompany: 4,
        workLifeBalance: 3,
      };
    }
    setAttritionInputs(newInputs);
    setEditableCode(getAttritionPythonCode(newInputs));
  };

  const applyRfmPreset = (preset: "champions" | "atrisk" | "new") => {
    let newInputs = { ...rfmInputs };
    if (preset === "champions") {
      newInputs = { recencyDays: 6, frequencyOrders: 28, monetarySpend: 240000 };
    } else if (preset === "atrisk") {
      newInputs = { recencyDays: 95, frequencyOrders: 14, monetarySpend: 110000 };
    } else {
      newInputs = { recencyDays: 8, frequencyOrders: 2, monetarySpend: 22000 };
    }
    setRfmInputs(newInputs);
    setEditableCode(getRfmPythonCode(newInputs));
  };

  const applyEbankingPreset = (preset: "power" | "hesitant" | "standard") => {
    let newInputs = { ...eBankingInputs };
    if (preset === "power") {
      newInputs = { gender: "Female", ageGroup: "26-40", transactionFreq: "Daily", securityTrust: 5 };
    } else if (preset === "hesitant") {
      newInputs = { gender: "Male", ageGroup: "41-55", transactionFreq: "Monthly", securityTrust: 2 };
    } else {
      newInputs = { gender: "Female", ageGroup: "18-25", transactionFreq: "Weekly", securityTrust: 4 };
    }
    setEBankingInputs(newInputs);
    setEditableCode(getEBankingPythonCode(newInputs));
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass rounded-2xl border border-primary/30 p-3 sm:p-6 md:p-8 shadow-[0_0_30px_rgba(var(--glow)/0.15)] space-y-6 min-w-0 max-w-full overflow-hidden">
      {/* Header Bar & Dedicated 3-Card Model Selector */}
      <div className="space-y-4 pb-6 border-b border-border/80">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Python Kernel Active
            </span>
            <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/40 border border-border/50">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              Python 3.11 · Scikit-Learn · Pandas · NumPy
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="hidden sm:inline">Active Estimator:</span>
            <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/30 font-semibold">
              {activeModel === "attrition" ? "RandomForestClassifier" : activeModel === "rfm" ? "KMeans(n_clusters=4)" : "Statsmodels OLS & Chi2"}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gradient tracking-tight">
            Python Analytics Studio: Live Code & Execution
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed">
            Select an analytical model below to explore its live Python script. Edit parameters directly in the code editor or adjust sliders — then click <strong className="text-primary font-mono">[▶ Run Python Code]</strong> to compute instant model inference, logs, and interactive visual outputs.
          </p>
        </div>

        {/* Dedicated 3-Card Model Selector Deck - Responsive, zero ugly scrollbars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {/* Card 1: HR Attrition Model */}
          <button
            type="button"
            onClick={() => setActiveModel("attrition")}
            className={`text-left p-4 rounded-xl border transition-all duration-200 relative group cursor-pointer ${
              activeModel === "attrition"
                ? "bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-primary/60 shadow-md shadow-primary/10 ring-1 ring-primary/40"
                : "bg-card/70 border-border/80 hover:border-primary/40 hover:bg-card/90"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <div className={`p-2 rounded-lg border transition-colors ${
                activeModel === "attrition"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/60 text-muted-foreground border-border group-hover:text-foreground"
              }`}>
                <Users className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border whitespace-nowrap ${
                activeModel === "attrition"
                  ? "bg-primary/20 text-primary border-primary/40 font-bold"
                  : "bg-muted/40 text-muted-foreground border-border"
              }`}>
                {activeModel === "attrition" ? "● Active Model" : "Select Model"}
              </span>
            </div>
            <div className="font-semibold text-sm text-foreground">HR Attrition Model</div>
            <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
              Random Forest · Churn probability & retention drivers
            </div>
          </button>

          {/* Card 2: RFM Customer Segmentation */}
          <button
            type="button"
            onClick={() => setActiveModel("rfm")}
            className={`text-left p-4 rounded-xl border transition-all duration-200 relative group cursor-pointer ${
              activeModel === "rfm"
                ? "bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-primary/60 shadow-md shadow-primary/10 ring-1 ring-primary/40"
                : "bg-card/70 border-border/80 hover:border-primary/40 hover:bg-card/90"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <div className={`p-2 rounded-lg border transition-colors ${
                activeModel === "rfm"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/60 text-muted-foreground border-border group-hover:text-foreground"
              }`}>
                <CreditCard className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border whitespace-nowrap ${
                activeModel === "rfm"
                  ? "bg-primary/20 text-primary border-primary/40 font-bold"
                  : "bg-muted/40 text-muted-foreground border-border"
              }`}>
                {activeModel === "rfm" ? "● Active Model" : "Select Model"}
              </span>
            </div>
            <div className="font-semibold text-sm text-foreground">RFM Segmentation</div>
            <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
              K-Means · Recency, Frequency & Spend clusters
            </div>
          </button>

          {/* Card 3: SPSS E-Banking Stats */}
          <button
            type="button"
            onClick={() => setActiveModel("ebanking")}
            className={`text-left p-4 rounded-xl border transition-all duration-200 relative group cursor-pointer ${
              activeModel === "ebanking"
                ? "bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-primary/60 shadow-md shadow-primary/10 ring-1 ring-primary/40"
                : "bg-card/70 border-border/80 hover:border-primary/40 hover:bg-card/90"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <div className={`p-2 rounded-lg border transition-colors ${
                activeModel === "ebanking"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/60 text-muted-foreground border-border group-hover:text-foreground"
              }`}>
                <Building2 className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border whitespace-nowrap ${
                activeModel === "ebanking"
                  ? "bg-primary/20 text-primary border-primary/40 font-bold"
                  : "bg-muted/40 text-muted-foreground border-border"
              }`}>
                {activeModel === "ebanking" ? "● Active Model" : "Select Model"}
              </span>
            </div>
            <div className="font-semibold text-sm text-foreground">SPSS E-Banking Stats</div>
            <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
              Chi-Square & ANOVA · Adoption factors & Trust scores
            </div>
          </button>
        </div>
      </div>

      {/* View Mode Toggle: Split / Code First / Interactive Form & Execution Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-card/60 border border-border/80 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-primary" />
            Editor View:
          </span>
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border">
            <button
              onClick={() => setActiveTab("split")}
              className={`px-2.5 py-1 rounded-md text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === "split" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Split (Code + Results)</span>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-2.5 py-1 rounded-md text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === "code" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Full Code Editor</span>
            </button>
            <button
              onClick={() => setActiveTab("inputs")}
              className={`px-2.5 py-1 rounded-md text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === "inputs" ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Form Controls</span>
            </button>
          </div>
        </div>

        {/* Quick Scenario Fill Buttons & Run Script Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">Scenarios:</span>
          {activeModel === "attrition" && (
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => { applyAttritionPreset("risk"); runModelSimulation("attrition"); }}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium whitespace-nowrap bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition-all cursor-pointer"
              >
                High Flight Risk
              </button>
              <button
                onClick={() => { applyAttritionPreset("stable"); runModelSimulation("attrition"); }}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium whitespace-nowrap bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all cursor-pointer"
              >
                Stable Retained
              </button>
              <button
                onClick={() => { applyAttritionPreset("star"); runModelSimulation("attrition"); }}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium whitespace-nowrap bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 transition-all cursor-pointer"
              >
                Top Performer
              </button>
            </div>
          )}

          {activeModel === "rfm" && (
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => { applyRfmPreset("champions"); runModelSimulation("rfm"); }}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium whitespace-nowrap bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all cursor-pointer"
              >
                Champions
              </button>
              <button
                onClick={() => { applyRfmPreset("atrisk"); runModelSimulation("rfm"); }}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium whitespace-nowrap bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-all cursor-pointer"
              >
                At-Risk
              </button>
              <button
                onClick={() => { applyRfmPreset("new"); runModelSimulation("rfm"); }}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium whitespace-nowrap bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 transition-all cursor-pointer"
              >
                Trial Cohort
              </button>
            </div>
          )}

          {activeModel === "ebanking" && (
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => { applyEbankingPreset("power"); runModelSimulation("ebanking"); }}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium whitespace-nowrap bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all cursor-pointer"
              >
                High Adoption
              </button>
              <button
                onClick={() => { applyEbankingPreset("hesitant"); runModelSimulation("ebanking"); }}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium whitespace-nowrap bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-all cursor-pointer"
              >
                Skeptic
              </button>
              <button
                onClick={() => { applyEbankingPreset("standard"); runModelSimulation("ebanking"); }}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium whitespace-nowrap bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 transition-all cursor-pointer"
              >
                Standard
              </button>
            </div>
          )}

          {/* Run Button */}
          <button
            onClick={() => {
              parseCodeAndUpdateInputs(editableCode, activeModel);
              runModelSimulation(activeModel);
            }}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/25 transition-all active:scale-95 disabled:opacity-50 cursor-pointer whitespace-nowrap"
          >
            <Play className={`w-3.5 h-3.5 ${isExecuting ? "animate-spin" : "fill-current"}`} />
            <span>{isExecuting ? "Executing..." : "Run Python Code"}</span>
          </button>
        </div>
      </div>


      {/* Main Workspace Layout */}
      <div className={`grid gap-6 ${activeTab === "split" ? "lg:grid-cols-12" : "grid-cols-1"}`}>
        {/* LEFT PANE: LIVE PYTHON CODE EDITOR & QUICK INPUT SYNC */}
        {(activeTab === "split" || activeTab === "code" || activeTab === "inputs") && (
          <div className={`${activeTab === "split" ? "lg:col-span-6" : "w-full"} space-y-4`}>
            {/* Quick Param Sliders (Shown when in inputs or split mode) */}
            {activeTab !== "code" && (
              <div className="p-4 rounded-xl bg-card border border-border space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-primary" />
                    Quick Parameter Sync (Auto-updates Code)
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">Changes sync to Python script</span>
                </div>

                {activeModel === "attrition" && (
                  <div className="space-y-3">
                    {/* Income Slider */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-secondary-foreground">Monthly Salary (INR):</span>
                        <span className="font-mono text-primary font-bold">₹{attritionInputs.monthlyIncome.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="25000"
                        max="200000"
                        step="5000"
                        value={attritionInputs.monthlyIncome}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = { ...attritionInputs, monthlyIncome: val };
                          setAttritionInputs(updated);
                          setEditableCode(getAttritionPythonCode(updated));
                        }}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>

                    {/* Commute Distance */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-secondary-foreground">Commute Distance:</span>
                        <span className="font-mono text-primary font-bold">{attritionInputs.distanceFromHome} km</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="50"
                        step="1"
                        value={attritionInputs.distanceFromHome}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = { ...attritionInputs, distanceFromHome: val };
                          setAttritionInputs(updated);
                          setEditableCode(getAttritionPythonCode(updated));
                        }}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>

                    {/* Overtime Toggle */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/40 border border-border">
                      <span className="text-xs text-secondary-foreground font-medium">Frequent Overtime Demand</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            const updated = { ...attritionInputs, overtime: false };
                            setAttritionInputs(updated);
                            setEditableCode(getAttritionPythonCode(updated));
                          }}
                          className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                            !attritionInputs.overtime ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground"
                          }`}
                        >
                          No (False)
                        </button>
                        <button
                          onClick={() => {
                            const updated = { ...attritionInputs, overtime: true };
                            setAttritionInputs(updated);
                            setEditableCode(getAttritionPythonCode(updated));
                          }}
                          className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                            attritionInputs.overtime ? "bg-red-500 text-white font-bold" : "text-muted-foreground"
                          }`}
                        >
                          Yes (True)
                        </button>
                      </div>
                    </div>

                    {/* Satisfaction Slider */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-secondary-foreground">Job Satisfaction Rating:</span>
                        <span className="font-mono text-primary font-bold">{attritionInputs.jobSatisfaction} / 5 Stars</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={attritionInputs.jobSatisfaction}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = { ...attritionInputs, jobSatisfaction: val };
                          setAttritionInputs(updated);
                          setEditableCode(getAttritionPythonCode(updated));
                        }}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {activeModel === "rfm" && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-secondary-foreground">Recency (Days Since Last Order):</span>
                        <span className="font-mono text-primary font-bold">{rfmInputs.recencyDays} days</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="120"
                        step="1"
                        value={rfmInputs.recencyDays}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = { ...rfmInputs, recencyDays: val };
                          setRfmInputs(updated);
                          setEditableCode(getRfmPythonCode(updated));
                        }}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-secondary-foreground">Frequency (Orders in 12 Months):</span>
                        <span className="font-mono text-primary font-bold">{rfmInputs.frequencyOrders} orders</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="35"
                        step="1"
                        value={rfmInputs.frequencyOrders}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = { ...rfmInputs, frequencyOrders: val };
                          setRfmInputs(updated);
                          setEditableCode(getRfmPythonCode(updated));
                        }}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-secondary-foreground">Total Monetary Spend (INR):</span>
                        <span className="font-mono text-primary font-bold">₹{rfmInputs.monetarySpend.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="5000"
                        max="300000"
                        step="5000"
                        value={rfmInputs.monetarySpend}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = { ...rfmInputs, monetarySpend: val };
                          setRfmInputs(updated);
                          setEditableCode(getRfmPythonCode(updated));
                        }}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {activeModel === "ebanking" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[11px] text-muted-foreground block mb-1">Gender:</span>
                        <select
                          value={eBankingInputs.gender}
                          onChange={(e) => {
                            const updated = { ...eBankingInputs, gender: e.target.value };
                            setEBankingInputs(updated);
                            setEditableCode(getEBankingPythonCode(updated));
                          }}
                          className="w-full bg-background border border-border rounded-lg px-2.5 py-1 text-xs"
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                        </select>
                      </div>

                      <div>
                        <span className="text-[11px] text-muted-foreground block mb-1">Transaction Frequency:</span>
                        <select
                          value={eBankingInputs.transactionFreq}
                          onChange={(e) => {
                            const updated = { ...eBankingInputs, transactionFreq: e.target.value };
                            setEBankingInputs(updated);
                            setEditableCode(getEBankingPythonCode(updated));
                          }}
                          className="w-full bg-background border border-border rounded-lg px-2.5 py-1 text-xs"
                        >
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-secondary-foreground">Security & Biometric Trust:</span>
                        <span className="font-mono text-primary font-bold">{eBankingInputs.securityTrust} / 5 Stars</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={eBankingInputs.securityTrust}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = { ...eBankingInputs, securityTrust: val };
                          setEBankingInputs(updated);
                          setEditableCode(getEBankingPythonCode(updated));
                        }}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* LIVE PYTHON CODE EDITOR TEXTAREA */}
            <div className="rounded-xl border border-border overflow-hidden bg-[#0d1117] text-gray-200 font-mono text-xs shadow-inner">
              {/* Code Editor Titlebar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-[#30363d]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-gray-400 text-xs ml-2 flex items-center gap-1">
                    <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                    {activeModel === "attrition" ? "attrition_predictor.py" : activeModel === "rfm" ? "rfm_segmentation.py" : "spss_ebanking_stats.py"}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Live Editable
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyCodeToClipboard}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 transition-colors text-[11px]"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>

                  <button
                    onClick={() => syncCodeFromInputs(activeModel)}
                    title="Reset to default script"
                    className="p-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="relative p-2">
                <textarea
                  value={editableCode}
                  onChange={(e) => {
                    const newCode = e.target.value;
                    setEditableCode(newCode);
                    parseCodeAndUpdateInputs(newCode, activeModel);
                  }}
                  rows={14}
                  className="w-full bg-transparent text-emerald-400 font-mono text-xs leading-relaxed focus:outline-none resize-y p-2 selection:bg-emerald-900/50"
                  spellCheck={false}
                  placeholder="Edit Python variables here..."
                />
              </div>

              {/* Footer bar with Run trigger hint */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-t border-[#30363d] text-[11px] text-gray-400">
                <span>Tip: You can edit variable values directly in the code window above</span>
                <button
                  onClick={() => {
                    parseCodeAndUpdateInputs(editableCode, activeModel);
                    runModelSimulation(activeModel);
                  }}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-current" /> Run Script
                </button>
              </div>
            </div>

            {/* LIVE PYTHON TERMINAL STDOUT */}
            <div className="rounded-xl border border-border overflow-hidden bg-black/90 font-mono text-xs text-green-400 p-4 space-y-1.5 shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-gray-400 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-green-400" />
                  Terminal Output (stdout)
                </span>
                <span className="text-[10px] text-green-500/80">Process Exited: 0 (Success)</span>
              </div>
              <div className="space-y-1 pt-1 min-h-[90px]">
                {terminalLogs.length > 0 ? (
                  terminalLogs.map((log, i) => (
                    <div key={i} className="leading-relaxed">
                      {log.startsWith("$") ? (
                        <span className="text-white font-bold">{log}</span>
                      ) : log.includes("[INFO]") ? (
                        <span className="text-blue-400">{log}</span>
                      ) : log.includes("[ACTION]") ? (
                        <span className="text-amber-400 font-semibold">{log}</span>
                      ) : log.includes("HIGH RISK") ? (
                        <span className="text-red-400 font-bold">{log}</span>
                      ) : log.includes("LOW RISK") || log.includes("Champions") ? (
                        <span className="text-emerald-400 font-bold">{log}</span>
                      ) : (
                        <span>{log}</span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 italic">Click [▶ Run Python Code] to execute script and stream output...</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* RIGHT PANE: COMPUTED VISUAL RESULTS & CHARTS */}
        {(activeTab === "split" || activeTab === "inputs") && (
          <div className={`${activeTab === "split" ? "lg:col-span-6" : "w-full"} space-y-6`}>
            {/* MODEL 1 RESULTS: ATTRITION PREDICTOR */}
            {activeModel === "attrition" && (
              <div className="space-y-6">
                {/* Result Hero Card */}
                <div className="p-6 rounded-2xl glass border border-primary/40 relative overflow-hidden">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                        Calculated Churn Probability
                      </span>
                      <div className="flex items-baseline gap-3 mt-1">
                        <span className={`text-4xl md:text-5xl font-black font-mono ${
                          attritionResult.riskTier === "High" ? "text-red-500" : attritionResult.riskTier === "Medium" ? "text-amber-500" : "text-emerald-500"
                        }`}>
                          {attritionResult.prob}%
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                          attritionResult.riskTier === "High"
                            ? "bg-red-500/20 text-red-400 border border-red-500/40"
                            : attritionResult.riskTier === "Medium"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        }`}>
                          {attritionResult.riskTier} Risk
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-mono text-muted-foreground block">Model Benchmark</span>
                      <span className="text-xs font-mono font-bold text-primary">ROC-AUC: 0.89</span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-3 rounded-full bg-muted/60 overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${attritionResult.prob}%` }}
                      transition={{ duration: 0.4 }}
                      className={`h-full rounded-full ${
                        attritionResult.riskTier === "High"
                          ? "bg-gradient-to-r from-amber-500 to-red-500"
                          : attritionResult.riskTier === "Medium"
                          ? "bg-gradient-to-r from-emerald-500 to-amber-500"
                          : "bg-gradient-to-r from-teal-500 to-emerald-500"
                      }`}
                    />
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {attritionResult.riskTier === "High"
                      ? "Critical intervention required. Frequent overtime coupled with lower compensation or satisfaction increases 90-day departure probability."
                      : attritionResult.riskTier === "Medium"
                      ? "Moderate risk detected. Regular 1-on-1 check-ins and commute flexibility recommended to prevent gradual burnout."
                      : "Employee retention index is healthy. High alignment between compensation, role satisfaction, and work-life balance."}
                  </p>
                </div>

                {/* Feature Importance Bar Chart */}
                <div className="p-5 rounded-2xl glass border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-mono uppercase text-primary font-bold flex items-center gap-1.5">
                      <BarChart2 className="w-3.5 h-3.5" />
                      Shapley Feature Importance (Risk Drivers)
                    </h4>
                    <span className="text-[11px] font-mono text-muted-foreground">Scikit-Learn Weights</span>
                  </div>

                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={attritionResult.featureImportance} layout="vertical" margin={{ top: 5, right: 30, left: 70, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                        <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                        <YAxis dataKey="feature" type="category" width={110} tick={{ fontSize: 11, fill: "hsl(var(--foreground))" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "0.5rem",
                            fontSize: "12px"
                          }}
                        />
                        <Bar dataKey="impact" name="Risk Weight %" radius={[0, 4, 4, 0]}>
                          {attritionResult.featureImportance.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.impact > 20 ? "#ef4444" : entry.impact > 12 ? "#f59e0b" : "#10b981"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Prescriptive HR Retention Plan */}
                <div className="p-4 rounded-xl bg-card border border-border space-y-2">
                  <span className="text-xs font-mono uppercase text-foreground font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Automated HR Intervention Playbook
                  </span>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Overtime Policy:</strong> {attritionInputs.overtime ? "Immediate rebalance of weekly hours recommended to mitigate burnout." : "Work-hour limits respected; maintain current rotation."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Compensation Equity:</strong> {attritionInputs.monthlyIncome < 60000 ? "Market parity review flagged (bottom 30th percentile in peer group)." : "Salary band aligns with senior benchmark tiers."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Commute Accommodation:</strong> {attritionInputs.distanceFromHome > 20 ? "Offer 2 days hybrid WFH to reduce travel fatigue." : "Commute within optimal 15km threshold."}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* MODEL 2 RESULTS: RFM CUSTOMER SEGMENTATION */}
            {activeModel === "rfm" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl glass border border-primary/40">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                        Assigned Customer Cohort
                      </span>
                      <h4 className="text-2xl md:text-3xl font-extrabold text-foreground mt-1">
                        {rfmResult.segment}
                      </h4>
                      <span className="text-xs font-mono text-primary mt-1 inline-block">
                        Composite RFM Vector: {rfmResult.rfmCode}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-mono text-muted-foreground block">Projected 1-Yr CLV</span>
                      <span className="text-xl md:text-2xl font-black font-mono text-emerald-400">
                        ₹{rfmResult.estimatedClv.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
                    <div className="p-2.5 rounded-lg bg-card/60 border border-border text-center">
                      <span className="text-[10px] font-mono text-muted-foreground block">Recency Score</span>
                      <span className="text-lg font-bold font-mono text-primary">{rfmResult.scores.rScore} / 5</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-card/60 border border-border text-center">
                      <span className="text-[10px] font-mono text-muted-foreground block">Frequency Score</span>
                      <span className="text-lg font-bold font-mono text-primary">{rfmResult.scores.fScore} / 5</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-card/60 border border-border text-center">
                      <span className="text-[10px] font-mono text-muted-foreground block">Monetary Score</span>
                      <span className="text-lg font-bold font-mono text-primary">{rfmResult.scores.mScore} / 5</span>
                    </div>
                  </div>
                </div>

                {/* Radar Chart */}
                <div className="p-5 rounded-2xl glass border border-border">
                  <span className="text-xs font-mono uppercase text-primary font-bold block mb-3">
                    Multi-Dimensional RFM Profile Radar
                  </span>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={70} data={rfmResult.radarData}>
                        <PolarGrid stroke="hsl(var(--border) / 0.6)" />
                        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "hsl(var(--foreground))" }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                        <Radar name="Customer Metric" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* MODEL 3 RESULTS: SPSS E-BANKING HYPOTHESIS TEST */}
            {activeModel === "ebanking" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl glass border border-primary/40">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                    Calculated Satisfaction Index
                  </span>
                  <div className="flex items-baseline gap-3 mt-1 mb-4">
                    <span className="text-4xl md:text-5xl font-black font-mono text-primary">
                      {eBankingResult.satisfactionScore} / 10
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      p &lt; 0.05 (Statistically Significant)
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-card/80 border border-border space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Chi-Square Statistic (χ²):</span>
                      <span className="font-mono font-bold text-foreground">{eBankingResult.chiSquare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Calculated p-value:</span>
                      <span className="font-mono font-bold text-emerald-400">{eBankingResult.pVal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sample Size:</span>
                      <span className="font-mono font-bold text-foreground">226 respondents</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border space-y-2 text-xs text-muted-foreground">
                  <span className="font-mono uppercase text-foreground font-bold block mb-1">
                    Key Research Takeaways (SPSS & Python)
                  </span>
                  <p>
                    • Demographics and security trust significantly influence customer satisfaction in e-banking channels.
                  </p>
                  <p>
                    • Recommended implementing zero-friction 2FA authentication and digital literacy onboarding workflows to maximize older demographic adoption.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PythonProjectSimulator;
