import { Circle, Svg } from "@svgdotjs/svg.js";
import { Figure } from "../figure";

export class MyCircle implements Figure {
  private x: number;
  private y: number;
  private radius: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  render(svg: Svg): Circle {
    return svg.circle(100).center(this.x, this.y).radius(this.radius);
  }
}
