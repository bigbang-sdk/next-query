import { RequestObjects } from "./components/components/request-objects/request-objects";
import { GridLines } from "./components/components/grid-lines/grid-lines";
import { BoxesStack } from "./components/components/boxes-stack/boxes-stack";
import { CANVAS_DEFAULTS } from "./components/utils/canvas-defaults";
import { T_PATTERN_OPTION } from "./components/props/pattern-option.types";
import { CreateSvg } from "@/main/components/svg-helpers/svg-helpers";

export const QueryPatternsSvg = ({ patternOption }: { patternOption: T_PATTERN_OPTION }) => {
  return (
    <>
      <div className="w-full overflow-hidden bg-background border" id={`pattern-svg-${patternOption}`}>
        <Svg patternOption={patternOption} />
      </div>
    </>
  );
};

const Svg = ({ patternOption }: { patternOption: T_PATTERN_OPTION }) => {
  const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_DEFAULTS;

  return (
    <CreateSvg canvasWidth={CANVAS_WIDTH} canvasHeight={CANVAS_HEIGHT} className="w-full">
      <GridLines patternOption={patternOption} />

      <RequestObjects patternOption={patternOption} />

      <BoxesStack patternOption={patternOption} />
    </CreateSvg>
  );
};
