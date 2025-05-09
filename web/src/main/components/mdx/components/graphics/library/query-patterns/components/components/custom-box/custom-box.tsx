import { getHeaderProps } from "../../props/header-props/header-props";
import { CANVAS_DEFAULTS } from "../../utils/canvas-defaults";
import { SvgBox } from "@/main/components/svg-helpers/svg-helpers";
import { IconLabel } from "./components/icon-label";
import { T_BOX_OPTION } from "../../props/box_option";
import { T_PATTERN_OPTION } from "../../props/pattern-option.types";

type T_CUSTOM_BOX = {
  x: number;
  y: number;
  width: number;
  height: number;
  type: T_BOX_OPTION;
  x_coordinate: number;
  y_coordinate: number;
  patternOption: T_PATTERN_OPTION;
};

export const CustomBox = ({ x: origX, y, width, height, type, x_coordinate, y_coordinate, patternOption }: T_CUSTOM_BOX) => {
  const { SCALE } = CANVAS_DEFAULTS;

  const subtextFontSize = 10 * SCALE;
  const boxRadius = 8 * SCALE;
  const strokeWidth = 1.5 * SCALE;

  const isVisible = () => {
    if (type === "Empty") return false;
    if (patternOption === "CLIENT" && type === "Server" && y_coordinate === 2 && x_coordinate === 0) return false;
    return true;
  };

  const fillColors = () => {
    if (type == "API") {
      if (x_coordinate == 0 && y_coordinate == 0 && (patternOption == "CLIENT" || patternOption == "SERVER")) {
        return { box: "var(--color-green-500)", dashed: false };
      }

      if (x_coordinate == 0 && y_coordinate == 0 && patternOption == "BOTH") {
        return { box: "var(--color-cyan-500)", dashed: false };
      }

      if (x_coordinate == 2 && y_coordinate == 0 && patternOption == "CLIENT") {
        return { box: "var(--color-cyan-500)", dashed: false };
      }
    }

    if (type === "Server") {
      if (patternOption == "SERVER" && x_coordinate == 0 && y_coordinate == 2) {
        return { box: "transparent", dashed: true, stroke: "var(--color-purple-500)" };
      } else {
        return { box: "var(--color-purple-500)", dashed: false };
      }
    }

    if (type === "Browser") {
      return { box: "transparent", subtext: "var(--color-foreground)", dashed: false };
    }

    return { box: "transparent", subtext: "var(--color-foreground)", dashed: true };
  };

  const adjustedX = patternOption === "BOTH" && type === "Server" ? origX - width / 3 : origX;

  if (!isVisible()) return null;

  const headerSubtext = type === "Header" ? getHeaderProps(patternOption)[x_coordinate].subtext : type === "API" ? "San Francisco" : "Singapore";

  return (
    <g transform={`translate(${adjustedX}, ${y})`}>
      {type !== "Header" && (
        <SvgBox
          x={0}
          y={0}
          width={width}
          height={height}
          fill={fillColors().box}
          stroke={fillColors().box === "transparent" ? (fillColors().stroke ? fillColors().stroke : "var(--color-border)") : fillColors().box}
          strokeWidth={strokeWidth}
          radius={boxRadius}
          dashed={fillColors().dashed}
        />
      )}

      <IconLabel x={0} y={-height / 6} type={type} x_coordinate={x_coordinate} patternOption={patternOption} />

      <text x={0} y={height / 6} fill={"var(--color-foreground)"} fontSize={subtextFontSize} textAnchor="middle" dominantBaseline="middle">
        {headerSubtext}
      </text>
    </g>
  );
};
