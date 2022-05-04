import {
  combineLatest,
  fromEvent,
  map,
  Observable,
  of,
  pluck,
  startWith,
} from "rxjs";
import { MyCircle, MyPolyline, Renderable } from "./figures";
import { LogoSettings } from "./logo";
import { Stream, StreamCircle, StreamPolyline } from "./figureStreams";

export class MainStream {
  private figures: StreamFigures;
  private logoSettings: StreamLogoSettings;

  constructor(document: Document) {
    this.figures = new StreamFigures();
    this.logoSettings = new StreamLogoSettings(document);
  }

  asObservable(): Observable<[Renderable[], LogoSettings]> {
    return combineLatest([
      this.figures.asObservable(),
      this.logoSettings.asObservable(),
    ]);
  }
}

export class StreamFigures {
  private streams: Stream<Renderable>[];

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
  asObservable(): Observable<Renderable[]> {
    return combineLatest(this.streams.map((s) => s.asObservable()));
  }
}

export class StreamLogoSettings {
  private logoWidth: StreamLogoWidth;
  private logoStroke: StreamLogoStroke;
  private logoStrokeWidth: StreamLogoStrokeWidth;

  constructor(document: Document) {
    this.logoWidth = new StreamLogoWidth(document);
    this.logoStroke = new StreamLogoStroke(document);
    this.logoStrokeWidth = new StreamLogoStrokeWidth(document);
  }

  asObservable(): Observable<LogoSettings> {
    return combineLatest([
      this.logoWidth.asObservable(),
      this.logoStroke.asObservable(),
      this.logoStrokeWidth.asObservable(),
    ]).pipe(
      map(([width, stroke, strokeWidth]: [string, string, string]) => {
        return { width, stroke, strokeWidth };
      })
    );
  }
}

class StreamLogoWidth {
  private document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  asObservable(): Observable<unknown> {
    return fromEvent(this.document.getElementById("width"), "input").pipe(
      pluck("target", "value"),
      startWith(300)
    );
  }
}

class StreamLogoStroke {
  private document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  asObservable(): Observable<unknown> {
    return fromEvent(this.document.getElementById("stroke"), "input").pipe(
      pluck("target", "value"),
      startWith("#000000")
    );
  }
}

class StreamLogoStrokeWidth {
  private document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  asObservable(): Observable<unknown> {
    return fromEvent(this.document.getElementById("strokeWidth"), "input").pipe(
      pluck("target", "value"),
      startWith(5)
    );
  }
}
