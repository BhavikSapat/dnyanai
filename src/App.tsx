import { useState, useMemo, useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  ArrowRight,
  ArrowUpRight,
  Search,
  Star,
  ShieldCheck,
  Keyboard,
  Award,
  Layers,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  MessageCircle,
  Instagram,
} from "lucide-react";
import { HeroPortraitCard } from "./components/HeroPortraitCard";
import { DnyanaiLogo } from "./components/DnyanaiLogo";
import {
  CourseThumbnail,
  MentorLiveCard,
} from "./components/DesignMediaAssets";
import {
  NavigationDrawer,
  SavedCoursesDrawer,
  CourseInquiryModal,
} from "./components/NavigationDrawer";
import {
  COURSES_CATALOG,
  HERO_SLIDES,
  INSTITUTE_INFO,
  CourseItem,
  TrackId,
} from "./data/coursesData";

const GUIDED_PRACTICAL_STEPS = [
  {
    step: "01",
    headline:
      "Follow a structured, practical computer education path guided personally by Prof. Pr. Arya Ankush Thakre.",
    bullets: [
      { prefix: "Govt. recognized ", bold: "MS-CIT & GCC-TBC (15433)" },
      { prefix: "100% hands-on ", bold: "daily lab practice" },
      { prefix: "Official exam & ", bold: "job preparation" },
    ],
  },
  {
    step: "02",
    headline:
      "Build real workplace speed and accuracy with dedicated English & Marathi 30/40 WPM typing drills and MS Office workflows.",
    bullets: [
      { prefix: "Court & clerical ", bold: "exam mock tests" },
      { prefix: "MS Word, Excel & ", bold: "PowerPoint mastery" },
      { prefix: "Individual PC ", bold: "lab allocation" },
    ],
  },
  {
    step: "03",
    headline:
      "Advance into high-demand corporate accounting, ERP, database management, and modern AI productivity tools.",
    bullets: [
      { prefix: "Tally Prime GST & ", bold: "SAP (FICO, MM, SD)" },
      { prefix: "Advanced Excel, ", bold: "Oracle SQL & AI tools" },
      { prefix: "Hardware & LAN ", bold: "troubleshooting" },
    ],
  },
];

export default function App() {
  // Hero slide & track state
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [activeTrackId, setActiveTrackId] = useState<TrackId>("govt-certified");

  // Search & course filter state
  const [selectedCategory, setSelectedCategory] = useState<"all" | TrackId>(
    "all",
  );
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  // Saved/liked courses start empty by default (0 default likes)
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // Guided Journey step state (Desktop showcase)
  const [guidedStepIndex, setGuidedStepIndex] = useState<number>(0);

  // Drawers & inquiry modal state (no login feature)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryCourse, setInquiryCourse] = useState<CourseItem | null>(null);

  // Footer quick callback input
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackError, setCallbackError] = useState("");
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);

  // Dynamic canonical URL resolution for SEO
  useEffect(() => {
    const cleanUrl = window.location.origin + window.location.pathname;
    let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", cleanUrl);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest("[data-search-pill]")) {
        setIsCategoryDropdownOpen(false);
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const currentSlide = HERO_SLIDES[slideIndex];

  const handleSelectTrackFromPortrait = (trackId: TrackId) => {
    setActiveTrackId(trackId);
    const matchingIdx = HERO_SLIDES.findIndex((s) => s.trackId === trackId);
    if (matchingIdx !== -1) {
      setSlideIndex(matchingIdx);
    }
  };

  const handlePrevSlide = () => {
    const nextIdx = (slideIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    setSlideIndex(nextIdx);
    setActiveTrackId(HERO_SLIDES[nextIdx].trackId);
  };

  const handleNextSlide = () => {
    const nextIdx = (slideIndex + 1) % HERO_SLIDES.length;
    setSlideIndex(nextIdx);
    setActiveTrackId(HERO_SLIDES[nextIdx].trackId);
  };

  const toggleSavedCourse = (courseId: string) => {
    setSavedIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
  };

  const savedCoursesList = useMemo(
    () => COURSES_CATALOG.filter((c) => savedIds.includes(c.id)),
    [savedIds],
  );

  const filteredCourses = useMemo(() => {
    return COURSES_CATALOG.filter((course) => {
      const matchesCat =
        selectedCategory === "all" || course.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.summary.toLowerCase().includes(q) ||
        course.shortTag.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const isFiltering =
    selectedCategory !== "all" || searchQuery.trim().length > 0;
  const displayedCourses =
    showAllCourses || isFiltering
      ? filteredCourses
      : filteredCourses.slice(0, 4);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const categoryOptions: Array<{ id: "all" | TrackId; label: string }> = [
    { id: "all", label: "All Course" },
    { id: "govt-certified", label: "Govt. Certified" },
    { id: "accounting-erp", label: "Accounting & ERP" },
    { id: "office-analytics", label: "Office & Analytics" },
    { id: "tech-ai-infra", label: "Tech, SQL & AI" },
  ];

  const selectedCategoryLabel =
    categoryOptions.find((c) => c.id === selectedCategory)?.label ??
    "All Course";

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[0-9+\-\s()]{8,16}$/.test(callbackPhone.trim())) {
      setCallbackError("Enter a valid 10-digit mobile number.");
      return;
    }
    setCallbackError("");
    setCallbackSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: callbackPhone.trim(),
          source: "Footer Callback",
        }),
      });
      if (!res.ok) {
        setCallbackError("Unable to send callback request. Please try again.");
        return;
      }
      setCallbackSent(true);
    } catch {
      setCallbackError("Unable to send callback request. Please try again.");
    } finally {
      setCallbackSubmitting(false);
    }
  };

  const renderSearchPill = () => (
    <div
      data-search-pill="true"
      className="relative flex-1 min-w-0 h-[42px] sm:h-[54px] bg-white rounded-full px-3.5 sm:px-5 flex items-center shadow-[0_2px_14px_rgba(30,26,24,0.035)]"
    >
      <button
        type="button"
        onClick={() => setIsCategoryDropdownOpen((v) => !v)}
        aria-expanded={isCategoryDropdownOpen}
        className="inline-flex items-center gap-1 sm:gap-1.5 text-[12.5px] sm:text-[14.5px] font-medium text-[#1E1A18] whitespace-nowrap shrink-0 cursor-pointer hover:text-[#F95514] transition-colors"
      >
        <span className="max-w-[92px] sm:max-w-[150px] truncate">
          {selectedCategoryLabel}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3A322F] transition-transform duration-150 ${
            isCategoryDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <span
        aria-hidden="true"
        className="h-4 sm:h-5 w-px bg-[#E5DBD5] mx-2.5 sm:mx-4 shrink-0"
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSearchFocused(false);
          scrollToSection("courses");
        }}
        className="flex-1 flex items-center min-w-0"
      >
        <input
          type="search"
          value={searchQuery}
          onFocus={() => setIsSearchFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for course..."
          aria-label="Search courses"
          className="w-full min-w-0 bg-transparent text-[12.5px] sm:text-[14.5px] text-[#1E1A18] placeholder:text-[#A99E99] focus:outline-none"
        />
        {searchQuery && (
          <button
            type="submit"
            aria-label="Search courses"
            className="text-[#F95514] p-1 shrink-0 cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        )}
      </form>

      {isCategoryDropdownOpen && (
        <div
          role="listbox"
          aria-label="Course categories"
          className="absolute left-0 top-[calc(100%+8px)] w-60 max-w-[calc(100vw-32px)] rounded-2xl bg-white border border-[#EAE0DA] shadow-xl py-2 z-30"
        >
          {categoryOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setSelectedCategory(opt.id);
                if (opt.id !== "all") {
                  handleSelectTrackFromPortrait(opt.id);
                }
                setIsCategoryDropdownOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-[13.5px] sm:text-[14px] hover:bg-[#FCF5F1] cursor-pointer ${
                selectedCategory === opt.id
                  ? "font-semibold text-[#F95514]"
                  : "text-[#1E1A18]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {isSearchFocused && searchQuery.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-2xl bg-white border border-[#EAE0DA] shadow-xl p-2 z-30">
          {filteredCourses.length === 0 ? (
            <div className="px-3.5 py-2.5 text-[13px] text-[#6D6561]">
              No courses match &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            filteredCourses.slice(0, 4).map((course) => (
              <button
                key={course.id}
                type="button"
                onClick={() => {
                  setIsSearchFocused(false);
                  setInquiryCourse(course);
                  setIsInquiryOpen(true);
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#FCF5F1] flex items-center justify-between gap-2 cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="text-[13.5px] font-semibold text-[#1E1A18] truncate">
                    {course.title}
                  </div>
                  <div className="text-[12px] text-[#6D6561]">
                    {course.certification} · {course.shortTag}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#F95514] shrink-0" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );

  // Top Action Cluster (Heart + Menu ≡, no login feature)
  const renderActionButtons = () => (
    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
      <button
        type="button"
        onClick={() => setIsSavedOpen(true)}
        aria-label={`Saved courses (${savedIds.length})`}
        className="relative w-[40px] h-[40px] sm:w-[54px] sm:h-[54px] rounded-full border border-[#DFCEC5] bg-white/35 hover:bg-white flex items-center justify-center text-[#2A2421] transition-colors cursor-pointer shrink-0"
      >
        <Heart
          className="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px]"
          strokeWidth={1.75}
        />
        {savedIds.length > 0 && (
          <span className="absolute top-1 right-1 sm:top-2 sm:right-2 w-[16px] h-[16px] sm:w-[17px] sm:h-[17px] rounded-full bg-[#EE3E24] text-white text-[9.5px] sm:text-[10px] font-bold flex items-center justify-center leading-none tabular-nums">
            {savedIds.length}
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open navigation menu"
        className="h-[40px] sm:h-[54px] px-3.5 sm:px-6 rounded-full bg-white hover:bg-[#FFF9F5] text-[#1E1A18] text-[13.5px] sm:text-[15px] font-medium inline-flex items-center gap-2 sm:gap-3 shadow-[0_2px_14px_rgba(30,26,24,0.035)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
      >
        <span>Menu</span>
        <svg
          width="17"
          height="13"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1 1.75H17M1 7H17M1 12.25H17"
            stroke="#1E1A18"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F4] text-[#1E1A18] overflow-x-hidden">
      {/* =====================================================================
          SECTION 1: SPLIT HERO
          Desktop (lg+): Exact full-screen 1:1 proportions from uploaded design
          Mobile (< sm): Compact low-scroll proportions
      ====================================================================== */}
      <section
        id="home"
        className="w-full lg:min-h-screen bg-linear-to-br from-[#EED6CD] via-[#F4E3DB] to-[#FEFCFB] p-2.5 sm:p-4 lg:p-5 flex items-stretch"
      >
        <div className="w-full max-w-[1520px] mx-auto">
          {/* Mobile & Tablet Header (< lg) */}
          <div className="lg:hidden space-y-2 mb-3">
            <div className="flex items-center justify-between gap-2 -my-5 -mt-8">
              <button
                type="button"
                onClick={() => scrollToSection("home")}
                className="cursor-pointer shrink-0 "
                aria-label="Dnyanai Computer Education Home"
              >
                <DnyanaiLogo variant="dark" size="sm" />
              </button>
              {renderActionButtons()}
            </div>
            <div className="w-full flex">{renderSearchPill()}</div>
          </div>

          {/* Main 2-Column Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[48.8%_1fr] gap-4 sm:gap-8 lg:gap-10 xl:gap-14 items-stretch lg:min-h-[calc(100vh-40px)]">
            <HeroPortraitCard
              activeTrackId={activeTrackId}
              onSelectTrack={handleSelectTrackFromPortrait}
              onBrandClick={() => scrollToSection("home")}
            />

            <div className="flex flex-col justify-between py-0.5 sm:py-2 lg:py-3 lg:pr-4 xl:pr-6">
              {/* Desktop Top Action Bar (lg+) */}
              <div className="hidden lg:flex items-center gap-3.5 w-full">
                {renderSearchPill()}
                {renderActionButtons()}
              </div>

              {/* Center Hero Copy */}
              <div className="my-2 sm:my-8 lg:my-auto py-0.5 sm:py-3 max-w-[630px]">
                <button
                  type="button"
                  onClick={() => scrollToSection("recognitions")}
                  className="inline-flex flex-wrap items-center gap-2 sm:gap-3 mb-2.5 sm:mb-6 group cursor-pointer text-left"
                >
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FA9E14] text-white px-2.5 sm:px-3 py-1 text-[11.5px] sm:text-[13px] font-semibold leading-none shadow-[0_2px_8px_rgba(250,158,20,0.28)]">
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white" />
                    <span>{currentSlide.badgeText}</span>
                  </span>
                  <span className="text-[12.5px] sm:text-[14.5px] font-medium text-[#2A2421] group-hover:text-[#F95514] transition-colors">
                    {currentSlide.badgeSubtext}
                  </span>
                </button>

                <h1 className="text-[26px] sm:text-[48px] xl:text-[58px] font-semibold tracking-[-0.032em] leading-[1.14] text-[#1E1A18] text-balance">
                  <span className="block">{currentSlide.headlineLine1}</span>
                  <span className="block mt-0.5 sm:mt-1">
                    {currentSlide.headlineLine2}
                  </span>
                </h1>

                <p className="mt-2.5 sm:mt-6 text-[13.5px] sm:text-[17px] leading-[1.55] sm:leading-[1.62] text-[#6D6561] max-w-[530px]">
                  {currentSlide.description}
                </p>

                <div className="mt-4 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-6">
                  <button
                    type="button"
                    onClick={() => {
                      setInquiryCourse(null);
                      setIsInquiryOpen(true);
                    }}
                    className="h-[42px] sm:h-[58px] px-5 sm:px-9 rounded-full bg-[#F95514] hover:bg-[#E5490B] text-white text-[13.5px] sm:text-[16px] font-medium inline-flex items-center gap-2 sm:gap-2.5 shadow-[0_3px_0_#1E1A18] sm:shadow-[0_3.5px_0_#1E1A18] active:translate-y-0.5 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={2.1} />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection("courses")}
                    className="group inline-flex items-center gap-2 sm:gap-3.5 text-[13.5px] sm:text-[16px] font-medium text-[#1E1A18] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span className="w-[40px] h-[40px] sm:w-[56px] sm:h-[56px] rounded-full border border-[#6E635E] group-hover:border-[#1E1A18] group-hover:bg-white/65 flex items-center justify-center transition-colors">
                      <svg
                        width="15"
                        height="17"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-0.5 group-hover:scale-105 transition-transform"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.5 2.3C2.5 1.12 3.8 0.4 4.8 1.03L14.2 6.93C15.13 7.52 15.13 8.88 14.2 9.47L4.8 15.37C3.8 16 2.5 15.28 2.5 14.1V2.3Z"
                          fill="#F95514"
                        />
                      </svg>
                    </span>
                    <span className="group-hover:text-[#F95514] transition-colors">
                      Explore 9 Courses
                    </span>
                  </button>
                </div>
              </div>

              {/* Bottom Hero Row */}
              <div className="pt-3 sm:pt-4 mt-2 sm:mt-0 border-t border-[#EBDAD1]/60 lg:border-none flex items-end justify-between gap-4">
                <div className="text-[12.5px] sm:text-[15.5px] leading-[1.38] font-medium text-[#2A2421]">
                  <span className="block">
                    {currentSlide.bottomCaptionLine1}
                  </span>
                  <span className="block text-[#6D6561] sm:text-[#2A2421] text-[11.5px] sm:text-[15px] font-normal sm:font-medium">
                    {currentSlide.bottomCaptionLine2}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-0.5 sm:gap-1.5 select-none">
                  <div className="tabular-nums leading-none">
                    <span className="text-[12px] sm:text-[13.5px] font-medium text-[#5C534F]">
                      {slideIndex + 1}
                    </span>
                    <span className="text-[13px] sm:text-[15px] text-[#5C534F] mx-0.5">
                      /
                    </span>
                    <span className="text-[17px] sm:text-[23px] font-semibold text-[#1E1A18]">
                      {HERO_SLIDES.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2.5">
                    <button
                      type="button"
                      onClick={handlePrevSlide}
                      aria-label="Previous slide"
                      className="p-1 text-[#2A2421] hover:text-[#F95514] cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="w-[68px] sm:w-[132px] h-[2px] bg-[#E5D9D2] rounded-full overflow-hidden">
                      <div
                        style={{
                          width: `${((slideIndex + 1) / HERO_SLIDES.length) * 100}%`,
                        }}
                        className="h-full bg-[#B9A69B] transition-all duration-200"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleNextSlide}
                      aria-label="Next slide"
                      className="p-1 text-[#2A2421] hover:text-[#F95514] cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: INSTITUTE RECOGNITIONS & CREDENTIALS
          Mobile (< sm): Compact 2x2 low-scroll tiles
          Desktop (sm/lg+): Exact tall staggered 4-card composition from reference
      ====================================================================== */}
      <section
        id="recognitions"
        className="w-full bg-[#F6F1EC] py-5 sm:py-20 lg:py-24 px-3 sm:px-6"
      >
        <div className="max-w-[1220px] mx-auto">
          <p className="text-center text-[12.5px] sm:text-[16px] text-[#7A716C] mb-3.5 sm:mb-14">
            <span className="font-semibold text-[#1E1A18]">
              {INSTITUTE_INFO.name}
            </span>{" "}
            · &ldquo;{INSTITUTE_INFO.sloganPrimary}&rdquo;
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6 items-start">
            {/* Card 1 */}
            <div className="rounded-[15px] sm:rounded-[24px] bg-white p-3 sm:p-7 flex flex-row sm:flex-col items-center sm:items-start sm:justify-between gap-2.5 sm:gap-0 sm:min-h-[205px] shadow-[0_4px_20px_rgba(30,26,24,0.025)]">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#FA9E14] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 sm:mt-12">
                <div className="text-[14.5px] sm:text-[30px] font-semibold tracking-tight text-[#1E1A18] leading-tight sm:leading-none">
                  MS-CIT
                </div>
                <div className="text-[10.5px] sm:text-[14px] text-[#6D6561] truncate sm:mt-2">
                  MKCL Govt. Framework
                </div>
              </div>
            </div>

            {/* Card 2 (Staggered down on desktop lg+) */}
            <div className="lg:mt-12 rounded-[15px] sm:rounded-[24px] bg-white p-3 sm:p-7 flex flex-row sm:flex-col items-center sm:items-start sm:justify-between gap-2.5 sm:gap-0 sm:min-h-[205px] shadow-[0_4px_20px_rgba(30,26,24,0.025)]">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#FA9E14] text-white flex items-center justify-center shrink-0">
                <Keyboard className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 sm:mt-12">
                <div className="text-[14.5px] sm:text-[30px] font-semibold tracking-tight text-[#1E1A18] leading-tight sm:leading-none tabular-nums">
                  15433
                </div>
                <div className="text-[10.5px] sm:text-[14px] text-[#6D6561] truncate sm:mt-2">
                  GCC-TBC Govt. Code
                </div>
              </div>
            </div>

            {/* Card 3 (Warm Amber-Orange Highlight Card) */}
            <div className="rounded-[15px] sm:rounded-[24px] bg-linear-to-br from-[#FFAA1D] to-[#F59206] text-white p-3 sm:p-7 flex flex-row sm:flex-col items-center sm:items-start sm:justify-between gap-2.5 sm:gap-0 sm:min-h-[205px] shadow-[0_8px_24px_rgba(245,146,6,0.2)]">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white text-[#F59206] flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 sm:mt-12">
                <div className="text-[14.5px] sm:text-[30px] font-semibold tracking-tight text-white leading-tight sm:leading-none tabular-nums">
                  9 Courses
                </div>
                <div className="text-[10.5px] sm:text-[14px] text-white/90 truncate sm:mt-2">
                  Govt. &amp; Corporate Skills
                </div>
              </div>
            </div>

            {/* Card 4 (+ Desktop Recognition Callout above) */}
            <div className="lg:mt-2 flex flex-col gap-3">
              <div className="hidden lg:inline-flex self-start items-center px-3.5 py-1.5 rounded-full bg-white text-[12.5px] font-medium text-[#2A2421] shadow-[0_2px_10px_rgba(30,26,24,0.03)]">
                MSCE Pune Recognized
              </div>
              <div className="rounded-[15px] sm:rounded-[24px] bg-white p-3 sm:p-7 flex flex-row sm:flex-col items-center sm:items-start sm:justify-between gap-2.5 sm:gap-0 sm:min-h-[205px] shadow-[0_4px_20px_rgba(30,26,24,0.025)]">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#FA9E14] text-white flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 sm:mt-12">
                  <div className="text-[14.5px] sm:text-[30px] font-semibold tracking-tight text-[#1E1A18] leading-tight sm:leading-none tabular-nums">
                    30/40 WPM
                  </div>
                  <div className="text-[10.5px] sm:text-[14px] text-[#6D6561] truncate sm:mt-2">
                    English &amp; Marathi Typing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: 9 CORE COURSES SHOWCASE
          Desktop (sm+): Exact centered header + full course cards with descriptions
          Mobile (< sm): Compact 2-column mini-cards (Image, Like, Recognized, Title, Syllabus & Fee)
      ====================================================================== */}
      <section
        id="courses"
        className="w-full px-2.5 sm:px-5 lg:px-8 py-3 sm:py-10"
      >
        <div className="max-w-[1320px] mx-auto rounded-[20px] sm:rounded-[36px] bg-linear-to-b from-[#F3EAE3] via-[#F5EEE8] to-[#F7F1EC] px-3 py-6 sm:px-8 sm:py-16 lg:px-12">
          {/* Header: Compact on mobile, exact centered 2-line display on sm+ desktop */}
          <div className="max-w-[640px] sm:mx-auto sm:text-center">
            <h2 className="text-[20px] sm:text-[36px] lg:text-[42px] font-semibold tracking-[-0.028em] leading-[1.18] text-[#1E1A18] text-balance">
              Choose the right skill category and start learning.
            </h2>
            <p className="hidden sm:block mt-3 text-[15px] text-[#6D6561]">
              Choose from structured, government-recognized and career-focused
              programs at Dnyanai Computer Education.
            </p>
          </div>

          {/* Category Filter Bar */}
          <div
            role="tablist"
            aria-label="Filter courses"
            className="no-scrollbar mt-3.5 sm:mt-7 flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-0.5 sm:pb-1"
          >
            {categoryOptions.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`min-h-[32px] sm:min-h-[38px] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11.5px] sm:text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#1E1A18] text-white"
                      : "bg-white/85 hover:bg-white text-[#5C534F]"
                  }`}
                >
                  {cat.id === "all" ? "All Categories" : cat.label}
                </button>
              );
            })}
          </div>

          {/* Course Cards Grid */}
          {displayedCourses.length === 0 ? (
            <div className="mt-5 sm:mt-8 rounded-2xl bg-white p-6 sm:p-10 text-center space-y-3">
              <p className="text-[15px] sm:text-[16px] font-semibold text-[#1E1A18]">
                No matching courses found
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-5 py-2 rounded-full bg-[#1E1A18] text-white text-[13px] font-medium cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="mt-4 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
              {displayedCourses.map((course) => {
                const isSaved = savedIds.includes(course.id);
                return (
                  <article
                    key={course.id}
                    className="group rounded-[15px] sm:rounded-[20px] bg-white p-2.5 sm:p-3.5 flex flex-col justify-between shadow-[0_4px_20px_rgba(30,26,24,0.03)] hover:shadow-[0_10px_28px_rgba(30,26,24,0.07)] transition-shadow"
                  >
                    <div>
                      <div className="relative">
                        <CourseThumbnail
                          thumbKey={course.thumbKey}
                          alt={course.title}
                        />
                        <button
                          type="button"
                          onClick={() => toggleSavedCourse(course.id)}
                          aria-label={
                            isSaved
                              ? `Remove ${course.title} from saved`
                              : `Like ${course.title}`
                          }
                          className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/92 hover:bg-white flex items-center justify-center shadow-xs cursor-pointer"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              isSaved
                                ? "fill-[#EE3E24] text-[#EE3E24]"
                                : "text-[#3A322F]"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="px-0.5 sm:px-1 pt-2 sm:pt-3.5">
                        <div className="text-[10.5px] sm:text-[11.5px] text-[#7A716C] flex items-center gap-1.5 truncate">
                          <span className="font-medium text-[#F95514] truncate">
                            {course.certification}
                          </span>
                          <span className="hidden sm:inline" aria-hidden="true">
                            •
                          </span>
                          <span className="hidden sm:inline truncate">
                            {course.shortTag}
                          </span>
                        </div>

                        <h3 className="mt-0.5 sm:mt-1.5 text-[12.5px] sm:text-[15.5px] font-semibold text-[#1E1A18] leading-tight sm:leading-[1.35] line-clamp-2 sm:min-h-[42px]">
                          {course.title}
                        </h3>

                        {/* Description visible on sm+ desktop, hidden on mobile (< sm) */}
                        <p className="hidden sm:line-clamp-2 mt-1.5 text-[12.5px] text-[#6D6561] leading-relaxed">
                          {course.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-0.5 sm:px-1 pt-2.5 mt-2.5 sm:pt-4 sm:mt-4 sm:border-t sm:border-[#F4ECE7] flex items-center justify-between gap-2">
                      <span className="hidden sm:inline-flex items-center gap-1 text-[12px] font-medium text-[#5C534F]">
                        <Star className="w-3.5 h-3.5 fill-[#FA9E14] text-[#FA9E14]" />
                        <span>{course.categoryName}</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setInquiryCourse(course);
                          setIsInquiryOpen(true);
                        }}
                        className="w-full sm:w-auto py-1.5 px-2.5 sm:px-3.5 rounded-full border border-[#E5DBD5] hover:border-[#F95514] hover:bg-[#F95514] text-[#1E1A18] hover:text-white text-[11px] sm:text-[12px] font-medium whitespace-nowrap shrink-0 text-center transition-colors cursor-pointer"
                      >
                        Syllabus &amp; Fee
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Centered Browse All Courses CTA */}
          {!isFiltering && filteredCourses.length > 4 && (
            <div className="mt-5 sm:mt-12 text-center">
              <button
                type="button"
                onClick={() => setShowAllCourses((v) => !v)}
                className="h-[38px] sm:h-[46px] px-5 sm:px-7 rounded-full bg-[#F95514] hover:bg-[#E4490B] text-white text-[12.5px] sm:text-[14px] font-medium inline-flex items-center gap-1.5 sm:gap-2 shadow-[0_2.5px_0_#1E1A18] sm:shadow-[0_3px_0_#1E1A18] active:translate-y-0.5 transition-all cursor-pointer"
              >
                <span>
                  {showAllCourses
                    ? "Show Featured Courses"
                    : `Browse All ${COURSES_CATALOG.length} Courses`}
                </span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: GUIDED STEP-BY-STEP PRACTICAL JOURNEY (Desktop Showcase, Hidden on Mobile < sm to keep mobile scroll short)
      ====================================================================== */}
      <section
        id="journey"
        className="hidden sm:block max-w-[1220px] mx-auto px-6 py-16 lg:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-7 items-stretch">
          <MentorLiveCard onCallMentor={() => scrollToSection("contact")} />

          <div className="rounded-[28px] bg-white p-9 lg:p-11 flex flex-col justify-between shadow-[0_4px_24px_rgba(30,26,24,0.03)]">
            <div>
              <div
                role="tablist"
                aria-label="Guided learning steps"
                className="flex items-center gap-5 tabular-nums"
              >
                {GUIDED_PRACTICAL_STEPS.map((st, idx) => {
                  const active = guidedStepIndex === idx;
                  return (
                    <button
                      key={st.step}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setGuidedStepIndex(idx)}
                      className={`min-h-[40px] inline-flex items-center gap-2 text-[15.5px] font-semibold transition-colors cursor-pointer ${
                        active
                          ? "text-[#1E1A18]"
                          : "text-[#CFC6C0] hover:text-[#7A716C]"
                      }`}
                    >
                      {active && (
                        <span
                          aria-hidden="true"
                          className="w-5 h-[1.8px] bg-[#1E1A18] inline-block"
                        />
                      )}
                      <span>{st.step}</span>
                    </button>
                  );
                })}
              </div>

              <h2 className="mt-7 text-[26px] lg:text-[28px] font-medium tracking-[-0.02em] leading-[1.36] text-[#1E1A18] max-w-[600px]">
                {GUIDED_PRACTICAL_STEPS[guidedStepIndex].headline}
              </h2>
            </div>

            <div className="mt-14 pt-6 border-t border-[#F4ECE7] flex items-end justify-between gap-6">
              <ul className="space-y-2.5">
                {GUIDED_PRACTICAL_STEPS[guidedStepIndex].bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-[14px] text-[#7A716C]"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 0.5L9.8 6.2L15.5 8L9.8 9.8L8 15.5L6.2 9.8L0.5 8L6.2 6.2L8 0.5Z"
                        fill="#FA9E14"
                      />
                    </svg>
                    <span>
                      {b.prefix}
                      <strong className="font-semibold text-[#1E1A18]">
                        {b.bold}
                      </strong>
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => {
                  setInquiryCourse(null);
                  setIsInquiryOpen(true);
                }}
                className="h-[44px] px-6 rounded-full bg-[#F95514] hover:bg-[#E4490B] text-white text-[13.5px] font-medium inline-flex items-center gap-2 shadow-[0_2.5px_0_#1E1A18] active:translate-y-0.5 transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: DARK OBSIDIAN FOOTER ("Let's Talk Our Mentor" + Padgha Campus)
      ====================================================================== */}
      <footer
        id="contact"
        className="px-2.5 sm:px-5 pb-2.5 sm:pb-5 pt-1.5 sm:pt-4"
      >
        <div className="max-w-[1360px] mx-auto rounded-[20px] sm:rounded-[34px] bg-[#141313] text-white px-4 py-6 sm:px-12 sm:py-16 lg:px-16">
          {/* Desktop "Let's Talk Our Mentor" Top Row + Callback Input */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10 pb-6 sm:pb-12 border-b border-white/10">
            <div className="w-full max-w-[400px] space-y-4">
              {callbackSent ? (
                <div className="flex items-center gap-2.5 text-[13px] sm:text-[14px] text-[#86EFAC]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    Thank you! We will call {callbackPhone} with batch details.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} noValidate>
                  <label htmlFor="callback-phone" className="sr-only">
                    Enter Mobile Number for Callback
                  </label>
                  <div className="flex items-center justify-between gap-3 border-b border-white/25 focus-within:border-[#F95514] pb-2.5 sm:pb-3 transition-colors">
                    <input
                      id="callback-phone"
                      type="tel"
                      value={callbackPhone}
                      disabled={callbackSubmitting}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      placeholder="Enter Mobile Number for Callback"
                      className="w-full bg-transparent text-[13px] sm:text-[14px] text-white placeholder:text-white/50 focus:outline-none disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={callbackSubmitting}
                      aria-label="Request callback"
                      className="text-white/80 hover:text-[#F95514] p-1 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                  {callbackError && (
                    <p
                      className="text-[11.5px] sm:text-[12.5px] text-[#FCA5A5] mt-1.5"
                      role="alert"
                    >
                      {callbackError}
                    </p>
                  )}
                </form>
              )}

              {/* Direct Call / WhatsApp Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 text-[12px] sm:text-[13px] tabular-nums">
                <a
                  href={`tel:${INSTITUTE_INFO.phonePrimaryRaw}`}
                  className="px-3.5 py-2 rounded-full bg-white/8 hover:bg-white/14 border border-white/10 inline-flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F95514]" />
                  <span>{INSTITUTE_INFO.phonePrimary}</span>
                </a>
                <a
                  href={INSTITUTE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-full bg-white/8 hover:bg-white/14 border border-white/10 inline-flex items-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#FA9E14]" />
                  <span>{INSTITUTE_INFO.phoneSecondary}</span>
                </a>
              </div>
            </div>

            {/* Right Display Title */}
            <button
              type="button"
              onClick={() => {
                setInquiryCourse(null);
                setIsInquiryOpen(true);
              }}
              className="text-left md:text-right group cursor-pointer"
            >
              <span className="block text-[24px] sm:text-[40px] lg:text-[44px] font-medium tracking-[-0.025em] leading-[1.14] text-white group-hover:text-[#FA9E14] transition-colors">
                Let&apos;s Talk
              </span>
              <span className="block text-[24px] sm:text-[40px] lg:text-[44px] font-medium tracking-[-0.025em] leading-[1.14] text-white group-hover:text-[#FA9E14] transition-colors">
                Our Mentor
              </span>
            </button>
          </div>

          {/* Institute Campus & Faculty Details */}
          <div className="py-5 sm:py-7 border-b border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 text-[12px] sm:text-[13.5px] text-white/75">
            <div>
              Directed by{" "}
              <strong className="text-white font-semibold">
                {INSTITUTE_INFO.director}
              </strong>{" "}
              <br />
              Associated with{" "}
              <strong className="text-white font-medium">
                {INSTITUTE_INFO.typingInstitute} (Govt. Code:{" "}
                {INSTITUTE_INFO.govtCode})
              </strong>
            </div>
            <div className="flex items-start lg:justify-end gap-2">
              <MapPin className="w-4 h-4 text-[#FA9E14] shrink-0 mt-0.5" />
              <span>{INSTITUTE_INFO.addressFull}</span>
            </div>
          </div>

          {/* Bottom Navigation & Copyright Row */}
          <div className="pt-5 sm:pt-8 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-6">
            <div className="invert -my-7 sm:-my-15 ">
              {" "}
              <DnyanaiLogo variant="light" size="sm" />
            </div>
            <nav
              aria-label="Footer navigation"
              className="flex items-center flex-wrap gap-4 sm:gap-7 text-[12px] sm:text-[13px] text-white/70"
            >
              <a href="#home" className="hover:text-white transition-colors">
                Home
              </a>
              <a
                href="#recognitions"
                className="hover:text-white transition-colors"
              >
                Recognitions
              </a>
              <a href="#courses" className="hover:text-white transition-colors">
                Courses
              </a>
              <a
                href={`mailto:${INSTITUTE_INFO.email}`}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#FA9E14]" />
                <span>{INSTITUTE_INFO.email}</span>
              </a>
              <a
                href={INSTITUTE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#FA9E14]" />
                <span>{INSTITUTE_INFO.instagramHandle}</span>
              </a>
            </nav>

            <div className="text-[11.5px] sm:text-[12.5px] text-white/45">
              © {new Date().getFullYear()} {INSTITUTE_INFO.name} ·{" "}
              {INSTITUTE_INFO.sloganSecondary}
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE DRAWERS & OVERLAY COURSE MODAL
      ====================================================================== */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={scrollToSection}
        onOpenInquiry={() => {
          setInquiryCourse(null);
          setIsInquiryOpen(true);
        }}
        savedCount={savedIds.length}
        onOpenSaved={() => setIsSavedOpen(true)}
      />

      <SavedCoursesDrawer
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedCourses={savedCoursesList}
        onRemoveSaved={toggleSavedCourse}
        onSelectCourse={(course) => {
          setInquiryCourse(course);
          setIsInquiryOpen(true);
        }}
      />

      <CourseInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        selectedCourse={inquiryCourse}
      />
    </div>
  );
}
