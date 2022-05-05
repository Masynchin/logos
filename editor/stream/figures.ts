import { combineLatest, Observable } from "rxjs";
import { Figure } from "../figure";
import { Stream } from "../stream";
import { StreamCircle } from "./circle";
import { StreamPolyline } from "./polyline";

export class StreamFigures implements Stream<Figure[]> {
  private streams: Stream<Figure>[];

  constructor(document: Document, editor: HTMLElement) {
    this.streams = [
      new StreamCircle(document, editor),
      new StreamCircle(document, editor),
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
