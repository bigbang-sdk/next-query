"use client";
import { HeroSvg } from "@/main/components/lib/graphics/library/hero/svg/hero-svg";
import { Loading } from "@/main/components/global/loading/loading";
import { SaveAsImage } from "@/main/wrappers/save-as-image";
import { useSafeTheme } from "@/main/wrappers/theme-provider";

export default function PageClient() {
  const { hydrated, theme } = useSafeTheme();

  if (!hydrated) return <Loading />;

  return (
    <SaveAsImage
      id={`hero`}
      appendTheme
      className="w-full"
    >
      <HeroSvg
        border
        fontWidthEstimate={theme === "dark" ? 0.635 : 0.63}
      />
    </SaveAsImage>
  );
}
