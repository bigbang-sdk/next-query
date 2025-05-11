import { COLORS } from "../../utils/colors";
import { CANVAS_DEFAULTS } from "../../utils/defaults";

export const HeroText = ({ fontSize, fontWidthEstimate }: { fontSize?: number; fontWidthEstimate?: number }) => {
  const { canvasWidth } = CANVAS_DEFAULTS.canvasProps;
  const { text, fontSize: textFontSize, fontWidthEstimate: textFontWidthEstimate, letterSpacing } = CANVAS_DEFAULTS.heroTextProps;
  const renderedFontSize = fontSize ?? textFontSize;
  const totalElementWidth = text.length * renderedFontSize * (fontWidthEstimate ?? textFontWidthEstimate) + letterSpacing * (text.length - 1);
  const xTranslate = canvasWidth / 2 - totalElementWidth / 2;

  return (
    <g transform={`translate(${xTranslate}, 0)`}>
      <text
        x={0}
        y={"52%"}
        textAnchor="start"
        dominantBaseline="middle"
        fontWeight={"bold"}
        fill={COLORS.text}
        fontSize={renderedFontSize}
        letterSpacing={letterSpacing}
      >
        {text}
      </text>
    </g>
  );
};
