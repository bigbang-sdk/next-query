"use client";
import { RequestObjects } from "./components/components/request-objects/request-objects";
import { GridLines } from "./components/components/grid-lines/grid-lines";
import { BoxesStack } from "./components/components/boxes-stack/boxes-stack";
import { CANVAS_DEFAULTS } from "./components/utils/canvas-defaults";
import { T_PATTERN_OPTION } from "./components/props/pattern-option.types";
import { CreateSvg } from "@/main/components/svg-helpers/svg-helpers";
import { SaveAsImage } from "@/main/wrappers/save-as-image";
import { useSafeTheme } from "@/main/wrappers/theme-provider";

export const QueryPatternsSvg = ({ patternOption }: { patternOption: T_PATTERN_OPTION }) => {
  const { resolvedTheme } = useSafeTheme();
  return (
    <>
      <SaveAsImage id={`fetch-pattern-${patternOption.toLowerCase()}-${resolvedTheme}`}>
        <div className="relative w-full overflow-hidden border" id={`pattern-svg-${patternOption}`}>
          <PatternSvg patternOption={patternOption} />
        </div>
      </SaveAsImage>
    </>
  );
};

export const PatternSvg = ({ patternOption }: { patternOption: T_PATTERN_OPTION }) => {
  const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_DEFAULTS;

  return (
    <CreateSvg canvasWidth={CANVAS_WIDTH} canvasHeight={CANVAS_HEIGHT} className="w-full">
      <GridLines patternOption={patternOption} />

      <RequestObjects patternOption={patternOption} />

      <BoxesStack patternOption={patternOption} />
    </CreateSvg>
  );
};
