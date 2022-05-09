import { Observable, Subject } from "rxjs";
import { Figure } from "../figure";
import { Stream } from "../stream";
import { StreamCircle } from "./circle";
import { StreamPolyline } from "./polyline";
import { dynamicCombineLatest } from "../extra";

export class StreamFigures implements Stream<Figure[]> {
  private streams: Stream<Figure>[];
  private dynamicObservables: Observable<any[]>;
  private add: Subject<Observable<any>>;

  constructor(document: Document, editor: HTMLElement) {
    const { dynamicObservables, add } = dynamicCombineLatest([]);
    this.dynamicObservables = dynamicObservables;
    this.add = add;
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
    this.streams.forEach((s) => this.add.next(s.asObservable()));
    return this.dynamicObservables;
  }
}
