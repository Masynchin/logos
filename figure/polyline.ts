import { Shape, Svg } from "@svgdotjs/svg.js";
import { Figure } from "../figure";

export class MyPolyline implements Figure {
  private points: [number, number][];

  constructor(points: [number, number][]) {
    this.points = points;
  }

  render(svg: Svg): Shape {
    return svg.polyline(this.points);
  }
}
