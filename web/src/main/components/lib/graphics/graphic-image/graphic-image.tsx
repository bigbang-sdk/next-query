import { ThemedImage } from "@/main/components/ui/themed-image";
import { ImageProps } from "next/image";

type T_IMAGE_PROPS = {
  dark: ImageProps;
  light: ImageProps;
};

const images: Record<string, T_IMAGE_PROPS> = {};

type GraphicImageProps = Omit<ImageProps, "src" | "alt"> & {
  id: keyof typeof images;
};

export const GraphicImage = ({ id, ...props }: GraphicImageProps) => {
  const imageDark = images[id].dark;
  const imageLight = images[id].light;

  if (!imageDark || !imageLight) {
    return null;
  }

  return (
    <ThemedImage
      srcDark={imageDark}
      srcLight={imageLight}
      width={imageDark.width}
      height={imageDark.height}
      alt={id}
      {...props}
    />
  );
};
