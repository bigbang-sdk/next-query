import Image, { ImageProps } from "next/image";

type ThemedImageProps = Omit<ImageProps, "src"> & {
  srcDark: ImageProps;
  srcLight: ImageProps;
  alt: string;
};

export const ThemedImage = ({ srcDark, srcLight, alt, ...props }: ThemedImageProps) => {
  return (
    <>
      <div data-hide-on-theme="light">
        <Image
          src={srcDark.src}
          alt={`${alt}-dark`}
          {...props}
        />
      </div>

      <div data-hide-on-theme="dark">
        <Image
          src={srcLight.src}
          alt={`${alt}-light`}
          {...props}
        />
      </div>
    </>
  );
};
