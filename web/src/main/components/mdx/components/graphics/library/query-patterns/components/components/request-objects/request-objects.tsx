import { T_PATTERN_OPTION } from "../../props/pattern-option.types";
import { getCircleProps } from "../../props/request-props/request-circle-props";
import { getLineProps } from "../../props/request-props/request-line-props";
import { RequestCircles } from "./request-circles";
import { RequestLines } from "./request-lines";

export const RequestObjects = ({ patternOption }: { patternOption: T_PATTERN_OPTION }) => {
  const lines = getLineProps(patternOption);
  const circles = getCircleProps(patternOption);

  return (
    <>
      <RequestLines lines={lines} />
      <RequestCircles circles={circles} />
    </>
  );
};
