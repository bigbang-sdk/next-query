import { VscBrowser } from "react-icons/vsc";
import { getHeaderProps } from "../../../props/header-props/header-props";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { SiVercel } from "react-icons/si";
import { CANVAS_DEFAULTS } from "../../../utils/canvas-defaults";
import { T_BOX_OPTION } from "../../../props/box_option";
import { T_PATTERN_OPTION } from "../../../props/pattern-option.types";

type T_ICON_LABEL = {
  x: number;
  y: number;
  iconSize?: number; // bounding‐box size
  gap?: number;
  fontSize?: number;
  type: T_BOX_OPTION;
  x_coordinate: number;
  patternOption: T_PATTERN_OPTION;
};

export const IconLabel = ({ x, y, iconSize = 16, gap = 8, fontSize = 12, type, x_coordinate, patternOption }: T_ICON_LABEL) => {
  const { SCALE } = CANVAS_DEFAULTS;

  // bounding-box & text metrics
  const renderedFontSize = fontSize * SCALE;
  const renderedGap = gap * SCALE;
  const boundingIconSize = iconSize * SCALE;
  const label = type;
  const textWidth = label.length * renderedFontSize * 0.6;
  const totalWidth = boundingIconSize + renderedGap + textWidth;

  // pattern props & header offset
  const headerOpt = getHeaderProps(patternOption)[x_coordinate];
  const translateFactor = type === "Header" ? (patternOption === "BOTH" ? 0 : headerOpt.x_translate) : 0;
  const startX = x - totalWidth / (2 - translateFactor);

  // select icon component
  let IconComponent: React.ElementType | null = null;
  switch (type) {
    case "Browser":
      IconComponent = VscBrowser;
      break;
    case "API":
      IconComponent = HiOutlineCodeBracketSquare;
      break;
    case "Server":
      IconComponent = SiVercel;
      break;
  }

  // compute icon scale
  const typeIconScale = (() => {
    switch (type) {
      case "Browser":
        return 4 * SCALE;
      case "API":
        return 4.5 * SCALE;
      case "Server":
        return 3.5 * SCALE;
      case "Header":
        return 3.5 * SCALE;
      default:
        return 0;
    }
  })();

  // vertical offset tweak
  const iconOffsetY = type === "API" ? -boundingIconSize / 1.45 : -boundingIconSize / 1.75;

  // label text & weight
  const labelText = type === "Header" ? headerOpt.label : label;
  const fontWeight = type === "Header" ? 600 : "normal";

  return (
    <g transform={`translate(${startX}, ${y})`}>
      <foreignObject x={0} y={iconOffsetY} width={boundingIconSize} height={boundingIconSize}>
        <div>
          {IconComponent && (
            <IconComponent
              style={{
                width: `calc(var(--spacing) * ${typeIconScale})`,
                height: `calc(var(--spacing) * ${typeIconScale})`,
                color: "var(--color-foreground)",
              }}
            />
          )}
          {type === "Header" && headerOpt.icon(typeIconScale)}
        </div>
      </foreignObject>

      <text x={boundingIconSize + renderedGap} y={0} fontSize={renderedFontSize} fontWeight={fontWeight} fill="var(--color-foreground)" dominantBaseline="middle" textAnchor="start">
        {labelText}
      </text>
    </g>
  );
};
