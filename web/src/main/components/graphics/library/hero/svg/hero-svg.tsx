import { SVG } from "@/main/components/svg-helpers/svg-helpers";
import { CANVAS_DEFAULTS } from "../components/utils/defaults";
import { GridLines } from "../components/components/grid-lines/grid-lines";
import { HeroText } from "../components/components/hero-text/hero-text";
import { Tags } from "../components/components/tags/tags";

export const HeroSvg = ({ className, border = false, fontWidthEstimate }: { className?: string; border?: boolean; fontWidthEstimate?: number }) => {
  const { canvasWidth, canvasHeight } = CANVAS_DEFAULTS.canvasProps;

  return (
    <SVG.Root
      className={className ?? ""}
      canvasWidth={canvasWidth}
      canvasHeight={canvasHeight}
      width={"100%"}
    >
      <GridLines border={border} />
      <HeroText fontWidthEstimate={fontWidthEstimate} />
      <Tags />
    </SVG.Root>
  );
};
