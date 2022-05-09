import { Shape, StrokeData, Svg } from "@svgdotjs/svg.js";
import { Figure } from "../figure";

export class WithStroke implements Figure {
  private origin: Figure;
  private stroke: StrokeData;

  constructor(origin: Figure, stroke: StrokeData) {
    this.origin = origin;
    this.stroke = stroke;
  }

  render(svg: Svg): Shape {
    return this.origin.render(svg).stroke(this.stroke);
  }
}

export class WithStrokes {
  private figures: Figure[];
  private stroke: StrokeData;

  constructor(figures: Figure[], stroke: StrokeData) {
    this.figures = figures;
    this.stroke = stroke;
  }

  render(svg: Svg): void {
    for (const figure of this.figures) {
      new WithStroke(figure, this.stroke).render(svg);
    }
  }
}
