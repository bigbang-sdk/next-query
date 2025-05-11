import { SVG } from "@/main/components/svg-helpers/svg-helpers";
import { CANVAS_DEFAULTS } from "../components/utils/defaults";
import { GridLines } from "../components/components/grid-lines/grid-lines";
import { HeroText } from "../components/components/hero-text/hero-text";
import { T_TAG_PROPS, TAGS_PROPS } from "../components/props/tags-props";

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

const Tags = () => {
  const tags = TAGS_PROPS;
  const { canvasWidth, canvasHeight } = CANVAS_DEFAULTS.canvasProps;
  const { tagWidth, tagHeight, tagRowWidth } = CANVAS_DEFAULTS.tagProps;

  const xTranslate = (canvasWidth - tagRowWidth) / 2;

  const xTagTranslate = (tagRowWidth - 4 * tagWidth) / 3;

  const yTranslate = 64;
  return (
    <g>
      <g transform={`translate(${xTranslate}, ${canvasHeight / 2 - yTranslate - tagHeight})`}>
        {tags.slice(0, 4).map((tag, index) => (
          <g
            key={index}
            transform={`translate(${index * (xTagTranslate + tagWidth)}, 0)`}
          >
            <Tag tag={tag} />
          </g>
        ))}
      </g>
      <g transform={`translate(${xTranslate}, ${canvasHeight / 2 + yTranslate})`}>
        {tags.slice(4, 8).map((tag, index) => (
          <g
            key={index}
            transform={`translate(${index * (xTagTranslate + tagWidth)}, 0)`}
          >
            <Tag tag={tag} />
          </g>
        ))}
      </g>
    </g>
  );
};

const Tag = ({ tag }: { tag: T_TAG_PROPS }) => {
  const { tagWidth, tagHeight, tagRadius, tagFontSize } = CANVAS_DEFAULTS.tagProps;

  return (
    <g transform={`rotate(${tag.rotation} ${tagWidth / 2} ${tagHeight / 2}), translate(0, ${4 * tag.yTranslate})`}>
      <rect
        x={0}
        y={0}
        width={tagWidth}
        height={tagHeight}
        fill={tag.color}
        fillOpacity={0.5}
        stroke={tag.color}
        strokeWidth={2}
        rx={tagRadius}
        ry={tagRadius}
      />
      <text
        x={tagWidth / 2}
        y={tagHeight / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight={700}
        fontSize={tagFontSize}
        fill={"white"}
      >
        {tag.text}
      </text>
    </g>
  );
};
