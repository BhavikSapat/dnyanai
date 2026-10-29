// Replace these paths anytime with your custom PNG, WebP, or SVG logo files in /public
export const LOGO_IMAGE_PATHS = {
  light: "/logo-light.svg",
  dark: "/logo-dark.svg",
  embossed: "/logo-book.svg",
};

interface DnyanaiLogoProps {
  variant?: "light" | "dark" | "embossed";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function DnyanaiLogo({
  variant = "light",
  size = "md",
  className = "",
}: DnyanaiLogoProps) {
  const sizeClasses =
    size === "sm"
      ? "h-6 sm:h-7 w-auto"
      : size === "lg"
        ? "h-7 sm:h-9 lg:h-10 w-auto"
        : "h-7 sm:h-8 w-auto";

  return (
    <>
      <div className="flex">
        {/* <img src="logo.png" className="h-15 w-15" /> */}
        <img src="text.png" className="h-30 w-30 sm:h-45 sm:w-45 invert" />
      </div>
      {/* <img
        src={LOGO_IMAGE_PATHS[variant]}
        alt="Dnyanai Computer Education"
        referrerPolicy="no-referrer"
        className={`block object-contain shrink-0 select-none ${sizeClasses} ${className}`}
      /> */}
    </>
  );
}
