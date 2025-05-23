import { IconType } from "react-icons/lib";
import { COLORS } from "../utils/colors";
import { CANVAS_DEFAULTS } from "../utils/defaults";

export type T_X_CENTERED_PROPS = {
  icon: IconType;
  title: string;
  subtitle: string;
  iconSize?: number | undefined;
  iconYOffset?: number | undefined;
  iconXOffset?: number | undefined;
  fontWeight?: number | undefined;
};

const TitleWithIcon = ({ canvasWidth, y, props, gapY, fontWeight }: { canvasWidth: number; y: number; props: T_X_CENTERED_PROPS; gapY: number; fontWeight?: number | undefined }) => {
  const IconComponent = props.icon;
  const { fontSizeText, fontCharacterWidthEstimate } = CANVAS_DEFAULTS.fontProps;

  const iconSize = 18;
  const gap = 6;
  const textWidthEstimate = props.title.length * fontSizeText * fontCharacterWidthEstimate;
  const totalElementWidth = iconSize + gap + textWidthEstimate;

  return (
    <g transform={`translate(${canvasWidth / 2 - totalElementWidth / 2}, ${y - gapY})`}>
      <IconComponent
        x={0 + (props.iconXOffset ?? 0)}
        y={-iconSize / 2 + (props.iconYOffset ?? 0)}
        size={props.iconSize ?? undefined}
        color={COLORS.text}
      />
      <text
        x={iconSize + gap}
        y={0}
        textAnchor="start"
        dominantBaseline="middle"
        fill={COLORS.text}
        fontSize={fontSizeText}
        fontWeight={fontWeight ?? undefined}
      >
        {props.title}
      </text>
    </g>
  );
};

const Subtitle = ({ canvasWidth, y, props, gapY }: { canvasWidth: number; y: number; props: T_X_CENTERED_PROPS; gapY: number }) => {
  const { fontSizeSubtext, fontCharacterWidthEstimate } = CANVAS_DEFAULTS.fontProps;
  const textWidthEstimate = props.subtitle.length * fontSizeSubtext * fontCharacterWidthEstimate;
  const totalElementWidth = textWidthEstimate;

  return (
    <g transform={`translate(${canvasWidth / 2 - totalElementWidth / 2}, ${y + gapY})`}>
      <text
        x={0}
        y={0}
        textAnchor="start"
        dominantBaseline="middle"
        fill={COLORS.text}
        fontSize={fontSizeSubtext}
      >
        {props.subtitle}
      </text>
    </g>
  );
};

export const CanvasXCentered = {
  TitleWithIcon: TitleWithIcon,
  Subtitle: Subtitle,
};
