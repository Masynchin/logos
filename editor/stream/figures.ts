import { combineLatest, Observable } from "rxjs";
import { Figure } from "../figure";
import { Stream } from "../stream";
import { StreamCircle } from "./circle";
import { StreamPolyline } from "./polyline";

export class StreamFigures {
  private streams: Stream<Figure>[];

  constructor() {
    this.streams = [
      new StreamCircle(40, 50, 10),
      new StreamCircle(80, 50, 10),
      new StreamPolyline([
        [0, 0],
        [161, 0],
        [161, 125],
        [121, 100],
        [0, 100],
        [0, 0],
      ]),
    ];
  }
  asObservable(): Observable<Figure[]> {
    return combineLatest(this.streams.map((s) => s.asObservable()));
  }
}
