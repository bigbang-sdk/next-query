import HeroImageDark from "@/public/images/hero-dark.webp";
import HeroImageLight from "@/public/images/hero-light.webp";
import { ThemedImage } from "@/main/components/ui/themed-image";
import { ImageProps } from "next/image";

const images = {
  hero: {
    dark: HeroImageDark,
    light: HeroImageLight,
  },
};
type GraphicImageProps = Omit<ImageProps, "src" | "alt"> & {
  id: keyof typeof images;
};

export const GraphicImage = ({ id, ...props }: GraphicImageProps) => {
  const imageDark = images[id].dark;
  const imageLight = images[id].light;

  return <ThemedImage srcDark={imageDark.src} srcLight={imageLight.src} width={imageDark.width} height={imageDark.height} alt={id} {...props} />;
};
