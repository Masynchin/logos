import { Circle, Shape, StrokeData, Svg } from "@svgdotjs/svg.js";

interface Renderable {
  render(svg: Svg): Shape;
}

export class MyCircle implements Renderable {
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

export class MyPolyline implements Renderable {
  private points: [number, number][];

  constructor(points: [number, number][]) {
    this.points = points;
  }

  render(svg: Svg): Shape {
    return svg.polyline(this.points);
  }
}

export class WithStroke implements Renderable {
  private origin: Renderable;
  private stroke: StrokeData;

  constructor(origin: Renderable, stroke: StrokeData) {
    this.origin = origin;
    this.stroke = stroke;
  }

  render(svg: Svg): Shape {
    return this.origin.render(svg).stroke(this.stroke);
  }
}

export class WithStrokes {
  private figures: Renderable[];
  private stroke: StrokeData;

  constructor(figures: Renderable[], stroke: StrokeData) {
    this.figures = figures;
    this.stroke = stroke;
  }

  render(svg: Svg): void {
    for (const figure of this.figures) {
      new WithStroke(figure, this.stroke).render(svg);
    }
  }
}
