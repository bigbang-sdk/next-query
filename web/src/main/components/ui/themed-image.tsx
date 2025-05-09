import Image, { ImageProps } from "next/image";

type ThemedImageProps = Omit<ImageProps, "src"> & {
  srcDark: string;
  srcLight: string;
  alt: string;
};

export const ThemedImage = ({ srcDark, srcLight, alt, ...props }: ThemedImageProps) => {
  return (
    <>
      <div data-hide-on-theme="light">
        <Image src={srcDark} alt={`${alt}-dark`} {...props} />
      </div>

      <div data-hide-on-theme="dark">
        <Image src={srcLight} alt={`${alt}-light`} {...props} />
      </div>
    </>
  );
};
