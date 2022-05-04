import { Observable, of } from "rxjs";
import { MyCircle } from "../figure/circle";
import { Stream } from "../stream";

export class StreamCircle implements Stream<MyCircle> {
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
