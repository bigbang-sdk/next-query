import { getHeaderProps } from "../../props/header-props";
import { T_QUERY_OPTION } from "../../utils/types";
import { CANVAS_DEFAULTS } from "../../utils/defaults";
import { CanvasXCentered, T_X_CENTERED_PROPS } from "../../ui/canvas-x-centered";

export const Header = ({ queryOption }: { queryOption: T_QUERY_OPTION }) => {
  const headerProps = getHeaderProps(queryOption);
  const { narrowCanvasWidth, headerHeight } = CANVAS_DEFAULTS;
  const canvasWidth = narrowCanvasWidth;

  const gapY = headerHeight / 7;
  return (
    <g id="header">
      <CanvasXCentered.TitleWithIcon
        canvasWidth={canvasWidth}
        y={headerHeight / 2}
        props={headerProps as T_X_CENTERED_PROPS}
        gapY={gapY}
        fontWeight={CANVAS_DEFAULTS.fontWeightHeader}
      />
      <CanvasXCentered.Subtitle
        canvasWidth={canvasWidth}
        y={headerHeight / 2}
        props={headerProps as T_X_CENTERED_PROPS}
        gapY={gapY}
      />
    </g>
  );
};
