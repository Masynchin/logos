import { Shape, Svg } from "@svgdotjs/svg.js";

export interface Figure {
  render(svg: Svg): Shape;
}
