import { T_PATTERN_OPTION } from "../../props/pattern-option.types";
import { T_LINE_PROPS } from "../../props/request-props/request-line-props";
import { getCircleProps, T_CIRCLE_PROPS } from "../../props/request-props/request-circle-props";
import { getLineProps } from "../../props/request-props/request-line-props";
import { RequestCircles } from "./request-circles";
import { RequestLines } from "./request-lines";

export const RequestObjects = ({ patternOption, index }: { patternOption: T_PATTERN_OPTION; index: number | null }) => {
  const lines = getLineProps(patternOption);
  const circles = getCircleProps(patternOption);

  const indexLines: T_LINE_PROPS[] = [];
  if (index) {
    lines.map((line) => {
      if (line.indexPoint && index === line.index) {
        indexLines.push({
          ...line,
          point: line.indexPoint,
        });
      }
    });
  }

  const indexCircles: T_CIRCLE_PROPS[] = [];
  if (index) {
    circles.map((circle) => {
      if (circle.indexX && index === circle.index) {
        indexCircles.push({
          ...circle,
          x: circle.indexX,
        });
      }
    });
  }
  return (
    <>
      <RequestLines lines={index ? indexLines : lines} />
      <RequestCircles circles={index ? indexCircles : circles} />
    </>
  );
};
