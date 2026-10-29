import { useState } from 'react';
import { Mic, MicOff, Phone, Video, VideoOff } from 'lucide-react';
import { CourseThumbKey } from '../data/coursesData';
import { LOGO_IMAGE_PATHS } from './DnyanaiLogo';

const WEBP_ASSET = '/assets/aistudio/d517ac928ab05ea2b4298e5b5eec71b1_270be73b.webp';

const THUMB_VIEWBOX: Record<CourseThumbKey, string> = {
  uiux: '1272 304 142 103',
  webdev: '1443 304 142 103',
  dataai: '1614 304 142 103',
  marketing: '1784 304 142 103',
};

interface CourseThumbnailProps {
  thumbKey: CourseThumbKey;
  alt: string;
}

export function CourseThumbnail({ thumbKey, alt }: CourseThumbnailProps) {
  return (
    <div className="w-full h-[86px] sm:h-auto sm:aspect-[142/103] rounded-[11px] sm:rounded-[14px] overflow-hidden bg-[#EAE2DC] relative">
      <svg
        viewBox={THUMB_VIEWBOX[thumbKey]}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block transition-transform duration-200 group-hover:scale-[1.03]"
        role="img"
        aria-label={alt}
      >
        <image href={WEBP_ASSET} x="0" y="0" width="2048" height="1536" />
      </svg>
    </div>
  );
}

interface MentorLiveCardProps {
  onCallMentor: () => void;
}

export function MentorLiveCard({ onCallMentor }: MentorLiveCardProps) {
  const [micMuted, setMicMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

  return (
    <div className="relative w-full aspect-[292/306] lg:h-full rounded-[24px] sm:rounded-[28px] overflow-hidden bg-linear-to-b from-[#C79A85] to-[#DFC4B8] select-none shadow-[0_8px_28px_rgba(30,26,24,0.06)]">
      <svg
        viewBox="1252 662 292 306"
        preserveAspectRatio="xMidYMid slice"
        className={`w-full h-full block transition-opacity duration-200 ${
          videoMuted ? 'opacity-85' : 'opacity-100'
        }`}
        role="img"
        aria-label="Dnyanai Computer Education live faculty guidance"
      >
        <defs>
          <linearGradient id="mentorLogoPatch" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bd8f7d" />
            <stop offset="55%" stopColor="#c59987" />
            <stop offset="100%" stopColor="#cca290" />
          </linearGradient>
        </defs>

        <image href={WEBP_ASSET} x="0" y="0" width="2048" height="1536" />

        {/* Seamless patch + configurable light logo image */}
        <rect
          x="1252"
          y="662"
          width="138"
          height="46"
          fill="url(#mentorLogoPatch)"
        />
        <image
          href={LOGO_IMAGE_PATHS.light}
          x="1264"
          y="672"
          width="96"
          height="24"
          opacity="0.26"
        />

        {/* Clean laptop lid patch */}
        <rect x="1305" y="916" width="44" height="19" rx="3" fill="#dcdbdd" />
      </svg>

      {/* Interactive Call Controls Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-2 rounded-full bg-white/45 backdrop-blur-md border border-white/40 flex items-center gap-2.5 shadow-[0_8px_24px_rgba(30,26,24,0.12)]">
        <button
          type="button"
          onClick={() => setMicMuted((m) => !m)}
          aria-pressed={micMuted}
          aria-label={micMuted ? 'Unmute microphone' : 'Mute microphone'}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            micMuted
              ? 'bg-[#1E1A18] text-white'
              : 'bg-white text-[#1E1A18] hover:bg-[#FAF4F0]'
          }`}
        >
          {micMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={onCallMentor}
          aria-label="Contact Dnyanai faculty"
          title="Contact faculty"
          className="w-10 h-10 rounded-full bg-[#EE3E24] hover:bg-[#D93219] text-white flex items-center justify-center shadow-sm transition-colors cursor-pointer"
        >
          <Phone className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => setVideoMuted((v) => !v)}
          aria-pressed={videoMuted}
          aria-label={videoMuted ? 'Turn camera on' : 'Turn camera off'}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            videoMuted
              ? 'bg-[#1E1A18] text-white'
              : 'bg-white text-[#1E1A18] hover:bg-[#FAF4F0]'
          }`}
        >
          {videoMuted ? (
            <VideoOff className="w-4 h-4" />
          ) : (
            <Video className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
