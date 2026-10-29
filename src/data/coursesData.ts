export type TrackId =
  | "govt-certified"
  | "accounting-erp"
  | "office-analytics"
  | "tech-ai-infra";

export type CourseThumbKey = "uiux" | "webdev" | "dataai" | "marketing";

export interface ProgressBarItem {
  percent: number;
  highlighted: boolean;
  stageLabel: string;
}

export interface SkillTrack {
  id: TrackId;
  label: string;
  position: "left-top" | "left-bottom" | "right-top" | "right-bottom";
  progressBars: ProgressBarItem[];
}

export interface HeroSlide {
  id: number;
  trackId: TrackId;
  badgeText: string;
  badgeSubtext: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  bottomCaptionLine1: string;
  bottomCaptionLine2: string;
}

export interface CourseItem {
  id: string;
  title: string;
  shortTag: string;
  category: TrackId;
  categoryName: string;
  certification: string;
  summary: string;
  highlights: string[];
  thumbKey: CourseThumbKey;
}

export const INSTITUTE_INFO = {
  name: "Dnyanai Computer Education",
  sloganPrimary: "You create your own destiny",
  sloganSecondary: "Learn. Grow. Succeed.",
  director: "Prof. Pr. Arya Ankush Thakre",
  directorRole: "Head Faculty & Director",
  typingInstitute: "Genius Computer Typing Institute",
  govtCode: "15433",
  recognition: "MSCE Pune & MKCL (MS-CIT) Govt. of Maharashtra Framework",
  addressShort:
    "Vimal Apartment, 1st Floor, Opp. Pooja Sweets, Padgha, Bhiwandi – 421101",
  addressFull:
    "Vimal Apartment, 1st Floor, Opposite Pooja Sweets, Above Iqbal Milk Dairy, Behind Bank of Maharashtra, Padgha–Bhiwandi Road, Padgha, Bhiwandi – 421101, Maharashtra",
  phonePrimary: "+91 80972 93813",
  phonePrimaryRaw: "+918097293813",
  phoneSecondary: "+91 91302 67333",
  phoneSecondaryRaw: "+919130267333",
  whatsappUrl: "https://wa.me/918097293813",
  email: "dnyanaicomputer2024@gmail.com",
  instagramHandle: "@dnyanai__",
  instagramUrl: "https://www.instagram.com/dnyanai__/",
};

export const SKILL_TRACKS: SkillTrack[] = [
  {
    id: "govt-certified",
    label: "MS-CIT & Typing",
    position: "left-top",
    progressBars: [
      { percent: 15, highlighted: true, stageLabel: "OS & Basics" },
      { percent: 35, highlighted: false, stageLabel: "Office Tools" },
      { percent: 55, highlighted: true, stageLabel: "30 WPM Drill" },
      { percent: 75, highlighted: false, stageLabel: "40 WPM Speed" },
      { percent: 94, highlighted: true, stageLabel: "Govt. Exam" },
    ],
  },
  {
    id: "accounting-erp",
    label: "Tally & SAP ERP",
    position: "left-bottom",
    progressBars: [
      { percent: 14, highlighted: true, stageLabel: "Ledgers" },
      { percent: 34, highlighted: false, stageLabel: "Vouchers" },
      { percent: 56, highlighted: true, stageLabel: "GST Billing" },
      { percent: 76, highlighted: false, stageLabel: "SAP Modules" },
      { percent: 92, highlighted: true, stageLabel: "Final Audit" },
    ],
  },
  {
    id: "office-analytics",
    label: "Excel & MS Office",
    position: "right-top",
    progressBars: [
      { percent: 18, highlighted: true, stageLabel: "Docs & Slides" },
      { percent: 38, highlighted: false, stageLabel: "XLOOKUP" },
      { percent: 58, highlighted: true, stageLabel: "Pivot Tables" },
      { percent: 78, highlighted: false, stageLabel: "Power Query" },
      { percent: 95, highlighted: true, stageLabel: "KPI Dashboards" },
    ],
  },
  {
    id: "tech-ai-infra",
    label: "SQL, AI & Hardware",
    position: "right-bottom",
    progressBars: [
      { percent: 16, highlighted: true, stageLabel: "PC & LAN" },
      { percent: 36, highlighted: false, stageLabel: "SQL Joins" },
      { percent: 54, highlighted: true, stageLabel: "Oracle DB" },
      { percent: 74, highlighted: false, stageLabel: "GenAI Tools" },
      { percent: 92, highlighted: true, stageLabel: "Job Ready" },
    ],
  },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    trackId: "govt-certified",
    badgeText: "Govt. Recognized",
    badgeSubtext: "MSCE Pune & MKCL Framework",
    headlineLine1: "Learn. Grow.",
    headlineLine2: "Create Your Destiny",
    description:
      "Government-recognized MS-CIT, GCC-TBC Typing (Code: 15433), Tally Prime, SAP, Oracle SQL & AI training in Padgha, Bhiwandi.",
    bottomCaptionLine1: "Prof. Pr. Arya Thakre",
    bottomCaptionLine2: "Head Faculty & Director",
  },
  {
    id: 2,
    trackId: "accounting-erp",
    badgeText: "Industry ERP",
    badgeSubtext: "Accounting & Corporate Finance",
    headlineLine1: "Master Tally Prime",
    headlineLine2: "& SAP Workflows",
    description:
      "Hands-on GST billing, voucher entries, balance sheets, and enterprise SAP FICO, MM & SD modules for corporate careers.",
    bottomCaptionLine1: "Practical GST & ERP",
    bottomCaptionLine2: "accounting labs",
  },
  {
    id: 3,
    trackId: "office-analytics",
    badgeText: "Office & Data",
    badgeSubtext: "Workplace Productivity",
    headlineLine1: "Advanced Excel",
    headlineLine2: "& KPI Dashboards",
    description:
      "Build real corporate reports using XLOOKUP, Pivot Tables, Macros, Power Query, and the complete Microsoft Office Suite.",
    bottomCaptionLine1: "100% practical",
    bottomCaptionLine2: "lab sessions",
  },
  {
    id: 4,
    trackId: "tech-ai-infra",
    badgeText: "Emerging Tech",
    badgeSubtext: "Databases, AI & Networking",
    headlineLine1: "Oracle SQL, AI Tools",
    headlineLine2: "& PC Networking",
    description:
      "Gain job-ready technical fluency across relational SQL databases, modern generative AI tools, and LAN hardware setup.",
    bottomCaptionLine1: "Career-focused",
    bottomCaptionLine2: "9 core programs",
  },
];

export const COURSES_CATALOG: CourseItem[] = [
  {
    id: "mscit",
    title: "MS-CIT (Govt. Certified)",
    shortTag: "Foundations",
    category: "govt-certified",
    categoryName: "Govt. Certified",
    certification: "MKCL Recognized",
    summary:
      "Essential computer literacy, Windows OS, MS Office basics, digital payments, citizen e-services, and govt. job readiness.",
    highlights: [
      "Windows OS, Word, Excel & PowerPoint essentials",
      "Online citizen services & secure digital payments",
      "Essential qualification for Maharashtra govt. exams",
    ],
    thumbKey: "uiux",
  },
  {
    id: "gcc-tbc-typing",
    title: "Typing (GCC-TBC) – English & Marathi",
    shortTag: "Govt. Code: 15433",
    category: "govt-certified",
    categoryName: "Govt. Certified",
    certification: "MSCE Pune · 30/40 WPM",
    summary:
      "Conducted under Genius Computer Typing Institute (Code: 15433) with speed drills and exam practice for clerical & court jobs.",
    highlights: [
      "30 WPM & 40 WPM English and Marathi batches",
      "Touch-typing accuracy & speed-building drills",
      "Exam-oriented mock tests for court & clerical posts",
    ],
    thumbKey: "webdev",
  },
  {
    id: "tally-accounting",
    title: "Tally Accounting (ERP & Prime)",
    shortTag: "Accounting & GST",
    category: "accounting-erp",
    categoryName: "Accounting & ERP",
    certification: "Certificate Course",
    summary:
      "Complete accounting workflows from ledger creation and vouchers to GST tax computation, stock tracking, P&L, and Balance Sheets.",
    highlights: [
      "Sales, Purchase, Payment & Receipt vouchers",
      "GST billing, returns & inventory management",
      "Profit & Loss and Balance Sheet finalization",
    ],
    thumbKey: "dataai",
  },
  {
    id: "advanced-excel",
    title: "Advanced Excel & Dashboards",
    shortTag: "Analytics & Office",
    category: "office-analytics",
    categoryName: "Office & Analytics",
    certification: "Corporate Practical",
    summary:
      "Master XLOOKUP, INDEX-MATCH, Pivot Tables, Power Query, Macros, and interactive KPI dashboards for corporate reporting.",
    highlights: [
      "XLOOKUP, INDEX-MATCH & nested logical formulas",
      "Interactive Pivot Tables, Slicers & KPI charts",
      "Data cleaning with Power Query & Macro automation",
    ],
    thumbKey: "marketing",
  },
  {
    id: "ms-office-suite",
    title: "Microsoft Office Suite",
    shortTag: "Workplace Productivity",
    category: "office-analytics",
    categoryName: "Office & Analytics",
    certification: "Certificate Course",
    summary:
      "Create polished business documents in Word, spreadsheets in Excel, animated presentations in PowerPoint, and emails in Outlook.",
    highlights: [
      "Professional formatting & mail merge in MS Word",
      "Formulas, charts & daily office sheets in Excel",
      "PowerPoint slide design & Outlook scheduling",
    ],
    thumbKey: "uiux",
  },
  {
    id: "sap-training",
    title: "SAP Professional Training",
    shortTag: "Enterprise ERP",
    category: "accounting-erp",
    categoryName: "Accounting & ERP",
    certification: "Enterprise Track",
    summary:
      "Practical ERP navigation covering core SAP modules (FICO, MM, SD), transaction codes, business workflows, and corporate reporting.",
    highlights: [
      "Overview of SAP FICO, MM & SD core modules",
      "Essential T-codes & enterprise process flows",
      "Corporate ERP reporting & career orientation",
    ],
    thumbKey: "dataai",
  },
  {
    id: "oracle-sql",
    title: "Oracle Database & SQL Queries",
    shortTag: "Database Management",
    category: "tech-ai-infra",
    categoryName: "Tech, SQL & AI",
    certification: "Technical Track",
    summary:
      "Learn relational database design, primary/foreign keys, complex Oracle SQL queries, joins, subqueries, views, and constraints.",
    highlights: [
      "Relational schema design & table constraints",
      "Complex SQL joins, group aggregations & subqueries",
      "Views and real enterprise database scenarios",
    ],
    thumbKey: "webdev",
  },
  {
    id: "ai-basics-tools",
    title: "AI Basics & Modern AI Tools",
    shortTag: "Emerging Tech",
    category: "tech-ai-infra",
    categoryName: "Tech, SQL & AI",
    certification: "Modern Skills",
    summary:
      "Practical prompt engineering, generative AI tools for office productivity and content workflows, and responsible AI usage.",
    highlights: [
      "Core AI concepts & structured prompt engineering",
      "Generative AI for faster office docs & research",
      "Ethical AI practices for students & professionals",
    ],
    thumbKey: "marketing",
  },
  {
    id: "hardware-networking",
    title: "Hardware & Networking",
    shortTag: "IT Infrastructure",
    category: "tech-ai-infra",
    categoryName: "Tech, SQL & AI",
    certification: "Hands-on Lab",
    summary:
      "Hands-on PC assembly, BIOS/UEFI & OS installation, hardware diagnostics, LAN cabling, IP addressing, and router configuration.",
    highlights: [
      "PC component assembly, BIOS/UEFI & OS installation",
      "LAN setup, cable crimping & IPv4 configuration",
      "Router setup & practical hardware troubleshooting",
    ],
    thumbKey: "webdev",
  },
];
