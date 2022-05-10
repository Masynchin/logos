import { Observable, BehaviorSubject } from "rxjs";
import { MyPolyline } from "../figure/polyline";
import { Widget } from "../widget";

export class WidgetPolyline implements Widget<MyPolyline> {
  private points: [number, number][];
  private subject: BehaviorSubject<MyPolyline>;

  constructor(points: [number, number][]) {
    this.points = points;
    this.subject = new BehaviorSubject<MyPolyline>(new MyPolyline(this.points));
  }

  asObservable(): Observable<MyPolyline> {
    return this.subject;
  }
}
