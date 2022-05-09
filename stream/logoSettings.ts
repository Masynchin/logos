import {
  combineLatest,
  fromEvent,
  map,
  Observable,
  pluck,
  startWith,
} from "rxjs";
import { LogoSettings } from "../logoSettings";
import { Stream } from "../stream";

export class StreamLogoSettings implements Stream<LogoSettings> {
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

class StreamLogoWidth implements Stream<unknown> {
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

class StreamLogoStroke implements Stream<unknown> {
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

class StreamLogoStrokeWidth implements Stream<unknown> {
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
