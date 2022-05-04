import { Observable, of } from "rxjs";
import { MyPolyline } from "../figure/polyline";
import { Stream } from "../stream";

export class StreamPolyline implements Stream<MyPolyline> {
  private points: [number, number][];

  constructor(points: [number, number][]) {
    this.points = points;
  }

  asObservable(): Observable<MyPolyline> {
    return of(new MyPolyline(this.points));
  }
}
