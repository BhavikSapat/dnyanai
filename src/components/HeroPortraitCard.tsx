import { useState } from "react";
import { DnyanaiLogo, LOGO_IMAGE_PATHS } from "./DnyanaiLogo";
import { SKILL_TRACKS, SkillTrack, TrackId } from "../data/coursesData";

interface HeroPortraitCardProps {
  activeTrackId: TrackId;
  onSelectTrack: (trackId: TrackId) => void;
  onBrandClick: () => void;
}

export function HeroPortraitCard({
  activeTrackId,
  onSelectTrack,
  onBrandClick,
}: HeroPortraitCardProps) {
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);

  const activeTrack =
    SKILL_TRACKS.find((t) => t.id === activeTrackId) || SKILL_TRACKS[0];

  const leftTopTrack = SKILL_TRACKS.find((t) => t.position === "left-top")!;
  const leftBottomTrack = SKILL_TRACKS.find(
    (t) => t.position === "left-bottom",
  )!;
  const rightTopTrack = SKILL_TRACKS.find((t) => t.position === "right-top")!;
  const rightBottomTrack = SKILL_TRACKS.find(
    (t) => t.position === "right-bottom",
  )!;

  const renderFloatingPill = (track: SkillTrack) => {
    const isActive = track.id === activeTrackId;
    return (
      <button
        key={track.id}
        type="button"
        onClick={() => {
          onSelectTrack(track.id);
          setSelectedBarIndex(null);
        }}
        aria-pressed={isActive}
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 xl:px-4 xl:py-2.5 text-[12px] xl:text-[13px] font-medium whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          isActive
            ? "bg-white text-[#1E1A18] shadow-[0_6px_20px_rgba(30,26,24,0.12)] scale-[1.02]"
            : "bg-white/22 hover:bg-white/34 text-white backdrop-blur-md border border-white/18"
        }`}
      >
        <span
          aria-hidden="true"
          className={`w-2 h-2 rounded-full shrink-0 ${
            isActive ? "bg-[#1E1A18]" : "bg-white"
          }`}
        />
        <span>{track.label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-0 h-full">
      {/* Compact height ONLY on mobile (< sm); full original viewport presence on sm/lg desktop */}
      <div className="relative w-full h-[275px] sm:h-auto sm:aspect-[16/15] lg:aspect-auto lg:h-full lg:min-h-[calc(100vh-40px)] rounded-[22px] sm:rounded-[30px] overflow-hidden bg-linear-to-b from-[#8B5E4A] via-[#C79780] to-[#E8D0C3] select-none shadow-[0_10px_35px_rgba(120,78,58,0.08)]">
        {" "}
        <svg
          viewBox="20 17 773 873"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full block"
          role="img"
          aria-label="Dnyanai Computer Education student holding workbook"
        >
          <defs>
            <linearGradient id="patchTopLeftLogo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c69883" />
              <stop offset="50%" stopColor="#ca9b86" />
              <stop offset="100%" stopColor="#cd9f8c" />
            </linearGradient>
            <linearGradient id="patchLeftPills" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4ad9d" />
              <stop offset="48%" stopColor="#d8b4a4" />
              <stop offset="100%" stopColor="#dcb9ab" />
            </linearGradient>
            <linearGradient id="patchRightPills" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4ad9d" />
              <stop offset="48%" stopColor="#d8b4a4" />
              <stop offset="100%" stopColor="#dcb9ab" />
            </linearGradient>
            <linearGradient id="patchBookCover" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c1632c" />
              <stop offset="60%" stopColor="#c0622b" />
              <stop offset="100%" stopColor="#bc5f2a" />
            </linearGradient>
          </defs>

          <image
            href="/hero.png"
            x="20"
            y="17"
            width="773"
            height="873"
            preserveAspectRatio="xMidYMid slice"
          />

          {/* <rect
            x="32"
            y="40"
            width="244"
            height="62"
            fill="url(#patchTopLeftLogo)"
          />
          <rect
            x="45"
            y="246"
            width="253"
            height="122"
            fill="url(#patchLeftPills)"
          />
          <rect
            x="525"
            y="246"
            width="245"
            height="122"
            fill="url(#patchRightPills)"
          /> */}

          {/* Configurable book-cover logo image */}
          {/* <g transform="translate(442, 682) rotate(22.5)">
            <rect
              x="0"
              y="0"
              width="136"
              height="38"
              rx="4"
              fill="url(#patchBookCover)"
            />
            <image
              href={LOGO_IMAGE_PATHS.embossed}
              x="2"
              y="1"
              width="132"
              height="36"
            />
          </g> */}
        </svg>
        {/* Full-size Brand Logo Image inside Hero Card on Tablet & Desktop (sm+) */}
        <div className="hidden sm:flex relative z-10 p-6 lg:p-7 items-center justify-between -mt-8">
          <button
            type="button"
            onClick={onBrandClick}
            className="cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-lg transition-opacity hover:opacity-90"
            aria-label="Dnyanai Computer Education Home"
          >
            <DnyanaiLogo variant="light" size="lg" />
          </button>
        </div>
        {/* 4 Floating Skill Pills on Tablet & Desktop */}
        <div
          className="hidden sm:flex flex-col items-center gap-3 absolute left-[4.5%] xl:left-[6%] top-[28.5%] z-10"
          role="group"
          aria-label="Core institute tracks"
        >
          {renderFloatingPill(leftTopTrack)}
          {renderFloatingPill(leftBottomTrack)}
        </div>
        <div
          className="hidden sm:flex flex-col items-center gap-3 absolute right-[4.5%] xl:right-[6%] top-[28.5%] z-10"
          role="group"
          aria-label="Analytics and technical tracks"
        >
          {renderFloatingPill(rightTopTrack)}
          {renderFloatingPill(rightBottomTrack)}
        </div>
        {/* Bottom-Left Floating Card: Compact on mobile (< sm), exact full proportions on desktop (sm+) */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-5 sm:left-5 z-20 w-[166px] sm:w-[278px] xl:w-[292px] rounded-[14px] sm:rounded-[20px] bg-white p-2.5 sm:p-5 shadow-[0_14px_34px_rgba(30,26,24,0.12)]">
          <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-3">
            <h2 className="text-[10px] sm:text-[14px] font-medium text-[#1E1A18] tracking-[-0.01em] whitespace-nowrap">
              Your Learning Progress
            </h2>
            {selectedBarIndex !== null && (
              <span className="hidden sm:inline text-[10.5px] font-medium text-[#F95514] truncate">
                {activeTrack.progressBars[selectedBarIndex]?.stageLabel}
              </span>
            )}
          </div>

          <div className="h-[62px] sm:h-[136px] xl:h-[142px] grid grid-cols-5 gap-1 sm:gap-2.5 items-end pt-1 sm:pt-2">
            {activeTrack.progressBars.map((bar, idx) => {
              const isSelected = selectedBarIndex === idx;
              return (
                <button
                  key={`${activeTrack.id}-${idx}`}
                  type="button"
                  onClick={() =>
                    setSelectedBarIndex(selectedBarIndex === idx ? null : idx)
                  }
                  title={`${bar.stageLabel}: ${bar.percent}%`}
                  style={{ height: `${Math.max(bar.percent, 28)}%` }}
                  className={`w-full rounded-t-[6px] sm:rounded-t-[10px] rounded-b-[4px] sm:rounded-b-[6px] pt-1 sm:pt-2 px-0.5 sm:px-1 flex flex-col items-center justify-start transition-transform duration-200 cursor-pointer hover:-translate-y-0.5 tabular-nums ${
                    bar.highlighted ? "bg-[#FC9C10]" : "bg-[#EAEAEA]"
                  } ${isSelected ? "ring-2 ring-[#1E1A18]" : ""}`}
                >
                  {bar.highlighted ? (
                    <span className="bg-white text-[#FC9C10] text-[7.5px] sm:text-[10px] font-bold leading-none px-1 sm:px-1.5 py-0.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                      {bar.percent}%
                    </span>
                  ) : (
                    <span className="text-[#E08A1E] text-[7.5px] sm:text-[10px] font-semibold leading-none pt-0.5">
                      {bar.percent}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compact 2x2 Track Selector ONLY on Mobile (< sm) */}
      <div
        className="sm:hidden grid grid-cols-2 gap-1.5"
        role="group"
        aria-label="Choose course category"
      >
        {SKILL_TRACKS.map((track) => {
          const isActive = track.id === activeTrackId;
          return (
            <button
              key={track.id}
              type="button"
              onClick={() => {
                onSelectTrack(track.id);
                setSelectedBarIndex(null);
              }}
              aria-pressed={isActive}
              className={`min-h-[36px] px-2.5 py-1 rounded-full text-[11.5px] font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap truncate transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#1E1A18] text-white"
                  : "bg-white/90 text-[#2A2421] border border-[#E5D6CE]"
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  isActive ? "bg-[#FA9E14]" : "bg-[#8B7E77]"
                }`}
              />
              <span className="truncate">{track.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
