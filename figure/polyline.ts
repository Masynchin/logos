import { Shape, Svg } from "@svgdotjs/svg.js";
import { Figure } from "../figure";

export class MyPolyline implements Figure {
  private points: [number, number][] | string;

  constructor(points: [number, number][] | string) {
    this.points = points;
  }

  render(svg: Svg): Shape {
    return svg.polyline(this.points);
  }
}
