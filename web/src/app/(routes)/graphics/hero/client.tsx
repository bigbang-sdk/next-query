"use client";
import { HeroSvg } from "@/main/components/graphics/library/hero/svg/hero-svg";
import { SaveAsImage } from "@/main/wrappers/save-as-image";
import { useSafeTheme } from "@/main/wrappers/theme-provider";

export default function PageClient() {
  const { theme } = useSafeTheme();
  return (
    <SaveAsImage
      id={`hero-${theme}`}
      className="w-full"
    >
      <HeroSvg
        border
        fontWidthEstimate={theme === "dark" ? 0.635 : 0.63}
      />
    </SaveAsImage>
  );
}
