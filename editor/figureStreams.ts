import { Observable, of } from "rxjs";
import { MyCircle, MyPolyline } from "./figures";

export class StreamCircle {
  private x: number;
  private y: number;
  private radius: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  asObservable(): Observable<MyCircle> {
    return of(new MyCircle(this.x, this.y, this.radius));
  }
}

export class StreamPolyline {
  private points: [number, number][];

  constructor(points: [number, number][]) {
    this.points = points;
  }

  asObservable(): Observable<MyPolyline> {
    return of(new MyPolyline(this.points));
  }
}
